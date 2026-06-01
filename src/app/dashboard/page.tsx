"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface ToolStats {
  total: number;
  arabic: number;
  english: number;
  categories: { name: string; count: number }[];
}

interface SystemStatus {
  aiApi: "ok" | "error" | "unknown";
  indexingApi: "ok" | "error" | "unknown";
}

const TOOLS_DATA = [
  {id:"calculators",en:"Calculators",ar:"حاسبات",tools:["bmi-calculator","vat-calculator","loan-calculator","mortgage-calculator","emi-calculator","compound-interest","profit-margin","age-calculator","salary-calculator","gold-calculator","zakat-calculator","calorie-calculator","inheritance-calculator","installment-calculator","car-installment"]},
  {id:"converters",en:"Converters",ar:"محولات",tools:["currency-converter","unit-converter","color-converter","hijri-converter","number-to-words","text-case"]},
  {id:"text",en:"Text Tools",ar:"أدوات نصية",tools:["word-counter","text-cleaner","text-compare","arabic-lorem","password-generator","random-number","hash-generator","base64-encoder","qr-generator","qr-reader","whatsapp-link","bio-generator","stopwatch","typing-test","social-character-counter"]},
  {id:"image",en:"Image Tools",ar:"أدوات صور",tools:["image-compressor","image-resizer","image-to-pdf","background-remover","image-to-text","barcode-generator","youtube-thumbnail-downloader"]},
  {id:"pdf",en:"PDF Tools",ar:"أدوات PDF",tools:["pdf-merger","pdf-splitter","pdf-to-word","pdf-compressor"]},
  {id:"seo",en:"SEO & AI",ar:"SEO و AI",tools:["seo-audit","ai-content-detector","grammar-checker","paraphrasing-tool","plagiarism-checker","seo-content-generator"]},
  {id:"generators",en:"Generators",ar:"مولدات",tools:["invoice-generator","qr-generator","password-generator","bio-generator","barcode-generator"]},
  {id:"developer",en:"Developer",ar:"مطورين",tools:["json-formatter","css-minifier","markdown-editor","hash-generator","base64-encoder","ip-lookup"]},
];

export default function Dashboard() {
  const [status, setStatus] = useState<SystemStatus>({ aiApi: "unknown", indexingApi: "unknown" });
  const [activeTab, setActiveTab] = useState<"overview" | "seo" | "tools">("overview");

  const totalTools = TOOLS_DATA.reduce((s, c) => s + c.tools.length, 0);

  return (
    <div className="max-w-[900px] mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-black mb-2">⚙️ Adwatak SEO Dashboard</h1>
        <p className="text-gray-500">SEO Content Machine — Inspired by Hermes Agent OS strategy</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {(["overview", "seo", "tools"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold text-sm rounded-t-lg transition-all cursor-pointer border-none ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab === "overview" ? "📊 Overview" : tab === "seo" ? "🚀 SEO Machine" : "🔧 Tools"}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl p-5">
              <p className="text-3xl font-black">{totalTools}</p>
              <p className="text-sm opacity-80">Total Tools</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-700 text-white rounded-xl p-5">
              <p className="text-3xl font-black">{TOOLS_DATA.length}</p>
              <p className="text-sm opacity-80">Categories</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-xl p-5">
              <p className="text-3xl font-black">2</p>
              <p className="text-sm opacity-80">Languages</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white rounded-xl p-5">
              <p className="text-3xl font-black">100%</p>
              <p className="text-sm opacity-80">Free</p>
            </div>
          </div>

          {/* Machine Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold mb-4">🔄 Content Machine Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <p className="font-semibold text-sm">AI Content Generator</p>
                    <p className="text-xs text-gray-500">Google Gemini 2.0 Flash (Free)</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📡</span>
                  <div>
                    <p className="font-semibold text-sm">Auto Indexing</p>
                    <p className="text-xs text-gray-500">Indexceptional API</p>
                  </div>
                </div>
                <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full">Ready</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <p className="font-semibold text-sm">Project Memory</p>
                    <p className="text-xs text-gray-500">project-memory.json — loaded</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Active</span>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold mb-4">💡 How the SEO Machine Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { step: "1", icon: "🎯", title: "Enter Keyword", desc: "Pick a target keyword you want to rank for" },
                { step: "2", icon: "📝", title: "Add Context", desc: "Optional case study or unique angle" },
                { step: "3", icon: "🤖", title: "AI Generates", desc: "5 unique articles with different angles" },
                { step: "4", icon: "📡", title: "Auto Index", desc: "Submit to Google via Indexceptional" },
                { step: "5", icon: "🏆", title: "Rank #1", desc: "Multiple positions on Google for same keyword" },
              ].map((item) => (
                <div key={item.step} className="text-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-3xl">{item.icon}</span>
                  <p className="font-bold text-sm mt-2">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SEO Tab */}
      {activeTab === "seo" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold mb-4">🚀 SEO Content Generator</h2>
            <p className="text-sm text-gray-600 mb-4">Generate 5 unique SEO-optimized articles from a single keyword — each with a different angle for maximum Google ranking potential.</p>
            <div className="flex gap-3">
              <Link href="/en/tools/seo-content-generator" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl text-sm transition-all">
                🚀 SEO Content Generator
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold mb-4">📡 Quick Index URLs</h2>
            <p className="text-sm text-gray-600 mb-4">Submit new URLs to Google for faster indexing via Indexceptional API.</p>
            <IndexForm />
          </div>

          {/* Content Strategy */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold mb-4">📋 Content Strategy Pillars</h2>
            <div className="space-y-2">
              {[
                "Every tool page is a landing page — optimized for specific keywords",
                "Bilingual content — Arabic first, English second",
                "Long-tail keyword targeting — each tool targets specific keywords",
                "Internal linking — every tool links to 4-6 related tools",
                "FAQ sections — 10+ FAQs per page for featured snippets",
                "Structured data — Tool, FAQ, Breadcrumb schemas on every page",
                "Content clusters — generate multiple articles per topic angle",
              ].map((pillar, i) => (
                <div key={i} className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg">
                  <span className="text-blue-600 font-bold text-sm">✓</span>
                  <p className="text-sm">{pillar}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tools Tab */}
      {activeTab === "tools" && (
        <div className="space-y-4">
          {TOOLS_DATA.map((cat) => (
            <div key={cat.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-base mb-3">{cat.en} <span className="text-gray-400 font-normal">({cat.ar})</span> — {cat.tools.length} tools</h3>
              <div className="flex flex-wrap gap-2">
                {cat.tools.map((tool) => (
                  <Link
                    key={tool}
                    href={`/en/tools/${tool}`}
                    className="text-xs bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-3 py-1.5 rounded-lg transition-all"
                  >
                    {tool}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function IndexForm() {
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const submit = async () => {
    const urlList = urls.split("\n").map((u) => u.trim()).filter(Boolean);
    if (urlList.length === 0) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/index-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: urlList, lang: "en" }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult({ success: true, message: `✅ ${data.indexed}/${data.submitted} URLs submitted to Google for indexing` });
      } else {
        setResult({ success: false, message: data.error || "Failed to submit" });
      }
    } catch {
      setResult({ success: false, message: "Error submitting URLs" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
        className="w-full h-24 p-3 border-2 border-gray-200 rounded-xl text-sm outline-none resize-y"
        placeholder="Enter URLs to index (one per line)&#10;https://adwatak.cloud/en/tools/bmi-calculator&#10;https://adwatak.cloud/en/tools/vat-calculator"
      />
      <button
        onClick={submit}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2 px-4 rounded-xl text-sm transition-all cursor-pointer border-none"
      >
        {loading ? "Submitting..." : "📡 Submit to Google Indexing"}
      </button>
      {result && (
        <div className={`p-3 rounded-xl text-sm ${result.success ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {result.message}
        </div>
      )}
    </div>
  );
}
