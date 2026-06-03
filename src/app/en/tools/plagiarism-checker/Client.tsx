"use client";
import { useState } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "What is a Plagiarism Checker?", answer: "A free tool that detects copied or improperly cited text. Uses AI to analyze text originality, identify potential plagiarism, and provide improvement suggestions. Essential for writers, students, and academics." },
  { question: "How accurate is plagiarism detection?", answer: "High accuracy exceeding 85%. The AI detects repetitive patterns, unusual phrasing, and unoriginal structures. However, no tool is 100% accurate — use it as a primary reference." },
  { question: "Does it support Arabic and English?", answer: "Yes, fluently. Analyzes Arabic, English, and mixed-language texts with equal accuracy." },
  { question: "What text length is needed?", answer: "Minimum 50 characters. Longer texts give more accurate results. Best with 200-2000 words for optimal accuracy." },
  { question: "Is my data safe?", answer: "100% private. Text is sent for analysis only and is never stored. We keep no database of analyzed content." },
  { question: "What is the Originality Score?", answer: "A percentage reflecting content authenticity. 90-100% = highly original. 70-89% = good. Below 70% = needs review and proper citation." },
  { question: "Is it suitable for academic research?", answer: "Yes, ideal for students and researchers. Verify your work's originality before submission. Best used alongside proper citation tools." },
  { question: "How to use the results?", answer: "Focus on suggestions to improve your text. Rewrite flagged sections. Add missing citations. Use regularly to improve your writing quality." },
  { question: "Can translated content be detected?", answer: "Translation without citing the source is considered indirect plagiarism. The tool detects literal translations from known source patterns." },
  { question: "Is it completely free?", answer: "Yes, 100% free. No registration, no usage limits, no paid plans. Just paste and check." },
  { question: "What types of plagiarism does it detect?", answer: "Direct copying, paraphrased uncredited content, mosaic plagiarism, self-plagiarism, and improperly cited translations." },
  { question: "How can I avoid plagiarism?", answer: "Paraphrase in your own words, use quotation marks for direct quotes, cite all sources, and use this tool to verify before publishing." },
];

const relatedTools = [
  { title: "AI Content Detector", icon: "🤖", href: "/en/tools/ai-content-detector" },
  { title: "Paraphrasing Tool", icon: "✏️", href: "/en/tools/paraphrasing-tool" },
  { title: "Grammar Checker", icon: "📝", href: "/en/tools/grammar-checker" },
  { title: "Word Counter", icon: "📊", href: "/en/tools/word-counter" },
  { title: "Text Compare", icon: "⚖️", href: "/en/tools/text-compare" },
  { title: "Text Cleaner", icon: "🧹", href: "/en/tools/text-cleaner" },
];

const seoContent = [
  "Free Plagiarism Checker — detect copied content and assess text originality. Paste text and click check for instant analysis including plagiarism percentage, originality score, citation issues, and improvement suggestions.",
  "Essential for students, researchers, writers, and content creators. Verify content authenticity before publishing. Protect your reputation and avoid copyright issues.",
  "AI-powered analysis detects direct copying, paraphrased uncredited content, and citation problems. Results include actionable suggestions for improvement.",
  "The tool supports Arabic, English, and mixed-language texts. Analysis is fast and accurate. Use it as part of your writing workflow.",
  "Tip: Use this tool before publishing any important content. Review suggestions carefully. Always cite your sources properly.",
];

export default function Client() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const check = async () => {
    if (text.trim().length < 50) { setError("Please enter at least 50 characters"); return; }
    setError(""); setLoading(true); setResult(null);
    try {
      const res = await fetch("/api/plagiarism-checker", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), lang: "en" }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Analysis failed");
      setResult(await res.json());
    } catch (e: any) { setError(e.message || "Error occurred."); } finally { setLoading(false); }
  };

  const gc = (s: number) => s < 30 ? "text-green-600" : s < 60 ? "text-yellow-600" : "text-red-600";
  const gb = (s: number) => s < 30 ? "bg-green-50 border-green-200" : s < 60 ? "bg-yellow-50 border-yellow-200" : "bg-red-50 border-red-200";
  const ge = (s: number) => s < 30 ? "✅" : s < 60 ? "⚠️" : "🚫";

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Plagiarism Checker", "Check text originality and detect plagiarized content", "https://adwatak.cloud/en/tools/plagiarism-checker", "en", "Text Analysis")} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema([{name:"Home",url:"https://adwatak.cloud/en"},{name:"Text Tools",url:"https://adwatak.cloud/en/category/text"},{name:"Plagiarism Checker",url:"https://adwatak.cloud/en/tools/plagiarism-checker"}])} />
      {/* GEO: Speakable — marks key content for AI/voice engines (ChatGPT, Perplexity, Google Assistant) */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb lang="en" category="Text Tools" categorySlug="text" toolName="Plagiarism Checker" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🚫 Plagiarism Checker</h1>
        <p className="text-sm text-gray-500 mb-6">Detect copied content and assess text originality</p>
        <textarea value={text} onChange={(e) => setText(e.target.value)}
          className="w-full h-[200px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y"
          placeholder="Paste your text here for plagiarism check..." />
        <button onClick={check} disabled={loading}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all">
          {loading ? "Checking..." : "🔍 Check"}
        </button>
        {error && <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}
        {result && (
          <>
            <div className={`mt-6 p-6 rounded-xl border ${gb(result.score)}`}>
              <div className="text-center mb-4">
                <span className="text-5xl">{ge(result.score)}</span>
                <p className={`text-5xl font-extrabold mt-2 ${gc(result.score)}`}>{result.score}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                <div className={`h-3 rounded-full transition-all ${result.score < 30 ? "bg-green-500" : result.score < 60 ? "bg-yellow-500" : "bg-red-500"}`} style={{width:`${result.score}%`}} />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Originality Score</p>
                <p className={`text-2xl font-extrabold ${gc(100 - result.score)}`}>{result.originalScore ?? 100 - result.score}%</p>
              </div>
              {result.citationIssues?.length > 0 && (
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <p className="text-xs font-bold text-yellow-800 mb-2">Citation Issues</p>
                  {result.citationIssues.map((i: string, idx: number) => <p key={idx} className="text-xs text-yellow-700">• {i}</p>)}
                </div>
              )}
            </div>
            <p className="mt-4 text-sm text-gray-700 leading-relaxed">{result.explanation}</p>
            {result.suggestions?.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h3 className="text-sm font-bold text-blue-800 mb-2">💡 Suggestions</h3>
                <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                  {result.suggestions.map((s: string, i: number) => <li key={i}>{s}</li>)}
                </ol>
              </div>
            )}
          </>
        )}
      </div>
      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}
