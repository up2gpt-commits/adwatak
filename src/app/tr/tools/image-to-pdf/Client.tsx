"use client";
import { useState, useRef } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "What image formats are supported?", answer: "JPG (JPEG), PNG, BMP, WebP. All common image formats. Other formats (GIF, TIFF) coming soon." },
  { question: "Does image quality decrease when converting?", answer: "No, original image quality is preserved. The output PDF contains images at their original resolution and color depth." },
  { question: "Can I convert multiple images to one PDF?", answer: "Yes, select multiple images — they will be combined into a single multi-page PDF. Each image = one page." },
  { question: "What order are images in the PDF?", answer: "Same order you selected them. First selected image = first page in the PDF." },
  { question: "Can I adjust the page size in the PDF?", answer: "Currently, each image fills one page at its original aspect ratio. Page size customization coming soon." },
  { question: "Does it support high-resolution images?", answer: "Yes, images up to 20 megapixels work well. Larger images may take longer to process." },
  { question: "Can I convert scanned images to PDF?", answer: "Yes, scanned images (JPG, PNG) convert directly to PDF. Useful for digitizing paper documents." },
  { question: "What are common uses for Image to PDF?", answer: "Converting scanned paper documents to PDF, creating PDF from multiple images (presentation, portfolio), archiving images in a standard format, sending groups of images as one file." },
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
  "Simply drag and drop images or click to select. Preview thumbnails, remove unwanted images, and generate your PDF with one click.",
];

export default function Client() {
  const [images, setImages] = useState<{ file: File; url: string; name: string }[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newImages: { file: File; url: string; name: string }[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        newImages.push({ file, url: URL.createObjectURL(file), name: file.name });
      }
    }
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const convertToPdf = async () => {
    if (images.length === 0) return;
    setProcessing(true);
    setProgress(0);

    try {
      const { default: jsPDF } = await import("jspdf");
      const pdf = new jsPDF();
      let firstPage = true;

      for (let i = 0; i < images.length; i++) {
        setProgress(Math.round((i / images.length) * 100));

        const img = new Image();
        const dataUrl = await new Promise<string>((resolve, reject) => {
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/jpeg", 0.95));
          };
          img.onerror = reject;
          img.src = images[i].url;
        });

        if (!firstPage) {
          pdf.addPage();
        }
        firstPage = false;

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = img.width;
        const imgHeight = img.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const w = imgWidth * ratio;
        const h = imgHeight * ratio;
        const x = (pdfWidth - w) / 2;
        const y = (pdfHeight - h) / 2;

        pdf.addImage(dataUrl, "JPEG", x, y, w, h);
      }

      setProgress(100);
      pdf.save("adwatak-images.pdf");
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("An error occurred while generating the PDF. Please try again.");
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  const schemaName = "Image to PDF";
  const schemaDesc = "Convert images to PDF online — free, client-side, no upload";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/en/tools/image-to-pdf";
  const breadcrumbItems = [
    { name: "Home", url: "https://adwatak.cloud/en" },
    { name: "Converters", url: "https://adwatak.cloud/en/category/converters" },
    { name: "Image to PDF", url: "https://adwatak.cloud/en/tools/image-to-pdf" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, "en", schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — yapay zeka/ses motorları için işaretli içerik */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb category="Converters" categorySlug="converters" toolName="Image to PDF" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🖼️ Image to PDF</h1>
        <p className="text-sm text-gray-500 mb-6">Convert images to PDF — free, private, client-side</p>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => hiddenInputRef.current?.click()}
          className="bg-gray-50 rounded-xl p-10 text-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition-colors"
        >
          <p className="text-3xl mb-3">📸</p>
          <p className="text-gray-500">Drag images here or click to select</p>
          <p className="text-xs text-gray-400 mt-2">JPG, PNG, BMP, WebP</p>
          <input
            ref={hiddenInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleInputChange}
            className="hidden"
          />
        </div>

        {images.length > 0 && (
          <div className="mt-6">
            <div className="flex flex-wrap gap-3 mb-4">
              {images.map((img, i) => (
                <div key={i} className="relative group">
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs cursor-pointer border-none opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                  <p className="text-[10px] text-gray-400 mt-1 text-center truncate max-w-20">{img.name.slice(0, 12)}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mb-3">{images.length} image(s) • click ✕ to remove</p>

            <button
              onClick={convertToPdf}
              disabled={processing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-wait text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer border-none text-base"
            >
              {processing
                ? `⏳ Generating PDF... ${progress}%`
                : `📄 Convert ${images.length} image(s) to PDF`}
            </button>

            {processing && (
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
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
