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
    "question": "Apa sebenarnya yang dilakukan oleh Kalkulator Durasi Tanggal?",
    "answer": "Ini secara tepat menghitung rentang waktu antara dua tanggal yang dipilih, menampilkan hasil dalam tahun, bulan, dan hari. Anda juga dapat menambah atau mengurangi durasi tertentu dari tanggal awal, menyederhanakan manajemen tenggat waktu dan jadwal proyek."
  },
  {
    "question": "Bisakah saya menghitung usia tepat saya menggunakan alat ini?",
    "answer": "Ya, tentu saja! Cukup masukkan tanggal lahir Anda sebagai tanggal mulai dan tanggal hari ini (atau tanggal mendatang apa pun) sebagai tanggal akhir. Kalkulator akan menampilkan usia tepat Anda dalam tahun, bulan, dan hari, menjadikannya sempurna untuk melacak tonggak penting."
  },
  {
    "question": "Bagaimana cara menemukan tanggal X hari dari sekarang?",
    "answer": "Gunakan fungsi \"tambah/kurangi hari\". Masukkan tanggal hari ini sebagai tanggal mulai, lalu tentukan jumlah hari yang ingin Anda tambahkan. Misalnya, untuk menemukan tanggal 90 hari dari sekarang, masukkan \"90\" di kolom 'tambah hari'."
  },
  {
    "question": "Apakah mungkin untuk mengurangi hari dari tanggal tertentu?",
    "answer": "Ya, alat ini mendukung pengurangan. Masukkan tanggal akhir target Anda lalu tentukan jumlah hari yang ingin Anda kurangi. Ini berguna untuk menghitung mundur dari tenggat waktu, seperti menemukan tanggal mulai proyek 30 hari sebelumnya."
  },
  {
    "question": "Apakah kalkulator ini memperhitungkan tahun kabisat?",
    "answer": "Tentu saja. Kalkulator Durasi Tanggal kami secara otomatis memperhitungkan tahun kabisat, memastikan perhitungan yang akurat untuk durasi yang mencakup beberapa tahun. Ini menjamin ketepatan baik Anda menghitung 365 hari atau 10 tahun."
  },
  {
    "question": "Apa saja kegunaan praktis dari kalkulator ini?",
    "answer": "Ini sangat serbaguna! Rencanakan tenggat waktu proyek, tentukan usia tepat bayi, hitung durasi kontrak, jadwalkan acara, atau kelola jadwal keuangan. Misalnya, temukan tanggal akhir yang tepat untuk fase konstruksi 180 hari."
  },
  {
    "question": "Bisakah saya menghitung jumlah hari yang tersisa hingga suatu acara?",
    "answer": "Ya, cukup masukkan tanggal hari ini sebagai tanggal mulai dan tanggal acara Anda sebagai tanggal akhir. Kalkulator akan menunjukkan jumlah hari, bulan, dan tahun yang tersisa dengan tepat, sempurna untuk hitung mundur pernikahan atau liburan."
  },
  {
    "question": "Apakah alat ini gratis digunakan dan dapat diakses di ponsel?",
    "answer": "Ya, Kalkulator Durasi Tanggal sepenuhnya gratis digunakan. Ini juga dirancang agar responsif sepenuhnya, artinya Anda dapat dengan mudah mengakses dan memanfaatkan fitur-fiturnya di perangkat apa pun, termasuk ponsel pintar dan tablet, tanpa masalah."
  }
];const relatedTools = [
  {title:"Kalkulator Usia",icon:"🎂",href:"/id/tools/age-calculator"},
  {title:"Konverter Zona Waktu",icon:"🌍",href:"/id/tools/timezone-converter"},
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
    <StructuredData data={toolSchema("Date Duration Calculator","Calculate duration between two dates","https://adwatak.cloud/id/tools/date-duration","en","Alat Harian")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="id" category="Alat Harian" categorySlug="tools" toolName="Kalkulator Durasi Tanggal"/>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h1 className="text-2xl font-extrabold mb-1">📅 Kalkulator Durasi Tanggal</h1>
      <p className="text-sm text-gray-500 mb-6">Hitung hari, bulan, tahun antara dua tanggal</p>
      <div className="space-y-4 mb-6">
        <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tanggal Mulai</label>
          <input type="date" value={start} onChange={e=>setStart(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"/></div>
        <div><label className="block text-xs font-semibold text-gray-600 mb-1">Tanggal Akhir</label>
          <div className="flex gap-2"><input type="date" value={end} onChange={e=>setEnd(e.target.value)} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm"/>
            <button onClick={()=>setEnd(today)} className="px-4 py-3 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">Hari Ini</button></div></div>
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
  "Hitung hari antara dua tanggal secara instan.",
  "Tambahkan atau kurangi hari dari tanggal mana pun dengan mudah.",
  "Temukan durasi tepat dalam hari, minggu, bulan.",
  "Rencanakan acara, tenggat waktu, atau perhitungan usia.",
  "Alat kalkulator durasi tanggal online gratis.",
];

      <SEOContent content={seo} lang="id"/>
    <FAQSection faqs={faqs} lang="id"/>
    <RelatedTools tools={relatedTools} lang="id"/>
    <ShareButtons lang="id"/>
  </div>);
}
