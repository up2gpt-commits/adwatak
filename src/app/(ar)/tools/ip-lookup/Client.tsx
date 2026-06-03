"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "ما هي أداة البحث عن IP؟", answer: "أداة مجانية تكشف معلومات أي عنوان IP عام. تشمل: الدولة، المدينة، مزود الخدمة (ISP)، المنظمة، الإحداثيات الجغرافية، ونظام المستقل (AS)." },
  { question: "هل يمكن البحث عن IP الخاص بي؟", answer: "نعم! اترك الحقل فارغاً أو اكتب 'my ip' لعرض معلومات IP الخاص بك. الأداة ستكشف عنوانك العام تلقائياً." },
  { question: "ما المعلومات التي تظهرها الأداة؟", answer: "عنوان IP، الدولة، المنطقة، المدينة، الرمز البريدي، مزود الخدمة (ISP)، المنظمة، نظام المستقل (ASN)، وخطوط الطول والعرض." },
  { question: "هل الأداة تخزن معلوماتي؟", answer: "لا. الأداة تجلب البيانات من خدمة ip-api.com ولا تخزن أي معلومات عن عمليات البحث. خصوصيتك مكفولة." },
  { question: "ما دقة تحديد الموقع؟", answer: "الدقة على مستوى المدينة +/- 10 كم. الأداة لا تكشف عنوانك المنزلي بالضبط — فقط المنطقة العامة." },
  { question: "هل يمكن البحث عن أي IP عالمي؟", answer: "نعم، أي عنوان IP عام (IPv4). عناوين الشبكات الخاصة (مثل 192.168.x.x) لا تعمل." },
  { question: "ما الفرق بين IP العام والخاص؟", answer: "العام: يُستخدم على الإنترنت ويعرف به جهازك خارجياً. الخاص: داخل الشبكة المنزلية (192.168.x.x, 10.x.x.x). الأداة تبحث عن العناوين العامة فقط." },
  { question: "هل الأداة مجانية؟", answer: "نعم 100% مجانية. بدون تسجيل، بدون حدود استخدام." },
  { question: "لأي استخدامات مفيدة الأداة؟", answer: "تتبع مصدر الزوار، تحليل سجلات السيرفر، التأكد من VPN/Proxy، استكشاف مشاكل الشبكة، والأمن السيبراني." },
  { question: "ما هو ASN؟", answer: "Autonomous System Number — رقم فريد يمثل شبكة كبيرة أو مزود خدمة. كل شركة إنترنت كبرى لها ASN خاص (Google: AS15169, STC: AS25019)." },
  { question: "هل تعمل على الجوال؟", answer: "نعم، متوافقة مع جميع الأجهزة. واجهة responsive." },
  { question: "كيف أستخدم الأداة؟", answer: "أدخل عنوان IP (مثل 8.8.8.8) أو اتركه فارغاً واضغط 'بحث' لمعرفة معلومات IP الخاص بك." },
];

const relatedTools = [
  { title: "SEO Audit", icon: "🔍", href: "/tools/seo-audit" },
  { title: "JSON Formatter", icon: "📋", href: "/tools/json-formatter" },
  { title: "Hash Generator", icon: "#️⃣", href: "/tools/hash-generator" },
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder" },
  { title: "محرر ماركداون", icon: "📝", href: "/tools/markdown-editor" },
];

const seoContent = [
  "أداة البحث عن IP مجانية تكشف معلومات أي عنوان IP عام: الدولة، المدينة، مزود الخدمة، والإحداثيات. أدخل أي IP أو اتركه فارغاً لمعرفة معلومات اتصالك.",
  "مثالية لمدراء الشبكات ومطوري الويب ومحللي الأمن. تساعد في تتبع مصدر الزوار، تحليل سجلات الخادم، واستكشاف مشاكل الشبكة.",
  "الأداة تستخدم خدمة ip-api.com المجانية. دقة تحديد الموقع على مستوى المدينة. لا تخزن أي بيانات عن عمليات البحث.",
  "تدعم جميع عناوين IPv4 العامة. تعرض معلومات شاملة: IP، ISP، ASN، الموقع الجغرافي، والمزيد. كل ذلك في ثوانٍ.",
  "نصيحة: استخدم الأداة للتحقق من VPN أو Proxy. إذا كان IP يظهر في دولة مختلفة، فقد يكون اتصالك عبر VPN.",
];

export default function Client() {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const lookup = async () => {
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const queryIp = ip.trim() || "";
      const res = await fetch(`https://ip-api.com/json/${queryIp}?fields=status,message,country,regionName,city,zip,lat,lon,isp,org,as,query`);
      const data = await res.json();
      if (data.status === "fail") {
        setError(data.message || "عنوان IP غير صحيح");
      } else {
        setResult(data);
      }
    } catch {
      setError("تعذر الاتصال بخدمة البحث. تأكد من اتصالك بالإنترنت.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("البحث عن IP", "الكشف عن معلومات أي عنوان IP — الدولة، المزود، الموقع", "https://adwatak.cloud/tools/ip-lookup", "ar", "Developer Tools")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{name:"الرئيسية",url:"https://adwatak.cloud"},{name:"أدوات مطورين",url:"https://adwatak.cloud/category/dev"},{name:"البحث عن IP",url:"https://adwatak.cloud/tools/ip-lookup"}])} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb lang="ar" category="تطوير ويب" categorySlug="dev" toolName="البحث عن IP" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🌐 البحث عن IP</h1>
        <p className="text-sm text-gray-500 mb-6">اعرف معلومات أي عنوان IP — الدولة، المزود، الموقع</p>

        <div className="flex gap-3">
          <input type="text" value={ip} onChange={(e) => setIp(e.target.value)}
            placeholder="أدخل IP (مثال: 8.8.8.8) أو اتركه فارغاً لمعرفة IP الخاص بك"
            className="flex-1 p-3 border-2 border-gray-200 rounded-xl text-sm outline-none"
            onKeyDown={(e) => e.key === "Enter" && lookup()} />
          <button onClick={lookup} disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold px-6 py-3 rounded-xl transition-all">
            {loading ? "جاري..." : "🔍 بحث"}
          </button>
        </div>

        {error && <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}

        {result && (
          <div className="mt-6 p-6 bg-white rounded-xl border border-gray-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "🌐 عنوان IP", value: result.query },
                { label: "🇸🇦 الدولة", value: result.country },
                { label: "📍 المنطقة", value: result.regionName },
                { label: "🏙️ المدينة", value: result.city },
                { label: "📮 الرمز البريدي", value: result.zip || "—" },
                { label: "📡 مزود الخدمة", value: result.isp },
                { label: "🏢 المنظمة", value: result.org },
                { label: "🔢 ASN", value: result.as },
                { label: "🌍 الإحداثيات", value: result.lat && result.lon ? `${result.lat}, ${result.lon}` : "—" },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-gray-800">{item.value || "—"}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500">💡 <strong>نصيحة:</strong> اترك الحقل فارغاً واضغط بحث لمعرفة IP الخاص بك. الأداة تستخدم خدمة ip-api.com المجانية.</p>
        </div>
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
