"use client";
import { useState, useEffect } from "react";
import { useSearch } from "../components/SearchProvider";
import { SearchProvider } from "../components/SearchProvider";
import SearchBar from "../components/SearchBar";

const categories = [
  { name: "Kalkulator Keuangan", slug: "calculators", icon: "💰", count: "10", desc: "KPR, pinjaman, EMI, margin keuntungan, PPN, gaji, dan lainnya" },
  { name: "Alat Teks", slug: "text", icon: "📝", count: "12", desc: "Penghitung kata, konversi huruf, plagiarisme, tata bahasa, tes mengetik" },
  { name: "Alat Gambar", slug: "image", icon: "🖼️", count: "5", desc: "Hapus latar, ubah ukuran, kompres, thumbnail YouTube" },
  { name: "Alat PDF", slug: "pdf", icon: "📄", count: "3", desc: "Gabung, pisah, kompres, PDF ke Word" },
  { name: "Konverter", slug: "converters", icon: "🔄", count: "5", desc: "Mata uang, satuan, warna, tanggal, angka ke huruf" },
  { name: "Generator", slug: "generators", icon: "⚡", count: "6", desc: "QR code, barcode, kata sandi, faktur" },
  { name: "Alat Pengembang", slug: "dev", icon: "💻", count: "7", desc: "JSON, Base64, hash, audit SEO, CSS, Markdown, IP lookup" },
  { name: "Alat Islami", slug: "islamic", icon: "🕌", count: "7", desc: "Waris, Zakat, Kiblat, Waktu Sholat, Tasbih, Umrah, Fidyah & Kaffarah" },
  { name: "Lainnya", slug: "daily", icon: "🌟", count: "5", desc: "Usia, BMI, kalori, stopwatch, analisis kalori foto" },
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
  { title: "Kalkulator Cicilan Mobil", icon: "🚗", href: "/id/tools/car-installment", desc: "Cicilan pembiayaan mobil", cat: "Kalkulator Keuangan" },
  { title: "Kalkulator Persentase", icon: "🧮", href: "/id/tools/percentage-calculator", desc: "Hitung persentase tiga cara", cat: "Kalkulator Keuangan" },
  { title: "Kalkulator Durasi Tanggal", icon: "📆", href: "/id/tools/date-duration", desc: "Selisih antara dua tanggal", cat: "Kalkulator Keuangan" },
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
  { title: "Pembuat Bio", icon: "👤", href: "/id/tools/bio-generator", desc: "Buat bio menarik untuk sosmed", cat: "Alat Teks" },

  { title: "Penghapus Latar Belakang", icon: "🖼️", href: "/id/tools/background-remover", desc: "Hapus latar belakang dengan AI", cat: "Alat Gambar" },
  { title: "Pengubah Ukuran Gambar", icon: "🖼️", href: "/id/tools/image-resizer", desc: "Ubah dimensi gambar", cat: "Alat Gambar" },
  { title: "Kompresor Gambar", icon: "📦", href: "/id/tools/image-compressor", desc: "Kurangi ukuran file gambar", cat: "Alat Gambar" },
  { title: "Pengunduh Thumbnail YouTube", icon: "▶️", href: "/id/tools/youtube-thumbnail-downloader", desc: "Unduh thumbnail video YouTube", cat: "Alat Gambar" },
  { title: "Gambar ke PDF", icon: "📄", href: "/id/tools/image-to-pdf", desc: "Konversi gambar ke PDF", cat: "Alat Gambar" },

  { title: "Penggabung PDF", icon: "📎", href: "/id/tools/pdf-merger", desc: "Gabungkan beberapa file PDF", cat: "Alat PDF" },
  { title: "Pemisah PDF", icon: "✂️", href: "/id/tools/pdf-splitter", desc: "Pisah PDF menjadi halaman terpisah", cat: "Alat PDF" },
  { title: "Kompresor PDF", icon: "📦", href: "/id/tools/pdf-compressor", desc: "Kurangi ukuran file PDF", cat: "Alat PDF" },
  { title: "PDF ke Word", icon: "📄", href: "/id/tools/pdf-to-word", desc: "Konversi PDF ke Word yang dapat diedit", cat: "Alat PDF" },

  { title: "Konverter Mata Uang", icon: "💱", href: "/id/tools/currency-converter", desc: "Konversi mata uang dunia", cat: "Konverter" },
  { title: "Konverter Satuan", icon: "📏", href: "/id/tools/unit-converter", desc: "Panjang, berat, suhu, volume", cat: "Konverter" },
  { title: "Konverter Warna", icon: "🎨", href: "/id/tools/color-converter", desc: "HEX ↔ RGB ↔ HSL dengan pratinjau", cat: "Konverter" },
  { title: "Konversi Hijriah ↔ Masehi", icon: "📅", href: "/id/tools/hijri-converter", desc: "Konversi tanggal Hijriah dan Masehi", cat: "Konverter" },
  { title: "Konverter Suhu", icon: "🌡️", href: "/id/tools/temperature-converter", desc: "Celsius, Fahrenheit, Kelvin", cat: "Konverter" },
  { title: "Konverter Zona Waktu", icon: "🕐", href: "/id/tools/timezone-converter", desc: "Konversi waktu antar zona", cat: "Konverter" },
  { title: "Konverter Piksel", icon: "📏", href: "/id/tools/pixel-converter", desc: "Konversi piksel ke cm, inci", cat: "Konverter" },
  { title: "Kalkulator Usia", icon: "🎂", href: "/id/tools/age-calculator", desc: "Hitung usia dan zodiak", cat: "Lainnya" },

  { title: "Pembuat Kode QR", icon: "🔳", href: "/id/tools/qr-generator", desc: "Buat QR code dari tautan atau teks", cat: "Generator" },
  { title: "Pembaca Kode QR", icon: "📷", href: "/id/tools/qr-reader", desc: "Baca QR code dari gambar/kamera", cat: "Generator" },
  { title: "Pembuat Barcode", icon: "📊", href: "/id/tools/barcode-generator", desc: "Buat barcode untuk produk", cat: "Generator" },
  { title: "Pembuat Kata Sandi", icon: "🔐", href: "/id/tools/password-generator", desc: "Kata sandi kuat dan acak", cat: "Generator" },
  { title: "Pembuat Faktur", icon: "🧾", href: "/id/tools/invoice-generator", desc: "Buat faktur profesional", cat: "Generator" },
  { title: "Pembuat Tautan WhatsApp", icon: "💬", href: "/id/tools/whatsapp-link", desc: "Tautan langsung dengan pesan pra-isi", cat: "Generator" },
  { title: "Pembuat Angka Acak", icon: "🎲", href: "/id/tools/random-number", desc: "Angka acak dalam rentang tertentu", cat: "Generator" },
  { title: "Penulis Esai AI", icon: "✍️", href: "/id/tools/ai-essay-writer", desc: "Tulis artikel lengkap dengan AI", cat: "Generator" },

  { title: "Pemformat JSON", icon: "📋", href: "/id/tools/json-formatter", desc: "Format, validasi, minify JSON", cat: "Alat Pengembang" },
  { title: "Encoder/Decoder Base64", icon: "📦", href: "/id/tools/base64-encoder", desc: "Enkode dan dekode Base64", cat: "Alat Pengembang" },
  { title: "Pembuat Hash", icon: "🔑", href: "/id/tools/hash-generator", desc: "MD5, SHA-1, SHA-256, SHA-512", cat: "Alat Pengembang" },
  { title: "Alat Audit SEO", icon: "🔍", href: "/id/tools/seo-audit", desc: "Analisis SEO website gratis", cat: "Alat Pengembang" },
  { title: "Pengecil CSS", icon: "🎨", href: "/id/tools/css-minifier", desc: "Minify dan format kode CSS", cat: "Alat Pengembang" },
  { title: "Editor Markdown", icon: "📝", href: "/id/tools/markdown-editor", desc: "Tulis Markdown dengan pratinjau langsung", cat: "Alat Pengembang" },
  { title: "Pencarian IP", icon: "🌐", href: "/id/tools/ip-lookup", desc: "Info alamat IP", cat: "Alat Pengembang" },
  { title: "Encoder/Decoder URL", icon: "🔗", href: "/id/tools/encoder", desc: "Enkode dan dekode URL", cat: "Alat Pengembang" },
  { title: "Alat Enkripsi", icon: "🔐", href: "/id/tools/encryption-tool", desc: "Enkripsi dan dekripsi teks", cat: "Alat Pengembang" },
  { title: "Pembuat Konten SEO", icon: "📝", href: "/id/tools/seo-content-generator", desc: "Hasilkan konten SEO", cat: "Alat Pengembang" },
  { title: "Generator UUID", icon: "🆔", href: "/id/tools/uuid-generator", desc: "Hasilkan UUID v4/v7", cat: "Alat Pengembang" },
  { title: "Alat Riset Kata Kunci", icon: "🔎", href: "/id/tools/keyword-research", desc: "Riset kata kunci SEO", cat: "Alat Pengembang" },

  { title: "Kalkulator Waris Islam", icon: "📜", href: "/id/tools/inheritance-calculator", desc: "Pembagian waris menurut syariat Islam (Faraid)", cat: "Alat Islami" },
  { title: "Kalkulator Zakat", icon: "🕌", href: "/id/tools/zakat-calculator", desc: "Kewajiban zakat tahunan 2.5%", cat: "Alat Islami" },
  { title: "Arah Kiblat", icon: "🧭", href: "/id/tools/qibla-direction", desc: "Cari arah kiblat dari lokasi Anda", cat: "Alat Islami" },
  { title: "Waktu Sholat", icon: "🕐", href: "/id/tools/prayer-times", desc: "Waktu sholat berdasarkan lokasi Anda", cat: "Alat Islami" },
  { title: "Penghitung Tasbih", icon: "📿", href: "/id/tools/tasbeeh-counter", desc: "Tasbih digital untuk dzikir harian", cat: "Alat Islami" },
  { title: "Kalkulator Umrah", icon: "🕋", href: "/id/tools/umrah-calculator", desc: "Hitung biaya Umrah dan panduan langkah demi langkah", cat: "Alat Islami" },
  { title: "Kalkulator Fidyah & Kaffarah", icon: "⚖️", href: "/id/tools/fidyah-kaffarah", desc: "Hitung Fidyah & Kaffarah — sumpah, Ramadhan, Zhihar", cat: "Alat Islami" },

  { title: "Kalkulator BMI", icon: "⚖️", href: "/id/tools/bmi-calculator", desc: "Indeks Massa Tubuh", cat: "Lainnya" },
  { title: "Kalkulator Berat Ideal", icon: "⚖️", href: "/id/tools/ideal-weight", desc: "Berat ideal berdasarkan tinggi", cat: "Lainnya" },
  { title: "Analisis Kalori Makanan", icon: "📸", href: "/id/tools/food-calorie-analyzer", desc: "Foto makanan, dapatkan analisis kalori instan", cat: "Lainnya" },
  { title: "Stopwatch", icon: "⏱️", href: "/id/tools/stopwatch", desc: "Stopwatch dengan penghitung putaran", cat: "Lainnya" },
];

const featuredTools = [
  { title: "Kalkulator KPR", desc: "Cicilan bulanan + tabel amortisasi", icon: "🏠", href: "/id/tools/mortgage-calculator" },
  { title: "Kalkulator BMI", desc: "Indeks Massa Tubuh", icon: "⚖️", href: "/id/tools/bmi-calculator" },
  { title: "Pembuat Kode QR", desc: "Buat QR code untuk tautan apa pun", icon: "🔳", href: "/id/tools/qr-generator" },
  { title: "Konverter Warna", desc: "HEX ↔ RGB ↔ HSL", icon: "🎨", href: "/id/tools/color-converter" },
  { title: "Konverter Mata Uang", desc: "Kurs mata uang langsung", icon: "💱", href: "/id/tools/currency-converter" },
  { title: "PDF ke Word", desc: "Konversi PDF ke teks yang dapat diedit", icon: "📄", href: "/id/tools/pdf-to-word" },
  { title: "Analisis Kalori Makanan", icon: "📸", href: "/id/tools/food-calorie-analyzer", desc: "Foto makanan, analisis kalori instan" },
  { title: "Gambar ke Teks (OCR)", icon: "👁️", href: "/id/tools/image-to-text", desc: "Ekstrak teks dari gambar dengan OCR", cat: "Alat Gambar" },
];

function IdHomeInner() {
  const { search } = useSearch();
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
    } else if (!hash) {
      setActiveCat(null);
    }
  };

  const scrollToTools = () => {
    const hash = window.location.hash.replace("#", "");
    if (hash && hashToCat[hash]) {
      setTimeout(() => {
        const el = document.querySelector("[data-tools-section]");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  };

  useEffect(() => {
    applyHashFilter();
    const onHash = () => { applyHashFilter(); scrollToTools(); };
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onHash);
    };
  }, []);

  const catToHash: Record<string, string> = {};
  for (const [k, v] of Object.entries(hashToCat)) { catToHash[v] = k; }

  const filtered = allTools.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = !activeCat || t.cat === activeCat;
    return matchSearch && matchCat;
  });

  const isSearching = search.trim().length > 0;

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
          Kalkulator, konverter, generator, alat PDF, dan lainnya — 100% gratis, tanpa pendaftaran, dan tidak ada yang diunggah.
        </p>
        <div className="hero-badges">
          <div className="hero-badge-item">
            <span className="b-icon">🔒</span>
            <span>100% Privasi</span>
          </div>
          <div className="hero-badge-item">
            <span className="b-icon">🆓</span>
            <span>Tanpa daftar</span>
          </div>
          <div className="hero-badge-item">
            <span className="b-icon">⚡</span>
            <span>Hasil instan</span>
          </div>
          <div className="hero-badge-item">
            <span className="b-icon">🌐</span>
            <span>Bekerja online</span>
          </div>
        </div>
      </section>

      {/* Smart Search */}
      <div className="mt-8 mb-4" data-scroll-target>
        <SearchBar lang="id" />
      </div>

      {/* Featured — hides when searching or category selected */}
      {!isSearching && !activeCat && (
        <section className="featured-section scroll-fade-in" style={{ marginTop: "40px" }}>
          <div className="section-header">
            <h2 className="section-title">
              <span className="s-icon">⭐</span>
              Alat Paling Populer
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
      )}

      {/* All Tools header — hides when searching */}
      {!isSearching && (
        <div className="section-header scroll-fade-in" style={{ marginTop: "56px", marginBottom: "4px" }}>
          <h2 className="section-title">
            <span className="s-icon">🗂️</span>
            Semua Alat
          </h2>
        </div>
      )}

      {/* Search results header */}
      {isSearching && (
        <div className="search-results-header">
          <span className="srh-icon">🔍</span>
          <span>Hasil pencarian: <strong>"{search}"</strong></span>
          <span className="srh-count">{filtered.length} alat</span>
        </div>
      )}

      {/* Categories — hidden when searching */}
      {!isSearching && (
        <div className="cats">
          <button onClick={() => { setActiveCat(null); window.location.hash = ""; }} className={`cat-btn ${!activeCat ? "active" : ""}`} id="all">🗂️ Semua</button>
          {categories.map((cat) => (
            <button key={cat.slug} onClick={() => { window.location.hash = catToHash[cat.name] || ""; }} className={`cat-btn ${activeCat === cat.name ? "active" : ""}`} id={cat.slug}>
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      )}

      <div data-tools-section>
        {filtered.length === 0 ? (
          <div className="empty">
            <p className="emoji">🔍</p>
            <p>Tidak ada hasil yang cocok</p>
            <p className="text-xs text-gray-400 mt-1">Coba pencarian atau kategori lain</p>
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
      </div>

      {/* Stats */}
      <div className="stats scroll-fade-in">
        {[
          { num: "50+", label: "Alat Gratis", icon: "🔧" },
          { num: "100%", label: "Tanpa Daftar", icon: "🔓" },
          { num: "0Rp", label: "Gratis Selamanya", icon: "💚" },
          { num: "24/7", label: "Selalu Tersedia", icon: "🌐" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="icon">{s.icon}</div>
            <div className="num">{s.num}</div>
            <div className="lbl">{s.label}</div>
          </div>
        ))}
      </div>

      {/* SEO Content */}
      <div className="mt-16 p-8 scroll-fade-in bg-white rounded-2xl border border-gray-200" style={{ marginTop: "56px" }}>
        <h2 className="text-xl font-extrabold text-gray-900 mb-4">
          🔧 Adwatak — Platform Alat Online Gratis Terlengkap
        </h2>
        <div className="text-sm text-gray-600 leading-8">
          <p className="mb-3">
            Adwatak adalah platform alat online gratis dengan 50+ utilitas untuk kebutuhan sehari-hari. Kami menyediakan kalkulator keuangan (KPR, pinjaman, EMI, PPN, margin laba), alat Islami (waris, zakat, waktu sholat, kiblat), alat teks (penghitung kata, tata bahasa, deteksi plagiarisme), alat PDF (gabung, kompres, konversi), generator (QR code, barcode, kata sandi, faktur), dan alat pengembang (JSON, Base64, hash, audit SEO).
          </p>
          <p className="mb-3">
            Semua alat berjalan langsung di peramban Anda — tidak ada yang diunggah ke server kami. Privasi Anda adalah prioritas kami. Tanpa akun, tanpa pelacakan, tanpa iklan.
          </p>
          <p>
            Punya saran alat? <a href="mailto:contact@adwatak.cloud" className="text-blue-600 font-semibold no-underline hover:underline">Hubungi kami</a> dan kami akan segera menambahkannya.
          </p>
        </div>
      </div>

      {/* Blog CTA */}
      <div className="blog-cta scroll-fade-in">
        <h2>📝 Blog</h2>
        <p>Tips, panduan, dan wawasan untuk membantu Anda memaksimalkan alat-alat kami</p>
        <a href="/id/blog" className="cta-btn">
          Jelajahi Blog →
        </a>
      </div>
    </>
  );
}

export default function IdHome() {
  return (
    <SearchProvider>
      <IdHomeInner />
    </SearchProvider>
  );
}
