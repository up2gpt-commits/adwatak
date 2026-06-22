"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما هو الترميز (Encoding)؟", answer: "تحويل البيانات من صيغة لأخرى لتتناسب مع متطلبات النقل أو التخزين. أشهر أنواع الترميز: Base64 (للبيانات الثنائية) و URL Encoding (للروابط) و HTML Entities (للنصوص)." },
  { question: "ما الفرق بين Base64 و URL Encoding؟", answer: "Base64 يحول أي بيانات (صور، ملفات) لنص قابل للقراءة — يُستخدم في APIs وData URLs. URL Encoding يحول الأحرف غير المسموح بها في الروابط (%20 للمسافة، %3F لعلامة الاستفهام)." },
  { question: "ما هو HTML Entities Encoding؟", answer: "تحويل الأحرف الخاصة لـ HTML Entities — مثلاً < → &lt; و > → &gt; و & → &amp;. يمنع XSS attacks ويضمن عرض النص بشكل صحيح في المتصفح." },
  { question: "هل الترميز تشفير آمن؟", answer: "لا! الترميز (Encoding) ليس تشفيراً (Encryption). يمكن عكسه بسهولة. لا تستخدمه لحماية بيانات سرية. استخدم AES أو RSA للتشفير الحقيقي." },
  { question: "متى أستخدم URL Encoding؟", answer: "عند بناء روابط (URLs) تحتوي على مسافات أو أحرف خاصة — مثلاً 'بحث أدواتك' → 'بحث+أدواتك'. المتصفحات تتطلب URL Encoding للروابط." },
  { question: "متى أستخدم Base64 Encoding؟", answer: "ترميز الصور في HTML (Data URL: &lt;img src='data:...'&gt;)، نقل البيانات في JSON APIs، إرسال المرفقات في البريد الإلكتروني." },
  { question: "ما هو الفرق بين encodeURI و encodeURIComponent؟", answer: "encodeURI: ترميز كامل URL (يحافظ على / و : و ?). encodeURIComponent: ترميز جزء من URL (يشفر كل الأحرف الخاصة). استخدم encodeURIComponent للـ query parameters." },
  { question: "هل الترميز يؤثر على حجم البيانات؟", answer: "نعم، Base64 يزيد الحجم 33%. URL Encoding يزيد الحجم حسب عدد الأحرف المشفرة. HTML Entities يزيد الحجم قليلاً." },
  { question: "كيف أفك ترميز نص في JavaScript؟", answer: "Base64: atob(str) للفك، btoa(str) للترميز. URL: decodeURIComponent(str) للفك، encodeURIComponent(str) للترميز. HTML: استخدم DOMParser أو مكتبة خارجية." },
  { question: "ما هي أكثر الأخطاء شيوعاً في الترميز؟", answer: "نسيان ترميز النصوص العربية قبل إرسالها في URL (تظهر أحرف مشوشة). استخدام Base64 للتشفير (غير آمن). نسيان فك الترميز قبل عرض النص للمستخدم." },
];

const relatedTools = [
  { title: "Encoder Base64", icon: "🔄", href: "/id/tools/base64-encoder" },
  { title: "Formatter JSON", icon: "📋", href: "/id/tools/json-formatter" },
  { title: "Generator Hash", icon: "#️⃣", href: "/id/tools/hash-generator" },
  { title: "Perbandingan Teks", icon: "⚖️", href: "/id/tools/text-compare" },
  { title: "Pembersihan Teks", icon: "🧹", href: "/id/tools/text-cleaner" },
  { title: "Konversi Huruf Teks", icon: "🔤", href: "/id/tools/text-case" },
];

const seoContent = [
  "Alat encoding dan decoding teks menggunakan berbagai metode: Base64 (untuk data biner), URL Encoding (untuk tautan), dan HTML Entities (untuk teks yang aman). Masukkan teks dan pilih jenis encoding.",
  "Setiap pengembang web perlu memahami encoding: Base64 untuk gambar dan teks di API, URL Encoding untuk tautan dan parameter kueri, HTML Entities untuk melindungi situs dari XSS.",
  "Encoding bukanlah enkripsi — encoding apa pun dapat dengan mudah dibalik. Gunakan untuk representasi dan transmisi, bukan untuk keamanan. Untuk keamanan, gunakan bcrypt (untuk kata sandi) atau TLS (untuk transmisi).",
  "Alat ini sepenuhnya berjalan di browser — teks tidak dikirim ke server mana pun. Privasi penuh."
];

export default function Client() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("base64-encode");

  const process = () => {
    try {
      switch (mode) {
        case "base64-encode": setResult(btoa(unescape(encodeURIComponent(input)))); break;
        case "base64-decode": setResult(decodeURIComponent(escape(atob(input)))); break;
        case "url-encode": setResult(encodeURIComponent(input)); break;
        case "url-decode": setResult(decodeURIComponent(input)); break;
      }
    } catch { setResult("خطأ في الترميز/فك الترميز"); }
  };

  const schemaName = "أداة الترميز";
const schemaDesc = `Online أداة الترميز - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/id/tools/encoder";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "تطوير ويب", url: "https://adwatak.cloud/category/calculators" },
  { name: "أداة الترميز", url: "https://adwatak.cloud/id/tools/encoder" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb lang="id" category="تطوير ويب" categorySlug="dev" toolName="Alat Encoding" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔧 Alat Encoding</h1>
        <p className="text-sm text-gray-500 mb-6">Encoding dan Decoding Teks</p>
        <select value={mode} onChange={(e) => setMode(e.target.value)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white mb-4">
          <option value="base64-encode">Base64 تشفير</option>
          <option value="base64-decode">Base64 فك تشفير</option>
          <option value="url-encode">URL تشفير</option>
          <option value="url-decode">URL فك تشفير</option>
        </select>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          className="w-full h-[120px] p-4 border-2 border-gray-200 rounded-xl text-sm outline-none font-inherit resize-y mb-4"
          placeholder="Masukkan teks..." />
        <button onClick={process}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          تنفيذ
        </button>
      </div>
      {result && (
        <div className="bg-green-50 rounded-xl p-5 mb-6 border border-green-200 break-all text-sm">
          {result}
        </div>
      )}
      <SEOContent content={seoContent} lang="id" />
      <FAQSection faqs={faqs} lang="id" />
      <RelatedTools tools={relatedTools} lang="id" />
    <ShareButtons lang="id" />
    </div>
  );
}
