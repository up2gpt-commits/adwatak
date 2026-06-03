import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oluşturucular — Adwatak",
  description: "Ücretsiz oluşturucular: QR kod, barkod, şifre, fatura, isim",
};

const tools = [
  { title: "QR Kod Oluşturucu", icon: "🔳", href: "/tr/tools/qr-generator", desc: "URL veya metinden QR kod" },
  { title: "QR Kod Okuyucu", icon: "📷", href: "/tr/tools/qr-reader", desc: "QR kod okuma" },
  { title: "Barkod Oluşturucu", icon: "📊", href: "/tr/tools/barcode-generator", desc: "Ürün barkodları" },
  { title: "Şifre Oluşturucu", icon: "🔐", href: "/tr/tools/password-generator", desc: "Güçlü şifreler" },
  { title: "Fatura Oluşturucu", icon: "🧾", href: "/tr/tools/invoice-generator", desc: "Profesyonel faturalar" },
  { title: "WhatsApp Bağlantı", icon: "💬", href: "/tr/tools/whatsapp-link", desc: "Doğrudan WhatsApp bağlantısı" },
  { title: "Rastgele Sayı", icon: "🎲", href: "/tr/tools/random-number", desc: "Herhangi aralıkta sayı" },
];

export default function GeneratorsCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>🔳 Oluşturucular</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Ücretsiz oluşturucular: QR kod, barkod, şifre, fatura, isim</p>
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
