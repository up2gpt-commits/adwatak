import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finansal Hesaplamalar — Adwatak",
  description: "Ücretsiz finansal hesaplamalar: konut kredisi, kişisel kredi, EMI, bileşik faiz, kar marjı, maaş, KDV, altın fiyatı",
};

const tools = [
  { title: "Konut Kredisi Hesaplama", icon: "🏠", href: "/tr/tools/mortgage-calculator", desc: "Aylık ödeme ve amortisman hesaplama" },
  { title: "Kişisel Kredi Hesaplama", icon: "💰", href: "/tr/tools/loan-calculator", desc: "Kredi faizi ve toplam geri ödeme" },
  { title: "EMI Hesaplama", icon: "🧮", href: "/tr/tools/emi-calculator", desc: "Eşit aylık taksit hesaplama" },
  { title: "Bileşik Faiz Hesaplama", icon: "📈", href: "/tr/tools/compound-interest", desc: "Yatırım büyüme hesaplaması" },
  { title: "Kâr Marjı Hesaplama", icon: "📐", href: "/tr/tools/profit-margin", desc: "Marj ve kar oranı hesaplama" },
  { title: "Net Maaş Hesaplama", icon: "💵", href: "/tr/tools/salary-calculator", desc: "Kesintiler sonrası net maaş" },
  { title: "KDV Hesaplama", icon: "🏛️", href: "/tr/tools/vat-calculator", desc: "KDV ekleme veya çıkarma" },
  { title: "Altın Hesaplama", icon: "🥇", href: "/tr/tools/gold-calculator", desc: "Altın değeri ve gram fiyatı" },
];

export default function CalculatorsCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>🏠 Finansal Hesaplamalar</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Ücretsiz finansal hesaplamalar: konut kredisi, kişisel kredi, EMI, bileşik faiz, kar marjı, maaş, KDV, altın fiyatı</p>
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
