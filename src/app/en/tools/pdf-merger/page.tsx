"use client";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "Are my files safe?", answer: "Yes, all processing happens client-side in your browser. No files are uploaded to any server. Your data never leaves your device — complete privacy." },
  { question: "What is the maximum file size?", answer: "Depends on your device memory. Files under 50MB work smoothly. Larger files may need more time or memory. Test with small files first." },
  { question: "Can I merge files in a specific order?", answer: "Yes, select files in the order you want. They will be merged in the same order you selected them." },
  { question: "Can I merge password-protected PDFs?", answer: "No, password-protected files cannot be merged. Remove the password protection first before uploading." },
  { question: "How many files can I merge at once?", answer: "Up to 10 PDF files at a time. Need more? Merge in batches — merge first 5, then merge the result with the rest." },
  { question: "What's the quality of the merged PDF?", answer: "Original quality — no compression or quality reduction. The output file maintains the same quality as input files." },
];
const relatedTools = [
  { title: "Image to PDF", icon: "🖼️", href: "/en/tools/image-to-pdf" },
  { title: "PDF Splitter", icon: "✂️", href: "/en/tools/pdf-splitter" },
  { title: "PDF Compressor", icon: "📦", href: "/en/tools/pdf-compressor" },
  { title: "Color Converter", icon: "🎨", href: "/en/tools/color-converter" },
  { title: "Unit Converter", icon: "📐", href: "/en/tools/unit-converter" },
  { title: "Invoice Generator", icon: "🧾", href: "/en/tools/invoice-generator" },
];
const seoContent = [
  "Combine multiple PDF files into one document. Select up to 10 PDFs, arrange them in order, and merge. All processing is client-side — your files never leave your device.",
  "Use cases: combine monthly invoices into one file, merge contract sections (agreement + appendices + schedules), unite project reports into a single document for emailing.",
  "Free, private, and unlimited. No signup required. Supports all PDF types with original quality preserved.",
];
export default function PdfMerger() {
  const schemaName = "PDF Merger";
  const schemaDesc = "Online PDF Merger - free tool";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/en/tools/pdf-merger";
  const breadcrumbItems = [
    { name: "Home", url: "https://adwatak.cloud/en" },
    { name: "Converters", url: "https://adwatak.cloud/en/tools/converters" },
    { name: "PDF Merger", url: "https://adwatak.cloud/en/tools/pdf-merger" },
  ];
  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Converters" categorySlug="converters" toolName="PDF Merger" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📎 PDF Merger</h1>
        <p className="text-sm text-gray-500 mb-6">Merge multiple PDF files into one document</p>
        <div className="bg-gray-50 rounded-xl p-10 text-center border-2 border-dashed border-gray-300">
          <p className="text-3xl mb-3">📄</p>
          <p className="text-gray-500 mb-4">Drag PDF files here or click to select</p>
          <button className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl border-none cursor-pointer font-inherit">Select Files</button>
        </div>
      </div>
      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}
