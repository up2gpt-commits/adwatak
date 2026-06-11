import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://adwatak.cloud/en/category/converters",
    languages: {
      "ar": "https://adwatak.cloud/category/converters",
      "en": "https://adwatak.cloud/en/category/converters",
      "tr": "https://adwatak.cloud/tr/category/converters",
      "id": "https://adwatak.cloud/id/category/converters",
      "x-default": "https://adwatak.cloud/category/converters"
    },
  },
  title: "Converters — Adawatak",
  description: "PDF merge, image to PDF, unit converter, color converter. All converters work in your browser.",
};

const tools = [
  { title: "PDF Merger", icon: "📎", href: "/en/tools/pdf-merger", desc: "Combine multiple PDFs into one" },
  { title: "Image to PDF", icon: "🖼️", href: "/en/tools/image-to-pdf", desc: "Convert images to PDF" },
  { title: "Unit Converter", icon: "📐", href: "/en/tools/unit-converter", desc: "Length, weight, volume, temperature" },
  { title: "Color Converter", icon: "🎨", href: "/en/tools/color-converter", desc: "HEX ↔ RGB ↔ HSL with preview" },
];

export default function ConvertersCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>🔄 Converters</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Convert files, units, and colors — all in your browser.</p>
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
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>All conversions happen in your browser. Nothing is uploaded. Designed for privacy and speed. <a href="/en" style={{ color: "#2563eb" }}>← Back to Home</a></p>
      </div>
    </div>
  );
}
