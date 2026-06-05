/**
 * Edge middleware: protects /api/* routes
 *  - Locks CORS to known origins
 *  - Rejects oversized request bodies
 *  - Adds security headers
 */

import { NextRequest, NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "https://adwatak.cloud",
  "https://www.adwatak.cloud",
  "https://adawatak-up2gpt-8789s-projects.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3007",
];

// Max body size for API routes (10 MB — enough for vision uploads, blocks abuse)
const MAX_BODY_SIZE = 10 * 1024 * 1024;

export const config = {
  matcher: "/api/:path*",
};

export function middleware(req: NextRequest) {
  // 1. CORS preflight
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders(req),
    });
  }

  // 2. Block oversized bodies
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
    return NextResponse.json(
      { error: "Request body too large" },
      { status: 413 }
    );
  }

  // 3. Block unknown origins (only same-origin or whitelisted)
  const origin = req.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    // Allow no-origin (same-origin GET, server-to-server, curl)
    // but reject cross-origin browser fetches from unknown domains
    return NextResponse.json(
      { error: "Origin not allowed" },
      { status: 403, headers: corsHeaders(req) }
    );
  }

  // 4. Add security headers + CORS to response
  const res = NextResponse.next();
  const cors = corsHeaders(req);
  for (const [k, v] of Object.entries(cors)) {
    if (v) res.headers.set(k, v);
  }
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return res;
}

function corsHeaders(req: NextRequest): Record<string, string> {
  const origin = req.headers.get("origin");
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}
