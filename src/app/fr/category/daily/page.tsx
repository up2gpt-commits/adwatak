import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://adwatak.cloud/fr/category/daily",
    languages: {
      "ar": "https://adwatak.cloud/category/daily",
      "fr": "https://adwatak.cloud/fr/category/daily",
      "tr": "https://adwatak.cloud/tr/category/daily",
      "id": "https://adwatak.cloud/id/category/daily",
      "x-default": "https://adwatak.cloud/category/daily"
    },
  },
  title: "Daily Tools — Adawatak",
  description: "BMI calculator, stopwatch, social character counter. Useful everyday tools.",
};

const tools = [
  { title: "BMI Calculator", icon: "⚖️", href: "/fr/tools/bmi-calculator", desc: "Body Mass Index — check your ideal weight" },
  { title: "Stopwatch + Timer", icon: "⏱️", href: "/fr/tools/stopwatch", desc: "Stopwatch with laps and countdown timer" },
  { title: "Social Character Counter", icon: "📱", href: "/fr/tools/social-character-counter", desc: "Twitter, Instagram, TikTok & more" },
];

export default function DailyCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>🌟 Daily Tools</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Simple and useful tools for your everyday needs.</p>
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
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>All tools run 100% in your browser — no uploads, no servers. Your data stays on your device. <a href="/en" style={{ color: "#2563eb" }}>← Back to Home</a></p>
      </div>
    </div>
  );
}
