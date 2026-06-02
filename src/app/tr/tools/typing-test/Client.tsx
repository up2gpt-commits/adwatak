"use client";
import { useState, useRef, useEffect } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const sampleTexts = [
  "Science is light and ignorance is darkness. Education is the most powerful weapon which you can use to change the world. Learning opens doors that nothing else can.",
  "Technology changes our lives every single day. Artificial intelligence and machine learning have become part of our daily routine. Smart tools help us accomplish more in less time.",
  "In digital marketing, content is king. Writing SEO-friendly content helps your website rank higher in search results. Focus on quality content that provides real value to your readers.",
  "Success is not a destination but a continuous journey. Continuous learning and skill development are the keys to success in the modern era. Every new day brings a new opportunity to grow.",
  "Programming is the language of the future. Learning to code opens countless doors in the job market. From web development to artificial intelligence, programmers build the future."
];

const faqs = [
  { question: "What is a good typing speed?", answer: "40-60 WPM: Average. 60-80: Above average. 80-100: Fast. 100+: Professional level. The global average is ~40 WPM. Professional programmers and writers typically reach 60-90 WPM with high accuracy." },
  { question: "How many characters per minute is good?", answer: "200-300 CPM: Beginner. 300-400: Average. 400-500: Good. 500+: Professional. 1 word ≈ 5 characters (including spaces). So 80 WPM ≈ 400 CPM." },
  { question: "How can I improve my typing speed?", answer: "1) Practice 10-15 minutes daily. 2) Focus on accuracy first, then speed. 3) Use all ten fingers (touch typing). 4) Don't look at the keyboard. 5) Use practice sites like TypingClub, Keybr, and Monkeytype." },
  { question: "What is touch typing?", answer: "Touch typing is typing using all fingers without looking at the keyboard. Fingers rest on the home row (F and J have bumps). Each finger is responsible for a specific zone. It doubles your speed with practice." },
  { question: "Does daily practice really help?", answer: "Yes! 10 minutes daily = 20-30% improvement in the first month. Your brain builds muscle memory for finger movements. Over time, keystrokes become automatic without conscious thought." },
  { question: "How does posture affect typing speed?", answer: "Significantly. Straight back, relaxed shoulders, straight wrists (not bent), elbows at 90°. Monitor at eye level. Bad posture causes pain and reduces speed by 15-30%." },
  { question: "What are the best typing practice sites?", answer: "TypingClub (free, comprehensive), Keybr (smart, focuses on weak keys), Monkeytype (fun, competitive), 10fastfingers (races), Ratatype (courses). All are free and sufficient for professional-level speed." },
  { question: "Is mobile typing slower than computer?", answer: "Yes. Mobile typing averages ~35-45 WPM with two thumbs. Computer typing averages ~50-80 WPM with ten fingers. Physical keyboards are faster than touch screens for extended typing." },
  { question: "What's the difference between WPM and CPM?", answer: "WPM = Words Per Minute. CPM = Characters Per Minute. WPM = CPM ÷ 5 (average word length). WPM is the standard measure for general typing. CPM is more precise for coding." },
  { question: "What keyboard type is best for speed?", answer: "Mechanical keyboards are 5-15% faster due to tactile feedback. Cherry MX Blue/Brown switches are preferred by writers. Membrane keyboards are slower. Laptop keyboards are comfortable but have less travel distance." },
];

const relatedTools = [
  { title: "Word Counter", icon: "📝", href: "/en/tools/word-counter" },
  { title: "Stopwatch", icon: "⏱️", href: "/en/tools/stopwatch" },
  { title: "Text Cleaner", icon: "🧹", href: "/en/tools/text-cleaner" },
  { title: "Text Case", icon: "🔤", href: "/en/tools/text-case" },
  { title: "Text Compare", icon: "⚖️", href: "/en/tools/text-compare" },
  { title: "Lorem Ipsum", icon: "📃", href: "/en/tools/arabic-lorem" },
];

const seoContent = [
  "Test your keyboard typing speed online for free. Our Typing Speed Test measures your Words Per Minute (WPM), accuracy percentage, and Characters Per Minute (CPM). Just start typing and see your result instantly.",
  "What's your typing speed? Global average: 40 WPM. Beginner: 20-30. Average: 40-60. Good: 60-80. Professional: 80-100. A speed of 60 WPM means 300 CPM or 12,000 characters in one hour of continuous typing.",
  "How the test works: A random text appears. Type the text in the input field. After 60 seconds, you'll get: WPM (words per minute), Accuracy (percentage of correct keystrokes), and CPM (characters per minute). Try 3 times and calculate your average.",
  "Tips to improve typing speed: Use all ten fingers (touch typing), maintain proper sitting posture, practice 10 minutes daily, and don't look at the keyboard. Improvement typically takes 2-4 weeks of regular practice.",
  "Speed vs Accuracy: Errors reduce your effective speed. 80 WPM at 70% accuracy = 56 effective WPM. Focus on accuracy first (95%+), then increase speed. Professionals type 90+ WPM at 97%+ accuracy.",
  "This tool is 100% free, works in your browser, and doesn't upload any data. Test your speed in English. Share your result with friends and challenge them!"
];

export default function Client() {
  const [textIndex, setTextIndex] = useState(0);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{ wpm: number; accuracy: number; cpm: number } | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const sampleText = sampleTexts[textIndex];

  const startTest = () => {
    setInput("");
    setResult(null);
    setTimeLeft(60);
    setIsRunning(true);
    setTextIndex(Math.floor(Math.random() * sampleTexts.length));
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            calculateResult();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRunning]);

  const calculateResult = () => {
    const typedChars = input.length;
    let correct = 0;
    for (let i = 0; i < Math.min(typedChars, sampleText.length); i++) {
      if (input[i] === sampleText[i]) correct++;
    }
    const cpm = typedChars;
    const wpm = Math.round(cpm / 5);
    const accuracy = typedChars > 0 ? Math.round((correct / cpm) * 100) : 0;
    setResult({ wpm, accuracy, cpm });
  };

  const schemaName = "Typing Speed Test";
  const schemaDesc = `Online Typing Speed Test - free tool`;
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/en/tools/typing-test";
  const breadcrumbItems = [
    { name: "Home", url: "https://adwatak.cloud/en" },
    { name: "Text Tools", url: "https://adwatak.cloud/en/category/calculators" },
    { name: "Typing Speed Test", url: "https://adwatak.cloud/en/tools/typing-test" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Other Tools" categorySlug="daily" toolName="Typing Speed Test" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">⌨️ Typing Speed Test</h1>
        <p className="text-sm text-gray-500 mb-4">Measure your keyboard typing speed in WPM</p>

        {!isRunning && !result && (
          <div className="text-center py-8">
            <button onClick={startTest} className="bg-green-600 text-white font-bold p-4 rounded-xl border-none text-lg cursor-pointer hover:bg-green-700">▶ Start Test (60 seconds)</button>
          </div>
        )}

        {isRunning && (
          <>
            <div className="flex justify-between mb-3">
              <span className="text-lg font-bold text-blue-600">⏱ {timeLeft}s</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl mb-4 text-lg leading-relaxed text-gray-700 whitespace-pre-wrap">
              {sampleText.split("").map((char, i) => {
                let color = "text-gray-400";
                if (i < input.length) color = input[i] === char ? "text-green-600" : "text-red-500 bg-red-100";
                return <span key={i} className={color}>{char}</span>;
              })}
            </div>
            <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
              className="w-full h-[120px] p-4 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit resize-y"
              placeholder="Start typing here..." />
          </>
        )}

        {result && (
          <div className="bg-gray-50 p-6 rounded-xl mt-4 text-center">
            <h3 className="text-lg font-bold mb-4">📊 Your Result</h3>
            <div className="flex justify-center gap-6 mb-4">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-blue-600">{result.wpm}</div>
                <div className="text-sm text-gray-500">WPM</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-green-600">{result.accuracy}%</div>
                <div className="text-sm text-gray-500">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-purple-600">{result.cpm}</div>
                <div className="text-sm text-gray-500">CPM</div>
              </div>
            </div>
            {result.wpm >= 80 && <p className="text-green-600 font-bold">🔥 Excellent! Professional level!</p>}
            {result.wpm >= 60 && result.wpm < 80 && <p className="text-blue-600 font-bold">👍 Very good! Keep practicing.</p>}
            {result.wpm >= 40 && result.wpm < 60 && <p className="text-yellow-600 font-bold">👌 Good — 10 minutes daily will boost your speed.</p>}
            {result.wpm < 40 && <p className="text-gray-600 font-bold">💪 Keep practicing — speed will improve!</p>}
            <button onClick={startTest} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-base cursor-pointer mt-4 hover:bg-blue-700">Try Again</button>
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
