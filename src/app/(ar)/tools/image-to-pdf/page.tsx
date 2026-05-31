"use client";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما الصيغ المدعومة للتحويل إلى PDF؟", answer: "JPG (JPEG), PNG, BMP, WebP. كل الصيغ الشائعة للصور. الصيغ الأخرى (GIF, TIFF) سيتم إضافتها قريباً." },
  { question: "هل تفقد الصور جودتها عند التحويل؟", answer: "لا، يتم الحفاظ على الجودة الأصلية للصورة. الـ PDF الناتج يحتوي على الصور بنفس الدقة والألوان الأصلية." },
  { question: "هل يمكنني تحويل عدة صور مرة واحدة إلى PDF واحد؟", answer: "نعم، اختر عدة صور — سيتم دمجها جميعاً في ملف PDF واحد متعدد الصفحات. كل صورة = صفحة." },
  { question: "ما ترتيب الصور في الـ PDF الناتج؟", answer: "بنفس الترتيب الذي اخترتها. الصورة الأولى المختارة = الصفحة الأولى في PDF." },
  { question: "هل يمكنني ضبط حجم الصفحة في الـ PDF؟", answer: "حالياً، كل صورة تأخذ صفحة كاملة بنفس أبعادها الأصلية. قريباً: خيارات تخصيص حجم الصفحة." },
  { question: "هل تدعم الأداة الصور عالية الدقة؟", answer: "نعم، الصور حتى 20 ميجابكسل تعمل بشكل جيد. الصور الأكبر قد تحتاج وقتاً أطول للمعالجة." },
  { question: "هل يمكن تحويل صورة ممسوحة ضوئياً (Scanned) لـ PDF؟", answer: "نعم، الصور الممسوحة ضوئياً (JPG, PNG) تتحول مباشرة لـ PDF. هذا مفيد للمستندات الورقية القديمة." },
  { question: "ما استخدامات تحويل الصور لـ PDF؟", answer: "تحويل مستندات ورقية ممسوحة ضوئياً لملف PDF، إنشاء ملف PDF من صور متعددة (عرض تقديمي، فهرس)، أرشفة الصور بصيغة PDF موحدة، إرسال مجموعة صور كملف واحد." },
];

const relatedTools = [
  { title: "دمج ملفات PDF", icon: "📎", href: "/tools/pdf-merger" },
  { title: "تقسيم ملفات PDF", icon: "✂️", href: "/tools/pdf-splitter" },
  { title: "تحويل الألوان", icon: "🎨", href: "/tools/color-converter" },
  { title: "تحويل الوحدات", icon: "📐", href: "/tools/unit-converter" },
  { title: "مولد الفواتير", icon: "🧾", href: "/tools/invoice-generator" },
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder" },
];

const seoContent = [
  "أداة تحويل الصور إلى PDF تساعدك على تحويل صورة أو أكثر (JPG, PNG, BMP, WebP) إلى ملف PDF واحد. اختر الصور، انتظر المعالجة، وحمّل الناتج — كل شيء في المتصفح.",
  "مفيدة لتحويل المستندات الممسوحة ضوئياً إلى PDF، إنشاء ملفات PDF من صور متعددة (عروض، فهارس)، أرشفة الصور بصيغة قياسية، وإرسال مجموعة صور كملف واحد.",
  "المعالجة بالكامل في المتصفح (Client-side) — الصور لا تُرفع لأي خادم. خصوصية تامة لمستنداتك الحساسة.",
  "الأداة مجانية، تدعم الصور حتى 20 ميجابكسل، وتحافظ على جودة الصور الأصلية."
];

export default function ImageToPdf() {
  const schemaName = "صورة إلى PDF";
const schemaDesc = `Online صورة إلى PDF - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/image-to-pdf";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "صورة إلى PDF", url: "https://adwatak.cloud/tools/image-to-pdf" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="محولات" categorySlug="converters" toolName="صورة إلى PDF" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🖼️ صورة إلى PDF</h1>
        <p className="text-sm text-gray-500 mb-6">حوّل الصور إلى ملف PDF بجودة عالية</p>
        <div className="bg-gray-50 rounded-xl p-10 text-center border-2 border-dashed border-gray-300">
          <p className="text-3xl mb-3">📸</p>
          <p className="text-gray-500">اسحب الصور هنا أو اضغط للاختيار</p>
          <p className="text-xs text-gray-400 mt-2">JPG, PNG, BMP, WebP</p>
        </div>
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
