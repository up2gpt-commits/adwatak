import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metin Araçları — Adwatak",
  description: "Ücretsiz metin araçları: kelime sayacı, metin dönüştürücü, intihal denetimi",
};

const tools = [
  { title: "Kelime Sayacı", icon: "📝", href: "/tr/tools/word-counter", desc: "Kelime, karakter, cümle sayma" },
  { title: "Metin Dönüştürücü", icon: "🔤", href: "/tr/tools/text-case", desc: "Büyük/küçük harf dönüşümü" },
  { title: "Sayıyı Yazıya Çevirme", icon: "🔢", href: "/tr/tools/number-to-words", desc: "Sayıları Türkçe yazıya çevirme" },
  { title: "Metin Temizleyici", icon: "🧹", href: "/tr/tools/text-cleaner", desc: "Boşlukları ve etiketleri temizleme" },
  { title: "Metin Karşılaştırma", icon: "⚖️", href: "/tr/tools/text-compare", desc: "İki metin arasındaki farklar" },
  { title: "AI İçerik Dedektörü", icon: "🤖", href: "/tr/tools/ai-content-detector", desc: "AI yazısı tespiti" },
  { title: "İntihal Denetleyici", icon: "🚫", href: "/tr/tools/plagiarism-checker", desc: "Özgünlük kontrolü" },
  { title: "Dil Bilgisi Denetleyici", icon: "📝", href: "/tr/tools/grammar-checker", desc: "Yazım denetimi" },
  { title: "Paraphrase Aracı", icon: "✏️", href: "/tr/tools/paraphrasing-tool", desc: "Metni yeniden yazma" },
  { title: "Yazma Hızı Testi", icon: "⌨️", href: "/tr/tools/typing-test", desc: "WPM yazma hızı" },
  { title: "Sosyal Medya Karakter Sayacı", icon: "📱", href: "/tr/tools/social-character-counter", desc: "Sosyal medya karakter sayma" },
  { title: "Arapça Lorem Ipsum", icon: "📄", href: "/tr/tools/arabic-lorem", desc: "Yer tutucu metin" },
];

export default function TextCategory() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "8px" }}>📝 Metin Araçları</h1>
      <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "1.1rem" }}>Ücretsiz metin araçları: kelime sayacı, metin dönüştürücü, intihal denetimi</p>
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
        <p style={{ fontSize: "0.9rem", color: "#64748b" }}>Tüm hesaplamalar tarayıcınızda yapılır. Hiçbir veri sunucuya gönderilmez. <a href="/tr" style={{ color: "#2563eb" }}>← Ana Sayfa</a></p>
      </div>
    </div>
  );
}
