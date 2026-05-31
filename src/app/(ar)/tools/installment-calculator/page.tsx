"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما الفرق بين التقسيط والقرض الشخصي؟", answer: "التقسيط مرتبط بسلعة أو خدمة محددة (سيارة، أثاث، أجهزة). تستلم السلعة فوراً وتدفع أقساطاً شهرية. القرض الشخصي يعطيك مبلغاً حراً تستخدمه كيفما شئت. التقسيط أسهل في الإجراءات لكن الفائدة قد تكون أعلى." },
  { question: "هل التقسيط بدون فوائد حقيقي؟", answer: "أحياناً يكون حقيقياً — خصوصاً في العروض الترويجية من المتاجر الكبرى والبنوك (مثلاً 0% على 12 شهر). لكن غالباً الفائدة تكون مضمنة في سعر السلعة. اقسم سعر التقسيط الإجمالي ÷ سعر الكاش لتشوف الفرق." },
  { question: "ماذا يحدث عند التأخر عن سداد القسط؟", answer: "تضاف غرامات تأخير (تتراوح بين 1-3% من قيمة القسط المتأخر شهرياً). ترتفع الفائدة المتبقية. قد يؤثر سلباً على سجلك في سمة ويقلل تصنيفك الائتماني. في الحالات المستمرة قد يتم حجز راتبك أو اتخاذ إجراءات قانونية." },
  { question: "هل يمكن تقسيط أي منتج؟", answer: "معظم المتاجر الكبرى والإلكترونية تقدم تقسيطاً عبر البنوك وشركات التمويل. السيارات، الأثاث، الأجهزة الإلكترونية، السفر، وحتى الخدمات الطبية بعضها قابل للتقسيط. بعض المتاجر الصغيرة لا تقدم التقسيط." },
  { question: "كم مدة التقسيط المسموح بها؟", answer: "تختلف حسب المتجر والسلعة: الأجهزة الإلكترونية 6-24 شهر، الأثاث 12-36 شهر، السيارات 12-60 شهر. كلما طالت المدة، انخفض القسط لكن زادت الفائدة الإجمالية. اختار أقصر مدة تناسب ميزانيتك." },
  { question: "هل التقسيط يؤثر على التصنيف الائتماني؟", answer: "نعم، الالتزام بالسداد في موعده يحسن تصنيفك في سمة. التأخر يؤثر سلباً. كثرة طلبات التقسيط (أكثر من 3-4 في وقت قصير) قد تخفض تصنيفك لأنها تعني أنك تعاني مادياً." },
  { question: "ما الفرق بين التقسيط والإيجار المنتهي بالتملك؟", answer: "التقسيط: تملك السلعة فوراً وتسدد أقساطاً. الإيجار المنتهي بالتملك: تستأجر السلعة لمدة محددة وعند نهاية العقد تملكها. الإيجار غالباً ما يكون أقل رسماً شهرياً لكن التكلفة الإجمالية قد تكون أعلى." },
  { question: "هل يمكن السداد المبكر للتقسيط؟", answer: "نعم، معظم عقود التقسيط تسمح بالسداد المبكر. بعضها يفرض رسوماً إدارية بسيطة. السداد المبكر يوفر الفائدة المتبقية. تأكد من بند السداد المبكر في العقد قبل التوقيع." },
  { question: "ما هي المستندات المطلوبة للتقسيط؟", answer: "غالباً مجرد بطاقة الهوية فقط — هذا أسهل من القرض البنكي. في التقسيط عبر البنوك: تحويل راتب أو كشف حساب. التقسيط عبر المتجر مباشرة: الهوية الوطنية فقط وسعر السلعة + الفائدة." },
  { question: "كيف أحسب التكلفة الحقيقية للتقسيط؟", answer: "مثال: سعر كاش 50,000 ريال، تقسيط 24 شهر بقسط 2,300 ريال. التكلفة الإجمالية = 2,300 × 24 = 55,200 ريال. الفرق = 5,200 ريال. هذا هو سعر الفائدة. استخدم حاسبة التقسيط لتعرف التكلفة الحقيقية قبل الشراء." },
  { question: "هل يوجد حد أدنى للراتب للتقسيط؟", answer: "يختلف حسب المتجر والبنك. بعض المتاجر لا تشترط حداً أدنى. التقسيط عبر البنوك: غالباً 3,000-5,000 ريال. شركات التمويل: 2,000-3,000 ريال. كلما زاد راتبك، زادت الموافقة وسهولة الإجراءات." },
  { question: "هل تأخر قسط واحد يؤثر على كل العقد؟", answer: "نعم، عقد التقسيط يعتبر كاملاً — التأخر في أي قسط يعتبر تأخر في كل العقد. تستحق الغرامة على كل قسط متأخر. في التقسيط البنكي، التأخر قد يزيد الفائدة على الرصيد المتبقي." },
];

const relatedTools = [
  { title: "حاسبة القرض الشخصي", icon: "💰", href: "/tools/loan-calculator" },
  { title: "حاسبة EMI", icon: "🧮", href: "/tools/emi-calculator" },
  { title: "حاسبة القرض العقاري", icon: "🏠", href: "/tools/mortgage-calculator" },
  { title: "حاسبة الفائدة المركبة", icon: "📈", href: "/tools/compound-interest" },
  { title: "حاسبة الضريبة المضافة", icon: "🏛️", href: "/tools/vat-calculator" },
  { title: "محول العملات", icon: "💱", href: "/tools/currency-converter" },
];

const seoContent = [
  "حاسبة التقسيط هي أداة متعددة الأغراض تحسب لك القسط الشهري لأي مبلغ تريده تقسيطه — سواء سيارة، أثاث، أجهزة إلكترونية، أو حتى خدمات. أدخل المبلغ، عدد الأقساط، ونسبة الفائدة (إن وجدت) لتعرف التكلفة الحقيقية للتقسيط.",
  "يختلف التقسيط عن القرض الشخصي في أن التقسيط يكون مرتبطاً بسلعة محددة. إجراءات التقسيط أسهل وأسرع — غالباً مجرد بطاقة الهوية. لكن نسبة الفائدة في التقسيط التجاري قد تكون أعلى من القرض البنكي، وقد تصل إلى 15-20% سنوياً في بعض المتاجر.",
  "كيف تعمل الحاسبة؟ أدخل المبلغ الإجمالي للسلعة بالريال، عدد الأقساط بالأشهر (مثلاً 24 شهر)، ونسبة الفائدة السنوية (مثلاً 0% للتقسيط بدون فوائد). النتيجة: القسط الشهري وإجمالي المبلغ المدفوع. جرب سيناريوهات مختلفة لاختيار الأنسب لك.",
  "مثال: تقسيط سيارة بـ 120,000 ريال على 60 شهر بفائدة 7% سنوياً. القسط الشهري = 2,376 ريال. إجمالي المدفوع = 142,560 ريال. الفائدة الإجمالية = 22,560 ريال. لو قللت المدة لـ 36 شهر: القسط = 3,705 ريال لكن الفائدة = 13,380 ريال (توفير 9,180 ريال).",
  "نصيحة مهمة: قبل التوقيع على عقد تقسيط، احسب التكلفة الإجمالية دائماً. اعرف سعر الكاش للمنتج وقارنه بإجمالي التقسيط. الفرق هو سعر الفائدة اللي تدفعه. كلما زادت المدة، زادت الفائدة الإجمالية. اختر أقصر مدة تناسب ميزانيتك الشهرية.",
  "حاسبة التقسيط مفيدة أيضاً للتجار وأصحاب المتاجر: ساعد عملاءك على معرفة قيمة الأقساط لأي منتج. هذا يزيد الثقة ويساعد في إتمام عمليات البيع. أدخل التكلفة + هامش الربح لتعرف القسط المناسب لمنتجاتك."
];

export default function InstallmentCalculator() {
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState<{ monthly: number; total: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const m = parseFloat(months);
    const r = parseFloat(rate) / 100 / 12;
    if (a <= 0 || m <= 0) return;
    const monthly = r > 0 ? a * (r * Math.pow(1 + r, m)) / (Math.pow(1 + r, m) - 1) : a / m;
    setResult({ monthly, total: monthly * m });
  };

  const schemaName = "حاسبة التقسيط";
const schemaDesc = `Online حاسبة التقسيط - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/installment-calculator";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "حاسبة التقسيط", url: "https://adwatak.cloud/tools/installment-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="الحاسبات المالية" categorySlug="calculators" toolName="حاسبة التقسيط" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📊 حاسبة التقسيط</h1>
        <p className="text-sm text-gray-500 mb-6">احسب قيمة القسط الشهري لأي عملية تقسيط</p>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">المبلغ الإجمالي (ريال)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="50,000" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">عدد الأقساط (أشهر)</label>
          <input type="number" value={months} onChange={(e) => setMonths(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="24" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">نسبة الفائدة السنوية (%) — اتركها 0 للتقسيط بدون فوائد</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1"
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="0" />
        </div>
        <button onClick={calculate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          احسب القسط
        </button>
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">القسط الشهري</p>
            <p className="text-xl font-extrabold text-blue-900">{result.monthly.toLocaleString("ar-SA")} <span className="text-xs">ر.س</span></p>
          </div>
          <div className="bg-red-50 rounded-xl p-5 text-center border border-red-200">
            <p className="text-xs text-red-600 mb-1">الإجمالي</p>
            <p className="text-xl font-extrabold text-red-900">{result.total.toLocaleString("ar-SA")} <span className="text-xs">ر.س</span></p>
          </div>
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
