"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";

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

export default function ProfitMargin() {
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [margin, setMargin] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const c = parseFloat(cost);
    const p = parseFloat(price);
    const m = parseFloat(margin);
    if (c > 0 && p > 0) {
      setResult({ margin: ((p - c) / p * 100), markup: ((p - c) / c * 100), profit: p - c, price: p, cost: c });
    } else if (c > 0 && m > 0) {
      const calcPrice = c / (1 - m / 100);
      setResult({ margin: m, markup: (calcPrice - c) / c * 100, profit: calcPrice - c, price: calcPrice, cost: c });
    } else if (p > 0 && m > 0) {
      const calcCost = p * (1 - m / 100);
      setResult({ margin: m, markup: (p - calcCost) / calcCost * 100, profit: p - calcCost, price: p, cost: calcCost });
    }
  };

  const schemaName = "حاسبة هامش الربح";
const schemaDesc = `Online حاسبة هامش الربح - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/profit-margin";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "حاسبة هامش الربح", url: "https://adwatak.cloud/tools/profit-margin" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="الحاسبات المالية" categorySlug="calculators" toolName="حاسبة هامش الربح" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📈 حاسبة هامش الربح</h1>
        <p className="text-sm text-gray-500 mb-6">احسب هامش الربح والمارك أب والتكلفة أو سعر البيع</p>
        {[
          { label: "التكلفة (ريال)", value: cost, set: setCost, placeholder: "80" },
          { label: "سعر البيع (ريال) — اختياري", value: price, set: setPrice, placeholder: "100" },
          { label: "هامش الربح (%) — اختياري", value: margin, set: setMargin, placeholder: "20" },
        ].map((f, i) => (
          <div key={i} className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.label}</label>
            <input type="number" value={f.value} onChange={(e) => f.set(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder={f.placeholder} />
          </div>
        ))}
        <p className="text-xs text-gray-400 mb-2">أدخل أي قيمتين وسيُحسب الباقي</p>
        <button onClick={calculate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          احسب
        </button>
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
            <p className="text-xs text-blue-600">هامش الربح</p>
            <p className="text-xl font-extrabold">{result.margin.toFixed(2)}%</p>
          </div>
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
            <p className="text-xs text-green-600">المارك أب</p>
            <p className="text-xl font-extrabold">{result.markup.toFixed(2)}%</p>
          </div>
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    </div>
  );
}
