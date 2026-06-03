"use client";
import { useState } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const bioStyles = [
  { id: "professional", label: "Professional", desc: "LinkedIn, CV, Portfolio" },
  { id: "creative", label: "Creative", desc: "Social media, Twitter, Instagram" },
  { id: "simple", label: "Simple", desc: "One short line" },
  { id: "funny", label: "Funny", desc: "Light humor + info" },
];

const professions = [
  "Web Developer", "Graphic Designer", "Content Writer", "Digital Marketer", "Accountant",
  "Software Engineer", "Teacher", "Business Consultant", "Entrepreneur", "Photographer",
  "Project Manager", "Data Analyst", "SEO Specialist", "Translator", "Doctor",
  "Lawyer", "Architect", "Personal Trainer", "Video Producer", "Programmer",
];

const faqs = [
  { question: "What is a Bio Generator?", answer: "A free tool that helps you create a professional short bio for any platform. Choose your style, enter your info, and get a ready-to-copy bio." },
  { question: "Is it suitable for LinkedIn?", answer: "Yes! The professional style is designed for LinkedIn. It includes your job title, skills, and experience summary." },
  { question: "Is it suitable for social media?", answer: "Yes, the creative style works great for Twitter, Instagram, Telegram, and Facebook. Short and engaging." },
  { question: "Can I edit the text after generation?", answer: "Yes, the generated bio appears in a text box — you can edit and copy it before using." },
  { question: "Is this tool free?", answer: "Yes 100% free, no registration, no limits." },
  { question: "What is the ideal bio length?", answer: "For LinkedIn: 100-200 words. Twitter: 160 characters. Instagram: 150 characters. Telegram: 70 characters." },
  { question: "Can I use it for business pages?", answer: "Yes, choose the professional style and add your business information." },
  { question: "Does it support Arabic?", answer: "This version generates English bios. For Arabic, try the AR version of this tool." },
];

const relatedTools = [
  { title: "Password Generator", icon: "🔐", href: "/en/tools/password-generator" },
  { title: "QR Generator", icon: "🔳", href: "/en/tools/qr-generator" },
  { title: "WhatsApp Link", icon: "💬", href: "/en/tools/whatsapp-link" },
  { title: "Text Case Converter", icon: "🔤", href: "/en/tools/text-case" },
];

const seoContent = [
  "Free Bio Generator — create professional bios for LinkedIn, Twitter, Instagram and more. Choose from 4 styles: Professional, Creative, Simple, or Funny.",
  "Perfect for professionals, freelancers, and entrepreneurs. Generate a polished bio in seconds with your name, profession, and skills.",
  "100% free, works in your browser, no registration required. Copy and paste your bio anywhere.",
];

function generateBio(name: string, profession: string, skills: string, style: string): string {
  const skillsList = skills.split(",").map((s) => s.trim()).filter(Boolean);
  const skillsText = skillsList.length > 0 ? `Skills: ${skillsList.join(" • ")}` : "";

  switch (style) {
    case "professional":
      return `${name} | ${profession}\n${skillsText}\n💼 Experienced ${profession} — helping individuals and businesses achieve their goals.\n📩 Feel free to reach out!`;
    case "creative":
      return `${name} ✦ ${profession}\n${skillsText}\n🚀 Turning ideas into reality. Passionate about ${profession}.\n📱 Building, learning, growing — every single day.`;
    case "simple":
      return `${name} — ${profession}. ${skillsText ? skillsText : ""}`;
    case "funny":
      const jokes = [
        `${name}, ${profession}. I write more code than words 💻`,
        `${name} — ${profession}. I do this for money, not for fun 😂`,
        `${name}. ${profession}. Work hard, stay humble, go home.`,
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    default:
      return `${name} — ${profession}`;
  }
}

export default function Client() {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [customProfession, setCustomProfession] = useState("");
  const [skills, setSkills] = useState("");
  const [style, setStyle] = useState("professional");
  const [result, setResult] = useState("");

  const generate = () => {
    const n = name.trim() || "Your Name";
    const p = customProfession || profession || "Your Profession";
    const bio = generateBio(n, p, skills, style);
    setResult(bio);
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
  };

  const schemaName = "Bio Generator";
  const schemaDesc = "Create professional short bios for any platform";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/en/tools/bio-generator";
  const breadcrumbItems = [
    { name: "Home", url: "https://adwatak.cloud/en" },
    { name: "Generators", url: "https://adwatak.cloud/en/category/generators" },
    { name: "Bio Generator", url: "https://adwatak.cloud/en/tools/bio-generator" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, "en", schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines (ChatGPT, Perplexity, Google Assistant) */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb category="Generators" categorySlug="generators" toolName="Bio Generator" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">👤 Bio Generator</h1>
        <p className="text-sm text-gray-500 mb-6">Create professional bios for any platform — LinkedIn, Twitter, Instagram</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none" placeholder="John Doe" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Profession / Field</label>
            <select value={profession} onChange={(e) => { setProfession(e.target.value); setCustomProfession(""); }}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white mb-2">
              <option value="">Choose a profession...</option>
              {professions.map((p) => <option key={p} value={p}>{p}</option>)}
              <option value="__other__">Other (type manually)</option>
            </select>
            {profession === "__other__" && (
              <input type="text" value={customProfession} onChange={(e) => setCustomProfession(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none" placeholder="Enter your profession" />
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Skills (optional — comma separated)</label>
            <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none" placeholder="HTML, CSS, JavaScript, React" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Style</label>
            <div className="grid grid-cols-2 gap-2">
              {bioStyles.map((s) => (
                <button key={s.id} onClick={() => setStyle(s.id)}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${style === s.id ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                  <p className="font-bold text-sm">{s.label}</p>
                  <p className="text-xs text-gray-500">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <button onClick={generate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all cursor-pointer border-none text-base">
            ✨ Generate Bio
          </button>

          {result && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold text-gray-700">Your Bio</p>
                <button onClick={copy} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1.5 px-4 rounded-xl text-sm transition-all cursor-pointer border-none">
                  📋 Copy
                </button>
              </div>
              <textarea readOnly value={result}
                className="w-full h-36 p-4 border-2 border-gray-200 rounded-xl text-sm font-sans outline-none resize-y bg-gray-50"
                dir="auto" />
              <p className="text-xs text-gray-400 mt-2">Copy and paste this bio into your LinkedIn, Twitter, or any profile</p>
            </div>
          )}
        </div>
      </div>
      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}
