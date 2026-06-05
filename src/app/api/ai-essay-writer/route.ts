import { NextRequest, NextResponse } from "next/server";
import { chatCompletion, parseJSON, AllProvidersFailedError } from "@/app/lib/openrouter";
import { rateLimit, getClientIp } from "@/app/lib/rate-limit";
import { extractToken, verifyToken } from "@/app/lib/api-token";

export const maxDuration = 60;

const SYSTEM_PROMPT = `You are an expert essay writer. Write a complete, well-structured essay.

CRITICAL LANGUAGE RULE:
- The essay (title, introduction, body, conclusion) MUST be written in the EXACT language specified by the user prompt.
- If user says "Language: Arabic" → write in Arabic only
- If user says "Language: Turkish" → write in Turkish only
- If user says "Language: Indonesian" → write in Indonesian only
- If user says "Language: English" → write in English only
- NEVER mix languages. NEVER default to English.

Other rules:
- Return ONLY valid JSON, no markdown, no code fences, no explanation, no preamble.
- The essay must be coherent, well-researched in tone, and directly address the topic.
- The body array must contain real, substantive paragraphs (2-5 depending on length: short=2, medium=3, long=5).
- Each body paragraph should be 3-5 sentences and make a distinct point.
- Stay focused on the chosen essay type and topic — do NOT splice the topic into generic filler.

Return EXACTLY this JSON shape (and nothing else):
{
  "title": "<an engaging specific title in the requested language>",
  "introduction": "<2-4 sentence intro in the requested language>",
  "body": ["<paragraph 1>", "<paragraph 2>", "<paragraph 3>"],
  "conclusion": "<2-3 sentence wrap-up in the requested language>"
}`;

export async function POST(req: NextRequest) {
  // Token gate: reject requests without a valid signed API token
  // (Token is set as a cookie when the user loads the /tools/<name> page,
  //  or sent via X-API-Token header for testing/Postman.)
  const token = extractToken(req, "/api/ai-essay-writer");
  const tv = verifyToken(token, "/api/ai-essay-writer", req);
  if (!tv.ok) {
    console.warn(`[api:ai-essay-writer] token rejected:`, tv.reason);
    return NextResponse.json(
      { error: "Invalid or missing API token. Please reload the page.", reason: tv.reason },
      { status: 401 }
    );
  }

  // Rate limiting: 10 req / 60s per IP
  const rl = rateLimit({ key: `api:ai-essay-writer:${getClientIp(req)}`, max: 10, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${rl.resetIn} seconds.`, retryAfter: rl.resetIn },
      { status: 429, headers: { "Retry-After": String(rl.resetIn), "X-RateLimit-Limit": String(rl.limit), "X-RateLimit-Remaining": "0" } }
    );
  }


  try {
    const { topic, type, length, lang } = await req.json();

    if (!topic || typeof topic !== "string" || topic.trim().length < 3) {
      return NextResponse.json(
        { error: lang === "ar" ? "الرجاء إدخال موضوع لا يقل عن 3 حروف" : "Please enter a topic with at least 3 characters" },
        { status: 400 }
      );
    }

    const wordTarget = length === "short" ? 300 : length === "long" ? 1000 : 600;
    const bodyParas = length === "short" ? 2 : length === "long" ? 5 : 3;

    const userPrompt = `Topic: ${topic.trim()}
Essay type: ${type}
Target length: ~${wordTarget} words
Body paragraphs: ${bodyParas}

OUTPUT LANGUAGE: ${lang === "ar" ? "Arabic (العربية)" : lang === "tr" ? "Turkish (Türkçe)" : lang === "id" ? "Indonesian (Bahasa Indonesia)" : "English"}

Write the entire essay in ${lang === "ar" ? "Arabic" : lang === "tr" ? "Turkish" : lang === "id" ? "Indonesian" : "English"}. Return ONLY valid JSON.`;

    const { content, model } = await chatCompletion({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      jsonObject: true,
      temperature: 0.7,
      maxTokens: length === "long" ? 3000 : 1800,
      timeoutMs: 55000,
    });

    console.log(`[ai-essay-writer] model=${model} bodyLen=${content.length}`);

    // Try standard parse first, then attempt to recover truncated JSON
    let parsed = parseJSON<{
      title: string;
      introduction: string;
      body: string[];
      conclusion: string;
    }>(content);

    if (!parsed) {
      // Attempt to repair: find last complete string in body array
      const titleMatch = content.match(/"title"\s*:\s*"((?:[^"\\]|\\.)*)"/);
      const introMatch = content.match(/"introduction"\s*:\s*"((?:[^"\\]|\\.)*)"/);
      const bodyStart = content.indexOf('"body"\s*:'.replace(/\s/g, ''));
      const bodyIdx = content.search(/"body"\s*:/);
      let body: string[] = [];
      if (bodyIdx >= 0) {
        const arrStart = content.indexOf("[", bodyIdx);
        if (arrStart >= 0) {
          // Extract all complete strings inside the body array
          const arrSlice = content.slice(arrStart + 1);
          const stringRegex = /"((?:[^"\\]|\\.)*)"/g;
          let m;
          while ((m = stringRegex.exec(arrSlice)) !== null) {
            body.push(m[1].replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\'));
          }
        }
      }
      if (titleMatch && introMatch && body.length > 0) {
        parsed = {
          title: titleMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n'),
          introduction: introMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n'),
          body,
          conclusion: "",
        };
        console.log(`[ai-essay-writer] recovered partial JSON, ${body.length} body paras`);
      }
    }

    if (!parsed || !parsed.title || !parsed.introduction || !Array.isArray(parsed.body) || parsed.body.length === 0) {
      console.error("AI Essay Writer parse error. Raw full (model=" + model + "):", content);
      return NextResponse.json(
        { error: lang === "ar" ? "تعذر توليد المقال. حاول مرة أخرى." : "Could not generate the essay. Please try again." },
        { status: 422 }
      );
    }

    return NextResponse.json({
      title: parsed.title,
      introduction: parsed.introduction,
      body: parsed.body,
      conclusion: parsed.conclusion || "",
    });
  } catch (err: any) {
    if (err instanceof AllProvidersFailedError) {
      console.error("All providers failed:", err.attempts);
      return NextResponse.json(
        { error: "جميع مزودي الخدمة غير متاحين حالياً. حاول مرة أخرى." },
        { status: 503 }
      );
    }
    console.error("AI Essay Writer error:", err);
    return NextResponse.json(
      { error: err?.message || "فشل توليد المقال." },
      { status: 500 }
    );
  }
}
