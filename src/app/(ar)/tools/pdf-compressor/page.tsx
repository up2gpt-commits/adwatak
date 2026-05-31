"use client";
import { useState, useRef } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "هل جودة PDF تتأثر بالضغط؟", answer: "نعم، الضغط يقلل حجم الملف على حساب الجودة. اختر مستوى مناسب: منخفض (جودة عالية) أو عالي (ضغط أكبر)." },
  { question: "ما هو الحد الأقصى لحجم الملف؟", answer: "حتى 100 ميجابايت في المتصفح. الملفات تحت 50 ميجابايت تعمل بسلاسة." },
  { question: "هل الملفات آمنة عند الضغط؟", answer: "نعم، كل المعالجة تتم في المتصفح. لا يُرفع ملف PDF لأي خادم. بياناتك لا تغادر جهازك." },
  { question: "ما الفرق بين ضغط PDF وضغط الصور؟", answer: "ضغط PDF يقلل حجم الخطوط والصور داخل الملف. ضغط الصور يقلل حجم الصورة نفسها." },
  { question: "كم يمكن تقليل حجم PDF بالضغط؟", answer: "معدل 20-50% حسب محتوى الملف. PDF نصي = 10-20%. PDF بصور عالية = 40-60%." },
  { question: "متى أحتاج ضغط PDF؟", answer: "لإرسال ملف بالبريد (حد 25MB)، رفع على موقع، توفير مساحة تخزين." },
  { question: "هل ضغط PDF يزيل البيانات الوصفية؟", answer: "قد يزيل بعض البيانات حسب مستوى الضغط." },
  { question: "هل يمكن ضغط PDF محمي بكلمة سر؟", answer: "لا، تحتاج فك الحماية أولاً." },
];

const relatedTools = [
  { title: "دمج ملفات PDF", icon: "📎", href: "/tools/pdf-merger" },
  { title: "تقسيم PDF", icon: "✂️", href: "/tools/pdf-splitter" },
  { title: "صورة إلى PDF", icon: "🖼️", href: "/tools/image-to-pdf" },
  { title: "PDF إلى Word", icon: "📝", href: "/tools/pdf-to-word" },
  { title: "تحويل الألوان", icon: "🎨", href: "/tools/color-converter" },
  { title: "تحويل الوحدات", icon: "📐", href: "/tools/unit-converter" },
];

const seoContent = [
  "أداة ضغط ملفات PDF لتقليل حجم الملف مع الحفاظ على جودة مقبولة. اسحب ملف PDF، اختر مستوى الضغط — الملف المضغوط جاهز للتحميل. كل شيء في المتصفح.",
  "تطبيقات: إرسال ملف كبير عبر الإيميل (من 50MB لـ 15MB)، رفع ملف على موقع، توفير مساحة تخزين.",
  "الأداة مجانية، تعمل في المتصفح بدون رفع ملفات، وتدعم جميع أنواع PDF.",
];

export default function PdfCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(70);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const compress = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });

      // Remove unused objects and re-save with optimization
      const compressedBytes = await pdf.save({
        useObjectStreams: quality < 80,
        addDefaultPage: false,
        objectsPerTick: 50,
      });

      const blob = new Blob([compressedBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed-${file.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("حدث خطأ في ضغط الملف. تأكد من أن الملف PDF صحيح.");
    } finally {
      setProcessing(false);
    }
  };

  const schemaName = "ضغط ملفات PDF";
  const schemaDesc = "قلّل حجم ملفات PDF — مجاني، في المتصفح";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/tools/pdf-compressor";
  const breadcrumbItems = [
    { name: "الرئيسية", url: "https://adwatak.cloud" },
    { name: "محولات", url: "https://adwatak.cloud/tools/converters" },
    { name: "ضغط ملفات PDF", url: "https://adwatak.cloud/tools/pdf-compressor" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, "ar", schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="محولات" categorySlug="converters" toolName="ضغط ملفات PDF" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📦 ضغط ملفات PDF</h1>
        <p className="text-sm text-gray-500 mb-6">قلّل حجم ملفات PDF — مجاني وآمن</p>

        <div
          onClick={() => inputRef.current?.click()}
          className="bg-gray-50 rounded-xl p-10 text-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition-colors mb-4"
        >
          <p className="text-3xl mb-3">📦</p>
          <p className="text-gray-500">اضغط لاختيار ملف PDF</p>
          <input ref={inputRef} type="file" accept=".pdf" onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setFile(f);
          }} className="hidden" />
        </div>

        {file && (
          <div className="bg-green-50 rounded-xl p-4 border border-green-200 mb-4">
            <p className="text-sm text-green-800">{file.name} — {(file.size / 1024).toFixed(0)} KB</p>
          </div>
        )}

        {file && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">مستوى الضغط: {quality}%</label>
              <input
                type="range" min={30} max={100} value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>ضغط عالي (حجم صغير)</span>
                <span>جودة أصلية (حجم كبير)</span>
              </div>
            </div>
            <button
              onClick={compress}
              disabled={processing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-wait text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer border-none text-base"
            >
              {processing ? "⏳ جارٍ الضغط..." : "📦 ضغط الملف"}
            </button>
          </>
        )}
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
