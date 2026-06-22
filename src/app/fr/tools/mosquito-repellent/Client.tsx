"use client";
import { useState, useRef, useEffect } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "Comment fonctionne le son répulsif anti-moustique?", answer: "La fréquence de 15 000 Hz imite le battement d'ailes des moustiques mâles et des libellules. Seules les femelles fécondées piquent (elles ont besoin de sang pour leurs œufs) et fuient instinctivement les prédateurs et les mâles — les faisant quitter la zone." },
  { question: "Est-ce sans danger pour les humains?", answer: "Pour la plupart des adultes, 15 000 Hz est à peine audible — c'est à la limite de la portée auditive humaine. Cependant, gardez le volume en dessous de 40% et placez l'appareil à 2-3 mètres. Une exposition prolongée à volume élevé peut causer des maux de tête ou des acouphènes." },
  { question: "Est-ce sans danger pour les animaux?", answer: "NON — les chats et les chiens ont une ouïe extrêmement sensible et entendent cette fréquence beaucoup plus fort que les humains. N'utilisez PAS cet appareil dans une pièce avec des animaux. Peut causer de la détresse, de la panique et des dommages auditifs." },
  { question: "Combien de temps dois-je le faire jouer?", answer: "15 à 30 minutes suffisent pour éloigner les moustiques d'une pièce. Faites-le jouer avant le sommeil, puis éteignez-le. Le faire jouer toute la nuit est inutile et peut endommager le haut-parleur du téléphone." },
  { question: "Cela peut-il endommager le haut-parleur?", answer: "Oui, jouer une onde sinusoïdale pure à volume élevé pendant des heures peut surchauffer la bobine du haut-parleur. Gardez le volume à 30-40% maximum et limitez la lecture à 30 minutes par session." },
  { question: "Est-ce efficace contre toutes les espèces?", answer: "Plus efficace contre les moustiques Aedes et Culex (moustiques domestiques courants). L'efficacité varie selon l'espèce et l'environnement. À utiliser avec des moustiquaires/répulsifs pour de meilleurs résultats." },
  { question: "Est-ce nocif pour l'environnement?", answer: "Non — purement acoustique. Pas de produits chimiques, pas de fumée, pas de résidus. Un contrôle des moustiques écologique." },
];

const relatedTools = [
  { title: "Direction de la Qibla", icon: "🕋", href: "/fr/tools/qibla-direction" },
  { title: "Compteur Tasbih", icon: "📿", href: "/fr/tools/tasbeeh-counter" },
  { title: "Heures de Prière", icon: "🕌", href: "/fr/tools/prayer-times" },
];

const seoContent = [
  "Outil répulsif anti-moustique sonore en ligne gratuit — utilise des ondes sonores à haute fréquence de 15 000 Hz pour repousser naturellement les moustiques. Sans produits chimiques, sans installation d'application. Fonctionne directement dans votre navigateur.",
  "La fréquence répulsive anti-moustique (15 kHz) utilise la technologie des ondes sinusoïdales pures pour créer un dissuasif ultrasonique. Ce son aigu est conçu pour repousser les moustiques en imitant les prédateurs naturels.",
  "Utilisation : Ouvrez l'outil, appuyez sur lecture, réglez le volume à 30-40%, placez l'appareil à 2-3 mètres et laissez-le fonctionner 15 à 30 minutes. Le son se répète automatiquement jusqu'à ce que vous l'arrêtiez.",
  "Sécurité : Gardez le volume bas, protégez vos animaux (ne pas utiliser dans une pièce avec des chats ou des chiens) et ne faites pas jouer plus de 30 minutes pour protéger le haut-parleur de votre téléphone.",
  "Ce répulsif anti-moustique électronique est une alternative sans produits chimiques aux sprays et spirales. Idéal pour les chambres, bureaux, tentes de camping et espaces extérieurs.",
];

export default function Client() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/mosquito-repellent.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      audioRef.current.play();
      setElapsed(0);
      intervalRef.current = setInterval(() => setElapsed(p => p + 1), 1000);
    }
    setPlaying(!playing);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const schemaName = "Répulsif Moustique Sonore";
  const schemaDesc = "Répulsif anti-moustique gratuit par fréquence sonore 15 000 Hz — sans produits chimiques, dans le navigateur";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/fr/tools/mosquito-repellent";
  const breadcrumbItems = [
    { name: "Accueil", url: "https://adwatak.cloud/fr" },
    { name: "Autres Outils", url: "https://adwatak.cloud/fr/category/daily" },
    { name: "Répulsif Moustique Sonore", url: "https://adwatak.cloud/fr/tools/mosquito-repellent" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'fr', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb lang="fr" category="Autres Outils" categorySlug="daily" toolName="Répulsif Moustique Sonore" />

      {/* Main Player Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold mb-1">🦟 Répulsif Moustique Sonore</h1>
          <p className="text-sm text-gray-500 mb-6">Haute fréquence 15 000 Hz anti-moustique — lecture en boucle automatique</p>
        </div>

        {/* Player Controls */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 mb-6 border border-indigo-100">
          <div className="flex flex-col items-center gap-6">
            {/* Waveform animation */}
            <div className="flex items-end gap-1 h-16">
              {[1,2,3,4,5,6,7,8,7,6,5,4,3,2,1].map((h, i) => (
                <div
                  key={i}
                  className={`w-2 bg-indigo-400 rounded-full transition-all duration-300 ${playing ? "animate-pulse" : "opacity-30"}`}
                  style={{
                    height: `${h * 8}px`,
                    animationDelay: playing ? `${i * 0.08}s` : "0s",
                    animationDuration: "0.8s",
                  }}
                />
              ))}
            </div>

            {/* Timer */}
            <div className="text-3xl font-mono font-bold text-indigo-700">
              {playing ? formatTime(elapsed) : "00:00"}
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl border-none cursor-pointer shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
                playing ? "bg-red-500 hover:bg-red-600" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {playing ? "■" : "▶"}
            </button>

            {/* Volume */}
            <div className="w-full max-w-xs flex items-center gap-3 text-sm text-gray-500">
              <span>🔈</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <span>🔊</span>
              <span className="text-xs font-mono w-8 text-right">{Math.round(volume * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Safety Warnings */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
          <h2 className="font-bold text-amber-800 mb-3 text-sm flex items-center gap-2">
            ⚠️ Avertissements de Sécurité Importants
          </h2>
          <ul className="text-sm text-amber-700 space-y-2 list-disc list-inside marker:text-amber-500">
            <li><strong>Gardez le volume à 30-40% maximum</strong> — un volume plus élevé n'éloigne pas plus de moustiques mais peut endommager votre ouïe</li>
            <li><strong>Maintenez une distance de 2-3 mètres</strong> — ne placez pas près de votre tête ou sous l'oreiller</li>
            <li><strong>PAS sécuritaire pour les animaux</strong> — ne pas utiliser dans une pièce avec des chats ou des chiens</li>
            <li><strong>Limitez à 15-30 minutes</strong> — une lecture prolongée peut surchauffer le haut-parleur</li>
            <li><strong>Arrêtez si vous ressentez un inconfort</strong> — maux de tête ou acouphènes sont des signes d'arrêt</li>
          </ul>
        </div>

        {/* Recommended Usage */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <h2 className="font-bold text-blue-800 mb-2 text-sm flex items-center gap-2">
            💡 Utilisation Recommandée
          </h2>
          <p className="text-sm text-blue-700">
            Jouez à <strong>30% de volume</strong>, placez le téléphone dans un <strong>coin éloigné de la pièce</strong> avant le sommeil, faites fonctionner <strong>30 minutes maximum</strong>, puis éteignez et dormez paisiblement.
          </p>
        </div>
      </div>

      <SEOContent content={seoContent} lang="fr" />
      <FAQSection faqs={faqs} lang="fr" />
      <RelatedTools tools={relatedTools} lang="fr" />
      <ShareButtons lang="fr" />
    </div>
  );
}
