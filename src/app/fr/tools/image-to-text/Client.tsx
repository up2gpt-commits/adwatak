"use client";
import { useState, useRef, useCallback } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema,howToSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "Qu'est-ce que l'OCR Image vers Texte ?", answer: "L'OCR Image vers Texte extrait du texte de n'importe quelle image — livres, documents, panneaux, captures d'écran. Utilise une IA avancée (Gemma 4 Vision) pour une extraction de texte très précise prenant en charge l'arabe et l'anglais." },
  { question: "Est-ce gratuit ?", answer: "Oui, 100% gratuit. Pas d'inscription, pas de limites d'utilisation, pas de publicités." },
  { question: "Téléchargez-vous mes images sur un serveur ?", answer: "Oui, les images sont envoyées à notre serveur pour le traitement IA et supprimées immédiatement. Nous ne stockons aucune image." },
  { question: "Quelle est la précision de l'OCR IA ?", answer: "Very high! We use Google DeepMind's Gemma 4 Vision AI — much more accurate than traditional Tesseract OCR engines. Supports Arabic, English, and mixed languages." },
  { question: "Quels formats d'image sont pris en charge ?", answer: "Tous les formats courants : JPG, PNG, WEBP, BMP, GIF." },
  { question: "Fonctionne-t-il sur mobile ?", answer: "Oui, entièrement responsive sur tous les appareils." },
  { question: "Prend-il en charge l'arabe et l'anglais ensemble ?", answer: "Oui, il gère parfaitement l'arabe, l'anglais et le texte mixte dans la même image." },
  { question: "What if results aren't accurate?", answer: "Utilisez une image de meilleure qualité avec un texte plus clair. L'IA fonctionne mieux avec des images bien éclairées et haute résolution." },
  { question: "Puis-je l'utiliser commercialement ?", answer: "Oui, les résultats sont gratuits pour un usage personnel et commercial." },
  { question: "Est-il mis à jour ?", answer: "Yes, powered by Google DeepMind's latest Gemma 4 Vision model." },
];

const relatedTools = [
  { title: "Image en PDF", icon: "🖼️", href: "/fr/tools/image-to-pdf" },
  { title: "Suppresseur d'Arrière-plan", icon: "🖼️", href: "/fr/tools/background-remover" },
  { title: "Compresseur d'Images", icon: "📦", href: "/fr/tools/image-compressor" },
  { title: "Lecteur de QR Code", icon: "📷", href: "/fr/tools/qr-reader" },
];

const seoContent = [
  "OCR Image vers Texte gratuit alimenté par l'IA — extraire du texte de n'importe quelle image avec une haute précision en utilisant Google DeepMind Gemma 4 Vision. Prend en charge l'arabe et l'anglais.",
  "Parfait pour les étudiants, les avocats, les comptables et les journalistes. Plus précis que l'OCR Tesseract traditionnel.",
  "Powered by Google DeepMind's Gemma 4 Vision AI model for state-of-the-art text extraction.",
  "Vos images sont traitées en toute sécurité et supprimées immédiatement — aucun stockage.",
];

export default function Client() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [progressText, setProgressText] = useState("");
  const [lang, setLang] = useState("ara+eng");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const resRef = useRef<HTMLDivElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    setText(""); setError(null); setProgressText("");
    const r = new FileReader();
    r.onload = (ev) => setImage(ev.target?.result as string);
    r.readAsDataURL(f);
  };

  const compressImage = (dataUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        const MAX = 2000;
        if (width > MAX || height > MAX) {
          const ratio = Math.min(MAX / width, MAX / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) { reject(new Error("Canvas not supported")); return; }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = dataUrl;
    });
  };

  const extract = useCallback(async () => {
    if (!image) return;
    setLoading(true); setProgressText("Preparing image..."); setText(""); setError(null);

    try {
      let processedImage = image;
      if (image.length > 3_000_000) {
        setProgressText("Compressing image...");
        processedImage = await compressImage(image);
      }

      setProgressText("Extracting text with AI...");
      const res = await fetch("/api/ocr-vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: processedImage, lang }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || `Error ${res.status}`);
      }

      const data = await res.json();
      if (!data.text || data.text.trim().length === 0) {
        setText("(No text found — try a clearer image)");
      } else {
        setText(data.text);
      }

      setProgressText("");
      setTimeout(() => resRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    } catch (err: any) {
      console.error("OCR error:", err);
      setError(err?.message || "An error occurred");
    } finally {
      setLoading(false); setProgressText("");
    }
  }, [image, lang]);

  const copy = async () => {
    if (!text) return;
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    }
  };

  const download = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `OCR-${fileName.replace(/\.[^.]+$/, "") || "text"}.txt`;
    a.click(); URL.revokeObjectURL(url);
  };

  const reset = () => {
    setImage(null); setFileName(""); setText(""); setError(null);
    setCopied(false); setProgressText("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema("Image to Text OCR", "Extraire du texte à partir d'images en utilisant l'OCR IA — Gratuit, rapide, précis", "https://adwatak.cloud/fr/tools/image-to-text", "fr", "Tools")} />
      <StructuredData data={faqSchema(faqs)} />
      {/* GEO: HowTo — step by step for AI engines */}
      <StructuredData data={howToSchema("Comment utiliser cet outil", "Outil gratuit en ligne. Fonctionne dans votre navigateur. Aucune inscription requise.", [{name:"Ouvrir l'outil",text:"Accéder à la page de cet outil sur Adawatak"},{name:"Entrez vos données",text:"Remplissez les champs requis"},{name:"Obtenez les résultats",text:"Cliquez sur le bouton Calculer ou Générer"},{name:"Utilisez ou partagez",text:"Copiez, téléchargez ou partagez les résultats"}],"moins d'une minute","fr")} />
      {/* GEO: Speakable — AI/voice engines */}
      <StructuredData data={speakableSchema(["h1","h2","main"])} />
      <Breadcrumb lang="fr" category="Autres" categorySlug="tools" toolName="Image vers texte OCR" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">👁️ Image to Text OCR</h1>
        <p className="text-sm text-gray-500 mb-6">Extrayez le texte des images par OCR</p>

        {/* AI Badge */}
        <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <span className="text-sm text-purple-700">Powered by <strong>Gemma 4 Vision AI</strong> from Google DeepMind — higher accuracy, supports Arabic & English</span>
        </div>

        {/* Upload */}
        <div
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            image ? "border-green-300 bg-green-50" : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
          }`}
        >
          {image ? (
            <div className="flex flex-col items-center gap-3">
              <img src={image} alt="Preview" className="max-h-48 rounded-lg shadow-sm object-contain" />
              <span className="text-sm text-gray-600">{fileName}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl">📸</span>
              <p className="text-gray-600 font-medium">Click to choose an image</p>
              <p className="text-xs text-gray-400">JPG, PNG, WEBP — AI OCR supports Arabic & English</p>
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </div>

        {/* Controls */}
        {image && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px]">
              <label className="text-xs text-gray-500 block mb-1">Language</label>
              <select value={lang} onChange={(e) => setLang(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm bg-white">
                <option value="ara+eng">Arabic + English</option>
                <option value="ara">Arabic</option>
                <option value="eng">English</option>
              </select>
            </div>
            <button onClick={extract} disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Processing..." : "🤖 Extract Text with AI"}
            </button>
            <button onClick={reset} disabled={loading}
              className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50">
              🔄 Reset
            </button>
          </div>
        )}

        {/* Progress */}
        {loading && progressText && (
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
            <div className="flex items-center gap-2 text-sm text-purple-700">
              <span className="animate-spin">⏳</span>
              <span>{progressText}</span>
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200">
            <p className="text-sm text-red-700">⚠️ {error}</p>
            <button onClick={extract}
              className="mt-2 text-sm px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              🔄 Retry
            </button>
          </div>
        )}

        {/* Result */}
        {text && !loading && (
          <div ref={resRef} className="mt-6 bg-gray-50 rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900">📝 Extracted Text</h2>
              <div className="flex gap-2">
                <button onClick={copy}
                  className="text-sm px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
                <button onClick={download}
                  className="text-sm px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                  ⬇️ Download
                </button>
              </div>
            </div>
            <textarea readOnly value={text}
              className="w-full h-48 p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 resize-y font-sans"
              dir="auto" />
            {!text.startsWith("(") && !error && (
              <p className="text-xs text-gray-400 mt-2">
                ✨ {text.split(/\s+/).filter((w: string) => w.length > 0).length} words
              </p>
            )}
          </div>
        )}
      </div>
      <SEOContent content={seoContent} lang="fr" />
      <FAQSection faqs={faqs} lang="fr" />
      <RelatedTools tools={relatedTools} lang="fr" />
      <ShareButtons lang="fr" />
    </div>
  );
}
