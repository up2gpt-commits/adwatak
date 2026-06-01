import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const MODEL = "google/gemma-4-26b-a4b-it:free"; // Free model supporting Arabic + English

export async function POST(req: NextRequest) {
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

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://adwatak.cloud",
          "X-Title": "Adwatak AI Content Detector",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: text.slice(0, 10000) }, // Limit text
          ],
          temperature: 0.1, // Low temp for consistent results
          max_tokens: 500,
        }),
      }
    );

    if (!response.ok) {
      const errBody = await response.text();
      console.error("OpenRouter error:", response.status, errBody);
      return NextResponse.json(
        { error: "تعذر الاتصال بخدمة التحليل. حاول مرة أخرى." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Parse the JSON response from the model
    let result;
    try {
      // Try direct parse
      result = JSON.parse(content);
    } catch {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[1].trim());
      } else {
        // Last resort: extract score with regex
        const scoreMatch = content.match(/["']?score["']?\s*[:=]\s*(\d+)/i);
        const explanationMatch = content.match(/["']?explanation["']?\s*[:=]\s*["']([^"']+)["']/i);
        result = {
          score: scoreMatch ? parseInt(scoreMatch[1]) : 50,
          explanation: explanationMatch
            ? explanationMatch[1]
            : "تعذر تحليل النص بدقة. حاول مرة أخرى بنص مختلف.",
        };
      }
    }

    return NextResponse.json({
      score: Math.max(0, Math.min(100, result.score || 50)),
      explanation: result.explanation || "تم التحليل بنجاح.",
    });
  } catch (error) {
    console.error("AI Content Detector error:", error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع. حاول مرة أخرى." },
      { status: 500 }
    );
  }
}
