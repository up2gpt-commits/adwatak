"use client";
import { useState, useEffect } from "react";
import { useSearch } from "../components/SearchProvider";
import { SearchProvider } from "../components/SearchProvider";
import SearchBar from "../components/SearchBar";

const categories = [
  { name: "Finansal Hesaplamalar", slug: "calculators", icon: "💰", count: "10", desc: "Konut kredisi, krediler, EMI, kar marjı, KDV, maaş ve daha fazlası" },
  { name: "Metin Araçları", slug: "text", icon: "📝", count: "12", desc: "Kelime sayacı, metin dönüştürücü, intihal, dil bilgisi, yazma testi" },
  { name: "Görsel Araçları", slug: "image", icon: "🖼️", count: "5", desc: "Arka plan kaldırma, boyutlandırma, sıkıştırma, YouTube küçük resim" },
  { name: "PDF Araçları", slug: "pdf", icon: "📄", count: "3", desc: "Birleştirme, sıkıştırma, PDF'den Word'e dönüştürme" },
  { name: "Dönüştürücüler", slug: "converters", icon: "🔄", count: "5", desc: "Döviz, birim, renk, tarih, sayıyı yazıya çevirme" },
  { name: "Oluşturucular", slug: "generators", icon: "⚡", count: "6", desc: "QR kod, barkod, şifre, isim oluşturucu" },
  { name: "Geliştirici Araçları", slug: "dev", icon: "💻", count: "7", desc: "JSON, Base64, hash, SEO denetimi, CSS, Markdown, IP sorgulama" },
  { name: "İslami Araçlar", slug: "islamic", icon: "🕌", count: "7", desc: "Miras, Zekat, Kıble, Namaz Vakitleri, Tasbih, Umre, Fidye ve Kaffarat" },
  { name: "Diğer", slug: "daily", icon: "🌟", count: "5", desc: "Yaş, VKİ, kalori, kronometre, fotoğrafla kalori analizi" },
];

const allTools = [
  { title: "Konut Kredisi Hesaplama", icon: "🏠", href: "/tr/tools/mortgage-calculator", desc: "Aylık ödeme ve amortisman tablosu", cat: "Finansal Hesaplamalar" },
  { title: "Kişisel Kredi Hesaplama", icon: "💰", href: "/tr/tools/loan-calculator", desc: "Kredi faizi ve toplam geri ödeme", cat: "Finansal Hesaplamalar" },
  { title: "EMI Hesaplama", icon: "🧮", href: "/tr/tools/emi-calculator", desc: "Eşit aylık taksit hesaplama", cat: "Finansal Hesaplamalar" },
  { title: "Bileşik Faiz Hesaplama", icon: "📈", href: "/tr/tools/compound-interest", desc: "Bileşik faizle yatırım büyümesi", cat: "Finansal Hesaplamalar" },
  { title: "Kâr Marjı Hesaplama", icon: "📐", href: "/tr/tools/profit-margin", desc: "Marj ve kar oranı hesaplama", cat: "Finansal Hesaplamalar" },
  { title: "Net Maaş Hesaplama", icon: "💵", href: "/tr/tools/salary-calculator", desc: "Kesintiler sonrası net maaş", cat: "Finansal Hesaplamalar" },
  { title: "KDV Hesaplama", icon: "🏛️", href: "/tr/tools/vat-calculator", desc: "KDV ekleme veya çıkarma", cat: "Finansal Hesaplamalar" },
  { title: "Altın Hesaplama", icon: "🥇", href: "/tr/tools/gold-calculator", desc: "Altın değeri ve gram fiyatı", cat: "Finansal Hesaplamalar" },
  { title: "Taksit Hesaplama", icon: "📊", href: "/tr/tools/installment-calculator", desc: "Taksit planı hesaplama", cat: "Finansal Hesaplamalar" },
  { title: "Araba Taksit Hesaplama", icon: "🚗", href: "/tr/tools/car-installment", desc: "Araba kredisi taksit hesaplama", cat: "Finansal Hesaplamalar" },
  { title: "Yüzde Hesaplayıcı", icon: "🧮", href: "/tr/tools/percentage-calculator", desc: "Yüzdeleri üç şekilde hesaplama", cat: "Finansal Hesaplamalar" },
  { title: "Tarih Farkı Hesaplayıcı", icon: "📆", href: "/tr/tools/date-duration", desc: "İki tarih arasındaki fark", cat: "Finansal Hesaplamalar" },
  { title: "Kalori Hesaplama", icon: "🔥", href: "/tr/tools/calorie-calculator", desc: "Günlük kalori ihtiyacı", cat: "Diğer" },

  { title: "Kelime Sayacı", icon: "📝", href: "/tr/tools/word-counter", desc: "Kelime, karakter, cümle sayma", cat: "Metin Araçları" },
  { title: "Metin Dönüştürücü", icon: "🔤", href: "/tr/tools/text-case", desc: "Büyük, küçük, başlık, cümle", cat: "Metin Araçları" },
  { title: "Metin Temizleyici", icon: "🧹", href: "/tr/tools/text-cleaner", desc: "Boşlukları, HTML etiketlerini temizleme", cat: "Metin Araçları" },
  { title: "Metin Karşılaştırma", icon: "⚖️", href: "/tr/tools/text-compare", desc: "İki metin arasındaki farklar", cat: "Metin Araçları" },
  { title: "AI İçerik Dedektörü", icon: "🤖", href: "/tr/tools/ai-content-detector", desc: "AI vs insan yazısı tespiti", cat: "Metin Araçları" },
  { title: "Sayıyı Yazıya Çevirme", icon: "🔢", href: "/tr/tools/number-to-words", desc: "Sayıları Türkçe yazıya çevirme", cat: "Metin Araçları" },
  { title: "İntihal Denetleyici", icon: "🚫", href: "/tr/tools/plagiarism-checker", desc: "Metin özgünlük kontrolü", cat: "Metin Araçları" },
  { title: "Dil Bilgisi Denetleyici", icon: "📝", href: "/tr/tools/grammar-checker", desc: "Yazım ve noktalama denetimi", cat: "Metin Araçları" },
  { title: "Paraphrase Aracı", icon: "✏️", href: "/tr/tools/paraphrasing-tool", desc: "Metni yeni üslupla yeniden yazma", cat: "Metin Araçları" },
  { title: "Yazma Hızı Testi", icon: "⌨️", href: "/tr/tools/typing-test", desc: "Dakikadaki kelime hızınız", cat: "Metin Araçları" },
  { title: "Sosyal Medya Karakter Sayacı", icon: "📱", href: "/tr/tools/social-character-counter", desc: "Twitter, Instagram karakter sayma", cat: "Metin Araçları" },
  { title: "Arapça Lorem Ipsum", icon: "📄", href: "/tr/tools/arabic-lorem", desc: "Yer tutucu metin oluşturma", cat: "Metin Araçları" },
  { title: "Biyografi Oluşturucu", icon: "👤", href: "/tr/tools/bio-generator", desc: "Sosyal medya biyografisi oluşturma", cat: "Metin Araçları" },

  { title: "Arka Plan Kaldırma", icon: "🖼️", href: "/tr/tools/background-remover", desc: "AI ile arka plan kaldırma", cat: "Görsel Araçları" },
  { title: "Görsel Boyutlandırma", icon: "🖼️", href: "/tr/tools/image-resizer", desc: "Görsel boyutlarını değiştirme", cat: "Görsel Araçları" },
  { title: "Görsel Sıkıştırma", icon: "📦", href: "/tr/tools/image-compressor", desc: "Görsel dosya boyutunu azaltma", cat: "Görsel Araçları" },
  { title: "YT Küçük Resim İndirici", icon: "▶️", href: "/tr/tools/youtube-thumbnail-downloader", desc: "YouTube video küçük resimlerini indirme", cat: "Görsel Araçları" },
  { title: "Görselden PDF'e", icon: "📄", href: "/tr/tools/image-to-pdf", desc: "Görselleri PDF'e dönüştürme", cat: "Görsel Araçları" },

  { title: "PDF Birleştirme", icon: "📎", href: "/tr/tools/pdf-merger", desc: "Birden çok PDF'i birleştirme", cat: "PDF Araçları" },
  { title: "PDF Ayırma", icon: "✂️", href: "/tr/tools/pdf-splitter", desc: "PDF'i ayrı sayfalara bölme", cat: "PDF Araçları" },
  { title: "PDF Sıkıştırma", icon: "📦", href: "/tr/tools/pdf-compressor", desc: "PDF dosya boyutunu azaltma", cat: "PDF Araçları" },
  { title: "PDF'den Word'e", icon: "📄", href: "/tr/tools/pdf-to-word", desc: "PDF'i düzenlenebilir Word'e çevirme", cat: "PDF Araçları" },

  { title: "Döviz Çevirici", icon: "💱", href: "/tr/tools/currency-converter", desc: "Dünya para birimleri arasında dönüşüm", cat: "Dönüştürücüler" },
  { title: "Birim Çevirici", icon: "📏", href: "/tr/tools/unit-converter", desc: "Uzunluk, ağırlık, sıcaklık, hacim", cat: "Dönüştürücüler" },
  { title: "Renk Çevirici", icon: "🎨", href: "/tr/tools/color-converter", desc: "HEX ↔ RGB ↔ HSL önizlemeli", cat: "Dönüştürücüler" },
  { title: "Hicri Tarih Çevirici", icon: "📅", href: "/tr/tools/hijri-converter", desc: "Hicri ↔ Miladi tarih dönüşümü", cat: "Dönüştürücüler" },
  { title: "Sıcaklık Dönüştürücü", icon: "🌡️", href: "/tr/tools/temperature-converter", desc: "Celsius, Fahrenheit, Kelvin dönüşümü", cat: "Dönüştürücüler" },
  { title: "Saat Dilimi Dönüştürücü", icon: "🕐", href: "/tr/tools/timezone-converter", desc: "Saat dilimleri arası dönüşüm", cat: "Dönüştürücüler" },
  { title: "Piksel Dönüştürücü", icon: "📏", href: "/tr/tools/pixel-converter", desc: "Pikselleri cm, inç dönüştürme", cat: "Dönüştürücüler" },
  { title: "Yaş Hesaplama", icon: "🎂", href: "/tr/tools/age-calculator", desc: "Yaş ve burç hesaplama", cat: "Diğer" },

  { title: "QR Kod Oluşturucu", icon: "🔳", href: "/tr/tools/qr-generator", desc: "URL veya metinden QR kod oluşturma", cat: "Oluşturucular" },
  { title: "QR Kod Okuyucu", icon: "📷", href: "/tr/tools/qr-reader", desc: "QR kodları görselden/kameradan okuma", cat: "Oluşturucular" },
  { title: "Barkod Oluşturucu", icon: "📊", href: "/tr/tools/barcode-generator", desc: "Ürünler için barkod oluşturma", cat: "Oluşturucular" },
  { title: "Şifre Oluşturucu", icon: "🔐", href: "/tr/tools/password-generator", desc: "Güçlü rastgele şifreler", cat: "Oluşturucular" },
  { title: "Fatura Oluşturucu", icon: "🧾", href: "/tr/tools/invoice-generator", desc: "Profesyonel fatura oluşturma", cat: "Oluşturucular" },
  { title: "WhatsApp Bağlantı", icon: "💬", href: "/tr/tools/whatsapp-link", desc: "Önceden doldurulmuş mesajla bağlantı", cat: "Oluşturucular" },
  { title: "Rastgele Sayı", icon: "🎲", href: "/tr/tools/random-number", desc: "Herhangi aralıkta rastgele sayı", cat: "Oluşturucular" },
  { title: "AI Makale Yazarı", icon: "✍️", href: "/tr/tools/ai-essay-writer", desc: "AI ile tam makaleler yazma", cat: "Oluşturucular" },

  { title: "JSON Biçimlendirici", icon: "📋", href: "/tr/tools/json-formatter", desc: "JSON biçimlendirme, doğrulama, küçültme", cat: "Geliştirici Araçları" },
  { title: "Base64 Kodlayıcı", icon: "📦", href: "/tr/tools/base64-encoder", desc: "Base64 kodlama ve kod çözme", cat: "Geliştirici Araçları" },
  { title: "Hash Oluşturucu", icon: "🔑", href: "/tr/tools/hash-generator", desc: "MD5, SHA-1, SHA-256, SHA-512", cat: "Geliştirici Araçları" },
  { title: "SEO Denetim", icon: "🔍", href: "/tr/tools/seo-audit", desc: "Ücretsiz web sitesi SEO analizi", cat: "Geliştirici Araçları" },
  { title: "CSS Küçültücü", icon: "🎨", href: "/tr/tools/css-minifier", desc: "CSS kodlarını küçültme ve biçimlendirme", cat: "Geliştirici Araçları" },
  { title: "Markdown Düzenleyici", icon: "📝", href: "/tr/tools/markdown-editor", desc: "Canlı önizlemeli Markdown yazma", cat: "Geliştirici Araçları" },
  { title: "IP Sorgulama", icon: "🌐", href: "/tr/tools/ip-lookup", desc: "Herhangi bir IP adresi hakkında bilgi", cat: "Geliştirici Araçları" },
  { title: "URL Kodlayıcı", icon: "🔗", href: "/tr/tools/encoder", desc: "URL kodlama ve kod çözme", cat: "Geliştirici Araçları" },
  { title: "Şifreleme Aracı", icon: "🔐", href: "/tr/tools/encryption-tool", desc: "Metin şifreleme ve şifre çözme", cat: "Geliştirici Araçları" },
  { title: "SEO İçerik Oluşturucu", icon: "📝", href: "/tr/tools/seo-content-generator", desc: "SEO uyumlu içerik oluşturma", cat: "Geliştirici Araçları" },
  { title: "UUID Oluşturucu", icon: "🆔", href: "/tr/tools/uuid-generator", desc: "UUID v4/v7 oluşturma", cat: "Geliştirici Araçları" },
  { title: "Anahtar Kelime Aracı", icon: "🔎", href: "/tr/tools/keyword-research", desc: "Anahtar kelime araştırma", cat: "Geliştirici Araçları" },

  { title: "İslami Miras Hesaplama", icon: "📜", href: "/tr/tools/inheritance-calculator", desc: "İslam miras hukuku (Feraiz) dağılımı", cat: "İslami Araçlar" },
  { title: "Zekat Hesaplama", icon: "🕌", href: "/tr/tools/zakat-calculator", desc: "Yıllık %2.5 zekat yükümlülüğü", cat: "İslami Araçlar" },
  { title: "Kıble Yönü", icon: "🧭", href: "/tr/tools/qibla-direction", desc: "Konumunuza göre kıble yönü bulma", cat: "İslami Araçlar" },
  { title: "Namaz Vakitleri", icon: "🕐", href: "/tr/tools/prayer-times", desc: "Konumunuza göre namaz vakitleri", cat: "İslami Araçlar" },
  { title: "Tasbih Sayacı", icon: "📿", href: "/tr/tools/tasbeeh-counter", desc: "Dijital tesbih ile zikir sayma", cat: "İslami Araçlar" },
  { title: "Umre Hesaplama", icon: "🕋", href: "/tr/tools/umrah-calculator", desc: "Umre maliyetlerini ve rehberini hesaplama", cat: "İslami Araçlar" },
  { title: "Fidye ve Kaffarat", icon: "⚖️", href: "/tr/tools/fidyah-kaffarah", desc: "Yemin, Ramazan, Zıhır kaffaratı ve oruç fidyesi", cat: "İslami Araçlar" },

  { title: "VKİ Hesaplama", icon: "⚖️", href: "/tr/tools/bmi-calculator", desc: "Vücut Kitle İndeksi hesaplama", cat: "Diğer" },
  { title: "İdeal Kilo Hesaplayıcı", icon: "⚖️", href: "/tr/tools/ideal-weight", desc: "Boy ve yaşa göre ideal kilo", cat: "Diğer" },
  { title: "Fotoğrafla Kalori Analizi", icon: "📸", href: "/tr/tools/food-calorie-analyzer", desc: "Fotoğraf çekin, anlık kalori analizi alın", cat: "Diğer" },
  { title: "Kronometre", icon: "⏱️", href: "/tr/tools/stopwatch", desc: "Tur takipli kronometre", cat: "Diğer" },
];

const featuredTools = [
  { title: "Konut Kredisi Hesaplama", desc: "Aylık ödeme + amortisman tablosu", icon: "🏠", href: "/tr/tools/mortgage-calculator" },
  { title: "VKİ Hesaplama", desc: "Vücut Kitle İndeksi", icon: "⚖️", href: "/tr/tools/bmi-calculator" },
  { title: "QR Kod Oluşturucu", desc: "Herhangi bir bağlantı için QR oluşturma", icon: "🔳", href: "/tr/tools/qr-generator" },
  { title: "Renk Çevirici", desc: "HEX ↔ RGB ↔ HSL", icon: "🎨", href: "/tr/tools/color-converter" },
  { title: "Döviz Çevirici", desc: "Canlı döviz kurları", icon: "💱", href: "/tr/tools/currency-converter" },
  { title: "PDF'den Word'e", desc: "PDF'i düzenlenebilir metne çevirme", icon: "📄", href: "/tr/tools/pdf-to-word" },
  { title: "Fotoğrafla Kalori Analizi", icon: "📸", href: "/tr/tools/food-calorie-analyzer", desc: "Fotoğraf çekin, anlık kalori analizi" },
  { title: "Görselden Metin (OCR)", icon: "👁️", href: "/tr/tools/image-to-text", desc: "OCR ile görsellerden metin çıkarma", cat: "Görsel Araçları" },
];

function TrHomeInner() {
  const { search } = useSearch();
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const hashToCat: Record<string, string> = {
    financial: "Finansal Hesaplamalar",
    text: "Metin Araçları",
    image: "Görsel Araçları",
    pdf: "PDF Araçları",
    converters: "Dönüştürücüler",
    generators: "Oluşturucular",
    dev: "Geliştirici Araçları",
    islamic: "İslami Araçlar",
    daily: "Diğer",
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
          <span>1 Numaralı Ücretsiz Çevrimiçi Araç Platformu</span>
        </div>
        <h1><span className="hero-gradient-text">İhtiyacınız Olan Her Araç.</span><br />Ücretsiz. Sonsuza Kadar.</h1>
        <p>
          Hesaplayıcılar, dönüştürücüler, oluşturucular, PDF araçları ve daha fazlası — %100 ücretsiz, kayıt gerekmez ve hiçbir şey yüklenmez.
        </p>
        <div className="hero-badges">
          <div className="hero-badge-item">
            <span className="b-icon">🔒</span>
            <span>%100 Gizli</span>
          </div>
          <div className="hero-badge-item">
            <span className="b-icon">🆓</span>
            <span>Kayıt gerekmez</span>
          </div>
          <div className="hero-badge-item">
            <span className="b-icon">⚡</span>
            <span>Anında sonuçlar</span>
          </div>
          <div className="hero-badge-item">
            <span className="b-icon">🌐</span>
            <span>Çevrimiçi çalışır</span>
          </div>
        </div>
      </section>

      {/* Smart Search */}
      <div className="mt-8 mb-4" data-scroll-target>
        <SearchBar lang="tr" />
      </div>

      {/* Featured — hides when searching or category selected */}
      {!isSearching && !activeCat && (
        <section className="featured-section scroll-fade-in" style={{ marginTop: "40px" }}>
          <div className="section-header">
            <h2 className="section-title">
              <span className="s-icon">⭐</span>
              En Popüler Araçlar
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
            Tüm Araçlar
          </h2>
        </div>
      )}

      {/* Search results header */}
      {isSearching && (
        <div className="search-results-header">
          <span className="srh-icon">🔍</span>
          <span>Arama sonuçları: <strong>"{search}"</strong></span>
          <span className="srh-count">{filtered.length} araç</span>
        </div>
      )}

      {/* Categories — hidden when searching */}
      {!isSearching && (
        <div className="cats">
          <button onClick={() => { setActiveCat(null); window.location.hash = ""; }} className={`cat-btn ${!activeCat ? "active" : ""}`} id="all">🗂️ Tümü</button>
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
            <p>Aramanızla eşleşen araç bulunamadı</p>
            <p className="text-xs text-gray-400 mt-1">Farklı bir arama veya kategori deneyin</p>
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
          { num: "50+", label: "ücretsiz araç", icon: "🔧" },
          { num: "%100", label: "kayıt gerekmez", icon: "🔓" },
          { num: "0₺", label: "sonsuza kadar ücretsiz", icon: "💚" },
          { num: "7/24", label: "her zaman açık", icon: "🌐" },
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
          🔧 Adwatak — Kapsamlı Ücretsiz Araç Platformu
        </h2>
        <div className="text-sm text-gray-600 leading-8">
          <p className="mb-3">
            <strong>Adwatak</strong>, 50'den fazla ücretsiz çevrimiçi aracı tek bir platformda sunar. 
            Finansal hesaplayıcılar (konut kredisi, kişisel kredi, taksit, EMI, kar marjı, KDV), 
            İslami araçlar (miras, zekat, Hicri çevirici, namaz vakitleri, kıble yönü), 
            metin araçları, PDF dönüştürücüler, birim çeviriciler ve geliştirici araçları.
          </p>
          <p className="mb-3">
            Tüm araçlar doğrudan tarayıcınızda çalışır — kayıt veya dosya yükleme gerektirmez. 
            Gizliliğiniz bizim için önemlidir. Tüm işlemler cihazınızda gerçekleşir, hiçbir veri sunucumuza gönderilmez.
          </p>
          <p>
            Yeni bir araç öneriniz mi var? <a href="mailto:contact@adwatak.cloud" className="text-blue-600 font-semibold no-underline hover:underline">Bizimle iletişime geçin</a> — en kısa sürede ekleyelim.
          </p>
        </div>
      </div>

      {/* Blog CTA */}
      <div className="blog-cta scroll-fade-in">
        <h2>📝 Blog</h2>
        <p>
          Araçlarımızdan en iyi şekilde yararlanmanız için rehberler ve makaleler
        </p>
        <a href="/tr/blog" className="cta-btn">
          Blog'u Keşfet →
        </a>
      </div>
    </>
  );
}

export default function TrHome() {
  return (
    <SearchProvider>
      <TrHomeInner />
    </SearchProvider>
  );
}
