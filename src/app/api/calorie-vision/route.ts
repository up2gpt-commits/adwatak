import { NextRequest, NextResponse } from "next/server";

const OR_KEY = process.env.OPENROUTER_API_KEY || "";
const MODEL = "google/gemma-4-26b-a4b-it";

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

function parseJSON(text: string): any | null {
  try { return JSON.parse(text); } catch {}
  const m = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (m) { try { return JSON.parse(m[1].trim()); } catch {} }
  for (const delim of ['{', '[']) {
    const first = text.indexOf(delim);
    const last = text.lastIndexOf(delim === '{' ? '}' : ']');
    if (first >= 0 && last > first) {
      try { return JSON.parse(text.slice(first, last + 1)); } catch {}
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();
    if (!image || typeof image !== "string")
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    if (!image.startsWith("data:image/"))
      return NextResponse.json({ error: "Invalid image format" }, { status: 400 });

    if (!OR_KEY) {
      return NextResponse.json(
        { error: "لم يتم إعداد مفتاح API. أضف OPENROUTER_API_KEY في إعدادات Vercel." },
        { status: 503 }
      );
    }

    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OR_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://adwatak.cloud",
        "X-Title": "Adwatak Food",
      },
      body: JSON.stringify({
        model: MODEL,
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
        max_tokens: 4096,
        temperature: 0.1,
      }),
      signal: AbortSignal.timeout(35000),
    });

    if (!r.ok) {
      const errText = await r.text().catch(() => "");
      console.error(`OR ${r.status}: ${errText.slice(0, 200)}`);
      return NextResponse.json(
        { error: `مزود الخدمة غير متاح (${r.status}). حاول مرة أخرى.` },
        { status: 503 }
      );
    }

    const raw = (await r.json())?.choices?.[0]?.message?.content?.trim();
    if (!raw) {
      return NextResponse.json(
        { error: "لم نحصل على رد من مزود الخدمة. حاول مرة أخرى." },
        { status: 503 }
      );
    }

    const parsed = parseJSON(raw);
    if (!parsed) {
      console.error("Parse error:", raw.slice(0, 500));
      return NextResponse.json(
        { error: "لم نتمكن من تحليل الصورة. جرب صورة أوضح." },
        { status: 422 }
      );
    }

    if (parsed.error) return NextResponse.json(parsed, { status: 200 });
    if (!parsed.items || parsed.items.length === 0)
      return NextResponse.json({ error: "لم يتم التعرف على طعام في الصورة." }, { status: 200 });

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("Calorie vision error:", err);
    return NextResponse.json({ error: err?.message || "فشل التحليل." }, { status: 500 });
  }
}
