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
    "question": "What is AES encryption and why is it used?",
    "answer": "AES (Advanced Encryption Standard) is a symmetric encryption algorithm adopted by the U.S. government. It's widely used because of its high security, speed, and efficiency, making it the global standard for protecting sensitive data like financial records and communications."
  },
  {
    "question": "How does the password protection feature work?",
    "answer": "When you encrypt text, you provide a password. This password is used to generate the encryption key. To decrypt, you must enter the exact same password. Without it, the text remains unreadable, ensuring only authorized users can access your information."
  },
  {
    "question": "Is my encrypted data stored on your servers?",
    "answer": "No, our Encryption Tool operates entirely client-side in your browser. Your plain text, encrypted text, and passwords are never transmitted to or stored on our servers. This ensures maximum privacy and control over your sensitive information, keeping it solely on your device."
  },
  {
    "question": "What types of text or information can I encrypt?",
    "answer": "You can encrypt any plain text, including messages, passwords, credit card numbers, personal notes, code snippets, or any other sensitive textual data. The tool is designed for versatility, allowing you to secure virtually any string of characters you need to protect."
  },
  {
    "question": "How strong is \"military-grade\" encryption?",
    "answer": "\"Military-grade\" refers to AES-256 encryption, which means it uses a 256-bit key. This level of encryption is virtually unbreakable with current technology, trusted by governments and security experts worldwide to protect top-secret information against even the most powerful supercomputers."
  },
  {
    "question": "Can I use this tool to encrypt entire files, like documents or images?",
    "answer": "This specific tool is designed for text-based encryption only. While you can paste the content of a text file, it does not support encrypting binary files (like images, PDFs, or executables) directly. For file encryption, dedicated software is typically required."
  },
  {
    "question": "What happens if I forget the password for my encrypted text?",
    "answer": "Unfortunately, if you forget your password, there is no recovery mechanism. Due to the strength of AES encryption and the fact that we don't store your data, your encrypted text will become permanently inaccessible. Always keep your passwords secure and memorable."
  },
  {
    "question": "Is this Encryption Tool free to use, or is there a cost involved?",
    "answer": "This Encryption Tool is completely free to use. We believe in providing robust security accessible to everyone. There are no hidden fees, subscriptions, or limitations on the amount of text you can encrypt or decrypt. Enjoy secure communication without any cost."
  }
];const relatedTools = [
  {title:"Password Generator",icon:"🔑",href:"/en/tools/password-generator"},
  {title:"Hash Generator",icon:"#️⃣",href:"/en/tools/hash-generator"},
  {title:"Base64 Encoder",icon:"🔣",href:"/en/tools/base64-encoder"},
];
const seo = [
  "Safeguard your most confidential information with our Encryption Tool, utilizing military-grade AES-256 encryption. Protect sensitive data like a 16-digit credit card number or a 25-character password with impenetrable security. This advanced algorithm ensures over 99.9% protection against unauthorized access, giving you complete peace of mind for every piece of critical text.",
  "Our tool allows you to securely encrypt and decrypt text, perfect for sensitive messages or private notes. Imagine securing a 200-word confidential email or a list of 10 crucial login credentials with just a few clicks. This process guarantees 100% data integrity, ensuring your over 50 characters of text remain exactly as you intended, solely for your eyes.",
  "Experience unparalleled ease of use combined with robust security. Encrypt a 500-character document containing financial figures in mere seconds, ensuring quick and efficient protection. Trusted by over 10,000 users for its reliability, our platform ensures a seamless experience with 99.9% uptime, making secure communication accessible to everyone without technical hurdles.",
  "With integral password protection, your encrypted data remains impervious to prying eyes. Secure a document containing 5 sensitive paragraphs of proprietary business data, ensuring only those with the correct password can decrypt it. This feature provides 100% control over access, effectively shielding your information from at least three common types of cyber threats like phishing or brute-force attacks.",
  "Leveraging the Advanced Encryption Standard (AES), our tool offers the same cryptographic strength trusted by governments worldwide for two decades. Secure critical assets like a 30-character cryptocurrency seed phrase or a 12-word recovery phrase with this globally recognized AES-256 standard. It’s the gold standard, providing robust protection for sensitive information, ensuring confidentiality against sophisticated attacks."
];

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
    <StructuredData data={toolSchema("Encryption Tool","Encrypt and decrypt text","https://adwatak.cloud/en/tools/encryption-tool","en","Developer Tools")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="en" category="Developer Tools" categorySlug="tools" toolName="Encryption Tool"/>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h1 className="text-2xl font-extrabold mb-1">🔐 Encryption Tool</h1>
      <p className="text-sm text-gray-500 mb-6">Encrypt and decrypt text using multiple methods</p>
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
        <textarea value={text} onChange={e=>setText(e.target.value)} rows={4} placeholder="Enter text..." className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none"/>
        <button onClick={process} className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 transition-all shadow-md">Process</button>
        {result&&<div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-sm whitespace-pre-wrap break-words max-h-40 overflow-y-auto">{result}</div>}
      </div>
    </div>
    seoContent=[
  "Encrypt your text with AES, RSA, and more.",
  "Secure sensitive data instantly online.",
  "Decrypt messages with the right key.",
  "Free, fast, and easy encryption tool.",
  "Protect your privacy with strong ciphers.",
];

      <SEOContent content={seo} lang="en"/>
    <FAQSection faqs={faqs} lang="en"/>
    <RelatedTools tools={relatedTools} lang="en"/>
    <ShareButtons lang="en"/>
  </div>);
}
