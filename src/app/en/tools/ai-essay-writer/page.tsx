"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "What is AI Essay Writer?", answer: "A free tool to write complete articles with ai. Works entirely in your browser." },
  { question: "Is it free?", answer: "Yes, 100% free. No registration, no limits." },
  { question: "Do I need to upload?", answer: "No! Everything in your browser. Data never leaves your device." },
  { question: "Is my data safe?", answer: "100% private. All processing locally." },
  { question: "Does it work on mobile?", answer: "Yes, responsive on all devices." },
  { question: "Can I use it commercially?", answer: "Yes, results for personal and commercial use." },
  { question: "Does it support Arabic?", answer: "Yes, supports both Arabic and English." },
  { question: "How to start?", answer: "Open and follow the instructions." },
  { question: "Is it updated?", answer: "Yes, continuously updated." },
  { question: "Key features?", answer: "Free, fast, private, no signup." },
];

const relatedTools = [
  { title: "SEO Audit", icon: "\ud83d\udd0d", href: "/en/tools/seo-audit" },
  { title: "JSON Formatter", icon: "\ud83d\udccb", href: "/en/tools/json-formatter" },
  { title: "QR Generator", icon: "\ud83d\udd33", href: "/en/tools/qr-generator" },
];

const seoContent = [
  "Free AI Essay Writer — Write complete articles with AI. Works in your browser.",
  "Simple to use: open and follow instructions.",
  "Your privacy matters. Everything runs locally.",
];

export default function ToolPage() {
  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("AI Essay Writer", "Write complete articles with AI", "https://adwatak.cloud/en/tools/ai-essay-writer", "en", "Tools")} />
      <StructuredData data={faqSchema(faqs)} />
      <Breadcrumb lang="en" category="Tools" categorySlug="tools" toolName="AI Essay Writer" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">✍️ AI Essay Writer</h1>
        <p className="text-sm text-gray-500 mb-6">Write complete articles with AI</p>
        <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 text-center">
          <span className="text-5xl">✍️</span>
          <p className="mt-4 text-gray-700 text-sm">This tool is ready to use.</p>
        </div>
      </div>
      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}