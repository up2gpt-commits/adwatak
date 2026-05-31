import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";

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
    title: "Adawatak — 40+ Free Online Tools",
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
    title: "Adawatak — 40+ Free Online Tools",
    description: "Free online tools — calculators, converters, generators, and more. No signup required.",
    images: [`${baseUrl}/og-en.svg`],
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable}`} dir="ltr">
      <header className="site-header">
        <div className="container header-inner">
          <a href="/en" className="logo"><span>🔧</span><span>Adawatak</span></a>
          <nav className="nav">
            <a href="/en">Home</a>
            <a href="/en/blog">📝 Blog</a>
            <div className="lang-switch">
              <a href="/">عربي</a>
              <a href="/en" className="active">EN</a>
            </div>
          </nav>
        </div>
      </header>
      <main className="container en-content" style={{ padding: "32px 16px" }}>{children}</main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer">
              <h3>🔧 Adawatak</h3>
              <p style={{ fontSize: "0.875rem", color: "#64748b" }}>Free online tools for everyone — no signup, no annoying ads. 40+ tools and counting.</p>
            </div>
            <div className="footer">
              <h3>Categories</h3>
              <a href="/en/category/calculators">Financial Calculators</a>
              <a href="/en/category/islamic">Islamic Tools</a>
              <a href="/en/category/text">Text Tools</a>
              <a href="/en/category/converters">Converters</a>
              <a href="/en/category/generators">Generators</a>
            </div>
            <div className="footer">
              <h3>Useful Pages</h3>
              <a href="/en/about">About</a>
              <a href="/en/privacy">Privacy Policy</a>
              <a href="/en/blog">Blog</a>
            </div>
          </div>
          <div className="copyright">
            &copy; {new Date().getFullYear()} Adawatak &mdash; All rights reserved | adwatak.cloud
          </div>
        </div>
      </footer>
    </div>
  );
}
