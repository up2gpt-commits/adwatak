"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";

const words = ["لوريم", "إيبسوم", "نموذج", "نصي", "يستخدم", "في", "صناعة", "الطباعة", "والنشر", "عربي", "محتوى", "افتراضي", "للتجربة", "تصميم", "موقع", "تطبيق", "عرض", "تجريبي", "كلمات", "نصوص", "شاشة", "معاينة", "مشروع", "فكرة", "مبدئي", "Lorem", "ipsum", "dolor", "sit", "amet", "consectetur"];

const faqs = [
  { question: "ما هو Lorem Ipsum؟", answer: "نص وهمي يُستخدم في التصميم والطباعة كعنصر نائب (Placeholder) قبل إضافة النص الحقيقي. يسمح للمصممين والعملاء برؤية التصميم بدون تشتيت بالمحتوى الحقيقي." },
  { question: "ما الفرق بين Lorem Ipsum العادي والعربي؟", answer: "اللاتيني (Lorem Ipsum) يستخدم كلمات لاتينية لا معنى لها. العربي يولد كلمات عربية حقيقية لكن بلا سياق — مثل 'لوريم إيبسوم هو نموذج نصي للطباعة والنشر'. هذا يعطي مظهراً أكثر واقعية للتصاميم العربية." },
  { question: "لماذا أحتاج مولد نص عربي؟", answer: "لتصميم المواقع العربية، التطبيقات، الإعلانات، النماذج التجريبية، وعروض العملاء. النص العربي الحقيقي يبدو أفضل من النسخ اللاتينية للمشاريع العربية." },
  { question: "كم عدد الفقرات التي يمكن توليدها؟", answer: "من 1 إلى 20 فقرة. كل فقرة حوالي 30-50 كلمة. اختر العدد المناسب لتصميمك. فقرات قليلة لمعاينة سريعة، فقرات كثيرة لملء صفحة كاملة." },
  { question: "هل النص العربي المولد مناسب للـ SEO؟", answer: "لا، النص المولد لا يعتبر محتوى حقيقياً. Google يعاقب المواقع التي تستخدم محتوى مولداً. استخدم النص فقط للتصميم والتجربة قبل إضافة المحتوى الحقيقي." },
  { question: "متى أستخدم مولد النص في التصميم؟", answer: "في بداية أي مشروع تصميم: عرض أولي للعميل، نموذج تجريبي (Prototype)، تصميم واجهة المستخدم (UI)، وتجربة تخطيط الصفحة. استبدل النص بالمحتوى الحقيقي قبل النشر." },
  { question: "هل توجد بدائل عربية لـ Lorem Ipsum؟", answer: "نعم، مولد النص العربي في أدواتك هو أحدها. يوجد أيضاً مولدات مثل arabic-lorem.com و lorem-arabic.net. لكن أداتنا مجانية وتعمل في المتصفح بدون إنترنت." },
  { question: "كيف أستخدم النص المولد؟", answer: "اختر عدد الفقرات (1-20)، اضغط 'ولّد'، ثم انسخ النص والصقه في تصميمك. يمكنك إعادة التوليد لتحصل على نص مختلف في كل مرة." },
  { question: "هل النص العربي المولد يناسب التطبيقات؟", answer: "نعم، مفيد لتجربة وتصحيح التطبيقات — خاصة لاختبار اتجاه RTL (من اليمين لليسار) والتنسيق العربي في CSS." },
  { question: "ما طول الفقرة المتوقع؟", answer: "30-50 كلمة لكل فقرة. حوالي 150-250 كلمة لكل 5 فقرات (كافية لتصميم صفحة كاملة). يمكنك ضبط العدد حسب احتياجك." },
];

const relatedTools = [
  { title: "عداد الكلمات", icon: "📝", href: "/tools/word-counter" },
  { title: "تحويل حالة النص", icon: "🔤", href: "/tools/text-case" },
  { title: "تنظيف النص", icon: "🧹", href: "/tools/text-cleaner" },
  { title: "مقارنة النصوص", icon: "⚖️", href: "/tools/text-compare" },
  { title: "JSON Formatter", icon: "📋", href: "/tools/json-formatter" },
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder" },
];

const seoContent = [
  "مولد النص العربي (Arabic Lorem Ipsum) يولد نصاً عربياً بديلاً للنص اللاتيني التقليدي. مثالي لتصميم المواقع العربية والتطبيقات وعروض العملاء — يعطي شكلاً واقعياً للتصميمات العربية.",
  "كل فقرة تحتوي على 30-50 كلمة عربية حقيقية (عدا بعض الكلمات اللاتينية للزينة). اختر عدد الفقرات من 1 إلى 20. النص يتغير كل مرة لتعطي تنوعاً في المعاينة.",
  "استخدامات مولد النص العربي: تصميم واجهات المستخدم للتطبيقات العربية، إنشاء نماذج تجريبية (Prototypes) لمشاريع العملاء، معاينة تخطيط الصفحات في المواقع الإخبارية والمدونات، تجربة اتجاه RTL وتحسينات CSS للغة العربية.",
  "نصيحة: استخدم النص العربي بدلاً من اللاتيني في مشاريعك العربية. العميل والمستخدم العربي يقرأ النص العربي بشكل أفضل ويحصل على تصور أدق للتصميم النهائي.",
  "الأداة مجانية، تعمل في المتصفح بدون إنترنت، ولا تخزن أي بيانات."
];

export default function ArabicLorem() {
  const [paragraphs, setParagraphs] = useState(3);
  const [result, setResult] = useState("");

  const generate = () => {
    let text = "";
    for (let p = 0; p < paragraphs; p++) {
      let para = "";
      const count = 30 + Math.floor(Math.random() * 20);
      for (let i = 0; i < count; i++) para += words[Math.floor(Math.random() * words.length)] + " ";
      text += para.trim() + ".\n\n";
    }
    setResult(text.trim());
  };

  const schemaName = "مولد النص العربي";
const schemaDesc = `Online مولد النص العربي - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/arabic-lorem";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "مولد النص العربي", url: "https://adwatak.cloud/tools/arabic-lorem" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="أدوات نصية" categorySlug="text" toolName="مولد النص العربي" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📃 مولد النص العربي</h1>
        <p className="text-sm text-gray-500 mb-6">نص عربي للتصميم والمشاريع</p>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">عدد الفقرات</label>
          <input type="number" value={paragraphs} onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)} min="1" max="20"
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" />
        </div>
        <button onClick={generate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          ولّد
        </button>
      </div>
      {result && (
        <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200 whitespace-pre-wrap text-sm leading-7 text-gray-700">
          {result}
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    </div>
  );
}
