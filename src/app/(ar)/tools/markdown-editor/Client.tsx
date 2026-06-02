"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "ما هو محرر ماركداون؟", answer: "أداة مجانية لكتابة وتحرير نصوص Markdown مع معاينة مباشرة للناتج. Markdown هي لغة تنسيق بسيطة تتحول تلقائياً إلى HTML. مثالية لكتابة المقالات والتوثيق." },
  { question: "ما هو Markdown؟", answer: "لغة تنسيق خفيفة تسمح بكتابة نصوص منسقة (عناوين، قوائم، روابط، صور) باستخدام رموز بسيطة. أشهر استخداماتها: GitHub README, المقالات، والملاحظات." },
  { question: "هل أحتاج لتعلم Markdown؟", answer: "سهل جداً. في 5 دقائق تتعلم الأساسيات. العناوين: ### للعنوان، **نص** للخط العريض، [نص](رابط) للروابط، - للقوائم. المعاينة تظهر النتيجة فوراً." },
  { question: "ما الفرق بين Markdown و HTML؟", answer: "Markdown أبسط وأسرع للكتابة. HTML أقوى وأكثر تحكماً. Markdown يتحول لـ HTML تلقائياً. اكتب بـ Markdown واحصل على HTML جاهز." },
  { question: "ما استخدامات Markdown؟", answer: "كتابة ملفات README في GitHub. توثيق المشاريع. كتابة المقالات والمدونات. الملاحظات الشخصية. الوثائق الفنية. المحتوى التعليمي." },
  { question: "هل يمكن نسخ الناتج كـ HTML؟", answer: "نعم، يوجد زر 'نسخ HTML' ينسخ النص المنسق كـ HTML جاهز للاستخدام في أي صفحة ويب." },
  { question: "ما الصيغ المدعومة؟", answer: "عناوين H1-H6، خط عريض ومائل، قوائم مرتبة وغير مرتبة، روابط، صور، أكواد برمجية (inline و block)، اقتباسات، وخطوط أفقية." },
  { question: "هل الأداة مجانية؟", answer: "نعم 100% مجانية. بدون تسجيل، بدون حدود، بدون إعلانات." },
  { question: "هل تعمل على الجوال؟", answer: "نعم، متوافقة مع الجوال. واجهة responsive مع مقسم رأسي يسمح بالكتابة والمعاينة في نفس الوقت." },
  { question: "كيف أستخدم الأداة؟", answer: "اكتب في الحقل الأيسر (أو الأعلى في الجوال) بلغة Markdown. المعاينة المباشرة تظهر في الحقل الأيمن. انسخ HTML أو حمّل النتيجة." },
  { question: "هل يمكن تحميل النتيجة؟", answer: "نعم، يمكنك تحميل النص كملف .md أو .html. استخدم زر التحميل المناسب." },
  { question: "ما الفرق بين Markdown ومحررات النصوص العادية؟", answer: "محررات النصوص العادية: WYSIWYG (ما تراه هو ما تحصل عليه). Markdown: تكتب بالتنسيق النصي وترى المعاينة بجانبه. Markdown أخف وأسرع وأكثر توافقاً مع أنظمة التحكم بالنسخ." },
];

const relatedTools = [
  { title: "JSON Formatter", icon: "📋", href: "/tools/json-formatter" },
  { title: "تصغير CSS", icon: "🎨", href: "/tools/css-minifier" },
  { title: "Hash Generator", icon: "#️⃣", href: "/tools/hash-generator" },
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder" },
  { title: "SEO Audit", icon: "🔍", href: "/tools/seo-audit" },
];

const seoContent = [
  "محرر ماركداون مجاني مع معاينة مباشرة. اكتب بـ Markdown وشاهد النتيجة فوراً بتنسيق HTML جميل. مثالي لكتّاب المحتوى والمطورين وأي شخص يريد كتابة منسقة بسرعة.",
  "Markdown هي لغة التنسيق الأكثر انتشاراً في العالم التقني. GitHub, Reddit, Notion, و Slack كلها تدعم Markdown. تعلمها مرة واستخدمها في كل مكان.",
  "الأداة تدعم جميع صيغ Markdown الأساسية: عناوين، قوائم، روابط، صور، أكواد، اقتباسات. المعاينة لحظية — كل تغيير يظهر فوراً.",
  "نسخ HTML مباشر: اكتب بـ Markdown، انسخ HTML الجاهز للاستخدام في أي موقع. مناسب لكتّاب المدونات ومنشئي المحتوى.",
  "نصيحة: استخدم Markdown لكتابة المحتوى أولاً ثم انسخ HTML. أسرع من كتابة HTML يدوياً وأقل أخطاء.",
];

function renderMarkdown(md: string): string {
  let html = md
    // Headers
    .replace(/^###### (.+)$/gm, "<h6>$1</h6>")
    .replace(/^##### (.+)$/gm, "<h5>$1</h5>")
    .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Bold & Italic
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg" />')
    // Horizontal rule
    .replace(/^---$/gm, "<hr class='my-4 border-gray-300' />")
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote class="border-r-4 border-blue-500 pr-4 text-gray-600 italic">$1</blockquote>')
    // Unordered lists (simple)
    .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
    // Ordered lists (simple)
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    // Line breaks
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br />");

  // Wrap lists
  html = html.replace(/((?:<li>.*?<\/li><br \/>?)+)/g, "<ul class='list-disc pr-5 my-2'>$1</ul>");
  html = html.replace(/<\/li><br \/>/g, "</li>");

  return "<p>" + html + "</p>";
}

export default function Client() {
  const [input, setInput] = useState("# مرحباً!\nاكتب **Markdown** هنا...");
  const [copied, setCopied] = useState(false);

  const copyHTML = () => {
    navigator.clipboard.writeText(renderMarkdown(input));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = (ext: string, content: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `document.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("محرر ماركداون", "كتابة وتحرير نصوص Markdown مع معاينة مباشرة", "https://adwatak.cloud/tools/markdown-editor", "ar", "Developer Tools")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{name:"الرئيسية",url:"https://adwatak.cloud"},{name:"أدوات مطورين",url:"https://adwatak.cloud/category/dev"},{name:"محرر ماركداون",url:"https://adwatak.cloud/tools/markdown-editor"}])} />
      <Breadcrumb lang="ar" category="تطوير ويب" categorySlug="dev" toolName="محرر ماركداون" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📝 محرر ماركداون</h1>
        <p className="text-sm text-gray-500 mb-6">اكتب بلغة Markdown وشاهد المعاينة المباشرة</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            className="w-full h-[350px] p-4 border-2 border-gray-200 rounded-xl text-sm font-mono outline-none resize-y"
            placeholder="اكتب Markdown هنا..." />
          <div className="h-[350px] p-4 bg-white border-2 border-gray-200 rounded-xl overflow-y-auto text-sm leading-relaxed prose"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(input) }} />
        </div>

        <div className="flex gap-3">
          <button onClick={copyHTML} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl text-sm transition-all">
            {copied ? "✅ نُسخ!" : "📋 نسخ HTML"}
          </button>
          <button onClick={() => download("md", input)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl text-sm transition-all">
            📥 تحميل .md
          </button>
          <button onClick={() => download("html", renderMarkdown(input))} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl text-sm transition-all">
            📥 تحميل .html
          </button>
        </div>
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
