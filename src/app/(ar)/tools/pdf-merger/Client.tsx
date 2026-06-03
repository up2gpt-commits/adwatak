"use client";
import { useState, useRef } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "هل ملفاتي آمنة عند استخدام الأداة؟", answer: "نعم، كل المعالجة تتم في المتصفح (Client-side) ولا يُرفع أي ملف لأي خادم. بياناتك لا تغادر جهازك مطلقاً — أمان تام." },
  { question: "ما هو الحد الأقصى لحجم الملفات؟", answer: "يعتمد على ذاكرة جهازك. للملفات تحت 50 ميجابايت يعمل بسلاسة. الملفات الأكبر قد تحتاج وقتاً أو ذاكرة إضافية." },
  { question: "هل يمكنني دمج ملفات بترتيب معين؟", answer: "نعم، اختر الملفات بالترتيب المطلوب — سيتم دمجها بنفس الترتيب الذي اخترتها." },
  { question: "ما الفرق بين دمج PDF وضم الصفحات؟", answer: "دمج = جمع عدة ملفات PDF في ملف واحد متعدد الصفحات. ضم = إضافة صفحات من ملف لآخر. أداتنا تدعم دمج الملفات الكاملة." },
  { question: "هل يمكن دمج PDF مع صور؟", answer: "لدمج صور مع PDF، استخدم أداة 'صورة إلى PDF' أولاً لتحويل الصور لـ PDF، ثم ادمج مع ملفات PDF الأخرى." },
  { question: "هل يدعم دمج PDF المحمي بكلمة سر؟", answer: "لا، الملفات المحمية بكلمة سر لا يمكن دمجها بدون فك الحماية أولاً." },
  { question: "كم عدد الملفات التي يمكن دمجها؟", answer: "حتى 10 ملفات PDF في المرة الواحدة." },
  { question: "ما جودة الـ PDF الناتج عن الدمج؟", answer: "جودة أصلية — لا يتم ضغط أو تقليل جودة الصفحات. الملف الناتج بنفس جودة الملفات الأصلية." },
];

const relatedTools = [
  { title: "تقسيم PDF", icon: "✂️", href: "/tools/pdf-splitter" },
  { title: "ضغط PDF", icon: "📦", href: "/tools/pdf-compressor" },
  { title: "صورة إلى PDF", icon: "🖼️", href: "/tools/image-to-pdf" },
  { title: "PDF إلى Word", icon: "📝", href: "/tools/pdf-to-word" },
  { title: "تحويل الألوان", icon: "🎨", href: "/tools/color-converter" },
  { title: "تحويل الوحدات", icon: "📐", href: "/tools/unit-converter" },
];

const seoContent = [
  "أداة دمج ملفات PDF تساعدك على دمج عدة ملفات PDF في ملف واحد مرتب. تعمل بالكامل في المتصفح بدون رفع ملفات — خصوصيتك محفوظة.",
  "كيف تستخدم الأداة: اختر الملفات بالترتيب المطلوب، انتظر حتى تظهر جميعها، ثم اضغط دمج. الملف الناتج يحتوي على كل الصفحات بنفس الجودة الأصلية.",
  "تطبيقات عملية: جمع فواتير الشهر في ملف واحد، دمج صفحات عقد طويل، توحيد تقارير العمل في مستند واحد للإرسال.",
  "الأداة مجانية بالكامل، تدعم حتى 10 ملفات، وتحافظ على جودة الملفات الأصلية.",
];

export default function Client() {
  const [files, setFiles] = useState<{ file: File; id: number }[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const idCounter = useRef(0);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const pdfs: { file: File; id: number }[] = [];
    for (let i = 0; i < newFiles.length; i++) {
      if (newFiles[i].type === "application/pdf") {
        pdfs.push({ file: newFiles[i], id: idCounter.current++ });
      }
    }
    setFiles((prev) => [...prev, ...pdfs]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (id: number) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const merge = async () => {
    if (files.length < 2) return;
    setProcessing(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const mergedPdf = await PDFDocument.create();
      let total = files.length;

      for (let i = 0; i < files.length; i++) {
        setProgress(`دمج ${i + 1}/${total}...`);
        const fileBytes = await files[i].file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      setProgress("إنشاء الملف النهائي...");
      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      a.click();
      URL.revokeObjectURL(url);
      setProgress("");
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء الدمج. تأكد من أن جميع الملفات PDF صحيحة.");
    } finally {
      setProcessing(false);
    }
  };

  const schemaName = "دمج ملفات PDF";
  const schemaDesc = "ادمج عدة ملفات PDF في ملف واحد — مجاني، في المتصفح";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/tools/pdf-merger";
  const breadcrumbItems = [
    { name: "الرئيسية", url: "https://adwatak.cloud" },
    { name: "محولات", url: "https://adwatak.cloud/category/converters" },
    { name: "دمج ملفات PDF", url: "https://adwatak.cloud/tools/pdf-merger" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, "ar", schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb category="محولات" categorySlug="converters" toolName="دمج ملفات PDF" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📎 دمج ملفات PDF</h1>
        <p className="text-sm text-gray-500 mb-6">ادمج عدة ملفات PDF في ملف واحد — مجاني وآمن</p>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => hiddenInputRef.current?.click()}
          className="bg-gray-50 rounded-xl p-10 text-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition-colors"
        >
          <p className="text-3xl mb-3">📄</p>
          <p className="text-gray-500 mb-4">اسحب ملفات PDF هنا أو اضغط للاختيار</p>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl border-none cursor-pointer transition-all"
          >
            اختر ملفات
          </button>
          <input ref={hiddenInputRef} type="file" accept=".pdf" multiple onChange={(e) => handleFiles(e.target.files)} className="hidden" />
        </div>

        {files.length > 0 && (
          <div className="mt-6">
            <div className="space-y-2 mb-4">
              {files.map((f, i) => (
                <div key={f.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                  <span className="text-sm text-gray-700">
                    {i + 1}. {f.file.name} ({(f.file.size / 1024).toFixed(0)} KB)
                  </span>
                  <button onClick={() => removeFile(f.id)} className="text-red-500 text-sm cursor-pointer border-none bg-transparent">
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={merge}
              disabled={processing || files.length < 2}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-wait text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer border-none text-base"
            >
              {processing ? `⏳ ${progress}` : `📎 دمج ${files.length} ملف`}
            </button>
          </div>
        )}
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
