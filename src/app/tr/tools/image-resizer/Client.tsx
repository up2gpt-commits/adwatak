"use client";import { useState, useRef } from "react";
import StructuredData,{toolSchema,faqSchema,breadcrumbSchema, speakableSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";import RelatedTools from "../../../components/RelatedTools";import SEOContent from "../../../components/SEOContent";
const faqs=[
{question:"What is Image Resizer?",answer:"A free tool to change image dimensions (width & height). Supports JPG, PNG, WebP, GIF. Everything happens in your browser — no upload to any server."},
{question:"Do I need to upload to your server?",answer:"No! Everything runs locally using HTML Canvas. Your image never leaves your device. Complete privacy."},
{question:"What formats are supported?",answer:"JPG, PNG, WebP, GIF, BMP. Download as JPG, PNG, or WebP."},
{question:"Is the quality preserved?",answer:"Mostly. Resizing uses advanced Canvas algorithms. Shrinking preserves quality well. Enlarging may reduce clarity as pixels are interpolated."},
{question:"What is aspect ratio?",answer:"The proportional relationship between width and height. Enable 'Keep aspect ratio' to prevent image distortion when changing one dimension."},
{question:"Is it completely free?",answer:"Yes, 100% free. No registration, no limits, no watermarks."},
{question:"Maximum image size?",answer:"Up to 20 megapixels. Larger images may slow down the browser."},
{question:"Does it work on mobile?",answer:"Yes, fully responsive and works on all devices."},
{question:"How to use it?",answer:"Upload an image, set new width/height, toggle aspect ratio lock, and click resize. Preview and download the result."},
{question:"Can I enlarge images?",answer:"Yes, but enlarging may reduce quality since the tool interpolates pixels rather than adding real detail."},
{question:"What's the difference between resize and compress?",answer:"Resize changes dimensions. Compress reduces file size while keeping dimensions. Use both for best results."},
{question:"What's the best format for web?",answer:"WebP: 25-35% smaller than JPG with same quality. All modern browsers support it. JPG is universally supported."},
];
const relatedTools=[
{title:"Image Compressor",icon:"📦",href:"/en/tools/image-compressor"},
{title:"YouTube Thumbnail Downloader",icon:"▶️",href:"/en/tools/youtube-thumbnail-downloader"},
{title:"Image to PDF",icon:"📄",href:"/en/tools/image-to-pdf"},
{title:"QR Generator",icon:"🔳",href:"/en/tools/qr-generator"},
{title:"Color Converter",icon:"🎨",href:"/en/tools/color-converter"},
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
<StructuredData data={toolSchema("Image Resizer","Change image dimensions online — free, no server upload","https://adwatak.cloud/en/tools/image-resizer","en","Image Tools")}/>
<StructuredData data={faqSchema(faqs)}/>
<StructuredData data={breadcrumbSchema([{name:"Home",url:"https://adwatak.cloud/en"},{name:"Image Tools",url:"https://adwatak.cloud/en/tools/image"},{name:"Image Resizer",url:"https://adwatak.cloud/en/tools/image-resizer"}])}/>
{/* GEO: Speakable — yapay zeka/ses motorları için işaretli içerik */}
<StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      {/* GEO: Speakable — AI engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb lang="en" category="Other Tools" categorySlug="image" toolName="Image Resizer"/>
<div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
<h1 className="text-2xl font-extrabold mb-1">🖼️ Image Resizer</h1><p className="text-sm text-gray-500 mb-6">Change image dimensions — in your browser, no server upload</p>
<input type="file" accept="image/*" onChange={handleImage} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4" />
{image&&(<><div className="flex gap-4 mb-4"><div className="flex-1"><label className="text-xs text-gray-500 block mb-1">Width (px)</label><input type="number" value={w} onChange={(e)=>onW(Number(e.target.value))} className="w-full p-2 border-2 border-gray-200 rounded-xl text-sm outline-none" min={1}/></div><div className="flex-1"><label className="text-xs text-gray-500 block mb-1">Height (px)</label><input type="number" value={h} onChange={(e)=>onH(Number(e.target.value))} className="w-full p-2 border-2 border-gray-200 rounded-xl text-sm outline-none" min={1}/></div></div>
<label className="flex items-center gap-2 text-sm text-gray-600 mb-4"><input type="checkbox" checked={keepRatio} onChange={(e)=>setKeepRatio(e.target.checked)}/>Keep aspect ratio</label>
<div className="flex gap-3 mb-4"><select value={format} onChange={(e)=>setFormat(e.target.value)} className="p-2 border-2 border-gray-200 rounded-xl text-sm outline-none"><option value="png">PNG</option><option value="jpg">JPG</option><option value="webp">WebP</option></select><button onClick={resize} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition-all">Resize</button></div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><p className="text-xs text-gray-500 mb-2">Original: {image.width}×{image.height}</p><img src={image.url} alt="Original" className="w-full rounded-xl border border-gray-200"/></div>
{resultUrl&&(<div><p className="text-xs text-gray-500 mb-2">Result: {w}×{h}</p><img src={resultUrl} alt="Resized" className="w-full rounded-xl border border-green-200"/><a href={resultUrl} download={`resized.${format}`} className="mt-2 inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl text-sm transition-all">📥 Download</a></div>)}</div></>)}
<canvas ref={canvasRef} className="hidden"/></div>
<SEOContent content={seoContent} lang="en"/><FAQSection faqs={faqs} lang="en"/><RelatedTools tools={relatedTools} lang="en"/><ShareButtons lang="en"/></div>);}
