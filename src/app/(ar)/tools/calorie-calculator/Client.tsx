"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "كم سعرة حرارية أحتاج يومياً؟", answer: "للحفاظ على الوزن: النساء قليلات الحركة ~1,800-2,000، النشطات ~2,200-2,400. الرجال قليلو الحركة ~2,200-2,400، النشطون ~2,600-2,800. لخسارة الوزن: اطرح 300-500 سعرة يومياً. لا تقل عن 1,200 (نساء) أو 1,500 (رجال) بدون إشراف طبي." },
  { question: "ما هو BMR؟", answer: "معدل الأيض الأساسي — السعرات التي يحرقها جسمك في الراحة للحفاظ على الحياة (التنفس، القلب، الدماغ، إصلاح الخلايا). BMR يمثل 60-75% من إجمالي السعرات اليومية. حاسبتنا تستخدم معادلة Mifflin-St Jeor الأدق لمعظم الناس." },
  { question: "ما العوامل التي تؤثر على السعرات اليومية؟", answer: "العمر (يقل مع التقدم في السن)، الجنس (الرجال يحتاجون أكثر)، الوزن (الأثقل = أكثر)، الطول (الأطول = أكثر)، الكتلة العضلية (العضل يحرق 6 سعرات/رطل/يوم مقابل 2 للدهون)، مستوى النشاط، والجينات. كلها مدمجة في الحاسبة." },
  { question: "كيف أخسر الوزن بعد السعرات؟", answer: "أنشئ عجز 300-500 سعرة/يوم. كل البروتين (25-30غ لكل وجبة)، الألياف (25-35غ/يوم)، والأطعمة الكاملة. لا تأكل سعرات التمارين — أجهزة التتبع تبالغ 20-50%. الخسارة المستدامة: 0.5-1 كيلو/أسبوع." },
  { question: "ما هو أفضل توزيع للمغذيات الكبرى؟", answer: "العام: 45-65% كربوهيدرات، 10-35% بروتين، 20-35% دهون. لخسارة الوزن: 40% بروتين، 30% كربوهيدرات، 30% دهون. للرياضيين: 25% بروتين، 55% كربوهيدرات، 20% دهون. عدّل حسب أهدافك." },
  { question: "ما الفرق بين BMR و TDEE؟", answer: "BMR = السعرات في الراحة الكاملة. TDEE (إجمالي الإنفاق اليومي) = BMR + النشاط + الهضم. TDEE هو ما تحفعلياً في اليوم. اضرب BMR في 1. (قليل الحركة) إلى 1.9 (نشط جداً)." },
  { question: "هل أأكل أقل في أيام الراحة؟", answer: "نعم — في أيام الراحة كل للحفاظ (وليس عجز)، أو 200-300 أقل. في أيام التدريب كل أكثر حول التمارين. هذا 'تدوير السعرات' يحسن الالتزام والأداء." },
];

const relatedTools = [
  { title: "حاسبة مؤشر كتلة الجسم", icon: "⚖️", href: "/tools/bmi-calculator" },
  { title: "حاسبة العمر", icon: "🎂", href: "/tools/age-calculator" },
  { title: "حاسبة الفائدة المركبة", icon: "📈", href: "/tools/compound-interest" },
  { title: "محوّل الوحدات", icon: "📏", href: "/tools/unit-converter" },
];

const seoContent = [
  "حاسبة السعرات الحرارية المجانية تقدر احتياجاتك اليومية بناءً على العمر والجنس والطول والوزن ومستوى النشاط. تستخدم معادلة Mifflin-St Jeor — أدق معادلة BMR للسكان العامين.",
  "كيف تعمل: نحسب BMR (السعرات في الراحة) ثم نضرب في معامل النشاط. مثال: أنثى 30 سنة، 165 سم، 65 كجم، نشاط خفيف: 2,025 سعرة/يوم للحفاظ. لخسارة 0.5 كيلو/أسبوع: 1,525 سعرة/يوم.",
  "مستويات النشاط: قليل حركة (مكتب، بدون رياضة) × 1.2. خفيف (1-3 أيام/أسبوع) × 1.375. متوسط (3-5 أيام) × 1.55. نشط جداً (6-7 أيام) × 1.725. إضافي (عمل بدني + تدريب يومي) × 1.9.",
  "السعرات جزء من المعادلة. جودة الطعام، البروتين، توقيت الوجبات، النوم (7-9 ساعات)، وإدارة التوتر كلها تؤثر على تركيب الجسم. استخدم الحاسبة كنقطة بداية وعدّل حسب نتائجك الفعلية.",
];

export default function Client() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("75");
  const [height, setHeight] = useState("175");
  const [activity, setActivity] = useState("1.375");
  const [goal, setGoal] = useState<"lose" | "maintain" | "gain">("maintain");
  const [result, setResult] = useState<{ bmr: number; tdee: number; target: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(age), w = parseFloat(weight), h = parseFloat(height), act = parseFloat(activity);
    if (!a || !w || !h) return;
    const bmr = sex === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * act;
    const adjust = goal === "lose" ? -500 : goal === "gain" ? 300 : 0;
    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee), target: Math.round(tdee + adjust) });
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("حاسبة السعرات الحرارية", "احسب احتياجاتك اليومية من السعرات الحرارية — لخسارة الوزن أو الحفاظ أو بناء العضلات", "https://adwatak.cloud/tools/calorie-calculator", "ar", "Health")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([
        { name: "الرئيسية", url: "https://adwatak.cloud" },
        { name: "أدوات أخرى", url: "https://adwatak.cloud/category/daily" },
        { name: "حاسبة السعرات الحرارية", url: "https://adwatak.cloud/tools/calorie-calculator" },
      ])} />
      <Breadcrumb category="أدوات أخرى" categorySlug="daily" toolName="حاسبة السعرات الحرارية" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔥 حاسبة السعرات الحرارية</h1>
        <p className="text-sm text-gray-500 mb-6">احسب احتياجاتك اليومية من السعرات الحرارية لخسارة الوزن أو الحفاظ عليه أو بناء العضلات</p>

        <div className="flex gap-2 mb-4">
          {(["male", "female"] as const).map((s) => (
            <button key={s} onClick={() => setSex(s)} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${sex === s ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
              {s === "male" ? "♂ ذكر" : "♀ أنثى"}
            </button>
          ))}
        </div>

        {[{ l: "العمر", v: age, s: setAge, p: "30" }, { l: "الوزن (كجم)", v: weight, s: setWeight, p: "75" }, { l: "الطول (سم)", v: height, s: setHeight, p: "175" }].map((f, i) => (
          <div key={i} className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.l}</label>
            <input type="number" value={f.v} onChange={(e) => f.s(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder={f.p} />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">مستوى النشاط</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none bg-white">
            <option value="1.2">قليل الحركة (مكتب، بدون رياضة)</option>
            <option value="1.375">خفيف (1-3 أيام/أسبوع)</option>
            <option value="1.55">متوسط (3-5 أيام/أسبوع)</option>
            <option value="1.725">نشط جداً (6-7 أيام/أسبوع)</option>
            <option value="1.9">إضافي (عمل بدني + تدريب يومي)</option>
          </select>
        </div>

        <div className="flex gap-2 mb-4">
          {([{ k: "lose", l: "خسارة الوزن" }, { k: "maintain", l: "الحفاظ" }, { k: "gain", l: "بناء العضلات" }] as const).map((g) => (
            <button key={g.k} onClick={() => setGoal(g.k)} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${goal === g.k ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>{g.l}</button>
          ))}
        </div>

        <button onClick={calculate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">احسب</button>
      </div>

      {result && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">BMR</p>
            <p className="text-xl font-extrabold text-blue-900">{result.bmr}</p>
            <p className="text-[10px] text-blue-400">سعرة/يوم</p>
          </div>
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
            <p className="text-xs text-green-600 mb-1">TDEE</p>
            <p className="text-xl font-extrabold text-green-900">{result.tdee}</p>
            <p className="text-[10px] text-green-400">سعرة/يوم</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-5 text-center border border-yellow-300">
            <p className="text-xs text-yellow-700 mb-1">{goal === "lose" ? "المستهدف (عجز)" : goal === "gain" ? "المستهدف (فائض)" : "المستهدف"}</p>
            <p className="text-xl font-extrabold text-yellow-900">{result.target}</p>
            <p className="text-[10px] text-yellow-600">سعرة/يوم</p>
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
