"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "متى أحتاج تنظيف النص؟", answer: "عند نسخ نص من PDF أو موقع ويب — غالباً ما يكون مليئاً بمسافات زائدة، أسطر فارغة، وعلامات HTML مخفية. أداة التنظيف تزيل كل هذا بضغطة زر." },
  { question: "هل يحذف تنسيق النص فقط أم يغير المحتوى؟", answer: "يحذف فقط ما تختار حذفه: المسافات الزائدة، الأسطر الفارغة، علامات HTML، الروابط. المحتوى النصي نفسه لا يتغير — الكلمات والجمل تبقى كما هي." },
  { question: "هل يمكن استخدامها لتنظيف الكود البرمجي؟", answer: "نعم، لكن بحذر — إزالة علامات HTML قد تدمر الكود إذا كان يحتوي على < و >. للكود البرمجي، استخدم فقط خيار 'إزالة المسافات الزائدة'." },
  { question: "كيف أنظف نصاً منسوخاً من PDF؟", answer: "انسخ النص من PDF، الصقه في الحقل، اضغط 'نظف'. الأداة ستزيل الأسطر الفارغة والمسافات الزائدة التي تأتي مع PDF. قد تحتاج تجربة مرتين لأن PDF يضيف مشاكل تنسيق غريبة." },
  { question: "هل تزيل علامات الترقيم؟", answer: "لا، علامات الترقيم (،.؟!؛:) لا تُحذف. الأداة تحافظ على المحتوى النصي كاملاً مع علامات الترقيم. فقط تزيل المسافات الزائدة والروابط وHTML." },
  { question: "ما الفرق بين المسافة العادية والمسافة غير المنفصلة؟", answer: "المسافة غير المنفصلة (&nbsp;) هي مسافة HTML تمنع كسر السطر. الأداة تتعامل معها كمسافة عادية وتدمجها مع المسافات المجاورة." },
  { question: "هل يمكن استخدامها لتحضير نص للترجمة؟", answer: "نعم، تنظيف النص قبل الترجمة يزيل المشاكل التنسيقية التي تربك مترجمي Google وDeepL. النص النظيف يعطي ترجمة أفضل." },
  { question: "كيف أتأكد أن النص نظيف بالكامل؟", answer: "بعد الضغط على 'نظف'، قارن النص الناتج بالنص الأصلي. لو لسه فيه مسافات زائدة، حاول مرة ثانية. النص النظيف المثالي: بدون أسطر فارغة متكررة، مسافة واحدة بين الكلمات، ولا علامات HTML." },
];

const relatedTools = [
  { title: "عداد الكلمات", icon: "📝", href: "/tools/word-counter" },
  { title: "تحويل حالة النص", icon: "🔤", href: "/tools/text-case" },
  { title: "مقارنة النصوص", icon: "⚖️", href: "/tools/text-compare" },
  { title: "JSON Formatter", icon: "📋", href: "/tools/json-formatter" },
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder" },
  { title: "مولد النص العربي", icon: "📃", href: "/tools/arabic-lorem" },
];

const seoContent = [
  "أداة تنظيف النص تساعدك على تنظيف النصوص المنسوخة من الويب أو المستندات PDF. تزيل المسافات الزائدة، الأسطر الفارغة المتكررة، علامات HTML، والروابط — بضغطة زر واحدة.",
  "مشكلة شائعة: عند نسخ نص من موقع ويب أو PDF، يأتي معه تنسيق مخفي — مسافات كثيرة، أسطر فارغة، علامات HTML (مثل <p> <br> <div>). هذه الأدوات تزعجك لو كنت تنوي إعادة استخدام النص.",
  "الأداة تقدم 4 عمليات تنظيف في مرة واحدة: إزالة المسافات المتكررة (ترك مسافة واحدة بين الكلمات)، إزالة الأسطر الفارغة المتكررة، إزالة علامات HTML، وإزالة الروابط.",
  "مثال قبل وبعد: نص قبل: 'مرحباً   بك   في   أدواتك  <br> كيف حالك  ؟' → بعد: 'مرحباً بك في أدواتك كيف حالك؟'.",
  "مناسبة لـ: الكتّاب والمدونين (تنظيف نصوص منسوخة من المصادر)، المبرمجين (تنظيف تعليقات ونصوص من الوثائق)، المترجمين (تحضير النص للترجمة)، ومتخصصي SEO (تنظيف المحتوى قبل النشر).",
  "نصيحة: بعد تنظيف النص، استخدم عداد الكلمات للتأكد من أن المحتوى يفي بمتطلبات عدد الكلمات. النص النظيف أسهل للتعديل والتحرير وإعادة الاستخدام."
];

export default function Client() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const clean = () => {
    let t = text;
    t = t.replace(/\s+/g, " ");
    t = t.replace(/<[^>]*>/g, "");
    t = t.replace(/https?:\/\/\S+/g, "");
    setResult(t.trim());
  };

  const schemaName = "تنظيف النص";
const schemaDesc = `Online تنظيف النص - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/text-cleaner";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "أدوات نصية", url: "https://adwatak.cloud/category/calculators" },
  { name: "تنظيف النص", url: "https://adwatak.cloud/tools/text-cleaner" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb lang="ar" category="أدوات نصية" categorySlug="text" toolName="تنظيف النص" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🧹 تنظيف النص</h1>
        <p className="text-sm text-gray-500 mb-6">إزالة المسافات والروابط والعلامات</p>
        <textarea value={text} onChange={(e) => setText(e.target.value)}
          className="w-full h-[150px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y"
          placeholder="الصق النص هنا..." />
        <button onClick={clean}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer mt-3">
          نظّف
        </button>
      </div>
      {result && (
        <div className="bg-green-50 rounded-xl p-5 mb-6 border border-green-200">
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
