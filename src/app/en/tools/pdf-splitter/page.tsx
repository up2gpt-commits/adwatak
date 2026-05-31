"use client";
import { useState, useRef } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "Can I extract specific pages from a PDF?", answer: "Yes, enter the page range you want (e.g., pages 3-7 from a 10-page file). The output contains only those pages." },
  { question: "Are my files safe when splitting?", answer: "Yes, all processing happens in your browser (client-side). Your file is never uploaded to any server." },
  { question: "What is the maximum file size?", answer: "Depends on your device memory. Files up to 50MB work smoothly." },
  { question: "When do I need to split a PDF?", answer: "When sending only part of a long document, extracting a specific page from a contract, or removing unwanted pages." },
  { question: "Can I split each page individually?", answer: "Yes, enter the range (e.g., '1, 3-5, 7-9' or '1-5' for pages 1-5)." },
  { question: "Does it support password-protected PDFs?", answer: "No, protected files need to be unlocked first." },
];

const relatedTools = [
  { title: "PDF Merger", icon: "📎", href: "/en/tools/pdf-merger" },
  { title: "PDF Compressor", icon: "📦", href: "/en/tools/pdf-compressor" },
  { title: "Image to PDF", icon: "🖼️", href: "/en/tools/image-to-pdf" },
  { title: "PDF to Word", icon: "📝", href: "/en/tools/pdf-to-word" },
  { title: "Color Converter", icon: "🎨", href: "/en/tools/color-converter" },
  { title: "Unit Converter", icon: "📐", href: "/en/tools/unit-converter" },
];

const seoContent = [
  "Split PDF files by extracting specific pages. Choose the pages you need and get a new file with only those pages. Fully client-side processing.",
  "Perfect for extracting portions of long documents, separating contracts, or removing unwanted pages from PDFs.",
  "Free, secure, and private — all processing happens in your browser.",
];

export default function PdfSplitterEn() {
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
        alert("No valid pages found in the specified range.");
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
      alert("An error occurred. Make sure the file is a valid PDF.");
    } finally {
      setProcessing(false);
    }
  };

  const schemaName = "PDF Splitter";
  const schemaDesc = "Extract specific pages from a PDF — free, client-side";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/en/tools/pdf-splitter";
  const breadcrumbItems = [
    { name: "Home", url: "https://adwatak.cloud/en" },
    { name: "Converters", url: "https://adwatak.cloud/en/tools/converters" },
    { name: "PDF Splitter", url: "https://adwatak.cloud/en/tools/pdf-splitter" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, "en", schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Converters" categorySlug="converters" toolName="PDF Splitter" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">✂️ PDF Splitter</h1>
        <p className="text-sm text-gray-500 mb-6">Extract specific pages from a PDF — free & private</p>

        <div onClick={() => inputRef.current?.click()} className="bg-gray-50 rounded-xl p-10 text-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition-colors mb-4">
          <p className="text-3xl mb-3">📄</p>
          <p className="text-gray-500">Click to select a PDF file</p>
          <input ref={inputRef} type="file" accept=".pdf" onChange={handleFile} className="hidden" />
        </div>

        {file && (
          <div className="bg-green-50 rounded-xl p-4 border border-green-200 mb-4">
            <p className="text-sm text-green-800">{file.name} — {totalPages} pages</p>
          </div>
        )}

        {file && totalPages > 0 && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Page Range</label>
              <input type="text" value={pageRange} onChange={(e) => setPageRange(e.target.value)}
                placeholder={`e.g., 1-5 or 1,3,7-9 (${totalPages} pages total)`}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none" />
            </div>
            <button onClick={splitPdf} disabled={processing || !pageRange.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-wait text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer border-none text-base">
              {processing ? "⏳ Splitting..." : "✂️ Split PDF"}
            </button>
          </>
        )}
      </div>
      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}
