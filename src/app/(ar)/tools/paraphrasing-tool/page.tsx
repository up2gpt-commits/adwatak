"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "ما هي إعادة الصياغة؟", answer: "عملية إعادة كتابة النص بأسلوب مختلف مع الحفاظ على المعنى الأصلي. بديل للاقتباس الحرفي، يساعد على تجنب الانتحال وتقديم المحتوى بأسلوبك الشخصي." },
  { question: "هل الأداة تغير معنى النص؟", answer: "لا، الأداة تحافظ على المعنى الأصلي بالكامل. تعيد صياغة الجمل بتراكيب مختلفة وكلمات بديلة مع ضمان دقة المعنى. الهدف هو التجديد اللغوي لا التغيير." },
  { question: "ما الفرق بين إعادة الصياغة والترجمة؟", answer: "إعادة الصياغة: إعادة كتابة النفس النص بلغته الأصلية بأسلوب جديد. الترجمة: نقل النص من لغة لأخرى. أداتنا متخصصة في إعادة الصياغة، وليست مترجمة." },
  { question: "هل الأداة مفيدة لتحسين السيو؟", answer: "نعم جداً. المحتوى المعاد صياغته بشكل احترافي يعتبر محتوى أصلي لمحركات البحث. يساعد في تجنب مشاكل المحتوى المكرر (Duplicate Content) التي تضر بترتيبك في Google." },
  { question: "كم عدد الكلمات المسموح بها؟", answer: "20 حرفاً كحد أدنى، و5000 حرف كحد أقصى. للحصول على أفضل النتائج، استخدم نصوصاً بين 100-1000 كلمة." },
  { question: "هل يعيد صياغة النصوص الأكاديمية؟", answer: "نعم، مناسب للنصوص الأكاديمية والعلمية. الأداة تحافظ على المصطلحات المتخصصة والمفاهيم الدقيقة مع إعادة صياغة الأسلوب العام." },
  { question: "كم عدد الصيغ التي تنتجها الأداة؟", answer: "صيغة واحدة معاد صياغتها بشكل احترافي. إذا احتجت صيغاً متعددة، أعد تشغيل الأداة على نفس النص لتحصل على صياغة مختلفة." },
  { question: "هل البيانات آمنة؟", answer: "نعم 100%. النص يرسل لإعادة الصياغة فقط ولا يخزن. لا نحتفظ بأي سجل للنصوص المعاد صياغتها." },
  { question: "هل يناسب كتاب المحتوى والمسوقين؟", answer: "نعم، أداة أساسية لكتاب المحتوى والمسوقين. تساعد على إنتاج محتوى متنوع حول نفس الموضوع. مفيدة لإنشاء نسخ متعددة للإعلانات والمنشورات." },
  { question: "كيف أعرف أن الصياغة جيدة؟", answer: "راجع النص المعاد صياغته. تأكد من أن المعنى لم يتغير. الأداة تظهر عدد التغييرات التي تمت. كلما زادت التغييرات دون تغيير المعنى، كانت الصياغة أفضل." },
  { question: "ما الفرق بين إعادة الصياغة اليدوية والآلية؟", answer: "اليدوية: تحتاج وقتاً ومهارة لغوية. الآلية: فورية وتقترح صياغات متعددة. الأفضل الجمع بين الاثنين: ابدأ بالآلية ثم عدّل يدوياً." },
  { question: "هل الأداة تدعم العربية والإنجليزية؟", answer: "نعم، تدعم اللغتين بطلاقة. تدقق النصوص العربية الفصحى والعامية والإنجليزية بشكل متقن مع الحفاظ على روح اللغة الأصلي." },
];

const relatedTools = [
  { title: "مدقق الانتحال", icon: "🚫", href: "/tools/plagiarism-checker" },
  { title: "المدقق النحوي", icon: "📝", href: "/tools/grammar-checker" },
  { title: "كاشف المحتوى AI", icon: "🤖", href: "/tools/ai-content-detector" },
  { title: "عداد الكلمات", icon: "📊", href: "/tools/word-counter" },
  { title: "تحويل حالة النص", icon: "🔤", href: "/tools/text-case" },
  { title: "مولد الأسماء", icon: "🏷️", href: "/tools/name-generator" },
];

const seoContent = [
  "أداة إعادة الصياغة هي أداة مجانية تعيد كتابة نصوصك بأسلوب جديد مع الحفاظ على المعنى الأصلي. الصق النص واضغط 'إعادة صياغة' لتحصل على نسخة مختلفة تماماً مع إحصاءات التغييرات.",
  "مثالية لكتاب المحتوى، المدونين، الطلاب، والمسوقين. تساعد على إنتاج محتوى أصلي متعدد النسخ. تحسن ترتيبك في محركات البحث بتجنب المحتوى المكرر.",
  "الأداة مفيدة أيضاً لمن يكتبون محتوى بالعربية والإنجليزية. تعيد صياغة النصوص الأكاديمية، التسويقية، الأدبية، والتقنية بدقة عالية.",
  "كل عملية إعادة صياغة تظهر: عدد الكلمات الأصلي والجديد، عدد التغييرات التي تمت، وشرح مختصر للتعديلات. النص الناتج جاهز للنسخ والاستخدام الفوري.",
  "نصيحة: استخدم الأداة للحصول على صياغة أولية، ثم عدّل يدوياً لإضافة لمستك الشخصية. الأفضل هو المزج بين الذكاء الاصطناعي والإبداع البشري.",
];

export default function ParaphrasingTool() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const paraphrase = async () => {
    if (text.trim().length < 20) {
      setError("الرجاء إدخال نص لا يقل عن 20 حرفاً");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/paraphrasing-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), lang: "ar" }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "خطأ في إعادة الصياغة");
      setResult(await res.json());
    } catch (e: any) {
      setError(e.message || "حدث خطأ.");
    } finally {
      setLoading(false);
    }
  };

  const [copied, setCopied] = useState(false);
  const copyResult = () => {
    if (result?.paraphrasedText) {
      navigator.clipboard.writeText(result.paraphrasedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("إعادة الصياغة", "إعادة كتابة النصوص بأسلوب جديد مع الحفاظ على المعنى", "https://adwatak.cloud/tools/paraphrasing-tool", "ar", "Text Analysis")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{name:"الرئيسية",url:"https://adwatak.cloud"},{name:"أدوات نصية",url:"https://adwatak.cloud/tools/text"},{name:"إعادة الصياغة",url:"https://adwatak.cloud/tools/paraphrasing-tool"}])} />
      <Breadcrumb lang="ar" category="أدوات نصية" categorySlug="text" toolName="إعادة الصياغة" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">✏️ إعادة الصياغة</h1>
        <p className="text-sm text-gray-500 mb-6">أعد كتابة نصوصك بأسلوب جديد مع الحفاظ على المعنى</p>

        <textarea value={text} onChange={(e) => setText(e.target.value)}
          className="w-full h-[180px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y"
          placeholder="الصق النص المراد إعادة صياغته هنا..." />

        <button onClick={paraphrase} disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all">
          {loading ? "جاري إعادة الصياغة..." : "✏️ إعادة صياغة"}
        </button>

        {error && <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}

        {result && (
          <>
            <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-green-800">النص المعاد صياغته</h3>
                <button onClick={copyResult} className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg transition-all">
                  {copied ? "✅ نُسخ!" : "📋 نسخ"}
                </button>
              </div>
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{result.paraphrasedText}</p>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-white rounded-xl border border-gray-200 text-center">
                <p className="text-xs text-gray-500">الكلمات الأصلية</p>
                <p className="text-2xl font-extrabold text-gray-700">{result.originalWordCount ?? "—"}</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-200 text-center">
                <p className="text-xs text-gray-500">الكلمات الجديدة</p>
                <p className="text-2xl font-extrabold text-blue-600">{result.newWordCount ?? "—"}</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-200 text-center">
                <p className="text-xs text-gray-500">التغييرات</p>
                <p className="text-2xl font-extrabold text-green-600">{result.changes ?? "—"}</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-700 leading-relaxed">{result.explanation}</p>
          </>
        )}

        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500">💡 <strong>نصيحة:</strong> استخدم الناتج كأساس ثم أضف لمستك الشخصية. المزج بين AI والإبداع البشري يعطي أفضل نتائج.</p>
        </div>
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
