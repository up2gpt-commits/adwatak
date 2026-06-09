"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما الفرق بين هامش الربح والمارك أب؟", answer: "هامش الربح = الربح ÷ سعر البيع × 100. المارك أب = الربح ÷ التكلفة × 100. مثال: تكلفة 80، بيع 100. هامش الربح = 20%، المارك أب = 25%. هامش الربح لا يتجاوز 100% أبداً، بينما المارك أب يمكن أن يتجاوز 100%." },
  { question: "ما هو هامش الربح الجيد؟", answer: "يختلف حسب القطاع: التجزئة 2-5%، المطاعم 3-9%، الخدمات 15-25%، البرمجيات 20-40%، الصحة 10-15%، التعليم 5-15%. بشكل عام، كلما زادت المنافسة قل الهامش. المطاعم الصغيرة غالباً ما تعمل بهامش 5-8% وهذا ضيق جداً." },
  { question: "كيف أحسب سعر البيع من التكلفة وهامش الربح؟", answer: "سعر البيع = التكلفة ÷ (1 - هامش الربح/100). مثال: تكلفة 80 ريال، تريد هامش 20% → سعر البيع = 80 ÷ 0.8 = 100 ريال. لو تريد هامش 30% → 80 ÷ 0.7 = 114.3 ريال." },
  { question: "كيف أحسب التكلفة من سعر البيع وهامش الربح؟", answer: "التكلفة = سعر البيع × (1 - هامش الربح/100). مثال: سعر بيع 100 ريال، هامش 20% → التكلفة = 100 × 0.8 = 80 ريال. هذا يفيد لو عندك سعر سوق محدد وتريد تعرف أقصى تكلفة مسموح بها." },
  { question: "لماذا هامش الربح مهم في التجارة؟", answer: "هامش الربح يحدد كم يتبقى بعد تغطية التكاليف لتغطية المصاريف التشغيلية والإيجار والرواتب وتحقيق الأرباح. هامش منخفض يعني تحتاج مبيعات ضخمة لتحقق ربح. هامش مرتفع يعطيك مرونة في التسويق والخصومات." },
  { question: "ما هو هامش الربح الإجمالي؟", answer: "إجمالي الربح = الإيرادات - تكلفة البضاعة المباعة. هامش الربح الإجمالي = (إجمالي الربح ÷ الإيرادات) × 100. هذا يختلف عن صافي الربح الذي يخصم كل المصاريف. هامش الربح الإجمالي يركز على تكلفة المنتج فقط." },
  { question: "هل زيادة هامش الربح دائماً جيد؟", answer: "ليس دائماً. زيادة هامش الربح برفع الأسعار قد يقلل المبيعات إذا كان العملاء حساسين للسعر. التوازن المثالي: هامش ربح يغطي التكاليف ويعطي ربح معقول مع الحفاظ على قدرة تنافسية في السوق." },
  { question: "كيف أحسن هامش الربح في مشروعي؟", answer: "1) تفاوض مع الموردين على تخفيض التكاليف. 2) ارفع الأسعار تدريجياً. 3) قلل الهدر في المخزون. 4) بيع منتجات ذات هامش أعلى إلى جانب المنتجات منخفضة الهامش. 5) وفر عروض باقة بدلاً من خصم فردي. 6) أتمتة العمليات لتقليل التكاليف التشغيلية." },
  { question: "ما هو هامش المساهمة؟", answer: "هامش المساهمة = سعر البيع - التكاليف المتغيرة. يوضح كم يساهم كل منتج في تغطية التكاليف الثابتة. التكاليف المتغيرة تتغير حسب كمية الإنتاج (خامات، عمالة مباشرة). التكاليف الثابتة ثابتة (إيجار، رواتب إدارية)." },
  { question: "الفرق بين هامش الربح ونسبة الربح؟", answer: "هامش الربح (Profit Margin) = ربح ÷ سعر البيع. نسبة الربح (Profit Percentage/Return) = ربح ÷ التكلفة. نفس الرقم يبدو مختلفاً حسب المقام. مثلاً: ربح 20 على تكلفة 80 = هامش 20% ونسبة ربح 25%." },
  { question: "هل هامش الربح 50% يعني مكسب ضخم؟", answer: "50% هامش ربح إجمالي ممتاز في معظم القطاعات. لكن تذكر: من هذا الـ 50% تخصم الإيجار 10%، رواتب 15%، تسويق 5%، كهرباء وماء 2% → صافي ربح = 18% فقط. الهامش الإجمالي ليس صافي الربح." },
  { question: "ما هو Break-Even في علاقة بهامش الربح؟", answer: "نقطة التعادل = التكاليف الثابتة ÷ هامش المساهمة لكل وحدة. تعني كم وحدة تحتاج تبيع لتغطي كل التكاليف وتصفر الربح. بعدها أي مبيعات إضافية = ربح صافي. استخدم حاسبة هامش الربح لتحسب نقطة التعادل بسهولة." },
];

const relatedTools = [
  { title: "حاسبة الضريبة المضافة", icon: "🏛️", href: "/tools/vat-calculator" },
  { title: "مولد الفواتير", icon: "🧾", href: "/tools/invoice-generator" },
  { title: "محول العملات", icon: "💱", href: "/tools/currency-converter" },
  { title: "حاسبة القرض الشخصي", icon: "💰", href: "/tools/loan-calculator" },
  { title: "حاسبة الراتب الصافي", icon: "💵", href: "/tools/salary-calculator" },
  { title: "حاسبة EMI", icon: "🧮", href: "/tools/emi-calculator" },
];

const seoContent = [
  "حاسبة هامش الربح هي أداة لا غنى لأصحاب المشاريع والتجار. تساعدك على حساب هامش الربح والمارك أب إما من التكلفة وسعر البيع، أو حساب سعر البيع من التكلفة وهامش الربح، أو حساب التكلفة من سعر البيع وهامش الربح — أدخل أي قيمتين واحصل على الباقي فوراً.",
  "فهم الفرق بين هامش الربح والمارك أب أمر حيوي لأي صاحب مشروع. هامش الربح يخبرك كم نسبة الربح من كل ريال مبيعات. المارك أب يخبرك كم نسبة الزيادة على التكلفة. الخلط بينهما هو أحد أكثر الأخطاء شيوعاً في تسعير المنتجات.",
  "مثال توضيحي: تشتري منتج بـ 80 ريال وتبيعه بـ 100 ريال. الربح = 20 ريال. هامش الربح = 20 ÷ 100 × 100 = 20%. المارك أب = 20 ÷ 80 × 100 = 25%. لو قلت 'بضيف 25% على التكلفة' — هذا مارك أب. لو قلت 'هاخد 20% من سعر البيع' — هذا هامش.",
  "لماذا يختلف الهامش حسب القطاع؟ قطاع التجزئة الغذائي يعمل بهامش 2-5% لأنه يعتمد على حجم مبيعات ضخم. قطاع المجوهرات يعمل بهامش 20-40% لأن المبيعات قليلة. قطاع الخدمات والبرمجيات بهامش يصل لـ 50%+ لأن التكلفة الحدية منخفضة.",
  "حاسبة هامش الربح تدعم ثلاث طرق حساب: (أ) من التكلفة وسعر البيع → تحسب الهامش والمارك أب. (ب) من التكلفة وهامش الربح → تحسب سعر البيع. (ج) من سعر البيع وهامش الربح → تحسب التكلفة. مثالية لتسعير المنتجات وإدارة التكاليف.",
  "نصيحة للتجار: لا تخلط بين هامش الربح الإجمالي وصافي الربح. الهامش الإجمالي يخصم فقط تكلفة المنتج. صافي الربح يخصم كل شيء: إيجار، رواتب، كهرباء، تسويق، صيانة. استخدم حاسبة هامش الربح للتسعير المبدئي، واحسب صافي الربح بعد إضافة كل التكاليف."
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
    const totalProfit = scenarios.reduce((s, x) => s + x.profit, 0) + result.profit;
    const label = `منتج ${count + 1}`;
    setScenarios([...scenarios, { name: label, ...result }]);
  };

  const removeScenario = (idx: number) => {
    setScenarios(scenarios.filter((_, i) => i !== idx));
  };

  const clearAll = () => {
    setScenarios([]);
  };

  // What-if analysis
  const whatIfData = result ? [-20, -15, -10, -5, 0, 5, 10, 15, 20].map(pct => {
    const newPrice = result.price * (1 + pct / 100);
    const newProfit = newPrice - result.cost;
    return { change: pct, price: newPrice, profit: newProfit, margin: (newProfit / newPrice * 100), markup: (newProfit / result.cost * 100) };
  }) : [];

  const schemaName = "حاسبة هامش الربح";
  const schemaDesc = "Online حاسبة هامش الربح - free tool";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/tools/profit-margin";
  const breadcrumbItems = [
    { name: "الرئيسية", url: "https://adwatak.cloud" },
    { name: "الحاسبات المالية", url: "https://adwatak.cloud/category/calculators" },
    { name: "حاسبة هامش الربح", url: "https://adwatak.cloud/tools/profit-margin" },
  ];

  const inputStyle = "w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all";
  const labelStyle = "block text-sm font-semibold text-gray-700 mb-1.5";
  const cardStyle = "bg-white/80 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6 mb-5";
  const gradientBtn = "bg-gradient-to-l from-indigo-600 to-blue-600 text-white font-bold p-3.5 rounded-xl border-none text-lg w-full cursor-pointer hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg active:scale-[0.98]";
  const resultCardStyle = "bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-xl p-5 text-center border border-white/40 shadow-sm";

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb lang="ar" category="الحاسبات المالية" categorySlug="calculators" toolName="حاسبة هامش الربح" />

      {/* Main Calculator Card */}
      <div className={cardStyle}>
        <h1 className="text-2xl font-extrabold mb-1">📈 حاسبة هامش الربح</h1>
        <p className="text-sm text-gray-500 mb-6">احسب هامش الربح والمارك أب والتكلفة أو سعر البيع — أدخل أي قيمتين</p>

        {[
          { label: "التكلفة (ريال)", value: cost, set: setCost, placeholder: "80", step: "any" },
          { label: "سعر البيع (ريال) — اختياري", value: price, set: setPrice, placeholder: "100", step: "any" },
          { label: "هامش الربح (%) — اختياري", value: margin, set: setMargin, placeholder: "20", step: "any" },
        ].map((f, i) => (
          <div key={i} className="mb-4">
            <label className={labelStyle}>{f.label}</label>
            <div className="relative">
              <input type="number" value={f.value} onChange={(e) => f.set(e.target.value)}
                step={f.step}
                className={inputStyle} placeholder={f.placeholder} />
            </div>
          </div>
        ))}

        <p className="text-xs text-gray-400 mb-3">أدخل قيمتين وسيُحسب الباقي تلقائياً</p>
        <button onClick={calculate} className={gradientBtn}>
          <span className="inline-flex items-center gap-2">🧮 احسب</span>
        </button>
      </div>

      {/* Results Section */}
      {result && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className={resultCardStyle}>
              <p className="text-xs text-indigo-500 mb-1 font-medium">هامش الربح</p>
              <p className="text-2xl font-extrabold text-indigo-600">{result.margin.toFixed(2)}%</p>
            </div>
            <div className={resultCardStyle}>
              <p className="text-xs text-emerald-500 mb-1 font-medium">المارك أب</p>
              <p className="text-2xl font-extrabold text-emerald-600">{result.markup.toFixed(2)}%</p>
            </div>
            <div className={resultCardStyle}>
              <p className="text-xs text-amber-500 mb-1 font-medium">صافي الربح</p>
              <p className="text-2xl font-extrabold text-amber-600">{result.profit.toFixed(2)} ريال</p>
            </div>
          </div>

          {/* Visual Stacked Bar Chart */}
          <div className={cardStyle}>
            <h3 className="text-sm font-bold text-gray-700 mb-3">📊 توزيع التكلفة مقابل الربح</h3>
            {(() => {
              const total = result.cost + result.profit;
              const costPct = (result.cost / total * 100);
              const profitPct = (result.profit / total * 100);
              return (
                <>
                  <div className="h-10 rounded-xl overflow-hidden flex mb-2 shadow-inner">
                    <div className="bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center text-xs font-bold text-gray-700 transition-all duration-300"
                      style={{ width: `${costPct}%` }}>
                      {costPct >= 12 ? `التكلفة ${costPct.toFixed(1)}%` : ""}
                    </div>
                    <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center text-xs font-bold text-white transition-all duration-300"
                      style={{ width: `${profitPct}%` }}>
                      {profitPct >= 12 ? `الربح ${profitPct.toFixed(1)}%` : ""}
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>🔵 التكلفة: {result.cost.toFixed(2)} ريال</span>
                    <span>🟢 الربح: {result.profit.toFixed(2)} ريال</span>
                    <span>💰 الإجمالي: {total.toFixed(2)} ريال</span>
                  </div>
                </>
              );
            })()}
          </div>

          {/* What-If Analysis */}
          <div className={cardStyle}>
            <button onClick={() => setShowWhatIf(!showWhatIf)}
              className="flex items-center justify-between w-full text-right">
              <h3 className="text-sm font-bold text-gray-700">🔮 تحليل السيناريوهات — ماذا لو تغير السعر؟</h3>
              <span className={`text-gray-400 text-lg transition-transform ${showWhatIf ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {showWhatIf && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-2.5 text-right text-gray-600 font-semibold">تغير السعر</th>
                      <th className="p-2.5 text-right text-gray-600 font-semibold">السعر</th>
                      <th className="p-2.5 text-right text-gray-600 font-semibold">الربح</th>
                      <th className="p-2.5 text-right text-gray-600 font-semibold">الهامش</th>
                      <th className="p-2.5 text-right text-gray-600 font-semibold">المارك أب</th>
                    </tr>
                  </thead>
                  <tbody>
                    {whatIfData.map((row, i) => (
                      <tr key={i} className={`border-b border-gray-100 hover:bg-indigo-50/50 transition-colors ${row.change === 0 ? 'bg-indigo-50 font-bold' : ''}`}>
                        <td className={`p-2.5 ${row.change > 0 ? 'text-emerald-600' : row.change < 0 ? 'text-red-500' : 'text-indigo-600'}`}>
                          {row.change > 0 ? `+${row.change}%` : `${row.change}%`}
                        </td>
                        <td className="p-2.5">{row.price.toFixed(2)}</td>
                        <td className="p-2.5">{row.profit.toFixed(2)}</td>
                        <td className="p-2.5">{row.margin.toFixed(2)}%</td>
                        <td className="p-2.5">{row.markup.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-gray-400 mt-3">الخط الغامق = السعر الحالي. جرّب سيناريوهات مختلفة لترى تأثير تغيير السعر على هامش الربح.</p>
              </div>
            )}
          </div>

          {/* Scenario Comparison */}
          <div className={cardStyle}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-700">📋 مقارنة سيناريوهات</h3>
              <div className="flex gap-2">
                {scenarios.length > 0 && (
                  <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded-lg hover:bg-red-50 transition-colors">مسح الكل</button>
                )}
                <button onClick={saveScenario} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors">+ حفظ السيناريو الحالي</button>
              </div>
            </div>
            {scenarios.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">اضغط "حفظ السيناريو الحالي" لمقارنة منتجات أو تسعيرات مختلفة</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-2.5 text-right text-gray-600 font-semibold">المنتج</th>
                      <th className="p-2.5 text-right text-gray-600 font-semibold">التكلفة</th>
                      <th className="p-2.5 text-right text-gray-600 font-semibold">السعر</th>
                      <th className="p-2.5 text-right text-gray-600 font-semibold">الهامش</th>
                      <th className="p-2.5 text-right text-gray-600 font-semibold">الربح</th>
                      <th className="p-2.5"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarios.map((s, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="p-2.5 font-medium">{s.name}</td>
                        <td className="p-2.5">{s.cost.toFixed(2)}</td>
                        <td className="p-2.5">{s.price.toFixed(2)}</td>
                        <td className="p-2.5">
                          <span className={`${s.margin >= 20 ? 'text-emerald-600' : s.margin >= 10 ? 'text-amber-600' : 'text-red-500'} font-semibold`}>
                            {s.margin.toFixed(1)}%
                          </span>
                        </td>
                        <td className="p-2.5">{s.profit.toFixed(2)}</td>
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

      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
