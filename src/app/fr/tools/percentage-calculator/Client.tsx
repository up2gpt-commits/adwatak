"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  {question:"What is Percentage Calculator?",answer:"A free tool to calculate percentages three ways: percentage of a number, what percent is X of Y, and percentage increase/decrease."},
  {question:"Is it free?",answer:"Yes, 100% free. No registration."},
  {question:"How to calculate percentage of a number?",answer:"Select first option, enter the percentage and number, click Calculate."},
  {question:"Does it support decimals?",answer:"Yes, supports decimal numbers with high precision."},
  {question:"Does it work offline?",answer:"Yes, everything runs in your browser."},
];

const relatedTools = [{title:"Profit Margin",icon:"📊",href:"/fr/tools/profit-margin"},{title:"VAT Calculator",icon:"🏛️",href:"/fr/tools/vat-calculator"},{title:"Compound Interest",icon:"📈",href:"/fr/tools/compound-interest"},{title:"BMI Calculator",icon:"⚖️",href:"/fr/tools/bmi-calculator"}];
const seo = ["Free Percentage Calculator — calculate percentage of a number, what percent X is of Y, and percentage increase/decrease. Simple and fast.", "Perfect for students, accountants, and merchants."];

export default function Client() {
  const [mode,setMode]=useState("percent-of");
  const [v1,setV1]=useState("");
  const [v2,setV2]=useState("");
  const [res,setRes]=useState<number|null>(null);

  const calc=()=>{
    const a=parseFloat(v1),b=parseFloat(v2);
    if(isNaN(a)||(mode!="percent-of"&&isNaN(b))) return setRes(null);
    if(mode=="percent-of") setRes((a/100)*b);
    else if(mode=="what-percent") setRes(b===0?null:(a/b)*100);
    else setRes(b===0?null:((b-a)/a)*100);
  };

  return (<div className="max-w-[760px] mx-auto">
    <StructuredData data={toolSchema("Percentage Calculator","Calculate percentages quickly","https://adwatak.cloud/fr/tools/percentage-calculator","fr","Calculateurs")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="fr" category="Calculateurs" categorySlug="tools" toolName="Percentage Calculator"/>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h1 className="text-2xl font-extrabold mb-1">📊 Calculateur de Pourcentage</h1>
      <p className="text-sm text-gray-500 mb-6">Calculez des pourcentages facilement</p>
      <div className="space-y-4 mb-6">
        <select value={mode} onChange={e=>setMode(e.target.value)} className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm bg-white">
          <option value="percent-of">Percentage of a number</option>
          <option value="what-percent">What percent is X of Y?</option>
          <option value="change">Percentage increase/decrease</option>
        </select>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">{mode=="percent-of"?"Percentage %":mode=="what-percent"?"First number":"Original value"}</label>
            <input type="number" value={v1} onChange={e=>setV1(e.target.value)} className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm"/></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">{mode=="percent-of"?"Number":(mode=="what-percent"?"Second number":"New value")}</label>
            <input type="number" value={v2} onChange={e=>setV2(e.target.value)} className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm"/></div>
        </div>
        <button onClick={calc} className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 transition-all shadow-md">Calculer</button>
        {res!==null && <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-200">
          <p className="text-sm text-gray-500 mb-1">
            {mode=="percent-of"?`${v1}% of ${v2}`:mode=="what-percent"?`${v1} is ${res.toFixed(2)}% of ${v2}`:`Change: ${res>=0?"Increase":"Decrease"} ${Math.abs(res).toFixed(2)}%`}
          </p>
          <p className="text-3xl font-bold text-blue-700">{res.toFixed(2)}%</p>
        </div>}
      </div>
    </div>
    <SEOContent content={seo} lang="fr"/>
    <FAQSection faqs={faqs} lang="fr"/>
    <RelatedTools tools={relatedTools} lang="fr"/>
    <ShareButtons lang="fr"/>
  </div>);
}
