"use client";
import { useState } from "react";
import StructuredData, { howToSchema, speakableSchema, toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import FAQSection from "../../../components/FAQSection";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما طول كلمة السر المثالي؟", answer: "12 حرف كحد أدنى، 16-20 حرف أفضل. كل حرف إضافي يزيد الصعوبة أضعافاً. كلمة سر 12 حرف = 62^12 تركيب (تقريباً 3 × 10^21). كلمة سر 20 حرف = 62^20 (غير قابل للكسر حالياً)." },
  { question: "هل كلمات السر المولدة آمنة؟", answer: "نعم، تُولّد عشوائياً في متصفحك (Client-side) ولا تُرسل لأي خادم. تستخدم Math.random() وهو آمن للأغراض العامة. للحساسية العالية، استخدم crypto.getRandomValues()." },
  { question: "كم مرة أغير كلمة السر؟", answer: "كل 3-6 أشهر للحسابات الحساسة (البنك، الإيميل). فوراً عند الاشتباه باختراق. استخدم كلمة سر مختلفة لكل حساب. لا تعيد استخدام نفس كلمة السر في موقعين." },
  { question: "كيف أحفظ كلمات سري كثيرة بدون نسيانها؟", answer: "استخدم مدير كلمات سر (Password Manager) مثل LastPass، 1Password، Bitwarden، أو Dashlane. مدير الكلمات يولد ويحفظ كلمات سر قوية ويحشوها تلقائياً. تذكر كلمة سر رئيسية واحدة فقط." },
  { question: "ما هي صفات كلمة السر القوية؟", answer: "طويلة (12+ حرف)، متنوعة (أحرف كبيرة + صغيرة + أرقام + رموز)، غير مفهومة (ليس كلمة قاموس أو اسم أو تاريخ ميلاد)، وفريدة (مختلفة لكل حساب). 'P@ssw0rd123!' ضعيفة — المخترقون يعرفون هذه البدائل." },
  { question: "ما هي أكثر كلمات السر شيوعاً (وأضعفها)؟", answer: "أضعف كلمات السر: 123456، password، 123456789، qwerty، 12345، 12345678، abc123، password1، 1234567890، admin. لا تستخدم أياً منها — المخترقون يجربونها أولاً." },
  { question: "ما هو التحقق بخطوتين (2FA)؟", answer: "طبقة أمان إضافية بعد كلمة السر — عادةً رمز يصل لهاتفك (SMS) أو تطبيق مصادق (Google Authenticator, Authy). حتى لو سرقوا كلمة سرك، يحتاجون الرمز الثاني. فعّل 2FA في كل حساب يدعمه." },
  { question: "هل كتابة كلمات السر على ورقة آمنة؟", answer: "أكثر أماناً من استخدام كلمة سر ضعيفة أو تكرارها. لكن الورقة قد تُفقد أو تُسرق. الأفضل: مدير كلمات سر + نسخة احتياطية ورقية لكلمة السر الرئيسية في مكان آمن." },
  { question: "كيف أختبر قوة كلمة السر؟", answer: "استخدم مولد كلمات السر في أدواتك — ثم اختبر قوتها. المواقع الآمنة تظهر مؤشر قوة الكلمة (ضعيف، متوسط، قوي). كلمة سر قوية جداً تحتاج مليارات السنين لكسرها بـ Brute Force." },
  { question: "لماذا لا تستخدم كلمة سر واحدة لكل المواقع؟", answer: "إذا اخترق موقع واحد وسرب كلمة سرك، المخترق سيجربها على كل المواقع الأخرى (Credential Stuffing). كل موقع يحتاج كلمة سر فريدة. مدير الكلمات يحل هذه المشكلة." },
  { question: "ما الفرق بين الرموز المسموح والممنوع في كلمات السر؟", answer: "معظم المواقع تقبل: !@#$%^&*()_+-=[]{}|;':\",./<>?~. بعض المواقع تمنع بعض الرموز (خاصة <> و &). مولدنا يستخدم رموزاً آمنة: !@#$%^&*()_+-=" },
  { question: "هل كلمة السر الطويلة أفضل من المعقدة؟", answer: "نعم! 'elephant-dancing-banana-sunshine-rainbow' (43 حرف) أقوى من 'P@ssw0rd!' (9 أحرف) رغم أن الثانية فيها رموز. الطول أهم من التعقيد. كلمة سر 20 حرف بسيطة أقوى من 10 أحرف معقدة." },
];

const relatedTools = [
  { title: "Hash Generator", icon: "#️⃣", href: "/tools/hash-generator" },
  { title: "Base64 Encoder", icon: "🔄", href: "/tools/base64-encoder" },
  { title: "JSON Formatter", icon: "📋", href: "/tools/json-formatter" },
  { title: "QR Code Generator", icon: "🔳", href: "/tools/qr-generator" },
  { title: "مولد أسماء", icon: "👤", href: "/tools/name-generator" },
  { title: "مولد أرقام عشوائية", icon: "🎲", href: "/tools/random-number" },
];

const seoContent = [
  "مولد كلمات السر القوية يُنشئ كلمات سر عشوائية يصعب تخمينها. يمكنك تخصيص الطول (8-64 حرف) — كلما زاد الطول، زادت القوة. اضغط 'ولّد' وانسخ النتيجة مباشرة.",
  "كلمة السر القوية يجب أن تكون 12 حرفاً على الأقل وتضم مزيجاً من: أحرف كبيرة (A-Z)، أحرف صغيرة (a-z)، أرقام (0-9)، ورموز خاصة (!@#$%^&*). هذا المزيج يخلق مليارات التركيبات الممكنة.",
  "أهم قاعدة: لا تستخدم نفس كلمة السر في موقعين. استخدم مولد كلمات السر لكل موقع على حدة. استخدم مدير كلمات سر (Bitwarden, LastPass) لحفظها. فعّل التحقق بخطوتين (2FA) لكل حساب مهم.",
  "كم من الوقت لكسر كلمة سرك؟ 8 أحرف (أرقام + أحرف صغيرة): 5 دقائق. 12 حرف (مزيج كامل): 200 سنة. 16 حرف: 100 مليار سنة. 20 حرف: غير قابل للكسر عملياً. كل حرف إضافي يضرب الصعوبة في 62.",
  "الأداة مجانية وآمنة — كل التوليد في متصفحك، لا ترسل كلمة السر لأي خادم. استخدمها لتوليد كلمات سر لحساباتك: الإيميل، البنك، وسائل التواصل، المواقع الحكومية، وأي حساب مهم.",
  "نصيحة إضافية: غير كلمة سرك فوراً إذا: 1) سمعت عن اختراق موقع تستخدمه. 2) استخدمت كلمة سر ظهرت في قوائم التسريب (تحقق على haveibeenpwned.com). 3) استخدمها حد آخر."
];

export default function Client() {
  const [length, setLength] = useState("16");
  const [password, setPassword] = useState("");

  const generate = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
    let p = "";
    for (let i = 0; i < parseInt(length); i++) p += chars.charAt(Math.floor(Math.random() * chars.length));
    setPassword(p);
  };

  const schemaName = "مولد كلمات السر";
const schemaDesc = `Online مولد كلمات السر - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/password-generator";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "مولدات", url: "https://adwatak.cloud/category/calculators" },
  { name: "مولد كلمات السر", url: "https://adwatak.cloud/tools/password-generator" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      {/* GEO: Speakable — marks key content for AI/voice engines */}
      <StructuredData data={speakableSchema(["h1", "h2", "main"])}
      />
      <Breadcrumb lang="ar" category="مولدات" categorySlug="generators" toolName="مولد كلمات السر" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🔐 مولد كلمات السر</h1>
        <p className="text-sm text-gray-500 mb-6">إنشاء كلمات سر قوية وآمنة</p>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">الطول</label>
          <input type="number" value={length} onChange={(e) => setLength(e.target.value)} min="8" max="64"
            className="w-full p-3 border-2 border-gray-200 rounded-xl text-lg outline-none" />
        </div>
        <button onClick={generate}
          className="bg-blue-600 text-white font-bold p-3 rounded-xl border-none text-lg w-full cursor-pointer">
          ولّد كلمة سر
        </button>
      </div>
      {password && (
        <div className="bg-green-50 rounded-xl p-5 mb-6 text-center border border-green-200">
          <p className="font-mono text-xl font-bold break-all">{password}</p>
        </div>
      )}
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
