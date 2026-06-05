"use client";
import { useState, useEffect, useCallback } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const dhikrList = [
  { text: "سُبْحَانَ اللهِ", transliteration: "Subhan Allah", meaning: "Maha Suci Allah", target: 33 },
  { text: "الْحَمْدُ لِلَّهِ", transliteration: "Alhamdulillah", meaning: "Segala puji bagi Allah", target: 33 },
  { text: "اللهُ أَكْبَرُ", transliteration: "Allahu Akbar", meaning: "Allah Maha Besar", target: 34 },
  { text: "لَا إِلَٰهَ إِلَّا اللهُ", transliteration: "La ilaha illallah", meaning: "Tiada Tuhan selain Allah", target: 33 },
  { text: "أَسْتَغْفِرُ اللهَ", transliteration: "Astaghfirullah", meaning: "Aku memohon ampun kepada Allah", target: 33 },
  { text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ", transliteration: "La hawla wa la quwwata illa billah", meaning: "Tidak ada daya dan kekuatan kecuali dengan Allah", target: 33 },
  { text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ", transliteration: "Subhan Allahi wa bihamdihi", meaning: "Maha Suci Allah dan segala puji bagi-Nya", target: 33 },
  { text: "سُبْحَانَ اللهِ الْعَظِيمِ", transliteration: "Subhan Allahil Azeem", meaning: "Maha Suci Allah Yang Maha Agung", target: 33 },
];

const faqs = [
  { question: "Apa itu Penghitung Tasbih?", answer: "Penghitung Tasbih adalah alat digital yang membantu Anda menghitung zikir (mengingat Allah) selama ibadah. Alat ini berjalan langsung di browser Anda, menyimpan kemajuan secara otomatis, dan dapat digunakan sebagai pengganti atau pelengkap tasbih tradisional." },
  { question: "Mengapa 33 hitungan per tasbih?", answer: "Angka 33 berasal dari Sunnah Nabi Muhammad ﷺ. Setelah setiap sholat wajib, beliau mengucapkan 'Subhan Allah' 33 kali, 'Alhamdulillah' 33 kali, dan 'Allahu Akbar' 34 kali — total 100. Praktek ini tercatat dalam Shahih Muslim." },
  { question: "Apakah hitungan tersimpan jika saya menutup halaman?", answer: "Ya! Hitungan Anda otomatis tersimpan di localStorage browser. Saat Anda kembali ke halaman, Anda akan melihat hitungan terakhir. Namun, membersihkan data browser atau menggunakan browser lain akan mereset penghitung." },
  { question: "Bisakah digunakan secara offline?", answer: "Ya — setelah halaman dimuat pertama kali, Penghitung Tasbih bekerja sepenuhnya offline. Semuanya berjalan di browser tanpa data yang dikirim ke server mana pun." },
  { question: "Apakah menggunakan penghitung digital dianggap sebagai zikir?", answer: "Ya, niat yang paling penting. Penghitung digital hanyalah alat untuk membantu Anda melacak zikir. Ulama mengizinkan penggunaan penghitung digital sebagai sarana untuk membantu dzikir, meskipun sebagian lebih memilih menggunakan jari karena itu adalah praktik Nabi ﷺ." },
  { question: "Zikir apa yang paling baik?", answer: "Zikir terbaik adalah 'La ilaha illallah' (Tiada Tuhan selain Allah), seperti diriwayatkan oleh Jabir (semoga Allah meridoinya). Zikir lain yang sangat dianjurkan termasuk 'Subhan Allah', 'Alhamdulillah', 'Allahu Akbar', dan 'La hawla wa la quwwata illa billah'." },
  { question: "Bagaimana saya tahu sudah menyelesaikan satu set?", answer: "Ketika Anda mencapai hitungan target (33 atau 34), lingkaran penghitung berubah warna menjadi hijau sesaat dan pesan penyelesaian muncul. Anda kemudian bisa berpindah ke zikir berikutnya atau mereset penghitung." },
  { question: "Bisakah saya mengubah hitungan target?", answer: "Hitungan target ditetapkan sesuai dengan Sunnah: 33 untuk sebagian besar zikir dan 34 untuk Takbir (Allahu Akbar). Ini tidak bisa diubah secara individual, tetapi penghitung akan terus menghitung melebihi target jika Anda mau." },
  { question: "Apa itu zikir pagi dan petang?", answer: "Zikir pagi (Adhkar al-Sabah) dan zikir petang (Adhkar al-Masa) adalah doa-doa yang dianjurkan untuk dibaca setelah Subuh dan Ashar/Maghrib. Penghitung ini membantu Anda melacak bacaan zikir tersebut." },
  { question: "Apakah alat ini gratis?", answer: "Ya — sepenuhnya gratis, tidak perlu pendaftaran, tanpa iklan, tanpa pengumpulan data. Berfungsi di semua perangkat: ponsel, tablet, dan desktop." },
  { question: "Bisakah digunakan selama sholat?", answer: "Disarankan untuk meletakkan ponsel Anda selama sholat untuk menjaga konsentrasi (khusyuk). Gunakan Penghitung Tasbih sebelum atau sesudah sholat." },
  { question: "Zikir apa yang dibaca setelah sholat?", answer: "Setiap sholat wajib, sunnah membaca: 'Subhan Allah' 33 kali, 'Alhamdulillah' 33 kali, 'Allahu Akbar' 34 kali (total 100). Nabi ﷺ bersabda: 'Barangsiapa melakukan ini, dosanya akan diampuni sebanyak buih laut.' (Shahih Muslim)" },
];

const relatedTools = [
  { title: "Waktu Sholat", icon: "🕌", href: "/id/tools/prayer-times" },
  { title: "Arah Kiblat", icon: "🧭", href: "/id/tools/qibla-direction" },
  { title: "Kalkulator Zakat", icon: "💰", href: "/id/tools/zakat-calculator" },
  { title: "Konversi Hijriah", icon: "📅", href: "/id/tools/hijri-converter" },
  { title: "Kalkulator Waris", icon: "⚖️", href: "/id/tools/inheritance-calculator" },
  { title: "Stopwatch", icon: "⏱️", href: "/id/tools/stopwatch" },
];

const seoContent = [
  "Penghitung Tasbih Digital Gratis — hitung zikir Anda secara online dengan antarmuka yang indah dan mudah digunakan. Lacak Subhan Allah, Alhamdulillah, Allahu Akbar, dan lainnya dengan penyimpanan otomatis.",
  "Mendukung 8 zikir penting: Subhan Allah (33), Alhamdulillah (33), Allahu Akbar (34), La ilaha illallah (33), Astaghfirullah (33), La hawla wa la quwwata illa billah (33), Subhan Allahi wa bihamdihi (33), Subhan Allahil Azeem (33).",
  "Fitur: Penyimpanan otomatis ke localStorage browser, indikator progres melingkar dengan animasi, notifikasi penyelesaian, berfungsi offline setelah muat awal, desain yang sepenuhnya responsif.",
  "Hitungan target berdasarkan Sunnah Nabi Muhammad ﷺ: 33 hitungan per zikir, 34 untuk Takbir. Total 100 setelah setiap sholat wajib — sebagaimana diriwayatkan dalam Shahih Muslim.",
  "100% gratis, tidak perlu pendaftaran, berfungsi di semua perangkat, privasi pertama — tidak ada data yang dikumpulkan atau dikirim ke server mana pun.",
];

export default function Client() {
  const [selectedDhikr, setSelectedDhikr] = useState(0);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  const currentDhikr = dhikrList[selectedDhikr];

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasbeeh-count-id");
    const savedTotal = localStorage.getItem("tasbeeh-total-id");
    const savedDhikr = localStorage.getItem("tasbeeh-dhikr-id");
    if (saved) setCount(parseInt(saved, 10));
    if (savedTotal) setTotalCount(parseInt(savedTotal, 10));
    if (savedDhikr) setSelectedDhikr(parseInt(savedDhikr, 10));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasbeeh-count-id", count.toString());
    localStorage.setItem("tasbeeh-total-id", totalCount.toString());
    localStorage.setItem("tasbeeh-dhikr-id", selectedDhikr.toString());
  }, [count, totalCount, selectedDhikr]);

  // Show completion animation
  useEffect(() => {
    if (count >= currentDhikr.target && count > 0) {
      setShowComplete(true);
      const timer = setTimeout(() => setShowComplete(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [count, currentDhikr.target]);

  const increment = useCallback(() => {
    setCount(c => c + 1);
    setTotalCount(t => t + 1);
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  const resetAll = useCallback(() => {
    setCount(0);
    setTotalCount(0);
  }, []);

  const selectDhikr = useCallback((index: number) => {
    setSelectedDhikr(index);
    setCount(0);
  }, []);

  const progress = Math.min((count / currentDhikr.target) * 100, 100);
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const schemaName = "📿 Penghitung Tasbih";
  const schemaDesc = `Penghitung tasbih digital gratis — hitung zikir Anda dengan penyimpanan di browser`;
  const schemaCategory = "Islamic";
  const schemaUrl = "https://adwatak.cloud/id/tools/tasbeeh-counter";
  const breadcrumbItems = [
    { name: "Beranda", url: "https://adwatak.cloud/id" },
    { name: "Alat Islami", url: "https://adwatak.cloud/id/category/islamic" },
    { name: "📿 Penghitung Tasbih", url: "https://adwatak.cloud/id/tools/tasbeeh-counter" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={howToSchema("Cara menggunakan Penghitung Tasbih", "Alat gratis yang berjalan di browser. Tidak perlu pendaftaran.", [
        { name: "Pilih Zikir", text: "Pilih zikir dari daftar — Subhan Allah, Alhamdulillah, Allahu Akbar, dll." },
        { name: "Ketuk untuk Menghitung", text: "Ketuk tombol besar atau di mana saja pada lingkaran untuk menambah penghitung" },
        { name: "Selesaikan Set", text: "Lanjutkan sampai mencapai hitungan target (33 atau 34) — pesan penyelesaian akan muncul" },
        { name: "Lanjut ke Berikutnya", text: "Setelah menyelesaikan, lanjut ke zikir berikutnya atau reset penghitung" },
      ], "kurang dari satu menit", "en")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb category="Alat Islami" categorySlug="islamic" toolName="Penghitung Tasbih" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1 text-center">📿 Penghitung Tasbih</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">Penghitung zikir digital dengan penyimpanan otomatis — 33 hitungan per zikir</p>

        {/* Dhikr selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {dhikrList.map((d, i) => (
            <button
              key={i}
              onClick={() => selectDhikr(i)}
              className={`px-3 py-2 rounded-xl text-sm font-bold border-2 transition-all cursor-pointer ${
                selectedDhikr === i
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300"
              }`}
            >
              {d.transliteration}
            </button>
          ))}
        </div>

        {/* Current dhikr display */}
        <div className="text-center mb-4">
          <p className="text-3xl font-bold text-emerald-700 mb-1">{currentDhikr.text}</p>
          <p className="text-sm text-gray-500">{currentDhikr.transliteration}</p>
          <p className="text-xs text-gray-400">{currentDhikr.meaning}</p>
        </div>

        {/* Circular counter */}
        <div className="flex justify-center my-6">
          <div className="relative w-52 h-52 cursor-pointer" onClick={increment}>
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <circle
                cx="100" cy="100" r="90" fill="none"
                stroke={showComplete ? "#10b981" : "#059669"}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-200"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-black font-mono ${showComplete ? "text-emerald-500" : "text-gray-900"}`}>
                {count}
              </span>
              <span className="text-sm text-gray-500">/ {currentDhikr.target}</span>
            </div>
          </div>
        </div>

        {/* Completion message */}
        {showComplete && (
          <div className="text-center mb-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="text-emerald-700 font-bold">✅ Masya Allah! Anda menyelesaikan {currentDhikr.target} hitungan</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 justify-center mt-4">
          <button
            onClick={increment}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-4 rounded-2xl border-none cursor-pointer text-xl shadow-lg active:scale-95 transition-transform"
          >
            Tasbih ✨
          </button>
        </div>

        <div className="flex gap-3 justify-center mt-3">
          <button
            onClick={reset}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-2 rounded-xl border border-gray-200 cursor-pointer text-sm"
          >
            Reset Zikir Ini
          </button>
          <button
            onClick={resetAll}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-6 py-2 rounded-xl border border-red-200 cursor-pointer text-sm"
          >
            Reset Semua
          </button>
        </div>

        {/* Total counter */}
        <div className="text-center mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-500">Total Tasbih Hari Ini</p>
          <p className="text-3xl font-black text-emerald-700">{totalCount}</p>
        </div>
      </div>

      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
      <ShareButtons lang="id" />
    </div>
  );
}
