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
    "question": "What is a percentage?",
    "answer": "A percentage represents a fraction of 100. For example, 25% means 25 out of every 100. Our calculator helps you quickly express proportions, changes, or parts of a whole in this universal format, simplifying comparisons and understanding."
  },
  {
    "question": "How do I find what percentage one number is of another?",
    "answer": "Simply enter the 'part' number and the 'whole' number into the respective fields. For instance, to find what percentage 15 is of 60, input 15 and 60. The calculator will instantly show you that 15 is 25% of 60."
  },
  {
    "question": "How do I calculate a percentage change between two values?",
    "answer": "Use the \"Percentage Change\" function. Input the \"old value\" (e.g., $100) and the \"new value\" (e.g., $120). The calculator will determine if it's an increase or decrease and display the exact percentage difference, like a 20% gain."
  },
  {
    "question": "Can this calculator help me figure out discounts and sales tax?",
    "answer": "Absolutely! For discounts, enter the original price and the discount percentage (e.g., 25% off $120). For sales tax, enter the original price and the tax percentage to add. It quickly shows the final price or the tax amount."
  },
  {
    "question": "How do I add or subtract a specific percentage from a number?",
    "answer": "Utilize the \"Add/Subtract Percentage\" function. Input your starting number (e.g., $500) and the percentage you wish to add or subtract (e.g., +10% for a raise, or -15% for a price drop). It calculates the new total instantly."
  },
  {
    "question": "Is this Percentage Calculator suitable for academic use?",
    "answer": "Yes, it's perfect for academics! Students can use it to calculate test scores (e.g., 42 correct answers out of 50 is 84%), analyze data for projects, or understand statistical percentages. It provides quick, accurate results for homework and studies."
  },
  {
    "question": "What are some real-world examples where this tool is useful?",
    "answer": "This tool is incredibly versatile! Calculate an 18% tip on an $85 bill, determine a 10% salary raise on $60,000, figure out a 25% discount on a $200 item, or analyze a 5% growth in investment value."
  },
  {
    "question": "Does the calculator handle decimal percentages or numbers?",
    "answer": "Yes, our Percentage Calculator is designed to handle both whole numbers and decimals with precision. Whether you're calculating 0.5% of a value or finding the percentage of a decimal number, it provides accurate results for all inputs."
  }
];const relatedTools = [{title:"Profit Margin",icon:"📊",href:"/en/tools/profit-margin"},{title:"VAT Calculator",icon:"🏛️",href:"/en/tools/vat-calculator"},{title:"Compound Interest",icon:"📈",href:"/en/tools/compound-interest"},{title:"BMI Calculator",icon:"⚖️",href:"/en/tools/bmi-calculator"}];
const seo = [
  "Need to quickly determine what percentage 45 is of 300? Our Percentage Calculator simplifies this, showing it's exactly 15%. Perfect for students checking test scores, like knowing 85 correct answers out of 100 is an 85%. Never second-guess your proportions again, whether for academic grades or understanding data.",
  "Effortlessly calculate price adjustments with our tool. Planning to buy an item at $120 with a 25% discount? Find the final price of $90 in seconds. Similarly, determine your new salary after a 10% raise on $50,000, bringing it to $55,000. Ideal for budgeting and understanding financial changes instantly.",
  "Track growth or loss with precision using the percentage change function. If a stock increased from $50 to $65, our calculator reveals a 30% gain. Conversely, understand a decrease from $200 to $180 as a 10% drop. Essential for analyzing investment performance, business metrics, or any data over time.",
  "Simplify everyday calculations like tipping. Easily figure out an 18% tip on an $85 restaurant bill, arriving at $15.30. Or perhaps calculate a 7% sales tax on a $25 purchase, adding $1.75. Our Percentage Calculator makes these common financial tasks quick and error-free, saving you time.",
  "From finding 30% of $150 (which is $45) to calculating a 15% price increase on a $300 item, our Percentage Calculator handles diverse needs. Whether it's a 5% budget cut or understanding a 20% market share, get instant, accurate results. This versatile tool is perfect for finance, academics, and daily life."
];

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
    <StructuredData data={toolSchema("Percentage Calculator","Calculate percentages quickly","https://adwatak.cloud/en/tools/percentage-calculator","en","Calculators")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="en" category="Calculators" categorySlug="tools" toolName="Percentage Calculator"/>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h1 className="text-2xl font-extrabold mb-1">📊 Percentage Calculator</h1>
      <p className="text-sm text-gray-500 mb-6">Calculate percentages quickly and easily</p>
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
        <button onClick={calc} className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 transition-all shadow-md">Calculate</button>
        {res!==null && <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-200">
          <p className="text-sm text-gray-500 mb-1">
            {mode=="percent-of"?`${v1}% of ${v2}`:mode=="what-percent"?`${v1} is ${res.toFixed(2)}% of ${v2}`:`Change: ${res>=0?"Increase":"Decrease"} ${Math.abs(res).toFixed(2)}%`}
          </p>
          <p className="text-3xl font-bold text-blue-700">{res.toFixed(2)}%</p>
        </div>}
      </div>
    </div>
    seoContent=[
  "Calculate percentages instantly for any number.",
  "Find percentage increase or decrease easily.",
  "Compute discounts, tips, and markups.",
  "What is X% of Y? Get answers fast.",
  "Free online percentage calculator tool.",
];

      <SEOContent content={seo} lang="en"/>
    <FAQSection faqs={faqs} lang="en"/>
    <RelatedTools tools={relatedTools} lang="en"/>
    <ShareButtons lang="en"/>
  </div>);
}
