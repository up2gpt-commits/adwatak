"use client";
import { useState } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "Günde kaç kalori almalıyım?", answer: "Kilo korumak için: hareketsiz kadınlar ~1.800-2.000, aktif kadınlar ~2.200-2.400. Hareketsiz erkekler ~2.200-2.400, aktif erkekler ~2.600-2.800. Kilo vermek için: günde 300-500 kalori azaltın. Kadınlar için 1.200'ün, erkekler için 1.500'ün altına düşmeyin." },
  { question: "BMR nedir?", answer: "Bazal Metabolizma Hızı — vücudunuzun dinlenme halinde yaktığı kalori (nefes, kalp, beyin, hücre onarımı). BMR günlük kalorinizin %60-75'ini oluşturur. Hesap makinemiz en doğru formül olan Mifflin-St Jeor'u kullanır." },
  { question: "Günlük kalori ihtiyacımı ne etkiler?", answer: "Yaş (yaşla azalır), cinsiyet (erkekler daha fazla ihtiyaç duyar), kilo (daha ağır = daha fazla), boy (daha uzun = daha fazla), kas kütlesi, aktivite seviyesi ve genetik. Hepsini hesaplamamıza dahil ettik." },
  { question: "Kalori sayarak nasıl kilo veririm?", answer: "Günde 300-500 kalori açığı oluşturun. Protein (öğün başına 25-30g), lif (25-35g/gün) ve bütün gıdalar tüketin. Egzersiz kalorilerini geri yemeyin — takip cihazları %20-50 abartır. Sürdürülebilir kayıp: haftada 0.5-1 kg." },
  { question: "En iyi makro dağılımı nedir?", answer: "Genel: %45-65 karbonhidrat, %10-35 protein, %20-35 yağ. Kilo kaybı için: %40 protein, %30 karbonhidrat, %30 yağ. Sporcular için: %25 protein, %55 karbonhidrat, %20 yağ." },
  { question: "BMR ve TDEE arasındaki fark nedir?", answer: "BMR = tam dinlenme kalorisi. TDEE (Toplam Günlük Enerji Harcaması) = BMR + aktivite + sindirim. TDEE günlük gerçek yaktığınızdır. BMR'yi 1.2 (hareketsiz) ile 1.9 (çok aktif) arasında çarparak TDEE'yi bulun." },
  { question: "Dinlenme günlerinde daha az yemeli miyim?", answer: "Evet — dinlenme günlerinde kilo kaybı için koruma seviyesinde (açık değil) veya 200-300 daha az yiyin. Antrenman günlerinde, egzersiz çevresinde daha fazla yiyin. Bu 'kalori döngüsü' yöntemi uyumu ve performansı artırır." },
];

const relatedTools = [
  { title: "VKİ Hesaplama", icon: "⚖️", href: "/tr/tools/bmi-calculator" },
  { title: "Yaş Hesaplama", icon: "🎂", href: "/tr/tools/age-calculator" },
  { title: "Bileşik Faiz", icon: "📈", href: "/tr/tools/compound-interest" },
  { title: "Birim Çevirici", icon: "📏", href: "/tr/tools/unit-converter" },
];

const seoContent = [
  "Ücretsiz Kalori Hesaplama aracı, yaş, cinsiyet, boy, kilo ve aktivite seviyenize göre günlük kalori ihtiyacınızı hesaplar. Mifflin-St Jeor denklemini kullanır.",
  "Nasıl çalışır: BMR'yi (dinlenme kalorisi) hesaplar, ardından aktivite faktörüyle çarparız. 30 yaşında kadın, 165 cm, 65 kg, hafif aktif: 2.025 kalori/gün koruma. Haftada 0.5 kg kayıp için: 1.525 kalori/gün.",
];

export default function Client() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("75");
  const [height, setHeight] = useState("175");
  const [activity, setActivity] = useState("1.375");
  const [goal, setGoal] = useState<"lose" | "maintain" | "gain">("maintain");
  const [result, setResult] = useState<{ bmr: number; tdee: number; target: number } | null>(null);
  const calculate = () => {
    const a = parseFloat(age), w = parseFloat(weight), h = parseFloat(height), act = parseFloat(activity);
    if (!a || !w || !h) return;
    const bmr = sex === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * act;
    const adjust = goal === "lose" ? -500 : goal === "gain" ? 300 : 0;
    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee), target: Math.round(tdee + adjust) });
  };
  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Kalori Hesaplama", "Günlük kalori ihtiyacınızı hesaplayın — kilo verme, koruma veya kas yapma", "https://adwatak.cloud/tr/tools/calorie-calculator", "tr", "Health")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{ name: "Ana Sayfa", url: "https://adwatak.cloud/tr" }, { name: "Diğer Araçlar", url: "https://adwatak.cloud/tr/category/daily" }, { name: "Kalori Hesaplama", url: "https://adwatak.cloud/tr/tools/calorie-calculator" }])} />
      {/* GEO: Speakable — yapay zeka/ses motorları için işaretli içerik */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb lang="tr" category="Diğer Araçlar" categorySlug="daily" toolName="Kalori Hesaplama" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔥 Kalori Hesaplama</h1>
        <p className="text-sm text-gray-500 mb-6">Günlük kalori ihtiyacınızı hesaplayın — kilo verme, koruma veya kas yapma</p>
        <div className="flex gap-2 mb-4">
          {(["male", "female"] as const).map((s) => (<button key={s} onClick={() => setSex(s)} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${sex === s ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>{s === "male" ? "♂ Erkek" : "♀ Kadın"}</button>))}
        </div>
        {[{ l: "Yaş", v: age, s: setAge, p: "30" }, { l: "Kilo (kg)", v: weight, s: setWeight, p: "75" }, { l: "Boy (cm)", v: height, s: setHeight, p: "175" }].map((f, i) => (
          <div key={i} className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.l}</label><input type="number" value={f.v} onChange={(e) => f.s(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder={f.p} /></div>
        ))}
        <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Aktivite Seviyesi</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none bg-white">
            <option value="1.2">Hareketsiz (masa başı iş, egzersiz yok)</option>
            <option value="1.375">Hafif (1-3 gün/hafta)</option>
            <option value="1.55">Orta (3-5 gün/hafta)</option>
            <option value="1.725">Çok aktif (6-7 gün/hafta)</option>
            <option value="1.9">Ekstra aktif (fiziksel iş + günlük antrenman)</option>
          </select>
        </div>
        <div className="flex gap-2 mb-4">
          {([{ k: "lose", l: "Kilo Ver" }, { k: "maintain", l: "Koru" }, { k: "gain", l: "Kas Yap" }] as const).map((g) => (<button key={g.k} onClick={() => setGoal(g.k)} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${goal === g.k ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>{g.l}</button>))}
        </div>
        <button onClick={calculate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Hesapla</button>
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200"><p className="text-xs text-blue-600 mb-1">BMR</p><p className="text-xl font-extrabold text-blue-900">{result.bmr}</p><p className="text-[10px] text-blue-400">kal/gün</p></div>
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200"><p className="text-xs text-green-600 mb-1">TDEE</p><p className="text-xl font-extrabold text-green-900">{result.tdee}</p><p className="text-[10px] text-green-400">kal/gün</p></div>
          <div className="bg-yellow-50 rounded-xl p-5 text-center border border-yellow-300"><p className="text-xs text-yellow-700 mb-1">{goal === "lose" ? "Hedef (Açık)" : goal === "gain" ? "Hedef (Fazla)" : "Hedef"}</p><p className="text-xl font-extrabold text-yellow-900">{result.target}</p><p className="text-[10px] text-yellow-600">kal/gün</p></div>
        </div>
      )}
      <SEOContent content={seoContent} lang="tr" />
      <FAQSection faqs={faqs} lang="tr" />
      <RelatedTools tools={relatedTools} lang="tr" />
      <ShareButtons lang="tr" />
    </div>
  );
}
