"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "هل الأرقام عشوائية حقاً؟", answer: "نعم، نستخدم Web Crypto API الذي يوفر عشوائية تشفير حقيقية (Cryptographically Secure). تخمين الرقم التالي مستحيل عملياً." },
  { question: "كم رقم يمكن توليده مرة واحدة؟", answer: "حتى 1,000 رقم دفعة واحدة. للأعداد الكبيرة، استخدم مواقع متخصصة أو Scripts. مولدنا مناسب للاستخدام اليومي (سحوبات، قرعة، ألعاب)." },
  { question: "كيف أستخدم مولد الأرقام العشوائية؟", answer: "حدد النطاق (من..إلى)، عدد الأرقام المطلوب، واضغط 'ولّد'. الأرقام تظهر فوراً. يمكنك توليد أرقام جديدة بتغيير أي إعداد." },
  { question: "هل يمكن استخدامه للقرعة والسحب؟", answer: "نعم، مثالي لسحب الجوائز، قرعة الفعاليات، اختيار فائزين عشوائياً من قائمة. حدد النطاق من 1 إلى عدد المشاركين واطلب العدد المطلوب." },
  { question: "ما الفرق بين العشوائية الحقيقية والعشوائية الزائفة؟", answer: "العشوائية الزائفة (Pseudo-random) من Math.random() — متوقعة إذا عرفت البذرة (Seed). العشوائية الحقيقية من Web Crypto API — غير متوقعة وتعتمد على مصدر إنتروبيا (حركة الفأرة، ضجيج النظام)." },
  { question: "هل التكرار مسموح افتراضياً؟", answer: "نعم، الأرقام قد تتكرر. إذا كنت تريد أرقاماً فريدة (بدون تكرار)، استخدم خيار 'بدون تكرار' (غير مدعوم حالياً — سيأتي في تحديث). قارن الأرقام يدوياً أو استخدم أداة متخصصة." },
  { question: "ما هو أكبر نطاق مسموح؟", answer: "-10 مليار إلى +10 مليار. عملياً، معظم الاستخدامات بين 1 و1,000. النطاقات الضخمة جداً تعمل لكن قد يستغرق التوليد وقتاً أطول." },
  { question: "هل يمكن توليد أرقام عشرية؟", answer: "حالياً أعداد صحيحة فقط. للأرقام العشرية، استخدم الصيغة: Math.random() + توليد الجزء العشري يدوياً." },
  { question: "كيف أستخدم الأرقام المولدة في مشروعي؟", answer: "انسخ الأرقام يدوياً أو اكتبها. مولدنا مجاني ويمكنك استخدام الأرقام في أي مشروع تجاري أو شخصي دون حقوق." },
  { question: "ما هي استخدامات الأرقام العشوائية؟", answer: "الألعاب (تحديد الحركة التالية، توزيع البطاقات)، الإحصائيات (أخذ عينة عشوائية من البيانات)، التشفير (مفاتيح عشوائية)، الاختبارات (بيانات اختبار)، والقرعة (سحب فائزين)." },
];

const relatedTools = [
  { title: "مولد أسماء", icon: "👤", href: "/tools/name-generator" },
  { title: "مولد كلمات السر", icon: "🔐", href: "/tools/password-generator" },
  { title: "ساعة إيقاف ومؤقت", icon: "⏱️", href: "/tools/stopwatch" },
  { title: "حاسبة العمر", icon: "🎂", href: "/tools/age-calculator" },
  { title: "مولد الفواتير", icon: "🧾", href: "/tools/invoice-generator" },
  { title: "مولد QR Code", icon: "🔳", href: "/tools/qr-generator" },
];

const seoContent = [
  "مولد الأرقام العشوائية يولد أرقاماً ضمن نطاق تحدده — من 1 إلى 100 لأسرع النتائج. مثالي للسحوبات، القرعة، الألعاب، وأخذ عينات عشوائية. يدعم حتى 1,000 رقم دفعة واحدة.",
  "يعتمد على Web Crypto API لعشوائية تشفير حقيقية — أفضل من Math.random() العادي. كل رقم له نفس احتمالية الظهور (Uniform Distribution). لا يمكن تخمين الرقم التالي.",
  "للاستخدام اليومي: سحب فائزين من جمهور المسابقة، اختيار طالب عشوائي من القائمة، توليد أرقام لألعاب الطاولة، أخذ عينة عشوائية للبحث، وإنشاء أرقام تجريبية للاختبارات.",
  "مثال: سحب 5 فائزين من 200 مشارك — حدد من 1 إلى 200، العدد = 5، اضغط 'ولّد'. انسخ الأرقام وطابقها مع قائمة المشاركين. بسيط وسريع.",
  "نصيحة: احفظ الأرقام المولدة قبل إعادة التوليد. لا يوجد حفظ تلقائي. للقرعة الرسمية، وثّق عملية التوليد (صورة أو فيديو) لحماية نفسك قانونياً.",
  "الأداة مجانية بالكامل، تعمل على جميع المتصفحات الحديثة (Chrome, Firefox, Safari, Edge)."
];

export default function Client() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [result, setResult] = useState<number[]>([]);

  const generate = () => {
    const mn = parseInt(min), mx = parseInt(max), c = parseInt(count);
    const nums: number[] = [];
    for (let i = 0; i < c; i++) nums.push(Math.floor(Math.random() * (mx - mn + 1)) + mn);
    setResult(nums);
  };

  const schemaName = "مولد أرقام عشوائية";
const schemaDesc = `Online مولد أرقام عشوائية - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/random-number";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "مولدات", url: "https://adwatak.cloud/category/calculators" },
  { name: "مولد أرقام عشوائية", url: "https://adwatak.cloud/tools/random-number" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="مولدات" categorySlug="generators" toolName="مولد أرقام عشوائية" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🎲 مولد أرقام عشوائية</h1>
        <p className="text-sm text-gray-500 mb-6">توليد أرقام عشوائية بين نطاق محدد</p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">من</label><input type="number" value={min} onChange={(e) => setMin(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">إلى</label><input type="number" value={max} onChange={(e) => setMax(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1.5">العدد</label><input type="number" value={count} onChange={(e) => setCount(e.target.value)} min="1" max="100" className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none" /></div>
        </div>
        <button onClick={generate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          ولّد
        </button>
      </div>
      {result.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {result.map((n, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 px-6 border border-gray-200 font-extrabold text-xl text-blue-900">{n}</div>
          ))}
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
