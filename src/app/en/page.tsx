"use client";
import { useState } from "react";

const categories = [
  { name: "Financial Calculators", slug: "calculators", icon: "💰", count: "10+", desc: "Mortgage, loans, EMI, compound interest, profit margin and more" },
  { name: "Islamic Tools", slug: "islamic", icon: "🕌", count: "6", desc: "Inheritance, Zakat, Hijri converter, prayer times, qibla" },
  { name: "Text Tools", slug: "text", icon: "📝", count: "6+", desc: "Word counter, text cleaner, case converter, lorem ipsum" },
  { name: "Converters", slug: "converters", icon: "🔄", count: "5+", desc: "Unit converter, color converter, currency, numbers to words" },
  { name: "Generators", slug: "generators", icon: "⚡", count: "6+", desc: "QR codes, passwords, invoice, random numbers, names" },
  { name: "Developer Tools", slug: "dev", icon: "💻", count: "4+", desc: "JSON formatter, Base64, hash generator, encoder" },
  { name: "Daily Tools", slug: "daily", icon: "🏠", count: "4+", desc: "BMI, calories, age calculator, stopwatch" },
];

const allTools = [
  { title: "Mortgage Calculator", icon: "🏠", href: "/en/tools/mortgage-calculator", desc: "Calculate monthly payments and amortization", cat: "Financial Calculators" },
  { title: "Loan Calculator", icon: "💰", href: "/en/tools/loan-calculator", desc: "Personal loan payment and interest calculator", cat: "Financial Calculators" },
  { title: "EMI Calculator", icon: "🧮", href: "/en/tools/emi-calculator", desc: "Equated Monthly Installment calculator", cat: "Financial Calculators" },
  { title: "Compound Interest", icon: "📈", href: "/en/tools/compound-interest", desc: "Investment growth with compound interest", cat: "Financial Calculators" },
  { title: "Profit Margin", icon: "📐", href: "/en/tools/profit-margin", desc: "Calculate profit margin and markup", cat: "Financial Calculators" },
  { title: "Salary Calculator", icon: "💵", href: "/en/tools/salary-calculator", desc: "Gross to net salary after deductions", cat: "Financial Calculators" },
  { title: "VAT Calculator", icon: "🏛️", href: "/en/tools/vat-calculator", desc: "Add or extract VAT at any rate", cat: "Financial Calculators" },
  { title: "Gold Calculator", icon: "🥇", href: "/en/tools/gold-calculator", desc: "Calculate gold value by karat and weight", cat: "Financial Calculators" },
  { title: "Inheritance Calculator", icon: "🕌", href: "/en/tools/inheritance-calculator", desc: "Islamic inheritance (Faraid) distribution", cat: "Islamic Tools" },
  { title: "Zakat Calculator", icon: "🕌", href: "/en/tools/zakat-calculator", desc: "Calculate your annual 2.5% zakat obligation", cat: "Islamic Tools" },
  { title: "Hijri Date Converter", icon: "📅", href: "/en/tools/hijri-converter", desc: "Convert between Hijri and Gregorian calendars", cat: "Islamic Tools" },
  { title: "Word Counter", icon: "📝", href: "/en/tools/word-counter", desc: "Count words, characters, and sentences", cat: "Text Tools" },
  { title: "Text Case", icon: "🔤", href: "/en/tools/text-case", desc: "Convert between upper, lower, title, sentence case", cat: "Text Tools" },
  { title: "Text Cleaner", icon: "🧹", href: "/en/tools/text-cleaner", desc: "Remove extra spaces, line breaks, HTML tags", cat: "Text Tools" },
  { title: "Text Compare", icon: "⚖️", href: "/en/tools/text-compare", desc: "Find differences between two texts", cat: "Text Tools" },
  { title: "Number to Words", icon: "🔢", href: "/en/tools/number-to-words", desc: "Convert any number to written English", cat: "Text Tools" },
  { title: "Lorem Ipsum", icon: "📄", href: "/en/tools/arabic-lorem", desc: "Generate placeholder text for designs", cat: "Generators" },
  { title: "Unit Converter", icon: "📏", href: "/en/tools/unit-converter", desc: "Convert length, weight, temperature, volume", cat: "Converters" },
  { title: "Random Number", icon: "🎲", href: "/en/tools/random-number", desc: "Generate random numbers in any range", cat: "Generators" },
  { title: "QR Code Generator", icon: "🔳", href: "/en/tools/qr-generator", desc: "Generate QR codes from any text or URL", cat: "Generators" },
  { title: "Password Generator", icon: "🔐", href: "/en/tools/password-generator", desc: "Generate secure random passwords", cat: "Generators" },
  { title: "WhatsApp Link", icon: "💬", href: "/en/tools/whatsapp-link", desc: "Create direct chat links with pre-filled message", cat: "Daily Tools" },
  { title: "JSON Formatter", icon: "📋", href: "/en/tools/json-formatter", desc: "Format, validate, and minify JSON", cat: "Developer Tools" },
  { title: "Base64 Encoder", icon: "📦", href: "/en/tools/base64-encoder", desc: "Encode and decode Base64 strings", cat: "Developer Tools" },
  { title: "Hash Generator", icon: "🔑", href: "/en/tools/hash-generator", desc: "Generate SHA-1, SHA-256, SHA-512 hashes", cat: "Developer Tools" },
  { title: "BMI Calculator", icon: "🏥", href: "/en/tools/bmi-calculator", desc: "Body Mass Index calculator with metric/imperial", cat: "Daily Tools" },
  { title: "Calorie Calculator", icon: "🍎", href: "/en/tools/calorie-calculator", desc: "Daily calorie needs for loss, maintenance, or gain", cat: "Daily Tools" },
  { title: "Age Calculator", icon: "🎂", href: "/en/tools/age-calculator", desc: "Calculate exact age in years, months, and days", cat: "Daily Tools" },
  { title: "Stopwatch", icon: "⏱️", href: "/en/tools/stopwatch", desc: "Online stopwatch with lap tracking", cat: "Daily Tools" },
];

export default function EnHome() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const filtered = allTools.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = !activeCat || t.cat === activeCat;
    return matchSearch && matchCat;
  });

  return (
    <>
      <div className="hero">
        <span className="badge">40+ Free Tools — No Signup</span>
        <h1>Every Tool You Need.<br />Free. Forever.</h1>
        <p>Calculators, converters, generators, and developer tools — all running in your browser. Nothing gets uploaded. Nothing gets tracked.</p>
      </div>

      <div className="search-wrap">
        <input type="text" className="search-input" placeholder="Search tools... (e.g. mortgage, QR code, BMI)" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="cats">
        <button className={`cat-btn ${!activeCat ? "active" : ""}`} onClick={() => setActiveCat(null)}>All ({allTools.length})</button>
        {categories.map(c => (
          <button key={c.slug} className={`cat-btn ${activeCat === c.name ? "active" : ""}`} onClick={() => setActiveCat(activeCat === c.name ? null : c.name)}>
            {c.icon} {c.name} ({c.count})
          </button>
        ))}
      </div>

      <div className="tools-grid">
        {filtered.map((t, i) => (
          <a key={i} href={t.href} className="tool-card">
            <div className="tool-card-inner">
              <span className="tool-icon">{t.icon}</span>
              <div>
                <div className="tool-title">{t.title}</div>
                <div className="tool-desc">{t.desc}</div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty">
          <div className="emoji">🔍</div>
          <p>No tools found. Try a different search term.</p>
        </div>
      )}

      <div className="stats">
        {[
          { icon: "🔧", num: "40+", lbl: "Tools" },
          { icon: "🌍", num: "2", lbl: "Languages" },
          { icon: "🔒", num: "100%", lbl: "Private" },
          { icon: "💰", num: "Free", lbl: "Forever" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="icon">{s.icon}</div>
            <div className="num">{s.num}</div>
            <div className="lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      <div className="blog-cta">
        <h2>Why Adawatak?</h2>
        <p>Most tool sites track you, serve ads, or require signup. We don't. Every tool runs in your browser. Your data stays on your device.</p>
        <a href="/en/blog" className="cta-btn">Read the Story →</a>
      </div>
    </>
  );
}
