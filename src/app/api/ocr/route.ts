import { NextRequest, NextResponse } from "next/server";
import { createWorker } from "tesseract.js";

let workerPromise: Promise<any> | null = null;
let workerReady = false;

async function initWorker() {
  const w = await createWorker("ara+eng", 1, { logger: () => {} });
  workerReady = true;
  return w;
}

// Start initialization immediately on cold start
function getWorkerPromise() {
  if (!workerPromise) {
    workerPromise = initWorker();
  }
  return workerPromise;
}

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { image, lang = "ara+eng" } = await req.json();
    if (!image || typeof image !== "string") {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }
    if (!image.startsWith("data:image/")) {
      return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
    }

    // Check if worker is ready
    if (!workerReady) {
      getWorkerPromise(); // Kick off initialization if not started
      return NextResponse.json(
        { status: "initializing", message: "جاري تحميل محرك OCR، حاول مرة أخرى بعد قليل" },
        { status: 202 }
      );
    }

    let w;
    try {
      w = await workerPromise;
    } catch {
      // Previous init failed — reset and retry
      workerPromise = null;
      workerReady = false;
      return NextResponse.json(
        { status: "initializing", message: "جاري إعادة تحميل المحرك" },
        { status: 202 }
      );
    }

    // Handle language change
    const currentLangs: string[] = w.currentLangs || [];
    const requestedLangs = lang.split("+");
    const needsReinit = requestedLangs.some((l: string) => !currentLangs.includes(l));
    if (needsReinit) {
      await w.reinitialize(lang);
    }

    const { data } = await w.recognize(image);
    const text = data.text || "";

    return NextResponse.json({
      text,
      words: text.split(/\s+/).filter((x: string) => x.length > 0).length,
    });
  } catch (err: any) {
    console.error("OCR API error:", err);
    // Reset worker on error
    workerPromise = null;
    workerReady = false;
    return NextResponse.json(
      { error: err?.message || "OCR processing failed" },
      { status: 500 }
    );
  }
}
