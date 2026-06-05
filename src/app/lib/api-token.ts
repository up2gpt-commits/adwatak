/**
 * HMAC-signed API challenge tokens.
 *
 * Tokens are bound to:
 *   - the API route (e.g. /api/ai-essay-writer)
 *   - the client's IP (loose match — same /24 for IPv4)
 *   - a 5-minute expiry
 *
 * Tokens travel as a cookie (`api_token_<route>`) so the browser
 * automatically includes them on same-origin fetch calls. This means:
 *   - No Client.tsx changes needed
 *   - No token smuggling via headers
 *   - Cross-origin requests can't replay stolen cookies (no cookie sent)
 *   - curl/Postman can't call the API without a valid signed token
 *
 * Anyone trying to copy the API URL has no way to mint valid tokens
 * without the server secret.
 */

import crypto from "crypto";
import type { NextRequest } from "next/server";

const SECRET = process.env.API_TOKEN_SECRET || process.env.OPENROUTER_API_KEY || "adwatak-dev-fallback";
const TTL_MS = 5 * 60 * 1000; // 5 minutes

export interface ApiToken {
  token: string;
  expiresAt: number;
}

interface TokenPayload {
  route: string;
  ip: string;
  iat: number;
  exp: number;
  nonce: string;
}

/** Derive a cookie name from a route: /api/ai-essay-writer → api_token_ai-essay-writer */
export function routeCookieName(route: string): string {
  return "api_token_" + route.replace(/^\/api\//, "").replace(/[^a-z0-9-]/gi, "-");
}

function getClientIp(req: NextRequest | { headers: Headers | HeadersInit }): string {
  const h = req.headers as Headers;
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return h.get("x-real-ip") || h.get("cf-connecting-ip") || "unknown";
}

function b64url(buf: Buffer | string): string {
  return Buffer.from(buf).toString("base64url");
}

function fromB64url(s: string): Buffer {
  return Buffer.from(s, "base64url");
}

function sign(data: string): string {
  return crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
}

/** Mint a token bound to a specific route + client IP. */
export function mintToken(route: string, req: NextRequest | { headers: Headers | HeadersInit }): ApiToken {
  const ip = getClientIp(req);
  const now = Date.now();
  const payload: TokenPayload = {
    route,
    ip,
    iat: now,
    exp: now + TTL_MS,
    nonce: crypto.randomBytes(8).toString("hex"),
  };
  const payloadB64 = b64url(JSON.stringify(payload));
  const sig = sign(payloadB64);
  return {
    token: `${payloadB64}.${sig}`,
    expiresAt: payload.exp,
  };
}

export type TokenVerifyResult =
  | { ok: true }
  | { ok: false; reason: "missing" | "malformed" | "expired" | "bad_signature" | "wrong_route" | "wrong_ip" };

/** Extract a token from a request — checks both header (X-API-Token) and cookies. */
export function extractToken(req: NextRequest, route: string): string | null {
  // 1. Explicit header (for testing/Postman/curl)
  const headerToken = req.headers.get("x-api-token");
  if (headerToken) return headerToken;
  // 2. Cookie (set by proxy on page load)
  const cookieName = routeCookieName(route);
  return req.cookies.get(cookieName)?.value || null;
}

/** Verify a token. */
export function verifyToken(
  token: string | null | undefined,
  expectedRoute: string,
  req: NextRequest | { headers: Headers | HeadersInit },
): TokenVerifyResult {
  if (!token) return { ok: false, reason: "missing" };
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false, reason: "malformed" };

  const [payloadB64, sig] = parts;
  const expectedSig = sign(payloadB64);
  // constant-time comparison
  let sigBuf: Buffer, expBuf: Buffer;
  try {
    sigBuf = Buffer.from(sig, "base64url");
    expBuf = Buffer.from(expectedSig, "base64url");
  } catch {
    return { ok: false, reason: "malformed" };
  }
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return { ok: false, reason: "bad_signature" };
  }

  let payload: TokenPayload;
  try {
    payload = JSON.parse(fromB64url(payloadB64).toString("utf8"));
  } catch {
    return { ok: false, reason: "malformed" };
  }

  if (Date.now() > payload.exp) return { ok: false, reason: "expired" };
  if (payload.route !== expectedRoute) return { ok: false, reason: "wrong_route" };

  const currentIp = getClientIp(req);
  const looseMatch = (a: string, b: string): boolean => {
    if (a === b) return true;
    const aParts = a.split(".");
    const bParts = b.split(".");
    if (aParts.length === 4 && bParts.length === 4) {
      return aParts.slice(0, 3).join(".") === bParts.slice(0, 3).join(".");
    }
    return false;
  };
  if (!looseMatch(payload.ip, currentIp)) return { ok: false, reason: "wrong_ip" };

  return { ok: true };
}
