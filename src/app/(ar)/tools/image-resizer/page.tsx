"use client";
import { useState, useRef } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "ما هي أداة تغيير حجم الصور؟", answer: "أداة مجانية تغير أبعاد الصور (العرض والارتفاع) بسهولة. تدعم معظم صيغ الصور: JPG, PNG, WebP, GIF. كل شيء يتم في متصفحك — لا تُرفع الصور لأي سيرفر." },
  { question: "هل يمكن تغيير حجم عدة صور؟", answer: "حالياً الأداة تتعامل مع صورة واحدة في كل مرة. لكن يمكنك تكرار العملية لصور متعددة." },
  { question: "هل أحتاج لرفع الصورة لسيرفركم؟", answer: "لا! كل شيء يتم في متصفحك باستخدام HTML Canvas. صورتك لا تغادر جهازك أبداً. خصوصية كاملة." },
  { question: "ما هي الصيغ المدعومة؟", answer: "JPG, PNG, WebP, GIF, BMP. عند التحميل يمكنك اختيار JPG أو PNG أو WebP." },
  { question: "هل أحافظ على جودة الصورة؟", answer: "نسبة كبيرة. التغيير يتم باستخدام خوارزميات Canvas المتطورة. الجودة النهائية تعتمد على الحجم الجديد — التصغير يحافظ على الجودة، التكبير قد يقلل الوضوح." },
  { question: "ما الفرق بين العرض والارتفاع والنسبة؟", answer: "العرض والارتفاع: أبعاد دقيقة بالبكسل. النسبة: تحافظ على تناسب الصورة الأصلي (Aspect Ratio). أفضل ممارسة: فعّل الحفاظ على النسبة ثم غير العرض أو الارتفاع." },
  { question: "هل الأداة مجانية بالكامل؟", answer: "نعم 100% مجانية. بدون تسجيل، بدون حدود استخدام، بدون علامات مائية." },
  { question: "ما الحد الأقصى لحجم الصورة؟", answer: "يمكن معالجة صور حتى 20 ميجابكسل. الصور الأكبر قد تبطئ المتصفح." },
  { question: "هل يمكن تغيير حجم الصور من الهاتف؟", answer: "نعم، الأداة متوافقة مع الجوال والتابلت. الواجهة responsive وتعمل على جميع الأجهزة." },
  { question: "كيف أستخدم الأداة؟", answer: "ارفع الصورة، اختر العرض والارتفاع الجديد، فعّل أو عطّل 'الحفاظ على النسبة'، واضغط 'تغيير الحجم'. بعدها يمكنك معاينة النتيجة وتحميلها." },
  { question: "هل يمكن تكبير الصور؟", answer: "نعم، يمكنك تكبير الصور. لكن التكبير قد يقلل الجودة لأن الأداة تملأ البكسلات بدلاً من إضافة تفاصيل حقيقية." },
  { question: "ما الفرق بين تغيير الحجم وضغط الصور؟", answer: "تغيير الحجم: يغير أبعاد الصورة. ضغط الصور: يقلل حجم الملف مع الحفاظ على الأبعاد. استخدم أداة ضغط الصور لتقليل حجم الملف." },
];

const relatedTools = [
  { title: "ضغط الصور", icon: "📦", href: "/tools/image-compressor" },
  { title: "تحميل ثامبنيل يوتيوب", icon: "▶️", href: "/tools/youtube-thumbnail-downloader" },
  { title: "صورة إلى PDF", icon: "📄", href: "/tools/image-to-pdf" },
  { title: "مولد QR Code", icon: "🔳", href: "/tools/qr-generator" },
  { title: "تحويل الألوان", icon: "🎨", href: "/tools/color-converter" },
];

const seoContent = [
  "أداة تغيير حجم الصور مجانية بالكامل. ارفع صورتك وحدد الأبعاد الجديدة — كل شيء يتم في متصفحك بدون رفع لأي سيرفر. تدعم JPG, PNG, WebP والمزيد.",
  "مثالية للمصممين وأصحاب المواقع والمسوقين. تساعدك على توحيد أبعاد الصور وتحسين سرعة تحميل موقعك. الصور ذات الحجم المناسب تحسن تجربة المستخدم وترتيب السيو.",
  "الأداة توفر خيار الحفاظ على النسبة الأصلية للصورة (Aspect Ratio) لتجنب تشويه الصورة. يمكنك اختيار تغيير العرض أو الارتفاع وسيتم تعديل الآخر تلقائياً.",
  "جميع المعالجات تحدث محلياً في متصفحك باستخدام HTML Canvas. بياناتك لا تغادر جهازك — خصوصية كاملة وأمان تام.",
  "نصيحة: احتفظ بنسخة من الصورة الأصلية قبل تغيير الحجم. استخدم WebP للويب للحصول على جودة عالية وحجم ملف صغير.",
];

export default function ImageResizer() {
  const [image, setImage] = useState<{url: string; file: File; width: number; height: number} | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [keepRatio, setKeepRatio] = useState(true);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [format, setFormat] = useState("png");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      setImage({ url: URL.createObjectURL(file), file, width: img.width, height: img.height });
      setWidth(img.width);
      setHeight(img.height);
      setResultUrl(null);
    };
    img.src = URL.createObjectURL(file);
  };

  const resize = () => {
    if (!image) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);
      setResultUrl(canvas.toDataURL(`image/${format === "jpg" ? "jpeg" : format}`));
    };
    img.src = image.url;
  };

  const onWidthChange = (v: number) => {
    setWidth(v);
    if (keepRatio && image) setHeight(Math.round(v * (image.height / image.width)));
  };
  const onHeightChange = (v: number) => {
    setHeight(v);
    if (keepRatio && image) setWidth(Math.round(v * (image.width / image.height)));
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("تغيير حجم الصور", "تغيير أبعاد الصور مجاناً — أونلاين، بدون رفع لسيرفر", "https://adwatak.cloud/tools/image-resizer", "ar", "Image Tools")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{name:"الرئيسية",url:"https://adwatak.cloud"},{name:"أدوات صور",url:"https://adwatak.cloud/tools/image"},{name:"تغيير حجم الصور",url:"https://adwatak.cloud/tools/image-resizer"}])} />
      <Breadcrumb lang="ar" category="أدوات صور" categorySlug="image" toolName="تغيير حجم الصور" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🖼️ تغيير حجم الصور</h1>
        <p className="text-sm text-gray-500 mb-6">غيِّر أبعاد صورك بسهولة — في متصفحك، بدون رفع لسيرفر</p>

        <input type="file" accept="image/*" onChange={handleImage} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4" />

        {image && (
          <>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="text-xs text-gray-500 block mb-1">العرض (px)</label>
                <input type="number" value={width} onChange={(e) => onWidthChange(Number(e.target.value))}
                  className="w-full p-2 border-2 border-gray-200 rounded-xl text-sm outline-none" min={1} />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 block mb-1">الارتفاع (px)</label>
                <input type="number" value={height} onChange={(e) => onHeightChange(Number(e.target.value))}
                  className="w-full p-2 border-2 border-gray-200 rounded-xl text-sm outline-none" min={1} />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <input type="checkbox" checked={keepRatio} onChange={(e) => setKeepRatio(e.target.checked)} />
              الحفاظ على النسبة
            </label>

            <div className="flex gap-3 mb-4">
              <select value={format} onChange={(e) => setFormat(e.target.value)}
                className="p-2 border-2 border-gray-200 rounded-xl text-sm outline-none">
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="webp">WebP</option>
              </select>

              <button onClick={resize} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition-all">
                تغيير الحجم
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-2">الأصل: {image.width}×{image.height}</p>
                <img src={image.url} alt="Original" className="w-full rounded-xl border border-gray-200" />
              </div>
              {resultUrl && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">النتيجة: {width}×{height}</p>
                  <img src={resultUrl} alt="Resized" className="w-full rounded-xl border border-green-200" />
                  <a href={resultUrl} download={`resized.${format}`}
                    className="mt-2 inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl text-sm transition-all">
                    📥 تحميل
                  </a>
                </div>
              )}
            </div>
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
