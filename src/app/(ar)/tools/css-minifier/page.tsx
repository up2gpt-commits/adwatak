"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "ما هي أداة تصغير CSS؟", answer: "أداة مجانية لتصغير (Minify) وتنسيق (Format) أكواد CSS. التصغير يزيل المسافات البيضاء والتعليقات لتقليل حجم الملف. التنسيق يرتب الكود لجعله مقروءاً." },
  { question: "لماذا أحتاج لتصغير CSS؟", answer: "تصغير CSS يقلل حجم الملف بنسبة 30-60%، مما يسرّع تحميل صفحات موقعك. سرعة الموقع عامل مهم في ترتيب Google وتحسين تجربة المستخدم." },
  { question: "ما الفرق بين Minify و Format؟", answer: "Minify: يزيل كل ما هو غير ضروري (مسافات، تعليقات، أسطر جديدة) لجعل الملف أصغر. Format: يضيف مسافات وترتيب لجعل الكود مقروءاً ومنظماً للبشر." },
  { question: "هل يؤثر التصغير على عمل الكود؟", answer: "لا، التصغير لا يغير من وظيفة الكود نهائياً. يزيل فقط المسافات البيضاء والتعليقات. الكود يعمل بنفس الكفاءة." },
  { question: "ما حجم التوفير المتوقع؟", answer: "30-60% من حجم الملف الأصلي. ملف 100KB قد يصبح 40KB بعد التصغير. التوفير يعتمد على كثافة التعليقات والمسافات في الكود الأصلي." },
  { question: "هل الأداة مجانية؟", answer: "نعم 100% مجانية. بدون تسجيل، بدون حدود استخدام، بدون إعلانات." },
  { question: "هل البيانات آمنة؟", answer: "نعم. كل شيء يتم في متصفحك. الكود لا يغادر جهازك أبداً." },
  { question: "هل يمكن استخدام الأداة للمشاريع الكبيرة؟", answer: "نعم. يمكنك لصق أي كود CSS مهما كان حجمه. الأداء سريع حتى مع الملفات الكبيرة." },
  { question: "ما الفرق بين CSS Minifier وهذه الأداة؟", answer: "نفس المبدأ. أداتنا توفر خيارين: تصغير (Minify) وتنسيق (Format) في مكان واحد. مجانية بالكامل وبدون إعلانات." },
  { question: "كيف أستخدم الأداة؟", answer: "الصق كود CSS، اختر Minify للتصغير أو Format للتنسيق. النتيجة تظهر فوراً مع إحصاءات الأحجام. استخدم زر النسخ للنسخ." },
  { question: "هل تدعم CSS3 والخصائص الحديثة؟", answer: "نعم، تدعم جميع إصدارات CSS بما فيها CSS3, Flexbox, Grid, Animations, Variables, والخصائص الحديثة." },
  { question: "متى أستخدم Minify ومتى Format؟", answer: "Minify: قبل رفع الملف للسيرفر (لتقليل الحجم). Format: عند قراءة أو تعديل كود شخص آخر (لفهمه)." },
];

const relatedTools = [
  { title: "JSON Formatter", icon: "📋", href: "/tools/json-formatter" },
  { title: "محرر ماركداون", icon: "📝", href: "/tools/markdown-editor" },
  { title: "Hash Generator", icon: "#️⃣", href: "/tools/hash-generator" },
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder" },
  { title: "SEO Audit", icon: "🔍", href: "/tools/seo-audit" },
];

const seoContent = [
  "أداة تصغير وتنسيق CSS مجانية. الصق كود CSS واحصل على نسخة مصغرة (Minified) أو منسقة (Formatted) فوراً. تعمل بالكامل في متصفحك.",
  "مثالية للمطورين ومصممي الويب. التصغير يقلل حجم ملفات CSS بنسبة 30-60%، مما يحسن سرعة تحميل المواقع. كل بايت مهم للسرعة.",
  "التنسيق (Format) يرتب الكود بشكل احترافي مع indentation مناسب. مفيد عند العمل على كود مكتوب بطريقة غير منظمة أو مأخوذ من مصادر متعددة.",
  "الأداة تظهر إحصاءات الحجم قبل وبعد المعالجة. تعرف كم وفّرت بالضبط. Minify للتصغير، Format للتنسيق، بنقرة زر.",
  "نصيحة: استخدم Minify قبل رفع الملف للسيرفر، و Format عند قراءة الكود. الأداة لا تغير وظيفة الكود — فقط المظهر الخارجي.",
];

function minify(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .replace(/;\}/g, "}")
    .trim();
}

function format(css: string): string {
  const cleaned = css.replace(/\/\*[\s\S]*?\*\//g, "").trim();
  const parts = cleaned.split(/([{}])/g);
  let indent = 0;
  let result = "";
  for (const p of parts) {
    if (p === "{") {
      result += " {\n";
      indent++;
    } else if (p === "}") {
      indent = Math.max(0, indent - 1);
      result += "\n" + "  ".repeat(indent) + "}";
    } else if (p.trim()) {
      const rules = p.split(";").filter(Boolean);
      for (const r of rules) {
        const trimmed = r.trim();
        if (trimmed) result += "\n" + "  ".repeat(indent) + trimmed + ";";
      }
    }
  }
  return result.trim();
}

export default function CSSMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"minify" | "format">("minify");
  const [copied, setCopied] = useState(false);

  const processCSS = (m: "minify" | "format") => {
    setMode(m);
    const fn = m === "minify" ? minify : format;
    setOutput(fn(input));
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("تصغير وتنسيق CSS", "تصغير (Minify) وتنسيق (Format) أكواد CSS أونلاين", "https://adwatak.cloud/tools/css-minifier", "ar", "Developer Tools")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{name:"الرئيسية",url:"https://adwatak.cloud"},{name:"أدوات مطورين",url:"https://adwatak.cloud/tools/dev"},{name:"تصغير CSS",url:"https://adwatak.cloud/tools/css-minifier"}])} />
      <Breadcrumb lang="ar" category="أدوات مطورين" categorySlug="dev" toolName="تصغير CSS" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🎨 تصغير وتنسيق CSS</h1>
        <p className="text-sm text-gray-500 mb-6">صغِّر (Minify) أو نسِّق (Format) أكواد CSS — أونلاين ومجاني</p>

        <div className="flex gap-3 mb-4">
          <button onClick={() => processCSS("minify")} className={`font-bold py-2 px-6 rounded-xl transition-all ${mode === "minify" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>🔽 Minify</button>
          <button onClick={() => processCSS("format")} className={`font-bold py-2 px-6 rounded-xl transition-all ${mode === "format" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>📐 Format</button>
        </div>

        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          className="w-full h-[150px] p-4 border-2 border-gray-200 rounded-xl text-sm font-mono outline-none resize-y"
          placeholder="الصق كود CSS هنا..." />

        {output && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500">
                الحجم: {input.length} ← {output.length} حرف (توفير {input.length > 0 ? Math.round((1 - output.length / input.length) * 100) : 0}%)
              </p>
              <button onClick={copyOutput} className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-all">
                {copied ? "✅ نُسخ!" : "📋 نسخ"}
              </button>
            </div>
            <pre className="text-xs font-mono text-gray-800 whitespace-pre-wrap max-h-[300px] overflow-y-auto">{output}</pre>
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
