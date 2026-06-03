"use client";import { useState } from "react";
import StructuredData,{toolSchema,faqSchema,breadcrumbSchema, speakableSchema,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";import RelatedTools from "../../../components/RelatedTools";import SEOContent from "../../../components/SEOContent";
const faqs=[
{question:"What is a Grammar Checker?",answer:"A free tool that checks grammar, spelling, and punctuation errors using AI. Supports Arabic and English. Provides detailed corrections with explanations."},
{question:"How accurate is it?",answer:"High accuracy exceeding 85%. Detects over 20 types of errors including spelling, grammar, punctuation, and style issues."},
{question:"What error types does it detect?",answer:"Spelling mistakes, grammar errors (subject-verb agreement, tense), punctuation issues, common word confusions, and readability problems."},
{question:"What is the Readability Score?",answer:"A 0-100 score indicating how easy your text is to read. 80-100: very readable. 60-79: moderate. Below 60: needs simplification."},
{question:"Is it completely free?",answer:"Yes, 100% free. No registration, no limits, no paid plans. Just paste and check."},
{question:"What text length is needed?",answer:"Minimum 10 characters. Longer texts give better accuracy. Optimal results with 100-2000 words."},
{question:"Is my data safe?",answer:"Yes, text is sent for analysis only and not stored. Full privacy guaranteed."},
{question:"Does it correct Arabic grammar?",answer:"Yes, the tool is specialized in Arabic: verb conjugation, grammar cases, masculine/feminine, plural/singular, and common spelling errors."},
{question:"Can it check mixed Arabic/English text?",answer:"Yes, supports mixed-language texts. Detects errors in each language separately."},
{question:"How to use the results?",answer:"Review each correction suggestion. Each comes with an explanation of why it's wrong and how to fix it. Apply what makes sense for your context."},
{question:"Is it suitable for professionals?",answer:"Yes, ideal for writers, editors, journalists, and students. Helps improve text quality before publishing."},
{question:"How to improve results?",answer:"Use clear, well-formatted text. Avoid very short texts. Review suggestions carefully. Use regularly as part of your editing process."},
];
const relatedTools=[
{title:"Paraphrasing Tool",icon:"✏️",href:"/en/tools/paraphrasing-tool"},
{title:"Plagiarism Checker",icon:"🚫",href:"/en/tools/plagiarism-checker"},
{title:"AI Content Detector",icon:"🤖",href:"/en/tools/ai-content-detector"},
{title:"Word Counter",icon:"📊",href:"/en/tools/word-counter"},
{title:"Text Compare",icon:"⚖️",href:"/en/tools/text-compare"},
{title:"Text Cleaner",icon:"🧹",href:"/en/tools/text-cleaner"},
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
const check=async()=>{if(text.trim().length<10){setError("Please enter text");return;}setError("");setLoading(true);setResult(null);try{const res=await fetch("/api/grammar-checker",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:text.trim(),lang:"en"})});if(!res.ok)throw new Error((await res.json()).error||"Check failed");setResult(await res.json());}catch(e:any){setError(e.message||"Error occurred.");}finally{setLoading(false);}};
const gc=(s:number)=>s>=80?"text-green-600":s>=50?"text-yellow-600":"text-red-600";const gb=(s:number)=>s>=80?"bg-green-50 border-green-200":s>=50?"bg-yellow-50 border-yellow-200":"bg-red-50 border-red-200";const ge=(s:number)=>s>=80?"✅":s>=50?"⚠️":"❌";
return(<div className="max-w-[760px] mx-auto">
{/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("How to use this tool", "Free online tool. Works directly in your browser. No registration required.", [{name:"Open the tool",text:"Navigate to this tool page on Adawatak"},{name:"Enter your data",text:"Fill in the required fields"},{name:"Get results",text:"Click the calculate or generate button"},{name:"Use or share",text:"Copy, download, or share the results"}],"less than a minute","en")} />
      {/* GEO: Speakable — AI/voice engines */}
{/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("How to use this tool", "Free online tool. Works directly in your browser. No registration required.", [{name:"Open the tool",text:"Navigate to this tool page on Adawatak"},{name:"Enter your data",text:"Fill in the required fields"},{name:"Get results",text:"Click the calculate or generate button"},{name:"Use or share",text:"Copy, download, or share the results"}],"less than a minute","en")} />
      {/* GEO: Speakable — AI/voice engines */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />
<Breadcrumb lang="en" category="Text Tools" categorySlug="text" toolName="Grammar Checker"/>
<div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
<h1 className="text-2xl font-extrabold mb-1">📝 Grammar Checker</h1>
<p className="text-sm text-gray-500 mb-6">Check grammar, spelling, and punctuation errors</p>
<textarea value={text} onChange={(e)=>setText(e.target.value)} className="w-full h-[200px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y" placeholder="Paste your text here..." />
<button onClick={check} disabled={loading} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all">{loading?"Checking...":"🔍 Check"}</button>
{error&&<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}
{result&&(<>
<div className={`mt-6 p-6 rounded-xl border ${gb(result.score)}`}><div className="text-center mb-4"><span className="text-5xl">{ge(result.score)}</span><p className={`text-5xl font-extrabold mt-2 ${gc(result.score)}`}>{result.score}/100</p></div><div className="w-full bg-gray-200 rounded-full h-3 mt-4"><div className={`h-3 rounded-full transition-all ${result.score>=80?"bg-green-500":result.score>=50?"bg-yellow-500":"bg-red-500"}`} style={{width:`${result.score}%`}}/></div></div>
<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3"><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">Errors</p><p className="text-3xl font-extrabold text-red-600">{result.errorCount??"—"}</p></div><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">Readability</p><p className={`text-3xl font-extrabold ${gc(result.readabilityScore??0)}`}>{result.readabilityScore??"—"}%</p></div></div>
{result.corrections?.length>0&&(<div className="mt-4 space-y-2"><h3 className="text-sm font-bold text-gray-700">Suggested Corrections</h3>{result.corrections.map((c:any,i:number)=>(<div key={i} className="p-3 bg-blue-50 border border-blue-200 rounded-xl"><p className="text-xs"><span className="text-red-600 line-through">{c.original}</span></p><p className="text-xs text-green-700 font-bold">→ {c.suggestion}</p><p className="text-xs text-gray-500 mt-1">{c.reason}</p></div>))}</div>)}
<p className="mt-4 text-sm text-gray-700 leading-relaxed">{result.explanation}</p></>)}
<div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200"><p className="text-xs text-gray-500">💡 <strong>Tip:</strong> Longer texts give better results. Review each correction before applying.</p></div></div>
<SEOContent content={seoContent} lang="en"/><FAQSection faqs={faqs} lang="en"/><RelatedTools tools={relatedTools} lang="en"/><ShareButtons lang="en"/></div>);}
