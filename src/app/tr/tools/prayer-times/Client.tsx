"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema ,howToSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const METHODS: Record<string, { tr: string; fajrAngle: number; ishaAngle: number; ishaOffset?: number }> = {
  "1": { tr: "Umm al-Qura (Suudi)", fajrAngle: 18.5, ishaAngle: 0, ishaOffset: 90 },
  "2": { tr: "Mısır Otoritesi", fajrAngle: 19.5, ishaAngle: 17.5 },
  "3": { tr: "İslam Dünya Ligi", fajrAngle: 18, ishaAngle: 17 },
  "4": { tr: "Karachi Üniversitesi", fajrAngle: 18, ishaAngle: 18 },
  "5": { tr: "ISNA (Kuzey Amerika)", fajrAngle: 15, ishaAngle: 15 },
  "6": { tr: "Kuveyt", fajrAngle: 18, ishaAngle: 17.5 },
  "7": { tr: "Katar", fajrAngle: 18, ishaAngle: 0, ishaOffset: 90 },
  "8": { tr: "Singapur", fajrAngle: 20, ishaAngle: 18 },
};

const CITIES: Record<string, { lat: number; lng: number; tr: string; tz: number }> = {
  "istanbul": { lat: 41.0082, lng: 28.9784, tr: "İstanbul", tz: 3 },
  "ankara": { lat: 39.9334, lng: 32.8597, tr: "Ankara", tz: 3 },
  "izmir": { lat: 38.4237, lng: 27.1428, tr: "İzmir", tz: 3 },
  "bursa": { lat: 40.1885, lng: 29.0610, tr: "Bursa", tz: 3 },
  "antalya": { lat: 36.8969, lng: 30.7133, tr: "Antalya", tz: 3 },
  "adana": { lat: 37.0000, lng: 35.3213, tr: "Adana", tz: 3 },
  "konya": { lat: 37.8746, lng: 32.4932, tr: "Konya", tz: 3 },
  "gaziantep": { lat: 37.0662, lng: 37.3833, tr: "Gaziantep", tz: 3 },
  "kayseri": { lat: 38.7312, lng: 35.4787, tr: "Kayseri", tz: 3 },
  "mersin": { lat: 36.8121, lng: 34.6415, tr: "Mersin", tz: 3 },
  "eskisehir": { lat: 39.7667, lng: 30.5256, tr: "Eskişehir", tz: 3 },
  "diyarbakir": { lat: 37.9250, lng: 40.2110, tr: "Diyarbakır", tz: 3 },
  "samsun": { lat: 41.2928, lng: 36.3313, tr: "Samsun", tz: 3 },
  "trabzon": { lat: 41.0027, lng: 39.7168, tr: "Trabzon", tz: 3 },
  "cairo": { lat: 30.0444, lng: 31.2357, tr: "Kahire, Mısır", tz: 2 },
  "riyadh": { lat: 24.7136, lng: 46.6753, tr: "Riyad, Suudi Arabistan", tz: 3 },
  "dubai": { lat: 25.2048, lng: 55.2708, tr: "Dubai, BAE", tz: 4 },
  "london": { lat: 51.5074, lng: -0.1278, tr: "Londra, İngiltere", tz: 0 },
  "paris": { lat: 48.8566, lng: 2.3522, tr: "Paris, Fransa", tz: 1 },
  "berlin": { lat: 52.5200, lng: 13.4050, tr: "Berlin, Almanya", tz: 1 },
  "newyork": { lat: 40.7128, lng: -74.0060, tr: "New York, ABD", tz: -5 },
  "karachi": { lat: 24.8607, lng: 67.0011, tr: "Karaçi, Pakistan", tz: 5 },
  "dhaka": { lat: 23.8103, lng: 90.4125, tr: "Dakka, Bangladeş", tz: 6 },
  "jakarta": { lat: -6.2088, lng: 106.8456, tr: "Cakarta, Endonezya", tz: 7 },
  "moscow": { lat: 55.7558, lng: 37.6173, tr: "Moskova, Rusya", tz: 3 },
  "capetown": { lat: -33.9249, lng: 18.4241, tr: "Cape Town, G. Afrika", tz: 2 },
};

const CITY_GROUPS: Record<string, string[]> = {
  "Türkiye": ["istanbul", "ankara", "izmir", "bursa", "antalya", "adana", "konya", "gaziantep", "kayseri", "mersin", "eskisehir", "diyarbakir", "samsun", "trabzon"],
  "Ortadoğu": ["cairo", "riyadh", "dubai"],
  "Avrupa": ["london", "paris", "berlin"],
  "Amerika": ["newyork"],
  "Asya": ["karachi", "dhaka", "jakarta", "moscow"],
  "Diğer": ["capetown"],
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

function getNextPrayer(times: { fajr: string; sunrise: string; dhuhr: string; asr: string; maghrib: string; isha: string }, now: Date) {
  const prayers = [
    { key: "fajr", name: "İmsak" }, { key: "sunrise", name: "Güneş" },
    { key: "dhuhr", name: "Öğle" }, { key: "asr", name: "İkindi" },
    { key: "maghrib", name: "Akşam" }, { key: "isha", name: "Yatsı" },
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
  if (t && t !== "--:--") { const [h, m] = t.split(":").map(Number); return { name: "İmsak", time: t, diff: (24 * 60 - nowMin) + (h * 60 + m) }; }
  return null;
}

function formatCountdownTR(minutes: number) {
  const h = Math.floor(minutes / 60), m = minutes % 60;
  if (h > 0) return `${h}sa ${m}dk`;
  return `${m}dk`;
}

type Mode = "idle" | "city" | "manual" | "result" | "locating" | "error";
const PRAYER_ICONS: Record<string, string> = { fajr: "🌙", sunrise: "🌅", dhuhr: "☀️", asr: "🌤️", maghrib: "🌇", isha: "🌃" };
const PRAYER_NAMES_TR: Record<string, string> = { fajr: "İmsak", sunrise: "Güneş", dhuhr: "Öğle", asr: "İkindi", maghrib: "Akşam", isha: "Yatsı" };

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
    setHijriDate(getHijriDateTR(today));
    setGregDate(today.toLocaleDateString("tr-TR", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
    setCityName(name);
    setMode("result");
    setCountdown(getNextPrayer(calcPrayerTimes(lat, lng, tz, method, today), new Date()));
  }, [method]);

  const handleGPS = () => {
    if (!navigator.geolocation) { setErrorMsg("Tarayıcınız konum desteklemiyor"); setMode("error"); return; }
    setMode("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => calcAndShow(pos.coords.latitude, pos.coords.longitude, Math.round(pos.coords.longitude / 15), "Mevcut Konum"),
      () => { setErrorMsg("Konumunuz belirlenemedi. GPS'in açık olduğundan emin olun."); setMode("error"); },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  const handleCity = () => { const c = CITIES[selectedCity]; if (c) calcAndShow(c.lat, c.lng, c.tz, c.tr); };
  const handleManual = () => {
    const lat = parseFloat(manualLat), lng = parseFloat(manualLng), tz = parseFloat(manualTz);
    if (isNaN(lat) || isNaN(lng) || isNaN(tz)) { setErrorMsg("Geçerli koordinatlar girin"); setMode("error"); return; }
    calcAndShow(lat, lng, tz, `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`);
  };
  const reset = () => { setMode("idle"); setErrorMsg(""); setSelectedCity(""); setManualLat(""); setManualLng(""); setManualTz(""); };

  const prayerOrder = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Namaz Vakitleri", "Konumunuzun namaz vakitleri — geri sayım ile hassas hesaplama", "https://adwatak.cloud/tr/tools/prayer-times", "tr", "İslami")} />
      <StructuredData data={faqSchema([
        { question: "Hesaplama yöntemleri neler?", answer: "Umm al-Qura (Suudi), Mısır Otoritesi, İslam Dünya Ligi, Karachi, ISNA, Kuveyt, Katar, Singapur." },
        { question: "Hesaplama doğru mu?", answer: "Evet, büyük namaz uygulamalarında kullanılan aynı matematiksel formüller kullanılır." },
        { question: "İnternet olmadan çalışır mı?", answer: "Evet! Tüm hesaplamalar tarayıcınızda yapılır." },
        { question: "Geri sayım nedir?", answer: "Bir sonraki namaza kalan süreyi saat ve dakika olarak gösterir." },
        { question: "Hicri tarih gösteriyor mu?", answer: "Evet, hem Miladi hem Hicri tarih gösterilir." },
        { question: "Kaç şehir var?", answer: "Türkiye'den 14+, dünyadan 10+ şehir, toplama 25+ şehir." },
      ])} />
      <StructuredData data={breadcrumbSchema([
        { name: "Ana Sayfa", url: "https://adwatak.cloud/tr" },
        { name: "İslami Araçlar", url: "https://adwatak.cloud/tr/category/islamic" },
        { name: "Namaz Vakitleri", url: "https://adwatak.cloud/tr/tools/prayer-times" },
      ])} />
      {/* GEO: Speakable — yapay zeka/ses motorları için işaretli içerik */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      {/* GEO: HowTo — adim adim kullanim */}
      <StructuredData data={howToSchema("Bu araci nasil kullanirim", "Tarayicinizda calisan ucretsiz arac. Kayit gerektirmez.", [{name:"Araci acin",text:"Adwatak sitesinde bu arac sayfasina gidin"},{name:"Verilerinizi girin",text:"Gerekli alanlari doldurun"},{name:"Sonuc alin",text:"Hesapla veya olustur butonuna tiklayin"},{name:"Kullanin veya paylasin",text:"Sonucu kopyalayin, indirin veya paylasin"}],"bir dakikadan az","tr")} />
      {/* GEO: Speakable — AI/ses motorlari */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />

      <Breadcrumb lang="tr" category="İslami Araçlar" categorySlug="islamic" toolName="Namaz Vakitleri" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🕐 Namaz Vakitleri</h1>
        <p className="text-sm text-gray-500 mb-6">Konumunuzun namaz vakitleri — geri sayım ile hassas hesaplama</p>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Hesaplama Yöntemi:</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none">
            {Object.entries(METHODS).map(([k, v]) => <option key={k} value={k}>{v.tr}</option>)}
          </select>
        </div>

        {mode === "result" && times && (
          <div>
            <div className="text-center mb-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <p className="text-sm font-bold text-emerald-800">📅 {gregDate}</p>
              <p className="text-xs text-emerald-600">{hijriDate}</p>
              <p className="text-xs text-gray-500 mt-1">📍 {cityName} — {METHODS[method]?.tr}</p>
            </div>
            {countdown && (
              <div className="text-center mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <p className="text-xs text-blue-600 font-semibold">Sıradaki: {countdown.name}</p>
                <p className="text-3xl font-extrabold text-blue-800 my-1">{formatCountdownTR(countdown.diff)}</p>
                <p className="text-xs text-blue-500">Saat {countdown.time}</p>
              </div>
            )}
            <div className="space-y-2">
              {prayerOrder.map((key) => {
                const time = times[key as keyof typeof times];
                const isNext = countdown && countdown.name === PRAYER_NAMES_TR[key];
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
                        {PRAYER_NAMES_TR[key]}
                        {isNext && <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full ml-2">Sıradaki</span>}
                      </span>
                    </div>
                    <span className={`text-xl font-extrabold font-mono ${isNext ? "text-blue-800" : key === "maghrib" ? "text-orange-800" : "text-gray-800"}`}>{time}</span>
                  </div>
                );
              })}
            </div>
            <button onClick={reset} className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">🔄 Konum Değiştir</button>
          </div>
        )}

        {mode === "idle" && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Konumunuzu belirleyin:</p>
            <button onClick={handleGPS} className="w-full flex items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">📍</span>
              <div className="text-left"><p className="font-bold">Konumumu otomatik belirle (GPS)</p><p className="text-xs opacity-80">En doğru — gerçek GPS konumunuzu kullanır</p></div>
            </button>
            <button onClick={() => setMode("city")} className="w-full flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">🏙️</span>
              <div className="text-left"><p className="font-bold">Şehir listesinden seç</p><p className="text-xs opacity-80">Türkiye'den 14+, dünyadan 10+ şehir</p></div>
            </button>
            <button onClick={() => setMode("manual")} className="w-full flex items-center gap-4 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">📐</span>
              <div className="text-left"><p className="font-bold">Koordinatları elle gir</p><p className="text-xs opacity-80">Enlem, boylam ve saat dilimi</p></div>
            </button>
          </div>
        )}

        {mode === "city" && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Şehir seçin:</label>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 outline-none">
              <option value="">Şehir seçin...</option>
              {Object.entries(CITY_GROUPS).map(([group, cities]) => (
                <optgroup key={group} label={group}>
                  {cities.map((key) => <option key={key} value={key}>{CITIES[key].tr}</option>)}
                </optgroup>
              ))}
            </select>
            <div className="flex gap-3">
              <button onClick={handleCity} disabled={!selectedCity} className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors">Vakitleri Göster</button>
              <button onClick={reset} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">Geri</button>
            </div>
          </div>
        )}

        {mode === "manual" && (
          <div className="space-y-4">
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Enlem:</label><input type="number" step="any" value={manualLat} onChange={(e) => setManualLat(e.target.value)} placeholder="Örn: 41.0082" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" /></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Boylam:</label><input type="number" step="any" value={manualLng} onChange={(e) => setManualLng(e.target.value)} placeholder="Örn: 28.9784" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" /></div>
            <div><label className="block text-sm font-semibold text-gray-700 mb-2">Saat Dilimi (UTC):</label><input type="number" step="any" value={manualTz} onChange={(e) => setManualTz(e.target.value)} placeholder="Örn: 3 (Türkiye)" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" /></div>
            <div className="flex gap-3">
              <button onClick={handleManual} disabled={!manualLat || !manualLng || !manualTz} className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors">Hesapla</button>
              <button onClick={reset} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors">Geri</button>
            </div>
          </div>
        )}

        {mode === "locating" && (
          <div className="text-center py-10">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-semibold">Konumunuz belirleniyor...</p>
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
        "Konumunuzun namaz vakitleri — harici API'siz matematiksel hesaplama.",
        "8 hesaplama yöntemi: Umm al-Qura, Mısır, İslam Dünya Ligi, Karachi, ISNA, Kuveyt, Katar, Singapur.",
        "Sıradaki namaza geri sayım + Hicri ve Miladi tarih + 25+ şehir.",
        "GPS otomatik, şehir seçimi veya elle koordinat girişi.",
        "Tarayıcınızda çalışır — yüklemeden sonra internet gerekmez.",
      ]} lang="tr" />
      <FAQSection faqs={[
        { question: "Hesaplama yöntemleri neler?", answer: "Umm al-Qura (Suudi), Mısır Otoritesi, İslam Dünya Ligi, Karachi, ISNA, Kuveyt, Katar, Singapur." },
        { question: "Hesaplama doğru mu?", answer: "Evet, büyük namaz uygulamalarında kullanılan aynı matematiksel formüller kullanılır." },
        { question: "İnternet olmadan çalışır mı?", answer: "Evet! Tüm hesaplamalar tarayıcınızda yapılır." },
        { question: "Kaç şehir var?", answer: "Türkiye'den 14+, dünyadan 10+ şehir." },
      ]} lang="tr" />
      <RelatedTools tools={[
        { title: "Kıble Yönü", icon: "🧭", href: "/tr/tools/qibla-direction" },
        { title: "Hicri Dönüştürücü", icon: "📅", href: "/tr/tools/hijri-converter" },
        { title: "Zekat Hesaplama", icon: "🕌", href: "/tr/tools/zakat-calculator" },
        { title: "Miras Hesaplama", icon: "📜", href: "/tr/tools/inheritance-calculator" },
      ]} lang="tr" />
      <ShareButtons lang="tr" />
    </div>
  );
}
