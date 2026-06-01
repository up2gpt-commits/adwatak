import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const MODEL = "google/gemma-4-26b-a4b-it:free"; // Free model supporting Arabic

export async function POST(req: NextRequest) {
  try {
    const { url, lang } = await req.json();

    if (!url || !url.match(/^https?:\/\/.+/)) {
      return NextResponse.json(
        { error: lang === "ar" ? "الرجاء إدخال رابط صحيح يبدأ بـ http:// أو https://" : "Please enter a valid URL starting with http:// or https://" },
        { status: 400 }
      );
    }

    // Fetch the page
    let pageHtml: string;
    let pageTitle: string;
    let statusCode: number;

    try {
      const pageRes = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; AdwatakSEO/1.0; +https://adwatak.cloud)" },
        signal: AbortSignal.timeout(15000),
      });
      statusCode = pageRes.status;
      pageHtml = await pageRes.text();
      pageTitle = pageHtml.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() || "";
    } catch (fetchErr: any) {
      return NextResponse.json(
        { error: lang === "ar" ? `تعذر الوصول إلى ${url}. تأكد من صحة الرابط.` : `Could not reach ${url}. Check the URL.` },
        { status: 502 }
      );
    }

    if (pageHtml.length > 50000) {
      pageHtml = pageHtml.slice(0, 50000);
    }

    // Prepare key SEO metrics extracted server-side
    const metaDescription = pageHtml.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1] || "";
    const ogTitle = pageHtml.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i)?.[1] || "";
    const ogDesc = pageHtml.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i)?.[1] || "";
    const ogImage = pageHtml.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)?.[1] || "";
    const canonical = pageHtml.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1] || "";
    const h1Tags = [...pageHtml.matchAll(/<h1[^>]*>([^<]+)<\/h1>/gi)].map(m => m[1].trim());
    const h2Count = (pageHtml.match(/<h2[^>]*>/gi) || []).length;
    const imgTags = pageHtml.match(/<img[^>]+>/gi) || [];
    const imgWithoutAlt = imgTags.filter(img => !img.includes("alt=")).length;
    const wordsOnPage = pageHtml.replace(/<[^>]+>/g, " ").split(/\s+/).filter(w => w.length > 0).length;
    const hasSchema = pageHtml.includes('"@context"') || pageHtml.includes('application/ld+json');
    const hasViewport = pageHtml.includes('name="viewport"');
    const hasFavicon = pageHtml.includes('rel="icon"') || pageHtml.includes('rel="shortcut icon"');
    const hasHreflang = pageHtml.includes('rel="alternate"') && pageHtml.includes('hreflang');
    const hasRobots = pageHtml.includes('name="robots"');
    const internalLinks = [...pageHtml.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>/gi)]
      .filter(m => m[1].startsWith("/") || m[1].startsWith(url.replace(/\/$/,""))).length;
    const externalLinks = [...pageHtml.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>/gi)]
      .filter(m => m[1].startsWith("http") && !m[1].startsWith(url.replace(/\/$/,""))).length;
    const headingStructureIssue = h1Tags.length === 0 ? "no-h1" : h1Tags.length > 1 ? "multiple-h1" : "good";

    // Build prompt for AI
    const systemPrompt = lang === "ar"
      ? `أنت خبير SEO محترف. حلل بيانات الموقع التالية وقدم تقييماً دقيقاً.

أعد التقييم بصيغة JSON فقط:
{
  "score": 0-100,
  "strengths": ["نقطة قوة 1", "نقطة قوة 2"],
  "weaknesses": ["نقطة ضعف 1", "نقطة ضعف 2"],
  "recommendations": ["توصية 1", "توصية 2"],
  "details": {
    "title": {"value": "...", "status": "good|warning|bad"},
    "metaDescription": {"value": "...", "status": "good|warning|bad"},
    "headings": {"value": "...", "status": "good|warning|bad"},
    "images": {"value": "...", "status": "good|warning|bad"},
    "content": {"value": "...", "status": "good|warning|bad"},
    "technical": {"value": "...", "status": "good|warning|bad"},
    "links": {"value": "...", "status": "good|warning|bad"},
    "schema": {"value": "...", "status": "good|warning|bad"}
  }
}`

      : `You are a professional SEO expert. Analyze the following website data and provide an accurate evaluation.

Respond in JSON only:
{
  "score": 0-100,
  "strengths": ["Strength 1", "Strength 2"],
  "weaknesses": ["Weakness 1", "Weakness 2"],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "details": {
    "title": {"value": "...", "status": "good|warning|bad"},
    "metaDescription": {"value": "...", "status": "good|warning|bad"},
    "headings": {"value": "...", "status": "good|warning|bad"},
    "images": {"value": "...", "status": "good|warning|bad"},
    "content": {"value": "...", "status": "good|warning|bad"},
    "technical": {"value": "...", "status": "good|warning|bad"},
    "links": {"value": "...", "status": "good|warning|bad"},
    "schema": {"value": "...", "status": "good|warning|bad"}
  }
}`;

    const analysisData = {
      url,
      statusCode,
      pageTitle,
      metaDescription,
      ogTitle,
      ogDesc,
      canonical,
      wordCount: wordsOnPage,
      h1Tags,
      h2Count,
      totalImages: imgTags.length,
      imagesWithoutAlt: imgWithoutAlt,
      hasSchema,
      hasViewport,
      hasFavicon,
      hasHreflang,
      hasRobots,
      internalLinks,
      externalLinks,
      headingStructureIssue,
      htmlSnippet: pageHtml.slice(0, 4000),
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://adwatak.cloud",
        "X-Title": "Adwatak SEO Audit",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: JSON.stringify(analysisData, null, 2) },
        ],
        temperature: 0.1,
        max_tokens: 1500,
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

    // Parse JSON
    let result;
    try {
      result = JSON.parse(content);
    } catch {
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[1].trim());
      } else {
        result = { score: 50, strengths: [], weaknesses: [], recommendations: [], details: {} };
      }
    }

    // Add raw SEO data
    result.rawData = {
      pageTitle,
      metaDescription,
      statusCode,
      wordCount: wordsOnPage,
      h1Count: h1Tags.length,
      h2Count,
      totalImages: imgTags.length,
      imagesWithoutAlt: imgWithoutAlt,
      internalLinks,
      externalLinks,
      hasSchema,
      hasViewport,
      hasFavicon,
      hasCanonical: !!canonical,
      hasHreflang,
      hasRobotsMeta: hasRobots,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("SEO Audit error:", error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع." },
      { status: 500 }
    );
  }
}
