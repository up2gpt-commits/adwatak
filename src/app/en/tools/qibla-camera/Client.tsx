"use client";
import { useState, useEffect, useCallback, useRef } from "react";

// ─── Kaaba ───
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

function calcQiblaBearing(lat: number, lng: number): number {
  const latR = (lat * Math.PI) / 180;
  const lngR = (lng * Math.PI) / 180;
  const kLatR = (KAABA_LAT * Math.PI) / 180;
  const kLngR = (KAABA_LNG * Math.PI) / 180;
  const dLng = kLngR - lngR;
  const y = Math.sin(dLng) * Math.cos(kLatR);
  const x = Math.cos(latR) * Math.sin(kLatR) - Math.sin(latR) * Math.cos(kLatR) * Math.cos(dLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function calcDistance(lat: number, lng: number): number {
  const R = 6371;
  const dLat = ((KAABA_LAT - lat) * Math.PI) / 180;
  const dLng = ((KAABA_LNG - lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat * Math.PI) / 180) * Math.cos((KAABA_LAT * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function lerpAngle(a: number, b: number, t: number): number {
  let d = b - a;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return a + d * t;
}

// ─── Cities (English names) ───
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
  "algiers-dz": { lat: 36.7538, lng: 3.0588, en: "Algiers, Algeria" },
  "tunis-tn": { lat: 36.8065, lng: 10.1815, en: "Tunis, Tunisia" },
  "istanbul-tr": { lat: 41.0082, lng: 28.9784, en: "Istanbul, Turkey" },
  "karachi-pk": { lat: 24.8607, lng: 67.0011, en: "Karachi, Pakistan" },
  "jakarta-id": { lat: -6.2088, lng: 106.8456, en: "Jakarta, Indonesia" },
  "london-gb": { lat: 51.5074, lng: -0.1278, en: "London, UK" },
  "paris-fr": { lat: 48.8566, lng: 2.3522, en: "Paris, France" },
  "newyork-us": { lat: 40.7128, lng: -74.0060, en: "New York, USA" },
  "losangeles-us": { lat: 34.0522, lng: -118.2437, en: "Los Angeles, USA" },
  "toronto-ca": { lat: 43.6532, lng: -79.3832, en: "Toronto, Canada" },
  "sydney-au": { lat: -33.8688, lng: 151.2093, en: "Sydney, Australia" },
  "tokyo-jp": { lat: 35.6762, lng: 139.6503, en: "Tokyo, Japan" },
  "moscow-ru": { lat: 55.7558, lng: 37.6173, en: "Moscow, Russia" },
};

const CITY_GROUPS: Record<string, string[]> = {
  "Middle East": ["mecca-sa", "medina-sa", "riyadh-sa", "jeddah-sa", "dammam-sa", "dubai-ae", "abudhabi-ae", "doha-qa", "kuwait-kw", "manama-bh", "muscat-om", "baghdad-iq", "amman-jo", "beirut-lb", "damascus-sy", "jerusalem-ps"],
  "North Africa": ["cairo-eg", "alexandria-eg", "casablanca-ma", "algiers-dz", "tunis-tn"],
  "Europe": ["istanbul-tr", "london-gb", "paris-fr"],
  "South Asia": ["karachi-pk"],
  "Southeast Asia": ["jakarta-id"],
  "Americas": ["newyork-us", "losangeles-us", "toronto-ca"],
  "Oceania": ["sydney-au"],
  "Others": ["tokyo-jp", "moscow-ru"],
};

function generateKaabaSVG(): string {
  return `<svg viewBox="0 0 240 300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a1a2e"/>
        <stop offset="100%" stop-color="#16213e"/>
      </linearGradient>
      <linearGradient id="kaabaFront" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a1a1a"/>
        <stop offset="100%" stop-color="#0d0d0d"/>
      </linearGradient>
      <linearGradient id="kaabaSide" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#2a2a2a"/>
        <stop offset="100%" stop-color="#1a1a1a"/>
      </linearGradient>
      <linearGradient id="goldBand" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#D4A843"/>
        <stop offset="50%" stop-color="#C9A952"/>
        <stop offset="100%" stop-color="#B8952A"/>
      </linearGradient>
      <linearGradient id="goldBandSide" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#A88328"/>
        <stop offset="100%" stop-color="#8B6920"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="rgba(255,215,0,0.4)"/>
        <stop offset="100%" stop-color="rgba(255,215,0,0)"/>
      </radialGradient>
    </defs>
    <rect width="240" height="300" fill="url(#sky)"/>
    <rect x="0" y="240" width="240" height="60" fill="#2c1810"/>
    <rect x="0" y="238" width="240" height="4" fill="#5c4030"/>
    <ellipse cx="120" cy="120" rx="100" ry="100" fill="url(#glow)"/>
    <polygon points="175,70 220,100 220,225 175,235" fill="url(#kaabaSide)"/>
    <polygon points="120,72 175,70 220,100 165,108" fill="#3a3a3a"/>
    <polygon points="20,72 120,72 165,108 65,115" fill="#222"/>
    <rect x="20" y="75" width="155" height="160" rx="2" fill="url(#kaabaFront)"/>
    <rect x="20" y="115" width="155" height="14" fill="url(#goldBand)"/>
    <rect x="20" y="117" width="155" height="2" fill="rgba(255,255,255,0.1)"/>
    <polygon points="175,115 220,145 220,159 175,129" fill="url(#goldBandSide)"/>
    <rect x="115" y="140" width="42" height="65" rx="3" fill="url(#goldBand)"/>
    <rect x="120" y="148" width="32" height="50" rx="2" fill="#1a1a1a" opacity="0.3"/>
    <rect x="120" y="148" width="32" height="2" fill="rgba(255,255,255,0.3)"/>
    <circle cx="125" cy="175" r="2" fill="#B8952A"/>
    <ellipse cx="32" cy="145" rx="8" ry="10" fill="#111"/>
    <ellipse cx="32" cy="145" rx="6" ry="8" fill="#222"/>
    <ellipse cx="32" cy="145" rx="3" ry="5" fill="#333"/>
    <ellipse cx="32" cy="145" rx="10" ry="12" fill="none" stroke="#A0A0A0" stroke-width="1.5"/>
  </svg>`;
}

function ARCamera({ lat, lng, bearing, onBack, locale }: { lat: number; lng: number; bearing: number; onBack: () => void; locale: "ar" | "en" | "tr" | "id" }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef(-1);
  const smoothAngleRef = useRef(0);
  const revealProgressRef = useRef(0);
  const rafRef = useRef(0);
  const [heading, setHeading] = useState(-1);
  const [aligned, setAligned] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [camError, setCamError] = useState("");
  const kaabaImgRef = useRef<HTMLImageElement | null>(null);

  const L = (a: string, e: string) => locale === "ar" ? a : e;

  useEffect(() => {
    const img = new Image();
    img.src = "data:image/svg+xml," + encodeURIComponent(generateKaabaSVG());
    kaabaImgRef.current = img;
  }, []);

  useEffect(() => {
    let stream: MediaStream | null = null;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setCameraReady(true);
        }
      } catch {
        setCamError("Camera access denied. Please allow camera permission.");
      }
    })();
    return () => { if (stream) stream.getTracks().forEach((t) => t.stop()); };
  }, []);

  useEffect(() => {
    const handler = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        headingRef.current = 360 - e.alpha;
        setHeading(360 - e.alpha);
      }
    };
    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let currentBearing = bearing;
    let alignedState = false;

    const resize = () => {
      const c = containerRef.current;
      if (!c) return;
      canvas.width = c.clientWidth;
      canvas.height = c.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let lastTime = 0;
    const draw = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const currentHeading = headingRef.current;
      let diff = -1;
      if (currentHeading >= 0) {
        let d = currentBearing - currentHeading;
        if (d > 180) d -= 360;
        if (d < -180) d += 360;
        diff = Math.abs(d);
      }

      if (currentHeading >= 0) {
        smoothAngleRef.current = lerpAngle(smoothAngleRef.current, currentHeading, Math.min(1, dt * 8));
      }

      const isAligned = diff >= 0 && diff < 5;
      if (isAligned) {
        revealProgressRef.current = Math.min(1, revealProgressRef.current + dt * 2);
      } else {
        revealProgressRef.current = Math.max(0, revealProgressRef.current - dt * 3);
      }

      if (isAligned !== alignedState) {
        alignedState = isAligned;
        setAligned(isAligned);
      }

      // Bottom gradient
      const bg = ctx.createLinearGradient(0, h - 160, 0, h);
      bg.addColorStop(0, "rgba(0,0,0,0)");
      bg.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, h - 160, w, 160);

      // Top gradient
      const tg = ctx.createLinearGradient(0, 0, 0, 80);
      tg.addColorStop(0, "rgba(0,0,0,0.5)");
      tg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = tg;
      ctx.fillRect(0, 0, w, 80);

      if (currentHeading >= 0 && diff >= 0) {
        const arcCX = w / 2, arcCY = h - 30, arcR = 70;

        ctx.beginPath();
        ctx.arc(arcCX, arcCY, arcR, -Math.PI * 0.75, Math.PI * 0.75);
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.lineWidth = 4;
        ctx.stroke();

        const arcStart = -Math.PI * 0.75, arcEnd = Math.PI * 0.75;
        const totalArc = arcEnd - arcStart;
        const normDiff = Math.min(diff, 60) / 60;
        const markerAngle = arcStart + totalArc * (1 - normDiff);

        ctx.beginPath();
        ctx.arc(arcCX, arcCY, arcR, arcStart, markerAngle);
        ctx.strokeStyle = diff < 10 ? "#22c55e" : diff < 20 ? "#eab308" : "#ef4444";
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.stroke();

        const px = arcCX + (arcR + 20) * Math.cos(markerAngle);
        const py = arcCY + (arcR + 20) * Math.sin(markerAngle);
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(markerAngle + Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(-6, 6);
        ctx.lineTo(6, 6);
        ctx.closePath();
        ctx.fillStyle = diff < 10 ? "#22c55e" : "#eab308";
        ctx.fill();
        ctx.restore();

        const cx = w / 2, cy = h / 2 - 20;

        if (!isAligned) {
          let turnAngle = currentBearing - currentHeading;
          if (turnAngle > 180) turnAngle -= 360;
          if (turnAngle < -180) turnAngle += 360;
          const turnDir = turnAngle > 0 ? 1 : -1;
          const intensity = Math.min(Math.abs(turnAngle) / 30, 1);
          const arrowColor = diff < 20 ? (diff < 10 ? "#22c55e" : "#eab308") : "#ef4444";

          ctx.save();
          ctx.translate(cx, cy);
          ctx.shadowColor = "rgba(0,0,0,0.4)";
          ctx.shadowBlur = 8;

          ctx.beginPath();
          ctx.arc(0, 0, 50, -Math.PI / 4 * turnDir * intensity + Math.PI / 2, Math.PI / 4 * turnDir * intensity + Math.PI / 2, turnDir < 0);
          ctx.strokeStyle = arrowColor;
          ctx.lineWidth = 8;
          ctx.lineCap = "round";
          ctx.stroke();

          const tipAngle = Math.PI / 4 * turnDir * intensity + Math.PI / 2;
          const tipX = 50 * Math.cos(tipAngle);
          const tipY = 50 * Math.sin(tipAngle);

          ctx.beginPath();
          ctx.moveTo(tipX, tipY);
          ctx.lineTo(tipX - 15 * Math.cos(tipAngle + Math.PI / 6) + 8 * Math.cos(tipAngle + Math.PI / 3), tipY - 15 * Math.sin(tipAngle + Math.PI / 6) + 8 * Math.sin(tipAngle + Math.PI / 3));
          ctx.lineTo(tipX - 15 * Math.cos(tipAngle - Math.PI / 6) + 8 * Math.cos(tipAngle - Math.PI / 3), tipY - 15 * Math.sin(tipAngle - Math.PI / 6) + 8 * Math.sin(tipAngle - Math.PI / 3));
          ctx.closePath();
          ctx.fillStyle = arrowColor;
          ctx.fill();

          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.arc(0, 0, 10, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.3)";
          ctx.fill();
          ctx.strokeStyle = "rgba(255,255,255,0.5)";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();

          const turnText = Math.abs(turnAngle) < 5 ? "Go straight" : turnAngle > 0 ? "Turn right" : "Turn left";
          ctx.fillStyle = "rgba(255,255,255,0.9)";
          ctx.font = "bold 18px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(turnText, cx, cy + 90);

          ctx.fillStyle = "rgba(255,255,255,0.6)";
          ctx.font = "14px sans-serif";
          ctx.fillText(`${Math.round(diff)}° remaining`, cx, cy + 115);
        }
      }

      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(`Qibla: ${currentBearing.toFixed(1)}°`, 16, 16);

      if (currentHeading >= 0) {
        ctx.font = "13px sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fillText(`Device: ${Math.round(currentHeading)}°`, 16, 38);
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [locale]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black overflow-hidden">
      <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {aligned && kaabaImgRef.current && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative animate-bounce-gentle">
            <img src={kaabaImgRef.current.src} alt="Kaaba" className="w-48 h-56 md:w-60 md:h-72 object-contain drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]" />
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-center">
              <p className="text-3xl font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] animate-pulse">Allahu Akbar</p>
              <p className="text-sm text-yellow-200 mt-1 opacity-80">Qibla is ahead</p>
            </div>
          </div>
        </div>
      )}

      {camError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-center p-6">
            <p className="text-red-400 font-semibold mb-4 text-lg">⚠️ {camError}</p>
            <button onClick={onBack} className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-colors">Back</button>
          </div>
        </div>
      )}

      <button onClick={() => { headingRef.current = -1; onBack(); }} className="absolute top-4 right-4 z-10 bg-black/30 hover:bg-black/50 text-white px-4 py-2 rounded-xl transition-colors text-sm">✕ Back</button>

      {!cameraReady && !camError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white font-semibold">Starting camera...</p>
          </div>
        </div>
      )}
    </div>
  );
}

type Mode = "idle" | "city" | "manual" | "locating" | "error";

export default function Client({ locale = "en" }: { locale?: "ar" | "en" | "tr" | "id" }) {
  const [mode, setMode] = useState<Mode>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);
  const [bearing, setBearing] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [showAR, setShowAR] = useState(false);

  const showResult = useCallback((lat: number, lng: number) => {
    setBearing(calcQiblaBearing(lat, lng));
    setUserLat(lat);
    setUserLng(lng);
    setShowAR(true);
  }, []);

  const handleGPS = () => {
    if (!navigator.geolocation) { setErrorMsg("Your browser doesn't support geolocation"); setMode("error"); return; }
    setMode("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => showResult(pos.coords.latitude, pos.coords.longitude),
      () => { setErrorMsg("Could not determine your location."); setMode("error"); },
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
      setErrorMsg("Invalid coordinates"); setMode("error"); return;
    }
    showResult(lat, lng);
  };

  const reset = () => { setMode("idle"); setErrorMsg(""); setSelectedCity(""); setManualLat(""); setManualLng(""); };

  if (showAR) return <ARCamera lat={userLat} lng={userLng} bearing={bearing} onBack={() => setShowAR(false)} locale={locale} />;

  return (
    <div className="max-w-[760px] mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📸 Qibla Camera Finder</h1>
        <p className="text-sm text-gray-500 mb-6">Point your camera toward Qibla and see the Kaaba!</p>

        {mode === "idle" && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Choose how to set your location:</p>
            <button onClick={handleGPS} className="w-full flex items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">📍</span>
              <div className="text-left"><p className="font-bold">Auto GPS</p><p className="text-xs opacity-80">Most accurate</p></div>
            </button>
            <button onClick={() => setMode("city")} className="w-full flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">🏙️</span>
              <div className="text-left"><p className="font-bold">Select city</p><p className="text-xs opacity-80">30+ cities</p></div>
            </button>
            <button onClick={() => setMode("manual")} className="w-full flex items-center gap-4 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-4 rounded-xl transition-colors">
              <span className="text-2xl">📐</span>
              <div className="text-left"><p className="font-bold">Manual coordinates</p><p className="text-xs opacity-80">Enter lat/lng</p></div>
            </button>
          </div>
        )}

        {mode === "city" && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">City:</label>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 outline-none">
              <option value="">Select a city...</option>
              {Object.entries(CITY_GROUPS).map(([group, cities]) => (
                <optgroup key={group} label={group}>
                  {cities.map((key) => <option key={key} value={key}>{CITIES[key].en}</option>)}
                </optgroup>
              ))}
            </select>
            <div className="flex gap-3">
              <button onClick={handleCity} disabled={!selectedCity} className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors">Open Camera</button>
              <button onClick={reset} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl">Back</button>
            </div>
          </div>
        )}

        {mode === "manual" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Latitude:</label>
              <input type="number" step="any" value={manualLat} onChange={(e) => setManualLat(e.target.value)} placeholder="e.g. 30.0444" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Longitude:</label>
              <input type="number" step="any" value={manualLng} onChange={(e) => setManualLng(e.target.value)} placeholder="e.g. 31.2357" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div className="flex gap-3">
              <button onClick={handleManual} disabled={!manualLat || !manualLng} className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors">Open Camera</button>
              <button onClick={reset} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl">Back</button>
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

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
        <h2 className="font-bold text-amber-900 mb-2">How it works</h2>
        <ol className="text-sm text-amber-800 space-y-1 list-decimal list-inside">
          <li>Select your location (GPS, city, or coordinates)</li>
          <li>Point your rear camera forward</li>
          <li>Follow the arrow to turn toward Qibla</li>
          <li>When aligned — the Kaaba appears!</li>
        </ol>
      </div>
    </div>
  );
}
