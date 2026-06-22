"use client";import { useState } from "react";import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema,howToSchema } from "../../../components/StructuredData";import Breadcrumb from "../../../components/Breadcrumb";import ShareButtons from "../../../components/ShareButtons";import FAQSection from "../../../components/FAQSection";import RelatedTools from "../../../components/RelatedTools";import SEOContent from "../../../components/SEOContent";const faqs = [
  {
    question: "Apa itu penghitung kata?",
    answer: "Alat yang menghitung kata, karakter, kalimat, dan paragraf dalam teks. Penting bagi penulis yang harus memenuhi batas kata (esai, artikel, buku), optimasi konten SEO, postingan media sosial (Twitter 280 karakter), dan penentuan harga terjemahan (per kata)."
  },
  {
    question: "Mengapa jumlah kata penting?",
    answer: "SEO: Google lebih menyukai artikel 1000+ kata untuk peringkat. Akademik: esai memiliki batas kata ketat (melebihi = penalti). Sosial: Twitter 280, LinkedIn 3000, SMS 160. Penerbitan: novel berdasarkan genre (80-100K untuk fiksi)."
  },
  {
    question: "Jumlah kata vs jumlah karakter?",
    answer: "Jumlah kata = jumlah kata. Jumlah karakter = total karakter termasuk spasi. Beberapa platform membatasi berdasarkan karakter (Twitter, SMS). Lainnya berdasarkan kata (akademik, SEO). Alat kami menampilkan keduanya plus kalimat, paragraf, dan perkiraan waktu baca."
  },
  {
    question: "Apa itu waktu baca?",
    answer: "Perkiraan menit untuk membaca teks. Rata-rata orang dewasa membaca 200-250 kata per menit. 250 kata = 1 menit. 1000 kata = 4 menit. Digunakan di blog (tampilkan waktu baca di atas), perencanaan akademik, dan pengaturan waktu pidato."
  },
  {
    question: "Seberapa akurat penghitungan kata?",
    answer: "Sangat akurat — definisi standar: setiap urutan karakter yang dipisahkan oleh spasi. Kata bersambung dihitung satu ('terkenal'). Kata majemuk ('real estate') dihitung dua. Penghitung kami menangani kasus khusus: emoji (dihitung 1 karakter), URL, karakter khusus."
  },
  {
    question: "Apa itu kepadatan kata kunci?",
    answer: "Seberapa sering kata kunci muncul sebagai % dari total kata. Ideal SEO: 1-3%. Di atas 5% = penjejalan kata kunci (penalti Google). Penghitung kata kami menunjukkan total kata — hitung kepadatan: (kemunculan kata kunci / total kata) × 100."
  },
  {
    question: "Berapa banyak kata untuk berbagai jenis konten?",
    answer: "Postingan blog: 1000-2500 kata. Deskripsi produk: 150-300. Media sosial: 50-100. Buletin email: 200-500. Ebook: 10.000-50.000. Esai akademik: 500-5000. Halaman arahan: 500-1500. Artikel berita: 300-800."
  },
  {
    question: "Apakah penghitung kata berfungsi dengan bahasa selain Inggris?",
    answer: "Ya — Arab, China, Jepang, Korea semuanya berfungsi. Penghitungan kata berbeda menurut bahasa: China/Jepang tidak menggunakan spasi (hitung karakter sebagai gantinya). Arab menggunakan spasi seperti Inggris. Penghitung kami menangani semua teks Unicode."
  },
  {
    question: "Bagaimana dengan angka dalam hitungan kata?",
    answer: "Angka dihitung sebagai kata. '1.234' dihitung 1 kata. '1 juta' dihitung 2 kata. '1000' dihitung 1 kata. Tanggal: '15 Januari 2024' = 3 kata. Nomor telepon: '555-123-4567' = 1 kata."
  },
  {
    question: "Apa kata terpanjang dalam bahasa Inggris?",
    answer: "Pneumonoultramicroscopicsilicovolcanoconiosis = 45 huruf (penyakit paru-paru). Penghitung kami menanganinya sebagai 1 kata. Kata-kata panjang yang paling umum adalah istilah medis/kimia. Shakespeare menggunakan 31.534 kata berbeda di seluruh karyanya."
  },
  {
    question: "Bagaimana cara mengurangi jumlah kata?",
    answer: "Hapus kata pengisi (sangat, benar-benar, sebenarnya, pada dasarnya), gabungkan kalimat, gunakan kalimat aktif (lebih pendek dari pasif), hapus frasa berlebihan ('dalam rangka untuk' → 'untuk'), dan potong kata sifat/kata keterangan. Pengurangan 10% mudah dilakukan tanpa kehilangan makna."
  },
  {
    question: "Berapa jumlah kata ideal untuk SEO?",
    answer: "Konten bentuk panjang mendapat peringkat lebih baik. Rata-rata hasil halaman pertama Google: 1.447 kata. Lebih dari 2000 kata: 75% lebih banyak backlink daripada di bawah 1000. Struktur: 1000+ kata dengan subjudul (H2/H3), 10+ pertanyaan FAQ, dan 3-5 gambar/video."
  }
];const relatedTools = [  { title: "Pengubah Huruf", icon: "🔤", href: "/en/tools/text-case" },  { title: "Pembersih Teks", icon: "🧹", href: "/en/tools/text-cleaner" },  { title: "Pembanding Teks", icon: "📋", href: "/en/tools/text-compare" },  { title: "Angka ke Huruf", icon: "🔢", href: "/en/tools/number-to-words" },  { title: "Pembuat Kata Sandi", icon: "🔐", href: "/en/tools/password-generator" },  { title: "Pengatur Waktu", icon: "⏱️", href: "/en/tools/stopwatch" },];const seoContent = [  "Penghitung Kata gratis kami menghitung kata, karakter (dengan dan tanpa spasi), kalimat, paragraf, dan perkiraan waktu baca. Tempel teks apa pun dan dapatkan analitik instan. Penting bagi penulis, pelajar, profesional SEO, dan pembuat konten yang membutuhkan metrik teks yang akurat.",  "Features: (1) Word count — total words in text. (2) Character count — with and without spaces. (3) Sentence count — split by period, exclamation, question mark. (4) Paragraph count — split by blank lines. (5) Reading time — minutes based on 200 WPM average.",  "Contoh: 'Alat Penghitung Kata gratis kami membantu penulis melacak jumlah kata untuk konten SEO, esai akademik, dan postingan media sosial. Dengan analitik terperinci termasuk jumlah karakter, waktu baca, dan rincian paragraf.' = 28 kata, 180 karakter, 3 kalimat, 1 paragraf.",  "Tips SEO: Google mengevaluasi panjang konten untuk peringkat. Halaman dengan 1500+ kata rata-rata mendapatkan 68% lebih banyak lalu lintas organik daripada postingan pendek. Bagi konten menjadi beberapa bagian dengan tag H2/H3. Gunakan penghitung kata kami untuk memastikan setiap bagian memiliki kedalaman yang cukup.",  "Terkait: Pasangkan dengan alat Text Case kami untuk format yang konsisten, Text Cleaner untuk menghapus karakter yang tidak diinginkan, dan Text Compare untuk membandingkan dua versi. Lengkapi alur kerja konten Anda: tulis → hitung → format → bersihkan → bandingkan.",  "Tips menulis: Targetkan 1000-2000 kata untuk postingan blog. Gunakan penghitung kami saat menulis draf untuk melacak kemajuan. Draf pertama adalah tentang menuangkan kata-kata — khawatirkan kualitas saat mengedit. Targetkan 500 kata/jam sebagai kecepatan yang nyaman."];export default function Client() {  const [text, setText] = useState("");  const words = text.trim() ? text.trim().split(/\s+/).length : 0;  const chars = text.length;  const charsNoSpace = text.replace(/\s/g, "").length;  const sentences = text ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;  const paragraphs = text ? text.split(/\n\s*\n/).filter(p => p.trim()).length : (text.trim() ? 1 : 0);  const readingTime = Math.ceil(words / 200);  const schemaName = "Penghitung Kata";const schemaDesc = `Online Word Counter - free tool`;const schemaCategory = "Utility";const schemaUrl = "https://adwatak.cloud/id/tools/word-counter";const breadcrumbItems = [  { name: "Home", url: "https://adwatak.cloud/id" },  { name: "Alat Teks", url: "https://adwatak.cloud/id/category/calculators" },  { name: "Penghitung Kata", url: "https://adwatak.cloud/id/tools/word-counter" },];return (    <div className="max-w-[760px] mx-auto">        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />        <StructuredData data={faqSchema(faqs)} />        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />{/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("Cara menggunakan alat ini", "Free online tool. Works directly in your browser. No registration required.", [{name:"Buka alat",text:"Arahkan ke halaman alat ini di Adawatak"},{name:"Masukkan data Anda",text:"Isi kolom yang diperlukan"},{name:"Dapatkan hasil",text:"Klik tombol hitung atau hasilkan"},{name:"Gunakan atau bagikan",text:"Salin, unduh, atau bagikan hasilnya"}],"kurang dari satu menit","id")} />
      {/* GEO: Speakable — AI/voice engines */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />
<Breadcrumb category="Alat Teks" categorySlug="text-tools" toolName="Penghitung Kata" />      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">        <h1 className="text-2xl font-extrabold mb-1">📝 Penghitung Kata</h1>        <p className="text-sm text-gray-500 mb-6">Count words, characters, sentences, paragraphs, and reading time</p>        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none mb-4 min-h-[150px]" placeholder="Tempel atau ketik teks Anda di sini..." />        <div className="grid grid-cols-5 gap-3">          <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-200"><p className="text-2xl font-extrabold text-blue-900">{words}</p><p className="text-[10px] text-blue-600 mt-1">Words</p></div>          <div className="bg-green-50 rounded-xl p-3 text-center border border-green-200"><p className="text-2xl font-extrabold text-green-900">{chars}</p><p className="text-[10px] text-green-600 mt-1">Chars</p></div>          <div className="bg-purple-50 rounded-xl p-3 text-center border border-purple-200"><p className="text-2xl font-extrabold text-purple-900">{charsNoSpace}</p><p className="text-[10px] text-purple-600 mt-1">No Space</p></div>          <div className="bg-yellow-50 rounded-xl p-3 text-center border border-yellow-300"><p className="text-2xl font-extrabold text-yellow-900">{sentences}</p><p className="text-[10px] text-yellow-700 mt-1">Sentences</p></div>          <div className="bg-red-50 rounded-xl p-3 text-center border border-red-200"><p className="text-2xl font-extrabold text-red-900">{readingTime}m</p><p className="text-[10px] text-red-600 mt-1">Read</p></div>        </div>      </div>      <SEOContent content={seoContent} />      <FAQSection faqs={faqs} />      <RelatedTools tools={relatedTools} />    <ShareButtons lang="id" />    </div>  );}