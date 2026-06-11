import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://adwatak.cloud/fr/category/text",
    languages: {
      "ar": "https://adwatak.cloud/category/text",
      "fr": "https://adwatak.cloud/fr/category/text",
      "tr": "https://adwatak.cloud/tr/category/text",
      "id": "https://adwatak.cloud/id/category/text",
      "x-default": "https://adwatak.cloud/category/text"
    },
  },
  title: "Text Tools — Adawatak",
  description: "Word counter, text case converter, number to words, text cleaner, text compare, and more text editing tools.",
};

const tools = [
  { title: "Word Counter", icon: "📝", href: "/fr/tools/word-counter", desc: "Count words, characters, and sentences" },
  { title: "Text Case Converter", icon: "🔤", href: "/fr/tools/text-case", desc: "Upper, lower, title, sentence case" },
  { title: "Numbers to Words", icon: "🔢", href: "/fr/tools/number-to-words", desc: "Convert numbers to English words" },
  { title: "Arabic Lorem Ipsum", icon: "📃", href: "/fr/tools/arabic-lorem", desc: "Arabic placeholder text for designs" },
  { title: "Text Cleaner", icon: "🧹", href: "/fr/tools/text-cleaner", desc: "Remove spaces, breaks, HTML tags" },
  { title: "Text Compare", icon: "⚖️", href: "/fr/tools/text-compare", desc: "Compare two texts and find differences" },
  { title: "Plagiarism Checker", icon: "🚫", href: "/fr/tools/plagiarism-checker", desc: "Check text originality" },
  { title: "Grammar Checker", icon: "✍️", href: "/fr/tools/grammar-checker", desc: "Check spelling and punctuation" },
  { title: "Paraphrasing Tool", icon: "✏️", href: "/fr/tools/paraphrasing-tool", desc: "Rewrite text in a new style" },
  { title: "AI Content Detector", icon: "🤖", href: "/fr/tools/ai-content-detector", desc: "Detect AI vs human-written text" },
];

export default function TextCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>📝 Text Tools</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Edit, format, compare, and analyze text with our free text tools.</p>
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
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>All text processing is done in your browser. Nothing is uploaded to any server. Privacy guaranteed. <a href="/en" style={{ color: "#2563eb" }}>← Back to Home</a></p>
      </div>
    </div>
  );
}
