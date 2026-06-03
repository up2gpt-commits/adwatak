import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alat Teks — Adwatak",
  description: "Alat teks gratis: penghitung kata, konversi huruf, pemeriksa plagiarisme",
};

const tools = [
  { title: "Penghitung Kata & Karakter", icon: "📝", href: "/id/tools/word-counter", desc: "Hitung kata, karakter, kalimat" },
  { title: "Konversi Huruf Teks", icon: "🔤", href: "/id/tools/text-case", desc: "Besar/kecil huruf (Upper/Lower/Title)" },
  { title: "Angka ke Huruf", icon: "🔢", href: "/id/tools/number-to-words", desc: "Konversi angka ke kata bahasa Indonesia" },
  { title: "Pembersih Teks", icon: "🧹", href: "/id/tools/text-cleaner", desc: "Hapus spasi berlebih dan tag" },
  { title: "Perbandingan Teks", icon: "⚖️", href: "/id/tools/text-compare", desc: "Temukan perbedaan dua teks" },
  { title: "Detektor Konten AI", icon: "🤖", href: "/id/tools/ai-content-detector", desc: "Deteksi teks AI vs manusia" },
  { title: "Pemeriksa Plagiarisme", icon: "🚫", href: "/id/tools/plagiarism-checker", desc: "Cek orisinalitas teks" },
  { title: "Pemeriksa Tata Bahasa", icon: "📝", href: "/id/tools/grammar-checker", desc: "Periksa ejaan dan tata bahasa" },
  { title: "Alat Parafrase", icon: "✏️", href: "/id/tools/paraphrasing-tool", desc: "Tulis ulang teks dengan gaya baru" },
  { title: "Tes Kecepatan Mengetik", icon: "⌨️", href: "/id/tools/typing-test", desc: "Kecepatan mengetik (KPM)" },
  { title: "Penghitung Karakter Sosmed", icon: "📱", href: "/id/tools/social-character-counter", desc: "Twitter, Instagram, TikTok" },
  { title: "Lorem Ipsum Arab", icon: "📄", href: "/id/tools/arabic-lorem", desc: "Teks placeholder Arab" },
];

export default function TextCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>📝 Alat Teks</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Alat teks gratis: penghitung kata, konversi huruf, pemeriksa plagiarisme</p>
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
