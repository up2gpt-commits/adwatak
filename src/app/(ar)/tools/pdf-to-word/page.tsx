"use client";
import { useState, useRef } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما هي PDF إلى Word؟", answer: "أداة مجانية لاستخراج النصوص من ملفات PDF. تعمل مباشرة في المتصفح بدون رفع ملفات. النص المستخرج يمكن نسخه ولصقه في Word." },
  { question: "هل الأداة مجانية؟", answer: "نعم 100% مجانية. بدون تسجيل، بدون حدود، بدون إعلانات." },
  { question: "هل أحتاج لرفع ملفات لسيرفركم؟", answer: "لا! كل شيء في متصفحك. بياناتك لا تغادر جهازك." },
  { question: "هل تدعم العربية والإنجليزية؟", answer: "نعم، تدعم اللغتين بطلاقة. تستخرج النص العربي والإنجليزي." },
  { question: "هل تعمل على الجوال؟", answer: "نعم، متجاوبة مع جميع الأجهزة." },
  { question: "هل تحافظ على تنسيق النص؟", answer: "النص يُستخرج بدون تنسيق (خط، حجم، لون). للنسخ البسيط هذا كافي. للتنسيق الكامل، استخدم برنامج PDF احترافي." },
  { question: "هل يمكن استخدامها تجارياً؟", answer: "نعم، النتائج للاستخدام الشخصي والتجاري." },
  { question: "كم عدد الصفحات التي يمكن معالجتها؟", answer: "حسب ذاكرة جهازك. الملفات حتى 100 صفحة تعمل بسلاسة." },
  { question: "هل الصور تظهر في النص المستخرج؟", answer: "لا، فقط النصوص. الصور والجداول لا تُستخرج." },
  { question: "ما الفرق بين PDF إلى Word وأداة تحويل PDF؟", answer: "أداتنا تستخرج النص فقط (بدون تنسيق). لأفضل نتائج، انسخ النص إلى Word ونمّقه بنفسك." },
];

const relatedTools = [
  { title: "دمج ملفات PDF", icon: "📎", href: "/tools/pdf-merger" },
  { title: "تقسيم PDF", icon: "✂️", href: "/tools/pdf-splitter" },
  { title: "ضغط PDF", icon: "📦", href: "/tools/pdf-compressor" },
  { title: "صورة إلى PDF", icon: "🖼️", href: "/tools/image-to-pdf" },
  { title: "تحويل الألوان", icon: "🎨", href: "/tools/color-converter" },
  { title: "تحويل الوحدات", icon: "📐", href: "/tools/unit-converter" },
];

const seoContent = [
  "أداة PDF إلى Word مجانية تستخرج النصوص من ملفات PDF. ارفع ملف PDF واحصل على النص جاهزاً للنسخ. تعمل في متصفحك مباشرة بدون رفع ملفات.",
  "مثالية للمستخدمين العرب الذين يحتاجون استخراج نصوص من PDF للترجمة أو التحرير أو إعادة الصياغة.",
  "الأداة مجانية، سريعة، وتحترم خصوصيتك — كل المعالجة محلياً في متصفحك.",
  "بعد استخراج النص، انسخه وألصقه في Word (Office أو Google Docs) للتنسيق والتحرير.",
];

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const extractText = async () => {
    if (!file) return;
    setProcessing(true);
    setText("");
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";
      
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item: any) => item.str).join(" ");
        fullText += pageText + "\n\n";
      }

      setText(fullText.trim());
    } catch (err) {
      console.error(err);
      setText("تعذر استخراج النص. تأكد من أن الملف PDF غير محمي بكلمة سر ويحتوي على نصوص.");
    } finally {
      setProcessing(false);
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    alert("تم نسخ النص!");
  };

  const schemaName = "PDF إلى Word";
  const schemaDesc = "استخرج النصوص من PDF مجاناً";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/tools/pdf-to-word";
  const breadcrumbItems = [
    { name: "الرئيسية", url: "https://adwatak.cloud" },
    { name: "محولات", url: "https://adwatak.cloud/tools/converters" },
    { name: "PDF إلى Word", url: "https://adwatak.cloud/tools/pdf-to-word" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, "ar", schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="محولات" categorySlug="converters" toolName="PDF إلى Word" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📄 PDF إلى Word</h1>
        <p className="text-sm text-gray-500 mb-6">استخرج النصوص من PDF وانسخها إلى Word — مجاني وآمن</p>

        <div
          onClick={() => inputRef.current?.click()}
          className="bg-gray-50 rounded-xl p-10 text-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition-colors mb-4"
        >
          <p className="text-3xl mb-3">📄</p>
          <p className="text-gray-500">اضغط لاختيار ملف PDF</p>
          <input ref={inputRef} type="file" accept=".pdf" onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setFile(f);
          }} className="hidden" />
        </div>

        {file && (
          <div className="bg-green-50 rounded-xl p-4 border border-green-200 mb-4">
            <p className="text-sm text-green-800">{file.name}</p>
          </div>
        )}

        {file && (
          <button
            onClick={extractText}
            disabled={processing}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-wait text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer border-none text-base mb-4"
          >
            {processing ? "⏳ جارٍ استخراج النص..." : "📄 استخراج النص"}
          </button>
        )}

        {text && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold text-gray-700">النص المستخرج</p>
              <button onClick={copyText} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1.5 px-4 rounded-xl text-sm transition-all cursor-pointer border-none">
                📋 نسخ
              </button>
            </div>
            <textarea
              readOnly
              value={text}
              className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl text-sm font-sans outline-none resize-y"
              dir="auto"
            />
            <p className="text-xs text-gray-400 mt-2">انسخ النص وألصقه في Word للتنسيق والتحرير</p>
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
