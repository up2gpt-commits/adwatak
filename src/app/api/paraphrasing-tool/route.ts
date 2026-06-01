import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const MODEL = "google/gemma-4-26b-a4b-it:free"; // Free model for paraphrasing

export async function POST(req: NextRequest) {
  try {
    const { text, lang } = await req.json();

    if (!text || text.trim().length < 20) {
      return NextResponse.json(
        { error: lang === "ar" ? "الرجاء إدخال نص لا يقل عن 20 حرفاً" : "Please enter at least 20 characters" },
        { status: 400 }
      );
    }

    const systemPrompt = lang === "ar"
      ? `أنت خبير في إعادة صياغة النصوص. أعد صياغة النص التالي بأسلوب مختلف مع الحفاظ على المعنى.

أعد النتيجة بصيغة JSON فقط:
{
  "paraphrasedText": "النص المعاد صياغته",
  "originalWordCount": 100,
  "newWordCount": 95,
  "changes": 8,
  "explanation": "شرح التغييرات التي تمت"
}
- paraphrasedText = النص المعاد صياغته بالكامل
- originalWordCount = عدد كلمات النص الأصلي
- newWordCount = عدد كلمات النص الجديد
- changes = عدد التغييرات الرئيسية
- explanation = شرح مختصر للتغييرات`
      : `You are a professional paraphrasing expert. Rewrite the following text in a different style while preserving the meaning.

Respond in JSON only:
{
  "paraphrasedText": "The rewritten text",
  "originalWordCount": 100,
  "newWordCount": 95,
  "changes": 8,
  "explanation": "Explanation of changes made"
}
- paraphrasedText = the complete rewritten text
- originalWordCount = word count of original
- newWordCount = word count of new version
- changes = number of major changes
- explanation = brief explanation of changes`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://adwatak.cloud",
        "X-Title": "Adwatak Paraphrasing Tool",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text.slice(0, 5000) },
        ],
        temperature: 0.3,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("OpenRouter error:", response.status, errBody);
      return NextResponse.json(
        { error: lang === "ar" ? "تعذر الاتصال بخدمة إعادة الصياغة." : "Paraphrasing service unavailable." },
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
        result = { paraphrasedText: text, originalWordCount: 0, newWordCount: 0, changes: 0, explanation: "تمت إعادة الصياغة." };
      }
    }

    return NextResponse.json({
      paraphrasedText: result.paraphrasedText || text,
      originalWordCount: result.originalWordCount || 0,
      newWordCount: result.newWordCount || 0,
      changes: result.changes || 0,
      explanation: result.explanation || "تمت إعادة الصياغة بنجاح.",
    });
  } catch (error) {
    console.error("Paraphrasing Tool error:", error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع." },
      { status: 500 }
    );
  }
}
