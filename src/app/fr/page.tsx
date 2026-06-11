"use client";
import { useState, useEffect } from "react";
import { useSearch } from "../components/SearchProvider";
import { SearchProvider } from "../components/SearchProvider";
import SearchBar from "../components/SearchBar";

const categories = [
  { name: "Financial Calculators", slug: "calculators", icon: "💰", count: "10", desc: "Mortgage, loans, EMI, profit margin, VAT, salary and more" },
  { name: "Text Tools", slug: "text", icon: "📝", count: "12", desc: "Word counter, text case, plagiarism, grammar, typing test" },
  { name: "Image Tools", slug: "image", icon: "🖼️", count: "5", desc: "Background remover, resize, compress, YouTube thumbnails" },
  { name: "PDF Tools", slug: "pdf", icon: "📄", count: "3", desc: "Merge, compress, convert PDF to Word" },
  { name: "Converters", slug: "converters", icon: "🔄", count: "5", desc: "Currency, unit, color, date, number to words converter" },
  { name: "Generators", slug: "generators", icon: "⚡", count: "6", desc: "QR codes, barcodes, passwords, names" },
  { name: "Developer Tools", slug: "dev", icon: "💻", count: "7", desc: "JSON, Base64, hash, SEO audit, CSS, Markdown, IP lookup" },
  { name: "Islamic Tools", slug: "islamic", icon: "🕌", count: "7", desc: "Inheritance, Zakat, Qibla, Prayer Times, Tasbeeh, Umrah, Fidyah" },
  { name: "Other", slug: "daily", icon: "🌟", count: "5", desc: "Age, BMI, calorie, stopwatch, food analyzer" },
];

const allTools = [
  { title: "Mortgage Calculator", icon: "🏠", href: "/fr/tools/mortgage-calculator", desc: "Monthly payments and amortization schedule", cat: "Financial Calculators" },
  { title: "Loan Calculator", icon: "💰", href: "/fr/tools/loan-calculator", desc: "Personal loan payment and interest", cat: "Financial Calculators" },
  { title: "EMI Calculator", icon: "🧮", href: "/fr/tools/emi-calculator", desc: "Equated Monthly Installment calculator", cat: "Financial Calculators" },
  { title: "Compound Interest", icon: "📈", href: "/fr/tools/compound-interest", desc: "Investment growth with compound interest", cat: "Financial Calculators" },
  { title: "Profit Margin", icon: "📐", href: "/fr/tools/profit-margin", desc: "Calculate margin and markup", cat: "Financial Calculators" },
  { title: "Salary Calculator", icon: "💵", href: "/fr/tools/salary-calculator", desc: "Gross to net salary after deductions", cat: "Financial Calculators" },
  { title: "VAT Calculator", icon: "🏛️", href: "/fr/tools/vat-calculator", desc: "Add or extract VAT at any rate", cat: "Financial Calculators" },
  { title: "Gold Calculator", icon: "🥇", href: "/fr/tools/gold-calculator", desc: "Gold value by karat and weight", cat: "Financial Calculators" },
  { title: "Installment Calculator", icon: "📊", href: "/fr/tools/installment-calculator", desc: "Calculate installment payment plans", cat: "Financial Calculators" },
  { title: "Car Installment Calculator", icon: "🚗", href: "/fr/tools/car-installment", desc: "Car loan payment with down payment", cat: "Financial Calculators" },
  { title: "Percentage Calculator", icon: "🧮", href: "/fr/tools/percentage-calculator", desc: "Calculate percentages three ways", cat: "Financial Calculators" },
  { title: "Date Duration Calculator", icon: "📆", href: "/fr/tools/date-duration", desc: "Days between two dates", cat: "Financial Calculators" },
  { title: "Calorie Calculator", icon: "🔥", href: "/fr/tools/calorie-calculator", desc: "Daily calorie needs for weight goals", cat: "Other" },

  { title: "Word Counter", icon: "📝", href: "/fr/tools/word-counter", desc: "Count words, characters, sentences", cat: "Text Tools" },
  { title: "Text Case Converter", icon: "🔤", href: "/fr/tools/text-case", desc: "Upper, lower, title, sentence case", cat: "Text Tools" },
  { title: "Text Cleaner", icon: "🧹", href: "/fr/tools/text-cleaner", desc: "Remove spaces, breaks, HTML tags", cat: "Text Tools" },
  { title: "Text Compare", icon: "⚖️", href: "/fr/tools/text-compare", desc: "Find differences between two texts", cat: "Text Tools" },
  { title: "AI Content Detector", icon: "🤖", href: "/fr/tools/ai-content-detector", desc: "Detect AI vs human-written text", cat: "Text Tools" },
  { title: "Number to Words", icon: "🔢", href: "/fr/tools/number-to-words", desc: "Convert numbers to written English", cat: "Text Tools" },
  { title: "Plagiarism Checker", icon: "🚫", href: "/fr/tools/plagiarism-checker", desc: "Check text originality", cat: "Text Tools" },
  { title: "Grammar Checker", icon: "📝", href: "/fr/tools/grammar-checker", desc: "Check spelling and punctuation", cat: "Text Tools" },
  { title: "Paraphrasing Tool", icon: "✏️", href: "/fr/tools/paraphrasing-tool", desc: "Rewrite text in a new style", cat: "Text Tools" },
  { title: "Typing Speed Test", icon: "⌨️", href: "/fr/tools/typing-test", desc: "Measure your WPM typing speed", cat: "Text Tools" },
  { title: "Social Character Counter", icon: "📱", href: "/fr/tools/social-character-counter", desc: "Count chars for Twitter, Instagram, etc", cat: "Text Tools" },
  { title: "Lorem Ipsum Generator", icon: "📄", href: "/fr/tools/arabic-lorem", desc: "Generate placeholder text", cat: "Text Tools" },
  { title: "Bio Generator", icon: "👤", href: "/fr/tools/bio-generator", desc: "Create attractive social media bio", cat: "Text Tools" },

  { title: "Background Remover", icon: "🖼️", href: "/fr/tools/background-remover", desc: "Remove backgrounds with AI", cat: "Image Tools" },
  { title: "Image Resizer", icon: "🖼️", href: "/fr/tools/image-resizer", desc: "Change image dimensions online", cat: "Image Tools" },
  { title: "Image Compressor", icon: "📦", href: "/fr/tools/image-compressor", desc: "Reduce image file size", cat: "Image Tools" },
  { title: "YT Thumbnail Downloader", icon: "▶️", href: "/fr/tools/youtube-thumbnail-downloader", desc: "Download YouTube video thumbnails", cat: "Image Tools" },
  { title: "Image to PDF", icon: "📄", href: "/fr/tools/image-to-pdf", desc: "Convert images to PDF", cat: "Image Tools" },

  { title: "PDF Merger", icon: "📎", href: "/fr/tools/pdf-merger", desc: "Combine multiple PDFs into one", cat: "PDF Tools" },
  { title: "PDF Splitter", icon: "✂️", href: "/fr/tools/pdf-splitter", desc: "Split PDF into separate pages", cat: "PDF Tools" },
  { title: "PDF Compressor", icon: "📦", href: "/fr/tools/pdf-compressor", desc: "Reduce PDF file size", cat: "PDF Tools" },
  { title: "PDF to Word", icon: "📄", href: "/fr/tools/pdf-to-word", desc: "Convert PDF to editable Word", cat: "PDF Tools" },

  { title: "Currency Converter", icon: "💱", href: "/fr/tools/currency-converter", desc: "Convert between world currencies", cat: "Converters" },
  { title: "Unit Converter", icon: "📏", href: "/fr/tools/unit-converter", desc: "Length, weight, temperature, volume", cat: "Converters" },
  { title: "Color Converter", icon: "🎨", href: "/fr/tools/color-converter", desc: "HEX ↔ RGB ↔ HSL with preview", cat: "Converters" },
  { title: "Hijri Date Converter", icon: "📅", href: "/fr/tools/hijri-converter", desc: "Hijri to Gregorian date conversion", cat: "Converters" },
  { title: "Temperature Converter", icon: "🌡️", href: "/fr/tools/temperature-converter", desc: "Celsius, Fahrenheit, Kelvin conversion", cat: "Converters" },
  { title: "Timezone Converter", icon: "🕐", href: "/fr/tools/timezone-converter", desc: "Convert time between timezones", cat: "Converters" },
  { title: "Pixel Converter", icon: "📏", href: "/fr/tools/pixel-converter", desc: "Convert pixels to cm, inches, points", cat: "Converters" },
  { title: "Age Calculator", icon: "🎂", href: "/fr/tools/age-calculator", desc: "Calculate exact age and zodiac sign", cat: "Other" },

  { title: "QR Code Generator", icon: "🔳", href: "/fr/tools/qr-generator", desc: "Generate QR codes from URLs or text", cat: "Generators" },
  { title: "QR Code Reader", icon: "📷", href: "/fr/tools/qr-reader", desc: "Read QR codes from images or camera", cat: "Generators" },
  { title: "Barcode Generator", icon: "📊", href: "/fr/tools/barcode-generator", desc: "Create barcodes for products", cat: "Generators" },
  { title: "Password Generator", icon: "🔐", href: "/fr/tools/password-generator", desc: "Generate secure random passwords", cat: "Generators" },
  { title: "Invoice Generator", icon: "🧾", href: "/fr/tools/invoice-generator", desc: "Professional invoice creator", cat: "Generators" },
  { title: "WhatsApp Link", icon: "💬", href: "/fr/tools/whatsapp-link", desc: "Direct chat links with pre-filled message", cat: "Generators" },
  { title: "Random Number", icon: "🎲", href: "/fr/tools/random-number", desc: "Random numbers in any range", cat: "Generators" },
  { title: "Name Generator", icon: "👤", href: "/fr/tools/name-generator", desc: "Generate Arabic and English names", cat: "Generators" },
  { title: "AI Essay Writer", icon: "✍️", href: "/fr/tools/ai-essay-writer", desc: "Write complete articles with AI", cat: "Generators" },

  { title: "JSON Formatter", icon: "📋", href: "/fr/tools/json-formatter", desc: "Format, validate, and minify JSON", cat: "Developer Tools" },
  { title: "Base64 Encoder", icon: "📦", href: "/fr/tools/base64-encoder", desc: "Encode and decode Base64 strings", cat: "Developer Tools" },
  { title: "Hash Generator", icon: "🔑", href: "/fr/tools/hash-generator", desc: "MD5, SHA-1, SHA-256, SHA-512", cat: "Developer Tools" },
  { title: "SEO Audit", icon: "🔍", href: "/fr/tools/seo-audit", desc: "Free website SEO analysis", cat: "Developer Tools" },
  { title: "CSS Minifier", icon: "🎨", href: "/fr/tools/css-minifier", desc: "Minify and format CSS code", cat: "Developer Tools" },
  { title: "Markdown Editor", icon: "📝", href: "/fr/tools/markdown-editor", desc: "Write Markdown with live preview", cat: "Developer Tools" },
  { title: "IP Lookup", icon: "🌐", href: "/fr/tools/ip-lookup", desc: "Info about any IP address", cat: "Developer Tools" },
  { title: "URL Encoder/Decoder", icon: "🔗", href: "/fr/tools/encoder", desc: "Encode and decode URLs", cat: "Developer Tools" },
  { title: "Encryption Tool", icon: "🔐", href: "/fr/tools/encryption-tool", desc: "Encrypt and decrypt text securely", cat: "Developer Tools" },
  { title: "SEO Content Generator", icon: "📝", href: "/fr/tools/seo-content-generator", desc: "Generate SEO-optimized content", cat: "Developer Tools" },
  { title: "UUID Generator", icon: "🆔", href: "/fr/tools/uuid-generator", desc: "Generate UUID v4/v7 identifiers", cat: "Developer Tools" },
  { title: "Keyword Research Tool", icon: "🔎", href: "/fr/tools/keyword-research", desc: "Research keywords for SEO", cat: "Developer Tools" },

  { title: "Inheritance Calculator", icon: "📜", href: "/fr/tools/inheritance-calculator", desc: "Islamic inheritance (Faraid) distribution", cat: "Islamic Tools" },
  { title: "Zakat Calculator", icon: "🕌", href: "/fr/tools/zakat-calculator", desc: "Annual 2.5% zakat obligation", cat: "Islamic Tools" },
  { title: "Qibla Direction", icon: "🧭", href: "/fr/tools/qibla-direction", desc: "Find Qibla direction from your location", cat: "Islamic Tools" },
  { title: "Prayer Times", icon: "🕐", href: "/fr/tools/prayer-times", desc: "Prayer times by your location", cat: "Islamic Tools" },
  { title: "Tasbeeh Counter", icon: "📿", href: "/fr/tools/tasbeeh-counter", desc: "Digital Tasbeeh for daily dhikr", cat: "Islamic Tools" },
  { title: "Umrah Calculator", icon: "🕋", href: "/fr/tools/umrah-calculator", desc: "Calculate Umrah costs and step-by-step guide", cat: "Islamic Tools" },
  { title: "Fidyah & Kaffarah", icon: "⚖️", href: "/fr/tools/fidyah-kaffarah", desc: "Calculate Fidyah & Kaffarah for oath, Ramadan, Zhihar", cat: "Islamic Tools" },

  { title: "BMI Calculator", icon: "⚖️", href: "/fr/tools/bmi-calculator", desc: "Body Mass Index with metric/imperial", cat: "Other" },
  { title: "Ideal Weight Calculator", icon: "⚖️", href: "/fr/tools/ideal-weight", desc: "Calculate ideal weight based on height", cat: "Other" },
  { title: "Food Calorie Analyzer", icon: "📸", href: "/fr/tools/food-calorie-analyzer", desc: "Snap a photo, get instant calorie analysis", cat: "Other" },
  { title: "Stopwatch & Timer", icon: "⏱️", href: "/fr/tools/stopwatch", desc: "Stopwatch with lap tracking", cat: "Other" },
];

const featuredTools = [
  { title: "Mortgage Calculator", desc: "Monthly payments + amortization schedule", icon: "🏠", href: "/fr/tools/mortgage-calculator" },
  { title: "BMI Calculator", desc: "Body Mass Index check", icon: "⚖️", href: "/fr/tools/bmi-calculator" },
  { title: "QR Code Generator", desc: "Create QR for any link or text", icon: "🔳", href: "/fr/tools/qr-generator" },
  { title: "Color Converter", desc: "HEX ↔ RGB ↔ HSL", icon: "🎨", href: "/fr/tools/color-converter" },
  { title: "Currency Converter", desc: "Live exchange rates", icon: "💱", href: "/fr/tools/currency-converter" },
  { title: "PDF to Word", desc: "Convert PDF to editable text", icon: "📄", href: "/fr/tools/pdf-to-word" },
  { title: "Image to Text OCR", icon: "👁️", href: "/fr/tools/image-to-text", desc: "Extract text from images using OCR" },
  { title: "Food Calorie Analyzer", icon: "📸", href: "/fr/tools/food-calorie-analyzer", desc: "Snap a photo, get instant calorie info" },
  { title: "AI Essay Writer", icon: "✍️", href: "/fr/tools/ai-essay-writer", desc: "Write complete articles with AI", cat: "Text Tools" },
  { title: "Keyword Research Tool", icon: "🔎", href: "/fr/tools/keyword-research", desc: "Research keywords for SEO optimization", cat: "Developer Tools" },
];

function EnHomeInner() {
  const { search } = useSearch();
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

  // Read URL hash → activate that category
  const applyHashFilter = () => {
    const hash = window.location.hash.replace("#", "");
    if (hash && hashToCat[hash]) {
      setActiveCat(hashToCat[hash]);
    } else if (!hash) {
      setActiveCat(null);
    }
  };

  // Separate scroll function — only called on hash events
  const scrollToTools = () => {
    const hash = window.location.hash.replace("#", "");
    if (hash && hashToCat[hash]) {
      setTimeout(() => {
        const el = document.querySelector("[data-tools-section]");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  };

  useEffect(() => {
    applyHashFilter();
    // Don't scroll on mount — only on hash changes
    const onHash = () => { applyHashFilter(); scrollToTools(); };
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onHash);
    };
  }, []);

  // Reverse map: category name → hash key
  const catToHash: Record<string, string> = {};
  for (const [k, v] of Object.entries(hashToCat)) { catToHash[v] = k; }

  const filtered = allTools.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = !activeCat || t.cat === activeCat;
    return matchSearch && matchCat;
  });

  const isSearching = search.trim().length > 0;

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

      {/* Smart Search */}
      <div className="mt-8 mb-4" data-scroll-target>
        <SearchBar lang="fr" />
      </div>

      {/* Featured / Popular Tools — hides when searching or category selected */}
      {!isSearching && !activeCat && (
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
      )}

      {/* All Tools header — hides when searching */}
      {!isSearching && (
        <div className="section-header scroll-fade-in" style={{ marginTop: "56px", marginBottom: "4px" }}>
          <h2 className="section-title">
            <span className="s-icon">🗂️</span>
            All Tools
          </h2>
        </div>
      )}

      {/* Search results header */}
      {isSearching && (
        <div className="search-results-header">
          <span className="srh-icon">🔍</span>
          <span>Search results for: <strong>"{search}"</strong></span>
          <span className="srh-count">{filtered.length} tools</span>
        </div>
      )}

      {/* Categories — hidden when searching */}
      {!isSearching && (
        <div className="cats">
          <button onClick={() => { setActiveCat(null); window.location.hash = ""; }} className={`cat-btn ${!activeCat ? "active" : ""}`} id="all">🗂️ All</button>
          {categories.map(c => (
            <button key={c.slug} onClick={() => { setActiveCat(c.name); window.location.hash = catToHash[c.name] || ""; }} className={`cat-btn ${activeCat === c.name ? "active" : ""}`} id={c.slug}>{c.icon} {c.name}</button>
          ))}
        </div>
      )}

      <div data-tools-section>
        {filtered.length > 0 ? (
          <div className="tools-grid">
            {filtered.map((t, i) => (
              <a key={i} href={t.href} className="tool-card card-shine">
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
            <button onClick={() => { /* The search state is managed by SearchProvider so this resets via the SearchBar clear */ }} className="mt-4 cat-btn">Show all tools</button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="stats scroll-fade-in">
        {[
          { num: "80+", label: "Free Tools", icon: "🔧" },
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
            Adawatak is a completely free online tools platform with 80+ utilities for everyday use. We offer financial calculators (mortgage, loan, EMI, VAT, profit margin), Islamic tools (inheritance, zakat, prayer times, qibla), text tools (word counter, grammar checker, plagiarism detector), PDF tools (merge, compress, convert), generators (QR codes, barcodes, passwords, invoices), and developer tools (JSON, Base64, hash, SEO audit).
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
        <a href="/fr/blog" className="cta-btn">
          Browse Blog →
        </a>
      </div>
    </>
  );
}

export default function EnHome() {
  return (
    <SearchProvider>
      <EnHomeInner />
    </SearchProvider>
  );
}
