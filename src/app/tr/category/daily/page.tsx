import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diğer Araçlar — Adwatak",
  description: "Ücretsiz araçlar: VKİ, kalori, kronometre, yaş hesaplama",
};

const tools = [
  { title: "VKİ Hesaplama", icon: "⚖️", href: "/tr/tools/bmi-calculator", desc: "Vücut Kitle İndeksi" },
  { title: "Kalori Hesaplama", icon: "🔥", href: "/tr/tools/calorie-calculator", desc: "Günlük kalori ihtiyacı" },
  { title: "Kronometre", icon: "⏱️", href: "/tr/tools/stopwatch", desc: "Tur takipli kronometre" },
];

export default function DailyCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>⚖️ Diğer Araçlar</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Ücretsiz araçlar: VKİ, kalori, kronometre, yaş hesaplama</p>
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
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Tüm hesaplamalar tarayıcınızda yapılır. Hiçbir veri sunucuya gönderilmez. <a href="/tr" style={{ color: "#2563eb" }}>← Ana Sayfa</a></p>
      </div>
    </div>
  );
}
