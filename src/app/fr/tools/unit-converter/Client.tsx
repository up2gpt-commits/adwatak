"use client";
import { useState } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema ,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "What is a unit converter?", answer: "Converts values between different measurement units within the same category: length (meters/feet), weight (kg/lbs), temperature (C/F/K), volume (liters/gallons), area (sq m/acres), and more. Essential for science, travel, cooking, and international business." },
  { question: "Why use a unit converter?", answer: "International differences: US uses imperial (miles, pounds, Fahrenheit). Rest of world uses metric (km, kg, Celsius). Recipes, travel planning, online shopping, car specs (mph vs km/h), and scientific calculations all need accurate conversion." },
  { question: "How to convert Celsius to Fahrenheit?", answer: "Formula: F = (C × 9/5) + 32. 0°C = 32°F. 100°C = 212°F. 25°C = 77°F. For quick mental: double Celsius, add 30 (approximate). 25 × 2 = 50 + 30 = 80°F (exact: 77°F)." },
  { question: "How to convert kg to lbs?", answer: "1 kg = 2.20462 lbs. 80 kg = 176.4 lbs. Quick: multiply by 2.2. 80 × 2.2 = 176 lbs. For lbs to kg: divide by 2.2. 176 ÷ 2.2 = 80 kg. Our converter gives exact decimal results." },
  { question: "Miles to kilometers?", answer: "1 mile = 1.60934 km. 60 mph = 96.5 km/h. Quick: multiply by 1.6. 60 × 1.6 = 96 km/h. For km to miles: divide by 1.6. 100 km/h ÷ 1.6 = 62.5 mph." },
  { question: "Inches to centimeters?", answer: "1 inch = 2.54 cm. 5'9\" (69 inches) = 69 × 2.54 = 175.26 cm. Quick: multiply inches by 2.5. 69 × 2.5 = 172.5 cm (close enough for most purposes)." },
  { question: "How to convert between units of area?", answer: "1 sq meter = 10.764 sq feet. 1 acre = 4,047 sq meters. 1 hectare = 10,000 sq meters = 2.471 acres. 1 sq km = 0.386 sq miles. Use square of the length conversion factor." },
  { question: "Volume conversions?", answer: "1 liter = 0.264 gallons (US). 1 gallon (US) = 3.785 liters. 1 cup = 237 ml. 1 fl oz = 29.57 ml. 1 cubic meter = 264 gallons. Our converter handles all common volume units." },
  { question: "What is an astronomical unit (AU)?", answer: "Distance from Earth to Sun: ~149.6 million km (93 million miles). 1 light-year = 63,241 AU. 1 parsec = 206,265 AU. Used for measuring solar system distances. Our converter doesn't include AU but supports major metric/imperial categories." },
  { question: "Digital storage conversions?", answer: "1 KB = 1024 B. 1 MB = 1024 KB. 1 GB = 1024 MB. 1 TB = 1024 GB. 1 PB = 1024 TB. Note: hard drive manufacturers use decimal (1 GB = 1,000,000,000 B), not binary. 1 TB drive = 931 GB actual usable space." },
  { question: "Speed conversions?", answer: "1 mph = 1.609 km/h = 0.447 m/s. 1 knot = 1.852 km/h = 1.151 mph. Mach 1 = 1,235 km/h at sea level (varies with altitude). Our converter handles mph, km/h, and m/s." },
  { question: "What are the base SI units?", answer: "Meter (length), Kilogram (mass), Second (time), Ampere (current), Kelvin (temperature), Mole (amount), Candela (luminance). All other SI units derive from these 7. Our converter covers the most common derived units." },
];

const relatedTools = [
  { title: "BMI Calculator", icon: "⚖️", href: "/fr/tools/bmi-calculator" },
  { title: "Calorie Calculator", icon: "🔥", href: "/fr/tools/calorie-calculator" },
  { title: "Gold Calculator", icon: "🥇", href: "/fr/tools/gold-calculator" },
  { title: "Age Calculator", icon: "🎂", href: "/fr/tools/age-calculator" },
  { title: "Number to Words", icon: "🔢", href: "/fr/tools/number-to-words" },
  { title: "Compound Interest", icon: "📈", href: "/fr/tools/compound-interest" },
];

const seoContent = [
  "Notre Unit Converter handles length, weight, temperature, volume, area, and speed conversions instantly. Switch between metric and imperial systems with a single click. Perfect for travel, cooking, science, international business, and everyday calculations.",
  "Categories: Length (meters, feet, inches, miles, km). Weight (kg, lbs, oz, stones). Temperature (°C, °F, K). Volume (L, gal, cups, fl oz). Area (sq m, sq ft, acres, hectares). Speed (km/h, mph, m/s). More categories coming soon.",
  "Example conversions: 100 kg = 220.5 lbs. 1 mile = 1.609 km. 30°C = 86°F. 1 gallon = 3.785 liters. 1 acre = 4,047 sq m. 60 km/h = 37.3 mph. All conversions use exact conversion factors, not approximations.",
  "Why it matters: The USA, Myanmar, and Liberia are the only countries using imperial measurement. The rest of the world uses metric. If you travel, shop online internationally, or work with global partners, a unit converter is essential.",
  "Related: Use our BMI Calculator which uses metric units. The Calorie Calculator needs weight in kg. The Gold Calculator uses grams and ounces. The Age Calculator works with Gregorian dates. All tools work together seamlessly.",
  "Our converter is entirely browser-based — no server calls, no tracking. Type any value, select units, get instant accurate results. Free for unlimited use."
];

export default function Client() {
  const [category, setCategory] = useState("length");
  const [from, setFrom] = useState("meter");
  const [to, setTo] = useState("foot");
  const [value, setValue] = useState("100");
  const [result, setResult] = useState("");

  const conversions: Record<string, Record<string, number>> = {
    length: { meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001, foot: 0.3048, inch: 0.0254, yard: 0.9144, mile: 1609.344 },
    weight: { kilogram: 1, gram: 0.001, milligram: 1e-6, pound: 0.453592, ounce: 0.0283495, stone: 6.35029, ton: 1000 },
    temperature: {}, // special handling
    volume: { liter: 1, milliliter: 0.001, gallon: 3.78541, quart: 0.946353, pint: 0.473176, cup: 0.236588, "fl oz": 0.0295735, "cubic meter": 1000 },
    area: { "sq meter": 1, "sq km": 1e6, "sq foot": 0.092903, "sq inch": 0.00064516, "sq mile": 2589988, acre: 4046.86, hectare: 10000 },
    speed: { "km/h": 0.277778, "m/s": 1, "mph": 0.44704, knot: 0.514444 }
  };

  const convert = () => {
    const v = parseFloat(value);
    if (isNaN(v)) return;
    if (category === "temperature") {
      const f = (c: string) => c === "celsius" ? v : c === "fahrenheit" ? (v - 32) * 5/9 : v - 273.15;
      const toC = f(from);
      const t = to === "celsius" ? toC : to === "fahrenheit" ? toC * 9/5 + 32 : toC + 273.15;
      setResult(t.toFixed(4));
    } else {
      const cat = conversions[category];
      if (!cat || !(from in cat) || !(to in cat)) return;
      const base = v * cat[from];
      setResult((base / cat[to]).toFixed(6));
    }
  };

  const schemaName = "Convertisseur d'Unités";
const schemaDesc = `Online Unit Converter - outil gratuit`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/fr/tools/unit-converter";
const breadcrumbItems = [
  { name: "Accueil", url: "https://adwatak.cloud/fr" },
  { name: "Convertisseurs", url: "https://adwatak.cloud/fr/category/calculators" },
  { name: "Convertisseur d'Unités", url: "https://adwatak.cloud/fr/tools/unit-converter" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'fr', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines (ChatGPT, Perplexity, Google Assistant) */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      {/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("Comment utiliser cet outil", "Outil gratuit en ligne. Fonctionne dans votre navigateur. Aucune inscription requise.", [{name:"Ouvrir l'outil",text:"Navigate to this tool page on Adawatak"},{name:"Entrez vos données",text:"Remplissez les champs requis"},{name:"Obtenez les résultats",text:"Cliquez sur le bouton Calculer ou Générer"},{name:"Utilisez ou partagez",text:"Copiez, téléchargez ou partagez les résultats"}],"moins d'une minute","fr")} />
      {/* GEO: Speakable — AI/voice engines */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />

      <Breadcrumb category="Autres" categorySlug="utility-tools" toolName="Unit Converter" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📏 Convertisseur d'Unités</h1>
        <p className="text-sm text-gray-500 mb-6">Convert between metric and imperial units — length, weight, temperature, volume, area, speed</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {["length", "weight", "temperature", "volume", "area", "speed"].map((c) => (
            <button key={c} onClick={() => { setCategory(c); setResult(""); }} className={`px-3 py-1.5 rounded-full text-sm font-semibold cursor-pointer border-none capitalize ${category === c ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div><label className="block text-xs font-semibold text-gray-700 mb-1">Value</label><input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="100" /></div>
          <div><label className="block text-xs font-semibold text-gray-700 mb-1">From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-lg outline-none bg-white">
              {Object.keys(category === "temperature" ? { celsius: 0, fahrenheit: 0, kelvin: 0 } : conversions[category] || {}).map((u) => (<option key={u} value={u}>{u}</option>))}
            </select>
          </div>
          <div><label className="block text-xs font-semibold text-gray-700 mb-1">To</label>
            <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full p-2.5 border-2 border-gray-200 rounded-xl text-lg outline-none bg-white">
              {Object.keys(category === "temperature" ? { celsius: 0, fahrenheit: 0, kelvin: 0 } : conversions[category] || {}).map((u) => (<option key={u} value={u}>{u}</option>))}
            </select>
          </div>
        </div>
        <button onClick={convert} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Convertir</button>
      </div>
      {result && (
        <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200 mb-6">
          <p className="text-xs text-green-600 mb-1">Result</p>
          <p className="text-lg font-bold text-green-900">{value} {from} = {result} {to}</p>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    <ShareButtons lang="fr" />
    </div>
  );
}
