import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alat Pengembang — Adwatak",
  description: "Alat pengembang gratis: JSON, Base64, hash, SEO, CSS, Markdown, IP",
};

const tools = [
  { title: "Pemformat JSON", icon: "📋", href: "/id/tools/json-formatter", desc: "Format dan validasi JSON" },
  { title: "Encoder/Decoder Base64", icon: "📦", href: "/id/tools/base64-encoder", desc: "Enkode dan dekode Base64" },
  { title: "Pembuat Hash", icon: "🔑", href: "/id/tools/hash-generator", desc: "MD5, SHA-1, SHA-256, SHA-512" },
  { title: "Alat Audit SEO", icon: "🔍", href: "/id/tools/seo-audit", desc: "Analisis SEO gratis" },
  { title: "Pengecil CSS", icon: "🎨", href: "/id/tools/css-minifier", desc: "Minify dan format CSS" },
  { title: "Editor Markdown", icon: "📝", href: "/id/tools/markdown-editor", desc: "Markdown dengan pratinjau langsung" },
  { title: "Pencarian IP", icon: "🌐", href: "/id/tools/ip-lookup", desc: "Informasi alamat IP" },
];

export default function DevCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>💻 Alat Pengembang</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Alat pengembang gratis: JSON, Base64, hash, SEO, CSS, Markdown, IP</p>
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
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Semua alat berjalan di browser Anda. Tidak ada data yang dikirim ke server. <a href="/id" style={{ color: "#2563eb" }}>← Beranda</a></p>
      </div>
    </div>
  );
}
