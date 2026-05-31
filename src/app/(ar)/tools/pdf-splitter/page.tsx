"use client";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "هل يمكنني تقسيم صفحات محددة من ملف PDF؟", answer: "نعم، اختر نطاق الصفحات التي تريد استخراجها (مثلاً صفحات 3-7 من ملف 10 صفحات). الملف الناتج يحتوي على الصفحات المحددة فقط." },
  { question: "هل الملفات آمنة عند التقسيم؟", answer: "نعم، كل المعالجة تتم في المتصفح (Client-side). لا يُرفع ملفك لأي خادم. بياناتك لا تغادر جهازك." },
  { question: "ما هو الحد الأقصى لحجم الملف للتقسيم؟", answer: "يعتمد على ذاكرة جهازك. الملفات حتى 50 ميجابايت تعمل بسلاسة. الملفات الأكبر قد تحتاج وقتاً إضافياً." },
  { question: "متى أحتاج تقسيم ملف PDF؟", answer: "عند إرسال جزء فقط من مستند طويل (مثلاً تقرير كبير)، استخراج صفحة معينة من عقد، فصل ملحق عن مستند رئيسي، أو إزالة صفحات غير مرغوب فيها." },
  { question: "هل يمكن تقسيم كل صفحة في ملف PDF؟", answer: "نعم، يمكن استخراج صفحة واحدة فقط أو مجموعة صفحات. ادخل النطاق المطلوب (مثلاً 1, 3-5, 7-9)." },
  { question: "ما الفرق بين تقسيم PDF واستخراج الصفحات؟", answer: "نفس المفهوم. تقسيم = أخذ نطاق صفحات من الملف الأصلي وإنشاء ملف جديد يحتوي عليها. الملف الأصلي يبقى كما هو." },
  { question: "هل تدعم الأداة تقسيم PDF المحمي بكلمة سر؟", answer: "لا، الملفات المحمية تحتاج فك الحماية أولاً. استخدم أداة فك حماية PDF المتخصصة." },
  { question: "هل يمكن تقسيم PDF إلى عدة ملفات؟", answer: "حالياً، الأداة تنتج ملفاً واحداً يحتوي على الصفحات المحددة. للتقسيم المتعدد، استخدم الأداة عدة مرات." },
];

const relatedTools = [
  { title: "دمج ملفات PDF", icon: "📎", href: "/tools/pdf-merger" },
  { title: "صورة إلى PDF", icon: "🖼️", href: "/tools/image-to-pdf" },
  { title: "تحويل الألوان", icon: "🎨", href: "/tools/color-converter" },
  { title: "تحويل الوحدات", icon: "📐", href: "/tools/unit-converter" },
  { title: "مولد الفواتير", icon: "🧾", href: "/tools/invoice-generator" },
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder" },
];

const seoContent = [
  "أداة تقسيم ملفات PDF تساعدك على استخراج صفحات محددة من ملف PDF. اختر الصفحات المطلوبة واحصل على ملف جديد يحتوي عليها فقط. تعمل بالكامل في المتصفح — خصوصية تامة.",
  "متى تحتاج تقسيم PDF: مستند طويل تريد إرسال جزء منه فقط (مثلاً تقرير 50 صفحة، تحتاج الصفحات 10-20). عقد تريد فصل صفحة التوقيع. مستند به صفحات غير مرغوب فيها تريد إزالتها.",
  "كيف تستخدم الأداة: ارفع ملف PDF، أدخل نطاق الصفحات المطلوب (مثلاً 1-5 أو 3,7,9 أو 1-10), اضغط تقسيم. الملف الناتج يُحمّل فوراً.",
  "الأداة مجانية بالكامل، تدعم جميع أنواع PDF، ولا تخزّن أي ملفات على الخوادم."
];

export default function PdfSplitter() {
  const schemaName = "تقسيم ملفات PDF";
const schemaDesc = `Online تقسيم ملفات PDF - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/pdf-splitter";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "تقسيم ملفات PDF", url: "https://adwatak.cloud/tools/pdf-splitter" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="محولات" categorySlug="converters" toolName="تقسيم ملفات PDF" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📄 تقسيم ملفات PDF</h1>
        <p className="text-sm text-gray-500 mb-6">استخراج صفحات محددة من ملف PDF</p>
        <div className="bg-gray-50 rounded-xl p-10 text-center border-2 border-dashed border-gray-300">
          <p className="text-3xl mb-3">📄</p>
          <p className="text-gray-500">اسحب ملف PDF هنا أو اضغط للاختيار</p>
        </div>
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
