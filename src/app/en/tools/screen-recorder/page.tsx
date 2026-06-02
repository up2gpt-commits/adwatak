"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "What is Screen Recorder?", answer: "A 100% free browser-based tool that lets you record your screen without any software installation. Uses the getDisplayMedia API for high-quality recording." },
  { question: "Is it really free?", answer: "Yes, completely free. No registration, no limits, no ads, no fees. Record as much as you want." },
  { question: "Do I need to install anything?", answer: "No! Everything runs in your browser. You just need a modern browser that supports screen recording (Chrome, Edge, Firefox)." },
  { question: "Is my data safe?", answer: "100% private. All recording happens locally on your device. No data is uploaded to any server." },
  { question: "What video format does it use?", answer: "Recordings are saved in WebM format with VP8/VP9 encoding — high quality and compatible with most video players." },
  { question: "Can I record audio with my screen?", answer: "Yes! You can record system audio, microphone input, or both simultaneously alongside your screen." },
  { question: "Does it work on mobile?", answer: "Works on desktop (Windows, Mac, Linux). Mobile support depends on your browser — some Android browsers support screen recording." },
  { question: "Is there a time limit?", answer: "No fixed time limit. Recording duration depends on your device's memory and storage." },
  { question: "Can I select a specific area or window to record?", answer: "Yes! When you click Record, your browser will let you choose: entire screen, a specific window, or a browser tab." },
  { question: "Browser isn't asking for permission — what do I do?", answer: "Make sure you're using an updated browser (Chrome, Edge, Firefox). Some browsers require HTTPS to enable screen recording." },
  { question: "My device is slow during recording — how to improve?", answer: "Close unnecessary applications, close extra browser tabs, and make sure your device has enough RAM." },
  { question: "Can I use recordings commercially?", answer: "Yes, all recorded content is yours. Use it for personal or commercial purposes freely." },
];

const relatedTools = [
  { title: "Video Recorder", icon: "🎬", href: "/en/tools/video-recorder" },
  { title: "Video Converter", icon: "🔄", href: "/en/tools/video-converter" },
  { title: "Video Compressor", icon: "🗜️", href: "/en/tools/video-compressor" },
];

const seoContent = [
  "Free Screen Recorder — Record your screen directly from the browser. No software needed.",
  "High-quality WebM recording. Capture full screen, specific window, or browser tab.",
  "Record system audio, microphone, or both. Full control over recording quality.",
  "Your privacy is guaranteed — all processing is local, no data uploaded to any server.",
  "Compatible with Chrome, Edge, Firefox. Works on Windows, Mac, and Linux.",
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
        } catch {
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
        setErrorMsg("Screen recording permission was denied. Please click 'Allow' when your browser asks for permission.");
      } else {
        setErrorMsg("An error occurred starting the recording. Make sure your browser supports screen recording.");
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
      <StructuredData data={toolSchema("Screen Recorder", "Record your screen directly from your browser — 100% free, no software needed", "https://adwatak.cloud/en/tools/screen-recorder", "en", "Tools")} />
      <StructuredData data={faqSchema(faqs)} />
      <Breadcrumb lang="en" category="Tools" categorySlug="tools" toolName="Screen Recorder" />

      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">📹 Screen Recorder</h1>
        <p className="text-sm text-gray-500 mb-6">Record your screen directly from the browser — 100% free, no software needed</p>

        {/* Options */}
        {state === "idle" && (
          <div className="mb-6 space-y-3">
            <p className="text-sm font-semibold text-gray-700">⚙️ Recording Options:</p>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeAudio}
                onChange={(e) => setIncludeAudio(e.target.checked)}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-sm text-gray-700">Record system audio</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeMic}
                onChange={(e) => setIncludeMic(e.target.checked)}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-sm text-gray-700">Record microphone</span>
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
              Start Recording
            </button>
            <p className="text-xs text-gray-400 mt-3">Click the button and choose which screen or window to record</p>
          </div>
        )}

        {/* Requesting */}
        {state === "requesting" && (
          <div className="text-center py-8">
            <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600">Requesting screen recording permission...</p>
            <p className="text-xs text-gray-400 mt-2">Choose a screen or window and click "Share"</p>
          </div>
        )}

        {/* Recording */}
        {state === "recording" && (
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-red-50 border-2 border-red-300 rounded-xl px-6 py-4 mb-4">
              <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
              <span className="text-red-700 font-bold">Recording</span>
              <span className="font-mono text-red-700 font-bold text-lg">{formatTime(elapsed)}</span>
            </div>
            <div className="space-y-2">
              {includeMic && (
                <p className="text-xs text-green-600">🎤 Microphone active</p>
              )}
              {hasAudioTrack && (
                <p className="text-xs text-green-600">🔊 System audio active</p>
              )}
              <p className="text-gray-600 text-sm">Press ESC or click the button below to stop</p>
              <button
                onClick={stopRecording}
                className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                <span className="w-3 h-3 bg-white rounded-sm" />
                Stop Recording
              </button>
            </div>
          </div>
        )}

        {/* Stopping */}
        {state === "stopping" && (
          <div className="text-center py-8">
            <div className="inline-block w-12 h-12 border-4 border-gray-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600">Processing recording...</p>
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
                <p className="text-gray-500 text-center py-12">Loading preview...</p>
              )}
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={downloadRecording}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow"
              >
                ⬇️ Download Video
              </button>
              <button
                onClick={resetRecording}
                className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors"
              >
                🔄 Record Again
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">File format: WebM — plays in any modern video player</p>
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
              🔄 Try Again
            </button>
          </div>
        )}
      </div>

      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}
