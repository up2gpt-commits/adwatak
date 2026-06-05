import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { Noto_Sans_Arabic } from "next/font/google";
import StructuredData, { orgSchema, websiteSchema } from "./components/StructuredData";
import DynamicHtmlLang from "./components/DynamicHtmlLang";

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
});

const baseUrl = "https://adwatak.cloud";

// Detect locale from cookie — the most reliable signal since proxy.ts
// sets the lang cookie on every request before the layout renders.
// This gives us the correct lang in the very first HTML byte.
function extractLang(pathname: string, cookieValue: string | undefined): string {
  // Cookie has the highest priority (set by proxy.ts on every visit)
  if (cookieValue && ["ar", "en", "tr", "id"].includes(cookieValue)) {
    return cookieValue;
  }
  // Fallback: detect from URL path
  const match = pathname.match(/^\/(en|tr|id)(\/|$)/);
  return match ? match[1] : "ar";
}

// Root metadata — only applies to pages that don't override it
export const metadata: Metadata = {
  title: {
    default: "أدواتك — كل الأدوات اللي محتاجها بالعربي",
    template: "%s — أدواتك",
  },
  description: "مجموعة أدوات مجانية بالكامل باللغة العربية — حاسبات مالية، ميراث، زكاة، تحويل هجري، QR Code وأكثر. 50+ أداة بدون تسجيل.",
  keywords: ["أدوات", "حاسبات", "قرض عقاري", "ميراث", "زكاة", "تحويل هجري", "QR Code", "أدوات عربية", "حاسبة"],
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
    languages: {
      "ar": baseUrl,
      "en": `${baseUrl}/en`,
      "tr": `${baseUrl}/tr`,
      "id": `${baseUrl}/id`,
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
  // Server-side lang detection: read lang cookie set by proxy.ts
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang")?.value;
  // Also read pathname from x-invoke-path as fallback
  const lang = extractLang("/", langCookie);
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
        <meta name="theme-color" content="#2563eb" />
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
      </head>
      <body>
        <DynamicHtmlLang />
        <StructuredData data={orgSchema("https://adwatak.cloud")} />
        <StructuredData data={websiteSchema(lang as "ar" | "en" | "tr" | "id")} />
        {children}
      </body>
    </html>
  );
}
