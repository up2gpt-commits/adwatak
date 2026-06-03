"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما الفرق بين Title Case و UPPERCASE؟", answer: "Title Case = أول حرف من كل كلمة كبير (مثال: This Is A Title). UPPERCASE = كل الحروف كبيرة (مثال: THIS IS ALL CAPS). Lowercase = كل الحروف صغيرة (مثال: all lowercase). Sentence case = أول حرف من الجملة فقط كبير." },
  { question: "هل تعمل على العربية؟", answer: "العربية لا تحتوي على أحرف كبيرة وصغيرة مثل الإنجليزية. الحروف العربية كلها بنفس الشكل بغض النظر عن موقعها في الجملة. الأداة تعمل على الحروف الإنجليزية واللاتينية في النص المختلط." },
  { question: "متى أستخدم UPPERCASE؟", answer: "العناوين الرئيسية في الإعلانات، الاختصارات (NASA, FIFA)، التحذيرات (ممنوع)، إظهار الغضب أو التركيز في النصوص غير الرسمية. لا تستخدمه كثيراً في المحتوى العادي — يعتبر صراخاً ويصعب قراءته." },
  { question: "متى أستخدم Title Case؟", answer: "عناوين المقالات، عناوين الكتب والأفلام، عناوين الأقسام في المستندات الرسمية، أسماء الأماكن والشركات. Title Case يعطي مظهراً احترافياً للنص." },
  { question: "متى أستخدم lowercase؟", answer: "عناوين URL (مواقع تفضل الأحرف الصغيرة)، أسماء ملفات، بعض عناوين البريد الإلكتروني، النصوص غير الرسمية والرسائل النصية. الأحرف الصغيرة أسهل للقراءة على الشاشات." },
  { question: "ما هو Sentence Case؟", answer: "Sentence Case = أول حرف من الجملة فقط كبير، باقي النص صغير. هذا هو الأسلوب الطبيعي في الكتابة باللغة الإنجليزية. معظم المقالات والمحتوى الطويل يستخدم Sentence Case." },
  { question: "هل تؤثر حالة الأحرف على SEO؟", answer: "Google لا يعطي أهمية لحالة الأحرف في ترتيب البحث — 'SEO' و 'seo' نفس الشيء. لكن في عناوين الصفحات (Title Tag)، استخدام Title Case يحسن قابلية القراءة ونسبة النقر (CTR)." },
  { question: "كيف أحول نص طويل من حالة إلى أخرى بسرعة؟", answer: "النسخ من Word أو Google Docs قد يجلب تنسيقاً غير متسق. أفضل طريقة: الصق النص في حقل الإدخال، اختر الحالة المطلوبة، اضغط الزر، ثم انسخ النتيجة. بسيط وسريع." },
];

const relatedTools = [
  { title: "عداد الكلمات", icon: "📝", href: "/tools/word-counter" },
  { title: "تنظيف النص", icon: "🧹", href: "/tools/text-cleaner" },
  { title: "مقارنة النصوص", icon: "⚖️", href: "/tools/text-compare" },
  { title: "مولد النص العربي", icon: "📃", href: "/tools/arabic-lorem" },
  { title: "تحويل الأرقام لحروف", icon: "🔢", href: "/tools/number-to-words" },
  { title: "عداد حروف السوشيال", icon: "📱", href: "/tools/social-character-counter" },
];

const seoContent = [
  "أداة تحويل حالة النص (Case Converter) تساعدك على تحويل النصوص بين عدة صيغ: أحرف صغيرة (lowercase)، أحرف كبيرة (UPPERCASE)، صيغة العنوان (Title Case)، وصيغة الجملة (Sentence Case). فقط الصق نصك أو اكتبه واختر الحالة المطلوبة.",
  "مناسبة جداً لتنسيق العناوين في المقالات والمدونات، إعداد البيانات البرمجية (حيث الحالة مهمة)، كتابة عناوين البريد الإلكتروني، وتصحيح النصوص غير المتسقة في التنسيق.",
  "UPPERCASE: استخدمه للعناوين البارزة والاختصارات (HTML, CSS, JSON). Title Case: استخدمه لعناوين المقالات والكتب. lowercase: استخدمه لعناوين URL وأسماء الملفات. Sentence Case: استخدمه للنصوص العادية.",
  "نصيحة: كتابة النص كله بأحرف كبيرة (ALL CAPS) يعتبر صراخاً في الكتابة الرقمية وقد يزعج القراء. استخدمه بحذر وفي المكان المناسب فقط. Title Case يعطي مظهراً احترافياً للمحتوى."
];

export default function Client() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const schemaName = "تحويل حالة النص";
const schemaDesc = `Online تحويل حالة النص - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/text-case";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "أدوات نصية", url: "https://adwatak.cloud/category/calculators" },
  { name: "تحويل حالة النص", url: "https://adwatak.cloud/tools/text-case" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb lang="ar" category="أدوات نصية" categorySlug="text" toolName="تحويل حالة النص" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔤 تحويل حالة النص</h1>
        <p className="text-sm text-gray-500 mb-6">تحويل النص لأحرف كبيرة أو صغيرة أو عنوان</p>
        <textarea value={text} onChange={(e) => setText(e.target.value)}
          className="w-full h-[150px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y"
          placeholder="أدخل النص..." />
        <div className="grid grid-cols-4 gap-2 mt-3">
          <button onClick={() => setResult(text.toLowerCase())} className="bg-blue-600 text-white font-semibold p-2.5 rounded-lg border-none cursor-pointer text-sm">صغيرة</button>
          <button onClick={() => setResult(text.toUpperCase())} className="bg-blue-600 text-white font-semibold p-2.5 rounded-lg border-none cursor-pointer text-sm">كبيرة</button>
          <button onClick={() => setResult(text.replace(/\b\w/g, c => c.toUpperCase()))} className="bg-blue-600 text-white font-semibold p-2.5 rounded-lg border-none cursor-pointer text-sm">عنوان</button>
          <button onClick={() => setResult(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase())} className="bg-blue-600 text-white font-semibold p-2.5 rounded-lg border-none cursor-pointer text-sm">جملة</button>
        </div>
      </div>
      {result && (
        <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
          <p className="m-0 whitespace-pre-wrap text-sm">{result}</p>
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
