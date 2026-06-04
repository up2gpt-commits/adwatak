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
  <li><strong><a href="https://adwatak.cloud/id/tools/mortgage-calculator"><strong>Kalkulator KPR</strong></a> — Cicilan bulanan dan tabel amortisasi</li>
  <li><strong><a href="https://adwatak.cloud/id/tools/loan-calculator"><strong>Kalkulator Pinjaman</strong></a> — Bunga pinjaman dan total pembayaran</li>
  <li><strong><a href="https://adwatak.cloud/id/tools/emi-calculator"><strong>Kalkulator EMI</strong></a> — Cicilan Bulanan Tetap (EMI)</li>
  <li><strong><a href="https://adwatak.cloud/id/tools/compound-interest"><strong>Kalkulator Bunga Majemuk</strong></a> — Perhitungan pertumbuhan investasi</li>
  <li><strong><a href="https://adwatak.cloud/id/tools/vat-calculator"><strong>Kalkulator PPN</strong></a> — Tambah atau kurangi PPN</li>
  <li><strong><a href="https://adwatak.cloud/id/tools/salary-calculator"><strong>Kalkulator Gaji Bersih</strong></a> — Gaji setelah potongan</li>
  <li><strong><a href="https://adwatak.cloud/id/tools/gold-calculator"><strong>Kalkulator Emas</strong></a> — Nilai emas per gram dan zakat</li>
  <li><strong><a href="https://adwatak.cloud/id/tools/profit-margin"><strong>Kalkulator Margin Keuntungan</strong></a> — Margin dan titik impas</li>
</ul>

<h3>🕌 Alat Islami</h3>
<ul>
  <li><strong><a href="https://adwatak.cloud/id/tools/inheritance-calculator"><strong>Kalkulator Waris Islam</strong></a> — Pembagian waris menurut syariat Islam (Faraid)</li>
  <li><strong><a href="https://adwatak.cloud/id/tools/zakat-calculator"><strong>Kalkulator Zakat</strong></a> — Zakat atas uang, emas, dan saham</li>
  <li><strong><a href="https://adwatak.cloud/id/tools/qibla-direction"><strong>Arah Kiblat</strong></a> — Arah kiblat dari lokasi Anda</li>
  <li><strong><a href="https://adwatak.cloud/id/tools/prayer-times"><strong>Waktu Sholat</strong></a> — Waktu sholat berdasarkan lokasi Anda</li>
  <li><strong><a href="https://adwatak.cloud/id/tools/hijri-converter"><strong>Konversi Hijriah ↔ Masehi</strong></a> — Konversi tanggal</li>
</ul>

<h3>📝 Alat Teks</h3>
<ul>
  <li><a href="https://adwatak.cloud/id/tools/word-counter">Penghitung Kata &amp; Karakter</a></li>
  <li><a href="https://adwatak.cloud/id/tools/text-case">Konversi Huruf Teks</a></li>
  <li><a href="https://adwatak.cloud/id/tools/number-to-words">Angka ke Huruf</a></li>
  <li><a href="https://adwatak.cloud/id/tools/text-cleaner">Pembersih Teks</a></li>
  <li><a href="https://adwatak.cloud/id/tools/text-compare">Perbandingan Teks</a></li>
  <li><a href="https://adwatak.cloud/id/tools/ai-content-detector">Detektor Konten AI</a></li>
  <li><a href="https://adwatak.cloud/id/tools/grammar-checker">Pemeriksa Tata Bahasa</a></li>
</ul>

<h3>📄 Alat PDF</h3>
<ul>
  <li><a href="https://adwatak.cloud/id/tools/pdf-merger">Penggabung PDF</a></li>
  <li><a href="https://adwatak.cloud/id/tools/pdf-splitter">Pemisah PDF</a></li>
  <li><a href="https://adwatak.cloud/id/tools/pdf-compressor">Kompresor PDF</a></li>
  <li><a href="https://adwatak.cloud/id/tools/pdf-to-word">PDF ke Word</a></li>
</ul>

<h3>⚡ Generator</h3>
<ul>
  <li><a href="https://adwatak.cloud/id/tools/qr-generator">Pembuat Kode QR</a></li>
  <li><a href="https://adwatak.cloud/id/tools/barcode-generator">Pembuat Barcode</a></li>
  <li><a href="https://adwatak.cloud/id/tools/password-generator">Pembuat Kata Sandi</a></li>
  <li><a href="https://adwatak.cloud/id/tools/invoice-generator">Pembuat Faktur</a></li>
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
  {
    slug: "cara-menghitung-kpr-panduan-lengkap-2026",
    title: "Cara Menghitung KPR dengan Benar — Panduan Lengkap 2026",
    excerpt:
      "Panduan lengkap menghitung KPR rumah di Indonesia: rumus cicilan, simulasi, tips memperbesar persetujuan, dan kesalahan yang harus dihindari. Gunakan kalkulator KPR Adwatak untuk perhitungan instan.",
    content: `
<h2>Apa Itu KPR dan Mengapa Perlu Dihitung dengan Benar?</h2>
<p><strong>KPR (Kredit Pemilikan Rumah)</strong> adalah fasilitas pinjaman dari bank yang digunakan untuk membeli rumah. Bagi kebanyakan orang di Indonesia, KPR adalah satu-satunya cara untuk memiliki rumah tanpa harus membayar tunai seluruhnya.</p>
<p>Namun, mengajukan KPR bukan sekadar mengisi formulir dan menunggu persetujuan. Anda perlu memahami berapa cicilan bulanan yang harus dibayar, berapa total bunga selama masa kredit, dan apakah kemampuan finansial Anda cukup. Kesalahan dalam menghitung KPR bisa berujung pada <strong>kredit macet</strong> atau beban finansial yang terlalu berat.</p>

<h2>Komponen Utama dalam Perhitungan KPR</h2>
<p>Sebelum menghitung, pahami dulu komponen-komponen berikut:</p>
<ul>
  <li><strong>Harga Rumah:</strong> Total harga properti yang ingin Anda beli.</li>
  <li><strong>DP (Uang Muka):</strong> Pembayaran awal, biasanya 20–30% dari harga rumah.</li>
  <li><strong>Pokok Pinjaman:</strong> Harga rumah dikurangi DP. Inilah jumlah yang akan dibiayai bank.</li>
  <li><strong>Suku Bunga:</strong> Bisa tetap (fixed) atau mengambang (floating). Di Indonesia, bunga KPR per 2026 berkisar antara 5,5%–9% per tahun.</li>
  <li><strong>Tenor (Jangka Waktu):</strong> Lama waktu kredit, biasanya 5, 10, 15, 20, hingga 25 tahun.</li>
</ul>

<h2>Rumus Menghitung Cicilan KPR</h2>
<p>Cicilan KPR dihitung menggunakan metode <strong>anuitas</strong>, di mana setiap cicilan bulanan memiliki nilai yang sama selama masa kredit. Rumusnya:</p>
<p><strong>Cicilan Bulanan = P × [r(1+r)^n] / [(1+r)^n − 1]</strong></p>
<p>Di mana:</p>
<ul>
  <li><strong>P</strong> = Pokok pinjaman (harga rumah − DP)</li>
  <li><strong>r</strong> = Suku bunga per bulan (bunga tahunan ÷ 12)</li>
  <li><strong>n</strong> = Jumlah total cicilan (tenor dalam tahun × 12)</li>
</ul>

<h3>Contoh Simulasi KPR</h3>
<p>Misalnya Anda ingin membeli rumah seharga <strong>Rp 500.000.000</strong> dengan ketentuan:</p>
<ul>
  <li>DP: 20% = Rp 100.000.000</li>
  <li>Pokok pinjaman: Rp 400.000.000</li>
  <li>Suku bunga: 6% per tahun (0,5% per bulan)</li>
  <li>Tenor: 20 tahun (240 bulan)</li>
</ul>
<p>Dengan rumus di atas, cicilan bulanan Anda sekitar <strong>Rp 2.865.715</strong>. Total yang akan Anda bayar selama 20 tahun adalah sekitar <strong>Rp 687.771.600</strong>, artinya total bunga yang dibayar mencapai <strong>Rp 287.771.600</strong>.</p>
<p>Untuk menghindari perhitungan manual yang rumit, Anda bisa menggunakan <a href="https://adwatak.cloud/id/tools/mortgage-calculator" target="_blank" rel="noopener noreferrer">Kalkulator KPR Adwatak</a> yang memberikan hasil instan beserta tabel amortisasi lengkap.</p>

<h2>Perbedaan Bunga Fixed dan Floating</h2>
<h3>Bunga Fixed (Tetap)</h3>
<p>Suku bunga tidak berubah selama periode tertentu (biasanya 1–5 tahun pertama). Kelebihannya: cicilan stabil dan mudah dianggapi. Kekurangannya: biasanya lebih tinggi dari bunga floating awal.</p>

<h3>Bunga Floating (Mengambang)</h3>
<p>Suku bunga bisa naik atau turun mengikuti kebijakan suku bunga Bank Indonesia. Di awal kredit, cicilan lebih murah, tapi bisa meningkat sewaktu-waktu. Cocok jika Anda memperkirakan suku bunga akan turun dalam beberapa tahun ke depan.</p>

<h2>Tips Memperbesar Peluang Persetujuan KPR</h2>
<ol>
  <li><strong>Siapkan DP yang memadai.</strong> Semakin besar DP, semakin kecil pinjaman dan semakin tinggi peluang disetujui. Usahakan minimal 30%.</li>
  <li><strong>Jaga skor kredit (BI Checking).</strong> Pastikan tidak ada riwayat tunggakan kredit. Cek skor kredit Anda di OJK sebelum mengajukan.</li>
  <li><strong>Siapkan dokumen lengkap.</strong> KTP, KK, NPWP, slip gaji, rekening koran 3–6 bulan terakhir, dan surat keterangan kerja.</li>
  <li><strong>Perhatikan rasio cicilan terhadap penghasilan.</strong> Idealnya, cicilan KPR tidak melebihi 30% dari penghasilan bulanan bersih Anda.</li>
  <li><strong>Bandingkan beberapa bank.</strong> Setiap bank punya kebijakan bunga dan syarat yang berbeda. Jangan langsung menerima tawaran pertama.</li>
  <li><strong>Pilih tenor yang realistis.</strong> Tenor lebih panjang = cicilan lebih ringan, tapi total bunga lebih besar. Temukan keseimbangan yang sesuai kemampuan Anda.</li>
</ol>

<h2>Kesalahan Umum dalam Mengajukan KPR</h2>
<ul>
  <li><strong>Tidak menghitung kemampuan finansial.</strong> Banyak orang tergoda oleh rumah impian tanpa menghitung apakah cicilan terjangkau.</li>
  <li><strong>Mengabaikan biaya tambahan.</strong> Selain DP, ada biaya notaris, asuransi, pajak (BPHTB), dan biaya appraisal. Siapkan tambahan 5–10% dari harga rumah.</li>
  <li><strong>Tidak membaca kontrak dengan teliti.</strong> Perhatikan klausa penalti pelunasan dini, biaya administrasi, dan kebijakan perubahan suku bunga.</li>
  <li><strong>Mengajukan KPR saat suku bunga sedang tinggi.</strong> Pantau tren suku bunga BI dan ajukan saat kondisi paling menguntungkan.</li>
  <li><strong>Menggunakan seluruh tabungan untuk DP.</strong> Selalu sisakan dana darurat minimal 3–6 bulan pengeluaran hidup.</li>
</ul>

<h2>Kapan Waktu yang Tepat untuk Mengajukan KPR?</h2>
<p>Secara umum, waktu terbaik mengajukan KPR adalah saat:</p>
<ul>
  <li>Suku bunga Bank Indonesia sedang rendah atau stabil.</li>
  <li>Penghasilan Anda sudah stabil minimal 2 tahun di pekerjaan yang sama.</li>
  <li>Anda sudah memiliki dana darurat yang cukup.</li>
  <li>Harga properti tidak sedang dalam kenaikan spekulatif yang ekstrem.</li>
</ul>

<h2>Kesimpulan</h2>
<p>Menghitung KPR dengan benar adalah langkah pertama dan terpenting sebelum membeli rumah. Dengan memahami rumus cicilan, membandingkan jenis bunga, dan menyiapkan dokumen serta finansial dengan matang, Anda bisa menghindari beban utang yang berlebihan dan mewujudkan mimpi memiliki rumah sendiri.</p>
<p>Gunakan <a href="https://adwatak.cloud/id/tools/mortgage-calculator" target="_blank" rel="noopener noreferrer">Kalkulator KPR Adwatak</a> untuk simulasi cepat dan akurat — cukup masukkan harga rumah, DP, suku bunga, dan tenor, Anda langsung mendapatkan cicilan bulanan dan tabel amortisasi lengkap.</p>

<h2>Pertanyaan yang Sering Diajukan</h2>
<h3>Berapa DP minimum untuk KPR di Indonesia?</h3>
<p>DP minimum KPR di Indonesia umumnya 20% dari harga rumah. Namun, beberapa bank dan program pemerintah (seperti FLPP untuk MBR) menawarkan DP mulai dari 1% dengan syarat tertentu.</p>

<h3>Apakah bisa melunasi KPR lebih cepat?</h3>
<p>Ya, Anda bisa melakukan pelunasan dipercepat. Namun, perhatikan klausa penalti di kontrak kredit Anda. Beberapa bank mengenakan biaya penalti jika Anda melunasi dalam 3–5 tahun pertama.</p>

<h3>Bagaimana jika cicilan KPR naik karena suku bunga floating?</h3>
<p>Jika suku bunga naik, cicilan bulanan Anda akan meningkat. Anda bisa mempertimbangkan restrukturisasi kredit atau refinancing ke bank lain dengan bunga lebih rendah.</p>

<h3>Apakah KPR bisa diajukan untuk rumah kedua?</h3>
<p>Bisa, namun syaratnya lebih ketat. Bank biasanya meminta DP lebih besar (minimal 30–40%) dan suku bunga bisa lebih tinggi dibanding KPR rumah pertama.</p>

<h3>Berapa lama proses persetujuan KPR?</h3>
<p>Proses persetujuan KPR biasanya memakan waktu 7–14 hari kerja setelah dokumen lengkap diserahkan. Waktu bisa lebih lama jika ada dokumen yang perlu dilengkapi atau proses appraisal berjalan lambat.</p>`,
    date: "2026-06-03",
    category: "Alat Umum",
    readTime: "7 menit membaca",
    keywords: ["KPR", "kredit rumah", "cara menghitung KPR", "simulasi KPR", "cicilan KPR", "kalkulator KPR", "bunga KPR", "DP rumah"],
  },
];

export { idBlogPosts };
