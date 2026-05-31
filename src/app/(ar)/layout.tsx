import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "أدواتك — كل الأدوات اللي محتاجها بالعربي",
    template: "%s — أدواتك",
  },
};

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ar-content" dir="rtl">
      <header className="site-header">
        <div className="container header-inner">
          <a href="/" className="logo"><span>🔧</span><span>أدواتك</span></a>
          <nav className="nav">
            <a href="/">الرئيسية</a>
            <a href="/blog">📝 المدونة</a>
            <div className="lang-switch">
              <a href="/" className="active">عربي</a>
              <a href="/en">EN</a>
            </div>
          </nav>
        </div>
      </header>
      <main className="container" style={{ padding: "32px 16px" }}>{children}</main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer">
              <h3>🔧 أدواتك</h3>
              <p style={{ fontSize: "0.875rem", color: "#64748b" }}>أدوات مجانية بالكامل باللغة العربية — بدون تسجيل وبدون إعلانات مزعجة</p>
            </div>
            <div className="footer">
                <h3>أقسام</h3>
                <a href="/category/calculators">الحاسبات المالية</a>
                <a href="/category/islamic">الأدوات الإسلامية</a>
                <a href="/category/text">أدوات نصية</a>
                <a href="/category/converters">محولات</a>
                <a href="/category/generators">مولدات</a>
            </div>
            <div className="footer">
                <h3>صفحات مهمة</h3>
                <a href="/about">عن الموقع</a>
                <a href="/privacy">سياسة الخصوصية</a>
                <a href="/blog">المدونة</a>
            </div>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} أدواتك — جميع الحقوق محفوظة | adwatak.cloud
          </div>
        </div>
      </footer>
    </div>
  );
}
