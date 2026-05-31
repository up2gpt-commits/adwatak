export const metadata = { title: "أدوات يومية — أدواتك", description: "حاسبة BMI، ساعة إيقاف ومؤقت، عداد حروف السوشيال. أدوات مفيدة لكل يوم." };
const tools = [
  { title: "حاسبة BMI", icon: "⚖️", href: "/tools/bmi-calculator", desc: "مؤشر كتلة الجسم — وزنك المثالي" },
  { title: "ساعة إيقاف + مؤقت", icon: "⏱️", href: "/tools/stopwatch", desc: "ساعة إيقاف مع لفات ومؤقت تنازلي" },
  { title: "عداد حروف السوشيال", icon: "📱", href: "/tools/social-character-counter", desc: "Twitter, Instagram, TikTok والمزيد" },
];
export default function DailyCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <nav style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}><a href="/" style={{ color: "#2563eb" }}>الرئيسية</a><span>›</span><span style={{ color: "#64748b" }}>يومية</span></nav>
      <div style={{ background: "white", borderRadius: "16px", padding: "32px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>🌟 أدوات يومية مفيدة</h1>
        <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: 1.8 }}>أدوات يومية بسيطة ومفيدة. حاسبة مؤشر كتلة الجسم BMI لمعرفة وزنك المثالي، ساعة إيقاف مع لفات ومؤقت تنازلي للرياضة والطبخ، وعداد حروف مخصص لمنصات التواصل الاجتماعي.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px", marginBottom: "48px" }}>
        {tools.map((t) => (<a key={t.href} href={t.href} style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #f1f5f9", textDecoration: "none", color: "inherit" }}><div style={{ display: "flex", gap: "14px" }}><span style={{ fontSize: "2rem" }}>{t.icon}</span><div><h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a", marginBottom: "2px" }}>{t.title}</h3><p style={{ fontSize: "0.875rem", color: "#64748b" }}>{t.desc}</p></div></div></a>))}
      </div>
      <div style={{ textAlign: "center", marginTop: "32px" }}><a href="/" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>← العودة لكل الأدوات</a></div>
    </div>
  );
}
