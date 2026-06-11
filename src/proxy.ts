import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy (Next.js 16 — renamed from Middleware)
 *
 * Auto-detects visitor language using:
 * 1️⃣ Cookie (lang) — respects previous choice
 * 2️⃣ Browser Accept-Language header
 * 3️⃣ Geo-IP country (from Vercel x-vercel-ip-country header)
 *
 * Only triggers auto-detect on entry pages (/, /en, /tr).
 * Deep links are never redirected — shared URLs work.
 */

// ── Constants ────────────────────────────────────────────────────

const LOCALES = ["ar", "en", "tr", "id", "fr"] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = "ar";

/** Countries where Arabic is the primary language */
const ARABIC_COUNTRIES = new Set([
  "SA", "AE", "EG", "IQ", "JO", "KW", "LB", "LY", "MA", "OM",
  "QA", "SD", "SY", "TN", "YE", "PS", "BH", "MR", "SO", "DJ",
]);

/** Country → locale mapping (non-Arabic overrides) */
const COUNTRY_LOCALE: Record<string, Locale> = {
  TR: "tr",
  ID: "id",
  FR: "fr",
  SN: "fr",
  ML: "fr",
  NE: "fr",
  CI: "fr",
  GN: "fr",
  BF: "fr",
  BJ: "fr",
  TG: "fr",
  CD: "fr",
  CM: "fr",
};

const COOKIE_NAME = "lang";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

// ── Helpers ──────────────────────────────────────────────────────

/** Extract locale prefix from pathname: "/en/tools/sth" → "en" */
function getPathLocale(pathname: string): Locale | null {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;
  const first = segments[0].toLowerCase();
  return LOCALES.includes(first as Locale) ? (first as Locale) : null;
}

/** Build a new path switching to target locale */
function switchPath(
  pathname: string,
  currentLang: Locale | null,
  newLang: Locale,
): string {
  const segments = pathname.split("/").filter(Boolean);

  if (newLang === "ar") {
    if (currentLang && LOCALES.includes(currentLang)) {
      return "/" + segments.slice(1).join("/");
    }
    return pathname;
  }

  if (currentLang === "ar" || currentLang === null) {
    return "/" + newLang + pathname;
  }

  segments[0] = newLang;
  return "/" + segments.join("/");
}

/** Detect locale from Accept-Language browser header */
function detectFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;

  const parsed = header
    .split(",")
    .map((entry) => {
      const [locale = "", q = "1"] = entry.trim().split(";q=");
      return {
        code: locale.split("-")[0].toLowerCase() as Locale,
        q: parseFloat(q) || 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { code } of parsed) {
    if (LOCALES.includes(code)) return code;
  }
  return null;
}

/** Detect locale from geo-IP country code */
function detectFromGeo(country: string | null): Locale | null {
  if (!country) return null;
  if (ARABIC_COUNTRIES.has(country)) return "ar";
  return COUNTRY_LOCALE[country] || null;
}

/** Known search engine crawlers — skip auto-redirect for SEO */
const CRAWLERS = [
  "googlebot", "bingbot", "slurp", "duckduckbot", "baiduspider",
  "yandexbot", "facebookexternalhit", "twitterbot", "applebot",
];

function isCrawler(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return CRAWLERS.some((bot) => ua.includes(bot));
}

/** Set lang cookie on response */
function setLangCookie(response: NextResponse, value: string): void {
  response.cookies.set(COOKIE_NAME, value, {
    maxAge: COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
  });
}

// ── API security: CORS + body size ────────────────────────────────

import { mintToken, routeCookieName } from "./app/lib/api-token";

const ALLOWED_ORIGINS = new Set([
  "https://adwatak.cloud",
  "https://www.adwatak.cloud",
  "https://adawatak-up2gpt-8789s-projects.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3007",
]);

const MAX_BODY_SIZE = 10 * 1024 * 1024; // 10 MB

// Routes that have AI backends needing tokens
const AI_API_ROUTES = new Set([
  "ai-essay-writer",
  "paraphrasing-tool",
  "grammar-checker",
  "plagiarism-checker",
  "ai-content-detector",
  "keyword-research",
  "calorie-vision",
  "ocr-vision",
  "seo-audit",
  "seo-content-generator",
]);

function applyApiSecurity(request: NextRequest, response: NextResponse): NextResponse {
  // Add security headers to every /api response
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  const origin = request.headers.get("origin");
  const allowOrigin = origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://adwatak.cloud";
  response.headers.set("Access-Control-Allow-Origin", allowOrigin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-API-Token");
  response.headers.set("Vary", "Origin");

  return response;
}

/** Set a fresh API token cookie for a given tool. Idempotent — overwrites if exists. */
function setApiTokenCookie(response: NextResponse, request: NextRequest, toolName: string): void {
  const route = `/api/${toolName}`;
  if (!AI_API_ROUTES.has(toolName)) return;
  const token = mintToken(route, request);
  response.cookies.set({
    name: routeCookieName(route),
    value: token.token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 5 * 60, // 5 minutes (same as TTL)
  });
}

// ── Proxy Handler ────────────────────────────────────────────────

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── /api/* — security + CORS gate ─────────────────────────────
  if (pathname.startsWith("/api/")) {
    // CORS preflight short-circuit
    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 204, headers: applyApiSecurity(request, new NextResponse()).headers });
    }

    // Block oversized request bodies
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
      return applyApiSecurity(
        request,
        NextResponse.json({ error: "Request body too large" }, { status: 413 }),
      );
    }

    // Block unknown cross-origin browser fetches (allow same-origin & no-origin)
    const origin = request.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return applyApiSecurity(
        request,
        NextResponse.json({ error: "Origin not allowed" }, { status: 403 }),
      );
    }

    // Apply CORS + security headers to the normal /api response
    return applyApiSecurity(request, NextResponse.next());
  }

  // ── /tools/<name> — mint a fresh API token cookie for this tool ──
  // Pages that use an AI tool get a per-route token cookie. The browser
  // auto-sends it on the subsequent fetch to /api/<name>.
  const toolMatch = pathname.match(/^\/(?:en|tr|id|fr|ar)?\/?tools\/([a-z0-9-]+)/);
  if (toolMatch && !pathname.startsWith("/_next/") && !pathname.startsWith("/api/")) {
    const toolName = toolMatch[1];
    if (AI_API_ROUTES.has(toolName)) {
      const response = NextResponse.next();
      setApiTokenCookie(response, request, toolName);
      return response;
    }
  }

  // ── Skip non-page routes ─────────────────────────────────────
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/manifest.webmanifest" ||
    /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|json|html|woff2?)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ── Set x-locale header for server-side <html lang> detection ──
  // This runs before layouts render, so RootLayout reads the correct
  // locale from headers() and sets <html lang={locale}> in the very
  // first byte of HTML — critical for Google Bot (no JS rendering needed).
  const localeMatch = pathname.match(/^\/(en|tr|id|fr)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : "ar";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  // ── Embed detection — `x-is-embed` header for layouts ──
  // Allows en/tr/id layouts to skip header/footer chrome on embed pages
  if (pathname.includes("/embed/")) {
    requestHeaders.set("x-is-embed", "true");
  }

  // ── Cookie exists → respect it (no redirect) ──────────────────
  const langCookie = request.cookies.get(COOKIE_NAME)?.value;
  if (langCookie && LOCALES.includes(langCookie as Locale)) {
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    return response;
  }

  // ── Skip auto-redirect for search engine crawlers (SEO) ───────
  // Googlebot, Bingbot etc. should always see the canonical (Arabic /)
  // so they index the right version in search results
  if (isCrawler(request.headers.get("user-agent"))) {
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    return response;
  }

  // ── No cookie — only auto-detect on root "/" ─────────────────
  const currentLang = getPathLocale(pathname);

  // If user explicitly navigated to /en, /tr, /id — RESPECT their choice.
  // Never redirect away from an explicit language prefix.
  if (currentLang) {
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    setLangCookie(response, currentLang);
    return response;
  }

  // Only the bare "/" root triggers auto-redirect
  if (pathname !== "/") {
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    return response;
  }

  // ── Detect language ───────────────────────────────────────────
  let detected: Locale = DEFAULT_LOCALE;

  // 1. Browser Accept-Language header
  const fromBrowser = detectFromAcceptLanguage(
    request.headers.get("accept-language"),
  );
  if (fromBrowser) {
    detected = fromBrowser;
  } else {
    // 2. Vercel geo-IP (x-vercel-ip-country header)
    const fromGeo = detectFromGeo(
      request.headers.get("x-vercel-ip-country"),
    );
    if (fromGeo) detected = fromGeo;
  }

  // Already on the right path — just set cookie
  if (currentLang === detected || (detected === "ar" && !currentLang)) {
    const response = NextResponse.next({ request: { headers: requestHeaders } });
    setLangCookie(response, detected);
    return response;
  }

  // Redirect to detected locale
  const newPath = switchPath(pathname, currentLang, detected);
  const url = request.nextUrl.clone();
  url.pathname = newPath;

  const response = NextResponse.redirect(url);
  setLangCookie(response, detected);
  return response;
}

// ── Matcher ──────────────────────────────────────────────────────

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest).*)",
  ],
};
