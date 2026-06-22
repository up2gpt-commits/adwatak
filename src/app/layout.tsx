import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import "./globals.css";
import { Cairo } from "next/font/google";
import StructuredData, { orgSchema, websiteSchema } from "./components/StructuredData";
import DynamicHtmlLang from "./components/DynamicHtmlLang";

const arabic = Cairo({
  subsets: ["arabic"],
  variable: "--font-arabic",
});

const baseUrl = "https://adwatak.cloud";

const VALID_LOCALES = new Set(["ar", "en", "tr", "id", "fr"]);

/**
 * Resolve the current locale from proxy.ts's x-locale header.
 *
 * Priority:
 *  1️⃣ x-locale header (set by proxy.ts on every request — works even for crawlers)
 *  2️⃣ lang cookie (set by proxy.ts for human visitors)
 *  3️⃣ "ar" (safe default)
 */
function resolveLocale(
  xLocale: string | undefined,
  cookieValue: string | undefined,
): string {
  if (xLocale && VALID_LOCALES.has(xLocale)) return xLocale;
  if (cookieValue && VALID_LOCALES.has(cookieValue)) return cookieValue;
  return "ar";
}

// Root metadata — only applies to pages that don't override it
export const metadata: Metadata = {
  title: {
    default: "أدواتك — كل الأدوات اللي محتاجها بالعربي",
    template: "%s — أدواتك",
  },
  description: "مجموعة أدوات مجانية بالكامل باللغة العربية — حاسبات مالية، ميراث، زكاة، تحويل هجري، QR Code وأكثر. 80+ أداة بدون تسجيل.",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
    languages: {
      "ar": baseUrl,
      "en": `${baseUrl}/en`,
      "tr": `${baseUrl}/tr`,
      "id": `${baseUrl}/id`,
      "fr": `${baseUrl}/fr`,
      "x-default": baseUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "أدواتك",
    title: "أدواتك — 80+ أداة مجانية بالعربي",
    description: "أدواتك منصة الأدوات المجانية الأولى بالعربية. أكثر من ٨٠ أداة: حاسبات مالية، أدوات إسلامية، محولات، مولدات QR، أدوات PDF ونصوص وصور. كلها مجانية بدون تسجيل.",
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/og-ar.png`,
        width: 1200,
        height: 630,
        alt: "أدواتك — 80+ أداة مجانية بالعربي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@adawatak",
    creator: "@adawatak",
    title: "أدواتك — 80+ أداة مجانية بالعربي",
    description: "أدواتك منصة الأدوات المجانية الأولى بالعربية. أكثر من ٨٠ أداة: حاسبات مالية، أدوات إسلامية، محولات، مولدات QR، أدوات PDF ونصوص وصور. كلها مجانية بدون تسجيل.",
    images: [`${baseUrl}/og-ar.png`],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Server-side lang detection:
  //   1. x-locale header (set by proxy.ts on every request — works for crawlers too)
  //   2. lang cookie (set by proxy.ts for human visitors)
  //   3. "ar" (safe default for Arabic-root domain)
  const headersList = await headers();
  const xLocale = headersList.get("x-locale") ?? undefined;
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang")?.value;
  const lang = resolveLocale(xLocale, langCookie);
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir}>
      <head>
        {/* Google Search Console */}
        <meta name="google-site-verification" content="C-FZDgjuzgQ5tk9t5-xzMFWsYz9eAMW4rKRLvVvjkOk" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        {/* PWA */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#002FA7" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var theme = localStorage.getItem('theme');
            if (theme === 'dark') {
              document.documentElement.setAttribute('data-theme', 'dark');
            }
          })();
        `}} />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-X3SRR9PMGN"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-X3SRR9PMGN');
        `}} />
        {/* Google AdSense — temporarily removed pending approval */}
      </head>
      <body>
        <DynamicHtmlLang />
        <StructuredData data={orgSchema("https://adwatak.cloud")} />
        <StructuredData data={websiteSchema(lang as "ar" | "en" | "tr" | "id" | "fr")} />
        {children}
      </body>
    </html>
  );
}
