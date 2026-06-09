"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

// ─── Kabe koordinatları ───
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

// ─── Büyük şehir veritabanı (lat, lng) ───
const CITIES: Record<string, { lat: number; lng: number; tr: string }> = {
  // Suudi Arabistan
  "mecca-sa": { lat: 21.4225, lng: 39.8262, tr: "Mekke" },
  "medina-sa": { lat: 24.5247, lng: 39.5692, tr: "Medine" },
  "riyadh-sa": { lat: 24.7136, lng: 46.6753, tr: "Riyad" },
  "jeddah-sa": { lat: 21.5433, lng: 39.1728, tr: "Cidde" },
  "dammam-sa": { lat: 26.4207, lng: 50.0888, tr: "Dammam" },
  "abha-sa": { lat: 18.2164, lng: 42.5053, tr: "Abha" },
  "tabuk-sa": { lat: 28.3998, lng: 36.5715, tr: "Tebük" },
  // Mısır
  "cairo-eg": { lat: 30.0444, lng: 31.2357, tr: "Kahire" },
  "alexandria-eg": { lat: 31.2001, lng: 29.9187, tr: "İskenderiye" },
  "giza-eg": { lat: 30.0131, lng: 31.2089, tr: "Gize" },
  "luxor-eg": { lat: 25.6872, lng: 32.6396, tr: "Luksor" },
  "aswan-eg": { lat: 24.0889, lng: 32.8998, tr: "Esvan" },
  // BAE
  "dubai-ae": { lat: 25.2048, lng: 55.2708, tr: "Dubai" },
  "abudhabi-ae": { lat: 24.4539, lng: 54.3773, tr: "Abu Dabi" },
  "sharjah-ae": { lat: 25.3573, lng: 55.4033, tr: "Sharjah" },
  // Katar
  "doha-qa": { lat: 25.2854, lng: 51.5310, tr: "Doha" },
  // Kuveyt
  "kuwait-kw": { lat: 29.3759, lng: 47.9774, tr: "Kuveyt Şehri" },
  // Bahreyn
  "manama-bh": { lat: 26.2285, lng: 50.5860, tr: "Manama" },
  // Umman
  "muscat-om": { lat: 23.5880, lng: 58.3829, tr: "Maskat" },
  // Irak
  "baghdad-iq": { lat: 33.3152, lng: 44.3661, tr: "Bağdat" },
  "basra-iq": { lat: 30.5085, lng: 47.7804, tr: "Basra" },
  // Ürdün
  "amman-jo": { lat: 31.9454, lng: 35.9284, tr: "Amman" },
  // Lübnan
  "beirut-lb": { lat: 33.8938, lng: 35.5018, tr: "Beyrut" },
  // Suriye
  "damascus-sy": { lat: 33.5138, lng: 36.2765, tr: "Şam" },
  // Filistin
  "jerusalem-ps": { lat: 31.7683, lng: 35.2137, tr: "Kudüs" },
  "gaza-ps": { lat: 31.5017, lng: 34.4668, tr: "Gazze" },
  // Fas
  "casablanca-ma": { lat: 33.5731, lng: -7.5898, tr: "Kazablanka" },
  "rabat-ma": { lat: 34.0209, lng: -6.8416, tr: "Rabat" },
  "marrakech-ma": { lat: 31.6295, lng: -7.9811, tr: "Marakeş" },
  "fez-ma": { lat: 34.0181, lng: -5.0078, tr: "Fas" },
  // Cezayir
  "algiers-dz": { lat: 36.7538, lng: 3.0588, tr: "Cezayir" },
  // Tunus
  "tunis-tn": { lat: 36.8065, lng: 10.1815, tr: "Tunus" },
  // Libya
  "tripoli-ly": { lat: 32.8872, lng: 13.1913, tr: "Trablus" },
  // Sudan
  "khartoum-sd": { lat: 15.5007, lng: 32.5599, tr: "Hartum" },
  // Yemen
  "sanaa-ye": { lat: 15.3694, lng: 44.1910, tr: "Sana" },
  // Türkiye
  "istanbul-tr": { lat: 41.0082, lng: 28.9784, tr: "İstanbul" },
  "ankara-tr": { lat: 39.9334, lng: 32.8597, tr: "Ankara" },
  // Pakistan
  "karachi-pk": { lat: 24.8607, lng: 67.0011, tr: "Karaçi" },
  "lahore-pk": { lat: 31.5204, lng: 74.3587, tr: "Lahor" },
  "islamabad-pk": { lat: 33.6844, lng: 73.0479, tr: "İslamabad" },
  // Hindistan
  "delhi-in": { lat: 28.7041, lng: 77.1025, tr: "Delhi" },
  "mumbai-in": { lat: 19.0760, lng: 72.8777, tr: "Mumbai" },
  "hyderabad-in": { lat: 17.3850, lng: 78.4867, tr: "Hyderabad" },
  // Bangladeş
  "dhaka-bd": { lat: 23.8103, lng: 90.4125, tr: "Dakka" },
  // Endonezya
  "jakarta-id": { lat: -6.2088, lng: 106.8456, tr: "Cakarta" },
  // Malezya
  "kualalumpur-my": { lat: 3.1390, lng: 101.6869, tr: "Kuala Lumpur" },
  // İngiltere
  "london-gb": { lat: 51.5074, lng: -0.1278, tr: "Londra" },
  "birmingham-gb": { lat: 52.4862, lng: -1.8904, tr: "Birmingham" },
  "manchester-gb": { lat: 53.4808, lng: -2.2426, tr: "Manchester" },
  // Fransa
  "paris-fr": { lat: 48.8566, lng: 2.3522, tr: "Paris" },
  "lyon-fr": { lat: 45.7640, lng: 4.8357, tr: "Lyon" },
  // Almanya
  "berlin-de": { lat: 52.5200, lng: 13.4050, tr: "Berlin" },
  "frankfurt-de": { lat: 50.1109, lng: 8.6821, tr: "Frankfurt" },
  // ABD
  "newyork-us": { lat: 40.7128, lng: -74.0060, tr: "New York" },
  "losangeles-us": { lat: 34.0522, lng: -118.2437, tr: "Los Angeles" },
  "chicago-us": { lat: 41.8781, lng: -87.6298, tr: "Chicago" },
  "houston-us": { lat: 29.7604, lng: -95.3698, tr: "Houston" },
  // Kanada
  "toronto-ca": { lat: 43.6532, lng: -79.3832, tr: "Toronto" },
  "montreal-ca": { lat: 45.5017, lng: -73.5673, tr: "Montreal" },
  // Avustralya
  "sydney-au": { lat: -33.8688, lng: 151.2093, tr: "Sidney" },
  "melbourne-au": { lat: -37.8136, lng: 144.9631, tr: "Melbourne" },
  // Rusya
  "moscow-ru": { lat: 55.7558, lng: 37.6173, tr: "Moskova" },
  // Çin
  "beijing-cn": { lat: 39.9042, lng: 116.4074, tr: "Pekin" },
  // Japonya
  "tokyo-jp": { lat: 35.6762, lng: 139.6503, tr: "Tokyo" },
  // Güney Afrika
  "capetown-za": { lat: -33.9249, lng: 18.4241, tr: "Cape Town" },
  "johannesburg-za": { lat: -26.2041, lng: 28.0473, tr: "Johannesburg" },
  // Nijerya
  "lagos-ng": { lat: 6.5244, lng: 3.3792, tr: "Lagos" },
  // Kenya
  "nairobi-ke": { lat: -1.2921, lng: 36.8219, tr: "Nairobi" },
};

// Şehirleri ülkeye göre gruplandır
const COUNTRIES: Record<string, { tr: string; cities: string[] }> = {
  sa: { tr: "Suudi Arabistan", cities: ["mecca-sa", "medina-sa", "riyadh-sa", "jeddah-sa", "dammam-sa", "abha-sa", "tabuk-sa"] },
  eg: { tr: "Mısır", cities: ["cairo-eg", "alexandria-eg", "giza-eg", "luxor-eg", "aswan-eg"] },
  ae: { tr: "BAE", cities: ["dubai-ae", "abudhabi-ae", "sharjah-ae"] },
  qa: { tr: "Katar", cities: ["doha-qa"] },
  kw: { tr: "Kuveyt", cities: ["kuwait-kw"] },
  bh: { tr: "Bahreyn", cities: ["manama-bh"] },
  om: { tr: "Umman", cities: ["muscat-om"] },
  iq: { tr: "Irak", cities: ["baghdad-iq", "basra-iq"] },
  jo: { tr: "Ürdün", cities: ["amman-jo"] },
  lb: { tr: "Lübnan", cities: ["beirut-lb"] },
  sy: { tr: "Suriye", cities: ["damascus-sy"] },
  ps: { tr: "Filistin", cities: ["jerusalem-ps", "gaza-ps"] },
  ma: { tr: "Fas", cities: ["casablanca-ma", "rabat-ma", "marrakech-ma", "fez-ma"] },
  dz: { tr: "Cezayir", cities: ["algiers-dz"] },
  tn: { tr: "Tunus", cities: ["tunis-tn"] },
  ly: { tr: "Libya", cities: ["tripoli-ly"] },
  sd: { tr: "Sudan", cities: ["khartoum-sd"] },
  ye: { tr: "Yemen", cities: ["sanaa-ye"] },
  tr: { tr: "Türkiye", cities: ["istanbul-tr", "ankara-tr"] },
  pk: { tr: "Pakistan", cities: ["karachi-pk", "lahore-pk", "islamabad-pk"] },
  in: { tr: "Hindistan", cities: ["delhi-in", "mumbai-in", "hyderabad-in"] },
  bd: { tr: "Bangladeş", cities: ["dhaka-bd"] },
  id: { tr: "Endonezya", cities: ["jakarta-id"] },
  my: { tr: "Malezya", cities: ["kualalumpur-my"] },
  gb: { tr: "Birleşik Krallık", cities: ["london-gb", "birmingham-gb", "manchester-gb"] },
  fr: { tr: "Fransa", cities: ["paris-fr", "lyon-fr"] },
  de: { tr: "Almanya", cities: ["berlin-de", "frankfurt-de"] },
  us: { tr: "Amerika Birleşik Devletleri", cities: ["newyork-us", "losangeles-us", "chicago-us", "houston-us"] },
  ca: { tr: "Kanada", cities: ["toronto-ca", "montreal-ca"] },
  au: { tr: "Avustralya", cities: ["sydney-au", "melbourne-au"] },
  ru: { tr: "Rusya", cities: ["moscow-ru"] },
  cn: { tr: "Çin", cities: ["beijing-cn"] },
  jp: { tr: "Japonya", cities: ["tokyo-jp"] },
  za: { tr: "Güney Afrika", cities: ["capetown-za", "johannesburg-za"] },
  ng: { tr: "Nijerya", cities: ["lagos-ng"] },
  ke: { tr: "Kenya", cities: ["nairobi-ke"] },
};

// ─── Haversine formülü ile Kabe yönü hesaplama ───
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

function bearingToDirection(bearing: number): string {
  if (bearing >= 337.5 || bearing < 22.5) return "Kuzey";
  if (bearing >= 22.5 && bearing < 67.5) return "Kuzeydoğu";
  if (bearing >= 67.5 && bearing < 112.5) return "Doğu";
  if (bearing >= 112.5 && bearing < 157.5) return "Güneydoğu";
  if (bearing >= 157.5 && bearing < 202.5) return "Güney";
  if (bearing >= 202.5 && bearing < 247.5) return "Güneybatı";
  if (bearing >= 247.5 && bearing < 292.5) return "Batı";
  return "Kuzeybatı";
}

function bearingToRelativeDirection(bearing: number, deviceHeading: number): string {
  let rel = bearing - deviceHeading;
  rel = (rel + 360) % 360;
  if (rel >= 337.5 || rel < 22.5) return "Tam karşıda";
  if (rel >= 22.5 && rel < 67.5) return "Sağ önünüzde";
  if (rel >= 67.5 && rel < 112.5) return "Sağınızda";
  if (rel >= 112.5 && rel < 157.5) return "Sağ arkada";
  if (rel >= 157.5 && rel < 202.5) return "Arkanda";
  if (rel >= 202.5 && rel < 247.5) return "Sol arkada";
  if (rel >= 247.5 && rel < 292.5) return "Solunuzda";
  return "Sol önünüzde";
}

// ─── SVG Pusula ───
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
    const cx = size / 2;
    const cy = size / 2;
    const r = 110;

    ctx.clearRect(0, 0, size, size);

    // Arka plan daire
    ctx.beginPath();
    ctx.arc(cx, cy, r + 10, 0, Math.PI * 2);
    ctx.fillStyle = "#f8fafc";
    ctx.fill();
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Dış halka
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Derece işaretleri
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
        const labels: Record<number, string> = { 0: "K", 90: "D", 180: "G", 270: "B" };
        ctx.fillStyle = "#334155";
        ctx.font = "bold 14px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(labels[i] || i.toString(), cx + labelR * Math.cos(angle), cy + labelR * Math.sin(angle));
      }
    }

    // Kabe yönü oku (kırmızı)
    const qiblaAngle = ((bearing - 90) * Math.PI) / 180;
    ctx.save();
    ctx.translate(cx, cy);

    // Ok gövdesi
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

    // Ok merkez noktası
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#dc2626";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();

    // Cihaz baş yönü göstergesi (mavi merkez çizgisi)
    if (deviceHeading >= 0) {
      const headingAngle = ((deviceHeading - 90) * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + (r - 5) * Math.cos(headingAngle), cy + (r - 5) * Math.sin(headingAngle));
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Baş yönü noktası
      ctx.beginPath();
      ctx.arc(cx + (r - 5) * Math.cos(headingAngle), cy + (r - 5) * Math.sin(headingAngle), 5, 0, Math.PI * 2);
      ctx.fillStyle = "#3b82f6";
      ctx.fill();
    }

    // Merkez etiket
    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Kıble", cx, cy - 12);
    ctx.font = "11px sans-serif";
    ctx.fillStyle = "#64748b";
    ctx.fillText(`${bearing.toFixed(1)}°`, cx, cy + 12);

  }, [bearing, deviceHeading]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className="max-w-full" style={{ width: 280, height: 280 }} />
      <div className="mt-3 text-center">
        <span className="inline-block bg-red-100 text-red-800 font-bold px-4 py-2 rounded-full text-sm">
          🧭 Kıble: {direction} ({bearing.toFixed(1)}°)
        </span>
      </div>
    </div>
  );
}

// ─── Ana Bileşen ───
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

  // Cihaz pusula sensörü (iOS izin işleme ile)
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        setDeviceHeading(360 - e.alpha);
        setHasCompass(true);
      }
    };
    // iOS 13+ requires permission request
    if (typeof DeviceOrientationEvent !== "undefined" && typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      (DeviceOrientationEvent as any).requestPermission().then((state: string) => {
        if (state === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
        }
      }).catch(() => {});
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
    }
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
      setErrorMsg("Tarayıcınız konum bellemeyi desteklemiyor");
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
          setErrorMsg("Konum izni reddedildi. Lütfen erişime izin verin ve tekrar deneyin.");
        } else if (err.code === 2) {
          setErrorMsg("Konumunuz belirlenemedi. GPS'in açık olduğundan emin olun ve tekrar deneyin.");
        } else {
          setErrorMsg("Konum isteği zaman aşımına uğradı. Lütfen tekrar deneyin.");
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
      setErrorMsg("Geçersiz koordinatlar. Enlem: -90 ile 90, Boylam: -180 ile 180");
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

  const cityName = selectedCity ? CITIES[selectedCity]?.tr || "" : "";

  // Format distance with Turkish locale (period for thousands)
  const formattedDistance = distance.toLocaleString("tr-TR");

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Kıble Yönü", "Dünyanın herhangi bir yerinden Kıble yönünü (Kabe) bulun — etkileşimli pusula ile hassas Haversine hesaplama", "https://adwatak.cloud/tr/tools/qibla-direction", "tr", "Islamic")} />
      <StructuredData data={faqSchema([
        { question: "Kıble nedir?", answer: "Kıble, Suudi Arabistan'ın Mekke şehrindeki Kabe'nin yönüdür (21.4225° Kuzey, 39.8262° Doğu). Müslümanlar namazda bu yöne dönerler." },
        { question: "Kıble her zaman Mekke yönü müdür?", answer: "Hassas yön coğrafi konumunuza göre değişir. Mısır'da Kıble kabaca doğudur, ABD'de kuzeydoğu, Avrupa'da güneydoğu." },
        { question: "Kıble yönü nasıl hesaplanır?", answer: "Konumunuz ile Kabe arasındaki açıyı Dünya yüzeyinde Haversine formülü kullanarak hesaplar." },
        { question: "Tam dereceye bakmam gerekir mi?", answer: "Şart olan belirli değil genel yöndir. Hz. Muhammed (s.a.v.) buyurmuştur: 'Doğu ile batı arası Kıble'dir.'" },
        { question: "Telefon pusulası Kıble için doğru mu?", answer: "Telefon pusulası manyetik kuzey yönünü verir. Aracımız koordinatlarınızdan hassas yönü hesaplar." },
        { question: "Uzadaysam ne yapmalıyım?", answer: "Elimden geldiğince Kabe'ye yönelmek gerekir. Genel yeterlidir." },
        { question: "Aracı GPS olmadan kullanabilir miyim?", answer: "Evet! Şehirinizi listeden seçebilir veya koordinatları manuel olarak girebilirsiniz." },
        { question: "Hangi şehirler mevcut?", answer: "35+ Arap ve uluslararası ülkede 60'tan fazla şehir." },
        { question: "Araç ücretsiz mi?", answer: "Evet, tamamen ücretsizdir ve tarayıcıda çalışır, hiçbir sunucuya veri gönderilmez." },
        { question: "Otelde veya yeni bir yerde Kıble'yi nasıl bulurum?", answer: "Aracı açın ve 'Konumumu belirle' butonuna tıklayın veya şehirinizi listeden seçin." },
      ])} />
      <StructuredData data={breadcrumbSchema([
        { name: "Ana Sayfa", url: "https://adwatak.cloud/tr" },
        { name: "İslami Araçlar", url: "https://adwatak.cloud/tr/category/islamic" },
        { name: "Kıble Yönü", url: "https://adwatak.cloud/tr/tools/qibla-direction" },
      ])} />
      {/* GEO: Speakable — AI/ses motorları için içerik işaretleme */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb lang="tr" category="İslami Araçlar" categorySlug="islamic" toolName="Kıble Yönü" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🧭 Kıble Yönü</h1>
        <p className="text-sm text-gray-500 mb-6">Dünyanın herhangi bir yerinden Kıble yönünü bulun — hassas Haversine hesaplama</p>

        {/* ─── Sonuç ─── */}
        {mode === "result" && (
          <div className="text-center">
            <Compass bearing={bearing} deviceHeading={deviceHeading} direction={direction} />

            <div className="mt-6 grid grid-cols-2 gap-3 max-w-sm mx-auto">
              <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                <p className="text-xs text-green-600 font-semibold">Yön</p>
                <p className="text-lg font-extrabold text-green-800">{direction}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-xs text-blue-600 font-semibold">Açı</p>
                <p className="text-lg font-extrabold text-blue-800">{bearing.toFixed(1)}°</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
                <p className="text-xs text-purple-600 font-semibold">Kabe'ye Mesafe</p>
                <p className="text-lg font-extrabold text-purple-800">{formattedDistance} km</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs text-amber-600 font-semibold">Koordinatlar</p>
                <p className="text-sm font-bold text-amber-800">{userLat.toFixed(4)}°, {userLng.toFixed(4)}°</p>
              </div>
            </div>

            {relDirection && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 max-w-sm mx-auto">
                <p className="text-sm font-bold text-red-800">
                  📍 Kıble {relDirection} — cihazınızı önünüze tutun ve kırmızı oku takip edin
                </p>
              </div>
            )}

            <button onClick={resetAll} className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">
              🔄 Başka bir konum bul
            </button>
          </div>
        )}

        {/* ─── Konum yöntemi seçimi ─── */}
        {mode === "idle" && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Konumunuzu belirleme yöntemini seçin:</p>

            <button
              onClick={handleGPS}
              className="w-full flex items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-left"
            >
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-bold">Konumu otomatik belirle (GPS)</p>
                <p className="text-xs opacity-80">En doğru — gerçek GPS konumunuzu kullanır</p>
              </div>
            </button>

            <button
              onClick={() => setMode("city")}
              className="w-full flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-left"
            >
              <span className="text-2xl">🏙️</span>
              <div>
                <p className="font-bold">Listeden şehir seç</p>
                <p className="text-xs opacity-80">35+ ülkede 60'tan fazla şehir</p>
              </div>
            </button>

            <button
              onClick={() => setMode("manual")}
              className="w-full flex items-center gap-4 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-left"
            >
              <span className="text-2xl">📐</span>
              <div>
                <p className="font-bold">Koordinatları manuel gir</p>
                <p className="text-xs opacity-80">Enlem ve boylamı kendiniz girin</p>
              </div>
            </button>
          </div>
        )}

        {/* ─── Şehir seçici ─── */}
        {mode === "city" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Ülke:</label>
              <select
                value={selectedCountry}
                onChange={(e) => { setSelectedCountry(e.target.value); setSelectedCity(""); }}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              >
                <option value="">Ülke seçin...</option>
                {Object.entries(COUNTRIES).map(([code, c]) => (
                  <option key={code} value={code}>{c.tr}</option>
                ))}
              </select>
            </div>

            {selectedCountry && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Şehir:</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                >
                  <option value="">Şehir seçin...</option>
                  {COUNTRIES[selectedCountry]?.cities.map((key) => (
                    <option key={key} value={key}>{CITIES[key].tr}</option>
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
                Kıble Yönünü Bul
              </button>
              <button onClick={resetAll} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">
                Geri
              </button>
            </div>
          </div>
        )}

        {/* ─── Manuel koordinat girişi ─── */}
        {mode === "manual" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Enlem (Latitude):</label>
              <input
                type="number"
                step="any"
                value={manualLat}
                onChange={(e) => setManualLat(e.target.value)}
                placeholder="Örn: 30.0444"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Boylam (Longitude):</label>
              <input
                type="number"
                step="any"
                value={manualLng}
                onChange={(e) => setManualLng(e.target.value)}
                placeholder="Örn: 31.2357"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
            </div>
            <p className="text-xs text-gray-400">💡 Koordinatları Google Maps'te konumunuza sağ tıklayarak alabilirsiniz</p>
            <div className="flex gap-3">
              <button
                onClick={handleManual}
                disabled={!manualLat || !manualLng}
                className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Kıble Yönünü Hesapla
              </button>
              <button onClick={resetAll} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">
                Geri
              </button>
            </div>
          </div>
        )}

        {/* ─── Konum belirleme ─── */}
        {mode === "locating" && (
          <div className="text-center py-10">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-semibold">Konumunuz belirleniyor...</p>
            <p className="text-xs text-gray-400 mt-2">GPS'in açık olduğundan ve konum erişimine izin verdiğinizden emin olun</p>
          </div>
        )}

        {/* ─── Hata ─── */}
        {mode === "error" && (
          <div className="text-center py-6">
            <p className="text-red-600 font-semibold mb-4">⚠️ {errorMsg}</p>
            <button onClick={resetAll} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              🔄 Tekrar Dene
            </button>
          </div>
        )}
      </div>

      <SEOContent content={[
        "Kıble Yönü Bulucu — Dünyanın herhangi bir yerinden Mekke'deki Kabe'nin yönünü bulun. Konumunuzdan Kabe'ye coğrafi açıyı hesaplamak için hassas geometrik hesaplamalar (Haversine formülü) kullanır.",
        "3 konum belirleme yöntemi: otomatik GPS, 60+ şehir listeden seçim veya manuel koordinat girişi.",
        "Kıble yönünü derece olarak gösteren etkileşimli pusula, Kıble'yi gösteren kırmızı ok ile. Telefon'un manyetik pusulasını göreceli yön için destekler.",
        "Allah buyurmuştur: 'Yüzünü Mescid-i Haram'a çevir' (Bakara: 144). Şart olan belirli değil genel yöndir.",
        "Araç tamamen ücretsizdir ve tarayıcıda çalışır — hiçbir sunucuya veri gönderilmez.",
      ]} lang="tr" />
      <FAQSection faqs={[
        { question: "Kıble nedir?", answer: "Kıble, Suudi Arabistan'ın Mekke şehrindeki Kabe'nin yönüdür (21.4225° Kuzey, 39.8262° Doğu). Müslümanlar namazda bu yöne dönerler." },
        { question: "Kıble her zaman Mekke yönü müdür?", answer: "Hassas yön coğrafi konumunuza göre değişir. Mısır'da Kıble kabaca doğudur, ABD'de kuzeydoğu, Avrupa'da güneydoğu." },
        { question: "Kıble yönü nasıl hesaplanır?", answer: "Konumunuz ile Kabe arasındaki açıyı Dünya yüzeyinde Haversine formülü kullanarak hesaplar." },
        { question: "Tam dereceye bakmam gerekir mi?", answer: "Şart olan belirli değil genel yöndir. Hz. Muhammed (s.a.v.) buyurmuştur: 'Doğu ile batı arası Kıble'dir.'" },
        { question: "Aracı GPS olmadan kullanabilir miyim?", answer: "Evet! Şehirinizi listeden seçebilir veya koordinatları manuel olarak girebilirsiniz." },
        { question: "Hangi şehirler mevcut?", answer: "Suudi Arabistan, Mısır, BAE, Türkiye, Pakistan, ABD, İngiltere ve daha fazlasını içeren 35+ ülkede 60'tan fazla şehir." },
        { question: "Araç ücretsiz mi?", answer: "Evet, tamamen ücretsizdir ve tarayıcıda çalışır, hiçbir sunucuya veri gönderilmez." },
        { question: "Otelde veya yeni bir yerde Kıble'yi nasıl bulurum?", answer: "Aracı açın ve 'Konumumu belirle' butonuna tıklayın veya şehirinizi listeden seçin." },
      ]} lang="tr" />
      <RelatedTools tools={[
        { title: "Namaz Vakitleri", icon: "🕐", href: "/tr/tools/prayer-times" },
        { title: "Hicri Dönüştürücü", icon: "📅", href: "/tr/tools/hijri-converter" },
        { title: "Zekat Hesaplayıcı", icon: "🕌", href: "/tr/tools/zakat-calculator" },
        { title: "Miras Hesaplayıcı", icon: "📜", href: "/tr/tools/inheritance-calculator" },
      ]} lang="tr" />
      <ShareButtons lang="tr" />
    </div>
  );
}
