"use client";
import { useState, useRef, useEffect } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const sampleTexts = [
  {
    ar: "العلم نور والجهل ظلام، والعلماء ورثة الأنبياء. يرفع الله الذين آمنوا منكم والذين أوتوا العلم درجات. والتعليم هو أقوى سلاح يمكنك استخدامه لتغيير العالم.",
    en: "Science is light and ignorance is darkness. Scholars are the heirs of prophets. God will raise those who believe among you and those who have been given knowledge. Education is the most powerful weapon to change the world."
  },
  {
    ar: "التكنولوجيا تغير حياتنا كل يوم. الذكاء الاصطناعي والتعلم الآلي يصبحان جزءاً من روتيننا اليومي. المواقع والأدوات الذكية تساعدنا على الإنجاز بشكل أسرع وأفضل.",
    en: "Technology changes our lives every day. Artificial intelligence and machine learning are becoming part of our daily routine. Smart websites and tools help us achieve more faster and better."
  },
  {
    ar: "في عالم التسويق الرقمي، المحتوى هو الملك. كتابة محتوى SEO متوافق مع محركات البحث يساعد في ظهور موقعك في النتائج الأولى. التركيز على جودة المحتوى يزيد الزوار والتحويلات.",
    en: "In digital marketing, content is king. Writing SEO-friendly content helps your website appear in top search results. Focusing on content quality increases visitors and conversions."
  },
  {
    ar: "النجاح ليس محطة وصول بل رحلة مستمرة. التعلم المستمر وتطوير المهارات هما مفتاح النجاح في العصر الحديث. كل يوم جديد هو فرصة لتعلم شيء جديد وتحسين الذات.",
    en: "Success is not a destination but a continuous journey. Continuous learning and skill development are the keys to success in the modern era. Every new day is an opportunity to learn something new."
  },
  {
    ar: "البرمجة هي لغة المستقبل. تعلم البرمجة يفتح لك أبواباً لا حصر لها في سوق العمل. من تطوير المواقع إلى الذكاء الاصطناعي، المبرمجون هم مهندسو المستقبل.",
    en: "Programming is the language of the future. Learning programming opens countless doors in the job market. From web development to AI, programmers are the engineers of the future."
  }
];

const faqs = [
  { question: "ما هي سرعة الكتابة الجيدة؟", answer: "40-60 كلمة في الدقيقة: متوسط. 60-80: فوق المتوسط. 80-100: سريع. 100+: مستوى محترف. المعدل العالمي ~40 كلمة/دقيقة. المبرمجون والكاتبون المحترفون يصلون لـ 60-90." },
  { question: "كم حرفاً في الدقيقة يعتبر جيداً؟", answer: "200-300 حرف/دقيقة: مبتدئ. 300-400: متوسط. 400-500: جيد. 500+: محترف. 1 كلمة ≈ 5 أحرف (بما في ذلك المسافات). لذا 80 كلمة/دقيقة ≈ 400 حرف/دقيقة." },
  { question: "كيف أحسن سرعة كتابتي؟", answer: "1) تمرن يومياً 10-15 دقيقة. 2) ركز على الدقة أولاً ثم السرعة. 3) استخدم كل أصابعك العشرة (Touch Typing). 4) لا تنظر للوحة المفاتيح. 5) استخدم مواقع تدريب مثل TypingClub و Keybr." },
  { question: "ما هو الـ Touch Typing؟", answer: "الكتابة باللمس — استخدام كل أصابع اليدين بدون النظر للوحة المفاتيح. الأصابع ترتكز على F و J (النقطة البارزة). كل إصبع له مسؤول عن منطقة محددة. يضاعف السرعة بعد التمرن." },
  { question: "هل الممارسة اليومية تساعد حقاً؟", answer: "نعم، 10 دقائق يومياً = تحسن 20-30% في الشهر الأول. الدماغ يبني ذاكرة عضلية (Muscle Memory) للأصابع. مع الوقت، تصبح الحركات تلقائية بدون تفكير." },
  { question: "ما تأثير وضعية الجلوس على السرعة؟", answer: "كبير جداً. ظهر مستقيم، كتفان مرتخيان، معصمان مستقيمان (غير مرفوعين)، المرفقان بزاوية 90°. الشاشة على مستوى العين. الوضعية الخاطئة تسبب ألماً وتقلل السرعة 15-30%." },
  { question: "ما هي أفضل مواقع لتعلم الكتابة السريعة؟", answer: "TypingClub (مجاني، شامل)، Keybr (ذكي، يركز على نقاط ضعفك)، Monkeytype (ممتع، منافسات)، 10fastfingers (مسابقات)، Ratatype (دورات). كلها مجانية وكافية للوصول لمرحلة الاحتراف." },
  { question: "هل تختلف سرعة الكتابة بين الجوال والكمبيوتر؟", answer: "نعم. سرعة الجوال ~35-45 كلمة/دقيقة بالإبهامين (Thumb Typing). سرعة الكمبيوتر ~50-80 باستخدام 10 أصابع. لوحة المفاتيح الفيزيائية أسرع من الشاشة اللمسية." },
  { question: "ما الفرق بين WPM و CPM؟", answer: "WPM = Words Per Minute (عدد الكلمات في الدقيقة). CPM = Characters Per Minute (عدد الأحرف في الدقيقة). WPM = CPM ÷ 5 (متوسط طول الكلمة). افحص السرعة بـ WPM للكتابة المتوسطة." },
  { question: "هل يؤثر نوع لوحة المفاتيح على السرعة؟", answer: "نعم. الميكانيكية: أسرع 5-15% بسبب الاستجابة اللمسية، أفضل للكتابة الطويلة. الممبرين (العادية): أبطأ قليلاً. اللابتوب: مريحة لكن أقل عمقاً. لوحات Cherry MX Blue/Brown مفضلة للكتّاب." },
];

const relatedTools = [
  { title: "عداد الكلمات", icon: "📝", href: "/tools/word-counter" },
  { title: "ساعة إيقاف", icon: "⏱️", href: "/tools/stopwatch" },
  { title: "مولد النص العربي", icon: "📃", href: "/tools/arabic-lorem" },
  { title: "تحويل حالة النص", icon: "🔤", href: "/tools/text-case" },
  { title: "منظف النص", icon: "🧹", href: "/tools/text-cleaner" },
  { title: "مقارنة النصوص", icon: "⚖️", href: "/tools/text-compare" },
];

const seoContent = [
  "اختبر سرعة كتابتك على لوحة المفاتيح بالعربية والإنجليزية. أداة اختبار سرعة الطباعة (Typing Speed Test) تقيس عدد الكلمات في الدقيقة (WPM) والدقة والنسبة المئوية. ابدأ بالكتابة في الحقل وستحصل على النتيجة فوراً.",
  "كم سرعة كتابتك؟ المعدل العالمي: 40 كلمة/دقيقة. المبتدئ: 20-30. المتوسط: 40-60. المحترف: 80-100. 60 كلمة/دقيقة يعني 300 حرف/دقيقة أو 12,000 حرف في ساعة كتابة متواصلة.",
  "طريقة الاختبار: سيظهر لك نص عشوائي. اكتب النص في الحقل المخصص. بعد انتهاء الوقت (30 أو 60 ثانية)، ستحصل على: WPM (الكلمات في الدقيقة)، الدقة (نسبة الأحرف الصحيحة)، الوقت المتبقي. جرب 3 مرات واحسب المتوسط.",
  "نصائح لتحسين سرعة الكتابة: استخدم كل الأصابع العشرة (Touch Typing)، حافظ على وضعية جلوس صحيحة، تمرن 10 دقائق يومياً، ولا تنظر للوحة المفاتيح. التحسن يحتاج من 2-4 أسابيع من الممارسة المنتظمة.",
  "السرعة vs الدقة: الأخطاء تقلل سرعتك الفعلية. 80 كلمة/دقيقة بدقة 70% = 56 كلمة/دقيقة فعالة. ركز على الدقة أولاً (95%+) ثم زد السرعة. المحترفون يكتبون 90+ كلمة/دقيقة بدقة 97%+.",
  "الأداة مجانية 100%، تعمل في المتصفح بدون رفع بيانات. اختبر سرعتك بالعربية والإنجليزية. شارك نتيجتك مع أصدقائك وتحداهم!"
];

export default function Client() {
  const [textIndex, setTextIndex] = useState(0);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{ wpm: number; accuracy: number; cpm: number } | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [lang, setLang] = useState<"ar" | "en">("ar");

  const sampleText = sampleTexts[textIndex][lang];

  const startTest = () => {
    setInput("");
    setResult(null);
    setTimeLeft(60);
    setIsRunning(true);
    setTextIndex(Math.floor(Math.random() * sampleTexts.length));
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            calculateResult();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRunning]);

  const calculateResult = () => {
    const typedChars = input.length;
    let correct = 0;
    for (let i = 0; i < Math.min(typedChars, sampleText.length); i++) {
      if (input[i] === sampleText[i]) correct++;
    }
    const cpm = typedChars;
    const wpm = Math.round(cpm / 5);
    const accuracy = typedChars > 0 ? Math.round((correct / cpm) * 100) : 0;
    setResult({ wpm, accuracy, cpm });
  };

  const schemaName = "اختبار سرعة الكتابة";
  const schemaDesc = `Typing Speed Test - free tool`;
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/tools/typing-test";
  const breadcrumbItems = [
    { name: "الرئيسية", url: "https://adwatak.cloud" },
    { name: "أدوات نصية", url: "https://adwatak.cloud/category/calculators" },
    { name: "اختبار سرعة الكتابة", url: "https://adwatak.cloud/tools/typing-test" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="أدوات أخرى" categorySlug="daily" toolName="اختبار سرعة الكتابة" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">⌨️ اختبار سرعة الكتابة</h1>
        <p className="text-sm text-gray-500 mb-4">قم بقياس سرعة طباعتك بالعربية والإنجليزية</p>
        
        <div className="flex gap-2 mb-4">
          <button onClick={() => { setLang("ar"); setResult(null); }} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${lang === "ar" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>🇸🇦 العربية</button>
          <button onClick={() => { setLang("en"); setResult(null); }} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${lang === "en" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>🇬🇧 English</button>
        </div>

        {!isRunning && !result && (
          <div className="text-center py-8">
            <button onClick={startTest} className="bg-green-600 text-white font-bold p-4 rounded-xl border-none text-lg cursor-pointer hover:bg-green-700">▶ ابدأ الاختبار (60 ثانية)</button>
          </div>
        )}

        {isRunning && (
          <>
            <div className="flex justify-between mb-3">
              <span className="text-lg font-bold text-blue-600">⏱ {timeLeft} ث</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl mb-4 text-lg leading-relaxed font-arabic text-gray-700 whitespace-pre-wrap" dir={lang === "ar" ? "rtl" : "ltr"}>
              {sampleText.split("").map((char, i) => {
                let color = "text-gray-400";
                if (i < input.length) color = input[i] === char ? "text-green-600" : "text-red-500 bg-red-100";
                return <span key={i} className={color}>{char}</span>;
              })}
            </div>
            <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
              className="w-full h-[120px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y"
              placeholder={lang === "ar" ? "ابدأ الكتابة هنا..." : "Start typing here..."}
              dir={lang === "ar" ? "rtl" : "ltr"} />
          </>
        )}

        {result && (
          <div className="bg-gray-50 p-6 rounded-xl mt-4 text-center">
            <h3 className="text-lg font-bold mb-4">📊 نتيجتك</h3>
            <div className="flex justify-center gap-6 mb-4">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-blue-600">{result.wpm}</div>
                <div className="text-sm text-gray-500">WPM</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-green-600">{result.accuracy}%</div>
                <div className="text-sm text-gray-500">دقة</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-purple-600">{result.cpm}</div>
                <div className="text-sm text-gray-500">حرف/دقيقة</div>
              </div>
            </div>
            {result.wpm >= 80 && <p className="text-green-600 font-bold">🔥 ممتاز! أنت كاتب محترف!</p>}
            {result.wpm >= 60 && result.wpm < 80 && <p className="text-blue-600 font-bold">👍 جيد جداً! واصل التمرين.</p>}
            {result.wpm >= 40 && result.wpm < 60 && <p className="text-yellow-600 font-bold">👌 جيد، مارس 10 دقائق يومياً للتحسن.</p>}
            {result.wpm < 40 && <p className="text-gray-600 font-bold">💪 استمر في التمرين — السرعة ستتحسن!</p>}
            <button onClick={startTest} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-base cursor-pointer mt-4 hover:bg-blue-700">جرب مرة أخرى</button>
          </div>
        )}
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
