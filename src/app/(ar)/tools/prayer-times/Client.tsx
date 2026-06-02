"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

// ─── Prayer calculation methods ───
const METHODS: Record<string, { ar: string; en: string; tr: string; fajrAngle: number; ishaAngle: number; ishaOffset?: number }> = {
  "1": { ar: "أم القرى (السعودية)", en: "Umm al-Qura (Saudi)", tr: "Umm al-Qura (Suudi)", fajrAngle: 18.5, ishaAngle: 0, ishaOffset: 90 },
  "2": { ar: "الهيئة المصرية", en: "Egyptian Authority", tr: "Mısır Otoritesi", fajrAngle: 19.5, ishaAngle: 17.5 },
  "3": { ar: "رابطة العالم الإسلامي", en: "Muslim World League", tr: "İslam Dünya Ligi", fajrAngle: 18, ishaAngle: 17 },
  "4": { ar: "جامعة العلوم الإسلامية (كراتشي)", en: "Karachi University", tr: "Karachi Üniversitesi", fajrAngle: 18, ishaAngle: 18 },
  "5": { ar: "ISNA (أمريكا الشمالية)", en: "ISNA (North America)", tr: "ISNA (Kuzey Amerika)", fajrAngle: 15, ishaAngle: 15 },
  "6": { ar: "الكويت", en: "Kuwait", tr: "Kuveyt", fajrAngle: 18, ishaAngle: 17.5 },
  "7": { ar: "قطر", en: "Qatar", tr: "Katar", fajrAngle: 18, ishaAngle: 0, ishaOffset: 90 },
  "8": { ar: "سنغافورة", en: "Singapore", tr: "Singapur", fajrAngle: 20, ishaAngle: 18 },
};

// ─── Cities database ───
const CITIES: Record<string, { lat: number; lng: number; ar: string; en: string; tr: string; tz: number }> = {
  "mecca": { lat: 21.4225, lng: 39.8262, ar: "مكة المكرمة", en: "Mecca", tr: "Mekke", tz: 3 },
  "medina": { lat: 24.5247, lng: 39.5692, ar: "المدينة المنورة", en: "Medina", tr: "Medine", tz: 3 },
  "riyadh": { lat: 24.7136, lng: 46.6753, ar: "الرياض", en: "Riyadh", tr: "Riyad", tz: 3 },
  "jeddah": { lat: 21.5433, lng: 39.1728, ar: "جدة", en: "Jeddah", tr: "Cidde", tz: 3 },
  "dammam": { lat: 26.4207, lng: 50.0888, ar: "الدمام", en: "Dammam", tr: "Dammam", tz: 3 },
  "abha": { lat: 18.2164, lng: 42.5053, ar: "أبها", en: "Abha", tr: "Abha", tz: 3 },
  "tabuk": { lat: 28.3998, lng: 36.5715, ar: "تبوك", en: "Tabuk", tr: "Tebük", tz: 3 },
  "cairo": { lat: 30.0444, lng: 31.2357, ar: "القاهرة", en: "Cairo", tr: "Kahire", tz: 2 },
  "alexandria": { lat: 31.2001, lng: 29.9187, ar: "الإسكندرية", en: "Alexandria", tr: "İskenderiye", tz: 2 },
  "giza": { lat: 30.0131, lng: 31.2089, ar: "الجيزة", en: "Giza", tr: "Gize", tz: 2 },
  "luxor": { lat: 25.6872, lng: 32.6396, ar: "الأقصر", en: "Luxor", tr: "Luksor", tz: 2 },
  "aswan": { lat: 24.0889, lng: 32.8998, ar: "أسوان", en: "Aswan", tr: "Esvan", tz: 2 },
  "dubai": { lat: 25.2048, lng: 55.2708, ar: "دبي", en: "Dubai", tr: "Dubai", tz: 4 },
  "abudhabi": { lat: 24.4539, lng: 54.3773, ar: "أبوظبي", en: "Abu Dhabi", tr: "Abu Dabi", tz: 4 },
  "sharjah": { lat: 25.3573, lng: 55.4033, ar: "الشارقة", en: "Sharjah", tr: "Şarja", tz: 4 },
  "doha": { lat: 25.2854, lng: 51.5310, ar: "الدوحة", en: "Doha", tr: "Doha", tz: 3 },
  "kuwait": { lat: 29.3759, lng: 47.9774, ar: "الكويت", en: "Kuwait City", tr: "Kuveyt", tz: 3 },
  "manama": { lat: 26.2285, lng: 50.5860, ar: "المنامة", en: "Manama", tr: "Manama", tz: 3 },
  "muscat": { lat: 23.5880, lng: 58.3829, ar: "مسقط", en: "Muscat", tr: "Muskat", tz: 4 },
  "baghdad": { lat: 33.3152, lng: 44.3661, ar: "بغداد", en: "Baghdad", tr: "Bağdat", tz: 3 },
  "basra": { lat: 30.5085, lng: 47.7804, ar: "البصرة", en: "Basra", tr: "Basra", tz: 3 },
  "amman": { lat: 31.9454, lng: 35.9284, ar: "عمّان", en: "Amman", tr: "Amman", tz: 3 },
  "beirut": { lat: 33.8938, lng: 35.5018, ar: "بيروت", en: "Beirut", tr: "Beyrut", tz: 3 },
  "damascus": { lat: 33.5138, lng: 36.2765, ar: "دمشق", en: "Damascus", tr: "Şam", tz: 3 },
  "jerusalem": { lat: 31.7683, lng: 35.2137, ar: "القدس", en: "Jerusalem", tr: "Kudüs", tz: 3 },
  "gaza": { lat: 31.5017, lng: 34.4668, ar: "غزة", en: "Gaza", tr: "Gazze", tz: 3 },
  "casablanca": { lat: 33.5731, lng: -7.5898, ar: "الدار البيضاء", en: "Casablanca", tr: "Kazablanka", tz: 1 },
  "rabat": { lat: 34.0209, lng: -6.8416, ar: "الرباط", en: "Rabat", tr: "Rabat", tz: 1 },
  "marrakech": { lat: 31.6295, lng: -7.9811, ar: "مراكش", en: "Marrakech", tr: "Marakeş", tz: 1 },
  "fez": { lat: 34.0181, lng: -5.0078, ar: "فاس", en: "Fez", tr: "Fas", tz: 1 },
  "algiers": { lat: 36.7538, lng: 3.0588, ar: "الجزائر", en: "Algiers", tr: "Cezayir", tz: 1 },
  "tunis": { lat: 36.8065, lng: 10.1815, ar: "تونس", en: "Tunis", tr: "Tunus", tz: 1 },
  "tripoli": { lat: 32.8872, lng: 13.1913, ar: "طرابلس", en: "Tripoli", tr: "Trablus", tz: 2 },
  "khartoum": { lat: 15.5007, lng: 32.5599, ar: "الخرطوم", en: "Khartoum", tr: "Hartum", tz: 2 },
  "sanaa": { lat: 15.3694, lng: 44.1910, ar: "صنعاء", en: "Sanaa", tr: "Sana", tz: 3 },
  "istanbul": { lat: 41.0082, lng: 28.9784, ar: "إسطنبول", en: "Istanbul", tr: "İstanbul", tz: 3 },
  "ankara": { lat: 39.9334, lng: 32.8597, ar: "أنقرة", en: "Ankara", tr: "Ankara", tz: 3 },
  "izmir": { lat: 38.4237, lng: 27.1428, ar: "إزمير", en: "Izmir", tr: "İzmir", tz: 3 },
  "karachi": { lat: 24.8607, lng: 67.0011, ar: "كراتشي", en: "Karachi", tr: "Karaçi", tz: 5 },
  "lahore": { lat: 31.5204, lng: 74.3587, ar: "لاهور", en: "Lahore", tr: "Lahor", tz: 5 },
  "islamabad": { lat: 33.6844, lng: 73.0479, ar: "إسلام آباد", en: "Islamabad", tr: "İslamabad", tz: 5 },
  "delhi": { lat: 28.7041, lng: 77.1025, ar: "دلهي", en: "Delhi", tr: "Delhi", tz: 5.5 },
  "mumbai": { lat: 19.0760, lng: 72.8777, ar: "مومباي", en: "Mumbai", tr: "Mumbai", tz: 5.5 },
  "hyderabad-in": { lat: 17.3850, lng: 78.4867, ar: "حيدر آباد", en: "Hyderabad", tr: "Haydarabad", tz: 5.5 },
  "dhaka": { lat: 23.8103, lng: 90.4125, ar: "دكا", en: "Dhaka", tr: "Dakka", tz: 6 },
  "jakarta": { lat: -6.2088, lng: 106.8456, ar: "جاكرتا", en: "Jakarta", tr: "Cakarta", tz: 7 },
  "kualalumpur": { lat: 3.1390, lng: 101.6869, ar: "كوالالمبور", en: "Kuala Lumpur", tr: "Kuala Lumpur", tz: 8 },
  "london": { lat: 51.5074, lng: -0.1278, ar: "لندن", en: "London", tr: "Londra", tz: 0 },
  "birmingham": { lat: 52.4862, lng: -1.8904, ar: "برمنغهام", en: "Birmingham", tr: "Birmingham", tz: 0 },
  "manchester": { lat: 53.4808, lng: -2.2426, ar: "مانشستر", en: "Manchester", tr: "Manchester", tz: 0 },
  "paris": { lat: 48.8566, lng: 2.3522, ar: "باريس", en: "Paris", tr: "Paris", tz: 1 },
  "lyon": { lat: 45.7640, lng: 4.8357, ar: "ليون", en: "Lyon", tr: "Lyon", tz: 1 },
  "berlin": { lat: 52.5200, lng: 13.4050, ar: "برلين", en: "Berlin", tr: "Berlin", tz: 1 },
  "frankfurt": { lat: 50.1109, lng: 8.6821, ar: "فرانكفورت", en: "Frankfurt", tr: "Frankfurt", tz: 1 },
  "newyork": { lat: 40.7128, lng: -74.0060, ar: "نيويورك", en: "New York", tr: "New York", tz: -5 },
  "losangeles": { lat: 34.0522, lng: -118.2437, ar: "لوس أنجلوس", en: "Los Angeles", tr: "Los Angeles", tz: -8 },
  "chicago": { lat: 41.8781, lng: -87.6298, ar: "شيكاغو", en: "Chicago", tr: "Şikago", tz: -6 },
  "houston": { lat: 29.7604, lng: -95.3698, ar: "هيوستن", en: "Houston", tr: "Houston", tz: -6 },
  "toronto": { lat: 43.6532, lng: -79.3832, ar: "تورنتو", en: "Toronto", tr: "Toronto", tz: -5 },
  "montreal": { lat: 45.5017, lng: -73.5673, ar: "مونتريال", en: "Montreal", tr: "Montreal", tz: -5 },
  "sydney": { lat: -33.8688, lng: 151.2093, ar: "سيدني", en: "Sydney", tr: "Sidney", tz: 10 },
  "melbourne": { lat: -37.8136, lng: 144.9631, ar: "ملبورن", en: "Melbourne", tr: "Melbourne", tz: 10 },
  "moscow": { lat: 55.7558, lng: 37.6173, ar: "موسكو", en: "Moscow", tr: "Moskova", tz: 3 },
  "beijing": { lat: 39.9042, lng: 116.4074, ar: "بكين", en: "Beijing", tr: "Pekin", tz: 8 },
  "tokyo": { lat: 35.6762, lng: 139.6503, ar: "طوكيو", en: "Tokyo", tr: "Tokyo", tz: 9 },
  "capetown": { lat: -33.9249, lng: 18.4241, ar: "كيب تاون", en: "Cape Town", tr: "Cape Town", tz: 2 },
  "johannesburg": { lat: -26.2041, lng: 28.0473, ar: "جوهانسبرغ", en: "Johannesburg", tr: "Johannesburg", tz: 2 },
  "lagos": { lat: 6.5244, lng: 3.3792, ar: "لاغوس", en: "Lagos", tr: "Lagos", tz: 1 },
  "nairobi": { lat: -1.2921, lng: 36.8219, ar: "نيروبي", en: "Nairobi", tr: "Nairobi", tz: 3 },
};

const CITY_GROUPS: Record<string, string[]> = {
  "السعودية": ["mecca", "medina", "riyadh", "jeddah", "dammam", "abha", "tabuk"],
  "مصر": ["cairo", "alexandria", "giza", "luxor", "aswan"],
  "الإمارات": ["dubai", "abudhabi", "sharjah"],
  "الخليج": ["doha", "kuwait", "manama", "muscat"],
  "العراق والشام": ["baghdad", "basra", "amman", "beirut", "damascus", "jerusalem", "gaza"],
  "شمال أفريقيا": ["casablanca", "rabat", "marrakech", "fez", "algiers", "tunis", "tripoli"],
  "السودان واليمن": ["khartoum", "sanaa"],
  "تركيا": ["istanbul", "ankara", "izmir"],
  "جنوب آسيا": ["karachi", "lahore", "islamabad", "delhi", "mumbai", "hyderabad-in"],
  "جنوب شرق آسيا": ["dhaka", "jakarta", "kualalumpur"],
  "أوروبا": ["london", "birmingham", "manchester", "paris", "lyon", "berlin", "frankfurt"],
  "أمريكا وكندا": ["newyork", "losangeles", "chicago", "houston", "toronto", "montreal"],
  "أستراليا": ["sydney", "melbourne"],
  "أخرى": ["moscow", "beijing", "tokyo", "capetown", "johannesburg", "lagos", "nairobi"],
};

// ─── Prayer calculation engine ───
function toRadians(deg: number): number { return (deg * Math.PI) / 180; }
function toDegrees(rad: number): number { return (rad * 180) / Math.PI; }

function calcPrayerTimes(lat: number, lng: number, tz: number, method: string, date: Date) {
  const m = METHODS[method] || METHODS["1"];
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Julian Date
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m2 = month + 12 * a - 3;
  const jd = day + Math.floor((153 * m2 + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  // Solar calculations
  const d = jd - 2451545.0;
  const g = (357.529 + 0.98560028 * d) % 360;
  const q = (280.459 + 0.98564736 * d) % 360;
  const L = (q + 1.915 * Math.sin(toRadians(g)) + 0.020 * Math.sin(toRadians(2 * g))) % 360;
  const e = 23.439 - 0.00000036 * d;
  const RA = toDegrees(Math.atan2(Math.cos(toRadians(e)) * Math.sin(toRadians(L)), Math.cos(toRadians(L)))) / 15;
  const decl = toDegrees(Math.asin(Math.sin(toRadians(e)) * Math.sin(toRadians(L))));

  // Equation of time
  const EqT = q / 15 - RA;

  // Solar noon
  const noon = 12 + tz - lng / 15 - EqT;

  // Helper: time for angle
  function timeForAngle(angle: number): number {
    const cosT = (Math.sin(toRadians(angle)) - Math.sin(toRadians(lat)) * Math.sin(toRadians(decl))) /
      (Math.cos(toRadians(lat)) * Math.cos(toRadians(decl)));
    if (cosT > 1 || cosT < -1) return NaN;
    return toDegrees(Math.acos(cosT)) / 15;
  }

  const fajrTime = noon - timeForAngle(-m.fajrAngle);
  let ishaTime: number;
  if (m.ishaOffset) {
    const sunset = noon + timeForAngle(-0.833);
    ishaTime = sunset + m.ishaOffset / 60;
  } else {
    ishaTime = noon + timeForAngle(-m.ishaAngle);
  }

  const sunrise = noon - timeForAngle(-0.833);
  const sunset = noon + timeForAngle(-0.833);
  const dhuhr = noon + 2 / 60; // +2 minutes
  const asrShadow = 1 + Math.tan(toRadians(Math.abs(lat - decl)));
  const asrTime = noon + timeForAngle(toDegrees(Math.atan(1 / asrShadow)));

  const formatTime = (t: number): string => {
    if (isNaN(t)) return "--:--";
    const h = Math.floor(t);
    const min = Math.round((t - h) * 60);
    const hh = ((h % 24) + 24) % 24;
    return `${hh.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
  };

  return {
    fajr: formatTime(fajrTime),
    sunrise: formatTime(sunrise),
    dhuhr: formatTime(dhuhr),
    asr: formatTime(asrTime),
    maghrib: formatTime(sunset),
    isha: formatTime(ishaTime),
  };
}

// ─── Hijri date ───
function getHijriDate(date: Date): string {
  const jd = Math.floor((date.getTime() / 86400000) + 2440587.5);
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const m = Math.floor((24 * l3) / 709);
  const d = l3 - Math.floor((709 * m) / 24);
  const y = 30 * n + j - 30;
  const months = ["محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"];
  return `${d} ${months[m - 1] || ""} ${y} هـ`;
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

function getHijriDateTR(date: Date): string {
  const jd = Math.floor((date.getTime() / 86400000) + 2440587.5);
  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) + Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const m = Math.floor((24 * l3) / 709);
  const d = l3 - Math.floor((709 * m) / 24);
  const y = 30 * n + j - 30;
  const months = ["Muharrem", "Safer", "Rebiülevvel", "Rebiülahir", "Cemaziyelevvel", "Cemaziyelahir", "Recep", "Şaban", "Ramazan", "Şevval", "Zilkade", "Zilhicce"];
  return `${d} ${months[m - 1] || ""} ${y} Hicri`;
}

// ─── Countdown ───
function getNextPrayer(times: { fajr: string; sunrise: string; dhuhr: string; asr: string; maghrib: string; isha: string }, now: Date): { name: string; nameAr: string; nameTr: string; time: string; diff: number } | null {
  const prayers = [
    { key: "fajr", name: "Fajr", nameAr: "الفجر", nameTr: "İmsak" },
    { key: "sunrise", name: "Sunrise", nameAr: "الشروق", nameTr: "Güneş" },
    { key: "dhuhr", name: "Dhuhr", nameAr: "الظهر", nameTr: "Öğle" },
    { key: "asr", name: "Asr", nameAr: "العصر", nameTr: "İkindi" },
    { key: "maghrib", name: "Maghrib", nameAr: "المغرب", nameTr: "Akşam" },
    { key: "isha", name: "Isha", nameAr: "العشاء", nameTr: "Yatsı" },
  ];
  const nowMin = now.getHours() * 60 + now.getMinutes();

  for (const p of prayers) {
    const t = times[p.key as keyof typeof times];
    if (!t || t === "--:--") continue;
    const [h, m] = t.split(":").map(Number);
    const prayerMin = h * 60 + m;
    if (prayerMin > nowMin) {
      return { name: p.name, nameAr: p.nameAr, nameTr: p.nameTr, time: t, diff: prayerMin - nowMin };
    }
  }
  // Next is Fajr tomorrow
  const t = times.fajr;
  if (t && t !== "--:--") {
    const [h, m] = t.split(":").map(Number);
    return { name: "Fajr", nameAr: "الفجر", nameTr: "İmsak", time: t, diff: (24 * 60 - nowMin) + (h * 60 + m) };
  }
  return null;
}

function formatCountdown(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0) return `${h}س ${m}د`;
  return `${m}د`;
}

function formatCountdownEN(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function formatCountdownTR(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0) return `${h}sa ${m}dk`;
  return `${m}dk`;
}

// ─── Main Component ───
type Mode = "idle" | "city" | "manual" | "result" | "locating" | "error";

const PRAYER_ICONS: Record<string, string> = {
  fajr: "🌙", sunrise: "🌅", dhuhr: "☀️", asr: "🌤️", maghrib: "🌇", isha: "🌃",
};

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

  // Update countdown every minute
  useEffect(() => {
    timerRef.current = setInterval(() => setNow(new Date()), 60000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    if (times) {
      setCountdown(getNextPrayer(times, now));
    }
  }, [times, now]);

  const calcAndShow = useCallback((lat: number, lng: number, tz: number, name: string) => {
    const today = new Date();
    const t = calcPrayerTimes(lat, lng, tz, method, today);
    setTimes(t);
    setHijriDate(getHijriDate(today));
    setGregDate(today.toLocaleDateString("ar-SA", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
    setCityName(name);
    setMode("result");
    setCountdown(getNextPrayer(t, new Date()));
  }, [method]);

  const handleGPS = () => {
    if (!navigator.geolocation) { setErrorMsg("متصفحك لا يدعم تحديد الموقع"); setMode("error"); return; }
    setMode("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const tz = Math.round(pos.coords.longitude / 15);
        calcAndShow(pos.coords.latitude, pos.coords.longitude, tz, "موقعك الحالي");
      },
      () => {
        setErrorMsg("تعذر تحديد موقعك. تأكد أن GPS مفعل.");
        setMode("error");
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  const handleCity = () => {
    const city = CITIES[selectedCity];
    if (city) calcAndShow(city.lat, city.lng, city.tz, city.ar);
  };

  const handleManual = () => {
    const lat = parseFloat(manualLat), lng = parseFloat(manualLng), tz = parseFloat(manualTz);
    if (isNaN(lat) || isNaN(lng) || isNaN(tz)) { setErrorMsg("أدخل إحداثيات صحيحة"); setMode("error"); return; }
    calcAndShow(lat, lng, tz, `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`);
  };

  const reset = () => { setMode("idle"); setErrorMsg(""); setSelectedCity(""); setManualLat(""); setManualLng(""); setManualTz(""); };

  const prayerOrder = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];
  const prayerNamesAr: Record<string, string> = { fajr: "الفجر", sunrise: "الشروق", dhuhr: "الظهر", asr: "العصر", maghrib: "المغرب", isha: "العشاء" };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("مواقيت الصلاة", "أوقات الصلاة الخمس حسب موقعك — حساب دقيق مع عد تنازلي", "https://adwatak.cloud/tools/prayer-times", "ar", "Islamic")} />
      <StructuredData data={faqSchema([
        { question: "ما هي طرق الحساب المتاحة؟", answer: "أم القرى (السعودية)، الهيئة المصرية، رابطة العالم الإسلامي، جامعة كراتشي، ISNA (أمريكا)، الكويت، قطر، سنغافورة." },
        { question: "هل الحساب دقيق؟", answer: "نعم، نستخدم نفس الصيغ الرياضية المستخدمة في التطبيقات الكبرى. قد يختلف دقيقة أو دقيقتين عن التقويم الرسمي." },
        { question: "هل يعمل بدون إنترنت؟", answer: "نعم! الحساب يتم محلياً في متصفحك. فقط GPS يحتاج إذن الموقع." },
        { question: "ما هو العد التنازلي؟", answer: "يعرض الوقت المتبقي للصلاة القادمة بالدقائق والساعات." },
        { question: "هل يعرض التاريخ الهجري؟", answer: "نعم، التاريخ الهجري والميلادي معروضان أعلى الصفحة." },
        { question: "كم مدينة متاحة؟", answer: "أكثر من 60 مدينة في 35+ دولة عربية وعالمية." },
      ])} />
      <StructuredData data={breadcrumbSchema([
        { name: "الرئيسية", url: "https://adwatak.cloud" },
        { name: "أدوات إسلامية", url: "https://adwatak.cloud/category/islamic" },
        { name: "مواقيت الصلاة", url: "https://adwatak.cloud/tools/prayer-times" },
      ])} />
      <Breadcrumb category="أدوات إسلامية" categorySlug="islamic" toolName="مواقيت الصلاة" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🕐 مواقيت الصلاة</h1>
        <p className="text-sm text-gray-500 mb-6">أوقات الصلاة الخمس حسب موقعك — حساب دقيق مع عد تنازلي للصلاة القادمة</p>

        {/* Method selector */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">طريقة الحساب:</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none">
            {Object.entries(METHODS).map(([k, v]) => <option key={k} value={k}>{v.ar}</option>)}
          </select>
        </div>

        {/* Result */}
        {mode === "result" && times && (
          <div>
            {/* Date header */}
            <div className="text-center mb-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <p className="text-sm font-bold text-emerald-800">📅 {gregDate}</p>
              <p className="text-xs text-emerald-600">{hijriDate}</p>
              <p className="text-xs text-gray-500 mt-1">📍 {cityName} — {METHODS[method]?.ar}</p>
            </div>

            {/* Countdown */}
            {countdown && (
              <div className="text-center mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <p className="text-xs text-blue-600 font-semibold">الصلاة القادمة: {countdown.nameAr}</p>
                <p className="text-3xl font-extrabold text-blue-800 my-1">{formatCountdown(countdown.diff)}</p>
                <p className="text-xs text-blue-500">الساعة {countdown.time}</p>
              </div>
            )}

            {/* Prayer times */}
            <div className="space-y-2">
              {prayerOrder.map((key) => {
                const time = times[key as keyof typeof times];
                const isNext = countdown && countdown.nameAr === prayerNamesAr[key];
                const isMaghrib = key === "maghrib";
                const isFajr = key === "fajr";
                return (
                  <div key={key} className={`flex justify-between items-center rounded-xl p-4 px-5 border transition-all ${
                    isNext ? "bg-blue-50 border-blue-300 shadow-sm ring-2 ring-blue-200" :
                    isMaghrib ? "bg-orange-50 border-orange-200" :
                    isFajr ? "bg-indigo-50 border-indigo-200" :
                    "bg-gray-50 border-gray-200"
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{PRAYER_ICONS[key]}</span>
                      <span className={`font-semibold ${isNext ? "text-blue-800" : "text-gray-700"}`}>
                        {prayerNamesAr[key]}
                        {isNext && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full mr-2">القادمة</span>}
                      </span>
                    </div>
                    <span className={`text-xl font-extrabold font-mono ${isNext ? "text-blue-800" : isMaghrib ? "text-orange-800" : "text-gray-800"}`}>{time}</span>
                  </div>
                );
              })}
            </div>

            <button onClick={reset} className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">🔄 تغيير الموقع</button>
          </div>
        )}

        {/* Idle */}
        {mode === "idle" && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">حدد موقعك:</p>
            <button onClick={handleGPS} className="w-full flex items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">📍</span>
              <div className="text-right"><p className="font-bold">تحديد موقعي تلقائياً (GPS)</p><p className="text-xs opacity-80">الأدق — يستخدم موقعك الحقيقي</p></div>
            </button>
            <button onClick={() => setMode("city")} className="w-full flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">🏙️</span>
              <div className="text-right"><p className="font-bold">اختيار المدينة</p><p className="text-xs opacity-80">أكثر من 60 مدينة</p></div>
            </button>
            <button onClick={() => setMode("manual")} className="w-full flex items-center gap-4 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">📐</span>
              <div className="text-right"><p className="font-bold">إدخال الإحداثيات يدوياً</p><p className="text-xs opacity-80">خط العرض والطول والمنطقة الزمنية</p></div>
            </button>
          </div>
        )}

        {/* City selector */}
        {mode === "city" && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">اختر المدينة:</label>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 outline-none">
              <option value="">اختر المدينة...</option>
              {Object.entries(CITY_GROUPS).map(([group, cities]) => (
                <optgroup key={group} label={group}>
                  {cities.map((key) => <option key={key} value={key}>{CITIES[key].ar}</option>)}
                </optgroup>
              ))}
            </select>
            <div className="flex gap-3">
              <button onClick={handleCity} disabled={!selectedCity} className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors">عرض المواقيت</button>
              <button onClick={reset} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">رجوع</button>
            </div>
          </div>
        )}

        {/* Manual */}
        {mode === "manual" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">خط العرض:</label>
              <input type="number" step="any" value={manualLat} onChange={(e) => setManualLat(e.target.value)} placeholder="مثال: 30.0444" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">خط الطول:</label>
              <input type="number" step="any" value={manualLng} onChange={(e) => setManualLng(e.target.value)} placeholder="مثال: 31.2357" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">المنطقة الزمنية (UTC):</label>
              <input type="number" step="any" value={manualTz} onChange={(e) => setManualTz(e.target.value)} placeholder="مثال: 3 (السعودية)، 2 (مصر)" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div className="flex gap-3">
              <button onClick={handleManual} disabled={!manualLat || !manualLng || !manualTz} className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors">حساب المواقيت</button>
              <button onClick={reset} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">رجوع</button>
            </div>
          </div>
        )}

        {mode === "locating" && (
          <div className="text-center py-10">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-semibold">جاري تحديد موقعك...</p>
          </div>
        )}

        {mode === "error" && (
          <div className="text-center py-6">
            <p className="text-red-600 font-semibold mb-4">⚠️ {errorMsg}</p>
            <button onClick={reset} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">🔄 حاول مرة أخرى</button>
          </div>
        )}
      </div>

      <SEOContent content={[
        "مواقيت الصلاة الخمس حسب موقعك — حساب رياضي دقيق بدون API خارجية.",
        "8 طرق حساب: أم القرى، الهيئة المصرية، رابطة العالم الإسلامي، كراتشي، ISNA، الكويت، قطر، سنغافورة.",
        "عد تنازلي للصلاة القادمة + تاريخ هجري وميلادي + أكثر من 60 مدينة.",
        "GPS تلقائي أو اختيار المدينة أو إدخال الإحداثيات يدوياً.",
        "يعمل بالكامل في المتصفح — لا يحتاج إنترنت بعد التحميل.",
      ]} lang="ar" />
      <FAQSection faqs={[
        { question: "ما هي طرق الحساب المتاحة؟", answer: "أم القرى (السعودية)، الهيئة المصرية، رابطة العالم الإسلامي، جامعة كراتشي، ISNA (أمريكا)، الكويت، قطر، سنغافورة." },
        { question: "هل الحساب دقيق؟", answer: "نعم، نستخدم نفس الصيغ الرياضية المستخدمة في التطبيقات الكبرى." },
        { question: "هل يعمل بدون إنترنت؟", answer: "نعم! الحساب يتم محلياً في متصفحك." },
        { question: "كم مدينة متاحة؟", answer: "أكثر من 60 مدينة في 35+ دولة." },
      ]} lang="ar" />
      <RelatedTools tools={[
        { title: "اتجاه القبلة", icon: "🧭", href: "/tools/qibla-direction" },
        { title: "تحويل هجري ميلادي", icon: "📅", href: "/tools/hijri-converter" },
        { title: "حاسبة الزكاة", icon: "🕌", href: "/tools/zakat-calculator" },
        { title: "حاسبة الميراث", icon: "📜", href: "/tools/inheritance-calculator" },
      ]} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
