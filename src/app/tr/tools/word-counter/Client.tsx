"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "Kelime sayacı nedir?", answer: "Metninizdeki kelime, karakter, cümle ve paragraf sayısını hesaplayan ücretsiz bir araç. SEO içerik yazarları, öğrenciler ve çevirmenler için idealdir." },
  { question: "Kelime sayısı neden önemli?", answer: "Google içerik uzunluğunu dikkate alır. 1.500+ kelimelik sayfalar ortalama %68 daha fazla organik trafik alır." },
  { question: "Okuma süresi nedir?", answer: "Metnin okunması için gereken ortalama süre. Dakikada 200 kelime (WPM) baz alınarak hesaplanır." },
  { question: "Arapça ve İngilizce karışık metinlerde çalışır mı?", answer: "Evet, tüm dilleri ve karışık metinleri destekler." },
  { question: "İdeal SEO kelime sayısı nedir?", answer: "Blog yazıları için 1.000-2.000 kelime. Ürün açıklamaları için 150-300 kelime." },
];

const relatedTools = [
  { title: "Metin Dönüştürme", icon: "🔤", href: "/tr/tools/text-case" },
  { title: "Metin Temizleme", icon: "🧹", href: "/tr/tools/text-cleaner" },
  { title: "Metin Karşılaştırma", icon: "⚖️", href: "/tr/tools/text-compare" },
];

const seoContent = [
  "Kelime ve Karakter Sayacı — metninizdeki kelime, karakter, cümle, paragraf sayısını ve okuma süresini hesaplar.",
  "Tüm dilleri destekler. SEO içerik optimizasyonu ve akademik yazım için mükemmeldir.",
];

export default function Client() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.!?؟。]+/).filter(s => s.trim()).length;
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Kelime ve Karakter Sayacı", "Kelime, karakter, cümle ve paragraf sayısı — okuma süresi dahil", "https://adwatak.cloud/tr/tools/word-counter", "tr", "Tools")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{ name: "Ana Sayfa", url: "https://adwatak.cloud/tr" }, { name: "Metin Araçları", url: "https://adwatak.cloud/tr/category/text" }, { name: "Kelime Sayacı", url: "https://adwatak.cloud/tr/tools/word-counter" }])} />
      <Breadcrumb lang="tr" category="Metin Araçları" categorySlug="text" toolName="Kelime ve Karakter Sayacı" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📝 Kelime ve Karakter Sayacı</h1>
        <p className="text-sm text-gray-500 mb-6">Kelime, karakter, cümle, paragraf sayısı ve okuma süresi</p>
        <textarea value={text} onChange={(e) => setText(e.target.value)}
          className="w-full h-[200px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y"
          placeholder="Metninizi buraya yapıştırın..." />
        <div className="grid grid-cols-5 gap-3 mt-4">
          {[
            { l: "Kelime", v: words },
            { l: "Karakter", v: chars },
            { l: "Karakter (boşluksuz)", v: charsNoSpaces },
            { l: "Cümle", v: sentences },
            { l: "Okuma Süresi", v: `${readingTime} dk` },
          ].map((r, i) => (
            <div key={i} className={`rounded-xl p-4 text-center border ${i === 4 ? "bg-amber-50 border-amber-200" : "bg-gray-50 border-gray-200"}`}>
              <p className="text-xs text-gray-500">{r.l}</p>
              <p className="text-xl font-extrabold text-gray-900">{typeof r.v === "number" ? r.v.toLocaleString("tr-TR") : r.v}</p>
            </div>
          ))}
        </div>
      </div>
      <SEOContent content={seoContent} lang="tr" />
      <FAQSection faqs={faqs} lang="tr" />
      <RelatedTools tools={relatedTools} lang="tr" />
      <ShareButtons lang="tr" />
    </div>
  );
}
