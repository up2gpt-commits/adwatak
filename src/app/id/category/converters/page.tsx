import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Konverter — Adwatak",
  description: "Konverter gratis: mata uang, satuan, warna, tanggal Hijriah, usia",
};

const tools = [
  { title: "Konverter Mata Uang", icon: "💱", href: "/id/tools/currency-converter", desc: "Konversi mata uang dengan kurs langsung" },
  { title: "Konverter Satuan", icon: "📏", href: "/id/tools/unit-converter", desc: "Panjang, berat, suhu, volume" },
  { title: "Konverter Warna", icon: "🎨", href: "/id/tools/color-converter", desc: "HEX ↔ RGB ↔ HSL" },
  { title: "Konversi Hijriah ↔ Masehi", icon: "📅", href: "/id/tools/hijri-converter", desc: "Konversi tanggal Hijriah dan Masehi" },
];

export default function ConvertersCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>🔄 Konverter</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Konverter gratis: mata uang, satuan, warna, tanggal Hijriah</p>
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
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Semua konversi dilakukan di browser Anda. Tidak ada data yang dikirim ke server. <a href="/id" style={{ color: "#2563eb" }}>← Beranda</a></p>
      </div>
    </div>
  );
}
