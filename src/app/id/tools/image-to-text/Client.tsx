"use client";
import { useState, useRef, useCallback } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "Apa itu OCR Gambar ke Teks?", answer: "OCR Gambar ke Teks mengekstrak teks dari gambar apa pun — buku, dokumen, rambu, tangkapan layar. Menggunakan AI canggih (Gemma 4 Vision) untuk ekstraksi teks yang sangat akurat mendukung bahasa Arab dan Inggris." },
  { question: "Apakah ini gratis?", answer: "Ya, 100% gratis. Tanpa registrasi, tanpa batasan penggunaan, tanpa iklan." },
  { question: "Apakah Anda mengunggah gambar saya ke server?", answer: "Ya, gambar dikirim ke server kami untuk pemrosesan AI dan segera dihapus. Kami tidak menyimpan gambar apa pun." },
  { question: "Seberapa akurat OCR AI ini?", answer: "Sangat tinggi! Kami menggunakan AI Gemma 4 Vision dari Google DeepMind — jauh lebih akurat daripada mesin OCR Tesseract tradisional. Mendukung bahasa Arab, Inggris, dan campuran." },
  { question: "Format gambar apa yang didukung?", answer: "Semua format umum: JPG, PNG, WEBP, BMP, GIF." },
  { question: "Apakah ini berfungsi di ponsel?", answer: "Ya, sepenuhnya responsif di semua perangkat." },
  { question: "Apakah ini mendukung bahasa Arab dan Inggris secara bersamaan?", answer: "Ya, ini menangani teks Arab, Inggris, dan campuran dalam gambar yang sama dengan sempurna." },
  { question: "Bagaimana jika hasilnya tidak akurat?", answer: "Gunakan gambar berkualitas lebih tinggi dengan teks yang lebih jelas. AI bekerja paling baik dengan gambar yang cukup terang dan beresolusi tinggi." },
  { question: "Bisakah saya menggunakannya secara komersial?", answer: "Ya, hasilnya gratis untuk penggunaan pribadi dan komersial." },
  { question: "Apakah ini diperbarui?", answer: "Ya, didukung oleh model Gemma 4 Vision terbaru dari Google DeepMind." }
];

const relatedTools = [
  { title: "Gambar ke PDF", icon: "🖼️", href: "/id/tools/image-to-pdf" },
  { title: "Hapus Latar Belakang", icon: "🖼️", href: "/id/tools/background-remover" },
  { title: "Kompresor Gambar", icon: "📦", href: "/id/tools/image-compressor" },
  { title: "Pembaca QR", icon: "📷", href: "/id/tools/qr-reader" },
];

const seoContent = [
  "OCR Gambar ke Teks gratis bertenaga AI — ekstrak teks dari gambar apa pun dengan akurasi tinggi menggunakan Google DeepMind Gemma 4 Vision. Mendukung bahasa Arab dan Inggris.",
  "Cocok untuk pelajar, pengacara, akuntan, dan jurnalis. Lebih akurat daripada OCR Tesseract tradisional.",
  "Didukung oleh model AI Gemma 4 Vision dari Google DeepMind untuk ekstraksi teks tercanggih.",
  "Gambar Anda diproses dengan aman dan segera dihapus — tanpa penyimpanan.",
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
    setLoading(true); setProgressText("Preparing image..."); setText(""); setError(null);

    try {
      let processedImage = image;
      if (image.length > 3_000_000) {
        setProgressText("Compressing image...");
        processedImage = await compressImage(image);
      }

      setProgressText("Extracting text with AI...");
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
        setText("(No text found — try a clearer image)");
      } else {
        setText(data.text);
      }

      setProgressText("");
      setTimeout(() => resRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch (err: any) {
      console.error("OCR error:", err);
      setError(err?.message || "An error occurred");
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
      <StructuredData data={toolSchema("Image to Text OCR", "Extract text from images using AI OCR — Free, fast, accurate", "https://adwatak.cloud/id/tools/image-to-text", "en", "Alat")} />
      <StructuredData data={faqSchema(faqs)} />
      {/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("Cara menggunakan alat ini", "Free online tool. Works directly in your browser. No registration required.", [{name:"Buka alat",text:"Arahkan ke halaman alat ini di Adawatak"},{name:"Masukkan data Anda",text:"Isi kolom yang diperlukan"},{name:"Dapatkan hasil",text:"Klik tombol hitung atau buat"},{name:"Gunakan atau bagikan",text:"Salin, unduh, atau bagikan hasilnya"}],"kurang dari satu menit","id")} />
      {/* GEO: Speakable — AI/voice engines */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />
      <Breadcrumb lang="id" category="Alat Lainnya" categorySlug="tools" toolName="Gambar ke Teks OCR" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">👁️ OCR Gambar ke Teks</h1>
        <p className="text-sm text-gray-500 mb-6">Extract text from images using AI — faster and more accurate than traditional OCR</p>

        {/* AI Badge */}
        <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <span className="text-sm text-purple-700">Powered by <strong>Gemma 4 Vision AI</strong> from Google DeepMind — higher accuracy, supports Arabic & English</span>
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
              <img src={image} alt="Pratinjau" className="max-h-48 rounded-lg shadow-sm object-contain" />
              <span className="text-sm text-gray-600">{fileName}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl">📸</span>
              <p className="text-gray-600 font-medium">Click to choose an image</p>
              <p className="text-xs text-gray-400">JPG, PNG, WEBP — AI OCR supports Arabic & English</p>
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>

        {/* Controls */}
        {image && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs text-gray-500 block mb-1">Bahasa</label>
              <select value={lang} onChange={(e) => setLang(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white">
                <option value="ara+eng">Arabic + English</option>
                <option value="ara">Arabic</option>
                <option value="eng">English</option>
              </select>
            </div>
            <button onClick={extract} disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Processing..." : "🤖 Extract Text with AI"}
            </button>
            <button onClick={reset} disabled={loading}
              className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50">
              🔄 Reset
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
              🔄 Retry
            </button>
          </div>
        )}

        {/* Result */}
        {text && !loading && (
          <div ref={resRef} className="mt-6 bg-gray-50 rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900">📝 Extracted Text</h2>
              <div className="flex gap-2">
                <button onClick={copy}
                  className="text-sm px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
                <button onClick={download}
                  className="text-sm px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                  ⬇️ Download
                </button>
              </div>
            </div>
            <textarea readOnly value={text}
              className="w-full h-48 p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 resize-y font-sans"
              dir="auto" />
            {!text.startsWith("(") && !error && (
              <p className="text-xs text-gray-400 mt-2">
                ✨ {text.split(/\s+/).filter((w: string) => w.length > 0).length} words
              </p>
            )}
          </div>
        )}
      </div>
      <SEOContent content={seoContent} lang="id" />
      <FAQSection faqs={faqs} lang="id" />
      <RelatedTools tools={relatedTools} lang="id" />
      <ShareButtons lang="id" />
    </div>
  );
}
