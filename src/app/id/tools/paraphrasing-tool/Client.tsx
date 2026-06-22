"use client";import { useState } from "react";
import StructuredData,{toolSchema,faqSchema,breadcrumbSchema, speakableSchema,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";import RelatedTools from "../../../components/RelatedTools";import SEOContent from "../../../components/SEOContent";
const faqs = [
{question:"Apa itu Parafrase?",answer:"Menulis ulang teks dengan gaya berbeda sambil mempertahankan makna aslinya. Alternatif dari kutipan langsung yang membantu menghindari plagiarisme dan menyajikan konten dengan suara Anda sendiri."},
{question:"Apakah itu mengubah makna?",answer:"Tidak. Alat ini mempertahankan makna asli sambil merestrukturisasi kalimat dan menggunakan kosakata alternatif. Tujuannya adalah pembaruan linguistik, bukan perubahan makna."},
{question:"Apa perbedaan antara parafrase dan terjemahan?",answer:"Parafrase menulis ulang teks yang sama dalam bahasa yang sama dengan gaya baru. Terjemahan mengubah teks dari satu bahasa ke bahasa lain. Alat ini khusus untuk parafrase, bukan terjemahan."},
{question:"Apakah ini berguna untuk SEO?",answer:"Ya. Konten yang diparafrase dengan benar dianggap asli oleh mesin pencari. Ini membantu menghindari penalti konten duplikat dan meningkatkan peringkat Google Anda."},
{question:"Berapa panjang teks yang diizinkan?",answer:"Minimal 20 karakter, maksimal 5000 karakter. Hasil terbaik dengan 100-1000 kata."},
{question:"Bisakah itu memparafrase teks akademik?",answer:"Ya, cocok untuk teks akademik dan ilmiah. Alat ini mempertahankan terminologi khusus dan konsep yang tepat sambil menulis ulang gaya umum."},
{question:"Apakah data saya aman?",answer:"100% pribadi. Teks dikirim hanya untuk parafrase dan tidak pernah disimpan. Tidak ada catatan yang disimpan."},
{question:"Apakah ini sepenuhnya gratis?",answer:"Ya, 100% gratis. Tanpa registrasi, tanpa batasan, tanpa paket berbayar."},
{question:"Berapa banyak versi yang dihasilkan?",answer:"Satu versi yang ditulis ulang secara profesional. Jalankan alat lagi pada teks yang sama untuk versi yang berbeda."},
{question:"Bagaimana cara memverifikasi kualitas?",answer:"Tinjau teks yang diparafrase. Pastikan makna tetap terjaga. Alat ini menunjukkan jumlah perubahan — semakin banyak perubahan tanpa mengubah makna = parafrase yang lebih baik."},
{question:"Apakah ini mendukung bahasa Arab dan Inggris?",answer:"Ya, dengan lancar. Menangani teks bahasa Arab, Inggris, dan campuran dengan kemampuan yang sama."},
{question:"Bagaimana cara mendapatkan hasil terbaik?",answer:"Gunakan alat ini untuk draf pertama, lalu tambahkan sentuhan pribadi Anda secara manual. Hasil terbaik berasal dari menggabungkan efisiensi AI dengan kreativitas manusia."},
];
const relatedTools=[
{title:"Pemeriksa Plagiarisme",icon:"🚫",href:"/id/tools/plagiarism-checker"},
{title:"Pemeriksa Tata Bahasa",icon:"📝",href:"/id/tools/grammar-checker"},
{title:"Detektor Konten AI",icon:"🤖",href:"/id/tools/ai-content-detector"},
{title:"Penghitung Kata",icon:"📊",href:"/id/tools/word-counter"},
{title:"Pengubah Huruf",icon:"🔤",href:"/id/tools/text-case"},
{title:"Pembuat Nama",icon:"🏷️",href:"/id/tools/name-generator"},
];
const seoContent=[
"Free Paraphrasing Tool — rewrite text in a new style while preserving meaning. Paste text and click paraphrase for an instant alternative version with statistics.",
"Ideal for content writers, bloggers, students, and marketers. Produce original multi-version content. Improve SEO by avoiding duplicate content.",
"Each paraphrase shows: original and new word count, number of changes, and a brief explanation. The result is ready to copy and use immediately.",
"The tool supports Arabic, English, and mixed-language texts. Handles academic, marketing, literary, and technical content with high accuracy.",
"Tip: Use the tool for a first draft, then add your personal touch. The best results come from blending AI with human creativity.",
];
export default function Client(){
const[text,setText]=useState("");const[result,setResult]=useState<any>(null);const[loading,setLoading]=useState(false);const[error,setError]=useState("");const[copied,setCopied]=useState(false);
const paraphrase=async()=>{if(text.trim().length<20){setError("Silakan masukkan minimal 20 karakter");return;}setError("");setLoading(true);setResult(null);try{const res=await fetch("/api/paraphrasing-tool",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:text.trim(),lang:"en"})});if(!res.ok)throw new Error((await res.json()).error||"Paraphrasing failed");setResult(await res.json());}catch(e:any){setError(e.message||"Error.");}finally{setLoading(false);}};
const copyResult=()=>{if(result?.paraphrasedText){navigator.clipboard.writeText(result.paraphrasedText);setCopied(true);setTimeout(()=>setCopied(false),2000);}};
return(<div className="max-w-[760px] mx-auto">
{/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("Cara menggunakan alat ini", "Free online tool. Works directly in your browser. No registration required.", [{name:"Buka alat",text:"Arahkan ke halaman alat ini di Adawatak"},{name:"Masukkan data Anda",text:"Isi kolom yang diperlukan"},{name:"Dapatkan hasil",text:"Klik tombol hitung atau hasilkan"},{name:"Gunakan atau bagikan",text:"Salin, unduh, atau bagikan hasilnya"}],"kurang dari satu menit","id")} />
      {/* GEO: Speakable — AI/voice engines */}
{/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("How to use this tool", "Free online tool. Works directly in your browser. No registration required.", [{name:"Buka alat",text:"Arahkan ke halaman alat ini di Adawatak"},{name:"Masukkan data Anda",text:"Isi kolom yang diperlukan"},{name:"Dapatkan hasil",text:"Klik tombol hitung atau hasilkan"},{name:"Gunakan atau bagikan",text:"Salin, unduh, atau bagikan hasilnya"}],"less than a minute","id")} />
      {/* GEO: Speakable — AI/voice engines */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />
<Breadcrumb lang="id" category="Alat Teks" categorySlug="text" toolName="Alat Parafrase"/>
<div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
<h1 className="text-2xl font-extrabold mb-1">✏️ Alat Parafrase</h1><p className="text-sm text-gray-500 mb-6">Rewrite text in a new style while preserving the original meaning</p>
<textarea value={text} onChange={(e)=>setText(e.target.value)} className="w-full h-[180px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y" placeholder="Tempel teks untuk diparafrase..." />
<button onClick={paraphrase} disabled={loading} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all">{loading?"Memparafrase...":" Parafrase"}</button>
{error&&<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}
{result&&(<><div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl"><div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-green-800">Paraphrased Text</h3><button onClick={copyResult} className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg transition-all">{copied?" Disalin!":" Salin"}</button></div><p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{result.paraphrasedText}</p></div>
<div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3"><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">Original Words</p><p className="text-2xl font-extrabold text-gray-700">{result.originalWordCount??"—"}</p></div><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">New Words</p><p className="text-2xl font-extrabold text-blue-600">{result.newWordCount??"—"}</p></div><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">Changes</p><p className="text-2xl font-extrabold text-green-600">{result.changes??"—"}</p></div></div>
<p className="mt-4 text-sm text-gray-700 leading-relaxed">{result.explanation}</p></>)}</div>
<SEOContent content={seoContent} lang="id"/><FAQSection faqs={faqs} lang="id"/><RelatedTools tools={relatedTools} lang="id"/><ShareButtons lang="id"/></div>);}
