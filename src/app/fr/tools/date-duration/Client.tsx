"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  {question:"Qu'est-ce que le calculateur de durée entre dates ?",answer:"Un outil gratuit pour calculer la durée entre deux dates en jours, mois et années."},
  {question:"Comment l'utiliser ?",answer:"Sélectionnez la date de début et la date de fin. Le résultat se met à jour instantanément."},
  {question:"Est-ce précis ?",answer:"Oui, il calcule la différence exacte en jours, mois et années, en tenant compte des années bissextiles."},
];
const relatedTools = [
  {title:"Calculateur d'Âge",icon:"🎂",href:"/fr/tools/age-calculator"},
  {title:"Convertisseur de Fuseau Horaire",icon:"🌍",href:"/fr/tools/timezone-converter"},
];
const seo = ["Calculateur gratuit de durée entre dates — calculez la différence exacte entre deux dates en jours, mois et années.", "Parfait pour calculer l'âge, les délais de projet et la planification d'événements."];

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
    <StructuredData data={toolSchema("Date Duration Calculator","Calculer la durée entre deux dates","https://adwatak.cloud/fr/tools/date-duration","fr","Outils quotidiens")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="fr" category="Outils quotidiens" categorySlug="tools" toolName="Calculateur de durée entre dates"/>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h1 className="text-2xl font-extrabold mb-1">📅 Calculateur de Durée</h1>
      <p className="text-sm text-gray-500 mb-6">Calculez la durée entre deux dates</p>
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
    seoContent=[
  "Calculez instantanément le nombre de jours entre deux dates.",
  "Ajoutez ou soustrayez facilement des jours à n'importe quelle date.",
  "Trouvez la durée exacte en jours, semaines, mois.",
  "Planifiez des événements, des échéances ou calculez l'âge.",
  "Outil gratuit de calcul de durée entre dates en ligne.",
];

      <SEOContent content={seo} lang="fr"/>
    <FAQSection faqs={faqs} lang="fr"/>
    <RelatedTools tools={relatedTools} lang="fr"/>
    <ShareButtons lang="fr"/>
  </div>);
}
