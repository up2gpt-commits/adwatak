import { NextRequest, NextResponse } from "next/server";
import projectMemory from "../../data/project-memory.json";
import { rateLimit, getClientIp } from "@/app/lib/rate-limit";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const MODEL = "google/gemini-2.0-flash-001:free";

interface ArticleRequest {
  keyword: string;
  caseStudy?: string;
  count?: number;
  lang?: string;
  angle?: string;
}

function buildArticlePrompt(keyword: string, caseStudy: string, count: number, lang: string, angle: string): string {
  const isAr = lang === "ar";
  const memory = projectMemory;

  const prompt = isAr
    ? `أنت خبير محتوى SEO تعمل على موقع ${memory.project.domain} — ${memory.project.description}

معلومات المشروع:
${JSON.stringify(memory.project, null, 2)}

استراتيجية المحتوى:
${memory.contentStrategy.pillars.join("\n")}

🎯 المطلوب: أنشئ ${count} مقالة SEO احترافية ومتفردة حول الكلمة المفتاحية: "${keyword}"

${caseStudy ? `📋 Case Study لإضافته للمحتوى:\n${caseStudy}\n` : ""}
${angle ? `📐 زاوية المقال: ${angle}` : ""}

الشروط:
1. كل مقال يجب أن يكون بزاوية مختلفة عن الباقي
2. لغة طبيعية — ليست robotic أو AI-like
3. يتضمن: Title Tag (60 حرف)، Meta Description (160 حرف)، H1، مقدمة، جسم (H2/H3)، خاتمة، FAQ (5 أسئلة)
4. روابط داخلية ذات صلة بأدوات الموقع
5. الكلمة المفتاحية في أول 100 كلمة و3-5 مرات في المقال
6. Schema markup suggestion (Article, FAQPage)
7. طول المقال: 800-1500 كلمة
8. Call to Action في النهاية

أعد الإجابة بصيغة JSON بهذا الشكل:
{"articles":[{"title":"","metaDescription":"","slug":"","content":"(HTML)","keywords":[],"schemaType":"Article","wordCount":0,"angle":""}]}`
    : `You are an SEO content expert working on ${memory.project.domain} — ${memory.project.description}

Project Info:
${JSON.stringify(memory.project, null, 2)}

Content Strategy:
${memory.contentStrategy.pillars.join("\n")}

🎯 Task: Create ${count} unique, professional SEO articles targeting the keyword: "${keyword}"

${caseStudy ? `📋 Case Study to incorporate:\n${caseStudy}\n` : ""}
${angle ? `📐 Article angle: ${angle}` : ""}

Requirements:
1. Each article must have a DIFFERENT angle/approach
2. Natural, human-like writing — not robotic or AI-sounding
3. Include: Title Tag (60 chars), Meta Description (160 chars), H1, intro, body (H2/H3), conclusion, FAQ (5 questions)
4. Internal links to relevant tools on the site
5. Keyword in first 100 words and 3-5 times throughout
6. Schema markup suggestion (Article, FAQPage)
7. Article length: 800-1500 words — comprehensive and detailed
8. Call to Action at the end
9. Each article should be unique enough to rank separately for the same keyword

Respond in JSON format:
{"articles":[{"title":"","metaDescription":"","slug":"","content":"(HTML)","keywords":[],"schemaType":"Article","wordCount":0,"angle":""}]}`;

  return prompt;
}

export async function POST(req: NextRequest) {
  // Rate limiting: 8 req / 60s per IP
  const rl = rateLimit({ key: `api:seo-content-generator:${getClientIp(req)}`, max: 8, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${rl.resetIn} seconds.`, retryAfter: rl.resetIn },
      { status: 429, headers: { "Retry-After": String(rl.resetIn), "X-RateLimit-Limit": String(rl.limit), "X-RateLimit-Remaining": "0" } }
    );
  }


  try {
    const body: ArticleRequest = await req.json();
    const { keyword, caseStudy = "", count = 5, lang = "en", angle = "" } = body;

    if (!keyword || keyword.length < 3) {
      return NextResponse.json(
        { error: lang === "ar" ? "الرجاء إدخال كلمة مفتاحية (3 أحرف على الأقل)" : "Please enter a keyword (at least 3 characters)" },
        { status: 400 }
      );
    }

    const prompt = buildArticlePrompt(keyword, caseStudy, Math.min(count, 5), lang, angle);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://adwatak.cloud",
        "X-Title": "Adwatak SEO Content Generator",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You are an expert SEO content writer. Always respond with valid JSON only. No markdown, no code fences, no extra text." },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
        max_tokens: 16000,
      }),
      signal: AbortSignal.timeout(120000),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter error:", response.status, errText);
      return NextResponse.json(
        { error: lang === "ar" ? "حدث خطأ أثناء توليد المقالات. حاول مرة أخرى." : "Error generating articles. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: lang === "ar" ? "لم يتم توليد محتوى. حاول مرة أخرى." : "No content generated. Please try again." },
        { status: 502 }
      );
    }

    // Parse JSON from response
    let parsed;
    try {
      // Try to extract JSON from response (handle code fences)
      const jsonMatch = content.match(/\{[\s\S]*"articles"[\s\S]*\}/);
      parsed = JSON.parse(jsonMatch ? jsonMatch[0] : content);
    } catch (e) {
      console.error("JSON parse error:", content.slice(0, 500));
      return NextResponse.json(
        { error: lang === "ar" ? "خطأ في تحليل الرد. حاول مرة أخرى." : "Error parsing response. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      keyword,
      count: parsed.articles?.length || 0,
      articles: parsed.articles || [],
      model: MODEL,
      lang,
    });

  } catch (err: any) {
    console.error("SEO Content Generator error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "/api/seo-content-generator",
    method: "POST",
    description: "Generate SEO-optimized articles from a keyword",
    parameters: {
      keyword: "Target keyword (required)",
      caseStudy: "Optional case study content",
      count: "Number of articles (1-5, default 5)",
      lang: "Language: en or ar",
      angle: "Optional specific angle",
    },
  });
}
