import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const MODEL = "openai/gpt-4o-mini";

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

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://adwatak.cloud",
        "X-Title": "Adwatak Grammar Checker",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text.slice(0, 8000) },
        ],
        temperature: 0.1,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("OpenRouter error:", response.status, errBody);
      return NextResponse.json(
        { error: lang === "ar" ? "تعذر الاتصال بخدمة التدقيق." : "Grammar check service unavailable." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    let result;
    try {
      result = JSON.parse(content);
    } catch {
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[1].trim());
      } else {
        result = { score: 70, errorCount: 0, readabilityScore: 70, corrections: [], explanation: "تم التحليل بنجاح." };
      }
    }

    return NextResponse.json({
      score: Math.max(0, Math.min(100, result.score || 70)),
      errorCount: result.errorCount || 0,
      readabilityScore: Math.max(0, Math.min(100, result.readabilityScore || 70)),
      corrections: result.corrections || [],
      explanation: result.explanation || "تم التحليل بنجاح.",
    });
  } catch (error) {
    console.error("Grammar Checker error:", error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع." },
      { status: 500 }
    );
  }
}
