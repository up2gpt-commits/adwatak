import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || "";

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
  try {
    const { image, lang = "ara+eng" } = await req.json();
    if (!image || typeof image !== "string") {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }
    if (!image.startsWith("data:image/")) {
      return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
    }

    // Use the language parameter to adjust the system prompt
    const langHint = lang.includes("ara")
      ? lang.includes("eng")
        ? "Arabic and English"
        : "Arabic"
      : "English";

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://adwatak.cloud",
          "X-Title": "Adwatak OCR",
        },
        body: JSON.stringify({
          model: "qwen/qwen3-vl-8b-instruct",
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Extract all text from this image. Language: ${langHint}. Return ONLY the extracted text.`,
                },
                {
                  type: "image_url",
                  image_url: { url: image },
                },
              ],
            },
          ],
          max_tokens: 4096,
          temperature: 0.1,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error("OpenRouter API error:", response.status, errorText.slice(0, 200));
      return NextResponse.json(
        { error: `OCR service error (${response.status})` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content?.trim() || "";

    // If the model says no text found
    if (text === "(لم يتم العثور على نص)" || text.includes("no text") || text.length === 0) {
      return NextResponse.json({ text: "" });
    }

    return NextResponse.json({
      text,
      words: text.split(/\s+/).filter((w: string) => w.length > 0).length,
    });
  } catch (err: any) {
    console.error("OCR Vision API error:", err);
    return NextResponse.json(
      { error: err?.message || "OCR processing failed" },
      { status: 500 }
    );
  }
}
