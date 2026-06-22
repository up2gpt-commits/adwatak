"use client";
import { useState, useRef } from "react";
import QRCode from "qrcode";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema, howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "Apa itu kode QR?", answer: "Kode Quick Response — kode batang 2D yang dapat dibaca oleh ponsel pintar dan pemindai. Menyimpan URL, teks, info kontak, kredensial Wi-Fi, dan lainnya. Kode QR dapat menampung hingga 4.296 karakter alfanumerik atau 2.953 byte data biner." },
  { question: "Bagaimana cara memindai kode QR?", answer: "Kebanyakan ponsel pintar: buka aplikasi kamera, arahkan ke kode QR. iPhone: Aplikasi Kamera mendeteksi secara otomatis. Android: Google Lens atau aplikasi Kamera. Tidak perlu aplikasi terpisah di ponsel modern. Pemindai pihak ketiga menawarkan lebih banyak fitur (riwayat, ekspor)." },
  { question: "Bisakah kode QR memiliki warna?", answer: "Ya — tetapi pastikan kontras. Gelap di atas terang adalah standar (hitam di atas putih). Terbalik (putih di atas hitam) berfungsi. Kode QR berwarna memerlukan kontras yang cukup — biru muda di atas biru tua berfungsi, pastel di atas putih tidak. Kontras tinggi = pemindaian cepat." },
  { question: "Berapa banyak data yang dapat ditampung kode QR?", answer: "Versi 40 (terbesar): 4.296 karakter alfanumerik, 7.089 digit numerik, 2.953 byte, atau 1.817 karakter Tionghoa (mode Kanji). Untuk URL, jaga di bawah 500 karakter agar kode lebih kecil dan pemindaian lebih cepat." },
  { question: "Apa perbedaan antara versi QR?", answer: "Versi 1 (modul 21×21, 25 karakter) hingga Versi 40 (modul 177×177, 4.296 karakter). Setiap versi menambahkan 4 modul per sisi. Versi lebih tinggi = lebih banyak data = kode lebih besar dan lebih kompleks. Koreksi kesalahan juga memengaruhi ukuran." },
  { question: "Apa itu koreksi kesalahan?", answer: "Kode QR memiliki koreksi kesalahan Reed-Solomon. Tingkat: L (pemulihan kerusakan 7%), M (15%), Q (25%), H (30%). Untuk iklan, gunakan L atau M. Untuk industri/medis, gunakan H. Koreksi lebih tinggi = kode QR lebih besar tetapi tahan lebih banyak kerusakan." },
  { question: "Mengapa menggunakan generator kode QR?", answer: "Agar pelanggan Anda tidak perlu mengetik URL panjang secara manual. Satu pemindaian membuka situs Anda, menghubungi nomor Anda, atau bergabung dengan Wi-Fi Anda. Kode QR meningkatkan keterlibatan — restoran melihat peningkatan tampilan menu 40%+ setelah beralih ke QR. Juga bebas sentuhan (higienis)." },
  { question: "QR vs kode batang?", answer: "Kode batang: garis vertikal, hanya numerik (12-25 digit), dipindai dalam satu arah. QR: persegi dengan 3 pola pencari, alfanumerik + biner + Kanji, dipindai dalam 2 arah. QR lebih cepat, menampung data 100x lebih banyak, dan berfungsi dengan kamera apa pun." },
  { question: "Apakah kode QR aman?", answer: "Kode QR sendiri hanyalah wadah data. Risikonya terletak pada apa yang Anda pindai — serangan 'QRishing' mengganti stiker QR asli dengan yang berbahaya. Selalu pratinjau URL sebelum membuka. Alat kami menghasilkan kode QR bersih dan standar untuk penggunaan aman Anda." },
  { question: "Bisakah kode QR kedaluwarsa?", answer: "Gambar QR tidak pernah kedaluwarsa — ini adalah pengkodean statis dari data Anda. Tetapi jika URL yang ditunjuknya berubah atau tautannya rusak, QR menjadi tidak berguna. Untuk kode QR dinamis yang dapat diperbarui, gunakan pemendek URL sebagai perantara." },
  { question: "Berapa ukuran minimum QR untuk cetak?", answer: "Setidaknya 2×2 cm (0,8 inci) untuk cetak. Lebih besar = pemindaian lebih mudah. Untuk layar, 1×1 cm sudah cukup. Selalu uji pemindaian dari jarak pandang yang diharapkan sebelum pencetakan massal. Kontras rendah atau permukaan mengilap mungkin memerlukan ukuran lebih besar." },
  { question: "Bagaimana cara melacak pemindaian QR?", answer: "Gunakan URL pendek (bit.ly, atau tautan pelacakan) alih-alih URL langsung. QR mengkodekan URL pendek, yang mengalihkan dengan analitik. Dengan cara ini Anda mengetahui jumlah pemindaian, lokasi, jenis perangkat, dan waktu. Tanpa pelacakan, Anda tidak akan tahu berapa banyak orang yang memindai." }
];

const relatedTools = [
  { title: "Tautan WhatsApp", icon: "💬", href: "/id/tools/whatsapp-link" },
  { title: "Pembuat Kata Sandi", icon: "🔐", href: "/id/tools/password-generator" },
  { title: "Pembuat Faktur", icon: "🧾", href: "/id/tools/invoice-generator" },
  { title: "Pengode Base64", icon: "🔄", href: "/id/tools/base64-encoder" },
  { title: "Pembuat Nama", icon: "👤", href: "/id/tools/name-generator" },
  { title: "Angka Acak", icon: "🎲", href: "/id/tools/random-number" },
];

const seoContent = [
  "Buat kode QR gratis secara online secara instan. Tanpa pendaftaran, tanpa unggahan, tanpa pelacakan. Bekerja sepenuhnya di browser Anda menggunakan pembuatan kode QR sisi klien — data Anda tidak pernah meninggalkan perangkat Anda.",
  "Buat kode QR untuk URL, teks, nomor telepon, SMS, jaringan Wi-Fi, dan vCard. Unduh sebagai gambar PNG berkualitas tinggi yang siap untuk cetak, web, atau media sosial.",
  "Pembuat kode QR kami menggunakan pustaka qrcode standar dan membuat kode QR yang sepenuhnya sesuai dengan koreksi kesalahan Reed-Solomon. Setiap kode lolos semua validasi pemindai QR standar.",
];

export default function Client() {
  const [url, setUrl] = useState("https://adwatak.cloud");
  const [size, setSize] = useState("200");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function generate() {
    if (!url.trim()) {
      setError("Please enter a URL or text");
      return;
    }
    setError("");
    try {
      const dataUrl = await QRCode.toDataURL(url.trim(), {
        width: parseInt(size),
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
        errorCorrectionLevel: "M",
      });
      setQrDataUrl(dataUrl);
    } catch (err) {
      setError("Failed to generate QR code. Please try a shorter text.");
    }
  }

  const schemaName = "Pembuat Kode QR";
  const schemaDesc = "Free online QR Code Generator - create QR codes for URLs, text, and more";
  const schemaUrl = "https://adwatak.cloud/id/tools/qr-generator";

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, "en", "Utility")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{ name: "Home", url: "https://adwatak.cloud/id" }, { name: "Alat Pengembang", url: "https://adwatak.cloud/id/category/dev" }, { name: "Pembuat Kode QR", url: schemaUrl }])} />
      <StructuredData data={howToSchema("Cara menggunakan alat ini", "Free online tool. Works directly in your browser. No registration required.", [{ name: "Open the tool", text: "Navigate to this tool page on Adawatak" }, { name: "Enter your data", text: "Fill in the required fields" }, { name: "Get results", text: "Click the calculate or generate button" }, { name: "Use or share", text: "Copy, download, or share the results" }], "less than a minute", "id")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb category="Alat Pengembang" categorySlug="developer-tools" toolName="Pembuat Kode QR" />
      
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-2xl font-extrabold mb-1 dark:text-white">📱 Pembuat Kode QR</h1>
        <p className="text-sm text-gray-500 mb-6 dark:text-gray-400">Buat kode QR gratis untuk URL, teks, dan lainnya</p>
        
        <label className="block text-sm font-semibold text-gray-700 mb-1.5 dark:text-gray-300">URL atau Teks</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="https://adwatak.cloud"
        />
        
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5 dark:text-gray-300">Ukuran QR (px)</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="150">Small (150×150)</option>
            <option value="200">Medium (200×200)</option>
            <option value="300">Large (300×300)</option>
            <option value="500">Extra Large (500×500)</option>
          </select>
        </div>
        
        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}
        
        <button
          onClick={generate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer hover:bg-blue-700 transition-colors"
        >
          Generate QR Code
        </button>
      </div>

      {qrDataUrl && (
        <div className="bg-gray-50 rounded-xl p-5 text-center border border-gray-200 mb-6 dark:bg-gray-800 dark:border-gray-700">
          <img src={qrDataUrl} alt="QR Code" className="inline-block max-w-full" />
          <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">Scan to visit {url}</p>
          <div className="flex gap-3 justify-center mt-3">
            <a
              href={qrDataUrl}
              download="qrcode.png"
              className="inline-block bg-blue-600 text-white font-bold px-6 py-2 rounded-xl no-underline text-sm hover:bg-blue-700 transition-colors"
            >
              Download PNG
            </a>
            <button
              onClick={() => { const a = document.createElement("a"); a.href = qrDataUrl; a.download = "qrcode.svg"; a.click(); }}
              className="inline-block bg-gray-600 text-white font-bold px-6 py-2 rounded-xl text-sm cursor-pointer hover:bg-gray-700 transition-colors border-none"
            >
              Download SVG
            </button>
          </div>
        </div>
      )}

      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
      <ShareButtons lang="id" />
    </div>
  );
}
