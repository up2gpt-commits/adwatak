import ToolGrid from "../components/ToolGrid";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="badge">
          🔧 ٤٠+ أداة مجانية بالكامل
        </div>
        <h1>أدواتك</h1>
        <p>
          كل الأدوات اللي محتاجها في مكان واحد — مجانية، بالعربي، بدون تسجيل
        </p>
      </section>

      {/* Interactive ToolGrid (Client Component) */}
      <ToolGrid />

      {/* Stats */}
      <div className="stats">
        {[
          { num: "40+", label: "أداة مجانية", icon: "🔧" },
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
      <div className="mt-16 p-8 bg-white rounded-2xl border border-gray-200">
        <h2 className="text-xl font-extrabold text-gray-900 mb-4">
          🔧 أدواتك — منصة الأدوات العربية الشاملة
        </h2>
        <div className="text-sm text-gray-600 leading-8">
          <p className="mb-3">
            أدواتك هي منصة عربية مجانية تجمع أكثر من 40 أداة في مكان واحد. نوفر حاسبات مالية متقدمة
            (قرض عقاري، قرض شخصي، تقسيط، EMI، هامش ربح، ضريبة مضافة)، أدوات إسلامية فريدة
            (ميراث، زكاة، تحويل هجري، مواقيت صلاة، اتجاه قبلة)، أدوات نصية للكتّاب والطلاب،
            محولات ملفات وألوان، وأدوات تطوير ويب، ومولدات متنوعة.
          </p>
          <p className="mb-3">
            كل الأدوات تعمل مباشرة في المتصفح بدون تسجيل أو رفع ملفات — خصوصيتك مهمة لنا.
            الحاسبات المالية محدثة حسب الأنظمة السعودية والإماراتية والمصرية.
          </p>
          <p>
            هل لديك اقتراح لأداة جديدة؟ <a href="mailto:contact@adwatak.cloud" className="text-blue-600 no-underline">تواصل معنا</a> وسنضيفها قريباً.
          </p>
        </div>
      </div>

      {/* Blog CTA */}
      <div className="blog-cta">
        <h2>📝 المدونة</h2>
        <p>
          مقالات وشروحات تساعدك تفهم وتستفيد من أدواتنا
        </p>
        <a href="/blog" className="cta-btn">
          تصفح المدونة ←
        </a>
      </div>
    </>
  );
}
