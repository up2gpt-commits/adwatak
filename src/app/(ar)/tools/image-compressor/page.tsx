"use client";
import { useState, useRef } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "ما هي أداة ضغط الصور؟", answer: "أداة مجانية تقلل حجم ملفات الصور دون تغيير الأبعاد. تستخدم ضغط متقدم مع الحفاظ على جودة مقبولة. كل شيء في متصفحك — بدون رفع لسيرفر." },
  { question: "هل الضغط يقلل جودة الصورة؟", answer: "نعم، الضغط يقلل الجودة بنسبة تعتمد على مستوى الضغط الذي تختاره. الجودة العالية = حجم أكبر. الجودة المنخفضة = حجم أصغر. يمكنك ضبط الجودة حسب احتياجك." },
  { question: "ما الصيغ المدعومة؟", answer: "JPG, PNG, WebP. تدعم الضغط مع اختيار الجودة من 0% إلى 100%." },
  { question: "هل أحتاج لرفع الصورة لسيرفركم؟", answer: "لا! كل المعالجة في متصفحك باستخدام Canvas API. صورتك لا تغادر جهازك. خصوصية تامة." },
  { question: "هل الأداة مجانية؟", answer: "نعم 100% مجانية. بدون تسجيل، بدون حدود، بدون علامات مائية." },
  { question: "كم يمكنني تقليل حجم الصورة؟", answer: "يعتمد على الصورة الأصلية. الصور الكبيرة يمكن ضغطها بنسبة 50-80%. الصور الصغيرة جداً نسبة الضغط أقل. جرب مستويات جودة مختلفة." },
  { question: "ما هو أفضل مستوى جودة للويب؟", answer: "للويب: 70-80%. يعطي توازناً ممتازاً بين الجودة وحجم الملف. للطباعة: 90-100%. للبريد الإلكتروني: 50-60%." },
  { question: "أيهما أفضل للويب JPG أم WebP؟", answer: "WebP أفضل: حجم أقل بـ 25-35% مع نفس الجودة. جميع المتصفحات الحديثة تدعم WebP. لكن JPG مدعوم في كل مكان." },
  { question: "هل تعمل الأداة على الهاتف؟", answer: "نعم، متوافقة مع الجوال والتابلت. واجهة responsive تعمل على جميع الأجهزة." },
  { question: "كيف أستخدم الأداة؟", answer: "ارفع الصورة. استخدم شريط الجودة لاختيار مستوى الضغط. شاهد معاينة فورية للمقارنة. حمّل النتيجة." },
  { question: "ما الفرق بين ضغط الصور وتغيير الحجم؟", answer: "الضغط: يقلل حجم الملف مع الحفاظ على الأبعاد. تغيير الحجم: يغير أبعاد الصورة. استخدم كليهما للحصول على أفضل نتيجة." },
  { question: "هل يمكن ضغط صورة بحجم كبير جداً؟", answer: "نعم، حتى 20 ميجابكسل. الصور الأكبر قد تبطئ المتصفح." },
];

const relatedTools = [
  { title: "تغيير حجم الصور", icon: "🖼️", href: "/tools/image-resizer" },
  { title: "تحميل ثامبنيل يوتيوب", icon: "▶️", href: "/tools/youtube-thumbnail-downloader" },
  { title: "صورة إلى PDF", icon: "📄", href: "/tools/image-to-pdf" },
  { title: "مولد QR Code", icon: "🔳", href: "/tools/qr-generator" },
];

const seoContent = [
  "أداة ضغط الصور مجانية تقلل حجم ملفات الصور مع الحفاظ على جودة مقبولة. ارفع صورتك، اضبط مستوى الجودة، وحمّل النتيجة المضغوطة. كل شيء في متصفحك.",
  "مثالية لأصحاب المواقع والمدونات. الصور المضغوطة تسرّع تحميل صفحاتك وتحسن ترتيبك في Google. عامل سرعة الموقع مهم جداً للسيو.",
  "تدعم JPG و PNG و WebP. شريط الجودة التفاعلي يتيح لك ضبط النسبة ورؤية النتيجة فوراً. قارن الحجم قبل وبعد الضغط.",
  "جميع المعالجات محلياً في متصفحك باستخدام Canvas. لا ترفع الصور لأي سيرفر — الخصوصية مضمونة بالكامل.",
  "نصيحة: استخدم WebP بجودة 80% للويب. للصور الفوتوغرافية استخدم JPG بجودة 75%. للصور ذات الألوان المسطحة استخدم PNG.",
];

export default function ImageCompressor() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [quality, setQuality] = useState(80);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const [format, setFormat] = useState("webp");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setOriginalSize(file.size);
    setImageUrl(URL.createObjectURL(file));
    setCompressedUrl(null);
  };

  const compress = () => {
    if (!imageFile) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const mimeType = format === "jpg" ? "image/jpeg" : `image/${format}`;
      const dataUrl = canvas.toDataURL(mimeType, quality / 100);
      setCompressedUrl(dataUrl);
      const base64 = dataUrl.split(",")[1];
      setCompressedSize(Math.round(base64.length * 0.75));
    };
    img.src = imageUrl;
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("ضغط الصور", "ضغط الصور أونلاين — تقليل حجم الملف مع الحفاظ على الجودة", "https://adwatak.cloud/tools/image-compressor", "ar", "Image Tools")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{name:"الرئيسية",url:"https://adwatak.cloud"},{name:"أدوات صور",url:"https://adwatak.cloud/tools/image"},{name:"ضغط الصور",url:"https://adwatak.cloud/tools/image-compressor"}])} />
      <Breadcrumb lang="ar" category="أدوات صور" categorySlug="image" toolName="ضغط الصور" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📦 ضغط الصور</h1>
        <p className="text-sm text-gray-500 mb-6">قلِّل حجم ملفات الصور مع الحفاظ على جودة مقبولة</p>

        <input type="file" accept="image/*" onChange={handleImage} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4" />

        {imageFile && (
          <>
            <div className="mb-4">
              <label className="text-xs text-gray-500 block mb-1">الجودة: {quality}%</label>
              <input type="range" min={1} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-blue-600" />
            </div>

            <div className="flex gap-3 mb-4">
              <select value={format} onChange={(e) => setFormat(e.target.value)}
                className="p-2 border-2 border-gray-200 rounded-xl text-sm outline-none">
                <option value="webp">WebP</option>
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
              </select>
              <button onClick={compress} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition-all">
                📦 ضغط
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">قبل الضغط</p>
                <p className="text-sm font-bold text-gray-700">{originalSize > 1024*1024 ? `${(originalSize/1024/1024).toFixed(1)} MB` : `${(originalSize/1024).toFixed(1)} KB`}</p>
              </div>
              {compressedUrl && (
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-xs text-gray-500 mb-1">بعد الضغط</p>
                  <p className="text-sm font-bold text-green-700">{compressedSize > 1024*1024 ? `${(compressedSize/1024/1024).toFixed(1)} MB` : `${(compressedSize/1024).toFixed(1)} KB`}</p>
                  {originalSize > 0 && (
                    <p className="text-xs text-green-600">توفير {Math.round((1 - compressedSize/originalSize)*100)}%</p>
                  )}
                </div>
              )}
            </div>

            {compressedUrl && (
              <div className="mt-4 text-center">
                <img src={compressedUrl} alt="Compressed" className="max-h-64 mx-auto rounded-xl border border-green-200 mb-2" />
                <a href={compressedUrl} download={`compressed.${format}`}
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-xl transition-all">
                  📥 تحميل
                </a>
              </div>
            )}
          </>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
