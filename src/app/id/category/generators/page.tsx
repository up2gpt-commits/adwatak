import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generator — Adwatak",
  description: "Generator gratis: QR code, barcode, kata sandi, faktur, nama",
};

const tools = [
  { title: "Pembuat Kode QR", icon: "🔳", href: "/id/tools/qr-generator", desc: "QR code dari tautan atau teks" },
  { title: "Pembaca Kode QR", icon: "📷", href: "/id/tools/qr-reader", desc: "Baca QR code dari gambar/kamera" },
  { title: "Pembuat Barcode", icon: "📊", href: "/id/tools/barcode-generator", desc: "Barcode untuk produk" },
  { title: "Pembuat Kata Sandi", icon: "🔐", href: "/id/tools/password-generator", desc: "Kata sandi kuat dan acak" },
  { title: "Pembuat Faktur", icon: "🧾", href: "/id/tools/invoice-generator", desc: "Faktur profesional" },
  { title: "Pembuat Tautan WhatsApp", icon: "💬", href: "/id/tools/whatsapp-link", desc: "Tautan langsung ke WhatsApp" },
  { title: "Pembuat Angka Acak", icon: "🎲", href: "/id/tools/random-number", desc: "Angka acak dalam rentang tertentu" },
];

export default function GeneratorsCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>⚡ Generator</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Generator gratis: QR code, barcode, kata sandi, faktur, nama</p>
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
