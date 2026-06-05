import { NextRequest, NextResponse } from "next/server";
import { chatCompletion, parseJSON, AllProvidersFailedError } from "@/app/lib/openrouter";

export const maxDuration = 60;

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

    const { content } = await chatCompletion({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text.slice(0, 5000) },
      ],
      temperature: 0.3,
      maxTokens: 3000,
      timeoutMs: 55000,
    });

    const parsed = parseJSON<{
      paraphrasedText: string;
      originalWordCount: number;
      newWordCount: number;
      changes: number;
      explanation: string;
    }>(content) || {
      paraphrasedText: content,
      originalWordCount: text.split(/\s+/).length,
      newWordCount: content.split(/\s+/).length,
      changes: 0,
      explanation: lang === "ar" ? "تمت إعادة الصياغة." : "Paraphrased successfully.",
    };

    return NextResponse.json({
      paraphrasedText: parsed.paraphrasedText || text,
      originalWordCount: parsed.originalWordCount || text.split(/\s+/).length,
      newWordCount: parsed.newWordCount || parsed.paraphrasedText?.split(/\s+/).length || 0,
      changes: parsed.changes || 0,
      explanation: parsed.explanation || (lang === "ar" ? "تمت إعادة الصياغة بنجاح." : "Paraphrased successfully."),
    });
  } catch (err: any) {
    if (err instanceof AllProvidersFailedError) {
      console.error("Paraphrasing: all providers failed", err.attempts);
      return NextResponse.json(
        { error: lang === "ar" ? "تعذر الاتصال بخدمة إعادة الصياغة حالياً. حاول مرة أخرى لاحقاً." : "Paraphrasing service unavailable. Please try again later." },
        { status: 502 }
      );
    }
    console.error("Paraphrasing Tool error:", err);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع." },
      { status: 500 }
    );
  }
}
