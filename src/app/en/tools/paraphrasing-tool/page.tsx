"use client";import { useState } from "react";
import StructuredData,{toolSchema,faqSchema,breadcrumbSchema} from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";import RelatedTools from "../../../components/RelatedTools";import SEOContent from "../../../components/SEOContent";
const faqs=[
{question:"What is Paraphrasing?",answer:"Rewriting text in a different style while preserving the original meaning. An alternative to direct quotation that helps avoid plagiarism and present content in your own voice."},
{question:"Does it change the meaning?",answer:"No. The tool preserves the original meaning while restructuring sentences and using alternative vocabulary. The goal is linguistic renewal, not meaning alteration."},
{question:"What is the difference between paraphrasing and translation?",answer:"Paraphrasing rewrites the same text in the same language in a new style. Translation converts text from one language to another. This tool specializes in paraphrasing, not translation."},
{question:"Is it useful for SEO?",answer:"Yes. Properly paraphrased content is considered original by search engines. It helps avoid duplicate content penalties and improves your Google ranking."},
{question:"What text length is allowed?",answer:"Minimum 20 characters, maximum 5000 characters. Best results with 100-1000 words."},
{question:"Can it paraphrase academic texts?",answer:"Yes, suitable for academic and scientific texts. The tool preserves specialized terminology and precise concepts while rewriting the general style."},
{question:"Is my data safe?",answer:"100% private. Text is sent for paraphrasing only and is never stored. No records kept."},
{question:"Is it completely free?",answer:"Yes, 100% free. No registration, no limits, no paid plans."},
{question:"How many versions does it produce?",answer:"One professionally rewritten version. Run the tool again on the same text for a different version."},
{question:"How to verify quality?",answer:"Review the paraphrased text. Ensure meaning is preserved. The tool shows change count — more changes without altering meaning = better paraphrase."},
{question:"Does it support Arabic and English?",answer:"Yes, fluently. Handles Arabic, English, and mixed-language texts with equal proficiency."},
{question:"How to get best results?",answer:"Use the tool for a first draft, then manually add your personal touch. The best result comes from combining AI efficiency with human creativity."},
];
const relatedTools=[
{title:"Plagiarism Checker",icon:"🚫",href:"/en/tools/plagiarism-checker"},
{title:"Grammar Checker",icon:"📝",href:"/en/tools/grammar-checker"},
{title:"AI Content Detector",icon:"🤖",href:"/en/tools/ai-content-detector"},
{title:"Word Counter",icon:"📊",href:"/en/tools/word-counter"},
{title:"Text Case Converter",icon:"🔤",href:"/en/tools/text-case"},
{title:"Name Generator",icon:"🏷️",href:"/en/tools/name-generator"},
];
const seoContent=[
"Free Paraphrasing Tool — rewrite text in a new style while preserving meaning. Paste text and click paraphrase for an instant alternative version with statistics.",
"Ideal for content writers, bloggers, students, and marketers. Produce original multi-version content. Improve SEO by avoiding duplicate content.",
"Each paraphrase shows: original and new word count, number of changes, and a brief explanation. The result is ready to copy and use immediately.",
"The tool supports Arabic, English, and mixed-language texts. Handles academic, marketing, literary, and technical content with high accuracy.",
"Tip: Use the tool for a first draft, then add your personal touch. The best results come from blending AI with human creativity.",
];
export default function ParaphrasingTool(){
const[text,setText]=useState("");const[result,setResult]=useState<any>(null);const[loading,setLoading]=useState(false);const[error,setError]=useState("");const[copied,setCopied]=useState(false);
const paraphrase=async()=>{if(text.trim().length<20){setError("Please enter at least 20 characters");return;}setError("");setLoading(true);setResult(null);try{const res=await fetch("/api/paraphrasing-tool",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:text.trim(),lang:"en"})});if(!res.ok)throw new Error((await res.json()).error||"Paraphrasing failed");setResult(await res.json());}catch(e:any){setError(e.message||"Error.");}finally{setLoading(false);}};
const copyResult=()=>{if(result?.paraphrasedText){navigator.clipboard.writeText(result.paraphrasedText);setCopied(true);setTimeout(()=>setCopied(false),2000);}};
return(<div className="max-w-[760px] mx-auto">
<StructuredData data={toolSchema("Paraphrasing Tool","Rewrite text in a new style while preserving the original meaning","https://adwatak.cloud/en/tools/paraphrasing-tool","en","Text Analysis")}/>
<StructuredData data={faqSchema(faqs)}/>
<StructuredData data={breadcrumbSchema([{name:"Home",url:"https://adwatak.cloud/en"},{name:"Text Tools",url:"https://adwatak.cloud/en/tools/text"},{name:"Paraphrasing Tool",url:"https://adwatak.cloud/en/tools/paraphrasing-tool"}])}/>
<Breadcrumb lang="en" category="Text Tools" categorySlug="text" toolName="Paraphrasing Tool"/>
<div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
<h1 className="text-2xl font-extrabold mb-1">✏️ Paraphrasing Tool</h1><p className="text-sm text-gray-500 mb-6">Rewrite text in a new style while preserving the original meaning</p>
<textarea value={text} onChange={(e)=>setText(e.target.value)} className="w-full h-[180px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y" placeholder="Paste text to paraphrase..." />
<button onClick={paraphrase} disabled={loading} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all">{loading?"Paraphrasing...":"✏️ Paraphrase"}</button>
{error&&<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}
{result&&(<><div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl"><div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-green-800">Paraphrased Text</h3><button onClick={copyResult} className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg transition-all">{copied?"✅ Copied!":"📋 Copy"}</button></div><p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{result.paraphrasedText}</p></div>
<div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3"><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">Original Words</p><p className="text-2xl font-extrabold text-gray-700">{result.originalWordCount??"—"}</p></div><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">New Words</p><p className="text-2xl font-extrabold text-blue-600">{result.newWordCount??"—"}</p></div><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">Changes</p><p className="text-2xl font-extrabold text-green-600">{result.changes??"—"}</p></div></div>
<p className="mt-4 text-sm text-gray-700 leading-relaxed">{result.explanation}</p></>)}</div>
<SEOContent content={seoContent} lang="en"/><FAQSection faqs={faqs} lang="en"/><RelatedTools tools={relatedTools} lang="en"/><ShareButtons lang="en"/></div>);}
