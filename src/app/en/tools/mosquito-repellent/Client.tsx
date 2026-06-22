"use client";
import { useState, useRef, useEffect } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "How does mosquito repellent sound work?", answer: "The 15,000 Hz frequency mimics the wingbeat of male mosquitoes and dragonflies. Since only fertilized female mosquitoes bite (they need blood for eggs), they instinctively flee from these predators and males — making them leave the area." },
  { question: "Is this safe for humans?", answer: "For most adults, 15,000 Hz is barely audible — it's on the edge of human hearing range. However, keep volume below 40% and place the device 2-3 meters away. Prolonged exposure at high volume can cause headaches or tinnitus. Never put it near your ear." },
  { question: "Is this safe for pets?", answer: "NO — cats and dogs have extremely sensitive hearing and hear this frequency much louder than humans. Do NOT use this device in a room with pets. It can cause distress, panic, and potential hearing damage to animals." },
  { question: "How long should I play it?", answer: "15-30 minutes is enough to clear mosquitoes from a room. Run it before sleep, then turn it off. Playing it all night is unnecessary and may strain your phone speaker." },
  { question: "Will it damage my phone speaker?", answer: "Yes, playing a pure sine wave at high volume for hours can overheat the speaker coil. Keep volume at 30-40% max and limit playback to 30 minutes per session. The continuous waveform generates more heat than normal music." },
  { question: "Does it work for all mosquito species?", answer: "It works best against Aedes and Culex species (common house mosquitoes). Effectiveness varies by species and environment. It's a supplementary method — use with nets/repellents for best results." },
  { question: "Does this harm the environment?", answer: "No — it's purely acoustic. No chemicals, no fumes, no residues. Environmentally friendly mosquito control." },
];

const relatedTools = [
  { title: "Qibla Direction", icon: "🕋", href: "/en/tools/qibla-direction" },
  { title: "Tasbeeh Counter", icon: "📿", href: "/en/tools/tasbeeh-counter" },
  { title: "Prayer Times", icon: "🕌", href: "/en/tools/prayer-times" },
];

const seoContent = [
  "Free online mosquito repellent sound tool — uses 15,000 Hz high-frequency sound waves to repel mosquitoes naturally. No chemicals, no apps to install. Works directly in your browser.",
  "The mosquito repellent frequency (15 kHz) uses pure sine wave technology to create an ultrasonic mosquito deterrent. This high-pitch sound is designed to repel mosquitoes by mimicking natural predators.",
  "How to use: Open the tool, press play, set volume to 30-40%, place your device 2-3 meters away, and let it run for 15-30 minutes. The sound loops automatically until you stop it.",
  "Safety first: Keep volume low, protect your pets (don't use in rooms with cats or dogs), and don't play for more than 30 minutes per session to protect your phone speaker.",
  "This electronic mosquito repellent is a chemical-free alternative to sprays and coils. Ideal for bedrooms, offices, camping tents, and outdoor seating areas.",
];

export default function Client() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/mosquito-repellent.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      audioRef.current.play();
      setElapsed(0);
      intervalRef.current = setInterval(() => setElapsed(p => p + 1), 1000);
    }
    setPlaying(!playing);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const schemaName = "Mosquito Repellent Sound";
  const schemaDesc = "Free online mosquito repellent using 15,000 Hz high-frequency sound — chemical-free, browser-based, with safety warnings";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/en/tools/mosquito-repellent";
  const breadcrumbItems = [
    { name: "Home", url: "https://adwatak.cloud/en" },
    { name: "Other Tools", url: "https://adwatak.cloud/en/category/daily" },
    { name: "Mosquito Repellent Sound", url: "https://adwatak.cloud/en/tools/mosquito-repellent" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb lang="en" category="Other Tools" categorySlug="daily" toolName="Mosquito Repellent Sound" />

      {/* Main Player Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold mb-1">🦟 Mosquito Repellent Sound</h1>
          <p className="text-sm text-gray-500 mb-6">15,000 Hz high-frequency mosquito deterrent — plays on repeat</p>
        </div>

        {/* Player Controls */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 mb-6 border border-indigo-100">
          <div className="flex flex-col items-center gap-6">
            {/* Waveform animation */}
            <div className="flex items-end gap-1 h-16">
              {[1,2,3,4,5,6,7,8,7,6,5,4,3,2,1].map((h, i) => (
                <div
                  key={i}
                  className={`w-2 bg-indigo-400 rounded-full transition-all duration-300 ${playing ? "animate-pulse" : "opacity-30"}`}
                  style={{
                    height: `${h * 8}px`,
                    animationDelay: playing ? `${i * 0.08}s` : "0s",
                    animationDuration: "0.8s",
                  }}
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-3xl font-mono font-bold text-indigo-700">
              {playing ? formatTime(elapsed) : "00:00"}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl border-none cursor-pointer shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
                playing ? "bg-red-500 hover:bg-red-600" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {playing ? "■" : "▶"}
            </button>

            {/* Volume */}
            <div className="w-full max-w-xs flex items-center gap-3 text-sm text-gray-500">
              <span>🔈</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <span>🔊</span>
              <span className="text-xs font-mono w-8 text-right">{Math.round(volume * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Safety Warnings */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
          <h2 className="font-bold text-amber-800 mb-3 text-sm flex items-center gap-2">
            ⚠️ Important Safety Warnings
          </h2>
          <ul className="text-sm text-amber-700 space-y-2 list-disc list-inside marker:text-amber-500">
            <li><strong>Keep volume at 30-40% max</strong> — higher volume won't repel more mosquitoes but can harm your hearing</li>
            <li><strong>Keep 2-3 meters away</strong> — don't place near your head or under your pillow</li>
            <li><strong>NOT safe for pets</strong> — do not use in a room with cats or dogs. Their sensitive hearing makes this painful for them</li>
            <li><strong>Limit to 15-30 minutes</strong> — prolonged playback may overheat your phone speaker</li>
            <li><strong>Stop if you feel discomfort</strong> — headaches, ear pressure, or tinnitus are signs to stop immediately</li>
          </ul>
        </div>

        {/* Recommended Usage */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h2 className="font-bold text-blue-800 mb-2 text-sm flex items-center gap-2">
            💡 Recommended Usage
          </h2>
          <p className="text-sm text-blue-700">
            Play at <strong>30% volume</strong>, place phone in a <strong>far corner of the room</strong> before sleep, run for <strong>30 minutes max</strong>, then turn it off and sleep in peace.
          </p>
        </div>
      </div>

      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}
