"use client";
import { useState, useEffect, useCallback, useRef } from "react";

// ─── Kaaba coordinates ───
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

// ─── Major cities database (lat, lng) ───
const CITIES: Record<string, { lat: number; lng: number; ar: string; en: string }> = {
  "mecca-sa": { lat: 21.4225, lng: 39.8262, ar: "مكة المكرمة", en: "Mecca" },
  "medina-sa": { lat: 24.5247, lng: 39.5692, ar: "المدينة المنورة", en: "Medina" },
  "riyadh-sa": { lat: 24.7136, lng: 46.6753, ar: "الرياض", en: "Riyadh" },
  "jeddah-sa": { lat: 21.5433, lng: 39.1728, ar: "جدة", en: "Jeddah" },
  "dammam-sa": { lat: 26.4207, lng: 50.0888, ar: "الدمام", en: "Dammam" },
  "abha-sa": { lat: 18.2164, lng: 42.5053, ar: "أبها", en: "Abha" },
  "tabuk-sa": { lat: 28.3998, lng: 36.5715, ar: "تبوك", en: "Tabuk" },
  "cairo-eg": { lat: 30.0444, lng: 31.2357, ar: "القاهرة", en: "Cairo" },
  "alexandria-eg": { lat: 31.2001, lng: 29.9187, ar: "الإسكندرية", en: "Alexandria" },
  "giza-eg": { lat: 30.0131, lng: 31.2089, ar: "الجيزة", en: "Giza" },
  "luxor-eg": { lat: 25.6872, lng: 32.6396, ar: "الأقصر", en: "Luxor" },
  "aswan-eg": { lat: 24.0889, lng: 32.8998, ar: "أسوان", en: "Aswan" },
  "dubai-ae": { lat: 25.2048, lng: 55.2708, ar: "دبي", en: "Dubai" },
  "abudhabi-ae": { lat: 24.4539, lng: 54.3773, ar: "أبوظبي", en: "Abu Dhabi" },
  "sharjah-ae": { lat: 25.3573, lng: 55.4033, ar: "الشارقة", en: "Sharjah" },
  "doha-qa": { lat: 25.2854, lng: 51.5310, ar: "الدوحة", en: "Doha" },
  "kuwait-kw": { lat: 29.3759, lng: 47.9774, ar: "الكويت", en: "Kuwait City" },
  "manama-bh": { lat: 26.2285, lng: 50.5860, ar: "المنامة", en: "Manama" },
  "muscat-om": { lat: 23.5880, lng: 58.3829, ar: "مسقط", en: "Muscat" },
  "baghdad-iq": { lat: 33.3152, lng: 44.3661, ar: "بغداد", en: "Baghdad" },
  "basra-iq": { lat: 30.5085, lng: 47.7804, ar: "البصرة", en: "Basra" },
  "amman-jo": { lat: 31.9454, lng: 35.9284, ar: "عمّان", en: "Amman" },
  "beirut-lb": { lat: 33.8938, lng: 35.5018, ar: "بيروت", en: "Beirut" },
  "damascus-sy": { lat: 33.5138, lng: 36.2765, ar: "دمشق", en: "Damascus" },
  "jerusalem-ps": { lat: 31.7683, lng: 35.2137, ar: "القدس", en: "Jerusalem" },
  "gaza-ps": { lat: 31.5017, lng: 34.4668, ar: "غزة", en: "Gaza" },
  "casablanca-ma": { lat: 33.5731, lng: -7.5898, ar: "الدار البيضاء", en: "Casablanca" },
  "rabat-ma": { lat: 34.0209, lng: -6.8416, ar: "الرباط", en: "Rabat" },
  "marrakech-ma": { lat: 31.6295, lng: -7.9811, ar: "مراكش", en: "Marrakech" },
  "fez-ma": { lat: 34.0181, lng: -5.0078, ar: "فاس", en: "Fez" },
  "algiers-dz": { lat: 36.7538, lng: 3.0588, ar: "الجزائر", en: "Algiers" },
  "tunis-tn": { lat: 36.8065, lng: 10.1815, ar: "تونس", en: "Tunis" },
  "tripoli-ly": { lat: 32.8872, lng: 13.1913, ar: "طرابلس", en: "Tripoli" },
  "khartoum-sd": { lat: 15.5007, lng: 32.5599, ar: "الخرطوم", en: "Khartoum" },
  "sanaa-ye": { lat: 15.3694, lng: 44.1910, ar: "صنعاء", en: "Sanaa" },
  "istanbul-tr": { lat: 41.0082, lng: 28.9784, ar: "إسطنبول", en: "Istanbul" },
  "ankara-tr": { lat: 39.9334, lng: 32.8597, ar: "أنقرة", en: "Ankara" },
  "karachi-pk": { lat: 24.8607, lng: 67.0011, ar: "كراتشي", en: "Karachi" },
  "lahore-pk": { lat: 31.5204, lng: 74.3587, ar: "لاهور", en: "Lahore" },
  "islamabad-pk": { lat: 33.6844, lng: 73.0479, ar: "إسلام آباد", en: "Islamabad" },
  "delhi-in": { lat: 28.7041, lng: 77.1025, ar: "دلهي", en: "Delhi" },
  "mumbai-in": { lat: 19.0760, lng: 72.8777, ar: "مومباي", en: "Mumbai" },
  "hyderabad-in": { lat: 17.3850, lng: 78.4867, ar: "حيدر آباد", en: "Hyderabad" },
  "dhaka-bd": { lat: 23.8103, lng: 90.4125, ar: "دكا", en: "Dhaka" },
  "jakarta-id": { lat: -6.2088, lng: 106.8456, ar: "جاكرتا", en: "Jakarta" },
  "kualalumpur-my": { lat: 3.1390, lng: 101.6869, ar: "كوالالمبور", en: "Kuala Lumpur" },
  "london-gb": { lat: 51.5074, lng: -0.1278, ar: "لندن", en: "London" },
  "birmingham-gb": { lat: 52.4862, lng: -1.8904, ar: "برمنغهام", en: "Birmingham" },
  "manchester-gb": { lat: 53.4808, lng: -2.2426, ar: "مانشستر", en: "Manchester" },
  "paris-fr": { lat: 48.8566, lng: 2.3522, ar: "باريس", en: "Paris" },
  "lyon-fr": { lat: 45.7640, lng: 4.8357, ar: "ليون", en: "Lyon" },
  "berlin-de": { lat: 52.5200, lng: 13.4050, ar: "برلين", en: "Berlin" },
  "frankfurt-de": { lat: 50.1109, lng: 8.6821, ar: "فرانكفورت", en: "Frankfurt" },
  "newyork-us": { lat: 40.7128, lng: -74.0060, ar: "نيويورك", en: "New York" },
  "losangeles-us": { lat: 34.0522, lng: -118.2437, ar: "لوس أنجلوس", en: "Los Angeles" },
  "chicago-us": { lat: 41.8781, lng: -87.6298, ar: "شيكاغو", en: "Chicago" },
  "houston-us": { lat: 29.7604, lng: -95.3698, ar: "هيوستن", en: "Houston" },
  "toronto-ca": { lat: 43.6532, lng: -79.3832, ar: "تورنتو", en: "Toronto" },
  "montreal-ca": { lat: 45.5017, lng: -73.5673, ar: "مونتريال", en: "Montreal" },
  "sydney-au": { lat: -33.8688, lng: 151.2093, ar: "سيدني", en: "Sydney" },
  "melbourne-au": { lat: -37.8136, lng: 144.9631, ar: "ملبورن", en: "Melbourne" },
  "moscow-ru": { lat: 55.7558, lng: 37.6173, ar: "موسكو", en: "Moscow" },
  "beijing-cn": { lat: 39.9042, lng: 116.4074, ar: "بكين", en: "Beijing" },
  "tokyo-jp": { lat: 35.6762, lng: 139.6503, ar: "طوكيو", en: "Tokyo" },
  "capetown-za": { lat: -33.9249, lng: 18.4241, ar: "كيب تاون", en: "Cape Town" },
  "johannesburg-za": { lat: -26.2041, lng: 28.0473, ar: "جوهانسبرغ", en: "Johannesburg" },
  "lagos-ng": { lat: 6.5244, lng: 3.3792, ar: "لاغوس", en: "Lagos" },
  "nairobi-ke": { lat: -1.2921, lng: 36.8219, ar: "نيروبي", en: "Nairobi" },
};

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

// ─── Calculation functions ───
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
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
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

    ctx.beginPath();
    ctx.arc(cx, cy, r + 10, 0, Math.PI * 2);
    ctx.fillStyle = "#f8fafc";
    ctx.fill();
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 3;
    ctx.stroke();

    for (let i = 0; i < 360; i += 10) {
      const angle = ((i - 90) * Math.PI) / 180;
      const isCardinal = i % 90 === 0;
      const len = isCardinal ? 14 : 8;
      ctx.beginPath();
      ctx.moveTo(cx + (r - 5) * Math.cos(angle), cy + (r - 5) * Math.sin(angle));
      ctx.lineTo(cx + (r - len) * Math.cos(angle), cy + (r - len) * Math.sin(angle));
      ctx.strokeStyle = isCardinal ? "#1e293b" : "#94a3b8";
      ctx.lineWidth = isCardinal ? 2.5 : 1.5;
      ctx.stroke();
    }

    // Cardinal labels
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 13px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const lblR = r - 22;
    ctx.fillText("N", cx, cy - lblR);
    ctx.fillText("S", cx, cy + lblR);
    ctx.fillText("E", cx + lblR, cy);
    ctx.fillText("W", cx - lblR, cy);

    // Device heading indicator (triangle at top showing where phone is pointing)
    const headingRad = ((-deviceHeading - 90) * Math.PI) / 180;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(headingRad);
    ctx.beginPath();
    ctx.moveTo(0, -r + 4);
    ctx.lineTo(-8, -r - 14);
    ctx.lineTo(8, -r - 14);
    ctx.closePath();
    ctx.fillStyle = deviceHeading !== 0 ? "#3b82f6" : "#cbd5e1";
    ctx.fill();
    ctx.restore();

    // Qibla arrow (red, pointing to Qibla)
    const qiblaRad = ((-bearing - 90 + deviceHeading) * Math.PI) / 180;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(qiblaRad);
    ctx.beginPath();
    ctx.moveTo(0, -r + 8);
    ctx.lineTo(-12, -r - 18);
    ctx.lineTo(0, -r - 30);
    ctx.lineTo(12, -r - 18);
    ctx.closePath();
    const grad = ctx.createRadialGradient(0, -r - 10, 0, 0, -r - 10, 16);
    grad.addColorStop(0, "#ef4444");
    grad.addColorStop(1, "#b91c1c");
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = "#991b1b";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // Kaaba icon at center
    ctx.fillStyle = "#1e293b";
    ctx.font = "20px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🕋", cx, cy + 2);
  }, [bearing, deviceHeading]);

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas ref={canvasRef} width={280} height={280} className="rounded-xl" />
      <p className="text-lg font-bold text-gray-800">{direction.ar}</p>
      <p className="text-xs text-gray-400">{direction.en}</p>
    </div>
  );
}

// ─── Labels per language ───
interface Labels {
  title: string;
  subtitle: string;
  useGps: string;
  chooseCity: string;
  manualInput: string;
  selectCountry: string;
  selectCity: string;
  latitude: string;
  longitude: string;
  calculate: string;
  back: string;
  locating: string;
  locatingDesc: string;
  error: string;
  retry: string;
  distance: string;
  degrees: string;
}

const LABELS: Record<string, Labels> = {
  ar: {
    title: "اتجاه القبلة",
    subtitle: "اعرف اتجاه القبلة من أي مكان في العالم",
    useGps: "📍 تحديد موقعي",
    chooseCity: "🏙️ اختيار مدينة",
    manualInput: "📝 إدخال الإحداثيات",
    selectCountry: "اختر الدولة",
    selectCity: "اختر المدينة",
    latitude: "خط العرض",
    longitude: "خط الطول",
    calculate: "حساب اتجاه القبلة",
    back: "رجوع",
    locating: "جاري تحديد موقعك...",
    locatingDesc: "تأكد أن GPS مفعل وأنك سمحت بالوصول للموقع",
    error: "⚠️",
    retry: "🔄 حاول مرة أخرى",
    distance: "المسافة من الكعبة",
    degrees: "درجة",
  },
  en: {
    title: "Qibla Direction",
    subtitle: "Find Qibla direction from anywhere in the world",
    useGps: "📍 Use my location",
    chooseCity: "🏙️ Choose a city",
    manualInput: "📝 Enter coordinates",
    selectCountry: "Select country",
    selectCity: "Select city",
    latitude: "Latitude",
    longitude: "Longitude",
    calculate: "Find Qibla direction",
    back: "Back",
    locating: "Detecting your location...",
    locatingDesc: "Make sure GPS is enabled and you allowed location access",
    error: "⚠️",
    retry: "🔄 Try again",
    distance: "Distance from Kaaba",
    degrees: "°",
  },
  tr: {
    title: "Kıble Yönü",
    subtitle: "Dünyanın herhangi bir yerinden Kıble yönünü bulun",
    useGps: "📍 Konumumu kullan",
    chooseCity: "🏙️ Şehir seç",
    manualInput: "📝 Koordinat girin",
    selectCountry: "Ülke seç",
    selectCity: "Şehir seç",
    latitude: "Enlem",
    longitude: "Boylam",
    calculate: "Kıble yönünü bul",
    back: "Geri",
    locating: "Konumunuz belirleniyor...",
    locatingDesc: "GPS'in etkin olduğundan ve konum izni verdiğinizden emin olun",
    error: "⚠️",
    retry: "🔄 Tekrar dene",
    distance: "Kabe'ye uzaklık",
    degrees: "°",
  },
  id: {
    title: "Arah Kiblat",
    subtitle: "Cari arah kiblat dari mana saja di dunia",
    useGps: "📍 Gunakan lokasi saya",
    chooseCity: "🏙️ Pilih kota",
    manualInput: "📝 Masukkan koordinat",
    selectCountry: "Pilih negara",
    selectCity: "Pilih kota",
    latitude: "Lintang",
    longitude: "Bujur",
    calculate: "Cari arah kiblat",
    back: "Kembali",
    locating: "Mendeteksi lokasi Anda...",
    locatingDesc: "Pastikan GPS aktif dan Anda mengizinkan akses lokasi",
    error: "⚠️",
    retry: "🔄 Coba lagi",
    distance: "Jarak dari Ka'bah",
    degrees: "°",
  },
  fr: {
    title: "Direction de la Qibla",
    subtitle: "Trouvez la direction de la Qibla depuis n'importe où dans le monde",
    useGps: "📍 Utiliser ma position",
    chooseCity: "🏙️ Choisir une ville",
    manualInput: "📝 Saisir les coordonnées",
    selectCountry: "Sélectionner le pays",
    selectCity: "Sélectionner la ville",
    latitude: "Latitude",
    longitude: "Longitude",
    calculate: "Trouver la Qibla",
    back: "Retour",
    locating: "Détection de votre position...",
    locatingDesc: "Assurez-vous que le GPS est activé et que vous avez autorisé l'accès à la position",
    error: "⚠️",
    retry: "🔄 Réessayer",
    distance: "Distance de la Kaaba",
    degrees: "°",
  },
};

// ─── Main Component ───
export default function QiblaDirectionCore({ lang = "ar" }: { lang?: string }) {
  const t = LABELS[lang] || LABELS.en;
  const isRtl = lang === "ar";
  const [mode, setMode] = useState<"init" | "locating" | "result" | "error">("init");
  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);
  const [bearing, setBearing] = useState(0);
  const [distance, setDistance] = useState(0);
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("sa");
  const [useManual, setUseManual] = useState(false);

  const handleGps = useCallback(() => {
    setMode("locating");
    if (!navigator.geolocation) {
      setErrorMsg(lang === "ar" ? "المتصفح لا يدعم تحديد الموقع" : "Geolocation is not supported by this browser");
      setMode("error");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserLat(lat);
        setUserLng(lng);
        const b = calcQiblaBearing(lat, lng);
        setBearing(b);
        setDistance(calcDistance(lat, lng));
        setMode("result");
      },
      () => {
        setErrorMsg(lang === "ar" ? "لم نتمكن من تحديد موقعك. تأكد من تفعيل GPS" : "Could not determine your location. Please enable GPS");
        setMode("error");
      }
    );
  }, [lang]);

  const handleCitySelect = (cityKey: string) => {
    const city = CITIES[cityKey];
    if (!city) return;
    setSelectedCity(cityKey);
    const b = calcQiblaBearing(city.lat, city.lng);
    setUserLat(city.lat);
    setUserLng(city.lng);
    setBearing(b);
    setDistance(calcDistance(city.lat, city.lng));
    setMode("result");
  };

  const handleManual = () => {
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setErrorMsg(lang === "ar" ? "الإحداثيات غير صحيحة" : "Invalid coordinates");
      setMode("error");
      return;
    }
    setUserLat(lat);
    setUserLng(lng);
    const b = calcQiblaBearing(lat, lng);
    setBearing(b);
    setDistance(calcDistance(lat, lng));
    setMode("result");
  };

  const resetAll = () => {
    setMode("init");
    setManualLat("");
    setManualLng("");
    setSelectedCity("");
    setSelectedCountry("sa");
    setDeviceHeading(0);
  };

  // Device orientation for compass
  useEffect(() => {
    if (mode !== "result") return;
    const handler = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) setDeviceHeading(e.alpha);
    };
    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, [mode]);

  // Request iOS permission
  useEffect(() => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      (DeviceOrientationEvent as any).requestPermission().then(() => {});
    }
  }, []);

  const direction = bearingToDirection(bearing);
  const relDir = bearingToRelativeDirection(bearing, deviceHeading);

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      {/* ─── Init Mode ─── */}
      {mode === "init" && (
        <div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 4 }}>{t.title}</h2>
          <p style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: 16 }}>{t.subtitle}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={handleGps} style={{ padding: "12px 20px", backgroundColor: "#2563eb", color: "#fff", fontWeight: 700, border: "none", borderRadius: 12, fontSize: "1rem", cursor: "pointer" }}>
              {t.useGps}
            </button>
            <button onClick={() => setUseManual(false)} style={{ padding: "12px 20px", backgroundColor: "#1e293b", color: "#fff", fontWeight: 600, border: "none", borderRadius: 12, fontSize: "1rem", cursor: "pointer" }}>
              {t.chooseCity}
            </button>
            <button onClick={() => { setUseManual(true); setMode("init"); }} style={{ padding: "12px 20px", backgroundColor: "#f3f4f6", color: "#374151", fontWeight: 600, border: "1px solid #d1d5db", borderRadius: 12, fontSize: "1rem", cursor: "pointer" }}>
              {t.manualInput}
            </button>
          </div>

          {/* City selection */}
          {!useManual && mode === "init" && (
            <div style={{ marginTop: 16 }}>
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: "0.9rem", marginBottom: 8, background: "#fff" }}>
                {Object.entries(COUNTRIES).map(([code, country]) => (
                  <option key={code} value={code}>{lang === "ar" ? country.ar : country.en}</option>
                ))}
              </select>
              <select value={selectedCity} onChange={(e) => e.target.value && handleCitySelect(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: "0.9rem", background: "#fff" }}>
                <option value="">{t.selectCity}</option>
                {(COUNTRIES[selectedCountry]?.cities || []).map((ck) => (
                  <option key={ck} value={ck}>{CITIES[ck]?.[lang === "ar" ? "ar" : "en"] || ck}</option>
                ))}
              </select>
            </div>
          )}

          {/* Manual input */}
          {useManual && mode === "init" && (
            <div style={{ marginTop: 16 }}>
              <input type="number" step="any" placeholder={t.latitude} value={manualLat} onChange={(e) => setManualLat(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: "0.9rem", marginBottom: 8, boxSizing: "border-box" }} />
              <input type="number" step="any" placeholder={t.longitude} value={manualLng} onChange={(e) => setManualLng(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: "0.9rem", marginBottom: 8, boxSizing: "border-box" }} />
              <button onClick={handleManual} disabled={!manualLat || !manualLng}
                style={{ width: "100%", padding: 12, backgroundColor: manualLat && manualLng ? "#d97706" : "#d1d5db", color: manualLat && manualLng ? "#fff" : "#9ca3af", fontWeight: 700, border: "none", borderRadius: 12, fontSize: "1rem", cursor: manualLat && manualLng ? "pointer" : "not-allowed" }}>
                {t.calculate}
              </button>
              <button onClick={() => setUseManual(false)} style={{ width: "100%", padding: 10, backgroundColor: "transparent", color: "#6b7280", fontWeight: 600, border: "none", fontSize: "0.9rem", cursor: "pointer", marginTop: 6 }}>
                {t.back}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ─── Locating ─── */}
      {mode === "locating" && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div style={{ display: "inline-block", width: 48, height: 48, border: "4px solid #2563eb", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: 16 }} />
          <p style={{ fontWeight: 600, color: "#4b5563" }}>{t.locating}</p>
          <p style={{ fontSize: "0.8rem", color: "#9ca3af", marginTop: 8 }}>{t.locatingDesc}</p>
        </div>
      )}

      {/* ─── Result ─── */}
      {mode === "result" && (
        <div>
          <Compass bearing={bearing} deviceHeading={deviceHeading} direction={direction} />
          <div style={{ textAlign: "center", marginTop: 12 }}>
            <p style={{ fontSize: "2rem", fontWeight: 800, color: "#dc2626" }}>{Math.round(bearing)}°</p>
            <p style={{ fontSize: "0.85rem", color: "#6b7280", marginTop: 4 }}>{t.distance}: {distance.toLocaleString()} km</p>
            <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#059669", marginTop: 8 }}>{relDir.ar} / {relDir.en}</p>
          </div>
          <button onClick={resetAll} style={{ width: "100%", padding: 12, backgroundColor: "#f3f4f6", color: "#374151", fontWeight: 600, border: "1px solid #d1d5db", borderRadius: 12, fontSize: "0.9rem", cursor: "pointer", marginTop: 16 }}>
            {t.back}
          </button>
        </div>
      )}

      {/* ─── Error ─── */}
      {mode === "error" && (
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <p style={{ color: "#dc2626", fontWeight: 600, marginBottom: 16 }}>{t.error} {errorMsg}</p>
          <button onClick={resetAll} style={{ padding: "12px 24px", backgroundColor: "#2563eb", color: "#fff", fontWeight: 700, border: "none", borderRadius: 12, fontSize: "1rem", cursor: "pointer" }}>
            {t.retry}
          </button>
        </div>
      )}

      {/* Spin animation */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
