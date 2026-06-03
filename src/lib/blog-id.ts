export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  keywords: string[];
}

export function getAllIdPosts(): BlogPost[] {
  return idBlogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getIdPostBySlug(slug: string): BlogPost | undefined {
  return idBlogPosts.find((p) => p.slug === slug);
}

export function getIdPostsByCategory(category: string): BlogPost[] {
  return idBlogPosts.filter((p) => p.category === category);
}

function todayIdStr(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const idBlogPosts: BlogPost[] = [
  {
    slug: "apa-itu-adwatak",
    title: "Apa Itu Adwatak? — Panduan Lengkap Platform 50+ Alat Online Gratis 2026",
    excerpt:
      "Apa itu Adwatak.cloud, alat apa saja yang tersedia, dan cara menggunakannya? Temukan 50+ alat gratis dari kalkulator keuangan hingga alat Islami, alat teks, konverter PDF, dan banyak lagi.",
    content: `
<h2>Apa Itu Adwatak.cloud?</h2>
<p><strong>Adwatak</strong> (Arab: أدواتك — "Alat Anda") adalah platform yang menyediakan alat online gratis untuk semua orang. Dengan 50+ alat interaktif, dari kalkulator keuangan hingga alat Islami, editor teks hingga konverter PDF, Adwatak menjawab setiap kebutuhan digital Anda.</p>
<p>Platform ini tersedia dalam bahasa Arab, Inggris, Turki, dan Indonesia. Semua alat sepenuhnya gratis, tidak perlu daftar, dan berjalan di browser Anda — tidak ada data yang dikirim ke server.</p>

<h2>Alat Apa Saja yang Tersedia?</h2>
<h3>💰 Kalkulator Keuangan</h3>
<ul>
  <li><strong>Kalkulator KPR</strong> — Cicilan bulanan dan tabel amortisasi</li>
  <li><strong>Kalkulator Pinjaman</strong> — Bunga pinjaman dan total pembayaran</li>
  <li><strong>Kalkulator EMI</strong> — Cicilan Bulanan Tetap (EMI)</li>
  <li><strong>Kalkulator Bunga Majemuk</strong> — Perhitungan pertumbuhan investasi</li>
  <li><strong>Kalkulator PPN</strong> — Tambah atau kurangi PPN</li>
  <li><strong>Kalkulator Gaji Bersih</strong> — Gaji setelah potongan</li>
  <li><strong>Kalkulator Emas</strong> — Nilai emas per gram dan zakat</li>
  <li><strong>Kalkulator Margin Keuntungan</strong> — Margin dan titik impas</li>
</ul>

<h3>🕌 Alat Islami</h3>
<ul>
  <li><strong>Kalkulator Waris Islam</strong> — Pembagian waris menurut syariat Islam (Faraid)</li>
  <li><strong>Kalkulator Zakat</strong> — Zakat atas uang, emas, dan saham</li>
  <li><strong>Arah Kiblat</strong> — Arah kiblat dari lokasi Anda</li>
  <li><strong>Waktu Sholat</strong> — Waktu sholat berdasarkan lokasi Anda</li>
  <li><strong>Konversi Hijriah ↔ Masehi</strong> — Konversi tanggal</li>
</ul>

<h3>📝 Alat Teks</h3>
<ul>
  <li>Penghitung Kata & Karakter</li>
  <li>Konversi Huruf Teks</li>
  <li>Angka ke Huruf</li>
  <li>Pembersih Teks</li>
  <li>Perbandingan Teks</li>
  <li>Detektor Konten AI</li>
  <li>Pemeriksa Tata Bahasa</li>
</ul>

<h3>📄 Alat PDF</h3>
<ul>
  <li>Penggabung PDF</li>
  <li>Pemisah PDF</li>
  <li>Kompresor PDF</li>
  <li>PDF ke Word</li>
</ul>

<h3>⚡ Generator</h3>
<ul>
  <li>Pembuat Kode QR</li>
  <li>Pembuat Barcode</li>
  <li>Pembuat Kata Sandi</li>
  <li>Pembuat Faktur</li>
</ul>

<h2>Mengapa Menggunakan Adwatak?</h2>
<ul>
  <li>✅ <strong>Sepenuhnya gratis</strong> — Tidak ada biaya tersembunyi, tidak ada plan premium</li>
  <li>✅ <strong>Tidak perlu daftar</strong> — Gunakan setiap alat secara instan</li>
  <li>✅ <strong>Berfokus pada privasi</strong> — Semua alat berjalan di browser Anda, data Anda tidak meninggalkan perangkat</li>
  <li>✅ <strong>Desain responsif</strong> — Berjalan di mobile dan desktop</li>
  <li>✅ <strong>Multi-bahasa</strong> — Arab, Inggris, Turki, dan Indonesia</li>
</ul>

<h2>Pertanyaan yang Sering Diajukan</h2>
<h3>Apakah Adwatak gratis?</h3>
<p>Ya, semua alat 100% gratis. Tidak ada biaya tersembunyi atau plan premium.</p>

<h3>Apakah perlu mendaftar?</h3>
<p>Tidak, Anda tidak perlu membuat akun atau mendaftar. Gunakan setiap alat secara instan.</p>

<h3>Apakah data saya aman?</h3>
<p>Ya, semua alat berjalan di browser Anda (sisi klien). Tidak ada data yang dikirim ke atau disimpan di server kami.</p>

<h3>Bahasa apa saja yang didukung?</h3>
<p>Adwatak tersedia dalam bahasa Arab (asli), Inggris, Turki, dan Indonesia.</p>

<h3>Apakah alat baru ditambahkan?</h3>
<p>Ya, kami secara rutin menambahkan alat baru. Kirimkan saran Anda melalui email.</p>
`,
    date: "2026-06-03",
    category: "Umum",
    readTime: "5 menit membaca",
    keywords: ["Adwatak", "alat gratis", "alat online", "kalkulator keuangan", "alat Islami"],
  },
];

export { idBlogPosts };
