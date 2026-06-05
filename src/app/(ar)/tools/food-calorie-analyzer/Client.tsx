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
    question: "كيف أعرف سعرات الأكل من الصورة؟",
    answer:
      "صور الوجبة بكاميرا هاتفك أو ارفع صورة من المعرض. الأداة تحلل الصورة بالذكاء الاصطناعي وتحدد نوع كل طبق والمكونات وتقدّر أحجام الحصص ثم تحسب السعرات. النتائج تظهر في ثوانٍ — بدون أي مجهود يدوي لحساب السعرات.",
  },
  {
    question: "هل تحليل السعرات بالصور دقيق؟",
    answer:
      "الدقة تعتمد على جودة الصورة ووضوح الأطباق. الصور الواضحة ذات الإضاءة الجيدة تعطي نتائج دقيقة بنسبة 80-90%. الصور الضبابية أو وجبات تحتوي على أطباق متعددة مكدسة قد تكون أقل دقة. استخدم النتائج كمرجع تقريبي وليس كبديل عن الاستشارة الغذائية المتخصصة.",
  },
  {
    question: "ما نوع الصور التي تعطي أفضل النتائج؟",
    answer:
      "صور واضحة من الأعلى (Top-down)، إضاءة طبيعية جيدة، كل طبق منفصل. تجنب الصور البعيدة أو المظلمة أو التي تحتوي على أطباق كثيرة متراكمة. الأفضل: طبق واحد في كل صورة من مسافة 15-30 سم بزاوية علوية.",
  },
  {
    question: "هل تدعم الأداة المأكولات العربية؟",
    answer:
      "نعم، الأداة مدعومة بالذكاء الاصطناعي المتقدم الذي يتعرف على أشهر الأطباق العربية والعالمية: المنسف، الكبسة، المقلوبة، الفتوش، الحمص، الفلافل، الشاورما، الكنافة، وأكثر. النتائج تشمل اسم الطعام بالعربية وتفاصيل السعرات.",
  },
  {
    question: "هل الأداة مجانية؟",
    answer:
      "نعم 100% مجانية — بدون تسجيل ولا اشتراك ولا حدود للاستخدام اليومي. كل ما تحتاجه هو كاميرا هاتفك أو صورة من معرض صورك.",
  },
  {
    question: "ماذا لو لم يتعرف AI على الطعام؟",
    answer:
      "جرب تصوير الطبق من زاوية أفضل بإضاءة أقوى. تأكد أن الطعام واضح وغير مغطى. يمكنك أيضاً تصوير المكونات بشكل منفصل لتحليل أدق.",
  },
  {
    question: "هل أحتاج إنترنت؟",
    answer:
      "نعم، التحليل يتم عبر الذكاء الاصطناعي على السحابة، لذلك تحتاج اتصال إنترنت. الصورة تُرسل للتحليل فقط ولا تُخزن على خوادمنا.",
  },
  {
    question: "هل البيانات آمنة؟",
    answer:
      "نعم، الصور تُرسل للتحليل عبر OpenRouter API ولا تُخزن بعد ذلك. خصوصيتك مضمونة 100%. لا نحتفظ بأي صور أو بيانات تحليل.",
  },
  {
    question: "كم سعرة حرارية في الوجبة المتوسطة؟",
    answer:
      "الإفطار المتوسط 300-500 سعرة. الغداء: 500-800 سعرة. العشاء: 400-700 سعرة. الوجبات السريعة قد تصل لـ 1000+ سعرة للوجبة الواحدة. استخدم الأداة لتحليل وجبتك الفعلية بدلاً من التخمين.",
  },
  {
    question: "هل يمكن استخدام الأداة للرجيم؟",
    answer:
      "نعم، الأداة مثالية لمن يتابعون سعراتهم الحرارية. صور وجبتك لتعرف بالضبط كم سعرة تناولتها. تتبع وجباتك يومياً يساعدك على تحقيق أهدافك في خسارة الوزن أو الحفاظ عليه.",
  },
  {
    question: "هل تدعم الأداة تحليل المشروبات؟",
    answer:
      "نعم، الأداة تحلل المشروبات أيضاً — عصائر، قهوة، شاي، مشروبات غازية، وغيرها. تأكد من تصوير الكوب بشكل واضح مع تقدير الحجم.",
  },
  {
    question: "ما الفرق بين السعرات والمغذيات؟",
    answer:
      "السعرات = إجمالي الطاقة في الوجبة. المغذيات: البروتين (4 سعرات/جرام)، الكربوهيدرات (4 سعرات/جرام)، الدهون (9 سعرات/جرام). الأداة تحسب الثلاثة معاً لتعطيك صورة كاملة عن وجبتك.",
  },
  {
    question: "لماذا تختلف السعرات المقدرة من صورة لأخرى؟",
    answer:
      "حجم الحصة يختلف — حصة الأرز قد تكون كوباً أو كوبين. الأداة تقدّر حجم الحصة بصرياً. لكلما كانت الصورة أوضح وأظهرت أبعاد الطبق بشكل أفضل، زادت دقة تقدير الحصص.",
  },
  {
    question: "هل يمكن للـ AI التمييز بين طرق الطهي المختلفة؟",
    answer:
      "نعم، النموذج يستطيع غالباً التمييز بين الطعام المشوي، المقلي، المسلوق، أو النيء (كالسلطات). طريقة الطهي تؤثر على السعرات — الطعام المقلي يحتوي سعرات أكثر لنفس الحجم بسبب الزيت.",
  },
];

const relatedTools = [
  {
    title: "حاسبة السعرات الحرارية",
    icon: "🔥",
    href: "/tools/calorie-calculator",
  },
  {
    title: "حاسبة مؤشر كتلة الجسم",
    icon: "⚖️",
    href: "/tools/bmi-calculator",
  },
  { title: "ساعة الإيقاف", icon: "⏱️", href: "/tools/stopwatch" },
  { title: "المؤقت", icon: "⏰", href: "/tools/timer" },
];

const seoContent = [
  "محلل السعرات بالصور هي أداة مجانية تستخدم الذكاء الاصطناعي لتحليل صور الطعام وتحديد محتواها من السعرات الحرارية والمغذيات. كل ما عليك فعله هو تصوير طبقك — سواء بالكاميرا مباشرة أو من معرض الصور — وستحصل على تحليل فوري دقيق.",
  "كيف تعمل الأداة؟ تلتقط صورة واضحة للطعام من الأعلى (زاوية 45-90 درجة). الأداة ترسل الصورة إلى نموذج AI متخصص في تحليل الطعام يتعرف على نوع كل صنف وكميته التقريبية ويحسب السعرات والبروتين والكربوهيدرات والدهون. النتائج تظهر خلال 5-10 ثوانٍ.",
  "الأداة مثالية لمن يتابعون حمياتهم الغذائية: صور وجبة الإفطار لتعرف كم سعرة تناولت، حلل الغداء والعشاء بنفس الطريقة. سجل وجباتك اليومية لتحصل على صورة كاملة عن استهلاكك اليومي من السعرات. بدون مجهود كتابة أو وزن طعام.",
  "ميزة إضافية: الأداة تحلل الوجبات إلى مكوناتها الفردية — تعرف كمية البروتين في قطعة الدجاج مقابل كمية الكربوهيدرات في الأرز، وتساعدك على تحقيق التوازن في وجبتك. كل هذا في ثوانٍ من تصوير واحد.",
  "جودة الصورة عامل مهم: صور واضحة بإضاءة طبيعية تعطي أفضل النتائج. تجنب الصور المظلمة أو البعيدة جداً. كل طبق في صورة منفصلة يحسن الدقة. الأداة تدعم جميع أنواع المأكولات العربية والعالمية.",
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
      setError("الرجاء اختيار صورة صالحة (JPEG, PNG, WebP)");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("حجم الصورة كبير جداً. الحد الأقصى 10 ميجابايت.");
      return;
    }

    setFileName(file.name);

    try {
      const compressed = await compressImage(file);
      setImage(compressed);
    } catch {
      setError("فشل في ضغط الصورة. حاول مرة أخرى.");
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
        throw new Error(`الخادم أعاد استجابة غير متوقعة: ${text.slice(0, 100)}`);
      }

      if (!res.ok) {
        throw new Error(data.error || "فشل التحليل");
      }

      if (data.error) {
        setError(data.error);
        return;
      }

      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e: any) {
      setError(e.message || "حدث خطأ. حاول مرة أخرى.");
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

  const getConfidenceText = (conf: string) => {
    switch (conf) {
      case "high":
        return "عالية";
      case "medium":
        return "متوسطة";
      case "low":
        return "منخفضة";
      default:
        return conf;
    }
  };

  const getMealTypeText = (type?: string) => {
    switch (type) {
      case "breakfast":
        return "🍳 فطور";
      case "lunch":
        return "🍲 غداء";
      case "dinner":
        return "🌙 عشاء";
      case "snack":
        return "🍿 مقبلات/سناك";
      default:
        return "🍽️ وجبة";
    }
  };

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData
        data={toolSchema(
          "محلل السعرات بالصور",
          "أداة مجانية لتحليل السعرات الحرارية من صورة الطعام باستخدام الذكاء الاصطناعي",
          "https://adwatak.cloud/tools/food-calorie-analyzer",
          "ar",
          "Health"
        )}
      />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData
        data={breadcrumbSchema([
          {
            name: "الرئيسية",
            url: "https://adwatak.cloud",
          },
          {
            name: "أدوات أخرى",
            url: "https://adwatak.cloud/category/daily",
          },
          {
            name: "محلل السعرات بالصور",
            url: "https://adwatak.cloud/tools/food-calorie-analyzer",
          },
        ])}
      />
      <StructuredData
        data={howToSchema(
          "محلل السعرات بالصور",
          "كيفية تحليل السعرات الحرارية من صورة الطعام",
          [
            { name: "صوّر طبقك", text: "صور وجبتك بالكاميرا أو ارفع صورة من المعرض. الأفضل تصوير من الأعلى بزاوية واضحة." },
            { name: "انتظر التحليل", text: "اضغط زر 'حلل الصورة' وانتظر 5-10 ثوانٍ بينما يحلل AI طعامك." },
            { name: "اطلع على النتائج", text: "شاهد السعرات الحرارية والمغذيات لكل صنف والمجموع الكلي للوجبة." },
          ],
          "PT30S",
          "ar"
        )}
      />
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />

      <Breadcrumb
        category="أدوات أخرى"
        categorySlug="daily"
        toolName="محلل السعرات بالصور"
      />

      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
          📸 محلل السعرات بالصور
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          صور أي وجبة واحصل على تحليل فوري للسعرات الحرارية والمغذيات — مجاناً
        </p>

        {/* Upload area */}
        {!image && (
          <div
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-blue-300 bg-blue-50/40 rounded-2xl p-8 text-center transition hover:border-blue-400 hover:bg-blue-50/60"
          >
            <div className="text-5xl mb-4">📷</div>
            <p className="font-semibold text-gray-700 mb-1">
              اختر صورة للطعام
            </p>
            <p className="text-xs text-gray-400 mb-4">
              JPEG, PNG أو WebP — حتى 10 ميجابايت
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors">
                📂 من المعرض
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
                📸 التقط صورة
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

        {/* Preview */}
        {image && !result && (
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 max-w-md mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt="الطعام المختار"
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
                    جارٍ التحليل...
                  </>
                ) : (
                  <>🔍 حلل الصورة</>
                )}
              </button>
              <button
                onClick={resetTool}
                disabled={loading}
                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold border-none text-base cursor-pointer hover:bg-gray-200 transition-all"
              >
                إلغاء
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 font-semibold">
              جارٍ تحليل الطعام بالذكاء الاصطناعي...
            </p>
            <p className="text-xs text-gray-400 mt-1">
              قد يستغرق 5-10 ثوانٍ
            </p>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-6 animate-fadeIn">
            {/* Preview + redo */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 max-w-sm mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image || ""}
                alt="الطعام المحلل"
                className="w-full h-auto max-h-60 object-contain bg-gray-50"
              />
            </div>

            {/* Meal type badge */}
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
                {getMealTypeText(result.mealType)}
              </span>
            </div>

            {/* Total Calories */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 text-center">
              <p className="text-xs text-blue-500 mb-1 font-semibold">
                إجمالي السعرات الحرارية
              </p>
              <p className="text-4xl font-extrabold text-blue-900">
                {result.totalCalories ?? "—"}
              </p>
              <p className="text-sm text-blue-500">سعرة حرارية</p>
            </div>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
                <p className="text-xs text-red-500 mb-1 font-semibold">
                  بروتين
                </p>
                <p className="text-xl font-extrabold text-red-700">
                  {result.totalProtein?.toFixed(1) ?? "—"}
                </p>
                <p className="text-[10px] text-red-400">جرام</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100">
                <p className="text-xs text-yellow-600 mb-1 font-semibold">
                  كربوهيدرات
                </p>
                <p className="text-xl font-extrabold text-yellow-800">
                  {result.totalCarbs?.toFixed(1) ?? "—"}
                </p>
                <p className="text-[10px] text-yellow-500">جرام</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100">
                <p className="text-xs text-orange-500 mb-1 font-semibold">
                  دهون
                </p>
                <p className="text-xl font-extrabold text-orange-700">
                  {result.totalFat?.toFixed(1) ?? "—"}
                </p>
                <p className="text-[10px] text-orange-400">جرام</p>
              </div>
            </div>

            {/* Items detail */}
            {result.items && result.items.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800 mb-3 text-base">
                  تفاصيل الأصناف
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
                            {item.nameAr || item.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.portion}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getConfidenceColor(
                            item.confidence
                          )}`}
                        >
                          {getConfidenceText(item.confidence)}
                        </span>
                      </div>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>🔥 {item.calories} سعرة</span>
                        <span>💪 {item.protein?.toFixed(1)}g بروتين</span>
                        <span>🍚 {item.carbs?.toFixed(1)}g كارب</span>
                        <span>🫒 {item.fat?.toFixed(1)}g دهون</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            {result.summaryAr && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs text-gray-400 mb-1 font-semibold">
                  تقييم غذائي
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {result.summaryAr}
                </p>
              </div>
            )}

            {/* Try again */}
            <button
              onClick={resetTool}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold border-none text-sm cursor-pointer hover:bg-blue-700 transition-colors"
            >
              🔄 تحليل وجبة أخرى
            </button>
          </div>
        )}
      </div>

      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
      <ShareButtons lang="ar" />

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
