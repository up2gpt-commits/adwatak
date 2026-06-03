"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما هي الفائدة المركبة؟", answer: "الفائدة المركبة هي الفائدة التي تُحسب على المبلغ الأصلي مضافاً إليها الفوائد المتراكمة من الفترات السابقة — يعني 'فائدة على فائدة'. مع الوقت، ينمو المال بشكل أسي (exponential) بدلاً من خطي (linear). ألبرت أينشتاين وصفها بأنها 'الأعجوبة الثامنة في العالم'." },
  { question: "ما الفرق بين الفائدة البسيطة والمركبة؟", answer: "الفائدة البسيطة تُحسب على المبلغ الأصلي فقط طوال المدة. الفائدة المركبة تُحسب على المبلغ الأصلي + الفوائد المتراكمة. مثال: 10,000 ريال بعائد 10% لمدة 5 سنوات → البسيطة: 15,000 فقط (+5,000). المركبة: 16,105 (+6,105). الفرق: 1,105 ريال زيادة فقط لأن الفائدة تُركب." },
  { question: "ما هي قاعدة 72؟", answer: "قاعدة سريعة لمعرفة كم سنة تحتاج لمضاعفة مالك: اقسم 72 على نسبة العائد السنوي. مثال: عائد 8% → 72 ÷ 8 = 9 سنوات. عائد 12% → 6 سنوات. عائد 5% → 14.4 سنة. كلما زاد العائد، قلّت مدة المضاعفة." },
  { question: "هل الفائدة المركبة حلال في الإسلام؟", answer: "الفائدة على القروض والودائع البنكية (ربوية) حرام. لكن العائد على الاستثمارات الحلال — أسهم شركات حلال، عقار، تجارة — حلال حتى لو كان مركباً. الفرق أن الاستثمار الحقيقي فيه مخاطرة ومشاركة في الربح والخسارة، بينما فائدة البنك مضمونة بدون جهد." },
  { question: "كيف أحقق أقصى استفادة من الفائدة المركبة؟", answer: "1) ابدأ مبكراً — 10 سنوات فرق في البداية تعني مئات الآلاف في النهاية. 2) استمر في الإضافة الشهرية — حتى 500 ريال شهرياً تصنع فرقاً كبيراً. 3) لا تسحب الأرباح — دعها تتراكم. 4) اختر استثمارات بعائد جيد (7-12% سنوياً). 5) الصبر — الفائدة المركبة تحتاج وقت." },
  { question: "كم الفرق بين 20 سنة استثمار و 30 سنة؟", answer: "ضخم جداً. استثمار 1,000 ريال شهرياً بعائد 8%: بعد 20 سنة = 587,000 ريال. بعد 30 سنة = 1,490,000 ريال. الفرق 10 سنين فقط → أكثر من ضعفين ونصف! هذا هو سحر الفائدة المركبة — السنوات الأخيرة هي الأقوى." },
  { question: "المساهمة الشهرية تؤثر إزاي على الفائدة المركبة؟", answer: "قوة هائلة. مثال: استثمار 100,000 ريال بعائد 8% لمدة 25 سنة بدون إضافة = 685,000 ريال. مع إضافة 500 ريال شهرياً = 1,168,000 ريال. مع إضافة 1,000 شهرياً = 1,650,000 ريال. الإضافة المنتظمة تضاعف النتيجة النهائية." },
  { question: "ما هو أفضل عائد متوقع للاستثمار طويل المدى؟", answer: "متوسط العائد التاريخي: الأسهم الأمريكية (S&P 500) ≈ 10% سنوياً قبل التضخم (7% بعد التضخم). العقار في السعودية ≈ 5-8%. صناديق الاستثمار المتنوعة ≈ 6-8%. الودائع البنكية ≈ 3-5%. كلما زاد العائد المتوقع، زادت المخاطرة." },
  { question: "هل التضخم يقتل الفائدة المركبة؟", answer: "التضخم يقلل القوة الشرائية للعائد. الفائدة الحقيقية = العائد الاسمي - التضخم. إذا عائدك 8% والتضخم 3% → عائد حقيقي 5%. لهذا السبب الاستثمار في الودائع البنكية بعائد 3% لا ينمي ثروتك فعلياً إذا التضخم 3%. اختر استثمارات بعائد أعلى من التضخم." },
  { question: "كم مرة تُركب الفائدة سنوياً؟", answer: "كلما زاد التكرار، زاد العائد النهائي. سنة: مرة واحدة سنوياً. نصف سنة: مرتين. ربع سنوي: 4 مرات. شهري: 12 مرة. يومي: 365 مرة. الفرق بين المركب سنوياً وشهرياً على 100,000 بعائد 8% لمدة 20 سنة ≈ 20,000 ريال زيادة." },
  { question: "هل تنطبق الفائدة المركبة على القروض؟", answer: "نعم، وهذا هو الجانب السلبي. القروض ذات الفائدة المركبة (بطاقات الائتمان، بعض القروض الشخصية) تتراكم الفائدة على الرصيد المتبقي. إذا لم تسدد قسط بطاقة الائتمان كاملاً، تتراكم الفائدة يومياً ويمكن أن تصل لأضعاف المبلغ الأصلي." },
  { question: "كيف أحمي نفسي من الفائدة المركبة السلبية؟", answer: "1) سدد رصيد بطاقة الائتمان كاملاً كل شهر (الفائدة 18-30% سنوياً مركبة يومياً). 2) اختر قروضاً بفائدة ثابتة متناقصة بدلاً من المركبة. 3) سدد القروض بأسرع وقت ممكن. 4) استخدم حاسبة الفائدة المركبة لترى الفرق بين الاستثمار والاقتراض." },
];

const relatedTools = [
  { title: "حاسبة الذهب", icon: "🥇", href: "/tools/gold-calculator" },
  { title: "حاسبة القرض الشخصي", icon: "💰", href: "/tools/loan-calculator" },
  { title: "محول العملات", icon: "💱", href: "/tools/currency-converter" },
  { title: "حاسبة الراتب الصافي", icon: "💵", href: "/tools/salary-calculator" },
  { title: "حاسبة EMI", icon: "🧮", href: "/tools/emi-calculator" },
  { title: "حاسبة هامش الربح", icon: "📈", href: "/tools/profit-margin" },
];

const seoContent = [
  "حاسبة الفائدة المركبة هي أقوى أداة مالية لتخطيط مستقبلك المالي. عندما تستثمر أموالك بعائد مركب، أرباحك تنمو بشكل أسي — هذا ما يسميه أينشتاين 'الأعجوبة الثامنة في العالم'. أدخل المبلغ الأولي، المساهمة الشهرية، العائد السنوي، وعدد السنوات لترى كيف تنمو أموالك.",
  "الفرق بين الفائدة البسيطة والمركبة هائل على المدى الطويل. استثمار 10,000 ريال بعائد 8% لمدة 30 سنة: بالفائدة البسيطة = 34,000 ريال فقط. بالفائدة المركبة = 100,626 ريال! الفرق 66,000 ريال زيادة — هذا هو سحر التركيب.",
  "قاعدة 72: أسهل طريقة لمعرفة كم سنة تحتاج لمضاعفة مالك. اقسم 72 على العائد السنوي. عائد 9% → 8 سنوات للمضاعفة. عائد 12% → 6 سنوات. عائد 6% → 12 سنة. استخدم هذ القاعدة للتخطيط السريع قبل استخدام الحاسبة التفصيلية.",
  "مثال حقيقي: شاب يبدأ استثمار 1,000 ريال شهرياً في عمر 25 سنة بعائد 8%. في عمر 35 (بعد 10 سنوات) = 183,000 ريال. في عمر 45 (20 سنة) = 587,000 ريال. في عمر 55 (30 سنة) = 1,490,000 ريال. في عمر 60 (35 سنة) = 2,282,000 ريال. الـ 5 سنين الأخيرة وحدها كسبت 792,000 ريال!",
  "البداية المبكرة أهم عامل. لو بدأت بـ 500 ريال شهرياً في عمر 25: عند 60 = 1,141,000 ريال. لو بدأت نفس المبلغ في عمر 35: عند 60 = 474,000 ريال. الفرق 10 سنين فقط في البداية = 667,000 ريال فرق. مستحيل تعوض الوقت الضائع.",
  "استخدم حاسبة الفائدة المركبة لمحاكاة سيناريوهات: مبلغ أولي كبير مع إضافة صغيرة، أو مبلغ أولي صغير مع إضافة كبيرة، أو بدون إضافة. كل سيناريو يعطي نتائج مختلفة. جرب 3 سيناريوهات قبل أن تقرر خطة الاستثمار المناسبة لك."
];

export default function Client() {
  const [principal, setPrincipal] = useState("");
  const [monthly, setMonthly] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(principal) || 0;
    const m = parseFloat(monthly) || 0;
    const r = parseFloat(rate) / 100;
    const y = parseFloat(years);
    if (y <= 0 || r <= 0) return;
    const totalMonths = y * 12;
    const monthlyRate = r / 12;
    let total = p * Math.pow(1 + r, y);
    if (m > 0) {
      total += m * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    }
    const invested = p + m * totalMonths;
    setResult({ total, interest: total - invested });
  };

  const schemaName = "حاسبة الفائدة المركبة";
const schemaDesc = `Online حاسبة الفائدة المركبة - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/compound-interest";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "الحاسبات المالية", url: "https://adwatak.cloud/category/calculators" },
  { name: "حاسبة الفائدة المركبة", url: "https://adwatak.cloud/tools/compound-interest" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb lang="ar" category="الحاسبات المالية" categorySlug="calculators" toolName="حاسبة الفائدة المركبة" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📈 حاسبة الفائدة المركبة</h1>
        <p className="text-sm text-gray-500 mb-6">احسب عائد استثمارك مع الفائدة المركبة والمساهمات الشهرية</p>
        {[
          { label: "المبلغ الأولي (ريال)", val: principal, set: setPrincipal, ph: "10,000" },
          { label: "المساهمة الشهرية (ريال)", val: monthly, set: setMonthly, ph: "500" },
          { label: "نسبة العائد السنوي (%)", val: rate, set: setRate, ph: "7" },
          { label: "عدد السنوات", val: years, set: setYears, ph: "10" },
        ].map((f, i) => (
          <div key={i} className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.label}</label>
            <input type="number" value={f.val} onChange={(e) => f.set(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder={f.ph} />
          </div>
        ))}
        <button onClick={calculate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          احسب
        </button>
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
            <p className="text-xs text-green-600 mb-1">المبلغ النهائي</p>
            <p className="text-xl font-extrabold text-green-900">{result.total.toLocaleString("ar-SA", { maximumFractionDigits: 2 })} <span className="text-xs">ر.س</span></p>
          </div>
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">أرباح الفائدة</p>
            <p className="text-xl font-extrabold text-blue-900">{result.interest.toLocaleString("ar-SA", { maximumFractionDigits: 2 })} <span className="text-xs">ر.س</span></p>
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
