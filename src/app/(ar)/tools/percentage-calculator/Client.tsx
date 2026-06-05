"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  {question:"ما هي حاسبة النسبة المئوية؟",answer:"أداة مجانية لحساب النسب المئوية بثلاث طرق: حساب نسبة من رقم، معرفة نسبة رقم من رقم آخر، وحساب الزيادة أو النقصان المئوي."},
  {question:"هل الأداة مجانية؟",answer:"نعم 100% مجانية. بدون تسجيل."},
  {question:"كيف أحسب نسبة من رقم؟",answer:"اختر الخيار الأول، أدخل النسبة المئوية والرقم، واضغط احسب."},
  {question:"كيف أحسب نسبة زيادة؟",answer:"اختر الخيار الثالث، أدخل الرقم الأصلي والرقم الجديد."},
  {question:"هل أحتاج لاتصال بالإنترنت؟",answer:"لا، كل شيء يعمل محلياً في متصفحك."},
  {question:"هل تدعم الأعداد العشرية؟",answer:"نعم، تدعم الأعداد العشرية بدقة عالية."},
  {question:"هل تعمل على الجوال؟",answer:"نعم، متجاوبة مع جميع الأجهزة."},
];

const relatedTools = [{title:"حاسبة العلامات",icon:"📊",href:"/tools/profit-margin"},{title:"ضريبة القيمة المضافة",icon:"🏛️",href:"/tools/vat-calculator"},{title:"الفائدة المركبة",icon:"📈",href:"/tools/compound-interest"},{title:"مؤشر كتلة الجسم",icon:"⚖️",href:"/tools/bmi-calculator"}];
const seo = ["حاسبة النسبة المئوية مجانية — احسب نسبة من رقم، النسبة المئوية لرقم من آخر، ونسبة الزيادة والنقصان. أداة بسيطة وسريعة.", "مثالية للطلاب والمحاسبين والتجار."];

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
    <StructuredData data={toolSchema("حاسبة النسبة المئوية","حساب النسب المئوية بسرعة","https://adwatak.cloud/tools/percentage-calculator","ar","Calculators")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="ar" category="حاسبات" categorySlug="tools" toolName="حاسبة النسبة المئوية"/>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h1 className="text-2xl font-extrabold mb-1">📊 حاسبة النسبة المئوية</h1>
      <p className="text-sm text-gray-500 mb-6">حساب النسب المئوية بسرعة وسهولة</p>
      <div className="space-y-4 mb-6">
        <select value={mode} onChange={e=>setMode(e.target.value)} className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm bg-white">
          <option value="percent-of">حساب نسبة % من رقم</option>
          <option value="what-percent">ما نسبة رقم من رقم آخر؟</option>
          <option value="change">نسبة الزيادة أو النقصان</option>
        </select>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">{mode=="percent-of"?"النسبة المئوية %":mode=="what-percent"?"الرقم الأول":"الرقم الأصلي"}</label>
            <input type="number" value={v1} onChange={e=>setV1(e.target.value)} className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm"/></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">{mode=="percent-of"?"الرقم":(mode=="what-percent"?"الرقم الثاني":"الرقم الجديد")}</label>
            <input type="number" value={v2} onChange={e=>setV2(e.target.value)} className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm"/></div>
        </div>
        <button onClick={calc} className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 transition-all shadow-md">احسب</button>
        {res!==null && <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-200">
          <p className="text-sm text-gray-500 mb-1">
            {mode=="percent-of"?`${v1}% من ${v2}`:mode=="what-percent"?`${v1} نسبة ${res.toFixed(2)}% من ${v2}`:`التغير: ${res>=0?"زيادة":"نقصان"} ${Math.abs(res).toFixed(2)}%`}
          </p>
          <p className="text-3xl font-bold text-blue-700">{res.toFixed(2)}%</p>
        </div>}
      </div>
    </div>
    <SEOContent content={seo} lang="ar"/>
    <FAQSection faqs={faqs} lang="ar"/>
    <RelatedTools tools={relatedTools} lang="ar"/>
    <ShareButtons lang="ar"/>
  </div>);
}
