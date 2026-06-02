"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما هو التقويم الهجري؟", answer: "التقويم الهجري هو التقويم الإسلامي القمري الذي يبدأ من هجرة النبي محمد ﷺ من مكة إلى المدينة عام 622 ميلادي. يتكون من 12 شهراً قمرياً و354 أو 355 يوماً. يُستخدم رسمياً في السعودية للمعاملات الحكومية والمناسبات الدينية." },
  { question: "ما هي الأشهر الهجرية؟", answer: "محرم، صفر، ربيع الأول، ربيع الثاني، جمادى الأولى، جمادى الآخرة، رجب، شعبان، رمضان، شوال، ذو القعدة، ذو الحجة. الأشهر الحرم: محرم، رجب، ذو القعدة، ذو الحجة." },
  { question: "لماذا التاريخ الهجري يتقدم كل سنة؟", answer: "السنة الهجرية أقصر بـ 11 يوم من الميلادية (354 vs 365 يوماً). فتتقدم حوالي 11 يوم سنوياً. مثلاً رمضان 1446 كان في مارس 2025، ورمضان 1447 سيكون في فبراير 2026." },
  { question: "هل السعودية تستخدم التقويم الهجري رسمياً؟", answer: "نعم، في المعاملات الحكومية (الرواتب، العقود الحكومية، التأشيرات) يُستخدم التقويم الهجري. القطاع الخاص غالباً يستخدم الميلادي. تقويم أم القرى هو المرجع الرسمي في السعودية." },
  { question: "ما هو تقويم أم القرى؟", answer: "تقويم أم القرى هو التقويم الرسمي في السعودية يعتمد على الحساب الفلكي الدقيق لتحديد بدايات الشهور الهجرية. طورته المملكة منذ عام 1346 هـ ويعتمد على معايير فلكية مثل إمكانية رؤية الهلال." },
  { question: "كيف أحسب عمري بالهجري؟", answer: "اطرح سنة ميلادك الهجرية من السنة الهجرية الحالية. لكن أسهل طريقة: استخدم حاسبة العمر في أدواتك — أدخل تاريخ ميلادك وستحصل على عمرك بالهجري والميلادي فوراً." },
  { question: "ما الفرق بين السنة الهجرية والميلادية في الأيام؟", answer: "السنة الهجرية 354-355 يوماً (12 دورة قمرية كاملة). السنة الميلادية 365-366 يوماً (دورة الأرض حول الشمس). الفرق ≈ 11 يوم سنوياً، وكل 33 سنة تتقدم الهجرية سنة كاملة عن الميلادية." },
  { question: "هل الأشهر الهجرية كلها 29 أو 30 يوم؟", answer: "نعم، الشهر القمري إما 29 أو 30 يوماً حسب رؤية الهلال. لا يوجد شهر 28 أو 31 يوم في التقويم الهجري. هذا يختلف عن التقويم الميلادي الذي فيه شهور 28، 30، 31 يوم." },
  { question: "كيف يتم تحديد بداية شهر رمضان؟", answer: "يعتمد على رؤية الهلال بعد غروب شمس اليوم 29 من شعبان. إذا رؤي الهلال — اليوم التالي هو أول رمضان. إذا لم يُرَ — يكمل شعبان 30 يوماً. في السعودية، المحكمة العليا هي المسؤولة عن إعلان ثبوت الرؤية." },
  { question: "هل تحويل التاريخ مهم في المعاملات الرسمية؟", answer: "نعم، في السعودية، العقود الحكومية، عقود الإيجار، التأشيرات، شهادات الميلاد والوفاة، وصكوك الطلاق — كلها تستخدم التقويم الهجري. تصاريح الإقامة وتجديد الاستمارات أيضاً تعتمد على التاريخ الهجري." },
  { question: "ما الفرق بين التاريخ الهجري والإسلامي؟", answer: "التقويم الهجري هو نفسه التقويم الإسلامي — كلاهما يعتمد على الهجرة النبوية. يُسمى هجرياً نسبة للهجرة، وإسلامياً لأنه تقويم المسلمين. في إيران وأفغانستان، يُستخدم تقويم هجري شمسي مختلف قليلاً." },
  { question: "هل يمكن تحويل التاريخ الهجري بسهولة؟", answer: "نعم، باستخدام أداة تحويل التاريخ في أدواتك. اختر الاتجاه (هجري → ميلادي أو العكس)، أدخل اليوم والشهر والسنة، واضغط حوّل. النتيجة تظهر فوراً. يمكنك تحويل أي تاريخ بين 1300 هـ و1500 هـ." },
];

const relatedTools = [
  { title: "حاسبة العمر", icon: "🎂", href: "/tools/age-calculator" },
  { title: "مواقيت الصلاة", icon: "🕐", href: "/tools/prayer-times" },
  { title: "حاسبة الزكاة", icon: "🕌", href: "/tools/zakat-calculator" },
  { title: "تحويل الأرقام لحروف", icon: "🔢", href: "/tools/number-to-words" },
  { title: "حاسبة الميراث", icon: "📜", href: "/tools/inheritance-calculator" },
  { title: "حاسبة الذهب", icon: "🥇", href: "/tools/gold-calculator" },
];

const seoContent = [
  "أداة تحويل التاريخ الهجري إلى الميلادي والعكس — دقيقة ومجانية بالكامل. التقويم الهجري يبدأ من هجرة النبي محمد ﷺ من مكة إلى المدينة عام 622 ميلادي. يستخدم التقويم الهجري في جميع المعاملات الرسمية والمناسبات الدينية في المملكة العربية السعودية.",
  "يتكون التقويم الهجري من 12 شهراً قمرياً: محرم، صفر، ربيع الأول، ربيع الثاني، جمادى الأولى، جمادى الآخرة، رجب، شعبان، رمضان، شوال، ذو القعدة، ذو الحجة. أربعة منها أشهر حرم: محرم، رجب، ذو القعدة، ذو الحجة — يحرم فيها القتال.",
  "الفرق بين التقويمين: السنة الهجرية 354-355 يوماً والسنة الميلادية 365-366 يوماً — فرق 11 يوم سنوياً. لهذا السبب يتقدم رمضان 11 يوم كل سنة في التقويم الميلادي. رمضان 1446 كان في مارس 2025، ورمضان 1447 سيكون في فبراير 2026.",
  "تقويم أم القرى هو المرجع الرسمي في السعودية لتحديد أشهر السنة الهجرية. يعتمد على معايير فلكية دقيقة من تطوير المملكة منذ 1346 هـ. يُستخدم في تحديد بداية الأشهر الهجرية والمناسبات الدينية والإجازات الرسمية.",
  "استخدامات عملية: تحديد مواعيد العقود الحكومية (السعودية تستخدم الهجري رسمياً)، حساب زكاة المال (تمر الحول الهجري شرط)، معرفة تواريخ المناسبات الإسلامية (رمضان، عيد الأضحى)، تحويل شهادات الميلاد والوفاة، وحساب العمر بالهجري والميلادي.",
  "حاسبتنا تدعم التحويل بين الهجري والميلادي بدقة عالية. اختر اتجاه التحويل (هجري → ميلادي أو ميلادي → هجري)، أدخل اليوم والشهر والسنة، واحصل على النتيجة فوراً. تستند الحاسبة إلى معادلات فلكية دقيقة معتمدة على تقويم أم القرى."
];

const monthNames = ["محرم","صفر","ربيع الأول","ربيع الثاني","جمادى الأولى","جمادى الآخرة","رجب","شعبان","رمضان","شوال","ذو القعدة","ذو الحجة"];

export default function Client() {
  const [mode, setMode] = useState<"h2g" | "g2h">("h2g");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("1");
  const [day, setDay] = useState("");
  const [result, setResult] = useState<any>(null);

  const toGregorian = (y: number, m: number, d: number) => {
    const jd = Math.floor((11 * y + 3) / 30) + Math.floor((m - 1) * 29.5) + d + 1948440 - 385;
    const l = jd + 68569; const n = Math.floor(4 * l / 146097);
    const l2 = l - Math.floor((146097 * n + 3) / 4);
    const i = Math.floor(4000 * (l2 + 1) / 1461001);
    const l3 = l2 - Math.floor(1461 * i / 4) + 31;
    const j = Math.floor(80 * l3 / 2447);
    const dd = l3 - Math.floor(2447 * j / 80);
    const mm = Math.floor(j / 11);
    return { y: 100 * (n - 49) + i + mm, m: mm + 2 - 12 * mm, d: dd };
  };

  const toHijri = (y: number, m: number, d: number) => {
    const a1 = Math.floor((m - 14) / 12);
    const jd1 = (1461 * (y + 4800 + a1)) / 4;
    const jd2 = (367 * (m - 2 - 12 * a1)) / 12;
    const jd3 = (3 * Math.floor((y + 4900 + a1) / 100)) / 4;
    const jd = Math.floor(jd1) + Math.floor(jd2) - Math.floor(jd3) + d - 32075;
    const l = jd - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    const l2 = l - 10631 * n + 354;
    const j1 = Math.floor((10985 - l2) / 5316);
    const j2 = Math.floor((50 * l2) / 17719);
    const j3 = Math.floor(l2 / 5670);
    const j4 = Math.floor((43 * l2) / 15238);
    const j = j1 * j2 + j3 * j4;
    const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
    const mh = Math.floor((24 * l3) / 709);
    const dd = l3 - Math.floor((709 * mh) / 24);
    return { y: 30 * n + j - 30, m: mh, d: dd };
  };

  const convert = () => {
    const y = parseFloat(year), m = parseFloat(month), d = parseFloat(day);
    if (y <= 0 || m <= 0 || d <= 0) return;
    if (mode === "h2g") {
      const r = toGregorian(y, m, d);
      setResult({ from: `${d} ${monthNames[m-1] || ''} ${y} هـ`, to: `${r.d}/${r.m}/${r.y} م`, input: "هجري", output: "ميلادي" });
    } else {
      const r = toHijri(y, m, d);
      setResult({ from: `${d}/${m}/${y} م`, to: `${r.d} ${monthNames[r.m-1] || ''} ${r.y} هـ`, input: "ميلادي", output: "هجري" });
    }
  };

  const schemaName = "تحويل هجري ↔ ميلادي";
const schemaDesc = `Online تحويل هجري ↔ ميلادي - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/hijri-converter";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "محولات", url: "https://adwatak.cloud/category/calculators" },
  { name: "تحويل هجري ↔ ميلادي", url: "https://adwatak.cloud/tools/hijri-converter" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="أدوات إسلامية" categorySlug="islamic" toolName="تحويل هجري ميلادي" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📅 تحويل هجري ↔ ميلادي</h1>
        <p className="text-sm text-gray-500 mb-6">حوّل التاريخ بين الهجري والميلادي بدقة</p>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setMode("h2g")}
            className={`flex-1 p-3 rounded-xl border-2 font-semibold cursor-pointer font-inherit ${mode === "h2g" ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-200 text-gray-700"}`}>
            هجري → ميلادي
          </button>
          <button onClick={() => setMode("g2h")}
            className={`flex-1 p-3 rounded-xl border-2 font-semibold cursor-pointer font-inherit ${mode === "g2h" ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-200 text-gray-700"}`}>
            ميلادي → هجري
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">اليوم</label><input type="number" value={day} onChange={(e) => setDay(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="1" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">الشهر</label><input type="number" value={month} onChange={(e) => setMonth(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="1" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">السنة</label><input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="1445" /></div>
        </div>
        <button onClick={convert}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          حوّل
        </button>
      </div>
      {result && (
        <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200 mb-6">
          <p className="text-xs text-green-600">{result.from}</p>
          <p className="text-xs text-gray-400 my-1">↓ التحويل ↓</p>
          <p className="text-xl font-extrabold text-green-900">{result.to}</p>
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
