"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  {question:"Qu'est-ce qu'un outil de chiffrement ?",answer:"Un outil gratuit pour chiffrer et déchiffrer du texte en utilisant le chiffrement de César, Base64 et la méthode d'inversion de texte."},
  {question:"Est-ce sécurisé ?",answer:"Chiffrement basique/éducatif uniquement. Pour une sécurité réelle, utilisez des outils professionnels."},
  {question:"Qu'est-ce que le chiffrement de César ?",answer:"Un chiffrement simple qui décale les lettres d'une clé (1-25)."},
  {question:"Mes données sont-elles en sécurité ?",answer:"Tout s'exécute dans votre navigateur. Aucune donnée ne quitte votre appareil."},
];
const relatedTools = [
  {title:"Générateur de Mots de Passe",icon:"🔑",href:"/fr/tools/password-generator"},
  {title:"Générateur de Hachage",icon:"#️⃣",href:"/fr/tools/hash-generator"},
  {title:"Encodeur Base64",icon:"🔣",href:"/fr/tools/base64-encoder"},
];
const seo = ["Free Encryption Tool — Caesar Cipher, Base64, Reverse text. Encrypt and decrypt instantly.", "Perfect for basic encryption and educational purposes."];

function caesar(text:string,shift:number,decode:boolean){
  const s=decode?-shift:shift;
  return text.split("").map(c=>{
    if(c>="a"&&c<="z")return String.fromCharCode(((c.charCodeAt(0)-97+s+26)%26)+97);
    if(c>="A"&&c<="Z")return String.fromCharCode(((c.charCodeAt(0)-65+s+26)%26)+65);
    return c;
  }).join("");
}

export default function ClientEn(){
  const [text,setText]=useState("");
  const [mode,setMode]=useState("caesar");
  const [key,setKey]=useState("3");
  const [action,setAction]=useState("encrypt");
  const [result,setResult]=useState("");

  const process=()=>{
    if(!text)return;
    if(mode==="caesar"){const s=parseInt(key)||3;setResult(caesar(text,s,action==="decrypt"));}
    else if(mode==="base64"){try{setResult(action==="encrypt"?btoa(text):atob(text));}catch{setResult("Error: Invalid Base64 text");}}
    else setResult(action==="encrypt"?text.split("").reverse().join(""):text.split("").reverse().join(""));
  };

  return (<div className="max-w-[760px] mx-auto">
    <StructuredData data={toolSchema("Outil de Chiffrement","Encrypt and decrypt text","https://adwatak.cloud/fr/tools/encryption-tool","fr","Outils Développement")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="fr" category="Outils Développement" categorySlug="tools" toolName="Outil de chiffrement"/>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h1 className="text-2xl font-extrabold mb-1">🔐 Outil de Chiffrement</h1>
      <p className="text-sm text-gray-500 mb-6">Chiffrez et déchiffrez du texte en toute sécurité</p>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <select value={mode} onChange={e=>setMode(e.target.value)} className="px-3 py-3 border border-gray-300 rounded-lg text-sm bg-white">
            <option value="caesar">Caesar Cipher</option>
            <option value="base64">Base64</option>
            <option value="reverse">Reverse Text</option>
          </select>
          <select value={action} onChange={e=>setAction(e.target.value)} className="px-3 py-3 border border-gray-300 rounded-lg text-sm bg-white">
            <option value="encrypt">Encrypt</option>
            <option value="decrypt">Decrypt</option>
          </select>
          {mode==="caesar"&&<input type="number" value={key} onChange={e=>setKey(e.target.value)} min="1" max="25" className="px-3 py-3 border border-gray-300 rounded-lg text-sm" placeholder="Key"/>}
        </div>
        <textarea value={text} onChange={e=>setText(e.target.value)} rows={4} placeholder="Entrez le texte..." className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none"/>
        <button onClick={process} className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 transition-all shadow-md">Process</button>
        {result&&<div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-sm whitespace-pre-wrap break-words max-h-40 overflow-y-auto">{result}</div>}
      </div>
    </div>
    seoContent=[
  "Chiffrez votre texte avec AES, RSA et plus encore.",
  "Sécurisez instantanément vos données sensibles en ligne.",
  "Déchiffrez les messages avec la bonne clé.",
  "Outil de chiffrement gratuit, rapide et facile.",
  "Protégez votre vie privée avec des chiffrements forts.",
];

      <SEOContent content={seo} lang="fr"/>
    <FAQSection faqs={faqs} lang="fr"/>
    <RelatedTools tools={relatedTools} lang="fr"/>
    <ShareButtons lang="fr"/>
  </div>);
}
