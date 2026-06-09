"use client";
import { useState, useEffect, useCallback, useRef } from "react";

// ─── Kaaba ───
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

// ─── Haversine ───
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

// Smooth rotation interpolation
function lerpAngle(a: number, b: number, t: number): number {
  let d = b - a;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return a + d * t;
}

// ─── CITIES (abridged — same as qibla-direction) ───
const CITIES: Record<string, { lat: number; lng: number; ar: string }> = {
  "mecca-sa": { lat: 21.4225, lng: 39.8262, ar: "مكة المكرمة" },
  "medina-sa": { lat: 24.5247, lng: 39.5692, ar: "المدينة المنورة" },
  "riyadh-sa": { lat: 24.7136, lng: 46.6753, ar: "الرياض" },
  "jeddah-sa": { lat: 21.5433, lng: 39.1728, ar: "جدة" },
  "dammam-sa": { lat: 26.4207, lng: 50.0888, ar: "الدمام" },
  "cairo-eg": { lat: 30.0444, lng: 31.2357, ar: "القاهرة" },
  "alexandria-eg": { lat: 31.2001, lng: 29.9187, ar: "الإسكندرية" },
  "dubai-ae": { lat: 25.2048, lng: 55.2708, ar: "دبي" },
  "abudhabi-ae": { lat: 24.4539, lng: 54.3773, ar: "أبوظبي" },
  "doha-qa": { lat: 25.2854, lng: 51.5310, ar: "الدوحة" },
  "kuwait-kw": { lat: 29.3759, lng: 47.9774, ar: "الكويت" },
  "manama-bh": { lat: 26.2285, lng: 50.5860, ar: "المنامة" },
  "muscat-om": { lat: 23.5880, lng: 58.3829, ar: "مسقط" },
  "baghdad-iq": { lat: 33.3152, lng: 44.3661, ar: "بغداد" },
  "amman-jo": { lat: 31.9454, lng: 35.9284, ar: "عمّان" },
  "beirut-lb": { lat: 33.8938, lng: 35.5018, ar: "بيروت" },
  "damascus-sy": { lat: 33.5138, lng: 36.2765, ar: "دمشق" },
  "jerusalem-ps": { lat: 31.7683, lng: 35.2137, ar: "القدس" },
  "casablanca-ma": { lat: 33.5731, lng: -7.5898, ar: "الدار البيضاء" },
  "algiers-dz": { lat: 36.7538, lng: 3.0588, ar: "الجزائر" },
  "tunis-tn": { lat: 36.8065, lng: 10.1815, ar: "تونس" },
  "istanbul-tr": { lat: 41.0082, lng: 28.9784, ar: "إسطنبول" },
  "karachi-pk": { lat: 24.8607, lng: 67.0011, ar: "كراتشي" },
  "jakarta-id": { lat: -6.2088, lng: 106.8456, ar: "جاكرتا" },
  "london-gb": { lat: 51.5074, lng: -0.1278, ar: "لندن" },
  "paris-fr": { lat: 48.8566, lng: 2.3522, ar: "باريس" },
  "newyork-us": { lat: 40.7128, lng: -74.0060, ar: "نيويورك" },
  "losangeles-us": { lat: 34.0522, lng: -118.2437, ar: "لوس أنجلوس" },
  "toronto-ca": { lat: 43.6532, lng: -79.3832, ar: "تورنتو" },
  "sydney-au": { lat: -33.8688, lng: 151.2093, ar: "سيدني" },
  "tokyo-jp": { lat: 35.6762, lng: 139.6503, ar: "طوكيو" },
  "moscow-ru": { lat: 55.7558, lng: 37.6173, ar: "موسكو" },
};

const COUNTRIES: Record<string, { ar: string; cities: string[] }> = {
  sa: { ar: "السعودية", cities: ["mecca-sa", "medina-sa", "riyadh-sa", "jeddah-sa", "dammam-sa"] },
  eg: { ar: "مصر", cities: ["cairo-eg", "alexandria-eg"] },
  ae: { ar: "الإمارات", cities: ["dubai-ae", "abudhabi-ae"] },
  qa: { ar: "قطر", cities: ["doha-qa"] },
  kw: { ar: "الكويت", cities: ["kuwait-kw"] },
  bh: { ar: "البحرين", cities: ["manama-bh"] },
  om: { ar: "عُمان", cities: ["muscat-om"] },
  iq: { ar: "العراق", cities: ["baghdad-iq"] },
  jo: { ar: "الأردن", cities: ["amman-jo"] },
  lb: { ar: "لبنان", cities: ["beirut-lb"] },
  sy: { ar: "سوريا", cities: ["damascus-sy"] },
  ps: { ar: "فلسطين", cities: ["jerusalem-ps"] },
  ma: { ar: "المغرب", cities: ["casablanca-ma"] },
  dz: { ar: "الجزائر", cities: ["algiers-dz"] },
  tn: { ar: "تونس", cities: ["tunis-tn"] },
  tr: { ar: "تركيا", cities: ["istanbul-tr"] },
  pk: { ar: "باكستان", cities: ["karachi-pk"] },
  id: { ar: "إندونيسيا", cities: ["jakarta-id"] },
  gb: { ar: "بريطانيا", cities: ["london-gb"] },
  fr: { ar: "فرنسا", cities: ["paris-fr"] },
  us: { ar: "أمريكا", cities: ["newyork-us", "losangeles-us"] },
  ca: { ar: "كندا", cities: ["toronto-ca"] },
  au: { ar: "أستراليا", cities: ["sydney-au"] },
  ru: { ar: "روسيا", cities: ["moscow-ru"] },
  jp: { ar: "اليابان", cities: ["tokyo-jp"] },
};

// ─── Kaaba SVG (data URL) ───
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
    <!-- Ground -->
    <rect x="0" y="240" width="240" height="60" fill="#2c1810"/>
    <rect x="0" y="238" width="240" height="4" fill="#5c4030"/>
    <!-- Glow behind kaaba -->
    <ellipse cx="120" cy="120" rx="100" ry="100" fill="url(#glow)"/>
    <!-- Kaaba right face (perspective) -->
    <polygon points="175,70 220,100 220,225 175,235" fill="url(#kaabaSide)"/>
    <!-- Kaaba top (perspective) -->
    <polygon points="120,72 175,70 220,100 165,108" fill="#3a3a3a"/>
    <polygon points="20,72 120,72 165,108 65,115" fill="#222"/>
    <!-- Kaaba front face -->
    <rect x="20" y="75" width="155" height="160" rx="2" fill="url(#kaabaFront)"/>
    <!-- Gold band front -->
    <rect x="20" y="115" width="155" height="14" fill="url(#goldBand)"/>
    <rect x="20" y="117" width="155" height="2" fill="rgba(255,255,255,0.1)"/>
    <!-- Gold band side -->
    <polygon points="175,115 220,145 220,159 175,129" fill="url(#goldBandSide)"/>
    <!-- Gold door -->
    <rect x="115" y="140" width="42" height="65" rx="3" fill="url(#goldBand)"/>
    <rect x="120" y="148" width="32" height="50" rx="2" fill="#1a1a1a" opacity="0.3"/>
    <rect x="120" y="148" width="32" height="2" fill="rgba(255,215,0,0.5)"/>
    <!-- Door knob -->
    <circle cx="125" cy="175" r="2" fill="#B8952A"/>
    <!-- Black Stone (Hajar al-Aswad) - left corner -->
    <ellipse cx="32" cy="145" rx="8" ry="10" fill="#111"/>
    <ellipse cx="32" cy="145" rx="6" ry="8" fill="#222"/>
    <ellipse cx="32" cy="145" rx="3" ry="5" fill="#333"/>
    <!-- Silver frame around black stone -->
    <ellipse cx="32" cy="145" rx="10" ry="12" fill="none" stroke="#A0A0A0" stroke-width="1.5"/>
    <!-- Kaaba cover texture lines -->
    <line x1="20" y1="130" x2="175" y2="130" stroke="#222" stroke-width="0.3"/>
    <line x1="20" y1="170" x2="175" y2="170" stroke="#222" stroke-width="0.3"/>
    <line x1="20" y1="190" x2="175" y2="190" stroke="#222" stroke-width="0.3"/>
    <line x1="20" y1="210" x2="175" y2="210" stroke="#222" stroke-width="0.3"/>
    <line x1="20" y1="225" x2="175" y2="225" stroke="#222" stroke-width="0.3"/>
    <!-- Kaaba text: لا إله إلا الله محمد رسول الله (stylized on belt) -->
    <text x="97" y="126" text-anchor="middle" fill="rgba(255,215,0,0.15)" font-size="6" font-family="serif">ﷲ</text>
  </svg>`;
}

// ─── ARC Camera & Overlay ───
function ARCamera({
  lat,
  lng,
  bearing,
  onBack,
  locale,
}: {
  lat: number;
  lng: number;
  bearing: number;
  onBack: () => void;
  locale: "ar" | "en" | "tr" | "id";
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const headingRef = useRef(-1);
  const smoothAngleRef = useRef(0);
  const revealProgressRef = useRef(0);
  const alignedRef = useRef(false);
  const rafRef = useRef(0);
  const [heading, setHeading] = useState(-1);
  const [aligned, setAligned] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [camError, setCamError] = useState("");
  const kaabaImgRef = useRef<HTMLImageElement | null>(null);

  const getAngleDiff = useCallback(
    (h: number) => {
      if (h < 0) return -1;
      let d = bearing - h;
      if (d > 180) d -= 360;
      if (d < -180) d += 360;
      return Math.abs(d);
    },
    [bearing]
  );

  // Load Kaaba SVG
  useEffect(() => {
    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(generateKaabaSVG());
    kaabaImgRef.current = img;
  }, []);

  // Start camera
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
        setCamError("تعذر تشغيل الكاميرا. السماح بالوصول للكاميرا ثم حاول مرة أخرى.");
      }
    })();
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // Device orientation — only update ref in RAF, state only when meaningful
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

  // Animation loop — STABLE deps, no aligned/bearing/getAngleDiff
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let currentBearing = bearing; // closed over once
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

      // Smooth arrow rotation
      if (currentHeading >= 0) {
        smoothAngleRef.current = lerpAngle(smoothAngleRef.current, currentHeading, Math.min(1, dt * 8));
      }

      // Aligned check — use local + ref, not state
      const isAligned = diff >= 0 && diff < 5;
      if (isAligned) {
        revealProgressRef.current = Math.min(1, revealProgressRef.current + dt * 2);
      } else {
        revealProgressRef.current = Math.max(0, revealProgressRef.current - dt * 3);
      }

      if (isAligned !== alignedState) {
        alignedState = isAligned;
        alignedRef.current = isAligned;
        setAligned(isAligned);
      }

      // === DRAW HUD OVERLAY ===

      // --- Semi-transparent gradient at bottom ---
      const bottomGrad = ctx.createLinearGradient(0, h - 160, 0, h);
      bottomGrad.addColorStop(0, "rgba(0,0,0,0)");
      bottomGrad.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, h - 160, w, 160);

      // --- Top gradient ---
      const topGrad = ctx.createLinearGradient(0, 0, 0, 80);
      topGrad.addColorStop(0, "rgba(0,0,0,0.5)");
      topGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, w, 80);

      // --- Alignment indicator ---
      if (currentHeading >= 0 && diff >= 0) {
        // Draw circular compass arc at bottom
        const arcCX = w / 2;
        const arcCY = h - 30;
        const arcR = 70;

        // Background arc
        ctx.beginPath();
        ctx.arc(arcCX, arcCY, arcR, -Math.PI * 0.75, Math.PI * 0.75);
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.lineWidth = 4;
        ctx.stroke();

        // Direction arc - green when close
        const arcStart = -Math.PI * 0.75;
        const arcEnd = Math.PI * 0.75;
        const totalArc = arcEnd - arcStart;
        const normDiff = Math.min(diff, 60) / 60;
        const markerAngle = arcStart + totalArc * (1 - normDiff);

        ctx.beginPath();
        ctx.arc(arcCX, arcCY, arcR, arcStart, markerAngle);
        ctx.strokeStyle = diff < 10 ? "#22c55e" : diff < 20 ? "#eab308" : "#ef4444";
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.stroke();

        // Arrow pointer on arc
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

        // Large central guidance arrow
        const cx = w / 2;
        const cy = h / 2 - 20;

        if (!isAligned) {
          // Calculate which way to turn
          let turnAngle = currentBearing - currentHeading;
          if (turnAngle > 180) turnAngle -= 360;
          if (turnAngle < -180) turnAngle += 360;

          // Arrow pointing toward Qibla
          ctx.save();
          ctx.translate(cx, cy);

          // Arrow shadow
          ctx.shadowColor = "rgba(0,0,0,0.4)";
          ctx.shadowBlur = 8;

          const arrowColor = diff < 20 ? (diff < 10 ? "#22c55e" : "#eab308") : "#ef4444";

          // Arrow pointing in the direction to turn
          const turnDir = turnAngle > 0 ? 1 : -1;
          const intensity = Math.min(Math.abs(turnAngle) / 30, 1);

          // Draw a big curved arrow showing direction
          ctx.beginPath();
          ctx.arc(0, 0, 50, -Math.PI / 4 * turnDir * intensity + Math.PI / 2, Math.PI / 4 * turnDir * intensity + Math.PI / 2, turnDir < 0);
          ctx.strokeStyle = arrowColor;
          ctx.lineWidth = 8;
          ctx.lineCap = "round";
          ctx.stroke();

          // Arrow head
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

          // Center dot
          ctx.shadowBlur = 0;
          ctx.beginPath();
          ctx.arc(0, 0, 10, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.3)";
          ctx.fill();
          ctx.strokeStyle = "rgba(255,255,255,0.5)";
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.restore();

          // Turn instruction text
          ctx.fillStyle = "rgba(255,255,255,0.9)";
          ctx.font = "bold 18px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const turnText = Math.abs(turnAngle) < 5
            ? locale === "ar" ? "اتجه للأمام" : locale === "tr" ? "Düz ilerleyin" : locale === "id" ? "Lurus ke depan" : "Go straight"
            : turnAngle > 0
              ? (locale === "ar" ? "لف يمينًا" : locale === "tr" ? "Sağa dönün" : locale === "id" ? "Belok kanan" : "Turn right")
              : (locale === "ar" ? "لف يسارًا" : locale === "tr" ? "Sola dönün" : locale === "id" ? "Belok kiri" : "Turn left");
          ctx.fillText(turnText, cx, cy + 90);

          // Degrees remaining
          ctx.fillStyle = "rgba(255,255,255,0.6)";
          ctx.font = "14px sans-serif";
          ctx.fillText(
            locale === "ar"
              ? `باقي ${Math.round(diff)}°`
              : locale === "tr"
                ? `${Math.round(diff)}° kaldı`
                : locale === "id"
                  ? `${Math.round(diff)}° tersisa`
                  : `${Math.round(diff)}° remaining`,
            cx,
            cy + 115
          );
        } else {
          // === ALIGNED — Show Kaaba glow on canvas ===
          ctx.shadowBlur = 0;

          // Glow effect
          const glowR = 80 + 20 * Math.sin(time / 300);
          const glowGrad = ctx.createRadialGradient(cx, cy - 20, 0, cx, cy - 20, glowR);
          glowGrad.addColorStop(0, "rgba(255,215,0,0.6)");
          glowGrad.addColorStop(0.5, "rgba(255,215,0,0.2)");
          glowGrad.addColorStop(1, "rgba(255,215,0,0)");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(cx, cy - 20, glowR, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      }

      // --- HUD overlay text ---
      // Bearing info (top)
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = locale === "ar" ? "right" : "left";
      ctx.textBaseline = "top";
      const pad = 16;
      const topText =
        locale === "ar"
          ? `اتجاه القبلة: ${currentBearing.toFixed(1)}°`
          : locale === "tr"
            ? `Kıble yönü: ${currentBearing.toFixed(1)}°`
            : locale === "id"
              ? `Arah kiblat: ${currentBearing.toFixed(1)}°`
              : `Qibla: ${currentBearing.toFixed(1)}°`;
      ctx.fillText(topText, locale === "ar" ? w - pad : pad, pad);

      if (currentHeading >= 0) {
        ctx.font = "13px sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fillText(
          `${locale === "ar" ? "جهازك:" : locale === "tr" ? "Cihaz:" : locale === "id" ? "Perangkat:" : "Device:"} ${Math.round(currentHeading)}°`,
          locale === "ar" ? w - pad : pad,
          pad + 22
        );
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [locale]); // STABLE — no aligned, no bearing, no getAngleDiff

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* Camera */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Canvas overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Kaaba image overlay when aligned */}
      {aligned && kaabaImgRef.current && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative animate-bounce-gentle">
            <img
              src={kaabaImgRef.current.src}
              alt="Kaaba"
              className="w-48 h-56 md:w-60 md:h-72 object-contain drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]"
            />
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-center">
              <p className="text-3xl font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] animate-pulse">
                {locale === "ar"
                  ? "الله أكبر"
                  : locale === "tr"
                    ? "Allahu Ekber"
                    : locale === "id"
                      ? "Allahu Akbar"
                      : "Allahu Akbar"}
              </p>
              <p className="text-sm text-yellow-200 mt-1 opacity-80">
                {locale === "ar"
                  ? "القبلة أمامك"
                  : locale === "tr"
                    ? "Kıble karşınızda"
                    : locale === "id"
                      ? "Kiblat di depan Anda"
                      : "Qibla is ahead"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Camera error */}
      {camError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-center p-6">
            <p className="text-red-400 font-semibold mb-4 text-lg">⚠️ {camError}</p>
            <button
              onClick={onBack}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-colors"
            >
              {locale === "ar" ? "رجوع" : "Back"}
            </button>
          </div>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={() => {
          headingRef.current = -1;
          onBack();
        }}
        className="absolute top-4 z-10 bg-black/30 hover:bg-black/50 text-white px-4 py-2 rounded-xl transition-colors text-sm"
        style={locale === "ar" ? { left: 16 } : { right: 16 }}
      >
        ✕ {locale === "ar" ? "رجوع" : "Back"}
      </button>

      {/* Camera not started yet */}
      {!cameraReady && !camError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white font-semibold">
              {locale === "ar"
                ? "جاري تشغيل الكاميرا..."
                : locale === "tr"
                  ? "Kamera başlatılıyor..."
                  : locale === "id"
                    ? "Memulai kamera..."
                    : "Starting camera..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Setup Screen ───
type Mode = "idle" | "city" | "manual" | "locating" | "error";

export default function Client({ locale = "ar" }: { locale?: "ar" | "en" | "tr" | "id" }) {
  const [mode, setMode] = useState<Mode>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);
  const [bearing, setBearing] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [showAR, setShowAR] = useState(false);

  const L = (ar: string, en: string, tr: string, id: string) => {
    if (locale === "ar") return ar;
    if (locale === "tr") return tr;
    if (locale === "id") return id;
    return en;
  };

  const showResult = useCallback((lat: number, lng: number) => {
    const b = calcQiblaBearing(lat, lng);
    setUserLat(lat);
    setUserLng(lng);
    setBearing(b);
    setShowAR(true);
  }, []);

  const handleGPS = () => {
    if (!navigator.geolocation) {
      setErrorMsg(L("متصفحك لا يدعم تحديد الموقع الجغرافي", "Your browser doesn't support geolocation", "Tarayıcınız konum belirlemeyi desteklemiyor", "Browser Anda tidak mendukung geolokasi"));
      setMode("error");
      return;
    }
    setMode("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => showResult(pos.coords.latitude, pos.coords.longitude),
      () => {
        setErrorMsg(L("تعذر تحديد موقعك. تأكد أن GPS مفعل.", "Could not determine your location. Make sure GPS is enabled.", "Konumunuz belirlenemedi. GPS'in açık olduğundan emin olun.", "Lokasi tidak dapat ditentukan. Pastikan GPS aktif."));
        setMode("error");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleCitySelect = () => {
    if (!selectedCity) return;
    const city = CITIES[selectedCity];
    if (city) showResult(city.lat, city.lng);
  };

  const handleManual = () => {
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      setErrorMsg(L("إحداثيات غير صحيحة", "Invalid coordinates", "Geçersiz koordinatlar", "Koordinat tidak valid"));
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

  if (showAR) {
    return (
      <ARCamera
        lat={userLat}
        lng={userLng}
        bearing={bearing}
        onBack={() => setShowAR(false)}
        locale={locale}
      />
    );
  }

  const containerClass = locale === "ar" ? "text-right" : "text-left";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div className="max-w-[760px] mx-auto" dir={dir}>
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">
          {locale === "ar" ? "📸 اتجاه القبلة بالكاميرا" : locale === "tr" ? "📸 Kamera ile Kıble Yönü" : locale === "id" ? "📸 Arah Kiblat dengan Kamera" : "📸 Qibla Camera Finder"}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {L("وجّه كاميرتك نحو القبلة وشاهد الكعبة!", "Point your camera toward Qibla and see the Kaaba!", "Kameranızı Kıble'ye doğrultun ve Kabe'yi görün!", "Arahkan kamera ke kiblat dan lihat Ka'bah!")}
        </p>

        {mode === "idle" && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              {L("اختر طريقة تحديد موقعك:", "Choose how to set your location:", "Konumunuzu nasıl ayarlayacaksınız:", "Pilih cara mengatur lokasi Anda:")}
            </p>

            <button onClick={handleGPS} className="w-full flex items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-right">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-bold">{L("GPS تلقائي", "Auto GPS", "Otomatik GPS", "GPS Otomatis")}</p>
                <p className="text-xs opacity-80">{L("الأدق — يستخدم موقعك الحقيقي", "Most accurate — uses your real location", "En doğru — gerçek konumunuzu kullanır", "Paling akurat — gunakan lokasi nyata")}</p>
              </div>
            </button>

            <button onClick={() => setMode("city")} className="w-full flex items-center gap-4 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-right">
              <span className="text-2xl">🏙️</span>
              <div>
                <p className="font-bold">{L("اختيار مدينة", "Select city", "Şehir seç", "Pilih kota")}</p>
                <p className="text-xs opacity-80">{L("من قائمة 30+ مدينة", "From 30+ cities list", "30+'dan fazla şehir", "30+ kota tersedia")}</p>
              </div>
            </button>

            <button onClick={() => setMode("manual")} className="w-full flex items-center gap-4 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-4 rounded-xl transition-colors text-right">
              <span className="text-2xl">📐</span>
              <div>
                <p className="font-bold">{L("إدخال الإحداثيات", "Manual coordinates", "Manuel koordinat", "Koordinat manual")}</p>
                <p className="text-xs opacity-80">{L("أدخل خط العرض وخط الطول", "Enter latitude and longitude", "Enlem ve boylam girin", "Masukkan lintang dan bujur")}</p>
              </div>
            </button>
          </div>
        )}

        {mode === "city" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">{L("الدولة:", "Country:", "Ülke:", "Negara:")}</label>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedCity("");
                }}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="">{L("اختر الدولة...", "Select country...", "Ülke seç...", "Pilih negara...")}</option>
                {Object.entries(COUNTRIES).map(([code, c]) => (
                  <option key={code} value={code}>
                    {c.ar}
                  </option>
                ))}
              </select>
            </div>
            {selectedCountry && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{L("المدينة:", "City:", "Şehir:", "Kota:")}</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="">{L("اختر المدينة...", "Select city...", "Şehir seç...", "Pilih kota...")}</option>
                  {COUNTRIES[selectedCountry]?.cities.map((key) => (
                    <option key={key} value={key}>
                      {CITIES[key].ar}
                    </option>
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
                {L("فتح الكاميرا", "Open Camera", "Kamerayı Aç", "Buka Kamera")}
              </button>
              <button onClick={resetAll} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl">
                {L("رجوع", "Back", "Geri", "Kembali")}
              </button>
            </div>
          </div>
        )}

        {mode === "manual" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Latitude:</label>
              <input type="number" step="any" value={manualLat} onChange={(e) => setManualLat(e.target.value)} placeholder="مثال: 30.0444" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Longitude:</label>
              <input type="number" step="any" value={manualLng} onChange={(e) => setManualLng(e.target.value)} placeholder="مثال: 31.2357" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div className="flex gap-3">
              <button onClick={handleManual} disabled={!manualLat || !manualLng} className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-3 rounded-xl transition-colors">
                {L("فتح الكاميرا", "Open Camera", "Kamerayı Aç", "Buka Kamera")}
              </button>
              <button onClick={resetAll} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl">
                {L("رجوع", "Back", "Geri", "Kembali")}
              </button>
            </div>
          </div>
        )}

        {mode === "locating" && (
          <div className="text-center py-10">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-semibold">{L("جاري تحديد موقعك...", "Detecting your location...", "Konumunuz belirleniyor...", "Mendeteksi lokasi...")}</p>
          </div>
        )}

        {mode === "error" && (
          <div className="text-center py-6">
            <p className="text-red-600 font-semibold mb-4">⚠️ {errorMsg}</p>
            <button onClick={resetAll} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              🔄 {L("حاول مرة أخرى", "Try Again", "Tekrar Dene", "Coba Lagi")}
            </button>
          </div>
        )}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
        <h2 className="font-bold text-amber-900 mb-2">{L("كيف تعمل؟", "How it works?", "Nasıl çalışır?", "Bagaimana cara kerjanya?")}</h2>
        <ol className="text-sm text-amber-800 space-y-1 list-decimal list-inside">
          <li>{L("اختر موقعك (GPS أو مدينة أو إحداثيات)", "Select your location (GPS, city, or coordinates)", "Konumunuzu seçin (GPS, şehir veya koordinatlar)", "Pilih lokasi (GPS, kota, atau koordinat)")}</li>
          <li>{L("وجه كاميرا الهاتف الخلفية للأمام", "Point your rear camera forward", "Arka kamerayı ileri doğrultun", "Arahkan kamera belakang ke depan")}</li>
          <li>{L("اتبع السهم لتدوير الهاتف نحو القبلة", "Follow the arrow to turn toward Qibla", "Kıble'ye dönmek için oku takip edin", "Ikuti panah untuk berputar ke kiblat")}</li>
          <li>{L("عند الاتجاه الصحيح — تظهر الكعبة!", "When aligned — the Kaaba appears!", "Hizalandığında — Kabe görünür!", "Saat sejajar — Ka'bah muncul!")}</li>
        </ol>
      </div>
    </div>
  );
}
