import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { Noto_Sans_Arabic } from "next/font/google";
import StructuredData, { orgSchema, websiteSchema } from "./components/StructuredData";
import DynamicHtmlLang from "./components/DynamicHtmlLang";

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
});

const baseUrl = "https://adwatak.cloud";

// Detect locale from x-locale header (set by proxy.ts) for server-side <html lang="">
function detectLocale(headersList: { get(name: string): string | null }): string {
  // x-locale is set by proxy.ts middleware — reliable for all requests
  return headersList.get("x-locale") || "ar";
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
    title: "أدواتك — 50+ أداة مجانية بالعربي",
    description: "كل الأدوات اللي محتاجها في مكان واحد — حاسبات مالية، أدوات إسلامية، مولدات، محولات وأكثر",
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/og-ar.svg`,
        width: 1200,
        height: 630,
        alt: "أدواتك — 40+ أداة مجانية بالعربي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@adawatak",
    creator: "@adawatak",
    title: "أدواتك — 50+ أداة مجانية بالعربي",
    description: "كل الأدوات اللي محتاجها في مكان واحد — مجانية، بالعربي، بدون تسجيل",
    images: [`${baseUrl}/og-ar.svg`],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Server-side lang detection from x-locale header (set by proxy.ts)
  const headersList = await headers();
  const lang = detectLocale(headersList);
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
        <StructuredData data={orgSchema()} />
        <StructuredData data={websiteSchema("ar")} />
        {children}
      </body>
    </html>
  );
}
