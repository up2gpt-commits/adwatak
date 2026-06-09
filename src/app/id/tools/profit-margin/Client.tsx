"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "Apa perbedaan margin kotor dan margin bersih?", answer: "Margin kotor hanya memperhitungkan biaya langsung barang. Margin bersih mengurangi semuanya — biaya overhead, pemasaran, pajak. Kafe mungkin memiliki margin kotor 70% pada kopi tetapi hanya 10% bersih setelah sewa dan staf. Keduanya penting untuk keputusan yang berbeda." },
  { question: "Berapa margin keuntungan yang baik?", answer: "Tergantung industri: restoran 3-9%, perangkat lunak 15-25%, ritel 2-5%, konsultasi 20-40%, manufaktur 5-15%. Margin bersih 5% bagus untuk toko kelontong tetapi buruk untuk konsultasi. Bandingkan dengan standar industri Anda." },
  { question: "Apa perbedaan markup dan margin?", answer: "Markup = laba / biaya × 100. Margin = laba / harga × 100. Biaya Rp60.000, harga Rp100.000: markup = 66.7%, margin = 40%. Jika Anda ingin margin 40%, Anda harus markup 66.7% — bukan 40%. Ini adalah kesalahan penetapan harga paling umum." },
  { question: "Bagaimana cara menghitung harga jual dari margin?", answer: "Harga Jual = Biaya ÷ (1 - Margin yang Diinginkan). Contoh: biaya = Rp60.000, margin diinginkan = 40%. Harga = 60.000 ÷ 0.6 = Rp100.000. Jika ingin margin 50%: 60.000 ÷ 0.5 = Rp120.000. Selalu hitung margin dengan cara ini, bukan dengan menambahkan persentase ke biaya." },
  { question: "Bagaimana cara menghitung biaya dari harga dan margin?", answer: "Biaya = Harga × (1 - Margin). Contoh: menjual Rp100.000, ingin margin 40%. Biaya maksimum = 100.000 × 0.6 = Rp60.000. Jika biaya Anda lebih tinggi dari Rp60.000, Anda tidak bisa mencapai margin 40% pada harga Rp100.000. Naikkan harga atau turunkan biaya." },
  { question: "Berapa margin keuntungan yang sehat untuk startup?", answer: "Untuk startup SaaS, margin bersih 20-40% pada skala sangat baik. Tahap awal: targetkan margin kotor 60-80% (umum untuk SaaS). Jika margin kotor di bawah 50%, model harga atau struktur biaya Anda perlu ditinjau serius sebelum scaling." },
  { question: "Bagaimana cara menghitung titik impas (break-even)?", answer: "Titik Impas = Biaya Tetap ÷ Margin Kontribusi per Unit. Margin Kontribusi = Harga - Biaya Variabel per Unit. Contoh: biaya tetap Rp10.000.000, harga Rp100.000, biaya variabel Rp60.000 → MK = Rp40.000 → TI = 250 unit. Setiap penjualan setelah 250 = laba murni." },
  { question: "Apa perbedaan margin kotor dan margin kontribusi?", answer: "Margin kotor = (Pendapatan - HPP) ÷ Pendapatan. Margin kontribusi = (Pendapatan - Biaya Variabel) ÷ Pendapatan. HPP hanya biaya produk. Margin kontribusi mencakup SEMUA biaya variabel (produk + komisi + kemasan + pengiriman). Margin kontribusi lebih berguna untuk keputusan harga." },
  { question: "Apakah margin keuntungan 50% itu baik?", answer: "Margin kotor 50% sangat baik di sebagian besar industri. Tapi ingat: dari 50% itu, sewa 10%, gaji 15%, pemasaran 5%, utilitas 2% → laba bersih hanya sekitar 18%. Margin kotor BUKAN laba bersih. Selalu pikirkan margin bersih untuk kesehatan bisnis." },
  { question: "Bagaimana cara meningkatkan margin keuntungan?", answer: "1) Negosiasi dengan pemasok untuk biaya lebih rendah. 2) Naikkan harga secara bertahap. 3) Kurangi limbah inventaris. 4) Jual produk margin tinggi di samping produk margin rendah. 5) Tawarkan paket bundling bukan diskon individu. 6) Otomatisasi proses untuk memotong biaya operasional." },
  { question: "Bisakah margin keuntungan melebihi 100%?", answer: "Margin keuntungan (margin %) TIDAK PERNAH bisa melebihi 100% karena laba ÷ harga. Laba tidak bisa lebih besar dari harga. Namun, markup BISA melebihi 100%. Contoh: biaya Rp10.000, harga Rp100.000 → margin = 90%, markup = 900%. Jangan tertukar!" },
  { question: "Berapa margin keuntungan yang baik untuk e-commerce?", answer: "Rata-rata e-commerce margin bersih 10-20%. Yang terbaik mencapai 25-40%. Tantangan: iklan (10-30% pendapatan), pengiriman (5-15%), retur (5-20%), pemrosesan pembayaran (2-3%). Untuk laba bersih 15%, Anda perlu setidaknya 45% margin kotor. Gunakan kalkulator ini untuk bekerja mundur dari margin bersih yang diinginkan." },
];

const relatedTools = [
  { title: "Kalkulator PPN", icon: "🏛️", href: "/id/tools/vat-calculator" },
  { title: "Kalkulator Pinjaman", icon: "💰", href: "/id/tools/loan-calculator" },
  { title: "Konverter Mata Uang", icon: "💱", href: "/id/tools/currency-converter" },
  { title: "Kalkulator Gaji", icon: "💵", href: "/id/tools/salary-calculator" },
  { title: "Bunga Majemuk", icon: "📊", href: "/id/tools/compound-interest" },
  { title: "Pembuat Faktur", icon: "🧾", href: "/id/tools/invoice-generator" },
];

const seoContent = [
  "Kalkulator Margin Laba adalah alat penting bagi pemilik bisnis, pengusaha, dan penjual e-commerce. Hitung margin laba, markup, harga jual, atau biaya secara instan — masukkan dua nilai dan dapatkan sisanya secara otomatis.",
  "Memahami perbedaan antara margin dan markup sangat penting untuk penetapan harga. Margin memberi tahu Anda berapa persen dari setiap penjualan adalah laba. Markup memberi tahu berapa banyak yang Anda tambahkan di atas biaya. Mencampuradukkan keduanya adalah kesalahan penetapan harga paling umum dalam bisnis.",
  "Contoh: Anda membeli produk seharga Rp60.000 dan menjual seharga Rp100.000. Laba = Rp40.000. Margin = 40.000 ÷ 100.000 × 100 = 40%. Markup = 40.000 ÷ 60.000 × 100 = 66.7%. Jika Anda berkata 'tambah 40% ke biaya' — itu markup, dan hanya memberi Anda margin 28,6%. Gunakan kalkulator ini untuk menghindari jebakan markup-vs-margin.",
  "Mengapa margin bervariasi menurut industri? Toko kelontong beroperasi dengan margin bersih 1-3% karena volume penjualan tinggi. Toko perhiasan bekerja dengan margin 20-40% karena penjualan jarang. Perusahaan perangkat lunak mencapai 20-40% karena biaya marjinal mendekati nol. Mengetahui standar industri membantu Anda menetapkan target yang realistis.",
  "Kalkulator margin laba ini mendukung tiga metode: (A) Dari Biaya dan Harga Jual → dapatkan margin dan markup. (B) Dari Biaya dan Margin yang Diinginkan → dapatkan harga jual. (C) Dari Harga Jual dan Margin yang Diinginkan → dapatkan biaya maksimum yang diizinkan. Sempurna untuk penetapan harga produk dan manajemen biaya.",
  "Tips: Jangan mencampuradukkan margin kotor dengan laba bersih. Margin kotor hanya mengurangi biaya produk. Laba bersih mengurangi semuanya: sewa, gaji, pemasaran, utilitas, pemeliharaan. Gunakan kalkulator ini untuk penetapan harga awal, lalu masukkan semua biaya lain untuk laba bersih yang sebenarnya.",
];

interface Scenario { name: string; cost: number; price: number; margin: number; markup: number; profit: number }

export default function Client() {
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [margin, setMargin] = useState("");
  const [result, setResult] = useState<{
    margin: number; markup: number; profit: number; price: number; cost: number
  } | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [showWhatIf, setShowWhatIf] = useState(false);

  const calculate = () => {
    const c = parseFloat(cost);
    const p = parseFloat(price);
    const m = parseFloat(margin);
    if (c > 0 && p > 0) {
      const res = { margin: ((p - c) / p * 100), markup: ((p - c) / c * 100), profit: p - c, price: p, cost: c };
      setResult(res);
      return;
    }
    if (c > 0 && m > 0 && m < 100) {
      const calcPrice = c / (1 - m / 100);
      setResult({ margin: m, markup: (calcPrice - c) / c * 100, profit: calcPrice - c, price: calcPrice, cost: c });
      return;
    }
    if (p > 0 && m > 0 && m < 100) {
      const calcCost = p * (1 - m / 100);
      setResult({ margin: m, markup: (p - calcCost) / calcCost * 100, profit: p - calcCost, price: p, cost: calcCost });
    }
  };

  const saveScenario = () => {
    if (!result) return;
    const count = scenarios.length;
    const label = `Produk ${count + 1}`;
    setScenarios([...scenarios, { name: label, ...result }]);
  };

  const removeScenario = (idx: number) => {
    setScenarios(scenarios.filter((_, i) => i !== idx));
  };

  const clearAll = () => {
    setScenarios([]);
  };

  const whatIfData = result ? [-20, -15, -10, -5, 0, 5, 10, 15, 20].map(pct => {
    const newPrice = result.price * (1 + pct / 100);
    const newProfit = newPrice - result.cost;
    return { change: pct, price: newPrice, profit: newProfit, margin: (newProfit / newPrice * 100), markup: (newProfit / result.cost * 100) };
  }) : [];

  const inputStyle = "w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all";
  const labelStyle = "block text-sm font-semibold text-gray-700 mb-1.5";
  const cardStyle = "bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6 mb-5";
  const gradientBtn = "bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold p-3.5 rounded-xl border-none text-lg w-full cursor-pointer hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98]";
  const resultCardStyle = "bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-xl p-5 text-center border border-white/40 shadow-sm";

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Kalkulator Margin Laba", "Online Kalkulator Margin Laba - alat gratis", "https://adwatak.cloud/id/tools/profit-margin", "id", "Utility")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{ name: "Beranda", url: "https://adwatak.cloud/id" }, { name: "Kalkulator Keuangan", url: "https://adwatak.cloud/id/category/calculators" }, { name: "Kalkulator Margin Laba", url: "https://adwatak.cloud/id/tools/profit-margin" }])} />
      <StructuredData data={howToSchema("Cara menggunakan Kalkulator Margin Laba", "Alat online gratis. Bekerja langsung di browser. Tidak perlu registrasi.", [{ name: "Buka alat", text: "Buka Kalkulator Margin Laba di Adwatak" }, { name: "Masukkan data", text: "Isi biaya, harga, atau margin yang diinginkan (2 nilai)" }, { name: "Klik Hitung", text: "Tekan tombol hitung untuk hasil instan" }, { name: "Simpan skenario", text: "Bandingkan beberapa produk menggunakan fitur Skenario" }], "kurang dari satu menit", "en")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb lang="id" category="Kalkulator Keuangan" categorySlug="calculators" toolName="Kalkulator Margin Laba" />

      {/* Main Calculator Card */}
      <div className={cardStyle}>
        <h1 className="text-2xl font-extrabold mb-1">📈 Kalkulator Margin Laba</h1>
        <p className="text-sm text-gray-500 mb-6">Hitung margin laba, markup, harga jual, atau biaya maks — masukkan 2 nilai</p>

        {[
          { label: "Biaya (Rp)", value: cost, set: setCost, placeholder: "60000", step: "any" },
          { label: "Harga Jual (Rp) — opsional", value: price, set: setPrice, placeholder: "100000", step: "any" },
          { label: "Margin Diinginkan (%) — opsional", value: margin, set: setMargin, placeholder: "40", step: "any" },
        ].map((f, i) => (
          <div key={i} className="mb-4">
            <label className={labelStyle}>{f.label}</label>
            <input type="number" value={f.value} onChange={(e) => f.set(e.target.value)}
              step={f.step} className={inputStyle} placeholder={f.placeholder} />
          </div>
        ))}

        <p className="text-xs text-gray-400 mb-3">Masukkan 2 nilai — sisanya akan dihitung otomatis</p>
        <button onClick={calculate} className={gradientBtn}>
          <span className="inline-flex items-center gap-2">🧮 Hitung</span>
        </button>
      </div>

      {/* Results Section */}
      {result && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className={resultCardStyle}>
              <p className="text-xs text-indigo-500 mb-1 font-medium">Margin Laba</p>
              <p className="text-2xl font-extrabold text-indigo-600">{result.margin.toFixed(2)}%</p>
            </div>
            <div className={resultCardStyle}>
              <p className="text-xs text-emerald-500 mb-1 font-medium">Markup</p>
              <p className="text-2xl font-extrabold text-emerald-600">{result.markup.toFixed(2)}%</p>
            </div>
            <div className={resultCardStyle}>
              <p className="text-xs text-amber-500 mb-1 font-medium">Laba Bersih</p>
              <p className="text-2xl font-extrabold text-amber-600">Rp{result.profit.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            </div>
          </div>

          {/* Visual Stacked Bar Chart */}
          <div className={cardStyle}>
            <h3 className="text-sm font-bold text-gray-700 mb-3">📊 Biaya vs Laba</h3>
            {(() => {
              const total = result.cost + result.profit;
              const costPct = (result.cost / total * 100);
              const profitPct = (result.profit / total * 100);
              return (
                <>
                  <div className="h-10 rounded-xl overflow-hidden flex mb-2 shadow-inner">
                    <div className="bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center text-xs font-bold text-gray-700 transition-all duration-300"
                      style={{ width: `${costPct}%` }}>
                      {costPct >= 12 ? `Biaya ${costPct.toFixed(1)}%` : ""}
                    </div>
                    <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center text-xs font-bold text-white transition-all duration-300"
                      style={{ width: `${profitPct}%` }}>
                      {profitPct >= 12 ? `Laba ${profitPct.toFixed(1)}%` : ""}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>🔵 Biaya: Rp{result.cost.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    <span>🟢 Laba: Rp{result.profit.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    <span>💰 Total: Rp{total.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                  </div>
                </>
              );
            })()}
          </div>

          {/* What-If Analysis */}
          <div className={cardStyle}>
            <button onClick={() => setShowWhatIf(!showWhatIf)}
              className="flex items-center justify-between w-full">
              <h3 className="text-sm font-bold text-gray-700">🔮 Analisis Sensitivitas Harga</h3>
              <span className={`text-gray-400 text-lg transition-transform ${showWhatIf ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {showWhatIf && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Δ Harga</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Harga</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Laba</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Margin</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Markup</th>
                    </tr>
                  </thead>
                  <tbody>
                    {whatIfData.map((row, i) => (
                      <tr key={i} className={`border-b border-gray-100 hover:bg-indigo-50/50 transition-colors ${row.change === 0 ? 'bg-indigo-50 font-bold' : ''}`}>
                        <td className={`p-2.5 ${row.change > 0 ? 'text-emerald-600' : row.change < 0 ? 'text-red-500' : 'text-indigo-600'}`}>
                          {row.change > 0 ? `+${row.change}%` : `${row.change}%`}
                        </td>
                        <td className="p-2.5">Rp{row.price.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className="p-2.5">Rp{row.profit.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className="p-2.5">{row.margin.toFixed(2)}%</td>
                        <td className="p-2.5">{row.markup.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-gray-400 mt-3">Baris tebal = harga saat ini. Lihat bagaimana perubahan harga mempengaruhi margin Anda.</p>
              </div>
            )}
          </div>

          {/* Scenario Comparison */}
          <div className={cardStyle}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-700">📋 Perbandingan Skenario</h3>
              <div className="flex gap-2">
                {scenarios.length > 0 && (
                  <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">Hapus Semua</button>
                )}
                <button onClick={saveScenario} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors">+ Simpan</button>
              </div>
            </div>
            {scenarios.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">Klik "Simpan" untuk membandingkan produk atau skenario harga yang berbeda</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Skenario</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Biaya</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Harga</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Margin</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Laba</th>
                      <th className="p-2.5"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((s, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="p-2.5 font-medium">{s.name}</td>
                        <td className="p-2.5">Rp{s.cost.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className="p-2.5">Rp{s.price.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className="p-2.5">
                          <span className={`${s.margin >= 20 ? 'text-emerald-600' : s.margin >= 10 ? 'text-amber-600' : 'text-red-500'} font-semibold`}>
                            {s.margin.toFixed(1)}%
                          </span>
                        </td>
                        <td className="p-2.5">Rp{s.profit.toLocaleString("id-ID", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className="p-2.5">
                          <button onClick={() => removeScenario(i)} className="text-red-400 hover:text-red-600 transition-colors text-xs">✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      <SEOContent content={seoContent} lang="id" />
      <FAQSection faqs={faqs} lang="id" />
      <RelatedTools tools={relatedTools} lang="id" />
      <ShareButtons lang="id" />
    </div>
  );
}
