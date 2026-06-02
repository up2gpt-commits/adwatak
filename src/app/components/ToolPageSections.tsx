"use client";

import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "@/app/components/StructuredData";
import FAQSection from "@/app/components/FAQSection";
import RelatedTools from "@/app/components/RelatedTools";
import SEOContent from "@/app/components/SEOContent";
import Breadcrumb from "@/app/components/Breadcrumb";
import ShareButtons from "@/app/components/ShareButtons";
import { getToolInfo } from "@/app/lib/tool-metadata";

/**
 * Shared tool page sections — client component
 * Renders the common UI parts: breadcrumb, SEO content, FAQ, related tools, share buttons
 * Individual tools import this and compose their own interactive form
 */
export function useToolSchema(slug: string, desc: string, lang: "ar" | "en" = "ar") {
  const info = getToolInfo(slug, lang);
  if (!info) return null;

  const url = lang === "ar"
    ? `https://adwatak.cloud/tools/${slug}`
    : `https://adwatak.cloud/en/tools/${slug}`;

  return {
    name: info.name,
    description: desc || info.description,
    url,
    schemaCategory: info.schemaCategory,
    category: info.category,
    categorySlug: info.categorySlug,
  };
}

interface ToolPageSectionsProps {
  slug: string;
  seoContent: string[];
  faqs: Array<{ question: string; answer: string }>;
  relatedTools: Array<{ title: string; icon: string; href: string }>;
  lang?: "ar" | "en";
  children: React.ReactNode; // The tool's interactive form
}

export default function ToolPageSections({
  slug,
  seoContent,
  faqs,
  relatedTools,
  lang = "ar",
  children,
}: ToolPageSectionsProps) {
  const info = getToolInfo(slug, lang);
  if (!info) return <>{children}</>;

  const url = lang === "ar"
    ? `https://adwatak.cloud/tools/${slug}`
    : `https://adwatak.cloud/en/tools/${slug}`;

  const breadcrumbItems = [
    { name: lang === "ar" ? "الرئيسية" : "Home", url: lang === "ar" ? "https://adwatak.cloud" : "https://adwatak.cloud/en" },
    { name: info.category, url: lang === "ar" ? `https://adwatak.cloud/category/${info.categorySlug}` : `https://adwatak.cloud/en/category/${info.categorySlug}` },
    { name: info.name, url },
  ];

  return (
    <>
      <StructuredData data={toolSchema(info.name, info.description, url, lang, info.schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang={lang} category={info.category} categorySlug={info.categorySlug} toolName={info.name} />
      {children}
      <SEOContent content={seoContent} lang={lang} />
      <FAQSection faqs={faqs} lang={lang} />
      <RelatedTools tools={relatedTools} lang={lang} />
      <ShareButtons lang={lang} />
    </>
  );
}
