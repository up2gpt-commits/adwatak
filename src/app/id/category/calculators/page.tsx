import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Keuangan — Adwatak",
  description: "Kalkulator keuangan gratis: KPR, pinjaman pribadi, EMI, bunga majemuk, margin keuntungan, gaji, PPN, harga emas",
};

const tools = [
  { title: "Kalkulator KPR", icon: "🏠", href: "/id/tools/mortgage-calculator", desc: "Cicilan bulanan dan perhitungan amortisasi" },
  { title: "Kalkulator Pinjaman", icon: "💰", href: "/id/tools/loan-calculator", desc: "Bunga pinjaman dan total pembayaran kembali" },
  { title: "Kalkulator EMI", icon: "🧮", href: "/id/tools/emi-calculator", desc: "Cicilan Bulanan Tetap (EMI)" },
  { title: "Kalkulator Bunga Majemuk", icon: "📈", href: "/id/tools/compound-interest", desc: "Perhitungan pertumbuhan investasi" },
  { title: "Kalkulator Margin Keuntungan", icon: "📐", href: "/id/tools/profit-margin", desc: "Margin dan rasio keuntungan" },
  { title: "Kalkulator Gaji Bersih", icon: "💵", href: "/id/tools/salary-calculator", desc: "Gaji setelah potongan" },
  { title: "Kalkulator PPN", icon: "🏛️", href: "/id/tools/vat-calculator", desc: "Tambah atau kurangi PPN" },
  { title: "Kalkulator Emas", icon: "🥇", href: "/id/tools/gold-calculator", desc: "Nilai emas dan harga per gram" },
  { title: "Kalkulator Cicilan", icon: "📊", href: "/id/tools/installment-calculator", desc: "Rencana cicilan pembelian" },
];

export default function CalculatorsCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>💰 Kalkulator Keuangan</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Kalkulator keuangan gratis: KPR, pinjaman pribadi, EMI, bunga majemuk, margin keuntungan, gaji, PPN, harga emas</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {tools.map((t, i) => (
          <a key={i} href={t.href} style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #f1f5f9", textDecoration: "none", color: "inherit" }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
              <span style={{ fontSize: "2rem" }}>{t.icon}</span>
              <div><div style={{ fontWeight: 700, fontSize: "1rem" }}>{t.title}</div><div style={{ fontSize: "0.875rem", color: "#64748b" }}>{t.desc}</div></div>
            </div>
          </a>
        ))}
      </div>
      <div style={{ marginTop: "32px", padding: "24px", background: "white", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Semua perhitungan dilakukan di browser Anda. Tidak ada data yang dikirim ke server. <a href="/id" style={{ color: "#2563eb" }}>← Beranda</a></p>
      </div>
    </div>
  );
}
