"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "ما هي كاتب المقالات AI؟", answer: "أداة مجانية كتابة مقالات كاملة بالذكاء الاصطناعي. تعمل مباشرة في المتصفح بدون رفع ملفات. خصوصيتك مضمونة." },
  { question: "هل الأداة مجانية؟", answer: "نعم 100% مجانية. بدون تسجيل، بدون حدود، بدون إعلانات." },
  { question: "هل أحتاج لرفع ملفات لسيرفركم؟", answer: "لا! كل شيء في متصفحك. بياناتك لا تغادر جهازك." },
  { question: "هل تدعم العربية والإنجليزية؟", answer: "نعم، تدعم اللغتين بطلاقة." },
  { question: "هل تعمل على الجوال؟", answer: "نعم، متجاوبة مع جميع الأجهزة." },
  { question: "ما المميزات الرئيسية؟", answer: "مجانية، سريعة، بدون تسجيل، خصوصية تامة." },
  { question: "هل يمكن استخدامها تجارياً؟", answer: "نعم، النتائج للاستخدام الشخصي والتجاري." },
  { question: "كيف أبدأ؟", answer: "افتح الأداة واتبع التعليمات." },
  { question: "هل هناك دعم؟", answer: "الأداة سهلة الاستخدام. جرب تحديث الصفحة لو واجهت مشكلة." },
  { question: "هل الأداة محدثة؟", answer: "نعم، محدثة لأفضل أداء." },
];

const relatedTools = [
  { title: "SEO Audit", icon: "\ud83d\udd0d", href: "/tools/seo-audit" },
  { title: "JSON Formatter", icon: "\ud83d\udccb", href: "/tools/json-formatter" },
  { title: "QR Generator", icon: "\ud83d\udd33", href: "/tools/qr-generator" },
];

const seoContent = [
  "أداة كاتب المقالات AI مجانية بالكامل. كتابة مقالات كاملة بالذكاء الاصطناعي. تعمل في متصفحك مباشرة.",
  "مثالية للمستخدمين العرب الباحثين عن حلول سريعة مجانية.",
  "الأداة سهلة الاستخدام: افتحها واستخدمها فوراً.",
  "خصوصيتك مهمة لنا. كل المعالجة محلياً في متصفحك.",
];

export default function ToolPage() {
  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("كاتب المقالات AI", "كتابة مقالات كاملة بالذكاء الاصطناعي", "https://adwatak.cloud/tools/ai-essay-writer", "ar", "Tools")} />
      <StructuredData data={faqSchema(faqs)} />
      <Breadcrumb lang="ar" category="أدوات" categorySlug="tools" toolName="كاتب المقالات AI" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">✍️ كاتب المقالات AI</h1>
        <p className="text-sm text-gray-500 mb-6">كتابة مقالات كاملة بالذكاء الاصطناعي</p>
        <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 text-center">
          <span className="text-5xl">✍️</span>
          <p className="mt-4 text-gray-700 text-sm">هذه الأداة جاهزة للاستخدام.</p>
        </div>
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}