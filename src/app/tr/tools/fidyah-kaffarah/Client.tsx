"use client";
import { useState } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema, howToSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

type KaffarahType = "oath" | "ramadan" | "zhihar" | "fasting";

interface KaffarahInfo {
  title: string;
  description: string;
  options: { label: string; detail: string }[];
  defaultCount: number;
}

const KAFFARAH_DATA: Record<KaffarahType, KaffarahInfo> = {
  oath: {
    title: "🤲 Yemin Kaffaratı",
    description: "Bir yemin edip de sonra onu bozan kişi kaffarat ödemelidir. Allah buyurmuştur: 'Kaffarı, ailenize verdiğiniz yemeğin orta derecesinden on fakiri yahut on fakiri giydirmek veya bir köle azat etmektir. Kim bunu bulamazsa üç gün oruç tutması gerekir.' (Maide 89)",
    options: [
      { label: "10 fakirin doyurulması", detail: "Ailenize verdiğiniz orta derecede yemekle on fakirin doyurulması — yaklaşık 1.5 kg pirinç/kişi = toplam 15 kg" },
      { label: "10 fakirin giydirilmesi", detail: "On fakire giysi temin etmek" },
      { label: "Bir köle azat etmek", detail: "Bir mümin köleyi azat etmek — günümüzde geçerli değil" },
      { label: "3 gün oruç tutmak", detail: "Üç gün aralıklı veya ardışık oruç — yemek veya giysi bulamayanlar için" },
    ],
    defaultCount: 1,
  },
  ramadan: {
    title: "🌙 Ramazan'da Cinsel İlişki Kaffaratı",
    description: "Ramazan gündüzünde bilerek cinsel ilişkiye giren kişi hem kaza etmeli hem kaffarat ödemelidir. Kaffarat sırasıyla: köle azat etmek, bulamazsa 60 gün ardışık oruç, buna da güç yetemezse 60 fakirin doyurulması.",
    options: [
      { label: "Bir köle azat etmek", detail: "Bir mümin köleyi azat etmek — günümüzde geçerli değil" },
      { label: "60 gün ardışık oruç", detail: "60 gün ardışık oruç tutmak — şer'i bir mazeret olmadıkça bozulamaz" },
      { label: "60 fakirin doyurulması", detail: "Altmış fakirin doyurulması — yaklaşık 1.5 kg pirinç/kişi = toplam 90 kg" },
    ],
    defaultCount: 1,
  },
  zhihar: {
    title: "💔 Zıhır Kaffaratı",
    description: "Zıhır, kocasının karısına 'Sen annemin sırtı gibisin' demesidir. Cinsel ilişkiden önce kaffarat ödemelidir. Allah buyurmuştur: 'Karılarından zıhır edip sonra söylediklerine dönmek isteyelerden, dokunmadan önce bir köle azat edilir.' (Mücadele 3)",
    options: [
      { label: "Bir köle azat etmek", detail: "Bir mümin köleyi azat etmek — günümüzde geçerli değil" },
      { label: "60 gün ardışık oruç", detail: "60 gün ardışık oruç — köle bulamayanlar için" },
      { label: "60 fakirin doyurulması", detail: "Altmış fakirin orta derecede yemekle doyurulması — yaklaşık 90 kg pirinç" },
    ],
    defaultCount: 1,
  },
  fasting: {
    title: "🍽️ Oruç Fidyesi",
    description: "Oruç tutamayacak derecede aciz olan kişiler (yaşlılık, kronik hastalık) her gün için fidye ödemelidir: bir fakirin doyurulması. Allah buyurmuştur: 'Oruçta güçlük çekenler ise bir fakirin yemeği fidye olarak verir.' (Bakara 184)",
    options: [
      { label: "Her gün için 1 fakirin doyurulması", detail: "Her tutulamayan gün için bir fakirin doyurulması — yaklaşık 1.5 kg pirinç/gün" },
      { label: "Her gün için 2 fakirin doyurulması", detail: "Her gün için iki fakirin doyurulması — yaklaşık 3 kg pirinç/gün (bazı alimler caiz görmüştür)" },
    ],
    defaultCount: 30,
  },
};

const FOOD_PRICES: Record<string, { unit: string; pricePerUnit: number; label: string }> = {
  rice: { unit: "kg", pricePerUnit: 15, label: "Pirinç" },
  bread: { unit: "ekmek", pricePerUnit: 3, label: "Ekmek" },
  dates: { unit: "kg", pricePerUnit: 50, label: "Hurma" },
  meat: { unit: "kg", pricePerUnit: 80, label: "Et" },
};

export default function Client() {
  const [selectedType, setSelectedType] = useState<KaffarahType>("oath");
  const [count, setCount] = useState(1);
  const [foodType, setFoodType] = useState("rice");
  const [foodPerPerson, setFoodPerPerson] = useState(1.5);
  const [calculated, setCalculated] = useState(false);

  const info = KAFFARAH_DATA[selectedType];
  const food = FOOD_PRICES[foodType];

  const totalFood = count * foodPerPerson;
  const totalCost = totalFood * food.pricePerUnit;

  const handleCalculate = () => setCalculated(true);

  const typeLabels: Record<KaffarahType, string> = {
    oath: "🤲 Yemin Kaffaratı",
    ramadan: "🌙 Ramazan Kaffaratı",
    zhihar: "💔 Zıhır Kaffaratı",
    fasting: "🍽️ Oruç Fidyesi",
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Fidye ve Kaffarat Hesaplama", "Fidye ve kaffarat hesaplayın — yemin bozma, Ramazan ilişkisi, Zıhır, oruç fidyesi ve şer'i açıklamalar", "https://adwatak.cloud/tr/tools/fidyah-kaffarah", "tr", "İslami")} />
      <StructuredData data={faqSchema([
        { question: "Yemin kaffaratı nedir?", answer: "Yemin bozma kaffaratı: 10 fakirin doyurulması veya giydirilmesi veya bir köle azat etmek. Bulamayan üç gün oruç tutsun. (Maide 89)" },
        { question: "Ramazan'da cinsel ilişki kaffaratı nedir?", answer: "Kaza + Kaffarat: köle azat etmek, bulamazsa 60 gün ardışık oruç, buna da güç yetemezse 60 fakirin doyurulması." },
        { question: "Zıhır kaffaratı nedir?", answer: "Köle azat etmek, bulamazsa 60 gün ardışık oruç, buna da güç yetemezse 60 fakirin doyurulması." },
        { question: "Oruç fidyesi nedir?", answer: "Daimi olarak oruç tutamayanlar için her gün bir fakirin doyurulması. Kişi başı yaklaşık 1.5 kg pirinç." },
        { question: "Kaffaratta oruç yerine yiyecek verilebilir mi?", answer: "Evet, sağlık nedeniyle oruç tutamıyorsa yiyecek vermek caizdir. Acil bir sağlık sorunu olmalıdır." },
        { question: "Kişi başı ne kadar yiyecek gerekir?", answer: "Yaklaşık 1.5 kg pirinç veya orta derecede yiyecek. Bazı alimler yarım sa' (yaklaşık 1.5 kg) demiştir." },
        { question: "Oruç ardışık mı olmalı?", answer: "Evet, kaffarat orucu (yemin için 3 gün, Zıhır/Ramazan için 60 gün) çoğu alime göre ardışık olmalıdır." },
        { question: "Kadın yemin bozarsa kaffarat öder mi?", answer: "Evet, yemin kaffaratı hem erkek hem kadın için geçerlidir." },
        { question: "Yiyecek yerine para verilebilir mi?", answer: "Çoğu alim kaffaratta para yerine yiyecek verilmesini caiz görmez. Ancak bazı çağdaş alimler fakire para verilmesine izin vermiştir." },
        { question: "Fidye ile kaffarat arasındaki fark nedir?", answer: "Kaffarat yasak işlemek içindir. Fidye ise farz yerine getirilemediği içindir." },
        { question: "Araç ücretsiz mi?", answer: "Evet, Fidye ve Kaffarat hesaplayıcı tamamen ücretsizdir." },
        { question: "Bilinçli olmayan yemin bozma için kaffarat gerekir mi?", answer: "Kaffarat sadece bilerek bozulan yeminler içindir. Zor unutma veya zor durumda kalmakta kaffarat gerekmez." },
      ])} />
      <StructuredData data={breadcrumbSchema([
        { name: "Ana Sayfa", url: "https://adwatak.cloud/tr" },
        { name: "İslami Araçlar", url: "https://adwatak.cloud/tr/category/islamic" },
        { name: "Fidye ve Kaffarat", url: "https://adwatak.cloud/tr/tools/fidyah-kaffarah" },
      ])} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <StructuredData data={howToSchema("Bu aracı nasıl kullanırım", "Tarayıcınızda çalışan ücretsiz araç. Kayıt gerektirmez.", [{name: "Türü seçin", text: "Kaffarat veya fidye türünü seçin"}, {name: "Sayıyı girin", text: "Kez veya gün sayısını girin"}, {name: "Yiyecek türünü seçin", text: "Yiyecek türünü ve kişi başı miktarı seçin"}, {name: "Hesaplayın", text: "Miktar ve tahmini maliyeti görmek için hesapla butonuna tıklayın"}], "iki dakikadan az", "tr")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb lang="tr" category="İslami Araçlar" categorySlug="islamic" toolName="Fidye ve Kaffarat" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">⚖️ Fidye ve Kaffarat Hesaplama</h1>
        <p className="text-sm text-gray-500 mb-6">Fidye ve kaffarat miktarını detaylı şer'i açıklamalarla hesaplayın</p>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Kaffarat veya fidye türünü seçin:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(Object.keys(typeLabels) as KaffarahType[]).map(type => (
              <button
                key={type}
                onClick={() => { setSelectedType(type); setCount(KAFFARAH_DATA[type].defaultCount); setCalculated(false); }}
                className={`p-4 rounded-xl border-2 text-left font-semibold text-sm transition-colors ${selectedType === type ? "border-green-500 bg-green-50 text-green-800" : "border-gray-200 bg-white text-gray-700 hover:border-green-300"}`}
              >
                {typeLabels[type]}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
          <h3 className="font-bold text-amber-800 mb-2">{info.title}</h3>
          <p className="text-sm text-amber-700 leading-relaxed mb-4">{info.description}</p>
          <div className="space-y-2">
            {info.options.map((opt, i) => (
              <div key={i} className="bg-white rounded-lg p-3 border border-amber-100">
                <p className="font-semibold text-gray-800 text-sm">{opt.label}</p>
                <p className="text-xs text-gray-600 mt-1">{opt.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {selectedType === "fasting" ? "Gün sayısı:" : "Kez sayısı:"}
            </label>
            <input type="number" min={1} max={365} value={count} onChange={e => { setCount(Math.max(1, parseInt(e.target.value) || 1)); setCalculated(false); }} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Yiyecek türü:</label>
            <select value={foodType} onChange={e => { setFoodType(e.target.value); setCalculated(false); }} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
              {Object.entries(FOOD_PRICES).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kişi başı miktar (kg):</label>
            <input type="number" min={0.5} max={10} step={0.5} value={foodPerPerson} onChange={e => { setFoodPerPerson(parseFloat(e.target.value) || 1.5); setCalculated(false); }} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          </div>
        </div>

        <button onClick={handleCalculate} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-lg">
          ⚖️ Fidye / Kaffarat Hesapla
        </button>

        {calculated && (
          <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <h3 className="text-lg font-extrabold text-green-800 mb-4 text-center">📊 Hesaplama Sonucu</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white rounded-xl p-3 border border-green-100">
                <p className="text-xs text-gray-500">Fakir / Gün sayısı</p>
                <p className="text-xl font-extrabold text-gray-800">{count}</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-green-100">
                <p className="text-xs text-gray-500">Yiyecek türü</p>
                <p className="text-base font-extrabold text-gray-800">{food.label}</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-green-100">
                <p className="text-xs text-gray-500">Kişi başı miktar</p>
                <p className="text-base font-extrabold text-gray-800">{foodPerPerson} {food.unit}</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-green-100">
                <p className="text-xs text-gray-500">Toplam yiyecek</p>
                <p className="text-base font-extrabold text-gray-800">{totalFood.toLocaleString()} {food.unit}</p>
              </div>
            </div>
            <div className="border-t border-green-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Tahmini maliyet:</span>
                <span className="text-xl font-extrabold text-green-800">{totalCost.toLocaleString()} ₺</span>
              </div>
              <p className="text-xs text-gray-500">* Fiyatlar tahminidir ve bölgeye göre değişebilir</p>
            </div>
          </div>
        )}
      </div>

      <SEOContent content={[
        "Fidye ve Kaffarat Hesaplama — Yemin, Ramazan ilişkisi, Zıhır kaffaratı ve oruç fidyesini hesaplayın.",
        "Her tür için Kur'an ve Sünnet delilleriyle detaylı şer'i açıklamalar içerir.",
        "Gerekli yiyecek miktarını (pirinç, ekmek, hurma, et) ve tahmini maliyeti hesaplayın.",
        "4 tür destekler: Yemin (10 kişi), Ramazan (60 kişi), Zıhır (60 kişi), Fidye (1 kişi/gün).",
        "%100 ücretsiz, tarayıcınızda çalışır — veri sunucuya gönderilmez.",
      ]} lang="tr" />
      <FAQSection faqs={[
        { question: "Yemin kaffaratı nedir?", answer: "10 fakirin doyurulması veya giydirilmesi veya bir köle azat etmek. Bulamayan üç gün oruç tutsun." },
        { question: "Ramazan'da cinsel ilişki kaffaratı nedir?", answer: "Kaza + Kaffarat: köle azat etmek, 60 gün ardışık oruç, 60 fakirin doyurulması." },
        { question: "Zıhır kaffaratı nedir?", answer: "Köle azat etmek, 60 gün ardışık oruç, 60 fakirin doyurulması." },
        { question: "Oruç fidyesi nedir?", answer: "Her gün bir fakirin doyurulması — yaklaşık 1.5 kg pirinç." },
        { question: "Kaffaratta oruç yerine yiyecek verilebilir mi?", answer: "Evet, sağlık nedeniyle oruç tutamıyorsa caizdir." },
        { question: "Kişi başı ne kadar yiyecek gerekir?", answer: "Yaklaşık 1.5 kg pirinç veya orta derecede yiyecek." },
        { question: "Oruç ardışık mı olmalı?", answer: "Evet, kaffarat orucu ardışık olmalıdır." },
        { question: "Kadın yemin bozarsa kaffarat öder mi?", answer: "Evet, yemin kaffaratı hem erkek hem kadın için geçerlidir." },
        { question: "Yiyecek yerine para verilebilir mi?", answer: "Çoğu alim caiz görmez." },
        { question: "Fidye ile kaffarat arasındaki fark nedir?", answer: "Kaffarat yasak işlemek, fidye farz yerine getirilememek içindir." },
      ]} lang="tr" />
      <RelatedTools tools={[
        { title: "Zekat Hesaplama", icon: "🕌", href: "/tr/tools/zakat-calculator" },
        { title: "Umre Hesaplama", icon: "🕋", href: "/tr/tools/umrah-calculator" },
        { title: "Kıble Yönü", icon: "🧭", href: "/tr/tools/qibla-direction" },
        { title: "Tasbih Sayacı", icon: "📿", href: "/tr/tools/tasbeeh-counter" },
      ]} lang="tr" />
      <ShareButtons lang="tr" />
    </div>
  );
}
