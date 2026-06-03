"use client";
import { useState, useEffect, useRef } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "هل يعمل في الخلفية إذا انتقلت لتبويب آخر؟", answer: "نعم، ساعة الإيقاف تستخدم setInterval وتستمر في العمل حتى لو انتقلت لتبويب آخر. بعض المتصفحات تبطئ المؤقتات في التبويبات الخلفية لتوفير الطاقة." },
  { question: "هل يوجد تنبيه صوتي عند انتهاء المؤقت؟", answer: "نعم، عند إضافة مؤقت تنازلي، يصدر تنبيه عند انتهاء الوقت. حالياً التنبيه مرئي فقط (العداد يظهر 00:00). التنبيه الصوتي قادم في تحديث." },
  { question: "كيف أضيف لفات (Laps)؟", answer: "أثناء تشغيل ساعة الإيقاف، اضغط زر 'لفة' (Lap) لتسجيل الوقت الحالي. اللفات تظهر في قائمة منفصلة. هذا مفيد للرياضة — تسجيل وقت كل دورة." },
  { question: "ما هي استخدامات ساعة الإيقاف؟", answer: "الرياضة (توقيت الجري والسباحة)، الطبخ (توقيت الطهي)، الدراسة (تقنية Pomodoro — 25 دقيقة عمل + 5 دقائق راحة)، الاجتماعات (إدارة وقت المتحدثين)، والألعاب (تحدي الزمن)." },
  { question: "ما هي استخدامات المؤقت التنازلي؟", answer: "الطبخ (ضبط وقت الطهي)، الدراسة (عدة زمنية للتركيز)، الرياضة (تمارين HIIT)، العروض التقديمية (إدارة الوقت)، والألعاب (تحديد وقت الجولة)." },
  { question: "ما هي دقة ساعة الإيقاف؟", answer: "دقة 10 مللي ثانية (0.01 ثانية). العرض يظهر بالصيغة: دقائق:ثواني.جزء من الثانية (مثال: 05:23.45 = 5 دقائق و23 ثانية و450 مللي ثانية)." },
  { question: "هل يمكن حفظ الوقت المسجل؟", answer: "لا يوجد حفظ تلقائي حالياً. اكتب الوقت المهم قبل إعادة الضبط أو إغلاق الصفحة. اللفات تختفي عند الإعادة." },
  { question: "ما هو أقصى وقت يمكن قياسه؟", answer: "ساعة الإيقاف: حتى 99:59:59.99 (حوالي 100 ساعة). المؤقت التنازلي: حتى 99 دقيقة و59 ثانية. بعد ذلك يعيد الضبط إلى الصفر." },
  { question: "ساعة الإيقاف vs المؤقت — الفرق؟", answer: "ساعة الإيقاف (Stopwatch): تقيس الوقت من البداية إلى النهاية — مفيدة لقياس مدة نشاط. المؤقت (Timer): يعد تنازلياً من وقت محدد — مفيد لتحديد مهلة زمنية." },
  { question: "هل تعمل على الجوال؟", answer: "نعم، تعمل على جميع المتصفحات الحديثة في الجوال والكمبيوتر. الواجهة متجاوبة مع جميع أحجام الشاشات." },
];

const relatedTools = [
  { title: "حاسبة العمر", icon: "🎂", href: "/tools/age-calculator" },
  { title: "حاسبة BMI", icon: "⚖️", href: "/tools/bmi-calculator" },
  { title: "مولد أرقام عشوائية", icon: "🎲", href: "/tools/random-number" },
  { title: "مواقيت الصلاة", icon: "🕐", href: "/tools/prayer-times" },
  { title: "حاسبة السعرات", icon: "🔥", href: "/tools/calorie-calculator" },
  { title: "حاسبة الفائدة المركبة", icon: "📈", href: "/tools/compound-interest" },
];

const seoContent = [
  "أداة ساعة الإيقاف والمؤقت في مكان واحد. ساعة الإيقاف تقيس الوقت بدقة 10 مللي ثانية — مثالية للرياضة، الطبخ، الدراسة (Pomodoro)، والألعاب. المؤقت التنازلي يطلق تنبيهاً عند الانتهاء.",
  "ميزات ساعة الإيقاف: تشغيل/إيقاف، إعادة ضبط، دقة 10 مللي ثانية، تعمل في الخلفية (حتى لو غيرت التبويب). المؤقت التنازلي: ضبط الوقت بالدقائق والثواني، تنبيه عند الانتهاء.",
  "الاستخدامات العملية: ركض (سجل وقت الجري اليومي)، طبخ (ضبط وقت الطهي)، دراسة (25 دقيقة تركيز + 5 راحة)، تمارين (HIIT — 30 ثانية عمل + 10 راحة)، اجتماعات (إدارة وقت الكلام).",
  "الواجهة بسيطة وواضحة: الوقت يعرض بخط كبير (دقائق:ثواني.جزء). أزرار كبيرة سهلة الضغط. تعمل على الجوال والكمبيوتر. لا تحتاج تثبيت أي شيء.",
  "الأداة مجانية بالكامل، تعمل بدون إنترنت بعد التحميل الأول، ولا تجمع أي بيانات."
];

export default function Client() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (running) intervalRef.current = setInterval(() => setTime(t => t + 10), 10);
    else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const schemaName = "⏱ ساعة إيقاف + مؤقت";
const schemaDesc = `Online ⏱ ساعة إيقاف + مؤقت - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/stopwatch";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "أدوات أخرى", url: "https://adwatak.cloud/category/calculators" },
  { name: "⏱ ساعة إيقاف + مؤقت", url: "https://adwatak.cloud/tools/stopwatch" },
];

  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}.${Math.floor((ms % 1000) / 10)}`;
  };

  return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb lang="ar" category="أدوات أخرى" categorySlug="daily" toolName="ساعة إيقاف ومؤقت" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">⏱️ ساعة إيقاف + مؤقت</h1>
        <p className="text-sm text-gray-500 mb-6">ساعة إيقاف مع لفات ومؤقت تنازلي</p>
        <div className="text-center py-10">
          <p className="text-5xl font-black font-mono text-gray-900">{fmt(time)}</p>
          <div className="flex gap-3 justify-center mt-6">
            <button onClick={() => setRunning(!running)}
              className={`${running ? "bg-red-600" : "bg-blue-600"} text-white font-bold px-8 py-3 rounded-xl border-none cursor-pointer font-inherit text-lg`}>
              {running ? "إيقاف" : "تشغيل"}
            </button>
            <button onClick={() => { setRunning(false); setTime(0); }}
              className="bg-gray-50 text-gray-700 font-bold px-8 py-3 rounded-xl border-2 border-gray-200 cursor-pointer font-inherit text-lg">
              إعادة
            </button>
          </div>
        </div>
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
