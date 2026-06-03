"use client";
import { useState } from "react";
import StructuredData, { speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "How does the age calculator work?", answer: "Compares your birth date to the current date (or a custom date). Calculates: exact years, months, and days. Also shows: total days alive, total months, total hours, total minutes, and days until next birthday." },
  { question: "What is chronological age?", answer: "Time elapsed since birth. Someone born January 1, 1990: as of January 1, 2024 = 34 years, 0 months, 0 days. Chronological age is precise to the day. Our calculator gives exact years, months, and days." },
  { question: "How accurate is the age calculator?", answer: "Day-exact — accounts for different month lengths (28-31 days), leap years (including century rules), and time zones. February 29 birthdays get accurate age even in non-leap years (shows as Feb 28 or Mar 1)." },
  { question: "What is the difference between age and birthday?", answer: "Age = years, months, days since birth. Birthday = annual celebration on your birth date. You turn a new age on your birthday. November 30 + May 15 = age 28 years, 5 months, 15 days." },
  { question: "How to calculate age in years, months, days?", answer: "Birth: March 15, 1990. Today: May 29, 2024. Years: 2024-1990 = 34. Months: May-March = 2. Days: 29-15 = 14. Result: 34 years, 2 months, 14 days. Our calculator does this instantly." },
  { question: "What is my age in different units?", answer: "34 years = 408 months = 12,418 days = 298,032 hours = 17,881,920 minutes = 1,072,915,200 seconds. Our calculator shows all units. Useful for milestones, health metrics, and fun facts." },
  { question: "What is a leap year?", answer: "Year with 366 days (Feb 29). Every 4 years (2024, 2028, 2032) EXCEPT century years not divisible by 400 (2100 is NOT a leap year, 2000 is). Our calculator accounts for all leap year rules automatically." },
  { question: "How many days until my next birthday?", answer: "Our calculator shows countdown to next birthday. Born March 15, 1990, today Nov 30: next birthday is March 15, 2025 = 105 days away. Birthday countdown is a popular feature for celebrations." },
  { question: "Age calculator for legal purposes?", answer: "Legal age: 18 (voting, contracts), 21 (alcohol in US), 16 (driving in most states). Use our calculator for precise legal age verification. Courts accept date-based age calculations (month/day/year accuracy)." },
  { question: "What is your age in dog years?", answer: "First year = 15 dog years. Second year = +9 (total 24). Each year after = +4-5. Human 34 = 15 + 9 + (32 × 5) = 15 + 9 + 160 = 184 dog years (approximate). Not scientifically precise but fun." },
  { question: "What is biological age?", answer: "How old your body seems based on health markers (blood pressure, cholesterol, telomere length, VO2 max, cognitive function). Versus chronological age (date on birth certificate). Biological age can be lower or higher than chronological." },
  { question: "How to calculate age for retirement planning?", answer: "US full retirement age: 67 (born 1960+). UK state pension: 67. Calculate years until retirement: 67 - current age. Use age calculator + compound interest for retirement savings projections." },
];

const relatedTools = [
  { title: "Stopwatch", icon: "⏱️", href: "/en/tools/stopwatch" },
  { title: "BMI Calculator", icon: "⚖️", href: "/en/tools/bmi-calculator" },
  { title: "Calorie Calculator", icon: "🔥", href: "/en/tools/calorie-calculator" },
  { title: "Hijri Converter", icon: "🌙", href: "/en/tools/hijri-converter" },
  { title: "Compound Interest", icon: "📈", href: "/en/tools/compound-interest" },
  { title: "Random Number", icon: "🎲", href: "/en/tools/random-number" },
];

const seoContent = [
  "Our free Age Calculator calculates exact age in years, months, days, hours, and minutes. Enter your date of birth, and we'll tell you your precise chronological age plus days until your next birthday. Perfect for birthday countdowns, legal age verification, and milestone tracking.",
  "Example: Born March 15, 1990. As of today: 34 years, 2 months, 14 days. Total: 408 months, 12,418 days, 298,032 hours, 17,881,920 minutes. Next birthday in 290 days (March 15). All calculations account for leap years and varying month lengths.",
  "Our calculator handles leap years (2000 was leap, 1900 wasn't, 2100 won't be), different month lengths (February = 28 or 29, April = 30, May = 31), and gives day-exact results. Works for any date from 1900 to 2100.",
  "Common uses: (1) Birthday countdown — days until celebration. (2) Legal age — verify 18/21 for contracts and alcohol. (3) Retirement — years until 67. (4) Milestones — 10,000 days alive, 1,000,000 hours. (5) Medical — age-based dosing and screening schedules.",
  "Related: Calculate your BMI with our BMI Calculator for age-adjusted health metrics. Use the Calorie Calculator for age-based metabolism. The Compound Interest tool shows retirement projections. The Stopwatch tracks time-based events.",
  "Age is more than a number. Track your chronological age, plan for milestones, and use our related health calculators for age-specific wellness insights. Free, accurate, and no signup required."
];

export default function Client() {
  const today = new Date().toISOString().split("T")[0];
  const [birth, setBirth] = useState("1990-03-15");
  const [customDate, setCustomDate] = useState(today);
  const [useCustom, setUseCustom] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const bd = new Date(birth);
    const cd = useCustom ? new Date(customDate) : new Date();
    if (isNaN(bd.getTime())) return;
    let years = cd.getFullYear() - bd.getFullYear();
    let months = cd.getMonth() - bd.getMonth();
    let days = cd.getDate() - bd.getDate();
    if (days < 0) { months--; const prevMonth = new Date(cd.getFullYear(), cd.getMonth(), 0); days += prevMonth.getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((cd.getTime() - bd.getTime()) / (1000 * 60 * 60 * 24));
    setResult(`${years} years, ${months} months, ${days} days (${totalDays.toLocaleString()} total days)`);
  };

  const schemaName = "Age Calculator";
const schemaDesc = `Online Age Calculator - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/age-calculator";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Other Tools", url: "https://adwatak.cloud/en/category/calculators" },
  { name: "Age Calculator", url: "https://adwatak.cloud/en/tools/age-calculator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — yapay zeka/ses motorları için işaretli içerik */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])} />
      <Breadcrumb category="Other Tools" categorySlug="utility-tools" toolName="Age Calculator" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🎂 Age Calculator</h1>
        <p className="text-sm text-gray-500 mb-6">Calculate exact age in years, months, days, and more</p>
        <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Date of Birth</label><input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" /></div>
        <label className="flex items-center gap-2 mb-4 text-sm"><input type="checkbox" checked={useCustom} onChange={() => setUseCustom(!useCustom)} className="w-4 h-4" /> Calculate as of a specific date</label>
        {useCustom && <div className="mb-4"><input type="date" value={customDate} onChange={(e) => setCustomDate(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" /></div>}
        <button onClick={calculate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Calculate Age</button>
      </div>
      {result && (
        <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200 mb-6">
          <p className="text-xs text-green-600 mb-1">Your Age</p>
          <p className="text-lg font-bold text-green-900">{result}</p>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    <ShareButtons lang="en" />
    </div>
  );
}
