"use client";
import { useState, useEffect } from "react";

const categories = [
  { name: "Financial Calculators", slug: "calculators", icon: "💰", count: "10", desc: "Mortgage, loans, EMI, profit margin, VAT, salary and more" },
  { name: "Text Tools", slug: "text", icon: "📝", count: "12", desc: "Word counter, text case, plagiarism, grammar, typing test" },
  { name: "Image Tools", slug: "image", icon: "🖼️", count: "5", desc: "Background remover, resize, compress, YouTube thumbnails" },
  { name: "PDF Tools", slug: "pdf", icon: "📄", count: "3", desc: "Merge, compress, convert PDF to Word" },
  { name: "Converters", slug: "converters", icon: "🔄", count: "5", desc: "Currency, unit, color, date, number to words converter" },
  { name: "Generators", slug: "generators", icon: "⚡", count: "6", desc: "QR codes, barcodes, passwords, names" },
  { name: "Developer Tools", slug: "dev", icon: "💻", count: "7", desc: "JSON, Base64, hash, SEO audit, CSS, Markdown, IP lookup" },
  { name: "Islamic Tools", slug: "islamic", icon: "🕌", count: "2", desc: "Inheritance, Zakat calculators" },
  { name: "Other", slug: "daily", icon: "🌟", count: "4", desc: "Age, BMI, calorie, stopwatch" },
];

const allTools = [
  { title: "Mortgage Calculator", icon: "🏠", href: "/en/tools/mortgage-calculator", desc: "Monthly payments and amortization schedule", cat: "Financial Calculators" },
  { title: "Loan Calculator", icon: "💰", href: "/en/tools/loan-calculator", desc: "Personal loan payment and interest", cat: "Financial Calculators" },
  { title: "EMI Calculator", icon: "🧮", href: "/en/tools/emi-calculator", desc: "Equated Monthly Installment calculator", cat: "Financial Calculators" },
  { title: "Compound Interest", icon: "📈", href: "/en/tools/compound-interest", desc: "Investment growth with compound interest", cat: "Financial Calculators" },
  { title: "Profit Margin", icon: "📐", href: "/en/tools/profit-margin", desc: "Calculate margin and markup", cat: "Financial Calculators" },
  { title: "Salary Calculator", icon: "💵", href: "/en/tools/salary-calculator", desc: "Gross to net salary after deductions", cat: "Financial Calculators" },
  { title: "VAT Calculator", icon: "🏛️", href: "/en/tools/vat-calculator", desc: "Add or extract VAT at any rate", cat: "Financial Calculators" },
  { title: "Gold Calculator", icon: "🥇", href: "/en/tools/gold-calculator", desc: "Gold value by karat and weight", cat: "Financial Calculators" },
  { title: "Installment Calculator", icon: "📊", href: "/en/tools/installment-calculator", desc: "Calculate installment payment plans", cat: "Financial Calculators" },
  { title: "Calorie Calculator", icon: "🔥", href: "/en/tools/calorie-calculator", desc: "Daily calorie needs for weight goals", cat: "Other" },

  { title: "Word Counter", icon: "📝", href: "/en/tools/word-counter", desc: "Count words, characters, sentences", cat: "Text Tools" },
  { title: "Text Case Converter", icon: "🔤", href: "/en/tools/text-case", desc: "Upper, lower, title, sentence case", cat: "Text Tools" },
  { title: "Text Cleaner", icon: "🧹", href: "/en/tools/text-cleaner", desc: "Remove spaces, breaks, HTML tags", cat: "Text Tools" },
  { title: "Text Compare", icon: "⚖️", href: "/en/tools/text-compare", desc: "Find differences between two texts", cat: "Text Tools" },
  { title: "AI Content Detector", icon: "🤖", href: "/en/tools/ai-content-detector", desc: "Detect AI vs human-written text", cat: "Text Tools" },
  { title: "Number to Words", icon: "🔢", href: "/en/tools/number-to-words", desc: "Convert numbers to written English", cat: "Text Tools" },
  { title: "Plagiarism Checker", icon: "🚫", href: "/en/tools/plagiarism-checker", desc: "Check text originality", cat: "Text Tools" },
  { title: "Grammar Checker", icon: "📝", href: "/en/tools/grammar-checker", desc: "Check spelling and punctuation", cat: "Text Tools" },
  { title: "Paraphrasing Tool", icon: "✏️", href: "/en/tools/paraphrasing-tool", desc: "Rewrite text in a new style", cat: "Text Tools" },
  { title: "Typing Speed Test", icon: "⌨️", href: "/en/tools/typing-test", desc: "Measure your WPM typing speed", cat: "Text Tools" },
  { title: "Social Character Counter", icon: "📱", href: "/en/tools/social-character-counter", desc: "Count chars for Twitter, Instagram, etc", cat: "Text Tools" },
  { title: "Lorem Ipsum Generator", icon: "📄", href: "/en/tools/arabic-lorem", desc: "Generate placeholder text", cat: "Text Tools" },

  { title: "Background Remover", icon: "🖼️", href: "/en/tools/background-remover", desc: "Remove backgrounds with AI", cat: "Image Tools" },
  { title: "Image Resizer", icon: "🖼️", href: "/en/tools/image-resizer", desc: "Change image dimensions online", cat: "Image Tools" },
  { title: "Image Compressor", icon: "📦", href: "/en/tools/image-compressor", desc: "Reduce image file size", cat: "Image Tools" },
  { title: "YT Thumbnail Downloader", icon: "▶️", href: "/en/tools/youtube-thumbnail-downloader", desc: "Download YouTube video thumbnails", cat: "Image Tools" },
  { title: "Image to PDF", icon: "📄", href: "/en/tools/image-to-pdf", desc: "Convert images to PDF", cat: "Image Tools" },

  { title: "PDF Merger", icon: "📎", href: "/en/tools/pdf-merger", desc: "Combine multiple PDFs into one", cat: "PDF Tools" },
  { title: "PDF Compressor", icon: "📦", href: "/en/tools/pdf-compressor", desc: "Reduce PDF file size", cat: "PDF Tools" },
  { title: "PDF to Word", icon: "📄", href: "/en/tools/pdf-to-word", desc: "Convert PDF to editable Word", cat: "PDF Tools" },

  { title: "Currency Converter", icon: "💱", href: "/en/tools/currency-converter", desc: "Convert between world currencies", cat: "Converters" },
  { title: "Unit Converter", icon: "📏", href: "/en/tools/unit-converter", desc: "Length, weight, temperature, volume", cat: "Converters" },
  { title: "Color Converter", icon: "🎨", href: "/en/tools/color-converter", desc: "HEX ↔ RGB ↔ HSL with preview", cat: "Converters" },
  { title: "Hijri Date Converter", icon: "📅", href: "/en/tools/hijri-converter", desc: "Hijri to Gregorian date conversion", cat: "Converters" },
  { title: "Age Calculator", icon: "🎂", href: "/en/tools/age-calculator", desc: "Calculate exact age and zodiac sign", cat: "Other" },

  { title: "QR Code Generator", icon: "🔳", href: "/en/tools/qr-generator", desc: "Generate QR codes from URLs or text", cat: "Generators" },
  { title: "QR Code Reader", icon: "📷", href: "/en/tools/qr-reader", desc: "Read QR codes from images or camera", cat: "Generators" },
  { title: "Barcode Generator", icon: "📊", href: "/en/tools/barcode-generator", desc: "Create barcodes for products", cat: "Generators" },
  { title: "Password Generator", icon: "🔐", href: "/en/tools/password-generator", desc: "Generate secure random passwords", cat: "Generators" },
  { title: "Invoice Generator", icon: "🧾", href: "/en/tools/invoice-generator", desc: "Professional invoice creator", cat: "Generators" },
  { title: "WhatsApp Link", icon: "💬", href: "/en/tools/whatsapp-link", desc: "Direct chat links with pre-filled message", cat: "Generators" },
  { title: "Random Number", icon: "🎲", href: "/en/tools/random-number", desc: "Random numbers in any range", cat: "Generators" },

  { title: "JSON Formatter", icon: "📋", href: "/en/tools/json-formatter", desc: "Format, validate, and minify JSON", cat: "Developer Tools" },
  { title: "Base64 Encoder", icon: "📦", href: "/en/tools/base64-encoder", desc: "Encode and decode Base64 strings", cat: "Developer Tools" },
  { title: "Hash Generator", icon: "🔑", href: "/en/tools/hash-generator", desc: "MD5, SHA-1, SHA-256, SHA-512", cat: "Developer Tools" },
  { title: "SEO Audit", icon: "🔍", href: "/en/tools/seo-audit", desc: "Free website SEO analysis", cat: "Developer Tools" },
  { title: "CSS Minifier", icon: "🎨", href: "/en/tools/css-minifier", desc: "Minify and format CSS code", cat: "Developer Tools" },
  { title: "Markdown Editor", icon: "📝", href: "/en/tools/markdown-editor", desc: "Write Markdown with live preview", cat: "Developer Tools" },
  { title: "IP Lookup", icon: "🌐", href: "/en/tools/ip-lookup", desc: "Info about any IP address", cat: "Developer Tools" },

  { title: "Inheritance Calculator", icon: "📜", href: "/en/tools/inheritance-calculator", desc: "Islamic inheritance (Faraid) distribution", cat: "Islamic Tools" },
  { title: "Zakat Calculator", icon: "🕌", href: "/en/tools/zakat-calculator", desc: "Annual 2.5% zakat obligation", cat: "Islamic Tools" },

  { title: "BMI Calculator", icon: "⚖️", href: "/en/tools/bmi-calculator", desc: "Body Mass Index with metric/imperial", cat: "Other" },
  { title: "Stopwatch & Timer", icon: "⏱️", href: "/en/tools/stopwatch", desc: "Stopwatch with lap tracking", cat: "Other" },
];

const featuredTools = [
  { title: "Mortgage Calculator", desc: "Monthly payments + amortization schedule", icon: "🏠", href: "/en/tools/mortgage-calculator" },
  { title: "BMI Calculator", desc: "Body Mass Index check", icon: "⚖️", href: "/en/tools/bmi-calculator" },
  { title: "QR Code Generator", desc: "Create QR for any link or text", icon: "🔳", href: "/en/tools/qr-generator" },
  { title: "Color Converter", desc: "HEX ↔ RGB ↔ HSL", icon: "🎨", href: "/en/tools/color-converter" },
  { title: "Currency Converter", desc: "Live exchange rates", icon: "💱", href: "/en/tools/currency-converter" },
  { title: "PDF to Word", desc: "Convert PDF to editable text", icon: "📄", href: "/en/tools/pdf-to-word" },
  { title: "Image to Text OCR", icon: "👁️", href: "/en/tools/image-to-text", desc: "Extract text from images using OCR" },
  { title: "AI Essay Writer", icon: "✍️", href: "/en/tools/ai-essay-writer", desc: "Write complete articles with AI", cat: "Text Tools" },
];

export default function EnHome() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  // Hash key → category name mapping (matches Header dropdown keys)
  const hashToCat: Record<string, string> = {
    financial: "Financial Calculators",
    text: "Text Tools",
    image: "Image Tools",
    pdf: "PDF Tools",
    converters: "Converters",
    generators: "Generators",
    dev: "Developer Tools",
    islamic: "Islamic Tools",
    daily: "Other",
  };

  // Read URL hash → activate that category and scroll
  const applyHashFilter = () => {
    const hash = window.location.hash.replace("#", "");
    if (hash && hashToCat[hash]) {
      setActiveCat(hashToCat[hash]);
      // Scroll to All Tools section on mobile
      setTimeout(() => {
        const el = document.querySelector("[data-scroll-target]");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  useEffect(() => {
    // Process initial hash
    applyHashFilter();
    // Listen for hash changes — use multiple events for mobile reliability
    window.addEventListener("hashchange", applyHashFilter);
    window.addEventListener("popstate", applyHashFilter);
    // Also check hash periodically for stubborn mobile browsers
    const interval = setInterval(applyHashFilter, 500);
    return () => {
      window.removeEventListener("hashchange", applyHashFilter);
      window.removeEventListener("popstate", applyHashFilter);
      clearInterval(interval);
    };
  }, []);

  const filtered = allTools.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = !activeCat || t.cat === activeCat;
    return matchSearch && matchCat;
  });

  return (
    <>
      {/* Hero */}
      <section className="hero scroll-fade-in">
        <div className="hero-grid"></div>
        <div className="hero-orb-2"></div>
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          <span>The #1 Free Online Tools Platform</span>
        </div>
        <h1><span className="hero-gradient-text">Every Tool You Need.</span><br />Free. Forever.</h1>
        <p>
          Calculators, converters, generators, PDF tools, and more — 100% free, no signup, and nothing gets uploaded.
        </p>
        <div className="hero-badges">
          <div className="hero-badge-item">
            <span className="b-icon">🔒</span>
            <span>100% Private</span>
          </div>
          <div className="hero-badge-item">
            <span className="b-icon">🆓</span>
            <span>No signup</span>
          </div>
          <div className="hero-badge-item">
            <span className="b-icon">⚡</span>
            <span>Instant results</span>
          </div>
          <div className="hero-badge-item">
            <span className="b-icon">🌐</span>
            <span>Works online</span>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="featured-section scroll-fade-in" style={{ marginTop: "40px" }}>
        <div className="section-header">
          <h2 className="section-title">
            <span className="s-icon">⭐</span>
            Most Popular Tools
          </h2>
        </div>
        <div className="tools-grid-3">
          {featuredTools.map((tool, i) => (
            <a key={i} href={tool.href} className="featured-card card-shine">
              <span className="f-icon">{tool.icon}</span>
              <div className="f-title">{tool.title}</div>
              <div className="f-desc">{tool.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="section-header scroll-fade-in" style={{ marginTop: "56px", marginBottom: "4px" }} data-scroll-target>
        <h2 className="section-title">
          <span className="s-icon">🗂️</span>
          All Tools
        </h2>
      </div>

      {/* Search + Categories */}
      <div className="search-wrap">
        <input
          type="text"
          className="search-input"
          placeholder="Search tools... (e.g. mortgage, QR code, BMI)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="cats">
        <button onClick={() => setActiveCat(null)} className={`cat-btn ${!activeCat ? "active" : ""}`} id="all">🗂️ All</button>
        {categories.map(c => (
          <button key={c.slug} onClick={() => setActiveCat(c.name)} className={`cat-btn ${activeCat === c.name ? "active" : ""}`} id={c.slug}>{c.icon} {c.name}</button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="tools-grid">
          {filtered.map(t => (
            <a key={t.href} href={t.href} className="tool-card card-shine">
              <div className="tool-card-inner">
                <span className="tool-icon">{t.icon}</span>
                <div>
                  <h3 className="tool-title">{t.title}</h3>
                  <p className="tool-desc">{t.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="empty">
          <p className="emoji">🔍</p>
          <p>No results found</p>
          <p className="text-xs text-gray-400 mt-1">Try a different search or category</p>
          <button onClick={() => { setSearch(""); setActiveCat(null); }} className="mt-4 cat-btn">Show all tools</button>
        </div>
      )}

      {/* Stats */}
      <div className="stats scroll-fade-in">
        {[
          { num: "50+", label: "Free Tools", icon: "🔧" },
          { num: "100%", label: "No Signup", icon: "🔓" },
          { num: "0$", label: "Free Forever", icon: "💚" },
          { num: "24/7", label: "Always Available", icon: "🌐" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="icon">{s.icon}</div>
            <div className="num">{s.num}</div>
            <div className="lbl">{s.label}</div>
          </div>
        ))}
      </div>

      {/* SEO Content */}
      <div className="mt-16 p-8 scroll-fade-in bg-white rounded-2xl border border-gray-200" style={{ marginTop: "56px" }}>
        <h2 className="text-xl font-extrabold text-gray-900 mb-4">
          🔧 Adawatak — The Free Online Tools Hub
        </h2>
        <div className="text-sm text-gray-600 leading-8">
          <p className="mb-3">
            Adawatak is a completely free online tools platform with 50+ utilities for everyday use. We offer financial calculators (mortgage, loan, EMI, VAT, profit margin), Islamic tools (inheritance, zakat, prayer times, qibla), text tools (word counter, grammar checker, plagiarism detector), PDF tools (merge, compress, convert), generators (QR codes, barcodes, passwords, invoices), and developer tools (JSON, Base64, hash, SEO audit).
          </p>
          <p className="mb-3">
            All tools run directly in your browser — nothing is uploaded to our servers. Your privacy is our priority. No account needed, no tracking, no ads.
          </p>
          <p>
            Have a tool suggestion? <a href="mailto:contact@adwatak.cloud" className="text-blue-600 font-semibold no-underline hover:underline">Contact us</a> and we'll add it soon.
          </p>
        </div>
      </div>

      {/* Blog CTA */}
      <div className="blog-cta scroll-fade-in">
        <h2>📝 Blog</h2>
        <p>Tips, guides, and insights to help you get the most out of our tools</p>
        <a href="/en/blog" className="cta-btn">
          Browse Blog →
        </a>
      </div>
    </>
  );
}
