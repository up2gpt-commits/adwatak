"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  {question:"ما هو محول درجة الحرارة؟",answer:"أداة مجانية لتحويل درجات الحرارة بين Celsius و Fahrenheit و Kelvin في الوقت الفعلي."},
  {question:"كيف أحول بين الوحدات؟",answer:"اكتب القيمة في أي حقل والباقي يتحدث تلقائياً."},
  {question:"ما الفرق بين Celsius و Fahrenheit؟",answer:"Celsius (مئوي) يستخدم في معظم دول العالم. Fahrenheit (فهرنهايت) يستخدم في أمريكا. الماء يتجمد عند 0°C / 32°F ويغلي عند 100°C / 212°F."},
  {question:"ما هو Kelvin؟",answer:"Kelvin (كلفن) هو وحدة القياس الدولية لدرجة الحرارة. 0K = -273.15°C (الصفر المطلق)."},
];

const relatedTools = [
  {title:"محول الوحدات",icon:"🔄",href:"/tools/unit-converter"},
  {title:"محول الألوان",icon:"🎨",href:"/tools/color-converter"},
  {title:"محول البكسل",icon:"📏",href:"/tools/pixel-converter"},
  {title:"محول العملات",icon:"💱",href:"/tools/currency-converter"},
];
const seo = ["محول درجة الحرارة مجاني — تحويل بين Celsius و Fahrenheit و Kelvin بشكل فوري. أداة بسيطة ودقيقة.", "مثالية للطلاب والعلماء والمسافرين."];

function toC(v:number,u:string){if(u==="C")return v;if(u==="F")return(v-32)*5/9;return v-273.15;}
function fromC(v:number,u:string){if(u==="C")return v;if(u==="F")return v*9/5+32;return v+273.15;}

export default function Client(){
  const [val,setVal]=useState({c:"",f:"",k:""});
  const [active,setActive]=useState("");

  const handle=(src:string,v:string)=>{
    setActive(src);
    const n=parseFloat(v);
    if(isNaN(n)||v===""){setVal({c:"",f:"",k:""});return;}
    const c=src==="C"?n:src==="F"?toC(n,"F"):toC(n,"K");
    setVal({c:fromC(c,"C").toFixed(2),f:fromC(c,"F").toFixed(2),k:fromC(c,"K").toFixed(2)});
  };

  return (<div className="max-w-[760px] mx-auto">
    <StructuredData data={toolSchema("محول درجة الحرارة","تحويل بين Celsius و Fahrenheit و Kelvin","https://adwatak.cloud/tools/temperature-converter","ar","Converters")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="ar" category="محولات" categorySlug="tools" toolName="محول درجة الحرارة"/>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h1 className="text-2xl font-extrabold mb-1">🌡️ محول درجة الحرارة</h1>
      <p className="text-sm text-gray-500 mb-6">تحويل بين Celsius و Fahrenheit و Kelvin</p>
      <div className="space-y-4">
        {[{key:"C",label:"Celsius (°C)"},{key:"F",label:"Fahrenheit (°F)"},{key:"K",label:"Kelvin (K)"}].map(({key,label})=>(
          <div key={key}>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
            <input type="number" value={val[key.toLowerCase() as keyof typeof val]} onChange={e=>handle(key,e.target.value)}
              placeholder={`أدخل درجة الحرارة بـ ${label}`}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              dir="ltr"/>
          </div>
        ))}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-center text-sm text-gray-600">
          {active && val.c ? `${val.c}°C = ${val.f}°F = ${val.k}K` : "أدخل قيمة في أي حقل للتحويل..."}
        </div>
      </div>
    </div>
    <SEOContent content={seo} lang="ar"/>
    <FAQSection faqs={faqs} lang="ar"/>
    <RelatedTools tools={relatedTools} lang="ar"/>
    <ShareButtons lang="ar"/>
  </div>);
}
