"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import SEOContent from "../../../components/SEOContent";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";

const LANG = "en";
const T: Record<string, string> = {
  title: "Keyword Research Tool",
  subtitle: "Get accurate keyword suggestions to boost your SEO",
  inputLabel: "Seed keyword or topic",
  inputPlaceholder: "e.g. real estate marketing, mortgage calculator...",
  searchBtn: "🔍 Search",
  searching: "⏳ Analyzing...",
  results: "Keyword Results",
  noResults: "Could not generate keywords. Try a different term.",
  error: "Something went wrong. Please try again.",
  keyword: "Keyword",
  volume: "Monthly Volume",
  competition: "Competition",
  difficulty: "Difficulty",
  contentType: "Content Type",
  low: "Low",
  medium: "Medium",
  high: "High",
  analysis: "Quick Analysis",
  totalKeywords: "Total Keywords",
  avgDifficulty: "Avg Difficulty",
  easyWins: "Easy Wins",
  topRec: "Top Recommendation",
  summary: "Summary",
  share: "Share",
};

const seoContent = [
  "Research keywords for your SEO strategy with our free AI-powered keyword research tool. Enter a seed keyword and get hundreds of related keyword suggestions with monthly search volume, competition level, and difficulty scores.",
  "Perfect for content creators, bloggers, and SEO professionals. Find low-competition keywords (easy wins) to rank faster, discover long-tail keyword opportunities, and plan your content calendar based on real data.",
  "Each keyword result shows: Monthly search volume (how many people search for this term), Competition level (low/medium/high), Difficulty score (0-100), and Recommended content type. Use the analysis dashboard to quickly identify the best opportunities.",
  "Tip: Focus on keywords with low competition (green badge) and medium difficulty (30-60). These offer the best balance of search volume vs. ranking difficulty. Avoid keywords with 80+ difficulty unless you have a strong domain.",
  "Start with seed keywords from your niche (e.g., 'mortgage calculator' for finance). Our tool generates hundreds of related terms you might have missed. Build content clusters around your best keywords for maximum SEO impact.",
];

const faqs = [
  { question: "What is keyword research?", answer: "Keyword research is the process of finding terms people search for in your niche. It helps you create content that ranks in Google, attracts targeted traffic, and grows your audience. Without keyword research, you are publishing content blindly." },
  { question: "Why is keyword research important?", answer: "93% of online experiences begin with a search engine. Ranking for the right keywords means free, consistent traffic. Without it, your content gets buried. Keyword research shows you exactly what your audience wants to read." },
  { question: "Short-tail vs long-tail keywords?", answer: "Short-tail = 1-2 words, high volume, high competition (e.g., 'SEO tools'). Long-tail = 3+ words, lower volume, lower competition (e.g., 'best free SEO keyword research tools'). Long-tail converts better — 70% of search traffic comes from long-tail queries." },
  { question: "What is keyword difficulty?", answer: "A score (0-100) estimating how hard it is to rank for a keyword. 0-30 = Easy (new sites can rank), 30-60 = Medium (needs solid content), 60-80 = Hard (needs backlinks), 80+ = Very Hard (established domains only). Start with easy wins." },
  { question: "What is search volume?", answer: "The estimated number of monthly searches for a keyword. High volume (1000+) = more traffic potential but harder to rank. Low volume (10-100) = easier to rank but less traffic. Best strategy: mix of high and low volume keywords." },
  { question: "How many keywords to target per page?", answer: "Start with 1-3 main keywords per page and 5-10 related keywords. Good strategy: 30% easy keywords (0-30 difficulty), 50% medium (30-60), 20% hard (60+). This gives quick wins while building long-term authority." },
  { question: "Can I use this for SEO?", answer: "Yes — keyword research is the foundation of SEO. Use it to plan blog posts, product pages, category pages, and even video content. Google ranks content that matches search intent. Keyword research reveals what searchers want." },
  { question: "Is this tool free?", answer: "Yes, 100% free. No signup, no usage limits, no hidden fees. Adawatak provides free SEO tools for everyone." },
  { question: "What is the best beginner strategy?", answer: "Step 1: Brainstorm 10 seed keywords about your topic. Step 2: Use our tool to expand each into related terms. Step 3: Filter for low competition + medium volume keywords. Step 4: Create one piece of content per keyword. Step 5: Track rankings and double down on what works." },
  { question: "How many keyword suggestions per search?", answer: "Our tool generates hundreds of related keyword suggestions per seed keyword, complete with volume, competition, and difficulty data." },
];

const relatedTools = [
  { title: "SEO Audit", icon: "🔎", href: "/en/tools/seo-audit" },
  { title: "SEO Content Generator", icon: "✍️", href: "/en/tools/seo-content-generator" },
  { title: "AI Content Detector", icon: "🤖", href: "/en/tools/ai-content-detector" },
  { title: "Plagiarism Checker", icon: "🚫", href: "/en/tools/plagiarism-checker" },
  { title: "Grammar Checker", icon: "📝", href: "/en/tools/grammar-checker" },
  { title: "Paraphrasing Tool", icon: "✏️", href: "/en/tools/paraphrasing-tool" },
];

function CompetitionBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[level] || "bg-gray-100"}`}>
      {T[level] || level}
    </span>
  );
}

function DifficultyBar({ score }: { score: number }) {
  const color = score < 30 ? "bg-green-500" : score < 60 ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(score, 100)}%` }} />
      </div>
      <span className="text-xs text-gray-500">{score}/100</span>
    </div>
  );
}

export default function Client() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!keyword.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const r = await fetch("/api/keyword-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: keyword.trim(), lang: "en" }),
      });
      const data = await r.json();
      if (data.error) setError(data.error);
      else setResult(data);
    } catch {
      setError(T.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-[820px] mx-auto">
      <StructuredData data={toolSchema("keyword-research", "Keyword Research Tool", "https://adwatak.cloud/en/tools/keyword-research", "en")} />
      <StructuredData data={faqSchema(faqs)} />
      <Breadcrumb lang="en" category="SEO Tools" categorySlug="seo" toolName="Keyword Research" />
      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-6">
        <div className="text-center mb-6">
          <span className="text-5xl">🔍</span>
          <h1 className="text-2xl font-extrabold mt-3 mb-1">{T.title}</h1>
          <p className="text-gray-500 text-sm">{T.subtitle}</p>
        </div>
        <div className="flex gap-2 max-w-[600px] mx-auto">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder={T.inputPlaceholder}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !keyword.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition whitespace-nowrap"
          >
            {loading ? T.searching : T.searchBtn}
          </button>
        </div>
      </div>

      {loading && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center mb-6">
          <div className="animate-spin text-4xl mb-3 inline-block">⏳</div>
          <p className="text-gray-500">Analyzing keywords...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {result && result.keywords && (
        <>
          {result.analysis && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">{T.analysis}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-white rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">{result.analysis.totalKeywords}</div>
                  <div className="text-xs text-gray-500">{T.totalKeywords}</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-indigo-600">{result.analysis.avgDifficulty}</div>
                  <div className="text-xs text-gray-500">{T.avgDifficulty}</div>
                </div>
              </div>
              {result.analysis.easyWins?.length > 0 && (
                <div className="mb-3">
                  <div className="text-sm font-semibold text-gray-700 mb-1">{T.easyWins}:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.analysis.easyWins.map((w: string, i: number) => (
                      <span key={i} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{w}</span>
                    ))}
                  </div>
                </div>
              )}
              {result.analysis.topRecommendation && (
                <div className="text-sm text-gray-600 mb-1">
                  <span className="font-semibold">{T.topRec}:</span> {result.analysis.topRecommendation}
                </div>
              )}
              {result.analysis.summary && (
                <div className="text-sm text-gray-500">
                  <span className="font-semibold">{T.summary}:</span> {result.analysis.summary}
                </div>
              )}
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h2 className="font-bold">{T.results}</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {result.keywords.map((kw: any, i: number) => (
                <div key={i} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                    <span className="font-semibold text-gray-800 text-sm">{kw.keyword}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{kw.volume}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <CompetitionBadge level={kw.competition} />
                    <DifficultyBar score={kw.difficulty} />
                    <span className="text-gray-400">{kw.contentType}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}
