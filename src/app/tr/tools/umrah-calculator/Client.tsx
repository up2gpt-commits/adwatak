"use client";
import { useState } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema, howToSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

type Currency = "TRY" | "USD" | "SAR" | "EUR" | "GBP" | "IDR" | "PKR" | "EGP";

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  TRY: "₺", USD: "$", SAR: "SR", EUR: "€", GBP: "£", IDR: "Rp", PKR: "Rs", EGP: "E£",
};

const CURRENCY_LABELS: Record<Currency, string> = {
  TRY: "Türk Lirası", USD: "ABD Doları", SAR: "Suudi Riyalı", EUR: "Euro", GBP: "İngiliz Sterlini", IDR: "Endonezya Rupisi", PKR: "Pakistan Rupisi", EGP: "Mısır Lirası",
};

interface CostItem {
  label: string;
  amount: number;
}

interface UmrahCosts {
  visa: CostItem[];
  flight: CostItem[];
  accommodation: CostItem[];
  transport: CostItem[];
  expenses: CostItem[];
}

const UMRAH_RITUALS = [
  { step: 1, title: "İhram", description: "Mekât noktasından İhram'a girin — iki rekat namaz kılın ve deyin: Lebbeyk Allahumme Umre" },
  { step: 2, title: "Tavaf", description: "Kâbe etrafında yedi şavt tavaf edin — Hacerü'l-Esved'den başlayın ve orada bitirin" },
  { step: 3, title: "Makam-ı İbrahim'den sonra iki rekat namaz", description: "Tavafın ardından mümkünse Makam-ı İbrahim'in arkasında, değilse Harem'de herhangi bir yerde iki rekat namaz kılın" },
  { step: 4, title: "Safa ile Merve arasında Sa'y", description: "Safa ve Merve tepeleri arasında yedi şavt sa'y edin — Safa'dan başlayın, Merve'de bitirin" },
  { step: 5, title: "Tıraş veya Kısaltma (Halak/Taksir)", description: "Saçınızı tıraş edin veya kısaltın — bu, Umrenizi tamamlar ve İhram'dan çıkarsınız" },
];

export default function Client() {
  const [currency, setCurrency] = useState<Currency>("TRY");
  const [costs, setCosts] = useState<UmrahCosts>({
    visa: [{ label: "Umre Vizesi", amount: 0 }],
    flight: [{ label: "Uçak Bileti", amount: 0 }],
    accommodation: [{ label: "Mekke Oteli", amount: 0 }, { label: "Medine Oteli", amount: 0 }],
    transport: [{ label: "Yerel Ulaşım", amount: 0 }],
    expenses: [{ label: "Günlük Masraflar", amount: 0 }],
  });
  const [travelers, setTravelers] = useState(1);
  const [nights, setNights] = useState(10);
  const [calculated, setCalculated] = useState(false);

  const updateCost = (category: keyof UmrahCosts, index: number, field: "label" | "amount", value: string | number) => {
    setCosts(prev => {
      const updated = { ...prev };
      updated[category] = updated[category].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      return updated;
    });
  };

  const addCostItem = (category: keyof UmrahCosts) => {
    setCosts(prev => ({
      ...prev,
      [category]: [...prev[category], { label: "Yeni Kalem", amount: 0 }],
    }));
  };

  const removeCostItem = (category: keyof UmrahCosts, index: number) => {
    setCosts(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  };

  const categoryTotals = {
    visa: costs.visa.reduce((s, c) => s + c.amount, 0),
    flight: costs.flight.reduce((s, c) => s + c.amount, 0),
    accommodation: costs.accommodation.reduce((s, c) => s + c.amount, 0),
    transport: costs.transport.reduce((s, c) => s + c.amount, 0),
    expenses: costs.expenses.reduce((s, c) => s + c.amount, 0),
  };

  const grandTotal = Object.values(categoryTotals).reduce((s, v) => s + v, 0);
  const perPerson = travelers > 0 ? grandTotal / travelers : 0;

  const sym = CURRENCY_SYMBOLS[currency];

  const formatAmount = (amount: number) => {
    if (currency === "IDR" || currency === "PKR") return `${sym} ${amount.toLocaleString()}`;
    return `${amount.toLocaleString()} ${sym}`;
  };

  const handleCalculate = () => setCalculated(true);

  const categoryLabels: Record<keyof UmrahCosts, string> = {
    visa: "🛂 Vize",
    flight: "✈️ Uçak Bileti",
    accommodation: "🏨 Konaklama",
    transport: "🚗 Ulaşım",
    expenses: "💰 Masraflar",
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Umre Hesaplama", "Umre maliyetlerini tam hesaplayın — vize, uçak bileti, konaklama, ulaşım, günlük masraflar ve adım adım umre rehberi", "https://adwatak.cloud/tr/tools/umrah-calculator", "tr", "İslami")} />
      <StructuredData data={faqSchema([
        { question: "Umre 2026'ta ne kadar mal olur?", answer: "Maliyetler ülkenize, süre ve otel seviyesine göre değişir. Tahmini: Türkiye'den 15.000-40.000 ₺, ABD'den $2,500-$5,000, İngiltere'den £2,000-£4,000." },
        { question: "Hesaplayıcı vize maliyetini içeriyor mu?", answer: "Evet, Umre hesaplayıcı vize, uçak bileti, konaklama, ulaşım ve günlük masrafları kapsar — her kalem özelleştirilebilir." },
        { question: "Umre manası nedir?", answer: "İhram → Tavaf → Makam-ı İbrahim'den sonra namaz → Sa'y → Tıraş/Kısaltma." },
        { question: "Umre için kaç gün gerekir?", answer: "Manası için minimum 1 gün, ancak Medine ziyareti için 7-14 gün önerilir." },
        { question: "Birden fazla kişi için hesaplayabilir miyim?", answer: "Evet! Seyahat eden kişi sayısını girin, toplam ve kişi başı maliyet otomatik hesaplanır." },
        { question: "Umre ile Hac arasındaki fark nedir?", answer: "Umre her zaman yapılabilir ve farz değildir. Hac belirli aylarda yapılır ve İslam'ın beş şartından biridir." },
        { question: "Araç ücretsiz mi?", answer: "Evet, Umre hesaplayıcı tamamen ücretsiz ve tarayıcınızda çalışır." },
        { question: "Umre için en iyi zaman ne zaman?", answer: "Ramazan en iyi zamandır (Ramazan'da Umre, Hac sevabına eşittir). Daha düşük fiyatlar için Hac mevsiminden kaçının." },
        { question: "Umre için mahrem gerekir mi?", answer: "Çoğu alimlere göre kadının mahremi (eşi veya erkek akrabası) gerekir." },
        { question: "Hangi belgeler gerekli?", answer: "6+ ay geçerli pasaport, Umre vizesi, gidiş-dönüş uçak bileti, gerekli aşılar." },
        { question: "Umre ile birlikte Medine'yi ziyaret edebilir miyim?", answer: "Evet, Medine'yi ve Mescid-i Nebevi'yi Umre öncesinde veya sonrasında ziyaret etmek müstahaptır." },
        { question: "Mekât'ımı nasıl bilirim?", answer: "Beş mekât vardır: Zü'l-Huleyfe (Medine için), Cuhfe (Mısır/Şam için), Yellemlem (Yemen için), Karnü'l-Menazil (Necd için), Zat-ırak (Irak için). Seyahat acentenize danışın." },
      ])} />
      <StructuredData data={breadcrumbSchema([
        { name: "Ana Sayfa", url: "https://adwatak.cloud/tr" },
        { name: "İslami Araçlar", url: "https://adwatak.cloud/tr/category/islamic" },
        { name: "Umre Hesaplama", url: "https://adwatak.cloud/tr/tools/umrah-calculator" },
      ])} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <StructuredData data={howToSchema("Bu aracı nasıl kullanırım", "Tarayıcınızda çalışan ücretsiz araç. Kayıt gerektirmez.", [{name: "Para birimi seçin", text: "Tercih ettiğiniz para birimini seçin"}, {name: "Maliyetleri girin", text: "Her maliyet kategorisini doldurun — vize, uçak, otel, ulaşım, masraflar"}, {name: "Seyahat eden sayısını belirleyin", text: "Seyahat eden kişi sayısını girin"}, {name: "Hesaplayın", text: "Toplam ve kişi başı maliyetleri görmek için hesapla butonuna tıklayın"}], "iki dakikadan az", "tr")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb lang="tr" category="İslami Araçlar" categorySlug="islamic" toolName="Umre Hesaplama" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🕋 Umre Hesaplama</h1>
        <p className="text-sm text-gray-500 mb-6">Umre maliyetlerini tam hesaplayın — vize, uçak bileti, konaklama, ulaşım, günlük masraflar</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Para Birimi:</label>
            <select value={currency} onChange={e => setCurrency(e.target.value as Currency)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
              {Object.entries(CURRENCY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label} ({CURRENCY_SYMBOLS[key as Currency]})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Seyahat Eden Sayısı:</label>
            <input type="number" min={1} max={20} value={travelers} onChange={e => setTravelers(Math.max(1, parseInt(e.target.value) || 1))} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Gece Sayısı:</label>
            <input type="number" min={1} max={60} value={nights} onChange={e => setNights(Math.max(1, parseInt(e.target.value) || 1))} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          </div>
        </div>

        {(Object.keys(costs) as (keyof UmrahCosts)[]).map(cat => (
          <div key={cat} className="mb-6">
            <h3 className="text-base font-bold text-gray-800 mb-3">{categoryLabels[cat]}</h3>
            <div className="space-y-2">
              {costs[cat].map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input type="text" value={item.label} onChange={e => updateCost(cat, idx, "label", e.target.value)} className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                  <input type="number" min={0} value={item.amount || ""} onChange={e => updateCost(cat, idx, "amount", parseFloat(e.target.value) || 0)} placeholder="0" className="w-32 border border-gray-300 rounded-xl px-3 py-2 text-sm text-right focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                  {costs[cat].length > 1 && (
                    <button onClick={() => removeCostItem(cat, idx)} className="text-red-500 hover:text-red-700 text-lg px-2">✕</button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-2">
              <button onClick={() => addCostItem(cat)} className="text-xs text-green-600 hover:text-green-800 font-semibold">+ Kalem ekle</button>
              <span className="text-sm font-bold text-gray-600">Ara toplam: {formatAmount(categoryTotals[cat])}</span>
            </div>
          </div>
        ))}

        <button onClick={handleCalculate} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-lg">
          🕋 Umre Maliyetini Hesapla
        </button>

        {calculated && grandTotal > 0 && (
          <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <h3 className="text-lg font-extrabold text-green-800 mb-4 text-center">📊 Umre Maliyet Özeti</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {(Object.keys(categoryTotals) as (keyof UmrahCosts)[]).map(cat => (
                <div key={cat} className="bg-white rounded-xl p-3 border border-green-100">
                  <p className="text-xs text-gray-500">{categoryLabels[cat]}</p>
                  <p className="text-base font-extrabold text-gray-800">{formatAmount(categoryTotals[cat])}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-green-200 pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">{travelers} kişi için toplam:</span>
                <span className="text-xl font-extrabold text-green-800">{formatAmount(grandTotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Kişi başı maliyet:</span>
                <span className="text-lg font-extrabold text-emerald-700">{formatAmount(perPerson)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">{nights} gece için:</span>
                <span className="text-sm font-bold text-gray-600">{formatAmount(perPerson / nights)} / gece</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h2 className="text-xl font-extrabold mb-6">📿 Umre Manası Adım Adım</h2>
        <div className="space-y-4">
          {UMRAH_RITUALS.map(ritual => (
            <div key={ritual.step} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                {ritual.step}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{ritual.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{ritual.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SEOContent content={[
        "Umre Hesaplama — Umre maliyetlerini tam hesaplayın: vize, uçak bileti, Mekke ve Medine oteli, yerel ulaşım ve günlük masraflar.",
        "8 para birimi desteği: TRY, USD, SAR, EUR, GBP, IDR, PKR, EGP.",
        "Birden fazla seyahat eden için kişi başı ve gecelik maliyet hesaplama.",
        "Adım adım umre manası rehberi: İhram, Tavaf, Namaz, Sa'y, Tıraş.",
        "%100 ücretsiz, tarayıcınızda çalışır — veri sunucuya gönderilmez.",
      ]} lang="tr" />
      <FAQSection faqs={[
        { question: "Umre 2026'ta ne kadar mal olur?", answer: "Maliyetler ülkenize, süre ve otel seviyesine göre değişir. Tahmini: Türkiye'den 15.000-40.000 ₺, ABD'den $2,500-$5,000." },
        { question: "Umre manası nedir?", answer: "İhram → Tavaf → Makam-ı İbrahim'den sonra namaz → Sa'y → Tıraş/Kısaltma." },
        { question: "Umre için kaç gün gerekir?", answer: "Manası için minimum 1 gün, ancak Medine ziyareti için 7-14 gün önerilir." },
        { question: "Birden fazla kişi için hesaplayabilir miyim?", answer: "Evet! Seyahat eden kişi sayısını girin, toplam ve kişi başı maliyet otomatik hesaplanır." },
        { question: "Araç ücretsiz mi?", answer: "Evet, Umre hesaplayıcı tamamen ücretsiz ve tarayıcınızda çalışır." },
        { question: "Umre için en iyi zaman ne zaman?", answer: "Ramazan en iyi zamandır. Daha düşük fiyatlar için Hac mevsiminden kaçının." },
        { question: "Umre için mahrem gerekir mi?", answer: "Çoğu alimlere göre kadının mahremi gerekir." },
        { question: "Hangi belgeler gerekli?", answer: "6+ ay geçerli pasaport, Umre vizesi, gidiş-dönüş uçak bileti, gerekli aşılar." },
        { question: "Umre ile birlikte Medine'yi ziyaret edebilir miyim?", answer: "Evet, Medine'yi ziyaret etmek müstahaptır." },
        { question: "Mekât'ımı nasıl bilirim?", answer: "Beş mekât vardır. Seyahat acentenize danışın." },
      ]} lang="tr" />
      <RelatedTools tools={[
        { title: "Zekat Hesaplama", icon: "🕌", href: "/tr/tools/zakat-calculator" },
        { title: "Kıble Yönü", icon: "🧭", href: "/tr/tools/qibla-direction" },
        { title: "Namaz Vakitleri", icon: "🕐", href: "/tr/tools/prayer-times" },
        { title: "Tasbih Sayacı", icon: "📿", href: "/tr/tools/tasbeeh-counter" },
      ]} lang="tr" />
      <ShareButtons lang="tr" />
    </div>
  );
}
