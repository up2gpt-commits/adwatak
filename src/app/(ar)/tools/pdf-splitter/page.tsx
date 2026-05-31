"use client";
import { useState, useRef } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "هل يمكنني تقسيم صفحات محددة من ملف PDF؟", answer: "نعم، اختر نطاق الصفحات التي تريد استخراجها (مثلاً صفحات 3-7 من ملف 10 صفحات). الملف الناتج يحتوي على الصفحات المحددة فقط." },
  { question: "هل الملفات آمنة عند التقسيم؟", answer: "نعم، كل المعالجة تتم في المتصفح (Client-side). لا يُرفع ملفك لأي خادم. بياناتك لا تغادر جهازك." },
  { question: "ما هو الحد الأقصى لحجم الملف للتقسيم؟", answer: "يعتمد على ذاكرة جهازك. الملفات حتى 50 ميجابايت تعمل بسلاسة." },
  { question: "متى أحتاج تقسيم ملف PDF؟", answer: "عند إرسال جزء فقط من مستند طويل، استخراج صفحة معينة من عقد، فصل ملحق عن مستند رئيسي، أو إزالة صفحات غير مرغوب فيها." },
  { question: "هل يمكن تقسيم كل صفحة في ملف PDF؟", answer: "نعم، أدخل النطاق المطلوب (مثلاً 1, 3-5, 7-9) أو اكتب '1-5' لاستخراج صفحات 1 إلى 5." },
  { question: "ما الفرق بين تقسيم PDF واستخراج الصفحات؟", answer: "نفس المفهوم. تقسيم = أخذ نطاق صفحات من الملف الأصلي وإنشاء ملف جديد. الملف الأصلي يبقى كما هو." },
  { question: "هل تدعم الأداة PDF المحمي بكلمة سر؟", answer: "لا، الملفات المحمية تحتاج فك الحماية أولاً." },
];

const relatedTools = [
  { title: "دمج ملفات PDF", icon: "📎", href: "/tools/pdf-merger" },
  { title: "ضغط PDF", icon: "📦", href: "/tools/pdf-compressor" },
  { title: "صورة إلى PDF", icon: "🖼️", href: "/tools/image-to-pdf" },
  { title: "PDF إلى Word", icon: "📝", href: "/tools/pdf-to-word" },
  { title: "تحويل الألوان", icon: "🎨", href: "/tools/color-converter" },
  { title: "تحويل الوحدات", icon: "📐", href: "/tools/unit-converter" },
];

const seoContent = [
  "أداة تقسيم ملفات PDF تساعدك على استخراج صفحات محددة من ملف PDF. اختر الصفحات المطلوبة واحصل على ملف جديد يحتوي عليها فقط. تعمل بالكامل في المتصفح.",
  "متى تحتاج تقسيم PDF: مستند طويل تريد إرسال جزء منه فقط (مثلاً تقرير 50 صفحة، تحتاج الصفحات 10-20). عقد تريد فصل صفحة التوقيع.",
  "كيف تستخدم الأداة: ارفع ملف PDF، أدخل نطاق الصفحات (مثلاً 1-5 أو 3,7,9)، اضغط تقسيم. الملف الناتج يُحمّل فوراً.",
  "الأداة مجانية بالكامل، تدعم جميع أنواع PDF، ولا تخزّن أي ملفات على الخوادم.",
];

export default function PdfSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f || f.type !== "application/pdf") return;
    setFile(f);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await f.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
      setTotalPages(pdf.getPageCount());
    } catch {
      setTotalPages(0);
    }
  };

  const parseRange = (range: string, max: number): number[] => {
    const pages: number[] = [];
    const parts = range.split(",").map((p) => p.trim());
    for (const part of parts) {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map(Number);
        for (let i = start; i <= end && i <= max; i++) pages.push(i);
      } else {
        const n = Number(part);
        if (n > 0 && n <= max) pages.push(n);
      }
    }
    return [...new Set(pages)].sort((a, b) => a - b);
  };

  const splitPdf = async () => {
    if (!file || !pageRange.trim()) return;
    setProcessing(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const pages = parseRange(pageRange, pdf.getPageCount());

      if (pages.length === 0) {
        alert("لم يتم العثور على صفحات في النطاق المحدد.");
        setProcessing(false);
        return;
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdf, pages.map((p) => p - 1));
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `split-${pages[0]}-to-${pages[pages.length - 1]}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("حدث خطأ في تقسيم الملف. تأكد من أن الملف PDF صحيح.");
    } finally {
      setProcessing(false);
    }
  };

  const schemaName = "تقسيم ملفات PDF";
  const schemaDesc = "استخرج صفحات محددة من ملف PDF — مجاني، في المتصفح";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/tools/pdf-splitter";
  const breadcrumbItems = [
    { name: "الرئيسية", url: "https://adwatak.cloud" },
    { name: "محولات", url: "https://adwatak.cloud/tools/converters" },
    { name: "تقسيم ملفات PDF", url: "https://adwatak.cloud/tools/pdf-splitter" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, "ar", schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="محولات" categorySlug="converters" toolName="تقسيم ملفات PDF" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">✂️ تقسيم ملفات PDF</h1>
        <p className="text-sm text-gray-500 mb-6">استخرج صفحات محددة من ملف PDF — مجاني وآمن</p>

        <div
          onClick={() => inputRef.current?.click()}
          className="bg-gray-50 rounded-xl p-10 text-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition-colors mb-4"
        >
          <p className="text-3xl mb-3">📄</p>
          <p className="text-gray-500">اضغط لاختيار ملف PDF</p>
          <input ref={inputRef} type="file" accept=".pdf" onChange={handleFile} className="hidden" />
        </div>

        {file && (
          <div className="bg-green-50 rounded-xl p-4 border border-green-200 mb-4">
            <p className="text-sm text-green-800">{file.name} — {totalPages} صفحة</p>
          </div>
        )}

        {file && totalPages > 0 && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">نطاق الصفحات</label>
              <input
                type="text"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                placeholder={`مثال: 1-5 أو 1,3,7-9 (إجمالي ${totalPages} صفحات)`}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none"
              />
            </div>
            <button
              onClick={splitPdf}
              disabled={processing || !pageRange.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-wait text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer border-none text-base"
            >
              {processing ? "⏳ جارٍ التقسيم..." : "✂️ تقسيم PDF"}
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
