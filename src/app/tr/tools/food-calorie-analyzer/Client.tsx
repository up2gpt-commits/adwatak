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
    question: "Fotoğraftan kalori nasıl hesaplanır?",
    answer: "Yemeğinizin fotoğrafını çekin veya galerinizden yükleyin. Yapay zeka fotoğrafı analiz ederek her bir yemeği tanır, porsiyon boyutlarını tahmin eder ve kalorileri hesaplar. Sonuçlar saniyeler içinde görünür — manuel hesaplama gerektirmez.",
  },
  {
    question: "Kalori analiz aracı ne kadar doğru?",
    answer: "Doğruluk, fotoğraf kalitesine bağlıdır. Net, iyi aydınlatılmış fotoğraflar %80-90 doğruluk sağlar. Bulanık görüntüler daha az doğru olabilir. Sonuçları profesyonel diyet tavsiyesinin yerine değil, yardımcı bir referans olarak kullanın.",
  },
  {
    question: "Hangi tür fotoğraflar daha iyi sonuç verir?",
    answer: "Üstten çekim, iyi doğal ışık ve ayrı tabaklar en iyi sonucu verir. Karanlık, uzak veya karmaşık görüntülerden kaçının. En iyisi: her tabak için ayrı fotoğraf, 15-30cm uzaklıktan üst açı.",
  },
  {
    question: "Araç ücretsiz mi?",
    answer: "Evet, %100 ücretsiz — kayıt, abonelik veya kullanım sınırı yok. Tek ihtiyacınız olan telefon kameranız veya galerinizden bir fotoğraf.",
  },
  {
    question: "Ya AI yemeği tanıyamazsa?",
    answer: "Daha iyi bir açıdan ve daha iyi ışıkta yeniden fotoğraf çekmeyi deneyin. Yiyeceğin açıkça görünür olduğundan emin olun. Daha doğru analiz için malzemeleri ayrı ayrı fotoğraflayabilirsiniz.",
  },
  {
    question: "İnternet gerekli mi?",
    answer: "Evet, analiz buluttaki AI ile çalışır, bu nedenle internet bağlantısı gerekir. Görüntü yalnızca analiz için gönderilir ve sunucularımızda saklanmaz.",
  },
  {
    question: "Verilerim güvende mi?",
    answer: "Kesinlikle. Görüntüler analiz için OpenRouter API üzerinden gönderilir ve hiçbir yerde saklanmaz. Gizliliğiniz %100 garanti altındadır.",
  },
  {
    question: "Ortalama bir öğünde kaç kalori var?",
    answer: "Ortalama kahvaltı: 300-500 kalori. Öğle yemeği: 500-800 kalori. Akşam yemeği: 400-700 kalori. Fast food öğünleri 1000+ kaloriye ulaşabilir. Tahmin etmek yerine aracı kullanarak gerçek öğününüzü analiz edin.",
  },
  {
    question: "Kilo vermek için kullanabilir miyim?",
    answer: "Evet! Kalori takibi için mükemmeldir. Gün boyunca öğünlerinizi fotoğraflayarak tam olarak ne tükettiğinizi bilin. Günlük takip, kilo verme veya koruma hedeflerinize ulaşmanıza yardımcı olur.",
  },
  {
    question: "İçecekleri de analiz eder mi?",
    answer: "Evet, meyve suları, kahve, çay, gazlı içecekler ve daha fazlasını analiz eder. Mümkünse bardağı net bir şekilde fotoğraflayın.",
  },
  {
    question: "Kalori ve makro besinler arasındaki fark nedir?",
    answer: "Kalori = öğündeki toplam enerji. Makro besinler: protein (4 cal/g), karbonhidrat (4 cal/g), yağ (9 cal/g). Araç, eksiksiz bir beslenme profili için üçünü de hesaplar.",
  },
  {
    question: "Aynı yemeğin farklı fotoğraflarında kalori neden farklı?",
    answer: "Porsiyon boyutu değişir — bir porsiyon pilav 1 veya 2 bardak olabilir. AI porsiyon boyutunu görsel olarak tahmin eder. Çatal veya tabak kenarı gibi boyut referansları olan daha net fotoğraflar daha iyi tahmin sağlar.",
  },
];

const relatedTools = [
  {
    title: "Kalori Hesaplama (BMR)",
    icon: "🔥",
    href: "/tr/tools/calorie-calculator",
  },
  {
    title: "VKİ Hesaplama",
    icon: "⚖️",
    href: "/tr/tools/bmi-calculator",
  },
  { title: "Kronometre", icon: "⏱️", href: "/tr/tools/stopwatch" },
  { title: "Zamanlayıcı", icon: "⏰", href: "/tr/tools/timer" },
];

const seoContent = [
  "Fotoğrafla Kalori Analizi, yapay zeka destekli ücretsiz bir araçtır. Yemeğinizin fotoğrafını çekerek anında kalori ve besin değeri bilgileri almanızı sağlar. Kameranızla fotoğraf çekin veya galerinizden yükleyin, saniyeler içinde sonuç alın.",
  "Nasıl çalışır: Yemeğinizin üstten net bir fotoğrafını çekin. Araç, görüntüyü özel bir AI modeline gönderir, her bir yiyeceği tanır, porsiyon boyutlarını tahmin eder ve kalori, protein, karbonhidrat ve yağ değerlerini hesaplar.",
  "Beslenme takibi yapanlar için ideal: Kahvaltınızı fotoğraflayın, öğle ve akşam yemeğinizi de aynı şekilde analiz edin. Günlük öğünlerinizi manuel kayıt veya tartı olmadan takip edin.",
  "Ek özellik: Araç, öğünleri tek tek bileşenlerine ayırır — tavuk göğsündeki proteini, pilavdaki karbonhidratı görebilirsiniz. Tek fotoğrafla dengeli beslenmenize yardımcı olur.",
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
      setError("Lütfen geçerli bir görsel seçin (JPEG, PNG, WebP)");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError("Görsel çok büyük. Maksimum 10MB.");
      return;
    }
    setFileName(file.name);
    try {
      const compressed = await compressImage(file);
      setImage(compressed);
    } catch {
      setError("Görsel sıkıştırılamadı. Tekrar deneyin.");
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
        throw new Error(`Sunucu beklenmeyen yanıt verdi: ${text.slice(0, 100)}`);
      }
      if (!res.ok) throw new Error(data.error || "Analiz başarısız");
      if (data.error) { setError(data.error); return; }
      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: any) {
      setError(e.message || "Bir hata oluştu. Tekrar deneyin.");
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
      case "breakfast": return "🍳 Kahvaltı";
      case "lunch": return "🍲 Öğle Yemeği";
      case "dinner": return "🌙 Akşam Yemeği";
      case "snack": return "🍿 Atıştırmalık";
      default: return "🍽️ Öğün";
    }
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Fotoğrafla Kalori Analizi", "Ücretsiz yapay zeka destekli kalori analizi — fotoğraf çekin, anlık kalori ve besin detaylarını alın", "https://adwatak.cloud/tr/tools/food-calorie-analyzer", "en", "Health")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([
        { name: "Ana Sayfa", url: "https://adwatak.cloud/tr" },
        { name: "Diğer Araçlar", url: "https://adwatak.cloud/tr/category/daily" },
        { name: "Fotoğrafla Kalori Analizi", url: "https://adwatak.cloud/tr/tools/food-calorie-analyzer" },
      ])} />
      <StructuredData data={howToSchema(
          "Fotoğrafla Kalori Analizi",
          "Fotoğraftan kalori nasıl analiz edilir",
          [
            { name: "Fotoğraf çekin", text: "Kameranızla fotoğraf çekin veya galerinizden yükleyin." },
            { name: "Analizi bekleyin", text: "'Analiz Et' butonuna tıklayın ve 5-10 saniye bekleyin." },
            { name: "Sonuçları görün", text: "Her bir yiyeceğin kalori ve besin değerlerini görün." },
          ],
          "PT30S",
          "en"
        )} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb category="Diğer Araçlar" categorySlug="daily" toolName="Fotoğrafla Kalori Analizi" />

      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">📸 Fotoğrafla Kalori Analizi</h1>
        <p className="text-sm text-gray-500 mb-6">Yemeğinizi fotoğraflayın, anlık kalori ve besin analizi alın — ücretsiz</p>

        {!image && (
          <div className="border-2 border-dashed border-blue-300 bg-blue-50/40 rounded-2xl p-8 text-center transition hover:border-blue-400 hover:bg-blue-50/60">
            <div className="text-5xl mb-4">📷</div>
            <p className="font-semibold text-gray-700 mb-1">Bir yemek fotoğrafı seçin</p>
            <p className="text-xs text-gray-400 mb-4">JPEG, PNG veya WebP — maksimum 10MB</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors">
                📂 Galeriden
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageSelect(f); }} />
              </label>
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-semibold cursor-pointer border-none hover:bg-green-700 transition-colors">
                📸 Fotoğraf Çek
                <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageSelect(f); }} />
              </label>
            </div>
          </div>
        )}

        {image && !result && (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 max-w-md mx-auto">
              <img src={image} alt="Seçilen yemek" className="w-full h-auto max-h-80 object-contain bg-gray-50" />
            </div>
            {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">⚠️ {error}</div>}
            <div className="flex gap-3 justify-center">
              <button onClick={analyzeImage} disabled={loading} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold border-none text-base cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                {loading ? <><span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Analiz ediliyor...</> : <>🔍 Analiz Et</>}
              </button>
              <button onClick={resetTool} disabled={loading} className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold border-none text-base cursor-pointer hover:bg-gray-200 transition-all">İptal</button>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 font-semibold">Yapay zeka ile yemeğiniz analiz ediliyor...</p>
            <p className="text-xs text-gray-400 mt-1">5-10 saniye sürebilir</p>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-6 animate-fadeIn">
            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 max-w-sm mx-auto">
              <img src={image || ""} alt="Analiz edilen yemek" className="w-full h-auto max-h-60 object-contain bg-gray-50" />
            </div>
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">{getMealTypeText(result.mealType)}</span>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 text-center">
              <p className="text-xs text-blue-500 mb-1 font-semibold">Toplam Kalori</p>
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
                <p className="text-xs text-yellow-600 mb-1 font-semibold">Karbonhidrat</p>
                <p className="text-xl font-extrabold text-yellow-800">{result.totalCarbs?.toFixed(1) ?? "—"}</p>
                <p className="text-[10px] text-yellow-500">gram</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100">
                <p className="text-xs text-orange-500 mb-1 font-semibold">Yağ</p>
                <p className="text-xl font-extrabold text-orange-700">{result.totalFat?.toFixed(1) ?? "—"}</p>
                <p className="text-[10px] text-orange-400">gram</p>
              </div>
            </div>
            {result.items && result.items.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800 mb-3 text-base">Öğe Detayları</h3>
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
                        <span>🍚 {item.carbs?.toFixed(1)}g karbonhidrat</span>
                        <span>🫒 {item.fat?.toFixed(1)}g yağ</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {result.summary && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs text-gray-400 mb-1 font-semibold">Değerlendirme</p>
                <p className="text-sm text-gray-700 leading-relaxed">{result.summary}</p>
              </div>
            )}
            <button onClick={resetTool} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold border-none text-sm cursor-pointer hover:bg-blue-700 transition-colors">🔄 Başka Bir Öğün Analiz Et</button>
          </div>
        )}
      </div>

      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="tr" />
      <ShareButtons lang="tr" />

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}</style>
    </div>
  );
}
