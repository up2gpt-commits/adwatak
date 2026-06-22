"use client";import { useState } from "react";
import StructuredData,{toolSchema,faqSchema,breadcrumbSchema, speakableSchema,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";import RelatedTools from "../../../components/RelatedTools";import SEOContent from "../../../components/SEOContent";
const faqs=[
{question:"Dilbilgisi Denetleyicisi nedir?",answer:"Yapay zeka kullanarak dilbilgisi, yazım ve noktalama hatalarını kontrol eden ücretsiz bir araç. Arapça ve İngilizceyi destekler. Açıklamalarla birlikte ayrıntılı düzeltmeler sunar."},
{question:"Ne kadar doğru?",answer:"%85'i aşan yüksek doğruluk. Yazım, dilbilgisi, noktalama ve stil sorunları dahil 20'den fazla hata türünü tespit eder."},
{question:"Hangi hata türlerini tespit eder?",answer:"Yazım hataları, dilbilgisi hataları (özne-yüklem uyumu, zaman), noktalama sorunları, yaygın kelime karışıklıkları ve okunabilirlik sorunları."},
{question:"Okunabilirlik Puanı nedir?",answer:"Metninizin ne kadar kolay okunduğunu gösteren 0-100 arası bir puan. 80-100: çok okunabilir. 60-79: orta. 60'ın altı: sadeleştirilmesi gerekir."},
{question:"Tamamen ücretsiz mi?",answer:"Evet, %100 ücretsiz. Kayıt yok, sınır yok, ücretli plan yok. Sadece yapıştırın ve kontrol edin."},
{question:"Hangi metin uzunluğu gereklidir?",answer:"Minimum 10 karakter. Daha uzun metinler daha iyi doğruluk sağlar. 100-2000 kelime ile en iyi sonuçlar."},
{question:"Verilerim güvende mi?",answer:"Evet, metin yalnızca analiz için gönderilir ve saklanmaz. Tam gizlilik garantilidir."},
{question:"Arapça dilbilgisini düzeltir mi?",answer:"Evet, araç Arapça konusunda uzmanlaşmıştır: fiil çekimi, dilbilgisi durumları, eril/dişil, çoğul/tekil ve yaygın yazım hataları."},
{question:"Karışık Arapça/İngilizce metni kontrol edebilir mi?",answer:"Evet, karışık dilli metinleri destekler. Her dildeki hataları ayrı ayrı tespit eder."},
{question:"Sonuçlar nasıl kullanılır?",answer:"Her düzeltme önerisini inceleyin. Her biri neden yanlış olduğu ve nasıl düzeltileceği ile ilgili bir açıklama ile gelir. Bağlamınıza uygun olanı uygulayın."},
{question:"Profesyoneller için uygun mu?",answer:"Evet, yazarlar, editörler, gazeteciler ve öğrenciler için idealdir. Yayınlamadan önce metin kalitesini artırmaya yardımcı olur."},
{question:"Sonuçlar nasıl iyileştirilir?",answer:"Açık, iyi biçimlendirilmiş metin kullanın. Çok kısa metinlerden kaçının. Önerileri dikkatlice inceleyin. Düzenleme sürecinizin bir parçası olarak düzenli kullanın."},
];
const relatedTools=[
{title:"Yeniden İfade Etme Aracı",icon:"✏️",href:"/en/tools/paraphrasing-tool"},
{title:"İntihal Denetleyicisi",icon:"🚫",href:"/en/tools/plagiarism-checker"},
{title:"Yapay Zeka İçerik Dedektörü",icon:"🤖",href:"/en/tools/ai-content-detector"},
{title:"Kelime Sayacı",icon:"📊",href:"/en/tools/word-counter"},
{title:"Metin Karşılaştırma",icon:"⚖️",href:"/en/tools/text-compare"},
{title:"Metin Temizleyici",icon:"🧹",href:"/en/tools/text-cleaner"},
];
const seoContent=[
"Ücretsiz Dilbilgisi Denetleyicisi — dilbilgisi, yazım ve noktalama hatalarını kontrol edin. Metni yapıştırın ve hata sayısı, okunabilirlik puanı ve ayrıntılı düzeltmelerle anında analiz için kontrol et düğmesine tıklayın.",
"Yazarlar, öğrenciler, editörler ve pazarlamacılar için idealdir. Yayınlamadan önce metin kalitesini artırın. Profesyonel, hatasız yazı sağlar.",
"20'den fazla hata türünün yapay zeka destekli tespiti. Her düzeltme hatayı, öneriyi ve açıklamayı içerir. Bir kontrol aracı olduğu kadar eğitici bir araçtır.",
"Okunabilirlik Puanı metin netliğini değerlendirmeye yardımcı olur. Net metinler daha iyi okuyucu etkileşimi ve daha yüksek arama motoru sıralamaları sağlar.",
"İpucu: Önemli içerikleri yayınlamadan önce kullanın. Sonuçlar anında gelir. Düzeltmeleri dikkatlice inceleyin — bazıları bağlama bağlıdır.",
];
export default function Client(){
const[text,setText]=useState("");const[result,setResult]=useState<any>(null);const[loading,setLoading]=useState(false);const[error,setError]=useState("");
const check=async()=>{if(text.trim().length<10){setError("Lütfen metin girin");return;}setError("");setLoading(true);setResult(null);try{const res=await fetch("/api/grammar-checker",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:text.trim(),lang:"en"})});if(!res.ok)throw new Error((await res.json()).error||"Kontrol başarısız oldu");setResult(await res.json());}catch(e:any){setError(e.message||"Bir hata oluştu.");}finally{setLoading(false);}};
const gc=(s:number)=>s>=80?"text-green-600":s>=50?"text-yellow-600":"text-red-600";const gb=(s:number)=>s>=80?"bg-green-50 border-green-200":s>=50?"bg-yellow-50 border-yellow-200":"bg-red-50 border-red-200";const ge=(s:number)=>s>=80?"✅":s>=50?"⚠️":"❌";
return(<div className="max-w-[760px] mx-auto">
      <StructuredData data={howToSchema("Bu araci nasil kullanirim", "Tarayicinizda calisan ucretsiz arac. Kayit gerektirmez.", [{name:"Araci acin",text:"Adwatak sitesinde bu arac sayfasina gidin"},{name:"Verilerinizi girin",text:"Gerekli alanlari doldurun"},{name:"Sonuc alin",text:"Hesapla veya olustur butonuna tiklayin"},{name:"Kullanin veya paylasin",text:"Sonucu kopyalayin, indirin veya paylasin"}],"bir dakikadan az","tr")} />
      <StructuredData data={howToSchema("Bu araci nasil kullanirim", "Tarayicinizda calisan ucretsiz arac. Kayit gerektirmez.", [{name:"Araci acin",text:"Adwatak sitesinde bu arac sayfasina gidin"},{name:"Verilerinizi girin",text:"Gerekli alanlari doldurun"},{name:"Sonuc alin",text:"Hesapla veya olustur butonuna tiklayin"},{name:"Kullanin veya paylasin",text:"Sonucu kopyalayin, indirin veya paylasin"}],"bir dakikadan az","tr")} />
      <StructuredData data={speakableSchema(["h1","h2","main"])} />
<Breadcrumb lang="tr" category="Metin Araçları" categorySlug="text" toolName="Dilbilgisi Denetleyicisi"/>
<div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
<h1 className="text-2xl font-extrabold mb-1">📝 Dilbilgisi Denetleyicisi</h1>
<p className="text-sm text-gray-500 mb-6">Dilbilgisi, yazım ve noktalama hatalarını kontrol edin</p>
<textarea value={text} onChange={(e)=>setText(e.target.value)} className="w-full h-[200px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y" placeholder="Metninizi buraya yapıştırın..." />
<button onClick={check} disabled={loading} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all">{loading?"Kontrol ediliyor...":"🔍 Kontrol Et"}</button>
{error&&<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}
{result&&(<>
<div className={`mt-6 p-6 rounded-xl border ${gb(result.score)}`}><div className="text-center mb-4"><span className="text-5xl">{ge(result.score)}</span><p className={`text-5xl font-extrabold mt-2 ${gc(result.score)}`}>{result.score}/100</p></div><div className="w-full bg-gray-200 rounded-full h-3 mt-4"><div className={`h-3 rounded-full transition-all ${result.score>=80?"bg-green-500":result.score>=50?"bg-yellow-500":"bg-red-500"}`} style={{width:`${result.score}%`}}/></div></div>
<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3"><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">Hatalar</p><p className="text-3xl font-extrabold text-red-600">{result.errorCount??"—"}</p></div><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">Okunabilirlik</p><p className={`text-3xl font-extrabold ${gc(result.readabilityScore??0)}`}>{result.readabilityScore??"—"}%</p></div></div>
{result.corrections?.length>0&&(<div className="mt-4 space-y-2"><h3 className="text-sm font-bold text-gray-700">Önerilen Düzeltmeler</h3>{result.corrections.map((c:any,i:number)=>(<div key={i} className="p-3 bg-blue-50 border border-blue-200 rounded-xl"><p className="text-xs"><span className="text-red-600 line-through">{c.original}</span></p><p className="text-xs text-green-700 font-bold">→ {c.suggestion}</p><p className="text-xs text-gray-500 mt-1">{c.reason}</p></div>))}</div>)}
<p className="mt-4 text-sm text-gray-700 leading-relaxed">{result.explanation}</p></>)}
<div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200"><p className="text-xs text-gray-500">💡 <strong>İpucu:</strong> Daha uzun metinler daha iyi sonuç verir. Uygulamadan önce her düzeltmeyi inceleyin.</p></div></div>
<SEOContent content={seoContent} lang="tr"/><FAQSection faqs={faqs} lang="tr"/><RelatedTools tools={relatedTools} lang="tr"/><ShareButtons lang="tr"/></div>);}