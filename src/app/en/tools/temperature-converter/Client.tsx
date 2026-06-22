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
    "question": "What is a temperature converter?",
    "answer": "A temperature converter is an online tool designed to quickly and accurately transform temperature values from one scale to another. For example, it can convert Celsius to Fahrenheit, Fahrenheit to Kelvin, or any other combination, simplifying complex formulas for instant results."
  },
  {
    "question": "How do I use this temperature converter?",
    "answer": "Using our converter is simple. Just select your starting temperature unit (e.g., Celsius), enter the value you wish to convert (e.g., 25), and then select the target unit (e.g., Fahrenheit). The converted temperature will be displayed instantly, making conversions quick and effortless."
  },
  {
    "question": "Which temperature scales can I convert?",
    "answer": "Our comprehensive temperature converter supports the three most common and widely used temperature scales: Celsius (°C), Fahrenheit (°F), and Kelvin (K). You can convert between any of these scales with ease and precision, catering to global and scientific standards."
  },
  {
    "question": "Why would I need to convert temperatures?",
    "answer": "Temperature conversion is essential for various reasons, such as understanding international weather reports, following foreign recipes, scientific experiments, or planning travel. Different regions and disciplines use different scales, making conversion crucial for accurate communication and understanding."
  },
  {
    "question": "Is Fahrenheit or Celsius more common globally?",
    "answer": "Celsius is the most widely used temperature scale globally, adopted by the majority of countries for daily weather, science, and industry. Fahrenheit is primarily used in the United States and a few other territories, making conversion often necessary for international contexts."
  },
  {
    "question": "What is the Kelvin scale used for?",
    "answer": "The Kelvin scale is primarily used in scientific and engineering fields, particularly in physics and chemistry. It is an absolute temperature scale, meaning 0 Kelvin represents absolute zero, the theoretical lowest possible temperature, making it ideal for precise scientific calculations."
  },
  {
    "question": "Can I convert negative temperatures with this tool?",
    "answer": "Yes, our temperature converter accurately handles both positive and negative temperature values across all supported scales. Whether you need to convert -10°C to Fahrenheit or -40°F to Celsius, the tool provides correct results without any limitations for negative numbers."
  },
  {
    "question": "Is this temperature converter free to use?",
    "answer": "Absolutely! Our temperature converter is completely free to use, offering unlimited conversions without any hidden costs or subscriptions. It's designed to be a convenient and accessible tool for everyone needing quick and accurate temperature scale transformations."
  }
];const relatedTools = [
  {title:"Unit Converter",icon:"🔄",href:"/en/tools/unit-converter"},
  {title:"Color Converter",icon:"🎨",href:"/en/tools/color-converter"},
  {title:"Currency Converter",icon:"💱",href:"/en/tools/currency-converter"},
];
const seo = [
  "Effortlessly convert temperatures between Celsius, Fahrenheit, and Kelvin with our powerful online tool. Whether you're planning a trip and need to know 20°C equals 68°F, or working on a science project requiring precise Kelvin measurements, our temperature converter provides instant, accurate results. Streamline your conversions and eliminate manual calculations for any temperature scale.",
  "Experience lightning-fast and accurate temperature conversions with our dedicated tool. Convert 98.6°F (body temperature) to 37°C, or understand that 0°C is 273.15 Kelvin, instantly. Designed for clarity and efficiency, our converter supports all major temperature scales, ensuring you get the correct reading every time without hassle. Make complex conversions simple.",
  "Our versatile temperature converter is perfect for various everyday needs. Easily convert oven temperatures from 350°F to 176.67°C for international recipes, or quickly check if 0°F is indeed -17.78°C for weather reporting. This indispensable tool saves time for travelers, cooks, students, and professionals alike, providing reliable temperature data on demand.",
  "For scientific precision or daily convenience, our temperature converter handles every scenario. Need to convert absolute zero (-273.15°C) to 0 Kelvin? Or perhaps understand that -40°C is precisely -40°F? Our tool delivers these conversions accurately. It's an essential resource for engineering, physics, chemistry, and anyone requiring exact temperature scale transformations.",
  "Unlock instant temperature conversion with our user-friendly online tool. Convert Celsius to Fahrenheit, Fahrenheit to Kelvin, or any other pairing in mere seconds. From understanding that 100°C is boiling point (212°F) to converting specific data points, our converter simplifies complex unit changes, making it the go-to solution for all your temperature measurement needs."
];

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
    seoContent=[
  "Convert Celsius to Fahrenheit and Kelvin.",
  "Instant temperature unit conversions.",
  "Accurate results for science and cooking.",
  "Switch between °C, °F, K with ease.",
  "Free online temperature converter tool.",
];

      <SEOContent content={seo} lang="en"/>
    <FAQSection faqs={faqs} lang="en"/>
    <RelatedTools tools={relatedTools} lang="en"/>
    <ShareButtons lang="en"/>
  </div>);
}
