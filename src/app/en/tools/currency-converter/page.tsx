"use client";
import { useState, useEffect } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const currencies = [
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "EGP", name: "Egyptian Pound", flag: "🇪🇬" },
  { code: "KWD", name: "Kuwaiti Dinar", flag: "🇰🇼" },
  { code: "QAR", name: "Qatari Riyal", flag: "🇶🇦" },
  { code: "OMR", name: "Omani Rial", flag: "🇴🇲" },
  { code: "BHD", name: "Bahraini Dinar", flag: "🇧🇭" },
  { code: "JOD", name: "Jordanian Dinar", flag: "🇯🇴" },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷" },
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
];

const faqs = [
  { question: "What currencies are supported?", answer: "14+ currencies: Saudi Riyal (SAR), UAE Dirham (AED), Egyptian Pound (EGP), Kuwaiti Dinar (KWD), Qatari Riyal (QAR), Omani Rial (OMR), Bahraini Dinar (BHD), US Dollar (USD), Euro (EUR), British Pound (GBP), Turkish Lira (TRY), Jordanian Dinar (JOD), Chinese Yuan (CNY), Indian Rupee (INR)." },
  { question: "Where do exchange rates come from?", answer: "Rates shown are mid-market rates from an open-source currency API updated daily. Banks and exchange offices add 1-5% margin. Use our tool as an estimate, then check with your bank for exact rates." },
  { question: "Are GCC currencies pegged to USD?", answer: "Yes, most GCC currencies are pegged: SAR = 3.75, AED = 3.67, QAR = 3.64, BHD = 0.376, OMR = 0.384 per USD. KWD is the most valuable currency globally and not fully pegged. EGP and TRY float freely." },
  { question: "How to get the best exchange rate?", answer: "Avoid airport exchange offices (worst rates). Use Wise, Revolut, or STC Pay. Transfer larger amounts for better rates. Monitor rates for a few days before converting large sums." },
  { question: "Can I convert SAR to USD?", answer: "1 SAR = 0.267 USD (fixed peg). 1,000 SAR = 267 USD. The SAR-USD rate is stable due to the currency peg. Bank margin is typically 0.5-1% on this pair." },
  { question: "What's the buy/sell spread?", answer: "Buy price = what the bank sells you currency at. Sell price = what the bank pays when you sell currency. The difference is the bank's profit margin (spread). Our tool shows mid-rate." },
  { question: "Do you support crypto?", answer: "No, we only support traditional fiat currencies. For crypto conversions, use specialized platforms like Binance or Coinbase." },
  { question: "How to use this for travel?", answer: "Enter your home currency amount, select your destination currency. Add 2-3% for bank margins to get a realistic budget. Check rates a week before traveling." },
  { question: "Why is KWD the most valuable currency?", answer: "Kuwait has a strong economy, large oil reserves, and a sovereign wealth fund. KWD is pegged to a basket of currencies (not just USD). 1 KWD ≈ 3.25 USD." },
  { question: "Best time to convert currency?", answer: "Weekdays during London market hours (Sunday-Thursday 8am-10pm). Avoid weekends (markets closed, wider spreads). Avoid major economic news days." },
];

const relatedTools = [
  { title: "VAT Calculator", icon: "🏛️", href: "/en/tools/vat-calculator" },
  { title: "Profit Margin", icon: "📈", href: "/en/tools/profit-margin" },
  { title: "Gold Calculator", icon: "🥇", href: "/en/tools/gold-calculator" },
  { title: "Loan Calculator", icon: "💰", href: "/en/tools/loan-calculator" },
  { title: "Unit Converter", icon: "📏", href: "/en/tools/unit-converter" },
  { title: "Salary Calculator", icon: "💵", href: "/en/tools/salary-calculator" },
];

const seoContent = [
  "Convert between 14+ world currencies instantly — SAR, AED, EGP, KWD, USD, EUR, GBP, and more. Enter the amount, select currencies, and get the result with live mid-market rates.",
  "GCC currencies are pegged to USD (except KWD). SAR = 3.75, AED = 3.67, QAR = 3.64. EGP and TRY float freely. Use the converter for travel planning, online shopping, and business.",
  "Tip for travelers: Airport rates are the worst. Exchange only for the first day there, use Wise or STC Pay for the rest. Check rates before traveling to budget accurately.",
  "For businesses: Rates shown are indicative. For large transfers, contact your bank for competitive quotes. Banks offer better rates for amounts over 10,000 USD.",
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState("SAR");
  const [to, setTo] = useState("USD");
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRate = async (f: string, t: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/currency-proxy");
      const data = await res.json();
      const rates = data?.usd;
      const fromLower = f.toLowerCase();
      const toLower = t.toLowerCase();
      if (rates?.[fromLower] && rates?.[toLower]) {
        // Cross rate: rate = rates[to] / rates[from]
        const crossRate = rates[toLower] / rates[fromLower];
        setRate(crossRate);
        setLastUpdated(data.date || "");
      } else {
        setError("Unable to get exchange rate");
      }
    } catch {
      setError("Failed to connect to rates service");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRate(from, to);
  }, [from, to]);

  useEffect(() => {
    if (rate !== null && amount) {
      const a = parseFloat(amount);
      setResult(isNaN(a) ? null : a * rate);
    } else {
      setResult(null);
    }
  }, [rate, amount]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const schemaName = "Currency Converter";
  const schemaDesc = "Online Currency Converter — live mid-market rates";
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/en/tools/currency-converter";
  const breadcrumbItems = [
    { name: "Home", url: "https://adwatak.cloud/en" },
    { name: "Converters", url: "https://adwatak.cloud/en/tools/converters" },
    { name: "Currency Converter", url: "https://adwatak.cloud/en/tools/currency-converter" },
  ];

  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
      <StructuredData data={faqSchema(faqs)} />
      <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Converters" categorySlug="converters" toolName="Currency Converter" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">💱 Currency Converter</h1>
        <p className="text-sm text-gray-500 mb-6">Live exchange rates — updated daily</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="1,000" />
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-end">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">From</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">
                {currencies.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}
              </select>
            </div>
            <button onClick={swap}
              className="bg-gray-200 hover:bg-gray-300 rounded-xl p-3 text-lg transition-all cursor-pointer border-none mb-0.5">
              🔄
            </button>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">To</label>
              <select value={to} onChange={(e) => setTo(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">
                {currencies.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}
              </select>
            </div>
          </div>

          {loading && <p className="text-sm text-gray-400 text-center">⏳ Loading rates...</p>}
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {result !== null && !loading && !error && (
            <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200">
              <p className="text-xs text-green-600">{parseFloat(amount || "0").toLocaleString("en-US")} {from} =</p>
              <p className="text-3xl font-black text-green-900 my-2">{result.toLocaleString("en-US", { maximumFractionDigits: 2 })} {to}</p>
              <p className="text-xs text-gray-500">Rate: 1 {from} = {(rate || 0).toFixed(6)} {to}</p>
              {lastUpdated && <p className="text-xs text-gray-400 mt-1">📅 Last updated: {lastUpdated}</p>}
            </div>
          )}

          {!loading && !error && rate === null && (
            <p className="text-sm text-gray-400 text-center">This currency pair is not supported. Try another pair.</p>
          )}
        </div>
      </div>
      <SEOContent content={seoContent} lang="en" />
      <FAQSection faqs={faqs} lang="en" />
      <RelatedTools tools={relatedTools} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}
