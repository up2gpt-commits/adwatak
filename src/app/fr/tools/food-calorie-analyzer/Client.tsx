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
    question: "How do I calculate calories from a food photo?",
    answer:
      "Simply take a photo of your meal with your phone camera or upload an image from your gallery. The AI analyzes the image to identify each dish and its ingredients, estimate portion sizes, then calculate the calories. Results appear in seconds — no manual logging required.",
  },
  {
    question: "How accurate is the food calorie analyzer?",
    answer:
      "Accuracy depends on image quality and clarity. Clear, well-lit photos achieve 80-90% accuracy. Blurry images or mixed dishes may be less accurate. Use the results as a helpful reference, not a substitute for professional dietary advice.",
  },
  {
    question: "What kind of photos work best?",
    answer:
      "Top-down shots with good natural lighting and individual plates separated work best. Avoid distant, dark, or cluttered images. Best results: one dish per photo, taken 15-30cm away from a top-down angle.",
  },
  {
    question: "Is the calorie analyzer free?",
    answer:
      "Yes, 100% free — no registration, subscription, or usage limits. All you need is your phone camera or a photo from your gallery.",
  },
  {
    question: "What if AI can't identify the food?",
    answer:
      "Try retaking the photo from a better angle with better lighting. Make sure the food is clearly visible and not covered. You can also photograph ingredients separately for more accurate analysis.",
  },
  {
    question: "Do I need internet?",
    answer:
      "Yes, analysis runs via AI in the cloud, so you need an internet connection. The image is sent for analysis only and is not stored on our servers.",
  },
  {
    question: "Is my data private?",
    answer:
      "Absolutely. Images are sent for analysis via OpenRouter API and are not stored anywhere. Your privacy is 100% guaranteed. We don't keep any images or analysis data.",
  },
  {
    question: "How many calories in an average meal?",
    answer:
      "Average breakfast: 300-500 calories. Lunch: 500-800 calories. Dinner: 400-700 calories. Fast food meals can reach 1000+ calories per meal. Use the tool to analyze your actual meal instead of guessing.",
  },
  {
    question: "Can I use this for weight loss?",
    answer:
      "Yes! It's perfect for tracking calories. Snap your meals throughout the day to know exactly what you're consuming. Daily tracking helps you achieve weight loss or maintenance goals.",
  },
  {
    question: "Does it analyze drinks too?",
    answer:
      "Yes, it analyzes beverages — juices, coffee, tea, sodas, and more. Make sure to photograph the cup clearly with a size reference if possible.",
  },
  {
    question: "What's the difference between calories and macros?",
    answer:
      "Calories = total energy in the meal. Macros: protein (4 cal/g), carbs (4 cal/g), fat (9 cal/g). The tool calculates all three to give you a complete nutritional picture.",
  },
  {
    question: "Why do estimated calories vary between photos of the same food?",
    answer:
      "Portion size varies — a serving of rice could be 1 cup or 2 cups. The AI estimates portion size visually. Clearer photos with size references (like a fork or plate edge) improve portion estimation.",
  },
  {
    question: "Can AI distinguish between different cooking methods?",
    answer:
      "Yes, the model can generally distinguish grilled, fried, boiled, or raw food (like salads). Cooking method affects calories — fried food has more calories per volume due to oil absorption.",
  },
  {
    question: "Does it work with any cuisine?",
    answer:
      "Yes, it recognizes dishes from cuisines worldwide — Italian, Japanese, Middle Eastern, Indian, Mexican, American, Chinese, and more. Every cuisine has its typical ingredients and preparation methods built into the AI model's knowledge.",
  },
];

const relatedTools = [
  {
    title: "Calorie Calculator (BMR)",
    icon: "🔥",
    href: "/fr/tools/calorie-calculator",
  },
  {
    title: "BMI Calculator",
    icon: "⚖️",
    href: "/fr/tools/bmi-calculator",
  },
  { title: "Stopwatch", icon: "⏱️", href: "/fr/tools/stopwatch" },
  { title: "Timer", icon: "⏰", href: "/fr/tools/timer" },
];

const seoContent = [
  'Food Calorie Analyzer is a free AI-powered tool that analyzes photos of food to determine calorie content and nutritional information. Simply snap a picture of your meal — either with your camera or from your photo gallery — and get instant, accurate analysis.',
  "How it works: Take a clear photo of your food from a top-down angle. The tool sends the image to a specialized AI model that identifies each food item, estimates portion sizes, and calculates calories, protein, carbs, and fat. Results appear within 5-10 seconds.",
  "Perfect for anyone tracking their nutrition: snap your breakfast to know your morning calories, analyze lunch and dinner the same way. Track your daily meals effortlessly without manual logging or food weighing.",
  "Bonus: The tool breaks down meals into individual components — see how much protein is in that chicken breast versus carbs in the rice. It helps you balance your meals for better nutrition. All from a single photo.",
  "Photo quality matters: clear, well-lit images with natural lighting give the best results. Avoid dark or distant shots. Separate dishes into individual photos for better accuracy. Works with all types of cuisines worldwide.",
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
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = reader.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleImageSelect = async (file: File) => {
    setError("");
    setResult(null);

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image (JPEG, PNG, WebP)");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image is too large. Max size is 10MB.");
      return;
    }

    setFileName(file.name);

    try {
      const compressed = await compressImage(file);
      setImage(compressed);
    } catch {
      setError("Failed to compress image. Try again.");
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
        throw new Error(`Server returned unexpected response: ${text.slice(0, 100)}`);
      }

      if (!res.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      if (data.error) {
        setError(data.error);
        return;
      }

      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try again.");
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
        return "🍳 Breakfast";
      case "lunch":
        return "🍲 Lunch";
      case "dinner":
        return "🌙 Dinner";
      case "snack":
        return "🍿 Snack";
      default:
        return "🍽️ Meal";
    }
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData
        data={toolSchema(
          "Food Calorie Analyzer",
          "Free AI-powered food calorie analyzer — take a photo and get instant calorie and nutrition details",
          "https://adwatak.cloud/fr/tools/food-calorie-analyzer",
          "fr",
          "Health"
        )}
      />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData
        data={breadcrumbSchema([
          {
            name: "Home",
            url: "https://adwatak.cloud/fr",
          },
          {
            name: "Autres",
            url: "https://adwatak.cloud/fr/category/daily",
          },
          {
            name: "Food Calorie Analyzer",
            url: "https://adwatak.cloud/fr/tools/food-calorie-analyzer",
          },
        ])}
      />
      <StructuredData
        data={howToSchema(
          "Food Calorie Analyzer",
          "How to analyze calories from a food photo",
          [
            { name: "Snap your meal", text: "Take a photo with your camera or upload one from your gallery. Top-down shots work best." },
            { name: "Wait for analysis", text: "Click 'Analyze Image' and wait 5-10 seconds while AI analyzes your food." },
            { name: "View results", text: "See calories and macros for each item plus the meal total." },
          ],
          "PT30S",
          "fr"
        )}
      />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb
        category="Autres"
        categorySlug="daily"
        toolName="Food Calorie Analyzer"
      />

      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
          📸 Food Calorie Analyzer
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Snap any meal and get instant calorie & nutrition analysis — free
        </p>

        {!image && (
          <div
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-blue-300 bg-blue-50/40 rounded-2xl p-8 text-center transition hover:border-blue-400 hover:bg-blue-50/60"
          >
            <div className="text-5xl mb-4">📷</div>
            <p className="font-semibold text-gray-700 mb-1">
              Choose a food photo
            </p>
            <p className="text-xs text-gray-400 mb-4">
              JPEG, PNG or WebP — up to 10MB
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors">
                📂 From Gallery
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
                📸 Take Photo
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
                alt="Selected food"
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
                    Analyzing...
                  </>
                ) : (
                  <>🔍 Analyze Image</>
                )}
              </button>
              <button
                onClick={resetTool}
                disabled={loading}
                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold border-none text-base cursor-pointer hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 font-semibold">
              Analyzing your food with AI...
            </p>
            <p className="text-xs text-gray-400 mt-1">
              May take 5-10 seconds
            </p>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-6 animate-fadeIn">
            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 max-w-sm mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image || ""}
                alt="Analyzed food"
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
                Total Calories
              </p>
              <p className="text-4xl font-extrabold text-blue-900">
                {result.totalCalories ?? "—"}
              </p>
              <p className="text-sm text-blue-500">calories</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
                <p className="text-xs text-red-500 mb-1 font-semibold">
                  Protein
                </p>
                <p className="text-xl font-extrabold text-red-700">
                  {result.totalProtein?.toFixed(1) ?? "—"}
                </p>
                <p className="text-[10px] text-red-400">grams</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100">
                <p className="text-xs text-yellow-600 mb-1 font-semibold">
                  Carbs
                </p>
                <p className="text-xl font-extrabold text-yellow-800">
                  {result.totalCarbs?.toFixed(1) ?? "—"}
                </p>
                <p className="text-[10px] text-yellow-500">grams</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100">
                <p className="text-xs text-orange-500 mb-1 font-semibold">
                  Fat
                </p>
                <p className="text-xl font-extrabold text-orange-700">
                  {result.totalFat?.toFixed(1) ?? "—"}
                </p>
                <p className="text-[10px] text-orange-400">grams</p>
              </div>
            </div>

            {result.items && result.items.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800 mb-3 text-base">
                  Item Details
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
                        <span>💪 {item.protein?.toFixed(1)}g protein</span>
                        <span>🍚 {item.carbs?.toFixed(1)}g carbs</span>
                        <span>🫒 {item.fat?.toFixed(1)}g fat</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.summary && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs text-gray-400 mb-1 font-semibold">
                  Assessment
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
              🔄 Analyze Another Meal
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
