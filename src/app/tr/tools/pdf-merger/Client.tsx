"use client";
import { useState, useRef } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "Are my files safe when using this tool?", answer: "Yes, all processing happens in your browser (client-side). No file is ever uploaded to any server. Your data never leaves your device." },
  { question: "What is the maximum file size?", answer: "Depends on your device memory. Files under 50MB work smoothly. Larger files may need more time or memory." },
  { question: "Can I merge files in a specific order?", answer: "Yes, select files in the order you want — they will be merged in that same order." },
  { question: "What is the difference between merging and appending PDFs?", answer: "Merging combines multiple PDF files into one multi-page document. Our tool supports full file merging." },
  { question: "Does it support password-protected PDFs?", answer: "No, protected files need to be unlocked first before merging." },
  { question: "How many files can I merge at once?", answer: "Up to 10 PDF files at a time." },
  { question: "What about the quality of the merged PDF?", answer: "Original quality is preserved — no compression or quality reduction." },
  { question: "Can I merge PDFs with images?", answer: "To merge images with PDFs, convert images to PDF using 'Image to PDF' tool first, then merge with other PDF files." },
];

const relatedTools = [
  { title: "PDF Splitter", icon: "✂️", href: "/en/tools/pdf-splitter" },
  { title: "PDF Compressor", icon: "📦", href: "/en/tools/pdf-compressor" },
  { title: "Image to PDF", icon: "🖼️", href: "/en/tools/image-to-pdf" },
  { title: "PDF to Word", icon: "📝", href: "/en/tools/pdf-to-word" },
  { title: "Color Converter", icon: "🎨", href: "/en/tools/color-converter" },
  { title: "Unit Converter", icon: "📐", href: "/en/tools/unit-converter" },
];

const seoContent = [
  "Merge multiple PDF files into one document instantly. All processing happens in your browser — nothing is uploaded. Free, secure, and private.",
  "How to use: select PDF files in the desired order, wait for them to appear, then click Merge. The output file contains all pages at original quality.",
  "Perfect for combining invoices, contracts, reports, and scanned documents into a single PDF file.",
  "Completely free, supports up to 10 files, and preserves original PDF quality.",
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
        setProgress(`Merging ${i + 1}/${total}...`);
        const fileBytes = await files[i].file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      setProgress("Creating final file...");
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
      alert("An error occurred while merging. Make sure all files are valid PDFs.");
    } finally {
      setProcessing(false);
    }
  };

  const schemaName = "PDF Merger";
  const schemaDesc = "Merge multiple PDF files into one — free, client-side";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/en/tools/pdf-merger";
  const breadcrumbItems = [
    { name: "Home", url: "https://adwatak.cloud/en" },
    { name: "Converters", url: "https://adwatak.cloud/en/category/converters" },
    { name: "PDF Merger", url: "https://adwatak.cloud/en/tools/pdf-merger" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, "en", schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Converters" categorySlug="converters" toolName="PDF Merger" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📎 PDF Merger</h1>
        <p className="text-sm text-gray-500 mb-6">Merge multiple PDFs into one file — free & private</p>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => hiddenInputRef.current?.click()}
          className="bg-gray-50 rounded-xl p-10 text-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition-colors"
        >
          <p className="text-3xl mb-3">📄</p>
          <p className="text-gray-500 mb-4">Drag PDF files here or click to select</p>
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl border-none cursor-pointer transition-all"
          >
            Choose Files
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
                  <button onClick={() => removeFile(f.id)} className="text-red-500 text-sm cursor-pointer border-none bg-transparent">✕</button>
                </div>
              ))}
            </div>
            <button
              onClick={merge}
              disabled={processing || files.length < 2}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-wait text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer border-none text-base"
            >
              {processing ? `⏳ ${progress}` : `📎 Merge ${files.length} files`}
            </button>
          </div>
        )}
      </div>
      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}
