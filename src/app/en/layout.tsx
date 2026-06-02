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
    default: "Adawatak — Free Online Tools",
    template: "%s — Adawatak",
  },
  description: "Free online tools for everyone — calculators, converters, generators, and more. No signup, no ads. 40+ tools available.",
  keywords: ["tools", "calculators", "converters", "generators", "free tools", "online tools"],
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: `${baseUrl}/en`,
    languages: {
      "ar": baseUrl,
      "en": `${baseUrl}/en`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Adawatak",
    title: "Adawatak — 50+ Free Online Tools",
    description: "Free online tools — calculators, converters, generators, and more. No signup required.",
    url: `${baseUrl}/en`,
    images: [
      {
        url: `${baseUrl}/og-en.svg`,
        width: 1200,
        height: 630,
        alt: "Adawatak — 40+ Free Online Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@adawatak",
    creator: "@adawatak",
    title: "Adawatak — 50+ Free Online Tools",
    description: "Free online tools — calculators, converters, generators, and more. No signup required.",
    images: [`${baseUrl}/og-en.svg`],
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable}`} dir="ltr">
      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="container trust-bar-inner">
          <div className="trust-item">
            <span className="t-icon">🔒</span>
            <span>100% Private — No file uploads</span>
          </div>
          <div className="trust-item">
            <span className="t-icon">🆓</span>
            <span>Free — No signup</span>
          </div>
          <div className="trust-item">
            <span className="t-icon">⚡</span>
            <span>Instant results</span>
          </div>
          <div className="trust-item">
            <span className="t-icon">🔧</span>
            <span>50+ tools</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <Header lang="en" />

      <main className="container" style={{ padding: "32px 20px" }}>{children}</main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer footer-brand">
              <div className="footer-logo">
                <span>🔧</span>
                <span>Adawatak</span>
              </div>
              <p className="footer-desc">
                Free online tools platform with 50+ calculators, converters, generators, and utilities — all running in your browser. No signup, no uploads, no tracking.
              </p>
              <div className="footer-social">
                <a href="https://twitter.com/adawatak" target="_blank" rel="noopener noreferrer" title="𝕏 Twitter">𝕏</a>
                <a href="https://facebook.com/adawatak" target="_blank" rel="noopener noreferrer" title="Facebook">📘</a>
                <a href="mailto:contact@adwatak.cloud" title="Contact us">✉️</a>
              </div>
            </div>

            {/* Categories */}
            <div className="footer">
              <h3>Categories</h3>
              <a href="/#financial">💰 Financial Calculators</a>
              <a href="/#islamic">🕌 Islamic Tools</a>
              <a href="/#text">📝 Text Tools</a>
              <a href="/#image">🖼️ Image Tools</a>
              <a href="/#pdf">📄 PDF Tools</a>
              <a href="/#converters">🔄 Converters</a>
              <a href="/#generators">⚡ Generators</a>
              <a href="/#dev">💻 Dev Tools</a>
            </div>

            {/* Pages */}
            <div className="footer">
              <h3>Important Pages</h3>
              <a href="/en">🏠 Home</a>
              <a href="/en/blog">📝 Blog</a>
              <a href="/en/about">ℹ️ About</a>
              <a href="/en/privacy">🔒 Privacy Policy</a>
              <a href="mailto:contact@adwatak.cloud">📧 Contact</a>
            </div>

            {/* Newsletter */}
            <div className="footer">
              <h3>📬 Stay Updated</h3>
              <p style={{ fontSize: "0.82rem", color: "#94a3b8", marginBottom: "12px", lineHeight: "1.7" }}>
                Get notified when we add new tools.
              </p>
              <NewsletterForm lang="en" />
            </div>
          </div>

          <div className="copyright">
            © {new Date().getFullYear()} Adawatak — All rights reserved | adwatak.cloud | For everyone, everywhere 🌍
          </div>
        </div>
      </footer>
    </div>
  );
}
