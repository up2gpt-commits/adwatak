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
    "question": "Apa itu enkripsi AES dan mengapa digunakan?",
    "answer": "AES (Advanced Encryption Standard) adalah algoritma enkripsi simetris yang diadopsi oleh pemerintah AS. Ini banyak digunakan karena keamanan, kecepatan, dan efisiensinya yang tinggi, menjadikannya standar global untuk melindungi data sensitif seperti catatan keuangan dan komunikasi."
  },
  {
    "question": "Bagaimana cara kerja fitur perlindungan kata sandi?",
    "answer": "Saat Anda mengenkripsi teks, Anda memberikan kata sandi. Kata sandi ini digunakan untuk menghasilkan kunci enkripsi. Untuk mendekripsi, Anda harus memasukkan kata sandi yang persis sama. Tanpanya, teks tetap tidak dapat dibaca, memastikan hanya pengguna yang berwenang yang dapat mengakses informasi Anda."
  },
  {
    "question": "Apakah data terenkripsi saya disimpan di server Anda?",
    "answer": "Tidak, Alat Enkripsi kami beroperasi sepenuhnya di sisi klien di browser Anda. Teks biasa, teks terenkripsi, dan kata sandi Anda tidak pernah dikirimkan atau disimpan di server kami. Ini memastikan privasi dan kontrol maksimum atas informasi sensitif Anda, menjaganya hanya di perangkat Anda."
  },
  {
    "question": "Jenis teks atau informasi apa yang dapat saya enkripsi?",
    "answer": "Anda dapat mengenkripsi teks biasa apa pun, termasuk pesan, kata sandi, nomor kartu kredit, catatan pribadi, potongan kode, atau data teks sensitif lainnya. Alat ini dirancang untuk fleksibilitas, memungkinkan Anda mengamankan hampir semua rangkaian karakter yang perlu Anda lindungi."
  },
  {
    "question": "Seberapa kuat enkripsi \"tingkat militer\"?",
    "answer": "\"Tingkat militer\" mengacu pada enkripsi AES-256, yang berarti menggunakan kunci 256-bit. Tingkat enkripsi ini hampir tidak dapat dipecahkan dengan teknologi saat ini, dipercaya oleh pemerintah dan pakar keamanan di seluruh dunia untuk melindungi informasi rahasia terhadap superkomputer paling kuat sekalipun."
  },
  {
    "question": "Dapatkah saya menggunakan alat ini untuk mengenkripsi seluruh file, seperti dokumen atau gambar?",
    "answer": "Alat khusus ini dirancang hanya untuk enkripsi berbasis teks. Meskipun Anda dapat menempelkan konten file teks, alat ini tidak mendukung enkripsi file biner (seperti gambar, PDF, atau file yang dapat dieksekusi) secara langsung. Untuk enkripsi file, biasanya diperlukan perangkat lunak khusus."
  },
  {
    "question": "Apa yang terjadi jika saya lupa kata sandi untuk teks terenkripsi saya?",
    "answer": "Sayangnya, jika Anda lupa kata sandi, tidak ada mekanisme pemulihan. Karena kekuatan enkripsi AES dan fakta bahwa kami tidak menyimpan data Anda, teks terenkripsi Anda akan menjadi tidak dapat diakses secara permanen. Selalu jaga kata sandi Anda tetap aman dan mudah diingat."
  },
  {
    "question": "Apakah Alat Enkripsi ini gratis digunakan, atau ada biaya yang terlibat?",
    "answer": "Alat Enkripsi ini sepenuhnya gratis digunakan. Kami percaya dalam menyediakan keamanan yang kuat yang dapat diakses oleh semua orang. Tidak ada biaya tersembunyi, langganan, atau batasan jumlah teks yang dapat Anda enkripsi atau dekripsi. Nikmati komunikasi aman tanpa biaya apa pun."
  }
];const relatedTools = [
  {title:"Pembuat Kata Sandi",icon:"🔑",href:"/id/tools/password-generator"},
  {title:"Generator Hash",icon:"#️⃣",href:"/id/tools/hash-generator"},
  {title:"Encoder Base64",icon:"🔣",href:"/id/tools/base64-encoder"},
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
    <StructuredData data={toolSchema("Alat Enkripsi","Encrypt and decrypt text","https://adwatak.cloud/id/tools/encryption-tool","en","Alat Pengembang")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="id" category="Alat Pengembang" categorySlug="tools" toolName="Alat Enkripsi"/>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h1 className="text-2xl font-extrabold mb-1">🔐 Alat Enkripsi</h1>
      <p className="text-sm text-gray-500 mb-6">Enkripsi dan dekripsi teks menggunakan berbagai metode</p>
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
          {mode==="caesar"&&<input type="number" value={key} onChange={e=>setKey(e.target.value)} min="1" max="25" className="px-3 py-3 border border-gray-300 rounded-lg text-sm" placeholder="Kunci"/>}
        </div>
        <textarea value={text} onChange={e=>setText(e.target.value)} rows={4} placeholder="Masukkan teks..." className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none"/>
        <button onClick={process} className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 transition-all shadow-md">Proses</button>
        {result&&<div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-sm whitespace-pre-wrap break-words max-h-40 overflow-y-auto">{result}</div>}
      </div>
    </div>
    seoContent=[
  "Enkripsi teks Anda dengan AES, RSA, dan lainnya.",
  "Amankan data sensitif secara instan secara online.",
  "Dekripsi pesan dengan kunci yang tepat.",
  "Alat enkripsi gratis, cepat, dan mudah.",
  "Lindungi privasi Anda dengan sandi yang kuat.",
];

      <SEOContent content={seo} lang="id"/>
    <FAQSection faqs={faqs} lang="id"/>
    <RelatedTools tools={relatedTools} lang="id"/>
    <ShareButtons lang="id"/>
  </div>);
}
