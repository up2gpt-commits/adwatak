import { NextRequest, NextResponse } from "next/server";
import { chatCompletion, parseJSON, AllProvidersFailedError } from "@/app/lib/openrouter";
import { rateLimit, getClientIp } from "@/app/lib/rate-limit";

export const maxDuration = 60;

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
  // Rate limiting: 10 req / 60s per IP
  const rl = rateLimit({ key: `api:keyword-research:${getClientIp(req)}`, max: 10, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${rl.resetIn} seconds.`, retryAfter: rl.resetIn },
      { status: 429, headers: { "Retry-After": String(rl.resetIn), "X-RateLimit-Limit": String(rl.limit), "X-RateLimit-Remaining": "0" } }
    );
  }


  try {
    const { keyword, lang } = await req.json();
    if (!keyword || typeof keyword !== "string" || keyword.trim().length < 2) {
      return NextResponse.json({ error: "من فضلك أدخل كلمة مفتاحية صحيحة" }, { status: 400 });
    }

    const prompt = `Seed keyword: "${keyword.trim()}"\nLanguage: ${lang || "auto"}\nGenerate keyword research. Return ONLY valid JSON.`;

    const { content } = await chatCompletion({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      maxTokens: 4096,
      timeoutMs: 55000,
    });

    const parsed = parseJSON<any>(content);
    if (!parsed) {
      console.error("Keyword research parse error. Raw (first 500):", content.slice(0, 500));
      return NextResponse.json(
        { error: "تعذر تحليل النتيجة. حاول مرة أخرى." },
        { status: 422 }
      );
    }

    if (parsed.error) return NextResponse.json(parsed, { status: 200 });
    if (!parsed.keywords || !Array.isArray(parsed.keywords) || parsed.keywords.length === 0) {
      return NextResponse.json(
        { error: "لم نتمكن من توليد كلمات مفتاحية. جرب كلمة أخرى." },
        { status: 200 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    if (err instanceof AllProvidersFailedError) {
      console.error("Keyword research: all providers failed", err.attempts);
      return NextResponse.json(
        { error: "جميع مزودي الخدمة غير متاحين حالياً. حاول مرة أخرى." },
        { status: 503 }
      );
    }
    console.error("Keyword research error:", err);
    return NextResponse.json({ error: err?.message || "فشل التحليل." }, { status: 500 });
  }
}
