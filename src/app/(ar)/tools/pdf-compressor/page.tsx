"use client";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "هل جودة PDF تتأثر بالضغط؟", answer: "نعم، الضغط يقلل حجم الملف على حساب الجودة. يمكنك اختيار مستوى الضغط: منخفض (جودة عالية، ضغط قليل) إلى عالي (جودة منخفضة، ضغط كبير). جرب مستوى مناسب لاستخدامك." },
  { question: "ما هو الحد الأقصى لحجم الملف؟", answer: "حتى 100 ميجابايت في المتصفح الحالي. الملفات الأكبر من 100 ميجابايت قد تسبب بطئاً. للاستخدام اليومي، الملفات تحت 50 ميجابايت تعمل بسلاسة." },
  { question: "هل الملفات آمنة عند الضغط؟", answer: "نعم، كل المعالجة تتم في المتصفح. لا يُرفع ملف PDF لأي خادم. بياناتك لا تغادر جهازك — أمان تام." },
  { question: "ما الفرق بين ضغط PDF وضغط الصور؟", answer: "ضغط PDF يقلل حجم الصور والخطوط داخل الملف. ضغط الصور يقلل حجم الصورة نفسها. إذا كان PDF يحتوي صوراً كبيرة، الضغط يقلل حجمه بشكل كبير." },
  { question: "كم يمكن تقليل حجم PDF بالضغط؟", answer: "معدل 30-60% تقليل حسب محتوى الملف. PDF نصي (بدون صور) → تقليل 20-30%. PDF بصور عالية الدقة → تقليل 50-80%. PDF بخطوط مدمجة → تقليل 10-20%." },
  { question: "متى أحتاج ضغط PDF؟", answer: "عند إرسال ملف بالبريد الإلكتروني (الحد الأقصى 25 ميجابايت)، رفع ملف على موقع (حدود 5-10 ميجابايت)، توفير مساحة تخزين، أو تسريع تحميل الملفات على موقعك." },
  { question: "هل ضغط PDF يزيل البيانات الوصفية (Metadata)؟", answer: "نعم، بعض مستويات الضغط تزيل البيانات الوصفية (العنوان، المؤلف، التاريخ). إذا كنت تريد الاحتفاظ بها، اختر مستوى ضغط منخفض." },
  { question: "هل يمكن ضغط PDF محمي بكلمة سر؟", answer: "لا، تحتاج فك الحماية أولاً. استخدم أداة فك حماية PDF المتخصصة قبل الضغط." },
];

const relatedTools = [
  { title: "دمج ملفات PDF", icon: "📎", href: "/tools/pdf-merger" },
  { title: "صورة إلى PDF", icon: "🖼️", href: "/tools/image-to-pdf" },
  { title: "تقسيم PDF", icon: "✂️", href: "/tools/pdf-splitter" },
  { title: "تحويل الوحدات", icon: "📐", href: "/tools/unit-converter" },
  { title: "تحويل الألوان", icon: "🎨", href: "/tools/color-converter" },
  { title: "مولد الفواتير", icon: "🧾", href: "/tools/invoice-generator" },
];

const seoContent = [
  "أداة ضغط ملفات PDF تساعدك على تقليل حجم الملف مع الحفاظ على جودة مقبولة. اسحب ملف PDF، اختر مستوى الضغط، وانتظر — الملف المضغوط جاهز للتحميل. كل شيء في المتصفح.",
  "تطبيقات عملية: إرسال ملف كبير عبر الإيميل (يقلص من 50MB لـ 15MB)، رفع ملف على موقع (من 20MB لـ 8MB)، توفير مساحة تخزين على جهازك (ضغط 100 ملف بحجم 500MB لـ 250MB).",
  "جرب الضغط على مستوى منخفض أولاً — فرق الحجم قد يكون كبيراً بدون تأثير ملحوظ على الجودة. إذا احتجت تقليلاً أكبر، استخدم ضغطاً أعلى.",
  "الأداة مجانية، تعمل في المتصفح بدون رفع ملفات، وتدعم جميع أنواع PDF."
];

export default function PdfCompressor() {
  const schemaName = "ضغط ملفات PDF";
const schemaDesc = `Online ضغط ملفات PDF - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/pdf-compressor";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "ضغط ملفات PDF", url: "https://adwatak.cloud/tools/pdf-compressor" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="محولات" categorySlug="converters" toolName="ضغط ملفات PDF" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📦 ضغط ملفات PDF</h1>
        <p className="text-sm text-gray-500 mb-6">تقليل حجم ملفات PDF بضغطة زر</p>
        <div className="bg-gray-50 rounded-xl p-10 text-center border-2 border-dashed border-gray-300">
          <p className="text-3xl mb-3">📦</p>
          <p className="text-gray-500">اسحب ملف PDF هنا</p>
        </div>
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
