"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "Brüt kar marjı ile net kar marjı arasındaki fark nedir?", answer: "Brüt kar marjı yalnızca doğrudan ürün maliyetini dikkate alır. Net kar marjı her şeyi düşer — genel giderler, pazarlama, vergiler. Bir kafede kahvenin brüt kar marjı %70 iken kira ve personel sonrası net marj %10 olabilir. Her ikisi de farklı kararlar için önemlidir." },
  { question: "İyi bir kar marjı nedir?", answer: "Sektöre göre değişir: restoranlar %3-9, yazılım %15-25, perakende %2-5, danışmanlık %20-40, üretim %5-15. %5 net marj bakkal için iyidir ama danışmanlık için kötüdür. Kendi sektörünüzdeki ortalamayı referans alın." },
  { question: "Kar marjı ile kâr oranı arasındaki fark nedir?", answer: "Kâr oranı (markup) = kâr / maliyet × 100. Kar marjı (margin) = kâr / fiyat × 100. 60 TL maliyet, 100 TL fiyat: markup = %66.7, margin = %40. %40 marj istiyorsanız, maliyete %66.7 eklemelisiniz — %40 değil. Bu en yaygın fiyatlandırma hatasıdır." },
  { question: "Marjdan satış fiyatı nasıl hesaplanır?", answer: "Satış Fiyatı = Maliyet ÷ (1 - İstenen Marj). Örnek: maliyet = 60 TL, istenen marj = %40. Fiyat = 60 ÷ 0.6 = 100 TL. %50 marj istiyorsanız: 60 ÷ 0.5 = 120 TL. Marjı her zaman bu şekilde hesaplayın, maliyete yüzde ekleyerek değil." },
  { question: "Fiyat ve marjdan maliyet nasıl hesaplanır?", answer: "Maliyet = Fiyat × (1 - Marj). Örnek: 100 TL'den satıyorsunuz, %40 marj istiyorsunuz. Maksimum maliyet = 100 × 0.6 = 60 TL. Maliyetiniz 60 TL'den yüksekse, %40 marjı 100 TL fiyatla yakalayamazsınız. Ya fiyatı artırın ya da maliyetleri düşürün." },
  { question: "Bir startup için sağlıklı kar marjı nedir?", answer: "SaaS startup'ları için ölçekte %20-40 net marj mükemmeldir. Erken aşama: %60-80 brüt marj hedefleyin (SaaS için yaygın). Brüt marj %50'nin altındaysa, ölçeklenmeden önce fiyatlandırma modelinizi veya maliyet yapınızı ciddi şekilde gözden geçirin." },
  { question: "Başabaş noktası nasıl hesaplanır?", answer: "Başabaş Noktası = Sabit Maliyetler ÷ Birim Başına Katkı Marjı. Katkı Marjı = Fiyat - Birim Değişken Maliyet. Örnek: sabit maliyetler 10,000 TL, fiyat 100 TL, değişken maliyet 60 TL → KM = 40 TL → BN = 250 birim. 250'den sonraki her satış saf kârdır." },
  { question: "Brüt kar marjı ile katkı marjı arasındaki fark nedir?", answer: "Brüt kar marjı = (Gelir - SMM) ÷ Gelir. Katkı marjı = (Gelir - Değişken Maliyetler) ÷ Gelir. SMM sadece ürün maliyetidir. Katkı marjı TÜM değişken maliyetleri içerir (ürün + komisyonlar + paketleme + nakliye). Katkı marjı fiyatlandırma kararları için daha kullanışlıdır." },
  { question: "%50 kar marjı iyi midir?", answer: "%50 brüt kar marjı çoğu sektörde mükemmeldir. Ancak unutmayın: bu %50'den kira %10, maaşlar %15, pazarlama %5, faturalar %2 düşer → net kâr sadece %18 olur. Brüt kar marjı net kâr değildir. İş sağlığı için her zaman net marjı düşünün." },
  { question: "Kar marjımı nasıl iyileştirebilirim?", answer: "1) Tedarikçilerle pazarlık yapın. 2) Fiyatları kademeli olarak artırın. 3) Stok israfını azaltın. 4) Düşük marjlı ürünlerin yanında yüksek marjlı ürünler satın. 5) Bireysel indirimler yerine paket teklifler yapın. 6) Operasyonel maliyetleri düşürmek için süreçleri otomatikleştirin." },
  { question: "Kar marjı %100'ün üzerinde olabilir mi?", answer: "Kar marjı (margin %) ASLA %100'ü geçemez çünkü kâr ÷ fiyattır. Kâr fiyattan büyük olamaz. Ancak kâr oranı (markup) %100'ü geçebilir. Örnek: maliyet 10 TL, fiyat 100 TL → marj = %90, markup = %900. İkisini karıştırmayın!" },
  { question: "E-ticaret için iyi bir kar marjı nedir?", answer: "E-ticaret ortalaması %10-20 net marjdır. En iyiler %25-40'a ulaşır. Zorluklar: reklamlar (gelirin %10-30'u), nakliye (%5-15), iadeler (%5-20), ödeme işleme (%2-3). %15 net kar için en az %45 brüt marj gerekir. Bu hesaplayıcıyı kullanarak hedef net marjınızdan geriye doğru çalışın." },
];

const relatedTools = [
  { title: "KDV Hesaplama", icon: "🏛️", href: "/tr/tools/vat-calculator" },
  { title: "Kredi Hesaplama", icon: "💰", href: "/tr/tools/loan-calculator" },
  { title: "Döviz Çevirici", icon: "💱", href: "/tr/tools/currency-converter" },
  { title: "Maaş Hesaplama", icon: "💵", href: "/tr/tools/salary-calculator" },
  { title: "Bileşik Faiz", icon: "📊", href: "/tr/tools/compound-interest" },
  { title: "Fatura Oluşturucu", icon: "🧾", href: "/tr/tools/invoice-generator" },
];

const seoContent = [
  "Kâr Marjı Hesaplayıcı, işletme sahipleri, girişimciler ve e-ticaret satıcıları için vazgeçilmez bir araçtır. Kâr marjı, kâr oranı, satış fiyatı veya maliyeti anında hesaplayın — herhangi iki değeri girin ve gerisini otomatik alın.",
  "Marj ile kâr oranı arasındaki farkı anlamak fiyatlandırma için kritiktir. Marj, her satışın yüzde kaçının kâr olduğunu söyler. Kâr oranı, maliyetin üzerine ne kadar eklediğinizi söyler. İkisini karıştırmak iş dünyasındaki en yaygın fiyatlandırma hatasıdır.",
  "Örnek: Bir ürünü 60 TL'ye alıp 100 TL'ye satıyorsunuz. Kâr = 40 TL. Marj = 40 ÷ 100 × 100 = %40. Kâr oranı = 40 ÷ 60 × 100 = %66.7. 'Maliyete %40 ekle' derseniz — bu kâr oranıdır ve size sadece %28.6 marj verir. Bu hesaplayıcıyı kullanarak marj-kâr oranı tuzağından kaçının.",
  "Marj neden sektöre göre değişir? Marketler %1-3 net marjla çalışır çünkü yüksek hacim satarlar. Kuyumcular %20-40 ile çalışır çünkü satışlar seyrektir. Yazılım şirketleri %20-40'a ulaşır çünkü marjinal maliyetler sıfıra yakındır. Sektör standardınızı bilmek gerçekçi hedefler belirlemenize yardımcı olur.",
  "Bu kâr marjı hesaplayıcı üç yöntemi destekler: (A) Maliyet ve Satış Fiyatından → marj ve kâr oranı. (B) Maliyet ve İstenen Marjdən → satış fiyatı. (C) Satış Fiyatı ve İstenen Marjdən → izin verilen maksimum maliyet. Ürün fiyatlandırması ve maliyet yönetimi için mükemmel.",
  "İpucu: Brüt kar marjını net kârla karıştırmayın. Brüt marj sadece ürün maliyetini düşer. Net kâr her şeyi düşer: kira, maaşlar, pazarlama, faturalar, bakım. İlk fiyatlandırma için bu hesaplayıcıyı kullanın, ardından gerçek net kâr için tüm diğer maliyetleri ekleyin.",
];

interface Scenario { name: string; cost: number; price: number; margin: number; markup: number; profit: number }

export default function Client() {
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [margin, setMargin] = useState("");
  const [result, setResult] = useState<{
    margin: number; markup: number; profit: number; price: number; cost: number
  } | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [showWhatIf, setShowWhatIf] = useState(false);

  const calculate = () => {
    const c = parseFloat(cost);
    const p = parseFloat(price);
    const m = parseFloat(margin);
    if (c > 0 && p > 0) {
      const res = { margin: ((p - c) / p * 100), markup: ((p - c) / c * 100), profit: p - c, price: p, cost: c };
      setResult(res);
      return;
    }
    if (c > 0 && m > 0 && m < 100) {
      const calcPrice = c / (1 - m / 100);
      setResult({ margin: m, markup: (calcPrice - c) / c * 100, profit: calcPrice - c, price: calcPrice, cost: c });
      return;
    }
    if (p > 0 && m > 0 && m < 100) {
      const calcCost = p * (1 - m / 100);
      setResult({ margin: m, markup: (p - calcCost) / calcCost * 100, profit: p - calcCost, price: p, cost: calcCost });
    }
  };

  const saveScenario = () => {
    if (!result) return;
    const count = scenarios.length;
    const label = `Ürün ${count + 1}`;
    setScenarios([...scenarios, { name: label, ...result }]);
  };

  const removeScenario = (idx: number) => {
    setScenarios(scenarios.filter((_, i) => i !== idx));
  };

  const clearAll = () => {
    setScenarios([]);
  };

  const whatIfData = result ? [-20, -15, -10, -5, 0, 5, 10, 15, 20].map(pct => {
    const newPrice = result.price * (1 + pct / 100);
    const newProfit = newPrice - result.cost;
    return { change: pct, price: newPrice, profit: newProfit, margin: (newProfit / newPrice * 100), markup: (newProfit / result.cost * 100) };
  }) : [];

  const inputStyle = "w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all";
  const labelStyle = "block text-sm font-semibold text-gray-700 mb-1.5";
  const cardStyle = "bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6 mb-5";
  const gradientBtn = "bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold p-3.5 rounded-xl border-none text-lg w-full cursor-pointer hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98]";
  const resultCardStyle = "bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-xl p-5 text-center border border-white/40 shadow-sm";

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Kâr Marjı Hesaplayıcı", "Online Kâr Marjı Hesaplayıcı - ücretsiz araç", "https://adwatak.cloud/tr/tools/profit-margin", "tr", "Utility")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{ name: "Ana Sayfa", url: "https://adwatak.cloud/tr" }, { name: "Finansal Hesaplamalar", url: "https://adwatak.cloud/tr/category/calculators" }, { name: "Kâr Marjı Hesaplayıcı", url: "https://adwatak.cloud/tr/tools/profit-margin" }])} />
      <StructuredData data={howToSchema("Kâr Marjı Hesaplayıcı nasıl kullanılır", "Ücretsiz çevrimiçi araç. Tarayıcınızda çalışır. Kayıt gerektirmez.", [{ name: "Aracı açın", text: "Adwatak'ta Kâr Marjı Hesaplayıcı'ya gidin" }, { name: "Verilerinizi girin", text: "Maliyet, fiyat veya istenen marjı girin (herhangi 2 değer)" }, { name: "Hesapla'yı tıklayın", text: "Anında sonuç almak için hesapla butonuna basın" }, { name: "Senaryoları kaydedin", text: "Birden çok ürünü karşılaştırmak için Senaryo özelliğini kullanın" }], "bir dakikadan az", "tr")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb lang="tr" category="Finansal Hesaplamalar" categorySlug="calculators" toolName="Kâr Marjı Hesaplayıcı" />

      {/* Main Calculator Card */}
      <div className={cardStyle}>
        <h1 className="text-2xl font-extrabold mb-1">📈 Kâr Marjı Hesaplayıcı</h1>
        <p className="text-sm text-gray-500 mb-6">Kâr marjı, kâr oranı, satış fiyatı veya azami maliyet hesapla — herhangi 2 değer girin</p>

        {[
          { label: "Maliyet (TL)", value: cost, set: setCost, placeholder: "60", step: "any" },
          { label: "Satış Fiyatı (TL) — isteğe bağlı", value: price, set: setPrice, placeholder: "100", step: "any" },
          { label: "İstenen Marj (%) — isteğe bağlı", value: margin, set: setMargin, placeholder: "40", step: "any" },
        ].map((f, i) => (
          <div key={i} className="mb-4">
            <label className={labelStyle}>{f.label}</label>
            <input type="number" value={f.value} onChange={(e) => f.set(e.target.value)}
              step={f.step} className={inputStyle} placeholder={f.placeholder} />
          </div>
        ))}

        <p className="text-xs text-gray-400 mb-3">Herhangi 2 değer girin — kalanı otomatik hesaplanır</p>
        <button onClick={calculate} className={gradientBtn}>
          <span className="inline-flex items-center gap-2">🧮 Hesapla</span>
        </button>
      </div>

      {/* Results Section */}
      {result && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className={resultCardStyle}>
              <p className="text-xs text-indigo-500 mb-1 font-medium">Kâr Marjı</p>
              <p className="text-2xl font-extrabold text-indigo-600">{result.margin.toFixed(2)}%</p>
            </div>
            <div className={resultCardStyle}>
              <p className="text-xs text-emerald-500 mb-1 font-medium">Kâr Oranı</p>
              <p className="text-2xl font-extrabold text-emerald-600">{result.markup.toFixed(2)}%</p>
            </div>
            <div className={resultCardStyle}>
              <p className="text-xs text-amber-500 mb-1 font-medium">Net Kâr</p>
              <p className="text-2xl font-extrabold text-amber-600">{result.profit.toFixed(2)} TL</p>
            </div>
          </div>

          {/* Visual Stacked Bar Chart */}
          <div className={cardStyle}>
            <h3 className="text-sm font-bold text-gray-700 mb-3">📊 Maliyet vs Kâr Dağılımı</h3>
            {(() => {
              const total = result.cost + result.profit;
              const costPct = (result.cost / total * 100);
              const profitPct = (result.profit / total * 100);
              return (
                <>
                  <div className="h-10 rounded-xl overflow-hidden flex mb-2 shadow-inner">
                    <div className="bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center text-xs font-bold text-gray-700 transition-all duration-300"
                      style={{ width: `${costPct}%` }}>
                      {costPct >= 12 ? `Maliyet ${costPct.toFixed(1)}%` : ""}
                    </div>
                    <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center text-xs font-bold text-white transition-all duration-300"
                      style={{ width: `${profitPct}%` }}>
                      {profitPct >= 12 ? `Kâr ${profitPct.toFixed(1)}%` : ""}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>🔵 Maliyet: {result.cost.toFixed(2)} TL</span>
                    <span>🟢 Kâr: {result.profit.toFixed(2)} TL</span>
                    <span>💰 Toplam: {total.toFixed(2)} TL</span>
                  </div>
                </>
              );
            })()}
          </div>

          {/* What-If Analysis */}
          <div className={cardStyle}>
            <button onClick={() => setShowWhatIf(!showWhatIf)}
              className="flex items-center justify-between w-full">
              <h3 className="text-sm font-bold text-gray-700">🔮 Fiyat Duyarlılık Analizi</h3>
              <span className={`text-gray-400 text-lg transition-transform ${showWhatIf ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {showWhatIf && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Fiyat Δ</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Fiyat</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Kâr</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Marj</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Oran</th>
                    </tr>
                  </thead>
                  <tbody>
                    {whatIfData.map((row, i) => (
                      <tr key={i} className={`border-b border-gray-100 hover:bg-indigo-50/50 transition-colors ${row.change === 0 ? 'bg-indigo-50 font-bold' : ''}`}>
                        <td className={`p-2.5 ${row.change > 0 ? 'text-emerald-600' : row.change < 0 ? 'text-red-500' : 'text-indigo-600'}`}>
                          {row.change > 0 ? `+${row.change}%` : `${row.change}%`}
                        </td>
                        <td className="p-2.5">{row.price.toFixed(2)} TL</td>
                        <td className="p-2.5">{row.profit.toFixed(2)} TL</td>
                        <td className="p-2.5">{row.margin.toFixed(2)}%</td>
                        <td className="p-2.5">{row.markup.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-gray-400 mt-3">Kalın satır = mevcut fiyat. Fiyat değişikliklerinin marjınızı nasıl etkilediğini görün.</p>
              </div>
            )}
          </div>

          {/* Scenario Comparison */}
          <div className={cardStyle}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-700">📋 Senaryo Karşılaştırma</h3>
              <div className="flex gap-2">
                {scenarios.length > 0 && (
                  <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">Temizle</button>
                )}
                <button onClick={saveScenario} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors">+ Kaydet</button>
              </div>
            </div>
            {scenarios.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">Farklı ürünleri veya fiyatlandırmaları karşılaştırmak için "Kaydet"e tıklayın</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Senaryo</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Maliyet</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Fiyat</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Marj</th>
                      <th className="p-2.5 text-left text-gray-600 font-semibold">Kâr</th>
                      <th className="p-2.5"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((s, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="p-2.5 font-medium">{s.name}</td>
                        <td className="p-2.5">{s.cost.toFixed(2)} TL</td>
                        <td className="p-2.5">{s.price.toFixed(2)} TL</td>
                        <td className="p-2.5">
                          <span className={`${s.margin >= 20 ? 'text-emerald-600' : s.margin >= 10 ? 'text-amber-600' : 'text-red-500'} font-semibold`}>
                            {s.margin.toFixed(1)}%
                          </span>
                        </td>
                        <td className="p-2.5">{s.profit.toFixed(2)} TL</td>
                        <td className="p-2.5">
                          <button onClick={() => removeScenario(i)} className="text-red-400 hover:text-red-600 transition-colors text-xs">✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      <SEOContent content={seoContent} lang="tr" />
      <FAQSection faqs={faqs} lang="tr" />
      <RelatedTools tools={relatedTools} lang="tr" />
      <ShareButtons lang="tr" />
    </div>
  );
}
