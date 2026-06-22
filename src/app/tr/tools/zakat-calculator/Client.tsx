"use client";
import { useState } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema ,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

function fmt(n: number) { return n.toLocaleString("en-US", { maximumFractionDigits: 2 }); }

const faqs = [
  { question: "Zekat nedir?", answer: "Zekat, İslam'ın üçüncü şartıdır — bir kameri yıl boyunca elde tutulan malın %2,5'i oranında farz olan bir sadakadır. Nakit, altın, gümüş, yatırımlar, ticari mal stokları ve kira gelirleri gibi nisap miktarını aşan varlıklara uygulanır." },
  { question: "Nisap nedir?", answer: "Zekatın farz olması için gereken asgari servet eşiğidir. Nisap = 85 gram altın veya 595 gram gümüşün değeridir (daha fazla kişiyi kapsaması için düşük olan gümüş değeri kullanılır). 2024'te: yaklaşık 5.000-6.000 $ (85g altın) veya 500-600 $ (595g gümüş). Çoğu alim gümüş nisabını tavsiye eder." },
  { question: "Hangi mallar zekata tabidir?", answer: "Nakit (banka hesapları, birikimler), altın ve gümüş (çoğu alime göre ziynet eşyası dahil), hisse senetleri ve yatırımlar, ticari mal stokları (sabit kıymetler hariç), kira gelirleri, kripto paralar (artan kabul), geri ödeneceği umulan borçlar." },
  { question: "Hangi mallar zekattan muaftır?", answer: "Oturulan ev, şahsi araba, iş ekipmanları, ev eşyaları, başkalarına olan borçlar, maaş (henüz alınmamış), emeklilik hesapları (401k/IRA — hak edilmemiş veya erişilemeyen kısımlar). Bazı alimlerce tartışmalıdır." },
  { question: "Zekat ne zaman verilir?", answer: "Nisap miktarının üzerindeki malın üzerinden bir kameri yıl (355 gün) geçtikten sonra. Hesaplamayı kolaylaştırmak için sabit bir tarih belirleyin (ör. Ramazan'ın 1'i). Yıl içinde dilediğiniz zaman ödeyebilirsiniz. Birçok kişi sevabı katlandığı için Ramazan'da öder." },
  { question: "Zekat kimlere verilir?", answer: "Kur'an-ı Kerim Tevbe Suresi 60. ayette belirtilen sekiz sınıf: fakirler, düşkünler, zekat memurları, kalpleri İslam'a ısındırılacaklar, köleler/esirler, borçlular, Allah yolunda (fi sebilillah) olanlar ve yolda kalmış yolcular." },
  { question: "Zekat peşin verilebilir mi?", answer: "Evet, malınızın nisabın üzerinde kalacağından eminseniz yıl dolmadan zekat verebilirsiniz. Bazı alimler aylar öncesinden verilmesine izin verir. Yıl sonunda hesaplayıp hemen ödeyin — geciktirmeyin." },
  { question: "Altın ziynet eşyasının zekatı?", answer: "Çoğu alime göre: altın ziynet eşyası %2,5 oranında zekata tabidir. Bazılarına (Hanefi) göre: mubah kullanım için olan ziynet eşyası muaftır. Tedbirli olmak için ziynet değeri üzerinden zekat hesaplayın. Kendi aliminizin görüşünü alın." },
  { question: "Hisse senetlerinin zekatı?", answer: "İki yöntem: (1) Toplam hisse değerinin %2,5'i (daha kolay, ihtiyatlı). (2) Yalnızca şirket varlıklarını temsil eden kısım (nakit + stok + alacaklar) üzerinden zekat. Endeks fonları için: yöntem 1 daha basittir. Tek tek hisseler için: yöntem 2 daha doğrudur." },
  { question: "Kira gelirinin zekatı?", answer: "Yıl içinde elde edilen net kira gelirinin (giderler, mortgage ödemeleri düşüldükten sonra) %2,5'i zekat olarak verilir. Mülkün kendi değeri değil. Kira = 24.000 $/yıl, giderler = 8.000 $, net = 16.000 $ ise zekat = 400 $." },
  { question: "Zekat aile bireylerine verilebilir mi?", answer: "Evet, maddi olarak bakmakla yükümlü olmadığınız uygun akrabalara: kardeşler, kuzenler, teyzeler, halalar, dayılar, amcalar, kayınvalideler. Anne-baba, çocuklar veya eşe verilmez (zaten onlara bakmak zorundasınız). Niyet önemlidir — hediye değil, zekat olarak verin." },
  { question: "Zekat gayrimüslimlere verilebilir mi?", answer: "Ebu Hanife ve birçok çağdaş alime göre: zekat, özellikle ihtiyaç sahibi olan fakir gayrimüslimlere verilebilir. Bu toplum ilişkilerini güçlendirir. Çoğu alim, 'kalpleri İslam'a ısındırılacaklar' sınıfına verilebileceği konusunda hemfikirdir." },
];

const relatedTools = [
  { title: "Altın Hesaplayıcı", icon: "🥇", href: "/en/tools/gold-calculator" },
  { title: "Miras Hesaplayıcı", icon: "📜", href: "/en/tools/inheritance-calculator" },
  { title: "Hicri Dönüştürücü", icon: "🌙", href: "/en/tools/hijri-converter" },
  { title: "Namaz Vakitleri", icon: "🕌", href: "/en/tools/prayer-times" },
  { title: "Bileşik Faiz", icon: "📈", href: "/en/tools/compound-interest" },
  { title: "Kar Marjı", icon: "📐", href: "/en/tools/profit-margin" },
];

const seoContent = [
  "Zekat Hesaplayıcımız, Müslümanların yıllık zekat yükümlülüklerini doğru bir şekilde hesaplamalarına yardımcı olur. Nakit birikimlerinizi, altın/gümüş değerinizi, yatırımlarınızı ve ticari mal stoklarınızı girin. Hesaplayıcı otomatik olarak nisap eşiğini kontrol eder ve zekata tabi malın %2,5'ini hesaplar.",
  "Örnek: 15.000 $ birikim, 5.000 $ altın, 10.000 $ hisse senedi, 3.000 $ ticari mal stoku. Toplam zekata tabi mal = 33.000 $. Nisabın üzerinde (hesaplamaya göre 500-6.000 $). Zekat = 33.000 $ × %2,5 = 825 $. Yılda bir kez ödenir.",
  "Hesaplama adımları: (1) Zekat tarihinizi belirleyin (her kameri yıl aynı gün). (2) Tüm zekata tabi varlıkları listeleyin: nakit, altın, gümüş, hisse senetleri, ticari mal stoku, kira geliri, kripto para. (3) Acil borçları ve giderleri düşün. (4) Kalanın nisabı aşıp aşmadığını kontrol edin. (5) %2,5'i ödeyin.",
  "Altın nisabı: 85g × güncel gram altın fiyatı. Gümüş nisabı: 595g × güncel gümüş fiyatı. Gümüş nisabını (500-600 $) kullanmak daha fazla malı kapsar ve birçok alim tarafından tavsiye edilir. Güncel altın/gümüş fiyatları için Altın Hesaplayıcımıza bakın.",
  "İlgili: Zekat için doğru altın değeri almak üzere Altın Hesaplayıcımızı kullanın. Miras Hesaplayıcı, İslami miras planlamasına yardımcı olur. Hicri Dönüştürücü, zekat yıl dönümü tarihiniz için kameri yılı takip eder.",
  "İpucu: Yıl boyunca bir zekat tablosu tutun. Üç ayda bir mal varlığınızdaki büyük değişiklikleri kaydedin. Zekat ayı geldiğinde hesaplamalar 10 dakika sürer. Ramazan'da bağış yapmak sevabı katlar. Doğruluğu sağlamak için hesaplayıcımızı kullanın — yanlış hesaplanan zekat kabul olmaz."
];

export default function Client() {
  const [cash, setCash] = useState("15000");
  const [gold, setGold] = useState("5000");
  const [stocks, setStocks] = useState("10000");
  const [business, setBusiness] = useState("3000");
  const [result, setResult] = useState<{ total: number; nisabCheck: string; zakat: number } | null>(null);

  const calculate = () => {
    const total = [cash, gold, stocks, business].reduce((s, v) => s + (parseFloat(v) || 0), 0);
    const nisab = 500; // using silver nisab
    setResult({ total, nisabCheck: total >= nisab ? "Above Nisab" : "Below Nisab", zakat: total >= nisab ? total * 0.025 : 0 });
  };

  const schemaName = "Zekat Hesaplayıcı";
const schemaDesc = `Çevrimiçi Zekat Hesaplayıcı - ücretsiz araç`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tr/tools/zakat-calculator";
const breadcrumbItems = [
  { name: "Ana Sayfa", url: "https://adwatak.cloud/tr" },
  { name: "İslami Araçlar", url: "https://adwatak.cloud/tr/category/calculators" },
  { name: "Zekat Hesaplayıcı", url: "https://adwatak.cloud/tr/tools/zakat-calculator" },
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

      <Breadcrumb category="İslami Araçlar" categorySlug="calculators" toolName="Zekat Hesaplayıcı" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">☪️ Zekat Hesaplayıcı</h1>
        <p className="text-sm text-gray-500 mb-6">Yıllık zekat yükümlülüğünüzü doğru bir şekilde hesaplayın</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Nakit ve Tasarruflar ($)</label><input type="number" value={cash} onChange={(e) => setCash(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="15000" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Altın ve Gümüş ($)</label><input type="number" value={gold} onChange={(e) => setGold(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="5000" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">Hisse Senetleri ve Yatırımlar ($)</label><input type="number" value={stocks} onChange={(e) => setStocks(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="10000" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">İşletme Envanteri ($)</label><input type="number" value={business} onChange={(e) => setBusiness(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="3000" /></div>
        </div>
        <button onClick={calculate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Zekatı Hesapla</button>
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200"><p className="text-xs text-blue-600 mb-1">Toplam Servet</p><p className="text-xl font-extrabold text-blue-900">${fmt(result.total)}</p></div>
          <div className="bg-yellow-50 rounded-xl p-5 text-center border border-yellow-300"><p className="text-xs text-yellow-700 mb-1">Durum</p><p className="text-xl font-extrabold text-yellow-900">{result.nisabCheck}</p></div>
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200"><p className="text-xs text-green-600 mb-1">Ödenecek Zekat (2.5%)</p><p className="text-xl font-extrabold text-green-900">${fmt(result.zakat)}</p></div>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    <ShareButtons lang="tr" />
    </div>
  );
}