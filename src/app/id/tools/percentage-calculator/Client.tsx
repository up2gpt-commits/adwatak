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
    "question": "Apa itu persentase?",
    "answer": "Persentase mewakili pecahan dari 100. Misalnya, 25% berarti 25 dari setiap 100. Kalkulator kami membantu Anda dengan cepat menyatakan proporsi, perubahan, atau bagian dari keseluruhan dalam format universal ini, menyederhanakan perbandingan dan pemahaman."
  },
  {
    "question": "Bagaimana cara mencari persentase suatu angka terhadap angka lain?",
    "answer": "Cukup masukkan angka 'bagian' dan angka 'keseluruhan' ke dalam kolom yang sesuai. Misalnya, untuk mencari persentase 15 dari 60, masukkan 15 dan 60. Kalkulator akan langsung menunjukkan bahwa 15 adalah 25% dari 60."
  },
  {
    "question": "Bagaimana cara menghitung perubahan persentase antara dua nilai?",
    "answer": "Gunakan fungsi \"Perubahan Persentase\". Masukkan \"nilai lama\" (misalnya, $100) dan \"nilai baru\" (misalnya, $120). Kalkulator akan menentukan apakah itu peningkatan atau penurunan dan menampilkan selisih persentase yang tepat, seperti kenaikan 20%."
  },
  {
    "question": "Apakah kalkulator ini dapat membantu saya menghitung diskon dan pajak penjualan?",
    "answer": "Tentu saja! Untuk diskon, masukkan harga asli dan persentase diskon (misalnya, diskon 25% dari $120). Untuk pajak penjualan, masukkan harga asli dan persentase pajak yang akan ditambahkan. Ini dengan cepat menunjukkan harga akhir atau jumlah pajak."
  },
  {
    "question": "Bagaimana cara menambah atau mengurangi persentase tertentu dari suatu angka?",
    "answer": "Gunakan fungsi \"Tambah/Kurangi Persentase\". Masukkan angka awal Anda (misalnya, $500) dan persentase yang ingin Anda tambahkan atau kurangi (misalnya, +10% untuk kenaikan, atau -15% untuk penurunan harga). Ini menghitung total baru secara instan."
  },
  {
    "question": "Apakah Kalkulator Persentase ini cocok untuk penggunaan akademis?",
    "answer": "Ya, ini sempurna untuk akademisi! Siswa dapat menggunakannya untuk menghitung nilai ujian (misalnya, 42 jawaban benar dari 50 adalah 84%), menganalisis data untuk proyek, atau memahami persentase statistik. Ini memberikan hasil yang cepat dan akurat untuk pekerjaan rumah dan studi."
  },
  {
    "question": "Apa saja contoh dunia nyata di mana alat ini berguna?",
    "answer": "Alat ini sangat serbaguna! Hitung tip 18% pada tagihan $85, tentukan kenaikan gaji 10% pada $60.000, hitung diskon 25% pada barang seharga $200, atau analisis pertumbuhan 5% dalam nilai investasi."
  },
  {
    "question": "Apakah kalkulator ini menangani persentase desimal atau angka desimal?",
    "answer": "Ya, Kalkulator Persentase kami dirancang untuk menangani bilangan bulat dan desimal dengan presisi. Baik Anda menghitung 0,5% dari suatu nilai atau mencari persentase dari angka desimal, ini memberikan hasil yang akurat untuk semua masukan."
  }
];const relatedTools = [{title:"Margin Laba",icon:"📊",href:"/id/tools/profit-margin"},{title:"Kalkulator PPN",icon:"🏛️",href:"/id/tools/vat-calculator"},{title:"Bunga Majemuk",icon:"📈",href:"/id/tools/compound-interest"},{title:"Kalkulator BMI",icon:"⚖️",href:"/id/tools/bmi-calculator"}];
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
    <StructuredData data={toolSchema("Kalkulator Persentase","Calculate percentages quickly","https://adwatak.cloud/id/tools/percentage-calculator","en","Kalkulator")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="id" category="Kalkulator" categorySlug="tools" toolName="Kalkulator Persentase"/>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h1 className="text-2xl font-extrabold mb-1">📊 Kalkulator Persentase</h1>
      <p className="text-sm text-gray-500 mb-6">Hitung persentase dengan cepat dan mudah</p>
      <div className="space-y-4 mb-6">
        <select value={mode} onChange={e=>setMode(e.target.value)} className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm bg-white">
          <option value="percent-of">Percentage of a number</option>
          <option value="what-percent">What percent is X of Y?</option>
          <option value="change">Percentage increase/decrease</option>
        </select>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">{mode=="percent-of"?"Persentase %":mode=="what-percent"?"Angka pertama":"Nilai asli"}</label>
            <input type="number" value={v1} onChange={e=>setV1(e.target.value)} className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm"/></div>
          <div><label className="block text-xs font-semibold text-gray-600 mb-1">{mode=="percent-of"?"Angka":(mode=="what-percent"?"Angka kedua":"Nilai baru")}</label>
            <input type="number" value={v2} onChange={e=>setV2(e.target.value)} className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm"/></div>
        </div>
        <button onClick={calc} className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 transition-all shadow-md">Hitung</button>
        {res!==null && <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-200">
          <p className="text-sm text-gray-500 mb-1">
            {mode=="percent-of"?`${v1}% of ${v2}`:mode=="what-percent"?`${v1} is ${res.toFixed(2)}% of ${v2}`:`Change: ${res>=0?"Increase":"Decrease"} ${Math.abs(res).toFixed(2)}%`}
          </p>
          <p className="text-3xl font-bold text-blue-700">{res.toFixed(2)}%</p>
        </div>}
      </div>
    </div>
    <SEOContent content={seo} lang="id"/>
    <FAQSection faqs={faqs} lang="id"/>
    <RelatedTools tools={relatedTools} lang="id"/>
    <ShareButtons lang="id"/>
  </div>);
}
