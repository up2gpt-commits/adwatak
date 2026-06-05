"use client";
import { useState } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema, howToSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

type KaffarahType = "oath" | "ramadan" | "zhihar" | "fasting";

interface KaffarahInfo {
  title: string;
  description: string;
  options: { label: string; detail: string }[];
  defaultCount: number;
}

const KAFFARAH_DATA: Record<KaffarahType, KaffarahInfo> = {
  oath: {
    title: "🤲 Kaffarah Sumpah (Pelanggaran Sumpah)",
    description: "Barangsiapa bersumpah kemudian melanggarnya, wajib membayar kaffarat. Allah berfirman: 'Kaffaranya adalah memberi makan sepuluh orang miskin dari makanan pertengahan yang kamu berikan kepada keluargamu, atau pakaian mereka, atau memerdekakan budak. Barangsiapa tidak mampu, maka puasa tiga hari.' (QS 5:89)",
    options: [
      { label: "Memberi makan 10 orang miskin", detail: "Memberi makan sepuluh orang miskin dari makanan pertengahan — sekitar 1.5kg beras/orang = 15kg total" },
      { label: "Memberi pakaian 10 orang miskin", detail: "Memberi pakaian untuk sepuluh orang miskin" },
      { label: "Memerdekakan budak", detail: "Memerdekakan budak yang beriman — tidak berlaku di zaman modern" },
      { label: "Puasa 3 hari", detail: "Puasa tiga hari berturut-turut atau terpisah — bagi yang tidak mampu memberi makan atau pakaian" },
    ],
    defaultCount: 1,
  },
  ramadan: {
    title: "🌙 Kaffarah Hubungan Suami-Istri di Ramadhan",
    description: "Barangsiapa sengaja melakukan hubungan suami-istri di siang hari Ramadhan, wajib mengqadha DAN membayar kaffarat. Kaffarat secara berurutan: memerdekakan budak, jika tidak mampu puasa 60 hari berturut-turut, jika tidak mampu memberi makan 60 orang miskin.",
    options: [
      { label: "Memerdekakan budak", detail: "Memerdekakan budak yang beriman — tidak berlaku saat ini" },
      { label: "Puasa 60 hari berturut-turut", detail: "Puasa 60 hari berturut-turut — tidak boleh batal kecuali ada alasan syar'i" },
      { label: "Memberi makan 60 orang miskin", detail: "Memberi makan enam puluh orang miskin — sekitar 1.5kg beras/orang = 90kg total" },
    ],
    defaultCount: 1,
  },
  zhihar: {
    title: "💔 Kaffarah Zhihar",
    description: "Zhihar adalah ketika suami berkata kepada istrinya: 'Kamu bagiku seperti punggung ibuku.' Sebelum bersentuhan, ia harus membayar kaffarat. Allah berfirman: 'Orang-orang yang zhihar dari istrinya kemudian ingin kembali, maka merdekakan seorang budak sebelum mereka bersentuhan.' (QS 58:3)",
    options: [
      { label: "Memerdekakan budak", detail: "Memerdekakan budak yang beriman — tidak berlaku saat ini" },
      { label: "Puasa 60 hari berturut-turut", detail: "Puasa 60 hari berturut-turut — bagi yang tidak mampu memerdekakan budak" },
      { label: "Memberi makan 60 orang miskin", detail: "Memberi makan enam puluh orang miskin dari makanan pertengahan — sekitar 90kg beras" },
    ],
    defaultCount: 1,
  },
  fasting: {
    title: "🍽️ Fidyah Puasa",
    description: "Barangsiapa tidak mampu berpuasa secara permanen (lansia, penyakit kronis) wajib membayar fidyah untuk setiap hari: memberi makan satu orang miskin. Allah berfirman: 'Dan bagi orang yang berat (berpuasa), fidyah memberi makan seorang miskin.' (QS 2:184)",
    options: [
      { label: "Memberi makan 1 orang miskin per hari", detail: "Memberi makan satu orang miskin untuk setiap hari yang ditinggalkan — sekitar 1.5kg beras/hari" },
      { label: "Memberi makan 2 orang miskin per hari", detail: "Memberi makan dua orang miskin per hari — sekitar 3kg beras/hari (beberapa ulama membolehkan ini)" },
    ],
    defaultCount: 30,
  },
};

const FOOD_PRICES: Record<string, { unit: string; pricePerUnit: number; label: string }> = {
  rice: { unit: "kg", pricePerUnit: 15000, label: "Beras" },
  bread: { unit: "potong", pricePerUnit: 3000, label: "Roti" },
  dates: { unit: "kg", pricePerUnit: 50000, label: "Kurma" },
  meat: { unit: "kg", pricePerUnit: 80000, label: "Daging" },
};

export default function Client() {
  const [selectedType, setSelectedType] = useState<KaffarahType>("oath");
  const [count, setCount] = useState(1);
  const [foodType, setFoodType] = useState("rice");
  const [foodPerPerson, setFoodPerPerson] = useState(1.5);
  const [calculated, setCalculated] = useState(false);

  const info = KAFFARAH_DATA[selectedType];
  const food = FOOD_PRICES[foodType];

  const totalFood = count * foodPerPerson;
  const totalCost = totalFood * food.pricePerUnit;

  const handleCalculate = () => setCalculated(true);

  const typeLabels: Record<KaffarahType, string> = {
    oath: "🤲 Kaffarah Sumpah",
    ramadan: "🌙 Kaffarah Ramadhan",
    zhihar: "💔 Kaffarah Zhihar",
    fasting: "🍽️ Fidyah Puasa",
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Kalkulator Fidyah & Kaffarah", "Hitung Fidyah & Kaffarah — pelanggaran sumpah, hubungan Ramadhan, Zhihar, fidyah puasa dengan penjelasan syariah", "https://adwatak.cloud/id/tools/fidyah-kaffarah", "id", "Islami")} />
      <StructuredData data={faqSchema([
        { question: "Apa itu Kaffarah sumpah?", answer: "Kaffarah sumpah adalah: memberi makan 10 orang miskin, atau memberi pakaian, atau memerdekakan budak. Yang tidak mampu berpuasa tiga hari. (QS 5:89)" },
        { question: "Apa Kaffarah hubungan suami-istri di Ramadhan?", answer: "Qadha + Kaffarah: memerdekakan budak, atau puasa 60 hari berturut-turut, atau memberi makan 60 orang miskin." },
        { question: "Apa Kaffarah Zhihar?", answer: "Memerdekakan budak, atau puasa 60 hari berturut-turut, atau memberi makan 60 orang miskin." },
        { question: "Apa itu Fidyah puasa?", answer: "Bagi yang tidak mampu berpuasa secara permanen: memberi makan satu orang miskin per hari. Sekitar 1.5kg beras per orang." },
        { question: "Bisa memberi makan alih-alih puasa untuk Kaffarah?", answer: "Ya, jika benar-benar tidak mampu berpuasa karena alasan kesehatan." },
        { question: "Berapa banyak makanan per orang?", answer: "Sekitar 1.5kg beras atau makanan pertengahan yang setara." },
        { question: "Apakah puasa harus berturut-turut?", answer: "Ya, puasa Kaffarah harus berturut-turut menurut mayoritas ulama." },
        { question: "Apakah wanita membayar Kaffarah sumpah?", answer: "Ya, Kaffarah sumpah berlaku untuk pria dan wanita." },
        { question: "Bisa membayar uang alih-alih makanan?", answer: "Mayoritas ulama mengatakan uang tidak bisa menggantikan makanan dalam Kaffarah." },
        { question: "Apa perbedaan Fidyah dan Kaffarah?", answer: "Kaffarah untuk perbuatan terlarang, Fidyah untuk ketidakmampuan melakukan kewajiban." },
        { question: "Apakah kalkulator ini gratis?", answer: "Ya, kalkulator Fidyah & Kaffarah sepenuhnya gratis." },
        { question: "Apakah Kaffarah diwajibkan untuk sumpah yang dilanggar tidak sengaja?", answer: "Kaffarah hanya untuk pelanggaran sumpah yang disengaja. Jika dipaksa atau lupa, tidak ada Kaffarah menurut mayoritas ulama." },
      ])} />
      <StructuredData data={breadcrumbSchema([
        { name: "Beranda", url: "https://adwatak.cloud/id" },
        { name: "Alat Islami", url: "https://adwatak.cloud/id/category/islamic" },
        { name: "Kalkulator Fidyah & Kaffarah", url: "https://adwatak.cloud/id/tools/fidyah-kaffarah" },
      ])} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <StructuredData data={howToSchema("Cara menggunakan alat ini", "Alat online gratis. Berjalan langsung di browser. Tidak perlu daftar.", [{name: "Pilih jenis", text: "Pilih jenis Kaffarah atau Fidyah"}, {name: "Masukkan jumlah", text: "Masukkan jumlah kali atau hari"}, {name: "Pilih jenis makanan", text: "Pilih jenis makanan dan jumlah per orang"}, {name: "Hitung", text: "Klik tombol hitung untuk melihat jumlah dan estimasi biaya"}], "kurang dari 2 menit", "id")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb lang="id" category="Alat Islami" categorySlug="islamic" toolName="Kalkulator Fidyah & Kaffarah" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">⚖️ Kalkulator Fidyah & Kaffarah</h1>
        <p className="text-sm text-gray-500 mb-6">Hitung jumlah Fidyah & Kaffarah dengan penjelasan syariah terperinci</p>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Pilih jenis Kaffarah atau Fidyah:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(Object.keys(typeLabels) as KaffarahType[]).map(type => (
              <button
                key={type}
                onClick={() => { setSelectedType(type); setCount(KAFFARAH_DATA[type].defaultCount); setCalculated(false); }}
                className={`p-4 rounded-xl border-2 text-left font-semibold text-sm transition-colors ${selectedType === type ? "border-green-500 bg-green-50 text-green-800" : "border-gray-200 bg-white text-gray-700 hover:border-green-300"}`}
              >
                {typeLabels[type]}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
          <h3 className="font-bold text-amber-800 mb-2">{info.title}</h3>
          <p className="text-sm text-amber-700 leading-relaxed mb-4">{info.description}</p>
          <div className="space-y-2">
            {info.options.map((opt, i) => (
              <div key={i} className="bg-white rounded-lg p-3 border border-amber-100">
                <p className="font-semibold text-gray-800 text-sm">{opt.label}</p>
                <p className="text-xs text-gray-600 mt-1">{opt.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {selectedType === "fasting" ? "Jumlah hari:" : "Jumlah kali:"}
            </label>
            <input type="number" min={1} max={365} value={count} onChange={e => { setCount(Math.max(1, parseInt(e.target.value) || 1)); setCalculated(false); }} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis makanan:</label>
            <select value={foodType} onChange={e => { setFoodType(e.target.value); setCalculated(false); }} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
              {Object.entries(FOOD_PRICES).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah per orang (kg):</label>
            <input type="number" min={0.5} max={10} step={0.5} value={foodPerPerson} onChange={e => { setFoodPerPerson(parseFloat(e.target.value) || 1.5); setCalculated(false); }} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          </div>
        </div>

        <button onClick={handleCalculate} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-lg">
          ⚖️ Hitung Fidyah / Kaffarah
        </button>

        {calculated && (
          <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <h3 className="text-lg font-extrabold text-green-800 mb-4 text-center">📊 Hasil Perhitungan</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white rounded-xl p-3 border border-green-100">
                <p className="text-xs text-gray-500">Orang miskin / Hari</p>
                <p className="text-xl font-extrabold text-gray-800">{count}</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-green-100">
                <p className="text-xs text-gray-500">Jenis makanan</p>
                <p className="text-base font-extrabold text-gray-800">{food.label}</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-green-100">
                <p className="text-xs text-gray-500">Jumlah per orang</p>
                <p className="text-base font-extrabold text-gray-800">{foodPerPerson} {food.unit}</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-green-100">
                <p className="text-xs text-gray-500">Total makanan</p>
                <p className="text-base font-extrabold text-gray-800">{totalFood.toLocaleString()} {food.unit}</p>
              </div>
            </div>
            <div className="border-t border-green-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Estimasi biaya:</span>
                <span className="text-xl font-extrabold text-green-800">Rp {totalCost.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-500">* Harga adalah perkiraan dan bervariasi menurut wilayah dan waktu</p>
            </div>
          </div>
        )}
      </div>

      <SEOContent content={[
        "Kalkulator Fidyah & Kaffarah — Hitung Kaffarah sumpah, hubungan Ramadhan, Zhihar, dan Fidyah puasa.",
        "Termasuk penjelasan syariah terperinci dengan dalil Quran dan Sunnah untuk setiap jenis.",
        "Hitung jumlah makanan yang diperlukan (beras, roti, kurma, daging) dan estimasi biaya.",
        "Mendukung 4 jenis: Sumpah (10 orang), Ramadhan (60 orang), Zhihar (60 orang), Fidyah (1 orang/hari).",
        "100% gratis, berjalan di browser — tidak ada data yang dikirim ke server.",
      ]} lang="id" />
      <FAQSection faqs={[
        { question: "Apa itu Kaffarah sumpah?", answer: "Memberi makan 10 orang miskin, atau memberi pakaian, atau memerdekakan budak. Yang tidak mampu berpuasa tiga hari." },
        { question: "Apa Kaffarah hubungan suami-istri di Ramadhan?", answer: "Qadha + Kaffarah: memerdekakan budak, puasa 60 hari berturut-turut, atau memberi makan 60 orang miskin." },
        { question: "Apa Kaffarah Zhihar?", answer: "Memerdekakan budak, puasa 60 hari berturut-turut, atau memberi makan 60 orang miskin." },
        { question: "Apa itu Fidyah puasa?", answer: "Memberi makan satu orang miskin per hari — sekitar 1.5kg beras per orang." },
        { question: "Bisa memberi makan alih-alih puasa untuk Kaffarah?", answer: "Ya, jika benar-benar tidak mampu berpuasa karena alasan kesehatan." },
        { question: "Berapa banyak makanan per orang?", answer: "Sekitar 1.5kg beras atau makanan pertengahan yang setara." },
        { question: "Apakah puasa harus berturut-turut?", answer: "Ya, puasa Kaffarah harus berturut-turut menurut mayoritas ulama." },
        { question: "Apakah wanita membayar Kaffarah sumpah?", answer: "Ya, Kaffarah sumpah berlaku untuk pria dan wanita." },
        { question: "Bisa membayar uang alih-alih makanan?", answer: "Mayoritas ulama mengatakan uang tidak bisa menggantikan makanan." },
        { question: "Apa perbedaan Fidyah dan Kaffarah?", answer: "Kaffarah untuk perbuatan terlarang, Fidyah untuk ketidakmampuan melakukan kewajiban." },
      ]} lang="id" />
      <RelatedTools tools={[
        { title: "Kalkulator Zakat", icon: "🕌", href: "/id/tools/zakat-calculator" },
        { title: "Kalkulator Umrah", icon: "🕋", href: "/id/tools/umrah-calculator" },
        { title: "Arah Kiblat", icon: "🧭", href: "/id/tools/qibla-direction" },
        { title: "Penghitung Tasbih", icon: "📿", href: "/id/tools/tasbeeh-counter" },
      ]} lang="id" />
      <ShareButtons lang="id" />
    </div>
  );
}
