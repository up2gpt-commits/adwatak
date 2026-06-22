"use client";
import { useState, useRef, useCallback } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "Görüntüden Metin OCR nedir?", answer: "Görüntüden Metin OCR, herhangi bir görüntüden metin çıkarır — kitaplar, belgeler, tabelalar, ekran görüntüleri. Arapça ve İngilizce'yi destekleyen yüksek doğruluklu metin çıkarma için gelişmiş yapay zeka (Gemma 4 Vision) kullanır." },
  { question: "Ücretsiz mi?", answer: "Evet, %100 ücretsiz. Kayıt yok, kullanım sınırı yok, reklam yok." },
  { question: "Görüntülerimi bir sunucuya yüklüyor musunuz?", answer: "Evet, görüntüler yapay zeka işleme için sunucumuza gönderilir ve hemen silinir. Hiçbir görüntüyü saklamayız." },
  { question: "Yapay zeka OCR ne kadar doğru?", answer: "Çok yüksek! Google DeepMind'ın Gemma 4 Vision yapay zekasını kullanıyoruz — geleneksel Tesseract OCR motorlarından çok daha doğru. Arapça, İngilizce ve karışık dilleri destekler." },
  { question: "Hangi görüntü formatları destekleniyor?", answer: "Tüm yaygın formatlar: JPG, PNG, WEBP, BMP, GIF." },
  { question: "Mobil cihazlarda çalışır mı?", answer: "Evet, tüm cihazlarda tamamen duyarlı." },
  { question: "Arapça ve İngilizce'yi birlikte destekliyor mu?", answer: "Evet, aynı görüntüdeki Arapça, İngilizce ve karışık metni mükemmel şekilde işler." },
  { question: "Sonuçlar doğru değilse ne olur?", answer: "Daha net metin içeren daha yüksek kaliteli bir görüntü kullanın. Yapay zeka, iyi aydınlatılmış, yüksek çözünürlüklü görüntülerle en iyi performansı gösterir." },
  { question: "Ticari olarak kullanabilir miyim?", answer: "Evet, sonuçlar kişisel ve ticari kullanım için ücretsizdir." },
  { question: "Güncelleniyor mu?", answer: "Evet, Google DeepMind'ın en son Gemma 4 Vision modeliyle desteklenmektedir." },
];

const relatedTools = [
  { title: "Görüntüden PDF", icon: "🖼️", href: "/tr/tools/image-to-pdf" },
  { title: "Arka Planı Kaldır", icon: "🖼️", href: "/tr/tools/background-remover" },
  { title: "Görüntü Sıkıştırıcı", icon: "📦", href: "/tr/tools/image-compressor" },
  { title: "QR Okuyucu", icon: "📷", href: "/tr/tools/qr-reader" },
];

const seoContent = [
  "Ücretsiz yapay zeka destekli Görüntüden Metin OCR — Google DeepMind Gemma 4 Vision kullanarak herhangi bir görüntüden yüksek doğrulukla metin çıkarın. Arapça ve İngilizce'yi destekler.",
  "Öğrenciler, avukatlar, muhasebeciler ve gazeteciler için mükemmel. Geleneksel Tesseract OCR'dan daha doğru.",
  "En son teknoloji metin çıkarma için Google DeepMind'ın Gemma 4 Vision yapay zeka modeliyle desteklenmektedir.",
  "Görüntüleriniz güvenli bir şekilde işlenir ve hemen silinir — depolama yok.",
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
    setLoading(true); setProgressText("Görüntü hazırlanıyor..."); setText(""); setError(null);

    try {
      let processedImage = image;
      if (image.length > 3_000_000) {
        setProgressText("Görüntü sıkıştırılıyor...");
        processedImage = await compressImage(image);
      }

      setProgressText("Yapay zeka ile metin çıkarılıyor...");
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
        setText("(Metin bulunamadı — daha net bir görüntü deneyin)");
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
      <StructuredData data={toolSchema("Görüntüden Metin OCR", "Yapay zeka OCR ile görüntülerden metin çıkarın — Ücretsiz, hızlı, doğru", "https://adwatak.cloud/tr/tools/image-to-text", "tr", "Araçlar")} />
      <StructuredData data={faqSchema(faqs)} />
      {/* GEO: HowTo — adım adım kullanım */}
      <StructuredData data={howToSchema("Bu araci nasil kullanirim", "Tarayicinizda calisan ucretsiz arac. Kayit gerektirmez.", [{name:"Araci acin",text:"Adwatak sitesinde bu arac sayfasina gidin"},{name:"Verilerinizi girin",text:"Gerekli alanlari doldurun"},{name:"Sonuc alin",text:"Hesapla veya olustur butonuna tiklayin"},{name:"Kullanin veya paylasin",text:"Sonucu kopyalayin, indirin veya paylasin"}],"bir dakikadan az","tr")} />
      {/* GEO: Speakable — AI/ses motorlari */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />
      <Breadcrumb lang="tr" category="Diger Araclar" categorySlug="tools" toolName="Goruntuden Metin" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">👁️ Görüntüden Metin OCR</h1>
        <p className="text-sm text-gray-500 mb-6">Yapay zeka ile görüntülerden metin çıkarın — geleneksel OCR'dan daha hızlı ve daha doğru</p>

        {/* AI Badge */}
        <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <span className="text-sm text-purple-700">Google DeepMind tarafından <strong>Gemma 4 Vision AI</strong> ile desteklenmektedir — daha yüksek doğruluk, Arapça ve İngilizce'yi destekler</span>
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
              <p className="text-gray-600 font-medium">Bir görüntü seçmek için tıklayın</p>
              <p className="text-xs text-gray-400">JPG, PNG, WEBP — AI OCR Arapça ve İngilizce'yi destekler</p>
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>

        {/* Controls */}
        {image && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs text-gray-500 block mb-1">Dil</label>
              <select value={lang} onChange={(e) => setLang(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white">
                <option value="ara+eng">Arapça + İngilizce</option>
                <option value="ara">Arapça</option>
                <option value="eng">İngilizce</option>
              </select>
            </div>
            <button onClick={extract} disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "İşleniyor..." : "🤖 Yapay Zeka ile Metin Çıkar"}
            </button>
            <button onClick={reset} disabled={loading}
              className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50">
              🔄 Sıfırla
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
              🔄 Tekrar Dene
            </button>
          </div>
        )}

        {/* Result */}
        {text && !loading && (
          <div ref={resRef} className="mt-6 bg-gray-50 rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900">📝 Çıkarılan Metin</h2>
              <div className="flex gap-2">
                <button onClick={copy}
                  className="text-sm px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                  {copied ? "✅ Kopyalandı!" : "📋 Kopyala"}
                </button>
                <button onClick={download}
                  className="text-sm px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                  ⬇️ İndir
                </button>
              </div>
            </div>
            <textarea readOnly value={text}
              className="w-full h-48 p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 resize-y font-sans"
              dir="auto" />
            {!text.startsWith("(") && !error && (
              <p className="text-xs text-gray-400 mt-2">
                ✨ {text.split(/\s+/).filter((w: string) => w.length > 0).length} kelime
              </p>
            )}
          </div>
        )}
      </div>
      <SEOContent content={seoContent} lang="tr" />
      <FAQSection faqs={faqs} lang="tr" />
      <RelatedTools tools={relatedTools} lang="tr" />
      <ShareButtons lang="tr" />
    </div>
  );
}