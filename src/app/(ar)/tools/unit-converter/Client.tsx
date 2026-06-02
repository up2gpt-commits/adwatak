"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const categories: Record<string, Record<string, number>> = {
  "طول": { "متر": 1, "كيلومتر": 1000, "سنتيمتر": 0.01, "ملليمتر": 0.001, "ميل": 1609.34, "يارد": 0.9144, "قدم": 0.3048, "بوصة": 0.0254 },
  "وزن": { "كيلوغرام": 1, "غرام": 0.001, "رطل": 0.4536, "أونصة": 0.0283, "طن": 1000 },
  "حجم": { "لتر": 1, "مليلتر": 0.001, "غالون": 3.785, "متر مكعب": 1000 },
  "حرارة": { "مئوي": 1, "فهرنهايت": 1, "كلفن": 1 },
};

const faqs = [
  { question: "كم نوع وحدة مدعومة؟", answer: "أكثر من 20 وحدة في 4 فئات: طول (متر، كيلومتر، ميل، قدم، بوصة...)، وزن (كيلو، غرام، رطل، طن...)، حجم (لتر، غالون...)، حرارة (مئوي، فهرنهايت، كلفن)." },
  { question: "هل التحويل دقيق؟", answer: "نعم، نستخدم عوامل تحويل دقيقة معتمدة دولياً (SI units). مثلاً: 1 بوصة = 25.4 ملليمتر بالضبط. 1 رطل = 0.45359237 كيلوغرام. الحرارة تستخدم معادلات دقيقة أيضاً." },
  { question: "كيف أحول من فهرنهايت لمئوي؟", answer: "اختر فئة 'حرارة'. أدخل القيمة بالفهرنهايت، اختر 'فهرنهايت' من، و'مئوي' إلى. المعادلة: (F - 32) × 5/9. مثال: 100°F = 37.78°C." },
  { question: "كم متر في الميل؟", answer: "1 ميل = 1,609.34 متر (≈ 1.6 كيلومتر). هذه وحدة أمريكية/بريطانية، بينما النظام المتري (متر/كيلومتر) يستخدم في السعودية ومعظم دول العالم." },
  { question: "كم رطل في الكيلوغرام؟", answer: "1 كيلوغرام = 2.20462 رطل. 1 رطل = 0.4536 كيلوغرام. الرطل يستخدم في السعودية وبعض الدول العربية للوزن." },
  { question: "كيف أحول درجة الحرارة بين المئوي والفهرنهايت؟", answer: "مئوي إلى فهرنهايت: (C × 9/5) + 32. فهرنهايت إلى مئوي: (F - 32) × 5/9. مئوي إلى كلفن: C + 273.15. كلفن إلى مئوي: K - 273.15." },
  { question: "ما الفرق بين الغالون الأمريكي والبريطاني؟", answer: "الغالون الأمريكي = 3.785 لتر، الغالون البريطاني (Imperial) = 4.546 لتر. أداتنا تستخدم الغالون الأمريكي (الأكثر شيوعاً عالمياً)." },
  { question: "هل يمكن تحويل السرعة والمساحة؟", answer: "حالياً ندعم طول، وزن، حجم، حرارة. فئتا السرعة والمساحة والضغط ستضاف في تحديث قادم. اشترك في القائمة البريدية لتعرف فور إضافتها." },
  { question: "كيف أحول المتر لكيلومتر؟", answer: "1 كيلومتر = 1,000 متر. للتحويل من متر لكيلومتر: اقسم القيمة على 1,000. مثال: 5,000 متر = 5 كيلومتر. أو استخدم الأداة — اختر متر → كيلومتر." },
  { question: "هل الأداة مفيدة للطلاب؟", answer: "نعم، مفيدة جداً لطلاب العلوم والرياضيات والهندسة. تحويلات الوحدات جزء أساسي من المناهج الدراسية. بدلاً من حفظ العوامل، استخدم الأداة بسرعة وتحقق من إجاباتك." },
];

const relatedTools = [
  { title: "حاسبة BMI", icon: "⚖️", href: "/tools/bmi-calculator" },
  { title: "محول العملات", icon: "💱", href: "/tools/currency-converter" },
  { title: "تحويل الألوان", icon: "🎨", href: "/tools/color-converter" },
  { title: "دمج ملفات PDF", icon: "📎", href: "/tools/pdf-merger" },
  { title: "عداد الكلمات", icon: "📝", href: "/tools/word-counter" },
  { title: "تحويل هجري ميلادي", icon: "📅", href: "/tools/hijri-converter" },
];

const seoContent = [
  "أداة تحويل الوحدات الشاملة تدعم التحويل بين أكثر من 20 وحدة في 4 فئات: الطول، الوزن، الحجم، والحرارة. اختر الفئة، أدخل القيمة، اختر الوحدة المصدر والهدف، واحصل على النتيجة فوراً.",
  "التحويل بين النظام المتري (مستخدم في السعودية والخليج ومعظم دول العالم) والنظام الأمريكي/البريطاني أصبح سهلاً. مثلاً: حول الميل لكيلومتر، الرطل لكيلوغرام، أو الفهرنهايت لمئوي بضغطة زر.",
  "مفيدة للطلاب (حل مسائل الرياضيات والعلوم)، المهندسين (تحويل المواصفات الفنية)، الطهاة (تحويل مقادير الطبخ بين الأنظمة)، والمسافرين (فهم وحدات الطقس والمسافات في البلدان المختلفة).",
  "عوامل التحويل دقيقة ومعتمدة دولياً من النظام الدولي للوحدات (SI). كل وحدة لها عامل تحويل محدد بدقة عالية (حتى 6 أرقام عشرية).",
  "مثال: حول 5 كيلومترات لميل → 5 × 0.62137 = 3.10685 ميل. أو حول 100 درجة فهرنهايت لمئوي → (100 - 32) × 5/9 = 37.78°C. أدخل القيمة واختر الوحدات — الباقي على الأداة.",
  "نصيحة: لتحويل دقيق، تأكد من اختيار الوحدة الصحيحة. بعض الوحدات لها نفس الاسم في أنظمة مختلفة (مثلاً الغالون). إذا كنت في شك، ابدأ من الوحدة التي تعرفها أكثر."
];

export default function Client() {
  const [category, setCategory] = useState("طول");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("متر");
  const [toUnit, setToUnit] = useState("كيلومتر");
  const [result, setResult] = useState<any>(null);

  const units = Object.keys(categories[category] || {});

  const convert = () => {
    const v = parseFloat(value);
    if (v <= 0) return;
    const rates = categories[category];
    let base = v * rates[fromUnit];
    if (category === "حرارة" && fromUnit === "فهرنهايت") base = (v - 32) * 5 / 9;
    if (category === "حرارة" && fromUnit === "كلفن") base = v - 273.15;
    let converted = base / rates[toUnit];
    if (category === "حرارة" && toUnit === "فهرنهايت") converted = base * 9 / 5 + 32;
    if (category === "حرارة" && toUnit === "كلفن") converted = base + 273.15;
    setResult({ value: v, from: fromUnit, to: toUnit, converted });
  };

  const schemaName = "تحويل الوحدات";
const schemaDesc = `Online تحويل الوحدات - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/unit-converter";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "محولات", url: "https://adwatak.cloud/category/calculators" },
  { name: "تحويل الوحدات", url: "https://adwatak.cloud/tools/unit-converter" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="محولات" categorySlug="converters" toolName="تحويل الوحدات" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📐 تحويل الوحدات</h1>
        <p className="text-sm text-gray-500 mb-6">حوّل بين وحدات الطول والوزن والحجم والحرارة</p>
        <div className="flex gap-2 mb-4 flex-wrap">
          {Object.keys(categories).map(c => (
            <button key={c} onClick={() => { setCategory(c); setFromUnit(Object.keys(categories[c])[0]); setToUnit(Object.keys(categories[c])[1] || Object.keys(categories[c])[0]); }}
              className={`px-4 py-2 rounded-full border-2 font-semibold cursor-pointer font-inherit text-sm ${category === c ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-200 text-gray-700"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">القيمة</label><input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="100" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">من</label><select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">{units.map(u => <option key={u}>{u}</option>)}</select></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">إلى</label><select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">{units.map(u => <option key={u}>{u}</option>)}</select></div>
        </div>
        <button onClick={convert}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          حوّل
        </button>
      </div>
      {result && (
        <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200 mb-6">
          <p className="text-xs text-green-600">{result.value} {result.from} =</p>
          <p className="text-xl font-extrabold text-green-900">{result.converted.toLocaleString("ar-SA", { maximumFractionDigits: 4 })} {result.to}</p>
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
