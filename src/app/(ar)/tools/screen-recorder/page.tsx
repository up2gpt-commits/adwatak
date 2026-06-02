"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "ما هي أداة مسجل الشاشة؟", answer: "أداة مجانية 100% تتيح لك تسجيل شاشة جهازك مباشرة من المتصفح بدون أي برامج. تستخدم تقنية getDisplayMedia API لتسجيل عالي الجودة." },
  { question: "هل الأداة مجانية؟", answer: "نعم، مجانية بالكامل بدون تسجيل، بدون حدود، بدون إعلانات، وبدون أي تكلفة." },
  { question: "هل أحتاج لتثبيت برنامج؟", answer: "لا! الأداة تعمل بالكامل في المتصفح. كل ما تحتاجه متصفح حديث يدعم تسجيل الشاشة." },
  { question: "هل بياناتي آمنة؟", answer: "خصوصيتك مضمونة 100%. التسجيل يتم محلياً في جهازك ولا يتم رفع أي بيانات لأي سيرفر." },
  { question: "ما هي صيغة الفيديو المسجل؟", answer: "يتم التسجيل بصيغة WebM مع ترميز VP8/VP9 وهي صيغة عالية الجودة ومتوافقة مع معظم مشغلات الفيديو." },
  { question: "هل يمكنني تسجيل الصوت مع الشاشة؟", answer: "نعم! يمكنك اختيار تسجيل صوت الميكروفون مع الشاشة أو تسجيل الشاشة فقط." },
  { question: "هل تعمل على الجوال؟", answer: "تعمل على أجهزة الكمبيوتر (Windows, Mac, Linux). دعم الجوال يعتمد على المتصفح — Chrome و Firefox يدعمون تسجيل الشاشة." },
  { question: "هل هناك حد زمني للتسجيل؟", answer: "لا يوجد حد زمني محدد. مدة التسجيل تعتمد على مساحة جهازك وذاكرة المتصفح." },
  { question: "هل يمكنني اختيار جزء معين من الشاشة؟", answer: "نعم! يمكنك اختيار تسجيل الشاشة الكاملة، نافذة معينة، أو تبويب محدد من المتصفح." },
  { question: "المتصفح لا يطلب إذن التسجيل — ماذا أفعل؟", answer: "تأكد أنك تستخدم متصفحاً حديثاً (Chrome, Edge, Firefox). بعض المتصفحات تتطلب HTTPS لتفعيل هذه الميزة." },
  { question: "الجهاز بطيء أثناء التسجيل — كيف أحسن الأداء؟", answer: "أغلق التطبيقات غير الضرورية، أغلق التبويبات الزائدة، وتأكد أن جهازك لديه ذاكرة كافية." },
  { question: "هل يمكنني استخدام التسجيلات تجارياً؟", answer: "نعم، المحتوى المسجل ملكك بالكامل ويمكنك استخدامه للاستخدام الشخصي والتجاري." },
];

const relatedTools = [
  { title: "تسجيل الفيديو", icon: "🎬", href: "/tools/video-recorder" },
  { title: "تحويل الفيديو", icon: "🔄", href: "/tools/video-converter" },
  { title: "ضغط الفيديو", icon: "🗜️", href: "/tools/video-compressor" },
];

const seoContent = [
  "أداة مسجل الشاشة المجانية — سجل شاشة جهازك مباشرة من المتصفح بدون برامج.",
  "تسجيل عالي الجودة بصيغة WebM. سجل الشاشة كاملة أو نافذة معينة أو تبويب محدد.",
  "خيار تسجيل صوت الميكروفون مع الشاشة. تحكم كامل في جودة التسجيل.",
  "خصوصيتك مضمونة — كل المعالجة محلياً في جهازك بدون رفع أي بيانات.",
  "متوافق مع Chrome و Edge و Firefox. يعمل على Windows و Mac و Linux.",
];

type RecordingState = "idle" | "requesting" | "recording" | "stopping" | "preview" | "error";

export default function ToolPage() {
  const [state, setState] = useState<RecordingState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [recordedUrl, setRecordedUrl] = useState("");
  const [includeAudio, setIncludeAudio] = useState(true);
  const [includeMic, setIncludeMic] = useState(false);
  const [hasAudioTrack, setHasAudioTrack] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    clearTimer();
    setState("stopping");
  }, [clearTimer]);

  useEffect(() => {
    if (state === "preview" && recordedUrl) {
      if (videoRef.current) {
        videoRef.current.src = recordedUrl;
      }
    }
  }, [state, recordedUrl]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && state === "recording") {
        stopRecording();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      clearTimer();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [state, stopRecording, clearTimer]);

  const startRecording = async () => {
    setErrorMsg("");
    chunksRef.current = [];
    setState("requesting");

    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: "monitor",
        } as MediaTrackConstraints,
        audio: includeAudio,
      });

      setHasAudioTrack(displayStream.getAudioTracks().length > 0);

      let combinedStream: MediaStream = displayStream;

      if (includeMic) {
        try {
          const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          combinedStream = new MediaStream([
            ...displayStream.getVideoTracks(),
            ...displayStream.getAudioTracks(),
            ...micStream.getAudioTracks(),
          ]);
          void displayStream;
        } catch {
          //-mic denied, continue with display stream only
          setIncludeMic(false);
        }
      }

      streamRef.current = combinedStream;

      combinedStream.getVideoTracks()[0]?.addEventListener("ended", () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
          stopRecording();
        }
      });

      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : MediaRecorder.isTypeSupported("video/webm;codecs=vp8")
        ? "video/webm;codecs=vp8"
        : "video/webm";

      const recorder = new MediaRecorder(combinedStream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
        setState("preview");
        setElapsed(0);
      };

      recorder.start(1000);
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);

      setState("recording");
    } catch (err: any) {
      console.error(err);
      if (err?.name === "NotAllowedError") {
        setErrorMsg("تم رفض إذن تسجيل الشاشة. اضغط 'السماح' عندما يطلب المتصفح الإذن.");
      } else {
        setErrorMsg("حدث خطأ أثناء بدء التسجيل. تأكد أن متصفحك يدعم تسجيل الشاشة.");
      }
      setState("error");
    }
  };

  const downloadRecording = () => {
    if (!recordedUrl) return;
    const a = document.createElement("a");
    a.href = recordedUrl;
    const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    a.download = `screen-recording-${ts}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetRecording = () => {
    if (recordedUrl) URL.revokeObjectURL(recordedUrl);
    setRecordedUrl("");
    setElapsed(0);
    setState("idle");
    setErrorMsg("");
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("مسجل الشاشة", "تسجيل شاشة جهازك مباشرة من المتصفح — مجاني 100% بدون برامج", "https://adwatak.cloud/tools/screen-recorder", "ar", "أدوات")} />
      <StructuredData data={faqSchema(faqs)} />
      <Breadcrumb lang="ar" category="أدوات" categorySlug="tools" toolName="مسجل الشاشة" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📹 مسجل الشاشة</h1>
        <p className="text-sm text-gray-500 mb-6">سجل شاشة جهازك مباشرة من المتصفح — مجاني 100% بدون أي برامج</p>

        {/* Options */}
        {state === "idle" && (
          <div className="mb-6 space-y-3">
            <p className="text-sm font-semibold text-gray-700">⚙️ خيارات التسجيل:</p>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeAudio}
                onChange={(e) => setIncludeAudio(e.target.checked)}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-sm text-gray-700">تسجيل صوت النظام (System Audio)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeMic}
                onChange={(e) => setIncludeMic(e.target.checked)}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-sm text-gray-700">تسجيل الميكروفون (Microphone)</span>
            </label>
          </div>
        )}

        {/* Idle state */}
        {state === "idle" && (
          <div className="text-center">
            <button
              onClick={startRecording}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
            >
              <span className="w-4 h-4 bg-white rounded-full animate-pulse" />
              بدء التسجيل
            </button>
            <p className="text-xs text-gray-400 mt-3">اضغط الزر واختر الشاشة أو النافذة التي تريد تسجيلها</p>
          </div>
        )}

        {/* Requesting */}
        {state === "requesting" && (
          <div className="text-center py-8">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600">جاري طلب إذن تسجيل الشاشة...</p>
            <p className="text-xs text-gray-400 mt-2">اختر الشاشة أو النافذة واضغط "مشاركة"</p>
          </div>
        )}

        {/* Recording */}
        {state === "recording" && (
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-red-50 border-2 border-red-300 rounded-xl px-6 py-4 mb-4">
              <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
              <span className="text-red-700 font-bold">جاري التسجيل</span>
              <span className="font-mono text-red-700 font-bold text-lg">{formatTime(elapsed)}</span>
            </div>
            <div className="space-y-2">
              {includeMic && (
                <p className="text-xs text-green-600">🎤 الميكروفون مفعل</p>
              )}
              {hasAudioTrack && (
                <p className="text-xs text-green-600">🔊 صوت النظام مفعل</p>
              )}
              <p className="text-gray-600 text-sm">اضغط ESC أو الزر أدناه لإيقاف التسجيل</p>
              <button
                onClick={stopRecording}
                className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                <span className="w-3 h-3 bg-white rounded-sm" />
                إيقاف التسجيل
              </button>
            </div>
          </div>
        )}

        {/* Stopping */}
        {state === "stopping" && (
          <div className="text-center py-8">
            <div className="inline-block w-12 h-12 border-4 border-gray-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600">جاري معالجة التسجيل...</p>
          </div>
        )}

        {/* Preview */}
        {state === "preview" && (
          <div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
              {recordedUrl ? (
                <video
                  ref={videoRef}
                  src={recordedUrl}
                  controls
                  className="w-full rounded-lg shadow-md max-h-[450px]"
                />
              ) : (
                <p className="text-gray-500 text-center py-12">جاري تحميل المعاينة...</p>
              )}
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={downloadRecording}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow"
              >
                ⬇️ تحميل الفيديو
              </button>
              <button
                onClick={resetRecording}
                className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors"
              >
                🔄 تسجيل جديد
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">صيغة الملف: WebM — يمكنك تشغيله في أي مشغل فيديو</p>
          </div>
        )}

        {/* Error */}
        {state === "error" && (
          <div className="text-center py-6">
            <p className="text-red-600 font-semibold mb-2">⚠️ {errorMsg}</p>
            <button
              onClick={resetRecording}
              className="mt-3 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              🔄 حاول مرة أخرى
            </button>
          </div>
        )}
      </div>

      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />
    </div>
  );
}
