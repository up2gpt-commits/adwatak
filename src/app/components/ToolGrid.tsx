"use client";

import { useState } from "react";
import Link from "next/link";

const tools = [
  { title: "حاسبة القرض العقاري", desc: "احسب القسط الشهري مع جدول الاستفلال", icon: "🏠", href: "/tools/mortgage-calculator", cat: "calculators" },
  { title: "حاسبة القرض الشخصي", desc: "احسب أقساط القرض الشخصي", icon: "💰", href: "/tools/loan-calculator", cat: "calculators" },
  { title: "حاسبة التقسيط", desc: "احسب قيمة القسط لأي عملية تقسيط", icon: "📊", href: "/tools/installment-calculator", cat: "calculators" },
  { title: "حاسبة EMI", desc: "القسط الشهري الثابت", icon: "🧮", href: "/tools/emi-calculator", cat: "calculators" },
  { title: "حاسبة هامش الربح", desc: "احسب هامش الربح والمارك أب", icon: "📈", href: "/tools/profit-margin", cat: "calculators" },
  { title: "حاسبة الضريبة المضافة", desc: "احسب VAT — السعودية 15٪ أو الإمارات 5٪", icon: "🏛️", href: "/tools/vat-calculator", cat: "calculators" },
  { title: "حاسبة الراتب الصافي", desc: "راتبك بعد التأمينات والاستقطاعات", icon: "💵", href: "/tools/salary-calculator", cat: "calculators" },
  { title: "محوّل العملات", desc: "تحويل بين العملات العربية والعالمية", icon: "💱", href: "/tools/currency-converter", cat: "calculators" },
  { title: "حاسبة الفائدة المركبة", desc: "احسب عائد استثمارك مع الفائدة المركبة", icon: "📈", href: "/tools/compound-interest", cat: "calculators" },
  { title: "حاسبة الذهب", desc: "احسب قيمة الذهب والزكاة والنصاب", icon: "🥇", href: "/tools/gold-calculator", cat: "calculators" },
  { title: "حاسبة الميراث الإسلامي", desc: "احسب أنصبة الميراث حسب الشريعة", icon: "📜", href: "/tools/inheritance-calculator", cat: "islamic" },
  { title: "حاسبة الزكاة", desc: "زكاة المال والذهب والأسهم", icon: "🕌", href: "/tools/zakat-calculator", cat: "islamic" },
  { title: "تحويل هجري ↔ ميلادي", desc: "حوّل التاريخ بين الهجري والميلادي", icon: "📅", href: "/tools/hijri-converter", cat: "islamic" },
  { title: "حاسبة العمر", desc: "عمرك بالهجري والميلادي وأبراجك", icon: "🎂", href: "/tools/age-calculator", cat: "islamic" },
  { title: "اتجاه القبلة", desc: "اعرف اتجاه القبلة من موقعك", icon: "🧭", href: "/tools/qibla-direction", cat: "islamic" },
  { title: "مواقيت الصلاة", desc: "مواقيت الصلاة حسب موقعك الجغرافي", icon: "🕐", href: "/tools/prayer-times", cat: "islamic" },
  { title: "عداد الكلمات والحروف", desc: "عداد الكلمات والحروف والجمل للنص", icon: "📝", href: "/tools/word-counter", cat: "text" },
  { title: "تحويل حالة النص", desc: "أحرف كبيرة أو صغيرة أو عنوان", icon: "🔤", href: "/tools/text-case", cat: "text" },
  { title: "تحويل الأرقام لحروف", desc: "الأرقام إلى كلمات عربية (1500 → ألف وخمسمائة)", icon: "🔢", href: "/tools/number-to-words", cat: "text" },
  { title: "مولد النص العربي", desc: "نص عربي للتصميم والمشاريع", icon: "📃", href: "/tools/arabic-lorem", cat: "text" },
  { title: "تنظيف النص", desc: "إزالة المسافات والروابط والعلامات", icon: "🧹", href: "/tools/text-cleaner", cat: "text" },
  { title: "مقارنة النصوص", desc: "قارن بين نصين واكتشف الفروقات", icon: "⚖️", href: "/tools/text-compare", cat: "text" },
  { title: "دمج ملفات PDF", desc: "ادمج عدة PDF في ملف واحد", icon: "📎", href: "/tools/pdf-merger", cat: "converters" },
  { title: "صورة إلى PDF", desc: "حوّل الصور إلى ملف PDF", icon: "🖼️", href: "/tools/image-to-pdf", cat: "converters" },
  { title: "تحويل الوحدات", desc: "الطول والوزن والحجم", icon: "📐", href: "/tools/unit-converter", cat: "converters" },
  { title: "تحويل الألوان", desc: "HEX ↔ RGB ↔ HSL مع معاينة", icon: "🎨", href: "/tools/color-converter", cat: "converters" },
  { title: "JSON Formatter", desc: "تنسيق وتجميل ملفات JSON", icon: "📋", href: "/tools/json-formatter", cat: "dev" },
  { title: "Base64 Encoder", desc: "تشفير وفك تشفير Base64", icon: "🔄", href: "/tools/base64-encoder", cat: "dev" },
  { title: "Hash Generator", desc: "MD5, SHA-1, SHA-256, SHA-512", icon: "#️⃣", href: "/tools/hash-generator", cat: "dev" },
  { title: "حاسبة BMI", desc: "مؤشر كتلة الجسم — وزنك المثالي", icon: "⚖️", href: "/tools/bmi-calculator", cat: "daily" },
  { title: "ساعة إيقاف + مؤقت", desc: "ساعة إيقاف مع لفات ومؤقت", icon: "⏱️", href: "/tools/stopwatch", cat: "daily" },
  { title: "عداد حروف السوشيال", desc: "Twitter, Instagram, TikTok والمزيد", icon: "📱", href: "/tools/social-character-counter", cat: "daily" },
  { title: "مولد QR Code", desc: "إنشاء QR Code لرابط أو نص", icon: "🔳", href: "/tools/qr-generator", cat: "generators" },
  { title: "رابط واتساب مباشر", desc: "رابط يفتح واتساب مباشرة", icon: "💬", href: "/tools/whatsapp-link", cat: "generators" },
  { title: "مولد كلمات السر", desc: "كلمات سر قوية وآمنة", icon: "🔐", href: "/tools/password-generator", cat: "generators" },
  { title: "مولد الفواتير", desc: "فاتورة إعربية احترافية", icon: "🧾", href: "/tools/invoice-generator", cat: "generators" },
  { title: "مولد أرقام عشوائية", desc: "أرقام عشوائية بين نطاق محدد", icon: "🎲", href: "/tools/random-number", cat: "generators" },
  { title: "مولد أسماء", desc: "أسماء عربية وإنجليزية", icon: "👤", href: "/tools/name-generator", cat: "generators" },
];

const categories = [
  { key: "all", label: "كل الأدوات", icon: "🗂️" },
  { key: "calculators", label: "الحاسبات", icon: "🧮" },
  { key: "islamic", label: "أدوات إسلامية", icon: "🕌" },
  { key: "text", label: "أدوات نصية", icon: "📝" },
  { key: "converters", label: "محولات", icon: "🔄" },
  { key: "dev", label: "تطوير ويب", icon: "💻" },
  { key: "daily", label: "يومية", icon: "🌟" },
  { key: "generators", label: "مولدات", icon: "⚡" },
];

const categoryDescriptions: Record<string, { title: string; content: string }> = {
  calculators: {
    title: "الحاسبات المالية والمصرفية",
    content: "مجموعة شاملة من الحاسبات المالية تساعدك على اتخاذ قرارات مالية ذكية. احسب أقساط القروض العقارية والشخصية، وقيمة التقسيط، ونسبة الفائدة، وهامش الربح، والضريبة المضافة، والراتب الصافي. كل الحاسبات مجانية وباللغة العربية ومحدثة حسب الأنظمة السعودية والإماراتية والمصرية."
  },
  islamic: {
    title: "الأدوات الإسلامية",
    content: "أدوات إسلامية فريدة لمساعدتك في عباداتك اليومية. حاسبة الميراث الإسلامي حسب الشريعة، حاسبة الزكاة للمال والذهب والأسهم، تحويل التاريخ الهجري والميلادي، حاسبة العمر، مواقيت الصلاة، وتحديد اتجاه القبلة. كل الأدوات مبنية على أسس شرعية صحيحة."
  },
  text: {
    title: "أدوات النصوص والكتابة",
    content: "أدوات نصية متنوعة للكتّاب والطلاب ومتخصصي SEO. عداد الكلمات والحروف يدعم العربية والإنجليزية، تحويل حالة النص (كبيرة/صغيرة/عنوان)، تحويل الأرقام لكلمات عربية، مولد النص العربي للتصاميم، تنظيف النص من المسافات الزائدة، ومقارنة نصين."
  },
  converters: {
    title: "محولات الملفات والوحدات",
    content: "حوّل بين الصيغ المختلفة بسهولة. دمج ملفات PDF، تحويل الصور إلى PDF، تحويل وحدات الطول والوزن والحجم والحرارة، وتحويل الألوان بين HEX وRGB وHSL. كل المحولات تعمل في المتصفح بدون رفع ملفات."
  },
  dev: {
    title: "أدوات تطوير الويب",
    content: "أدوات ضرورية لمطوري الويب والمبرمجين. JSON Formatter لتنسيق ملفات JSON مع التحقق من الأخطاء، Base64 Encoder/Decoder لترميز النصوص والملفات، Hash Generator لتوليد MD5 وSHA-256 وغيرها."
  },
  daily: {
    title: "أدوات يومية مفيدة",
    content: "أدوات يومية بسيطة ومفيدة. حاسبة مؤشر كتلة الجسم BMI لمعرفة وزنك المثالي، ساعة إيقاف مع لفات ومؤقت تنازلي للرياضة والطبخ، وعداد حروف مخصص لمنصات التواصل الاجتماعي مثل Twitter وInstagram وTikTok."
  },
  generators: {
    title: "المولدات",
    content: "أدوات توليد سريعة ومفيدة. مولد QR Code لإنشاء رموز QR للروابط والنصوص، رابط واتساب مباشر للمحادثة الفورية، مولد كلمات سر قوية وآمنة، مولد فواتير احترافية، مولد أرقام عشوائية، ومولد أسماء عربية وإنجليزية."
  }
};

export default function ToolGrid() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = tools.filter((t) => {
    const matchCat = filter === "all" || t.cat === filter;
    const matchSearch = search === "" || t.title.includes(search) || t.desc.includes(search);
    return matchCat && matchSearch;
  });

  const currentCat = filter !== "all" ? categoryDescriptions[filter] : null;

  return (
    <>
      {/* Search bar */}
      <div className="max-w-[520px] mx-auto mt-6 relative">
        <input
          type="text"
          placeholder="ابحث عن أداة... (مثال: حاسبة، ميراث، QR)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Category descriptions for SEO */}
      {currentCat && (
        <div className="max-w-[800px] mx-auto mb-6 p-6 bg-white rounded-2xl border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-2">{currentCat.title}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{currentCat.content}</p>
        </div>
      )}

      {/* Categories */}
      <div className="cats">
        {categories.map((c) => (
          <button key={c.key} onClick={() => setFilter(c.key)}
            className={`cat-btn ${filter === c.key ? "active" : ""}`}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      {filtered.length > 0 ? (
        <div className="tools-grid">
          {filtered.map((tool) => (
            <Link key={tool.href} href={tool.href} className="tool-card">
              <div className="tool-card-inner">
                <span className="tool-icon">{tool.icon}</span>
                <div>
                  <h3 className="tool-title">{tool.title}</h3>
                  <p className="tool-desc">{tool.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty">
          <p className="emoji">🔍</p>
          <p>مفيش نتائج</p>
          <p className="text-xs text-gray-400 mt-1">جرّب بحث تاني أو اختار قسم مختلف</p>
          <button onClick={() => { setSearch(""); setFilter("all"); }}
            className="mt-4 cat-btn">
            عرض كل الأدوات
          </button>
        </div>
      )}
    </>
  );
}
