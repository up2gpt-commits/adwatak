"use client";import { useState, useRef } from "react";
import StructuredData,{toolSchema,faqSchema,breadcrumbSchema, speakableSchema,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";import RelatedTools from "../../../components/RelatedTools";import SEOContent from "../../../components/SEOContent";
const faqs=[
{question:"Görüntü Boyutlandırıcı nedir?",answer:"Görüntü boyutlarını (genişlik ve yükseklik) değiştirmek için ücretsiz bir araç. JPG, PNG, WebP, GIF destekler. Her şey tarayıcınızda gerçekleşir — hiçbir sunucuya yükleme yapılmaz."},
{question:"Sunucunuza yükleme yapmam gerekiyor mu?",answer:"Hayır! Her şey HTML Canvas kullanarak yerel olarak çalışır. Görüntünüz cihazınızdan asla ayrılmaz. Tam gizlilik."},
{question:"Hangi formatlar destekleniyor?",answer:"JPG, PNG, WebP, GIF, BMP. JPG, PNG veya WebP olarak indirin."},
{question:"Kalite korunuyor mu?",answer:"Çoğunlukla. Boyutlandırma gelişmiş Canvas algoritmaları kullanır. Küçültme kaliteyi iyi korur. Büyütme, pikseller enterpolasyon yapıldığı için netliği azaltabilir."},
{question:"En boy oranı nedir?",answer:"Genişlik ve yükseklik arasındaki orantılı ilişki. Bir boyutu değiştirirken görüntü bozulmasını önlemek için 'En boy oranını koru' seçeneğini etkinleştirin."},
{question:"Tamamen ücretsiz mi?",answer:"Evet, %100 ücretsiz. Kayıt yok, sınır yok, filigran yok."},
{question:"Maksimum görüntü boyutu?",answer:"20 megapiksele kadar. Daha büyük görüntüler tarayıcıyı yavaşlatabilir."},
{question:"Mobilde çalışıyor mu?",answer:"Evet, tamamen duyarlı ve tüm cihazlarda çalışır."},
{question:"Nasıl kullanılır?",answer:"Bir görüntü yükleyin, yeni genişlik/yükseklik ayarlayın, en boy oranı kilidini açıp kapatın ve boyutlandır'a tıklayın. Sonucu önizleyin ve indirin."},
{question:"Görüntüleri büyütebilir miyim?",answer:"Evet, ancak büyütme, araç gerçek ayrıntı eklemek yerine pikselleri enterpolasyon yaptığı için kaliteyi düşürebilir."},
{question:"Boyutlandırma ve sıkıştırma arasındaki fark nedir?",answer:"Boyutlandırma boyutları değiştirir. Sıkıştırma, boyutları korurken dosya boyutunu azaltır. En iyi sonuçlar için her ikisini de kullanın."},
{question:"Web için en iyi format hangisidir?",answer:"WebP: Aynı kalitede JPG'den %25-35 daha küçük. Tüm modern tarayıcılar destekler. JPG evrensel olarak desteklenir."},
];
const relatedTools=[
{title:"Görüntü Sıkıştırıcı",icon:"📦",href:"/en/tools/image-compressor"},
{title:"YouTube Küçük Resim İndirici",icon:"▶️",href:"/en/tools/youtube-thumbnail-downloader"},
{title:"Görüntüden PDF'e",icon:"📄",href:"/en/tools/image-to-pdf"},
{title:"QR Oluşturucu",icon:"🔳",href:"/en/tools/qr-generator"},
{title:"Renk Dönüştürücü",icon:"🎨",href:"/en/tools/color-converter"},
];
const seoContent=[
"Ücretsiz Görüntü Boyutlandırıcı — görüntü boyutlarını çevrimiçi değiştirin. Yükleyin, boyutları ayarlayın ve indirin. Her şey tarayıcınızda — sunucuya yükleme yok. JPG, PNG, WebP destekler.",
"Tasarımcılar, web sitesi sahipleri ve pazarlamacılar için idealdir. Görüntü boyutlarını standartlaştırın ve site yükleme hızını artırın. Uygun boyutlandırılmış görüntüler UX ve SEO'yu geliştirir.",
"En boy oranını koru seçeneği bozulmayı önler. Canvas destekli işleme kaliteyi sağlar. İndirmeden önce önizleyin.",
"Tüm işlemler HTML Canvas kullanarak tarayıcınızda yerel olarak yapılır. Verileriniz cihazınızdan asla ayrılmaz. Tam gizlilik ve güvenlik.",
"İpucu: Orijinalin yedeğini saklayın. En iyi kalite-boyut oranı için web için WebP kullanın.",
];
export default function Client(){
const[image,setImage]=useState<{url:string;file:File;width:number;height:number}|null>(null);
const[w,setW]=useState(0);const[h,setH]=useState(0);const[keepRatio,setKeepRatio]=useState(true);const[resultUrl,setResultUrl]=useState<string|null>(null);const[format,setFormat]=useState("png");const canvasRef=useRef<HTMLCanvasElement>(null);
const handleImage=(e:React.ChangeEvent<HTMLInputElement>)=>{const file=e.target.files?.[0];if(!file)return;const img=new Image();img.onload=()=>{setImage({url:URL.createObjectURL(file),file,width:img.width,height:img.height});setW(img.width);setH(img.height);setResultUrl(null);};img.src=URL.createObjectURL(file);};
const resize=()=>{if(!image)return;const img=new Image();img.onload=()=>{const canvas=canvasRef.current!;canvas.width=w;canvas.height=h;const ctx=canvas.getContext("2d")!;ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high";ctx.drawImage(img,0,0,w,h);setResultUrl(canvas.toDataURL(`image/${format==="jpg"?"jpeg":format}`));};img.src=image.url;};
const onW=(v:number)=>{setW(v);if(keepRatio&&image)setH(Math.round(v*(image.height/image.width)));};
const onH=(v:number)=>{setH(v);if(keepRatio&&image)setW(Math.round(v*(image.width/image.height)));};
return(<div className="max-w-[760px] mx-auto">
{/* GEO: HowTo — adim adim kullanim */}
      <StructuredData data={howToSchema("Bu araci nasil kullanirim", "Tarayicinizda calisan ucretsiz arac. Kayit gerektirmez.", [{name:"Araci acin",text:"Adwatak sitesinde bu arac sayfasina gidin"},{name:"Verilerinizi girin",text:"Gerekli alanlari doldurun"},{name:"Sonuc alin",text:"Hesapla veya olustur butonuna tiklayin"},{name:"Kullanin veya paylasin",text:"Sonucu kopyalayin, indirin veya paylasin"}],"bir dakikadan az","tr")} />
      {/* GEO: Speakable — AI/ses motorlari */}
{/* GEO: HowTo — adim adim kullanim */}
      <StructuredData data={howToSchema("Bu araci nasil kullanirim", "Tarayicinizda calisan ucretsiz arac. Kayit gerektirmez.", [{name:"Araci acin",text:"Adwatak sitesinde bu arac sayfasina gidin"},{name:"Verilerinizi girin",text:"Gerekli alanlari doldurun"},{name:"Sonuc alin",text:"Hesapla veya olustur butonuna tiklayin"},{name:"Kullanin veya paylasin",text:"Sonucu kopyalayin, indirin veya paylasin"}],"bir dakikadan az","tr")} />
      {/* GEO: Speakable — AI/ses motorlari */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />
<Breadcrumb lang="tr" category="Diğer Araçlar" categorySlug="image" toolName="Görüntü Boyutlandırıcı"/>
<div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
<h1 className="text-2xl font-extrabold mb-1">🖼️ Görüntü Boyutlandırıcı</h1><p className="text-sm text-gray-500 mb-6">Görüntü boyutlarını değiştirin — tarayıcınızda, sunucuya yükleme yok</p>
<input type="file" accept="image/*" onChange={handleImage} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4" />
{image&&(<><div className="flex gap-4 mb-4"><div className="flex-1"><label className="text-xs text-gray-500 block mb-1">Genişlik (px)</label><input type="number" value={w} onChange={(e)=>onW(Number(e.target.value))} className="w-full p-2 border-2 border-gray-200 rounded-xl text-sm outline-none" min={1}/></div><div className="flex-1"><label className="text-xs text-gray-500 block mb-1">Yükseklik (px)</label><input type="number" value={h} onChange={(e)=>onH(Number(e.target.value))} className="w-full p-2 border-2 border-gray-200 rounded-xl text-sm outline-none" min={1}/></div></div>
<label className="flex items-center gap-2 text-sm text-gray-600 mb-4"><input type="checkbox" checked={keepRatio} onChange={(e)=>setKeepRatio(e.target.checked)}/>En boy oranını koru</label>
<div className="flex gap-3 mb-4"><select value={format} onChange={(e)=>setFormat(e.target.value)} className="p-2 border-2 border-gray-200 rounded-xl text-sm outline-none"><option value="png">PNG</option><option value="jpg">JPG</option><option value="webp">WebP</option></select><button onClick={resize} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition-all">Boyutlandır</button></div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><p className="text-xs text-gray-500 mb-2">Orijinal: {image.width}×{image.height}</p><img src={image.url} alt="Orijinal" className="w-full rounded-xl border border-gray-200"/></div>
{resultUrl&&(<div><p className="text-xs text-gray-500 mb-2">Sonuç: {w}×{h}</p><img src={resultUrl} alt="Boyutlandırılmış" className="w-full rounded-xl border border-green-200"/><a href={resultUrl} download={`resized.${format}`} className="mt-2 inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl text-sm transition-all">📥 İndir</a></div>)}</div></>)}
<canvas ref={canvasRef} className="hidden"/></div>
<SEOContent content={seoContent} lang="tr"/><FAQSection faqs={faqs} lang="tr"/><RelatedTools tools={relatedTools} lang="tr"/><ShareButtons lang="tr"/></div>);}