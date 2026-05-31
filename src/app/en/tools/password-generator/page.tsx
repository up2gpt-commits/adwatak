"use client";
import { useState } from "react";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import Breadcrumb from "../../../components/Breadcrumb";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";

const faqs = [
  { question: "What makes a strong password?", answer: "At least 12+ characters, mix of uppercase, lowercase, numbers, and symbols. No dictionary words, personal info, or patterns. 'Correct-Horse-Battery-Staple' (random words) is strong and memorable. 'P@ssw0rd123!' is weak despite symbols." },
  { question: "How long should a password be?", answer: "8 chars = cracked instantly. 10 chars = hours-days. 12 chars = centuries. 14+ chars = effectively uncrackable with current tech. Always aim for 14+ characters. Length matters more than complexity — a long simple password beats a short complex one." },
  { question: "Should I use a password manager?", answer: "Yes — essential in 2024. Password managers generate and store unique passwords for every site. You remember one master password. Top options: Bitwarden (free, open source), 1Password, Apple Keychain, LastPass, Dashlane." },
  { question: "What is 2FA/MFA?", answer: "Two-Factor Authentication — a second layer beyond password. Types: SMS code (least secure — SIM swap attacks), authenticator app (Google Authenticator, Authy — more secure), hardware key (YubiKey — most secure). Always enable 2FA where available." },
  { question: "How often should I change passwords?", answer: "Old advice: every 90 days. Current advice: change only if compromised. Use unique passwords everywhere + 2FA. If a site is breached, change that specific password. NIST now recommends against forced periodic changes." },
  { question: "What is a passphrase?", answer: "A sequence of random words. 'purple-turtle-umbrella-dragon-7' is a passphrase. Easy to remember, hard to crack. XKCD popularized this: 'correct horse battery staple' (44 bits of entropy). Better than 'Tr0ub4dor&3' (28 bits)." },
  { question: "What passwords should I avoid?", answer: "123456 (most common), password, qwerty, letmein, admin, your name, birthdate, pet name, 'password1', company name, asdfghjkl, iloveyou, monkey, master, and any keyboard pattern. 80% of breaches use compromised credentials." },
  { question: "How do hackers crack passwords?", answer: "Brute force (try every combo — slow), dictionary attack (common words first), rainbow tables (precomputed hashes), credential stuffing (use leaked passwords from other sites), phishing (trick user to reveal), and social engineering." },
  { question: "What is entropy in passwords?", answer: "A measure of unpredictability in bits. Each bit doubles the guesses needed. 28 bits (Tr0ub4dor&3) = 268M guesses — cracked in minutes. 44 bits (correct horse) = 17.6T guesses — centuries. Our generator creates passwords with 80+ bits of entropy." },
  { question: "What makes a password weak?", answer: "Common patterns (password1, summer2024), personal info (name, pet, birthday, anniversary), single dictionary word, keyboard pattern (qwerty, 12345), repeating characters (aaa111), and extremely short passwords (<10 chars)." },
  { question: "Can I reuse passwords?", answer: "Never — reusing passwords is the #1 security mistake. If one site is breached, attackers try that password on email, banking, social media. Use a unique password for every site. Password managers make this easy." },
  { question: "What is the most secure password?", answer: "16+ random characters from all 4 types (upper, lower, digit, symbol). Example from our generator: 'kX9#mP2$vL5@nR7&'. 94^16 ≈ 2^104 possible combinations. At 10 billion guesses/second: 10+ billion years to brute force." },
];

const relatedTools = [
  { title: "QR Generator", icon: "📱", href: "/en/tools/qr-generator" },
  { title: "Hash Generator", icon: "#️⃣", href: "/en/tools/hash-generator" },
  { title: "Base64 Encoder", icon: "🔐", href: "/en/tools/base64-encoder" },
  { title: "Random Number", icon: "🎲", href: "/en/tools/random-number" },
  { title: "Word Counter", icon: "📝", href: "/en/tools/word-counter" },
  { title: "Text Case", icon: "🔤", href: "/en/tools/text-case" },
];

const seoContent = [
  "Our Password Generator creates strong, random passwords instantly. Choose length (8-32 characters), include uppercase, lowercase, numbers, and symbols. Every password is generated in your browser — never sent to any server. Free and private.",
  "Example: 16-character password with all character types: 'kX9#mP2$vL5@nR7&'. This password has 94^16 ≈ 2^104 possible combinations. At current cracking speeds, it would take billions of years to break. That's real security.",
  "Short passwords are dangerous: an 8-char password with mixed case and numbers has 62^8 ≈ 218 trillion combinations — crackable in hours with a good GPU. A 14-char password has 62^14 ≈ 12 trillion trillion — effectively uncrackable.",
  "Best practices: Use 14+ character passwords. Generate a random one for each account. Store in a password manager (Bitwarden/1Password). Enable 2FA/MFA everywhere. Never reuse passwords. Use our generator — it's free and privacy-first.",
  "Related: Use with our Hash Generator to verify password integrity. The Random Number tool creates PIN codes. The QR Generator can encode passwords for controlled sharing. The Word Counter helps when passwords have character limits.",
  "Your password is the first line of defense. 80% of data breaches involve weak or stolen passwords. Our generator eliminates the weakest link — human predictability. Generate once per account, store in a password manager, and never look back."
];

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generate = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", lower = "abcdefghijklmnopqrstuvwxyz", num = "0123456789", sym = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let chars = "";
    if (uppercase) chars += upper;
    if (lowercase) chars += lower;
    if (numbers) chars += num;
    if (symbols) chars += sym;
    if (!chars) return;
    let result = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) result += chars[array[i] % chars.length];
    setPassword(result);
  };

  const schemaName = "Password Generator";
const schemaDesc = `Online Password Generator - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/en/tools/password-generator";
const breadcrumbItems = [
  { name: "Home", url: "https://adwatak.cloud/en" },
  { name: "Utility", url: "https://adwatak.cloud/en/tools/utility" },
  { name: "Password Generator", url: "https://adwatak.cloud/en/tools/password-generator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'en', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb category="Security Tools" categorySlug="security-tools" toolName="Password Generator" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔐 Password Generator</h1>
        <p className="text-sm text-gray-500 mb-6">Generate strong, random passwords — client-side and private</p>
        <div className="mb-4"><label className="block text-sm font-semibold text-gray-700 mb-1.5">Length: {length}</label><input type="range" min="8" max="32" value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full" /></div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[{ l: "Uppercase (A-Z)", v: uppercase, s: setUppercase }, { l: "Lowercase (a-z)", v: lowercase, s: setLowercase }, { l: "Numbers (0-9)", v: numbers, s: setNumbers }, { l: "Symbols (!@#$)", v: symbols, s: setSymbols }].map((opt) => (
            <label key={opt.l} className="flex items-center gap-2 text-sm p-3 border-2 border-gray-200 rounded-xl cursor-pointer">
              <input type="checkbox" checked={opt.v} onChange={() => opt.s(!opt.v)} className="w-4 h-4" />
              {opt.l}
            </label>
          ))}
        </div>
        <button onClick={generate} className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">Generate Password</button>
      </div>
      {password && (
        <div className="bg-green-50 rounded-xl p-5 border border-green-200 mb-6 text-center">
          <p className="text-xs text-green-600 mb-1">Your Password</p>
          <p className="text-xl font-mono font-bold text-green-900 select-all break-all">{password}</p>
          <button onClick={() => navigator.clipboard.writeText(password)} className="mt-2 bg-green-600 text-white font-semibold px-4 py-1.5 rounded-xl border-none text-sm cursor-pointer">Copy</button>
        </div>
      )}
      <SEOContent content={seoContent} />
      <FAQSection faqs={faqs} />
      <RelatedTools tools={relatedTools} />
    </div>
  );
}
