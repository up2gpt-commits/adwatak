"use client";
import { useState, useEffect, useCallback } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const dhikrList = [
  { text: "سبحان الله", transliteration: "Subhan Allah", meaning: "Glory be to Allah", target: 33 },
  { text: "الحمد لله", transliteration: "Alhamdulillah", meaning: "Praise be to Allah", target: 33 },
  { text: "الله أكبر", transliteration: "Allahu Akbar", meaning: "Allah is the Greatest", target: 34 },
  { text: "لا إله إلا الله", transliteration: "La ilaha illallah", meaning: "There is no god but Allah", target: 33 },
  { text: "أستغفر الله", transliteration: "Astaghfirullah", meaning: "I seek forgiveness from Allah", target: 33 },
  { text: "لا حول ولا قوة إلا بالله", transliteration: "La hawla wa la quwwata illa billah", meaning: "There is no power nor strength except with Allah", target: 33 },
  { text: "سبحان الله وبحمده", transliteration: "Subhan Allahi wa bihamdihi", meaning: "Glory be to Allah and His is the praise", target: 33 },
  { text: "سبحان الله العظيم", transliteration: "Subhan Allahil Azeem", meaning: "Glory be to Allah the Magnificent", target: 33 },
];

const faqs = [
  { question: "ما هي المسبحة الإلكترونية؟", answer: "المسبحة الإلكترونية هي أداة رقمية تساعدك على عد التسبيحات والأذكار بدلاً من استخدام المسبحة التقليدية. تعمل مباشرة في المتصفح بدون إنترنت بعد التحميل الأول، وتحفظ تقدمك تلقائياً في المتصفح." },
  { question: "لماذا 33 تسبيحة لكل ذكر؟", answer: "الرقم 33 مستند إلى حديث النبي ﷺ: \"أَلَا أُخْبِرُكُمْ بِخَيْرِ أَعْمَالِكُمْ، وَأَزْكَاهَا عِنْدَ مَلِيكِكُمْ، وَأَرْفَعِهَا فِي دَرَجَاتِكُمْ، وَخَيْرٍ لَكُمْ مِنْ إِنْفَاقِ الذَّهَبِ وَالْوَرِقِ؟\" قالوا: بلى. قال: \"التكبير والتحميد والتسبيه والتهليل\" — يُكرر كل واحد 33 مرة." },
  { question: "هل يتم حفظ العدد إذا أغلقت الصفحة؟", answer: "نعم! يتم حفظ العدد تلقائياً في localStorage المتصفح. عند العودة للصفحة، ستجد آخر عدد وصلت إليه. لكن إذا مسحت بيانات المتصفح أو استخدمت متصفح آخر، سيتم إعادة العداد للصفر." },
  { question: "هل يمكن استخدام المسبحة بدون إنترنت؟", answer: "نعم، بعد تحميل الصفحة لأول مرة، تعمل المسبحة بدون اتصال إنترنت. كل شيء يعمل في المتصفح مباشرة — لا يتم إرسال أي بيانات لأي سيرفر." },
  { question: "ما الفرق بين المسبحة الإلكترونية والمسبحة التقليدية؟", answer: "المسبحة التقليدية (99 حبة) هي سنة مستحبة وسنة عن النبي ﷺ. المسبحة الإلكترونية بديل عملي عندما لا تكون المسبحة التقليدية معك — في العمل، السفر، أو أثناء المشي. الأجر واحد بإذن الله لأن النية هي التسبيح." },
  { question: "هل المسبحة الإلكترونية تجزئ عن التسبيح بالأصابع؟", answer: "العلماء اختلفوا في هذه المسألة. بعضهم أجازها كوسيلة للعد، وبعضهم فضّل التسبيح بالأصابع لأنها سنة عن النبي ﷺ (حديث يُسرة: \"عَلَيْكُنَّ بِالتَّسْبِيحِ وَالتَّهْلِيلِ وَالتَّقْدِيسِ، وَاعْقِلْنَ بِالأنَامِلِ فَإِنَّهُنَّ مُسْأَلَاتٌ مُسْتَشْهَدَاتٌ\"). استخدم المسبحة الإلكترونية كأداة مساعدة وليس بديلاً كاملاً." },
  { question: "كيف أعرف أن العدد اكتمل؟", answer: "عند الوصول للعدد المستهدف (33 أو 34)، يتحول لون العداد إلى الأخضر ويظهر إشعار بصري. يمكنك بعد ذلك الانتقال للذكر التالي أو إعادة العداد للصفر." },
  { question: "هل يمكنني تغيير العدد المستهدف؟", answer: "الأعداد المستهدفة محددة حسب السنة: سبحان الله (33)، الحمد لله (33)، الله أكبر (34)، لا إله إلا الله (33)، أستغفر الله (33)، لا حول ولا قوة إلا بالله (33)، سبحان الله وبحمده (33)، سبحان الله العظيم (33). لكن يمكنك إعادة العداد والبدء بأي عدد تريده." },
  { question: "ما هي أذكار الصباح والمساء؟", answer: "أذكار الصباح والمساء تشمل: سبحان الله وبحمده (100 مرة)، لا إله إلا الله وحده لا شريك له (10 مرات)، أستغفر الله وأتوب إليه (100 مرة)، لا حول ولا قوة إلا بالله (10 مرات)، سبحان الله وبحمده عدد خلقه (3 مرات). المسبحة الإلكترونية تساعدك على عد هذه الأذكار بسهولة." },
  { question: "هل الأداة مجانية؟", answer: "نعم، المسبحة الإلكترونية مجانية بالكامل بدون إعلانات مزعجة وبدون تسجيل. تعمل على جميع الأجهزة: الجوال، التابلت، والكمبيوتر." },
  { question: "هل يمكنني استخدامها أثناء الصلاة؟", answer: "لا يُنصح باستخدام الجوال أثناء الصلاة لأنه يُقطع الخشوع. استخدم المسبحة الإلكترونية بعد الصلاة لعد الأذكار المستحبة بعد التسليم." },
  { question: "ما هو الذكر الأفضل بعد الصلاة؟", answer: "بعد كل صلاة مفروضة، يُستحب قول: سبحان الله (33 مرة)، الحمد لله (33 مرة)، الله أكبر (34 مرة) — المجموع 100. قال النبي ﷺ: \"مَنْ سَبَّحَ اللهَ فِي دُبْرِ كُلِّ صَلَاةٍ ثَلَاثًا وَثَلَاثِينَ، وَحَمِدَ اللهَ ثَلَاثًا وَثَلَاثِينَ، وَكَبَّرَ اللهَ أَرْبَعًا وَثَلَاثِينَ، فَتِلْكَ تِسْعَةٌ وَتِسْعُونَ، وَقَالَ: لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ... تَمَّتْ مِائَةً\" — رواه مسلم." },
];

const relatedTools = [
  { title: "مواقيت الصلاة", icon: "🕌", href: "/tools/prayer-times" },
  { title: "اتجاه القبلة", icon: "🧭", href: "/tools/qibla-direction" },
  { title: "حاسبة الزكاة", icon: "💰", href: "/tools/zakat-calculator" },
  { title: "تحويل هجري", icon: "📅", href: "/tools/hijri-converter" },
  { title: "حاسبة الميراث", icon: "⚖️", href: "/tools/inheritance-calculator" },
  { title: "ساعة إيقاف", icon: "⏱️", href: "/tools/stopwatch" },
];

const seoContent = [
  "المسبحة الإلكترونية أداة رقمية تساعد المسلم على عد التسبيحات والأذكار اليومية. بديل عملي للمسبحة التقليدية عندما تكون في العمل أو السفر أو أثناء المشي.",
  "تدعم 8 أذكار أساسية: سبحان الله (33)، الحمد لله (33)، الله أكبر (34)، لا إله إلا الله (33)، أستغفر الله (33)، لا حول ولا قوة إلا بالله (33)، سبحان الله وبحمده (33)، سبحان الله العظيم (33).",
  "ميزات المسبحة: حفظ العدد تلقائياً في المتصفح (localStorage)، عداد دائري بصري، إشعار عند إكمال العدد المستهدف، تعمل بدون إنترنت بعد التحميل الأول، واجهة عربية بالكامل.",
  "الأعداد المستهدفة مبنية على السنة النبوية: 33 تسبيحة لكل ذكر و34 للتكبير (حديث مسلم). المجموع 100 تسبيحة بعد كل صلاة مفروضة.",
  "الأداة مجانية بالكامل، تعمل على الجوال والكمبيوتر، لا تحتاج تسجيل، ولا تجمع أي بيانات شخصية.",
];

export default function Client() {
  const [selectedDhikr, setSelectedDhikr] = useState(0);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  const currentDhikr = dhikrList[selectedDhikr];

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasbeeh-count");
    const savedTotal = localStorage.getItem("tasbeeh-total");
    const savedDhikr = localStorage.getItem("tasbeeh-dhikr");
    if (saved) setCount(parseInt(saved, 10));
    if (savedTotal) setTotalCount(parseInt(savedTotal, 10));
    if (savedDhikr) setSelectedDhikr(parseInt(savedDhikr, 10));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasbeeh-count", count.toString());
    localStorage.setItem("tasbeeh-total", totalCount.toString());
    localStorage.setItem("tasbeeh-dhikr", selectedDhikr.toString());
  }, [count, totalCount, selectedDhikr]);

  // Show completion animation
  useEffect(() => {
    if (count >= currentDhikr.target && count > 0) {
      setShowComplete(true);
      const timer = setTimeout(() => setShowComplete(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [count, currentDhikr.target]);

  const increment = useCallback(() => {
    setCount(c => c + 1);
    setTotalCount(t => t + 1);
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  const resetAll = useCallback(() => {
    setCount(0);
    setTotalCount(0);
  }, []);

  const selectDhikr = useCallback((index: number) => {
    setSelectedDhikr(index);
    setCount(0);
  }, []);

  const progress = Math.min((count / currentDhikr.target) * 100, 100);
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const schemaName = "📿 المسبحة الإلكترونية";
  const schemaDesc = `مسبحة إلكترونية مجانية — عداد أذكار مع حفظ في المتصفح`;
  const schemaCategory = "Islamic";
  const schemaUrl = "https://adwatak.cloud/tools/tasbeeh-counter";
  const breadcrumbItems = [
    { name: "الرئيسية", url: "https://adwatak.cloud" },
    { name: "الأدوات الإسلامية", url: "https://adwatak.cloud/category/islamic" },
    { name: "📿 المسبحة الإلكترونية", url: "https://adwatak.cloud/tools/tasbeeh-counter" },
  ];

  return (
    <div className="max-w-[760px] mx-auto" dir="rtl">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={howToSchema("كيفية استخدام المسبحة الإلكترونية", "أداة مجانية تعمل في المتصفح مباشرة بدون تسجيل.", [
        { name: "اختر الذكر", text: "اختر الذكر من القائمة — سبحان الله، الحمد لله، الله أكبر، إلخ" },
        { name: "اضغط للتسبيح", text: "اضغط على الزر الكبير أو أي مكان في الدائرة لزيادة العداد" },
        { name: "أكمل العدد", text: "استمر حتى تصل للعدد المستهدف (33 أو 34) — ستظهر رسالة إتمام" },
        { name: "انتقل للتالي", text: "بعد الإكمال، انتقل للذكر التالي أو أعد العداد" },
      ], "أقل من دقيقة", "ar")} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb lang="ar" category="الأدوات الإسلامية" categorySlug="islamic" toolName="المسبحة الإلكترونية" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1 text-center">📿 المسبحة الإلكترونية</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">عداد تسبيحات مع حفظ تلقائي — 33 تسبيحة لكل ذكر</p>

        {/* Dhikr selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {dhikrList.map((d, i) => (
            <button
              key={i}
              onClick={() => selectDhikr(i)}
              className={`px-3 py-2 rounded-xl text-sm font-bold border-2 transition-all cursor-pointer ${
                selectedDhikr === i
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300"
              }`}
            >
              {d.text}
            </button>
          ))}
        </div>

        {/* Current dhikr display */}
        <div className="text-center mb-4">
          <p className="text-3xl font-bold text-emerald-700 mb-1">{currentDhikr.text}</p>
          <p className="text-sm text-gray-500">{currentDhikr.transliteration}</p>
          <p className="text-xs text-gray-400">{currentDhikr.meaning}</p>
        </div>

        {/* Circular counter */}
        <div className="flex justify-center my-6">
          <div className="relative w-52 h-52 cursor-pointer" onClick={increment}>
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <circle
                cx="100" cy="100" r="90" fill="none"
                stroke={showComplete ? "#10b981" : "#059669"}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-200"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-black font-mono ${showComplete ? "text-emerald-500" : "text-gray-900"}`}>
                {count}
              </span>
              <span className="text-sm text-gray-500">/ {currentDhikr.target}</span>
            </div>
          </div>
        </div>

        {/* Completion message */}
        {showComplete && (
          <div className="text-center mb-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="text-emerald-700 font-bold">✅ أحسنت! أكملت {currentDhikr.target} تسبيحة</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 justify-center mt-4">
          <button
            onClick={increment}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-4 rounded-2xl border-none cursor-pointer text-xl shadow-lg active:scale-95 transition-transform"
          >
            سبّح ✨
          </button>
        </div>

        <div className="flex gap-3 justify-center mt-3">
          <button
            onClick={reset}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-2 rounded-xl border border-gray-200 cursor-pointer text-sm"
          >
            إعادة هذا الذكر
          </button>
          <button
            onClick={resetAll}
            className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-6 py-2 rounded-xl border border-red-200 cursor-pointer text-sm"
          >
            إعادة الكل
          </button>
        </div>

        {/* Total counter */}
        <div className="text-center mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-500">إجمالي التسبيحات اليوم</p>
          <p className="text-3xl font-black text-emerald-700">{totalCount}</p>
        </div>
      </div>

      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
