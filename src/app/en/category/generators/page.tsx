import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://adwatak.cloud/en/category/generators",
    languages: {
      "ar": "https://adwatak.cloud/category/generators",
      "en": "https://adwatak.cloud/en/category/generators",
      "tr": "https://adwatak.cloud/tr/category/generators",
      "id": "https://adwatak.cloud/id/category/generators",
      "x-default": "https://adwatak.cloud/category/generators"
    },
  },
  title: "Generators — Adawatak",
  description: "QR code generator, WhatsApp link, password generator, invoice generator, random number generator.",
};

const tools = [
  { title: "QR Code Generator", icon: "🔳", href: "/en/tools/qr-generator", desc: "Create QR codes for URLs or text" },
  { title: "WhatsApp Link", icon: "💬", href: "/en/tools/whatsapp-link", desc: "Direct chat link with pre-filled message" },
  { title: "Password Generator", icon: "🔐", href: "/en/tools/password-generator", desc: "Secure random passwords" },
  { title: "Invoice Generator", icon: "🧾", href: "/en/tools/invoice-generator", desc: "Professional invoice creator" },
  { title: "Random Number Generator", icon: "🎲", href: "/en/tools/random-number", desc: "Random numbers within a range" },
  { title: "Name Generator", icon: "👤", href: "/en/tools/name-generator", desc: "Arabic and English name generator" },
  { title: "Barcode Generator", icon: "📊", href: "/en/tools/barcode-generator", desc: "Generate barcodes for products" },
];

export default function GeneratorsCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>⚡ Generators</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Create QR codes, invoices, passwords, and more — instantly and free.</p>
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
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>All generators are 100% free. No signup, no limits, no ads. Create professional outputs instantly. <a href="/en" style={{ color: "#2563eb" }}>← Back to Home</a></p>
      </div>
    </div>
  );
}
