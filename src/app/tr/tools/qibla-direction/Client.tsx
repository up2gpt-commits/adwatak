"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

const CITIES: Record<string, { lat: number; lng: number; tr: string }> = {
  "istanbul-tr": { lat: 41.0082, lng: 28.9784, tr: "İstanbul" },
  "ankara-tr": { lat: 39.9334, lng: 32.8597, tr: "Ankara" },
  "izmir-tr": { lat: 38.4237, lng: 27.1428, tr: "İzmir" },
  "bursa-tr": { lat: 40.1885, lng: 29.0610, tr: "Bursa" },
  "antalya-tr": { lat: 36.8969, lng: 30.7133, tr: "Antalya" },
  "adana-tr": { lat: 37.0000, lng: 35.3213, tr: "Adana" },
  "konya-tr": { lat: 37.8746, lng: 32.4932, tr: "Konya" },
  "gaziantep-tr": { lat: 37.0662, lng: 37.3833, tr: "Gaziantep" },
  "kayseri-tr": { lat: 38.7312, lng: 35.4787, tr: "Kayseri" },
  "mersin-tr": { lat: 36.8121, lng: 34.6415, tr: "Mersin" },
  "eskisehir-tr": { lat: 39.7667, lng: 30.5256, tr: "Eskişehir" },
  "diyarbakir-tr": { lat: 37.9250, lng: 40.2110, tr: "Diyarbakır" },
  "samsun-tr": { lat: 41.2928, lng: 36.3313, tr: "Samsun" },
  "trabzon-tr": { lat: 41.0027, lng: 39.7168, tr: "Trabzon" },
  "erzurum-tr": { lat: 39.9055, lng: 41.2658, tr: "Erzurum" },
  "malatya-tr": { lat: 38.3554, lng: 38.3335, tr: "Malatya" },
  "afyon-tr": { lat: 38.7507, lng: 30.5567, tr: "Afyonkarahisar" },
  "van-tr": { lat: 38.5012, lng: 43.3727, tr: "Van" },
  "batman-tr": { lat: 37.8812, lng: 41.1351, tr: "Batman" },
  "elazig-tr": { lat: 38.6748, lng: 39.2225, tr: "Elazığ" },
  // International
  "berlin-de": { lat: 52.5200, lng: 13.4050, tr: "Berlin, Almanya" },
  "paris-fr": { lat: 48.8566, lng: 2.3522, tr: "Paris, Fransa" },
  "london-gb": { lat: 51.5074, lng: -0.1278, tr: "Londra, İngiltere" },
  "amsterdam-nl": { lat: 52.3676, lng: 4.9041, tr: "Amsterdam, Hollanda" },
  "copenhagen-dk": { lat: 55.6761, lng: 12.5683, tr: "Kopenhag, Danimarka" },
  "stockholm-se": { lat: 59.3293, lng: 18.0686, tr: "Stokholm, İsveç" },
  "newyork-us": { lat: 40.7128, lng: -74.0060, tr: "New York, ABD" },
  "losangeles-us": { lat: 34.0522, lng: -118.2437, tr: "Los Angeles, ABD" },
  "toronto-ca": { lat: 43.6532, lng: -79.3832, tr: "Toronto, Kanada" },
  "sydney-au": { lat: -33.8688, lng: 151.2093, tr: "Sidney, Avustralya" },
  "cairo-eg": { lat: 30.0444, lng: 31.2357, tr: "Kahire, Mısır" },
  "riyadh-sa": { lat: 24.7136, lng: 46.6753, tr: "Riyad, Suudi Arabistan" },
  "dubai-ae": { lat: 25.2048, lng: 55.2708, tr: "Dubai, BAE" },
  "karachi-pk": { lat: 24.8607, lng: 67.0011, tr: "Karaçi, Pakistan" },
  "dhaka-bd": { lat: 23.8103, lng: 90.4125, tr: "Dakka, Bangladeş" },
  "jakarta-id": { lat: -6.2088, lng: 106.8456, tr: "Cakarta, Endonezya" },
  "kualalumpur-my": { lat: 3.1390, lng: 101.6869, tr: "Kuala Lumpur, Malezya" },
  "moscow-ru": { lat: 55.7558, lng: 37.6173, tr: "Moskova, Rusya" },
  "tashkent-uz": { lat: 41.2995, lng: 69.2401, tr: "Taşkent, Özbekistan" },
  "almaty-kz": { lat: 43.2220, lng: 76.8512, tr: "Almatı, Kazakistan" },
  "baku-az": { lat: 40.4093, lng: 49.8671, tr: "Bakü, Azerbaycan" },
};

const CITY_GROUPS: Record<string, string[]> = {
  "Türkiye": ["istanbul-tr", "ankara-tr", "izmir-tr", "bursa-tr", "antalya-tr", "adana-tr", "konya-tr", "gaziantep-tr", "kayseri-tr", "mersin-tr", "eskisehir-tr", "diyarbakir-tr", "samsun-tr", "trabzon-tr", "erzurum-tr", "malatya-tr", "afyon-tr", "van-tr", "batman-tr", "elazig-tr"],
  "Avrupa": ["berlin-de", "paris-fr", "london-gb", "amsterdam-nl", "copenhagen-dk", "stockholm-se"],
  "Amerika": ["newyork-us", "losangeles-us", "toronto-ca"],
  "Ortadoğu": ["cairo-eg", "riyadh-sa", "dubai-ae"],
  "Asya": ["karachi-pk", "dhaka-bd", "jakarta-id", "kualalumpur-my", "moscow-ru", "tashkent-uz", "almaty-kz", "baku-az"],
  "Diğer": ["sydney-au"],
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
  if (bearing >= 337.5 || bearing < 22.5) return "Kuzey";
  if (bearing < 67.5) return "Kuzeydoğu";
  if (bearing < 112.5) return "Doğu";
  if (bearing < 157.5) return "Güneydoğu";
  if (bearing < 202.5) return "Güney";
  if (bearing < 247.5) return "Güneybatı";
  if (bearing < 292.5) return "Batı";
  return "Kuzeybatı";
}

function bearingToRelative(bearing: number, heading: number): string {
  let rel = ((bearing - heading) + 360) % 360;
  if (rel >= 337.5 || rel < 22.5) return "Tam önünüzde";
  if (rel < 67.5) return "Önünüzün sağında";
  if (rel < 112.5) return "Sağınızda";
  if (rel < 157.5) return "Arkanızın sağında";
  if (rel < 202.5) return "Tam arkanızda";
  if (rel < 247.5) return "Arkanızın solunda";
  if (rel < 292.5) return "Solunuzda";
  return "Önünüzün solunda";
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
        const labels: Record<number, string> = { 0: "K", 90: "D", 180: "G", 270: "B" };
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
    ctx.fillText("Kıble", cx, cy - 12);
    ctx.font = "11px sans-serif"; ctx.fillStyle = "#64748b";
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
    if (!navigator.geolocation) { setErrorMsg("Tarayıcınız konum desteklemiyor"); setMode("error"); return; }
    setMode("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => showResult(pos.coords.latitude, pos.coords.longitude),
      (err) => {
        setErrorMsg(err.code === 1 ? "Konum izni reddedildi. Lütfen izin verin ve tekrar deneyin." : "Konumunuz belirlenemedi. GPS'in açık olduğundan emin olun.");
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
      setErrorMsg("Geçersiz koordinatlar. Enlem: -90 ile 90, Boylam: -180 ile 180"); setMode("error"); return;
    }
    showResult(lat, lng);
  };

  const reset = () => { setMode("idle"); setErrorMsg(""); setSelectedCity(""); setManualLat(""); setManualLng(""); };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Kıble Yönü", "Dünyanın herhangi bir yerinden Kâbe yonu bulun — interaktif pusula ve hassas hesaplama", "https://adwatak.cloud/tr/tools/qibla-direction", "tr", "İslami")} />
      <StructuredData data={faqSchema([
        { question: "Kıble nedir?", answer: "Kıble, Mekke'deki Kâbe'nin yönüdür (21.4225°K, 39.8262°D). Müslümanlar namaz kılarken bu yöne döner." },
        { question: "Kıble yeri konuma göre değişir mi?", answer: "Evet! Türkiye'de Kıble genelde güneydoğu yönündedir. Mısır'da doğu, ABD'de kuzeydoğu, Avrupa'da güneydoğu yönündedir." },
        { question: "Kıble nasıl hesaplanır?", answer: "Haversine formülü kullanılarak konumunuz ile Kâbe arasındaki büyük çember açısı hesaplanır." },
        { question: "Tam olarak doğru olmak gerekir mi?", answer: "İslam'da gerekli olan genel yön dür, tam derece değil. Peygamberimiz 'Doğu ile batı arası Kıble'dir' buyurmuştur." },
        { question: "GPS olmadan kullanabilir miyim?", answer: "Evet! Şehir listesinden seçim yapabilir veya koordinatları elle girebilirsiniz." },
        { question: "Kaç şehir var?", answer: "Türkiye'den 20+ şehir ve dünya genelinde 35+ ülkeden toplama 30+ şehir mevcut." },
        { question: "Araç ücretsiz mi?", answer: "Evet, tamamen ücretsiz. Tarayıcınızda çalışır, veri sunucuya gönderilmez." },
        { question: "Yeni bir yerde Kıble'yi nasıl bulurum?", answer: "Aracı açın ve 'Konumumu belirle' butonuna tıklayın veya şehir seçin." },
      ])} />
      <StructuredData data={breadcrumbSchema([
        { name: "Ana Sayfa", url: "https://adwatak.cloud/tr" },
        { name: "İslami Araçlar", url: "https://adwatak.cloud/tr/category/islamic" },
        { name: "Kıble Yönü", url: "https://adwatak.cloud/tr/tools/qibla-direction" },
      ])} />
      {/* GEO: Speakable — yapay zeka/ses motorları için işaretli içerik */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb lang="tr" category="İslami Araçlar" categorySlug="islamic" toolName="Kıble Yönü" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🧭 Kıble Yönü</h1>
        <p className="text-sm text-gray-500 mb-6">Dünyanın herhangi bir yerinden Kıble yönünü bulun — hassas Haversine hesaplaması</p>

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
                <p className="text-xs text-purple-600 font-semibold">Kâbe'ye Mesafe</p>
                <p className="text-lg font-extrabold text-purple-800">{distance.toLocaleString()} km</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs text-amber-600 font-semibold">Koordinatlar</p>
                <p className="text-sm font-bold text-amber-800">{userLat.toFixed(4)}°, {userLng.toFixed(4)}°</p>
              </div>
            </div>
            {relDir && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 max-w-sm mx-auto">
                <p className="text-sm font-bold text-red-800">📍 Kıble {relDir} — cihazınızı öne tutun ve kırmızı oku takip edin</p>
              </div>
            )}
            <button onClick={reset} className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">🔄 Başka konum bul</button>
          </div>
        )}

        {mode === "idle" && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Konumunuzu belirleme yöntemini seçin:</p>
            <button onClick={handleGPS} className="w-full flex items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">📍</span>
              <div className="text-left"><p className="font-bold">Konumumu otomatik belirle (GPS)</p><p className="text-xs opacity-80">En doğru — gerçek GPS konumunuzu kullanır</p></div>
            </button>
            <button onClick={() => setMode("city")} className="w-full flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">🏙️</span>
              <div className="text-left"><p className="font-bold">Şehir listesinden seç</p><p className="text-xs opacity-80">Türkiye'den 20+, dünyadan 30+ şehir</p></div>
            </button>
            <button onClick={() => setMode("manual")} className="w-full flex items-center gap-4 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">📐</span>
              <div className="text-left"><p className="font-bold">Koordinatları elle gir</p><p className="text-xs opacity-80">Enlem ve boylamı kendiniz yazın</p></div>
            </button>
          </div>
        )}

        {mode === "city" && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Şehir seçin:</label>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none">
              <option value="">Şehir seçin...</option>
              {Object.entries(CITY_GROUPS).map(([group, cities]) => (
                <optgroup key={group} label={group}>
                  {cities.map((key) => <option key={key} value={key}>{CITIES[key].tr}</option>)}
                </optgroup>
              ))}
            </select>
            <div className="flex gap-3">
              <button onClick={handleCity} disabled={!selectedCity} className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors">Kıble'yi Bul</button>
              <button onClick={reset} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">Geri</button>
            </div>
          </div>
        )}

        {mode === "manual" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Enlem (Latitude):</label>
              <input type="number" step="any" value={manualLat} onChange={(e) => setManualLat(e.target.value)} placeholder="Örn: 41.0082" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Boylam (Longitude):</label>
              <input type="number" step="any" value={manualLng} onChange={(e) => setManualLng(e.target.value)} placeholder="Örn: 28.9784" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
            </div>
            <p className="text-xs text-gray-400">💡 Google Maps'te konumunuza sağ tıklayarak koordinatları alabilirsiniz</p>
            <div className="flex gap-3">
              <button onClick={handleManual} disabled={!manualLat || !manualLng} className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors">Kıble'yi Hesapla</button>
              <button onClick={reset} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">Geri</button>
            </div>
          </div>
        )}

        {mode === "locating" && (
          <div className="text-center py-10">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-semibold">Konumunuz belirleniyor...</p>
            <p className="text-xs text-gray-400 mt-2">GPS'in açık olduğundan ve konum izni verdiğinizden emin olun</p>
          </div>
        )}

        {mode === "error" && (
          <div className="text-center py-6">
            <p className="text-red-600 font-semibold mb-4">⚠️ {errorMsg}</p>
            <button onClick={reset} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">🔄 Tekrar Dene</button>
          </div>
        )}
      </div>

      <SEOContent content={[
        "Kıble Yönü Bulucu — Dünyanın herhangi bir yerinden Mekke'deki Kâbe'nin yönünü bulun.",
        "Haversine formülü ile hassas hesaplama. 3 konum yöntemi: GPS, şehir seçimi veya elle koordinat girişi.",
        "İnteraktif pusula ile Kıble yönünü kırmızı okla gösterir. Cihaz pusulası ile göreli yön desteği.",
        "Türkiye'den 20+ şehir, 35+ ülkeden 30+ şehir. %100 ücretsiz, tarayıcınızda çalışır.",
      ]} lang="tr" />
      <FAQSection faqs={[
        { question: "Kıble nedir?", answer: "Kıble, Mekke'deki Kâbe'nin yönüdür (21.4225°K, 39.8262°D). Müslümanlar namaz kılarken bu yöne döner." },
        { question: "Kıble yeri konuma göre değişir mi?", answer: "Evet! Türkiye'de Kıble genelde güneydoğu yönündedir. Mısır'da doğu, ABD'de kuzeydoğu, Avrupa'da güneydoğu yönündedir." },
        { question: "Kıble nasıl hesaplanır?", answer: "Haversine formülü kullanılarak konumunuz ile Kâbe arasındaki büyük çember açısı hesaplanır." },
        { question: "GPS olmadan kullanabilir miyim?", answer: "Evet! Şehir listesinden seçim yapabilir veya koordinatları elle girebilirsiniz." },
        { question: "Araç ücretsiz mi?", answer: "Evet, tamamen ücretsiz. Tarayıcınızda çalışır, veri sunucuya gönderilmez." },
      ]} lang="tr" />
      <RelatedTools tools={[
        { title: "Namaz Vakitleri", icon: "🕐", href: "/tr/tools/prayer-times" },
        { title: "Hicri Dönüştürücü", icon: "📅", href: "/tr/tools/hijri-converter" },
        { title: "Zekat Hesaplama", icon: "🕌", href: "/tr/tools/zakat-calculator" },
        { title: "Miras Hesaplama", icon: "📜", href: "/tr/tools/inheritance-calculator" },
      ]} lang="tr" />
      <ShareButtons lang="tr" />
    </div>
  );
}
