"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "كيف أحسب عمري بالهجري والميلادي؟", answer: "أدخل تاريخ ميلادك الميلادي في الحاسبة (اليوم، الشهر، السنة) واضغط احسب. ستحصل على عمرك بالسنوات والأشهر والأيام بالتقويم الميلادي. لتحويله للهجري، استخدم محول التاريخ في أدواتك (تحويل هجري ↔ ميلادي)." },
  { question: "ما هي الأبراج الفلكية الـ 12؟", answer: "الحمل 21/3-19/4، الثور 20/4-20/5، الجوزاء 21/5-20/6، السرطان 21/6-22/7، الأسد 23/7-22/8، العذراء 23/8-22/9، الميزان 23/9-22/10، العقرب 23/10-21/11، القوس 22/11-21/12، الجدي 22/12-19/1، الدلو 20/1-18/2، الحوت 19/2-20/3." },
  { question: "هل البرج يؤثر على الشخصية؟", answer: "لا يوجد دليل علمي يثبت تأثير الأبراج على الشخصية. هي معتقدات شعبية قديمة تعود للحضارات البابلية واليونانية. علم النفس الحديث لا يعترف بالأبراج كمؤشر للشخصية. استمتع بها كتسلية فقط." },
  { question: "كم يوم عشت في حياتي؟", answer: "حاسبة العمر تحسب إجمالي الأيام التي عشتها منذ ميلادك حتى اليوم. هذا الرقم مذهل — شخص عمره 30 سنة عاش أكثر من 10,950 يوماً. كل يوم فرصة لإنجاز شيء جديد." },
  { question: "ما الفرق بين حساب العمر بالهجري والميلادي؟", answer: "العمر بالهجري أكبر دائماً لأن السنة الهجرية أقصر (354 يوم). مثال: شخص عمره 30 سنة ميلادية ≈ 31 سنة هجرية. الفرق سنة كاملة كل 33 سنة. استخدم محول التاريخ للتحويل بين النظامين." },
  { question: "هل يمكن حساب العمر بدقة للأطفال؟", answer: "نعم، حاسبة العمر تحسب العمر بدقة للأطفال أيضاً — بالسنوات والأشهر والأيام. مفيدة لمتابعة نمو الأطفال ومعرفة توقيت التطعيمات والأحداث المهمة." },
  { question: "لماذا معرفة العمر مهمة؟", answer: "لتحديد السن القانوني للزواج، العمل، التقاعد، شراء التبغ والكحول. للمعاملات الطبية (جرعات الأدوية). للقبول في المدارس والجامعات. للحصول على تأمين صحي وسفر." },
  { question: "ما الفرق بين العمر الزمني والعمر البيولوجي؟", answer: "العمر الزمني = عدد السنوات منذ ميلادك. العمر البيولوجي = عمر خلاياك وأعضائك الفعلي. يمكن أن يكون العمر البيولوجي أقل من الزمني إذا كنت بصحة جيدة، أو أعلى إذا كنت تعاني من أمراض. نمط الحياة الصحي يبطئ الشيخوخة البيولوجية." },
  { question: "كيف أحسب عمري بالهجري من ميلادي؟", answer: "حوّل تاريخ ميلادك الميلادي لهجري باستخدام محول التاريخ (تحويل هجري ↔ ميلادي). ثم احسب الفرق بين السنة الهجرية الحالية وسنة ميلادك الهجرية. أو استخدم المعادمة: العمر الهجري ≈ العمر الميلادي × 1.03." },
  { question: "هل يمكن حساب العمر بالثواني؟", answer: "نعم، العمر بالثواني = إجمالي الأيام × 86,400. شخص عمره 30 سنة (10,950 يوم) ≈ 946,080,000 ثانية. كل ثانية ثمينة — استغلها في شيء مفيد." },
  { question: "ما هو تاريخ ميلادي القادم؟", answer: "بعد حساب عمرك، تعرف تاريخ ميلادك القادم. إذا عيد ميلادك قريب، ستحتفل بعمر جديد. كل عام وأنت بخير!" },
  { question: "هل تحسب الحاسبة العمر بالهجري؟", answer: "حاسبة العمر تحسب العمر بالميلادي. لتحصل على العمر الهجري بدقة، استخدم تحويل التاريخ أولاً لتحويل تاريخ ميلادك لهجري، ثم احسب العمر من السنة الهجرية." },
];

const relatedTools = [
  { title: "تحويل هجري ميلادي", icon: "📅", href: "/tools/hijri-converter" },
  { title: "مواقيت الصلاة", icon: "🕐", href: "/tools/prayer-times" },
  { title: "حاسبة الزكاة", icon: "🕌", href: "/tools/zakat-calculator" },
  { title: "ساعة إيقاف ومؤقت", icon: "⏱️", href: "/tools/stopwatch" },
  { title: "عداد الكلمات", icon: "📝", href: "/tools/word-counter" },
  { title: "مولد أسماء", icon: "👤", href: "/tools/name-generator" },
];

const seoContent = [
  "حاسبة العمر تحسب عمرك بدقة بالسنوات والأشهر والأيام وعدد الأيام الكلي الذي عشته. أدخل تاريخ ميلادك (اليوم، الشهر، السنة) واضغط احسب لتعرف عمرك الحقيقي بالتقويم الميلادي.",
  "معرفة العمر مهمة للكثير من الأمور: التقديم على وظائف، الزواج، السفر، الالتحاق بالدراسة، المعاملات البنكية، التأمين الصحي، وحتى التبرع بالدم. كل هذه تحتاج تاريخ ميلاد دقيق.",
  "حاسبتنا تعرض أيضاً برجك الفلكي بناءً على تاريخ ميلادك. الأبراج الـ 12 مرتبطة بتواريخ محددة من السنة. معرفة برجك قد تكون مفيدة كتسلية أو للتحدث مع الأصدقاء.",
  "العمر يحسب بالسنوات الكاملة من يوم الميلاد — يعني لو عيد ميلادك النهاردة، بالضبط بعد 365 يوم يكون عمرك سنة زيادة. الحاسبة تحسب بالسنوات والأشهر والأيام بدقة.",
  "مثال: شخص مولود في 15 مارس 1990. في 31 مايو 2026: عمره 36 سنة وشهرين و16 يوماً. إجمالي الأيام = 13,228 يوماً. هذا الرقم يذكرك بقيمة كل يوم في حياتك.",
  "نصيحة: استخدم حاسبة العمر لمقارنة أعمار أفراد عائلتك، أو لحساب فارق العمر بينك وبين شريك حياتك، أو لحساب عمر طفلك بدقة لمعرفة تطوره الطبيعي حسب العمر."
];

export default function AgeCalculator() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [result, setResult] = useState<any>(null);

  const getSign = (m: number, d: number) => {
    const signs = ["الجدي", "الدلو", "الحوت", "الحمل", "الثور", "الجوزاء", "السرطان", "الأسد", "العذراء", "الميزان", "العقرب", "القوس"];
    const limits = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];
    return d <= limits[m - 1] ? signs[m - 1] : signs[m % 12];
  };

  const calculate = () => {
    const y = parseFloat(year), m = parseFloat(month), d = parseFloat(day);
    if (!y || !m || !d) return;
    const birth = new Date(y, m - 1, d);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += 30; }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    setResult({ years, months, days, totalDays, sign: getSign(m, d) });
  };

  const schemaName = "حاسبة العمر";
const schemaDesc = `Online حاسبة العمر - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/age-calculator";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "حاسبة العمر", url: "https://adwatak.cloud/tools/age-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="أدوات إسلامية" categorySlug="islamic" toolName="حاسبة العمر" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🎂 حاسبة العمر</h1>
        <p className="text-sm text-gray-500 mb-6">احسب عمرك بالسنوات والأشهر والأيام ومعرفة برجك</p>
        {[
          { label: "سنة الميلاد (ميلادي)", val: year, set: setYear, ph: "1990" },
          { label: "شهر الميلاد", val: month, set: setMonth, ph: "1" },
          { label: "يوم الميلاد", val: day, set: setDay, ph: "1" },
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
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
            <p className="text-xs text-gray-500">سنوات</p>
            <p className="text-xl font-extrabold text-gray-900">{result.years} <span className="text-xs">سنة</span></p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
            <p className="text-xs text-gray-500">أشهر</p>
            <p className="text-xl font-extrabold text-gray-900">{result.months} <span className="text-xs">شهر</span></p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
            <p className="text-xs text-gray-500">أيام</p>
            <p className="text-xl font-extrabold text-gray-900">{result.days} <span className="text-xs">يوم</span></p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-300">
            <p className="text-xs text-yellow-700">البرج</p>
            <p className="text-xl font-extrabold text-yellow-900">{result.sign}</p>
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
