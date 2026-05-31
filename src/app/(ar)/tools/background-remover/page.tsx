"use client";
import { useState, useRef } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "كيف تعمل إزالة الخلفية؟", answer: "الأداة تستخدم نموذج ذكاء اصطناعي (AI) مخصص لاكتشاف الأشخاص والمنتجات في الصورة وفصلهم عن الخلفية. المعالجة بالكامل في متصفحك (Client-side) — الصورة لا تُرفع لأي خادم." },
  { question: "هل الأداة مجانية بالكامل؟", answer: "نعم، مجانية 100% ولا تحتاج تسجيل. كل المعالجة في متصفحك (Client-side) باستخدام تقنية WebAssembly. أول استخدام قد يستغرق وقتاً لتحميل النموذج (~40MB) — بعدها يعمل بسرعة." },
  { question: "ما هي أنواع الصور المدعومة؟", answer: "JPG, PNG, WebP. الصور حتى 20 ميجابكسل تعمل بشكل جيد. الصور الأكبر قد تحتاج وقتاً أطول للمعالجة. يفضل صور الأشخاص والمنتجات بخلفية واضحة." },
  { question: "هل النتيجة بنفس جودة الصورة الأصلية؟", answer: "نعم، النتيجة تحافظ على دقة الصورة الأصلية. الفرق الوحيد: الخلفية تصبح شفافة (PNG). قد تكون بعض التفاصيل الدقيقة (الشعر، الفراء) أقل دقة — هذا طبيعي مع التقنية الحالية." },
  { question: "هل تعمل على صور المنتجات للتجارة الإلكترونية؟", answer: "نعم، ممتازة لصور المنتجات! أزل الخلفية واجعل خلفية بيضاء — وهو المطلوب في أمازون، نون، ومتاجر التجزئة. خلفية موحدة تزيد الاحترافية وتحسن المبيعات." },
  { question: "كم يستغرق وقت المعالجة؟", answer: "الأول مرة: 30-60 ثانية (تحميل النموذج). المرات التالية: 3-10 ثوان حسب حجم الصورة. الصور تحت 1 ميجابيكسل = 2-3 ثوان. الصور فوق 10 ميجابيكسل = 8-15 ثانية." },
  { question: "هل يمكن استخدام الصور الناتجة تجارياً؟", answer: "نعم، الأداة مجانية والنتائج ملكك. استخدمها لصور المنتجات التجارية، السيرة الذاتية، البروفايل، التصاميم التسويقية. جميع الحقوق محفوظة لك." },
  { question: "ما هو حجم النموذج AI الذي يتم تحميله؟", answer: "النموذج بحجم ~40 ميجابايت، يُحمّل مرة واحدة عند أول استخدام ويخزن في ذاكرة التخزين المؤقت للمتصفح. المرات التالية تفتح من الكاش مباشرة." },
  { question: "هل تعمل الأداة بدون إنترنت بعد تحميل النموذج؟", answer: "النموذج يُخزن مؤقتاً في المتصفح (Cache)، لكن قد يحتاج اتصالاً خفيفاً للتأكد من صلاحية الكاش. للمعالجة المتكررة، الأفضل أن يكون الاتصال مستقراً." },
  { question: "ما هي حدود الأداة (قيود)؟", answer: "الصور الشخصية (أشخاص) تعمل أفضل. صور بها تفاصيل دقيقة جداً (شعر متطاير، فرو، أقمشة شفافة) قد لا تظهر مثالية. للنتيجة الأفضل: صورة بخلفية متباينة (ليست نفس لون الجسم)." },
];

const relatedTools = [
  { title: "تغيير حجم الصور", icon: "🖼️", href: "/tools/image-resizer" },
  { title: "ضغط الصور", icon: "📦", href: "/tools/image-compressor" },
  { title: "صورة إلى PDF", icon: "📄", href: "/tools/image-to-pdf" },
  { title: "تحويل الألوان", icon: "🎨", href: "/tools/color-converter" },
  { title: "مولد QR Code", icon: "🔳", href: "/tools/qr-generator" },
  { title: "SEO Audit", icon: "🔍", href: "/tools/seo-audit" },
];

const seoContent = [
  "أداة إزالة خلفية الصورة (Background Remover) بالذكاء الاصطناعي — ارفع صورة شخص أو منتج واحصل على صورة بدون خلفية (PNG شفاف) في ثوانٍ. مجاني 100%، يعمل في المتصفح، ويدعم JPG و PNG و WebP.",
  "كيف تعمل: الذكاء الاصطناعي يكتشف الجسم الرئيسي في الصورة (شخص، منتج، حيوان) ويفصله عن الخلفية بدقة عالية. النتيجة: صورة بخلفية شفافة جاهزة للاستخدام في التصاميم، المتاجر الإلكترونية، والسير الذاتية.",
  "مثالية لـ: صور المنتجات للتجارة الإلكترونية (أمازون، نون)، صور السيرة الذاتية الاحترافية، صور البروفايل، التصاميم التسويقية، صور الكتالوجات، وعروض البوربوينت. أزل الخلفية واستبدلها بأي لون أو صورة أخرى.",
  "إحصائيات: 75% من المتسوقين عبر الإنترنت يقيمون جودة الصورة كعامل أساسي في قرار الشراء. المنتجات بخلفية بيضاء تبيع 30% أكثر. استخدام الصور الاحترافية يزيد الثقة في علامتك التجارية.",
  "الأداة مجانية بالكامل، تعمل في المتصفح بدون رفع الصور لأي خادم (خصوصية تامة)، وتنتج صور PNG بخلفية شفافة بنفس دقة الصورة الأصلية."
];

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setResultImage(null);
    
    const reader = new FileReader();
    reader.onload = (ev) => {
      setOriginalImage(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeBg = async () => {
    if (!originalImage) return;
    setProcessing(true);
    setError("");
    try {
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(originalImage);
      const url = URL.createObjectURL(blob);
      setResultImage(url);
    } catch (err) {
      setError("حدث خطأ في معالجة الصورة. حاول مرة أخرى أو استخدم صورة مختلفة.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadResult = () => {
    if (!resultImage) return;
    const a = document.createElement("a");
    a.href = resultImage;
    a.download = "adwatak-no-bg.png";
    a.click();
  };

  const reset = () => {
    setOriginalImage(null);
    setResultImage(null);
    setError("");
  };

  const schemaName = "إزالة خلفية الصورة";
  const schemaDesc = `Online AI Background Remover - free tool`;
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/tools/background-remover";
  const breadcrumbItems = [
    { name: "الرئيسية", url: "https://adwatak.cloud" },
    { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
    { name: "إزالة خلفية الصورة", url: "https://adwatak.cloud/tools/background-remover" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="أدوات يومية" categorySlug="daily" toolName="إزالة خلفية الصورة" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🖼️ إزالة خلفية الصورة</h1>
        <p className="text-sm text-gray-500 mb-6">بالذكاء الاصطناعي — أزل الخلفية من أي صورة مجاناً</p>
        
        {!originalImage && (
          <div className="border-2 border-dashed border-gray-300 p-8 rounded-xl text-center">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="bg-upload" />
            <label htmlFor="bg-upload" className="cursor-pointer">
              <div className="text-5xl mb-3">🖼️</div>
              <p className="text-blue-600 font-semibold">انقر لرفع صورة</p>
              <p className="text-sm text-gray-400 mt-1">JPG, PNG, WebP — أول مرة قد تستغرق ~40 ثانية</p>
            </label>
          </div>
        )}

        {originalImage && !resultImage && (
          <div>
            <img src={originalImage} alt="Original" className="max-w-full max-h-[300px] mx-auto rounded-xl mb-4" />
            <button onClick={removeBg} disabled={processing}
              className="bg-blue-600 text-white font-bold p-4 rounded-xl border-none text-lg w-full cursor-pointer disabled:opacity-50 disabled:cursor-wait">
              {processing ? "⏳ جارٍ إزالة الخلفية..." : "✨ إزالة الخلفية"}
            </button>
            {processing && <p className="text-xs text-gray-400 text-center mt-2">تحميل النموذج أول مرة ~40MB — يستغرق 30-60 ثانية</p>}
            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
          </div>
        )}

        {resultImage && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">الأصل</p>
                <img src={originalImage!} alt="Original" className="w-full rounded-xl border border-gray-200" />
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">بدون خلفية</p>
                <img src={resultImage} alt="Result" className="w-full rounded-xl border border-gray-200" style={{ backgroundImage: "repeating-conic-gradient(#e5e7eb 0% 25%, transparent 0% 50%)", backgroundSize: "20px 20px" }} />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={downloadResult}
                className="flex-1 bg-green-600 text-white font-bold p-3 rounded-xl border-none text-base cursor-pointer">⬇ تحميل (PNG)</button>
              <button onClick={reset}
                className="flex-1 bg-gray-200 text-gray-700 font-bold p-3 rounded-xl border-none text-base cursor-pointer">🔄 صورة أخرى</button>
            </div>
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
