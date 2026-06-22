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
const businessNames = ["Solutions globales","Prime Ventures","Next Horizon","Elite Services","Premier Group","Strategic Partners","Innovations dynamiques","Digital Frontier","Smart Systems","Swift Logistics","Core Solutions","Apex Consulting","Peak Performance","Summit Advisory","Crown Enterprises","Royal Holdings","Grand Alliance","Supreme Quality","Total Solutions","Vanguard Group","Legacy Partners","Heritage Holdings","Noble Ventures","Imperial Group","Sovereign Solutions","United Partners","Allied Services","Master Builders","Pinnacle Group","PrimeSource"];
const petNames = ["Max","Charlie","Cooper","Rocky","Bear","Duke","Tucker","Jack","Leo","Milo","Loki","Simba","Jasper","Bella","Lucy","Daisy","Molly","Sadie","Chloe","Luna","Lola","Nala","Rosie","Zoe","Lily","Pepper","Ginger","Oreo","Mochi","Coco","Honey","Cookie","Maple","Olive","Willow","Ivy","Misty","Sunny","Stormy","Oscar","Buddy","Bailey","Riley","Lucky","Mocha","Latte","Pebbles","Meadow","Rocket","Dash"];
const fantasyNames = ["Aerion","Balor","Celestian","Drakon","Eldric","Faelyn","Galadriel","Helios","Ithildin","Jorlan","Kaladin","Lorien","Malakai","Naroth","Orlinn","Pyralis","Quelior","Ravath","Saraphine","Thranduil","Ulrick","Valerius","Wyrlan","Xandor","Yelara","Zarathos","Ashara","Briallen","Corvina","Duskwood","Emberlyn","Frostbane","Nightshade","Obsidian","Shadowmere","Lunaria","Mistsong","Peacesong","Quillwind","Xyleen","Aeris","Boreas","Caelus","Dorian","Eryndor","Faelivrin","Gwyndolin","Illyria","Kaelthas","Lyra"];
const startupNames = ["Unify","Omnily","Hyperio","Metaix","NeoEx","ProHub","MaxBox","UltraSoft","SuperCloud","MegaFlow","GigaWave","TeraSpark","NanoByte","MicroSync","PolyMind","MultiLab","BiCore","TriLogic","QuadVentures","AlphaMind","BetaWorks","GammaFlow","DeltaWave","SigmaCore","OmegaSync","ZenithSoft","VertexLab","PulseTech","NovaFlow","ApexMind"];

const faqs = [
  { question: "Qu'est-ce qu'un générateur de noms ?", answer: "Un outil en ligne gratuit qui génère des noms créatifs pour divers besoins : noms de bébé, noms de marque, noms d'utilisateur, noms d'entreprise, noms d'animaux, personnages fantastiques et idées de startup. Parfait pour les écrivains, les joueurs, les entrepreneurs et les parents." },
  { question: "Le générateur de noms est-il gratuit ?", answer: "Oui, entièrement gratuit ! Pas d'inscription, pas de limites. Fonctionne entièrement dans votre navigateur." },
  { question: "Combien de catégories de noms sont disponibles ?", answer: "7 catégories : Noms de bébé (60+ vrais noms), Noms de marque (noms d'entreprise créatifs), Noms d'utilisateur (jeux/réseaux sociaux), Noms d'entreprise (professionnels), Noms d'animaux, Noms fantastiques (pour RPG/romans), et Noms de startup (noms technologiques modernes)." },
  { question: "Les noms sont-ils uniques à chaque fois ?", answer: "Les noms sont sélectionnés aléatoirement à partir de grands réservoirs de 30 à 50 noms ou plus par catégorie. Les répétitions sont peu probables mais possibles car les tirages aléatoires sont indépendants." },
  { question: "Puis-je les utiliser à des fins commerciales ?", answer: "Oui ! Tous les noms sont libres d'utilisation. Cependant, vérifiez les marques déposées existantes avant une utilisation commerciale." },
  { question: "Fonctionne-t-il sans Internet ?", answer: "L'outil fonctionne entièrement dans votre navigateur (côté client). Une fois chargé, il fonctionne hors ligne." },
  { question: "Les écrivains peuvent-ils l'utiliser pour des personnages ?", answer: "Absolument ! Les noms fantastiques sont conçus pour les personnages de RPG, les personas de roman et les avatars de jeu. Les noms d'utilisateur fonctionnent pour les pseudos sur les réseaux sociaux et les tags de jeu." },
  { question: "Quels styles de noms sont disponibles ?", answer: "Noms de bébé : classiques anglais et arabes. Noms de marque : style technologique moderne. Noms d'utilisateur : pseudos de jeu. Entreprise : noms d'entreprise professionnels. Animaux : noms d'animaux mignons. Fantastique : noms de personnages fantastiques épiques. Startup : noms technologiques modernes et courts." },
];

const relatedTools = [
  { title: "Générateur de Nombres Aléatoires", icon: "🎲", href: "/fr/tools/random-number" },
  { title: "Générateur de Mots de Passe", icon: "🔐", href: "/fr/tools/password-generator" },
  { title: "Générateur de QR Code", icon: "📱", href: "/fr/tools/qr-generator" },
  { title: "Générateur de Factures", icon: "🧾", href: "/fr/tools/invoice-generator" },
  { title: "Lien WhatsApp", icon: "💬", href: "/fr/tools/whatsapp-link" },
  { title: "Générateur de Bio", icon: "✍️", href: "/fr/tools/bio-generator" },
];

const seoContent = [
  "Notre générateur de noms gratuit crée des noms instantanés dans 7 catégories : Noms de bébé, Noms de marque, Noms d'utilisateur, Noms d'entreprise, Noms d'animaux, Noms fantastiques et Noms de startup. Parfait pour les écrivains, les parents, les entrepreneurs, les joueurs et les propriétaires d'animaux.",
  "La catégorie Noms de bébé propose plus de 60 vrais noms issus des cultures anglaise et arabe — Emma, Liam, Muhammad, Fatima, Aisha, et plus encore. Noms de marque génère des noms d'entreprise créatifs comme NovaTech, ApexGen et ZenFlow.",
  "Les suggestions de noms d'utilisateur comme CoolWolf_42, ShadowFalcon_ et CyberTiger_ sont parfaites pour les réseaux sociaux, les jeux et les profils en ligne. Les noms fantastiques comme Aerion, Galadriel et Drakon sont idéaux pour les personnages de RPG et les romans.",
  "Noms de startup génère des noms de style technologique moderne comme Unify, Hyperio et Metaix — accrocheurs, courts et mémorables. Les noms d'entreprise comme Global Solutions et Prime Ventures sont professionnels et dignes de confiance.",
  "Outils associés : À utiliser avec le générateur de mots de passe pour des identifiants sécurisés, le générateur de QR pour des cartes de visite scannables, le générateur de factures pour des factures personnalisées et le générateur de bio pour des bios professionnelles sur les réseaux sociaux.",
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

  const schemaName = "Générateur de Noms";const schemaDesc = "En ligne Name Generator  - outil gratuit";const schemaCategory = "Utility";const schemaUrl = "https://adwatak.cloud/fr/tools/name-generator";const breadcrumbItems = [{name:"Home",url:"https://adwatak.cloud/fr"},{name:"Générateurs",url:"https://adwatak.cloud/fr/category/generators"},{name:"Générateur de Noms",url:"https://adwatak.cloud/fr/tools/name-generator"}];
  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'fr', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={howToSchema("How to use the Name Generator","Générez des noms créatifs instantanément dans votre navigateur. Aucune inscription requise.",[{name:"Choose a category",text:"Sélectionnez parmi 7 catégories : Bébé, Marque, Nom d'utilisateur, Entreprise, Animal, Fantastique ou Startup"},{name:"Set the count",text:"Choisissez combien de noms générer (1-20)"},{name:"Generate names",text:"Cliquez sur le bouton Générer pour obtenir des noms créatifs aléatoires"},{name:"Copy and use",text:"Copiez des noms individuels ou enregistrez-les pour votre projet"}],"moins d'une minute","fr")} />
      <StructuredData data={speakableSchema(["h1","h2","main"])} />
      <Breadcrumb category="Générateurs" categorySlug="generators" toolName="Générateur de noms" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">👤 Générateur de Noms</h1>
        <p className="text-sm text-gray-500 mb-6">Générez des noms pour personnages</p>
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