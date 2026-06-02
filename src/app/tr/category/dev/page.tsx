import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Geliştirici Araçları — Adwatak",
  description: "Ücretsiz geliştirici araçları: JSON, Base64, hash, SEO, CSS, Markdown, IP",
};

const tools = [
  { title: "JSON Biçimlendirici", icon: "📋", href: "/tr/tools/json-formatter", desc: "JSON biçimlendirme ve doğrulama" },
  { title: "Base64 Kodlayıcı", icon: "📦", href: "/tr/tools/base64-encoder", desc: "Base64 kodlama/kod çözme" },
  { title: "Hash Oluşturucu", icon: "🔑", href: "/tr/tools/hash-generator", desc: "MD5, SHA-1, SHA-256, SHA-512" },
  { title: "SEO Denetim", icon: "🔍", href: "/tr/tools/seo-audit", desc: "Ücretsiz SEO analizi" },
  { title: "CSS Küçültücü", icon: "🎨", href: "/tr/tools/css-minifier", desc: "CSS küçültme/biçimlendirme" },
  { title: "Markdown Düzenleyici", icon: "📝", href: "/tr/tools/markdown-editor", desc: "Canlı önizlemeli Markdown" },
  { title: "IP Sorgulama", icon: "🌐", href: "/tr/tools/ip-lookup", desc: "IP adresi bilgisi" },
];

export default function DevCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>📋 Geliştirici Araçları</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Ücretsiz geliştirici araçları: JSON, Base64, hash, SEO, CSS, Markdown, IP</p>
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
