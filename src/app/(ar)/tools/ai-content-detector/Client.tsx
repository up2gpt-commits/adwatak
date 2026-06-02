"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "ما هو كاشف المحتوى AI؟", answer: "أداة مجانية تحلل النصوص لتحدد إذا كانت من كتابة بشرية أو مولّدة بالذكاء الاصطناعي. تستخدم خوارزميات متقدمة لتحليل الأنماط اللغوية والتكرار والتراكيب للكشف عن علامات AI." },
  { question: "ما مدى دقة كشف المحتوى AI؟", answer: "دقة عالية تتجاوز 85% في معظم الحالات. لكن لا توجد أداة دقيقة 100%. المحتوى المختلط (بشر + AI) يصعب تصنيفه. استخدم الأداة كمرجع وليس كحكم نهائي." },
  { question: "هل الأداة تدعم العربية والإنجليزية؟", answer: "نعم، تدعم اللغة العربية الفصحى والإنجليزية بطلاقة. كما تدعم النصوص المختلطة (عربي + إنجليزي). تعمل مع جميع اللهجات والأنماط الكتابية." },
  { question: "هل يمكن خداع كاشف AI؟", answer: "المحتوى الذي يتم تعديله يدوياً بعد توليده بالـ AI يصعب كشفه. إعادة الصياغة البشرية تقلل دقة الكشف. الأداة تكتشف الأنماط الخفية التي يصعب على البشر تزييفها." },
  { question: "كم طول النص المطلوب للتحليل؟", answer: "20 حرفاً كحد أدنى. كلما زاد النص زادت دقة التحليل. أفضل النتائج مع نصوص 200-2000 كلمة. النصوص القصيرة جداً (< 50 كلمة) تكون أقل دقة." },
  { question: "هل البيانات آمنة وخاصة؟", answer: "نعم 100%. النص يُرسل للتحليل فقط ولا يُخزن بعد ذلك. الخصوصية مكفولة ولا توجد قاعدة بيانات للمحتوى المُحلل." },
  { question: "ما هي علامات المحتوى AI؟", answer: "التكرار غير الطبيعي للكلمات والتراكيب، الجمل متوسطة الطول بشكل متساو، نقص التنوع في بنية الجمل، الإفراط في كلمات الربط، والشرح المفرط للمفاهيم البسيطة." },
  { question: "لماذا تختلف نتائج الأدوات المختلفة؟", answer: "كل أداة تستخدم نموذج AI مختلف ومنهجية تحليل مختلفة. الأفضل استخدام أداتين أو ثلاث للمقارنة. أداتنا تستخدم نموذج متطور لتحليل دقيق." },
  { question: "هل تكشف الأداة محتوى ChatGPT وClaude؟", answer: "نعم، تكتشف الأنماط المميزة لكل نموذج AI رئيسي. GPT-4 له أسلوب معين، Claude له أسلوب آخر. الأداة مدربة على اكتشاف التوقيع اللغوي الفريد لكل نموذج." },
  { question: "كيف أستخدم كاشف AI لتحسين كتابتي؟", answer: "اكتب المحتوى بنفسك أولاً. اختبره في الأداة. لو النتيجة منخفضة (قليل AI) فأنت في المسار الصحيح. لو عالية، أعد الصياغة بأسلوبك الشخصي." },
  { question: "هل أكاديميون يستخدمون كاشف AI؟", answer: "نعم، كثير من الجامعات والمدارس تستخدم أدوات كشف AI للتحقق من نزاهة الأبحاث والمقالات الأكاديمية. الأداة تساعد الأساتذة في تقييم أعمال الطلاب." },
  { question: "ما الفرق بين AI والكتابة البشرية؟", answer: "البشر يكتبون بتنوع: جمل قصيرة وطويلة، أخطاء إملائية مقصودة، تعابير عاطفية، لغة عامية. AI يكتب بشكل متساوٍ ومنظم جداً وأقل عفوية." },
];

const relatedTools = [
  { title: "عداد الكلمات والحروف", icon: "📝", href: "/tools/word-counter" },
  { title: "تنظيف النص", icon: "🧹", href: "/tools/text-cleaner" },
  { title: "مقارنة النصوص", icon: "⚖️", href: "/tools/text-compare" },
  { title: "تحويل حالة النص", icon: "🔤", href: "/tools/text-case" },
  { title: "مولد QR Code", icon: "🔳", href: "/tools/qr-generator" },
  { title: "مولد كلمات السر", icon: "🔐", href: "/tools/password-generator" },
];

const seoContent = [
  "كاشف المحتوى AI هو أداة مجانية تفحص النصوص وتحدد نسبة احتمالية كونها مولّدة بالذكاء الاصطناعي. كل ما عليك فعله هو لصق النص في الحقل المخصص والضغط على زر التحليل. الأداة ترسل النص إلى نموذج AI متخصص لتحليل الأنماط اللغوية والتراكيب.",
  "مع انتشار ChatGPT وClaude وGemini، أصبح من الصعب التمييز بين المحتوى البشري والآلي. أداتنا تساعد الكتاب والمدونين والمعلمين والطلاب على التحقق من نزاهة المحتوى وجودته. النتيجة تظهر كنسبة مئوية وشرح مختصر.",
  "للاستخدام الأمثل: الصق نصاً كاملاً لا يقل عن 100 كلمة للحصول على دقة عالية. النصوص القصيرة جداً قد تعطي نتائج غير دقيقة. اختبر نصوصاً مختلفة لتتعرف على أسلوب الأداة وطريقة عملها.",
  "دقة التحليل تعتمد على جودة النص وطوله. النصوص التي تتجاوز 500 كلمة تتمتع بدقة تصل إلى 90%. المحتوى المُعاد صياغته بشكل احترافي قد يخفض نسبة الكشف.",
  "مهم جداً: لا توجد أداة كشف AI مثالية 100%. استخدم الأداة كمرجع مساعد وليس كحكم قطعي. أفضل طريقة هي المزج بين التحليل الآلي والحكم البشري للتأكد من مصداقية المحتوى.",
];

export default function Client() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{score: number; explanation: string} | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeText = async () => {
    if (text.trim().length < 20) {
      setError("الرجاء إدخال نص لا يقل عن 20 حرفاً");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/ai-content-detector", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), lang: "ar" }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "خطأ في التحليل");
      }
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setError(e.message || "حدث خطأ. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 30) return "text-green-600";
    if (score < 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score < 30) return "bg-green-50 border-green-200";
    if (score < 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const getScoreEmoji = (score: number) => {
    if (score < 30) return "✅";
    if (score < 60) return "⚠️";
    return "🤖";
  };

  const getScoreLabel = (score: number) => {
    if (score < 30) return "غالباً كتابة بشرية";
    if (score < 60) return "قد يكون من AI أو مختلط";
    return "غالباً منشأ بالـ AI";
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("كاشف المحتوى AI", "كشف إذا كان النص من كتابة بشرية أو مولّد بالذكاء الاصطناعي", "https://adwatak.cloud/tools/ai-content-detector", "ar", "Text Analysis")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{name:"الرئيسية",url:"https://adwatak.cloud"},{name:"أدوات نصية",url:"https://adwatak.cloud/category/text"},{name:"كاشف المحتوى AI",url:"https://adwatak.cloud/tools/ai-content-detector"}])} />
      <Breadcrumb lang="ar" category="أدوات نصية" categorySlug="text" toolName="كاشف المحتوى AI" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🤖 كاشف المحتوى AI</h1>
        <p className="text-sm text-gray-500 mb-6">اكتشف إذا كان النص من كتابة بشرية أو مولّد بالذكاء الاصطناعي</p>

        <textarea value={text} onChange={(e) => setText(e.target.value)}
          className="w-full h-[200px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y"
          placeholder="الصق النص المراد تحليله هنا..." />

        <button onClick={analyzeText} disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all">
          {loading ? "جاري التحليل..." : "🔍 حلل النص"}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
        )}

        {result && (
          <div className={`mt-6 p-6 rounded-xl border ${getScoreBg(result.score)}`}>
            <div className="text-center mb-4">
              <span className="text-5xl">{getScoreEmoji(result.score)}</span>
              <p className={`text-5xl font-extrabold mt-2 ${getScoreColor(result.score)}`}>
                {result.score}%
              </p>
              <p className={`text-sm font-bold mt-1 ${getScoreColor(result.score)}`}>
                {getScoreLabel(result.score)}
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div className={`h-3 rounded-full transition-all duration-700 ${
                result.score < 30 ? "bg-green-500" : result.score < 60 ? "bg-yellow-500" : "bg-red-500"
              }`} style={{width: `${result.score}%`}} />
            </div>
            <p className="mt-4 text-sm text-gray-700 leading-relaxed">{result.explanation}</p>
          </div>
        )}

        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500">
            💡 <strong>نصيحة:</strong> الصق نصاً كاملاً (200+ كلمة) للحصول على أفضل دقة.
            لا توجد أداة دقيقة 100% — استخدم النتيجة كمرجع وليس كحكم قطعي.
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
