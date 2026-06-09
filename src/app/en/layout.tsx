import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
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
      "tr": `${baseUrl}/tr`,
      "id": `${baseUrl}/id`,
      "x-default": baseUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Adawatak",
    title: "Adawatak — 80+ Free Online Tools",
    description: "Adwatak is the #1 free online tools platform. 80+ tools: calculators, converters, QR generators, PDF tools, text tools, image tools, Islamic tools, and AI tools. 100% free, no signup.",
    url: `${baseUrl}/en`,
    images: [
      {
        url: `${baseUrl}/og-en.png`,
        width: 1200,
        height: 630,
        alt: "Adawatak — 80+ Free Online Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@adawatak",
    creator: "@adawatak",
    title: "Adawatak — 80+ Free Online Tools",
    description: "Adwatak: 80+ free online tools. Calculators, converters, generators, PDF, text, image & Islamic tools. No signup. Free forever.",
    images: [`${baseUrl}/og-en.png`],
  },
};

export default async function EnLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const isEmbed = headersList.get("x-is-embed") === "true";

  if (isEmbed) {
    return <div className={`${inter.variable}`} dir="ltr">{children}</div>;
  }

  return (
    <div className={`${inter.variable}`} dir="ltr">
      {/* Trust Bar */}
          <div className="trust-bar scroll-fade-in">
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

      <main className="container" style={{ padding: "32px 20px 48px" }}>{children}</main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid scroll-fade-in">
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
                <a href="https://twitter.com/adawatak" target="_blank" rel="noopener noreferrer" title="X Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/people/Adwatak-Cloud-%D8%A7%D8%AF%D9%88%D8%A7%D8%AA%D9%83/61590469507527/" target="_blank" rel="noopener noreferrer" title="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/adwatak" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a href="https://m.youtube.com/@adwatk-cloud" target="_blank" rel="noopener noreferrer" title="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM10 16V8l8 4-8 4z"/>
                  </svg>
                </a>
                <a href="https://www.reddit.com/user/Silent-Network-1383/" target="_blank" rel="noopener noreferrer" title="Reddit">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm5.48 5.14a1.53 1.53 0 0 1 1.52 1.52 1.5 1.5 0 0 1-.64 1.22 5.76 5.76 0 0 1 .26 1.7c0 3.07-3.19 5.56-7.12 5.56S4.38 14.65 4.38 11.58a5.76 5.76 0 0 1 .25-1.7 1.5 1.5 0 0 1-.63-1.22 1.53 1.53 0 0 1 1.52-1.52c.46 0 .87.2 1.15.52a6.07 6.07 0 0 1 3.14-.99l.59-2.78a.3.3 0 0 1 .35-.24l1.96.4a1.07 1.07 0 0 1 1-.69 1.07 1.07 0 0 1 1.07 1.07 1.06 1.06 0 0 1-1.06 1.07c-.44 0-.82-.27-.97-.65l-1.76-.36-.53 2.5a6.03 6.03 0 0 1 3.02.98 1.5 1.5 0 0 1 1.14-.52zM8.88 13.13a1.2 1.2 0 0 1 1.2-1.19 1.2 1.2 0 0 1 1.2 1.2 1.2 1.2 0 0 1-1.2 1.19 1.2 1.2 0 0 1-1.2-1.2zm4.62 2.74a2.98 2.98 0 0 1-2.5.77 2.98 2.98 0 0 1-2.5-.77.36.36 0 0 1 .5-.5 2.25 2.25 0 0 0 2 .6 2.25 2.25 0 0 0 2-.6.36.36 0 0 1 .5.5zm-.22-3.93a1.2 1.2 0 0 1 0-2.4 1.2 1.2 0 0 1 0 2.4z"/>
                  </svg>
                </a>
                <a href="mailto:contact@adwatak.cloud" title="Contact us">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </a>
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

          <div className="copyright scroll-fade-in">
            © {new Date().getFullYear()} Adawatak — All rights reserved | adwatak.cloud | For everyone, everywhere 🌍
          </div>
        </div>
      </footer>
    </div>
  );
}
