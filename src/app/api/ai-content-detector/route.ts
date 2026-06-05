import { NextRequest, NextResponse } from "next/server";
import { chatCompletion, parseJSON, AllProvidersFailedError } from "@/app/lib/openrouter";
import { rateLimit, getClientIp } from "@/app/lib/rate-limit";
import { extractToken, verifyToken } from "@/app/lib/api-token";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  // Token gate: reject requests without a valid signed API token
  // (Token is set as a cookie when the user loads the /tools/<name> page,
  //  or sent via X-API-Token header for testing/Postman.)
  const token = extractToken(req, "/api/ai-content-detector");
  const tv = verifyToken(token, "/api/ai-content-detector", req);
  if (!tv.ok) {
    console.warn(`[api:ai-content-detector] token rejected:`, tv.reason);
    return NextResponse.json(
      { error: "Invalid or missing API token. Please reload the page.", reason: tv.reason },
      { status: 401 }
    );
  }

  // Rate limiting: 15 req / 60s per IP
  const rl = rateLimit({ key: `api:ai-content-detector:${getClientIp(req)}`, max: 15, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${rl.resetIn} seconds.`, retryAfter: rl.resetIn },
      { status: 429, headers: { "Retry-After": String(rl.resetIn), "X-RateLimit-Limit": String(rl.limit), "X-RateLimit-Remaining": "0" } }
    );
  }


  try {
    const { text, lang } = await req.json();

    if (!text || text.trim().length < 20) {
      return NextResponse.json(
        { error: "الرجاء إدخال نص لا يقل عن 20 حرفاً" },
        { status: 400 }
      );
    }

    const systemPrompt = lang === "ar"
      ? `أنت خبير في كشف المحتوى المولّد بالذكاء الاصطناعي. حلل النص التالي وأعطني:
1. نسبة احتمالية أن يكون من إنشاء AI (من 0 إلى 100)
2. شرح مختصر (جملتين) لسبب التقييم

يجب أن يكون الرد بصيغة JSON فقط:
{"score": 85, "explanation": "النص يظهر أنماطاً متكررة..."}`

      : `You are an AI content detection expert. Analyze the following text and provide:
1. Probability score (0-100) that it's AI-generated
2. Brief 2-sentence explanation

Respond in JSON only:
{"score": 85, "explanation": "The text shows repetitive patterns..."}`;

    const { content } = await chatCompletion({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text.slice(0, 10000) },
      ],
      temperature: 0.1,
      maxTokens: 500,
      timeoutMs: 40000,
    });

    // Parse with multiple fallbacks (parseJSON handles markdown + raw extraction)
    const result = parseJSON<{ score: number; explanation: string }>(content) || {
      score: 50,
      explanation: "تعذر تحليل النص بدقة. حاول مرة أخرى بنص مختلف.",
    };

    return NextResponse.json({
      score: Math.max(0, Math.min(100, result.score || 50)),
      explanation: result.explanation || "تم التحليل بنجاح.",
    });
  } catch (error: any) {
    if (error instanceof AllProvidersFailedError) {
      console.error("AI detector: all providers failed", error.attempts);
      return NextResponse.json(
        { error: "تعذر الاتصال بخدمة التحليل. حاول مرة أخرى." },
        { status: 502 }
      );
    }
    console.error("AI Content Detector error:", error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع. حاول مرة أخرى." },
      { status: 500 }
    );
  }
}
