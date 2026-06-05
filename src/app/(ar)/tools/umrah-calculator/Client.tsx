"use client";
import { useState } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema, howToSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

type Currency = "SAR" | "USD" | "EUR" | "AED" | "EGP" | "TRY" | "IDR" | "PKR";

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  SAR: "ر.س", USD: "$", EUR: "€", AED: "د.إ", EGP: "ج.م", TRY: "₺", IDR: "Rp", PKR: "Rs",
};

const CURRENCY_LABELS: Record<Currency, string> = {
  SAR: "ريال سعودي", USD: "دولار أمريكي", EUR: "يورو", AED: "درهم إماراتي", EGP: "جنيه مصري", TRY: "ليرة تركية", IDR: "روبية إندونيسية", PKR: "روبية باكستانية",
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
  { step: 1, title: "الإحرام", description: "الدخول في النية ولبس ملابس الإحرام من الميقات — صلّي ركعتين وقل: لبيك اللهم عمرة" },
  { step: 2, title: "الطواف", description: "طواف العمرة حول الكعبة سبعة أشواط — ابدأ من الحجر الأسود وانتهِ عنده" },
  { step: 3, title: "صلاة ركعتين خلف مقام إبراهيم", description: "بعد الطواف، صلِّ ركعتين خلف مقام إبراهيم إن تيسر، وإلا في أي مكان من الحرم" },
  { step: 4, title: "السعي بين الصفا والمروة", description: "اسعَ بين جبلي الصفا والمروة سبعة أشواط — ابدأ بالصفا وانتهِ بالمروة" },
  { step: 5, title: "الحلق أو التقصير", description: "احلق شعر رأسك أو قصّره — وبهذا تتحلل من الإحرام وتنتهي العمرة" },
];

export default function Client() {
  const [currency, setCurrency] = useState<Currency>("SAR");
  const [costs, setCosts] = useState<UmrahCosts>({
    visa: [{ label: "تأشيرة عمرة", amount: 0 }],
    flight: [{ label: "تذكرة طيران", amount: 0 }],
    accommodation: [{ label: "فندق في مكة", amount: 0 }, { label: "فندق في المدينة", amount: 0 }],
    transport: [{ label: "نقل داخلي", amount: 0 }],
    expenses: [{ label: "مصاريف يومية", amount: 0 }],
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
      [category]: [...prev[category], { label: "بند جديد", amount: 0 }],
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
    visa: "🛂 التأشيرة",
    flight: "✈️ تذاكر الطيران",
    accommodation: "🏨 السكن",
    transport: "🚗 النقل",
    expenses: "💰 المصاريف",
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("حاسبة العمرة", "احسب تكاليف العمرة بالكامل — تأشيرة، تذكرة طيران، سكن، نقل، مصاريف يومية مع جدول المناسك خطوة بخطوة", "https://adwatak.cloud/tools/umrah-calculator", "ar", "Islamic")} />
      <StructuredData data={faqSchema([
        { question: "كم تكلفة العمرة في 2026؟", answer: "تختلف التكلفة حسب بلدك ومدة الإقامة ومستوى الفندق. بشكل تقريبي: من السعودية 500-1500 ريال، من مصر 8000-25000 جنيه، من تركيا 3000-8000 ليرة، من إندونيسيا 8-20 مليون روبية." },
        { question: "هل أشمل تكلفة التأشيرة؟", answer: "نعم، حاسبة العمرة تشمل التأشيرة وتذكرة الطيران والسكن والنقل والمصاريف اليومية — كل بند قابل للتعديل." },
        { question: "ما هي مناسك العمرة؟", answer: "الإحرام ← الطواف حول الكعبة ← صلاة ركعتين خلف مقام إبراهيم ← السعي بين الصفا والمروة ← الحلق أو التقصير." },
        { question: "كم يوماً تحتاج للعمرة؟", answer: "الحد الأدنى يوم واحد (أداء المناسك فقط)، لكن يُنصح بـ 7-14 يوماً لزيارة المدينة المنورة أيضاً." },
        { question: "هل يمكنني حساب التكلفة لعدة أشخاص؟", answer: "نعم! أدخل عدد المسافرين وستُحسب التكلفة الإجمالية وتكلفة الشخص الواحد تلقائياً." },
        { question: "ما الفرق بين العمرة والحج؟", answer: "العمرة يمكن أداؤها في أي وقت من السنة وليست فريضة، أما الحج ففي أشهر محددة وهو ركن من أركان الإسلام." },
        { question: "هل الحاسبة مجانية؟", answer: "نعم، حاسبة العمرة مجانية بالكامل وتعمل في المتصفح مباشرة — لا يتم إرسال أي بيانات." },
        { question: "ما أفضل وقت للعمرة؟", answer: "رمضان هو أفضل وقت (العمرة في رمضان تعدل حجة)، وكذلك أشهر الحج وشوال. تجنب موسم الحج إذا كنت تريد أسعاراً أقل." },
        { question: "هل أحتاج محرم للعمرة؟", answer: "نعم، المرأة تحتاج محرماً (زوج أو محرم شرعي) حسب جمهور العلماء. بعض الدول تسمح للنساء فوق 45 بالسفر بدون محرم." },
        { question: "ما هي المستندات المطلوبة؟", answer: "جواز سفر ساري 6+ أشهر، تأشيرة عمرة، تذكرة طيران ذهاب وعودة، لقاحات مطلوبة (حسب الاشتراطات الصحية)." },
        { question: "هل يمكنني زيارة المدينة مع العمرة؟", answer: "نعم، يُستحب زيارة المدينة المنورة والمسجد النبوي قبل أو بعد أداء العمرة." },
        { question: "كيف أعرف الميقات المناسب لبلدي؟", answer: "المواقيت خمسة: ذو الحليفة (للمدينة)، الجحفة (لمصر والشام)، يلملم (لليمن)، قرن المنازل (لنجد)، ذات عرق (لالعراق). اسأل وكيل السفر عن الميقات الأقرب." },
      ])} />
      <StructuredData data={breadcrumbSchema([
        { name: "الرئيسية", url: "https://adwatak.cloud/" },
        { name: "الأدوات الإسلامية", url: "https://adwatak.cloud/category/islamic" },
        { name: "حاسبة العمرة", url: "https://adwatak.cloud/tools/umrah-calculator" },
      ])} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <StructuredData data={howToSchema("كيفية استخدام حاسبة العمرة", "أداة مجانية تعمل في المتصفح. بدون تسجيل.", [{name: "اختر العملة", text: "اختر العملة المناسبة لبلدك"}, {name: "أدخل التكاليف", text: "أدخل تكلفة كل بند — تأشيرة، طيران، سكن، نقل، مصاريف"}, {name: "حدد عدد المسافرين", text: "أدخل عدد الأشخاص المسافرين"}, {name: "احسب", text: "اضغط على زر الحساب لمعرفة التكلفة الإجمالية وللشخص الواحد"}], "دقيقتان", "ar")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb lang="ar" category="الأدوات الإسلامية" categorySlug="islamic" toolName="حاسبة العمرة" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🕋 حاسبة العمرة</h1>
        <p className="text-sm text-gray-500 mb-6">احسب تكاليف العمرة بالكامل — تأشيرة، طيران، سكن، نقل، مصاريف يومية</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">العملة:</label>
            <select value={currency} onChange={e => setCurrency(e.target.value as Currency)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
              {Object.entries(CURRENCY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label} ({CURRENCY_SYMBOLS[key as Currency]})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">عدد المسافرين:</label>
            <input type="number" min={1} max={20} value={travelers} onChange={e => setTravelers(Math.max(1, parseInt(e.target.value) || 1))} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">عدد الليالي:</label>
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
              <button onClick={() => addCostItem(cat)} className="text-xs text-green-600 hover:text-green-800 font-semibold">+ إضافة بند</button>
              <span className="text-sm font-bold text-gray-600">المجموع: {formatAmount(categoryTotals[cat])}</span>
            </div>
          </div>
        ))}

        <button onClick={handleCalculate} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-lg">
          🕋 احسب تكلفة العمرة
        </button>

        {calculated && grandTotal > 0 && (
          <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <h3 className="text-lg font-extrabold text-green-800 mb-4 text-center">📊 ملخص تكاليف العمرة</h3>
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
                <span className="text-sm font-semibold text-gray-700">الإجمالي لـ {travelers} مسافر:</span>
                <span className="text-xl font-extrabold text-green-800">{formatAmount(grandTotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">تكلفة الشخص الواحد:</span>
                <span className="text-lg font-extrabold text-emerald-700">{formatAmount(perPerson)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">لـ {nights} ليلة:</span>
                <span className="text-sm font-bold text-gray-600">{formatAmount(perPerson / nights)} / ليلة</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* جدول المناسك */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h2 className="text-xl font-extrabold mb-6">📿 مناسك العمرة خطوة بخطوة</h2>
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
        "حاسبة العمرة — احسب تكاليف العمرة بالكامل: التأشيرة، تذكرة الطيران، السكن في مكة والمدينة، النقل الداخلي، والمصاريف اليومية.",
        "تدعم 8 عملات: ريال سعودي، دولار، يورو، درهم، جنيه مصري، ليرة تركية، روبية إندونيسية، روبية باكستانية.",
        "حساب التكلفة لعدة مسافرين مع تكلفة الشخص الواحد وتكلفة الليلة.",
        "جدول مناسك العمرة خطوة بخطوة: الإحرام، الطواف، الصلاة، السعي، الحلق.",
        "100% مجاني ويعمل في المتصفح مباشرة — بدون إرسال بيانات.",
      ]} lang="ar" />
      <FAQSection faqs={[
        { question: "كم تكلفة العمرة في 2026؟", answer: "تختلف التكلفة حسب بلدك ومدة الإقامة ومستوى الفندق. بشكل تقريبي: من السعودية 500-1500 ريال، من مصر 8000-25000 جنيه، من تركيا 3000-8000 ليرة، من إندونيسيا 8-20 مليون روبية." },
        { question: "ما هي مناسك العمرة؟", answer: "الإحرام ← الطواف حول الكعبة ← صلاة ركعتين خلف مقام إبراهيم ← السعي بين الصفا والمروة ← الحلق أو التقصير." },
        { question: "كم يوماً تحتاج للعمرة؟", answer: "الحد الأدنى يوم واحد (أداء المناسك فقط)، لكن يُنصح بـ 7-14 يوماً لزيارة المدينة المنورة أيضاً." },
        { question: "هل يمكنني حساب التكلفة لعدة أشخاص؟", answer: "نعم! أدخل عدد المسافرين وستُحسب التكلفة الإجمالية وتكلفة الشخص الواحد تلقائياً." },
        { question: "ما الفرق بين العمرة والحج؟", answer: "العمرة يمكن أداؤها في أي وقت من السنة وليست فريضة، أما الحج ففي أشهر محددة وهو ركن من أركان الإسلام." },
        { question: "هل الحاسبة مجانية؟", answer: "نعم، حاسبة العمرة مجانية بالكامل وتعمل في المتصفح مباشرة." },
        { question: "ما أفضل وقت للعمرة؟", answer: "رمضان هو أفضل وقت (العمرة في رمضان تعدل حجة)، وكذلك أشهر الحج وشوال." },
        { question: "هل أحتاج محرم للعمرة؟", answer: "نعم، المرأة تحتاج محرماً (زوج أو محرم شرعي) حسب جمهور العلماء." },
        { question: "ما هي المستندات المطلوبة؟", answer: "جواز سفر ساري 6+ أشهر، تأشيرة عمرة، تذكرة طيران ذهاب وعودة، لقاحات مطلوبة." },
        { question: "هل يمكنني زيارة المدينة مع العمرة؟", answer: "نعم، يُستحب زيارة المدينة المنورة والمسجد النبوي قبل أو بعد أداء العمرة." },
      ]} lang="ar" />
      <RelatedTools tools={[
        { title: "حاسبة الزكاة", icon: "🕌", href: "/tools/zakat-calculator" },
        { title: "اتجاه القبلة", icon: "🧭", href: "/tools/qibla-direction" },
        { title: "مواقيت الصلاة", icon: "🕐", href: "/tools/prayer-times" },
        { title: "المسبحة الإلكترونية", icon: "📿", href: "/tools/tasbeeh-counter" },
      ]} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
