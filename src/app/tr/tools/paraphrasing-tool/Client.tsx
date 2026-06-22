"use client";import { useState } from "react";
import StructuredData,{toolSchema,faqSchema,breadcrumbSchema, speakableSchema,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";import RelatedTools from "../../../components/RelatedTools";import SEOContent from "../../../components/SEOContent";
const faqs=[
{question:"Metin Yeniden Yazma Nedir?",answer:"Metni orijinal anlamını koruyarak farklı bir tarzda yeniden yazma işlemidir. Doğrudan alıntıya alternatif olup intihalden kaçınmaya ve içeriği kendi sesinizle sunmaya yardımcı olur."},
{question:"Anlamı değiştirir mi?",answer:"Hayır. Araç, cümleleri yeniden yapılandırırken ve alternatif kelimeler kullanırken orijinal anlamı korur. Amaç dilsel yenilemedir, anlam değişikliği değildir."},
{question:"Metin yeniden yazma ile çeviri arasındaki fark nedir?",answer:"Metin yeniden yazma, aynı metni aynı dilde yeni bir tarzda yeniden yazar. Çeviri ise metni bir dilden başka bir dile dönüştürür. Bu araç çeviri değil, metin yeniden yazma konusunda uzmanlaşmıştır."},
{question:"SEO için faydalı mı?",answer:"Evet. Doğru şekilde yeniden yazılmış içerik, arama motorları tarafından orijinal olarak kabul edilir. Yinelenen içerik cezalarından kaçınmaya ve Google sıralamanızı iyileştirmeye yardımcı olur."},
{question:"Hangi metin uzunluğuna izin veriliyor?",answer:"Minimum 20 karakter, maksimum 5000 karakter. En iyi sonuçlar 100-1000 kelime aralığında alınır."},
{question:"Akademik metinleri yeniden yazabilir mi?",answer:"Evet, akademik ve bilimsel metinler için uygundur. Araç, genel tarzı yeniden yazarken özel terminolojiyi ve hassas kavramları korur."},
{question:"Verilerim güvende mi?",answer:"%100 gizli. Metin yalnızca yeniden yazma için gönderilir ve asla saklanmaz. Hiçbir kayıt tutulmaz."},
{question:"Tamamen ücretsiz mi?",answer:"Evet, %100 ücretsiz. Kayıt yok, sınırlama yok, ücretli plan yok."},
{question:"Kaç versiyon üretir?",answer:"Profesyonelce yeniden yazılmış bir versiyon. Farklı bir versiyon için aynı metin üzerinde aracı tekrar çalıştırın."},
{question:"Kalite nasıl doğrulanır?",answer:"Yeniden yazılmış metni gözden geçirin. Anlamın korunduğundan emin olun. Araç değişiklik sayısını gösterir — anlamı değiştirmeden daha fazla değişiklik = daha iyi yeniden yazma."},
{question:"Arapça ve İngilizceyi destekliyor mu?",answer:"Evet, akıcı bir şekilde. Arapça, İngilizce ve karma dildeki metinleri eşit yeterlilikle işler."},
{question:"En iyi sonuçları nasıl alırım?",answer:"İlk taslak için aracı kullanın, ardından kişisel dokunuşunuzu manuel olarak ekleyin. En iyi sonuç, yapay zeka verimliliği ile insan yaratıcılığını birleştirmekten gelir."},
];
const relatedTools=[
{title:"İntihal Denetleyici",icon:"🚫",href:"/tr/tools/plagiarism-checker"},
{title:"Dilbilgisi Denetleyici",icon:"📝",href:"/tr/tools/grammar-checker"},
{title:"Yapay Zeka İçerik Algılayıcı",icon:"🤖",href:"/tr/tools/ai-content-detector"},
{title:"Kelime Sayacı",icon:"📊",href:"/tr/tools/word-counter"},
{title:"Metin Büyük/Küçük Harf Dönüştürücü",icon:"🔤",href:"/tr/tools/text-case"},
{title:"İsim Oluşturucu",icon:"🏷️",href:"/tr/tools/name-generator"},
];
const seoContent=[
"Ücretsiz Metin Yeniden Yazma Aracı — metni anlamını koruyarak yeni bir tarzda yeniden yazın. Metni yapıştırın ve anında alternatif bir versiyon ve istatistikler için yeniden yaz düğmesine tıklayın.",
"İçerik yazarları, blog yazarları, öğrenciler ve pazarlamacılar için idealdir. Orijinal çok versiyonlu içerik üretin. Yinelenen içerikten kaçınarak SEO'yu iyileştirin.",
"Her yeniden yazma işlemi şunları gösterir: orijinal ve yeni kelime sayısı, değişiklik sayısı ve kısa bir açıklama. Sonuç hemen kopyalanıp kullanıma hazırdır.",
"Araç Arapça, İngilizce ve karma dildeki metinleri destekler. Akademik, pazarlama, edebi ve teknik içerikleri yüksek doğrulukla işler.",
"İpucu: İlk taslak için aracı kullanın, ardından kişisel dokunuşunuzu ekleyin. En iyi sonuçlar yapay zeka ile insan yaratıcılığını harmanlamaktan gelir.",
];
export default function Client(){
const[text,setText]=useState("");const[result,setResult]=useState<any>(null);const[loading,setLoading]=useState(false);const[error,setError]=useState("");const[copied,setCopied]=useState(false);
const paraphrase=async()=>{if(text.trim().length<20){setError("Lütfen en az 20 karakter girin");return;}setError("");setLoading(true);setResult(null);try{const res=await fetch("/api/paraphrasing-tool",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:text.trim(),lang:"tr"})});if(!res.ok)throw new Error((await res.json()).error||"Yeniden yazma başarısız oldu");setResult(await res.json());}catch(e:any){setError(e.message||"Hata.");}finally{setLoading(false);}};
const copyResult=()=>{if(result?.paraphrasedText){navigator.clipboard.writeText(result.paraphrasedText);setCopied(true);setTimeout(()=>setCopied(false),2000);}};
return(<div className="max-w-[760px] mx-auto">
{/* GEO: HowTo — adim adim kullanim */}
      <StructuredData data={howToSchema("Bu araci nasil kullanirim", "Tarayicinizda calisan ucretsiz arac. Kayit gerektirmez.", [{name:"Araci acin",text:"Adwatak sitesinde bu arac sayfasina gidin"},{name:"Verilerinizi girin",text:"Gerekli alanlari doldurun"},{name:"Sonuc alin",text:"Hesapla veya olustur butonuna tiklayin"},{name:"Kullanin veya paylasin",text:"Sonucu kopyalayin, indirin veya paylasin"}],"bir dakikadan az","tr")} />
      {/* GEO: Speakable — AI/ses motorlari */}
{/* GEO: HowTo — adim adim kullanim */}
      <StructuredData data={howToSchema("Bu araci nasil kullanirim", "Tarayicinizda calisan ucretsiz arac. Kayit gerektirmez.", [{name:"Araci acin",text:"Adwatak sitesinde bu arac sayfasina gidin"},{name:"Verilerinizi girin",text:"Gerekli alanlari doldurun"},{name:"Sonuc alin",text:"Hesapla veya olustur butonuna tiklayin"},{name:"Kullanin veya paylasin",text:"Sonucu kopyalayin, indirin veya paylasin"}],"bir dakikadan az","tr")} />
      {/* GEO: Speakable — AI/ses motorlari */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />
<Breadcrumb lang="tr" category="Metin Araçları" categorySlug="text" toolName="Metin Yeniden Yazma Aracı"/>
<div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
<h1 className="text-2xl font-extrabold mb-1">✏️ Metin Yeniden Yazma Aracı</h1><p className="text-sm text-gray-500 mb-6">Metni orijinal anlamını koruyarak yeni bir tarzda yeniden yazın</p>
<textarea value={text} onChange={(e)=>setText(e.target.value)} className="w-full h-[180px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y" placeholder="Yeniden yazılacak metni yapıştırın..." />
<button onClick={paraphrase} disabled={loading} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-all">{loading?"Yeniden yazılıyor...":"✏️ Yeniden Yaz"}</button>
{error&&<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}
{result&&(<><div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl"><div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-green-800">Yeniden Yazılmış Metin</h3><button onClick={copyResult} className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg transition-all">{copied?"✅ Kopyalandı!":"📋 Kopyala"}</button></div><p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{result.paraphrasedText}</p></div>
<div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3"><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">Orijinal Kelime Sayısı</p><p className="text-2xl font-extrabold text-gray-700">{result.originalWordCount??"—"}</p></div><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">Yeni Kelime Sayısı</p><p className="text-2xl font-extrabold text-blue-600">{result.newWordCount??"—"}</p></div><div className="p-4 bg-white rounded-xl border border-gray-200 text-center"><p className="text-xs text-gray-500">Değişiklikler</p><p className="text-2xl font-extrabold text-green-600">{result.changes??"—"}</p></div></div>
<p className="mt-4 text-sm text-gray-700 leading-relaxed">{result.explanation}</p></>)}</div>
<SEOContent content={seoContent} lang="tr"/><FAQSection faqs={faqs} lang="tr"/><RelatedTools tools={relatedTools} lang="tr"/><ShareButtons lang="tr"/></div>);}