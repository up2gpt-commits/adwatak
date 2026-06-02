import type { Metadata } from "next";
import { ReactNode } from "react";

const baseUrl = "https://adwatak.cloud";

// Exported so individual tool pages can override via `generateMetadata`
export function createToolMetadata(
  name: string,
  description: string,
  slug: string,
  lang: "ar" | "en" = "ar"
): Metadata {
  const title = lang === "ar" ? `${name} | أدواتك` : `${name} | Adawatak`;
  const canonical = lang === "ar"
    ? `${baseUrl}/tools/${slug}`
    : `${baseUrl}/en/tools/${slug}`;

  return {
    title,
    description: description.substring(0, 160),
    alternates: {
      canonical,
      languages: {
        "ar": `${baseUrl}/tools/${slug}`,
        "en": `${baseUrl}/en/tools/${slug}`,
      },
    },
    openGraph: {
      title,
      description: description.substring(0, 200),
      url: canonical,
      siteName: lang === "ar" ? "أدواتك" : "Adawatak",
      locale: lang === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description.substring(0, 200),
    },
  };
}

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
