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
  {
    question: "ما هو القرض الشخصي وكيف يعمل؟",
    answer: "القرض الشخصي هو مبلغ من المال تحصل عليه من البنك، تسدده على هيئة أقساط شهرية متساوية خلال 1-6 سنوات. يُستخدم لتمويل الزواج، تجهيز المنزل، مصاريف طبية، سداد ديون، أو السفر. في السعودية، نسبة الفائدة تتراوح بين 3% و8% سنوياً حسب البنك وراتبك وتاريخك الائتماني."
  },
  {
    question: "ما هي شروط الحصول على قرض شخصي في السعودية؟",
    answer: "سعودي الجنسية أو مقيم بإقامة سارية، العمر بين 21 و60 سنة، راتب لا يقل عن 3,000-5,000 ريال، خبرة 3-6 شهور، وتحويل الراتب على البنك. تختلف الشروط حسب البنك ونوع التمويل. بعض البنوك تقدم تمويل بدون تحويل راتب لكن بفائدة أعلى."
  },
  {
    question: "كيف يتم حساب القسط الشهري للقرض الشخصي؟",
    answer: "القسط = مبلغ القرض × (معدل الفائدة الشهري × (1 + معدل الفائدة)^عدد الأقساط) ÷ ((1 + معدل الفائدة)^عدد الأقساط - 1). مثال: قرض 50,000 ريال بفائدة 5% سنوياً لمدة 5 سنوات → قسط شهري ≈ 944 ريال. إجمالي السداد = 56,640 ريال، الفائدة = 6,640 ريال."
  },
  {
    question: "ما الفرق بين الفائدة الثابتة والمتغيرة؟",
    answer: "الفائدة الثابتة لا تتغير طوال مدة القرض — قسطك ثابت واضح. الفائدة المتغيرة مرتبطة بسعر SAIBOR وقد ترتفع أو تنخفض. الفائدة الثابتة أفضل للتخطيط المالي. في السعودية، معظم البنوك تقدم فائدة ثابتة للقروض الشخصية."
  },
  {
    question: "هل يمكن الحصول على قرض بدون تحويل راتب؟",
    answer: "نعم، بعض البنوك وشركات التمويل التعاونية تقدم قروض بدون تحويل راتب، لكن الفائدة أعلى والحد الأقصى للقرض أقل. من أشهر الجهات: التمويل الأولى، المرابحة للتمويل. إذا استطعت تحويل الراتب، ستحصل على عروض أفضل."
  },
  {
    question: "هل يمكن السداد المبكر للقرض الشخصي؟",
    answer: "نعم، تسمح البنوك بالسداد المبكر الجزئي أو الكلي. وفقاً للبنك المركزي السعودي، يحق لك السداد المبكر في أي وقت. بعض البنوك تفرض رسوماً تصل إلى 3 أقساط أو نسبة من الرصيد المتبقي. السداد المبكر يوفر عليك الفائدة المتبقية — مثال: سداد قرض بعد سنتين بدلاً من 5 قد يوفر 2,000-3,000 ريال."
  },
  {
    question: "ما هي المستندات المطلوبة للحصول على قرض شخصي؟",
    answer: "الهوية الوطنية أو الإقامة سارية، آخر 3 شهور كشف حساب بنكي، شهادة راتب مختومة، عقد العمل، وتقرير سمة (الشركة السعودية للمعلومات الائتمانية). بعض البنوك تطلب إثبات عنوان (فاتورة كهرباء أو جوال)."
  },
  {
    question: "هل القرض الشخصي حلال أم حرام؟",
    answer: "القرض بفائدة (ربا) حرام شرعاً بإجماع العلماء. لكن يوجد بديل حلال: التمويل الإسلامي (مرابحة، إجارة، مشاركة متناقصة). جميع البنوك السعودية تقدم خيارات تمويل إسلامي متوافقة مع الشريعة. يُنصح بالتوجه للتمويل الإسلامي."
  },
  {
    question: "كيف أختار أفضل قرض شخصي؟",
    answer: "1) قارن عروض 5 بنوك على الأقل. 2) لا تتجاوز نسبة الاستقطاع 40% من راتبك. 3) اختر أقصر مدة ممكنة لتقليل الفائدة. 4) تأكد من إمكانية السداد المبكر ورسومه. 5) اقرأ العقد كاملاً. 6) تحقق من سجلك الائتماني في سمة. 7) اختر بنك يقدم تأمين على القرض."
  },
  {
    question: "ما هو APR (معدل النسبة السنوي)؟",
    answer: "APR هو معدل النسبة السنوي الشامل — يشمل الفائدة + جميع الرسوم (إدارية، تقييم، تأمين). يختلف عن الفائدة المعلنة لأنه يعطيك الصورة الكاملة لتكلفة القرض. في السعودية، معظم البنوك تعلن APR واضح. قارن APR بين البنوك وليس الفائدة فقط."
  },
  {
    question: "هل يؤثر القرض الشخصي على التصنيف الائتماني؟",
    answer: "نعم، التأخر في سداد أقساط القرض يؤثر سلباً على تصنيفك في سمة (الشركة السعودية للمعلومات الائتمانية). الالتزام بالسداد في موعده يحسن تصنيفك ويسهل حصولك على تمويل مستقبلي. اسأل البنك عن إمكانية تأجيل قسط في الظروف الطارئة."
  },
  {
    question: "ما الفرق بين القرض الشخصي وبطاقة الائتمان؟",
    answer: "القرض الشخصي: مبلغ ثابت، أقساط شهرية ثابتة، فائدة أقل (3-8%)، مدة محددة. بطاقة الائتمان: حد ائتماني متجدد، تسدد الحد الأدنى شهرياً، فائدة أعلى (18-30%)، مرونة في السحب. القرض أفضل للتمويل طويل الأجل، البطاقة أفضل للمشتريات اليومية."
  },
];

const relatedTools = [
  { title: "حاسبة القرض العقاري", icon: "🏠", href: "/tools/mortgage-calculator" },
  { title: "حاسبة التقسيط", icon: "📊", href: "/tools/installment-calculator" },
  { title: "حاسبة EMI", icon: "🧮", href: "/tools/emi-calculator" },
  { title: "حاسبة الفائدة المركبة", icon: "📈", href: "/tools/compound-interest" },
  { title: "حاسبة الراتب الصافي", icon: "💵", href: "/tools/salary-calculator" },
  { title: "حاسبة الضريبة المضافة", icon: "🏛️", href: "/tools/vat-calculator" },
];

const seoContent = [
  "حاسبة القرض الشخصي هي أداة أساسية لكل شخص يفكر في الحصول على تمويل بنكي في السعودية أو الإمارات أو مصر. تساعدك الحاسبة على معرفة القسط الشهري الذي سيُخصم من راتبك، وإجمالي المبلغ الذي ستدفعه خلال فترة القرض، والفائدة التي ستتحملها — كل ذلك خلال ثوانٍ.",
  "القرض الشخصي هو أكثر أنواع التمويل شيوعاً في العالم العربي. تستخدمه الغالبية لتمويل الزواج، تجهيز المنزل، تغطية المصاريف الطبية، تجميع الديون، أو السفر. في السعودية، يقدم أكثر من 25 بنك وشركة تمويل قروضاً شخصية بنسب فائدة تتراوح بين 3% و8% سنوياً.",
  "كيف تعمل الحاسبة: أدخل مبلغ القرض (مثلاً 50,000 ريال)، نسبة الفائدة السنوية (5%)، ومدة السداد بالسنوات (5 سنوات). النتيجة: القسط الشهري ≈ 944 ريال، إجمالي السداد = 56,640 ريال، إجمالي الفائدة = 6,640 ريال. جرب سيناريوهات مختلفة — زود المدة يقلل القسط لكن يزيد الفائدة الإجمالية.",
  "نصيحة مهمة: قارن عروض 5 بنوك على الأقل لأن الفرق في 0.5% فائدة يمكن أن يوفر لك آلاف الريالات. اختر أقصر مدة سداد ممكنة تناسب ميزانيتك. تأكد من إمكانية السداد المبكر بدون رسوم باهظة. فكر في التمويل الإسلامي كبديل حلال عن القروض التقليدية.",
  "نسبة الاستقطاع من الراتب: وفقاً للوائح البنك المركزي السعودي، يجب ألا يتجاوز إجمالي أقساط القروض 40% من راتبك الشهري. لو راتبك 10,000 ريال، أقصى قسط مسموح = 4,000 ريال شهرياً. استخدم حاسبة القرض لتجرب مبالغ ومدد مختلفة وتشوف إيه المناسب لك.",
  "تأثير القرض على التصنيف الائتماني: الالتزام بسداد الأقساط في موعدها يحسن سجلك في سمة. التأخر أو التعثر يخفض تصنيفك وقد يمنعك من الحصول على تمويل مستقبلي. اسأل البنك عن خيارات التأجيل في الظروف الطارئة قبل التوقيع."
];

export default function LoanCalculator() {
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

  const schemaName = "حاسبة القرض الشخصي";
const schemaDesc = `Online حاسبة القرض الشخصي - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/loan-calculator";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "حاسبة القرض الشخصي", url: "https://adwatak.cloud/tools/loan-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="الحاسبات المالية" categorySlug="calculators" toolName="حاسبة القرض الشخصي" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">💰 حاسبة القرض الشخصي</h1>
        <p className="text-sm text-gray-500 mb-6">احسب القسط الشهري وإجمالي الفائدة للقرض الشخصي — مجاناً وبالعربي</p>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">مبلغ القرض (ريال)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="50,000" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">نسبة الفائدة السنوية (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1"
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="5.5" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">مدة القرض (سنوات)</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="5" />
        </div>
        <button onClick={calculate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          احسب القسط
        </button>
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">القسط الشهري</p>
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
