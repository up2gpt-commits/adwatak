#!/usr/bin/env python3
"""Create EN pages for missing English tools."""
import os, json

# EN page template for simple tools
TEMPLATE = """"use client";
import {{ useState }} from "react";
import StructuredData, {{ toolSchema, faqSchema, breadcrumbSchema }} from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = {faqs};

const relatedTools = {related};

const seoContent = {seo};

export default function {comp}() {{
  {logic}
  const schemaName = "{name_en}";
  const schemaDesc = `Online {name_en} - free tool`;
  const schemaCategory = "Utility";
  const schemaUrl = "https://adwatak.cloud/en/tools/{slug}";
  const breadcrumbItems = [
    {{ name: "Home", url: "https://adwatak.cloud/en" }},
    {{ name: "{cat}", url: "https://adwatak.cloud/en/tools/{cat_slug}" }},
    {{ name: "{name_en}", url: "https://adwatak.cloud/en/tools/{slug}" }},
  ];
  return (
    <div className="max-w-[760px] mx-auto">
      <StructuredData data={{toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)}} />
      <StructuredData data={{faqSchema(faqs)}} />
      <StructuredData data={{breadcrumbSchema(breadcrumbItems)}} />
      <Breadcrumb category="{cat}" categorySlug="{cat_slug}" toolName="{name_en}" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">{heading}</h1>
        <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
        {ui}
      </div>
      <SEOContent content={{seoContent}} lang="en" />
      <FAQSection faqs={{faqs}} lang="en" />
      <RelatedTools tools={{relatedTools}} lang="en" />
      <ShareButtons lang="en" />
    </div>
  );
}}
"""

pages = []

# 1. Currency Converter
pages.append({
    "slug": "currency-converter",
    "comp": "CurrencyConverter",
    "name_en": "Currency Converter",
    "cat": "Converters",
    "cat_slug": "converters",
    "heading": "💱 Currency Converter",
    "subtitle": "Convert between world currencies instantly",
    "faqs": json.dumps([
        {"question":"What currencies are supported?","answer":"12+ currencies: Saudi Riyal (SAR), UAE Dirham (AED), Egyptian Pound (EGP), Kuwaiti Dinar (KWD), Qatari Riyal (QAR), Omani Rial (OMR), Bahraini Dinar (BHD), US Dollar (USD), Euro (EUR), British Pound (GBP), Turkish Lira (TRY), Jordanian Dinar (JOD)."},
        {"question":"Where do exchange rates come from?","answer":"Rates shown are mid-market rates (average of buy/sell). Banks and exchange offices add 1-5% margin. Actual rates vary by provider. Use our tool as an estimate, then check with your bank for exact rates."},
        {"question":"Why do exchange rates differ between places?","answer":"Banks add a spread (profit margin) that varies. Airport exchange offices charge the most (2-5%). Online transfers usually give the best rate. In KSA, Al-Rajhi Bank and STC Pay offer competitive rates."},
        {"question":"Are GCC currencies pegged to the USD?","answer":"Yes, most GCC currencies are pegged: SAR = 3.75 USD, AED = 3.67, QAR = 3.64. KWD is the most valuable currency globally and is not fully pegged to the USD. EGP and TRY float freely."},
        {"question":"How to get the best exchange rate?","answer":"Avoid airport exchange offices (worst rates). Use online banks (STC Pay, Wise, Revolut). Transfer larger amounts for better rates. Monitor rates for a few days before converting large sums."},
        {"question":"Can I convert SAR to USD?","answer":"1 SAR = 0.267 USD (fixed peg). 1,000 SAR = 267 USD. The SAR-USD rate is stable because of the currency peg. Bank margin is typically 0.5-1% on this pair."},
        {"question":"What's the buy/sell spread?","answer":"Buy price = what the bank sells you currency at. Sell price = what the bank pays when you sell currency. The difference is the bank's profit margin (spread). Our tool shows mid-rate between buy and sell."},
        {"question":"Do you support crypto?","answer":"No, we only support traditional fiat currencies. For crypto conversions, use specialized platforms like Binance or Coinbase."},
        {"question":"How to use this for travel planning?","answer":"Enter your home currency amount, select your destination currency. The result shows approximate value. Add 2-3% for bank margins to get a realistic budget. Check rates a week before traveling."},
        {"question":"Is EUR important for Arabs?","answer":"Yes — many Arab companies trade with Europe. EUR is the second-largest reserve currency globally. Eurozone is a top trade partner for MENA countries. Useful for travel to Europe."},
        {"question":"Why is KWD the most valuable currency?","answer":"Kuwait has a strong economy, large oil reserves, and a sovereign wealth fund. KWD is not fully pegged to USD — it's pegged to a basket of currencies. 1 KWD ≈ 3.25 USD."},
        {"question":"Best time to convert currency?","answer":"Weekdays 8am-10pm London time (Sunday-Thursday). Avoid weekends (markets closed, wider spreads). Avoid major economic news days (Fed decisions, employment reports, OPEC meetings)."}
    ]),
    "related": json.dumps([
        {"title":"VAT Calculator","icon":"🏛️","href":"/en/tools/vat-calculator"},
        {"title":"Profit Margin","icon":"📈","href":"/en/tools/profit-margin"},
        {"title":"Gold Calculator","icon":"🥇","href":"/en/tools/gold-calculator"},
        {"title":"Loan Calculator","icon":"💰","href":"/en/tools/loan-calculator"},
        {"title":"Salary Calculator","icon":"💵","href":"/en/tools/salary-calculator"},
        {"title":"Unit Converter","icon":"📏","href":"/en/tools/unit-converter"}
    ]),
    "seo": json.dumps([
        "Convert between 12+ world currencies instantly — SAR, AED, EGP, KWD, USD, EUR, GBP, TRY, and more. Enter the amount, select currencies, and get the result. Mid-market rates for reference.",
        "GCC currencies are pegged to the USD (except KWD). SAR = 3.75, AED = 3.67, QAR = 3.64. EGP and TRY float freely. Use the converter for travel planning, online shopping, and business calculations.",
        "Tip for travelers: Airport exchange rates are the worst. Only exchange 1-2 days worth at the airport. Use STC Pay, Wise, or Revolut for better rates on the rest. Check rates before traveling.",
        "For businesses: Rates shown are indicative. For large commercial transfers, contact your bank directly for competitive quotes. Banks offer better rates for larger amounts (10,000+ USD)."
    ]),
    "logic": """
  const [amount, setAmount] = useState("");
  const rates = {SAR:1, AED:1.02, EGP:12.5, KWD:0.075, QAR:0.99, USD:0.267, EUR:0.245, GBP:0.212, BHD:0.1, OMR:0.105, JOD:0.189, TRY:3.8};
  const [from, setFrom] = useState("SAR");
  const [to, setTo] = useState("USD");
  const [result, setResult] = useState(null);
  const convert = () => {
    const a = parseFloat(amount);
    if (a <= 0) return;
    const inSAR = a / rates[from];
    const converted = inSAR * rates[to];
    setResult({amount: a, from, to, converted, rate: rates[to]/rates[from]});
  };
""",
    "ui": """
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" placeholder="1,000" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">
              {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">To</label>
            <select value={to} onChange={(e) => setTo(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl text-base outline-none font-inherit bg-white">
              {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-2">Mid-market rates — banks add margin</p>
        <button onClick={convert}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          Convert
        </button>
        {result && (
          <div className="bg-green-50 rounded-xl p-6 text-center border border-green-200 mt-6">
            <p className="text-xs text-green-600">{result.amount.toLocaleString()} {result.from} =</p>
            <p className="text-3xl font-black text-green-900 my-2">{result.converted.toFixed(2)} {result.to}</p>
            <p className="text-xs text-gray-500">Rate: 1 {result.from} = {result.rate.toFixed(4)} {result.to}</p>
          </div>
        )}
"""
})

for p in pages:
    content = TEMPLATE.format(**p)
    fname = f"src/app/en/tools/{p['slug']}/page.tsx"
    os.makedirs(os.path.dirname(fname), exist_ok=True)
    with open(fname, "w") as f:
        f.write(content)
    print(f"✅ Created {fname}")

print("\nDone!")
