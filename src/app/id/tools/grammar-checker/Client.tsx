"use client";import { useState } from "react";
import StructuredData,{toolSchema,faqSchema,breadcrumbSchema, speakableSchema,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";import RelatedTools from "../../../components/RelatedTools";import SEOContent from "../../../components/SEOContent";
const faqs = [
{question:"Apa itu Pemeriksa Tata Bahasa?",answer:"Alat gratis yang memeriksa kesalahan tata bahasa, ejaan, dan tanda baca menggunakan AI. Mendukung Arabic dan Inggris. Memberikan koreksi terperinci dengan penjelasan."},
{question:"Seberapa akurat alat ini?",answer:"Akurasi tinggi melebihi 85%. Mendeteksi lebih dari 20 jenis kesalahan termasuk ejaan, tata bahasa, tanda baca, dan masalah gaya."},
{question:"Jenis kesalahan apa yang dideteksi?",answer:"Kesalahan ejaan, kesalahan tata bahasa (kesesuaian subjek-kata kerja, kala), masalah tanda baca, kebingungan kata umum, dan masalah keterbacaan."},
{question:"Apa itu Skor Keterbacaan?",answer:"Skor 0-100 yang menunjukkan seberapa mudah teks Anda dibaca. 80-100: sangat mudah dibaca. 60-79: sedang. Di bawah 60: perlu disederhanakan."},
{question:"Apakah ini sepenuhnya gratis?",answer:"Ya, 100% gratis. Tanpa registrasi, tanpa batasan, tanpa paket berbayar. Cukup tempel dan periksa."},
{question:"Berapa panjang teks yang dibutuhkan?",answer:"Minimal 10 karakter. Teks yang lebih panjang memberikan akurasi lebih baik. Hasil optimal dengan 100-2000 kata."},
{question:"Apakah data saya aman?",answer:"Ya, teks dikirim hanya untuk analisis dan tidak disimpan. Privasi penuh dijamin."},
{question:"Apakah alat ini mengoreksi tata bahasa Arabic?",answer:"Ya, alat ini khusus untuk Arabic: konjugasi kata kerja, kasus tata bahasa, maskulin/feminin, jamak/tunggal, dan kesalahan ejaan umum."},
{question:"Dapatkah alat ini memeriksa teks campuran Arabic/Inggris?",answer:"Ya, mendukung teks campuran bahasa. Mendeteksi kesalahan di setiap bahasa secara terpisah."},
{question:"Bagaimana cara menggunakan hasilnya?",answer:"Tinjau setiap saran koreksi. Masing-masing disertai penjelasan mengapa salah dan cara memperbaikinya. Terapkan yang sesuai dengan konteks Anda."},
{question:"Apakah ini cocok untuk profesional?",answer:"Ya, ideal untuk penulis, editor, jurnalis, dan pelajar. Membantu meningkatkan kualitas teks sebelum dipublikasikan."},
{question:"Bagaimana cara meningkatkan hasil?",answer:"Gunakan teks yang jelas dan terformat dengan baik. Hindari teks yang sangat pendek. Tinjau saran dengan cermat. Gunakan secara teratur sebagai bagian dari proses penyuntingan Anda."},
];
const relatedTools=[
{title:"Alat Parafrase",icon:"✏️",href:"/id/tools/paraphrasing-tool"},
{title:"Pemeriksa Plagiarisme",icon:"🚫",href:"/id/tools/plagiarism-checker"},
{title:"Detektor Konten AI",icon:"🤖",href:"/id/tools/ai-content-detector"},
{title:"Penghitung Kata",icon:"📊",href:"/id/tools/word-counter"},
{title:"Pembanding Teks",icon:"⚖️",href:"/id/tools/text-compare"},
{title:"Pembersih Teks",icon:"🧹",href:"/id/tools/text-cleaner"},
];
const seoContent=[
"Free Grammar Checker — check grammar, spelling, and punctuation errors. Paste text and click check for instant analysis with error count, readability score, and detailed corrections.",
"Ideal for writers, students, editors, and marketers. Improve text quality before publishing. Ensures professional, error-free writing.",
"AI-powered detection of over 20 error types. Each correction includes the error, suggestion, and explanation. An educational tool as much as a checking tool.",
"The Readability Score helps evaluate text clarity. Clear texts achieve better reader engagement and higher search engine rankings.",
"Tip: Use before publishing any important content. Results are instant. Review corrections carefully — some depend on context.",
];
export default function Client(){
const[text,setText]=useState("");const[result,setResult]=useState<any>(null);const[loading,setLoading]=useState(false);const[error,setError]=useState("");
const check=async()=>{if(text.trim().length<10){setError("Silakan masukkan teks");return;}setError("");setLoading(true);setResult(null);try{const res=await fetch("/api/grammar-checker",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:text.trim(),lang:"en"})});if(!res.ok)throw new Error((await res.json()).error||"Check failed");setResult(await res.json());}catch(e:any){setError(e.message||"Error occurred.");}finally{setLoading(false);}};
const gc=(s:number)=>s>=80?"text-green-600":s>=50?"text-yellow-600":"text-red-600";const gb=(s:number)=>s>=80?"bg-green-50 border-green-200":s>=50?"bg-yellow-50 border-yellow-200":"bg-red-50 border-red-200";const ge=(s:number)=>s>=80?"✅":s>=50?"⚠️":"❌";
return(<div className="max-w-[760px] mx-auto">
{/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("Cara menggunakan alat ini", "Free online tool. Works directly in your browser. No registration required.", [{name:"Buka alat",text:"Arahkan ke halaman alat ini di Adawatak"},{name:"Masukkan data Anda",text:"Isi kolom yang diperlukan"},{name:"Dapatkan hasil",text:"Klik tombol hitung atau hasilkan"},{name:"Gunakan atau bagikan",text:"Salin, unduh, atau bagikan hasilnya"}],"kurang dari satu menit","id")} />
      {/* GEO: Speakable — AI/voice engines */}
{/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("How to use this tool", "Free online tool. Works directly in your browser. No registration required.", [{name:"Buka alat",text:"Arahkan ke halaman alat ini di Adawatak"},{name:"Masukkan data Anda",text:"Isi kolom yang diperlukan"},{name:"Dapatkan hasil",text:"Klik tombol hitung atau hasilkan"},{name:"Gunakan atau bagikan",text:"Salin, unduh, atau bagikan hasilnya"}],"less than a minute","id")} />
      {/* GEO: Speakable — AI/voice engines */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />
<Breadcrumb lang="id" category="Alat Teks" categorySlug="text" toolName="Pemeriksa Tata Bahasa"/>
<div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
<h1 className="text-2xl font-extrabold mb-1">📝 Pemeriksa Tata Bahasa</h1>
<p className="text-sm text-gray-500 mb-6">Periksa kesalahan tata bahasa, ejaan, dan tanda baca</p>
<textarea value={text} onChange={(e)=>setText(e.target.value)} className="w-full h-[200px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y" placeholder="Tempel teks Anda di sini..." />
<button onClick={check} disabled={loading} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all">{loading?"Memeriksa...":" Periksa"}</button>
{error&&<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}
{result&&(<>
<div className={`mt-6 p-6 rounded-xl border ${gb(result.score)}`}><div className="text-center mb-4"><span className="text-5xl">{ge(result.score)}</span><p className={`text-5xl font-extrabold mt-2 ${gc(result.score)}`}>{result.score}/100</p></div><div className="w-full bg-gray-200 rounded-full h-3 mt-4"><div className={`h-3 rounded-full transition-all ${result.score>=80?"bg-green-500":result.score>=50?"bg-yellow-500":"bg-red-500"}`} style={{width:`${result.score}%`}}/></div></div>
<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3"><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">Errors</p><p className="text-3xl font-extrabold text-red-600">{result.errorCount??"—"}</p></div><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">Readability</p><p className={`text-3xl font-extrabold ${gc(result.readabilityScore??0)}`}>{result.readabilityScore??"—"}%</p></div></div>
{result.corrections?.length>0&&(<div className="mt-4 space-y-2"><h3 className="text-sm font-bold text-gray-700">Suggested Corrections</h3>{result.corrections.map((c:any,i:number)=>(<div key={i} className="p-3 bg-blue-50 border border-blue-200 rounded-xl"><p className="text-xs"><span className="text-red-600 line-through">{c.original}</span></p><p className="text-xs text-green-700 font-bold">→ {c.suggestion}</p><p className="text-xs text-gray-500 mt-1">{c.reason}</p></div>))}</div>)}
<p className="mt-4 text-sm text-gray-700 leading-relaxed">{result.explanation}</p></>)}
<div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200"><p className="text-xs text-gray-500">💡 <strong>Tip:</strong> Longer texts give better results. Review each correction before applying.</p></div></div>
<SEOContent content={seoContent} lang="id"/><FAQSection faqs={faqs} lang="id"/><RelatedTools tools={relatedTools} lang="id"/><ShareButtons lang="id"/></div>);}
