"use client";
import { useState } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema ,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

function fmt(n: number) { return n.toLocaleString("en-US", { maximumFractionDigits: 2 }); }

const faqs = [
  { question: "Apa itu Zakat?", answer: "Zakat adalah rukun Islam ketiga — sedekah wajib sebesar 2,5% dari harta yang dimiliki selama satu tahun lunar. Zakat berlaku untuk uang tunai, emas, perak, investasi, persediaan bisnis, dan pendapatan sewa di atas ambang Nisab." },
  { question: "Apa itu Nisab?", answer: "Ambang batas minimum harta sebelum Zakat wajib dikeluarkan. Nisab = nilai 85g emas atau 595g perak (gunakan nilai perak yang lebih rendah untuk mencakup lebih banyak orang). Pada tahun 2024: sekitar $5.000-6.000 (85g emas) atau $500-600 (595g perak). Kebanyakan ulama merekomendasikan Nisab perak." },
  { question: "Harta apa saja yang wajib Zakat?", answer: "Uang tunai (rekening bank, tabungan), emas dan perak (termasuk perhiasan menurut mayoritas ulama), saham dan investasi, persediaan bisnis (bukan aset tetap), pendapatan sewa, cryptocurrency (konsensus yang berkembang), pinjaman yang diharapkan akan dilunasi." },
  { question: "Harta apa yang dikecualikan dari Zakat?", answer: "Tempat tinggal utama, mobil pribadi, peralatan bisnis, perabot rumah tangga, utang kepada orang lain, gaji sebelum diterima, rekening pensiun (401k/IRA — bagian yang belum vested atau tidak dapat diakses). Diperdebatkan oleh sebagian ulama." },
  { question: "Kapan Zakat wajib dikeluarkan?", answer: "Setelah satu tahun lunar (355 hari) memiliki harta di atas Nisab. Pilih tanggal tetap (misalnya, 1 Ramadan) untuk mempermudah perhitungan. Bayar kapan saja sepanjang tahun. Banyak yang membayar di bulan Ramadan untuk pahala berlipat ganda." },
  { question: "Siapa yang berhak menerima Zakat?", answer: "Delapan golongan dari Quran 9:60: orang fakir, orang miskin, amil Zakat, muallaf yang dibujuk hatinya, budak/tawanan, orang yang berutang, untuk jalan Allah (fi sabilillah), dan musafir yang terlantar." },
  { question: "Bisakah Zakat dibayar di muka?", answer: "Ya, Anda dapat membayar Zakat sebelum tahun berakhir jika yakin harta akan tetap di atas Nisab. Sebagian ulama membolehkan pembayaran beberapa bulan sebelumnya. Hitung di akhir tahun dan segera bayar — jangan ditunda." },
  { question: "Zakat atas perhiasan emas?", answer: "Mayoritas ulama: perhiasan emas wajib Zakat sebesar 2,5%. Sebagian (Hanafi): perhiasan untuk penggunaan yang diperbolehkan dikecualikan. Untuk kehati-hatian, hitung Zakat atas nilai perhiasan. Tanyakan kepada ulama Anda untuk fatwa mereka." },
  { question: "Zakat atas saham?", answer: "Dua metode: (1) 2,5% dari total nilai saham (lebih mudah, konservatif). (2) Zakat hanya pada porsi yang mewakili aset perusahaan (kas + persediaan + piutang). Untuk reksa dana indeks: metode 1 lebih sederhana. Untuk saham individu: metode 2 lebih akurat." },
  { question: "Zakat atas pendapatan sewa?", answer: "Zakat adalah 2,5% dari pendapatan sewa bersih yang diterima selama setahun (setelah biaya, pembayaran hipotek). Bukan nilai properti itu sendiri. Jika sewa = $24.000/tahun, biaya = $8.000, bersih = $16.000, Zakat = $400." },
  { question: "Bisakah Zakat diberikan kepada keluarga?", answer: "Ya, kepada kerabat yang memenuhi syarat yang tidak wajib Anda nafkahi: saudara kandung, sepupu, bibi, paman, mertua. Tidak kepada orang tua, anak, atau pasangan (Anda wajib menafkahi mereka). Niat itu penting — berikan sebagai Zakat, bukan hadiah." },
  { question: "Bisakah Zakat diberikan kepada non-Muslim?", answer: "Menurut Abu Hanifa dan banyak ulama kontemporer: Zakat dapat diberikan kepada non-Muslim yang miskin, terutama yang membutuhkan. Ini membangun hubungan komunitas. Mayoritas ulama setuju dapat diberikan kepada 'muallaf yang dibujuk hatinya'." }
];

const relatedTools = [
  { title: "Kalkulator Emas", icon: "🥇", href: "/id/tools/gold-calculator" },
  { title: "Kalkulator Waris", icon: "📜", href: "/id/tools/inheritance-calculator" },
  { title: "Konverter Hijriah", icon: "🌙", href: "/id/tools/hijri-converter" },
  { title: "Waktu Sholat", icon: "🕌", href: "/id/tools/prayer-times" },
  { title: "Bunga Majemuk", icon: "📈", href: "/id/tools/compound-interest" },
  { title: "Margin Keuntungan", icon: "📐", href: "/id/tools/profit-margin" },
];

const seoContent = [
  "Kalkulator Zakat kami membantu umat Muslim menghitung kewajiban Zakat tahunan mereka dengan akurat. Masukkan tabungan tunai, nilai emas/perak, investasi, dan persediaan bisnis Anda. Kalkulator secara otomatis memeriksa ambang Nisab dan menghitung 2.5% dari kekayaan yang wajib dizakati.",
  "Contoh: $15,000 di tabungan, $5,000 di emas, $10,000 di saham, $3,000 persediaan bisnis. Total kekayaan yang dizakati = $33,000. Di atas Nisab ($500-6,000 tergantung perhitungan). Zakat = $33,000 × 2.5% = $825. Dibayarkan setiap tahun.",
  "Langkah perhitungan: (1) Tentukan tanggal Zakat Anda (hari yang sama setiap tahun lunar). (2) Daftar semua aset yang dizakati: uang tunai, emas, perak, saham, persediaan bisnis, pendapatan sewa, cryptocurrency. (3) Kurangi utang dan pengeluaran langsung. (4) Periksa apakah sisanya melebihi Nisab. (5) Bayar 2.5%.",
  "Nisab Emas: 85g × harga emas per gram saat ini. Nisab Perak: 595g × harga perak saat ini. Menggunakan Nisab perak ($500-600) mencakup lebih banyak kekayaan dan direkomendasikan oleh banyak ulama. Periksa harga emas/perak saat ini di Kalkulator Emas kami.",
  "Terkait: Gunakan Kalkulator Emas kami untuk mendapatkan nilai emas yang akurat untuk Zakat. Kalkulator Waris membantu perencanaan harta Islami. Konverter Hijriah melacak tahun lunar untuk tanggal peringatan Zakat Anda.",
  "Tips: Pertahankan spreadsheet Zakat sepanjang tahun. Catat perubahan besar dalam kekayaan setiap kuartal. Saat bulan Zakat tiba, perhitungan hanya memakan waktu 10 menit. Berdonasi di bulan Ramadan melipatgandakan pahala. Gunakan kalkulator kami untuk memastikan akurasi — Zakat yang salah tidak diterima."
];

export default function Client() {
  const [cash, setCash] = useState("15000");
  const [gold, setGold] = useState("5000");
  const [stocks, setStocks] = useState("10000");
  const [business, setBusiness] = useState("3000");
  const [result, setResult] = useState<{ total: number; nisabCheck: string; zakat: number } | null>(null);

  const calculate = () => {
    const total = [cash, gold, stocks, business].reduce((s, v) => s + (parseFloat(v) || 0), 0);
    const nisab = 500; // using silver nisab
    setResult({ total, nisabCheck: total >= nisab ? "Above Nisab" : "Below Nisab", zakat: total >= nisab ? total * 0.025 : 0 });
  };

  const schemaName = "Kalkulator Zakat";
const schemaDesc = `Online Zakat Calculator - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/id/tools/zakat-calculator";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/id" },
  { name: "Alat Islami", url: "https://adwatak.cloud/id/category/calculators" },
  { name: "Kalkulator Zakat", url: "https://adwatak.cloud/id/tools/zakat-calculator" },
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

      <Breadcrumb category="Alat Islami" categorySlug="calculators" toolName="Kalkulator Zakat" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">☪️ Kalkulator Zakat</h1>
        <p className="text-sm text-gray-500 mb-6">Hitung kewajiban Zakat tahunan Anda dengan akurat</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Uang Tunai & Tabungan ($)</label><input type="number" value={cash} onChange={(e) => setCash(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="15000" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Emas & Perak ($)</label><input type="number" value={gold} onChange={(e) => setGold(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="5000" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Saham & Investasi ($)</label><input type="number" value={stocks} onChange={(e) => setStocks(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="10000" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Persediaan Bisnis ($)</label><input type="number" value={business} onChange={(e) => setBusiness(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="3000" /></div>
        </div>
        <button onClick={calculate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Hitung Zakat</button>
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200"><p className="text-xs text-blue-600 mb-1">Total Wealth</p><p className="text-xl font-extrabold text-blue-900">${fmt(result.total)}</p></div>
          <div className="bg-yellow-50 rounded-xl p-5 text-center border border-yellow-300"><p className="text-xs text-yellow-700 mb-1">Status</p><p className="text-xl font-extrabold text-yellow-900">{result.nisabCheck}</p></div>
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200"><p className="text-xs text-green-600 mb-1">Zakat Due (2.5%)</p><p className="text-xl font-extrabold text-green-900">${fmt(result.zakat)}</p></div>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    <ShareButtons lang="id" />
    </div>
  );
}
