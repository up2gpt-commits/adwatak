export const metadata = { title: "المولدات — أدواتك", description: "مولد QR Code، رابط واتساب، مولد كلمات سر، مولد فواتير، مولد أرقام عشوائية، مولد أسماء." };
const tools = [
  { title: "مولد QR Code", icon: "🔳", href: "/tools/qr-generator", desc: "إنشاء QR Code لرابط أو نص" },
  { title: "رابط واتساب مباشر", icon: "💬", href: "/tools/whatsapp-link", desc: "رابط يفتح واتساب مباشرة" },
  { title: "مولد كلمات السر", icon: "🔐", href: "/tools/password-generator", desc: "كلمات سر قوية وآمنة" },
  { title: "مولد الفواتير", icon: "🧾", href: "/tools/invoice-generator", desc: "فاتورة إعربية احترافية" },
  { title: "مولد أرقام عشوائية", icon: "🎲", href: "/tools/random-number", desc: "أرقام عشوائية بين نطاق محدد" },
  { title: "مولد أسماء", icon: "👤", href: "/tools/name-generator", desc: "أسماء عربية وإنجليزية" },
];
export default function GeneratorsCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <nav style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}><a href="/" style={{ color: "#2563eb" }}>الرئيسية</a><span>›</span><span style={{ color: "#64748b" }}>مولدات</span></nav>
      <div style={{ background: "white", borderRadius: "16px", padding: "32px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>⚡ المولدات</h1>
        <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: 1.8 }}>أدوات توليد سريعة ومفيدة. مولد QR Code لإنشاء رموز QR للروابط والنصوص، رابط واتساب مباشر، مولد كلمات سر قوية، مولد فواتير احترافية، مولد أرقام عشوائية، ومولد أسماء عربية وإنجليزية.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px", marginBottom: "48px" }}>
        {tools.map((t) => (<a key={t.href} href={t.href} style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #f1f5f9", textDecoration: "none", color: "inherit" }}><div style={{ display: "flex", gap: "14px" }}><span style={{ fontSize: "2rem" }}>{t.icon}</span><div><h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a", marginBottom: "2px" }}>{t.title}</h3><p style={{ fontSize: "0.875rem", color: "#64748b" }}>{t.desc}</p></div></div></a>))}
      </div>
      <div style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "16px" }}>أسئلة شائعة</h2>
        {[
          { q: "ما طول كلمة السر المثالي؟", a: "12 حرف كحد أدنى. يفضل 16-20 حرف مع مزيج من الأحرف والأرقام والرموز." },
          { q: "هل رابط واتساب يحتفظ بالرقم؟", a: "لا، الرابط يفتح المحادثة مباشرة بدون حفظ الرقم." },
        ].map((faq, i) => (
          <div key={i} style={{ border: "1px solid #f1f5f9", borderRadius: "12px", overflow: "hidden", marginBottom: "8px" }}>
            <div style={{ padding: "14px 16px", background: "#f8fafc", fontWeight: 600, fontSize: "0.9rem", color: "#374151" }}>{faq.q}</div>
            <div style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.8, background: "white" }}>{faq.a}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "32px" }}><a href="/" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>← العودة لكل الأدوات</a></div>
    </div>
  );
}
