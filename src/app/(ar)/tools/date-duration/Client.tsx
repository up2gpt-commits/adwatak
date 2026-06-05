"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  {question:"ما هي حاسبة المدة بين تاريخين؟",answer:"أداة مجانية لحساب المدة بالأيام والشهور والسنين بين أي تاريخين."},
  {question:"كيف أستخدمها؟",answer:"اختر تاريخ البداية وتاريخ النهاية، والنتيجة تظهر فوراً."},
  {question:"هل تحسب الأيام بدقة؟",answer:"نعم، تحسب الفرق باليوم والشهر والسنة بدقة كاملة مع مراعاة السنة الكبيسة."},
  {question:"هل يمكنني حساب المدة من اليوم؟",answer:"نعم، استخدم زر اليوم لتعيين تاريخ النهاية."},
];
const relatedTools = [
  {title:"حاسبة العمر",icon:"🎂",href:"/tools/age-calculator"},
  {title:"حاسبة التاريخ الهجري",icon:"🌙",href:"/tools/hijri-converter"},
  {title:"فارق التوقيت",icon:"🌍",href:"/tools/timezone-converter"},
];
const seo = ["حاسبة المدة بين تاريخين مجانية — احسب الفرق بالأيام والشهور والسنين بين أي تاريخين. دقيقة وسريعة.", "مثالية لحساب الأعمار والمدة بين الأحداث."];

export default function Client(){
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
    <StructuredData data={toolSchema("المدة بين تاريخين","حساب المدة بالأيام والشهور والسنين","https://adwatak.cloud/tools/date-duration","ar","Daily Tools")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="ar" category="أدوات يومية" categorySlug="tools" toolName="المدة بين تاريخين"/>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h1 className="text-2xl font-extrabold mb-1">📅 المدة بين تاريخين</h1>
      <p className="text-sm text-gray-500 mb-6">احسب المدة بالأيام والشهور والسنين</p>
      <div className="space-y-4 mb-6">
        <div><label className="block text-xs font-semibold text-gray-600 mb-1">تاريخ البداية</label>
          <input type="date" value={start} onChange={e=>setStart(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"/></div>
        <div><label className="block text-xs font-semibold text-gray-600 mb-1">تاريخ النهاية</label>
          <div className="flex gap-2"><input type="date" value={end} onChange={e=>setEnd(e.target.value)} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm"/>
            <button onClick={()=>setEnd(today)} className="px-4 py-3 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">اليوم</button></div></div>
        {r&&<div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div><p className="text-3xl font-bold text-blue-700">{r.years}</p><p className="text-xs text-gray-500">سنة</p></div>
            <div><p className="text-3xl font-bold text-blue-700">{r.months}</p><p className="text-xs text-gray-500">شهر</p></div>
            <div><p className="text-3xl font-bold text-blue-700">{r.days}</p><p className="text-xs text-gray-500">يوم</p></div>
          </div>
          <div className="border-t border-blue-200 pt-4 text-center text-sm text-gray-600">
            المدة الإجمالية: <strong>{r.totalDays}</strong> يوم = <strong>{r.totalMonths}</strong> شهر
          </div>
        </div>}
      </div>
    </div>
    <SEOContent content={seo} lang="ar"/>
    <FAQSection faqs={faqs} lang="ar"/>
    <RelatedTools tools={relatedTools} lang="ar"/>
    <ShareButtons lang="ar"/>
  </div>);
}
