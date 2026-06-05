"use client";
import { useState, useEffect } from "react";

interface HeaderProps {
  lang?: string;
}

// 🌍 Language config — just add a new entry for any future language
const LANGUAGES = [
  { code: "ar", label: "عربي", labelEn: "Arabic", flag: "🇸🇦", home: "/", homeLabel: "الرئيسية" },
  { code: "en", label: "English", labelEn: "English", flag: "🇬🇧", home: "/en", homeLabel: "Home" },
  { code: "tr", label: "Türkçe", labelEn: "Turkish", flag: "🇹🇷", home: "/tr", homeLabel: "Ana Sayfa" },
  { code: "id", label: "Bahasa Indonesia", labelEn: "Indonesian", flag: "🇮🇩", home: "/id", homeLabel: "Beranda" },
];

// Category labels per language (same category keys for all)
const CATEGORY_LABELS: Record<string, { key: string; label: string }[]> = {
  ar: [
    { key: "financial", label: "💰 حاسبات مالية" },
    { key: "text", label: "📝 أدوات نصية" },
    { key: "image", label: "🖼️ أدوات الصور" },
    { key: "pdf", label: "📄 أدوات PDF" },
    { key: "converters", label: "🔄 محولات" },
    { key: "generators", label: "⚡ مولدات" },
    { key: "dev", label: "💻 تطوير ويب" },
    { key: "islamic", label: "🕌 أدوات إسلامية" },
    { key: "daily", label: "🌟 أخرى" },
  ],
  en: [
    { key: "financial", label: "💰 Financial" },
    { key: "text", label: "📝 Text Tools" },
    { key: "image", label: "🖼️ Image Tools" },
    { key: "pdf", label: "📄 PDF Tools" },
    { key: "converters", label: "🔄 Converters" },
    { key: "generators", label: "⚡ Generators" },
    { key: "dev", label: "💻 Dev Tools" },
    { key: "islamic", label: "🕌 Islamic Tools" },
    { key: "daily", label: "🌟 Other" },
  ],
  tr: [
    { key: "financial", label: "💰 Finansal" },
    { key: "text", label: "📝 Metin" },
    { key: "image", label: "🖼️ Görsel" },
    { key: "pdf", label: "📄 PDF" },
    { key: "converters", label: "🔄 Dönüştürücüler" },
    { key: "generators", label: "⚡ Oluşturucular" },
    { key: "dev", label: "💻 Geliştirici" },
    { key: "islamic", label: "🕌 İslami" },
    { key: "daily", label: "🌟 Diğer" },
  ],
  id: [
    { key: "financial", label: "💰 Keuangan" },
    { key: "text", label: "📝 Teks" },
    { key: "image", label: "🖼️ Gambar" },
    { key: "pdf", label: "📄 PDF" },
    { key: "converters", label: "🔄 Konverter" },
    { key: "generators", label: "⚡ Generator" },
    { key: "dev", label: "💻 Pengembang" },
    { key: "islamic", label: "🕌 Islami" },
    { key: "daily", label: "🌟 Lainnya" },
  ],
};

// Nav links per language
const NAV_LINKS: Record<string, { href: string; label: string; icon: string; mobileIcon: string }[]> = {
  ar: [
    { href: "/", label: "الرئيسية", icon: "", mobileIcon: "🏠" },
    { href: "/blog", label: "المدونة", icon: "📝", mobileIcon: "📝" },
    { href: "/about", label: "عن الموقع", icon: "", mobileIcon: "ℹ️" },
    { href: "/privacy", label: "الخصوصية", icon: "", mobileIcon: "🔒" },
    { href: "mailto:contact@adwatak.cloud", label: "تواصل معنا", icon: "", mobileIcon: "📧" },
  ],
  en: [
    { href: "/en", label: "Home", icon: "", mobileIcon: "🏠" },
    { href: "/en/blog", label: "Blog", icon: "📝", mobileIcon: "📝" },
    { href: "/en/about", label: "About", icon: "", mobileIcon: "ℹ️" },
    { href: "/en/privacy", label: "Privacy", icon: "", mobileIcon: "🔒" },
    { href: "mailto:contact@adwatak.cloud", label: "Contact", icon: "", mobileIcon: "📧" },
  ],
  tr: [
    { href: "/tr", label: "Ana Sayfa", icon: "", mobileIcon: "🏠" },
    { href: "/tr/blog", label: "Blog", icon: "📝", mobileIcon: "📝" },
    { href: "/tr/about", label: "Hakkında", icon: "", mobileIcon: "ℹ️" },
    { href: "/tr/privacy", label: "Gizlilik", icon: "", mobileIcon: "🔒" },
    { href: "mailto:contact@adwatak.cloud", label: "İletişim", icon: "", mobileIcon: "📧" },
  ],
  id: [
    { href: "/id", label: "Beranda", icon: "", mobileIcon: "🏠" },
    { href: "/id/blog", label: "Blog", icon: "📝", mobileIcon: "📝" },
    { href: "/id/about", label: "Tentang", icon: "", mobileIcon: "ℹ️" },
    { href: "/id/privacy", label: "Privasi", icon: "", mobileIcon: "🔒" },
    { href: "mailto:contact@adwatak.cloud", label: "Kontak", icon: "", mobileIcon: "📧" },
  ],
};

// Dropdown labels per language
const DD_LABELS: Record<string, string> = {
  ar: "كل الأدوات",
  en: "All Tools",
  tr: "Tüm Araçlar",
  id: "Semua Alat",
};

// Brand names
const BRAND_NAMES: Record<string, string> = {
  ar: "أدواتك",
  en: "Adawatak",
  tr: "Adwatak",
  id: "Adwatak",
};

export default function Header({ lang = "ar" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false); // categories dropdown
  const [langOpen, setLangOpen] = useState(false); // language selector
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Init theme on mount — only use saved preference, not system
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  // Resolve language (fallback to 'en' for unknown codes)
  const activeLang = LANGUAGES.find(l => l.code === lang) || LANGUAGES[1];
  const isRtl = activeLang.code === "ar";

  const categories = CATEGORY_LABELS[activeLang.code] || CATEGORY_LABELS.en;
  const catLink = activeLang.home;
  const navLinks = NAV_LINKS[activeLang.code] || NAV_LINKS.en;
  const ddLabel = DD_LABELS[activeLang.code] || DD_LABELS.en;
  const brandName = BRAND_NAMES[activeLang.code] || BRAND_NAMES.en;

  // Desktop nav: show first 3 links (home, blog, about)
  const desktopLinks = navLinks.slice(0, 3);

  const switchLang = (code: string) => {
    const target = LANGUAGES.find(l => l.code === code);
    if (!target) return;
    if (target.code === activeLang.code) return;

    // Try to preserve current page context
    // Arabic uses no prefix; other langs use /<code>/ prefix
    const currentPath = window.location.pathname;
    const langPrefixes = LANGUAGES.map(l => `/${l.code}`).filter(p => p !== "/");

    // Strip any existing lang prefix to get a "base" path
    let basePath = currentPath;
    for (const p of langPrefixes) {
      if (basePath === p || basePath.startsWith(p + "/")) {
        basePath = basePath.slice(p.length) || "/";
        break;
      }
    }

    // Build target URL
    let targetUrl: string;
    if (target.code === "ar") {
      targetUrl = basePath; // Arabic has no prefix
    } else {
      targetUrl = `${target.home.replace(/\/$/, "")}${basePath === "/" ? "" : basePath}`;
    }

    // Use SPA navigation if same path, hard nav otherwise
    if (targetUrl === currentPath) return;
    window.location.href = targetUrl;
  };

  return (
    <header className="site-header scroll-shadow-header">
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <a href={activeLang.home} className="logo">
            <span className="logo-icon">🔧</span>
            <span className="logo-text">{brandName}</span>
          </a>

          {/* ===== DESKTOP ===== */}
          <nav className="nav nav-desktop">
            {desktopLinks.map((link, i) => (
              <a key={i} href={link.href}>
                {link.icon && <>{link.icon} </>}{link.label}
              </a>
            ))}

            {/* Categories dropdown */}
            <div className="dd-desktop"
              onMouseEnter={() => setDdOpen(true)}
              onMouseLeave={() => setDdOpen(false)}>
              <button className="dd-btn" onClick={() => setDdOpen(!ddOpen)}
                aria-label={ddLabel}>
                🗂️ {ddLabel} <span className="dd-arrow">▾</span>
              </button>
              {ddOpen && (
                <div className="dd-menu">
                  {categories.map((cat) => (
                    <a key={cat.key} href={`${catLink}#${cat.key}`}
                      className="dd-item" onClick={() => setDdOpen(false)}>
                      {cat.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* ===== LANGUAGE SELECTOR (DESKTOP) ===== */}
            <div className="lang-wrap"
              onMouseEnter={() => setLangOpen(true)}
              onMouseLeave={() => setLangOpen(false)}>
              <button className="lang-btn"
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Switch language">
                {activeLang.flag} <span className="lang-label-desktop">{activeLang.label}</span>
                <span className="dd-arrow">▾</span>
              </button>
              {langOpen && (
                <div className="lang-menu">
                  {LANGUAGES.map((l) => (
                    <button key={l.code}
                      className={`lang-item ${l.code === activeLang.code ? "active" : ""}`}
                      onClick={() => { setLangOpen(false); switchLang(l.code); }}>
                      <span className="lang-item-flag">{l.flag}</span>
                      <span className="lang-item-label">{l.label}</span>
                      <span className="lang-item-sublabel">{l.labelEn}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ===== THEME TOGGLE (DESKTOP) ===== */}
            <button className="theme-toggle" onClick={toggleTheme}
              aria-label={theme === "light" ? "Dark mode" : "Light mode"}
              title={theme === "light" ? "الوضع الليلي" : "الوضع النهاري"}>
              <span className="theme-toggle-icon">{theme === "light" ? "🌙" : "☀️"}</span>
            </button>
          </nav>

          {/* ===== MOBILE HEADER ===== */}
          <div className="mobile-header-actions">
            {/* Language Dropdown (Mobile) */}
            <div className="lang-mobile-wrap">
              <button className="lang-btn-mobile"
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Switch language">
                {activeLang.flag}
                <span className="dd-arrow">{langOpen ? "▴" : "▾"}</span>
              </button>
              {langOpen && (
                <div className="lang-menu-mobile">
                  {LANGUAGES.map((l) => (
                    <button key={l.code}
                      className={`lang-item ${l.code === activeLang.code ? "active" : ""}`}
                      onClick={() => { setLangOpen(false); switchLang(l.code); }}>
                      <span className="lang-item-flag">{l.flag}</span>
                      <span className="lang-item-label">{l.label}</span>
                      <span className="lang-item-sublabel">{l.labelEn}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Categories dropdown (Mobile) */}
            <div className="dd-mobile-wrap">
              <button className="dd-btn-mobile" onClick={() => setDdOpen(!ddOpen)}
                aria-label={ddLabel}>
                🗂️ <span className="dd-arrow">{ddOpen ? "▴" : "▾"}</span>
              </button>
              {ddOpen && (
                <div className="dd-menu-mobile">
                  {categories.map((cat) => (
                    <a key={cat.key} href={`${catLink}#${cat.key}`} onClick={() => setDdOpen(false)}
                      className="dd-mobile-item">
                      {cat.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* ===== THEME TOGGLE (MOBILE) ===== */}
            <button className="theme-toggle-btn-mobile" onClick={toggleTheme}
              aria-label={theme === "light" ? "Dark mode" : "Light mode"}>
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* Hamburger */}
            <button className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={activeLang.code === "ar" ? "القائمة" : "Menu"}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        {/* ===== MOBILE MENU (FULL OVERLAY) ===== */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {navLinks.map((link, i) => (
            <a key={i} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.mobileIcon} {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
