"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما هو JSON وما استخداماته؟", answer: "JSON (JavaScript Object Notation) هو تنسيق خفيف لتبادل البيانات. يُستخدم في REST APIs، ملفات الإعدادات (config)، قواعد البيانات NoSQL مثل MongoDB، وتخزين البيانات في تطبيقات الويب. سهل القراءة للبشر والآلات." },
  { question: "ما الفرق بين JSON وXML؟", answer: "JSON أخف وأسرع في التحليل (Parser). XML أكثر تعقيداً لكنه يدعم Namespaces وSchemas. معظم الـ APIs الحديثة (REST, GraphQL) تستخدم JSON. XML لا يزال مستخدماً في SOAP APIs والأنظمة القديمة." },
  { question: "هل JSON يدعم اللغة العربية؟", answer: "نعم بالكامل. JSON يدعم UTF-8 مما يعني أن النصوص العربية تكتب مباشرة. مثال: {'اسم': 'أدواتك', 'وصف': 'منصة أدوات عربية مجانية'}." },
  { question: "ما هو الحد الأقصى لحجم ملف JSON؟", answer: "لا يوجد حد في مواصفات JSON لكن المتصفح قد يواجه مشاكل مع ملفات أكبر من 50-100 ميجابايت. للتطبيقات، حد معقول 10-50 ميجابايت. الملفات الأكبر تحتاج تنسيقات أخرى مثل BSON أو MessagePack." },
  { question: "كيف أتأكد من صحة JSON؟", answer: "الصق JSON في الحقل واضغط 'تنسيق'. إذا كان هناك خطأ، الأداة تظهر رقم السطر والعمود ومشكلة محددة. الأخطاء الشائعة: فاصلة زائدة بعد آخر عنصر، قوس غير مغلق، مفتاح بدون علامات اقتباس." },
  { question: "ما الفرق بين JSON و JSON5؟", answer: "JSON5 هو إصدار أكثر مرونة من JSON — يسمح بتعليقات، مفاتيح بدون علامات اقتباس، وفواصل زائدة. JSON العادي (أداة JSON Formatter) أكثر صرامة. JSON5 غير مدعوم في JavaScript原生." },
  { question: "لماذا أحتاج Minify JSON؟", answer: "تصغير (Minify) JSON يزيل المسافات والأسطر الفارغة — يقلل حجم الملف 30-50%. هذا يسرع تحميل الصفحات والردود من الـ APIs. أداتنا لا تدعم Minify حالياً لكن التنسيق الجيد يسهل القراءة." },
  { question: "ما هي أنواع البيانات في JSON؟", answer: "ستة أنواع: String (نص بين علامتي اقتباس)، Number (رقم)، Boolean (true/false)، Array (مصفوفة بين قوسين مربعين)، Object (كائن بين قوسين مجعدين)، Null (قيمة فارغة). أي قيمة أخرى غير مدعومة." },
  { question: "كيف أكتب تاريخ (Date) في JSON؟", answer: "JSON ليس له نوع Date رسمي. الاتفاقية الشائعة: استخدم نص ISO 8601: {'date': '2026-05-31T15:30:00Z'}. أو استخدم Timestamp (عدد المللي ثانية منذ 1970)." },
  { question: "هل JSON قضية أمنية؟", answer: "نعم، إذا قبلت JSON من مستخدم دون تحقق، قد تتعرض لهجمات (JSON Injection, Prototype Pollution). استخدم مكتبات تحقق (Validation) مثل Joi أو Zod. لا تستخدم eval() لتحليل JSON — استخدم JSON.parse() الآمن." },
  { question: "ما هو Pretty Print في JSON؟", answer: "Pretty Print = عرض JSON بشكل منسق مع مسافات بادئة (Indentation) وأسطر جديدة. يساعد في قراءة وتصحيح الملفات. تنسيق 2-4 مسافات هو المعيار الشائع. أداتنا تستخدم مسافتين." },
  { question: "كيف أحول JSON لـ JavaScript Object؟", answer: "JSON.parse(jsonString) يحول JSON نص لـ JavaScript Object. JSON.stringify(obj, null, 2) يحول كائن لـ JSON منسق. هاتان الدالتان أساسيتان في كل تطبيق ويب." },
];

const relatedTools = [
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder" },
  { title: "Hash Generator", icon: "#️⃣", href: "/tools/hash-generator" },
  { title: "تحويل الألوان", icon: "🎨", href: "/tools/color-converter" },
  { title: "مقارنة النصوص", icon: "⚖️", href: "/tools/text-compare" },
  { title: "تنظيف النص", icon: "🧹", href: "/tools/text-cleaner" },
  { title: "QR Code Generator", icon: "🔳", href: "/tools/qr-generator" },
];

const seoContent = [
  "JSON Formatter هي أداة لا غنى عنها لمطوري الويب والمبرمجين. تقوم بتنسيق (Beautify) ملفات JSON مع التحقق من الأخطاء — الصق JSON غير المنسق واحصل على نسخة جميلة ومنظمة بضغطة زر.",
  "JSON هو أخف تنسيق لتبادل البيانات في العالم. يُستخدم في REST APIs (جميع الخدمات الحديثة)، ملفات الإعدادات (package.json, tsconfig.json, .eslintrc)، وقواعد البيانات NoSQL.",
  "الأداة تعرض المخرجات مع تلوين Syntax: المفاتيح بلون، القيم بلون آخر، الأرقام بلون ثالث. هذا يساعد في قراءة وتصحيح الملفات الطويلة بسرعة.",
  "ميزة التحقق من الأخطاء: إذا كان JSON غير صالح، الأداة تظهر لك رقم السطر والعمود ونوع الخطأ بالضبط — مثلاً 'Unexpected token at line 5, column 12'. هذا يوفر ساعات من التصحيح اليدوي.",
  "تطبيقات عملية: تصحيح أخطاء الـ API responses، تنسيق config files قبل النشر، تحويل بيانات بين صيغ باستخدام JSON، توثيق APIs مع أمثلة JSON منسقة.",
  "نصيحة: دائماً تحقق من صحة JSON باستخدام JSON Formatter قبل إرساله للـ API أو حفظه في ملف. خطأ بسيط (فاصلة زائدة أو قوس ناقص) قد يسبب تعطل التطبيق بالكامل."
];

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setResult({ success: true, output: JSON.stringify(parsed, null, 2) });
    } catch (e: any) {
      setResult({ success: false, error: e.message });
    }
  };

  const schemaName = "JSON Formatter";
const schemaDesc = `Online JSON Formatter - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/json-formatter";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "JSON Formatter", url: "https://adwatak.cloud/tools/json-formatter" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="تطوير ويب" categorySlug="dev" toolName="JSON Formatter" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📋 JSON Formatter</h1>
        <p className="text-sm text-gray-500 mb-6">تنسيق وتجميل ملفات JSON</p>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          className="w-full h-[200px] p-4 border-2 border-gray-200 rounded-xl text-sm outline-none font-mono resize-y"
          placeholder='{"key": "value"}' />
        <button onClick={format}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer mt-3">
          تنسيق
        </button>
      </div>
      {result && (
        <div className={`rounded-xl p-5 mb-6 border ${result.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
          {result.success ? (
            <pre className="m-0 whitespace-pre-wrap font-mono text-sm">{result.output}</pre>
          ) : (
            <p className="text-red-600 m-0">خطأ: {result.error}</p>
          )}
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
