"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "Kodlama (Encoding) nedir?", answer: "Verileri iletim veya depolama gereksinimlerine uyacak şekilde bir formattan diğerine dönüştürme. En yaygın kodlama türleri: Base64 (ikili veriler için), URL Kodlama (bağlantılar için) ve HTML Varlıkları (metinler için)." },
  { question: "Base64 ile URL Kodlama arasındaki fark nedir?", answer: "Base64 herhangi bir veriyi (resimler, dosyalar) okunabilir metne dönüştürür — API'lerde ve Veri URL'lerinde kullanılır. URL Kodlama, bağlantılarda izin verilmeyen karakterleri dönüştürür (boşluk için %20, soru işareti için %3F)." },
  { question: "HTML Varlıkları Kodlaması nedir?", answer: "Özel karakterleri HTML Varlıklarına dönüştürme — örneğin < → &lt;, > → &gt;, & → &amp;. XSS saldırılarını önler ve metnin tarayıcıda doğru görüntülenmesini sağlar." },
  { question: "Kodlama güvenli şifreleme midir?", answer: "Hayır! Kodlama (Encoding) şifreleme (Encryption) değildir. Kolayca tersine çevrilebilir. Gizli verileri korumak için kullanmayın. Gerçek şifreleme için AES veya RSA kullanın." },
  { question: "URL Kodlamayı ne zaman kullanmalıyım?", answer: "Boşluk veya özel karakterler içeren bağlantılar (URL'ler) oluştururken — örneğin 'Araçlarını Ara' → 'Araçlarını+Ara'. Tarayıcılar bağlantılar için URL Kodlama gerektirir." },
  { question: "Base64 Kodlamayı ne zaman kullanmalıyım?", answer: "HTML'de resimleri kodlama (Veri URL'si: &lt;img src='data:...'&gt;), JSON API'lerinde veri aktarımı, e-posta ekleri gönderme." },
  { question: "encodeURI ile encodeURIComponent arasındaki fark nedir?", answer: "encodeURI: Tam URL'yi kodlar (/ , : , ? karakterlerini korur). encodeURIComponent: URL'nin bir bölümünü kodlar (tüm özel karakterleri kodlar). Sorgu parametreleri için encodeURIComponent kullanın." },
  { question: "Kodlama veri boyutunu etkiler mi?", answer: "Evet, Base64 boyutu %33 artırır. URL Kodlama, kodlanan karakter sayısına bağlı olarak boyutu artırır. HTML Varlıkları boyutu biraz artırır." },
  { question: "JavaScript'te bir metnin kodlamasını nasıl çözerim?", answer: "Base64: atob(str) çözme, btoa(str) kodlama. URL: decodeURIComponent(str) çözme, encodeURIComponent(str) kodlama. HTML: DOMParser veya harici bir kütüphane kullanın." },
  { question: "Kodlamada en sık yapılan hatalar nelerdir?", answer: "Arapça metinleri URL'ye göndermeden önce kodlamayı unutmak (bozuk karakterler görünür). Şifreleme için Base64 kullanmak (güvensiz). Metni kullanıcıya göstermeden önce kod çözmeyi unutmak." },
];

const relatedTools = [
  { title: "Base64 Kodlayıcı", icon: "🔄", href: "/tr/tools/base64-encoder" },
  { title: "JSON Biçimlendirici", icon: "📋", href: "/tr/tools/json-formatter" },
  { title: "Karma Oluşturucu", icon: "#️⃣", href: "/tr/tools/hash-generator" },
  { title: "Metin Karşılaştırma", icon: "⚖️", href: "/tr/tools/text-compare" },
  { title: "Metin Temizleme", icon: "🧹", href: "/tr/tools/text-cleaner" },
  { title: "Metin Durumu Dönüştürme", icon: "🔤", href: "/tr/tools/text-case" },
];

const seoContent = [
  "Metinleri birden çok yöntemle kodlama ve kod çözme aracı: Base64 (ikili veriler için), URL Kodlama (bağlantılar için) ve HTML Varlıkları (güvenli metinler için). Metni girin ve kodlama türünü seçin.",
  "Her web geliştiricisinin kodlamayı anlaması gerekir: API'lerde resimler ve metinler için Base64, bağlantılar ve sorgu parametreleri için URL Kodlama, siteleri XSS'ten korumak için HTML Varlıkları.",
  "Kodlama şifreleme değildir — herhangi bir kodlama kolayca tersine çevrilebilir. Temsil ve iletim için kullanın, güvenlik koruması için değil. Koruma için bcrypt (parolalar için) veya TLS (iletim için) kullanın.",
  "Araç tamamen tarayıcıda çalışır — metinler hiçbir sunucuya gönderilmez. Tam gizlilik."
];

export default function Client() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("base64-encode");

  const process = () => {
    try {
      switch (mode) {
        case "base64-encode": setResult(btoa(unescape(encodeURIComponent(input)))); break;
        case "base64-decode": setResult(decodeURIComponent(escape(atob(input)))); break;
        case "url-encode": setResult(encodeURIComponent(input)); break;
        case "url-decode": setResult(decodeURIComponent(input)); break;
      }
    } catch { setResult("Kodlama/kod çözme hatası"); }
  };

  const schemaName = "Kodlama Aracı";
const schemaDesc = `Online Kodlama Aracı - ücretsiz araç`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tr/tools/encoder";
const breadcrumbItems = [
  { name: "Ana Sayfa", url: "https://adwatak.cloud" },
  { name: "Web Geliştirme", url: "https://adwatak.cloud/category/calculators" },
  { name: "Kodlama Aracı", url: "https://adwatak.cloud/tr/tools/encoder" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'tr', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb lang="tr" category="Web Geliştirme" categorySlug="dev" toolName="Kodlama Aracı" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔧 Kodlama Aracı</h1>
        <p className="text-sm text-gray-500 mb-6">Metinleri kodlama ve kod çözme</p>
        <select value={mode} onChange={(e) => setMode(e.target.value)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white mb-4">
          <option value="base64-encode">Base64 Kodlama</option>
          <option value="base64-decode">Base64 Kod Çözme</option>
          <option value="url-encode">URL Kodlama</option>
          <option value="url-decode">URL Kod Çözme</option>
        </select>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          className="w-full h-[120px] p-4 border-2 border-gray-200 rounded-xl text-sm outline-none font-inherit resize-y mb-4"
          placeholder="Metni girin..." />
        <button onClick={process}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          Uygula
        </button>
      </div>
      {result && (
        <div className="bg-green-50 rounded-xl p-5 mb-6 border border-green-200 break-all text-sm">
          {result}
        </div>
      )}
      <SEOContent content={seoContent} lang="tr" />
      <FAQSection faqs={faqs} lang="tr" />
      <RelatedTools tools={relatedTools} lang="tr" />
    <ShareButtons lang="tr" />
    </div>
  );
}