"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  {question:"What is Encryption Tool?",answer:"A free tool to encrypt and decrypt text using Caesar Cipher, Base64, and Reverse text methods."},
  {question:"Is it secure?",answer:"Basic/educational encryption only. For real security use professional tools."},
  {question:"What is Caesar Cipher?",answer:"A simple encryption that shifts letters by a key (1-25)."},
  {question:"Is my data safe?",answer:"Everything runs in your browser. No data leaves your device."},
];
const relatedTools = [
  {title:"Password Generator",icon:"🔑",href:"/fr/tools/password-generator"},
  {title:"Hash Generator",icon:"#️⃣",href:"/fr/tools/hash-generator"},
  {title:"Base64 Encoder",icon:"🔣",href:"/fr/tools/base64-encoder"},
];
const seo = ["Free Encryption Tool — Caesar Cipher, Base64, Reverse text. Encrypt and decrypt instantly.", "Perfect for basic encryption and educational purposes."];

function caesar(text:string,shift:number,decode:boolean){
  const s=decode?-shift:shift;
  return text.split("").map(c=>{
    if(c>="a"&&c<="z")return String.fromCharCode(((c.charCodeAt(0)-97+s+26)%26)+97);
    if(c>="A"&&c<="Z")return String.fromCharCode(((c.charCodeAt(0)-65+s+26)%26)+65);
    return c;
  }).join("");
}

export default function ClientEn(){
  const [text,setText]=useState("");
  const [mode,setMode]=useState("caesar");
  const [key,setKey]=useState("3");
  const [action,setAction]=useState("encrypt");
  const [result,setResult]=useState("");

  const process=()=>{
    if(!text)return;
    if(mode==="caesar"){const s=parseInt(key)||3;setResult(caesar(text,s,action==="decrypt"));}
    else if(mode==="base64"){try{setResult(action==="encrypt"?btoa(text):atob(text));}catch{setResult("Error: Invalid Base64 text");}}
    else setResult(action==="encrypt"?text.split("").reverse().join(""):text.split("").reverse().join(""));
  };

  return (<div className="max-w-[760px] mx-auto">
    <StructuredData data={toolSchema("Encryption Tool","Encrypt and decrypt text","https://adwatak.cloud/fr/tools/encryption-tool","fr","Developer Tools")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="fr" category="Developer Tools" categorySlug="tools" toolName="Encryption Tool"/>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h1 className="text-2xl font-extrabold mb-1">🔐 Encryption Tool</h1>
      <p className="text-sm text-gray-500 mb-6">Encrypt and decrypt text using multiple methods</p>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <select value={mode} onChange={e=>setMode(e.target.value)} className="px-3 py-3 border border-gray-300 rounded-lg text-sm bg-white">
            <option value="caesar">Caesar Cipher</option>
            <option value="base64">Base64</option>
            <option value="reverse">Reverse Text</option>
          </select>
          <select value={action} onChange={e=>setAction(e.target.value)} className="px-3 py-3 border border-gray-300 rounded-lg text-sm bg-white">
            <option value="encrypt">Encrypt</option>
            <option value="decrypt">Decrypt</option>
          </select>
          {mode==="caesar"&&<input type="number" value={key} onChange={e=>setKey(e.target.value)} min="1" max="25" className="px-3 py-3 border border-gray-300 rounded-lg text-sm" placeholder="Key"/>}
        </div>
        <textarea value={text} onChange={e=>setText(e.target.value)} rows={4} placeholder="Enter text..." className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none"/>
        <button onClick={process} className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 transition-all shadow-md">Process</button>
        {result&&<div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-sm whitespace-pre-wrap break-words max-h-40 overflow-y-auto">{result}</div>}
      </div>
    </div>
    <SEOContent content={seo} lang="fr"/>
    <FAQSection faqs={faqs} lang="fr"/>
    <RelatedTools tools={relatedTools} lang="fr"/>
    <ShareButtons lang="fr"/>
  </div>);
}
