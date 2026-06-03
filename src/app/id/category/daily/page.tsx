import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alat Lainnya — Adwatak",
  description: "Alat gratis: BMI, kalori, stopwatch, kalkulator usia",
};

const tools = [
  { title: "Kalkulator BMI", icon: "⚖️", href: "/id/tools/bmi-calculator", desc: "Indeks Massa Tubuh" },
  { title: "Kalkulator Kalori", icon: "🔥", href: "/id/tools/calorie-calculator", desc: "Kebutuhan kalori harian" },
  { title: "Stopwatch", icon: "⏱️", href: "/id/tools/stopwatch", desc: "Stopwatch dengan penghitung putaran" },
  { title: "Kalkulator Usia", icon: "🎂", href: "/id/tools/age-calculator", desc: "Hitung usia dan zodiak" },
  { title: "Penghapus Latar Belakang", icon: "🖼️", href: "/id/tools/background-remover", desc: "Hapus latar belakang dengan AI" },
  { title: "Gambar ke Teks (OCR)", icon: "👁️", href: "/id/tools/image-to-text", desc: "Ekstrak teks dari gambar" },
  { title: "Pengubah Ukuran Gambar", icon: "📐", href: "/id/tools/image-resizer", desc: "Ubah dimensi gambar" },
  { title: "Kompresor Gambar", icon: "📦", href: "/id/tools/image-compressor", desc: "Kurangi ukuran file gambar" },
  { title: "Gambar ke PDF", icon: "🖼️", href: "/id/tools/image-to-pdf", desc: "Konversi gambar ke PDF" },
  { title: "Pengunduh Thumbnail YouTube", icon: "▶️", href: "/id/tools/youtube-thumbnail-downloader", desc: "Unduh thumbnail YouTube" },
  { title: "Penggabung PDF", icon: "📎", href: "/id/tools/pdf-merger", desc: "Gabungkan file PDF" },
  { title: "Pemisah PDF", icon: "✂️", href: "/id/tools/pdf-splitter", desc: "Pisah halaman PDF" },
  { title: "Kompresor PDF", icon: "📦", href: "/id/tools/pdf-compressor", desc: "Kurangi ukuran file PDF" },
  { title: "PDF ke Word", icon: "📄", href: "/id/tools/pdf-to-word", desc: "Konversi PDF ke Word" },
];

export default function DailyCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>🌟 Alat Lainnya</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Alat gratis: BMI, kalori, stopwatch, kalkulator usia, dan utilitas lainnya</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {tools.map((t, i) => (
          <a key={i} href={t.href} style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid #f1f5f9", textDecoration: "none", color: "inherit" }}>
            <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
              <span style={{ fontSize: "2rem" }}>{t.icon}</span>
              <div><div style={{ fontWeight: 700, fontSize: "1rem" }}>{t.title}</div><div style={{ fontSize: "0.875rem", color: "#64748b" }}>{t.desc}</div></div>
            </div>
          </a>
        ))}
      </div>
      <div style={{ marginTop: "32px", padding: "24px", background: "white", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Semua alat berjalan di browser Anda. Tidak ada data yang dikirim ke server. <a href="/id" style={{ color: "#2563eb" }}>← Beranda</a></p>
      </div>
    </div>
  );
}
