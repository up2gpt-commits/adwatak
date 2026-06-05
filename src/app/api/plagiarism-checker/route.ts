import { NextRequest, NextResponse } from "next/server";
import { chatCompletion, parseJSON, AllProvidersFailedError } from "@/app/lib/openrouter";
import { rateLimit, getClientIp } from "@/app/lib/rate-limit";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  // Rate limiting: 10 req / 60s per IP
  const rl = rateLimit({ key: `api:plagiarism-checker:${getClientIp(req)}`, max: 10, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${rl.resetIn} seconds.`, retryAfter: rl.resetIn },
      { status: 429, headers: { "Retry-After": String(rl.resetIn), "X-RateLimit-Limit": String(rl.limit), "X-RateLimit-Remaining": "0" } }
    );
  }


  try {
    const { text, lang } = await req.json();

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { error: lang === "ar" ? "الرجاء إدخال نص لا يقل عن 50 حرفاً" : "Please enter at least 50 characters" },
        { status: 400 }
      );
    }

    const systemPrompt = lang === "ar"
      ? `أنت خبير في كشف الانتحال الأدبي. حلل النص التالي وأعطني تقييماً دقيقاً.

أعد التقييم بصيغة JSON فقط:
{
  "score": 0-100,
  "originalScore": 0-100,
  "citationIssues": ["مشكلة 1", "مشكلة 2"],
  "suggestions": ["اقتراح 1", "اقتراح 2"],
  "explanation": "شرح مختصر للتقييم"
}
- score = نسبة احتمال وجود انتحال (كلما زادت زاد احتمال الانتحال)
- originalScore = مدى أصالة المحتوى
- citationIssues = مشاكل التوثيق والاقتباس
- suggestions = اقتراحات للتحسين`
      : `You are a plagiarism detection expert. Analyze the following text and provide an accurate evaluation.

Respond in JSON only:
{
  "score": 0-100,
  "originalScore": 0-100,
  "citationIssues": ["Issue 1", "Issue 2"],
  "suggestions": ["Suggestion 1", "Suggestion 2"],
  "explanation": "Brief explanation of the evaluation"
}
- score = probability of plagiarism (higher = more likely plagiarized)
- originalScore = content originality score
- citationIssues = citation and reference issues found
- suggestions = improvement suggestions`;

    const { content } = await chatCompletion({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text.slice(0, 8000) },
      ],
      temperature: 0.1,
      maxTokens: 1000,
      timeoutMs: 50000,
    });

    const result = parseJSON<{
      score: number;
      originalScore: number;
      citationIssues: string[];
      suggestions: string[];
      explanation: string;
    }>(content) || {
      score: 50,
      originalScore: 50,
      citationIssues: [],
      suggestions: [],
      explanation: "تم التحليل.",
    };

    return NextResponse.json({
      score: Math.max(0, Math.min(100, result.score || 50)),
      originalScore: Math.max(0, Math.min(100, result.originalScore || 50)),
      citationIssues: result.citationIssues || [],
      suggestions: result.suggestions || [],
      explanation: result.explanation || "تم التحليل بنجاح.",
    });
  } catch (error: any) {
    if (error instanceof AllProvidersFailedError) {
      console.error("Plagiarism: all providers failed", error.attempts);
      return NextResponse.json(
        { error: "Analysis service unavailable. Please try again later." },
        { status: 502 }
      );
    }
    console.error("Plagiarism Checker error:", error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع." },
      { status: 500 }
    );
  }
}
