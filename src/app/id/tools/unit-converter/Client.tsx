"use client";
import { useState } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema ,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "Apa itu pengonversi satuan?", answer: "Mengonversi nilai antara berbagai satuan ukuran dalam kategori yang sama: panjang (meter/kaki), berat (kg/lbs), suhu (C/F/K), volume (liter/galon), luas (m persegi/ekar), dan lainnya. Penting untuk sains, perjalanan, memasak, dan bisnis internasional." },
  { question: "Mengapa menggunakan pengonversi satuan?", answer: "Perbedaan internasional: AS menggunakan imperial (mil, pon, Fahrenheit). Sebagian besar dunia menggunakan metrik (km, kg, Celsius). Resep, perencanaan perjalanan, belanja online, spesifikasi mobil (mph vs km/jam), dan perhitungan ilmiah semuanya memerlukan konversi yang akurat." },
  { question: "Bagaimana cara mengonversi Celsius ke Fahrenheit?", answer: "Rumus: F = (C × 9/5) + 32. 0°C = 32°F. 100°C = 212°F. 25°C = 77°F. Untuk perhitungan cepat: gandakan Celsius, tambahkan 30 (perkiraan). 25 × 2 = 50 + 30 = 80°F (tepat: 77°F)." },
  { question: "Bagaimana cara mengonversi kg ke lbs?", answer: "1 kg = 2.20462 lbs. 80 kg = 176.4 lbs. Cepat: kalikan dengan 2.2. 80 × 2.2 = 176 lbs. Untuk lbs ke kg: bagi dengan 2.2. 176 ÷ 2.2 = 80 kg. Pengonversi kami memberikan hasil desimal yang tepat." },
  { question: "Mil ke kilometer?", answer: "1 mil = 1.60934 km. 60 mph = 96.5 km/jam. Cepat: kalikan dengan 1.6. 60 × 1.6 = 96 km/jam. Untuk km ke mil: bagi dengan 1.6. 100 km/jam ÷ 1.6 = 62.5 mph." },
  { question: "Inci ke sentimeter?", answer: "1 inci = 2.54 cm. 5'9\" (69 inci) = 69 × 2.54 = 175.26 cm. Cepat: kalikan inci dengan 2.5. 69 × 2.5 = 172.5 cm (cukup dekat untuk kebanyakan keperluan)." },
  { question: "Bagaimana cara mengonversi antar satuan luas?", answer: "1 meter persegi = 10.764 kaki persegi. 1 ekar = 4,047 meter persegi. 1 hektar = 10,000 meter persegi = 2.471 ekar. 1 km persegi = 0.386 mil persegi. Gunakan kuadrat dari faktor konversi panjang." },
  { question: "Konversi volume?", answer: "1 liter = 0.264 galon (AS). 1 galon (AS) = 3.785 liter. 1 cangkir = 237 ml. 1 fl oz = 29.57 ml. 1 meter kubik = 264 galon. Pengonversi kami menangani semua satuan volume umum." },
  { question: "Apa itu satuan astronomi (AU)?", answer: "Jarak dari Bumi ke Matahari: ~149.6 juta km (93 juta mil). 1 tahun cahaya = 63,241 AU. 1 parsec = 206,265 AU. Digunakan untuk mengukur jarak di tata surya. Pengonversi kami tidak menyertakan AU tetapi mendukung kategori metrik/imperial utama." },
  { question: "Konversi penyimpanan digital?", answer: "1 KB = 1024 B. 1 MB = 1024 KB. 1 GB = 1024 MB. 1 TB = 1024 GB. 1 PB = 1024 TB. Catatan: produsen hard drive menggunakan desimal (1 GB = 1,000,000,000 B), bukan biner. Drive 1 TB = 931 GB ruang yang dapat digunakan sebenarnya." },
  { question: "Konversi kecepatan?", answer: "1 mph = 1.609 km/jam = 0.447 m/s. 1 knot = 1.852 km/jam = 1.151 mph. Mach 1 = 1,235 km/jam di permukaan laut (bervariasi dengan ketinggian). Pengonversi kami menangani mph, km/jam, dan m/s." },
  { question: "Apa saja satuan dasar SI?", answer: "Meter (panjang), Kilogram (massa), Detik (waktu), Ampere (arus), Kelvin (suhu), Mol (jumlah zat), Candela (intensitas cahaya). Semua satuan SI lainnya diturunkan dari 7 satuan ini. Pengonversi kami mencakup satuan turunan yang paling umum." }
];

const relatedTools = [
  { title: "Kalkulator BMI", icon: "⚖️", href: "/en/tools/bmi-calculator" },
  { title: "Kalkulator Kalori", icon: "🔥", href: "/en/tools/calorie-calculator" },
  { title: "Kalkulator Emas", icon: "🥇", href: "/en/tools/gold-calculator" },
  { title: "Kalkulator Usia", icon: "🎂", href: "/en/tools/age-calculator" },
  { title: "Angka ke Kata", icon: "🔢", href: "/en/tools/number-to-words" },
  { title: "Bunga Majemuk", icon: "📈", href: "/en/tools/compound-interest" },
];

const seoContent = [
  "Our free Unit Converter handles length, weight, temperature, volume, area, and speed conversions instantly. Switch between metric and imperial systems with a single click. Perfect for travel, cooking, science, international business, and everyday calculations.",
  "Categories: Length (meters, feet, inches, miles, km). Weight (kg, lbs, oz, stones). Temperature (°C, °F, K). Volume (L, gal, cups, fl oz). Area (sq m, sq ft, acres, hectares). Speed (km/h, mph, m/s). More categories coming soon.",
  "Contoh konversi: 100 kg = 220.5 lbs. 1 mile = 1.609 km. 30°C = 86°F. 1 gallon = 3.785 liters. 1 acre = 4,047 sq m. 60 km/h = 37.3 mph. Semua konversi menggunakan faktor konversi yang tepat, bukan perkiraan.",
  "Mengapa ini penting: Amerika Serikat, Myanmar, dan Liberia adalah satu-satunya negara yang menggunakan sistem imperial. Negara lainnya menggunakan metrik. Jika Anda bepergian, berbelanja online internasional, atau bekerja dengan mitra global, konverter satuan sangat penting.",
  "Terkait: Gunakan Kalkulator BMI kami yang menggunakan satuan metrik. Kalkulator Kalori membutuhkan berat dalam kg. Kalkulator Emas menggunakan gram dan ons. Kalkulator Usia bekerja dengan tanggal Gregorian. Semua alat bekerja bersama dengan mulus.",
  "Konverter kami sepenuhnya berbasis browser — tanpa panggilan server, tanpa pelacakan. Ketik nilai apa pun, pilih satuan, dapatkan hasil akurat secara instan. Gratis untuk penggunaan tanpa batas."
];

export default function Client() {
  const [category, setCategory] = useState("length");
  const [from, setFrom] = useState("meter");
  const [to, setTo] = useState("foot");
  const [value, setValue] = useState("100");
  const [result, setResult] = useState("");

  const conversions: Record<string, Record<string, number>> = {
    length: { meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001, foot: 0.3048, inch: 0.0254, yard: 0.9144, mile: 1609.344 },
    weight: { kilogram: 1, gram: 0.001, milligram: 1e-6, pound: 0.453592, ounce: 0.0283495, stone: 6.35029, ton: 1000 },
    temperature: {}, // special handling
    volume: { liter: 1, milliliter: 0.001, gallon: 3.78541, quart: 0.946353, pint: 0.473176, cup: 0.236588, "fl oz": 0.0295735, "cubic meter": 1000 },
    area: { "sq meter": 1, "sq km": 1e6, "sq foot": 0.092903, "sq inch": 0.00064516, "sq mile": 2589988, acre: 4046.86, hectare: 10000 },
    speed: { "km/h": 0.277778, "m/s": 1, "mph": 0.44704, knot: 0.514444 }
  };

  const convert = () => {
    const v = parseFloat(value);
    if (isNaN(v)) return;
    if (category === "temperature") {
      const f = (c: string) => c === "celsius" ? v : c === "fahrenheit" ? (v - 32) * 5/9 : v - 273.15;
      const toC = f(from);
      const t = to === "celsius" ? toC : to === "fahrenheit" ? toC * 9/5 + 32 : toC + 273.15;
      setResult(t.toFixed(4));
    } else {
      const cat = conversions[category];
      if (!cat || !(from in cat) || !(to in cat)) return;
      const base = v * cat[from];
      setResult((base / cat[to]).toFixed(6));
    }
  };

  const schemaName = "Konverter Satuan";
const schemaDesc = `Online Unit Converter - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/id/tools/unit-converter";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/id" },
  { name: "Konverter", url: "https://adwatak.cloud/id/category/calculators" },
  { name: "Konverter Satuan", url: "https://adwatak.cloud/id/tools/unit-converter" },
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

      <Breadcrumb category="Alat Lainnya" categorySlug="utility-tools" toolName="Konverter Satuan" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📏 Konverter Satuan</h1>
        <p className="text-sm text-gray-500 mb-6">Konversi antara satuan metrik dan imperial — panjang, berat, suhu, volume, luas, kecepatan</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {["length", "weight", "temperature", "volume", "area", "speed"].map((c) => (
            <button key={c} onClick={() =>{ setCategory(c); setResult(""); }} className={`px-3 py-1.5 rounded-full text-sm font-semibold cursor-pointer border-none capitalize ${category === c ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div><label className="block text-xs font-semibold text-gray-700 mb-1">Nilai</label><input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="100" /></div>
          <div><label className="block text-xs font-semibold text-gray-700 mb-1">Dari</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-lg outline-none bg-white">
              {Object.keys(category === "temperature" ? { celsius: 0, fahrenheit: 0, kelvin: 0 } : conversions[category] || {}).map((u) => (<option key={u} value={u}>{u}</option>))}
            </select>
          </div>
          <div><label className="block text-xs font-semibold text-gray-700 mb-1">Ke</label>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-lg outline-none bg-white">
              {Object.keys(category === "temperature" ? { celsius: 0, fahrenheit: 0, kelvin: 0 } : conversions[category] || {}).map((u) => (<option key={u} value={u}>{u}</option>))}
            </select>
          </div>
        </div>
        <button onClick={convert} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Konversi</button>
      </div>
      {result && (
        <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200 mb-6">
          <p className="text-xs text-green-600 mb-1">Result</p>
          <p className="text-lg font-bold text-green-900">{value} {from} = {result} {to}</p>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    <ShareButtons lang="id" />
    </div>
  );
}
