"use client";
import { useState, useRef, useEffect } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "كيف يعمل صوت طرد الناموس؟", answer: "التردد 15,000 هرتز يقلد صوت أجنحة ذكور الناموس واليعسوب. إناث الناموس الملقحة (الوحيدة التي تلدغ) تهرب غريزياً من الذكور والمفترسين، مما يجعلها تغادر المكان." },
  { question: "هل هو آمن للبشر؟", answer: "نعم لمعظم البالغين — 15,000 هرتز بالكاد يُسمع. لكن حافظ على مستوى الصوت أقل من 40% وضع الجهاز على بعد 2-3 أمتار. التعرض الطويل بصوت عالٍ قد يسبب صداع أو طنين الأذن." },
  { question: "هل هو آمن للحيوانات الأليفة؟", answer: "لا — القطط والكلاب تسمع هذا التردد بأضعاف حجم الصوت الذي تسمعه أنت. لا تستخدمه في غرفة بها حيوانات أليفة. قد يسبب لهم ذعراً وأذىً حقيقياً في السمع." },
  { question: "كم من الوقت يجب تشغيله؟", answer: "15-30 دقيقة كافية لطرد الناموس من الغرفة. شغّله قبل النوم، ثم أغلقه. تشغيله طول الليل غير ضروري وقد يضر بسماعة الهاتف." },
  { question: "هل يضر سماعة الهاتف؟", answer: "نعم، تشغيل موجة صوتية نقية لساعات بصوت مرتفع قد يسخن ملف السماعة. حافظ على 30-40% كحد أقصى ولمدة 30 دقيقة فقط لكل جلسة." },
  { question: "هل يعمل على جميع أنواع الناموس؟", answer: "يعمل بشكل أفضل ضد ناموس Aedes و Culex (الناموس المنزلي). الفعالية تختلف حسب النوع والبيئة. استخدمه مع الناموسيات والمواد الطاردة للحصول على أفضل النتائج." },
  { question: "هل يضر البيئة؟", answer: "لا — يعمل بالصوت فقط. لا مواد كيميائية، لا أدخنة، لا مخلفات. طارد ناموس صديق للبيئة." },
];

const relatedTools = [
  { title: "اتجاه القبلة", icon: "🕋", href: "/tools/qibla-direction" },
  { title: "المسبحة الإلكترونية", icon: "📿", href: "/tools/tasbeeh-counter" },
  { title: "مواقيت الصلاة", icon: "🕌", href: "/tools/prayer-times" },
];

const seoContent = [
  "أداة مجانية لطرد الناموس بالصوت — تستخدم تردد 15,000 هرتز عالي لطرد البعوض والناموس طبيعياً. بدون مواد كيميائية، بدون تطبيقات. تعمل مباشرة في المتصفح.",
  "تردد طرد الناموس (15 كيلوهرتز) يستخدم موجة جيبية نقية لإنشاء حاجز صوتي فوق صوتي يطرد الناموس. هذا الصوت الحاد مصمم لمحاكاة أعداء الناموس الطبيعيين.",
  "كيفية الاستخدام: افتح الأداة، اضغط تشغيل، اضبط الصوت على 30-40%، ضع الهاتف على بعد 2-3 أمتار، واتركه لمدة 15-30 دقيقة. الصوت يتكرر تلقائياً حتى توقفه.",
  "تحذيرات الأمان: حافظ على الصوت منخفضاً، احم حيواناتك الأليفة (لا تستخدمه في غرفة بها قطط أو كلاب)، ولا تشغله لأكثر من 30 دقيقة لحماية سماعة هاتفك.",
  "طارد ناموس إلكتروني — بديل طبيعي خالٍ من المواد الكيميائية للبخاخات والكويل. مثالي لغرف النوم، المكاتب، الخيام، وأماكن الجلوس الخارجية.",
];

export default function Client() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/mosquito-repellent.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      audioRef.current.play();
      setElapsed(0);
      intervalRef.current = setInterval(() => setElapsed(p => p + 1), 1000);
    }
    setPlaying(!playing);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const schemaName = "طارد الناموس بالترددات";
  const schemaDesc = "أداة مجانية لطرد الناموس والبعوض باستخدام ترددات صوتية عالية 15000 هرتز — تشغيل متكرر بدون نت";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/tools/mosquito-repellent";
  const breadcrumbItems = [
    { name: "الرئيسية", url: "https://adwatak.cloud" },
    { name: "أدوات أخرى", url: "https://adwatak.cloud/category/daily" },
    { name: "طارد الناموس بالترددات", url: "https://adwatak.cloud/tools/mosquito-repellent" },
  ];

  return (
    <div className="max-w-[760px] mx-auto" dir="rtl">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb lang="ar" category="أدوات أخرى" categorySlug="daily" toolName="طارد الناموس بالترددات" />

      {/* Main Player Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold mb-1">🦟 طارد الناموس بالترددات</h1>
          <p className="text-sm text-gray-500 mb-6">تردد 15,000 هرتز لطرد البعوض — تشغيل متكرر تلقائي</p>
        </div>

        {/* Player Controls */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 mb-6 border border-indigo-100">
          <div className="flex flex-col items-center gap-6">
            {/* Waveform animation */}
            <div className="flex items-end gap-1 h-16">
              {[1,2,3,4,5,6,7,8,7,6,5,4,3,2,1].map((h, i) => (
                <div
                  key={i}
                  className={`w-2 bg-indigo-400 rounded-full transition-all duration-300 ${playing ? "animate-pulse" : "opacity-30"}`}
                  style={{
                    height: `${h * 8}px`,
                    animationDelay: playing ? `${i * 0.08}s` : "0s",
                    animationDuration: "0.8s",
                  }}
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-3xl font-mono font-bold text-indigo-700">
              {playing ? formatTime(elapsed) : "00:00"}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl border-none cursor-pointer shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
                playing ? "bg-red-500 hover:bg-red-600" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {playing ? "■" : "▶"}
            </button>

            {/* Volume */}
            <div className="w-full max-w-xs flex items-center gap-3 text-sm text-gray-500">
              <span>🔈</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <span>🔊</span>
              <span className="text-xs font-mono w-8 text-right">{Math.round(volume * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Safety Warnings */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
          <h2 className="font-bold text-amber-800 mb-3 text-sm flex items-center gap-2">
            ⚠️ تحذيرات الأمان — مهم جداً
          </h2>
          <ul className="text-sm text-amber-700 space-y-2 list-disc list-inside marker:text-amber-500">
            <li><strong>حافظ على الصوت 30-40% كحد أقصى</strong> — رفع الصوت لا يزيد الطرد بل يضر سمعك</li>
            <li><strong>المسافة الآمنة 2-3 أمتار</strong> — لا تضعه تحت الوسادة أو بجانب رأسك</li>
            <li><strong>غير آمن للحيوانات الأليفة</strong> — القطط والكلاب تسمعه بأضعاف حجم الصوت. يسبب لهم ألماً</li>
            <li><strong>30 دقيقة فقط كحد أقصى</strong> — التشغيل الطويل يضر سماعة الهاتف</li>
            <li><strong>أوقف فوراً عند الشعور بعدم الراحة</strong> — الصداع أو طنين الأذن علامة خطر</li>
          </ul>
        </div>

        {/* Recommended Usage */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h2 className="font-bold text-blue-800 mb-2 text-sm flex items-center gap-2">
            💡 الاستخدام الأمثل
          </h2>
          <p className="text-sm text-blue-700">
            شغّل الصوت على <strong>مستوى 30%</strong>، ضعه في <strong>زاوية بعيدة بالغرفة</strong> قبل النوم، لمدة <strong>30 دقيقة فقط</strong>، ثم أغلقه ونم في هدوء.
          </p>
        </div>
      </div>

      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
