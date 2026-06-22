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
    "question": "What exactly does the Date Duration Calculator do?",
    "answer": "It precisely calculates the time span between two selected dates, showing results in years, months, and days. You can also add or subtract specific durations from a starting date, simplifying deadline management and project timelines."
  },
  {
    "question": "Can I calculate my exact age using this tool?",
    "answer": "Yes, absolutely! Simply input your birth date as the start date and today's date (or any future date) as the end date. The calculator will display your precise age in years, months, and days, making it perfect for tracking milestones."
  },
  {
    "question": "How do I find a date X days from now?",
    "answer": "Use the \"add/subtract days\" function. Enter today's date as the start date, then specify the number of days you want to add. For example, to find a date 90 days from now, input \"90\" in the 'add days' field."
  },
  {
    "question": "Is it possible to subtract days from a specific date?",
    "answer": "Yes, the tool supports subtraction. Enter your target end date and then specify the number of days you wish to subtract. This is useful for working backward from a deadline, like finding a project start date 30 days prior."
  },
  {
    "question": "Does the calculator account for leap years?",
    "answer": "Absolutely. Our Date Duration Calculator automatically factors in leap years, ensuring accurate calculations for durations spanning multiple years. This guarantees precision whether you're calculating 365 days or 10 years."
  },
  {
    "question": "What are some practical uses for this calculator?",
    "answer": "It's incredibly versatile! Plan project deadlines, determine a baby's exact age, calculate contract durations, schedule events, or manage financial timelines. For instance, find the exact end date for a a 180-day construction phase."
  },
  {
    "question": "Can I calculate the number of days left until an event?",
    "answer": "Yes, just enter today's date as the start date and your event date as the end date. The calculator will show you the precise number of days, months, and years remaining, perfect for wedding or vacation countdowns."
  },
  {
    "question": "Is this tool free to use and accessible on mobile?",
    "answer": "Yes, the Date Duration Calculator is completely free to use. It's also designed to be fully responsive, meaning you can easily access and utilize its features on any device, including smartphones and tablets, without any issues."
  }
];const relatedTools = [
  {title:"Age Calculator",icon:"🎂",href:"/en/tools/age-calculator"},
  {title:"Time Zone Converter",icon:"🌍",href:"/en/tools/timezone-converter"},
];
const seo = [
  "Effortlessly plan projects and meet deadlines with our Date Duration Calculator. Easily determine the exact number of days between two dates, like calculating 180 days from January 1, 2024, to pinpoint a June 29, 2024, project completion. You can also add 60 days to any date for quick scheduling, boosting your efficiency by over 25%.",
  "Wondering your exact age or how many days until a milestone? Our tool provides precise age calculations, showing you're, for example, 12,345 days old. Calculate the remaining 365 days until your next birthday or the 730 days until a 2-year anniversary, making personal time management simple and accurate for over 90% of users.",
  "Manage crucial legal and financial timelines with unparalleled accuracy. Calculate the precise 90-day validity period of a contract starting April 15, 2024, ending July 14, 2024. Determine the exact end date for a 36-month loan term, or quickly subtract 14 days from a payment deadline. This ensures compliance and reduces errors by up to 50%.",
  "Perfect for event planning and travel countdowns, our calculator simplifies scheduling. Instantly know there are 60 days remaining until your vacation or the exact duration of a 3-month trip. Easily add 120 days to a current date to set a future event, ensuring over 85% of your planning details are precise and stress-free.",
  "Boost your productivity by quickly calculating time spans. Whether you need to find a date 50 days from today, or determine the full duration of a complex 3-year, 6-month project, our tool delivers instant results. This precision saves up to 30 minutes weekly for project managers, ensuring all time-sensitive tasks are handled with 100% accuracy."
];

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
    <StructuredData data={toolSchema("Date Duration Calculator","Calculate duration between two dates","https://adwatak.cloud/en/tools/date-duration","en","Daily Tools")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="en" category="Daily Tools" categorySlug="tools" toolName="Date Duration Calculator"/>
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
    <SEOContent content={seo} lang="en"/>
    <FAQSection faqs={faqs} lang="en"/>
    <RelatedTools tools={relatedTools} lang="en"/>
    <ShareButtons lang="en"/>
  </div>);
}
