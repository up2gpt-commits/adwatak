import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alat Islami — Adwatak",
  description: "Alat Islami gratis: kalkulator waris, zakat, arah kiblat, waktu sholat, tasbih digital, umrah, fidyah & kaffarah",
};

const tools = [
  { title: "Kalkulator Waris Islam", icon: "📜", href: "/id/tools/inheritance-calculator", desc: "Pembagian waris menurut Faraid" },
  { title: "Kalkulator Zakat", icon: "🕌", href: "/id/tools/zakat-calculator", desc: "Kewajiban zakat tahunan" },
  { title: "Arah Kiblat", icon: "🧭", href: "/id/tools/qibla-direction", desc: "Cari arah kiblat" },
  { title: "Waktu Sholat", icon: "🕐", href: "/id/tools/prayer-times", desc: "Waktu sholat" },
  { title: "Penghitung Tasbih", icon: "📿", href: "/id/tools/tasbeeh-counter", desc: "Tasbih digital" },
  { title: "Kalkulator Umrah", icon: "🕋", href: "/id/tools/umrah-calculator", desc: "Biaya Umrah" },
  { title: "Kalkulator Fidyah & Kaffarah", icon: "⚖️", href: "/id/tools/fidyah-kaffarah", desc: "Fidyah & Kaffarah" },
];

export default function IslamicCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>🕌 Alat Islami</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Alat Islami gratis: kalkulator waris, zakat, arah kiblat, waktu sholat, tasbih digital, kalkulator umrah, fidyah & kaffarah</p>
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
