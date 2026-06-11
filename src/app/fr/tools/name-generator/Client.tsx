"use client";import { useState } from "react";import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema,howToSchema } from "../../../components/StructuredData";import Breadcrumb from "../../../components/Breadcrumb";import ShareButtons from "../../../components/ShareButtons";import FAQSection from "../../../components/FAQSection";import RelatedTools from "../../../components/RelatedTools";import SEOContent from "../../../components/SEOContent";

type Cat = 'baby' | 'brand' | 'username' | 'business' | 'pet' | 'fantasy' | 'startup';

const categories: { key: Cat; label: string; emoji: string }[] = [
  { key: 'baby', label: 'Baby Names', emoji: '👶' },
  { key: 'brand', label: 'Brand Names', emoji: '🏷️' },
  { key: 'username', label: 'Usernames', emoji: '👤' },
  { key: 'business', label: 'Business Names', emoji: '🏢' },
  { key: 'pet', label: 'Pet Names', emoji: '🐾' },
  { key: 'fantasy', label: 'Fantasy Names', emoji: '🧙' },
  { key: 'startup', label: 'Startup Names', emoji: '🚀' },
];

const babyNames = ["Emma","Liam","Olivia","Noah","Sophia","James","Charlotte","Oliver","Amelia","Lucas","Mia","Henry","Harper","Ethan","Evelyn","Aiden","Lily","Jackson","Ella","Logan","Isabella","Mason","Grace","Eli","Chloe","Carter","Zoey","Luna","Nora","Hannah","Sarah","Fatima","Aisha","Zainab","Mariam","Khadeeja","Hafsa","Aminah","Safiya","Noor","Layla","Amira","Yusuf","Omar","Ali","Hassan","Hussein","Ibrahim","Adam","Musa","Ahmed","Muhammad","Abdullah","Khalid","Saeed","Fahd","Sultan","Majid","Tariq","Bader","Faisal"];
const brandNames = ["NovaTech","ApexGen","ZenFlow","VibeSpark","FluxCore","AuraMind","EchoLab","LuxeWave","PureSync","BoldPath","SwiftHive","GlowBridge","PeakForge","EdgePulse","HiveCraft","AtomHub","IonStudio","NeoPro","MaxSoft","UltraWare","OmniByte","AlphaCloud","BetaFlow","SigmaMind","OmegaSpark","DeltaWave","NovaLogic","ApexForge","ZenSync","VibeCraft"];
const usernames = ["CoolWolf_42","DarkEagle_","BrightFox_","NeonHawk_","CyberTiger_","ShadowFalcon_","CrimsonViper_","AzurePhoenix_","AtomicRaven_","QuantumShark_","MysticPanther_","ArcaneWolf_","GoldenEagle_","SilverHawk_","CosmicLynx_","StellarFox_","NeonPuma_","CyberCoyote_","PixelKnight_","GrimWolf_","NobleTiger_","RoyalHawk_","SavageFalcon_","BlazeDragon_","FrostPhoenix_","StormEagle_","ThunderFox_","ShadowPhoenix_","PhantomWolf_","DigitalHawk_"];
const businessNames = ["Global Solutions","Prime Ventures","Next Horizon","Elite Services","Premier Group","Strategic Partners","Dynamic Innovations","Digital Frontier","Smart Systems","Swift Logistics","Core Solutions","Apex Consulting","Peak Performance","Summit Advisory","Crown Enterprises","Royal Holdings","Grand Alliance","Supreme Quality","Total Solutions","Vanguard Group","Legacy Partners","Heritage Holdings","Noble Ventures","Imperial Group","Sovereign Solutions","United Partners","Allied Services","Master Builders","Pinnacle Group","PrimeSource"];
const petNames = ["Max","Charlie","Cooper","Rocky","Bear","Duke","Tucker","Jack","Leo","Milo","Loki","Simba","Jasper","Bella","Lucy","Daisy","Molly","Sadie","Chloe","Luna","Lola","Nala","Rosie","Zoe","Lily","Pepper","Ginger","Oreo","Mochi","Coco","Honey","Cookie","Maple","Olive","Willow","Ivy","Misty","Sunny","Stormy","Oscar","Buddy","Bailey","Riley","Lucky","Mocha","Latte","Pebbles","Meadow","Rocket","Dash"];
const fantasyNames = ["Aerion","Balor","Celestian","Drakon","Eldric","Faelyn","Galadriel","Helios","Ithildin","Jorlan","Kaladin","Lorien","Malakai","Naroth","Orlinn","Pyralis","Quelior","Ravath","Saraphine","Thranduil","Ulrick","Valerius","Wyrlan","Xandor","Yelara","Zarathos","Ashara","Briallen","Corvina","Duskwood","Emberlyn","Frostbane","Nightshade","Obsidian","Shadowmere","Lunaria","Mistsong","Peacesong","Quillwind","Xyleen","Aeris","Boreas","Caelus","Dorian","Eryndor","Faelivrin","Gwyndolin","Illyria","Kaelthas","Lyra"];
const startupNames = ["Unify","Omnily","Hyperio","Metaix","NeoEx","ProHub","MaxBox","UltraSoft","SuperCloud","MegaFlow","GigaWave","TeraSpark","NanoByte","MicroSync","PolyMind","MultiLab","BiCore","TriLogic","QuadVentures","AlphaMind","BetaWorks","GammaFlow","DeltaWave","SigmaCore","OmegaSync","ZenithSoft","VertexLab","PulseTech","NovaFlow","ApexMind"];

const faqs = [
  { question: "What is a Name Generator?", answer: "A free online tool that generates creative names for various needs: baby names, brand names, usernames, business names, pet names, fantasy characters, and startup ideas. Perfect for writers, gamers, entrepreneurs, and parents." },
  { question: "Is the Name Generator free?", answer: "Yes, completely free! No registration, no limits. Works entirely in your browser." },
  { question: "How many name categories are available?", answer: "7 categories: Baby Names (60+ real names), Brand Names (creative business names), Usernames (gaming/social media), Business Names (professional), Pet Names, Fantasy Names (for RPG/novels), and Startup Names (modern tech names)." },
  { question: "Are the names unique each time?", answer: "Names are randomly selected from large pools of 30-50+ names per category. Repeats are unlikely but possible since independent random picks." },
  { question: "Can I use these for commercial purposes?", answer: "Yes! All names are free to use. However, check for existing trademarks before commercial use." },
  { question: "Does it work without internet?", answer: "The tool runs entirely in your browser (client-side). Once loaded, it works offline." },
  { question: "Can writers use this for characters?", answer: "Absolutely! Fantasy names are designed for RPG characters, novel personas, and game avatars. Usernames work for social media handles and gaming tags." },
  { question: "What name styles are available?", answer: "Baby Names: classic English & Arabic. Brand Names: modern tech-style. Usernames: gaming handles. Business: professional company names. Pet: cute animal names. Fantasy: epic fantasy character names. Startup: short modern tech names." },
];

const relatedTools = [
  { title: "Random Number Generator", icon: "🎲", href: "/fr/tools/random-number" },
  { title: "Password Generator", icon: "🔐", href: "/fr/tools/password-generator" },
  { title: "QR Generator", icon: "📱", href: "/fr/tools/qr-generator" },
  { title: "Invoice Generator", icon: "🧾", href: "/fr/tools/invoice-generator" },
  { title: "WhatsApp Link", icon: "💬", href: "/fr/tools/whatsapp-link" },
  { title: "Bio Generator", icon: "✍️", href: "/fr/tools/bio-generator" },
];

const seoContent = [
  "Our Free Name Generator creates instant names across 7 categories: Baby Names, Brand Names, Usernames, Business Names, Pet Names, Fantasy Names, and Startup Names. Perfect for writers, parents, entrepreneurs, gamers, and pet owners.",
  "Baby Names category features 60+ real names from English and Arabic cultures — Emma, Liam, Muhammad, Fatima, Aisha, and more. Brand Names generates creative business names like NovaTech, ApexGen, and ZenFlow.",
  "Username suggestions like CoolWolf_42, ShadowFalcon_ and CyberTiger_ are perfect for social media, gaming, and online profiles. Fantasy Names like Aerion, Galadriel, and Drakon are ideal for RPG characters and novels.",
  "Startup Names generates modern tech-style names like Unify, Hyperio, and Metaix — catchy, short, and memorable. Business Names like Global Solutions and Prime Ventures are professional and trustworthy.",
  "Related tools: Use with Password Generator for secure credentials, QR Generator for scannable business cards, Invoice Generator for branded invoices, and Bio Generator for professional social media bios.",
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

  const schemaName = "Name Generator";const schemaDesc = "Online Name Generator - free tool";const schemaCategory = "Utility";const schemaUrl = "https://adwatak.cloud/fr/tools/name-generator";const breadcrumbItems = [{name:"Home",url:"https://adwatak.cloud/fr"},{name:"Generators",url:"https://adwatak.cloud/fr/category/generators"},{name:"Name Generator",url:"https://adwatak.cloud/fr/tools/name-generator"}];
  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'fr', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={howToSchema("How to use the Name Generator","Generate creative names instantly in your browser. No registration required.",[{name:"Choose a category",text:"Select from 7 categories: Baby, Brand, Username, Business, Pet, Fantasy, or Startup"},{name:"Set the count",text:"Choose how many names to generate (1-20)"},{name:"Generate names",text:"Click the Generate button to get random creative names"},{name:"Copy and use",text:"Copy individual names or save them for your project"}],"less than a minute","fr")} />
      <StructuredData data={speakableSchema(["h1","h2","main"])} />
      <Breadcrumb category="Generators" categorySlug="generators" toolName="Name Generator" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">👤 Name Generator</h1>
        <p className="text-sm text-gray-500 mb-6">Generate creative names — baby, brand, username, business & more</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((c) => (
            <button key={c.key} onClick={() => setCat(c.key)}
              className={`px-4 py-2 text-sm font-semibold rounded-full border-2 transition-all ${cat === c.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'}`}
            >{c.emoji}{c.label}</button>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Count</label>
          <input type="number" value={count} onChange={(e) => setCount(e.target.value)} min="1" max="20" className="max-w-[100px] p-3 border-2 border-gray-200 rounded-xl text-base outline-none" />
        </div>
        <button onClick={generate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer hover:bg-blue-700 transition-colors">Generate {categories.find(c=>c.key===cat)?.emoji} Names</button>
      </div>
      {names.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {names.map((n,i) => <div key={i} className="bg-gray-50 rounded-xl p-3 px-5 border border-gray-200 font-semibold text-gray-700">{n}</div>)}
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
      <ShareButtons lang="fr" />
    </div>
  );
}