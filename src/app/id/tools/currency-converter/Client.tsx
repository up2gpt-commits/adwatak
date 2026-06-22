"use client";
import { useState, useEffect } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema ,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const currencies = [
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "EGP", name: "Egyptian Pound", flag: "🇪🇬" },
  { code: "KWD", name: "Kuwaiti Dinar", flag: "🇰🇼" },
  { code: "QAR", name: "Qatari Riyal", flag: "🇶🇦" },
  { code: "OMR", name: "Omani Rial", flag: "🇴🇲" },
  { code: "BHD", name: "Bahraini Dinar", flag: "🇧🇭" },
  { code: "JOD", name: "Jordanian Dinar", flag: "🇯🇴" },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷" },
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
];

const faqs = [
  { question: "Mata uang apa saja yang didukung?", answer: "14+ mata uang: Saudi Riyal (SAR), UAE Dirham (AED), Egyptian Pound (EGP), Kuwaiti Dinar (KWD), Qatari Riyal (QAR), Omani Rial (OMR), Bahraini Dinar (BHD), US Dollar (USD), Euro (EUR), British Pound (GBP), Turkish Lira (TRY), Jordanian Dinar (JOD), Chinese Yuan (CNY), Indian Rupee (INR)." },
  { question: "Dari mana nilai tukar berasal?", answer: "Nilai tukar yang ditampilkan adalah mid-market rates dari API mata uang open-source yang diperbarui setiap hari. Bank dan kantor penukaran menambahkan margin 1-5%. Gunakan alat kami sebagai perkiraan, lalu periksa dengan bank Anda untuk nilai tukar yang tepat." },
  { question: "Apakah mata uang GCC dipatok ke USD?", answer: "Ya, sebagian besar mata uang GCC dipatok: SAR = 3.75, AED = 3.67, QAR = 3.64, BHD = 0.376, OMR = 0.384 per USD. KWD adalah mata uang paling bernilai di dunia dan tidak sepenuhnya dipatok. EGP dan TRY mengambang bebas." },
  { question: "Bagaimana cara mendapatkan nilai tukar terbaik?", answer: "Hindari kantor penukaran di bandara (nilai tukar terburuk). Gunakan Wise, Revolut, atau STC Pay. Transfer jumlah besar untuk nilai tukar yang lebih baik. Pantau nilai tukar selama beberapa hari sebelum menukar jumlah besar." },
  { question: "Bisakah saya mengonversi SAR ke USD?", answer: "1 SAR = 0.267 USD (patokan tetap). 1,000 SAR = 267 USD. Nilai tukar SAR-USD stabil karena patokan mata uang. Margin bank biasanya 0.5-1% untuk pasangan ini." },
  { question: "Apa itu spread beli/jual?", answer: "Harga beli = harga saat bank menjual mata uang kepada Anda. Harga jual = harga yang dibayar bank saat Anda menjual mata uang. Selisihnya adalah margin keuntungan bank (spread). Alat kami menampilkan mid-rate." },
  { question: "Apakah Anda mendukung kripto?", answer: "Tidak, kami hanya mendukung mata uang fiat tradisional. Untuk konversi kripto, gunakan platform khusus seperti Binance atau Coinbase." },
  { question: "Bagaimana cara menggunakan ini untuk perjalanan?", answer: "Masukkan jumlah mata uang asal Anda, pilih mata uang tujuan. Tambahkan 2-3% untuk margin bank agar mendapatkan anggaran yang realistis. Periksa nilai tukar seminggu sebelum bepergian." },
  { question: "Mengapa KWD adalah mata uang paling bernilai?", answer: "Kuwait memiliki ekonomi yang kuat, cadangan minyak yang besar, dan dana kekayaan negara. KWD dipatok ke sekeranjang mata uang (bukan hanya USD). 1 KWD ≈ 3.25 USD." },
  { question: "Waktu terbaik untuk menukar mata uang?", answer: "Hari kerja selama jam pasar London (Minggu-Kamis pukul 8 pagi-10 malam). Hindari akhir pekan (pasar tutup, spread lebih lebar). Hindari hari-hari berita ekonomi besar." },
];

const relatedTools = [
  { title: "Kalkulator PPN", icon: "🏛️", href: "/id/tools/vat-calculator" },
  { title: "Margin Keuntungan", icon: "📈", href: "/id/tools/profit-margin" },
  { title: "Kalkulator Emas", icon: "🥇", href: "/id/tools/gold-calculator" },
  { title: "Kalkulator Pinjaman", icon: "💰", href: "/id/tools/loan-calculator" },
  { title: "Konverter Satuan", icon: "📏", href: "/id/tools/unit-converter" },
  { title: "Kalkulator Gaji", icon: "💵", href: "/id/tools/salary-calculator" },
];

const seoContent = [
  "Konversi antara 14+ mata uang dunia secara instan — SAR, AED, EGP, KWD, USD, EUR, GBP, dan lainnya. Masukkan jumlah, pilih mata uang, dan dapatkan hasilnya dengan mid-market rates langsung.",
  "Mata uang GCC dipatok ke USD (kecuali KWD). SAR = 3.75, AED = 3.67, QAR = 3.64. EGP dan TRY mengambang bebas. Gunakan konverter untuk perencanaan perjalanan, belanja online, dan bisnis.",
  "Tips untuk pelancong: Nilai tukar di bandara adalah yang terburuk. Tukar hanya untuk hari pertama di sana, gunakan Wise atau STC Pay untuk sisanya. Periksa nilai tukar sebelum bepergian untuk menganggarkan dengan akurat.",
  "Untuk bisnis: Nilai tukar yang ditampilkan bersifat indikatif. Untuk transfer besar, hubungi bank Anda untuk penawaran yang kompetitif. Bank menawarkan nilai tukar yang lebih baik untuk jumlah di atas 10,000 USD.",
];

export default function Client() {
  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState("SAR");
  const [to, setTo] = useState("USD");
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRate = async (f: string, t: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/currency-proxy");
      const data = await res.json();
      const rates = data?.usd;
      const fromLower = f.toLowerCase();
      const toLower = t.toLowerCase();
      if (rates?.[fromLower] && rates?.[toLower]) {
        // Cross rate: rate = rates[to] / rates[from]
        const crossRate = rates[toLower] / rates[fromLower];
        setRate(crossRate);
        setLastUpdated(data.date || "");
      } else {
        setError("Unable to get exchange rate");
      }
    } catch {
      setError("Failed to connect to rates service");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRate(from, to);
  }, [from, to]);

  useEffect(() => {
    if (rate !== null && amount) {
      const a = parseFloat(amount);
      setResult(isNaN(a) ? null : a * rate);
    } else {
      setResult(null);
    }
  }, [rate, amount]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const schemaName = "Konverter Mata Uang";
  const schemaDesc = "Online Currency Converter — live mid-market rates";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/id/tools/currency-converter";
  const breadcrumbItems = [
    { name: "Home", url: "https://adwatak.cloud/id" },
    { name: "Konverter", url: "https://adwatak.cloud/id/category/converters" },
    { name: "Konverter Mata Uang", url: "https://adwatak.cloud/id/tools/currency-converter" },
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

      <Breadcrumb category="Konverter" categorySlug="converters" toolName="Konverter Mata Uang" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">💱 Konverter Mata Uang</h1>
        <p className="text-sm text-gray-500 mb-6">Live exchange rates — updated daily</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Jumlah</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="1,000" />
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-end">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Dari</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">
                {currencies.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}
              </select>
            </div>
            <button onClick={swap}
              className="bg-gray-200 hover:bg-gray-300 rounded-xl p-3 text-lg transition-all cursor-pointer border-none mb-0.5">
              🔄
            </button>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ke</label>
              <select value={to} onChange={(e) => setTo(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">
                {currencies.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}
              </select>
            </div>
          </div>

          {loading && <p className="text-sm text-gray-400 text-center">⏳ Loading rates...</p>}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {result !== null && !loading && !error && (
            <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
              <p className="text-xs text-green-600">{parseFloat(amount || "0").toLocaleString("en-US")} {from} =</p>
              <p className="text-3xl font-black text-green-900 my-2">{result.toLocaleString("en-US", { maximumFractionDigits: 2 })} {to}</p>
              <p className="text-xs text-gray-500">Rate: 1 {from} = {(rate || 0).toFixed(6)} {to}</p>
              {lastUpdated && <p className="text-xs text-gray-400 mt-1">📅 Last updated: {lastUpdated}</p>}
            </div>
          )}

          {!loading && !error && rate === null && (
            <p className="text-sm text-gray-400 text-center">This currency pair is not supported. Try another pair.</p>
          )}
        </div>
      </div>
      <SEOContent content={seoContent} lang="id" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="id" />
      <ShareButtons lang="id" />
    </div>
  );
}
