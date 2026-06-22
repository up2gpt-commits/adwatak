"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  {
    "question": "Apa itu pengonversi suhu?",
    "answer": "Pengonversi suhu adalah alat daring yang dirancang untuk mengubah nilai suhu dari satu skala ke skala lain dengan cepat dan akurat. Misalnya, dapat mengonversi Celsius ke Fahrenheit, Fahrenheit ke Kelvin, atau kombinasi lainnya, menyederhanakan rumus kompleks untuk hasil instan."
  },
  {
    "question": "Bagaimana cara menggunakan pengonversi suhu ini?",
    "answer": "Menggunakan pengonversi kami sangat mudah. Cukup pilih satuan suhu awal (misalnya, Celsius), masukkan nilai yang ingin dikonversi (misalnya, 25), lalu pilih satuan target (misalnya, Fahrenheit). Suhu yang dikonversi akan ditampilkan secara instan, membuat konversi cepat dan tanpa usaha."
  },
  {
    "question": "Skala suhu apa saja yang dapat saya konversi?",
    "answer": "Pengonversi suhu komprehensif kami mendukung tiga skala suhu yang paling umum dan banyak digunakan: Celsius (°C), Fahrenheit (°F), dan Kelvin (K). Anda dapat mengonversi antara skala-skala ini dengan mudah dan presisi, sesuai dengan standar global dan ilmiah."
  },
  {
    "question": "Mengapa saya perlu mengonversi suhu?",
    "answer": "Konversi suhu penting untuk berbagai alasan, seperti memahami laporan cuaca internasional, mengikuti resep asing, eksperimen ilmiah, atau merencanakan perjalanan. Berbagai wilayah dan disiplin ilmu menggunakan skala yang berbeda, sehingga konversi sangat penting untuk komunikasi dan pemahaman yang akurat."
  },
  {
    "question": "Apakah Fahrenheit atau Celsius yang lebih umum secara global?",
    "answer": "Celsius adalah skala suhu yang paling banyak digunakan secara global, diadopsi oleh mayoritas negara untuk cuaca harian, sains, dan industri. Fahrenheit terutama digunakan di Amerika Serikat dan beberapa wilayah lain, sehingga konversi sering diperlukan untuk konteks internasional."
  },
  {
    "question": "Untuk apa skala Kelvin digunakan?",
    "answer": "Skala Kelvin terutama digunakan dalam bidang ilmiah dan teknik, khususnya dalam fisika dan kimia. Ini adalah skala suhu absolut, artinya 0 Kelvin mewakili nol mutlak, suhu terendah yang mungkin secara teoritis, menjadikannya ideal untuk perhitungan ilmiah yang presisi."
  },
  {
    "question": "Dapatkah saya mengonversi suhu negatif dengan alat ini?",
    "answer": "Ya, pengonversi suhu kami menangani nilai suhu positif dan negatif secara akurat di semua skala yang didukung. Baik Anda perlu mengonversi -10°C ke Fahrenheit atau -40°F ke Celsius, alat ini memberikan hasil yang benar tanpa batasan untuk angka negatif."
  },
  {
    "question": "Apakah pengonversi suhu ini gratis digunakan?",
    "answer": "Tentu saja! Pengonversi suhu kami sepenuhnya gratis digunakan, menawarkan konversi tanpa batas tanpa biaya tersembunyi atau langganan. Ini dirancang sebagai alat yang nyaman dan mudah diakses bagi siapa saja yang membutuhkan transformasi skala suhu yang cepat dan akurat."
  }
];

const relatedTools = [
  {title:"Konverter Satuan",icon:"🔄",href:"/id/tools/unit-converter"},
  {title:"Konverter Warna",icon:"🎨",href:"/id/tools/color-converter"},
  {title:"Konverter Mata Uang",icon:"💱",href:"/id/tools/currency-converter"},
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
    <StructuredData data={toolSchema("Temperature Converter","Convert Celsius, Fahrenheit, Kelvin","https://adwatak.cloud/id/tools/temperature-converter","en","Konverter")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="id" category="Konverter" categorySlug="tools" toolName="Konverter Suhu"/>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h1 className="text-2xl font-extrabold mb-1">Konverter Suhu</h1>
      <p className="text-sm text-gray-500 mb-6">Konversi antara Celsius, Fahrenheit, dan Kelvin</p>
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
    <SEOContent content={seo} lang="id"/>
    <FAQSection faqs={faqs} lang="id"/>
    <RelatedTools tools={relatedTools} lang="id"/>
    <ShareButtons lang="id"/>
  </div>);
}
