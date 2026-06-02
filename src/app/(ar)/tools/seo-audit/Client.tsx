"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

interface AuditResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  details: Record<string, { value: string; status: string }>;
  rawData: Record<string, any>;
}

const faqs = [
  { question: "ما هو تدقيق SEO؟", answer: "تحليل شامل لموقعك الإلكتروني لقياس مدى توافقه مع معايير محركات البحث. يغطي العناوين، الوصف، الروابط، الصور، السرعة، والبيانات المنظمة. يساعدك على تحسين ترتيب موقعك في Google." },
  { question: "كم مرة يجب عمل تدقيق SEO؟", answer: "شهرياً للمواقع النشطة. ربع سنوياً للمواقع المتوسطة. بعد أي تحديث كبير في الموقع (إعادة تصميم، إضافة صفحات كثيرة، تغيير بنية الروابط)." },
  { question: "ما هي أهم عناصر SEO الداخلي؟", answer: "عنوان الصفحة (Title Tag) - يجب أن يكون فريداً وواضحاً. الوصف (Meta Description) - يحفز النقر من نتائج البحث. هيكلة العناوين (H1-H6) - تنظيم المحتوى هرمياً. الصور مع Alt Text - تحسين السيو وسهولة الوصول." },
  { question: "ما هو الـ Meta Title المثالي؟", answer: "بين 50-60 حرفاً، يحتوي على الكلمة المفتاحية الأساسية في البداية، فريد لكل صفحة، ويعكس محتوى الصفحة بدقة. مثال: 'حاسبة القرض العقاري | أدواتك' أفضل من 'الصفحة الرئيسية'." },
  { question: "ما هو الـ Meta Description المثالي؟", answer: "بين 120-160 حرفاً، يلخص محتوى الصفحة، يحتوي على الكلمة المفتاحية ويحفز على النقر (Call to Action). يظهر تحت عنوان الصفحة في نتائج البحث." },
  { question: "ما أهمية الروابط الداخلية؟", answer: "تساعد Google على فهم هيكلة موقعك، تنقل قوة الروابط (Link Juice) بين الصفحات، تحسن تجربة المستخدم، وتزيد مشاهدات الصفحات. كل صفحة يجب أن تحتوي على 2-5 روابط داخلية." },
  { question: "ما هو الـ Schema Markup؟", answer: "كود JSON-LD يضاف للموقع لمساعدة Google على فهم المحتوى بشكل أفضل. أنواعه: Article، Product، FAQ، BreadcrumbList، LocalBusiness. المواقع التي تستخدم Schema تظهر بشكل أفضل في النتائج بميزات مثل Rich Snippets." },
  { question: "ما هو الـ H1 المثالي؟", answer: "يفضل H1 واحد فقط في كل صفحة. يحتوي على الكلمة المفتاحية الأساسية. يصف المحتوى بدقة. أكثر من H1 يشتت محركات البحث ويقلل فعالية السيو." },
  { question: "لماذا Alt Text في الصور مهم؟", answer: "يساعد Google على فهم محتوى الصور (Google لا يرى الصور). يحسن ترتيب الصور في Google Images. ضروري لسهولة الوصول (Accessibility) للمكفوفين." },
  { question: "هل الروابط الخارجية تضر بالسيو؟", answer: "الروابط الخارجية لمواقع موثوقة تحسن مصداقية موقعك. لكن روابط لمواقع مشبوهة أو مخترقة تضر. استخدم nofollow للروابط الخارجية غير الموثوقة." },
  { question: "ما الفرق بين On-Page و Off-Page SEO؟", answer: "On-Page: تحسينات داخل الموقع (عناوين، محتوى، صور، سرعة). Off-Page: روابط خارجية (Backlinks)، تواصل اجتماعي، سمعة العلامة التجارية. الاثنان ضروريان للترتيب الأول." },
  { question: "كيف أحسن سرعة موقعي؟", answer: "ضغط الصور (WebP). تقليل طلبات HTTP. استخدام CDN. تفعيل التخزين المؤقت (Caching). تقليل حجم JavaScript/CSS. استخدام Lazy Loading للصور. سرعة الموقع عامل ترتيب مهم في Google." },
];

const relatedTools = [
  { title: "كاشف المحتوى AI", icon: "🤖", href: "/tools/ai-content-detector" },
  { title: "JSON Formatter", icon: "📋", href: "/tools/json-formatter" },
  { title: "Hash Generator", icon: "#️⃣", href: "/tools/hash-generator" },
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder" },
  { title: "مولد QR Code", icon: "🔳", href: "/tools/qr-generator" },
  { title: "مولد كلمات السر", icon: "🔐", href: "/tools/password-generator" },
];

const seoContent = [
  "SEO Audit أو تدقيق السيو هو أداة مجانية تحلل موقعك الإلكتروني وتقيِّم مدى توافقه مع معايير تحسين محركات البحث. أدخل رابط أي صفحة وستحصل على تقرير شامل يتضمن: تقييم العنوان والوصف، هيكلة العناوين، جودة المحتوى، تحليل الصور، الروابط الداخلية والخارجية، والبيانات المنظمة.",
  "الأداة تفحص الموقع مباشرة وتحلل أكثر من 15 عامل SEO أساسي، ثم تستخدم الذكاء الاصطناعي لتقديم توصيات مخصصة لتحسين ترتيبك في Google. التقرير يظهر كنسبة مئوية مع نقاط القوة والضعف والتوصيات.",
  "مثالية لأصحاب المواقع والمدونين ومتخصصي التسويق الرقمي. استخدمها لتحسين أداء موقعك قبل المنافسين. التدقيق المنتظم للسيو يساعد في اكتشاف المشاكل مبكراً وتحسين تجربة المستخدم.",
  "الأداة تحلل: Title Tag، Meta Description، H1-H6، Alt Text للصور، عدد الكلمات، البيانات المنظمة (Schema)، معاينة Open Graph، استجابة الموقع للجوال، والروابط. النتائج تظهر خلال ثوانٍ.",
  "نصيحة: استخدم الأداة شهرياً لمراقبة تحسن موقعك. ركز على التوصيات ذات الأولوية العالية أولاً. السيو رحلة مستمرة وليس مهمة لمرة واحدة.",
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    good: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    bad: "bg-red-100 text-red-700",
  };
  const labels: Record<string, string> = {
    good: "جيد",
    warning: "تنبيه",
    bad: "ضعيف",
  };
  return (
    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${colors[status] || "bg-gray-100"}`}>
      {labels[status] || status}
    </span>
  );
}

export default function Client() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runAudit = async () => {
    if (!url.match(/^https?:\/\/.+/)) {
      setError("الرجاء إدخال رابط صحيح يبدأ بـ http:// أو https://");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), lang: "ar" }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "فشل التحليل");
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
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-50 border-green-200";
    if (score >= 50) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 80) return "🚀";
    if (score >= 50) return "🔧";
    return "⚠️";
  };

  const detailKeys: Record<string, string> = {
    title: "📌 عنوان الصفحة",
    metaDescription: "📝 الوصف",
    headings: "📐 العناوين (H1-H6)",
    images: "🖼️ الصور",
    content: "📄 المحتوى",
    technical: "⚙️ تقني",
    links: "🔗 الروابط",
    schema: "🏗️ البيانات المنظمة",
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("SEO Audit", "تدقيق وتحليل السيو لموقعك الإلكتروني", "https://adwatak.cloud/tools/seo-audit", "ar", "SEO")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{name:"الرئيسية",url:"https://adwatak.cloud"},{name:"أدوات تطوير",url:"https://adwatak.cloud/category/dev"},{name:"SEO Audit",url:"https://adwatak.cloud/tools/seo-audit"}])} />
      <Breadcrumb lang="ar" category="تطوير ويب" categorySlug="dev" toolName="SEO Audit" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔍 SEO Audit</h1>
        <p className="text-sm text-gray-500 mb-6">تدقيق وتحليل السيو لأي موقع إلكتروني — تقييم فوري مع توصيات</p>

        <div className="flex gap-3">
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 p-3 border-2 border-gray-200 rounded-xl text-sm outline-none"
            onKeyDown={(e) => e.key === "Enter" && runAudit()} />
          <button onClick={runAudit} disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold px-6 py-3 rounded-xl transition-all">
            {loading ? "جاري..." : "🔍 تدقيق"}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
        )}

        {result && (
          <>
            {/* Score Card */}
            <div className={`mt-6 p-6 rounded-xl border ${getScoreBg(result.score)}`}>
              <div className="text-center">
                <span className="text-5xl">{getScoreEmoji(result.score)}</span>
                <p className={`text-5xl font-extrabold mt-2 ${getScoreColor(result.score)}`}>{result.score}/100</p>
                <p className="text-sm text-gray-500 mt-1">
                  {result.score >= 80 ? "موقع ممتاز! تحسينات بسيطة فقط" : result.score >= 50 ? "موقع متوسط — يحتاج تحسينات" : "ضعيف — يحتاج تحسينات جوهرية"}
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                <div className={`h-4 rounded-full transition-all duration-700 ${
                  result.score >= 80 ? "bg-green-500" : result.score >= 50 ? "bg-yellow-500" : "bg-red-500"
                }`} style={{width: `${result.score}%`}} />
              </div>
            </div>

            {/* Details Grid */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(result.details || {}).map(([key, val]) => (
                <div key={key} className="p-4 bg-white rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-700">{detailKeys[key] || key}</span>
                    <StatusBadge status={val.status} />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{val.value}</p>
                </div>
              ))}
            </div>

            {/* Raw Data */}
            {result.rawData && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-sm font-bold text-gray-700 mb-3">📊 بيانات أساسية</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "رمز الحالة", value: result.rawData.statusCode },
                    { label: "عدد الكلمات", value: result.rawData.wordCount },
                    { label: "H1", value: result.rawData.h1Count },
                    { label: "H2", value: result.rawData.h2Count },
                    { label: "صور", value: result.rawData.totalImages },
                    { label: "صور بدون Alt", value: result.rawData.imagesWithoutAlt },
                    { label: "روابط داخلية", value: result.rawData.internalLinks },
                    { label: "روابط خارجية", value: result.rawData.externalLinks },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-lg p-3 text-center border border-gray-100">
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className="text-lg font-extrabold text-gray-900">{item.value ?? "—"}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {result.rawData.hasSchema && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">✅ Schema</span>}
                  {result.rawData.hasViewport && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">✅ متجاوب</span>}
                  {result.rawData.hasFavicon && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">✅ Favicon</span>}
                  {result.rawData.hasCanonical && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">✅ Canonical</span>}
                  {result.rawData.hasHreflang && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">✅ Hreflang</span>}
                  {result.rawData.hasRobotsMeta && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">✅ Meta Robots</span>}
                </div>
              </div>
            )}

            {/* Strengths & Weaknesses */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {result.strengths?.length > 0 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <h3 className="text-sm font-bold text-green-800 mb-2">✅ نقاط القوة</h3>
                  <ul className="text-xs text-green-700 space-y-1">
                    {result.strengths.map((s, i) => <li key={i}>• {s}</li>)}
                  </ul>
                </div>
              )}
              {result.weaknesses?.length > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <h3 className="text-sm font-bold text-red-800 mb-2">❌ نقاط الضعف</h3>
                  <ul className="text-xs text-red-700 space-y-1">
                    {result.weaknesses.map((w, i) => <li key={i}>• {w}</li>)}
                  </ul>
                </div>
              )}
            </div>

            {/* Recommendations */}
            {result.recommendations?.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h3 className="text-sm font-bold text-blue-800 mb-2">💡 توصيات للتحسين</h3>
                <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                  {result.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                </ol>
              </div>
            )}
          </>
        )}

        {/* Tip */}
        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500">
            💡 <strong>نصيحة:</strong> أدخل رابط صفحة كامل (https://...). التحليل يأخذ 5-10 ثوانٍ. 
            كلما زادت جودة الموقع، زاد التقييم. ركز على توصيات التحسين الأهم أولاً.
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
