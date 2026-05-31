import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = "process.env.OPENROUTER_API_KEY || """;
const MODEL = "openai/gpt-4o-mini";

export async function POST(req: NextRequest) {
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

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://adwatak.cloud",
        "X-Title": "Adwatak Plagiarism Checker",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text.slice(0, 8000) },
        ],
        temperature: 0.1,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("OpenRouter error:", response.status, errBody);
      return NextResponse.json(
        { error: lang === "ar" ? "تعذر الاتصال بخدمة التحليل." : "Analysis service unavailable." },
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
        result = { score: 50, originalScore: 50, citationIssues: [], suggestions: [], explanation: "تعذر التحليل بدقة." };
      }
    }

    return NextResponse.json({
      score: Math.max(0, Math.min(100, result.score || 50)),
      originalScore: Math.max(0, Math.min(100, result.originalScore || 50)),
      citationIssues: result.citationIssues || [],
      suggestions: result.suggestions || [],
      explanation: result.explanation || "تم التحليل بنجاح.",
    });
  } catch (error) {
    console.error("Plagiarism Checker error:", error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع." },
      { status: 500 }
    );
  }
}
