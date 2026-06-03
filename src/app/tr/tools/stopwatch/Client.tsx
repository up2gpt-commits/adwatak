"use client";
import { useState, useRef } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "What is a stopwatch?", answer: "A timer that measures elapsed time with start, stop, and reset controls. Our stopwatch displays hours, minutes, seconds, and milliseconds. Use for workouts, cooking, productivity (Pomodoro), timing experiments, and event timing." },
  { question: "How accurate is the browser stopwatch?", answer: "Browser timers are accurate to ~4ms but can drift during heavy CPU load. For casual timing (cooking, workouts, productivity), it's excellent. For scientific timing (race results, lab experiments), use a dedicated stopwatch." },
  { question: "What is lap time?", answer: "Lap/split time records the time of each segment without stopping the main timer. Track lap 1 (0:15.2), lap 2 (0:14.8), lap 3 (0:16.1), etc. Our stopwatch supports lap recording for interval training and event timing." },
  { question: "Stopwatch vs countdown timer?", answer: "Stopwatch: counts up from zero. Timer: counts down from a set time. Stopwatch measures elapsed time. Timer alerts when time is up. Both are useful — use stopwatch for 'how long', timer for 'when to stop'." },
  { question: "What is the Pomodoro Technique?", answer: "25 minutes work, 5 minutes break. Repeat 4×, then 15-30 min break. Use a stopwatch for the work timer and break timer. Popular productivity method by Francesco Cirillo. Our stopwatch tracks your Pomodoro sessions." },
  { question: "Can I use stopwatch for workouts?", answer: "Yes — track rest between sets (60-90 sec for hypertrophy, 3-5 min for strength), measure circuit duration, record cardio intervals (30 sec sprint, 90 sec recovery), and log total workout time. Lap feature tracks each exercise." },
  { question: "What's the maximum time on a stopwatch?", answer: "Our stopwatch: 99 hours, 59 minutes, 59 seconds (about 4 days). Browser-based stopwatches can technically run for days. For longer durations, use a calendar or dedicated timer app." },
  { question: "Does the stopwatch keep running if I close the tab?", answer: "No — browser timers stop when the tab is closed or the device sleeps. The timer uses JavaScript's setInterval which requires the page to be active. For background timing, use a mobile stopwatch app or dedicated timer." },
  { question: "Stopwatch vs interval timer?", answer: "Stopwatch: single elapsed time measurement. Interval timer: alternates between work/rest periods automatically. For HIIT workouts, use an interval timer app. For general timing, our stopwatch with lap feature works well." },
  { question: "How to use stopwatch for productivity?", answer: "Track time spent on tasks: start when you begin, stop when you finish. Record each task's duration. Review at end of day — see where time actually goes. 'Time blocking': assign stopwatch to each block." },
  { question: "What is split timing?", answer: "Record time at intermediate points while the main timer continues running. Race marathons: split at each mile. Meetings: split at each agenda item. Our lap button records splits without resetting the overall time." },
  { question: "Can I share my stopwatch results?", answer: "Our stopwatch results display on screen for viewing. You can take a screenshot or manually record times. Stopwatch data is local — no server upload. Great for classroom demonstrations and live event timing." },
];

const relatedTools = [
  { title: "Age Calculator", icon: "🎂", href: "/en/tools/age-calculator" },
  { title: "Random Number", icon: "🎲", href: "/en/tools/random-number" },
  { title: "Word Counter", icon: "📝", href: "/en/tools/word-counter" },
  { title: "Calorie Calculator", icon: "🔥", href: "/en/tools/calorie-calculator" },
  { title: "BMI Calculator", icon: "⚖️", href: "/en/tools/bmi-calculator" },
  { title: "QR Generator", icon: "📱", href: "/en/tools/qr-generator" },
];

const seoContent = [
  "Our free online Stopwatch measures elapsed time with millisecond precision. Start, stop, lap, and reset — all with clean, intuitive controls. Perfect for workouts, cooking, productivity tracking, classroom timing, and any activity that needs precise time measurement.",
  "Features: (1) Large display showing hours:minutes:seconds.milliseconds. (2) Start/Stop toggle button. (3) Lap recording — track segments without resetting. (4) Reset to zero. (5) Works on any device with a browser — no app install needed.",
  "How to use: Click Start to begin timing. Click Lap to record a split time (use for interval training, podcast segments, meeting agenda items). Click Stop to pause. Click Reset to clear. Lap times accumulate below the main display for review.",
  "Productivity tip: Use the stopwatch for time tracking — start at the beginning of each task, record duration, and review patterns. Combine with the Pomodoro Technique: 25 min focus → record lap → 5 min break. Repeat 4×, then longer break.",
  "Related: Pair with our Age Calculator for milestone timing. The Random Number Generator for random interval generation. Our Calorie Calculator for workout calorie estimation. The BMI Calculator for fitness progress tracking.",
  "Simple, fast, and free — no ads, no signup, no tracking. The stopwatch runs entirely in your browser. Click Start and go."
];

export default function Client() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const format = (ms: number) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const ml = ms % 1000;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${Math.floor(ml / 10).toString().padStart(2, "0")}`;
  };

  const start = () => {
    if (running) return;
    setRunning(true);
    const startTime = Date.now() - time;
    intervalRef.current = setInterval(() => setTime(Date.now() - startTime), 10);
  };

  const stop = () => {
    if (!running) return;
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const lap = () => {
    if (running) setLaps(prev => [format(time), ...prev]);
  };

  const reset = () => {
    stop();
    setTime(0);
    setLaps([]);
  };

  const schemaName = "⏱ Stopwatch";
const schemaDesc = `Online ⏱ Stopwatch - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/stopwatch";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Other Tools", url: "https://adwatak.cloud/en/category/calculators" },
  { name: "⏱ Stopwatch", url: "https://adwatak.cloud/en/tools/stopwatch" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — yapay zeka/ses motorları için işaretli içerik */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb category="Other Tools" categorySlug="utility-tools" toolName="Stopwatch" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6 text-center">
        <h1 className="text-2xl font-extrabold mb-1">⏱️ Stopwatch</h1>
        <p className="text-sm text-gray-500 mb-6">Simple, precise stopwatch with lap recording</p>
        <div className="text-5xl font-mono font-bold text-gray-900 mb-8 py-4 bg-gray-50 rounded-xl">{format(time)}</div>
        <div className="flex gap-3 justify-center">
          <button onClick={running ? stop : start} className={`text-white font-bold px-6 py-3 rounded-xl border-none text-lg cursor-pointer ${running ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}>{running ? "■ Stop" : "▶ Start"}</button>
          <button onClick={lap} disabled={!running} className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl border-none text-lg disabled:opacity-30 cursor-pointer">⏱️ Lap</button>
          <button onClick={reset} className="bg-gray-500 text-white font-bold px-6 py-3 rounded-xl border-none text-lg cursor-pointer">↺ Reset</button>
        </div>
      </div>
      {laps.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mb-6">
          <h3 className="font-bold mb-2">Lap Times</h3>
          {laps.map((l, i) => (
            <div key={i} className="flex justify-between py-1.5 border-b border-gray-100 last:border-0 text-sm">
              <span className="text-gray-500">Lap {laps.length - i}</span>
              <span className="font-mono">{l}</span>
            </div>
          ))}
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    <ShareButtons lang="en" />
    </div>
  );
}
