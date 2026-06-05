"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  {question:"ما هي أداة التشفير؟",answer:"أداة مجانية لتشفير وفك تشفير النصوص بعدة طرق: Caesar Cipher، Base64، وعكس النص."},
  {question:"هل التشفير آمن؟",answer:"هذه الأدوات مناسبة للتشفير الأساسي والتعليمي. للتشفير الحقيقي استخدم أدوات احترافية."},
  {question:"ما هو تشفير Caesar؟",answer:"تشفير بسيط يعتمد على إزاحة الحروف بمقدار محدد. يمكنك اختيار المفتاح (1-25)."},
  {question:"ما هو Base64؟",answer:"ترميز يستخدم لتحويل البيانات الثنائية إلى نص قابل للقراءة. ليس تشفيراً حقيقياً."},
  {question:"هل بياناتي آمنة؟",answer:"كل شيء يعمل في متصفحك. لا ترسل أي بيانات لسيرفر خارجي."},
];
const relatedTools = [
  {title:"مولد كلمات السر",icon:"🔑",href:"/tools/password-generator"},
  {title:"مولد الـ Hash",icon:"#️⃣",href:"/tools/hash-generator"},
  {title:"Base64 Encoder",icon:"🔣",href:"/tools/base64-encoder"},
  {title:"JSON Formatter",icon:"📋",href:"/tools/json-formatter"},
];
const seo = ["أداة تشفير النصوص مجانية — Caesar Cipher، Base64، عكس النص. تشفير وفك تشفير فوري.", "مناسبة للتشفير الأساسي والتعليمي."];

function caesar(text:string,shift:number,decode:boolean){
  const s=decode?-shift:shift;
  return text.split("").map(c=>{
    if(c>="a"&&c<="z")return String.fromCharCode(((c.charCodeAt(0)-97+s+26)%26)+97);
    if(c>="A"&&c<="Z")return String.fromCharCode(((c.charCodeAt(0)-65+s+26)%26)+65);
    if(c>="ا"&&c<="ي"||c>="أ"&&c<="ئ")return c; // keep Arabic
    return c;
  }).join("");
}

export default function Client(){
  const [text,setText]=useState("");
  const [mode,setMode]=useState("caesar");
  const [key,setKey]=useState("3");
  const [action,setAction]=useState("encrypt");
  const [result,setResult]=useState("");

  const process=()=>{
    if(!text)return;
    if(mode==="caesar"){
      const s=parseInt(key)||3;
      setResult(caesar(text,s,action==="decrypt"));
    }else if(mode==="base64"){
      try{setResult(action==="encrypt"?btoa(text):atob(text));}catch{setResult("خطأ: النص غير صالح لـ Base64");}
    }else if(mode==="reverse"){
      setResult(action==="encrypt"?text.split("").reverse().join(""):text.split("").reverse().join(""));
    }
  };

  return (<div className="max-w-[760px] mx-auto">
    <StructuredData data={toolSchema("تشفير النصوص","تشفير وفك تشفير النصوص بعدة طرق","https://adwatak.cloud/tools/encryption-tool","ar","Developer Tools")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="ar" category="أدوات مطورين" categorySlug="tools" toolName="تشفير النصوص"/>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h1 className="text-2xl font-extrabold mb-1">🔐 تشفير النصوص</h1>
      <p className="text-sm text-gray-500 mb-6">تشفير وفك تشفير النصوص بأكثر من طريقة</p>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <select value={mode} onChange={e=>setMode(e.target.value)} className="px-3 py-3 border border-gray-300 rounded-lg text-sm bg-white">
            <option value="caesar">Caesar Cipher</option>
            <option value="base64">Base64</option>
            <option value="reverse">عكس النص</option>
          </select>
          <select value={action} onChange={e=>setAction(e.target.value)} className="px-3 py-3 border border-gray-300 rounded-lg text-sm bg-white">
            <option value="encrypt">تشفير</option>
            <option value="decrypt">فك تشفير</option>
          </select>
          {mode==="caesar"&&<input type="number" value={key} onChange={e=>setKey(e.target.value)} min="1" max="25" className="px-3 py-3 border border-gray-300 rounded-lg text-sm" placeholder="مفتاح"/>}
        </div>
        <textarea value={text} onChange={e=>setText(e.target.value)} rows={4} placeholder="أدخل النص..." className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none"/>
        <button onClick={process} className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 transition-all shadow-md">تنفيذ</button>
        {result&&<div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-sm whitespace-pre-wrap break-words max-h-40 overflow-y-auto">{result}</div>}
      </div>
    </div>
    <SEOContent content={seo} lang="ar"/>
    <FAQSection faqs={faqs} lang="ar"/>
    <RelatedTools tools={relatedTools} lang="ar"/>
    <ShareButtons lang="ar"/>
  </div>);
}
