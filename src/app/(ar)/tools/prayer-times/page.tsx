"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما هي مواقيت الصلاة الخمس؟", answer: "الفجر (قبل الشروق)، الظهر (بعد الزوال مباشرة — منتصف النهار)، العصر (عندما يصبح ظل الشيء مثله)، المغرب (بعد غروب الشمس مباشرة)، العشاء (بعد غياب الشفق الأحمر — 1.5 ساعة بعد المغرب تقريباً)." },
  { question: "لماذا تختلف المواقع في أوقات الصلاة؟", answer: "بسبب اختلاف طرق الحساب: أم القرى (السعودية): فجر 18.5°، عشاء — (يتبع المغرب بـ 90 دقيقة). الهيئة المصرية: فجر 19.5°، عشاء 17.5°. جامعة أم القرى: فجر 18°، عشاء 17°. الفرق 2-5 دقائق." },
  { question: "ما هو وقت صلاحية كل صلاة؟", answer: "الفجر: من طلوع الفجر الصادق إلى طلوع الشمس. الظهر: من زوال الشمس إلى أن يصبح ظل الشيء مثله. العصر: من ذلك إلى غروب الشمس. المغرب: من غروب الشمس إلى غياب الشفق الأحمر. العشاء: من غياب الشفق الأحمر إلى منتصف الليل." },
  { question: "ماذا أفعل إذا فاتتني صلاة؟", answer: "تقضيها فوراً عند التذكر — الرسول ﷺ قال: 'من نام عن صلاة أو نسيها فليصلها إذا ذكرها'. لا يجوز تأخير الصلاة عن وقتها عمداً إلا لعذر (نوم، نسيان، سفر)." },
  { question: "كيف أعرف وقت الصلاة بدقة؟", answer: "استخدم تطبيقات موثوقة (تطبيق أدواتك قريباً). في السعودية، تقويم أم القرى هو المرجع الرسمي. خارج السعودية، استخدم حسابات الهيئات المحلية (الهيئة المصرية، الهيئة الأمريكية)." },
  { question: "لماذا يختلف وقت الفجر في الصيف والشتاء؟", answer: "في الصيف، الأيام أطول — الفجر يأتي مبكراً (4-4:30 صباحاً). في الشتاء، الأيام أقصر — الفجر يتأخر (5-5:30 صباحاً). هذا التغير الطبيعي بسبب ميل محور الأرض." },
  { question: "ما هو تقويم أم القرى؟", answer: "تقويم أم القرى هو المرجع الرسمي للسعودية لمواقيت الصلاة والتقويم الهجري. يطوره معهد أبحاث الفضاء بجامعة الملك عبدالعزيز. معتمد من وزارة الشؤون الإسلامية." },
  { question: "هل يمكن تحديد وقت الصلاة بناءً على رؤية الشمس؟", answer: "نعم: الفجر = ظهور الضوء الأبيض في الأفق الشرقي. الظهر = الشمس في أعلى نقطة. العصر = ظل الشيء مثله. المغرب = غروب القرص. العشاء = اختفاء الضوء الأحمر. هذه أدلة شرعية يمكن الاعتماد عليها." },
  { question: "كم من الوقت بين الأذان والإقامة؟", answer: "يختلف حسب المسجد: الفجر 15-30 دقيقة، الظهر 10-15 دقيقة، العصر 10-15 دقيقة، المغرب 5-10 دقائق (وقت قصير لأن وقت المغرب محدود)، العشاء 10-20 دقيقة." },
  { question: "ما حكم الصلاة في الطائرة أو القطار؟", answer: "تصلي حسب وقت مكانك (توقيت المغادرة أو الوجهة؟ الرأي الراجح: صلي حسب توقيت المكان الذي أنت فيه. إذا لم تستطع القيام، صلي جالساً. استخدم البوصلة لتحديد القبلة." },
  { question: "الصلاة في العمل — كيف أنظم وقتي؟", answer: "في السعودية، أغلب الشركات توفر مصلى. خطط: الظهر (12-1 م)، العصر (3-4 عصراً)، المغرب (5-6 م حسب الموسم). استخدم تطبيق مواقيت الصلاة لتعرف الأوقات بدقة." },
  { question: "هل تجب الصلاة على المسافر؟", answer: "نعم، الصلاة واجبة على المسافر ولكن يجوز القصر (الظهر والعصر والعشاء تصلي ركعتين بدلاً من 4) والجمع (جمع الظهر مع العصر أو المغرب مع العشاء)." },
];

const relatedTools = [
  { title: "اتجاه القبلة", icon: "🧭", href: "/tools/qibla-direction" },
  { title: "تحويل هجري ميلادي", icon: "📅", href: "/tools/hijri-converter" },
  { title: "حاسبة الزكاة", icon: "🕌", href: "/tools/zakat-calculator" },
  { title: "حاسبة العمر", icon: "🎂", href: "/tools/age-calculator" },
  { title: "ساعة إيقاف ومؤقت", icon: "⏱️", href: "/tools/stopwatch" },
  { title: "حاسبة الميراث", icon: "📜", href: "/tools/inheritance-calculator" },
];

const seoContent = [
  "أداة عرض مواقيت الصلاة الخمس (الفجر، الظهر، العصر، المغرب، العشاء) حسب مدينتك. اختر مدينة من القائمة واحصل على الأوقات المحدثة. المواقيت تعتمد على تقويم أم القرى للسعودية.",
  "مواقيت الصلاة تتغير يومياً بسبب دوران الأرض حول الشمس. في الصيف، الأيام أطول — الصلوات النهارية (الفجر، الظهر، العصر) تمتد. في الشتاء، الأيام أقصر — تتقدم الأوقات.",
  "الصلوات الخمس: الفجر (ركعتان، وقتها من الفجر الصادق للشروق)، الظهر (4 ركعات، من زوال الشمس لعصر)، العصر (4 ركعات، من بعد الظهر للغروب)، المغرب (3 ركعات، من الغروب لغياب الشفق)، العشاء (4 ركعات، من بعد المغرب لمنتصف الليل).",
  "قادم قريباً: تحديد تلقائي للموقع عبر GPS لأوقات دقيقة. حالياً اختر من 4 مدن رئيسية: الرياض، جدة، القاهرة، دبي. للأوقات خارج هذه المدن، استخدم تطبيقات متخصصة.",
  "الأداة مجانية، تدعم العربية، ويمكن استخدامها في أي وقت. مواقيت الصلاة مقدّرة وقد تختلف عن الواقع ببضع دقائق حسب الموقع الدقيق."
];

export default function PrayerTimes() {
  const [city, setCity] = useState("");
  const cities: Record<string, string[]> = { "الرياض": ["04:30", "12:05", "15:35", "18:20", "19:50"], "جدة": ["04:45", "12:20", "15:50", "18:35", "20:05"], "القاهرة": ["04:15", "12:00", "15:45", "18:30", "20:00"], "دبي": ["04:35", "12:15", "15:50", "18:25", "19:55"] };
  const [result, setResult] = useState<any>(null);

  const showTimes = () => {
    const times = cities[city];
    if (times) setResult({ city, times: { "الفجر": times[0], "الظهر": times[1], "العصر": times[2], "المغرب": times[3], "العشاء": times[4] } });
  };

  const schemaName = "مواقيت الصلاة";
const schemaDesc = `Online مواقيت الصلاة - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/prayer-times";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "مواقيت الصلاة", url: "https://adwatak.cloud/tools/prayer-times" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="أدوات إسلامية" categorySlug="islamic" toolName="مواقيت الصلاة" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🕐 مواقيت الصلاة</h1>
        <p className="text-sm text-gray-500 mb-6">مواقيت الصلاة حسب موقعك الجغرافي</p>
        <select value={city} onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white mb-3">
          <option value="">اختر مدينة</option>
          {Object.keys(cities).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={showTimes}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          عرض المواقيت
        </button>
      </div>
      {result && (
        <div className="flex flex-col gap-2 mb-6">
          {Object.entries(result.times as Record<string, string>).map(([name, time]) => (
            <div key={name} className="flex justify-between items-center bg-gray-50 rounded-xl p-4 px-5 border border-gray-200">
              <span className="font-semibold text-gray-700">{name}</span>
              <span className="text-xl font-extrabold text-blue-900 font-mono">{time}</span>
            </div>
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
