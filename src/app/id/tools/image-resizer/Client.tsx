"use client";import { useState, useRef } from "react";
import StructuredData,{toolSchema,faqSchema,breadcrumbSchema, speakableSchema,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";import RelatedTools from "../../../components/RelatedTools";import SEOContent from "../../../components/SEOContent";
const faqs = [
{question:"Apa itu Pengubah Ukuran Gambar?",answer:"Alat gratis untuk mengubah dimensi gambar (lebar & tinggi). Mendukung JPG, PNG, WebP, GIF. Semuanya terjadi di browser Anda — tidak ada unggahan ke server mana pun."},
{question:"Apakah saya perlu mengunggah ke server Anda?",answer:"Tidak! Semuanya berjalan secara lokal menggunakan HTML Canvas. Gambar Anda tidak pernah meninggalkan perangkat Anda. Privasi lengkap."},
{question:"Format apa yang didukung?",answer:"JPG, PNG, WebP, GIF, BMP. Unduh sebagai JPG, PNG, atau WebP."},
{question:"Apakah kualitasnya tetap terjaga?",answer:"Sebagian besar. Pengubahan ukuran menggunakan algoritma Canvas canggih. Mengecilkan ukuran menjaga kualitas dengan baik. Memperbesar mungkin mengurangi kejelasan karena piksel diinterpolasi."},
{question:"Apa itu rasio aspek?",answer:"Hubungan proporsional antara lebar dan tinggi. Aktifkan 'Pertahankan rasio aspek' untuk mencegah distorsi gambar saat mengubah satu dimensi."},
{question:"Apakah ini sepenuhnya gratis?",answer:"Ya, 100% gratis. Tanpa pendaftaran, tanpa batasan, tanpa tanda air."},
{question:"Ukuran gambar maksimum?",answer:"Hingga 20 megapiksel. Gambar yang lebih besar dapat memperlambat browser."},
{question:"Apakah ini berfungsi di ponsel?",answer:"Ya, sepenuhnya responsif dan berfungsi di semua perangkat."},
{question:"Bagaimana cara menggunakannya?",answer:"Unggah gambar, atur lebar/tinggi baru, alihkan kunci rasio aspek, dan klik ubah ukuran. Pratinjau dan unduh hasilnya."},
{question:"Bisakah saya memperbesar gambar?",answer:"Ya, tetapi memperbesar dapat mengurangi kualitas karena alat ini menginterpolasi piksel daripada menambahkan detail nyata."},
{question:"Apa perbedaan antara mengubah ukuran dan mengompres?",answer:"Mengubah ukuran mengubah dimensi. Mengompres mengurangi ukuran file sambil mempertahankan dimensi. Gunakan keduanya untuk hasil terbaik."},
{question:"Format apa yang terbaik untuk web?",answer:"WebP: 25-35% lebih kecil dari JPG dengan kualitas yang sama. Semua browser modern mendukungnya. JPG didukung secara universal."},
];
const relatedTools=[
{title:"Kompresor Gambar",icon:"📦",href:"/id/tools/image-compressor"},
{title:"Pengunduh Thumbnail YouTube",icon:"▶️",href:"/id/tools/youtube-thumbnail-downloader"},
{title:"Gambar ke PDF",icon:"📄",href:"/id/tools/image-to-pdf"},
{title:"Pembuat QR",icon:"🔳",href:"/id/tools/qr-generator"},
{title:"Konverter Warna",icon:"🎨",href:"/id/tools/color-converter"},
];
const seoContent=[
"Free Image Resizer — change image dimensions online. Upload, set dimensions, and download. Everything in your browser — no server upload. Supports JPG, PNG, WebP.",
"Ideal for designers, website owners, and marketers. Standardize image dimensions and improve site loading speed. Properly sized images enhance UX and SEO.",
"Keep aspect ratio option prevents distortion. Canvas-powered processing ensures quality. Preview before downloading.",
"All processing is local in your browser using HTML Canvas. Your data never leaves your device. Complete privacy and security.",
"Tip: Keep a backup of the original. Use WebP for web for the best quality-to-size ratio.",
];
export default function Client(){
const[image,setImage]=useState<{url:string;file:File;width:number;height:number}|null>(null);
const[w,setW]=useState(0);const[h,setH]=useState(0);const[keepRatio,setKeepRatio]=useState(true);const[resultUrl,setResultUrl]=useState<string|null>(null);const[format,setFormat]=useState("png");const canvasRef=useRef<HTMLCanvasElement>(null);
const handleImage=(e:React.ChangeEvent<HTMLInputElement>)=>{const file=e.target.files?.[0];if(!file)return;const img=new Image();img.onload=()=>{setImage({url:URL.createObjectURL(file),file,width:img.width,height:img.height});setW(img.width);setH(img.height);setResultUrl(null);};img.src=URL.createObjectURL(file);};
const resize=()=>{if(!image)return;const img=new Image();img.onload=()=>{const canvas=canvasRef.current!;canvas.width=w;canvas.height=h;const ctx=canvas.getContext("2d")!;ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high";ctx.drawImage(img,0,0,w,h);setResultUrl(canvas.toDataURL(`image/${format==="jpg"?"jpeg":format}`));};img.src=image.url;};
const onW=(v:number)=>{setW(v);if(keepRatio&&image)setH(Math.round(v*(image.height/image.width)));};
const onH=(v:number)=>{setH(v);if(keepRatio&&image)setW(Math.round(v*(image.width/image.height)));};
return(<div className="max-w-[760px] mx-auto">
{/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("Cara menggunakan alat ini", "Free online tool. Works directly in your browser. No registration required.", [{name:"Buka alat",text:"Arahkan ke halaman alat ini di Adawatak"},{name:"Masukkan data Anda",text:"Isi kolom yang diperlukan"},{name:"Dapatkan hasil",text:"Klik tombol hitung atau hasilkan"},{name:"Gunakan atau bagikan",text:"Salin, unduh, atau bagikan hasilnya"}],"kurang dari satu menit","id")} />
      {/* GEO: Speakable — AI/voice engines */}
{/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("How to use this tool", "Free online tool. Works directly in your browser. No registration required.", [{name:"Buka alat",text:"Arahkan ke halaman alat ini di Adawatak"},{name:"Masukkan data Anda",text:"Isi kolom yang diperlukan"},{name:"Dapatkan hasil",text:"Klik tombol hitung atau hasilkan"},{name:"Gunakan atau bagikan",text:"Salin, unduh, atau bagikan hasilnya"}],"less than a minute","id")} />
      {/* GEO: Speakable — AI/voice engines */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />
<Breadcrumb lang="id" category="Alat Lainnya" categorySlug="image" toolName="Pengubah Ukuran Gambar"/>
<div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
<h1 className="text-2xl font-extrabold mb-1">🖼️ Pengubah Ukuran Gambar</h1><p className="text-sm text-gray-500 mb-6">Ubah dimensi gambar — di browser Anda, tanpa unggahan server</p>
<input type="file" accept="image/*" onChange={handleImage} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4" />
{image&&(<><div className="flex gap-4 mb-4"><div className="flex-1"><label className="text-xs text-gray-500 block mb-1">Lebar (px)</label><input type="number" value={w} onChange={(e)=>onW(Number(e.target.value))} className="w-full p-2 border-2 border-gray-200 rounded-xl text-sm outline-none" min={1}/></div><div className="flex-1"><label className="text-xs text-gray-500 block mb-1">Tinggi (px)</label><input type="number" value={h} onChange={(e)=>onH(Number(e.target.value))} className="w-full p-2 border-2 border-gray-200 rounded-xl text-sm outline-none" min={1}/></div></div>
<label className="flex items-center gap-2 text-sm text-gray-600 mb-4"><input type="checkbox" checked={keepRatio} onChange={(e)=>setKeepRatio(e.target.checked)}/>Pertahankan rasio aspek</label>
<div className="flex gap-3 mb-4"><select value={format} onChange={(e)=>setFormat(e.target.value)} className="p-2 border-2 border-gray-200 rounded-xl text-sm outline-none"><option value="png">PNG</option><option value="jpg">JPG</option><option value="webp">WebP</option></select><button onClick={resize} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition-all">Ubah Ukuran</button></div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><p className="text-xs text-gray-500 mb-2">Original: {image.width}×{image.height}</p><img src={image.url} alt="Asli" className="w-full rounded-xl border border-gray-200"/></div>
{resultUrl&&(<div><p className="text-xs text-gray-500 mb-2">Result: {w}×{h}</p><img src={resultUrl} alt="Resized" className="w-full rounded-xl border border-green-200"/><a href={resultUrl} download={`resized.${format}`} className="mt-2 inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl text-sm transition-all">📥 Download</a></div>)}</div></>)}
<canvas ref={canvasRef} className="hidden"/></div>
<SEOContent content={seoContent} lang="id"/><FAQSection faqs={faqs} lang="id"/><RelatedTools tools={relatedTools} lang="id"/><ShareButtons lang="id"/></div>);}
