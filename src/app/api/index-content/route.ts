import { NextRequest, NextResponse } from "next/server";

const INDEXCEPTIONAL_API_URL = "https://api.indexceptional.com/v1/index";

export async function POST(req: NextRequest) {
  try {
    const { urls, lang } = await req.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: lang === "ar" ? "الرجاء إدخال رابط واحد على الأقل" : "Please provide at least one URL" },
        { status: 400 }
      );
    }

    // Validate URLs
    const validUrls = urls.filter((u) => u.match(/^https?:\/\/.+/));
    if (validUrls.length === 0) {
      return NextResponse.json(
        { error: lang === "ar" ? "الرجاء إدخال روابط صحيحة" : "Please provide valid URLs" },
        { status: 400 }
      );
    }

    // Submit to Indexceptional API
    const results = await Promise.allSettled(
      validUrls.map(async (url) => {
        const res = await fetch(INDEXCEPTIONAL_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
          signal: AbortSignal.timeout(30000),
        });
        return { url, status: res.status, ok: res.ok };
      })
    );

    const indexed = results
      .filter((r) => r.status === "fulfilled")
      .map((r) => (r as PromiseFulfilledResult<{ url: string; status: number; ok: boolean }>)
      );

    const failed = results
      .filter((r) => r.status === "rejected")
      .map((_, i) => validUrls[i]);

    return NextResponse.json({
      success: true,
      submitted: validUrls.length,
      indexed: indexed.filter((r) => r.value.ok).length,
      failed: failed.length + indexed.filter((r) => !r.value.ok).length,
      results: indexed.map((r) => r.value),
      urls: validUrls,
    });

  } catch (err: any) {
    console.error("Indexing error:", err);
    return NextResponse.json({ error: "Indexing service error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "/api/index-content",
    method: "POST",
    description: "Submit URLs to Indexceptional for faster Google indexing",
    parameters: {
      urls: "Array of URLs to index",
      lang: "Language: en or ar",
    },
  });
}
