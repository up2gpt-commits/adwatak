import type { Metadata } from "next";
import { ReactNode } from "react";

const baseUrl = "https://adwatak.cloud";

// Exported so individual tool pages can override via `generateMetadata`
export function createToolMetadata(
  name: string,
  description: string,
  slug: string,
  lang: "ar" | "en" = "ar",
  extraKeywords?: string[]
): Metadata {
  const title = lang === "ar" ? `${name} | أدواتك` : `${name} | Adawatak`;
  const locale = lang === "ar" ? "ar_SA" : "en_US";
  const baseUrl = lang === "ar" ? "https://adwatak.cloud" : `https://adwatak.cloud/${lang}`;
  const canonical = lang === "ar"
    ? `https://adwatak.cloud/tools/${slug}`
    : `https://adwatak.cloud/${lang}/tools/${slug}`;

  return {
    title,
    description: description.substring(0, 160),
    // AEO: Direct answer meta — helps AI engines extract key info
    ...(extraKeywords ? { keywords: extraKeywords } : {}),
    alternates: {
      canonical,
      languages: {
        "ar": `https://adwatak.cloud/tools/${slug}`,
        "en": `https://adwatak.cloud/en/tools/${slug}`,
        "tr": `https://adwatak.cloud/tr/tools/${slug}`,
      },
    },
    openGraph: {
      title,
      description: description.substring(0, 200),
      url: canonical,
      siteName: lang === "ar" ? "أدواتك" : "Adawatak",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description.substring(0, 200),
    },
    // GEO: Robots directive — ensure AI crawlers can index
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
