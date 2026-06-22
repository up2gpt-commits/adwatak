"use client";
import { useState, useRef, useEffect } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "Sivrisinek kovucu ses nasıl çalışır?", answer: "15.000 Hz frekansı, erkek sivrisineklerin ve yusufçukların kanat çırpma sesini taklit eder. Sadece döllenmiş dişi sivrisinekler (kan emenler) içgüdüsel olarak erkeklerden ve avcılardan kaçar, bu da onları ortamı terk etmeye zorlar." },
  { question: "İnsanlar için güvenli mi?", answer: "Çoğu yetişkin için 15.000 Hz zar zor duyulur — insan işitme sınırının sonundadır. Ancak ses seviyesini %40'ın altında tutun ve cihazı 2-3 metre uzağa koyun. Yüksek seste uzun süreli maruziyet baş ağrısına veya kulak çınlamasına neden olabilir." },
  { question: "Evcil hayvanlar için güvenli mi?", answer: "HAYIR — kediler ve köpekler son derece hassas işitmeye sahiptir ve bu frekansı insanlardan çok daha yüksek duyarlar. Evcil hayvanların olduğu bir odada KULLANMAYIN. Onlarda strese, paniğe ve işitme hasarına neden olabilir." },
  { question: "Ne kadar süre çalmalı?", answer: "15-30 dakika bir odayı sivrisineklerden temizlemek için yeterlidir. Uykudan önce çalıştırın, sonra kapatın. Bütün gece çalıştırmak gereksizdir ve telefon hoparlörünüze zarar verebilir." },
  { question: "Telefon hoparlörüne zarar verir mi?", answer: "Evet, saf sinüs dalgasını saatlerce yüksek seste çalmak hoparlör bobinini aşırı ısıtabilir. Sesi maksimum %30-40'ta tutun ve oturum başına 30 dakika ile sınırlayın." },
  { question: "Tüm sivrisinek türlerinde işe yarar mı?", answer: "En çok Aedes ve Culex türlerinde (ev sivrisinekleri) etkilidir. Etkinlik türe ve ortama göre değişir. En iyi sonuçlar için cibinlik ve kovucularla birlikte kullanın." },
  { question: "Çevreye zarar verir mi?", answer: "Hayır — tamamen akustiktir. Kimyasal yok, duman yok, kalıntı yok. Çevre dostu sivrisinek kontrolü." },
];

const relatedTools = [
  { title: "Kıble Yönü", icon: "🕋", href: "/tr/tools/qibla-direction" },
  { title: "Tesbih Sayacı", icon: "📿", href: "/tr/tools/tasbeeh-counter" },
  { title: "Namaz Vakitleri", icon: "🕌", href: "/tr/tools/prayer-times" },
];

const seoContent = [
  "Ücretsiz online sivrisinek kovucu ses aracı — sivrisinekleri doğal yolla uzaklaştırmak için 15.000 Hz yüksek frekanslı ses dalgaları kullanır. Kimyasal yok, uygulama kurulumu gerekmez. Doğrudan tarayıcınızda çalışır.",
  "Sivrisinek kovucu frekans (15 kHz), ultrasonik bir sivrisinek caydırıcı oluşturmak için saf sinüs dalgası teknolojisi kullanır. Bu yüksek perdeli ses, doğal avcıları taklit ederek sivrisinekleri uzaklaştırmak için tasarlanmıştır.",
  "Kullanımı: Aracı açın, oynat'a basın, sesi %30-40'a ayarlayın, cihazı 2-3 metre uzağa koyun ve 15-30 dakika çalıştırın. Ses siz durdurana kadar otomatik olarak döngü yapar.",
  "Güvenlik önlemleri: Sesi düşük tutun, evcil hayvanlarınızı koruyun (kedi/köpek olan odalarda kullanmayın) ve telefon hoparlörünüzü korumak için 30 dakikadan fazla çalıştırmayın.",
  "Bu elektronik sivrisinek kovucu, spreyler ve kovucu tabletlere kimyasal içermeyen bir alternatiftir. Yatak odaları, ofisler, kamp çadırları ve açık hava oturma alanları için idealdir.",
];

export default function Client() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/mosquito-repellent.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      audioRef.current.play();
      setElapsed(0);
      intervalRef.current = setInterval(() => setElapsed(p => p + 1), 1000);
    }
    setPlaying(!playing);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const schemaName = "Sivrisinek Kovucu Ses";
  const schemaDesc = "15.000 Hz yüksek frekanslı ses ile ücretsiz sivrisinek kovucu araç — kimyasal içermez, tarayıcı tabanlı";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/tr/tools/mosquito-repellent";
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: "https://adwatak.cloud/tr" },
    { name: "Diğer Araçlar", url: "https://adwatak.cloud/tr/category/daily" },
    { name: "Sivrisinek Kovucu Ses", url: "https://adwatak.cloud/tr/tools/mosquito-repellent" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'tr', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb lang="tr" category="Diğer Araçlar" categorySlug="daily" toolName="Sivrisinek Kovucu Ses" />

      {/* Main Player Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold mb-1">🦟 Sivrisinek Kovucu Ses</h1>
          <p className="text-sm text-gray-500 mb-6">15.000 Hz yüksek frekanslı sivrisinek caydırıcı — otomatik tekrarlı</p>
        </div>

        {/* Player Controls */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 mb-6 border border-indigo-100">
          <div className="flex flex-col items-center gap-6">
            {/* Waveform animation */}
            <div className="flex items-end gap-1 h-16">
              {[1,2,3,4,5,6,7,8,7,6,5,4,3,2,1].map((h, i) => (
                <div
                  key={i}
                  className={`w-2 bg-indigo-400 rounded-full transition-all duration-300 ${playing ? "animate-pulse" : "opacity-30"}`}
                  style={{
                    height: `${h * 8}px`,
                    animationDelay: playing ? `${i * 0.08}s` : "0s",
                    animationDuration: "0.8s",
                  }}
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-3xl font-mono font-bold text-indigo-700">
              {playing ? formatTime(elapsed) : "00:00"}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl border-none cursor-pointer shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
                playing ? "bg-red-500 hover:bg-red-600" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {playing ? "■" : "▶"}
            </button>

            {/* Volume */}
            <div className="w-full max-w-xs flex items-center gap-3 text-sm text-gray-500">
              <span>🔈</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <span>🔊</span>
              <span className="text-xs font-mono w-8 text-right">{Math.round(volume * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Safety Warnings */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
          <h2 className="font-bold text-amber-800 mb-3 text-sm flex items-center gap-2">
            ⚠️ Önemli Güvenlik Uyarıları
          </h2>
          <ul className="text-sm text-amber-700 space-y-2 list-disc list-inside marker:text-amber-500">
            <li><strong>Sesi maksimum %30-40'ta tutun</strong> — yüksek ses daha fazla sivrisinek kovmaz, işitmenize zarar verebilir</li>
            <li><strong>2-3 metre uzakta tutun</strong> — başınızın yakınına veya yastığınızın altına koymayın</li>
            <li><strong>Evcil hayvanlar için güvenli DEĞİL</strong> — kedilerin veya köpeklerin olduğu odada kullanmayın</li>
            <li><strong>15-30 dakika ile sınırlayın</strong> — uzun süreli çalma telefon hoparlörünüze zarar verebilir</li>
            <li><strong>Rahatsızlık hissederseniz durdurun</strong> — baş ağrısı veya kulak çınlaması durdurma işaretidir</li>
          </ul>
        </div>

        {/* Recommended Usage */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h2 className="font-bold text-blue-800 mb-2 text-sm flex items-center gap-2">
            💡 Önerilen Kullanım
          </h2>
          <p className="text-sm text-blue-700">
            Sesi <strong>%30 seviyesinde</strong> çalın, telefonu odanın <strong>uzak bir köşesine</strong> koyun, <strong>maksimum 30 dakika</strong> çalıştırın, sonra kapatın ve rahatça uyuyun.
          </p>
        </div>
      </div>

      <SEOContent content={seoContent} lang="tr" />
      <FAQSection faqs={faqs} lang="tr" />
      <RelatedTools tools={relatedTools} lang="tr" />
      <ShareButtons lang="tr" />
    </div>
  );
}