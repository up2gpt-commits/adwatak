"use client";
import { useState, useRef, useCallback } from "react";
import StructuredData, { toolSchema, faqSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "ما هي أداة استخراج النص من الصور؟", answer: "أداة استخراج النص من الصور (OCR) تسمح لك باستخراج النصوص من أي صورة — كتب، مستندات، لافتات، سكريتشوت. تستخدم تقنية الذكاء الاصطناعي المتقدمة (Gemma 4 Vision) لاستخراج النص بدقة عالية جداً تدعم العربية والإنجليزية." },
  { question: "هل الأداة مجانية؟", answer: "نعم 100% مجانية. بدون تسجيل، بدون حدود استخدام، بدون إعلانات." },
  { question: "هل أحتاج لرفع ملفات لسيرفركم؟", answer: "نعم، الصورة تُرفع للمعالجة على الخادم عبر OCR بالذكاء الاصطناعي ثم تُحذف فوراً. لا نخزن أي صور." },
  { question: "ما دقة التعرف على النص؟", answer: "عالية جداً! نستخدم نموذج Gemma 4 Vision AI — أدق بكتير من محركات OCR التقليدية. يتعرف على العربية والإنجليزية واللغات المختلطة." },
  { question: "ما أنواع الصور المدعومة؟", answer: "جميع الصيغ المعروفة: JPG, PNG, WEBP, BMP, GIF." },
  { question: "هل تعمل على الجوال؟", answer: "نعم، متجاوبة مع جميع الأجهزة — جوال، تابلت، لاب توب." },
  { question: "هل تدعم العربية والإنجليزية معاً؟", answer: "نعم، تدعم النصوص العربية والإنجليزية وحتى النص المختلط في نفس الصورة." },
  { question: "ماذا أفعل لو النتائج غير دقيقة؟", answer: "استخدم صورة ذات دقة أعلى وتأكد من وضوح النص." },
  { question: "هل يمكن استخدامها تجارياً؟", answer: "نعم، النتائج للاستخدام الشخصي والتجاري." },
  { question: "هل الأداة محدثة؟", answer: "نعم، نستخدم أحدث تقنيات الذكاء الاصطناعي من Google DeepMind." },
];

const relatedTools = [
  { title: "صورة إلى PDF", icon: "🖼️", href: "/tools/image-to-pdf" },
  { title: "إزالة خلفية الصورة", icon: "🖼️", href: "/tools/background-remover" },
  { title: "ضغط الصور", icon: "📦", href: "/tools/image-compressor" },
  { title: "قارئ QR Code", icon: "📷", href: "/tools/qr-reader" },
];

const seoContent = [
  "أداة استخراج النص من الصور (OCR) بالذكاء الاصطناعي — تستخرج النصوص من أي صورة بدقة عالية. تدعم العربية والإنجليزية. أداة مجانية بدون تسجيل.",
  "مثالية للطلاب والمحامين والمحاسبين والصحفيين. استخرج النص من الكتب والمستندات واللافتات والسكريتشوت بنقرة واحدة.",
  "نستخدم نموذج Gemma 4 Vision AI من Google DeepMind — أدق من Tesseract.js التقليدي.",
  "تعالج الصور بسرعة عبر خوادمنا الآمنة — صورك لا تُخزّن وتُحذف فور المعالجة.",
];

export default function Client() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [progressText, setProgressText] = useState("");
  const [lang, setLang] = useState("ara+eng");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const resRef = useRef<HTMLDivElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    setText(""); setError(null); setProgressText("");
    const r = new FileReader();
    r.onload = (ev) => setImage(ev.target?.result as string);
    r.readAsDataURL(f);
  };

  const compressImage = (dataUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        const MAX = 2000;
        if (width > MAX || height > MAX) {
          const ratio = Math.min(MAX / width, MAX / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) { reject(new Error("Canvas not supported")); return; }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = dataUrl;
    });
  };

  const extract = useCallback(async () => {
    if (!image) return;
    setLoading(true); setProgressText("جاري تجهيز الصورة..."); setText(""); setError(null);

    try {
      let processedImage = image;
      if (image.length > 3_000_000) {
        setProgressText("جاري ضغط الصورة...");
        processedImage = await compressImage(image);
      }

      setProgressText("جاري استخراج النص بالذكاء الاصطناعي...");
      const res = await fetch("/api/ocr-vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: processedImage, lang }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || `Error ${res.status}`);
      }

      const data = await res.json();
      if (!data.text || data.text.trim().length === 0) {
        setText("(لم يتم العثور على نص — جرب صورة أوضح)");
      } else {
        setText(data.text);
      }

      setProgressText("");
      setTimeout(() => resRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch (err: any) {
      console.error("OCR error:", err);
      setError(err?.message || "حدث خطأ أثناء المعالجة");
    } finally {
      setLoading(false); setProgressText("");
    }
  }, [image, lang]);

  const copy = async () => {
    if (!text) return;
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    }
  };

  const download = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `OCR-${fileName.replace(/\.[^.]+$/, "") || "text"}.txt`;
    a.click(); URL.revokeObjectURL(url);
  };

  const reset = () => {
    setImage(null); setFileName(""); setText(""); setError(null);
    setCopied(false); setProgressText("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("استخراج النص من الصور", "استخراج النص من الصور بالذكاء الاصطناعي — OCR AI مجاني", "https://adwatak.cloud/tools/image-to-text", "ar", "Tools")} />
      <StructuredData data={faqSchema(faqs)} />
      <Breadcrumb lang="ar" category="أدوات أخرى" categorySlug="tools" toolName="استخراج النص من الصور" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">👁️ استخراج النص من الصور</h1>
        <p className="text-sm text-gray-500 mb-6">استخراج النصوص من الصور بالذكاء الاصطناعي — أسرع وأدق من OCR التقليدي</p>

        {/* AI Badge */}
        <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <span className="text-sm text-purple-700">مدعوم بـ <strong>Gemma 4 Vision AI</strong> من Google DeepMind — دقة أعلى، يدعم العربية والإنجليزية</span>
        </div>

        {/* Upload */}
        <div
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            image ? "border-green-300 bg-green-50" : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
          }`}
        >
          {image ? (
            <div className="flex flex-col items-center gap-3">
              <img src={image} alt="Preview" className="max-h-48 rounded-lg shadow-sm object-contain" />
              <span className="text-sm text-gray-600">{fileName}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl">📸</span>
              <p className="text-gray-600 font-medium">اضغط لاختيار صورة</p>
              <p className="text-xs text-gray-400">JPG, PNG, WEBP — AI OCR يدعم العربية والإنجليزية</p>
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>

        {/* Controls */}
        {image && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs text-gray-500 block mb-1">اللغة</label>
              <select value={lang} onChange={(e) => setLang(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white">
                <option value="ara+eng">العربية + English</option>
                <option value="ara">العربية</option>
                <option value="eng">English</option>
              </select>
            </div>
            <button onClick={extract} disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "جاري..." : "🤖 استخراج النص بالذكاء الاصطناعي"}
            </button>
            <button onClick={reset} disabled={loading}
              className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50">
              🔄 إعادة
            </button>
          </div>
        )}

        {/* Progress */}
        {loading && progressText && (
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
            <div className="flex items-center gap-2 text-sm text-purple-700">
              <span className="animate-spin">⏳</span>
              <span>{progressText}</span>
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200">
            <p className="text-sm text-red-700">⚠️ {error}</p>
            <button onClick={extract}
              className="mt-2 text-sm px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              🔄 إعادة المحاولة
            </button>
          </div>
        )}

        {/* Result */}
        {text && !loading && (
          <div ref={resRef} className="mt-6 bg-gray-50 rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900">📝 النص المستخرج</h2>
              <div className="flex gap-2">
                <button onClick={copy}
                  className="text-sm px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                  {copied ? "✅ تم النسخ!" : "📋 نسخ"}
                </button>
                <button onClick={download}
                  className="text-sm px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                  ⬇️ تحميل
                </button>
              </div>
            </div>
            <textarea readOnly value={text}
              className="w-full h-48 p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 resize-y font-sans"
              dir="auto" />
            {!text.startsWith("(") && !error && (
              <p className="text-xs text-gray-400 mt-2">
                ✨ {text.split(/\s+/).filter((w: string) => w.length > 0).length} كلمة
              </p>
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
