import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Calculators — Adawatak",
  description: "Free financial calculators for mortgage, personal loans, EMI, installment plans, profit margin, VAT, net salary, currency conversion, compound interest, and gold — all in one place.",
  alternates: { canonical: "https://adwatak.cloud/category/calculators" },
};

const tools = [
  { title: "حاسبة القرض العقاري", icon: "🏠", href: "/tools/mortgage-calculator", desc: "احسب القسط الشهري مع جدول الاستفلال" },
  { title: "حاسبة القرض الشخصي", icon: "💰", href: "/tools/loan-calculator", desc: "احسب أقساط القرض الشخصي" },
  { title: "حاسبة التقسيط", icon: "📊", href: "/tools/installment-calculator", desc: "احسب قيمة القسط لأي عملية تقسيط" },
  { title: "حاسبة EMI", icon: "🧮", href: "/tools/emi-calculator", desc: "القسط الشهري الثابت" },
  { title: "حاسبة هامش الربح", icon: "📈", href: "/tools/profit-margin", desc: "احسب هامش الربح والمارك أب" },
  { title: "حاسبة الضريبة المضافة", icon: "🏛️", href: "/tools/vat-calculator", desc: "احسب VAT — السعودية 15٪ أو الإمارات 5٪" },
  { title: "حاسبة الراتب الصافي", icon: "💵", href: "/tools/salary-calculator", desc: "راتبك بعد التأمينات والاستقطاعات" },
  { title: "محوّل العملات", icon: "💱", href: "/tools/currency-converter", desc: "تحويل بين العملات العربية والعالمية" },
  { title: "حاسبة الفائدة المركبة", icon: "📈", href: "/tools/compound-interest", desc: "احسب عائد استثمارك مع الفائدة المركبة" },
  { title: "حاسبة الذهب", icon: "🥇", href: "/tools/gold-calculator", desc: "احسب قيمة الذهب والزكاة والنصاب" },
];

export default function CalculatorsCategory() {
  return (
    <div className="max-w-[900px] mx-auto">
      <nav className="text-xs text-gray-400 mb-5 flex items-center gap-2">
        <a href="/" className="text-blue-600 no-underline">الرئيسية</a>
        <span>›</span>
        <span className="text-gray-500">الحاسبات المالية</span>
      </nav>

      <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">🧮 الحاسبات المالية</h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          مجموعة شاملة من الحاسبات المالية تساعدك على اتخاذ قرارات مالية ذكية. احسب أقساط القروض العقارية والشخصية، قيمة التقسيط، الفائدة المركبة، هامش الربح، الضريبة المضافة، الراتب الصافي، محوّل العملات، وحاسبة الذهب والزكاة. كل الحاسبات مجانية ومحدثة حسب الأنظمة السعودية والإماراتية.
        </p>
      </div>

      <div className="tools-grid">
        {tools.map((tool) => (
          <a key={tool.href} href={tool.href} className="tool-card">
            <div className="tool-card-inner">
              <span className="tool-icon">{tool.icon}</span>
              <div>
                <h3 className="tool-title">{tool.title}</h3>
                <p className="tool-desc">{tool.desc}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-4">أسئلة شائعة عن الحاسبات المالية</h2>
        {[
          { q: "كيف أحسب القسط الشهري للقرض العقاري؟", a: "استخدم حاسبة القرض العقاري: أدخل سعر العقار، الدفعة الأولى، نسبة الفائدة، ومدة القرض. ستحصل على القسط الشهري وإجمالي الفائدة وجدول الاستفلال السنوي." },
          { q: "ما الفرق بين EMI والفائدة البسيطة؟", a: "EMI (القسط الشهري الثابت) يبقى ثابتاً لكن نسبة الأصل vs الفائدة تتغير كل شهر. الفائدة البسيطة تُحسب على المبلغ الأصلي فقط." },
          { q: "كيف أحسب هامش الربح؟", a: "هامش الربح = (سعر البيع - التكلفة) ÷ سعر البيع × 100. مثال: تكلفة 80 ريال، بيع 100 ريال = هامش ربح 20٪." },
          { q: "ما نسبة الضريبة المضافة في السعودية؟", a: "15٪ في السعودية، 5٪ في الإمارات. استخدم حاسبة VAT لحسابها تلقائياً." },
        ].map((faq, i) => (
          <div key={i} className="border border-gray-50 rounded-xl overflow-hidden mb-2">
            <div className="p-3.5 bg-gray-50 font-semibold text-sm text-gray-700">{faq.q}</div>
            <div className="p-3.5 text-sm text-gray-600 leading-relaxed bg-white">{faq.a}</div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <a href="/" className="text-blue-600 no-underline font-semibold">← العودة لكل الأدوات</a>
      </div>
    </div>
  );
}
