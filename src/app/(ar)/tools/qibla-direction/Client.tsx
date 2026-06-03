"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

// ─── Kaaba coordinates ───
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

// ─── Major cities database (lat, lng) ───
const CITIES: Record<string, { lat: number; lng: number; ar: string; en: string }> = {
  // Saudi Arabia
  "mecca-sa": { lat: 21.4225, lng: 39.8262, ar: "مكة المكرمة", en: "Mecca" },
  "medina-sa": { lat: 24.5247, lng: 39.5692, ar: "المدينة المنورة", en: "Medina" },
  "riyadh-sa": { lat: 24.7136, lng: 46.6753, ar: "الرياض", en: "Riyadh" },
  "jeddah-sa": { lat: 21.5433, lng: 39.1728, ar: "جدة", en: "Jeddah" },
  "dammam-sa": { lat: 26.4207, lng: 50.0888, ar: "الدمام", en: "Dammam" },
  "abha-sa": { lat: 18.2164, lng: 42.5053, ar: "أبها", en: "Abha" },
  "tabuk-sa": { lat: 28.3998, lng: 36.5715, ar: "تبوك", en: "Tabuk" },
  // Egypt
  "cairo-eg": { lat: 30.0444, lng: 31.2357, ar: "القاهرة", en: "Cairo" },
  "alexandria-eg": { lat: 31.2001, lng: 29.9187, ar: "الإسكندرية", en: "Alexandria" },
  "giza-eg": { lat: 30.0131, lng: 31.2089, ar: "الجيزة", en: "Giza" },
  "luxor-eg": { lat: 25.6872, lng: 32.6396, ar: "الأقصر", en: "Luxor" },
  "aswan-eg": { lat: 24.0889, lng: 32.8998, ar: "أسوان", en: "Aswan" },
  // UAE
  "dubai-ae": { lat: 25.2048, lng: 55.2708, ar: "دبي", en: "Dubai" },
  "abudhabi-ae": { lat: 24.4539, lng: 54.3773, ar: "أبوظبي", en: "Abu Dhabi" },
  "sharjah-ae": { lat: 25.3573, lng: 55.4033, ar: "الشارقة", en: "Sharjah" },
  // Qatar
  "doha-qa": { lat: 25.2854, lng: 51.5310, ar: "الدوحة", en: "Doha" },
  // Kuwait
  "kuwait-kw": { lat: 29.3759, lng: 47.9774, ar: "الكويت", en: "Kuwait City" },
  // Bahrain
  "manama-bh": { lat: 26.2285, lng: 50.5860, ar: "المنامة", en: "Manama" },
  // Oman
  "muscat-om": { lat: 23.5880, lng: 58.3829, ar: "مسقط", en: "Muscat" },
  // Iraq
  "baghdad-iq": { lat: 33.3152, lng: 44.3661, ar: "بغداد", en: "Baghdad" },
  "basra-iq": { lat: 30.5085, lng: 47.7804, ar: "البصرة", en: "Basra" },
  // Jordan
  "amman-jo": { lat: 31.9454, lng: 35.9284, ar: "عمّان", en: "Amman" },
  // Lebanon
  "beirut-lb": { lat: 33.8938, lng: 35.5018, ar: "بيروت", en: "Beirut" },
  // Syria
  "damascus-sy": { lat: 33.5138, lng: 36.2765, ar: "دمشق", en: "Damascus" },
  // Palestine
  "jerusalem-ps": { lat: 31.7683, lng: 35.2137, ar: "القدس", en: "Jerusalem" },
  "gaza-ps": { lat: 31.5017, lng: 34.4668, ar: "غزة", en: "Gaza" },
  // Morocco
  "casablanca-ma": { lat: 33.5731, lng: -7.5898, ar: "الدار البيضاء", en: "Casablanca" },
  "rabat-ma": { lat: 34.0209, lng: -6.8416, ar: "الرباط", en: "Rabat" },
  "marrakech-ma": { lat: 31.6295, lng: -7.9811, ar: "مراكش", en: "Marrakech" },
  "fez-ma": { lat: 34.0181, lng: -5.0078, ar: "فاس", en: "Fez" },
  // Algeria
  "algiers-dz": { lat: 36.7538, lng: 3.0588, ar: "الجزائر", en: "Algiers" },
  // Tunisia
  "tunis-tn": { lat: 36.8065, lng: 10.1815, ar: "تونس", en: "Tunis" },
  // Libya
  "tripoli-ly": { lat: 32.8872, lng: 13.1913, ar: "طرابلس", en: "Tripoli" },
  // Sudan
  "khartoum-sd": { lat: 15.5007, lng: 32.5599, ar: "الخرطوم", en: "Khartoum" },
  // Yemen
  "sanaa-ye": { lat: 15.3694, lng: 44.1910, ar: "صنعاء", en: "Sanaa" },
  // Turkey
  "istanbul-tr": { lat: 41.0082, lng: 28.9784, ar: "إسطنبول", en: "Istanbul" },
  "ankara-tr": { lat: 39.9334, lng: 32.8597, ar: "أنقرة", en: "Ankara" },
  // Pakistan
  "karachi-pk": { lat: 24.8607, lng: 67.0011, ar: "كراتشي", en: "Karachi" },
  "lahore-pk": { lat: 31.5204, lng: 74.3587, ar: "لاهور", en: "Lahore" },
  "islamabad-pk": { lat: 33.6844, lng: 73.0479, ar: "إسلام آباد", en: "Islamabad" },
  // India
  "delhi-in": { lat: 28.7041, lng: 77.1025, ar: "دلهي", en: "Delhi" },
  "mumbai-in": { lat: 19.0760, lng: 72.8777, ar: "مومباي", en: "Mumbai" },
  "hyderabad-in": { lat: 17.3850, lng: 78.4867, ar: "حيدر آباد", en: "Hyderabad" },
  // Bangladesh
  "dhaka-bd": { lat: 23.8103, lng: 90.4125, ar: "دكا", en: "Dhaka" },
  // Indonesia
  "jakarta-id": { lat: -6.2088, lng: 106.8456, ar: "جاكرتا", en: "Jakarta" },
  // Malaysia
  "kualalumpur-my": { lat: 3.1390, lng: 101.6869, ar: "كوالالمبور", en: "Kuala Lumpur" },
  // UK
  "london-gb": { lat: 51.5074, lng: -0.1278, ar: "لندن", en: "London" },
  "birmingham-gb": { lat: 52.4862, lng: -1.8904, ar: "برمنغهام", en: "Birmingham" },
  "manchester-gb": { lat: 53.4808, lng: -2.2426, ar: "مانشستر", en: "Manchester" },
  // France
  "paris-fr": { lat: 48.8566, lng: 2.3522, ar: "باريس", en: "Paris" },
  "lyon-fr": { lat: 45.7640, lng: 4.8357, ar: "ليون", en: "Lyon" },
  // Germany
  "berlin-de": { lat: 52.5200, lng: 13.4050, ar: "برلين", en: "Berlin" },
  "frankfurt-de": { lat: 50.1109, lng: 8.6821, ar: "فرانكفورت", en: "Frankfurt" },
  // USA
  "newyork-us": { lat: 40.7128, lng: -74.0060, ar: "نيويورك", en: "New York" },
  "losangeles-us": { lat: 34.0522, lng: -118.2437, ar: "لوس أنجلوس", en: "Los Angeles" },
  "chicago-us": { lat: 41.8781, lng: -87.6298, ar: "شيكاغو", en: "Chicago" },
  "houston-us": { lat: 29.7604, lng: -95.3698, ar: "هيوستن", en: "Houston" },
  // Canada
  "toronto-ca": { lat: 43.6532, lng: -79.3832, ar: "تورنتو", en: "Toronto" },
  "montreal-ca": { lat: 45.5017, lng: -73.5673, ar: "مونتريال", en: "Montreal" },
  // Australia
  "sydney-au": { lat: -33.8688, lng: 151.2093, ar: "سيدني", en: "Sydney" },
  "melbourne-au": { lat: -37.8136, lng: 144.9631, ar: "ملبورن", en: "Melbourne" },
  // Russia
  "moscow-ru": { lat: 55.7558, lng: 37.6173, ar: "موسكو", en: "Moscow" },
  // China
  "beijing-cn": { lat: 39.9042, lng: 116.4074, ar: "بكين", en: "Beijing" },
  // Japan
  "tokyo-jp": { lat: 35.6762, lng: 139.6503, ar: "طوكيو", en: "Tokyo" },
  // South Africa
  "capetown-za": { lat: -33.9249, lng: 18.4241, ar: "كيب تاون", en: "Cape Town" },
  "johannesburg-za": { lat: -26.2041, lng: 28.0473, ar: "جوهانسبرغ", en: "Johannesburg" },
  // Nigeria
  "lagos-ng": { lat: 6.5244, lng: 3.3792, ar: "لاغوس", en: "Lagos" },
  // Kenya
  "nairobi-ke": { lat: -1.2921, lng: 36.8219, ar: "نيروبي", en: "Nairobi" },
};

// Group cities by country for the dropdown
const COUNTRIES: Record<string, { ar: string; en: string; cities: string[] }> = {
  sa: { ar: "السعودية", en: "Saudi Arabia", cities: ["mecca-sa", "medina-sa", "riyadh-sa", "jeddah-sa", "dammam-sa", "abha-sa", "tabuk-sa"] },
  eg: { ar: "مصر", en: "Egypt", cities: ["cairo-eg", "alexandria-eg", "giza-eg", "luxor-eg", "aswan-eg"] },
  ae: { ar: "الإمارات", en: "UAE", cities: ["dubai-ae", "abudhabi-ae", "sharjah-ae"] },
  qa: { ar: "قطر", en: "Qatar", cities: ["doha-qa"] },
  kw: { ar: "الكويت", en: "Kuwait", cities: ["kuwait-kw"] },
  bh: { ar: "البحرين", en: "Bahrain", cities: ["manama-bh"] },
  om: { ar: "عُمان", en: "Oman", cities: ["muscat-om"] },
  iq: { ar: "العراق", en: "Iraq", cities: ["baghdad-iq", "basra-iq"] },
  jo: { ar: "الأردن", en: "Jordan", cities: ["amman-jo"] },
  lb: { ar: "لبنان", en: "Lebanon", cities: ["beirut-lb"] },
  sy: { ar: "سوريا", en: "Syria", cities: ["damascus-sy"] },
  ps: { ar: "فلسطين", en: "Palestine", cities: ["jerusalem-ps", "gaza-ps"] },
  ma: { ar: "المغرب", en: "Morocco", cities: ["casablanca-ma", "rabat-ma", "marrakech-ma", "fez-ma"] },
  dz: { ar: "الجزائر", en: "Algeria", cities: ["algiers-dz"] },
  tn: { ar: "تونس", en: "Tunisia", cities: ["tunis-tn"] },
  ly: { ar: "ليبيا", en: "Libya", cities: ["tripoli-ly"] },
  sd: { ar: "السودان", en: "Sudan", cities: ["khartoum-sd"] },
  ye: { ar: "اليمن", en: "Yemen", cities: ["sanaa-ye"] },
  tr: { ar: "تركيا", en: "Turkey", cities: ["istanbul-tr", "ankara-tr"] },
  pk: { ar: "باكستان", en: "Pakistan", cities: ["karachi-pk", "lahore-pk", "islamabad-pk"] },
  in: { ar: "الهند", en: "India", cities: ["delhi-in", "mumbai-in", "hyderabad-in"] },
  bd: { ar: "بنغلاديش", en: "Bangladesh", cities: ["dhaka-bd"] },
  id: { ar: "إندونيسيا", en: "Indonesia", cities: ["jakarta-id"] },
  my: { ar: "ماليزيا", en: "Malaysia", cities: ["kualalumpur-my"] },
  gb: { ar: "بريطانيا", en: "United Kingdom", cities: ["london-gb", "birmingham-gb", "manchester-gb"] },
  fr: { ar: "فرنسا", en: "France", cities: ["paris-fr", "lyon-fr"] },
  de: { ar: "ألمانيا", en: "Germany", cities: ["berlin-de", "frankfurt-de"] },
  us: { ar: "أمريكا", en: "United States", cities: ["newyork-us", "losangeles-us", "chicago-us", "houston-us"] },
  ca: { ar: "كندا", en: "Canada", cities: ["toronto-ca", "montreal-ca"] },
  au: { ar: "أستراليا", en: "Australia", cities: ["sydney-au", "melbourne-au"] },
  ru: { ar: "روسيا", en: "Russia", cities: ["moscow-ru"] },
  cn: { ar: "الصين", en: "China", cities: ["beijing-cn"] },
  jp: { ar: "اليابان", en: "Japan", cities: ["tokyo-jp"] },
  za: { ar: "جنوب أفريقيا", en: "South Africa", cities: ["capetown-za", "johannesburg-za"] },
  ng: { ar: "نيجيريا", en: "Nigeria", cities: ["lagos-ng"] },
  ke: { ar: "كينيا", en: "Kenya", cities: ["nairobi-ke"] },
};

// ─── Haversine formula to calculate Qibla bearing ───
function calcQiblaBearing(lat: number, lng: number): number {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  const kaabaLatRad = (KAABA_LAT * Math.PI) / 180;
  const kaabaLngRad = (KAABA_LNG * Math.PI) / 180;

  const dLng = kaabaLngRad - lngRad;
  const y = Math.sin(dLng) * Math.cos(kaabaLatRad);
  const x = Math.cos(latRad) * Math.sin(kaabaLatRad) - Math.sin(latRad) * Math.cos(kaabaLatRad) * Math.cos(dLng);

  let bearing = Math.atan2(y, x) * (180 / Math.PI);
  bearing = (bearing + 360) % 360;
  return bearing;
}

function calcDistance(lat: number, lng: number): number {
  const R = 6371;
  const dLat = ((KAABA_LAT - lat) * Math.PI) / 180;
  const dLng = ((KAABA_LNG - lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat * Math.PI) / 180) * Math.cos((KAABA_LAT * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

function bearingToDirection(bearing: number): { ar: string; en: string } {
  if (bearing >= 337.5 || bearing < 22.5) return { ar: "شمال", en: "North" };
  if (bearing >= 22.5 && bearing < 67.5) return { ar: "شمال شرق", en: "Northeast" };
  if (bearing >= 67.5 && bearing < 112.5) return { ar: "شرق", en: "East" };
  if (bearing >= 112.5 && bearing < 157.5) return { ar: "جنوب شرق", en: "Southeast" };
  if (bearing >= 157.5 && bearing < 202.5) return { ar: "جنوب", en: "South" };
  if (bearing >= 202.5 && bearing < 247.5) return { ar: "جنوب غرب", en: "Southwest" };
  if (bearing >= 247.5 && bearing < 292.5) return { ar: "غرب", en: "West" };
  return { ar: "شمال غرب", en: "Northwest" };
}

function bearingToRelativeDirection(bearing: number, deviceHeading: number): { ar: string; en: string } {
  let rel = bearing - deviceHeading;
  rel = (rel + 360) % 360;
  if (rel >= 337.5 || rel < 22.5) return { ar: "أمامك مباشرة", en: "Straight ahead" };
  if (rel >= 22.5 && rel < 67.5) return { ar: "أمامك يمين", en: "Ahead to your right" };
  if (rel >= 67.5 && rel < 112.5) return { ar: "يمينك", en: "To your right" };
  if (rel >= 112.5 && rel < 157.5) return { ar: "خلفك يمين", en: "Behind to your right" };
  if (rel >= 157.5 && rel < 202.5) return { ar: "خلفك مباشرة", en: "Behind you" };
  if (rel >= 202.5 && rel < 247.5) return { ar: "خلفك يسار", en: "Behind to your left" };
  if (rel >= 247.5 && rel < 292.5) return { ar: "يسارك", en: "To your left" };
  return { ar: "أمامك يسار", en: "Ahead to your left" };
}

// ─── SVG Compass ───
function Compass({ bearing, deviceHeading, direction }: { bearing: number; deviceHeading: number; direction: { ar: string; en: string } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 280;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const r = 110;

    ctx.clearRect(0, 0, size, size);

    // Background circle
    ctx.beginPath();
    ctx.arc(cx, cy, r + 10, 0, Math.PI * 2);
    ctx.fillStyle = "#f8fafc";
    ctx.fill();
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Outer ring
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Degree markers
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
        const labelR = r - 30;
        const labels: Record<number, string> = { 0: "N", 90: "E", 180: "S", 270: "W" };
        ctx.fillStyle = "#334155";
        ctx.font = "bold 14px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(labels[i] || i.toString(), cx + labelR * Math.cos(angle), cy + labelR * Math.sin(angle));
      }
    }

    // Qibla direction arrow (red)
    const qiblaAngle = ((bearing - 90) * Math.PI) / 180;
    ctx.save();
    ctx.translate(cx, cy);

    // Arrow body
    ctx.beginPath();
    ctx.moveTo(0, r - 25);
    ctx.lineTo(-8, 0);
    ctx.lineTo(0, -r + 30);
    ctx.lineTo(8, 0);
    ctx.closePath();
    ctx.fillStyle = "#dc2626";
    ctx.fill();
    ctx.strokeStyle = "#991b1b";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Arrow center dot
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#dc2626";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();

    // Device heading indicator (blue line from center)
    if (deviceHeading >= 0) {
      const headingAngle = ((deviceHeading - 90) * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + (r - 5) * Math.cos(headingAngle), cy + (r - 5) * Math.sin(headingAngle));
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Heading dot
      ctx.beginPath();
      ctx.arc(cx + (r - 5) * Math.cos(headingAngle), cy + (r - 5) * Math.sin(headingAngle), 5, 0, Math.PI * 2);
      ctx.fillStyle = "#3b82f6";
      ctx.fill();
    }

    // Center label
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("القبلة", cx, cy - 12);
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "#64748b";
    ctx.fillText(`${bearing.toFixed(1)}°`, cx, cy + 12);

  }, [bearing, deviceHeading]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className="max-w-full" style={{ width: 280, height: 280 }} />
      <div className="mt-3 text-center">
        <span className="inline-block bg-red-100 text-red-800 font-bold px-4 py-2 rounded-full text-sm">
          🧭 القبلة: {direction.ar} ({bearing.toFixed(1)}°)
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ───
type Mode = "idle" | "gps" | "city" | "manual" | "result" | "locating" | "error";

export default function Client() {
  const [mode, setMode] = useState<Mode>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);
  const [bearing, setBearing] = useState(0);
  const [distance, setDistance] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [deviceHeading, setDeviceHeading] = useState(-1);
  const [hasCompass, setHasCompass] = useState(false);

  const direction = bearingToDirection(bearing);
  const relDirection = deviceHeading >= 0 ? bearingToRelativeDirection(bearing, deviceHeading) : null;

  // Try to get device orientation for compass
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        setDeviceHeading(360 - e.alpha);
        setHasCompass(true);
      }
    };
    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  const showResult = useCallback((lat: number, lng: number) => {
    const b = calcQiblaBearing(lat, lng);
    const d = calcDistance(lat, lng);
    setUserLat(lat);
    setUserLng(lng);
    setBearing(b);
    setDistance(d);
    setMode("result");
  }, []);

  const handleGPS = () => {
    if (!navigator.geolocation) {
      setErrorMsg("متصفحك لا يدعم تحديد الموقع الجغرافي");
      setMode("error");
      return;
    }
    setMode("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        showResult(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        if (err.code === 1) {
          setErrorMsg("تم رفض إذن الموقع. السماح بالوصول للموقع ثم حاول مرة أخرى.");
        } else if (err.code === 2) {
          setErrorMsg("تعذر تحديد موقعك. تأكد أن GPS مفعل وحاول مرة أخرى.");
        } else {
          setErrorMsg("انتهت مهلة تحديد الموقع. حاول مرة أخرى.");
        }
        setMode("error");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleCitySelect = () => {
    if (!selectedCity) return;
    const city = CITIES[selectedCity];
    if (city) {
      showResult(city.lat, city.lng);
    }
  };

  const handleManual = () => {
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setErrorMsg("إحداثيات غير صحيحة. خط العرض: -90 إلى 90، خط الطول: -180 إلى 180");
      setMode("error");
      return;
    }
    showResult(lat, lng);
  };

  const resetAll = () => {
    setMode("idle");
    setErrorMsg("");
    setSelectedCountry("");
    setSelectedCity("");
    setManualLat("");
    setManualLng("");
  };

  const cityName = selectedCity ? CITIES[selectedCity]?.ar || "" : "";

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("اتجاه القبلة", "اعرف اتجاه القبلة من أي مكان في العالم — بوصلة تفاعلية مع حساب دقيق", "https://adwatak.cloud/tools/qibla-direction", "ar", "Islamic")} />
      <StructuredData data={faqSchema([
        { question: "ما هي القبلة؟", answer: "القبلة هي اتجاه الكعبة المشرفة في مكة المكرمة (21.4225° شمالاً، 39.8262° شرقاً). يتوجه إليها المسلمون في صلاتهم." },
        { question: "هل القبلة هي اتجاه مكة دائماً؟", answer: "الاتجاه الدقيق يختلف حسب موقعك الجغرافي. في مصر القبلة تقريباً شرق، في أمريكا شمال شرق، في أوروبا جنوب شرق." },
        { question: "كيف يتم حساب اتجاه القبلة؟", answer: "باستخدام معادلة Haversine لحساب الزاوية بين موقعك والكعبة المشرفة على سطح الكرة الأرضية." },
        { question: "هل يلزم التوجه بالدقة المتناهية؟", answer: "المطلب الشرعي هو الجهة وليس الدرجة الدقيقة. قال ﷺ: 'ما بين المشرق والمغرب قبلة'." },
        { question: "هل البوصلة في الهاتف دقيقة للقبلة؟", answer: "بوصلة الهاتف تعطي اتجاه الشمال المغناطيسي. أداتنا تحسب الاتجاه الدقيق من إحداثياتك." },
        { question: "ماذا لو كنت في الفضاء؟", answer: "تتجه نحو الكعبة بقدر الإمكان. الجهة العامة تكفي." },
        { question: "هل يمكن استخدام الأداة بدون GPS؟", answer: "نعم! يمكنك اختيار مدينتك من القائمة أو إدخال الإحداثيات يدوياً." },
        { question: "ما هي المدن المتاحة؟", answer: "أكثر من 60 مدينة في 35+ دولة عربية وعالمية." },
        { question: "هل الأداة مجانية؟", answer: "نعم، مجانية بالكامل وتعمل في المتصفح بدون أي سيرفر." },
        { question: "كيف أعرف اتجاه القبلة في فندق أو مكان جديد؟", answer: "افتح الأداة واضغط 'تحديد موقعي' أو اختر مدينتك من القائمة." },
      ])} />
      <StructuredData data={breadcrumbSchema([
        { name: "الرئيسية", url: "https://adwatak.cloud" },
        { name: "أدوات إسلامية", url: "https://adwatak.cloud/category/islamic" },
        { name: "اتجاه القبلة", url: "https://adwatak.cloud/tools/qibla-direction" },
      ])} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb lang="ar" category="أدوات إسلامية" categorySlug="islamic" toolName="اتجاه القبلة" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🧭 اتجاه القبلة</h1>
        <p className="text-sm text-gray-500 mb-6">اعرف اتجاه القبلة من أي مكان في العالم — حساب دقيق بمعادلة Haversine</p>

        {/* ─── Result ─── */}
        {mode === "result" && (
          <div className="text-center">
            <Compass bearing={bearing} deviceHeading={deviceHeading} direction={direction} />

            <div className="mt-6 grid grid-cols-2 gap-3 max-w-sm mx-auto">
              <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                <p className="text-xs text-green-600 font-semibold">الاتجاه</p>
                <p className="text-lg font-extrabold text-green-800">{direction.ar}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-xs text-blue-600 font-semibold">الزاوية</p>
                <p className="text-lg font-extrabold text-blue-800">{bearing.toFixed(1)}°</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
                <p className="text-xs text-purple-600 font-semibold">المسافة للكعبة</p>
                <p className="text-lg font-extrabold text-purple-800">{distance.toLocaleString()} كم</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs text-amber-600 font-semibold">الإحداثيات</p>
                <p className="text-sm font-bold text-amber-800">{userLat.toFixed(4)}°, {userLng.toFixed(4)}°</p>
              </div>
            </div>

            {relDirection && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 max-w-sm mx-auto">
                <p className="text-sm font-bold text-red-800">
                  📍 القبلة {relDirection.ar} — وجّه جهازك للأمام واتبع السهم الأحمر
                </p>
              </div>
            )}

            <button onClick={resetAll} className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">
              🔄 تحديد موقع آخر
            </button>
          </div>
        )}

        {/* ─── Idle: Choose method ─── */}
        {mode === "idle" && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">اختر طريقة تحديد موقعك:</p>

            <button
              onClick={handleGPS}
              className="w-full flex items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-right"
            >
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-bold">تحديد موقعي تلقائياً (GPS)</p>
                <p className="text-xs opacity-80">الأدق — يستخدم موقعك الحقيقي عبر GPS</p>
              </div>
            </button>

            <button
              onClick={() => setMode("city")}
              className="w-full flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-right"
            >
              <span className="text-2xl">🏙️</span>
              <div>
                <p className="font-bold">اختيار المدينة من القائمة</p>
                <p className="text-xs opacity-80">أكثر من 60 مدينة في 35+ دولة</p>
              </div>
            </button>

            <button
              onClick={() => setMode("manual")}
              className="w-full flex items-center gap-4 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-right"
            >
              <span className="text-2xl">📐</span>
              <div>
                <p className="font-bold">إدخال الإحداثيات يدوياً</p>
                <p className="text-xs opacity-80">أدخل خط العرض وخط الطول بنفسك</p>
              </div>
            </button>
          </div>
        )}

        {/* ─── City selector ─── */}
        {mode === "city" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الدولة:</label>
              <select
                value={selectedCountry}
                onChange={(e) => { setSelectedCountry(e.target.value); setSelectedCity(""); }}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              >
                <option value="">اختر الدولة...</option>
                {Object.entries(COUNTRIES).map(([code, c]) => (
                  <option key={code} value={code}>{c.ar}</option>
                ))}
              </select>
            </div>

            {selectedCountry && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">المدينة:</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                >
                  <option value="">اختر المدينة...</option>
                  {COUNTRIES[selectedCountry]?.cities.map((key) => (
                    <option key={key} value={key}>{CITIES[key].ar}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleCitySelect}
                disabled={!selectedCity}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                تحديد اتجاه القبلة
              </button>
              <button onClick={resetAll} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">
                رجوع
              </button>
            </div>
          </div>
        )}

        {/* ─── Manual coordinates ─── */}
        {mode === "manual" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">خط العرض (Latitude):</label>
              <input
                type="number"
                step="any"
                value={manualLat}
                onChange={(e) => setManualLat(e.target.value)}
                placeholder="مثال: 30.0444"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">خط الطول (Longitude):</label>
              <input
                type="number"
                step="any"
                value={manualLng}
                onChange={(e) => setManualLng(e.target.value)}
                placeholder="مثال: 31.2357"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
            <p className="text-xs text-gray-400">💡 يمكنك الحصول على الإحداثيات من Google Maps بالضغط بالزر الأيمن على موقعك</p>
            <div className="flex gap-3">
              <button
                onClick={handleManual}
                disabled={!manualLat || !manualLng}
                className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                حساب اتجاه القبلة
              </button>
              <button onClick={resetAll} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">
                رجوع
              </button>
            </div>
          </div>
        )}

        {/* ─── Locating ─── */}
        {mode === "locating" && (
          <div className="text-center py-10">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-semibold">جاري تحديد موقعك...</p>
            <p className="text-xs text-gray-400 mt-2">تأكد أن GPS مفعل وأنك سمحت بالوصول للموقع</p>
          </div>
        )}

        {/* ─── Error ─── */}
        {mode === "error" && (
          <div className="text-center py-6">
            <p className="text-red-600 font-semibold mb-4">⚠️ {errorMsg}</p>
            <button onClick={resetAll} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              🔄 حاول مرة أخرى
            </button>
          </div>
        )}
      </div>

      <SEOContent content={[
        "أداة تحديد اتجاه القبلة (الكعبة المشرفة في مكة المكرمة) من أي مكان في العالم. تعتمد على حسابات هندسية دقيقة (معادلة هافرسين) لحساب الاتجاه الجغرافي من موقعك إلى الكعبة.",
        "3 طرق لتحديد الموقع: GPS تلقائي، اختيار المدينة من قائمة 60+ مدينة، أو إدخال الإحداثيات يدوياً.",
        "بوصلة تفاعلية تعرض اتجاه القبلة بالدرجات مع سهم أحمر يشير للقبلة. تدعم البوصلة المغناطيسية في الهاتف للاتجاه النسبي.",
        "قال الله تعالى 'فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ' (البقرة: 144). المطلب الشرعي هو الجهة وليس الدرجة الدقيقة.",
        "الأداة مجانية بالكامل وتعمل في المتصفح — لا يتم رفع أي بيانات لأي سيرفر.",
      ]} lang="ar" />
      <FAQSection faqs={[
        { question: "ما هي القبلة؟", answer: "القبلة هي اتجاه الكعبة المشرفة في مكة المكرمة (21.4225° شمالاً، 39.8262° شرقاً). يتوجه إليها المسلمون في صلاتهم من أي مكان في العالم." },
        { question: "هل القبلة هي اتجاه مكة دائماً؟", answer: "الاتجاه الدقيق يختلف حسب موقعك الجغرافي. في مصر القبلة تقريباً شرق، في أمريكا شمال شرق، في أوروبا جنوب شرق." },
        { question: "كيف يتم حساب اتجاه القبلة؟", answer: "باستخدام معادلة Haversine لحساب الزاوية بين موقعك والكعبة المشرفة على سطح الكرة الأرضية." },
        { question: "هل يلزم التوجه بالدقة المتناهية؟", answer: "المطلب الشرعي هو الجهة وليس الدرجة الدقيقة. قال ﷺ: 'ما بين المشرق والمغرب قبلة'." },
        { question: "هل يمكن استخدام الأداة بدون GPS؟", answer: "نعم! يمكنك اختيار مدينتك من القائمة أو إدخال الإحداثيات يدوياً." },
        { question: "ما هي المدن المتاحة؟", answer: "أكثر من 60 مدينة في 35+ دولة عربية وعالمية تشمل السعودية، مصر، الإمارات، تركيا، باكستان، أمريكا، بريطانيا وغيرها." },
        { question: "هل الأداة مجانية؟", answer: "نعم، مجانية بالكامل وتعمل في المتصفح بدون أي سيرفر." },
        { question: "كيف أعرف اتجاه القبلة في فندق أو مكان جديد؟", answer: "افتح الأداة واضغط 'تحديد موقعي' أو اختر مدينتك من القائمة." },
      ]} lang="ar" />
      <RelatedTools tools={[
        { title: "مواقيت الصلاة", icon: "🕐", href: "/tools/prayer-times" },
        { title: "تحويل هجري ميلادي", icon: "📅", href: "/tools/hijri-converter" },
        { title: "حاسبة الزكاة", icon: "🕌", href: "/tools/zakat-calculator" },
        { title: "حاسبة الميراث", icon: "📜", href: "/tools/inheritance-calculator" },
      ]} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
