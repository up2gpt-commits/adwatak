"use client";
import { useState, useRef, useEffect } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "Bagaimana suara pengusir nyamuk bekerja?", answer: "Frekuensi 15.000 Hz meniru kepakan sayap nyamuk jantan dan capung. Hanya nyamuk betina yang telah dibuahi yang menggigit (mereka membutuhkan darah untuk telur) dan secara naluriah akan lari dari predator dan jantan — membuat mereka meninggalkan area tersebut." },
  { question: "Apakah aman untuk manusia?", answer: "Untuk kebanyakan orang dewasa, 15.000 Hz hampir tidak terdengar — berada di ujung batas pendengaran manusia. Namun, jaga volume di bawah 40% dan tempatkan perangkat 2-3 meter jauhnya. Paparan lama dengan volume tinggi dapat menyebabkan sakit kepala atau tinnitus." },
  { question: "Apakah aman untuk hewan peliharaan?", answer: "TIDAK — kucing dan anjing memiliki pendengaran yang sangat sensitif dan mendengar frekuensi ini jauh lebih keras daripada manusia. Jangan gunakan alat ini di ruangan dengan hewan peliharaan. Dapat menyebabkan kesusahan, kepanikan, dan potensi kerusakan pendengaran." },
  { question: "Berapa lama harus diputar?", answer: "15-30 menit cukup untuk membersihkan nyamuk dari ruangan. Putar sebelum tidur, lalu matikan. Memutarnya sepanjang malam tidak perlu dan dapat merusak speaker ponsel." },
  { question: "Apakah merusak speaker ponsel?", answer: "Ya, memutar gelombang sinus murni dengan volume tinggi selama berjam-jam dapat membuat kumparan speaker overheat. Jaga volume maksimal 30-40% dan batasi pemutaran maksimal 30 menit per sesi." },
  { question: "Apakah efektif untuk semua jenis nyamuk?", answer: "Paling efektif untuk nyamuk Aedes dan Culex (nyamuk rumah biasa). Efektivitas bervariasi menurut spesies dan lingkungan. Gunakan dengan kelambu/repelan untuk hasil terbaik." },
  { question: "Apakah membahayakan lingkungan?", answer: "Tidak — murni akustik. Tanpa bahan kimia, tanpa asap, tanpa residu. Pengendalian nyamuk yang ramah lingkungan." },
];

const relatedTools = [
  { title: "Arah Kiblat", icon: "🕋", href: "/id/tools/qibla-direction" },
  { title: "Penghitung Tasbih", icon: "📿", href: "/id/tools/tasbeeh-counter" },
  { title: "Waktu Sholat", icon: "🕌", href: "/id/tools/prayer-times" },
];

const seoContent = [
  "Alat pengusir nyamuk suara online gratis — menggunakan gelombang suara frekuensi tinggi 15.000 Hz untuk mengusir nyamuk secara alami. Tanpa bahan kimia, tanpa instalasi aplikasi. Bekerja langsung di browser Anda.",
  "Frekuensi pengusir nyamuk (15 kHz) menggunakan teknologi gelombang sinus murni untuk menciptakan pencegah nyamuk ultrasonik. Suara bernada tinggi ini dirancang untuk mengusir nyamuk dengan meniru predator alami.",
  "Cara penggunaan: Buka alat, tekan play, atur volume ke 30-40%, tempatkan perangkat 2-3 meter jauhnya, dan biarkan selama 15-30 menit. Suara berulang secara otomatis hingga Anda menghentikannya.",
  "Keselamatan: Jaga volume tetap rendah, lindungi hewan peliharaan Anda (jangan gunakan di ruangan dengan kucing atau anjing), dan jangan putar lebih dari 30 menit untuk melindungi speaker ponsel Anda.",
  "Pengusir nyamuk elektronik ini adalah alternatif bebas bahan kimia untuk semprotan dan obat nyamuk bakar. Ideal untuk kamar tidur, kantor, tenda kemah, dan area duduk luar ruangan.",
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

  const schemaName = "Pengusir Nyamuk Suara";
  const schemaDesc = "Alat pengusir nyamuk gratis menggunakan suara frekuensi tinggi 15.000 Hz — bebas bahan kimia, berbasis browser";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/id/tools/mosquito-repellent";
  const breadcrumbItems = [
    { name: "Beranda", url: "https://adwatak.cloud/id" },
    { name: "Alat Lainnya", url: "https://adwatak.cloud/id/category/daily" },
    { name: "Pengusir Nyamuk Suara", url: "https://adwatak.cloud/id/tools/mosquito-repellent" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'id', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb lang="id" category="Alat Lainnya" categorySlug="daily" toolName="Pengusir Nyamuk Suara" />

      {/* Main Player Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold mb-1">🦟 Pengusir Nyamuk Suara</h1>
          <p className="text-sm text-gray-500 mb-6">Frekuensi tinggi 15.000 Hz pengusir nyamuk — putaran berulang otomatis</p>
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
            ⚠️ Peringatan Keselamatan Penting
          </h2>
          <ul className="text-sm text-amber-700 space-y-2 list-disc list-inside marker:text-amber-500">
            <li><strong>Jaga volume maksimal 30-40%</strong> — volume lebih tinggi tidak mengusir lebih banyak nyamuk tetapi dapat merusak pendengaran</li>
            <li><strong>Jaga jarak 2-3 meter</strong> — jangan letakkan di dekat kepala atau di bawah bantal</li>
            <li><strong>TIDAK aman untuk hewan peliharaan</strong> — jangan gunakan di ruangan dengan kucing atau anjing</li>
            <li><strong>Batasi 15-30 menit</strong> — pemutaran lama dapat membuat speaker ponsel overheat</li>
            <li><strong>Hentikan jika merasa tidak nyaman</strong> — sakit kepala atau tinnitus adalah tanda untuk berhenti</li>
          </ul>
        </div>

        {/* Recommended Usage */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h2 className="font-bold text-blue-800 mb-2 text-sm flex items-center gap-2">
            💡 Penggunaan yang Disarankan
          </h2>
          <p className="text-sm text-blue-700">
            Putar pada <strong>volume 30%</strong>, letakkan ponsel di <strong>sudut jauh ruangan</strong> sebelum tidur, jalankan <strong>maksimal 30 menit</strong>, lalu matikan dan tidur dengan nyenyak.
          </p>
        </div>
      </div>

      <SEOContent content={seoContent} lang="id" />
      <FAQSection faqs={faqs} lang="id" />
      <RelatedTools tools={relatedTools} lang="id" />
      <ShareButtons lang="id" />
    </div>
  );
}
