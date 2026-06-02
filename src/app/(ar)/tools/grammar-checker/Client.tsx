"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "ما هو المدقق النحوي؟", answer: "أداة مجانية تدقق الأخطاء النحوية والإملائية وعلامات الترقيم في النصوص. تستخدم AI متطور لتحليل النص واكتشاف الأخطاء وتقديم تصحيحات مع شرح السبب. تدعم العربية الفصحى والإنجليزية." },
  { question: "هل يدقق النحو العربي بدقة؟", answer: "نعم، الأداة متخصصة في تدقيق النحو العربي: تصريف الأفعال، علامات الإعراب، التذكير والتأنيث، الجمع والمفرد، الهمزات، والأخطاء الإملائية الشائعة." },
  { question: "ما هي أنواع الأخطاء التي تكتشفها الأداة؟", answer: "الأخطاء الإملائية (الهمزات، التاء المربوطة والمفتوحة)، النحوية (الإعراب، المبتدأ والخبر)، علامات الترقيم، الأخطاء الشائعة، وصياغة الجمل." },
  { question: "هل الأداة مجانية بالكامل؟", answer: "نعم 100% مجانية. بدون تسجيل، بدون حدود استخدام، بدون خطط مدفوعة. فقط الصق النص واحصل على التدقيق فوراً." },
  { question: "كم طول النص المطلوب للتدقيق؟", answer: "10 أحرف كحد أدنى. كلما زاد النص زادت دقة التدقيق. النتائج المثلى مع نصوص 100-2000 كلمة." },
  { question: "ماذا تعني درجة readability؟", answer: "درجة سهولة القراءة (0-100). 80-100: سهل القراءة جداً. 60-79: متوسط. أقل من 60: صعب القراءة ويحتاج تبسيط." },
  { question: "هل البيانات آمنة؟", answer: "نعم. النص يُرسل للتدقيق فقط ولا يُخزن. لا نحتفظ بأي نصوص. الخصوصية مكفولة بالكامل." },
  { question: "ما الفرق بين المدقق النحوي ومدقق الإملاء؟", answer: "المدقق النحوي يشمل الإملاء والنحو والترقيم والأسلوب. مدقق الإملاء يركز فقط على الكلمات الخطأ إملائياً. أداتنا تفعل الاثنين معاً في تدقيق واحد شامل." },
  { question: "هل يناسب الكتاب المحترفين؟", answer: "نعم، مثالي للكتاب والمحررين والصحفيين. يساعد في تحسين جودة النصوص قبل النشر. مفيد أيضاً للطلاب في تحسين كتاباتهم الأكاديمية." },
  { question: "كيف أستخدم نتائج التدقيق؟", answer: "راجع التصحيحات المقترحة واحداً واحداً. كل تصحيح يأتي مع شرح للسبب. طبّق التصحيحات التي توافق عليها. استخدم الأداة كأداة تعليمية لتحسين لغتك." },
  { question: "هل يدقق النصوص المختلطة عربي/إنجليزي؟", answer: "نعم، يدعم النصوص المختلطة. يكشف الأخطاء في كل لغة على حدة. مناسب للكتابات التقنية والعلمية التي تمزج بين اللغتين." },
  { question: "كيف أحسن نتائج التدقيق؟", answer: "استخدم نصاً واضحاً ومنسقاً. تجنب النصوص القصيرة جداً. راجع الاقتراحات بعناية. استخدم الأداة بانتظام كجزء من عملية التحرير." },
];

const relatedTools = [
  { title: "إعادة الصياغة", icon: "✏️", href: "/tools/paraphrasing-tool" },
  { title: "مدقق الانتحال", icon: "🚫", href: "/tools/plagiarism-checker" },
  { title: "كاشف المحتوى AI", icon: "🤖", href: "/tools/ai-content-detector" },
  { title: "عداد الكلمات", icon: "📊", href: "/tools/word-counter" },
  { title: "مقارنة النصوص", icon: "⚖️", href: "/tools/text-compare" },
  { title: "تنظيف النص", icon: "🧹", href: "/tools/text-cleaner" },
];

const seoContent = [
  "المدقق النحوي هو أداة مجانية لتدقيق الأخطاء النحوية والإملائية وعلامات الترقيم. الصق النص واضغط تدقيق لتحصل على تحليل فوري يشمل: عدد الأخطاء، درجة سهولة القراءة، وتصحيحات مفصلة مع شرح السبب.",
  "الأداة مثالية للكتاب والطلاب والمحررين والمسوقين. تساعدك على تحسين جودة كتاباتك قبل النشر. تضمن نصوصاً خالية من الأخطاء تترك انطباعاً احترافياً لدى القراء.",
  "تدعم العربية الفصحى والإنجليزية. تكتشف أكثر من 20 نوعاً من الأخطاء اللغوية. كل تصحيح يوضح الخطأ والصواب وسبب التصحيح — أداة تعليمية قبل أن تكون تدقيقية.",
  "درجة سهولة القراءة (Readability Score) تساعدك على تقييم مدى وضوح نصك. النصوص الواضحة تحقق تفاعلاً أفضل مع القراء وترتيباً أعلى في محركات البحث.",
  "نصيحة: استخدم الأداة قبل نشر أي محتوى رسمي. النتائج فورية. راجع التصحيحات بعناية — بعض التصحيحات تعتمد على السياق.",
];

export default function Client() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkGrammar = async () => {
    if (text.trim().length < 10) {
      setError("الرجاء إدخال نص للتدقيق");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/grammar-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), lang: "ar" }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "خطأ في التدقيق");
      setResult(await res.json());
    } catch (e: any) {
      setError(e.message || "حدث خطأ.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (s: number) => s >= 80 ? "text-green-600" : s >= 50 ? "text-yellow-600" : "text-red-600";
  const getScoreBg = (s: number) => s >= 80 ? "bg-green-50 border-green-200" : s >= 50 ? "bg-yellow-50 border-yellow-200" : "bg-red-50 border-red-200";
  const getScoreEmoji = (s: number) => s >= 80 ? "✅" : s >= 50 ? "⚠️" : "❌";

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("المدقق النحوي", "تدقيق الأخطاء النحوية والإملائية وعلامات الترقيم", "https://adwatak.cloud/tools/grammar-checker", "ar", "Text Analysis")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{name:"الرئيسية",url:"https://adwatak.cloud"},{name:"أدوات نصية",url:"https://adwatak.cloud/category/text"},{name:"المدقق النحوي",url:"https://adwatak.cloud/tools/grammar-checker"}])} />
      <Breadcrumb lang="ar" category="أدوات نصية" categorySlug="text" toolName="المدقق النحوي" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📝 المدقق النحوي</h1>
        <p className="text-sm text-gray-500 mb-6">تدقيق الأخطاء النحوية والإملائية وعلامات الترقيم</p>

        <textarea value={text} onChange={(e) => setText(e.target.value)}
          className="w-full h-[200px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y"
          placeholder="الصق النص المراد تدقيقه هنا..." />

        <button onClick={checkGrammar} disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all">
          {loading ? "جاري التدقيق..." : "🔍 تدقيق"}
        </button>

        {error && <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}

        {result && (
          <>
            <div className={`mt-6 p-6 rounded-xl border ${getScoreBg(result.score)}`}>
              <div className="text-center mb-4">
                <span className="text-5xl">{getScoreEmoji(result.score)}</span>
                <p className={`text-5xl font-extrabold mt-2 ${getScoreColor(result.score)}`}>{result.score}/100</p>
                <p className={`text-sm font-bold mt-1 ${getScoreColor(result.score)}`}>
                  {result.score >= 80 ? "نص ممتاز! أخطاء قليلة جداً" : result.score >= 50 ? "نص متوسط — يحتاج تحسين" : "نص ضعيف — يحتاج مراجعة شاملة"}
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                <div className={`h-3 rounded-full transition-all duration-700 ${result.score >= 80 ? "bg-green-500" : result.score >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
                  style={{width: `${result.score}%`}} />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 bg-white rounded-xl border border-gray-200 text-center">
                <p className="text-xs text-gray-500">عدد الأخطاء</p>
                <p className="text-3xl font-extrabold text-red-600">{result.errorCount ?? "—"}</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-200 text-center">
                <p className="text-xs text-gray-500">سهولة القراءة</p>
                <p className={`text-3xl font-extrabold ${getScoreColor(result.readabilityScore ?? 0)}`}>
                  {result.readabilityScore ?? "—"}%
                </p>
              </div>
            </div>

            {result.corrections?.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-bold text-gray-700">التصحيحات المقترحة</h3>
                {result.corrections.map((c: any, i: number) => (
                  <div key={i} className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-xs"><span className="text-red-600 line-through">{c.original}</span></p>
                    <p className="text-xs text-green-700 font-bold">→ {c.suggestion}</p>
                    <p className="text-xs text-gray-500 mt-1">{c.reason}</p>
                  </div>
                ))}
              </div>
            )}

            <p className="mt-4 text-sm text-gray-700 leading-relaxed">{result.explanation}</p>
          </>
        )}

        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500">💡 <strong>نصيحة:</strong> كل ما زاد النص زادت دقة التدقيق. راجع التصحيحات المقترحة وطبق المناسب منها.</p>
        </div>
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
