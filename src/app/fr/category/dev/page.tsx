import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://adwatak.cloud/fr/category/dev",
    languages: {
      "ar": "https://adwatak.cloud/category/dev",
      "fr": "https://adwatak.cloud/fr/category/dev",
      "tr": "https://adwatak.cloud/tr/category/dev",
      "id": "https://adwatak.cloud/id/category/dev",
      "x-default": "https://adwatak.cloud/category/dev"
    },
  },
  title: "Developer Tools — Adawatak",
  description: "JSON formatter, Base64 encoder, hash generator, SEO audit. Tools for developers.",
};

const tools = [
  { title: "JSON Formatter", icon: "📋", href: "/fr/tools/json-formatter", desc: "Format and beautify JSON" },
  { title: "Base64 Encoder", icon: "🔄", href: "/fr/tools/base64-encoder", desc: "Encode and decode Base64" },
  { title: "Hash Generator", icon: "#️⃣", href: "/fr/tools/hash-generator", desc: "MD5, SHA-1, SHA-256, SHA-512" },
  { title: "SEO Audit", icon: "🔍", href: "/fr/tools/seo-audit", desc: "Analyze your site's SEO health" },
  { title: "CSS Minifier", icon: "🎨", href: "/fr/tools/css-minifier", desc: "Minify CSS files" },
  { title: "IP Lookup", icon: "🌐", href: "/fr/tools/ip-lookup", desc: "Look up IP addresses and networks" },
  { title: "UUID Generator", icon: "🔑", href: "/fr/tools/uuid-generator", desc: "Generate UUID v4 identifiers" },
  { title: "Encryption Tool", icon: "🔒", href: "/fr/tools/encryption-tool", desc: "Caesar Cipher, Base64, text reversal" },
  { title: "Markdown Editor", icon: "📝", href: "/fr/tools/markdown-editor", desc: "Write Markdown with live preview" },
  { title: "SEO Content Generator", icon: "🚀", href: "/fr/tools/seo-content-generator", desc: "Generate 5 unique SEO articles from one keyword" },
];

export default function DevCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>💻 Developer Tools</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Essential tools for developers: formatters, encoders, audits, and generators.</p>
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
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>All developer tools run in your browser. No server uploads, no limits, no registration required. <a href="/en" style={{ color: "#2563eb" }}>← Back to Home</a></p>
      </div>
    </div>
  );
}
