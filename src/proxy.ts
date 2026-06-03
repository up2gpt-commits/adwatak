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

const LOCALES = ["ar", "en", "tr", "id"] as const;
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

// ── Proxy Handler ────────────────────────────────────────────────

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Skip non-page routes ─────────────────────────────────────
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/static/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/manifest.webmanifest" ||
    /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|json|html|woff2?)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // ── Cookie exists → respect it (no redirect) ──────────────────
  const langCookie = request.cookies.get(COOKIE_NAME)?.value;
  if (langCookie && LOCALES.includes(langCookie as Locale)) {
    return NextResponse.next();
  }

  // ── Skip auto-redirect for search engine crawlers (SEO) ───────
  // Googlebot, Bingbot etc. should always see the canonical (Arabic /)
  // so they index the right version in search results
  if (isCrawler(request.headers.get("user-agent"))) {
    return NextResponse.next();
  }

  // ── No cookie — only auto-detect on entry pages ───────────────
  const currentLang = getPathLocale(pathname);
  const isEntryPage =
    pathname === "/" || pathname === "/en" || pathname === "/tr" || pathname === "/id";

  if (!isEntryPage) {
    // Deep link — pass through without redirect
    return NextResponse.next();
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
    const response = NextResponse.next();
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
