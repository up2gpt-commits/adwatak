"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "ما هو مدقق الانتحال؟", answer: "أداة مجانية تكشف النصوص المنسوخة أو المعاد استخدامها دون توثيق. تحلل النص باستخدام الذكاء الاصطناعي لتقدير نسبة الأصالة والانتحال. تساعد الكتاب والطلاب والأكاديميين على ضمان نزاهة المحتوى." },
  { question: "ما مدى دقة كشف الانتحال؟", answer: "دقة عالية تتجاوز 85%. التحليل يعتمد على نماذج AI متطورة تكتشف الأنماط المكررة والتراكيب غير الأصلية. لكن لا توجد أداة دقيقة 100% — استخدمها كمرجع أساسي." },
  { question: "ما الفرق بين الانتحال المباشر وغير المباشر؟", answer: "الانتحال المباشر: نسخ النص كلمة بكلمة دون اقتباس. الانتحال غير المباشر: إعادة صياغة النص مع الاحتفاظ بالفكرة دون توثيق المصدر. أداتنا تكتشف كلا النوعين." },
  { question: "هل الأداة تدعم العربية والإنجليزية؟", answer: "نعم، تدعم اللغتين بطلاقة. تحلل النصوص العربية الفصحى والعامية والإنجليزية. تعمل مع النصوص المختلطة والمتعددة اللغات." },
  { question: "كم طول النص المطلوب للتحليل؟", answer: "50 حرفاً كحد أدنى. النصوص الأطول تعطي نتائج أدق. الأفضل استخدام نصوص بين 200-2000 كلمة. النصوص القصيرة جداً تقل دقتها." },
  { question: "هل البيانات آمنة؟", answer: "نعم 100%. النص يُرسل للتحليل فقط ولا يُخزن. لا نحتفظ بأي قاعدة بيانات للمحتوى المُحلل. خصوصيتك مضمونة." },
  { question: "كيف أتجنب الانتحال في كتاباتي؟", answer: "أعد الصياغة بأسلوبك الخاص بعد فهم الفكرة. استخدم علامات الاقتباس للنصوص المنقولة حرفياً. وثق جميع المصادر. استخدم الأداة للتحقق قبل النشر." },
  { question: "هل الأداة مناسبة للأبحاث الأكاديمية؟", answer: "نعم، مثالية للطلاب والباحثين. تساعدك على التحقق من أصالة أبحاثك قبل التقديم. الأفضل استخدامها مع أدوات توثيق المصادر." },
  { question: "ماذا تعني درجة الأصالة (Originality Score)؟", answer: "نسبة مئوية تعكس مدى أصالة المحتوى. 90-100% = أصلي جداً. 70-89% = جيد. أقل من 70% = يحتاج مراجعة وتوثيق." },
  { question: "هل المحتوى المترجم يعتبر انتحالاً؟", answer: "الترجمة دون ذكر المصدر الأصلي تعتبر انتحالاً غير مباشر. الأداة تكتشف الترجمات الحرفية. الأفضل إعادة الصياغة والاستشهاد بالمصدر." },
  { question: "ما هي أنواع الانتحال التي تكتشفها الأداة؟", answer: "النسخ الحرفي، إعادة الصياغة غير الموثقة، الانتحال من مصادر متعددة، الانتحال الذاتي (إعادة استخدام أعمالك السابقة)، والترجمة غير الموثقة." },
  { question: "كيف أستخدم نتائج التدقيق؟", answer: "ركز على الاقتراحات لتحسين النص. أعد صياغة الأجزاء المشكوك فيها. وثق المصادر المفقودة. استخدم الأداة دورياً لتحسين جودة كتاباتك." },
];

const relatedTools = [
  { title: "كاشف المحتوى AI", icon: "🤖", href: "/tools/ai-content-detector" },
  { title: "إعادة الصياغة", icon: "✏️", href: "/tools/paraphrasing-tool" },
  { title: "المدقق النحوي", icon: "📝", href: "/tools/grammar-checker" },
  { title: "عداد الكلمات", icon: "📊", href: "/tools/word-counter" },
  { title: "مقارنة النصوص", icon: "⚖️", href: "/tools/text-compare" },
  { title: "تنظيف النص", icon: "🧹", href: "/tools/text-cleaner" },
];

const seoContent = [
  "مدقق الانتحال هو أداة مجانية تكشف النصوص المنسوخة وتقيم أصالة المحتوى. الصق النص في الحقل المخصص واضغط تدقيق لتحصل على تحليل فوري يشمل نسبة الانتحال، درجة الأصالة، مشاكل التوثيق، واقتراحات التحسين.",
  "مع انتشار المحتوى الرقمي، أصبح التحقق من أصالة النصوص أكثر أهمية من أي وقت مضى. الطلاب، الباحثون، الكتاب، والمسوقون — كلهم يحتاجون أداة موثوقة للكشف عن الانتحال قبل النشر.",
  "الأداة مناسبة للجامعات والمؤسسات التعليمية. تساعد الأساتذة على تقييم أعمال الطلاب بدقة. كما تفيد المدونين وأصحاب المواقع في ضمان محتوى أصلي يحسن ترتيبهم في Google.",
  "نتائج التدقيق تشمل: نسبة الانتحال الكلية، درجة الأصالة، مشاكل الاقتباس والتوثيق، واقتراحات محددة للتحسين. كلها مدعومة بتحليل AI دقيق.",
  "نصيحة: استخدم الأداة قبل نشر أي محتوى مهم. النتائج تظهر في ثوانٍ. تأكد من توثيق جميع المصادر واحترام حقوق الملكية الفكرية.",
];

export default function PlagiarismChecker() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkPlagiarism = async () => {
    if (text.trim().length < 50) {
      setError("الرجاء إدخال نص لا يقل عن 50 حرفاً");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/plagiarism-checker", {
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
    return "🚫";
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("مدقق الانتحال", "كشف النصوص المنسوخة وتقييم أصالة المحتوى", "https://adwatak.cloud/tools/plagiarism-checker", "ar", "Text Analysis")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{name:"الرئيسية",url:"https://adwatak.cloud"},{name:"أدوات نصية",url:"https://adwatak.cloud/tools/text"},{name:"مدقق الانتحال",url:"https://adwatak.cloud/tools/plagiarism-checker"}])} />
      <Breadcrumb lang="ar" category="أدوات نصية" categorySlug="text" toolName="مدقق الانتحال" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🚫 مدقق الانتحال</h1>
        <p className="text-sm text-gray-500 mb-6">كشف النصوص المنسوخة وتقييم أصالة المحتوى</p>

        <textarea value={text} onChange={(e) => setText(e.target.value)}
          className="w-full h-[200px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y"
          placeholder="الصق النص المراد تدقيقه هنا..." />

        <button onClick={checkPlagiarism} disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all">
          {loading ? "جاري التدقيق..." : "🔍 تدقيق"}
        </button>

        {error && <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}

        {result && (
          <>
            <div className={`mt-6 p-6 rounded-xl border ${getScoreBg(result.score)}`}>
              <div className="text-center mb-4">
                <span className="text-5xl">{getScoreEmoji(result.score)}</span>
                <p className={`text-5xl font-extrabold mt-2 ${getScoreColor(result.score)}`}>{result.score}%</p>
                <p className={`text-sm font-bold mt-1 ${getScoreColor(result.score)}`}>
                  {result.score < 30 ? "أصلي — لا يوجد انتحال" : result.score < 60 ? "تنبيه — قد يحتوي على انتحال" : "انتحال مرتفع"}
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                <div className={`h-3 rounded-full transition-all duration-700 ${
                  result.score < 30 ? "bg-green-500" : result.score < 60 ? "bg-yellow-500" : "bg-red-500"
                }`} style={{width: `${result.score}%`}} />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">درجة الأصالة</p>
                <p className={`text-2xl font-extrabold ${getScoreColor(100 - result.score)}`}>
                  {result.originalScore ?? 100 - result.score}%
                </p>
              </div>
              {result.citationIssues?.length > 0 && (
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <p className="text-xs font-bold text-yellow-800 mb-2">مشاكل التوثيق</p>
                  {result.citationIssues.map((issue: string, i: number) => (
                    <p key={i} className="text-xs text-yellow-700">• {issue}</p>
                  ))}
                </div>
              )}
            </div>

            <p className="mt-4 text-sm text-gray-700 leading-relaxed">{result.explanation}</p>

            {result.suggestions?.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h3 className="text-sm font-bold text-blue-800 mb-2">💡 اقتراحات للتحسين</h3>
                <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                  {result.suggestions.map((s: string, i: number) => <li key={i}>{s}</li>)}
                </ol>
              </div>
            )}
          </>
        )}

        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500">
            💡 <strong>نصيحة:</strong> الصق نصاً كاملاً (200+ كلمة) لأفضل دقة.
            لا توجد أداة دقيقة 100% — استخدم النتيجة كمرجع.
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
