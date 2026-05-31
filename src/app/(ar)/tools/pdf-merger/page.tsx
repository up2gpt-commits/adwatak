"use client";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "هل ملفاتي آمنة عند استخدام الأداة؟", answer: "نعم، كل المعالجة تتم في المتصفح (Client-side) ولا يُرفع أي ملف لأي خادم. بياناتك لا تغادر جهازك مطلقاً — أمان تام." },
  { question: "ما هو الحد الأقصى لحجم الملفات؟", answer: "يعتمد على ذاكرة جهازك. للملفات تحت 50 ميجابايت يعمل بسلاسة. الملفات الأكبر قد تحتاج وقتاً أو ذاكرة إضافية. جرب بملفات صغيرة أولاً." },
  { question: "هل يمكنني دمج ملفات بترتيب معين؟", answer: "نعم، اختر الملفات بالترتيب المطلوب — سيتم دمجها بنفس الترتيب الذي اخترتها. اسحب الملفات بالترتيب الذي تريده قبل الضغط على دمج." },
  { question: "ما الفرق بين دمج PDF وضم الصفحات؟", answer: "دمج = جمع عدة ملفات PDF في ملف واحد متعدد الصفحات. ضم = إضافة صفحات من ملف لآخر. أداتنا تدعم دمج الملفات الكاملة." },
  { question: "هل يمكن دمج PDF مع صور؟", answer: "لدمج صور مع PDF، استخدم أداة 'صورة إلى PDF' أولاً لتحويل الصور لـ PDF، ثم ادمج مع ملفات PDF الأخرى." },
  { question: "هل يدعم دمج PDF المحمي بكلمة سر؟", answer: "لا، الملفات المحمية بكلمة سر لا يمكن دمجها بدون فك الحماية أولاً. قم بفك الحماية قبل الرفع." },
  { question: "كم عدد الملفات التي يمكن دمجها؟", answer: "حتى 10 ملفات PDF في المرة الواحدة. إذا احتجت أكثر، ادمج على دفعات — ادمج أول 5، ثم ادمج الناتج مع الباقي." },
  { question: "ما جودة الـ PDF الناتج عن الدمج؟", answer: "جودة أصلية — لا يتم ضغط أو تقليل جودة الصفحات. الملف الناتج بنفس جودة الملفات الأصلية." },
];

const relatedTools = [
  { title: "صورة إلى PDF", icon: "🖼️", href: "/tools/image-to-pdf" },
  { title: "تحويل الألوان", icon: "🎨", href: "/tools/color-converter" },
  { title: "تحويل الوحدات", icon: "📐", href: "/tools/unit-converter" },
  { title: "مولد الفواتير", icon: "🧾", href: "/tools/invoice-generator" },
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder" },
  { title: "مقارنة النصوص", icon: "⚖️", href: "/tools/text-compare" },
];

const seoContent = [
  "أداة دمج ملفات PDF تساعدك على دمج عدة ملفات PDF في ملف واحد مرتب. تعمل بالكامل في المتصفح بدون رفع ملفات — خصوصيتك محفوظة. مفيد لجمع المستندات، التقارير، الفواتير، والعقود.",
  "كيف تستخدم الأداة: اختر الملفات بالترتيب المطلوب، انتظر حتى تظهر جميعها، ثم اضغط دمج. الملف الناتج يحتوي على كل الصفحات بنفس الجودة الأصلية.",
  "تطبيقات عملية: جمع فواتير الشهر في ملف واحد، دمج صفحات عقد طويل (اتفاقية + ملاحق + جداول)، توحيد تقارير العمل في مستند واحد للإرسال، وجمع أوراق العمل والسير الذاتية للمتقدمين لوظيفة.",
  "الأداة مجانية بالكامل، لا حد أقصى لعدد الملفات عملياً، وتدعم جميع أنواع PDF."
];

export default function PdfMerger() {
  const schemaName = "دمج ملفات PDF";
const schemaDesc = `Online دمج ملفات PDF - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/pdf-merger";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "دمج ملفات PDF", url: "https://adwatak.cloud/tools/pdf-merger" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="محولات" categorySlug="converters" toolName="دمج ملفات PDF" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📎 دمج ملفات PDF</h1>
        <p className="text-sm text-gray-500 mb-6">ادمج عدة ملفات PDF في ملف واحد</p>
        <div className="bg-gray-50 rounded-xl p-10 text-center border-2 border-dashed border-gray-300">
          <p className="text-3xl mb-3">📄</p>
          <p className="text-gray-500 mb-4">اسحب ملفات PDF هنا أو اضغط للاختيار</p>
          <button className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl border-none cursor-pointer font-inherit">اختر ملفات</button>
        </div>
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
