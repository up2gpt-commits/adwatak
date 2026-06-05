"use client";
import { useState } from "react";
import StructuredData, { toolSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const T: Record<string, string> = {
  title: "Alat Riset Kata Kunci",
  subtitle: "Temukan kata kunci tepat untuk meningkatkan SEO Anda",
  inputLabel: "Kata kunci atau topik",
  inputPlaceholder: "cth: pemasaran properti, kalkulator KPR...",
  searchBtn: "🔍 Cari",
  searching: "⏳ Menganalisis...",
  results: "Hasil Kata Kunci",
  noResults: "Tidak dapat menghasilkan kata kunci. Coba istilah lain.",
  error: "Terjadi kesalahan. Silakan coba lagi.",
  keyword: "Kata Kunci",
  volume: "Volume Bulanan",
  competition: "Kompetisi",
  difficulty: "Kesulitan",
  contentType: "Jenis Konten",
  low: "Rendah",
  medium: "Sedang",
  high: "Tinggi",
  analysis: "Analisis Cepat",
  totalKeywords: "Total Kata",
  avgDifficulty: "Rata-rata Kesulitan",
  easyWins: "Kemenangan Mudah",
  topRec: "Rekomendasi Teratas",
  summary: "Ringkasan",
};

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
        body: JSON.stringify({ keyword: keyword.trim(), lang: "id" }),
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
      <StructuredData data={toolSchema("keyword-research", "Alat Riset Kata Kunci", "https://adwatak.cloud/id/tools/keyword-research", "id")} />
      <Breadcrumb lang="id" category="Alat SEO" categorySlug="seo" toolName="Riset Kata Kunci" />
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
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? T.searching : T.searchBtn}
          </button>
        </div>
      </div>

      {loading && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center mb-6">
          <div className="animate-spin text-4xl mb-3 inline-block">⏳</div>
          <p className="text-gray-500">Menganalisis kata kunci...</p>
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

      <ShareButtons lang="id" />
    </div>
  );
}
