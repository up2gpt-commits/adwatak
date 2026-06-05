import ToolGrid from "../components/ToolGrid";
import { SearchProvider } from "../components/SearchProvider";
import SearchBar from "../components/SearchBar";
import FeaturedTools from "../components/FeaturedTools";
import AllToolsHeader from "../components/AllToolsHeader";

export default function Home() {
  return (
    <SearchProvider>
      {/* Hero */}
      <section className="hero scroll-fade-in">
        <div className="hero-grid"></div>
        <div className="hero-orb-2"></div>
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          <span>المنصة العربية الأولى للأدوات المجانية — ٥٠+ أداة</span>
        </div>
        <h1><span className="hero-gradient-text">كل الأدوات اللي محتاجها</span><br />في مكان واحد</h1>
        <p>
          حاسبات مالية، أدوات إسلامية، محولات نصوص، مولدات، أدوات PDF والمزيد — كلها مجانية ١٠٠٪، بالعربي، وبدون أي تسجيل
        </p>

        {/* Trust Badges */}
        <div className="hero-badges">
          <div className="hero-badge-item">
            <span className="b-icon">🔒</span>
            <span>خصوصية تامة</span>
          </div>
          <div className="hero-badge-item">
            <span className="b-icon">🆓</span>
            <span>بدون تسجيل</span>
          </div>
          <div className="hero-badge-item">
            <span className="b-icon">⚡</span>
            <span>نتائج فورية</span>
          </div>
          <div className="hero-badge-item">
            <span className="b-icon">🌐</span>
            <span>يعمل أونلاين</span>
          </div>
        </div>
      </section>

      {/* Smart Search — between badges and tools list */}
      <div className="mt-8 mb-4" data-scroll-target>
        <SearchBar />
      </div>

      {/* Featured / Popular Tools — hides automatically when search is active */}
      <FeaturedTools />

      {/* All Tools header — hides when search is active */}
      <AllToolsHeader />

      {/* Interactive ToolGrid (Client Component) */}
      <ToolGrid />

      {/* Stats */}
      <div className="stats scroll-fade-in">
        {[
          { num: "50+", label: "أداة مجانية", icon: "🔧" },
          { num: "100%", label: "بدون تسجيل", icon: "🔓" },
          { num: "0$", label: "مجاني للأبد", icon: "💚" },
          { num: "24/7", label: "متاح دائماً", icon: "🌐" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="icon">{s.icon}</div>
            <div className="num">{s.num}</div>
            <div className="lbl">{s.label}</div>
          </div>
        ))}
      </div>

      {/* SEO Content Section */}
      <div className="mt-16 p-8 scroll-fade-in bg-white rounded-2xl border border-gray-200" style={{ marginTop: "56px" }}>
        <h2 className="text-xl font-extrabold text-gray-900 mb-4">
          🔧 أدواتك — منصة الأدوات العربية الشاملة
        </h2>
        <div className="text-sm text-gray-600 leading-8">
          <p className="mb-3">
            أدواتك هي منصة عربية مجانية تجمع أكثر من 50 أداة في مكان واحد. نوفر حاسبات مالية متقدمة
            (قرض عقاري، قرض شخصي، تقسيط، EMI، هامش ربح، ضريبة مضافة)، أدوات إسلامية فريدة
            (ميراث، زكاة، تحويل هجري، مواقيت صلاة، اتجاه قبلة)، أدوات نصية للكتّاب والطلاب،
            محولات ملفات وألوان، وأدوات تطوير ويب، ومولدات متنوعة.
          </p>
          <p className="mb-3">
            كل الأدوات تعمل مباشرة في المتصفح بدون تسجيل أو رفع ملفات — خصوصيتك مهمة لنا.
            الحاسبات المالية محدثة حسب الأنظمة السعودية والإماراتية والمصرية.
          </p>
          <p>
            هل لديك اقتراح لأداة جديدة؟ <a href="mailto:contact@adwatak.cloud" className="text-blue-600 font-semibold no-underline hover:underline">تواصل معنا</a> وسنضيفها قريباً.
          </p>
        </div>
      </div>

      {/* Blog CTA */}
      <div className="blog-cta scroll-fade-in">
        <h2>📝 المدونة</h2>
        <p>
          مقالات وشروحات تساعدك تفهم وتستفيد من أدواتنا
        </p>
        <a href="/blog" className="cta-btn">
          تصفح المدونة ←
        </a>
      </div>
    </SearchProvider>
  );
}
