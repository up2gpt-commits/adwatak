"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema ,howToSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

const CITIES: Record<string, { lat: number; lng: number; en: string }> = {
  "mecca-sa": { lat: 21.4225, lng: 39.8262, en: "Mecca, Saudi Arabia" },
  "medina-sa": { lat: 24.5247, lng: 39.5692, en: "Medina, Saudi Arabia" },
  "riyadh-sa": { lat: 24.7136, lng: 46.6753, en: "Riyadh, Saudi Arabia" },
  "jeddah-sa": { lat: 21.5433, lng: 39.1728, en: "Jeddah, Saudi Arabia" },
  "dammam-sa": { lat: 26.4207, lng: 50.0888, en: "Dammam, Saudi Arabia" },
  "cairo-eg": { lat: 30.0444, lng: 31.2357, en: "Cairo, Egypt" },
  "alexandria-eg": { lat: 31.2001, lng: 29.9187, en: "Alexandria, Egypt" },
  "dubai-ae": { lat: 25.2048, lng: 55.2708, en: "Dubai, UAE" },
  "abudhabi-ae": { lat: 24.4539, lng: 54.3773, en: "Abu Dhabi, UAE" },
  "doha-qa": { lat: 25.2854, lng: 51.5310, en: "Doha, Qatar" },
  "kuwait-kw": { lat: 29.3759, lng: 47.9774, en: "Kuwait City, Kuwait" },
  "manama-bh": { lat: 26.2285, lng: 50.5860, en: "Manama, Bahrain" },
  "muscat-om": { lat: 23.5880, lng: 58.3829, en: "Muscat, Oman" },
  "baghdad-iq": { lat: 33.3152, lng: 44.3661, en: "Baghdad, Iraq" },
  "amman-jo": { lat: 31.9454, lng: 35.9284, en: "Amman, Jordan" },
  "beirut-lb": { lat: 33.8938, lng: 35.5018, en: "Beirut, Lebanon" },
  "damascus-sy": { lat: 33.5138, lng: 36.2765, en: "Damascus, Syria" },
  "jerusalem-ps": { lat: 31.7683, lng: 35.2137, en: "Jerusalem, Palestine" },
  "casablanca-ma": { lat: 33.5731, lng: -7.5898, en: "Casablanca, Morocco" },
  "rabat-ma": { lat: 34.0209, lng: -6.8416, en: "Rabat, Morocco" },
  "algiers-dz": { lat: 36.7538, lng: 3.0588, en: "Algiers, Algeria" },
  "tunis-tn": { lat: 36.8065, lng: 10.1815, en: "Tunis, Tunisia" },
  "istanbul-tr": { lat: 41.0082, lng: 28.9784, en: "Istanbul, Turkey" },
  "ankara-tr": { lat: 39.9334, lng: 32.8597, en: "Ankara, Turkey" },
  "karachi-pk": { lat: 24.8607, lng: 67.0011, en: "Karachi, Pakistan" },
  "lahore-pk": { lat: 31.5204, lng: 74.3587, en: "Lahore, Pakistan" },
  "islamabad-pk": { lat: 33.6844, lng: 73.0479, en: "Islamabad, Pakistan" },
  "delhi-in": { lat: 28.7041, lng: 77.1025, en: "Delhi, India" },
  "mumbai-in": { lat: 19.0760, lng: 72.8777, en: "Mumbai, India" },
  "dhaka-bd": { lat: 23.8103, lng: 90.4125, en: "Dhaka, Bangladesh" },
  "jakarta-id": { lat: -6.2088, lng: 106.8456, en: "Jakarta, Indonesia" },
  "kualalumpur-my": { lat: 3.1390, lng: 101.6869, en: "Kuala Lumpur, Malaysia" },
  "london-gb": { lat: 51.5074, lng: -0.1278, en: "London, UK" },
  "birmingham-gb": { lat: 52.4862, lng: -1.8904, en: "Birmingham, UK" },
  "manchester-gb": { lat: 53.4808, lng: -2.2426, en: "Manchester, UK" },
  "paris-fr": { lat: 48.8566, lng: 2.3522, en: "Paris, France" },
  "berlin-de": { lat: 52.5200, lng: 13.4050, en: "Berlin, Germany" },
  "newyork-us": { lat: 40.7128, lng: -74.0060, en: "New York, USA" },
  "losangeles-us": { lat: 34.0522, lng: -118.2437, en: "Los Angeles, USA" },
  "chicago-us": { lat: 41.8781, lng: -87.6298, en: "Chicago, USA" },
  "toronto-ca": { lat: 43.6532, lng: -79.3832, en: "Toronto, Canada" },
  "sydney-au": { lat: -33.8688, lng: 151.2093, en: "Sydney, Australia" },
  "melbourne-au": { lat: -37.8136, lng: 144.9631, en: "Melbourne, Australia" },
  "moscow-ru": { lat: 55.7558, lng: 37.6173, en: "Moscow, Russia" },
  "beijing-cn": { lat: 39.9042, lng: 116.4074, en: "Beijing, China" },
  "tokyo-jp": { lat: 35.6762, lng: 139.6503, en: "Tokyo, Japan" },
  "capetown-za": { lat: -33.9249, lng: 18.4241, en: "Cape Town, South Africa" },
  "lagos-ng": { lat: 6.5244, lng: 3.3792, en: "Lagos, Nigeria" },
  "nairobi-ke": { lat: -1.2921, lng: 36.8219, en: "Nairobi, Kenya" },
};

const CITY_GROUPS: Record<string, string[]> = {
  "Middle East": ["mecca-sa", "medina-sa", "riyadh-sa", "jeddah-sa", "dammam-sa", "dubai-ae", "abudhabi-ae", "doha-qa", "kuwait-kw", "manama-bh", "muscat-om", "baghdad-iq", "amman-jo", "beirut-lb", "damascus-sy", "jerusalem-ps"],
  "North Africa": ["cairo-eg", "alexandria-eg", "casablanca-ma", "rabat-ma", "algiers-dz", "tunis-tn"],
  "Turkey & Central Asia": ["istanbul-tr", "ankara-tr"],
  "South Asia": ["karachi-pk", "lahore-pk", "islamabad-pk", "delhi-in", "mumbai-in", "dhaka-bd"],
  "Southeast Asia": ["jakarta-id", "kualalumpur-my"],
  "Europe": ["london-gb", "birmingham-gb", "manchester-gb", "paris-fr", "berlin-de"],
  "Americas": ["newyork-us", "losangeles-us", "chicago-us", "toronto-ca"],
  "Oceania": ["sydney-au", "melbourne-au"],
  "Others": ["moscow-ru", "beijing-cn", "tokyo-jp", "capetown-za", "lagos-ng", "nairobi-ke"],
};

function calcQiblaBearing(lat: number, lng: number): number {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  const kaabaLatRad = (KAABA_LAT * Math.PI) / 180;
  const kaabaLngRad = (KAABA_LNG * Math.PI) / 180;
  const dLng = kaabaLngRad - lngRad;
  const y = Math.sin(dLng) * Math.cos(kaabaLatRad);
  const x = Math.cos(latRad) * Math.sin(kaabaLatRad) - Math.sin(latRad) * Math.cos(kaabaLatRad) * Math.cos(dLng);
  let bearing = Math.atan2(y, x) * (180 / Math.PI);
  return (bearing + 360) % 360;
}

function calcDistance(lat: number, lng: number): number {
  const R = 6371;
  const dLat = ((KAABA_LAT - lat) * Math.PI) / 180;
  const dLng = ((KAABA_LNG - lng) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat * Math.PI) / 180) * Math.cos((KAABA_LAT * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function bearingToDirection(bearing: number): string {
  if (bearing >= 337.5 || bearing < 22.5) return "North";
  if (bearing < 67.5) return "Northeast";
  if (bearing < 112.5) return "East";
  if (bearing < 157.5) return "Southeast";
  if (bearing < 202.5) return "South";
  if (bearing < 247.5) return "Southwest";
  if (bearing < 292.5) return "West";
  return "Northwest";
}

function bearingToRelative(bearing: number, heading: number): string {
  let rel = ((bearing - heading) + 360) % 360;
  if (rel >= 337.5 || rel < 22.5) return "Straight ahead";
  if (rel < 67.5) return "Ahead to your right";
  if (rel < 112.5) return "To your right";
  if (rel < 157.5) return "Behind to your right";
  if (rel < 202.5) return "Behind you";
  if (rel < 247.5) return "Behind to your left";
  if (rel < 292.5) return "To your left";
  return "Ahead to your left";
}

function Compass({ bearing, deviceHeading, direction }: { bearing: number; deviceHeading: number; direction: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = 280;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2, cy = size / 2, r = 110;
    ctx.clearRect(0, 0, size, size);

    ctx.beginPath(); ctx.arc(cx, cy, r + 10, 0, Math.PI * 2);
    ctx.fillStyle = "#f8fafc"; ctx.fill();
    ctx.strokeStyle = "#e2e8f0"; ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "#cbd5e1"; ctx.lineWidth = 3; ctx.stroke();

    for (let i = 0; i < 360; i += 10) {
      const angle = ((i - 90) * Math.PI) / 180;
      const inner = i % 30 === 0 ? r - 18 : r - 10;
      ctx.beginPath();
      ctx.moveTo(cx + inner * Math.cos(angle), cy + inner * Math.sin(angle));
      ctx.lineTo(cx + (r - 4) * Math.cos(angle), cy + (r - 4) * Math.sin(angle));
      ctx.strokeStyle = i % 90 === 0 ? "#334155" : "#94a3b8";
      ctx.lineWidth = i % 30 === 0 ? 2 : 1;
      ctx.stroke();
      if (i % 30 === 0) {
        const lr = r - 30;
        const labels: Record<number, string> = { 0: "N", 90: "E", 180: "S", 270: "W" };
        ctx.fillStyle = "#334155"; ctx.font = "bold 14px sans-serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(labels[i] || i.toString(), cx + lr * Math.cos(angle), cy + lr * Math.sin(angle));
      }
    }

    const qa = ((bearing - 90) * Math.PI) / 180;
    ctx.save(); ctx.translate(cx, cy);
    ctx.beginPath();
    ctx.moveTo(0, r - 25); ctx.lineTo(-8, 0); ctx.lineTo(0, -r + 30); ctx.lineTo(8, 0);
    ctx.closePath(); ctx.fillStyle = "#dc2626"; ctx.fill();
    ctx.strokeStyle = "#991b1b"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#dc2626"; ctx.fill(); ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();

    if (deviceHeading >= 0) {
      const ha = ((deviceHeading - 90) * Math.PI) / 180;
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + (r - 5) * Math.cos(ha), cy + (r - 5) * Math.sin(ha));
      ctx.strokeStyle = "#3b82f6"; ctx.lineWidth = 3; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx + (r - 5) * Math.cos(ha), cy + (r - 5) * Math.sin(ha), 5, 0, Math.PI * 2);
      ctx.fillStyle = "#3b82f6"; ctx.fill();
    }

    ctx.fillStyle = "#1e293b"; ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("Qibla", cx, cy - 12);
    ctx.font = "11px sans-serif"; ctx.fillStyle = "#64748b";
    ctx.fillText(`${bearing.toFixed(1)}°`, cx, cy + 12);
  }, [bearing, deviceHeading]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className="max-w-full" style={{ width: 280, height: 280 }} />
      <div className="mt-3 text-center">
        <span className="inline-block bg-red-100 text-red-800 font-bold px-4 py-2 rounded-full text-sm">
          🧭 Qibla: {direction} ({bearing.toFixed(1)}°)
        </span>
      </div>
    </div>
  );
}

type Mode = "idle" | "gps" | "city" | "manual" | "result" | "locating" | "error";

export default function Client() {
  const [mode, setMode] = useState<Mode>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);
  const [bearing, setBearing] = useState(0);
  const [distance, setDistance] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [deviceHeading, setDeviceHeading] = useState(-1);

  const direction = bearingToDirection(bearing);
  const relDir = deviceHeading >= 0 ? bearingToRelative(bearing, deviceHeading) : null;

  useEffect(() => {
    const handler = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) { setDeviceHeading(360 - e.alpha); }
    };
    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, []);

  const showResult = useCallback((lat: number, lng: number) => {
    setUserLat(lat); setUserLng(lng);
    setBearing(calcQiblaBearing(lat, lng));
    setDistance(calcDistance(lat, lng));
    setMode("result");
  }, []);

  const handleGPS = () => {
    if (!navigator.geolocation) { setErrorMsg("Your browser doesn't support geolocation"); setMode("error"); return; }
    setMode("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => showResult(pos.coords.latitude, pos.coords.longitude),
      (err) => {
        setErrorMsg(err.code === 1 ? "Location permission denied. Please allow access and try again." : "Could not determine your location. Make sure GPS is enabled.");
        setMode("error");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleCity = () => {
    const city = CITIES[selectedCity];
    if (city) showResult(city.lat, city.lng);
  };

  const handleManual = () => {
    const lat = parseFloat(manualLat), lng = parseFloat(manualLng);
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setErrorMsg("Invalid coordinates. Latitude: -90 to 90, Longitude: -180 to 180"); setMode("error"); return;
    }
    showResult(lat, lng);
  };

  const reset = () => { setMode("idle"); setErrorMsg(""); setSelectedCity(""); setManualLat(""); setManualLng(""); };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Qibla Direction", "Find the Qibla direction (Kaaba) from anywhere in the world — interactive compass with precise calculation", "https://adwatak.cloud/en/tools/qibla-direction", "en", "Islamic")} />
      <StructuredData data={faqSchema([
        { question: "What is the Qibla?", answer: "The Qibla is the direction of the Kaaba in Mecca, Saudi Arabia (21.4225°N, 39.8262°E). Muslims face this direction during prayer." },
        { question: "Does the Qibla direction change based on location?", answer: "Yes! The exact bearing varies depending on where you are. In Egypt it's roughly east, in the US it's northeast, in Europe it's southeast." },
        { question: "How is the Qibla calculated?", answer: "Using the Haversine formula to calculate the great-circle bearing between your location and the Kaaba on Earth's surface." },
        { question: "Do I need to be perfectly accurate?", answer: "The Islamic requirement is the general direction, not an exact degree. The Prophet ﷺ said: 'Between the east and west is a Qibla.'" },
        { question: "Can I use this without GPS?", answer: "Yes! You can select your city from the list or enter coordinates manually." },
        { question: "How many cities are available?", answer: "Over 50 cities across 35+ countries including Saudi Arabia, Egypt, UAE, Turkey, Pakistan, USA, UK, and more." },
        { question: "Is this tool free?", answer: "Yes, completely free and runs entirely in your browser — no data is sent to any server." },
        { question: "How do I find Qibla in a new place?", answer: "Open the tool and click 'Detect My Location' or select your city from the list." },
      ])} />
      <StructuredData data={breadcrumbSchema([
        { name: "Home", url: "https://adwatak.cloud/en" },
        { name: "Islamic Tools", url: "https://adwatak.cloud/en/category/islamic" },
        { name: "Qibla Direction", url: "https://adwatak.cloud/en/tools/qibla-direction" },
      ])} />
      {/* GEO: Speakable — marks key content for AI/voice engines (ChatGPT, Perplexity, Google Assistant) */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      {/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("How to use this tool", "Free online tool. Works directly in your browser. No registration required.", [{name:"Open the tool",text:"Navigate to this tool page on Adawatak"},{name:"Enter your data",text:"Fill in the required fields"},{name:"Get results",text:"Click the calculate or generate button"},{name:"Use or share",text:"Copy, download, or share the results"}],"less than a minute","en")} />
      {/* GEO: Speakable — AI/voice engines */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />

      <Breadcrumb lang="en" category="Islamic Tools" categorySlug="islamic" toolName="Qibla Direction" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🧭 Qibla Direction</h1>
        <p className="text-sm text-gray-500 mb-6">Find the Qibla direction from anywhere in the world — precise Haversine calculation</p>

        {mode === "result" && (
          <div className="text-center">
            <Compass bearing={bearing} deviceHeading={deviceHeading} direction={direction} />
            <div className="mt-6 grid grid-cols-2 gap-3 max-w-sm mx-auto">
              <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                <p className="text-xs text-green-600 font-semibold">Direction</p>
                <p className="text-lg font-extrabold text-green-800">{direction}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-xs text-blue-600 font-semibold">Bearing</p>
                <p className="text-lg font-extrabold text-blue-800">{bearing.toFixed(1)}°</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
                <p className="text-xs text-purple-600 font-semibold">Distance to Kaaba</p>
                <p className="text-lg font-extrabold text-purple-800">{distance.toLocaleString()} km</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs text-amber-600 font-semibold">Coordinates</p>
                <p className="text-sm font-bold text-amber-800">{userLat.toFixed(4)}°, {userLng.toFixed(4)}°</p>
              </div>
            </div>
            {relDir && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 max-w-sm mx-auto">
                <p className="text-sm font-bold text-red-800">📍 Qibla is {relDir} — point your device forward and follow the red arrow</p>
              </div>
            )}
            <button onClick={reset} className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">🔄 Find another location</button>
          </div>
        )}

        {mode === "idle" && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Choose how to set your location:</p>
            <button onClick={handleGPS} className="w-full flex items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">📍</span>
              <div className="text-left"><p className="font-bold">Auto-detect my location (GPS)</p><p className="text-xs opacity-80">Most accurate — uses your real GPS position</p></div>
            </button>
            <button onClick={() => setMode("city")} className="w-full flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">🏙️</span>
              <div className="text-left"><p className="font-bold">Select city from list</p><p className="text-xs opacity-80">50+ cities in 35+ countries</p></div>
            </button>
            <button onClick={() => setMode("manual")} className="w-full flex items-center gap-4 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">📐</span>
              <div className="text-left"><p className="font-bold">Enter coordinates manually</p><p className="text-xs opacity-80">Type latitude and longitude yourself</p></div>
            </button>
          </div>
        )}

        {mode === "city" && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select a city:</label>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
              <option value="">Choose a city...</option>
              {Object.entries(CITY_GROUPS).map(([group, cities]) => (
                <optgroup key={group} label={group}>
                  {cities.map((key) => <option key={key} value={key}>{CITIES[key].en}</option>)}
                </optgroup>
              ))}
            </select>
            <div className="flex gap-3">
              <button onClick={handleCity} disabled={!selectedCity} className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors">Find Qibla</button>
              <button onClick={reset} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">Back</button>
            </div>
          </div>
        )}

        {mode === "manual" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Latitude:</label>
              <input type="number" step="any" value={manualLat} onChange={(e) => setManualLat(e.target.value)} placeholder="e.g. 30.0444" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Longitude:</label>
              <input type="number" step="any" value={manualLng} onChange={(e) => setManualLng(e.target.value)} placeholder="e.g. 31.2357" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
            </div>
            <p className="text-xs text-gray-400">💡 You can get coordinates from Google Maps by right-clicking your location</p>
            <div className="flex gap-3">
              <button onClick={handleManual} disabled={!manualLat || !manualLng} className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors">Calculate Qibla</button>
              <button onClick={reset} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">Back</button>
            </div>
          </div>
        )}

        {mode === "locating" && (
          <div className="text-center py-10">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-semibold">Detecting your location...</p>
            <p className="text-xs text-gray-400 mt-2">Make sure GPS is enabled and you've allowed location access</p>
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
        "Qibla Direction Finder — Find the direction of the Kaaba in Mecca from anywhere in the world.",
        "Uses the Haversine formula for precise great-circle bearing calculation. 3 location methods: GPS, city selection, or manual coordinates.",
        "Interactive compass with red arrow pointing to Qibla. Supports device compass for relative direction.",
        "Over 50 cities across 35+ countries. 100% free, runs entirely in your browser.",
      ]} lang="en" />
      <FAQSection faqs={[
        { question: "What is the Qibla?", answer: "The Qibla is the direction of the Kaaba in Mecca, Saudi Arabia (21.4225°N, 39.8262°E). Muslims face this direction during prayer." },
        { question: "Does the Qibla direction change based on location?", answer: "Yes! The exact bearing varies. In Egypt it's roughly east, in the US it's northeast, in Europe it's southeast." },
        { question: "How is the Qibla calculated?", answer: "Using the Haversine formula to calculate the great-circle bearing between your location and the Kaaba." },
        { question: "Do I need to be perfectly accurate?", answer: "The Islamic requirement is the general direction, not an exact degree." },
        { question: "Can I use this without GPS?", answer: "Yes! Select your city from the list or enter coordinates manually." },
        { question: "Is this tool free?", answer: "Yes, completely free and runs entirely in your browser — no data is sent to any server." },
      ]} lang="en" />
      <RelatedTools tools={[
        { title: "Prayer Times", icon: "🕐", href: "/en/tools/prayer-times" },
        { title: "Hijri Converter", icon: "📅", href: "/en/tools/hijri-converter" },
        { title: "Zakat Calculator", icon: "🕌", href: "/en/tools/zakat-calculator" },
        { title: "Inheritance Calculator", icon: "📜", href: "/en/tools/inheritance-calculator" },
      ]} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}
