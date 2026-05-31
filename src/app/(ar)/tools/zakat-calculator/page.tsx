"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";

const faqs = [
  { question: "ما هي الزكاة واجبة على ماذا؟", answer: "الزكاة واجبة على: المال النقدي، الذهب والفضة، الأسهم والاستثمارات، أرباح التجارة، والعقارات المؤجرة (زكاة العائد فقط). الزكاة ركن من أركان الإسلام الخمسة وتجب في الأموال النامية التي بلغت النصاب وحال عليها الحول الهجري." },
  { question: "ما هو نصاب الزكاة؟", answer: "85 جرام ذهب خالص عيار 24 أو 595 جرام فضة خالصة. إذا امتلكت هذا المقدار أو أكثر من المال المدخر وحال عليه الحول الهجري (سنة كاملة)، تلزمك الزكاة بنسبة 2.5% (ربع العشر). يمكنك استخدام حاسبتنا لمعرفة قيمة النصاب بالريال حسب سعر الذهب اليوم." },
  { question: "هل الزكاة على الراتب الشهري؟", answer: "ليس فورياً. الراتب الشهري لا تزكى بمجرد قبضه. احفظ الرواتب المجمعة في حسابك، وإذا بلغ المبلغ الإجمالي المحتفظ به النصاب (85 جرام ذهب) ومر عليه سنة هجرية كاملة — أخرج زكاته 2.5%. نفس القاعدة تنطبق على المكافآت والعلاوات." },
  { question: "هل تجب الزكاة على الأسهم؟", answer: "نعم، تجب الزكاة على الأسهم. الخلاف بين العلماء: الرأي الأغلب أنها تُزكى بقيمتها السوقية كاملة بنسبة 2.5% إذا حال الحول. وقيل تُزكى أرباحها فقط. الاحوط إخراج 2.5% من القيمة السوقية للأسهم التي تملكها وتحديد حول زكوي لها." },
  { question: "هل أدفع الزكاة على ذهب الزينة؟", answer: "هذه مسألة خلافية بين الفقهاء: الحنابلة يرون وجوب الزكاة على ذهب الزينة إذا بلغ النصاب وحال عليه الحول. الجمهور (الحنفية والمالكية والشافعية) يرون أنها لا تجب على الذهب المعد للاستعمال الشخصي. الأحوط إخراجها خروجاً من الخلاف." },
  { question: "هل تجب الزكاة على العقارات؟", answer: "العقار المملوك للسكن لا زكاة فيه. العقارات المؤجرة تجب فيها زكاة العائد (الإيجار) إذا بلغ النصاب وحال عليه الحول. العقارات المعدة للبيع (عروض تجارة) تُزكى كاملة بقيمتها السوقية بنسبة 2.5%." },
  { question: "كيف أحسب زكاة الذهب بالجرامات؟", answer: "إذا كان عندك 200 جرام ذهب عيار 21: أولاً حول النصاب = 85 جرام عيار 24. الذهب عيار 21 نقاوته 87.5%. 200 جرام عيار 21 = 175 جرام عيار 24. هذا يزيد عن 85 جرام. الزكاة = 175 جرام × سعر جرام الذهب اليوم × 2.5%." },
  { question: "متى يكون إخراج الزكاة؟", answer: "تجب الزكاة فوراً بعد مرور الحول الهجري على المال الذي بلغ النصاب. الأفضل إخراجها في رمضان لفضل الشهر وتعظيم الأجر. لكن يمكن تعجيلها قبل الحول أو تأخيرها لعذر. الأهم هو إخراجها بنية خالصة لله." },
  { question: "لمن تعطى الزكاة؟", answer: "ثمانية أصناف ذكرهم الله في سورة التوبة (60): الفقراء، المساكين، العاملين على الزكاة، المؤلفة قلوبهم، في الرقاب، الغارمين (المدينين)، في سبيل الله، وابن السبيل (المسافر المنقطع). أفضلهم الأقربون المحتاجون." },
  { question: "هل الزكاة تنقص المال؟", answer: "لا، بل تباركه وتزيده. قال النبي ﷺ: 'ما نقصت صدقة من مال'. الزكاة تطهر المال وتنمي البركة فيه. اقتصادياً، توزيع الزكاة ينشط الاقتصاد ويساعد المحتاجين على أن يصبحوا منتجين." },
  { question: "ما الفرق بين زكاة المال وزكاة الفطر؟", answer: "زكاة المال فريضة على المال المدخر إذا بلغ النصاب. زكاة الفطر فريضة على كل مسلم قبل صلاة عيد الفطر مقدارها صاع من طعام (حوالي 2.5 كجم أرز). لكل منهما أحكام مختلفة. حاسبتنا تحسب زكاة المال فقط." },
  { question: "هل تجب الزكاة على حسابات التوفير؟", answer: "نعم، حسابات التوفير والودائع البنكية تجب فيها الزكاة بنسبة 2.5% إذا بلغ مجموعها النصاب ومر عليها الحول. هذا يشمل الودائع لأجل وحسابات السوق النقدي. الفوائد البنكية (إن وجدت) لا تُزكى لأنها حرام، لكن الأصل نفسه تُزكى." },
  { question: "هل تجب الزكاة على الصناديق الاستثمارية؟", answer: "نعم، الصناديق الاستثمارية بأنواعها المختلفة تجب فيها الزكاة. إذا كان الصندوق يديره جهة شرعية، قد يخرج الزكاة نيابة عنك. إذا لم يفعل، احسب قيمة استثمارك في تاريخ حولك الزكوي وأخرج 2.5%." },
  { question: "ماذا عن زكاة الديون المستحقة لي؟", answer: "الدين الذي تستحقه على غيرك: إذا كان الدين على مليء (قادر على السداد)، تزكيه مع مالك كل عام. إذا كان على معسر (لا تستطيع تحصيله بسهولة)، لا زكاة فيه حتى تقبضه ثم تزكيه لعام واحد فقط." },
];

const relatedTools = [
  { title: "حاسبة الميراث", icon: "📜", href: "/tools/inheritance-calculator" },
  { title: "حاسبة الذهب", icon: "🥇", href: "/tools/gold-calculator" },
  { title: "محول العملات", icon: "💱", href: "/tools/currency-converter" },
  { title: "حاسبة الراتب الصافي", icon: "💵", href: "/tools/salary-calculator" },
  { title: "حاسبة القرض العقاري", icon: "🏠", href: "/tools/mortgage-calculator" },
  { title: "حاسبة العمر", icon: "🎂", href: "/tools/age-calculator" },
];

const seoContent = [
  "حاسبة الزكاة تساعدك على حساب الزكاة الواجبة على أموالك بدقة وسهولة. الزكاة هي الركن الثالث من أركان الإسلام وفرض على كل مسلم يمتلك مالاً بلغ النصاب (ما يعادل 85 جرام ذهب أو 595 جرام فضة) وحال عليه الحول الهجري. حاسبتنا تدعم أنواع متعددة من الأموال: النقدي، الذهب، الأسهم، الاستثمارات.",
  "نسبة الزكاة في الأموال النقدية هي 2.5% (ربع العشر). مثلاً: لو عندك 100,000 ريال في حسابك البنكي، وحال عليها الحول — زكاتك = 2,500 ريال. زكاتك تخرج للفقراء والمساكين والأصناف الثمانية التي ذكرها الله في القرآن (سورة التوبة: 60).",
  "لمعرفة إذا كان مالك بلغ النصاب: احسب سعر 85 جرام ذهب عيار 24 في السوق اليوم. لو سعر الجرام 350 ريال مثلاً، النصاب = 85 × 350 = 29,750 ريال. إذا كان مجموع مدخراتك يزيد عن هذا المبلغ — مالك بلغ النصاب وتجب فيه الزكاة إذا مر عليه سنة كاملة.",
  "حاسبتنا تدعم 3 أنواع من الأصول: المال النقدي (حسابات جارية وتوفير، رواتب مدخرة)، الذهب (بسعر السوق الحالي شامل العيار)، والأسهم والاستثمارات (القيمة السوقية الحالية). أدخل القيم بالريال السعودي أو ما يعادلها بعملتك المحلية.",
  "نصيحة مهمة: حدد تاريخاً ثابتاً في السنة لزكاتك (مثلاً أول رمضان كل عام) واستخدم حاسبتنا في نفس التاريخ لتحديث أرقامك. احتفظ بسجل لزكاتك لتعرف كم أخرجت كل عام. الأفضل إخراجها بنفسك للفقراء المحتاجين في محيطك.",
  "الفرق بين زكاة المال وزكاة الفطر: زكاة المال واجبة على المال المدخر وتخرج طوال العام بنسبة 2.5% إذا بلغ النصاب وحال الحول. زكاة الفطر واجبة على كل مسلم قبل صلاة العيد ومقدارها صاع من طعام (حوالي 2.5 كجم). حاسبة الزكاة هنا تحسب زكاة المال فقط.",
  "شروط وجوب الزكاة: الإسلام، الحرية، الملك التام للمال، بلوغ النصاب (85 جرام ذهب)، مرور الحول الهجري على المال (سنة قمرية كاملة). إذا استوفيت كل هذه الشروط — الزكاة واجبة عليك فوراً ولا يجوز تأخيرها بدون عذر.",
  "زكاة الأسهم: الرأي الراجح أن أسهم الشركات تُزكى بقيمتها السوقية بنسبة 2.5% عند حولك الزكوي. بعض الشركات تعلن عن زكاتها لكل سهم — يمكنك اعتماد ذلك. إذا كانت أسهم مضاربة قصيرة الأجل، تخرج الزكاة من أرباحها أيضاً."
];

export default function ZakatCalculator() {
  const [cash, setCash] = useState("");
  const [gold, setGold] = useState("");
  const [shares, setShares] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const c = parseFloat(cash) || 0;
    const g = parseFloat(gold) || 0;
    const s = parseFloat(shares) || 0;
    const total = c + g + s;
    setResult({ total, zakat: total * 0.025 });
  };

  const schemaName = "حاسبة الزكاة";
const schemaDesc = `Online حاسبة الزكاة - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/zakat-calculator";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "حاسبة الزكاة", url: "https://adwatak.cloud/tools/zakat-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="أدوات إسلامية" categorySlug="islamic" toolName="حاسبة الزكاة" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🕌 حاسبة الزكاة</h1>
        <p className="text-sm text-gray-500 mb-6">احسب زكاة المال والذهب والأسهم</p>
        {[
          { label: "المال النقدي (ريال)", val: cash, set: setCash, ph: "50,000" },
          { label: "قيمة الذهب (ريال)", val: gold, set: setGold, ph: "25,000" },
          { label: "قيمة الأسهم (ريال)", val: shares, set: setShares, ph: "10,000" },
        ].map((f, i) => (
          <div key={i} className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.label}</label>
            <input type="number" value={f.val} onChange={(e) => f.set(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder={f.ph} />
          </div>
        ))}
        <button onClick={calculate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          احسب الزكاة
        </button>
      </div>
      {result && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
            <p className="text-xs text-green-600 mb-1">إجمالي الأموال</p>
            <p className="text-xl font-extrabold text-green-900">{result.total.toLocaleString("ar-SA")} <span className="text-xs">ر.س</span></p>
          </div>
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">الزكاة الواجبة (2.5%)</p>
            <p className="text-xl font-extrabold text-blue-900">{result.zakat.toLocaleString("ar-SA")} <span className="text-xs">ر.س</span></p>
          </div>
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    </div>
  );
}
