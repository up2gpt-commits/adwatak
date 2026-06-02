import { NextRequest, NextResponse } from "next/server";

const NEWSLETTER_API_KEY = process.env.NEWSLETTER_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "الرجاء إدخال بريد إلكتروني صحيح" },
        { status: 400 }
      );
    }

    // Log subscription
    console.log(`[NEWSLETTER] New subscriber: ${email} at ${new Date().toISOString()}`);

    // If Resend API key is configured, send confirmation
    if (NEWSLETTER_API_KEY) {
      try {
        await fetch("https://api.resend.com/audiences/adwatak/contacts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${NEWSLETTER_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
      } catch (apiErr) {
        console.error("[NEWSLETTER] Resend API error:", apiErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[NEWSLETTER] Error:", err);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع" },
      { status: 500 }
    );
  }
}
