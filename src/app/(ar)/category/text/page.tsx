export const metadata = { title: "أدوات النصوص — أدواتك", description: "عداد الكلمات، تحويل حالة النص، تحويل الأرقام لحروف، مولد النص العربي، تنظيف النص، مقارنة النصوص." };
const tools = [
  { title: "عداد الكلمات والحروف", icon: "📝", href: "/tools/word-counter", desc: "عداد الكلمات والحروف والجمل" },
  { title: "تحويل حالة النص", icon: "🔤", href: "/tools/text-case", desc: "أحرف كبيرة أو صغيرة أو عنوان" },
  { title: "تحويل الأرقام لحروف", icon: "🔢", href: "/tools/number-to-words", desc: "الأرقام إلى كلمات عربية" },
  { title: "مولد النص العربي", icon: "📃", href: "/tools/arabic-lorem", desc: "نص عربي للتصميم والمشاريع" },
  { title: "تنظيف النص", icon: "🧹", href: "/tools/text-cleaner", desc: "إزالة المسافات والروابط والعلامات" },
  { title: "مقارنة النصوص", icon: "⚖️", href: "/tools/text-compare", desc: "قارن بين نصين واكتشف الفروقات" },
];
export default function TextCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <nav style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}><a href="/" style={{ color: "#2563eb" }}>الرئيسية</a><span>›</span><span style={{ color: "#64748b" }}>أدوات نصية</span></nav>
      <div style={{ background: "white", borderRadius: "16px", padding: "32px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>📝 أدوات النصوص والكتابة</h1>
        <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: 1.8 }}>أدوات نصية متنوعة للكتّاب والطلاب ومتخصصي SEO. عداد الكلمات والحروف يدعم العربية والإنجليزية، تحويل حالة النص، تحويل الأرقام لكلمات عربية، مولد النص العربي، تنظيف النص، ومقارنة نصين.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px", marginBottom: "48px" }}>
        {tools.map((t) => (<a key={t.href} href={t.href} style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #f1f5f9", textDecoration: "none", color: "inherit" }}><div style={{ display: "flex", gap: "14px" }}><span style={{ fontSize: "2rem" }}>{t.icon}</span><div><h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a", marginBottom: "2px" }}>{t.title}</h3><p style={{ fontSize: "0.875rem", color: "#64748b" }}>{t.desc}</p></div></div></a>))}
      </div>
      <div style={{ textAlign: "center", marginTop: "32px" }}><a href="/" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>← العودة لكل الأدوات</a></div>
    </div>
  );
}
