"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  {question:"What is Temperature Converter?",answer:"A free tool to convert temperatures between Celsius, Fahrenheit, and Kelvin in real-time."},
  {question:"How to convert?",answer:"Type a value in any field — the others update automatically."},
  {question:"What is the difference between Celsius and Fahrenheit?",answer:"Celsius is used worldwide. Fahrenheit is used in the US. Water freezes at 0°C / 32°F and boils at 100°C / 212°F."},
  {question:"What is Kelvin?",answer:"Kelvin is the SI unit for temperature. 0K = -273.15°C (absolute zero)."},
];

const relatedTools = [
  {title:"Unit Converter",icon:"🔄",href:"/en/tools/unit-converter"},
  {title:"Color Converter",icon:"🎨",href:"/en/tools/color-converter"},
  {title:"Currency Converter",icon:"💱",href:"/en/tools/currency-converter"},
];
const seo = ["Free Temperature Converter — convert between Celsius, Fahrenheit, and Kelvin instantly. Simple and accurate.", "Perfect for students, scientists, and travelers."];

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
    <StructuredData data={toolSchema("Temperature Converter","Convert Celsius, Fahrenheit, Kelvin","https://adwatak.cloud/en/tools/temperature-converter","en","Converters")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="en" category="Converters" categorySlug="tools" toolName="Temperature Converter"/>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h1 className="text-2xl font-extrabold mb-1">🌡️ Temperature Converter</h1>
      <p className="text-sm text-gray-500 mb-6">Convert between Celsius, Fahrenheit, and Kelvin</p>
      <div className="space-y-4">
        {[{key:"C",label:"Celsius (°C)"},{key:"F",label:"Fahrenheit (°F)"},{key:"K",label:"Kelvin (K)"}].map(({key,label})=>(
          <div key={key}>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
            <input type="number" value={val[key.toLowerCase() as keyof typeof val]} onChange={e=>handle(key,e.target.value)}
              placeholder={`Enter temperature in ${label}`} dir="ltr"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"/>
          </div>
        ))}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-center text-sm text-gray-600">
          {active && val.c ? `${val.c}°C = ${val.f}°F = ${val.k}K` : "Enter a value in any field to convert..."}
        </div>
      </div>
    </div>
    <SEOContent content={seo} lang="en"/>
    <FAQSection faqs={faqs} lang="en"/>
    <RelatedTools tools={relatedTools} lang="en"/>
    <ShareButtons lang="en"/>
  </div>);
}
