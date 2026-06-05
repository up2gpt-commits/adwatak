"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  {question:"ما هي كاتب المقالات AI؟",answer:"أداة مجانية لكتابة المقالات المنظمة. اختر الموضوع ونوع المقال والطول، وتولد الأداة مقالاً متكاملاً مع مقدمة وفقرات وخاتمة."},
  {question:"هل الأداة مجانية؟",answer:"نعم 100% مجانية. بدون تسجيل، بدون حدود."},
  {question:"ما أنواع المقالات المتاحة؟",answer:"متوفرة: جدلي، وصفي، سردي، تفسيري، إقناعي. كل نوع له هيكل مختلف."},
  {question:"هل يمكن استخدام المحتوى تجارياً؟",answer:"نعم، النتائج للاستخدام الشخصي والتجاري."},
  {question:"ما طول المقال المتوقع؟",answer:"قصير ~300 كلمة، متوسط ~600 كلمة، طويل ~1000 كلمة."},
  {question:"كيف أبدأ؟",answer:"اكتب الموضوع، اختر النوع والطول، واضغط توليد."},
];
const relatedTools = [
  {title:"إعادة الصياغة",icon:"✏️",href:"/tools/paraphrasing-tool"},
  {title:"المدقق النحوي",icon:"📝",href:"/tools/grammar-checker"},
  {title:"عداد الكلمات",icon:"📊",href:"/tools/word-counter"},
];
const seo = ["أداة كاتب المقالات AI مجانية لكتابة وتوليد المقالات المنظمة بالعربية والإنجليزية.", "مناسبة للطلاب والكتاب."];

const intros: Record<string,((t:string)=>string)[]> = {
  argumentative:[
    (t)=>`يعتبر موضوع "${t}" من أكثر المواضيع إثارة للجدل في الوقت الحالي. حيث تنقسم الآراء بين مؤيد ومعارض. في هذا المقال، سنستعرض الجوانب المختلفة لهذا الموضوع بهدف الوصول إلى رؤية متوازنة.`,
    (t)=>`في السنوات الأخيرة، أصبح الحديث عن "${t}" يأخذ حيزاً كبيراً من النقاشات العامة. دعونا نستكشف الأبعاد المختلفة لهذه القضية.`,
  ],
  descriptive:[
    (t)=>`عند الحديث عن "${t}"، نجد أنفسنا أمام عالم مليء بالتفاصيل والمشاهد التي تستحق التأمل. إنه موضوع غني بالعناصر.`,
    (t)=>`"${t}" هو أكثر من مجرد مصطلح، إنه تجربة متكاملة تحمل في طياتها العديد من الجوانب.`,
  ],
  narrative:[
    (t)=>`تبدأ قصة "${t}" منذ زمن بعيد، حيث كانت البدايات متواضعة والطموحات كبيرة. في هذه الرحلة، سنتعرف على المحطات الرئيسية.`,
    (t)=>`كل موضوع له قصة، وقصة "${t}" مليئة بالتحولات والتطورات المثيرة.`,
  ],
  expository:[
    (t)=>`يهدف هذا المقال إلى تقديم شرح شامل وموضوعي حول "${t}". سنستعرض المفاهيم الأساسية والمعلومات المهمة.`,
    (t)=>`لفهم "${t}" بشكل كامل، يجب أن نبدأ من الأساسيات ونتدرج نحو التفاصيل. هذا الدليل الشامل يقدم لك كل ما تحتاج معرفته.`,
  ],
  persuasive:[
    (t)=>`هل فكرت يوماً في أهمية "${t}" وتأثيره على حياتنا؟ في هذا المقال، سنقدم لك الأسباب المقنعة.`,
    (t)=>`إذا كنت لا تزال متردداً بشأن "${t}"، فدعنا نأخذك في رحلة لاكتشاف لماذا يستحق هذا الموضوع اهتمامك.`,
  ],
};

const bodies: Record<string,((t:string)=>string)[]> = {
  argumentative:[
    (t)=>`من ناحية، يرى المؤيدون أن "${t}" يمثل تطوراً إيجابياً لا يمكن تجاهله. فهم يعتقدون أن له فوائد كبيرة تشمل تحسين جودة الحياة وزيادة الكفاءة والإنتاجية. كما تشير التجارب الناجحة إلى صحة وجهة نظرهم.`,
    (t)=>`على الجانب الآخر، يحذر المعارضون من بعض الجوانب السلبية لـ "${t}". يرون أن هناك تحديات كبيرة يجب مواجهتها، وأن التسرع في التطبيق قد يؤدي إلى نتائج عكسية.`,
    (t)=>`بين هذا وذاك، نجد أن هناك مجالاً للتوفيق بين الرأيين. فالحل الأمثل قد يكون في تبني نهج متوازن يأخذ في الاعتبار فوائد "${t}" مع العمل على تقليل المخاطر المحتملة.`,
  ],
  descriptive:[
    (t)=>`أول ما يلفت الانتباه في "${t}" هو التنوع والغنى الذي يتميز به. من العناصر الأساسية نجد أن كل جزء له طابعه الخاص وأهميته المميزة.`,
    (t)=>`بالتعمق أكثر في تفاصيل "${t}"، نكتشف طبقات إضافية من المعاني والدلالات. فكل عنصر يكمل الآخر في لوحة متكاملة.`,
    (t)=>`لا يمكن إغفال الأثر الذي يتركه "${t}" على المتلقي. فالتفاصيل الدقيقة والألوان والمشاعر تخلق تجربة فريدة لا تنسى.`,
  ],
  narrative:[
    (t)=>`في البداية، كان "${t}" مجرد فكرة بسيطة في أذهان القلة. لكن مع مرور الوقت، بدأ الاهتمام يتزايد وتطورت المفاهيم المرتبطة به.`,
    (t)=>`جاءت المرحلة الثانية كمنعطف حاسم في مسار "${t}"، حيث ظهرت التطورات الكبيرة التي غيرت المفاهيم السابقة.`,
    (t)=>`واليوم، نرى "${t}" في صورته الحالية، نتاج سنوات من التطور والعمل المستمر. قصة هذا الموضوع لم تنته بعد.`,
  ],
  expository:[
    (t)=>`لفهم "${t}" بشكل أعمق، يجب أن نبدأ بتعريفه ومكوناته الأساسية. يتكون هذا الموضوع من عدة عناصر مترابطة.`,
    (t)=>`أحد الجوانب المهمة في "${t}" هو كيفية تطبيقه في الواقع العملي. هناك عدة طرق وأساليب يمكن اتباعها.`,
    (t)=>`بالنظر إلى المستقبل، من المتوقع أن يشهد "${t}" مزيداً من التطورات. الدراسات والأبحاث الحالية تبشر بإمكانيات كبيرة.`,
  ],
  persuasive:[
    (t)=>`السبب الأول الذي يجعل "${t}" مهماً هو تأثيره المباشر على حياتنا اليومية. الدراسات تشير إلى أن الاهتمام بهذا الموضوع يحسن جودة الحياة.`,
    (t)=>`علاوة على ذلك، فإن "${t}" يساهم في تحقيق أهداف أكبر على المدى البعيد. الاستثمار في هذا المجال يعود بفوائد جمّة.`,
    (t)=>`وأخيراً، لا يمكن إنكار أن التطورات الحديثة تجعل "${t}" أكثر أهمية من أي وقت مضى. الفرصة متاحة الآن للاستفادة من هذه الإمكانيات.`,
  ],
};

const conclusions = [
  (t:string)=>`في الختام، نستطيع القول إن "${t}" موضوع متعدد الأبعاد يستحق المزيد من الاهتمام والدراسة. التوازن بين الفوائد والتحديات هو المفتاح للاستفادة القصوى منه.`,
  (t:string)=>`خلاصة القول، إن "${t}" يمثل مجالاً خصباً للبحث والنقاش. مع استمرار التطورات، يبقى الأمل معقوداً على أننا سنشهد المزيد من الإنجازات في هذا المجال.`,
];

const titles = [
  (t:string)=>`${t}: رؤية شاملة وتحليل متعمق`,
  (t:string)=>`كل ما تريد معرفته عن ${t}`,
  (t:string)=>`${t}: الأهمية والتحديات والفرص`,
  (t:string)=>`دليلك الشامل لفهم ${t}`,
];

function pick<T>(arr:T[]):T{return arr[Math.floor(Math.random()*arr.length)];}

function generateEssay(topic:string,type:string,length:string){
  const bc=length==="short"?2:length==="medium"?3:5;
  const i=intros[type]??intros.argumentative;
  const b=bodies[type]??bodies.argumentative;
  return{
    title:pick(titles)(topic),
    introduction:pick(i)(topic),
    body:Array.from({length:bc},(_,j)=>b[j%b.length](topic)),
    conclusion:pick(conclusions)(topic),
  };
}

export default function Client(){
  const[topic,setTopic]=useState("");
  const[type,setType]=useState("argumentative");
  const[length,setLength]=useState("medium");
  const[result,setResult]=useState<{title:string;introduction:string;body:string[];conclusion:string}|null>(null);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState("");
  const[copied,setCopied]=useState(false);

  const handle=async()=>{
    if(!topic.trim())return;
    setLoading(true);
    setError("");
    setResult(null);
    setCopied(false);
    try{
      const r=await fetch("/api/ai-essay-writer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({topic:topic.trim(),type,length,lang:"ar"})});
      const data=await r.json();
      if(!r.ok)throw new Error(data.error||"فشل توليد المقال");
      setResult(data);
    }catch(e:any){
      setError(e.message||"حدث خطأ. حاول مرة أخرى.");
    }finally{
      setLoading(false);
    }
  };

  const full=result?`${result.title}\n\n${result.introduction}\n\n${result.body.join("\n\n")}\n\n${result.conclusion}`:"";
  const wc=full?full.split(/\s+/).filter(Boolean).length:0;

  return(<div className="max-w-[760px] mx-auto">
    <StructuredData data={toolSchema("كاتب المقالات AI","كتابة مقالات كاملة بالذكاء الاصطناعي","https://adwatak.cloud/tools/ai-essay-writer","ar","Text Tools")}/>
    <StructuredData data={faqSchema(faqs)}/>
    <Breadcrumb lang="ar" category="أدوات نصية" categorySlug="tools" toolName="كاتب المقالات AI"/>
    <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
      <h1 className="text-2xl font-extrabold mb-1">✍️ كاتب المقالات AI</h1>
      <p className="text-sm text-gray-500 mb-6">كتابة مقالات كاملة منظمة</p>
      <div className="space-y-4 mb-6">
        <input type="text" value={topic} onChange={e=>setTopic(e.target.value)} placeholder="موضوع المقال..." dir="auto"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"/>
        <div className="grid grid-cols-2 gap-4">
          <select value={type} onChange={e=>setType(e.target.value)} className="px-3 py-3 border border-gray-300 rounded-lg text-sm bg-white">
            <option value="argumentative">جدلي</option><option value="descriptive">وصفي</option>
            <option value="narrative">سردي</option><option value="expository">تفسيري</option><option value="persuasive">إقناعي</option>
          </select>
          <select value={length} onChange={e=>setLength(e.target.value)} className="px-3 py-3 border border-gray-300 rounded-lg text-sm bg-white">
            <option value="short">قصير (~300 كلمة)</option><option value="medium">متوسط (~600 كلمة)</option><option value="long">طويل (~1000 كلمة)</option>
          </select>
        </div>
        <button onClick={handle} disabled={!topic.trim()||loading}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 disabled:opacity-40 transition-all shadow-md">
          {loading?"⏳ جاري التوليد...":"✨ توليد المقال"}
        </button>
      </div>
      {error&&<div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-sm text-red-700">⚠️ {error}</div>}
      {result&&<div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium">✓ {wc} كلمة</span>
          <div className="flex gap-2">
            <button onClick={async()=>{await navigator.clipboard.writeText(full);setCopied(true);setTimeout(()=>setCopied(false),2000);}}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">{copied?"✓ تم النسخ":"📋 نسخ"}</button>
            <button onClick={()=>{const b=new Blob([full],{type:"text/plain"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="essay.txt";a.click();}}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm">⬇️ تحميل</button>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 whitespace-pre-wrap text-sm leading-relaxed max-h-[500px] overflow-y-auto" dir="auto">
          <h2 className="text-xl font-bold mb-4">{result.title}</h2>
          <p className="mb-4">{result.introduction}</p>
          {result.body.map((p,i)=><p key={i} className="mb-4">{p}</p>)}
          <p>{result.conclusion}</p>
        </div>
      </div>}
    </div>
    <SEOContent content={seo} lang="ar"/>
    <FAQSection faqs={faqs} lang="ar"/>
    <RelatedTools tools={relatedTools} lang="ar"/>
    <ShareButtons lang="ar"/>
  </div>);
}
