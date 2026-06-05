"use client";
import { useState } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema, howToSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

type Currency = "IDR" | "USD" | "SAR" | "EUR" | "GBP" | "TRY" | "PKR" | "EGP";

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  IDR: "Rp", USD: "$", SAR: "SR", EUR: "€", GBP: "£", TRY: "₺", PKR: "Rs", EGP: "E£",
};

const CURRENCY_LABELS: Record<Currency, string> = {
  IDR: "Rupiah Indonesia", USD: "Dolar AS", SAR: "Riyal Saudi", EUR: "Euro", GBP: "Pound Inggris", TRY: "Lira Turki", PKR: "Rupee Pakistan", EGP: "Pound Mesir",
};

interface CostItem {
  label: string;
  amount: number;
}

interface UmrahCosts {
  visa: CostItem[];
  flight: CostItem[];
  accommodation: CostItem[];
  transport: CostItem[];
  expenses: CostItem[];
}

const UMRAH_RITUALS = [
  { step: 1, title: "Ihram", description: "Masuk ke keadaan Ihram di Miqat — shalat dua rakaat dan ucapkan: Labbayk Allahumma Umrah (Aku hadir ya Allah, untuk Umrah)" },
  { step: 2, title: "Thawaf", description: "Mengelilingi Ka'bah sebanyak tujuh kali — mulai dari Hajar Aswad dan berakhir di sana" },
  { step: 3, title: "Shalat 2 Rakaat di belakang Maqam Ibrahim", description: "Setelah Thawaf, shalat dua rakaat di belakang Maqam Ibrahim jika memungkinkan, jika tidak di mana saja di Haram" },
  { step: 4, title: "Sa'i antara Shafa dan Marwah", description: "Berjalan tujuh kali antara bukit Shafa dan Marwah — mulai dari Shafa dan berakhir di Marwah" },
  { step: 5, title: "Cukur atau Potong Rambut (Halq/Taqsir)", description: "Cukur atau potong rambut Anda — ini menyelesaikan Umrah dan Anda keluar dari keadaan Ihram" },
];

export default function Client() {
  const [currency, setCurrency] = useState<Currency>("IDR");
  const [costs, setCosts] = useState<UmrahCosts>({
    visa: [{ label: "Visa Umrah", amount: 0 }],
    flight: [{ label: "Tiket Pesawat", amount: 0 }],
    accommodation: [{ label: "Hotel di Makkah", amount: 0 }, { label: "Hotel di Madinah", amount: 0 }],
    transport: [{ label: "Transportasi Lokal", amount: 0 }],
    expenses: [{ label: "Pengeluaran Harian", amount: 0 }],
  });
  const [travelers, setTravelers] = useState(1);
  const [nights, setNights] = useState(10);
  const [calculated, setCalculated] = useState(false);

  const updateCost = (category: keyof UmrahCosts, index: number, field: "label" | "amount", value: string | number) => {
    setCosts(prev => {
      const updated = { ...prev };
      updated[category] = updated[category].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      return updated;
    });
  };

  const addCostItem = (category: keyof UmrahCosts) => {
    setCosts(prev => ({
      ...prev,
      [category]: [...prev[category], { label: "Item Baru", amount: 0 }],
    }));
  };

  const removeCostItem = (category: keyof UmrahCosts, index: number) => {
    setCosts(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  };

  const categoryTotals = {
    visa: costs.visa.reduce((s, c) => s + c.amount, 0),
    flight: costs.flight.reduce((s, c) => s + c.amount, 0),
    accommodation: costs.accommodation.reduce((s, c) => s + c.amount, 0),
    transport: costs.transport.reduce((s, c) => s + c.amount, 0),
    expenses: costs.expenses.reduce((s, c) => s + c.amount, 0),
  };

  const grandTotal = Object.values(categoryTotals).reduce((s, v) => s + v, 0);
  const perPerson = travelers > 0 ? grandTotal / travelers : 0;

  const sym = CURRENCY_SYMBOLS[currency];

  const formatAmount = (amount: number) => {
    if (currency === "IDR" || currency === "PKR") return `${sym} ${amount.toLocaleString()}`;
    return `${sym} ${amount.toLocaleString()}`;
  };

  const handleCalculate = () => setCalculated(true);

  const categoryLabels: Record<keyof UmrahCosts, string> = {
    visa: "🛂 Visa",
    flight: "✈️ Tiket Pesawat",
    accommodation: "🏨 Akomodasi",
    transport: "🚗 Transportasi",
    expenses: "💰 Pengeluaran",
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Kalkulator Umrah", "Hitung total biaya Umrah — visa, tiket pesawat, akomodasi, transportasi, pengeluaran harian dengan panduan umrah langkah demi langkah", "https://adwatak.cloud/id/tools/umrah-calculator", "id", "Islami")} />
      <StructuredData data={faqSchema([
        { question: "Berapa biaya Umrah di 2026?", answer: "Biaya bervariasi tergantung negara, durasi, dan level hotel. Perkiraan: dari Indonesia Rp 15-35 juta, dari USA $2,500-$5,000, dari Turki $1,500-$3,000." },
        { question: "Apakah kalkulator mencakup biaya visa?", answer: "Ya, kalkulator Umrah mencakup visa, tiket pesawat, akomodasi, transportasi, dan pengeluaran harian — setiap item bisa disesuaikan." },
        { question: "Apa saja rukun Umrah?", answer: "Ihram → Thawaf mengelilingi Ka'bah → Shalat 2 rakaat di belakang Maqam Ibrahim → Sa'i antara Shafa dan Marwah → Cukur atau potong rambut." },
        { question: "Berapa hari yang dibutuhkan untuk Umrah?", answer: "Minimal 1 hari untuk rukun saja, tapi 7-14 hari direkomendasikan untuk juga mengunjungi Madinah." },
        { question: "Bisa menghitung biaya untuk beberapa orang?", answer: "Ya! Masukkan jumlah pejalan dan akan dihitung total biaya dan biaya per orang secara otomatis." },
        { question: "Apa perbedaan Umrah dan Haji?", answer: "Umrah bisa dilakukan kapan saja dan tidak wajib. Haji di bulan-bulan tertentu dan merupakan salah satu rukun Islam." },
        { question: "Apakah kalkulator ini gratis?", answer: "Ya, kalkulator Umrah sepenuhnya gratis dan berjalan di browser — tidak ada data yang dikirim ke server." },
        { question: "Kapan waktu terbaik untuk Umrah?", answer: "Ramadhan adalah waktu terbaik (Umrah di Ramadhan setara Haji dalam pahala). Hindari musim Haji jika ingin harga lebih murah." },
        { question: "Apakah perlu mahram untuk Umrah?", answer: "Menurut mayoritas ulama, wanita membutuhkan mahram (suami atau kerabat laki-laki). Beberapa negara mengizinkan wanita di atas 45 tahun tanpa mahram." },
        { question: "Dokumen apa yang diperlukan?", answer: "Paspor berlaku 6+ bulan, visa Umrah, tiket pesawat pulang-pergi, vaksinasi yang diwajibkan." },
        { question: "Bisa mengunjungi Madinah bersama Umrah?", answer: "Ya, disarankan mengunjungi Madinah dan Masjid Nabawi sebelum atau setelah Umrah." },
        { question: "Bagaimana mengetahui Miqat saya?", answer: "Ada lima lokasi Miqat: Dzul-Hulayfah (untuk Madinah), Al-Juhfah (untuk Mesir/Syam), Yalamlam (untuk Yemen), Qarn al-Manazil (untuk Najd), dan Dhat Irq (untuk Irak). Tanyakan agen travel Anda." },
      ])} />
      <StructuredData data={breadcrumbSchema([
        { name: "Beranda", url: "https://adwatak.cloud/id" },
        { name: "Alat Islami", url: "https://adwatak.cloud/id/category/islamic" },
        { name: "Kalkulator Umrah", url: "https://adwatak.cloud/id/tools/umrah-calculator" },
      ])} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <StructuredData data={howToSchema("Cara menggunakan alat ini", "Alat online gratis. Berjalan langsung di browser. Tidak perlu daftar.", [{name: "Pilih mata uang", text: "Pilih mata uang yang Anda gunakan"}, {name: "Masukkan biaya", text: "Isi setiap kategori biaya — visa, tiket, hotel, transportasi, pengeluaran"}, {name: "Tentukan pejalan", text: "Masukkan jumlah pejalan"}, {name: "Hitung", text: "Klik tombol hitung untuk melihat total dan biaya per orang"}], "kurang dari 2 menit", "id")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb lang="id" category="Alat Islami" categorySlug="islamic" toolName="Kalkulator Umrah" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🕋 Kalkulator Umrah</h1>
        <p className="text-sm text-gray-500 mb-6">Hitung total biaya Umrah — visa, tiket pesawat, akomodasi, transportasi, pengeluaran harian</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mata Uang:</label>
            <select value={currency} onChange={e => setCurrency(e.target.value as Currency)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
              {Object.entries(CURRENCY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label} ({CURRENCY_SYMBOLS[key as Currency]})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah Pejalan:</label>
            <input type="number" min={1} max={20} value={travelers} onChange={e => setTravelers(Math.max(1, parseInt(e.target.value) || 1))} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah Malam:</label>
            <input type="number" min={1} max={60} value={nights} onChange={e => setNights(Math.max(1, parseInt(e.target.value) || 1))} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          </div>
        </div>

        {(Object.keys(costs) as (keyof UmrahCosts)[]).map(cat => (
          <div key={cat} className="mb-6">
            <h3 className="text-base font-bold text-gray-800 mb-3">{categoryLabels[cat]}</h3>
            <div className="space-y-2">
              {costs[cat].map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input type="text" value={item.label} onChange={e => updateCost(cat, idx, "label", e.target.value)} className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                  <input type="number" min={0} value={item.amount || ""} onChange={e => updateCost(cat, idx, "amount", parseFloat(e.target.value) || 0)} placeholder="0" className="w-32 border border-gray-300 rounded-xl px-3 py-2 text-sm text-right focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                  {costs[cat].length > 1 && (
                    <button onClick={() => removeCostItem(cat, idx)} className="text-red-500 hover:text-red-700 text-lg px-2">✕</button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-2">
              <button onClick={() => addCostItem(cat)} className="text-xs text-green-600 hover:text-green-800 font-semibold">+ Tambah item</button>
              <span className="text-sm font-bold text-gray-600">Subtotal: {formatAmount(categoryTotals[cat])}</span>
            </div>
          </div>
        ))}

        <button onClick={handleCalculate} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-lg">
          🕋 Hitung Biaya Umrah
        </button>

        {calculated && grandTotal > 0 && (
          <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <h3 className="text-lg font-extrabold text-green-800 mb-4 text-center">📊 Ringkasan Biaya Umrah</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {(Object.keys(categoryTotals) as (keyof UmrahCosts)[]).map(cat => (
                <div key={cat} className="bg-white rounded-xl p-3 border border-green-100">
                  <p className="text-xs text-gray-500">{categoryLabels[cat]}</p>
                  <p className="text-base font-extrabold text-gray-800">{formatAmount(categoryTotals[cat])}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-green-200 pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Total untuk {travelers} pejalan:</span>
                <span className="text-xl font-extrabold text-green-800">{formatAmount(grandTotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Biaya per orang:</span>
                <span className="text-lg font-extrabold text-emerald-700">{formatAmount(perPerson)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Untuk {nights} malam:</span>
                <span className="text-sm font-bold text-gray-600">{formatAmount(perPerson / nights)} / malam</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h2 className="text-xl font-extrabold mb-6">📿 Rukun Umrah Langkah demi Langkah</h2>
        <div className="space-y-4">
          {UMRAH_RITUALS.map(ritual => (
            <div key={ritual.step} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                {ritual.step}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{ritual.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{ritual.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SEOContent content={[
        "Kalkulator Umrah — Hitung total biaya Umrah: visa, tiket pesawat, hotel di Makkah & Madinah, transportasi lokal, dan pengeluaran harian.",
        "Mendukung 8 mata uang: IDR, USD, SAR, EUR, GBP, TRY, PKR, EGP.",
        "Hitung biaya untuk beberapa pejalan dengan rincian per orang dan per malam.",
        "Panduan rukun Umrah langkah demi langkah: Ihram, Thawaf, Shalat, Sa'i, Cukur.",
        "100% gratis, berjalan di browser — tidak ada data yang dikirim ke server.",
      ]} lang="id" />
      <FAQSection faqs={[
        { question: "Berapa biaya Umrah di 2026?", answer: "Biaya bervariasi tergantung negara, durasi, dan level hotel. Perkiraan: dari Indonesia Rp 15-35 juta, dari USA $2,500-$5,000." },
        { question: "Apa saja rukun Umrah?", answer: "Ihram → Thawaf mengelilingi Ka'bah → Shalat 2 rakaat di belakang Maqam Ibrahim → Sa'i antara Shafa dan Marwah → Cukur atau potong rambut." },
        { question: "Berapa hari yang dibutuhkan untuk Umrah?", answer: "Minimal 1 hari untuk rukun saja, tapi 7-14 hari direkomendasikan untuk juga mengunjungi Madinah." },
        { question: "Bisa menghitung biaya untuk beberapa orang?", answer: "Ya! Masukkan jumlah pejalan dan akan dihitung total biaya dan biaya per orang secara otomatis." },
        { question: "Apakah kalkulator ini gratis?", answer: "Ya, kalkulator Umrah sepenuhnya gratis dan berjalan di browser." },
        { question: "Kapan waktu terbaik untuk Umrah?", answer: "Ramadhan adalah waktu terbaik. Hindari musim Haji jika ingin harga lebih murah." },
        { question: "Apakah perlu mahram untuk Umrah?", answer: "Menurut mayoritas ulama, wanita membutuhkan mahram." },
        { question: "Dokumen apa yang diperlukan?", answer: "Paspor berlaku 6+ bulan, visa Umrah, tiket pesawat pulang-pergi, vaksinasi yang diwajibkan." },
        { question: "Bisa mengunjungi Madinah bersama Umrah?", answer: "Ya, disarankan mengunjungi Madinah dan Masjid Nabawi." },
        { question: "Bagaimana mengetahui Miqat saya?", answer: "Ada lima lokasi Miqat. Tanyakan agen travel Anda." },
      ]} lang="id" />
      <RelatedTools tools={[
        { title: "Kalkulator Zakat", icon: "🕌", href: "/id/tools/zakat-calculator" },
        { title: "Arah Kiblat", icon: "🧭", href: "/id/tools/qibla-direction" },
        { title: "Waktu Sholat", icon: "🕐", href: "/id/tools/prayer-times" },
        { title: "Penghitung Tasbih", icon: "📿", href: "/id/tools/tasbeeh-counter" },
      ]} lang="id" />
      <ShareButtons lang="id" />
    </div>
  );
}
