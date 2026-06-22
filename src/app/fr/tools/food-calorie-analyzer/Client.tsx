"use client";
import { useState, useRef } from "react";
import StructuredData, {
  howToSchema,
  speakableSchema,
  toolSchema,
  faqSchema,
  breadcrumbSchema,
} from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

const faqs = [
  {
    question: "Comment calculer les calories à partir d'une photo de repas ?",
    answer:
      "Prenez simplement une photo de votre repas avec l'appareil photo de votre téléphone ou téléchargez une image depuis votre galerie. L'IA analyse l'image pour identifier chaque plat et ses ingrédients, estimer la taille des portions, puis calculer les calories. Les résultats apparaissent en quelques secondes — aucune saisie manuelle nécessaire.",
  },
  {
    question: "Quelle est la précision de l'analyseur de calories alimentaires ?",
    answer:
      "La précision dépend de la qualité et de la clarté de l'image. Des photos claires et bien éclairées atteignent une précision de 80 à 90 %. Les images floues ou les plats mélangés peuvent être moins précis. Utilisez les résultats comme une référence utile, pas comme un substitut à un avis diététique professionnel.",
  },
  {
    question: "Quel type de photos fonctionne le mieux ?",
    answer:
      "Les prises de vue du dessus avec un bon éclairage naturel et des assiettes individuelles séparées fonctionnent le mieux. Évitez les images éloignées, sombres ou encombrées. Meilleurs résultats : un plat par photo, prise à 15-30 cm de distance depuis un angle du dessus.",
  },
  {
    question: "L'analyseur de calories est-il gratuit ?",
    answer:
      "Oui, 100 % gratuit — aucune inscription, abonnement ou limite d'utilisation. Tout ce dont vous avez besoin est l'appareil photo de votre téléphone ou une photo de votre galerie.",
  },
  {
    question: "Que faire si l'IA ne peut pas identifier l'aliment ?",
    answer:
      "Essayez de reprendre la photo sous un meilleur angle avec un meilleur éclairage. Assurez-vous que l'aliment est clairement visible et non couvert. Vous pouvez également photographier les ingrédients séparément pour une analyse plus précise.",
  },
  {
    question: "Ai-je besoin d'internet ?",
    answer:
      "Oui, l'analyse s'exécute via l'IA dans le cloud, vous avez donc besoin d'une connexion internet. L'image est envoyée uniquement pour analyse et n'est pas stockée sur nos serveurs.",
  },
  {
    question: "Mes données sont-elles privées ?",
    answer:
      "Absolument. Les images sont envoyées pour analyse via l'API OpenRouter et ne sont stockées nulle part. Votre vie privée est garantie à 100 %. Nous ne conservons aucune image ni donnée d'analyse.",
  },
  {
    question: "Combien de calories dans un repas moyen ?",
    answer:
      "Petit-déjeuner moyen : 300-500 calories. Déjeuner : 500-800 calories. Dîner : 400-700 calories. Les repas de fast-food peuvent atteindre plus de 1000 calories par repas. Utilisez l'outil pour analyser votre repas réel au lieu de deviner.",
  },
  {
    question: "Puis-je utiliser cela pour perdre du poids ?",
    answer:
      "Oui ! C'est parfait pour suivre les calories. Photographiez vos repas tout au long de la journée pour savoir exactement ce que vous consommez. Le suivi quotidien vous aide à atteindre vos objectifs de perte ou de maintien de poids.",
  },
  {
    question: "Analyse-t-il aussi les boissons ?",
    answer:
      "Oui, il analyse les boissons — jus, café, thé, sodas, et plus encore. Assurez-vous de photographier la tasse clairement avec une référence de taille si possible.",
  },
  {
    question: "Quelle est la différence entre les calories et les macros ?",
    answer:
      "Calories = énergie totale du repas. Macros : protéines (4 cal/g), glucides (4 cal/g), lipides (9 cal/g). L'outil calcule les trois pour vous donner une image nutritionnelle complète.",
  },
  {
    question: "Pourquoi les calories estimées varient-elles entre les photos du même aliment ?",
    answer:
      "La taille des portions varie — une portion de riz peut être 1 tasse ou 2 tasses. L'IA estime la taille des portions visuellement. Des photos plus claires avec des références de taille (comme une fourchette ou le bord de l'assiette) améliorent l'estimation des portions.",
  },
  {
    question: "L'IA peut-elle distinguer les différentes méthodes de cuisson ?",
    answer:
      "Oui, le modèle peut généralement distinguer les aliments grillés, frits, bouillis ou crus (comme les salades). La méthode de cuisson affecte les calories — les aliments frits ont plus de calories par volume en raison de l'absorption d'huile.",
  },
  {
    question: "Fonctionne-t-il avec toutes les cuisines ?",
    answer:
      "Oui, il reconnaît les plats de cuisines du monde entier — italienne, japonaise, moyen-orientale, indienne, mexicaine, américaine, chinoise, et plus encore. Chaque cuisine a ses ingrédients et méthodes de préparation typiques intégrés dans les connaissances du modèle d'IA.",
  },
];

const relatedTools = [
  {
    title: "Calculateur de calories (BMR)",
    icon: "🔥",
    href: "/fr/tools/calorie-calculator",
  },
  {
    title: "Calculateur d'IMC",
    icon: "⚖️",
    href: "/fr/tools/bmi-calculator",
  },
  { title: "Chronomètre", icon: "⏱️", href: "/fr/tools/stopwatch" },
  { title: "Minuteur", icon: "⏰", href: "/fr/tools/timer" },
];

const seoContent = [
  "L'analyseur de calories alimentaires est un outil gratuit propulsé par IA qui analyse les photos d'aliments pour déterminer le contenu calorique et les informations nutritionnelles. Prenez simplement une photo de votre repas — soit avec votre appareil photo, soit depuis votre galerie — et obtenez une analyse instantanée et précise.",
  "Comment ça fonctionne : Prenez une photo claire de votre nourriture depuis un angle du dessus. L'outil envoie l'image à un modèle d'IA spécialisé qui identifie chaque aliment, estime la taille des portions et calcule les calories, les protéines, les glucides et les lipides. Les résultats apparaissent en 5 à 10 secondes.",
  "Parfait pour toute personne suivant sa nutrition : photographiez votre petit-déjeuner pour connaître vos calories du matin, analysez le déjeuner et le dîner de la même manière. Suivez vos repas quotidiens sans effort, sans saisie manuelle ni pesée des aliments.",
  "Bonus : L'outil décompose les repas en composants individuels — voyez combien de protéines se trouvent dans cette poitrine de poulet par rapport aux glucides dans le riz. Il vous aide à équilibrer vos repas pour une meilleure nutrition. Tout cela à partir d'une seule photo.",
  "La qualité de la photo compte : des images claires et bien éclairées avec un éclairage naturel donnent les meilleurs résultats. Évitez les prises de vue sombres ou éloignées. Séparez les plats en photos individuelles pour une meilleure précision. Fonctionne avec tous les types de cuisines du monde entier.",
];

export default function Client() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    items?: any[];
    totalCalories?: number;
    totalProtein?: number;
    totalCarbs?: number;
    totalFat?: number;
    mealType?: string;
    summary?: string;
    summaryAr?: string;
    error?: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  /** Compress image to max 1024px, JPEG 0.7 quality, returns base64 data URL */
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const MAX = 1024;
          let w = img.width, h = img.height;
          if (w > MAX || h > MAX) {
            if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
            else { w = Math.round(w * MAX / h); h = MAX; }
          }
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.onerror = () => reject(new Error("Échec du chargement de l'image"));
        img.src = reader.result as string;
      };
      reader.onerror = () => reject(new Error("Échec de la lecture du fichier"));
      reader.readAsDataURL(file);
    });
  };

  const handleImageSelect = async (file: File) => {
    setError("");
    setResult(null);

    if (!file.type.startsWith("image/")) {
      setError("Veuillez sélectionner une image valide (JPEG, PNG, WebP)");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("L'image est trop volumineuse. Taille max : 10 Mo.");
      return;
    }

    setFileName(file.name);

    try {
      const compressed = await compressImage(file);
      setImage(compressed);
    } catch {
      setError("Échec de la compression de l'image. Réessayez.");
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/calorie-vision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        const text = await res.text();
        throw new Error(`Le serveur a renvoyé une réponse inattendue : ${text.slice(0, 100)}`);
      }

      if (!res.ok) {
        throw new Error(data.error || "Échec de l'analyse");
      }

      if (data.error) {
        setError(data.error);
        return;
      }

      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: any) {
      setError(e.message || "Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const resetTool = () => {
    setImage(null);
    setFileName("");
    setResult(null);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const getConfidenceColor = (conf: string) => {
    switch (conf) {
      case "high":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getMealTypeText = (type?: string) => {
    switch (type) {
      case "breakfast":
        return "🍳 Petit-déjeuner";
      case "lunch":
        return "🍲 Déjeuner";
      case "dinner":
        return "🌙 Dîner";
      case "snack":
        return "🍿 Collation";
      default:
        return "🍽️ Repas";
    }
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData
        data={toolSchema(
          "Analyseur de calories alimentaires",
          "Analyseur de calories alimentaire gratuit propulsé par IA — prenez une photo et obtenez instantanément les détails caloriques et nutritionnels",
          "https://adwatak.cloud/fr/tools/food-calorie-analyzer",
          "fr",
          "Health"
        )}
      />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData
        data={breadcrumbSchema([
          {
            name: "Accueil",
            url: "https://adwatak.cloud/fr",
          },
          {
            name: "Autres",
            url: "https://adwatak.cloud/fr/category/daily",
          },
          {
            name: "Analyseur de calories alimentaires",
            url: "https://adwatak.cloud/fr/tools/food-calorie-analyzer",
          },
        ])}
      />
      <StructuredData
        data={howToSchema(
          "Analyseur de calories alimentaires",
          "Comment analyser les calories à partir d'une photo de repas",
          [
            { name: "Prenez votre repas en photo", text: "Prenez une photo avec votre appareil photo ou téléchargez-en une depuis votre galerie. Les prises de vue du dessus fonctionnent le mieux." },
            { name: "Attendez l'analyse", text: "Cliquez sur 'Analyser l'image' et attendez 5 à 10 secondes pendant que l'IA analyse votre repas." },
            { name: "Consultez les résultats", text: "Voyez les calories et les macros pour chaque élément ainsi que le total du repas." },
          ],
          "PT30S",
          "fr"
        )}
      />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb
        category="Autres"
        categorySlug="daily"
        toolName="Analyseur de calories alimentaires"
      />

      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
          📸 Analyseur de calories alimentaires
        </h1>
        <p className="text-sm text-gray-500 mb-6">Analyse calorique par photo</p>

        {!image && (
          <div
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-blue-300 bg-blue-50/40 rounded-2xl p-8 text-center transition hover:border-blue-400 hover:bg-blue-50/60"
          >
            <div className="text-5xl mb-4">📷</div>
            <p className="font-semibold text-gray-700 mb-1">
              Choisissez une photo de repas
            </p>
            <p className="text-xs text-gray-400 mb-4">
              JPEG, PNG ou WebP — jusqu'à 10 Mo
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors">
                📂 Depuis la galerie
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageSelect(file);
                  }}
                />
              </label>
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl text-sm font-semibold cursor-pointer border-none hover:bg-green-700 transition-colors">
                📸 Prendre une photo
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageSelect(file);
                  }}
                />
              </label>
            </div>
          </div>
        )}

        {image && !result && (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 max-w-md mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt="Repas sélectionné"
                className="w-full h-auto max-h-80 object-contain bg-gray-50"
              />
            </div>
            {fileName && (
              <p className="text-xs text-gray-400 text-center truncate">
                {fileName}
              </p>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                ⚠️ {error}
              </div>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={analyzeImage}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold border-none text-base cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  <>🔍 Analyser l'image</>
                )}
              </button>
              <button
                onClick={resetTool}
                disabled={loading}
                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold border-none text-base cursor-pointer hover:bg-gray-200 transition-all"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 font-semibold">
              Analyse de votre repas par IA...
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Peut prendre 5 à 10 secondes
            </p>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-6 animate-fadeIn">
            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 max-w-sm mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image || ""}
                alt="Repas analysé"
                className="w-full h-auto max-h-60 object-contain bg-gray-50"
              />
            </div>

            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
                {getMealTypeText(result.mealType)}
              </span>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 text-center">
              <p className="text-xs text-blue-500 mb-1 font-semibold">
                Calories totales
              </p>
              <p className="text-4xl font-extrabold text-blue-900">
                {result.totalCalories ?? "—"}
              </p>
              <p className="text-sm text-blue-500">calories</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
                <p className="text-xs text-red-500 mb-1 font-semibold">
                  Protéines
                </p>
                <p className="text-xl font-extrabold text-red-700">
                  {result.totalProtein?.toFixed(1) ?? "—"}
                </p>
                <p className="text-[10px] text-red-400">grammes</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100">
                <p className="text-xs text-yellow-600 mb-1 font-semibold">
                  Glucides
                </p>
                <p className="text-xl font-extrabold text-yellow-800">
                  {result.totalCarbs?.toFixed(1) ?? "—"}
                </p>
                <p className="text-[10px] text-yellow-500">grammes</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100">
                <p className="text-xs text-orange-500 mb-1 font-semibold">
                  Lipides
                </p>
                <p className="text-xl font-extrabold text-orange-700">
                  {result.totalFat?.toFixed(1) ?? "—"}
                </p>
                <p className="text-[10px] text-orange-400">grammes</p>
              </div>
            </div>

            {result.items && result.items.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800 mb-3 text-base">
                  Détails des éléments
                </h3>
                <div className="space-y-2">
                  {result.items.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.portion}
                          </p>
                        </div>
                        {item.confidence && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getConfidenceColor(
                              item.confidence
                            )}`}
                          >
                            {item.confidence}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-4 text-xs text-gray-500 flex-wrap">
                        <span>🔥 {item.calories} cal</span>
                        <span>💪 {item.protein?.toFixed(1)}g protéines</span>
                        <span>🍚 {item.carbs?.toFixed(1)}g glucides</span>
                        <span>🫒 {item.fat?.toFixed(1)}g lipides</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.summary && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs text-gray-400 mb-1 font-semibold">
                  Évaluation
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {result.summary}
                </p>
              </div>
            )}

            <button
              onClick={resetTool}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold border-none text-sm cursor-pointer hover:bg-blue-700 transition-colors"
            >
              🔄 Analyser un autre repas
            </button>
          </div>
        )}
      </div>

      <SEOContent content={seoContent} lang="fr" />
      <FAQSection faqs={faqs} lang="fr" />
      <RelatedTools tools={relatedTools} lang="fr" />
      <ShareButtons lang="fr" />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}