"use client";
import { useState, useEffect } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema ,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const currencies = [
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "EGP", name: "Egyptian Pound", flag: "🇪🇬" },
  { code: "KWD", name: "Kuwaiti Dinar", flag: "🇰🇼" },
  { code: "QAR", name: "Qatari Riyal", flag: "🇶🇦" },
  { code: "OMR", name: "Omani Rial", flag: "🇴🇲" },
  { code: "BHD", name: "Bahraini Dinar", flag: "🇧🇭" },
  { code: "JOD", name: "Jordanian Dinar", flag: "🇯🇴" },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷" },
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
];

const faqs = [
  { question: "Hangi para birimleri destekleniyor?", answer: "14'ten fazla para birimi: Suudi Riyali (SAR), BAE Dirhemi (AED), Mısır Lirası (EGP), Kuveyt Dinarı (KWD), Katar Riyali (QAR), Umman Riyali (OMR), Bahreyn Dinarı (BHD), ABD Doları (USD), Euro (EUR), İngiliz Sterlini (GBP), Türk Lirası (TRY), Ürdün Dinarı (JOD), Çin Yuanı (CNY), Hindistan Rupisi (INR)." },
  { question: "Döviz kurları nereden geliyor?", answer: "Gösterilen kurlar, günlük olarak güncellenen açık kaynaklı bir döviz API'sinden alınan orta piyasa kurlarıdır. Bankalar ve döviz büroları %1-5 marj ekler. Aracımızı bir tahmin olarak kullanın, ardından kesin kurlar için bankanızla kontrol edin." },
  { question: "KİK para birimleri ABD dolarına sabitlenmiş mi?", answer: "Evet, çoğu KİK para birimi sabitlenmiştir: SAR = 3.75, AED = 3.67, QAR = 3.64, BHD = 0.376, OMR = 0.384 (1 USD karşılığı). KWD küresel olarak en değerli para birimidir ve tamamen sabitlenmemiştir. EGP ve TRY serbest dalgalanır." },
  { question: "En iyi döviz kuru nasıl alınır?", answer: "Havaalanı döviz bürolarından kaçının (en kötü kurlar). Wise, Revolut veya STC Pay kullanın. Daha iyi kurlar için daha büyük tutarlar transfer edin. Büyük meblağları çevirmeden önce kurları birkaç gün izleyin." },
  { question: "SAR'ı USD'ye çevirebilir miyim?", answer: "1 SAR = 0.267 USD (sabit kur). 1,000 SAR = 267 USD. SAR-USD kuru, para birimi sabitlemesi nedeniyle istikrarlıdır. Bu paritede banka marjı genellikle 0.5-1%'dir." },
  { question: "Alış/satış farkı nedir?", answer: "Alış fiyatı = bankanın size döviz sattığı fiyat. Satış fiyatı = siz döviz sattığınızda bankanın ödediği fiyat. Aradaki fark bankanın kar marjıdır (spread). Aracımız orta kuru gösterir." },
  { question: "Kripto para birimlerini destekliyor musunuz?", answer: "Hayır, yalnızca geleneksel itibari para birimlerini destekliyoruz. Kripto dönüşümleri için Binance veya Coinbase gibi özel platformları kullanın." },
  { question: "Bunu seyahat için nasıl kullanırım?", answer: "Kendi para biriminizdeki tutarı girin, hedef para biriminizi seçin. Gerçekçi bir bütçe için banka marjları için %2-3 ekleyin. Seyahatten bir hafta önce kurları kontrol edin." },
  { question: "KWD neden en değerli para birimi?", answer: "Kuveyt güçlü bir ekonomiye, büyük petrol rezervlerine ve bir varlık fonuna sahiptir. KWD bir para sepetine sabitlenmiştir (sadece USD değil). 1 KWD ≈ 3.25 USD." },
  { question: "Döviz çevirmek için en iyi zaman?", answer: "Londra piyasası saatlerinde hafta içi (Pazar-Perşembe 08:00-22:00). Hafta sonlarından kaçının (piyasalar kapalı, spreadler daha geniş). Büyük ekonomik haber günlerinden kaçının." },
];

const relatedTools = [
  { title: "KDV Hesaplayıcı", icon: "🏛️", href: "/en/tools/vat-calculator" },
  { title: "Kar Marjı", icon: "📈", href: "/en/tools/profit-margin" },
  { title: "Altın Hesaplayıcı", icon: "🥇", href: "/en/tools/gold-calculator" },
  { title: "Kredi Hesaplayıcı", icon: "💰", href: "/en/tools/loan-calculator" },
  { title: "Birim Çevirici", icon: "📏", href: "/en/tools/unit-converter" },
  { title: "Maaş Hesaplayıcı", icon: "💵", href: "/en/tools/salary-calculator" },
];

const seoContent = [
  "14'ten fazla dünya para birimi arasında anında dönüşüm yapın — SAR, AED, EGP, KWD, USD, EUR, GBP ve daha fazlası. Tutarı girin, para birimlerini seçin ve canlı orta piyasa kurlarıyla sonucu alın.",
  "KİK para birimleri USD'ye sabitlenmiştir (KWD hariç). SAR = 3.75, AED = 3.67, QAR = 3.64. EGP ve TRY serbest dalgalanır. Seyahat planlaması, online alışveriş ve iş için dönüştürücüyü kullanın.",
  "Seyahat edenler için ipucu: Havaalanı kurları en kötüsüdür. Sadece ilk gün için orada bozdurun, geri kalanı için Wise veya STC Pay kullanın. Doğru bütçe yapmak için seyahatten önce kurları kontrol edin.",
  "İşletmeler için: Gösterilen kurlar gösterge niteliğindedir. Büyük transferler için rekabetçi teklifler almak üzere bankanızla iletişime geçin. Bankalar 10,000 USD üzerindeki tutarlar için daha iyi kurlar sunar.",
];

export default function Client() {
  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState("SAR");
  const [to, setTo] = useState("USD");
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRate = async (f: string, t: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/currency-proxy");
      const data = await res.json();
      const rates = data?.usd;
      const fromLower = f.toLowerCase();
      const toLower = t.toLowerCase();
      if (rates?.[fromLower] && rates?.[toLower]) {
        // Cross rate: rate = rates[to] / rates[from]
        const crossRate = rates[toLower] / rates[fromLower];
        setRate(crossRate);
        setLastUpdated(data.date || "");
      } else {
        setError("Unable to get exchange rate");
      }
    } catch {
      setError("Failed to connect to rates service");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRate(from, to);
  }, [from, to]);

  useEffect(() => {
    if (rate !== null && amount) {
      const a = parseFloat(amount);
      setResult(isNaN(a) ? null : a * rate);
    } else {
      setResult(null);
    }
  }, [rate, amount]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const schemaName = "Döviz Çevirici";
  const schemaDesc = "Online Currency Converter — live mid-market rates";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/tr/tools/currency-converter";
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: "https://adwatak.cloud/tr" },
    { name: "Çeviriciler", url: "https://adwatak.cloud/tr/category/converters" },
    { name: "Döviz Çevirici", url: "https://adwatak.cloud/tr/tools/currency-converter" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'tr', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — yapay zeka/ses motorları için işaretli içerik */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      {/* GEO: HowTo — adim adim kullanim */}
      <StructuredData data={howToSchema("Bu araci nasil kullanirim", "Tarayicinizda calisan ucretsiz arac. Kayit gerektirmez.", [{name:"Araci acin",text:"Adwatak sitesinde bu arac sayfasina gidin"},{name:"Verilerinizi girin",text:"Gerekli alanlari doldurun"},{name:"Sonuc alin",text:"Hesapla veya olustur butonuna tiklayin"},{name:"Kullanin veya paylasin",text:"Sonucu kopyalayin, indirin veya paylasin"}],"bir dakikadan az","tr")} />
      {/* GEO: Speakable — AI/ses motorlari */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />

      <Breadcrumb category="Çeviriciler" categorySlug="converters" toolName="Döviz Çevirici" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">💱 Döviz Çevirici</h1>
        <p className="text-sm text-gray-500 mb-6">Canlı döviz kurları — günlük güncellenir</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tutar</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="1,000" />
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-end">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kaynak</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">
                {currencies.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}
              </select>
            </div>
            <button onClick={swap}
              className="bg-gray-200 hover:bg-gray-300 rounded-xl p-3 text-lg transition-all cursor-pointer border-none mb-0.5">
              🔄
            </button>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Hedef</label>
              <select value={to} onChange={(e) => setTo(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">
                {currencies.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}
              </select>
            </div>
          </div>

          {loading && <p className="text-sm text-gray-400 text-center">⏳ Loading rates...</p>}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {result !== null && !loading && !error && (
            <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
              <p className="text-xs text-green-600">{parseFloat(amount || "0").toLocaleString("en-US")} {from} =</p>
              <p className="text-3xl font-black text-green-900 my-2">{result.toLocaleString("en-US", { maximumFractionDigits: 2 })} {to}</p>
              <p className="text-xs text-gray-500">Rate: 1 {from} = {(rate || 0).toFixed(6)} {to}</p>
              {lastUpdated && <p className="text-xs text-gray-400 mt-1">📅 Last updated: {lastUpdated}</p>}
            </div>
          )}

          {!loading && !error && rate === null && (
            <p className="text-sm text-gray-400 text-center">This currency pair is not supported. Try another pair.</p>
          )}
        </div>
      </div>
      <SEOContent content={seoContent} lang="tr" />
      <FAQSection faqs={faqs} lang="tr" />
      <RelatedTools tools={relatedTools} lang="tr" />
      <ShareButtons lang="tr" />
    </div>
  );
}
