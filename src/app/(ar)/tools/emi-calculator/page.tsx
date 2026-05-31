"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";

function fmt(n: number) {
  return n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });
}

const faqs = [
  { question: "ما معنى EMI؟", answer: "EMI = Equated Monthly Installment = القسط الشهري الثابت. هو مبلغ ثابت تدفعه كل شهر للبنك أو شركة التمويل، يشمل جزءاً من أصل الدين وجزءاً من الفائدة. ميزته أن القسط لا يتغير طوال مدة القرض — تسهل التخطيط المالي." },
  { question: "هل EMI يتغير خلال مدة القرض؟", answer: "لا، مبلغ EMI ثابت ولا يتغير. لكن توزيع القسط بين أصل الدين والفائدة يتغير كل شهر: في البداية يذهب الجزء الأكبر للفائدة، ومع مرور الوقت يزداد جزء أصل الدين ويقل جزء الفائدة. هذا يسمى 'الرصيد المتناقص'." },
  { question: "ما الفرق بين EMI وحساب الفائدة البسيطة؟", answer: "في EMI تُحسب الفائدة مركبة على الرصيد المتناقص (Diminishing Balance) — يعني كل شهر الفائدة تحسب على الرصيد المتبقي بعد سداد جزء من الدين. في الفائدة البسيطة، الفائدة تحسب على المبلغ الأصلي كامل طول المدة. EMI أكثر عدلاً للمقترض." },
  { question: "كيف أحسب EMI يدوياً؟", answer: "EMI = مبلغ القرض × [معدل الفائدة الشهري × (1 + معدل الفائدة الشهري)^عدد الأقساط] ÷ [(1 + معدل الفائدة الشهري)^عدد الأقساط - 1]. مثال: قرض 100,000 ريال، فائدة 10% سنوياً (0.833% شهرياً)، 5 سنوات (60 شهر). EMI = 100,000 × [0.00833 × (1.00833)^60] ÷ [(1.00833)^60 - 1] = 2,124 ريال." },
  { question: "ما العوامل المؤثرة في قيمة EMI؟", answer: "ثلاثة عوامل: 1) مبلغ القرض — كلما زاد زاد EMI. 2) نسبة الفائدة — كلما زادت زاد EMI. 3) مدة القرض — كلما طالت قل EMI لكن زادت الفائدة الإجمالية. هذه العوامل الثلاثة تتفاعل لتحدد القسط الشهري المناسب لك." },
  { question: "EMI للقرض العقاري vs القرض الشخصي؟", answer: "القرض العقاري: مدة طويلة (15-30 سنة)، EMI أقل (لأن الموزع على سنوات كثيرة)، فائدة أقل. القرض الشخصي: مدة قصيرة (1-6 سنوات)، EMI أعلى، فائدة أعلى. نفس المبلغ 500,000 ريال: عقاري 25 سنة = 3,060 ريال/شهر، شخصي 5 سنوات = 9,437 ريال/شهر." },
  { question: "كيف أختار أفضل EMI يناسبني؟", answer: "احسب نسبة EMI لراتبك: EMI ÷ الراتب × 100. لا تتجاوز 40% من راتبك إجمالاً لكل الأقساط. جرب سيناريوهات مختلفة في الحاسبة: زد المدة يقلل EMI لكن يزيد الفائدة الإجمالية. اختر التوازن بين EMI منخفض وفائدة إجمالية معقولة." },
  { question: "هل يشمل EMI التأمين والرسوم؟", answer: "عادةً EMI يشمل أصل الدين والفائدة فقط. التأمين على الحياة والرسوم الإدارية تضاف على القسط أو تُدفع مقدمًا منفصلة. اسأل البنك عن 'EMI شامل' (all-inclusive) لتعرف التكلفة الكاملة." },
  { question: "ما الفرق بين EMI للفائدة الثابتة والمتناقصة؟", answer: "الفائدة الثابتة: EMI يحتسب على المبلغ الأصلي طوال المدة — أعلى فائدة إجمالياً. الفائدة المتناقصة: EMI يحتسب على الرصيد المتبقي كل شهر — أقل فائدة إجمالياً. كل البنوك السعودية تستخدم الفائدة المتناقصة." },
  { question: "هل يمكن تقليل EMI عن طريق السداد المبكر؟", answer: "نعم، السداد المبكر الجزئي يقلل الرصيد المتبقي، وبالتالي قد يُعاد حساب EMI للفترة المتبقية. السداد المبكر الكلي يلغي باقي الأقساط والفائدة. استخدم الحاسبة لمقارنة تكلفة السداد المبكر مقابل البقاء على الجدول الأصلي." },
  { question: "ماذا يعني Pre-EMI؟", answer: "Pre-EMI هي فترة ما بين صرف القرض واستلام العقار (في القروض العقارية تحت الإنشاء). تدفع فائدة فقط على المبلغ المسحوب خلال هذه الفترة. بعد استلام العقار، يبدأ EMI الكامل (أصل + فائدة)." },
  { question: "هل EMI ثابت في كل البنوك؟", answer: "طريقة حساب EMI واحدة في كل البنوك لأنها معادلة رياضية قياسية. لكن قيمة EMI تختلف حسب الفائدة اللي يقدمها كل بنك. الفرق في 1% فائدة على قرض 500,000 ريال لمدة 25 سنة = فرق 280 ريال في EMI شهرياً و 84,000 ريال فائدة إجمالية." },
];

const relatedTools = [
  { title: "حاسبة القرض العقاري", icon: "🏠", href: "/tools/mortgage-calculator" },
  { title: "حاسبة القرض الشخصي", icon: "💰", href: "/tools/loan-calculator" },
  { title: "حاسبة التقسيط", icon: "📊", href: "/tools/installment-calculator" },
  { title: "حاسبة الفائدة المركبة", icon: "📈", href: "/tools/compound-interest" },
  { title: "حاسبة الذهب", icon: "🥇", href: "/tools/gold-calculator" },
  { title: "حاسبة الراتب الصافي", icon: "💵", href: "/tools/salary-calculator" },
];

const seoContent = [
  "حاسبة EMI (Equated Monthly Installment) هي الأداة المثالية لحساب القسط الشهري الثابت لأي قرض — شخصي، عقاري، سيارة، أو أي تمويل بنظام الأقساط الثابتة. تعتمد على معادلة رياضية قياسية تستخدمها جميع البنوك حول العالم.",
  "EMI يعني أن قسطك الشهري يبقى ثابتاً طوال مدة القرض — تدفع نفس المبلغ كل شهر من أول شهر لآخر شهر. لكن توزيع القسط بين أصل الدين والفائدة يتغير: في البداية أكثر من نصف القسط يذهب للفائدة، وفي النهاية معظمه يذهب لأصل الدين.",
  "المعادلة: EMI = المبلغ × [الفائدة الشهرية × (1 + الفائدة الشهرية)^عدد الأقساط] ÷ [(1 + الفائدة الشهرية)^عدد الأقساط - 1]. الفائدة الشهرية = الفائدة السنوية ÷ 12. عدد الأقساط = السنوات × 12. أدخل بياناتك في الحاسبة واحصل على EMI فوراً.",
  "مثال: قرض 100,000 ريال بفائدة 10% سنوياً لمدة 5 سنوات. الفائدة الشهرية = 0.833%. عدد الأقساط = 60. EMI = 2,124 ريال. إجمالي السداد = 127,440 ريال. إجمالي الفائدة = 27,440 ريال.",
  "نصيحة: استخدم حاسبة EMI لمقارنة عروض البنوك المختلفة. الفرق في 0.5% فائدة على قرض 100,000 ريال لمدة 5 سنوات = 1,320 ريال توفير في الفائدة الإجمالية. على قرض 500,000 ريال = 6,600 ريال توفير.",
  "العلاقة بين EMI ومدة القرض: قرض 100,000 بفائدة 8%. (أ) 3 سنوات: EMI = 3,133, فائدة = 12,788. (ب) 5 سنوات: EMI = 2,028, فائدة = 21,680. (ج) 7 سنوات: EMI = 1,559, فائدة = 30,956. كل ما زادت المدة، قل EMI لكن زادت الفائدة."
];

export default function EMICalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    if (p <= 0 || r <= 0 || n <= 0) return;
    const monthly = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setResult({ monthly, total: monthly * n, interest: monthly * n - p });
  };

  const schemaName = "حاسبة EMI";
const schemaDesc = `Online حاسبة EMI - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/emi-calculator";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "حاسبة EMI", url: "https://adwatak.cloud/tools/emi-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="الحاسبات المالية" categorySlug="calculators" toolName="حاسبة EMI" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🧮 حاسبة EMI</h1>
        <p className="text-sm text-gray-500 mb-6">احسب القسط الشهري الثابت (EMI) لأي قرض</p>
        {[
          { label: "مبلغ القرض (ريال)", value: amount, set: setAmount, placeholder: "100,000" },
          { label: "نسبة الفائدة السنوية (%)", value: rate, set: setRate, placeholder: "5.5" },
          { label: "مدة القرض (سنوات)", value: years, set: setYears, placeholder: "5" },
        ].map((f, i) => (
          <div key={i} className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.label}</label>
            <input type="number" value={f.value} onChange={(e) => f.set(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder={f.placeholder} />
          </div>
        ))}
        <button onClick={calculate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          احسب EMI
        </button>
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">القسط الشهري (EMI)</p>
            <p className="text-xl font-extrabold text-blue-900">{fmt(result.monthly)} <span className="text-xs">ر.س</span></p>
          </div>
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
            <p className="text-xs text-green-600 mb-1">إجمالي السداد</p>
            <p className="text-xl font-extrabold text-green-900">{fmt(result.total)} <span className="text-xs">ر.س</span></p>
          </div>
          <div className="bg-red-50 rounded-xl p-5 text-center border border-red-200">
            <p className="text-xs text-red-600 mb-1">إجمالي الفائدة</p>
            <p className="text-xl font-extrabold text-red-900">{fmt(result.interest)} <span className="text-xs">ر.س</span></p>
          </div>
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    </div>
  );
}
