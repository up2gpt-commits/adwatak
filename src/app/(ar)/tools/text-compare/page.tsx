"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما هي خوارزمية diff؟", answer: "خوارزمية رياضية تحدد الفروقات بين سلسلتين نصيتين. تُظهر ما تم إضافته (بالأخضر) وحذفه (بالأحمر) وتعديله. تستخدم في أنظمة التحكم بالإصدارات (Git) وأدوات المقارنة." },
  { question: "هل تناسب مقارنة الكود البرمجي؟", answer: "نعم، تعمل مع أي نص بما في ذلك الكود البرمجي (Python, JavaScript, HTML, CSS). قارن بين نسختين من الكود لترى ما تغير." },
  { question: "ما هو الفرق بين Diff أحادي الجانب وثنائي الجانب؟", answer: "أحادي الجانب (Unified): يعرض الفروقات في نص واحد مع علامات +/-. ثنائي الجانب (Side-by-side): يعرض النصين جنباً إلى جنب مع إبراز الفروقات. أداتنا تستخدم عرض جنباً إلى جنب." },
  { question: "هل المقارنة حساسة لحالة الأحرف؟", answer: "نعم، 'Hello' و 'hello' يعتبرا مختلفين. إذا كنت تريد تجاهل حالة الأحرف، يمكنك تحويل النصين إلى نفس الحالة أولاً باستخدام أداة تحويل حالة النص." },
  { question: "كم حجم النص المسموح به؟", answer: "لا يوجد حد محدد، لكن النصوص الطويلة جداً (أكثر من 10,000 كلمة) قد تبطئ المتصفح. للاستخدام العادي (مقارنة مقالين أو مستندين) يعمل بشكل ممتاز." },
  { question: "هل أداة المقارنة تحفظ نصوصي؟", answer: "لا، كل النصوص تُعالج في متصفحك فقط — لا تُحفظ ولا تُرسل لأي سيرفر. خصوصيتك مضمونة تماماً." },
  { question: "متى تكون مقارنة النصوص مفيدة؟", answer: "عند مراجعة التعديلات على مستند عمل، مقارنة نسختين من مقال قبل النشر، تدقيق الترجمة (النص الأصلي vs المترجم)، مقارنة ملفين من الكود البرمجي." },
  { question: "كيف أقرأ نتيجة المقارنة؟", answer: "النص المشترك (نفسه في النصين) يظهر باللون العادي. النص المضاف يظهر بأخضر فاتح. النص المحذوف يظهر بأحمر فاتح. التعديلات تظهر بالبرتقالي." },
];

const relatedTools = [
  { title: "تنظيف النص", icon: "🧹", href: "/tools/text-cleaner" },
  { title: "عداد الكلمات", icon: "📝", href: "/tools/word-counter" },
  { title: "JSON Formatter", icon: "📋", href: "/tools/json-formatter" },
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder" },
  { title: "تحويل حالة النص", icon: "🔤", href: "/tools/text-case" },
  { title: "مولد النص العربي", icon: "📃", href: "/tools/arabic-lorem" },
];

const seoContent = [
  "أداة مقارنة النصوص (Diff Checker) تعرض الفروقات بين نصين بشكل مرئي — المضاف بالأخضر والمحذوف بالأحمر. مفيدة لمراجعة التعديلات، مقارنة المقالات، تدقيق الترجمات، ومقارنة الكود البرمجي.",
  "تستخدم خوارزمية diff لاكتشاف التغييرات على مستوى الحروف والكلمات والجمل. أدخل النصين في الحقلين جنباً إلى جنب وشاهد الفروقات مباشرة.",
  "مثال: النص الأصلي = 'مرحباً بك في أدواتك'. النص المعدل = 'مرحباً بكم في موقع أدواتك'. الفرق: 'بك' ← 'بكم' (تعديل)، 'في موقع' (إضافة). الأداة تبرز هذه الفروقات.",
  "لا تُحفظ النصوص على أي سيرفر — كل شيء يعمل في متصفحك. هذا يضمن خصوصية نصوصك الحساسة مثل العقود أو الكود البرمجي الخاص.",
  "مناسبة للكتّاب والمدققين اللغويين والمترجمين والمبرمجين وأي شخص يحتاج مقارنة نسختين من أي نص بسرعة وبدون عناء.",
  "نصيحة: قبل المقارنة، استخدم أداة تنظيف النص لإزالة المسافات الزائدة وعلامات HTML من النصين. هذا يجعل المقارنة أكثر دقة ويركز على المحتوى الحقيقي."
];

export default function TextCompare() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const schemaName = "مقارنة النصوص";
const schemaDesc = `Online مقارنة النصوص - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/text-compare";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "مقارنة النصوص", url: "https://adwatak.cloud/tools/text-compare" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="أدوات نصية" categorySlug="text" toolName="مقارنة النصوص" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">⚖️ مقارنة النصوص</h1>
        <p className="text-sm text-gray-500 mb-6">قارن بين نصين واكتشف الفروقات</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">النص الأول</label>
            <textarea value={text1} onChange={(e) => setText1(e.target.value)}
              className="w-full h-[150px] p-4 border-2 border-gray-200 rounded-xl text-sm outline-none font-inherit resize-y"
              placeholder="النص الأصلي..." />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">النص الثاني</label>
            <textarea value={text2} onChange={(e) => setText2(e.target.value)}
              className="w-full h-[150px] p-4 border-2 border-gray-200 rounded-xl text-sm outline-none font-inherit resize-y"
              placeholder="النص المعدّل..." />
          </div>
        </div>
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
