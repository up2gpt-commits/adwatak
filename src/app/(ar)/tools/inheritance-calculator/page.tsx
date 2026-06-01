"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import { getDefaultHeirs, calculateInheritance, HeirSelection } from "../../../lib/inheritance";

const faqs = [
  { question: "ما هو علم الميراث في الإسلام؟", answer: "علم الميراث (الفرائض) هو علم يُعرف به من يرث ومن لا يرث ومقدار نصيب كل وارث. ثُبتت أحكامه في القرآن الكريم في سورة النساء في آيات مفصلة تحدد أنصبة كل وارث بدقة. قال الله تعالى: 'تلك حدود الله ومن يطع الله ورسوله يدخله جنات تجري تحتها الأنهار'." },
  { question: "من هم أصحاب الفروض في الميراث؟", answer: "أصحاب الفروض هم الذين لهم أنصبة محددة بالقرآن: الزوج/الزوجة (1/4 أو 1/2)، الأب (1/6)، الأم (1/6)، الجد (1/6)، الجدة (1/6)، البنت (1/2 أو 2/3 للبنتين فأكثر)، بنت الابن (1/6)، الأخت الشقيقة (1/2 أو 2/3)، الأخت لأب (1/6)، الأخ لأم (1/6)." },
  { question: "من هم العصبات وماذا يرثون؟", answer: "العصبات هم الذكور الذين يرثون الباقي بعد أصحاب الفروض: الابن، الأب، الجد، الأخ الشقيق، الأخ لأب، ابن الأخ الشقيق، ابن الأخ لأب، العم الشقيق، ابن العم. يرتبون بالأولوية: الأقرب فالأقرب." },
  { question: "هل يجوز تقسيم الميراث بغير الأنصبة الشرعية؟", answer: "لا، التوزيع بالأنصبة الشرعية واجب على الورثة. لكن يمكن التنازل عن النصيب بالتراضي بعد التوزيع الشرعي. كما يمكن الإيصاء بما لا يزيد عن الثلث لغير الوارث." },
  { question: "من هم الحاجبون في الميراث؟", answer: "الحاجبون هم الورثة الذين يمنعون غيرهم من الإرث كلياً أو جزئياً. الابن يحجب الإخوة والأخوات. البنت لا تحجب أحداً. الأب يحجب الإخوة. الجد يحجب الإخوة لأم. الجدة تحجبها الأم." },
  { question: "ما هو 'العول' في الميراث؟", answer: "العول هو زيادة سهام أصحاب الفروض عن أصل التركة. يحدث عندما لا تكفي التركة لتوزيع جميع الفروض. الحل هو تخفيض أنصبة جميع الورثة بنسبة واحدة حتى تتناسب مع التركة." },
  { question: "ما هو 'الرد' في الميراث؟", answer: "الرد هو إرجاع الباقي من التركة بعد أصحاب الفروض إليهم بنسبة فروضهم إذا لم يوجد عاصب. مثلاً: هلكت عن أم وبنت: لكل منهما فرض (1/6 و 1/2) = 2/3. الباقي 1/3 يرد عليهما بنسبة فريضتهما." },
  { question: "هل يرث الأحفاد إذا توفي والدهم قبل جدهم؟", answer: "في الفقه التقليدي لا يرث الأحفاد لأن الابن (والدهم) يحجبهم. لكن في السعودية، صدر نظام الوصية الواجبة الذي يعطي الأحفاد نصيب والدهم الذي كان سيأخذه لو كان حياً، بحد أقصى ثلث التركة." },
  { question: "هل الزوج والزوجة يرثان من بعضهما؟", answer: "نعم، الزوج يرث من زوجته نصف مالها إن لم يكن لها ولد، وربع مالها إن كان لها ولد. الزوجة ترث من زوجها ربع ماله إن لم يكن له ولد، وثمن ماله إن كان له ولد." },
  { question: "هل الدين مقدم على الميراث؟", answer: "نعم، الدين مقدم على الميراث باتفاق الفقهاء. قال الله تعالى: 'من بعد وصية يوصي بها أو دين'. يعني يجب سداد ديون المتوفى أولاً قبل توزيع الميراث. الوصية تكون بثلث الباقي بعد الدين." },
  { question: "هل الورثة من غير المسلمين يرثون المسلم؟", answer: "لا، لا يرث الكافر المسلم ولا المسلم الكافر. هذا باتفاق الفقهاء استناداً لحديث النبي ﷺ: 'لا يرث المسلم الكافر ولا الكافر المسلم'. التركة توزع على الورثة المسلمين فقط." },
  { question: "كيف أتأكد من صحة حساب الميراث؟", answer: "استخدم حاسبتنا للحالات المبدئية. للحالات المعقدة ينصح بمراجعة محكمة الأحوال الشخصية أو أحد المختصين في علم الفرائض. الأخطاء في توزيع الميراث مشكلة شرعية وقانونية — لا تتهاون في التأكد." },
];

const relatedTools = [
  { title: "حاسبة الزكاة", icon: "🕌", href: "/tools/zakat-calculator" },
  { title: "حاسبة الذهب", icon: "🥇", href: "/tools/gold-calculator" },
  { title: "تحويل هجري", icon: "📅", href: "/tools/hijri-converter" },
  { title: "اتجاه القبلة", icon: "🧭", href: "/tools/qibla-direction" },
  { title: "مواقيت الصلاة", icon: "🕐", href: "/tools/prayer-times" },
];

const seoContent = [
  "حاسبة الميراث الإسلامي أداة تفاعلية مجانية تحسب أنصبة الورثة حسب الشريعة الإسلامية. اختر الورثة الأحياء من القائمة، أدخل قيمة التركة، واضغط احسب — النتيجة تظهر فوراً بتوزيع الأنصبة الشرعية بالريال والنسبة المئوية.",
  "قسمة الميراث في الإسلام فريضة وليست خياراً. يجب تقسيم التركة بعد تجهيز الميت (تكفين، دفن)، ثم سداد جميع ديون المتوفى (دين لله أو للعباد)، ثم تنفيذ الوصية (بحد أقصى ثلث الباقي للغير وارث)، ثم توزيع الباقي حسب الأنصبة الشرعية على الورثة.",
  "أصحاب الفروض هم 12 وارثاً: الزوج، الزوجة، الأب، الأم، الجد، الجدة، البنت، بنت الابن، الأخت الشقيقة، الأخت لأب، الأخ لأم، الأخت لأم. لكل منهم نصيب محدد يختلف بحسب وجود أو غياب ورثة آخرين.",
  "في السعودية، نظام الميراث خاضع لأحكام الشريعة الإسلامية المطبقة في المحاكم الشرعية. يمكن للمستفيدين مراجعة محكمة الأحوال الشخصية لإصدار صك حصر ورثة وتوزيع التركة رسمياً. يُنصح بالتوثيق الرسمي لتجنب النزاعات بين الورثة.",
  "نصيحة مهمة: احرص على كتابة وصية شرعية قبل الوفاة لتسهيل الأمور على ورثتك. الوصية لا تتجاوز ثلث المال ولغير الوارث. يمكنك تحديد أوصياء على أطفالك القصّر وتوزيع أصولك بطريقة ترضي الله ثم ترضي أهلك.",
];

const fmt = (n: number) => n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });

export default function InheritanceCalculator() {
  const [h, setH] = useState<HeirSelection>(getDefaultHeirs());
  const [amount, setAmount] = useState("500000");
  const [results, setResults] = useState<ReturnType<typeof calculateInheritance> | null>(null);

  const toggle = (key: keyof HeirSelection) => {
    setH(prev => ({ ...prev, [key]: typeof prev[key] === "boolean" ? !prev[key] : prev[key] }));
  };

  const setNum = (key: "sons" | "daughters" | "fullBrothers" | "fullSisters" | "paternalBrothers" | "paternalSisters" | "maternalBrothers" | "maternalSisters" | "wifeCount", val: number) => {
    setH(prev => ({ ...prev, [key]: Math.max(0, Math.min(20, val || 0)) }));
  };

  const calc = () => {
    const estate = parseFloat(amount) || 0;
    setResults(calculateInheritance(h, estate));
  };

  const hasResults = results && results.length > 0;
  const totalPct = results ? results.reduce((s, r) => s + r.percentage, 0) : 0;
  const totalAmt = results ? results.reduce((s, r) => s + r.amount, 0) : 0;

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("حاسبة الميراث الإسلامي", "Online حاسبة الميراث الإسلامي - free tool", "https://adwatak.cloud/tools/inheritance-calculator", "ar", "Utility")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{ name: "الرئيسية", url: "https://adwatak.cloud" }, { name: "أدوات إسلامية", url: "https://adwatak.cloud/tools/islamic" }, { name: "حاسبة الميراث الإسلامي", url: "https://adwatak.cloud/tools/inheritance-calculator" }])} />
      <Breadcrumb lang="ar" category="أدوات إسلامية" categorySlug="islamic" toolName="حاسبة الميراث الإسلامي" />

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📜 حاسبة الميراث الإسلامي</h1>
        <p className="text-sm text-gray-500 mb-6">اختر الورثة وأدخل قيمة التركة — تحسب الأنصبة حسب الشريعة الإسلامية من سورة النساء</p>

        {/* Islamic notice */}
        <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-200 mb-6">
          <p className="text-sm text-emerald-800 leading-relaxed">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ. هذه الحاسبة تعتمد على أحكام سورة النساء. الأنصبة الشرعية لأصحاب الفروض والعصبات تُحسب آلياً حسب الورثة المختارين.
          </p>
        </div>

        {/* Estate Amount */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-1.5">💰 قيمة التركة (بعد الدين والوصية)</label>
          <div className="flex gap-3">
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none focus:border-emerald-500 transition-colors" placeholder="500000" />
            <span className="flex items-center text-sm text-gray-500 font-semibold shrink-0">ريال</span>
          </div>
        </div>

        {/* Heir Selection */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-700 mb-3">👥 اختر الورثة الأحياء:</h2>

          {/* Row: Spouses */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <label className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${h.husband ? "border-blue-400 bg-blue-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"}`}>
              <input type="checkbox" checked={h.husband} onChange={() => toggle("husband")} className="w-5 h-5 accent-blue-600" />
              <span><span className="text-lg">👨</span> الزوج</span>
            </label>
            <label className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${h.wife ? "border-pink-400 bg-pink-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"}`}>
              <input type="checkbox" checked={h.wife} onChange={() => toggle("wife")} className="w-5 h-5 accent-pink-600" />
              <span><span className="text-lg">👩</span> الزوجة</span>
            </label>
          </div>
          {h.wife && (
            <div className="mb-4 mr-4">
              <label className="text-xs text-gray-500">عدد الزوجات:</label>
              <input type="number" min="1" max="4" value={h.wifeCount} onChange={(e) => setNum("wifeCount", parseInt(e.target.value) || 1)}
                className="w-20 p-2 mr-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" />
            </div>
          )}

          {/* Row: Parents */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <label className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${h.father ? "border-emerald-400 bg-emerald-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"}`}>
              <input type="checkbox" checked={h.father} onChange={() => toggle("father")} className="w-5 h-5 accent-emerald-600" />
              <span><span className="text-lg">👨‍🦳</span> الأب</span>
            </label>
            <label className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${h.mother ? "border-amber-400 bg-amber-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"}`}>
              <input type="checkbox" checked={h.mother} onChange={() => toggle("mother")} className="w-5 h-5 accent-amber-600" />
              <span><span className="text-lg">👩‍🦳</span> الأم</span>
            </label>
          </div>

          {/* Children */}
          <div className="p-4 bg-gray-50 rounded-xl mb-4">
            <p className="text-xs font-bold text-gray-600 mb-2">👶 الأولاد</p>
            <div className="flex gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">عدد الأبناء</label>
                <input type="number" min="0" max="20" value={h.sons} onChange={(e) => setNum("sons", parseInt(e.target.value) || 0)}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">عدد البنات</label>
                <input type="number" min="0" max="20" value={h.daughters} onChange={(e) => setNum("daughters", parseInt(e.target.value) || 0)}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" />
              </div>
            </div>
          </div>

          {/* Grandparents */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-sm ${h.grandfather ? "border-emerald-300 bg-emerald-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"}`}>
              <input type="checkbox" checked={h.grandfather} onChange={() => toggle("grandfather")} className="w-4 h-4 accent-emerald-600" />
              <span>الجد</span>
            </label>
            <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-sm ${h.grandmotherPaternal ? "border-amber-300 bg-amber-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"}`}>
              <input type="checkbox" checked={h.grandmotherPaternal} onChange={() => toggle("grandmotherPaternal")} className="w-4 h-4 accent-amber-600" />
              <span>الجدة (لأب)</span>
            </label>
            <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-sm ${h.grandmotherMaternal ? "border-amber-300 bg-amber-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"}`}>
              <input type="checkbox" checked={h.grandmotherMaternal} onChange={() => toggle("grandmotherMaternal")} className="w-4 h-4 accent-amber-600" />
              <span>الجدة (لأم)</span>
            </label>
          </div>

          {/* Full Siblings */}
          <div className="p-4 bg-gray-50 rounded-xl mb-4">
            <p className="text-xs font-bold text-gray-600 mb-2">🧑‍🤝‍🧑 الإخوة الأشقاء</p>
            <div className="flex gap-4">
              <div><label className="text-xs text-gray-400 block mb-1">عدد الإخوة</label>
                <input type="number" min="0" max="20" value={h.fullBrothers} onChange={(e) => setNum("fullBrothers", parseInt(e.target.value) || 0)}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" /></div>
              <div><label className="text-xs text-gray-400 block mb-1">عدد الأخوات</label>
                <input type="number" min="0" max="20" value={h.fullSisters} onChange={(e) => setNum("fullSisters", parseInt(e.target.value) || 0)}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" /></div>
            </div>
          </div>

          {/* Paternal Siblings */}
          <div className="p-4 bg-gray-50 rounded-xl mb-4">
            <p className="text-xs font-bold text-gray-600 mb-2">👥 الإخوة لأب (من الأب)</p>
            <div className="flex gap-4">
              <div><label className="text-xs text-gray-400 block mb-1">عدد الإخوة</label>
                <input type="number" min="0" max="20" value={h.paternalBrothers} onChange={(e) => setNum("paternalBrothers", parseInt(e.target.value) || 0)}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" /></div>
              <div><label className="text-xs text-gray-400 block mb-1">عدد الأخوات</label>
                <input type="number" min="0" max="20" value={h.paternalSisters} onChange={(e) => setNum("paternalSisters", parseInt(e.target.value) || 0)}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" /></div>
            </div>
          </div>

          {/* Maternal Siblings */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs font-bold text-gray-600 mb-2">👥 الإخوة لأم (من الأم)</p>
            <div className="flex gap-4">
              <div><label className="text-xs text-gray-400 block mb-1">عدد الإخوة</label>
                <input type="number" min="0" max="20" value={h.maternalBrothers} onChange={(e) => setNum("maternalBrothers", parseInt(e.target.value) || 0)}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" /></div>
              <div><label className="text-xs text-gray-400 block mb-1">عدد الأخوات</label>
                <input type="number" min="0" max="20" value={h.maternalSisters} onChange={(e) => setNum("maternalSisters", parseInt(e.target.value) || 0)}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg text-center text-sm outline-none" /></div>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button onClick={calc}
          className="w-full bg-gradient-to-l from-emerald-600 to-emerald-700 text-white font-bold p-4 rounded-xl text-lg hover:shadow-lg hover:from-emerald-700 hover:to-emerald-800 transition-all cursor-pointer border-none">
          📊 احسب الأنصبة الشرعية
        </button>
      </div>

      {/* Results */}
      {hasResults && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6 animate-fadeIn">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-extrabold text-gray-900">📊 توزيع الميراث الشرعي</h2>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${totalPct > 99.5 && totalPct < 100.5 ? "bg-emerald-100 text-emerald-700" : totalPct > 100 ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
              {totalPct > 99.5 && totalPct < 100.5 ? "مستقر" : totalPct > 100 ? "عول" : "رد"}
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-5">الأنصبة حسب الشريعة — بعد سداد الدين والوصية</p>

          <div className="flex flex-col gap-3">
            {results.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: `${r.color}08`, borderRight: `4px solid ${r.color}` }}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{r.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.percentage.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold" style={{ color: r.color }}>{fmt(r.amount)} ريال</p>
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden mt-1">
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(1, r.percentage)}%`, background: r.color }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-5 pt-4 border-t border-gray-200 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">المجموع الموزع</p>
              <p className="text-lg font-extrabold text-gray-900">{fmt(totalAmt)} ريال</p>
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-400">نسبة التوزيع</p>
              <p className="text-lg font-extrabold" style={{ color: totalPct > 100.5 ? "#dc2626" : totalPct > 99.5 ? "#059669" : "#2563eb" }}>
                {totalPct.toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Islamic Note */}
          {totalPct > 100.5 && (
            <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-xs text-amber-800">⚠️ <strong>العول:</strong> مجموع الأنصبة الشرعية تجاوز قيمة التركة بنسبة {((totalPct - 100)).toFixed(1)}%. تم تخفيض أنصبة جميع الورثة بنسبة واحدة لحل العول. هذه حالة فقهية معروفة.</p>
            </div>
          )}
          {totalPct < 99.5 && totalPct > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-xs text-blue-800">ℹ️ <strong>الرد:</strong> بعد توزيع الفروض الشرعية، بقي {(100 - totalPct).toFixed(1)}% من التركة. تم ردها على الورثة (عدا الزوج/الزوجة إن وُجد غيرهم) بنسبة أنصبتهم.</p>
            </div>
          )}
        </div>
      )}

      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
