import { NextRequest, NextResponse } from "next/server";
import { chatCompletion, parseJSON, AllProvidersFailedError } from "@/app/lib/openrouter";
import { rateLimit, getClientIp } from "@/app/lib/rate-limit";

export const maxDuration = 60;

const SYSTEM_PROMPT = `You are a professional nutritionist AI. Analyze food in the provided image and return ONLY valid JSON. No markdown, no explanations, no code fences.

Rules:
- Identify ALL visible food items in the image
- Estimate portion sizes (grams, cups, pieces) based on visual cues
- Calculate estimated calories for each item
- Provide total calories and estimated macros (protein, carbs, fat in grams)
- Use standard nutritional databases (USDA, MyFitnessPal) for accuracy
- Return Arabic food names in nameAr field (IMPORTANT for Arabic users)
- If image contains no food, return: {"error":"No food detected"}

Return format EXACTLY:
{
  "items": [
    {
      "name": "Food item name",
      "nameAr": "اسم الطعام بالعربية",
      "portion": "estimated portion (e.g. 150g, 1 cup, 2 slices)",
      "calories": <number>,
      "protein": <number>,
      "carbs": <number>,
      "fat": <number>,
      "confidence": "high|medium|low"
    }
  ],
  "totalCalories": <number>,
  "totalProtein": <number>,
  "totalCarbs": <number>,
  "totalFat": <number>,
  "mealType": "breakfast|lunch|dinner|snack|unknown",
  "summary": "1-2 sentence nutritional assessment in English",
  "summaryAr": "تقييم غذائي مختصر بالعربية من جملة أو اثنتين"
}`;

export async function POST(req: NextRequest) {
  // Rate limiting: 8 req / 60s per IP
  const rl = rateLimit({ key: `api:calorie-vision:${getClientIp(req)}`, max: 8, windowSec: 60 });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${rl.resetIn} seconds.`, retryAfter: rl.resetIn },
      { status: 429, headers: { "Retry-After": String(rl.resetIn), "X-RateLimit-Limit": String(rl.limit), "X-RateLimit-Remaining": "0" } }
    );
  }


  try {
    const { image } = await req.json();
    if (!image || typeof image !== "string")
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    if (!image.startsWith("data:image/"))
      return NextResponse.json({ error: "Invalid image format" }, { status: 400 });

    const { content } = await chatCompletion({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze food image. Return ONLY valid JSON." },
            { type: "image_url", image_url: { url: image } },
          ],
        },
      ],
      vision: true,
      maxTokens: 3000,
      temperature: 0.1,
      timeoutMs: 55000,
    });

    const parsed = parseJSON<any>(content);
    if (!parsed) {
      console.error("Calorie vision parse error. Raw (first 500):", content.slice(0, 500));
      return NextResponse.json(
        { error: "لم نتمكن من تحليل الصورة. جرب صورة أوضح." },
        { status: 422 }
      );
    }

    if (parsed.error) return NextResponse.json(parsed, { status: 200 });
    if (!parsed.items || !Array.isArray(parsed.items) || parsed.items.length === 0) {
      return NextResponse.json({ error: "لم يتم التعرف على طعام في الصورة." }, { status: 200 });
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    if (err instanceof AllProvidersFailedError) {
      console.error("Calorie vision: all providers failed", err.attempts);
      return NextResponse.json(
        { error: "جميع مزودي خدمة تحليل الصور غير متاحين حالياً. حاول مرة أخرى." },
        { status: 503 }
      );
    }
    console.error("Calorie vision error:", err);
    return NextResponse.json({ error: err?.message || "فشل التحليل." }, { status: 500 });
  }
}
