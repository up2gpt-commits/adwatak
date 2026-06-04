"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// الأقسام الجديدة المنظمة
const categories = [
  { key: "all", label: "كل الأدوات", icon: "🗂️" },
  { key: "financial", label: "حاسبات مالية", icon: "💰" },
  { key: "text", label: "أدوات نصية", icon: "📝" },
  { key: "image", label: "أدوات الصور", icon: "🖼️" },
  { key: "pdf", label: "أدوات PDF", icon: "📄" },
  { key: "converters", label: "محولات", icon: "🔄" },
  { key: "generators", label: "مولدات", icon: "⚡" },
  { key: "dev", label: "تطوير ويب", icon: "💻" },
  { key: "islamic", label: "أدوات إسلامية", icon: "🕌" },
  { key: "daily", label: "أخرى", icon: "🌟" },
];

const tools = [
  // ===== حاسبات مالية =====
  { title: "حاسبة القرض العقاري", desc: "احسب القسط الشهري مع جدول الاستهلاك", icon: "🏠", href: "/tools/mortgage-calculator", cat: "financial" },
  { title: "حاسبة القرض الشخصي", desc: "احسب أقساط القرض الشخصي", icon: "💰", href: "/tools/loan-calculator", cat: "financial" },
  { title: "حاسبة التقسيط", desc: "احسب قيمة القسط لأي عملية تقسيط", icon: "📊", href: "/tools/installment-calculator", cat: "financial" },
  { title: "حاسبة EMI", desc: "القسط الشهري الثابت للقروض", icon: "🧮", href: "/tools/emi-calculator", cat: "financial" },
  { title: "حاسبة هامش الربح", desc: "احسب هامش الربح والمارك أب", icon: "📈", href: "/tools/profit-margin", cat: "financial" },
  { title: "حاسبة الضريبة المضافة", desc: "احسب VAT — السعودية 15٪ أو الإمارات 5٪", icon: "🏛️", href: "/tools/vat-calculator", cat: "financial" },
  { title: "حاسبة الراتب الصافي", desc: "راتبك بعد التأمينات والاستقطاعات", icon: "💵", href: "/tools/salary-calculator", cat: "financial" },
  { title: "حاسبة الفائدة المركبة", desc: "احسب عائد استثمارك مع الفائدة المركبة", icon: "📈", href: "/tools/compound-interest", cat: "financial" },
  { title: "حاسبة الذهب", desc: "احسب قيمة الذهب والزكاة والنصاب", icon: "🥇", href: "/tools/gold-calculator", cat: "financial" },
  { title: "حاسبة تقسيط السيارة", desc: "احسب أقساط تمويل السيارة", icon: "🚗", href: "/tools/car-installment", cat: "financial" },

  // ===== أدوات نصية =====
  { title: "عداد الكلمات والحروف", desc: "عداد الكلمات والحروف والجمل للنص", icon: "📝", href: "/tools/word-counter", cat: "text" },
  { title: "تحويل حالة النص", desc: "أحرف كبيرة أو صغيرة أو عنوان", icon: "🔤", href: "/tools/text-case", cat: "text" },
  { title: "تحويل الأرقام لحروف", desc: "الأرقام إلى كلمات عربية", icon: "🔢", href: "/tools/number-to-words", cat: "text" },
  { title: "مولد النص العربي", desc: "نص عربي للتصميم والمشاريع", icon: "📃", href: "/tools/arabic-lorem", cat: "text" },
  { title: "تنظيف النص", desc: "إزالة المسافات والروابط والعلامات", icon: "🧹", href: "/tools/text-cleaner", cat: "text" },
  { title: "مقارنة النصوص", desc: "قارن بين نصين واكتشف الفروقات", icon: "⚖️", href: "/tools/text-compare", cat: "text" },
  { title: "كاشف المحتوى AI", desc: "اكتشف إذا كان النص من كتابة بشرية أو AI", icon: "🤖", href: "/tools/ai-content-detector", cat: "text" },
  { title: "مدقق الانتحال", desc: "كشف النصوص المنسوخة وتقييم الأصالة", icon: "🚫", href: "/tools/plagiarism-checker", cat: "text" },
  { title: "المدقق النحوي", desc: "تدقيق الأخطاء النحوية والإملائية", icon: "📝", href: "/tools/grammar-checker", cat: "text" },
  { title: "إعادة الصياغة", desc: "إعادة كتابة النص بأسلوب جديد", icon: "✏️", href: "/tools/paraphrasing-tool", cat: "text" },
  { title: "اختبار سرعة الكتابة", desc: "قياس سرعة طباعتك بالعربية والإنجليزية", icon: "⌨️", href: "/tools/typing-test", cat: "text" },
  { title: "عداد حروف السوشيال", desc: "Twitter, Instagram, TikTok والمزيد", icon: "📱", href: "/tools/social-character-counter", cat: "text" },

  // ===== أدوات الصور =====
  { title: "استخراج النص من الصور", desc: "استخرج النصوص من الصور باستخدام OCR", icon: "👁️", href: "/tools/image-to-text", cat: "image" },
  { title: "إزالة خلفية الصورة", desc: "أزل الخلفية من أي صورة بالذكاء الاصطناعي", icon: "🖼️", href: "/tools/background-remover", cat: "image" },
  { title: "تغيير حجم الصور", desc: "تغيير أبعاد الصور مجاناً", icon: "📐", href: "/tools/image-resizer", cat: "image" },
  { title: "ضغط الصور", desc: "تقليل حجم ملفات الصور بجودة عالية", icon: "📦", href: "/tools/image-compressor", cat: "image" },
  { title: "تحميل ثامبنيل يوتيوب", desc: "صور مصغرة لفيديوهات يوتيوب بجودة عالية", icon: "▶️", href: "/tools/youtube-thumbnail-downloader", cat: "image" },
  { title: "صورة إلى PDF", desc: "حوّل الصور إلى ملف PDF", icon: "🖼️", href: "/tools/image-to-pdf", cat: "image" },

  // ===== أدوات PDF =====
  { title: "دمج ملفات PDF", desc: "ادمج عدة PDF في ملف واحد", icon: "📎", href: "/tools/pdf-merger", cat: "pdf" },
  { title: "تقسيم ملفات PDF", desc: "قسّم PDF إلى صفحات منفصلة", icon: "✂️", href: "/tools/pdf-splitter", cat: "pdf" },
  { title: "ضغط ملفات PDF", desc: "تقليل حجم ملفات PDF بجودة عالية", icon: "📦", href: "/tools/pdf-compressor", cat: "pdf" },
  { title: "PDF إلى Word", desc: "تحويل ملفات PDF إلى نصوص Word قابلة للتعديل", icon: "📄", href: "/tools/pdf-to-word", cat: "pdf" },

  // ===== محولات =====
  { title: "محوّل العملات", desc: "تحويل بين العملات العربية والعالمية", icon: "💱", href: "/tools/currency-converter", cat: "converters" },
  { title: "تحويل الوحدات", desc: "الطول والوزن والحجم والحرارة", icon: "📐", href: "/tools/unit-converter", cat: "converters" },
  { title: "تحويل الألوان", desc: "HEX ↔ RGB ↔ HSL مع معاينة", icon: "🎨", href: "/tools/color-converter", cat: "converters" },
  { title: "تحويل هجري ↔ ميلادي", desc: "حوّل التاريخ بين الهجري والميلادي", icon: "📅", href: "/tools/hijri-converter", cat: "converters" },

  // ===== مولدات =====
  { title: "مولد QR Code", desc: "إنشاء QR Code لرابط أو نص", icon: "🔳", href: "/tools/qr-generator", cat: "generators" },
  { title: "قارئ QR Code", desc: "اقرأ رموز QR من الصور أو الكاميرا", icon: "📷", href: "/tools/qr-reader", cat: "generators" },
  { title: "مولد الباركود", desc: "إنشاء باركود احترافي لأي منتج", icon: "📊", href: "/tools/barcode-generator", cat: "generators" },
  { title: "مولد كلمات السر", desc: "كلمات سر قوية وآمنة", icon: "🔐", href: "/tools/password-generator", cat: "generators" },
  { title: "مولد الفواتير", desc: "فاتورة احترافية", icon: "🧾", href: "/tools/invoice-generator", cat: "generators" },
  { title: "رابط واتساب مباشر", desc: "رابط يفتح واتساب مباشرة", icon: "💬", href: "/tools/whatsapp-link", cat: "generators" },
  { title: "مولد أرقام عشوائية", desc: "أرقام عشوائية بين نطاق محدد", icon: "🎲", href: "/tools/random-number", cat: "generators" },
  { title: "مولد أسماء", desc: "أسماء عربية وإنجليزية", icon: "👤", href: "/tools/name-generator", cat: "generators" },

  // ===== تطوير ويب =====
  { title: "JSON Formatter", desc: "تنسيق وتجميل والتحقق من JSON", icon: "📋", href: "/tools/json-formatter", cat: "dev" },
  { title: "Base64 Encoder", desc: "تشفير وفك تشفير Base64", icon: "🔄", href: "/tools/base64-encoder", cat: "dev" },
  { title: "Hash Generator", desc: "MD5, SHA-1, SHA-256, SHA-512", icon: "#️⃣", href: "/tools/hash-generator", cat: "dev" },
  { title: "SEO Audit", desc: "تدقيق وتحليل السيو لأي موقع", icon: "🔍", href: "/tools/seo-audit", cat: "dev" },
  { title: "تصغير CSS", desc: "Minify و Format أكواد CSS", icon: "🎨", href: "/tools/css-minifier", cat: "dev" },
  { title: "محرر ماركداون", desc: "كتابة Markdown مع معاينة مباشرة", icon: "📝", href: "/tools/markdown-editor", cat: "dev" },
  { title: "البحث عن IP", desc: "الكشف عن معلومات أي عنوان IP", icon: "🌐", href: "/tools/ip-lookup", cat: "dev" },

  // ===== أدوات إسلامية =====
  { title: "حاسبة الميراث الإسلامي", desc: "احسب أنصبة الميراث حسب الشريعة", icon: "📜", href: "/tools/inheritance-calculator", cat: "islamic" },
  { title: "حاسبة الزكاة", desc: "زكاة المال والذهب والأسهم", icon: "🕌", href: "/tools/zakat-calculator", cat: "islamic" },
  { title: "اتجاه القبلة", desc: "اعرف اتجاه القبلة من موقعك", icon: "🧭", href: "/tools/qibla-direction", cat: "islamic" },
  { title: "مواقيت الصلاة", desc: "مواقيت الصلاة حسب موقعك الجغرافي", icon: "🕐", href: "/tools/prayer-times", cat: "islamic" },

  // ===== أخرى =====
  { title: "حاسبة العمر", desc: "عمرك بالهجري والميلادي وأبراجك", icon: "🎂", href: "/tools/age-calculator", cat: "daily" },
  { title: "حاسبة BMI", desc: "مؤشر كتلة الجسم — وزنك المثالي", icon: "⚖️", href: "/tools/bmi-calculator", cat: "daily" },
  { title: "ساعة إيقاف + مؤقت", desc: "ساعة إيقاف مع لفات ومؤقت", icon: "⏱️", href: "/tools/stopwatch", cat: "daily" },
];

const categoryDescriptions: Record<string, { title: string; content: string }> = {
  financial: {
    title: "حاسبات مالية",
    content: "مجموعة شاملة من الحاسبات المالية: حاسبة القرض العقاري، القرض الشخصي، التقسيط، EMI، هامش الربح، الضريبة المضافة (VAT)، الراتب الصافي، الفائدة المركبة، الذهب، وتقسيط السيارة. كلها محدثة حسب الأنظمة السعودية والإماراتية."
  },
  text: {
    title: "أدوات النصوص والكتابة",
    content: "أدوات متكاملة للكتّاب والطلاب: عداد الكلمات والحروف، تحويل حالة النص، تحويل الأرقام لحروف، مولد النص العربي، تنظيف النص، مقارنة النصوص، كاشف المحتوى AI، مدقق الانتحال، المدقق النحوي، إعادة الصياغة، اختبار سرعة الكتابة، وعداد حروف السوشيال ميديا."
  },
  image: {
    title: "أدوات الصور",
    content: "كل ما تحتاجه للصور: استخراج النص من الصور بالـ OCR (مجاني)، إزالة خلفية الصورة بالذكاء الاصطناعي (مجاني)، تغيير حجم الصور، ضغط الصور، تحميل ثامبنيل يوتيوب، وتحويل الصور إلى PDF. كل الأدوات تعمل في المتصفح بدون رفع ملفات."
  },
  pdf: {
    title: "أدوات PDF",
    content: "أدوات PDF كاملة: دمج عدة ملفات PDF في واحد، تقسيم PDF إلى صفحات، ضغط حجم PDF، وتحويل PDF إلى Word. معالجة محلية بدون رفع ملفات — خصوصية تامة."
  },
  converters: {
    title: "محولات",
    content: "حوّل بين كل شيء: العملات (ريال، دولار، يورو، جنيه)، الوحدات (طول، وزن، حجم، حرارة)، الألوان (HEX ↔ RGB ↔ HSL)، والتاريخ الهجري ↔ الميلادي. كل المحولات دقيقة ومجانية."
  },
  generators: {
    title: "مولدات",
    content: "مولدات سريعة ومفيدة: QR Code (إنشاء وقراءة)، الباركود (8 أنواع)، كلمات سر قوية، فواتير احترافية، رابط واتساب مباشر، أرقام عشوائية، وأسماء."
  },
  dev: {
    title: "أدوات تطوير الويب",
    content: "أدوات أساسية للمطورين: JSON Formatter مع التحقق من الأخطاء، Base64 Encoder/Decoder، Hash Generator (MD5, SHA)، SEO Audit، CSS Minifier، محرر Markdown، والبحث عن IP."
  },
  islamic: {
    title: "الأدوات الإسلامية",
    content: "أدوات إسلامية: حاسبة الميراث حسب الشريعة، حاسبة الزكاة للمال والذهب والأسهم، اتجاه القبلة، ومواقيت الصلاة حسب موقعك."
  },
  daily: {
    title: "أدوات أخرى مفيدة",
    content: "أدوات يومية متنوعة: حاسبة العمر بالهجري والميلادي، حاسبة BMI (مؤشر كتلة الجسم)، وساعة إيقاف مع مؤقت."
  },
};

export default function ToolGrid() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Read URL hash on mount → activate that category
  const applyHashFilter = () => {
    const hash = window.location.hash.replace("#", "");
    if (hash && categories.some((c) => c.key === hash)) {
      setFilter(hash);
    }
  };

  // Separate scroll function — only called on events, not on interval
  const scrollToTools = () => {
    const hash = window.location.hash.replace("#", "");
    if (hash && categories.some((c) => c.key === hash)) {
      setTimeout(() => {
        const el = document.querySelector("[data-scroll-target]");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  };

  useEffect(() => {
    applyHashFilter();
    scrollToTools();
    const onHash = () => { applyHashFilter(); scrollToTools(); };
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onHash);
    const interval = setInterval(applyHashFilter, 800);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onHash);
      clearInterval(interval);
    };
  }, []);

  const filtered = tools.filter((t) => {
    const matchCat = filter === "all" || t.cat === filter;
    const matchSearch = search === "" || t.title.includes(search) || t.desc.includes(search);
    return matchCat && matchSearch;
  });

  const currentCat = filter !== "all" ? categoryDescriptions[filter] : null;

  return (
    <>
      {/* Search bar */}
      <div className="max-w-[520px] mx-auto mt-6 relative" data-scroll-target>
        <input
          type="text"
          placeholder="ابحث عن أداة... (مثال: حاسبة، QR، PDF)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input-enhanced"
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
          <button key={c.key} id={c.key} onClick={() => setFilter(c.key)}
            className={`cat-btn ${filter === c.key ? "active" : ""}`}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      {filtered.length > 0 ? (
        <div className="tools-grid">
          {filtered.map((tool) => (
            <Link key={tool.href} href={tool.href} className="tool-card card-shine">
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
