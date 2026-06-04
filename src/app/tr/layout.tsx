import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import NewsletterForm from "../components/NewsletterForm";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-english",
});

const baseUrl = "https://adwatak.cloud";

export const metadata: Metadata = {
  title: {
    default: "Adwatak — Ücretsiz Çevrimiçi Araçlar",
    template: "%s — Adwatak",
  },
  description: "Herkes için ücretsiz çevrimiçi araçlar — hesaplayıcılar, dönüştürücüler, oluşturucular ve daha fazlası. Kayıt gerekmez, reklam yok. 50+ araç.",
  keywords: ["araçlar", "hesaplayıcılar", "dönüştürücüler", "oluşturucular", "ücretsiz araçlar", "çevrimiçi araçlar"],
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: `${baseUrl}/tr`,
    languages: {
      "ar": baseUrl,
      "en": `${baseUrl}/en`,
      "tr": `${baseUrl}/tr`,
      "id": `${baseUrl}/id`,
      "x-default": baseUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Adwatak",
    title: "Adwatak — 50+ Ücretsiz Çevrimiçi Araç",
    description: "Ücretsiz çevrimiçi araçlar — hesaplayıcılar, dönüştürücüler, oluşturucular ve daha fazlası. Kayıt gerekmez.",
    url: `${baseUrl}/tr`,
    images: [
      {
        url: `${baseUrl}/og-tr.svg`,
        width: 1200,
        height: 630,
        alt: "Adwatak — 50+ Ücretsiz Araç",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@adawatak",
    creator: "@adawatak",
    title: "Adwatak — 50+ Ücretsiz Çevrimiçi Araç",
    description: "Ücretsiz çevrimiçi araçlar — hesaplayıcılar, dönüştürücüler, oluşturucular ve daha fazlası. Kayıt gerekmez.",
    images: [`${baseUrl}/og-tr.svg`],
  },
};

export default function TrLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`$\{inter.variable}`} dir="ltr">
      {/* Trust Bar */}
      <div className="trust-bar scroll-fade-in">
        <div className="container trust-bar-inner">
          <div className="trust-item">
            <span className="t-icon">🔒</span>
            <span>%100 Gizli — Dosya yükleme yok</span>
          </div>
          <div className="trust-item">
            <span className="t-icon">🆓</span>
            <span>Ücretsiz — Kayıt gerekmez</span>
          </div>
          <div className="trust-item">
            <span className="t-icon">⚡</span>
            <span>Anında sonuçlar</span>
          </div>
          <div className="trust-item">
            <span className="t-icon">🔧</span>
            <span>50+ araç</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <Header lang="tr" />

      <main className="container" style={{ padding: "32px 20px 48px" }}>{children}</main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid scroll-fade-in">
            {/* Brand */}
            <div className="footer footer-brand">
              <div className="footer-logo">
                <span>🔧</span>
                <span>Adwatak</span>
              </div>
              <p className="footer-desc">
                50'den fazla hesaplayıcı, dönüştürücü, oluşturucu ve yardımcı araç sunan ücretsiz çevrimiçi araç platformu — tümü tarayıcınızda çalışır. Kayıt gerekmez, dosya yükleme yok, takip yok.
              </p>
              <div className="footer-social">
                <a href="https://twitter.com/adawatak" target="_blank" rel="noopener noreferrer" title="𝕏 Twitter">𝕏</a>
                <a href="https://facebook.com/adawatak" target="_blank" rel="noopener noreferrer" title="Facebook">📘</a>
                <a href="mailto:contact@adwatak.cloud" title="İletişim">✉️</a>
              </div>
            </div>

            {/* Categories */}
            <div className="footer">
              <h3>Kategoriler</h3>
              <a href="/#financial">💰 Finansal Hesaplamalar</a>
              <a href="/#islamic">🕌 İslami Araçlar</a>
              <a href="/#text">📝 Metin Araçları</a>
              <a href="/#image">🖼️ Görsel Araçları</a>
              <a href="/#pdf">📄 PDF Araçları</a>
              <a href="/#converters">🔄 Dönüştürücüler</a>
              <a href="/#generators">⚡ Oluşturucular</a>
              <a href="/#dev">💻 Geliştirici Araçları</a>
            </div>

            {/* Pages */}
            <div className="footer">
              <h3>Önemli Sayfalar</h3>
              <a href="/tr">🏠 Ana Sayfa</a>
              <a href="/tr/blog">📝 Blog</a>
              <a href="/tr/about">ℹ️ Hakkımızda</a>
              <a href="/tr/privacy">🔒 Gizlilik Politikası</a>
              <a href="mailto:contact@adwatak.cloud">📧 İletişim</a>
            </div>

            {/* Newsletter */}
            <div className="footer">
              <h3>📬 Güncel Kalın</h3>
              <p style={{ fontSize: "0.82rem", color: "#94a3b8", marginBottom: "12px", lineHeight: "1.7" }}>
                Yeni araçlar eklendiğinde haberdar olun.
              </p>
              <NewsletterForm lang="tr" />
            </div>
          </div>

          <div className="copyright scroll-fade-in">
            © {new Date().getFullYear()} Adwatak — Tüm hakları saklıdır | adwatak.cloud | Herkes için, her yerde 🌍
          </div>
        </div>
      </footer>
    </div>
  );
}
