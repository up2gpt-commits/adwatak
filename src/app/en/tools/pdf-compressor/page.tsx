"use client";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "Does compression affect PDF quality?", answer: "Yes, compression reduces file size at the cost of quality. Choose a compression level: low (high quality, less compression) to high (lower quality, more compression)." },
  { question: "What is the maximum file size?", answer: "Up to 100MB in the current browser. Files over 100MB may cause slowdown. For daily use, files under 50MB work smoothly." },
  { question: "Are files safe during compression?", answer: "Yes, all processing happens in your browser. No PDF file is uploaded to any server. Your data never leaves your device." },
  { question: "How much can I reduce PDF size?", answer: "Average 30-60% reduction depending on content. Text-only PDF: 20-30%. High-res image PDF: 50-80%. PDF with embedded fonts: 10-20%." },
  { question: "When should I compress a PDF?", answer: "When sending by email (max 25MB), uploading to a website (5-10MB limits), saving storage space, or speeding up file loading on your site." },
  { question: "Can I compress password-protected PDFs?", answer: "No, you need to remove protection first. Use a dedicated PDF unlock tool before compression." },
];
const relatedTools = [
  { title: "PDF Merger", icon: "📎", href: "/en/tools/pdf-merger" },
  { title: "Image to PDF", icon: "🖼️", href: "/en/tools/image-to-pdf" },
  { title: "PDF Splitter", icon: "✂️", href: "/en/tools/pdf-splitter" },
  { title: "Unit Converter", icon: "📐", href: "/en/tools/unit-converter" },
  { title: "Color Converter", icon: "🎨", href: "/en/tools/color-converter" },
  { title: "Invoice Generator", icon: "🧾", href: "/en/tools/invoice-generator" },
];
const seoContent = [
  "Reduce PDF file size while maintaining acceptable quality. Drag a PDF file, choose compression level, and wait — the compressed file is ready for download. All client-side, no uploads.",
  "Practical uses: email large files (shrink from 50MB to 15MB), upload to websites (20MB to 8MB), free up storage space (compress 100 files from 500MB to 250MB).",
  "Start with low compression first — the size difference may be significant without noticeable quality loss. Free, browser-based, supports all PDF types.",
];
export default function PdfCompressor() {
  const schemaName = "PDF Compressor";
  const schemaDesc = "Online PDF Compressor - free tool";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/en/tools/pdf-compressor";
  const breadcrumbItems = [
    { name: "Home", url: "https://adwatak.cloud/en" },
    { name: "Converters", url: "https://adwatak.cloud/en/tools/converters" },
    { name: "PDF Compressor", url: "https://adwatak.cloud/en/tools/pdf-compressor" },
  ];
  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Converters" categorySlug="converters" toolName="PDF Compressor" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📦 PDF Compressor</h1>
        <p className="text-sm text-gray-500 mb-6">Reduce PDF file size with one click</p>
        <div className="bg-gray-50 rounded-xl p-10 text-center border-2 border-dashed border-gray-300">
          <p className="text-3xl mb-3">📦</p>
          <p className="text-gray-500">Drag PDF file here</p>
        </div>
      </div>
      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}
