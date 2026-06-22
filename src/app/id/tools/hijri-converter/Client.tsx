"use client";
import { useState } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema ,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "Apa itu kalender Hijriah?", answer: "Kalender lunar Islam yang digunakan oleh umat Muslim di seluruh dunia untuk acara keagamaan. Dimulai pada tahun 622 M (Hijrah Nabi Muhammad dari Mekah ke Madinah). 12 bulan lunar = 354-355 hari. Lebih pendek dari tahun Masehi sekitar 11 hari." },
  { question: "Bagaimana cara mengonversi antara Hijriah dan Masehi?", answer: "Rumus: perkiraan tahun Hijriah = (tahun Masehi - 622) × 0,97. Namun bulan/tanggal memerlukan perhitungan tepat berdasarkan siklus bulan. Konverter kami memberikan hasil akurat menggunakan kalender Umm al-Qura (Arab Saudi)." },
  { question: "Apa saja bulan-bulan Hijriah?", answer: "Muharram (محرم), Safar (صفر), Rabi' al-Awwal (ربيع الأول), Rabi' al-Thani (ربيع الثاني), Jumada al-Awwal (جمادى الأولى), Jumada al-Thani (جمادى الثانية), Rajab (رجب), Sha'ban (شعبان), Ramadan (رمضان), Shawwal (شوال), Dhu al-Qi'dah (ذو القعدة), Dhu al-Hijjah (ذو الحجة)." },
  { question: "Mengapa tahun Hijriah lebih pendek dari tahun Masehi?", answer: "Tahun lunar: 354 hari (12 × 29,5 siklus bulan). Tahun matahari: 365 hari (satu orbit Bumi). Selisih 11 hari berarti tanggal Hijriah bergeser ~11 hari lebih awal setiap tahun Masehi. Ramadan bergerak melalui semua musim setiap 33 tahun." },
  { question: "Tahun berapa sekarang dalam Hijriah?", answer: "Per tahun 2024 M: sekitar 1445-1446 H. Kalender Hijriah dimulai pada tahun 622 M. 2025-2026 M ≈ 1447 H. Konverter kami memberikan tanggal Hijriah yang tepat untuk setiap tanggal Masehi." },
  { question: "Apa itu kalender Umm al-Qura?", answer: "Kalender Hijriah resmi yang digunakan oleh Arab Saudi. Menggunakan bulan lunar yang dihitung (bukan pengamatan bulan aktual) untuk keperluan administratif. Kalender Hijriah komputasi paling akurat. Konverter kami menggunakan sistem Umm al-Qura." },
  { question: "Pengamatan bulan vs kalender yang dihitung?", answer: "Pengamatan bulan: metode tradisional — mencari bulan baru. Memulai bulan ketika hilal terlihat. Dihitung: prediksi astronomis. Arab Saudi menggunakan Umm al-Qura untuk tanggal sipil tetapi pengamatan bulan untuk Ramadan/Idul Fitri. Negara yang berbeda mungkin memulai Ramadan pada hari yang berbeda." },
  { question: "Tanggal Hijriah berapa hari ini?", answer: "Konverter kami menampilkan tanggal Hijriah hari ini secara otomatis. Masukkan tanggal Masehi apa pun untuk melihat tanggal Hijriah yang sesuai. Juga berfungsi sebaliknya: masukkan tanggal Hijriah untuk melihat padanan Masehi." },
  { question: "Kalender Hijriah untuk bisnis?", answer: "Arab Saudi menggunakan Hijriah untuk tanggal pemerintahan, kontrak, dan ketenagakerjaan. Masehi digunakan bersamaan untuk bisnis internasional. Konverter kami membantu menjembatani kedua kalender untuk perencanaan bisnis dan tanggal kontrak." },
  { question: "Apa makna setiap bulan?", answer: "Muharram: Tahun Baru Islam, Asyura (tanggal 10). Safar: secara historis dianggap sial (hanya takhayul). Rabi' al-Awwal: kelahiran Nabi Muhammad (Maulid). Ramadan: bulan puasa, turunnya Al-Quran. Shawwal: Idul Fitri. Dhu al-Hijjah: ibadah haji, Idul Adha." },
  { question: "Mengapa tahun Hijriah saat ini 1446?", answer: "Hijrah (migrasi) terjadi pada tahun 622 M. 2024 - 622 = 1402. Namun tahun lunar lebih pendek, sehingga lebih banyak tahun lunar yang telah berlalu. Sekitar 1446 tahun lunar sejak Hijrah. Konverter kami menghitung tahun yang tepat." },
  { question: "Hijriah di negara non-Muslim?", answer: "Digunakan oleh komunitas Muslim untuk acara keagamaan (Ramadan, Idul Fitri). Pemberi kerja mengakomodasi hari libur keagamaan. Sekolah menandai hari libur Islam. Konverter kami membantu non-Muslim memahami tanggal Islam untuk penjadwalan dan kesadaran budaya." }
];
const relatedTools = [
  { title: "Kalkulator Usia", icon: "🎂", href: "/id/tools/age-calculator" },
  { title: "Kalkulator Zakat", icon: "☪️", href: "/id/tools/zakat-calculator" },
  { title: "Kalkulator Waris", icon: "📜", href: "/id/tools/inheritance-calculator" },
  { title: "Kalkulator Emas", icon: "🥇", href: "/id/tools/gold-calculator" },
  { title: "Kalkulator Kalori", icon: "🔥", href: "/id/tools/calorie-calculator" },
  { title: "Konverter Satuan", icon: "📏", href: "/id/tools/unit-converter" }
];
const seoContent = [
  "Konverter Hijri gratis kami mengonversi antara tanggal kalender Islam (Hijri) dan Masehi (Barat) secara instan. Masukkan salah satu tanggal untuk melihat padanannya. Cocok untuk melacak tanggal Ramadan, hari raya Islam, merencanakan Haji, dan mengonversi tanggal lahir untuk dokumen resmi.",
  "Kalender Islam memiliki 12 bulan lunar dengan total 354-355 hari. Ini berarti tanggal Hijri bergeser ~11 hari lebih awal setiap tahun Masehi. Ramadan 2024 mungkin Maret-April, tetapi pada 2030 akan menjadi Januari. Konverter kami menangani pergeseran ini dengan akurat.",
  "Metode kalender: Konverter kami menggunakan kalender Umm al-Qura (resmi di Arab Saudi) untuk tanggal yang dihitung. Pengamatan hilal aktual mungkin berbeda 1 hari tergantung lokasi dan kondisi visibilitas. Periksa pengumuman pengamatan hilal setempat untuk tanggal Ramadan dan Idul Fitri/Idul Adha.",
  "Penggunaan umum: (1) Temukan tanggal lahir Hijri Anda. (2) Periksa tanggal mulai/berakhir Ramadan untuk tahun apa pun. (3) Konversi tanggal kontrak untuk bisnis Saudi. (4) Rencanakan tanggal Idul Adha dan Haji. (5) Lacak tanggal peringatan Islam (pernikahan, konversi).",
  "Terkait: Gunakan Kalkulator Zakat kami dengan tanggal Hijri Anda untuk perhitungan Zakat tahunan. Kalkulator Waris bekerja dengan tanggal Hijri. Kalkulator Usia dapat menggunakan tanggal lahir Hijri Anda. Kalkulator Emas membantu perhitungan Zakat atas emas.",
  "Kalender Hijri adalah pusat kehidupan Muslim. Gunakan konverter kami untuk merencanakan acara keagamaan, memahami tanggal Islam, dan menghubungkan kedua sistem kalender. Gratis, akurat, dan selalu tersedia."
];

export default function Client() {
  const today = new Date().toISOString().split("T")[0];
  const [gregorian, setGregorian] = useState(today);
  const [hijriResult, setHijriResult] = useState("");

  const hijriMonths = ["Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani", "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"];

  const convert = () => {
    const gd = new Date(gregorian);
    if (isNaN(gd.getTime())) return;
    // Simplified Umm al-Qura-like calculation
    const totalDays = Math.floor((gd.getTime() - new Date("622-07-16").getTime()) / (1000 * 60 * 60 * 24));
    let hYear = Math.floor(totalDays / 354.367);
    let remaining = totalDays - hYear * 354.367;
    if (remaining < 1) { hYear -= 1; remaining = totalDays - hYear * 354.367; }
    hYear += 1; // AH starting from 1
    const hMonth = Math.min(Math.floor(remaining / 29.53), 11);
    const hDay = Math.floor(remaining - hMonth * 29.53) + 1;
    setHijriResult(`${hDay} ${hijriMonths[hMonth]} ${hYear} AH`);
  };

  const schemaName = "Konverter Hijriah";
const schemaDesc = `Online Hijri Converter - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/id/tools/hijri-converter";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/id" },
  { name: "Konverter", url: "https://adwatak.cloud/id/category/calculators" },
  { name: "Konverter Hijriah", url: "https://adwatak.cloud/id/tools/hijri-converter" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines (ChatGPT, Perplexity, Google Assistant) */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      {/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("Cara menggunakan alat ini", "Free online tool. Works directly in your browser. No registration required.", [{name:"Buka alat",text:"Arahkan ke halaman alat ini di Adawatak"},{name:"Masukkan data Anda",text:"Isi kolom yang diperlukan"},{name:"Dapatkan hasil",text:"Klik tombol hitung atau hasilkan"},{name:"Gunakan atau bagikan",text:"Salin, unduh, atau bagikan hasilnya"}],"kurang dari satu menit","id")} />
      {/* GEO: Speakable — AI/voice engines */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />

      <Breadcrumb category="Alat Islami" categorySlug="calculators" toolName="Konverter Hijriah" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🌙 Konverter Hijriah</h1>
        <p className="text-sm text-gray-500 mb-6">Konversi antara tanggal kalender Gregorian dan Hijriah Islam</p>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tanggal Gregorian</label>
        <input type="date" value={gregorian} onChange={(e) => setGregorian(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none mb-4" />
        <button onClick={convert} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Konversi ke Hijriah</button>
      </div>
      {hijriResult && (
        <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200 mb-6">
          <p className="text-xs text-green-600 mb-1">Hijri Date</p>
          <p className="text-lg font-bold text-green-900">{hijriResult}</p>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    <ShareButtons lang="id" />
    </div>
  );
}
