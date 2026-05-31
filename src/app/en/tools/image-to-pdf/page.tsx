"use client";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "What image formats are supported?", answer: "JPG (JPEG), PNG, BMP, WebP. All common image formats. Other formats (GIF, TIFF) coming soon." },
  { question: "Does image quality decrease when converting?", answer: "No, original image quality is preserved. The output PDF contains images at their original resolution and color depth." },
  { question: "Can I convert multiple images to one PDF?", answer: "Yes, select multiple images — they will be combined into a single multi-page PDF. Each image = one page." },
  { question: "What order are images in the PDF?", answer: "Same order you selected them. First selected image = first page in the PDF." },
  { question: "Does it support high-resolution images?", answer: "Yes, images up to 20 megapixels work well. Larger images may take longer to process." },
  { question: "Can I convert scanned images to PDF?", answer: "Yes, scanned images (JPG, PNG) convert directly to PDF. Useful for digitizing paper documents." },
];
const relatedTools = [
  { title: "PDF Merger", icon: "📎", href: "/en/tools/pdf-merger" },
  { title: "PDF Splitter", icon: "✂️", href: "/en/tools/pdf-splitter" },
  { title: "Color Converter", icon: "🎨", href: "/en/tools/color-converter" },
  { title: "Unit Converter", icon: "📐", href: "/en/tools/unit-converter" },
  { title: "Invoice Generator", icon: "🧾", href: "/en/tools/invoice-generator" },
  { title: "Base64 Encoder", icon: "🔄", href: "/en/tools/base64-encoder" },
];
const seoContent = [
  "Convert images (JPG, PNG, BMP, WebP) to PDF documents instantly. Select one or more images and convert them to a single PDF file. All processing happens in your browser — nothing is uploaded.",
  "Perfect for: converting scanned documents to PDF, creating PDFs from multiple images (presentations, portfolios), archiving images in a standard format, and sending groups of images as one file.",
  "Processing is 100% client-side — images never leave your device. Complete privacy for sensitive documents. Free, supports up to 20MP images, and preserves original quality.",
];
export default function ImageToPdf() {
  const schemaName = "Image to PDF";
  const schemaDesc = "Online Image to PDF - free tool";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/en/tools/image-to-pdf";
  const breadcrumbItems = [
    { name: "Home", url: "https://adwatak.cloud/en" },
    { name: "Converters", url: "https://adwatak.cloud/en/tools/converters" },
    { name: "Image to PDF", url: "https://adwatak.cloud/en/tools/image-to-pdf" },
  ];
  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Converters" categorySlug="converters" toolName="Image to PDF" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🖼️ Image to PDF</h1>
        <p className="text-sm text-gray-500 mb-6">Convert images to PDF documents</p>
        <div className="bg-gray-50 rounded-xl p-10 text-center border-2 border-dashed border-gray-300">
          <p className="text-3xl mb-3">📸</p>
          <p className="text-gray-500">Drag images here or click to select</p>
          <p className="text-xs text-gray-400 mt-2">JPG, PNG, BMP, WebP</p>
        </div>
      </div>
      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}
