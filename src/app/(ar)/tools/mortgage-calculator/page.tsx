"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

function fmt(n: number) {
  return n.toLocaleString("ar-SA", { maximumFractionDigits: 2 });
}

const faqs = [
  {
    question: "كيف يتم حساب القسط الشهري للقرض العقاري؟",
    answer: "يتم حساب القسط الشهري باستخدام معادلة EMI: القسط = مبلغ القرض × (معدل الفائدة الشهري × (1 + معدل الفائدة)^عدد الأقساط) ÷ ((1 + معدل الفائدة)^عدد الأقساط - 1). هذه المعادلة تأخذ في الاعتبار الفائدة المركبة وتوزع السداد بالتساوي على مدة القرض."
  },
  {
    question: "ما هي نسبة الفائدة المعتادة للقرض العقاري في السعودية؟",
    answer: "تتراوح نسبة الفائدة للقرض العقاري في السعودية بين 3.5% إلى 6.5% سنوياً حسب البنك ونوع التمويل (ثابت أو متغير) ومدة القرض. البنك الأهلي والراجحي والعربي الوطني من أشهر المقدمين."
  },
  {
    question: "هل الدفعة الأولى إجبارية للقرض العقاري؟",
    answer: "نعم، تشترط البنوك السعودية دفعة أولى لا تقل عن 20% من قيمة العقار للمواطنين السعوديين، وقد تصل إلى 30% للمقيمين. بعض برامج التمويل المدعومة من وزارة الإسكان تسمح بدفعة أولى أقل تصل إلى 5-10%."
  },
  {
    question: "ما الفرق بين الفائدة الثابتة والمتغيرة في القرض العقاري؟",
    answer: "الفائدة الثابتة تظل ثابتة طوال مدة القرض مما يعني قسط شهري ثابت. الفائدة المتغيرة مرتبطة بسعر SAIBOR وقد ترتفع أو تنخفض. الفائدة الثابتة أفضل للتخطيط المالي طويل المدى، بينما الفائدة المتغيرة قد توفر أقساط أقل في البداية."
  },
  {
    question: "هل يمكن السداد المبكر للقرض العقاري؟",
    answer: "نعم، تسمح البنوك بالسداد المبكر لكن قد تفرض رسوماً تصل إلى 3 أقساط أو نسبة من رصيد القرض. وفقاً للبنك المركزي السعودي، يجب أن تكون رسوم السداد المبكر معقولة ومعلنة في العقد. السداد المبكر يخفض إجمالي الفائدة بشكل كبير."
  },
  {
    question: "ما هي المستندات المطلوبة للحصول على قرض عقاري؟",
    answer: "الهوية الوطنية، آخر 3 شهور كشف حساب بنكي، شهادة الراتب مع جهة العمل، عقد العمل، صك الملكية أو عقد الشراء، وتقرير تقييم العقار من مقيم معتمد. للموظفين في القطاع الخاص، تحتاج خطاب تعريف راتب مختوم."
  },
  {
    question: "كم من راتبي يمكن أن يخصم للقرض العقاري؟",
    answer: "وفقاً للوائح البنك المركزي، يجب ألا يتجاوز الاقتطاع الشهري للقرض العقاري 40% من إجمالي الراتب الشهري. هذا يشمل أقساط جميع القروض مجتمعة. لو عندك قرض سيارة أو بطاقة ائتمان، تقل النسبة المتاحة للقرض العقاري."
  },
  {
    question: "ما هو جدول الاستفلال (Amortization Schedule)؟",
    answer: "جدول الاستفلال يوضح تفاصيل كل قسط شهري خلال مدة القرض — كم يذهب لأصل الدين وكم للفائدة. في السنوات الأولى، يذهب الجزء الأكبر من القسط للفائدة. في السنوات الأخيرة، يذهب معظم القسط لأصل الدين. هذا يساعدك على التخطيط المالي ومعرفة متى ستقل مديونيتك."
  },
  {
    question: "هل يشمل التمويل العقاري التأمين على الحياة؟",
    answer: "نعم، تطلب البنوك السعودية تأمين على الحياة (تأمين تكافلي) يغطي رصيد القرض في حالة الوفاة أو العجز الكلي. تكلفة التأمين تتراوح بين 0.5% إلى 1% من رصيد القرض سنوياً. هذا التأمين إجباري لحماية البنك والمقترض."
  },
  {
    question: "كم يستغرق القرض العقاري من الموافقة إلى الصرف؟",
    answer: "تستغرق عملية الموافقة على القرض العقاري من أسبوعين إلى 3 شهور حسب البنك ونوع التمويل وتعقيدات الملكية. تشمل المراحل: تقديم الطلب، دراسة الائتمان، تقييم العقار، إصدار الموافقة المبدئية، توقيع العقود، ثم الصرف بعد تسجيل الرهن."
  },
  {
    question: "ما الفرق بين التمويل التقليدي والتمويل الإسلامي للعقار؟",
    answer: "التمويل التقليدي يعتمد على الفائدة (ربا). التمويل الإسلامي يستخدم صيغاً شرعية مثل المرابحة (البنك يشتري العقار ويبيعه عليك بربح معلوم) أو الإجارة المنتهية بالتمليك (إيجار ينتهي بتملك العقار). في السعودية، التمويل الإسلامي هو السائد."
  },
  {
    question: "هل يمكن الحصول على قرض عقاري للمقيمين في السعودية؟",
    answer: "نعم، يمكن للمقيمين الحصول على تمويل عقاري بشروط تختلف حسب القيمة المطلوبة ومدة الإقامة. عادةً تشترط البنوك حد أدنى للراتب 15,000 ريال واستمرار الإقامة مع صلاحية التأشيرة ومدة متبقية لا تقل عن سنة."
  },
  {
    question: "لماذا تستخدم الحاسبة 12 شهراً في حساب الفائدة الشهرية؟",
    answer: "لأن الفائدة السنوية تقسم على 12 شهراً للحصول على الفائدة الشهرية. معظم القروض العقارية في السعودية تحتسب الفائدة شهرياً وليس سنوياً، لأن الأقساط تُدفع شهرياً. الفائدة الشهرية = الفائدة السنوية ÷ 12."
  },
  {
    question: "ما هي أفضل بنوك للقرض العقاري في السعودية؟",
    answer: "أشهر بنوك التمويل العقاري في السعودية: البنك الأهلي السعودي (أكبر محفظة عقارية)، مصرف الراجحي (التمويل الإسلامي)، بنك الرياض، البنك العربي الوطني، بنك الجزيرة. كل بنك له عروض ومزايا مختلفة حسب شريحة العميل."
  },
];

const relatedTools = [
  { title: "حاسبة القرض الشخصي", icon: "💰", href: "/tools/loan-calculator" },
  { title: "حاسبة التقسيط", icon: "📊", href: "/tools/installment-calculator" },
  { title: "حاسبة EMI", icon: "🧮", href: "/tools/emi-calculator" },
  { title: "حاسبة الفائدة المركبة", icon: "📈", href: "/tools/compound-interest" },
  { title: "حاسبة الراتب الصافي", icon: "💵", href: "/tools/salary-calculator" },
  { title: "حاسبة الضريبة المضافة", icon: "🏛️", href: "/tools/vat-calculator" },
];

const seoContent = [
  "حاسبة القرض العقاري هي أداة أساسية لكل شخص يفكر في شراء منزل أو عقار عن طريق التمويل المصرفي. تساعدك الحاسبة على معرفة القسط الشهري الذي ستلتزم به لسنوات، وإجمالي المبلغ الذي ستدفعه على مدار القرض، وكذلك إجمالي الفائدة التي ستتحملها. كل ما تحتاجه هو إدخال 4 أرقام فقط.",
  "في المملكة العربية السعودية، يُعد قطاع التمويل العقاري من أسرع القطاعات نمواً بدعم من رؤية 2030 الهادفة لرفع نسبة التملك إلى 70%. تقدم البنوك السعودية تمويلاً عقارياً يصل إلى 30 سنة مع دفعة أولى تبدأ من 20%. يمكن للمواطنين أيضاً الاستفادة من برامج دعم وزارة الإسكان وصندوق التنمية العقارية.",
  "طريقة عمل الحاسبة: أدخل سعر العقار (مثلاً 800,000 ريال)، قيمة الدفعة الأولى (مثلاً 200,000 ريال — كلما زادت قلّت الفائدة)، نسبة الفائدة السنوية (حسب عرض البنك، تتراوح بين 3.5% إلى 6.5%)، ومدة القرض بالسنوات (عادة من 15 إلى 30 سنة). اضغط احسب لترى النتائج.",
  "جدول الاستفلال (Amortization Schedule) هو ميزة قوية في حاسبتنا. يوضح لك بالتفصيل كيف يتوزع كل قسط بين أصل الدين والفائدة على طول سنوات القرض. في السنة الأولى مثلاً، من كل 2,500 ريال قسط شهري، حوالي 2,000 ريال يذهب للفائدة و500 فقط لأصل الدين. بعد 10 سنوات، تتغير النسبة تدريجياً.",
  "نصيحة مهمة قبل التقدم لأي قرض عقاري: قارن بين عروض 3 بنوك مختلفة على الأقل. لا تكتفي بالفائدة المعلنة فقط — اسأل عن الرسوم الإدارية، رسوم التقييم العقاري، رسوم التأمين، ورسوم السداد المبكر. الفرق بين بنك وآخر قد يوفر لك أكثر من 100,000 ريال على مدى 25 سنة.",
  "نسبة الاقتطاع من الراتب هي عامل حاسم. البنك المركزي السعودي يحدد حداً أقصى 40% من الراتب لأقساط القروض. يعني لو مرتبك 15,000 ريال، أقصى قسط ممكن = 6,000 ريال شهرياً. استخدم حاسبتنا لتجرب سيناريوهات مختلفة وتشوف إيه المناسب لميزانيتك.",
  "مقارنة مهمة: لو أخذت قرض 500,000 ريال على 25 سنة بفائدة 5.5%، القسط الشهري حوالي 3,060 ريال، وإجمالي الفائدة = 418,000 ريال (يعني سترد 918,000 ريال). نفس القرض على 15 سنة: القسط = 4,095 ريال، الفائدة = 236,000 ريال (توفير 182,000 ريال). كل ما قلت المدة، قلت الفائدة الإجمالية.",
  "التأمين على القرض العقاري: تطلب البنوك وثيقة تأمين تكافلي على الحياة تغطي رصيد القرض في حالة الوفاة أو العجز الكلي. التكلفة السنوية حوالي 0.5% من رصيد القرض. بعض البنوك تتيح إضافته على القسط الشهري بدلاً من دفعه مرة واحدة سنوياً."
];

export default function MortgageCalculator() {
  const [price, setPrice] = useState("");
  const [down, setDown] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<null | {
    monthly: number; total: number; totalInterest: number;
    schedule: { year: number; payment: number; principal: number; interest: number; balance: number }[];
  }>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(down) || 0;
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;
    const principal = p - d;
    if (principal <= 0 || r <= 0 || n <= 0) return;
    const monthly = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    const totalInterest = total - principal;
    const schedule = [];
    let balance = principal;
    let yearlyPrincipal = 0, yearlyInterest = 0, yearlyPayment = 0;
    for (let i = 1; i <= n; i++) {
      const interestPayment = balance * r;
      const principalPayment = monthly - interestPayment;
      balance -= principalPayment;
      yearlyPrincipal += principalPayment;
      yearlyInterest += interestPayment;
      yearlyPayment += monthly;
      if (i % 12 === 0 || i === n) {
        schedule.push({ year: Math.ceil(i / 12), payment: yearlyPayment, principal: yearlyPrincipal, interest: yearlyInterest, balance: Math.max(0, balance) });
        yearlyPrincipal = 0; yearlyInterest = 0; yearlyPayment = 0;
      }
    }
    setResult({ monthly, total, totalInterest, schedule });
  };

  const schemaName = "حاسبة القرض العقاري";
const schemaDesc = `Online حاسبة القرض العقاري - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/mortgage-calculator";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "حاسبة القرض العقاري", url: "https://adwatak.cloud/tools/mortgage-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="الحاسبات المالية" categorySlug="calculators" toolName="حاسبة القرض العقاري" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🏠 حاسبة القرض العقاري</h1>
        <p className="text-sm text-gray-500 mb-6">احسب القسط الشهري وإجمالي الفائدة وجدول سداد القرض العقاري — مجاناً وبالعربي</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">سعر العقار (ريال)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="500,000" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">الدفعة الأولى (ريال)</label>
            <input type="number" value={down} onChange={(e) => setDown(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="100,000" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">نسبة الفائدة السنوية (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.1"
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="5.5" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">مدة القرض (سنوات)</label>
            <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="25" />
          </div>
        </div>

        <button onClick={calculate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          احسب القسط
        </button>
      </div>

      {result && (
        <div className="flex flex-col gap-4 mb-6">
          <div className="grid grid-cols-3 gap-3">
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
              <p className="text-xl font-extrabold text-red-900">{fmt(result.totalInterest)} <span className="text-xs">ر.س</span></p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="font-bold">📋 جدول الاستفلال (سنوي)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 text-right font-semibold">السنة</th>
                    <th className="p-3 text-right font-semibold">القسط السنوي</th>
                    <th className="p-3 text-right font-semibold">أصل الدين</th>
                    <th className="p-3 text-right font-semibold">الفائدة</th>
                    <th className="p-3 text-right font-semibold">المتبقي</th>
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map((row) => (
                    <tr key={row.year} className="border-t border-gray-50">
                      <td className="p-2.5 text-center">{row.year}</td>
                      <td className="p-2.5">{fmt(row.payment)}</td>
                      <td className="p-2.5">{fmt(row.principal)}</td>
                      <td className="p-2.5">{fmt(row.interest)}</td>
                      <td className="p-2.5 font-semibold">{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
