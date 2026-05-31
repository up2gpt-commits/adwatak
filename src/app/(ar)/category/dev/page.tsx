export const metadata = { title: "أدوات تطوير الويب — أدواتك", description: "JSON Formatter، Base64 Encoder، Hash Generator. أدوات ضرورية للمطورين." };
const tools = [
  { title: "JSON Formatter", icon: "📋", href: "/tools/json-formatter", desc: "تنسيق وتجميل ملفات JSON" },
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder", desc: "تشفير وفك تشفير Base64" },
  { title: "Hash Generator", icon: "#️⃣", href: "/tools/hash-generator", desc: "MD5, SHA-1, SHA-256, SHA-512" },
];
export default function DevCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <nav style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}><a href="/" style={{ color: "#2563eb" }}>الرئيسية</a><span>›</span><span style={{ color: "#64748b" }}>تطوير ويب</span></nav>
      <div style={{ background: "white", borderRadius: "16px", padding: "32px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>💻 أدوات تطوير الويب</h1>
        <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: 1.8 }}>أدوات ضرورية لمطوري الويب والمبرمجين. JSON Formatter لتنسيق ملفات JSON مع التحقق من الأخطاء، Base64 Encoder/Decoder لترميز النصوص والملفات، Hash Generator لتوليد MD5 وSHA-256 وغيرها.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px", marginBottom: "48px" }}>
        {tools.map((t) => (<a key={t.href} href={t.href} style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #f1f5f9", textDecoration: "none", color: "inherit" }}><div style={{ display: "flex", gap: "14px" }}><span style={{ fontSize: "2rem" }}>{t.icon}</span><div><h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a", marginBottom: "2px" }}>{t.title}</h3><p style={{ fontSize: "0.875rem", color: "#64748b" }}>{t.desc}</p></div></div></a>))}
      </div>
      <div style={{ textAlign: "center", marginTop: "32px" }}><a href="/" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>← العودة لكل الأدوات</a></div>
    </div>
  );
}
