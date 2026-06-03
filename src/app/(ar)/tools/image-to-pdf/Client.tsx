"use client";
import { useState, useRef } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما الصيغ المدعومة للتحويل إلى PDF؟", answer: "JPG (JPEG), PNG, BMP, WebP. كل الصيغ الشائعة للصور. الصيغ الأخرى (GIF, TIFF) سيتم إضافتها قريباً." },
  { question: "هل تفقد الصور جودتها عند التحويل؟", answer: "لا، يتم الحفاظ على الجودة الأصلية للصورة. الـ PDF الناتج يحتوي على الصور بنفس الدقة والألوان الأصلية." },
  { question: "هل يمكنني تحويل عدة صور مرة واحدة إلى PDF واحد؟", answer: "نعم، اختر عدة صور — سيتم دمجها جميعاً في ملف PDF واحد متعدد الصفحات. كل صورة = صفحة." },
  { question: "ما ترتيب الصور في الـ PDF الناتج؟", answer: "بنفس الترتيب الذي اخترتها. الصورة الأولى المختارة = الصفحة الأولى في PDF." },
  { question: "هل يمكنني ضبط حجم الصفحة في الـ PDF؟", answer: "حالياً، كل صورة تأخذ صفحة كاملة بنفس أبعادها الأصلية. قريباً: خيارات تخصيص حجم الصفحة." },
  { question: "هل تدعم الأداة الصور عالية الدقة؟", answer: "نعم، الصور حتى 20 ميجابكسل تعمل بشكل جيد. الصور الأكبر قد تحتاج وقتاً أطول للمعالجة." },
  { question: "هل يمكن تحويل صورة ممسوحة ضوئياً (Scanned) لـ PDF؟", answer: "نعم، الصور الممسوحة ضوئياً (JPG, PNG) تتحول مباشرة لـ PDF. هذا مفيد للمستندات الورقية القديمة." },
  { question: "ما استخدامات تحويل الصور لـ PDF؟", answer: "تحويل مستندات ورقية ممسوحة ضوئياً لملف PDF، إنشاء ملف PDF من صور متعددة (عرض تقديمي، فهرس)، أرشفة الصور بصيغة PDF موحدة، إرسال مجموعة صور كملف واحد." },
];

const relatedTools = [
  { title: "دمج ملفات PDF", icon: "📎", href: "/tools/pdf-merger" },
  { title: "تقسيم ملفات PDF", icon: "✂️", href: "/tools/pdf-splitter" },
  { title: "تحويل الألوان", icon: "🎨", href: "/tools/color-converter" },
  { title: "تحويل الوحدات", icon: "📐", href: "/tools/unit-converter" },
  { title: "مولد الفواتير", icon: "🧾", href: "/tools/invoice-generator" },
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder" },
];

const seoContent = [
  "أداة تحويل الصور إلى PDF تساعدك على تحويل صورة أو أكثر (JPG, PNG, BMP, WebP) إلى ملف PDF واحد. اختر الصور، انتظر المعالجة، وحمّل الناتج — كل شيء في المتصفح.",
  "مفيدة لتحويل المستندات الممسوحة ضوئياً إلى PDF، إنشاء ملفات PDF من صور متعددة (عروض، فهارس)، أرشفة الصور بصيغة قياسية، وإرسال مجموعة صور كملف واحد.",
  "المعالجة بالكامل في المتصفح (Client-side) — الصور لا تُرفع لأي خادم. خصوصية تامة لمستنداتك الحساسة.",
  "الأداة مجانية، تدعم الصور حتى 20 ميجابكسل، وتحافظ على جودة الصور الأصلية.",
  "استخدم أداة Image to PDF من أدواتك لتحويل الصور لملف PDF بجودة عالية. بسيطة، سريعة، وآمنة.",
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
      alert("حدث خطأ أثناء إنشاء PDF. حاول مرة أخرى.");
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  const schemaName = "صورة إلى PDF";
  const schemaDesc = "حوّل الصور إلى PDF مجاناً — أونلاين، بدون رفع لسيرفر";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/tools/image-to-pdf";
  const breadcrumbItems = [
    { name: "الرئيسية", url: "https://adwatak.cloud" },
    { name: "محولات", url: "https://adwatak.cloud/category/converters" },
    { name: "صورة إلى PDF", url: "https://adwatak.cloud/tools/image-to-pdf" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, "ar", schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb category="محولات" categorySlug="converters" toolName="صورة إلى PDF" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🖼️ صورة إلى PDF</h1>
        <p className="text-sm text-gray-500 mb-6">حوّل الصور إلى ملفات PDF بجودة عالية — مجاني وآمن</p>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => hiddenInputRef.current?.click()}
          className="bg-gray-50 rounded-xl p-10 text-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition-colors"
        >
          <p className="text-3xl mb-3">📸</p>
          <p className="text-gray-500">اسحب الصور هنا أو اضغط للاختيار</p>
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
            <p className="text-sm text-gray-500 mb-3">{images.length} صورة • اضغط على ✕ لإزالة</p>

            <button
              onClick={convertToPdf}
              disabled={processing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-wait text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer border-none text-base"
            >
              {processing
                ? `⏳ جارٍ إنشاء PDF... ${progress}%`
                : `📄 تحويل ${images.length} صورة إلى PDF`}
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
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
