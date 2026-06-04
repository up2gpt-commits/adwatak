"use client";
import { useState, useEffect } from "react";

const categories = [
  { name: "Kalkulator Keuangan", slug: "calculators", icon: "💰", count: "10", desc: "KPR, pinjaman, EMI, margin keuntungan, PPN, gaji, dan lainnya" },
  { name: "Alat Teks", slug: "text", icon: "📝", count: "12", desc: "Penghitung kata, konversi huruf, plagiarisme, tata bahasa, tes mengetik" },
  { name: "Alat Gambar", slug: "image", icon: "🖼️", count: "5", desc: "Hapus latar, ubah ukuran, kompres, thumbnail YouTube" },
  { name: "Alat PDF", slug: "pdf", icon: "📄", count: "3", desc: "Gabung, pisah, kompres, PDF ke Word" },
  { name: "Konverter", slug: "converters", icon: "🔄", count: "5", desc: "Mata uang, satuan, warna, tanggal, angka ke huruf" },
  { name: "Generator", slug: "generators", icon: "⚡", count: "6", desc: "QR code, barcode, kata sandi, faktur" },
  { name: "Alat Pengembang", slug: "dev", icon: "💻", count: "7", desc: "JSON, Base64, hash, audit SEO, CSS, Markdown, IP lookup" },
  { name: "Alat Islami", slug: "islamic", icon: "🕌", count: "2", desc: "Waris, Zakat kalkulator" },
  { name: "Lainnya", slug: "daily", icon: "🌟", count: "4", desc: "Usia, BMI, kalori, stopwatch" },
];

const allTools = [
  { title: "Kalkulator KPR", icon: "🏠", href: "/id/tools/mortgage-calculator", desc: "Cicilan bulanan dan tabel amortisasi", cat: "Kalkulator Keuangan" },
  { title: "Kalkulator Pinjaman", icon: "💰", href: "/id/tools/loan-calculator", desc: "Bunga pinjaman dan total pembayaran", cat: "Kalkulator Keuangan" },
  { title: "Kalkulator EMI", icon: "🧮", href: "/id/tools/emi-calculator", desc: "Cicilan Bulanan Tetap (EMI)", cat: "Kalkulator Keuangan" },
  { title: "Kalkulator Bunga Majemuk", icon: "📈", href: "/id/tools/compound-interest", desc: "Pertumbuhan investasi dengan bunga majemuk", cat: "Kalkulator Keuangan" },
  { title: "Kalkulator margin Keuntungan", icon: "📐", href: "/id/tools/profit-margin", desc: "Margin dan rasio keuntungan", cat: "Kalkulator Keuangan" },
  { title: "Kalkulator Gaji Bersih", icon: "💵", href: "/id/tools/salary-calculator", desc: "Gaji bersih setelah potongan", cat: "Kalkulator Keuangan" },
  { title: "Kalkulator PPN", icon: "🏛️", href: "/id/tools/vat-calculator", desc: "Tambah atau kurangi PPN", cat: "Kalkulator Keuangan" },
  { title: "Kalkulator Emas", icon: "🥇", href: "/id/tools/gold-calculator", desc: "Nilai emas dan harga per gram", cat: "Kalkulator Keuangan" },
  { title: "Kalkulator Cicilan", icon: "📊", href: "/id/tools/installment-calculator", desc: "Rencana cicilan pembelian", cat: "Kalkulator Keuangan" },
  { title: "Kalkulator Kalori", icon: "🔥", href: "/id/tools/calorie-calculator", desc: "Kebutuhan kalori harian", cat: "Lainnya" },

  { title: "Penghitung Kata & Karakter", icon: "📝", href: "/id/tools/word-counter", desc: "Hitung kata, karakter, kalimat", cat: "Alat Teks" },
  { title: "Konversi Huruf Teks", icon: "🔤", href: "/id/tools/text-case", desc: "Besar, kecil, judul, kalimat", cat: "Alat Teks" },
  { title: "Pembersih Teks", icon: "🧹", href: "/id/tools/text-cleaner", desc: "Hapus spasi berlebih, tag HTML", cat: "Alat Teks" },
  { title: "Perbandingan Teks", icon: "⚖️", href: "/id/tools/text-compare", desc: "Temukan perbedaan dua teks", cat: "Alat Teks" },
  { title: "Detektor Konten AI", icon: "🤖", href: "/id/tools/ai-content-detector", desc: "Deteksi teks AI vs manusia", cat: "Alat Teks" },
  { title: "Angka ke Huruf", icon: "🔢", href: "/id/tools/number-to-words", desc: "Konversi angka ke kata Indonesia", cat: "Alat Teks" },
  { title: "Pemeriksa Plagiarisme", icon: "🚫", href: "/id/tools/plagiarism-checker", desc: "Cek orisinalitas teks", cat: "Alat Teks" },
  { title: "Pemeriksa Tata Bahasa", icon: "📝", href: "/id/tools/grammar-checker", desc: "Periksa ejaan dan tata bahasa", cat: "Alat Teks" },
  { title: "Alat Parafrase", icon: "✏️", href: "/id/tools/paraphrasing-tool", desc: "Tulis ulang teks dengan gaya baru", cat: "Alat Teks" },
  { title: "Tes Kecepatan Mengetik", icon: "⌨️", href: "/id/tools/typing-test", desc: "Kecepatan mengetik per menit", cat: "Alat Teks" },
  { title: "Penghitung Karakter Sosmed", icon: "📱", href: "/id/tools/social-character-counter", desc: "Twitter, Instagram, TikTok", cat: "Alat Teks" },
  { title: "Lorem Ipsum Arab", icon: "📄", href: "/id/tools/arabic-lorem", desc: "Buat teks placeholder Arab", cat: "Alat Teks" },

  { title: "Penghapus Latar Belakang", icon: "🖼️", href: "/id/tools/background-remover", desc: "Hapus latar belakang dengan AI", cat: "Alat Gambar" },
  { title: "Pengubah Ukuran Gambar", icon: "🖼️", href: "/id/tools/image-resizer", desc: "Ubah dimensi gambar", cat: "Alat Gambar" },
  { title: "Kompresor Gambar", icon: "📦", href: "/id/tools/image-compressor", desc: "Kurangi ukuran file gambar", cat: "Alat Gambar" },
  { title: "Pengunduh Thumbnail YouTube", icon: "▶️", href: "/id/tools/youtube-thumbnail-downloader", desc: "Unduh thumbnail video YouTube", cat: "Alat Gambar" },
  { title: "Gambar ke PDF", icon: "📄", href: "/id/tools/image-to-pdf", desc: "Konversi gambar ke PDF", cat: "Alat Gambar" },

  { title: "Penggabung PDF", icon: "📎", href: "/id/tools/pdf-merger", desc: "Gabungkan beberapa file PDF", cat: "Alat PDF" },
  { title: "Kompresor PDF", icon: "📦", href: "/id/tools/pdf-compressor", desc: "Kurangi ukuran file PDF", cat: "Alat PDF" },
  { title: "PDF ke Word", icon: "📄", href: "/id/tools/pdf-to-word", desc: "Konversi PDF ke Word yang dapat diedit", cat: "Alat PDF" },

  { title: "Konverter Mata Uang", icon: "💱", href: "/id/tools/currency-converter", desc: "Konversi mata uang dunia", cat: "Konverter" },
  { title: "Konverter Satuan", icon: "📏", href: "/id/tools/unit-converter", desc: "Panjang, berat, suhu, volume", cat: "Konverter" },
  { title: "Konverter Warna", icon: "🎨", href: "/id/tools/color-converter", desc: "HEX ↔ RGB ↔ HSL dengan pratinjau", cat: "Konverter" },
  { title: "Konversi Hijriah ↔ Masehi", icon: "📅", href: "/id/tools/hijri-converter", desc: "Konversi tanggal Hijriah dan Masehi", cat: "Konverter" },
  { title: "Kalkulator Usia", icon: "🎂", href: "/id/tools/age-calculator", desc: "Hitung usia dan zodiak", cat: "Lainnya" },

  { title: "Pembuat Kode QR", icon: "🔳", href: "/id/tools/qr-generator", desc: "Buat QR code dari tautan atau teks", cat: "Generator" },
  { title: "Pembaca Kode QR", icon: "📷", href: "/id/tools/qr-reader", desc: "Baca QR code dari gambar/kamera", cat: "Generator" },
  { title: "Pembuat Barcode", icon: "📊", href: "/id/tools/barcode-generator", desc: "Buat barcode untuk produk", cat: "Generator" },
  { title: "Pembuat Kata Sandi", icon: "🔐", href: "/id/tools/password-generator", desc: "Kata sandi kuat dan acak", cat: "Generator" },
  { title: "Pembuat Faktur", icon: "🧾", href: "/id/tools/invoice-generator", desc: "Buat faktur profesional", cat: "Generator" },
  { title: "Pembuat Tautan WhatsApp", icon: "💬", href: "/id/tools/whatsapp-link", desc: "Tautan langsung dengan pesan pra-isi", cat: "Generator" },
  { title: "Pembuat Angka Acak", icon: "🎲", href: "/id/tools/random-number", desc: "Angka acak dalam rentang tertentu", cat: "Generator" },

  { title: "Pemformat JSON", icon: "📋", href: "/id/tools/json-formatter", desc: "Format, validasi, minify JSON", cat: "Alat Pengembang" },
  { title: "Encoder/Decoder Base64", icon: "📦", href: "/id/tools/base64-encoder", desc: "Enkode dan dekode Base64", cat: "Alat Pengembang" },
  { title: "Pembuat Hash", icon: "🔑", href: "/id/tools/hash-generator", desc: "MD5, SHA-1, SHA-256, SHA-512", cat: "Alat Pengembang" },
  { title: "Alat Audit SEO", icon: "🔍", href: "/id/tools/seo-audit", desc: "Analisis SEO website gratis", cat: "Alat Pengembang" },
  { title: "Pengecil CSS", icon: "🎨", href: "/id/tools/css-minifier", desc: "Minify dan format kode CSS", cat: "Alat Pengembang" },
  { title: "Editor Markdown", icon: "📝", href: "/id/tools/markdown-editor", desc: "Tulis Markdown dengan pratinjau langsung", cat: "Alat Pengembang" },
  { title: "Pencarian IP", icon: "🌐", href: "/id/tools/ip-lookup", desc: "Info alamat IP", cat: "Alat Pengembang" },

  { title: "Kalkulator Waris Islam", icon: "📜", href: "/id/tools/inheritance-calculator", desc: "Pembagian waris menurut syariat Islam (Faraid)", cat: "Alat Islami" },
  { title: "Kalkulator Zakat", icon: "🕌", href: "/id/tools/zakat-calculator", desc: "Kewajiban zakat tahunan 2.5%", cat: "Alat Islami" },

  { title: "Kalkulator BMI", icon: "⚖️", href: "/id/tools/bmi-calculator", desc: "Indeks Massa Tubuh", cat: "Lainnya" },
  { title: "Stopwatch", icon: "⏱️", href: "/id/tools/stopwatch", desc: "Stopwatch dengan penghitung putaran", cat: "Lainnya" },
];

const featuredTools = [
  { title: "Kalkulator KPR", desc: "Cicilan bulanan + tabel amortisasi", icon: "🏠", href: "/id/tools/mortgage-calculator" },
  { title: "Kalkulator BMI", desc: "Indeks Massa Tubuh", icon: "⚖️", href: "/id/tools/bmi-calculator" },
  { title: "Pembuat Kode QR", desc: "Buat QR code untuk tautan apa pun", icon: "🔳", href: "/id/tools/qr-generator" },
  { title: "Konverter Warna", desc: "HEX ↔ RGB ↔ HSL", icon: "🎨", href: "/id/tools/color-converter" },
  { title: "Konverter Mata Uang", desc: "Kurs mata uang langsung", icon: "💱", href: "/id/tools/currency-converter" },
  { title: "PDF ke Word", desc: "Konversi PDF ke teks yang dapat diedit", icon: "📄", href: "/id/tools/pdf-to-word" },
  { title: "Gambar ke Teks (OCR)", icon: "👁️", href: "/id/tools/image-to-text", desc: "Ekstrak teks dari gambar dengan OCR", cat: "Alat Gambar" },
];

export default function IdHome() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const hashToCat: Record<string, string> = {
    financial: "Kalkulator Keuangan",
    text: "Alat Teks",
    image: "Alat Gambar",
    pdf: "Alat PDF",
    converters: "Konverter",
    generators: "Generator",
    dev: "Alat Pengembang",
    islamic: "Alat Islami",
    daily: "Lainnya",
  };

  const applyHashFilter = () => {
    const hash = window.location.hash.replace("#", "");
    if (hash && hashToCat[hash]) {
      setActiveCat(hashToCat[hash]);
    }
  };

  useEffect(() => {
    applyHashFilter();
    window.addEventListener("hashchange", applyHashFilter);
    return () => window.removeEventListener("hashchange", applyHashFilter);
  }, []);

  const filtered = allTools.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = !activeCat || t.cat === activeCat;
    return matchSearch && matchCat;
  });

  return (
    <>
      {/* Hero */}
      <section className="hero scroll-fade-in">
        <div className="hero-grid"></div>
        <div className="hero-orb-2"></div>
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          <span>Platform Alat Online Gratis #1</span>
        </div>
        <h1><span className="hero-gradient-text">Semua Alat yang Anda Butuhkan.</span><br />Gratis. Selamanya.</h1>
        <p>
          Kalkulator, konverter, generator, alat PDF, dan banyak lagi — 100% gratis, tidak perlu daftar, dan tidak ada yang diunggah.
        </p>
        <div className="hero-badges">
          <div className="hero-badge-item">
            <span className="b-icon">🔒</span>
            <span>100% Privat</span>
          </div>
          <div className="hero-badge-item">
            <span className="b-icon">🆓</span>
            <span>Tidak perlu daftar</span>
          </div>
          <div className="hero-badge-item">
            <span className="b-icon">⚡</span>
            <span>Hasil instan</span>
          </div>
          <div className="hero-badge-item">
            <span className="b-icon">🌐</span>
            <span>Berjalan online</span>
          </div>
        </div>
      </section>

      {/* Search + Category Filter */}
      <div className="search-wrap scroll-fade-in" style={{ marginTop: "40px" }}>
        <input
          type="text"
          placeholder="🔍 Cari alat..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setActiveCat(null); }}
          className="search-input"
        />
      </div>
      <div className="cats">
        <button onClick={() => setActiveCat(null)} className={`cat-btn ${!activeCat ? "active" : ""}`} id="all">🗂️ Semua</button>
        {categories.map((cat) => (
          <button key={cat.slug} onClick={() => setActiveCat(cat.name)} className={`cat-btn ${activeCat === cat.name ? "active" : ""}`} id={cat.slug}>
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Featured / Popular Tools */}
      <section className="featured-section scroll-fade-in" style={{ marginTop: "32px" }}>
        <div className="section-header">
          <h2 className="section-title">
            <span className="s-icon">⭐</span>
            Alat Populer
          </h2>
        </div>
        <div className="tools-grid-3">
          {featuredTools.map((tool, i) => (
            <a key={i} href={tool.href} className="featured-card card-shine">
              <span className="f-icon">{tool.icon}</span>
              <div className="f-title">{tool.title}</div>
              <div className="f-desc">{tool.desc}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="section-header scroll-fade-in" style={{ marginTop: "56px", marginBottom: "4px" }}>
        <h2 className="section-title">
          <span className="s-icon">🗂️</span>
          Semua Alat
        </h2>
      </div>

      {/* Tool Grid */}
      {filtered.length === 0 ? (
        <div className="empty scroll-fade-in">
          <p className="emoji">🔍</p>
          <p>Tidak ada alat yang cocok dengan pencarian Anda</p>
          <p className="text-xs text-gray-400 mt-1">Coba pencarian atau kategori yang berbeda</p>
        </div>
      ) : (
        <div className="tools-grid">
          {filtered.map((tool, i) => (
            <a key={i} href={tool.href} className="tool-card card-shine">
              <div className="tool-card-inner">
                <span className="tool-icon">{tool.icon}</span>
                <div>
                  <h3 className="tool-title">{tool.title}</h3>
                  <p className="tool-desc">{tool.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="stats scroll-fade-in">
        {[
          { num: "50+", label: "alat gratis", icon: "🔧" },
          { num: "100%", label: "tidak perlu daftar", icon: "🔓" },
          { num: "Rp0", label: "gratis selamanya", icon: "💚" },
          { num: "24/7", label: "selalu tersedia", icon: "🌐" },
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
          🔧 Adwatak — Platform Alat Online Gratis Lengkap
        </h2>
        <div className="text-sm text-gray-600 leading-8">
          <p className="mb-3">
            <strong>Adwatak</strong> menyediakan 50+ alat online gratis dalam satu platform.
            Kalkulator keuangan (KPR, pinjaman, cicilan, EMI, margin keuntungan, PPN),
            alat Islami (waris, zakat, konversi Hijriah, waktu sholat, arah kiblat),
            alat teks, konverter PDF, konverter satuan, dan alat pengembang.
          </p>
          <p className="mb-3">
            Semua alat berjalan langsung di browser Anda — tidak perlu daftar atau unggah file.
            Privasi Anda penting bagi kami. Semua pemrosesan terjadi di perangkat Anda, tidak ada data yang dikirim ke server kami.
          </p>
          <p>
            Punya saran alat baru? <a href="mailto:contact@adwatak.cloud" className="text-blue-600 font-semibold no-underline hover:underline">Hubungi kami</a> — kami akan segera menambahkannya.
          </p>
        </div>
      </div>

      {/* Blog CTA */}
      <div className="blog-cta scroll-fade-in">
        <h2>📝 Blog</h2>
        <p>
          Panduan dan artikel untuk membantu Anda memaksimalkan penggunaan alat kami
        </p>
        <a href="/id/blog" className="cta-btn">
          Jelajahi Blog →
        </a>
      </div>
    </>
  );
}
