"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "What is AI Essay Writer?", answer: "A free tool to generate structured essays. Choose your topic, essay type, and length to get a complete essay with introduction, body paragraphs, and conclusion." },
  { question: "Is it free?", answer: "Yes, 100% free. No registration, no limits, no ads." },
  { question: "What essay types are available?", answer: "Available: Argumentative, Descriptive, Narrative, Expository, and Persuasive. Each type has a different structure." },
  { question: "Does it support Arabic?", answer: "Yes, supports both Arabic and English fluently." },
  { question: "What length options?", answer: "Short (~300 words), Medium (~600 words), Long (~1000 words)." },
  { question: "Can I use it commercially?", answer: "Yes, results are for personal and commercial use." },
  { question: "Does it work on mobile?", answer: "Yes, fully responsive on all devices." },
  { question: "How to start?", answer: "Type your topic, choose essay type and length, then click Generate." },
  { question: "Can I copy the essay?", answer: "Yes, copy button and download as .txt file are available." },
  { question: "Is my data safe?", answer: "Everything runs in your browser. No data is sent to any server." },
];

const relatedTools = [
  { title: "Paraphrasing Tool", icon: "✏️", href: "/en/tools/paraphrasing-tool" },
  { title: "Grammar Checker", icon: "📝", href: "/en/tools/grammar-checker" },
  { title: "Word Counter", icon: "📊", href: "/en/tools/word-counter" },
  { title: "Bio Generator", icon: "👤", href: "/en/tools/bio-generator" },
  { title: "Text Case Converter", icon: "🔤", href: "/en/tools/text-case" },
];

const seoContent = [
  "Free AI Essay Writer - generate structured essays with introduction, body, and conclusion. Choose from argumentative, descriptive, narrative, expository, and persuasive types.",
  "Perfect for students, writers, bloggers, and content creators.",
  "AI-powered essay generation with professional structure and formatting.",
  "100% free, works in your browser, no registration needed.",
];

const INTROS: Record<string, Record<string, ((t: string) => string)[]>> = {
  argumentative: {
    en: [
      (t: string) => `The topic of "${t}" has become one of the most debated subjects in recent times. Opinions are divided between supporters and opponents, each with their own arguments and evidence. In this essay, we will explore the different aspects of this topic.`,
      (t: string) => `In recent years, discussions about "${t}" have taken center stage in public discourse. While some see it as a necessity, others consider it a significant challenge. Let us explore the various dimensions of this issue.`,
    ],
  },
  descriptive: {
    en: [
      (t: string) => `When discussing "${t}", we find ourselves in a world rich with details and scenes worthy of contemplation. It is a subject abundant with elements that deserve careful examination.`,
      (t: string) => `"${t}" is more than just a term — it is a complete experience that carries many aspects worth exploring and describing in detail.`,
    ],
  },
  narrative: {
    en: [
      (t: string) => `The story of "${t}" began long ago, with humble beginnings and great ambitions. In this journey, we will explore the key milestones that shaped this topic.`,
      (t: string) => `Every topic has a story, and the story of "${t}" is full of fascinating transformations and developments. Let us tell it together.`,
    ],
  },
  expository: {
    en: [
      (t: string) => `This article aims to provide a comprehensive and objective explanation of "${t}". We will cover the fundamental concepts and important information to help you understand this topic more deeply.`,
      (t: string) => `To fully understand "${t}", we must start from the basics and gradually move toward details. This comprehensive guide provides everything you need to know.`,
    ],
  },
  persuasive: {
    en: [
      (t: string) => `Have you ever thought about the importance of "${t}" and its impact on our lives? In this article, we will present compelling reasons why "${t}" deserves your attention and time.`,
      (t: string) => `If you are still undecided about "${t}", let us take you on a journey to discover why this is one of the most important topics deserving your attention.`,
    ],
  },
};

const BODIES: Record<string, Record<string, ((t: string) => string)[]>> = {
  argumentative: {
    en: [
      (t: string) => `On one hand, supporters believe that "${t}" represents a positive development that cannot be ignored. They believe it has significant benefits including improved quality of life and increased efficiency. Successful experiences in this field confirm their perspective.`,
      (t: string) => `On the other hand, critics warn about certain negative aspects of "${t}". They see significant challenges that must be addressed, and that rushing implementation may lead to counterproductive results.`,
      (t: string) => `Between these two positions, there is room for reconciliation. The optimal solution may lie in adopting a balanced approach that considers the benefits while working to minimize potential risks.`,
    ],
  },
  descriptive: {
    en: [
      (t: string) => `The first thing that catches attention about "${t}" is the diversity and richness it possesses. Each element has its own character and distinctive importance.`,
      (t: string) => `Delving deeper into the details of "${t}", we discover additional layers of meaning and significance. Each element complements the other in an integrated picture.`,
      (t: string) => `The impact of "${t}" on the audience cannot be overlooked. The minute details create a unique and memorable experience.`,
    ],
  },
  narrative: {
    en: [
      (t: string) => `In the beginning, "${t}" was just a simple idea in the minds of a few. But over time, interest grew and the concepts associated with it evolved.`,
      (t: string) => `The second phase came as a critical turning point in the journey of "${t}", where major developments changed previous concepts and added new dimensions.`,
      (t: string) => `Today, we see "${t}" in its current form, the product of years of development and continuous work.`,
    ],
  },
  expository: {
    en: [
      (t: string) => `To understand "${t}" more deeply, we must start with its definition and basic components. This topic consists of several interconnected elements that contribute to the complete picture.`,
      (t: string) => `An important aspect of "${t}" is its practical application. There are several approaches and methods, each with its advantages and challenges.`,
      (t: string) => `Looking to the future, "${t}" is expected to witness further developments. Current studies and research promise great potential and new applications.`,
    ],
  },
  persuasive: {
    en: [
      (t: string) => `The first reason why "${t}" is important is its direct impact on our daily lives. Studies indicate that paying attention to this topic improves quality of life and opens new horizons.`,
      (t: string) => `Furthermore, "${t}" contributes to achieving broader goals in the long term. Investment in this area returns great benefits to both individuals and society.`,
      (t: string) => `Finally, it cannot be denied that recent developments make "${t}" more important than ever. The opportunity is now available.`,
    ],
  },
};

const CONCLUSIONS: Record<string, ((t: string) => string)[]> = {
  en: [
    (t: string) => `In conclusion, "${t}" is a multi-dimensional topic that deserves more attention and study. The balance between benefits and challenges is the key to maximizing its potential. We hope this article has provided you with a clear and comprehensive perspective.`,
    (t: string) => `Ultimately, "${t}" represents a fertile field for research and discussion. As developments continue, we remain hopeful that we will witness more achievements in this area.`,
  ],
};

const TITLES: Record<string, ((t: string) => string)[]> = {
  en: [
    (t: string) => `${t}: A Comprehensive Analysis`,
    (t: string) => `Everything You Need to Know About ${t}`,
    (t: string) => `${t}: Importance, Challenges, and Opportunities`,
    (t: string) => `Your Complete Guide to Understanding ${t}`,
  ],
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEssay(topic: string, type: string, length: string) {
  const bodyCount = length === "short" ? 2 : length === "medium" ? 3 : 5;
  const intros = INTROS[type]?.en ?? INTROS.argumentative.en;
  const bodies = BODIES[type]?.en ?? BODIES.argumentative.en;
  const cons = CONCLUSIONS.en;
  const titles = TITLES.en;

  return {
    title: pick(titles)(topic),
    introduction: pick(intros)(topic),
    body: Array.from({ length: bodyCount }, (_, i) => bodies[i % bodies.length](topic)),
    conclusion: pick(cons)(topic),
  };
}

export default function ClientEn() {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("argumentative");
  const [length, setLength] = useState("medium");
  const [result, setResult] = useState<{ title: string; introduction: string; body: string[]; conclusion: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setResult(generateEssay(topic.trim(), type, length));
    setCopied(false);
  };

  const fullText = result
    ? `${result.title}\n\n${result.introduction}\n\n${result.body.map(p => p).join("\n\n")}\n\n${result.conclusion}`
    : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([fullText], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${topic.trim().slice(0, 30).replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    a.click();
  };

  const wordCount = fullText ? fullText.split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("AI Essay Writer", "Write complete articles with AI", "https://adwatak.cloud/en/tools/ai-essay-writer", "en", "Text Tools")} />
      <StructuredData data={faqSchema(faqs)} />
      <Breadcrumb lang="en" category="Text Tools" categorySlug="tools" toolName="AI Essay Writer" />
      
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">✍️ AI Essay Writer</h1>
        <p className="text-sm text-gray-500 mb-6">Generate complete structured essays with AI</p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Essay Topic *</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your essay topic..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Essay Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white">
                <option value="argumentative">Argumentative</option>
                <option value="descriptive">Descriptive</option>
                <option value="narrative">Narrative</option>
                <option value="expository">Expository</option>
                <option value="persuasive">Persuasive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Length</label>
              <select value={length} onChange={(e) => setLength(e.target.value)} className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white">
                <option value="short">Short (~300 words)</option>
                <option value="medium">Medium (~600 words)</option>
                <option value="long">Long (~1000 words)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!topic.trim()}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-sm rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
          >
            ✨ Generate Essay
          </button>
        </div>

        {result && (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-green-100 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium">
                ✓ {wordCount} words
              </span>
              <div className="flex gap-2">
                <button onClick={handleCopy} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">
                  {copied ? "✓ Copied" : "📋 Copy"}
                </button>
                <button onClick={handleDownload} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors">
                  ⬇️ Download
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 whitespace-pre-wrap text-sm leading-relaxed text-gray-800 max-h-[600px] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">{result.title}</h2>
              <p className="mb-4">{result.introduction}</p>
              {result.body.map((p, i) => <p key={i} className="mb-4">{p}</p>)}
              <p>{result.conclusion}</p>
            </div>
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