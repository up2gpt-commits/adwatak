import type { Metadata } from "next";
import Header from "../components/Header";
import NewsletterForm from "../components/NewsletterForm";
import StructuredData, { orgSchema, websiteSchema } from "../components/StructuredData";

export const metadata: Metadata = {
  title: {
    default: "أدواتك — كل الأدوات اللي محتاجها بالعربي",
    template: "%s — أدواتك",
  },
  alternates: {
    canonical: "https://adwatak.cloud",
    languages: {
      "ar": "https://adwatak.cloud",
      "en": "https://adwatak.cloud/en",
      "tr": "https://adwatak.cloud/tr",
      "id": "https://adwatak.cloud/id",
      "x-default": "https://adwatak.cloud",
    },
  },
};

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ar-content" dir="rtl">
      {/* Trust Bar */}
      <div className="trust-bar scroll-fade-in">
        <div className="container trust-bar-inner">
          <div className="trust-item">
            <span className="t-icon">🔒</span>
            <span>خصوصية تامة — بدون رفع ملفات</span>
          </div>
          <div className="trust-item">
            <span className="t-icon">🆓</span>
            <span>مجاني بدون تسجيل</span>
          </div>
          <div className="trust-item">
            <span className="t-icon">⚡</span>
            <span>نتائج فورية</span>
          </div>
          <div className="trust-item">
            <span className="t-icon">🔧</span>
            <span>٥٠+ أداة بالعربي</span>
          </div>
        </div>
      </div>

      {/* Header (Client Component — hamburger + nav) */}
      <Header lang="ar" />

      <main className="container" style={{ padding: "32px 20px 48px" }}>{children}</main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid scroll-fade-in">
            {/* Brand */}
            <div className="footer footer-brand">
              <div className="footer-logo">
                <span>🔧</span>
                <span>أدواتك</span>
              </div>
              <p className="footer-desc">
                منصة عربية مجانية تجمع أكثر من ٥٠ أداة في مكان واحد. حاسبات مالية، أدوات إسلامية، محولات، مولدات والمزيد — كلها تعمل في المتصفح بدون تسجيل.
              </p>
              <div className="footer-social">
                <a href="https://twitter.com/adawatak" target="_blank" rel="noopener noreferrer" title="𝕏 تويتر">𝕏</a>
                <a href="https://facebook.com/adawatak" target="_blank" rel="noopener noreferrer" title="فيسبوك">📘</a>
                <a href="mailto:contact@adwatak.cloud" title="تواصل معنا">✉️</a>
              </div>
            </div>

            {/* Categories */}
            <div className="footer">
              <h3>الأقسام</h3>
              <a href="/#financial">💰 حاسبات مالية</a>
              <a href="/#islamic">🕌 الأدوات الإسلامية</a>
              <a href="/#text">📝 أدوات نصية</a>
              <a href="/#image">🖼️ أدوات الصور</a>
              <a href="/#pdf">📄 أدوات PDF</a>
              <a href="/#converters">🔄 محولات</a>
              <a href="/#generators">⚡ مولدات</a>
              <a href="/#dev">💻 تطوير ويب</a>
            </div>

            {/* Pages */}
            <div className="footer">
              <h3>صفحات مهمة</h3>
              <a href="/">🏠 الرئيسية</a>
              <a href="/blog">📝 المدونة</a>
              <a href="/about">ℹ️ عن الموقع</a>
              <a href="/privacy">🔒 سياسة الخصوصية</a>
              <a href="mailto:contact@adwatak.cloud">📧 تواصل معنا</a>
            </div>

            {/* Newsletter */}
            <div className="footer">
              <h3>📬 ابق على تواصل</h3>
              <p style={{ fontSize: "0.82rem", color: "#94a3b8", marginBottom: "12px", lineHeight: "1.7" }}>
                وصلك الجديد في أدواتنا أول ما يتنشر.
              </p>
              <NewsletterForm lang="ar" />
            </div>
          </div>

          <div className="copyright scroll-fade-in">
            © {new Date().getFullYear()} أدواتك — جميع الحقوق محفوظة | adwatak.cloud | لكل العرب والعالم 🌍
          </div>
        </div>
      </footer>
    </div>
  );
}
