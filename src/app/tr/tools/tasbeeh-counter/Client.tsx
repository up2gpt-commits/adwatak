"use client";
import { useState, useEffect, useCallback } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const dhikrList = [
  { text: "سُبْحَانَ اللهِ", transliteration: "Subhan Allah", meaning: "Allah'ümdür, eksiklikten münezzehtir", target: 33 },
  { text: "الْحَمْدُ لِلَّهِ", transliteration: "Elhamdülillah", meaning: "Hamd Allah'a mahsustur", target: 33 },
  { text: "اللهُ أَكْبَرُ", transliteration: "Allahu Ekber", meaning: "Allah en büyüktür", target: 34 },
  { text: "لَا إِلَٰهَ إِلَّا اللهُ", transliteration: "La ilahe illallah", meaning: "Allah'tan başka ilah yoktur", target: 33 },
  { text: "أَسْتَغْفِرُ اللهَ", transliteration: "Estagfirullah", meaning: "Allah'tan bağışlanma dilerim", target: 33 },
  { text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ", transliteration: "La havle ve la kuvvete illa billah", meaning: "Güç ve kuvvet ancak Allah'tandır", target: 33 },
  { text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ", transliteration: "Subhan Allahi ve bihamdihi", meaning: "Allah'ümdür, hamd ile münezzehtir", target: 33 },
  { text: "سُبْحَانَ اللهِ الْعَظِيمِ", transliteration: "Subhan Allahil Azim", meaning: "Yüce Allah eksiklikten münezzehtir", target: 33 },
];

const faqs = [
  { question: "Tasbih Sayacı nedir?", answer: "Tasbih Sayacı, zikirlerinizi saymanıza yardımcı olan dijital bir araçtır. Tarayıcınızda doğrudan çalışır, ilerlemenizi otomatik kaydeder ve geleneksel tesbih yerine veya destek olarak kullanılabilir." },
  { question: "Her zikir için neden 33 sayım?", answer: "33 sayısı Hz. Muhammed'in ﷺ sünnetinden gelmektedir. Her farz namazdan sonra 33 defa 'Sübhaneke', 33 defa 'Elhamdülillah' ve 34 defa 'Allahu Ekber' derdi — toplam 100. Bu uygulama Sahih Müslim'de rivayet edilmiştir." },
  { question: "Sayım sayfayı kapattığımda kaydedilir mi?", answer: "Evet! Sayınız otomatik olarak tarayıcınızın localStorage'ına kaydedilir. Sayfaya döndüğünüzde son sayınızı göreceksiniz. Ancak tarayıcı verilerinizi temizlemek veya farklı bir tarayıcı kullanmak sayacı sıfırlayacaktır." },
  { question: "İnternet bağlantısı olmadan kullanılabilir mi?", answer: "Evet — ilk sayfa yüklemesinden sonra Tasbih Sayacı tamamen çevrimdışı çalışır. Her şey tarayıcınızda doğrudan çalışır, hiçbir sunucuya veri gönderilmez." },
  { question: "Dijital sayacı kullanmak zikir sayılır mı?", answer: "Evet, önemli olan niyettir. Dijital sayacı zikirlerinizi takip etmenize yardımcı olan bir araç olarak kullanabilirsiniz. Alimler, zikirlerde dijital sayacı kullanılmasına izin vermişlerdir, ancak bazıları Hz. Peygamber'in ﷺ uygulaması olduğu için parmakla saymayı tercih eder." },
  { question: "En güzel zikir hangisidir?", answer: "En güzel zikir 'La ilahe illallah' (Allah'tan başka ilah yoktur) tır. Cabir (r.a.) tarafından rivayet edilmiştir. Diğer tavsiye edilen zikirler: 'Sübhaneke', 'Elhamdülillah', 'Allahu Ekber' ve 'La havle ve la kuvvete illa billah'." },
  { question: "Bir seti tamamladığımı nasıl bilirim?", answer: "Hedef sayıya (33 veya 34) ulaştığınızda, sayacı çemberi yeşil renge döner ve bir tamamlaj mesajı görünür. Ardından sonraki zikre geçebilir veya sayacı sıfırlayabilirsiniz." },
  { question: "Hedef sayıyı değiştirebilir miyim?", answer: "Hedef sayılar sünnete göre belirlenmiştir: çoğu zikir için 33, Tekbir (Allahu Ekber) için 34. Bunlar ayrı ayrı değiştirilemez, ancak isterseniz sayacı hedeften sonra da devam ettirebilirsiniz." },
  { question: "Sabah ve akşam zikirleri nelerdir?", answer: "Sabah zikirleri (Ezkâr-ı Sebah) ve akşam zikirleri (Ezkâr-ı Mesâ), sabah ve ikindi/akşam namazlarından sonra okunması tavsiye edilen dualardır. Bu sayacı, bu zikirlerinizi takip etmenize yardımcı olur." },
  { question: "Bu araç ücretsiz mi?", answer: "Evet — tamamen ücretsiz, kayıt gerektirmez, reklam yok, veri toplamaz. Tüm cihazlarda çalışır: mobil, tablet ve masaüstü." },
  { question: "Namaz sırasında kullanabilir miyim?", answer: "Namaz sırasında huzuru (huşû) korumak için telefonunuzu bir kenara koymanız tavsiye edilir. Tasbih Sayacını namazdan önce veya sonra kullanın." },
  { question: "Namazdan sonra hangi zikirleri okumalıyım?", answer: "Her farz namazdan sonra sünnet: 'Sübhaneke' 33 defa, 'Elhamdülillah' 33 defa, 'Allahu Ekber' 34 defa (toplam 100). Hz. Peygamber ﷺ: 'Bunu yapanın günahları denizin köpüğü kadar olsa bile bağışlanır.' buyurmuştur. (Sahih Müslim)" },
];

const relatedTools = [
  { title: "Namaz Vakitleri", icon: "🕌", href: "/tr/tools/prayer-times" },
  { title: "Kıble Yönü", icon: "🧭", href: "/tr/tools/qibla-direction" },
  { title: "Zekat Hesaplama", icon: "💰", href: "/tr/tools/zakat-calculator" },
  { title: "Hicri Çevirici", icon: "📅", href: "/tr/tools/hijri-converter" },
  { title: "Miras Hesaplama", icon: "⚖️", href: "/tr/tools/inheritance-calculator" },
  { title: "Kronometre", icon: "⏱️", href: "/tr/tools/stopwatch" },
];

const seoContent = [
  "Ücretsiz Dijital Tasbih Sayacı — zikirlerinizi çevrimiçi sayın. Subhan Allah, Elhamdülillah, Allahu Ekber ve daha fazlasını otomatik kaydetme özelliğiyle takip edin.",
  "8 temel zikiri destekler: Subhan Allah (33), Elhamdülillah (33), Allahu Ekber (34), La ilahe illallah (33), Estagfirullah (33), La havle ve la kuvvete illa billah (33), Subhan Allahi ve bihamdihi (33), Subhan Allahil Azim (33).",
  "Özellikler: Tarayıcı localStorage'ına otomatik kayıt, animasyonlu halka ile dairesel ilerleme göstergesi, tamamlaj bildirimleri, ilk yüklemeden sonra çevrimdışı çalışma, tamamen duyarlı tasarım.",
  "Hedef sayılar Hz. Muhammed'in ﷺ sünnetine göre belirlenmiştir: her zikir için 33, Tekbir için 34. Her farz namazdan sonra toplam 100 — Sahih Müslim'de rivayet edildiği gibi.",
  "%100 ücretsiz, kayıt gerektirmez, tüm cihazlarda çalışır, gizlilik öncelikli — hiçbir veri toplanmaz veya sunucuya gönderilmez.",
];

export default function Client() {
  const [selectedDhikr, setSelectedDhikr] = useState(0);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  const currentDhikr = dhikrList[selectedDhikr];

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasbeeh-count-tr");
    const savedTotal = localStorage.getItem("tasbeeh-total-tr");
    const savedDhikr = localStorage.getItem("tasbeeh-dhikr-tr");
    if (saved) setCount(parseInt(saved, 10));
    if (savedTotal) setTotalCount(parseInt(savedTotal, 10));
    if (savedDhikr) setSelectedDhikr(parseInt(savedDhikr, 10));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasbeeh-count-tr", count.toString());
    localStorage.setItem("tasbeeh-total-tr", totalCount.toString());
    localStorage.setItem("tasbeeh-dhikr-tr", selectedDhikr.toString());
  }, [count, totalCount, selectedDhikr]);

  // Show completion animation
  useEffect(() => {
    if (count >= currentDhikr.target && count > 0) {
      setShowComplete(true);
      const timer = setTimeout(() => setShowComplete(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [count, currentDhikr.target]);

  const increment = useCallback(() => {
    setCount(c => c + 1);
    setTotalCount(t => t + 1);
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  const resetAll = useCallback(() => {
    setCount(0);
    setTotalCount(0);
  }, []);

  const selectDhikr = useCallback((index: number) => {
    setSelectedDhikr(index);
    setCount(0);
  }, []);

  const progress = Math.min((count / currentDhikr.target) * 100, 100);
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const schemaName = "📿 Tasbih Sayacı";
  const schemaDesc = `Ücretsiz dijital Tasbih sayacı — zikirlerinizi sayın, tarayıcıda kaydedin`;
  const schemaCategory = "Islamic";
  const schemaUrl = "https://adwatak.cloud/tr/tools/tasbeeh-counter";
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: "https://adwatak.cloud/tr" },
    { name: "İslami Araçlar", url: "https://adwatak.cloud/tr/category/islamic" },
    { name: "📿 Tasbih Sayacı", url: "https://adwatak.cloud/tr/tools/tasbeeh-counter" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'tr', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={howToSchema("Tasbih Sayacı nasıl kullanılır", "Tarayıcınızda çalışan ücretsiz araç. Kayıt gerektirmez.", [
        { name: "Zikir seçin", text: "Listeden bir zikir seçin — Subhan Allah, Elhamdülillah, Allahu Ekber, vb." },
        { name: "Saymak için dokunun", text: "Sayacı artırmak için büyük butona veya dairedeki herhangi bir yere dokunun" },
        { name: "Seti tamamlayın", text: "Hedef sayıya (33 veya 34) ulaşana kadar devam edin — bir tamamlaj mesajı görünecektir" },
        { name: "Sonrakine geçin", text: "Tamamlajdan sonra sonraki zikre geçin veya sayacı sıfırlayın" },
      ], "bir dakikadan az", "tr")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb category="İslami Araçlar" categorySlug="islamic" toolName="Tasbih Sayacı" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1 text-center">📿 Tasbih Sayacı</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">Otomatik kayıtlı dijital zikir sayacı — her zikir için 33 sayım</p>

        {/* Dhikr selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {dhikrList.map((d, i) => (
            <button
              key={i}
              onClick={() => selectDhikr(i)}
              className={`px-3 py-2 rounded-xl text-sm font-bold border-2 transition-all cursor-pointer ${
                selectedDhikr === i
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300"
              }`}
            >
              {d.transliteration}
            </button>
          ))}
        </div>

        {/* Current dhikr display */}
        <div className="text-center mb-4">
          <p className="text-3xl font-bold text-emerald-700 mb-1">{currentDhikr.text}</p>
          <p className="text-sm text-gray-500">{currentDhikr.transliteration}</p>
          <p className="text-xs text-gray-400">{currentDhikr.meaning}</p>
        </div>

        {/* Circular counter */}
        <div className="flex justify-center my-6">
          <div className="relative w-52 h-52 cursor-pointer" onClick={increment}>
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <circle
                cx="100" cy="100" r="90" fill="none"
                stroke={showComplete ? "#10b981" : "#059669"}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-200"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-black font-mono ${showComplete ? "text-emerald-500" : "text-gray-900"}`}>
                {count}
              </span>
              <span className="text-sm text-gray-500">/ {currentDhikr.target}</span>
            </div>
          </div>
        </div>

        {/* Completion message */}
        {showComplete && (
          <div className="text-center mb-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="text-emerald-700 font-bold">✅ Maşallah! {currentDhikr.target} sayımı tamamladınız</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 justify-center mt-4">
          <button
            onClick={increment}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-4 rounded-2xl border-none cursor-pointer text-xl shadow-lg active:scale-95 transition-transform"
          >
            Tesbih ✨
          </button>
        </div>

        <div className="flex gap-3 justify-center mt-3">
          <button
            onClick={reset}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-2 rounded-xl border border-gray-200 cursor-pointer text-sm"
          >
            Bu Zikri Sıfırla
          </button>
          <button
            onClick={resetAll}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-6 py-2 rounded-xl border border-red-200 cursor-pointer text-sm"
          >
            Tümünü Sıfırla
          </button>
        </div>

        {/* Total counter */}
        <div className="text-center mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-500">Bugünkü Toplam Tesbih</p>
          <p className="text-3xl font-black text-emerald-700">{totalCount}</p>
        </div>
      </div>

      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
      <ShareButtons lang="tr" />
    </div>
  );
}
