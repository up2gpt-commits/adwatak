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
    default: "Adwatak — Alat Online Gratis",
    template: "%s — Adwatak",
  },
  description: "Alat online gratis untuk semua — kalkulator, konverter, generator, dan banyak lagi. Tidak perlu daftar, tanpa iklan. 50+ alat.",
  keywords: ["alat", "kalkulator", "konverter", "generator", "alat gratis", "alat online"],
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: `${baseUrl}/id`,
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
    locale: "id_ID",
    siteName: "Adwatak",
    title: "Adwatak — 50+ Alat Online Gratis",
    description: "Alat online gratis — kalkulator, konverter, generator, dan banyak lagi. Tidak perlu daftar.",
    url: `${baseUrl}/id`,
    images: [
      {
        url: `${baseUrl}/og-id.svg`,
        width: 1200,
        height: 630,
        alt: "Adwatak — 50+ Alat Gratis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@adawatak",
    creator: "@adawatak",
    title: "Adwatak — 50+ Alat Online Gratis",
    description: "Alat online gratis — kalkulator, konverter, generator, dan banyak lagi. Tidak perlu daftar.",
    images: [`${baseUrl}/og-id.svg`],
  },
};

export default function IdLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`$\{inter.variable}`} dir="ltr">
      {/* Trust Bar */}
      <div className="trust-bar scroll-fade-in">
        <div className="container trust-bar-inner">
          <div className="trust-item">
            <span className="t-icon">🔒</span>
            <span>100% Privat — Tidak ada unggah file</span>
          </div>
          <div className="trust-item">
            <span className="t-icon">🆓</span>
            <span>Gratis — Tidak perlu daftar</span>
          </div>
          <div className="trust-item">
            <span className="t-icon">⚡</span>
            <span>Hasil instan</span>
          </div>
          <div className="trust-item">
            <span className="t-icon">🔧</span>
            <span>50+ alat</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <Header lang="id" />

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
                Platform alat online gratis dengan 50+ kalkulator, konverter, generator, dan utilitas — semua berjalan di browser Anda. Tidak perlu daftar, tidak ada unggah file, tanpa pelacakan.
              </p>
              <div className="footer-social">
                <a href="https://twitter.com/adawatak" target="_blank" rel="noopener noreferrer" title="𝕏 Twitter">𝕏</a>
                <a href="https://facebook.com/adawatak" target="_blank" rel="noopener noreferrer" title="Facebook">📘</a>
                <a href="mailto:contact@adwatak.cloud" title="Kontak">✉️</a>
              </div>
            </div>

            {/* Categories */}
            <div className="footer">
              <h3>Kategori</h3>
              <a href="/#financial">💰 Kalkulator Keuangan</a>
              <a href="/#islamic">🕌 Alat Islami</a>
              <a href="/#text">📝 Alat Teks</a>
              <a href="/#image">🖼️ Alat Gambar</a>
              <a href="/#pdf">📄 Alat PDF</a>
              <a href="/#converters">🔄 Konverter</a>
              <a href="/#generators">⚡ Generator</a>
              <a href="/#dev">💻 Alat Pengembang</a>
            </div>

            {/* Pages */}
            <div className="footer">
              <h3>Halaman Penting</h3>
              <a href="/id">🏠 Beranda</a>
              <a href="/id/blog">📝 Blog</a>
              <a href="/id/about">ℹ️ Tentang Kami</a>
              <a href="/id/privacy">🔒 Kebijakan Privasi</a>
              <a href="mailto:contact@adwatak.cloud">📧 Hubungi Kami</a>
            </div>

            {/* Newsletter */}
            <div className="footer">
              <h3>📬 Tetap Update</h3>
              <p style={{ fontSize: "0.82rem", color: "#94a3b8", marginBottom: "12px", lineHeight: "1.7" }}>
                Dapatkan notifikasi saat alat baru ditambahkan.
              </p>
              <NewsletterForm lang="id" />
            </div>
          </div>

          <div className="copyright scroll-fade-in">
            © {new Date().getFullYear()} Adwatak — Hak cipta dilindungi | adwatak.cloud | Untuk semua orang, di mana saja 🌍
          </div>
        </div>
      </footer>
    </div>
  );
}
