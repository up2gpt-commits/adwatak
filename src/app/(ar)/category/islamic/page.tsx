export const metadata = {
  title: "الأدوات الإسلامية — أدواتك",
  description: "أدوات إسلامية: حاسبة الميراث، حاسبة الزكاة، تحويل هجري ميلادي، حاسبة العمر، اتجاه القبلة، مواقيت الصلاة. مبنية على أسس شرعية صحيحة.",
};

const tools = [
  { title: "حاسبة الميراث الإسلامي", icon: "📜", href: "/tools/inheritance-calculator", desc: "احسب أنصبة الميراث حسب الشريعة" },
  { title: "حاسبة الزكاة", icon: "🕌", href: "/tools/zakat-calculator", desc: "زكاة المال والذهب والأسهم" },
  { title: "تحويل هجري ميلادي", icon: "📅", href: "/tools/hijri-converter", desc: "حوّل التاريخ بين الهجري والميلادي" },
  { title: "حاسبة العمر", icon: "🎂", href: "/tools/age-calculator", desc: "عمرك بالهجري والميلادي وأبراجك" },
  { title: "اتجاه القبلة", icon: "🧭", href: "/tools/qibla-direction", desc: "اعرف اتجاه القبلة من موقعك" },
  { title: "مواقيت الصلاة", icon: "🕐", href: "/tools/prayer-times", desc: "مواقيت الصلاة حسب موقعك الجغرافي" },
];

export default function IslamicCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <nav style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
        <a href="/" style={{ color: "#2563eb", textDecoration: "none" }}>الرئيسية</a>
        <span>›</span>
        <span style={{ color: "#64748b" }}>الأدوات الإسلامية</span>
      </nav>
      <div style={{ background: "white", borderRadius: "16px", padding: "32px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>🕌 الأدوات الإسلامية</h1>
        <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: 1.8 }}>
          أدوات إسلامية فريدة لمساعدتك في عباداتك اليومية. حاسبة الميراث الإسلامي حسب الشريعة، حاسبة الزكاة للمال والذهب والأسهم، تحويل التاريخ الهجري والميلادي، حاسبة العمر، مواقيت الصلاة، وتحديد اتجاه القبلة. كل الأدوات مبنية على أسس شرعية صحيحة.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px", marginBottom: "48px" }}>
        {tools.map((tool) => (
          <a key={tool.href} href={tool.href} style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #f1f5f9", textDecoration: "none", color: "inherit" }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "2rem", flexShrink: 0 }}>{tool.icon}</span>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a", marginBottom: "2px" }}>{tool.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#64748b" }}>{tool.desc}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div style={{ background: "white", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "16px" }}>أسئلة شائعة عن الأدوات الإسلامية</h2>
        {[
          { q: "كيف يُحسب الميراث في الإسلام؟", a: "يُقسم حسب أنصبة محددة في سورة النساء. أصحاب الفروض يأخذون أنصبتهم أولاً، ثم يوزع الباقي على العصبات." },
          { q: "ما نصاب الزكاة؟", a: "85 جرام ذهب خالص أو 595 جرام فضة. إذا امتلكت هذا المقدار وحال عليه الحول (سنة هجرية)، تلزمك زكاة 2.5٪." },
          { q: "متى بدأ التقويم الهجري؟", a: "من هجرة النبي محمد ﷺ من مكة إلى المدينة عام 622 ميلادي." },
          { q: "كيف أحدد اتجاه القبلة؟", a: "استخدم أداة تحديد القبلة عبر السماح بالوصول لموقعك، أو اعرف أن القبلة تقريباً ناحية الجنوب الشرقي من شمال العالم." },
        ].map((faq, i) => (
          <div key={i} style={{ border: "1px solid #f1f5f9", borderRadius: "12px", overflow: "hidden", marginBottom: "8px" }}>
            <div style={{ padding: "14px 16px", background: "#f8fafc", fontWeight: 600, fontSize: "0.9rem", color: "#374151" }}>{faq.q}</div>
            <div style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.8, background: "white" }}>{faq.a}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "32px" }}>
        <a href="/" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>← العودة لكل الأدوات</a>
      </div>
    </div>
  );
}
