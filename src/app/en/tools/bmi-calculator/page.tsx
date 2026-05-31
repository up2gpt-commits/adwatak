"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "What is BMI?", answer: "Body Mass Index — a measure of body fat based on height and weight. BMI = weight (kg) / height² (m²). A BMI of 18.5-24.9 is normal, 25-29.9 is overweight, 30+ is obese. It's a screening tool, not a diagnostic test." },
  { question: "Is BMI accurate for athletes?", answer: "No, BMI doesn't distinguish muscle from fat. An athlete with 10% body fat and lots of muscle might have a BMI of 27 (overweight). Use body fat % or waist-to-height ratio instead for athletes." },
  { question: "What is a healthy BMI?", answer: "18.5-24.9 is the World Health Organization's healthy range. Below 18.5 is underweight. 25-29.9 is overweight. 30+ is obese. For Asian populations, the range shifts: 23-24.9 is overweight, and 25+ is obese." },
  { question: "Can BMI be misleading?", answer: "Yes. Pregnant women, athletes, elderly people (lost muscle mass), and children all have different BMI norms. BMI doesn't account for bone density, body composition, or fat distribution. Use it as a starting point only." },
  { question: "What's my ideal weight for my height?", answer: "Our calculator shows the healthy weight range for your height. For a 5'9\" (175cm) person: normal BMI = 18.5-24.9 = 126-169 lbs (57-76 kg). Being at the lower end reduces diabetes and heart disease risk." },
  { question: "What's the difference between BMI and body fat %?", answer: "BMI estimates body fat using height and weight only. Body fat % directly measures fat tissue — can be 10% muscular or 25% skinny fat with same BMI. DEXA scan is gold standard for body fat." },
  { question: "How often should I check my BMI?", answer: "Monthly is enough. Weekly fluctuations are usually water weight. Track trend over 3-6 months. A 1 BMI point change ≈ 6 lbs for an average person. Focus on the direction, not the daily number." },
  { question: "Does BMI apply to children?", answer: "Children use BMI percentiles (not raw numbers). A BMI above the 95th percentile = obese, 85th-95th = overweight, 5th-85th = healthy, below 5th = underweight. Age and sex matter for kids." },
  { question: "What health risks come with high BMI?", answer: "Higher risk of type 2 diabetes (3-7×), heart disease (2-3×), high blood pressure, sleep apnea, joint problems, certain cancers, and fatty liver disease. Losing 5-10% of body weight significantly reduces these risks." },
  { question: "How to lower BMI?", answer: "Calorie deficit (eat 300-500 fewer calories daily), increase activity (150+ min moderate exercise per week), prioritize protein (25-30g per meal), sleep 7-9 hours, reduce sugar and processed foods. Changes of 0.5-2 lbs per week are sustainable." },
  { question: "What's the lowest healthy BMI?", answer: "18.5. Below this is underweight, linked to weakened immune system, osteoporosis, fertility issues, and nutritional deficiencies. BMI 17-18.5 is mildly underweight, 16-17 is moderately underweight, below 16 is severely underweight." },
  { question: "Does BMI change with age?", answer: "Yes. Muscle mass decreases ~3-8% per decade after 30, so BMI tends to rise even if weight stays the same. Waist circumference becomes more important after 50. Recommended BMI for older adults: 24-27 may be safer than below 22." },
];

const relatedTools = [
  { title: "Calorie Calculator", icon: "🔥", href: "/en/tools/calorie-calculator" },
  { title: "Age Calculator", icon: "🎂", href: "/en/tools/age-calculator" },
  { title: "Unit Converter", icon: "📏", href: "/en/tools/unit-converter" },
  { title: "Word Counter", icon: "📝", href: "/en/tools/word-counter" },
  { title: "Password Generator", icon: "🔐", href: "/en/tools/password-generator" },
  { title: "QR Generator", icon: "📱", href: "/en/tools/qr-generator" },
];

const seoContent = [
  "BMI (Body Mass Index) is a quick screening tool that estimates body fat using just height and weight. Enter your measurements into our free BMI calculator to get your BMI score, weight category, and healthy weight range instantly.",
  "How it works: BMI = weight (kg) / height² (m²). For imperial: (weight in lbs × 703) / height² (in²). Our calculator handles both. A 5'10\" (178cm) person weighing 175 lbs (79kg) has a BMI of 25.1 — at the boundary of normal and overweight.",
  "BMI categories: Below 18.5 = underweight. 18.5-24.9 = healthy weight. 25-29.9 = overweight. 30+ = obese (Class I 30-34.9, Class II 35-39.9, Class III 40+). Your waist measurement adds context to BMI — men should be under 40\", women under 35\".",
  "Limitations: BMI doesn't measure muscle vs fat, bone density, or fat distribution. Two people with the same BMI can have very different health profiles. Use our calculator as a starting point, then consult a doctor for a complete assessment.",
  "Related: Pair your BMI reading with our Calorie Calculator to determine daily needs for weight loss or gain. Use the Age Calculator for health benchmarks by age group. The Unit Converter helps if you need metric/imperial conversions.",
  "Regular BMI tracking helps spot trends before they become problems. A slow BMI increase of 0.5 per year might go unnoticed without tracking. Use our tool monthly and combine with waist circumference for a fuller health picture."
];

export default function BMICalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight), h = parseFloat(height);
    if (w <= 0 || h <= 0) return;
    const bmi = unit === "metric" ? w / ((h / 100) ** 2) : (w * 703) / (h ** 2);
    const category = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
    setResult({ bmi: Math.round(bmi * 10) / 10, category });
  };

  const schemaName = "BMI Calculator";
const schemaDesc = `Online BMI Calculator - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/bmi-calculator";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Utility", url: "https://adwatak.cloud/en/tools/utility" },
  { name: "BMI Calculator", url: "https://adwatak.cloud/en/tools/bmi-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Health Calculators" categorySlug="calculators" toolName="BMI Calculator" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">⚖️ BMI Calculator</h1>
        <p className="text-sm text-gray-500 mb-6">Calculate your Body Mass Index instantly</p>
        <div className="flex gap-2 mb-4">
          <button onClick={() => { setUnit("metric"); setResult(null); }} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${unit === "metric" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>Metric</button>
          <button onClick={() => { setUnit("imperial"); setResult(null); }} className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer border-none ${unit === "imperial" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>Imperial</button>
        </div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">{unit === "metric" ? "Weight (kg)" : "Weight (lbs)"}</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none mb-4" placeholder={unit === "metric" ? "75" : "165"} />
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">{unit === "metric" ? "Height (cm)" : "Height (inches)"}</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none mb-4" placeholder={unit === "metric" ? "175" : "70"} />
        <button onClick={calculate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Calculate BMI</button>
      </div>
      {result && (
        <div className="bg-blue-50 rounded-xl p-8 text-center border border-blue-200 mb-6">
          <p className="text-sm text-blue-600 mb-1">Your BMI</p>
          <p className="text-5xl font-extrabold text-blue-900 mb-2">{result.bmi}</p>
          <p className="text-lg font-semibold text-blue-700">{result.category}</p>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
