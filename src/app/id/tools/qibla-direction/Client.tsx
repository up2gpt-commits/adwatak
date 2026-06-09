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

const CITIES: Record<string, { lat: number; lng: number; id: string }> = {
  "mecca-sa": { lat: 21.4225, lng: 39.8262, id: "Mekkah, Arab Saudi" },
  "medina-sa": { lat: 24.5247, lng: 39.5692, id: "Madinah, Arab Saudi" },
  "riyadh-sa": { lat: 24.7136, lng: 46.6753, id: "Riyadh, Arab Saudi" },
  "jeddah-sa": { lat: 21.5433, lng: 39.1728, id: "Jeddah, Arab Saudi" },
  "dammam-sa": { lat: 26.4207, lng: 50.0888, id: "Dammam, Arab Saudi" },
  "cairo-eg": { lat: 30.0444, lng: 31.2357, id: "Kairo, Mesir" },
  "alexandria-eg": { lat: 31.2001, lng: 29.9187, id: "Alexandria, Mesir" },
  "dubai-ae": { lat: 25.2048, lng: 55.2708, id: "Dubai, UEA" },
  "abudhabi-ae": { lat: 24.4539, lng: 54.3773, id: "Abu Dhabi, UEA" },
  "doha-qa": { lat: 25.2854, lng: 51.5310, id: "Doha, Qatar" },
  "kuwait-kw": { lat: 29.3759, lng: 47.9774, id: "Kuwait City, Kuwait" },
  "manama-bh": { lat: 26.2285, lng: 50.5860, id: "Manama, Bahrain" },
  "muscat-om": { lat: 23.5880, lng: 58.3829, id: "Muscat, Oman" },
  "baghdad-iq": { lat: 33.3152, lng: 44.3661, id: "Baghdad, Irak" },
  "amman-jo": { lat: 31.9454, lng: 35.9284, id: "Amman, Yordania" },
  "beirut-lb": { lat: 33.8938, lng: 35.5018, id: "Beirut, Lebanon" },
  "damascus-sy": { lat: 33.5138, lng: 36.2765, id: "Damaskus, Suriah" },
  "jerusalem-ps": { lat: 31.7683, lng: 35.2137, id: "Yerusalem, Palestina" },
  "casablanca-ma": { lat: 33.5731, lng: -7.5898, id: "Casablanca, Maroko" },
  "rabat-ma": { lat: 34.0209, lng: -6.8416, id: "Rabat, Maroko" },
  "algiers-dz": { lat: 36.7538, lng: 3.0588, id: "Aljazair, Aljazair" },
  "tunis-tn": { lat: 36.8065, lng: 10.1815, id: "Tunis, Tunisia" },
  "istanbul-tr": { lat: 41.0082, lng: 28.9784, id: "Istanbul, Turki" },
  "ankara-tr": { lat: 39.9334, lng: 32.8597, id: "Ankara, Turki" },
  "karachi-pk": { lat: 24.8607, lng: 67.0011, id: "Karachi, Pakistan" },
  "lahore-pk": { lat: 31.5204, lng: 74.3587, id: "Lahore, Pakistan" },
  "islamabad-pk": { lat: 33.6844, lng: 73.0479, id: "Islamabad, Pakistan" },
  "delhi-in": { lat: 28.7041, lng: 77.1025, id: "Delhi, India" },
  "mumbai-in": { lat: 19.0760, lng: 72.8777, id: "Mumbai, India" },
  "dhaka-bd": { lat: 23.8103, lng: 90.4125, id: "Dhaka, Bangladesh" },
  "jakarta-id": { lat: -6.2088, lng: 106.8456, id: "Jakarta, Indonesia" },
  "kualalumpur-my": { lat: 3.1390, lng: 101.6869, id: "Kuala Lumpur, Malaysia" },
  "london-gb": { lat: 51.5074, lng: -0.1278, id: "London, Inggris" },
  "birmingham-gb": { lat: 52.4862, lng: -1.8904, id: "Birmingham, Inggris" },
  "manchester-gb": { lat: 53.4808, lng: -2.2426, id: "Manchester, Inggris" },
  "paris-fr": { lat: 48.8566, lng: 2.3522, id: "Paris, Prancis" },
  "berlin-de": { lat: 52.5200, lng: 13.4050, id: "Berlin, Jerman" },
  "newyork-us": { lat: 40.7128, lng: -74.0060, id: "New York, AS" },
  "losangeles-us": { lat: 34.0522, lng: -118.2437, id: "Los Angeles, AS" },
  "chicago-us": { lat: 41.8781, lng: -87.6298, id: "Chicago, AS" },
  "toronto-ca": { lat: 43.6532, lng: -79.3832, id: "Toronto, Kanada" },
  "sydney-au": { lat: -33.8688, lng: 151.2093, id: "Sydney, Australia" },
  "melbourne-au": { lat: -37.8136, lng: 144.9631, id: "Melbourne, Australia" },
  "moscow-ru": { lat: 55.7558, lng: 37.6173, id: "Moscow, Rusia" },
  "beijing-cn": { lat: 39.9042, lng: 116.4074, id: "Beijing, Tiongkok" },
  "tokyo-jp": { lat: 35.6762, lng: 139.6503, id: "Tokyo, Jepang" },
  "capetown-za": { lat: -33.9249, lng: 18.4241, id: "Cape Town, Afrika Selatan" },
  "lagos-ng": { lat: 6.5244, lng: 3.3792, id: "Lagos, Nigeria" },
  "nairobi-ke": { lat: -1.2921, lng: 36.8219, id: "Nairobi, Kenya" },
};

const CITY_GROUPS: Record<string, string[]> = {
  "Timur Tengah": ["mecca-sa", "medina-sa", "riyadh-sa", "jeddah-sa", "dammam-sa", "dubai-ae", "abudhabi-ae", "doha-qa", "kuwait-kw", "manama-bh", "muscat-om", "baghdad-iq", "amman-jo", "beirut-lb", "damascus-sy", "jerusalem-ps"],
  "Afrika Utara": ["cairo-eg", "alexandria-eg", "casablanca-ma", "rabat-ma", "algiers-dz", "tunis-tn"],
  "Turki & Asia Tengah": ["istanbul-tr", "ankara-tr"],
  "Asia Selatan": ["karachi-pk", "lahore-pk", "islamabad-pk", "delhi-in", "mumbai-in", "dhaka-bd"],
  "Asia Tenggara": ["jakarta-id", "kualalumpur-my"],
  "Eropa": ["london-gb", "birmingham-gb", "manchester-gb", "paris-fr", "berlin-de"],
  "Amerika": ["newyork-us", "losangeles-us", "chicago-us", "toronto-ca"],
  "Oceania": ["sydney-au", "melbourne-au"],
  "Lainnya": ["moscow-ru", "beijing-cn", "tokyo-jp", "capetown-za", "lagos-ng", "nairobi-ke"],
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
  if (bearing >= 337.5 || bearing < 22.5) return "Utara";
  if (bearing < 67.5) return "Timur Laut";
  if (bearing < 112.5) return "Timur";
  if (bearing < 157.5) return "Tenggara";
  if (bearing < 202.5) return "Selatan";
  if (bearing < 247.5) return "Barat Daya";
  if (bearing < 292.5) return "Barat";
  return "Barat Laut";
}

function bearingToRelative(bearing: number, heading: number): string {
  let rel = ((bearing - heading) + 360) % 360;
  if (rel >= 337.5 || rel < 22.5) return "Tepat di depan";
  if (rel < 67.5) return "Di depan ke kanan";
  if (rel < 112.5) return "Di sebelah kanan";
  if (rel < 157.5) return "Di belakang ke kanan";
  if (rel < 202.5) return "Di belakang Anda";
  if (rel < 247.5) return "Di belakang ke kiri";
  if (rel < 292.5) return "Di sebelah kiri";
  return "Di depan ke kiri";
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
        const labels: Record<number, string> = { 0: "U", 90: "T", 180: "S", 270: "B" };
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
    ctx.fillText("Kiblat", cx, cy - 12);
    ctx.font = "11px sans-serif"; ctx.fillStyle = "#64748b";
    ctx.fillText(`${bearing.toFixed(1)}°`, cx, cy + 12);
  }, [bearing, deviceHeading]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className="max-w-full" style={{ width: 280, height: 280 }} />
      <div className="mt-3 text-center">
        <span className="inline-block bg-red-100 text-red-800 font-bold px-4 py-2 rounded-full text-sm">
          🧭 Kiblat: {direction} ({bearing.toFixed(1)}°)
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
    // iOS 13+ requires permission request
    if (typeof DeviceOrientationEvent !== "undefined" && typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      (DeviceOrientationEvent as any).requestPermission().then((state: string) => {
        if (state === "granted") {
          window.addEventListener("deviceorientation", handler);
        }
      }).catch(() => {});
    } else {
      window.addEventListener("deviceorientation", handler);
    }
    return () => window.removeEventListener("deviceorientation", handler);
  }, []);

  const showResult = useCallback((lat: number, lng: number) => {
    setUserLat(lat); setUserLng(lng);
    setBearing(calcQiblaBearing(lat, lng));
    setDistance(calcDistance(lat, lng));
    setMode("result");
  }, []);

  const handleGPS = () => {
    if (!navigator.geolocation) { setErrorMsg("Browser Anda tidak mendukung geolokasi"); setMode("error"); return; }
    setMode("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => showResult(pos.coords.latitude, pos.coords.longitude),
      (err) => {
        setErrorMsg(err.code === 1 ? "Izin lokasi ditolak. Silakan izinkan akses dan coba lagi." : "Tidak dapat menentukan lokasi Anda. Pastikan GPS aktif.");
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
      setErrorMsg("Koordinat tidak valid. Lintang: -90 hingga 90, Bujur: -180 hingga 180"); setMode("error"); return;
    }
    showResult(lat, lng);
  };

  const reset = () => { setMode("idle"); setErrorMsg(""); setSelectedCity(""); setManualLat(""); setManualLng(""); };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Arah Kiblat", "Tempatkan arah Kiblat (Ka'bah) dari mana saja di dunia — kompas interaktif dengan perhitungan Haversine yang presisi", "https://adwatak.cloud/id/tools/qibla-direction", "id", "Islamic")} />
      <StructuredData data={faqSchema([
        { question: "Apa itu Kiblat?", answer: "Kiblat adalah arah Ka'bah di Mekkah, Arab Saudi (21.4225°LU, 39.8262°BT). umat Islam menghadap arah ini saat shalat." },
        { question: "Apakah arah Kiblat berubah tergantung lokasi?", answer: "Ya! Arah yang tepat bervariasi tergantung di mana Anda berada. Di Mesir kira-kira timur, di AS timur laut, di Eropa tenggara." },
        { question: "Bagaimana Kiblat dihitung?", answer: "Menggunakan rumus Haversine untuk menghitung arah lingkaran besar antara lokasi Anda dan Ka'bah di permukaan Bumi." },
        { question: "Apakah saya harus sangat akurat?", answer: "Persyaratan Islam adalah arah umum, bukan derajat yang tepat. Rasulullah ﷺ bersabda: 'Antara timur dan barat adalah Kiblat.'" },
        { question: "Bisakah saya menggunakan ini tanpa GPS?", answer: "Ya! Anda dapat memilih kota dari daftar atau memasukkan koordinat secara manual." },
        { question: "Berapa banyak kota yang tersedia?", answer: "Lebih dari 50 kota di 35+ negara termasuk Arab Saudi, Mesir, UEA, Turki, Pakistan, AS, Inggris, dan lainnya." },
        { question: "Apakah alat ini gratis?", answer: "Ya, sepenuhnya gratis dan berjalan sepenuhnya di browser — tidak ada data yang dikirim ke server mana pun." },
        { question: "Bagaimana cara menemukan Kiblat di tempat baru?", answer: "Buka alat dan klik 'Deteksi Lokasi Saya' atau pilih kota Anda dari daftar." },
      ])} />
      <StructuredData data={breadcrumbSchema([
        { name: "Beranda", url: "https://adwatak.cloud/id" },
        { name: "Alat Islami", url: "https://adwatak.cloud/id/category/islamic" },
        { name: "Arah Kiblat", url: "https://adwatak.cloud/id/tools/qibla-direction" },
      ])} />
      {/* GEO: Speakable — marks key content for AI/voice engines (ChatGPT, Perplexity, Google Assistant) */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      {/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("Cara menggunakan alat ini", "Alat online gratis. Berjalan langsung di browser. Tidak perlu registrasi.", [{name:"Buka alat",text:"Navigasi ke halaman alat ini di Adawatak"},{name:"Masukkan data Anda",text:"Isi kolom yang diperlukan"},{name:"Dapatkan hasil",text:"Klik tombol hitung atau hasilkan"},{name:"Gunakan atau bagikan",text:"Salin, unduh, atau bagikan hasilnya"}],"kurang dari satu menit","id")} />
      {/* GEO: Speakable — AI/voice engines */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />

      <Breadcrumb lang="id" category="Alat Islami" categorySlug="islamic" toolName="Arah Kiblat" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🧭 Arah Kiblat</h1>
        <p className="text-sm text-gray-500 mb-6">Temukan arah Kiblat dari mana saja di dunia — perhitungan Haversine yang presisi</p>

        {mode === "result" && (
          <div className="text-center">
            <Compass bearing={bearing} deviceHeading={deviceHeading} direction={direction} />
            <div className="mt-6 grid grid-cols-2 gap-3 max-w-sm mx-auto">
              <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                <p className="text-xs text-green-600 font-semibold">Arah</p>
                <p className="text-lg font-extrabold text-green-800">{direction}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-xs text-blue-600 font-semibold">Bearing</p>
                <p className="text-lg font-extrabold text-blue-800">{bearing.toFixed(1)}°</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
                <p className="text-xs text-purple-600 font-semibold">Jarak ke Ka'bah</p>
                <p className="text-lg font-extrabold text-purple-800">{distance.toLocaleString()} km</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs text-amber-600 font-semibold">Koordinat</p>
                <p className="text-sm font-bold text-amber-800">{userLat.toFixed(4)}°, {userLng.toFixed(4)}°</p>
              </div>
            </div>
            {relDir && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 max-w-sm mx-auto">
                <p className="text-sm font-bold text-red-800">📍 Kiblat {relDir} — arahkan perangkat Anda ke depan dan ikuti panah merah</p>
              </div>
            )}
            <button onClick={reset} className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">🔄 Cari lokasi lain</button>
          </div>
        )}

        {mode === "idle" && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Pilih cara menentukan lokasi Anda:</p>
            <button onClick={handleGPS} className="w-full flex items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">📍</span>
              <div className="text-left"><p className="font-bold">Deteksi lokasi otomatis (GPS)</p><p className="text-xs opacity-80">Paling akurat — menggunakan posisi GPS asli Anda</p></div>
            </button>
            <button onClick={() => setMode("city")} className="w-full flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">🏙️</span>
              <div className="text-left"><p className="font-bold">Pilih kota dari daftar</p><p className="text-xs opacity-80">50+ kota di 35+ negara</p></div>
            </button>
            <button onClick={() => setMode("manual")} className="w-full flex items-center gap-4 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">📐</span>
              <div className="text-left"><p className="font-bold">Masukkan koordinat manual</p><p className="text-xs opacity-80">Ketik lintang dan bujur sendiri</p></div>
            </button>
          </div>
        )}

        {mode === "city" && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Pilih kota:</label>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
              <option value="">Pilih kota...</option>
              {Object.entries(CITY_GROUPS).map(([group, cities]) => (
                <optgroup key={group} label={group}>
                  {cities.map((key) => <option key={key} value={key}>{CITIES[key].id}</option>)}
                </optgroup>
              ))}
            </select>
            <div className="flex gap-3">
              <button onClick={handleCity} disabled={!selectedCity} className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors">Temukan Kiblat</button>
              <button onClick={reset} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">Kembali</button>
            </div>
          </div>
        )}

        {mode === "manual" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Lintang (Latitude):</label>
              <input type="number" step="any" value={manualLat} onChange={(e) => setManualLat(e.target.value)} placeholder="contoh: 30.0444" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Bujur (Longitude):</label>
              <input type="number" step="any" value={manualLng} onChange={(e) => setManualLng(e.target.value)} placeholder="contoh: 31.2357" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
            </div>
            <p className="text-xs text-gray-400">💡 Anda bisa mendapatkan koordinat dari Google Maps dengan klik kanan di lokasi Anda</p>
            <div className="flex gap-3">
              <button onClick={handleManual} disabled={!manualLat || !manualLng} className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors">Hitung Kiblat</button>
              <button onClick={reset} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">Kembali</button>
            </div>
          </div>
        )}

        {mode === "locating" && (
          <div className="text-center py-10">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-semibold">Mendeteksi lokasi Anda...</p>
            <p className="text-xs text-gray-400 mt-2">Pastikan GPS aktif dan Anda telah mengizinkan akses lokasi</p>
          </div>
        )}

        {mode === "error" && (
          <div className="text-center py-6">
            <p className="text-red-600 font-semibold mb-4">⚠️ {errorMsg}</p>
            <button onClick={reset} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">🔄 Coba Lagi</button>
          </div>
        )}
      </div>

      <SEOContent content={[
        "Pencari Arah Kiblat — Tempatkan arah Ka'bah di Mekkah dari mana saja di dunia.",
        "Menggunakan rumus Haversine untuk perhitungan bearing lingkaran besar yang presisi. 3 metode lokasi: GPS, pemilihan kota, atau koordinat manual.",
        "Kompas interaktif dengan panah merah yang mengarah ke Kiblat. Mendukung kompas perangkat untuk arah relatif.",
        "Lebih dari 50 kota di 35+ negara. 100% gratis, berjalan sepenuhnya di browser.",
      ]} lang="id" />
      <FAQSection faqs={[
        { question: "Apa itu Kiblat?", answer: "Kiblat adalah arah Ka'bah di Mekkah, Arab Saudi (21.4225°LU, 39.8262°BT). Umat Islam menghadap arah ini saat shalat." },
        { question: "Apakah arah Kiblat berubah tergantung lokasi?", answer: "Ya! Arah yang tepat bervariasi. Di Mesir kira-kira timur, di AS timur laut, di Eropa tenggara." },
        { question: "Bagaimana Kiblat dihitung?", answer: "Menggunakan rumus Haversine untuk menghitung arah lingkaran besar antara lokasi Anda dan Ka'bah." },
        { question: "Apakah saya harus sangat akurat?", answer: "Persyaratan Islam adalah arah umum, bukan derajat yang tepat." },
        { question: "Bisakah saya menggunakan ini tanpa GPS?", answer: "Ya! Pilih kota dari daftar atau masukkan koordinat secara manual." },
        { question: "Apakah alat ini gratis?", answer: "Ya, sepenuhnya gratis dan berjalan sepenuhnya di browser — tidak ada data yang dikirim ke server mana pun." },
      ]} lang="id" />
      <RelatedTools tools={[
        { title: "Waktu Shalat", icon: "🕐", href: "/id/tools/prayer-times" },
        { title: "Konversi Hijriah", icon: "📅", href: "/id/tools/hijri-converter" },
        { title: "Kalkulator Zakat", icon: "🕌", href: "/id/tools/zakat-calculator" },
        { title: "Kalkulator Waris", icon: "📜", href: "/id/tools/inheritance-calculator" },
      ]} lang="id" />
      <ShareButtons lang="id" />
    </div>
  );
}
