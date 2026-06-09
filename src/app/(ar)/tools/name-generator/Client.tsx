"use client";import { useState } from "react";import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema,howToSchema } from "../../../components/StructuredData";import FAQSection from "../../../components/FAQSection";import RelatedTools from "../../../components/RelatedTools";import SEOContent from "../../../components/SEOContent";import Breadcrumb from "../../../components/Breadcrumb";import ShareButtons from "../../../components/ShareButtons";

type Cat = 'baby' | 'brand' | 'username' | 'business' | 'pet' | 'fantasy' | 'startup';

const categories: { key: Cat; label: string; emoji: string }[] = [
  { key: 'baby', label: 'أسماء أطفال', emoji: '👶' },
  { key: 'brand', label: 'أسماء تجارية', emoji: '🏷️' },
  { key: 'username', label: 'أسماء مستخدمين', emoji: '👤' },
  { key: 'business', label: 'أسماء شركات', emoji: '🏢' },
  { key: 'pet', label: 'حيوانات أليفة', emoji: '🐾' },
  { key: 'fantasy', label: 'أسماء فانتازي', emoji: '🧙' },
  { key: 'startup', label: 'أسماء ستارت أب', emoji: '🚀' },
];

const babyNames = ["محمد","أحمد","يوسف","عمر","خالد","سعيد","إبراهيم","عبدالله","فهد","سلطان","ناصر","بندر","تركي","سعود","ماجد","وليد","طارق","رائد","بدر","فيصل","عبدالرحمن","سلمان","نايف","عبدالعزيز","جاسم","علي","حسن","حسين","عباس","أيمن","فاطمة","مريم","نورة","سلمى","هند","سارة","ريم","لينا","دانة","لمى","وجدان","أمل","منال","ليلى","عهد","نوف","شيماء","أروى","خديجة","عائشة","زينب","حفصة","صفية","هاجر","جويرية","سكينة","نفيسة","هند","آمنة","جميلة","زهرة","سعاد","كريمة","هاجر"];
const brandNames = ["نوفاك","أبكس","زن","فايب","فلكس","أورا","إيكو","لكس","بيور","سويفت","غلوز","بيك","إيدج","نيست","أتوم","نيو","ماكس","ألترا","ألفا","بيتا","سيجما","أوميغا","دلتا","زينث","بولس","نوفا"];
const usernames = ["ذئب_بارد","نسر_مظلم","ثعلب_مشرق","صقر_نيون","نمر_سايبر","ساحر_بكسل","شاهين_ظل","أفعى_قرمزية","عنقاء_زرقاء","غراب_ذري","قرش_كموم","فهيد_غامض","ذئب_سحري","نسر_ذهبي","صقر_فضي","وشق_كوني","ثعلب_نجمي"];
const businessNames = ["حلول عالمية","أفق جديد","خدمات نخبة","شركاء استراتيجيون","ابتكار ديناميكي","حدود رقمية","أنظمة ذكية","لوجستيك سريع","حلول أساسية","استشارات قمة","مؤسسات التاج","جودة فائقة"];
const petNames = ["لولو","ميشو","بوبو","توتو","شوشو","بسبوس","قطقوط","زغلول","بندق","عسل","سكر","مشمش","تمر","زيتون","فستق","لوز","جوز","موكا","لاتيه","كابتشينو","قرفة","زنجبيل","هيل","فانيليا"];
const fantasyNames = ["أريون","بالور","دراكون","إلدريك","فايلين","جالادريل","هيليوس","جورلان","كالادين","لورين","مالاكاي","ناروث","أورلين","بيراليس","رافاث","ثراندويل","زاندور","يلارا","زاراثوس","دسكوود","إمبرلين","نايتشيد","لوناريا","مستسونغ","بيسسونغ","زيليين"];
const startupNames = ["يونايت","أومنلي","هايبريو","ميتايكس","نيوإكس","بروهب","ماكسبوكس","ألتراسوفت","سوبركلود","ميجافلو","نانوبايت","بولي مايند","بي كور","تري لوجيك","كفاد فنتشرز","ألفا مايند","بيتا ووركس","دلتا ويف"];

const faqs = [
  { question: "ما هو مولد الأسماء؟", answer: "أداة مجانية تولّد أسماء لـ 7 فئات: أطفال، تجارية، مستخدمين، شركات، حيوانات أليفة، فانتازي، وستارت أب. مثالية للكتّاب، المصممين، وأصحاب المشاريع." },
  { question: "هل مولد الأسماء مجاني؟", answer: "نعم، مجاني تماماً! بدون تسجيل أو حدود. يعمل بالكامل في المتصفح." },
  { question: "كم عدد الفئات؟", answer: "7 فئات: أسماء أطفال (60+ اسم عربي أصيل)، أسماء تجارية (للعلامات التجارية)، أسماء مستخدمين (للسوشيال ميديا والألعاب)، أسماء شركات، أسماء حيوانات أليفة، أسماء فانتازي، وأسماء ستارت أب." },
  { question: "هل الأسماء حقيقية؟", answer: "أسماء الأطفال حقيقية ومستخدمة في العالم العربي. الأسماء التجارية والفانتازي مبتكرة ومولّدة للإلهام." },
  { question: "هل يمكن استخدامها تجارياً؟", answer: "نعم، كل الأسماء مجانية. ننصح بالتحقق من العلامات التجارية المسجلة قبل الاستخدام التجاري." },
  { question: "هل يعمل بدون إنترنت؟", answer: "نعم، الأداة تعمل بالكامل في المتصفح (Client-side). بمجرد تحميل الصفحة يمكنك استخدامها بدون إنترنت." },
  { question: "هل يمكن للكّتاب استخدامه؟", answer: "بالتأكيد! أسماء الفانتازي مصممة لشخصيات الروايات وألعاب الفيديو. أسماء المستخدمين تناسب الشخصيات الرقمية." },
];

const relatedTools = [
  { title: "مولد أرقام عشوائية", icon: "🎲", href: "/tools/random-number" },
  { title: "مولد كلمات السر", icon: "🔐", href: "/tools/password-generator" },
  { title: "مولد QR Code", icon: "🔳", href: "/tools/qr-generator" },
  { title: "مولد الفواتير", icon: "🧾", href: "/tools/invoice-generator" },
  { title: "رابط واتساب", icon: "💬", href: "/tools/whatsapp-link" },
];

const seoContent = [
  "مولد الأسماء المجاني — يولّد أسماء إبداعية لـ 7 فئات: أطفال (بنين وبنات)، تجارية، مستخدمين، شركات، حيوانات أليفة، فانتازي، وستارت أب. كلها مجانية وفورية.",
  "أسماء الأطفال تضم 60+ اسم عربي أصيل: محمد، أحمد، عمر، فاطمة، مريم، سارة. الأسماء التجارية: نوفاك، أبكس، زن. أسماء المستخدمين للإلهام.",
  "أسماء الفانتازي: أريون، دراكون، جالادريل — لشخصيات الألعاب والروايات. أسماء الستارت أب حديثة ومبتكرة للمشاريع الناشئة.",
  "استخدم مع: مولد QR Code للباركود، مولد الفواتير للفواتير، مولد كلمات السر لتأمين الحسابات.",
];

const pools: Record<Cat, string[]> = { baby: babyNames, brand: brandNames, username: usernames, business: businessNames, pet: petNames, fantasy: fantasyNames, startup: startupNames };

export default function Client() {
  const [cat, setCat] = useState<Cat>('baby');
  const [count, setCount] = useState("5");
  const [names, setNames] = useState<string[]>([]);

  const generate = () => {
    const pool = pools[cat];
    const result: string[] = [];
    const ct = Math.min(Math.max(parseInt(count) || 5, 1), 20);
    for (let i = 0; i < ct; i++) result.push(pool[Math.floor(Math.random() * pool.length)]);
    setNames(result);
  };

  const schemaName = "مولد أسماء";const schemaDesc = "مولد أسماء عربية وإنجليزية - أداة مجانية";const schemaCategory = "Utility";const schemaUrl = "https://adwatak.cloud/tools/name-generator";const breadcrumbItems = [{name:"الرئيسية",url:"https://adwatak.cloud"},{name:"مولدات",url:"https://adwatak.cloud/category/generators"},{name:"مولد أسماء",url:"https://adwatak.cloud/tools/name-generator"}];
  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={howToSchema("كيفية استخدام مولد الأسماء","توليد أسماء إبداعية فورية. بدون تسجيل.",[{name:"اختر الفئة",text:"اختر من 7 فئات: أطفال، تجارية، مستخدمين، شركات، حيوانات، فانتازي، ستارت أب"},{name:"حدد العدد",text:"اختر عدد الأسماء (1-20)"},{name:"ولّد الأسماء",text:"اضغط زر التوليد"},{name:"انسخ واستخدم",text:"انسخ الأسماء واستخدمها في مشروعك"}],"أقل من دقيقة","ar")} />
      <StructuredData data={speakableSchema(["h1","h2","main"])} />
      <Breadcrumb lang="ar" category="مولدات" categorySlug="generators" toolName="مولد أسماء" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">👤 مولد أسماء</h1>
        <p className="text-sm text-gray-500 mb-6">توليد أسماء إبداعية — أطفال، تجارية، مستخدمين، شركات والمزيد</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((c) => (
            <button key={c.key} onClick={() => setCat(c.key)}
              className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-all ${cat === c.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'}`}
            >{c.emoji}{c.label}</button>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">العدد</label>
          <input type="number" value={count} onChange={(e) => setCount(e.target.value)} min="1" max="20" className="max-w-[100px] p-3 border-2 border-gray-200 rounded-xl text-base outline-none" />
        </div>
        <button onClick={generate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer hover:bg-blue-700 transition-colors">{categories.find(c=>c.key===cat)?.emoji} ولّد</button>
      </div>
      {names.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {names.map((n,i) => <div key={i} className="bg-gray-50 rounded-xl p-3 px-5 border border-gray-200 font-semibold text-gray-700">{n}</div>)}
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}