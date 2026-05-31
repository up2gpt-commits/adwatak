export const metadata = { title: "محولات الملفات والوحدات — أدواتك", description: "دمج PDF، صورة إلى PDF، تحويل الوحدات، تحويل الألوان. كل المحولات تعمل في المتصفح." };
const tools = [
  { title: "دمج ملفات PDF", icon: "📎", href: "/tools/pdf-merger", desc: "ادمج عدة PDF في ملف واحد" },
  { title: "صورة إلى PDF", icon: "🖼️", href: "/tools/image-to-pdf", desc: "حوّل الصور إلى ملف PDF" },
  { title: "تحويل الوحدات", icon: "📐", href: "/tools/unit-converter", desc: "الطول والوزن والحجم والحرارة" },
  { title: "تحويل الألوان", icon: "🎨", href: "/tools/color-converter", desc: "HEX ↔ RGB ↔ HSL مع معاينة" },
];
export default function ConvertersCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <nav style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}><a href="/" style={{ color: "#2563eb" }}>الرئيسية</a><span>›</span><span style={{ color: "#64748b" }}>محولات</span></nav>
      <div style={{ background: "white", borderRadius: "16px", padding: "32px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>🔄 محولات الملفات والوحدات</h1>
        <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: 1.8 }}>حوّل بين الصيغ المختلفة بسهولة. دمج ملفات PDF، تحويل الصور إلى PDF، تحويل وحدات القياس (طول، وزن، حجم، حرارة)، وتحويل الألوان بين HEX وRGB وHSL. كل المحولات تعمل في المتصفح بدون رفع ملفات.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px", marginBottom: "48px" }}>
        {tools.map((t) => (<a key={t.href} href={t.href} style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #f1f5f9", textDecoration: "none", color: "inherit" }}><div style={{ display: "flex", gap: "14px" }}><span style={{ fontSize: "2rem" }}>{t.icon}</span><div><h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a", marginBottom: "2px" }}>{t.title}</h3><p style={{ fontSize: "0.875rem", color: "#64748b" }}>{t.desc}</p></div></div></a>))}
      </div>
      <div style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "16px" }}>أسئلة شائعة</h2>
        {[
          { q: "هل ملفاتي آمنة؟", a: "نعم، كل المعالجة تتم في المتصفح ولا تُرفع لأي خادم." },
          { q: "ما وحدات القياس المدعومة؟", a: "أكثر من 10 أنواع: طول، وزن، حجم، حرارة، سرعة، مساحة، ضغط، طاقة وغيرها." },
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
