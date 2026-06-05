"use client";
import { useState, useEffect } from "react";
import { useSearch } from "./SearchProvider";

const featuredTools = [
  { title: "حاسبة القرض العقاري", desc: "احسب القسط مع جدول الاستهلاك", icon: "🏠", href: "/tools/mortgage-calculator" },
  { title: "حاسبة الميراث", desc: "أنصبة الميراث حسب الشريعة", icon: "📜", href: "/tools/inheritance-calculator" },
  { title: "حاسبة BMI", desc: "مؤشر كتلة الجسم", icon: "⚖️", href: "/tools/bmi-calculator" },
  { title: "مولد QR Code", desc: "إنشاء QR لأي رابط أو نص", icon: "🔳", href: "/tools/qr-generator" },
  { title: "محوّل الألوان", desc: "HEX ↔ RGB ↔ HSL", icon: "🎨", href: "/tools/color-converter" },
  { title: "PDF إلى Word", desc: "تحويل PDF لنص قابل للتعديل", icon: "📄", href: "/tools/pdf-to-word" },
];

// Category keys that trigger hiding the featured section
const categoryKeys = ["financial", "text", "image", "pdf", "converters", "generators", "dev", "islamic", "daily"];

export default function FeaturedTools() {
  const { search } = useSearch();
  const [hasHash, setHasHash] = useState(false);

  // Check for hash on mount and on change
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.replace("#", "");
      setHasHash(hash !== "" && categoryKeys.includes(hash));
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    window.addEventListener("popstate", checkHash);
    return () => {
      window.removeEventListener("hashchange", checkHash);
      window.removeEventListener("popstate", checkHash);
    };
  }, []);

  const isSearching = search.trim().length > 0;
  const isCategoryActive = hasHash;

  // Hide when searching OR when a category is selected
  if (isSearching || isCategoryActive) return null;

  return (
    <section className="featured-section scroll-fade-in" style={{ marginTop: "40px" }}>
      <div className="section-header">
        <h2 className="section-title">
          <span className="s-icon">⭐</span>
          الأدوات الأكثر استخداماً
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
  );
}
