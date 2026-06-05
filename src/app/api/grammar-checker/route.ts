import { NextRequest, NextResponse } from "next/server";
import { chatCompletion, parseJSON, AllProvidersFailedError } from "@/app/lib/openrouter";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { text, lang } = await req.json();

    if (!text || text.trim().length < 10) {
      return NextResponse.json(
        { error: lang === "ar" ? "الرجاء إدخال نص" : "Please enter text" },
        { status: 400 }
      );
    }

    const systemPrompt = lang === "ar"
      ? `أنت مدقق نحوي وإملائي محترف للغة العربية. حلل النص التالي.

أعد التقييم بصيغة JSON فقط:
{
  "score": 0-100,
  "errorCount": 5,
  "readabilityScore": 0-100,
  "corrections": [
    {"original": "النص الخطأ", "suggestion": "النص الصحيح", "reason": "سبب الخطأ"}
  ],
  "explanation": "ملخص الأخطاء والتوصيات"
}
- score = جودة النص اللغوية (100 = ممتاز)
- errorCount = عدد الأخطاء المكتشفة
- readabilityScore = درجة سهولة القراءة
- corrections = مصفوفة من التصحيحات`
      : `You are a professional grammar and spelling checker for English. Analyze the following text.

Respond in JSON only:
{
  "score": 0-100,
  "errorCount": 5,
  "readabilityScore": 0-100,
  "corrections": [
    {"original": "wrong text", "suggestion": "correct text", "reason": "reason for correction"}
  ],
  "explanation": "Summary of errors and recommendations"
}
- score = language quality score (100 = excellent)
- errorCount = number of errors detected
- readabilityScore = readability ease score
- corrections = array of corrections`;

    const { content } = await chatCompletion({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text.slice(0, 8000) },
      ],
      temperature: 0.1,
      maxTokens: 1500,
      timeoutMs: 50000,
    });

    const result = parseJSON<{
      score: number;
      errorCount: number;
      readabilityScore: number;
      corrections: { original: string; suggestion: string; reason: string }[];
      explanation: string;
    }>(content) || {
      score: 70,
      errorCount: 0,
      readabilityScore: 70,
      corrections: [],
      explanation: "تم التحليل بنجاح.",
    };

    return NextResponse.json({
      score: Math.max(0, Math.min(100, result.score || 70)),
      errorCount: result.errorCount || 0,
      readabilityScore: Math.max(0, Math.min(100, result.readabilityScore || 70)),
      corrections: result.corrections || [],
      explanation: result.explanation || "تم التحليل بنجاح.",
    });
  } catch (error: any) {
    if (error instanceof AllProvidersFailedError) {
      console.error("Grammar: all providers failed", error.attempts);
      return NextResponse.json(
        { error: "Grammar check service unavailable. Please try again later." },
        { status: 502 }
      );
    }
    console.error("Grammar Checker error:", error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع." },
      { status: 500 }
    );
  }
}
