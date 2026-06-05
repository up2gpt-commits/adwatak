import { NextRequest, NextResponse } from "next/server";

const OR_KEY = process.env.OPENROUTER_API_KEY || "";
const GOOGLE_KEY = process.env.GEMINI_API_KEY || "";
const OR_MODEL = "google/gemma-4-26b-a4b-it:free";
const OR_PAID_MODEL = "google/gemma-4-26b-a4b-it";

const SYSTEM_PROMPT = `You are an expert SEO and keyword research assistant. Given a seed keyword or topic, generate a comprehensive keyword research report.

Return ONLY valid JSON. No markdown, no explanations, no code fences.

Rules:
- Generate 15-20 relevant keyword suggestions based on the seed keyword
- For each keyword provide:
  - The keyword itself
  - Estimated monthly search volume (use realistic ranges: low=10-100, medium=100-1K, high=1K-10K, very high=10K+)
  - Competition level (low/medium/high)
  - SEO difficulty (0-100)
  - Suggested content type (blog post, landing page, guide, listicle, tutorial, video, tool)
- Include long-tail variations, question-based keywords, and related terms
- Also return a short analysis with top recommendations

IMPORTANT: Language detection - if the seed keyword is in Arabic, return ALL keywords in Arabic. If English, return in English. Same for Turkish and Indonesian.

Return format EXACTLY:
{
  "keywords": [
    {
      "keyword": "keyword phrase",
      "volume": "estimated monthly volume as string (e.g. '1K-10K')",
      "competition": "low|medium|high",
      "difficulty": <number 0-100>,
      "contentType": "blog post|landing page|guide|listicle|tutorial|video|tool"
    }
  ],
  "analysis": {
    "totalKeywords": <number>,
    "avgDifficulty": <number>,
    "easyWins": ["2-3 easiest keywords to rank for"],
    "topRecommendation": "brief recommendation string",
    "summary": "1-2 sentence summary in the same language as the input"
  }
}

If the input is gibberish, empty, or not a real keyword, return: {"error": "Invalid keyword. Please enter a real search term."}`;

export async function POST(req: NextRequest) {
  try {
    const { keyword, lang } = await req.json();
    if (!keyword || typeof keyword !== "string" || keyword.trim().length < 2) {
      return NextResponse.json({ error: "من فضلك أدخل كلمة مفتاحية صحيحة" }, { status: 400 });
    }

    if (!OR_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 503 }
      );
    }

    const prompt = `Seed keyword: "${keyword.trim()}"\nLanguage: ${lang || "auto"}\nGenerate keyword research. Return ONLY valid JSON.`;

    // Try free model first, then paid, then Google API
    let raw = await callOR(prompt, OR_MODEL);
    if (!raw) raw = await callOR(prompt, OR_PAID_MODEL);
    if (!raw && GOOGLE_KEY) raw = await callGoogle(prompt);

    if (!raw) {
      return NextResponse.json(
        { error: "جميع مزودي الخدمة غير متاحين حالياً. حاول مرة أخرى." },
        { status: 503 }
      );
    }

    const parsed = parseJSON(raw);
    if (!parsed) {
      return NextResponse.json(
        { error: "تعذر تحليل النتيجة. حاول مرة أخرى." },
        { status: 422 }
      );
    }

    if (parsed.error) return NextResponse.json(parsed, { status: 200 });
    if (!parsed.keywords || parsed.keywords.length === 0) {
      return NextResponse.json(
        { error: "لم نتمكن من توليد كلمات مفتاحية. جرب كلمة أخرى." },
        { status: 200 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("Keyword research error:", err);
    return NextResponse.json({ error: err?.message || "فشل التحليل." }, { status: 500 });
  }
}

async function callOR(prompt: string, model: string): Promise<string | null> {
  try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OR_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://adwatak.cloud",
        "X-Title": "Adwatak Keywords",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        max_tokens: 4096,
        temperature: 0.7,
      }),
      signal: AbortSignal.timeout(30000),
    });
    if (!r.ok) return null;
    return (await r.json())?.choices?.[0]?.message?.content?.trim() || null;
  } catch {
    return null;
  }
}

async function callGoogle(prompt: string): Promise<string | null> {
  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `${SYSTEM_PROMPT}\n\n${prompt}` }],
          }],
          generationConfig: { maxOutputTokens: 4096, temperature: 0.7 },
        }),
        signal: AbortSignal.timeout(30000),
      }
    );
    if (!r.ok) return null;
    return (await r.json())?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
  } catch {
    return null;
  }
}

function parseJSON(text: string): any | null {
  try { return JSON.parse(text); } catch {}
  const m = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (m) { try { return JSON.parse(m[1].trim()); } catch {} }
  for (const delim of ['{', '[']) {
    const first = text.indexOf(delim);
    const last = text.lastIndexOf(delim === '{' ? '}' : ']');
    if (first >= 0 && last > first) {
      try { return JSON.parse(text.slice(first, last + 1)); } catch {}
    }
  }
  return null;
}
