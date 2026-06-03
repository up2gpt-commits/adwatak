"use client";
import { useState } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
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
  { question: "What is an SEO Audit?", answer: "A comprehensive analysis of your website to measure compliance with search engine standards. It covers titles, descriptions, links, images, speed, and structured data. Helps improve your Google ranking." },
  { question: "How often should I run an SEO Audit?", answer: "Monthly for active sites. Quarterly for medium sites. After any major update (redesign, many new pages, URL structure changes). Regular audits catch problems early." },
  { question: "What are the most important on-page SEO factors?", answer: "Title Tag (unique, clear, 50-60 chars). Meta Description (120-160 chars, compelling). Heading Structure (H1-H6 hierarchy). Images with Alt Text. URL structure. Content quality and length." },
  { question: "What is the ideal Meta Title?", answer: "50-60 characters, primary keyword at the beginning, unique per page, accurately reflects page content. Example: 'Mortgage Calculator | Adawatak' not 'Home Page'." },
  { question: "What is the ideal Meta Description?", answer: "120-160 characters, summarizes page content, includes keyword, has a call to action. Appears under the title in search results. Good descriptions increase click-through rates." },
  { question: "Why are internal links important?", answer: "They help Google understand your site structure, distribute link juice between pages, improve user experience, and increase page views. Each page should have 2-5 internal links." },
  { question: "What is Schema Markup?", answer: "JSON-LD code added to your site to help Google understand content better. Types: Article, Product, FAQ, BreadcrumbList, LocalBusiness. Sites with Schema show richer results with features like Rich Snippets." },
  { question: "What is the ideal H1 tag?", answer: "One H1 per page is best practice. Should contain the primary keyword and accurately describe the content. Multiple H1 tags confuse search engines." },
  { question: "Why is Alt Text important for images?", answer: "Helps Google understand image content (Google can't see images). Improves ranking in Google Images. Essential for accessibility for visually impaired users." },
  { question: "Do external links hurt SEO?", answer: "Links to authoritative sites improve your credibility. Links to spammy or hacked sites hurt. Use nofollow for untrusted external links. Quality matters more than quantity." },
  { question: "What's the difference between On-Page and Off-Page SEO?", answer: "On-Page: internal optimizations (titles, content, images, speed). Off-Page: external signals (backlinks, social media, brand reputation). Both are essential for top rankings." },
  { question: "How can I improve site speed?", answer: "Compress images (WebP). Reduce HTTP requests. Use CDN. Enable caching. Minify JavaScript/CSS. Use Lazy Loading. Site speed is a confirmed Google ranking factor." },
];

const relatedTools = [
  { title: "AI Content Detector", icon: "🤖", href: "/en/tools/ai-content-detector" },
  { title: "JSON Formatter", icon: "📋", href: "/en/tools/json-formatter" },
  { title: "Hash Generator", icon: "#️⃣", href: "/en/tools/hash-generator" },
  { title: "Base64 Encoder", icon: "🔄", href: "/en/tools/base64-encoder" },
  { title: "QR Generator", icon: "🔳", href: "/en/tools/qr-generator" },
  { title: "Password Generator", icon: "🔐", href: "/en/tools/password-generator" },
];

const seoContent = [
  "SEO Audit is a free tool that analyzes any website and evaluates its search engine optimization. Enter any page URL and get a comprehensive report covering title tags, meta descriptions, heading structure, content quality, image optimization, internal/external links, and structured data.",
  "The tool scans the site directly and analyzes 15+ SEO factors, then uses AI to provide personalized recommendations. The report shows as a percentage score with strengths, weaknesses, and actionable recommendations.",
  "Perfect for website owners, bloggers, and digital marketers. Use it to improve your site's performance before your competitors. Regular SEO audits help catch issues early and improve user experience.",
  "The tool analyzes: Title Tag, Meta Description, H1-H6 structure, Image Alt Text, Word count, Schema markup, Open Graph preview, Mobile responsiveness, and Links. Results appear in seconds.",
  "Tip: Run an audit monthly to track improvement. Focus on high-priority recommendations first. SEO is an ongoing journey, not a one-time task.",
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    good: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    bad: "bg-red-100 text-red-700",
  };
  const labels: Record<string, string> = {
    good: "Good",
    warning: "Warning",
    bad: "Poor",
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
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), lang: "en" }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Analysis failed");
      }
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setError(e.message || "An error occurred. Try again.");
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
    title: "📌 Page Title",
    metaDescription: "📝 Meta Description",
    headings: "📐 Headings (H1-H6)",
    images: "🖼️ Images",
    content: "📄 Content",
    technical: "⚙️ Technical",
    links: "🔗 Links",
    schema: "🏗️ Schema Markup",
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("SEO Audit", "Free SEO audit and analysis tool for any website", "https://adwatak.cloud/en/tools/seo-audit", "en", "SEO")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{name:"Home",url:"https://adwatak.cloud/en"},{name:"Developer Tools",url:"https://adwatak.cloud/en/category/dev"},{name:"SEO Audit",url:"https://adwatak.cloud/en/tools/seo-audit"}])} />
      {/* GEO: Speakable — yapay zeka/ses motorları için işaretli içerik */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb lang="en" category="Dev Tools" categorySlug="dev" toolName="SEO Audit" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔍 SEO Audit</h1>
        <p className="text-sm text-gray-500 mb-6">Free website SEO audit — instant analysis with recommendations</p>

        <div className="flex gap-3">
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 p-3 border-2 border-gray-200 rounded-xl text-sm outline-none"
            onKeyDown={(e) => e.key === "Enter" && runAudit()} />
          <button onClick={runAudit} disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold px-6 py-3 rounded-xl transition-all">
            {loading ? "Running..." : "🔍 Audit"}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
        )}

        {result && (
          <>
            <div className={`mt-6 p-6 rounded-xl border ${getScoreBg(result.score)}`}>
              <div className="text-center">
                <span className="text-5xl">{getScoreEmoji(result.score)}</span>
                <p className={`text-5xl font-extrabold mt-2 ${getScoreColor(result.score)}`}>{result.score}/100</p>
                <p className="text-sm text-gray-500 mt-1">
                  {result.score >= 80 ? "Great site! Minor improvements only" : result.score >= 50 ? "Average — needs work" : "Poor — needs major improvements"}
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                <div className={`h-4 rounded-full transition-all duration-700 ${
                  result.score >= 80 ? "bg-green-500" : result.score >= 50 ? "bg-yellow-500" : "bg-red-500"
                }`} style={{width: `${result.score}%`}} />
              </div>
            </div>

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

            {result.rawData && (
              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-sm font-bold text-gray-700 mb-3">📊 Key Metrics</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Status Code", value: result.rawData.statusCode },
                    { label: "Word Count", value: result.rawData.wordCount },
                    { label: "H1 Tags", value: result.rawData.h1Count },
                    { label: "H2 Tags", value: result.rawData.h2Count },
                    { label: "Images", value: result.rawData.totalImages },
                    { label: "Missing Alt", value: result.rawData.imagesWithoutAlt },
                    { label: "Internal Links", value: result.rawData.internalLinks },
                    { label: "External Links", value: result.rawData.externalLinks },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-lg p-3 text-center border border-gray-100">
                      <p className="text-xs text-gray-500">{item.label}</p>
                      <p className="text-lg font-extrabold text-gray-900">{item.value ?? "—"}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {result.rawData.hasSchema && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">✅ Schema</span>}
                  {result.rawData.hasViewport && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">✅ Responsive</span>}
                  {result.rawData.hasFavicon && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">✅ Favicon</span>}
                  {result.rawData.hasCanonical && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">✅ Canonical</span>}
                  {result.rawData.hasHreflang && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">✅ Hreflang</span>}
                  {result.rawData.hasRobotsMeta && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">✅ Robots Meta</span>}
                </div>
              </div>
            )}

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {result.strengths?.length > 0 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <h3 className="text-sm font-bold text-green-800 mb-2">✅ Strengths</h3>
                  <ul className="text-xs text-green-700 space-y-1">
                    {result.strengths.map((s, i) => <li key={i}>• {s}</li>)}
                  </ul>
                </div>
              )}
              {result.weaknesses?.length > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <h3 className="text-sm font-bold text-red-800 mb-2">❌ Weaknesses</h3>
                  <ul className="text-xs text-red-700 space-y-1">
                    {result.weaknesses.map((w, i) => <li key={i}>• {w}</li>)}
                  </ul>
                </div>
              )}
            </div>

            {result.recommendations?.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h3 className="text-sm font-bold text-blue-800 mb-2">💡 Recommendations</h3>
                <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                  {result.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                </ol>
              </div>
            )}
          </>
        )}

        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500">
            💡 <strong>Tip:</strong> Enter a full page URL (https://...). Analysis takes 5-10 seconds.
            Focus on the highest-priority recommendations first.
          </p>
        </div>
      </div>
      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}
