import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Currency proxy error:", err);
    return NextResponse.json(
      { error: "Failed to fetch rates" },
      { status: 502 }
    );
  }
}
