"use client";
import { useState, useRef } from "react";
import StructuredData, {
  howToSchema,
  speakableSchema,
  toolSchema,
  faqSchema,
  breadcrumbSchema,
} from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

const faqs = [
  {
    question: "Bagaimana cara menghitung kalori dari foto makanan?",
    answer: "Cukup foto makanan Anda dengan kamera ponsel atau unggah gambar dari galeri. AI menganalisis gambar untuk mengidentifikasi setiap hidangan, memperkirakan ukuran porsi, lalu menghitung kalori. Hasil muncul dalam hitungan detik — tanpa pencatatan manual.",
  },
  {
    question: "Seberapa akurat alat analisis kalori ini?",
    answer: "Akurasi tergantung pada kualitas gambar. Foto yang jelas dan terang mencapai akurasi 80-90%. Gambar buram mungkin kurang akurat. Gunakan hasil sebagai referensi, bukan pengganti saran dokter gizi.",
  },
  {
    question: "Foto seperti apa yang paling baik?",
    answer: "Foto dari atas dengan pencahayaan alami yang baik dan piring terpisah paling baik. Hindari gambar gelap, jauh, atau berantakan. Terbaik: satu hidangan per foto, diambil 15-30cm dari sudut atas.",
  },
  {
    question: "Apakah alat ini gratis?",
    answer: "Ya, 100% gratis — tanpa registrasi, langganan, atau batasan penggunaan. Yang Anda butuhkan hanyalah kamera ponsel atau foto dari galeri.",
  },
  {
    question: "Bagaimana jika AI tidak bisa mengenali makanan?",
    answer: "Coba foto ulang dari sudut yang lebih baik dengan pencahayaan yang lebih baik. Pastikan makanan terlihat jelas. Anda juga dapat memotret bahan-bahan secara terpisah untuk analisis yang lebih akurat.",
  },
  {
    question: "Apakah perlu internet?",
    answer: "Ya, analisis berjalan melalui AI di cloud, jadi Anda perlu koneksi internet. Gambar dikirim hanya untuk analisis dan tidak disimpan di server kami.",
  },
  {
    question: "Apakah data saya aman?",
    answer: "Tentu. Gambar dikirim untuk analisis melalui API OpenRouter dan tidak disimpan di mana pun. Privasi Anda 100% terjamin.",
  },
  {
    question: "Berapa kalori dalam makanan rata-rata?",
    answer: "Rata-rata sarapan: 300-500 kalori. Makan siang: 500-800 kalori. Makan malam: 400-700 kalori. Makanan cepat saji bisa mencapai 1000+ kalori per porsi. Gunakan alat ini untuk menganalisis makanan Anda yang sebenarnya.",
  },
  {
    question: "Bisakah saya gunakan untuk diet?",
    answer: "Ya! Sangat cocok untuk melacak kalori. Foto makanan Anda sepanjang hari untuk tahu persis apa yang Anda konsumsi. Pelacakan harian membantu Anda mencapai target penurunan atau pemeliharaan berat badan.",
  },
  {
    question: "Apakah bisa menganalisis minuman?",
    answer: "Ya, menganalisis jus, kopi, teh, soda, dan lainnya. Pastikan untuk memotret gelas dengan jelas dengan referensi ukuran jika memungkinkan.",
  },
  {
    question: "Apa perbedaan antara kalori dan makro?",
    answer: "Kalori = total energi dalam makanan. Makro: protein (4 kal/g), karbohidrat (4 kal/g), lemak (9 kal/g). Alat ini menghitung ketiganya untuk gambaran nutrisi yang lengkap.",
  },
  {
    question: "Mengapa perkiraan kalori berbeda untuk makanan yang sama?",
    answer: "Ukuran porsi bervariasi — seporsi nasi bisa 1 atau 2 cangkir. AI memperkirakan ukuran porsi secara visual. Foto yang lebih jelas dengan referensi ukuran (seperti garpu atau tepi piring) meningkatkan perkiraan porsi.",
  },
];

const relatedTools = [
  {
    title: "Kalkulator Kalori (BMR)",
    icon: "🔥",
    href: "/id/tools/calorie-calculator",
  },
  {
    title: "Kalkulator BMI",
    icon: "⚖️",
    href: "/id/tools/bmi-calculator",
  },
  { title: "Stopwatch", icon: "⏱️", href: "/id/tools/stopwatch" },
  { title: "Timer", icon: "⏰", href: "/id/tools/timer" },
];

const seoContent = [
  "Analisis Kalori Makanan dari Foto adalah alat gratis berbasis AI yang menganalisis foto makanan untuk menentukan kandungan kalori dan informasi nutrisi. Cukup foto makanan Anda — baik dengan kamera atau dari galeri foto — dan dapatkan analisis instan yang akurat.",
  "Cara kerjanya: Ambil foto makanan Anda yang jelas dari sudut atas. Alat mengirim gambar ke model AI khusus yang mengidentifikasi setiap makanan, memperkirakan ukuran porsi, dan menghitung kalori, protein, karbohidrat, serta lemak. Hasil muncul dalam 5-10 detik.",
  "Sempurna untuk siapa pun yang melacak nutrisi: foto sarapan Anda untuk tahu kalori pagi, analisis makan siang dan malam dengan cara yang sama. Lacak makanan harian Anda tanpa pencatatan manual atau menimbang makanan.",
  "Bonus: Alat ini menguraikan makanan menjadi komponen individu — lihat berapa banyak protein dalam dada ayam versus karbohidrat dalam nasi. Ini membantu Anda menyeimbangkan makanan untuk nutrisi yang lebih baik.",
];

export default function Client() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    items?: any[];
    totalCalories?: number;
    totalProtein?: number;
    totalCarbs?: number;
    totalFat?: number;
    mealType?: string;
    summary?: string;
    error?: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  /** Compress image to max 1024px, JPEG 0.7 quality, returns base64 data URL */
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const MAX = 1024;
          let w = img.width, h = img.height;
          if (w > MAX || h > MAX) {
            if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
            else { w = Math.round(w * MAX / h); h = MAX; }
          }
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = reader.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleImageSelect = async (file: File) => {
    setError("");
    setResult(null);
    if (!file.type.startsWith("image/")) {
      setError("Pilih gambar yang valid (JPEG, PNG, WebP)");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError("Gambar terlalu besar. Maksimal 10MB.");
      return;
    }
    setFileName(file.name);
    try {
      const compressed = await compressImage(file);
      setImage(compressed);
    } catch {
      setError("Gagal mengompresi gambar. Coba lagi.");
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/calorie-vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });
      let data;
      try {
        data = await res.json();
      } catch {
        const text = await res.text();
        throw new Error(`Server mengembalikan respons tak terduga: ${text.slice(0, 100)}`);
      }
      if (!res.ok) throw new Error(data.error || "Analisis gagal");
      if (data.error) { setError(data.error); return; }
      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: any) {
      setError(e.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const resetTool = () => {
    setImage(null); setFileName(""); setResult(null); setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const getConfidenceColor = (conf: string) => {
    switch (conf) {
      case "high": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getMealTypeText = (type?: string) => {
    switch (type) {
      case "breakfast": return "🍳 Sarapan";
      case "lunch": return "🍲 Makan Siang";
      case "dinner": return "🌙 Makan Malam";
      case "snack": return "🍿 Camilan";
      default: return "🍽️ Makanan";
    }
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Analisis Kalori Makanan", "Alat analisis kalori makanan berbasis AI gratis — foto dan dapatkan detail kalori & nutrisi instan", "https://adwatak.cloud/id/tools/food-calorie-analyzer", "en", "Health")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([
        { name: "Beranda", url: "https://adwatak.cloud/id" },
        { name: "Alat Lainnya", url: "https://adwatak.cloud/id/category/daily" },
        { name: "Analisis Kalori Makanan", url: "https://adwatak.cloud/id/tools/food-calorie-analyzer" },
      ])} />
      <StructuredData data={howToSchema(
          "Analisis Kalori Makanan",
          "Cara menganalisis kalori dari foto makanan",
          [
            { name: "Foto makanan Anda", text: "Ambil foto dengan kamera atau unggah dari galeri." },
            { name: "Tunggu analisis", text: "Klik 'Analisis Gambar' dan tunggu 5-10 detik." },
            { name: "Lihat hasil", text: "Lihat kalori dan nutrisi untuk setiap item plus total." },
          ],
          "PT30S",
          "en"
        )} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb category="Alat Lainnya" categorySlug="daily" toolName="Analisis Kalori Makanan" />

      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">📸 Analisis Kalori Makanan</h1>
        <p className="text-sm text-gray-500 mb-6">Foto makanan Anda dan dapatkan analisis kalori & nutrisi instan — gratis</p>

        {!image && (
          <div className="border-2 border-dashed border-blue-300 bg-blue-50/40 rounded-2xl p-8 text-center transition hover:border-blue-400 hover:bg-blue-50/60">
            <div className="text-5xl mb-4">📷</div>
            <p className="font-semibold text-gray-700 mb-1">Pilih foto makanan</p>
            <p className="text-xs text-gray-400 mb-4">JPEG, PNG atau WebP — hingga 10MB</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors">
                📂 Dari Galeri
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageSelect(f); }} />
              </label>
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-semibold cursor-pointer border-none hover:bg-green-700 transition-colors">
                📸 Ambil Foto
                <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageSelect(f); }} />
              </label>
            </div>
          </div>
        )}

        {image && !result && (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 max-w-md mx-auto">
              <img src={image} alt="Makanan dipilih" className="w-full h-auto max-h-80 object-contain bg-gray-50" />
            </div>
            {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">⚠️ {error}</div>}
            <div className="flex gap-3 justify-center">
              <button onClick={analyzeImage} disabled={loading} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold border-none text-base cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                {loading ? <><span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Menganalisis...</> : <>🔍 Analisis Gambar</>}
              </button>
              <button onClick={resetTool} disabled={loading} className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold border-none text-base cursor-pointer hover:bg-gray-200 transition-all">Batal</button>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 font-semibold">Menganalisis makanan Anda dengan AI...</p>
            <p className="text-xs text-gray-400 mt-1">Mungkin memakan waktu 5-10 detik</p>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-6 animate-fadeIn">
            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 max-w-sm mx-auto">
              <img src={image || ""} alt="Makanan dianalisis" className="w-full h-auto max-h-60 object-contain bg-gray-50" />
            </div>
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">{getMealTypeText(result.mealType)}</span>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 text-center">
              <p className="text-xs text-blue-500 mb-1 font-semibold">Total Kalori</p>
              <p className="text-4xl font-extrabold text-blue-900">{result.totalCalories ?? "—"}</p>
              <p className="text-sm text-blue-500">kalori</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
                <p className="text-xs text-red-500 mb-1 font-semibold">Protein</p>
                <p className="text-xl font-extrabold text-red-700">{result.totalProtein?.toFixed(1) ?? "—"}</p>
                <p className="text-[10px] text-red-400">gram</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100">
                <p className="text-xs text-yellow-600 mb-1 font-semibold">Karbohidrat</p>
                <p className="text-xl font-extrabold text-yellow-800">{result.totalCarbs?.toFixed(1) ?? "—"}</p>
                <p className="text-[10px] text-yellow-500">gram</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100">
                <p className="text-xs text-orange-500 mb-1 font-semibold">Lemak</p>
                <p className="text-xl font-extrabold text-orange-700">{result.totalFat?.toFixed(1) ?? "—"}</p>
                <p className="text-[10px] text-orange-400">gram</p>
              </div>
            </div>
            {result.items && result.items.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800 mb-3 text-base">Detail Item</h3>
                <div className="space-y-2">
                  {result.items.map((item, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-400">{item.portion}</p>
                        </div>
                        {item.confidence && <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getConfidenceColor(item.confidence)}`}>{item.confidence}</span>}
                      </div>
                      <div className="flex gap-4 text-xs text-gray-500 flex-wrap">
                        <span>🔥 {item.calories} kal</span>
                        <span>💪 {item.protein?.toFixed(1)}g protein</span>
                        <span>🍚 {item.carbs?.toFixed(1)}g karbo</span>
                        <span>🫒 {item.fat?.toFixed(1)}g lemak</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {result.summary && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs text-gray-400 mb-1 font-semibold">Penilaian</p>
                <p className="text-sm text-gray-700 leading-relaxed">{result.summary}</p>
              </div>
            )}
            <button onClick={resetTool} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold border-none text-sm cursor-pointer hover:bg-blue-700 transition-colors">🔄 Analisis Makanan Lain</button>
          </div>
        )}
      </div>

      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="id" />
      <ShareButtons lang="id" />

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}</style>
    </div>
  );
}
