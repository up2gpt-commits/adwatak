"use client";
import { useState } from "react";

interface HeaderProps {
  lang?: "ar" | "en";
}

const categoriesAr = [
  { key: "financial", label: "💰 حاسبات مالية" },
  { key: "text", label: "📝 أدوات نصية" },
  { key: "image", label: "🖼️ أدوات الصور" },
  { key: "pdf", label: "📄 أدوات PDF" },
  { key: "converters", label: "🔄 محولات" },
  { key: "generators", label: "⚡ مولدات" },
  { key: "dev", label: "💻 تطوير ويب" },
  { key: "islamic", label: "🕌 أدوات إسلامية" },
  { key: "daily", label: "🌟 أخرى" },
];

const categoriesEn = [
  { key: "financial", label: "💰 Financial" },
  { key: "text", label: "📝 Text Tools" },
  { key: "image", label: "🖼️ Image Tools" },
  { key: "pdf", label: "📄 PDF Tools" },
  { key: "converters", label: "🔄 Converters" },
  { key: "generators", label: "⚡ Generators" },
  { key: "dev", label: "💻 Dev Tools" },
  { key: "islamic", label: "🕌 Islamic Tools" },
  { key: "daily", label: "🌟 Other" },
];

export default function Header({ lang = "ar" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);

  const isAr = lang === "ar";
  const categories = isAr ? categoriesAr : categoriesEn;
  const catLink = isAr ? "/" : "/en";
  const brandName = isAr ? "أدواتك" : "Adawatak";
  const ddLabel = isAr ? "كل الأدوات" : "All Tools";

  const desktopLinks = isAr
    ? [
        { href: "/", label: "الرئيسية", icon: "" },
        { href: "/blog", label: "المدونة", icon: "📝" },
        { href: "/about", label: "عن الموقع", icon: "" },
      ]
    : [
        { href: "/en", label: "Home", icon: "" },
        { href: "/en/blog", label: "Blog", icon: "📝" },
        { href: "/en/about", label: "About", icon: "" },
      ];

  const mobileLinks = isAr
    ? [
        { href: "/", label: "الرئيسية", icon: "🏠" },
        { href: "/blog", label: "المدونة", icon: "📝" },
        { href: "/about", label: "عن الموقع", icon: "ℹ️" },
        { href: "/privacy", label: "الخصوصية", icon: "🔒" },
        { href: "mailto:contact@adwatak.cloud", label: "تواصل معنا", icon: "📧" },
      ]
    : [
        { href: "/en", label: "Home", icon: "🏠" },
        { href: "/en/blog", label: "Blog", icon: "📝" },
        { href: "/en/about", label: "About", icon: "ℹ️" },
        { href: "/en/privacy", label: "Privacy", icon: "🔒" },
        { href: "mailto:contact@adwatak.cloud", label: "Contact", icon: "📧" },
      ];

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <a href={isAr ? "/" : "/en"} className="logo">
            <span className="logo-icon">🔧</span>
            <span className="logo-text">{brandName}</span>
          </a>

          {/* Desktop: nav links + dropdown + lang */}
          <nav className="nav nav-desktop">
            {desktopLinks.map((link, i) => (
              <a key={i} href={link.href}>
                {link.icon && <>{link.icon} </>}{link.label}
              </a>
            ))}

            {/* Desktop dropdown */}
            <div className="dd-desktop"
              onMouseEnter={() => setDdOpen(true)}
              onMouseLeave={() => setDdOpen(false)}>
              <button className="dd-btn" onClick={() => setDdOpen(!ddOpen)}>
                🗂️ {ddLabel} <span className="dd-arrow">▾</span>
              </button>
              {ddOpen && (
                <div className="dd-menu">
                  {categories.map((cat) => (
                    <a key={cat.key} href={`${catLink}#${cat.key}`} className="dd-item" onClick={() => setDdOpen(false)}>
                      {cat.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="lang-switch">
              <a href="/" className={isAr ? "active" : ""}>عربي</a>
              <a href="/en" className={isAr ? "" : "active"}>EN</a>
            </div>
          </nav>

          {/* Mobile header */}
          <div className="mobile-header-actions">
            {/* Mobile dropdown */}
            <div className="dd-mobile-wrap">
              <button className="dd-btn-mobile" onClick={() => setDdOpen(!ddOpen)}>
                🗂️ <span className="dd-arrow">{ddOpen ? "▴" : "▾"}</span>
              </button>
              {ddOpen && (
                <div className="dd-menu-mobile">
                  {categories.map((cat) => (
                    <a key={cat.key} href={`${catLink}#${cat.key}`} onClick={() => setDdOpen(false)}>
                      {cat.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="lang-switch lang-switch-mobile">
              <a href="/" className={isAr ? "active" : ""}>عربي</a>
              <a href="/en" className={isAr ? "" : "active"}>EN</a>
            </div>
            <button className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={isAr ? "القائمة" : "Menu"}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {mobileLinks.map((link, i) => (
            <a key={i} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.icon} {link.label}
            </a>
          ))}
          <div className="mobile-tools-section">
            <p className="mobile-tools-heading">🗂️ {ddLabel}</p>
            {categories.map((cat) => (
              <a key={cat.key} href={`${catLink}#${cat.key}`} className="mobile-tools-item" onClick={() => setMenuOpen(false)}>
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
