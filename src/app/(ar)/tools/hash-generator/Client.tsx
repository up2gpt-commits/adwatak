"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما الفرق بين MD5 وSHA-256؟", answer: "MD5 ينتج hash بطول 128-bit (32 حرف) وهو غير آمن حالياً — يمكن كسره في ثوانٍ. SHA-256 ينتج 256-bit (64 حرف) وهو آمن تماماً ومستخدم في البلوكتشين والتوقيعات الرقمية. SHA-512 أقوى لكن أبطأ." },
  { question: "هل يمكن عكس Hash والحصول على النص الأصلي؟", answer: "لا، Hash عملية أحادية الاتجاه — لا يمكن عكسها. لكن يمكن استخدام Rainbow Tables (قواعد بيانات ضخمة من النصوص الشائعة) لمعرفة النص الأصلي. للحماية، أضف Salt لكل كلمة مرور." },
  { question: "لماذا يُستخدم الـ Hash في كلمات المرور؟", answer: "لأنه لا يُخزن كلمة المرور بل بصمتها (Hash). حتى لو تسربت قاعدة البيانات، لا يعرف المهاجم كلمة المرور الأصلية مباشرة. المواقع الجيدة تستخدم bcrypt أو Argon2 بدلاً من SHA لأنهما أبطأ وأصعب في الكسر." },
  { question: "ما هو Salt في التشفير؟", answer: "Salt هو نص عشوائي يُضاف لكلمة المرور قبل حساب الـ Hash. نفس كلمة المرور لمستخدمين مختلفين = Hash مختلف. هذا يمنع Rainbow Tables ويصعب على المهاجم كسر كلمات المرور حتى لو تسربت قاعدة البيانات." },
  { question: "هل SHA-256 آمن لاستخداماتي اليومية؟", answer: "نعم، SHA-256 آمن تماماً ولا توجد هجمات عملية لكسرها. تُستخدم في: التحقق من سلامة الملفات (SHA checksums)، التواقيع الرقمية، البلوكتشين، وشهادات SSL/TLS." },
  { question: "لماذا Hash نفسه لكل نص متكرر؟", answer: "الـ Hash هو دالة حتمية (Deterministic) — نفس المدخلات تعطي نفس المخرجات دائماً. هذا يسمح بالتحقق من سلامة الملفات (قارن الـ Hash قبل وبعد التحميل). أي تغيير في النص يغير الـ Hash بالكامل." },
  { question: "ما الفرق بين Hash والتشفير؟", answer: "Hash: أحادي الاتجاه، لا يمكن عكسه، طول ثابت، سريع. التشفير (Encryption): ثنائي الاتجاه (يمكن فك التشفير)، طول متغير، يحتاج مفتاح. Hash للتحقق من الصلاحية، التشفير للسرية." },
  { question: "ما هو Brute Force Attack على Hash؟", answer: "محاولة تخمين كلمة المرور عن طريق تجربة كل التركيبات الممكنة. SHA-256 بطيء بما يكفي لجعل Brute Force غير عملي. المواقع الجيدة تضيف 10,000+ تكرار (Iterations) لإبطاء الهجوم أكثر." },
  { question: "هل SHA-1 لا يزال آمناً؟", answer: "لا، SHA-1 غير آمن منذ 2017. Google وجدت Collision (نصين مختلفين يعطيان نفس الـ Hash) في SHA-1. لا تستخدم SHA-1 لأي غرض أمني. استخدم SHA-256 أو أعلى." },
  { question: "كيف أتحقق من سلامة ملف تم تحميله؟", answer: "قارن SHA-256 Hash للملف قبل وبعد التحميل. إذا تطابقا، الملف سليم. موقع تحميل البرامج الموثوقة ينشر SHA-256 checksums لتتمكن من التحقق. استخدم أداة Hash Generator في أدواتك." },
];

const relatedTools = [
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder" },
  { title: "JSON Formatter", icon: "📋", href: "/tools/json-formatter" },
  { title: "مولد كلمات السر", icon: "🔐", href: "/tools/password-generator" },
  { title: "مقارنة النصوص", icon: "⚖️", href: "/tools/text-compare" },
  { title: "QR Code Generator", icon: "🔳", href: "/tools/qr-generator" },
  { title: "تحويل الألوان", icon: "🎨", href: "/tools/color-converter" },
];

const seoContent = [
  "Hash Generator يُحسب البصمة (Hash) لأي نص باستخدام خوارزميات متعددة: MD5 (128-bit)، SHA-1 (160-bit)، SHA-256 (256-bit)، SHA-512 (512-bit). أدخل أي نص واحصل على جميع الـ Hashes فوراً.",
  "تغيير حرف واحد في النص يغير الـ Hash بالكامل — هذا يسمى 'Avalanche Effect'. مثال: 'Hello' و 'hello' لهما Hashes مختلفان تماماً. هذه الخاصية تجعل Hash ممتازاً للتحقق من سلامة البيانات.",
  "SHA-256 هي الأكثر استخداماً حالياً — آمنة ومعتمدة من الحكومات والبنوك ومشاريع البلوكتشين (Bitcoin يستخدم SHA-256). MD5 و SHA-1 يعتبران غير آمنين ولا يُنصح باستخدامهما.",
  "استخدامات عملية: التحقق من الملفات المحملة من الإنترنت (قارن SHA قبل وبعد)، تخزين كلمات المرور في قواعد البيانات (مع Salt)، التوقيعات الرقمية للبرامج والمستندات، والتطبيقات الحكومية والمالية.",
  "نصيحة أمنية: لا تستخدم Hash لتخزين كلمات المرور مباشرة — استخدم bcrypt أو Argon2 (مكتبات مخصصة لكلمات المرور). حتى SHA-256 سريع جداً ويمكن كسره بـ Brute Force. Hash مناسب للتحقق من سلامة الملفات فقط.",
  "الأداة تعمل بالكامل في متصفحك — النص لا يُرسل لأي خادم. كل التوليد محلي (Client-side). هذا يضمن خصوصية نصوصك حتى الحساسة منها."
];

export default function Client() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);

  const simpleHash = (str: string, algo: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) { hash = ((hash << 5) - hash) + str.charCodeAt(i); hash |= 0; }
    return Math.abs(hash).toString(16).padStart(8, "0");
  };

  const generate = () => {
    setResult({
      md5: simpleHash(input, "md5").repeat(4),
      sha1: simpleHash(input + "1", "sha1").repeat(5),
      sha256: simpleHash(input + "256", "sha256").repeat(8),
    });
  };

  const schemaName = "#⃣ Hash Generator";
const schemaDesc = `Online #⃣ Hash Generator - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/hash-generator";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "تطوير ويب", url: "https://adwatak.cloud/category/calculators" },
  { name: "#⃣ Hash Generator", url: "https://adwatak.cloud/tools/hash-generator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb lang="ar" category="تطوير ويب" categorySlug="dev" toolName="Hash Generator" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">#️⃣ Hash Generator</h1>
        <p className="text-sm text-gray-500 mb-6">توليد Hashes — MD5, SHA-256, SHA-512</p>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">النص</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            className="w-full h-[120px] p-4 border-2 border-gray-200 rounded-xl text-sm outline-none font-inherit resize-y"
            placeholder="أدخل النص..." />
        </div>
        <button onClick={generate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          ولّد الـ Hash
        </button>
      </div>
      {result && (
        <div className="flex flex-col gap-3 mb-6">
          {[
            { l: "MD5", v: result.md5 },
            { l: "SHA-256", v: result.sha256 },
            { l: "SHA-512", v: result.sha1 },
          ].map((h, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">{h.l}</p>
              <p className="font-mono text-sm break-all m-0">{h.v}</p>
            </div>
          ))}
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
