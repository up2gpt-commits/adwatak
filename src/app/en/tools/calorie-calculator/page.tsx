"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "How many calories should I eat daily?", answer: "For weight maintenance: sedentary women ~1,800-2,000, active women ~2,200-2,400. Sedentary men ~2,200-2,400, active men ~2,600-2,800. For weight loss: subtract 300-500 calories per day for 0.5-1 lb/week. Never go below 1,200 (women) or 1,500 (men) without medical supervision." },
  { question: "What is BMR?", answer: "Basal Metabolic Rate — calories your body burns at rest just to keep you alive (breathing, heart, brain, cell repair). BMR is 60-75% of your total daily calories. Our calculator uses the Mifflin-St Jeor formula, the most accurate for most people." },
  { question: "What affects my daily calorie needs?", answer: "Age (slows with age), sex (men need more), weight (heavier = more), height (taller = more), muscle mass (muscle burns 6 cal/lb/day vs fat 2 cal/lb/day), activity level, and genetics. All built into our calculator." },
  { question: "How to lose weight with calorie counting?", answer: "Create a deficit of 300-500 calories/day. Eat protein (25-30g per meal), fiber (25-35g/day), and whole foods. Don't eat back exercise calories — trackers overestimate burn by 20-50%. Sustainable loss: 0.5-2 lbs per week." },
  { question: "What's the best macro split?", answer: "General: 45-65% carbs, 10-35% protein, 20-35% fat. For weight loss: 40% protein, 30% carbs, 30% fat (protein preserves muscle). For athletes: 25% protein, 55% carbs, 20% fat. Adjust based on your goals and how you feel." },
  { question: "How accurate are calorie calculators?", answer: "±200-300 calories for most people. Accuracy depends on correct activity level assessment. Most people overestimate their activity. Start with the calculated number, track weight for 2 weeks, then adjust by 100-200 calories if needed." },
  { question: "Do I need to eat more for muscle gain?", answer: "Yes. 300-500 calories above maintenance + adequate protein (1.6-2.2g per kg body weight) + strength training. Gaining 0.5-1 lb per month is ideal. More than that = too much fat gain." },
  { question: "Why am I not losing weight at my calculated calories?", answer: "Possible reasons: underestimating portions (most people eat 20-30% more than they think), overestimating activity level, not counting drinks/oils/sauces, medical conditions (thyroid, insulin resistance), or medications." },
  { question: "What's the difference between BMR and TDEE?", answer: "BMR = calories at complete rest. TDEE (Total Daily Energy Expenditure) = BMR + activity + digestion. TDEE is what you actually burn in a day. Multiply BMR by 1.2 (sedentary) to 1.9 (very active) for TDEE." },
  { question: "Can I eat fewer calories on rest days?", answer: "Yes — on rest days eat at maintenance (not deficit) for weight loss, or 200-300 less. On training days, eat more around workouts. This 'calorie cycling' approach improves adherence and performance." },
  { question: "What's empty calories?", answer: "Calories from added sugar, refined grains, and alcohol — no nutritional value. A 12oz soda = 140 empty calories. 500 extra empty calories per day = 1 lb of fat per week. Replace with whole foods (vegetables, lean protein, whole grains)." },
  { question: "How many calories do different activities burn?", answer: "Walking (30 min): 120-180 cal. Running (30 min at 6mph): 300-400 cal. Cycling (30 min moderate): 200-300 cal. Swimming: 200-350 cal. Weight lifting: 90-150 cal. Yoga: 60-120 cal. Higher weight = higher burn." },
];

const relatedTools = [
  { title: "BMI Calculator", icon: "⚖️", href: "/en/tools/bmi-calculator" },
  { title: "Age Calculator", icon: "🎂", href: "/en/tools/age-calculator" },
  { title: "Compound Interest", icon: "📈", href: "/en/tools/compound-interest" },
  { title: "Unit Converter", icon: "📏", href: "/en/tools/unit-converter" },
  { title: "Word Counter", icon: "📝", href: "/en/tools/word-counter" },
  { title: "Password Generator", icon: "🔐", href: "/en/tools/password-generator" },
];

const seoContent = [
  "Our free Calorie Calculator estimates your daily calorie needs based on age, sex, height, weight, and activity level. It uses the Mifflin-St Jeor equation — the most accurate BMR formula for the general population — to give you a personalized daily calorie target.",
  "How it works: We calculate your BMR (calories at rest) then multiply by your activity factor. A 30-year-old woman, 5'5\", 150 lbs, lightly active: 2,025 cal/day maintenance. To lose 1 lb/week: 1,525 cal/day. To gain: 2,325-2,525 cal/day.",
  "Activity levels explained: Sedentary (desk job, no exercise) x 1.2. Lightly active (1-3 days/week) x 1.375. Moderately active (3-5 days) x 1.55. Very active (6-7 days) x 1.725. Extra active (physical job + daily training) x 1.9.",
  "Calories are just one piece of the puzzle. Food quality, protein intake, meal timing, sleep (7-9 hours), and stress management all affect body composition. Use our calculator as a starting point and adjust based on your actual results.",
  "Related: Check your BMI with our BMI Calculator for body fat estimation. The Age Calculator helps with age-related metabolic changes. The Compound Interest tool shows the power of daily choices over time — calorie deficits compound too!",
  "Long-term success comes from consistency, not perfection. Even if you hit your target 80% of the time, you'll make progress. Track your food for 2-3 weeks to build awareness, then you can estimate portions more accurately."
];

export default function CalorieCalculator() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("75");
  const [height, setHeight] = useState("175");
  const [activity, setActivity] = useState("1.375");
  const [goal, setGoal] = useState<"lose" | "maintain" | "gain">("maintain");
  const [result, setResult] = useState<{ bmr: number; tdee: number; target: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(age), w = parseFloat(weight), h = parseFloat(height), act = parseFloat(activity);
    if (!a || !w || !h) return;
    const bmr = sex === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * act;
    const adjust = goal === "lose" ? -500 : goal === "gain" ? 300 : 0;
    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee), target: Math.round(tdee + adjust) });
  };

  const schemaName = "Calorie Calculator";
const schemaDesc = `Online Calorie Calculator - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/calorie-calculator";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Utility", url: "https://adwatak.cloud/en/tools/utility" },
  { name: "Calorie Calculator", url: "https://adwatak.cloud/en/tools/calorie-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Health Calculators" categorySlug="calculators" toolName="Calorie Calculator" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔥 Calorie Calculator</h1>
        <p className="text-sm text-gray-500 mb-6">Calculate daily calorie needs for weight loss, maintenance, or gain</p>
        <div className="flex gap-2 mb-4">
          {(["male", "female"] as const).map((s) => (<button key={s} onClick={() => setSex(s)} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${sex === s ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>{s === "male" ? "♂ Male" : "♀ Female"}</button>))}
        </div>
        {[{ l: "Age", v: age, s: setAge, p: "30" }, { l: "Weight (kg)", v: weight, s: setWeight, p: "75" }, { l: "Height (cm)", v: height, s: setHeight, p: "175" }].map((f, i) => (
          <div key={i} className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.l}</label><input type="number" value={f.v} onChange={(e) => f.s(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder={f.p} /></div>
        ))}
        <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Activity Level</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none bg-white">
            <option value="1.2">Sedentary (desk job, no exercise)</option>
            <option value="1.375">Light (1-3 days/week)</option>
            <option value="1.55">Moderate (3-5 days/week)</option>
            <option value="1.725">Very Active (6-7 days/week)</option>
            <option value="1.9">Extra Active (physical job + training)</option>
          </select>
        </div>
        <div className="flex gap-2 mb-4">
          {([{ k: "lose", l: "Lose Weight" }, { k: "maintain", l: "Maintain" }, { k: "gain", l: "Gain Muscle" }] as const).map((g) => (<button key={g.k} onClick={() => setGoal(g.k)} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${goal === g.k ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>{g.l}</button>))}
        </div>
        <button onClick={calculate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Calculate</button>
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
            <p className="text-xs text-blue-600 mb-1">BMR</p>
            <p className="text-xl font-extrabold text-blue-900">{result.bmr}</p>
            <p className="text-[10px] text-blue-400">cal/day</p>
          </div>
          <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
            <p className="text-xs text-green-600 mb-1">TDEE</p>
            <p className="text-xl font-extrabold text-green-900">{result.tdee}</p>
            <p className="text-[10px] text-green-400">cal/day</p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-5 text-center border border-yellow-300">
            <p className="text-xs text-yellow-700 mb-1">{goal === "lose" ? "Target (Deficit)" : goal === "gain" ? "Target (Surplus)" : "Target"}</p>
            <p className="text-xl font-extrabold text-yellow-900">{result.target}</p>
            <p className="text-[10px] text-yellow-600">cal/day</p>
          </div>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
