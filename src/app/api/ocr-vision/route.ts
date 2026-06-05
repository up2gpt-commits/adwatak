import { NextRequest, NextResponse } from "next/server";
import { chatCompletion, AllProvidersFailedError } from "@/app/lib/openrouter";
import { rateLimit, getClientIp } from "@/app/lib/rate-limit";

export const maxDuration = 60;

const SYSTEM_PROMPT = `You are an OCR (Optical Character Recognition) engine. Your ONLY job is to extract all text from the provided image accurately.

Rules:
- Extract ALL visible text exactly as written, preserving the original language (Arabic, English, or mixed).
- Preserve original formatting: line breaks, paragraphs, and spacing as much as possible.
- Do NOT add any commentary, explanations, or analysis.
- Do NOT describe the image.
- Do NOT translate the text.
- If the image contains no readable text, return exactly: "(لم يتم العثور على نص)"
- Return ONLY the extracted text, nothing else.`;

export async function POST(req: NextRequest) {
  // Rate limiting: 8 req / 60s per IP
  const rl = rateLimit({ key: `api:ocr-vision:${getClientIp(req)}`, max: 8, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${rl.resetIn} seconds.`, retryAfter: rl.resetIn },
      { status: 429, headers: { "Retry-After": String(rl.resetIn), "X-RateLimit-Limit": String(rl.limit), "X-RateLimit-Remaining": "0" } }
    );
  }


  try {
    const { image, lang = "ara+eng" } = await req.json();
    if (!image || typeof image !== "string") {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }
    if (!image.startsWith("data:image/")) {
      return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
    }

    const langHint = lang.includes("ara")
      ? lang.includes("eng") ? "Arabic and English" : "Arabic"
      : "English";

    const { content } = await chatCompletion({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            { type: "text", text: `Extract all text from this image. Language: ${langHint}. Return ONLY the extracted text.` },
            { type: "image_url", image_url: { url: image } },
          ],
        },
      ],
      vision: true,
      maxTokens: 3000,
      temperature: 0.1,
      timeoutMs: 55000,
    });

    const text = (content || "").trim();
    if (text === "(لم يتم العثور على نص)" || text.toLowerCase().includes("no text") || text.length === 0) {
      return NextResponse.json({ text: "" });
    }

    return NextResponse.json({
      text,
      words: text.split(/\s+/).filter((w: string) => w.length > 0).length,
    });
  } catch (err: any) {
    if (err instanceof AllProvidersFailedError) {
      console.error("OCR vision: all providers failed", err.attempts);
      return NextResponse.json(
        { error: `OCR service unavailable. Please try again later.` },
        { status: 502 }
      );
    }
    console.error("OCR Vision API error:", err);
    return NextResponse.json(
      { error: err?.message || "OCR processing failed" },
      { status: 500 }
    );
  }
}
