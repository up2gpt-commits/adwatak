"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "What's the difference between HEX, RGB, and HSL?", answer: "HEX = Hexadecimal (#FF0000 for red). RGB = Red, Green, Blue (0-255 each). HSL = Hue (0-360°), Saturation (0-100%), Lightness (0-100%). All represent the same color differently." },
  { question: "How to use the color picker?", answer: "Click on the color square to open your browser's color picker. Any color you choose converts automatically between HEX, RGB, and HSL. You can also type HEX manually." },
  { question: "Why do developers need color conversion?", answer: "CSS accepts HEX, RGB, and HSL. Figma/Photoshop uses HEX. Tailwind/Bootstrap use HEX. APIs sometimes require RGB. Having all formats visible saves time and prevents errors." },
  { question: "What does Hue mean in HSL?", answer: "Hue = position on the color wheel: 0° = red, 60° = yellow, 120° = green, 180° = cyan, 240° = blue, 300° = magenta, 360° = red again. This lets you change the base color easily." },
  { question: "How to create a consistent color palette?", answer: "Use HSL: pick a base Hue (e.g., 217° for blue). For backgrounds: L=95%. For primary elements: L=50%. For text: L=20%. Keep S and H constant, vary L — instant consistent palette." },
  { question: "What's the color #3b82f6?", answer: "#3b82f6 is Blue-500 from Tailwind CSS. It's a vibrant blue widely used for buttons and links. RGB: 59,130,246. HSL: 217°, 91%, 60%." },
];
const relatedTools = [
  { title: "JSON Formatter", icon: "📋", href: "/en/tools/json-formatter" },
  { title: "Base64 Encoder", icon: "🔄", href: "/en/tools/base64-encoder" },
  { title: "Hash Generator", icon: "#️⃣", href: "/en/tools/hash-generator" },
  { title: "Unit Converter", icon: "📐", href: "/en/tools/unit-converter" },
  { title: "Text Compare", icon: "⚖️", href: "/en/tools/text-compare" },
  { title: "QR Generator", icon: "🔳", href: "/en/tools/qr-generator" },
];
const seoContent = [
  "Convert colors between HEX, RGB, and HSL formats with a live preview. Pick any color using the browser color picker or type a HEX code — get converted values instantly.",
  "HEX is the most common format in CSS and HTML. RGB is used in CSS and image editors. HSL (Hue, Saturation, Lightness) is more intuitive for humans — adjust color, intensity, and brightness separately.",
  "For developers: Convert design colors from Figma/Photoshop (HEX) to CSS (RGB or HSL). For UI designers: Try different colors and copy the right format. For anyone working with colors.",
  "Example: Blue #3B82F6 → RGB: 59,130,246 → HSL: 217°, 91%, 60%. Red #FF0000 → RGB: 255,0,0 → HSL: 0°, 100%, 50%. Works entirely in your browser — no data uploaded.",
];
export default function ColorConverter() {
  const [hex, setHex] = useState("#3b82f6");
  const [result, setResult] = useState<{hex: string; rgb: {r: number; g: number; b: number}; hsl: {h: number; s: number; l: number}} | null>(null);
  const hexToRgb = (h: string) => { return { r: parseInt(h.slice(1,3),16), g: parseInt(h.slice(3,5),16), b: parseInt(h.slice(5,7),16) }; };
  const rgbToHsl = (r: number, g: number, b: number) => {
    r/=255; g/=255; b/=255;
    const max=Math.max(r,g,b), min=Math.min(r,g,b);
    let h=0, s=0, l=(max+min)/2;
    if (max!==min) { const d=max-min; s=l>0.5?d/(2-max-min):d/(max+min); if(max===r) h=((g-b)/d+(g<b?6:0))/6; else if(max===g) h=((b-r)/d+2)/6; else h=((r-g)/d+4)/6; }
    return { h:Math.round(h*360), s:Math.round(s*100), l:Math.round(l*100) };
  };
  const convert = () => { const rgb = hexToRgb(hex); setResult({hex, rgb, hsl: rgbToHsl(rgb.r,rgb.g,rgb.b)}); };
  const schemaName = "Color Converter";
  const schemaDesc = "Online Color Converter - free tool";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/en/tools/color-converter";
  const breadcrumbItems = [
    { name: "Home", url: "https://adwatak.cloud/en" },
    { name: "Converters", url: "https://adwatak.cloud/en/tools/converters" },
    { name: "Color Converter", url: "https://adwatak.cloud/en/tools/color-converter" },
  ];
  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Converters" categorySlug="converters" toolName="Color Converter" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🎨 Color Converter</h1>
        <p className="text-sm text-gray-500 mb-6">Convert between HEX, RGB, HSL with live preview</p>
        <div className="flex gap-3 items-end mb-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Color</label>
            <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} className="w-full h-12 border-2 border-gray-200 rounded-xl cursor-pointer" />
          </div>
          <div className="flex-[2]">
            <input type="text" value={hex} onChange={(e) => setHex(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none font-mono" placeholder="#3b82f6" />
          </div>
          <button onClick={convert} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none cursor-pointer font-inherit">Convert</button>
        </div>
        {result && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200"><p className="text-xs text-gray-500">HEX</p><p className="text-lg font-bold font-mono">{result.hex}</p></div>
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200"><p className="text-xs text-gray-500">RGB</p><p className="text-lg font-bold font-mono">{result.rgb.r}, {result.rgb.g}, {result.rgb.b}</p></div>
            <div className="rounded-xl p-4 text-center border border-gray-200" style={{background:result.hex}}><p className="text-xs" style={{color:"rgba(255,255,255,0.8)"}}>Preview</p></div>
          </div>
        )}
      </div>
      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}
