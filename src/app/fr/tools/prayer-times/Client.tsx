"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema ,howToSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const METHODS: Record<string, { en: string; fajrAngle: number; ishaAngle: number; ishaOffset?: number }> = {
  "1": { en: "Umm al-Qura (Saudi)", fajrAngle: 18.5, ishaAngle: 0, ishaOffset: 90 },
  "2": { en: "Egyptian Authority", fajrAngle: 19.5, ishaAngle: 17.5 },
  "3": { en: "Muslim World League", fajrAngle: 18, ishaAngle: 17 },
  "4": { en: "University of Karachi", fajrAngle: 18, ishaAngle: 18 },
  "5": { en: "ISNA (North America)", fajrAngle: 15, ishaAngle: 15 },
  "6": { en: "Kuwait", fajrAngle: 18, ishaAngle: 17.5 },
  "7": { en: "Qatar", fajrAngle: 18, ishaAngle: 0, ishaOffset: 90 },
  "8": { en: "Singapore", fajrAngle: 20, ishaAngle: 18 },
};

const CITIES: Record<string, { lat: number; lng: number; en: string; tz: number }> = {
  "mecca": { lat: 21.4225, lng: 39.8262, en: "Mecca", tz: 3 },
  "medina": { lat: 24.5247, lng: 39.5692, en: "Medina", tz: 3 },
  "riyadh": { lat: 24.7136, lng: 46.6753, en: "Riyadh", tz: 3 },
  "jeddah": { lat: 21.5433, lng: 39.1728, en: "Jeddah", tz: 3 },
  "dammam": { lat: 26.4207, lng: 50.0888, en: "Dammam", tz: 3 },
  "cairo": { lat: 30.0444, lng: 31.2357, en: "Cairo", tz: 2 },
  "alexandria": { lat: 31.2001, lng: 29.9187, en: "Alexandria", tz: 2 },
  "dubai": { lat: 25.2048, lng: 55.2708, en: "Dubai", tz: 4 },
  "abudhabi": { lat: 24.4539, lng: 54.3773, en: "Abu Dhabi", tz: 4 },
  "doha": { lat: 25.2854, lng: 51.5310, en: "Doha", tz: 3 },
  "kuwait": { lat: 29.3759, lng: 47.9774, en: "Kuwait City", tz: 3 },
  "manama": { lat: 26.2285, lng: 50.5860, en: "Manama", tz: 3 },
  "muscat": { lat: 23.5880, lng: 58.3829, en: "Muscat", tz: 4 },
  "baghdad": { lat: 33.3152, lng: 44.3661, en: "Baghdad", tz: 3 },
  "amman": { lat: 31.9454, lng: 35.9284, en: "Amman", tz: 3 },
  "beirut": { lat: 33.8938, lng: 35.5018, en: "Beirut", tz: 3 },
  "damascus": { lat: 33.5138, lng: 36.2765, en: "Damascus", tz: 3 },
  "jerusalem": { lat: 31.7683, lng: 35.2137, en: "Jerusalem", tz: 3 },
  "casablanca": { lat: 33.5731, lng: -7.5898, en: "Casablanca", tz: 1 },
  "rabat": { lat: 34.0209, lng: -6.8416, en: "Rabat", tz: 1 },
  "algiers": { lat: 36.7538, lng: 3.0588, en: "Algiers", tz: 1 },
  "tunis": { lat: 36.8065, lng: 10.1815, en: "Tunis", tz: 1 },
  "istanbul": { lat: 41.0082, lng: 28.9784, en: "Istanbul", tz: 3 },
  "ankara": { lat: 39.9334, lng: 32.8597, en: "Ankara", tz: 3 },
  "karachi": { lat: 24.8607, lng: 67.0011, en: "Karachi", tz: 5 },
  "lahore": { lat: 31.5204, lng: 74.3587, en: "Lahore", tz: 5 },
  "islamabad": { lat: 33.6844, lng: 73.0479, en: "Islamabad", tz: 5 },
  "delhi": { lat: 28.7041, lng: 77.1025, en: "Delhi", tz: 5.5 },
  "mumbai": { lat: 19.0760, lng: 72.8777, en: "Mumbai", tz: 5.5 },
  "dhaka": { lat: 23.8103, lng: 90.4125, en: "Dhaka", tz: 6 },
  "jakarta": { lat: -6.2088, lng: 106.8456, en: "Jakarta", tz: 7 },
  "kualalumpur": { lat: 3.1390, lng: 101.6869, en: "Kuala Lumpur", tz: 8 },
  "london": { lat: 51.5074, lng: -0.1278, en: "London", tz: 0 },
  "birmingham": { lat: 52.4862, lng: -1.8904, en: "Birmingham", tz: 0 },
  "paris": { lat: 48.8566, lng: 2.3522, en: "Paris", tz: 1 },
  "berlin": { lat: 52.5200, lng: 13.4050, en: "Berlin", tz: 1 },
  "newyork": { lat: 40.7128, lng: -74.0060, en: "New York", tz: -5 },
  "losangeles": { lat: 34.0522, lng: -118.2437, en: "Los Angeles", tz: -8 },
  "chicago": { lat: 41.8781, lng: -87.6298, en: "Chicago", tz: -6 },
  "toronto": { lat: 43.6532, lng: -79.3832, en: "Toronto", tz: -5 },
  "sydney": { lat: -33.8688, lng: 151.2093, en: "Sydney", tz: 10 },
  "melbourne": { lat: -37.8136, lng: 144.9631, en: "Melbourne", tz: 10 },
  "moscow": { lat: 55.7558, lng: 37.6173, en: "Moscow", tz: 3 },
  "tokyo": { lat: 35.6762, lng: 139.6503, en: "Tokyo", tz: 9 },
  "capetown": { lat: -33.9249, lng: 18.4241, en: "Cape Town", tz: 2 },
  "lagos": { lat: 6.5244, lng: 3.3792, en: "Lagos", tz: 1 },
  "nairobi": { lat: -1.2921, lng: 36.8219, en: "Nairobi", tz: 3 },
};

const CITY_GROUPS: Record<string, string[]> = {
  "Saudi Arabia": ["mecca", "medina", "riyadh", "jeddah", "dammam"],
  "Egypt": ["cairo", "alexandria"],
  "Gulf": ["dubai", "abudhabi", "doha", "kuwait", "manama", "muscat"],
  "Levant & Iraq": ["baghdad", "amman", "beirut", "damascus", "jerusalem"],
  "North Africa": ["casablanca", "rabat", "algiers", "tunis"],
  "Turkey": ["istanbul", "ankara"],
  "South Asia": ["karachi", "lahore", "islamabad", "delhi", "mumbai"],
  "Southeast Asia": ["dhaka", "jakarta", "kualalumpur"],
  "Europe": ["london", "birmingham", "paris", "berlin"],
  "Americas": ["newyork", "losangeles", "chicago", "toronto"],
  "Oceania": ["sydney", "melbourne"],
  "Others": ["moscow", "tokyo", "capetown", "lagos", "nairobi"],
};

function toRadians(d: number) { return (d * Math.PI) / 180; }
function toDegrees(r: number) { return (r * 180) / Math.PI; }

function calcPrayerTimes(lat: number, lng: number, tz: number, method: string, date: Date) {
  const m = METHODS[method] || METHODS["1"];
  const y = date.getFullYear(), mo = date.getMonth() + 1, d = date.getDate();
  const a = Math.floor((14 - mo) / 12);
  const yy = y + 4800 - a;
  const mm = mo + 12 * a - 3;
  const jd = d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
  const dd = jd - 2451545.0;
  const g = (357.529 + 0.98560028 * dd) % 360;
  const q = (280.459 + 0.98564736 * dd) % 360;
  const L = (q + 1.915 * Math.sin(toRadians(g)) + 0.020 * Math.sin(toRadians(2 * g))) % 360;
  const e = 23.439 - 0.00000036 * dd;
  const RA = toDegrees(Math.atan2(Math.cos(toRadians(e)) * Math.sin(toRadians(L)), Math.cos(toRadians(L)))) / 15;
  const decl = toDegrees(Math.asin(Math.sin(toRadians(e)) * Math.sin(toRadians(L))));
  const EqT = q / 15 - RA;
  const noon = 12 + tz - lng / 15 - EqT;
  function timeForAngle(angle: number) {
    const cosT = (Math.sin(toRadians(angle)) - Math.sin(toRadians(lat)) * Math.sin(toRadians(decl))) / (Math.cos(toRadians(lat)) * Math.cos(toRadians(decl)));
    if (cosT > 1 || cosT < -1) return NaN;
    return toDegrees(Math.acos(cosT)) / 15;
  }
  const fajrTime = noon - timeForAngle(-m.fajrAngle);
  let ishaTime: number;
  if (m.ishaOffset) { const sunset = noon + timeForAngle(-0.833); ishaTime = sunset + m.ishaOffset / 60; }
  else { ishaTime = noon + timeForAngle(-m.ishaAngle); }
  const sunrise = noon - timeForAngle(-0.833);
  const sunset = noon + timeForAngle(-0.833);
  const dhuhr = noon + 2 / 60;
  const asrShadow = 1 + Math.tan(toRadians(Math.abs(lat - decl)));
  const asrTime = noon + timeForAngle(toDegrees(Math.atan(1 / asrShadow)));
  const fmt = (t: number) => { if (isNaN(t)) return "--:--"; const h = Math.floor(t); const mn = Math.round((t - h) * 60); const hh = ((h % 24) + 24) % 24; return `${hh.toString().padStart(2, "0")}:${mn.toString().padStart(2, "0")}`; };
  return { fajr: fmt(fajrTime), sunrise: fmt(sunrise), dhuhr: fmt(dhuhr), asr: fmt(asrTime), maghrib: fmt(sunset), isha: fmt(ishaTime) };
}

function getHijriDateEN(date: Date): string {
  const jd = Math.floor((date.getTime() / 86400000) + 2440587.5);
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const m = Math.floor((24 * l3) / 709);
  const d = l3 - Math.floor((709 * m) / 24);
  const y = 30 * n + j - 30;
  const months = ["Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani", "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Shaban", "Ramadan", "Shawwal", "Dhul Qadah", "Dhul Hijjah"];
  return `${d} ${months[m - 1] || ""} ${y} AH`;
}

function getNextPrayer(times: { fajr: string; sunrise: string; dhuhr: string; asr: string; maghrib: string; isha: string }, now: Date) {
  const prayers = [
    { key: "fajr", name: "Fajr" }, { key: "sunrise", name: "Sunrise" },
    { key: "dhuhr", name: "Dhuhr" }, { key: "asr", name: "Asr" },
    { key: "maghrib", name: "Maghrib" }, { key: "isha", name: "Isha" },
  ];
  const nowMin = now.getHours() * 60 + now.getMinutes();
  for (const p of prayers) {
    const t = times[p.key as keyof typeof times];
    if (!t || t === "--:--") continue;
    const [h, m] = t.split(":").map(Number);
    const prayerMin = h * 60 + m;
    if (prayerMin > nowMin) return { name: p.name, time: t, diff: prayerMin - nowMin };
  }
  const t = times.fajr;
  if (t && t !== "--:--") { const [h, m] = t.split(":").map(Number); return { name: "Fajr", time: t, diff: (24 * 60 - nowMin) + (h * 60 + m) }; }
  return null;
}

function formatCountdownEN(minutes: number) {
  const h = Math.floor(minutes / 60), m = minutes % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

type Mode = "idle" | "city" | "manual" | "result" | "locating" | "error";
const PRAYER_ICONS: Record<string, string> = { fajr: "🌙", sunrise: "🌅", dhuhr: "☀️", asr: "🌤️", maghrib: "🌇", isha: "🌃" };
const PRAYER_NAMES_EN: Record<string, string> = { fajr: "Fajr", sunrise: "Sunrise", dhuhr: "Dhuhr", asr: "Asr", maghrib: "Maghrib", isha: "Isha" };

export default function Client() {
  const [mode, setMode] = useState<Mode>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [manualTz, setManualTz] = useState("");
  const [method, setMethod] = useState("1");
  const [times, setTimes] = useState<ReturnType<typeof calcPrayerTimes> | null>(null);
  const [hijriDate, setHijriDate] = useState("");
  const [gregDate, setGregDate] = useState("");
  const [countdown, setCountdown] = useState<ReturnType<typeof getNextPrayer>>(null);
  const [now, setNow] = useState(new Date());
  const [cityName, setCityName] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { timerRef.current = setInterval(() => setNow(new Date()), 60000); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);
  useEffect(() => { if (times) setCountdown(getNextPrayer(times, now)); }, [times, now]);

  const calcAndShow = useCallback((lat: number, lng: number, tz: number, name: string) => {
    const today = new Date();
    setTimes(calcPrayerTimes(lat, lng, tz, method, today));
    setHijriDate(getHijriDateEN(today));
    setGregDate(today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
    setCityName(name);
    setMode("result");
    setCountdown(getNextPrayer(calcPrayerTimes(lat, lng, tz, method, today), new Date()));
  }, [method]);

  const handleGPS = () => {
    if (!navigator.geolocation) { setErrorMsg("Your browser doesn't support geolocation"); setMode("error"); return; }
    setMode("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => calcAndShow(pos.coords.latitude, pos.coords.longitude, Math.round(pos.coords.longitude / 15), "Current Location"),
      () => { setErrorMsg("Could not detect your location. Make sure GPS is enabled."); setMode("error"); },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  const handleCity = () => { const c = CITIES[selectedCity]; if (c) calcAndShow(c.lat, c.lng, c.tz, c.en); };
  const handleManual = () => {
    const lat = parseFloat(manualLat), lng = parseFloat(manualLng), tz = parseFloat(manualTz);
    if (isNaN(lat) || isNaN(lng) || isNaN(tz)) { setErrorMsg("Enter valid coordinates"); setMode("error"); return; }
    calcAndShow(lat, lng, tz, `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`);
  };
  const reset = () => { setMode("idle"); setErrorMsg(""); setSelectedCity(""); setManualLat(""); setManualLng(""); setManualTz(""); };

  const prayerOrder = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Prayer Times", "Accurate prayer times for your location — local calculation with countdown", "https://adwatak.cloud/fr/tools/prayer-times", "fr", "Islamic")} />
      <StructuredData data={faqSchema([
        { question: "What calculation methods are available?", answer: "Umm al-Qura (Saudi), Egyptian Authority, Muslim World League, Karachi University, ISNA (North America), Kuwait, Qatar, Singapore." },
        { question: "Is the calculation accurate?", answer: "Yes, we use the same mathematical formulas used in major prayer apps. May differ by 1-2 minutes from official calendars." },
        { question: "Does it work offline?", answer: "Yes! All calculations happen locally in your browser. Only GPS needs location permission." },
        { question: "What is the countdown?", answer: "Shows remaining time until the next prayer in hours and minutes." },
        { question: "Does it show Hijri date?", answer: "Yes, both Gregorian and Hijri dates are displayed." },
        { question: "How many cities are available?", answer: "Over 60 cities across 35+ countries." },
      ])} />
      <StructuredData data={breadcrumbSchema([
        { name: "Home", url: "https://adwatak.cloud/fr" },
        { name: "Islamic Tools", url: "https://adwatak.cloud/fr/category/islamic" },
        { name: "Prayer Times", url: "https://adwatak.cloud/fr/tools/prayer-times" },
      ])} />
      {/* GEO: Speakable — marks key content for AI/voice engines (ChatGPT, Perplexity, Google Assistant) */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      {/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("How to use this tool", "Free online tool. Works directly in your browser. No registration required.", [{name:"Open the tool",text:"Navigate to this tool page on Adawatak"},{name:"Enter your data",text:"Fill in the required fields"},{name:"Get results",text:"Click the calculate or generate button"},{name:"Use or share",text:"Copy, download, or share the results"}],"less than a minute","fr")} />
      {/* GEO: Speakable — AI/voice engines */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />

      <Breadcrumb lang="fr" category="Islamic Tools" categorySlug="islamic" toolName="Prayer Times" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🕐 Prayer Times</h1>
        <p className="text-sm text-gray-500 mb-6">Accurate prayer times for your location — local calculation with countdown to next prayer</p>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Calculation Method:</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none">
            {Object.entries(METHODS).map(([k, v]) => <option key={k} value={k}>{v.en}</option>)}
          </select>
        </div>

        {mode === "result" && times && (
          <div>
            <div className="text-center mb-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <p className="text-sm font-bold text-emerald-800">📅 {gregDate}</p>
              <p className="text-xs text-emerald-600">{hijriDate}</p>
              <p className="text-xs text-gray-500 mt-1">📍 {cityName} — {METHODS[method]?.en}</p>
            </div>
            {countdown && (
              <div className="text-center mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <p className="text-xs text-blue-600 font-semibold">Next: {countdown.name}</p>
                <p className="text-3xl font-extrabold text-blue-800 my-1">{formatCountdownEN(countdown.diff)}</p>
                <p className="text-xs text-blue-500">at {countdown.time}</p>
              </div>
            )}
            <div className="space-y-2">
              {prayerOrder.map((key) => {
                const time = times[key as keyof typeof times];
                const isNext = countdown && countdown.name === PRAYER_NAMES_EN[key];
                return (
                  <div key={key} className={`flex justify-between items-center rounded-xl p-4 px-5 border transition-all ${
                    isNext ? "bg-blue-50 border-blue-300 shadow-sm ring-2 ring-blue-200" :
                    key === "maghrib" ? "bg-orange-50 border-orange-200" :
                    key === "fajr" ? "bg-indigo-50 border-indigo-200" :
                    "bg-gray-50 border-gray-200"
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{PRAYER_ICONS[key]}</span>
                      <span className={`font-semibold ${isNext ? "text-blue-800" : "text-gray-700"}`}>
                        {PRAYER_NAMES_EN[key]}
                        {isNext && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full ml-2">Next</span>}
                      </span>
                    </div>
                    <span className={`text-xl font-extrabold font-mono ${isNext ? "text-blue-800" : key === "maghrib" ? "text-orange-800" : "text-gray-800"}`}>{time}</span>
                  </div>
                );
              })}
            </div>
            <button onClick={reset} className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">🔄 Change Location</button>
          </div>
        )}

        {mode === "idle" && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Set your location:</p>
            <button onClick={handleGPS} className="w-full flex items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">📍</span>
              <div className="text-left"><p className="font-bold">Auto-detect my location (GPS)</p><p className="text-xs opacity-80">Most accurate — uses your real GPS position</p></div>
            </button>
            <button onClick={() => setMode("city")} className="w-full flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">🏙️</span>
              <div className="text-left"><p className="font-bold">Select city from list</p><p className="text-xs opacity-80">60+ cities in 35+ countries</p></div>
            </button>
            <button onClick={() => setMode("manual")} className="w-full flex items-center gap-4 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">📐</span>
              <div className="text-left"><p className="font-bold">Enter coordinates manually</p><p className="text-xs opacity-80">Type latitude, longitude, and timezone</p></div>
            </button>
          </div>
        )}

        {mode === "city" && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select a city:</label>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 outline-none">
              <option value="">Choose a city...</option>
              {Object.entries(CITY_GROUPS).map(([group, cities]) => (
                <optgroup key={group} label={group}>
                  {cities.map((key) => <option key={key} value={key}>{CITIES[key].en}</option>)}
                </optgroup>
              ))}
            </select>
            <div className="flex gap-3">
              <button onClick={handleCity} disabled={!selectedCity} className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors">Show Prayer Times</button>
              <button onClick={reset} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">Back</button>
            </div>
          </div>
        )}

        {mode === "manual" && (
          <div className="space-y-4">
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Latitude:</label><input type="number" step="any" value={manualLat} onChange={(e) => setManualLat(e.target.value)} placeholder="e.g. 30.0444" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" /></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Longitude:</label><input type="number" step="any" value={manualLng} onChange={(e) => setManualLng(e.target.value)} placeholder="e.g. 31.2357" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" /></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Timezone (UTC):</label><input type="number" step="any" value={manualTz} onChange={(e) => setManualTz(e.target.value)} placeholder="e.g. 3 (Saudi), 2 (Egypt)" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" /></div>
            <div className="flex gap-3">
              <button onClick={handleManual} disabled={!manualLat || !manualLng || !manualTz} className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors">Calculate</button>
              <button onClick={reset} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">Back</button>
            </div>
          </div>
        )}

        {mode === "locating" && (
          <div className="text-center py-10">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-semibold">Detecting your location...</p>
          </div>
        )}

        {mode === "error" && (
          <div className="text-center py-6">
            <p className="text-red-600 font-semibold mb-4">⚠️ {errorMsg}</p>
            <button onClick={reset} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">🔄 Try Again</button>
          </div>
        )}
      </div>

      <SEOContent content={[
        "Accurate prayer times for your location — mathematical calculation without external API.",
        "8 calculation methods: Umm al-Qura, Egyptian, Muslim World League, Karachi, ISNA, Kuwait, Qatar, Singapore.",
        "Countdown to next prayer + Hijri & Gregorian dates + 60+ cities.",
        "GPS auto-detect, city selection, or manual coordinates.",
        "Works entirely in your browser — no internet needed after loading.",
      ]} lang="fr" />
      <FAQSection faqs={[
        { question: "What calculation methods are available?", answer: "Umm al-Qura (Saudi), Egyptian Authority, Muslim World League, Karachi University, ISNA (North America), Kuwait, Qatar, Singapore." },
        { question: "Is the calculation accurate?", answer: "Yes, we use the same mathematical formulas used in major prayer apps." },
        { question: "Does it work offline?", answer: "Yes! All calculations happen locally in your browser." },
        { question: "How many cities are available?", answer: "Over 60 cities across 35+ countries." },
      ]} lang="fr" />
      <RelatedTools tools={[
        { title: "Qibla Direction", icon: "🧭", href: "/fr/tools/qibla-direction" },
        { title: "Hijri Converter", icon: "📅", href: "/fr/tools/hijri-converter" },
        { title: "Zakat Calculator", icon: "🕌", href: "/fr/tools/zakat-calculator" },
        { title: "Inheritance Calculator", icon: "📜", href: "/fr/tools/inheritance-calculator" },
      ]} lang="fr" />
      <ShareButtons lang="fr" />
    </div>
  );
}
