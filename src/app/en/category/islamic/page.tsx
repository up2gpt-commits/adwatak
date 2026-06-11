import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://adwatak.cloud/en/category/islamic",
    languages: {
      "ar": "https://adwatak.cloud/category/islamic",
      "en": "https://adwatak.cloud/en/category/islamic",
      "tr": "https://adwatak.cloud/tr/category/islamic",
      "id": "https://adwatak.cloud/id/category/islamic",
      "x-default": "https://adwatak.cloud/category/islamic"
    },
  },
  title: "Islamic Tools — Adawatak",
  description: "Qibla direction, prayer times, zakat calculator, Hijri calendar, inheritance calculator. Islamic tools for Muslims worldwide.",
};

const tools = [
  { title: "Islamic Inheritance Calculator", icon: "📜", href: "/en/tools/inheritance-calculator", desc: "Calculate inheritance shares per Islamic law" },
  { title: "Zakat Calculator", icon: "🕌", href: "/en/tools/zakat-calculator", desc: "Zakat on money, gold, and stocks" },
  { title: "Hijri Converter", icon: "📅", href: "/en/tools/hijri-converter", desc: "Convert between Hijri and Gregorian dates" },
  { title: "Age Calculator", icon: "🎂", href: "/en/tools/age-calculator", desc: "Your age in Hijri and Gregorian" },
  { title: "Qibla Direction", icon: "🧭", href: "/en/tools/qibla-direction", desc: "Find Qibla from your location" },
  { title: "Qibla Camera AR", icon: "📸", href: "/en/tools/qibla-camera", desc: "AR camera — see the Kaaba direction live" },
  { title: "Prayer Times", icon: "🕐", href: "/en/tools/prayer-times", desc: "Prayer times based on your location" },
  { title: "Tasbeeh Counter", icon: "📿", href: "/en/tools/tasbeeh-counter", desc: "Digital tasbeeh for dhikr" },
  { title: "Umrah Calculator", icon: "🕋", href: "/en/tools/umrah-calculator", desc: "Umrah costs with rituals schedule" },
  { title: "Fidyah & Kaffarah Calculator", icon: "⚖️", href: "/en/tools/fidyah-kaffarah", desc: "Calculate expiation for oaths and more" },
];

export default function IslamicCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>🕌 Islamic Tools</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Essential Islamic tools for Muslims: prayer times, Qibla direction, zakat, and more.</p>
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
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>All tools work in your browser. No data uploaded. Accurate calculations based on trusted sources. <a href="/en" style={{ color: "#2563eb" }}>← Back to Home</a></p>
      </div>
    </div>
  );
}
