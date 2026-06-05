import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İslami Araçlar — Adwatak",
  description: "Ücretsiz İslami araçlar: miras, zekat, kıble yönü, namaz vakitleri, tesbih sayacı, umre, fidye ve kaffarat",
};

const tools = [
  { title: "İslami Miras Hesaplama", icon: "📜", href: "/tr/tools/inheritance-calculator", desc: "Feraiz dağılımı" },
  { title: "Zekat Hesaplama", icon: "🕌", href: "/tr/tools/zakat-calculator", desc: "Yıllık zekat" },
  { title: "Kıble Yönü", icon: "🧭", href: "/tr/tools/qibla-direction", desc: "Kıble yönü bulma" },
  { title: "Namaz Vakitleri", icon: "🕐", href: "/tr/tools/prayer-times", desc: "Namaz vakitleri" },
  { title: "Tasbih Sayacı", icon: "📿", href: "/tr/tools/tasbeeh-counter", desc: "Dijital tesbih" },
  { title: "Umre Hesaplama", icon: "🕋", href: "/tr/tools/umrah-calculator", desc: "Umre maliyeti" },
  { title: "Fidye ve Kaffarat", icon: "⚖️", href: "/tr/tools/fidyah-kaffarah", desc: "Fidye ve kaffarat" },
];

export default function IslamicCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>📜 İslami Araçlar</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Ücretsiz İslami araçlar: miras, zekat, kıble yönü, namaz vakitleri, tesbih sayacı, umre hesaplama, fidye ve kaffarat</p>
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
