"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  {question:"What is Date Duration Calculator?",answer:"A free tool to calculate the duration between two dates in days, months, and years."},
  {question:"How to use it?",answer:"Select start date and end date. The result updates instantly."},
  {question:"Is it accurate?",answer:"Yes, it calculates the exact difference in days, months, and years, accounting for leap years."},
];
const relatedTools = [
  {title:"Age Calculator",icon:"🎂",href:"/fr/tools/age-calculator"},
  {title:"Time Zone Converter",icon:"🌍",href:"/fr/tools/timezone-converter"},
];
const seo = ["Free Date Duration Calculator — calculate the exact difference between two dates in days, months, and years.", "Perfect for calculating age, project timelines, and event planning."];

export default function ClientEn(){
  const today=new Date().toISOString().split("T")[0];
  const [start,setStart]=useState("2024-01-01");
  const [end,setEnd]=useState(today);

  const calc=()=>{
    const s=new Date(start),e=new Date(end);
    if(isNaN(s.getTime())||isNaN(e.getTime()))return null;
    let years=e.getFullYear()-s.getFullYear();
    let months=e.getMonth()-s.getMonth();
    let days=e.getDate()-s.getDate();
    if(days<0){months--;const p=new Date(e.getFullYear(),e.getMonth(),0);days+=p.getDate();}
    if(months<0){years--;months+=12;}
    const totalDays=Math.floor((e.getTime()-s.getTime())/(1000*60*60*24));
    const totalMonths=years*12+months;
    return{years,months,days,totalDays,totalMonths};
  };
  const r=calc();

  return (<div className="max-w-[760px] mx-auto">
    <StructuredData data={toolSchema("Date Duration Calculator","Calculate duration between two dates","https://adwatak.cloud/fr/tools/date-duration","fr","Daily Tools")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="fr" category="Daily Tools" categorySlug="tools" toolName="Date Duration Calculator"/>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h1 className="text-2xl font-extrabold mb-1">📅 Date Duration Calculator</h1>
      <p className="text-sm text-gray-500 mb-6">Calculate days, months, years between two dates</p>
      <div className="space-y-4 mb-6">
        <div><label className="block text-xs font-semibold text-gray-600 mb-1">Start Date</label>
          <input type="date" value={start} onChange={e=>setStart(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"/></div>
        <div><label className="block text-xs font-semibold text-gray-600 mb-1">End Date</label>
          <div className="flex gap-2"><input type="date" value={end} onChange={e=>setEnd(e.target.value)} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm"/>
            <button onClick={()=>setEnd(today)} className="px-4 py-3 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">Today</button></div></div>
        {r&&<div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div><p className="text-3xl font-bold text-blue-700">{r.years}</p><p className="text-xs text-gray-500">Years</p></div>
            <div><p className="text-3xl font-bold text-blue-700">{r.months}</p><p className="text-xs text-gray-500">Months</p></div>
            <div><p className="text-3xl font-bold text-blue-700">{r.days}</p><p className="text-xs text-gray-500">Days</p></div>
          </div>
          <div className="border-t border-blue-200 pt-4 text-center text-sm text-gray-600">
            Total: <strong>{r.totalDays}</strong> days = <strong>{r.totalMonths}</strong> months
          </div>
        </div>}
      </div>
    </div>
    <SEOContent content={seo} lang="fr"/>
    <FAQSection faqs={faqs} lang="fr"/>
    <RelatedTools tools={relatedTools} lang="fr"/>
    <ShareButtons lang="fr"/>
  </div>);
}
