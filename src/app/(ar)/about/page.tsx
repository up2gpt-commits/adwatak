export const metadata = {
  title: "عن الموقع — أدواتك",
  description: "أدواتك هي منصة عربية مجانية تقدم أكثر من 40 أداة تفاعلية باللغة العربية — حاسبات مالية، أدوات إسلامية، مولدات، ومحولات. بدون تسجيل وبدون إعلانات مزعجة.",
  alternates: {
    canonical: "https://adwatak.cloud/about",
  },
};
export default function AboutPage() {
  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <div style={{ background: "white", borderRadius: "16px", padding: "40px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>عن أدواتك</h1>
        <div style={{ width: "60px", height: "4px", background: "#2563eb", borderRadius: "2px", marginBottom: "24px" }} />
        <div style={{ fontSize: "0.95rem", color: "#4b5563", lineHeight: 2 }}>
          <p style={{ marginBottom: "16px" }}>
            <strong>أدواتك</strong> هي منصة عربية مجانية تهدف لتوفير أدوات تفاعلية عالية الجودة باللغة العربية.
            تأسست المنصة بإيمان بأن الأدوات الرقمية يجب أن تكون متاحة للجميع — مجانية، سهلة الاستخدام،
            وبدون الحاجة لإنشاء حساب.
          </p>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", margin: "24px 0 12px" }}>ماذا نقدم؟</h2>
          <ul style={{ paddingRight: "20px", marginBottom: "16px" }}>
            <li style={{ marginBottom: "8px" }}><strong>حاسبات مالية:</strong> قرض عقاري، قرض شخصي، تقسيط، EMI، هامش ربح، ضريبة مضافة، راتب صافي، محوّل عملات، فائدة مركبة، وحاسبة الذهب.</li>
            <li style={{ marginBottom: "8px" }}><strong>أدوات إسلامية:</strong> حاسبة الميراث الإسلامي، حاسبة الزكاة، تحويل هجري/ميلادي، حاسبة العمر، مواقيت الصلاة، واتجاه القبلة.</li>
            <li style={{ marginBottom: "8px" }}><strong>أدوات نصية:</strong> عداد الكلمات، تحويل حالة النص، تحويل الأرقام لحروف، مولد النص العربي، تنظيف النص، ومقارنة النصوص.</li>
            <li style={{ marginBottom: "8px" }}><strong>محولات:</strong> دمج PDF، صورة إلى PDF، تحويل الوحدات، وتحويل الألوان.</li>
            <li style={{ marginBottom: "8px" }}><strong>أدوات تطوير:</strong> JSON Formatter، Base64 Encoder، وHash Generator.</li>
            <li style={{ marginBottom: "8px" }}><strong>مولدات:</strong> QR Code، رابط واتساب، كلمات سر، فواتير، أرقام عشوائية، وأسماء.</li>
          </ul>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", margin: "24px 0 12px" }}>لماذا أدواتك؟</h2>
          <ul style={{ paddingRight: "20px", marginBottom: "16px" }}>
            <li style={{ marginBottom: "8px" }}>مجانية 100٪ — بدون رسوم خفية</li>
            <li style={{ marginBottom: "8px" }}>بدون تسجيل — استخدم أي أداة فوراً</li>
            <li style={{ marginBottom: "8px" }}>تعمل بالكامل في المتصفح — بياناتك لا تغادر جهازك</li>
            <li style={{ marginBottom: "8px" }}>مُحدثة حسب الأنظمة السعودية والإماراتية والمصرية</li>
            <li style={{ marginBottom: "8px" }}>تصميم يعمل على الجوال والكمبيوتر</li>
          </ul>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", margin: "24px 0 12px" }}>التقنية</h2>
          <p>
            مبني بـ <strong>Next.js</strong> — إطار عمل حديث يضمن سرعة عالية وأداء ممتاز.
            جميع الأدوات تعمل محلياً في المتصفح (Client-side) مما يضمن خصوصية بياناتك.
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "32px" }}>
        <a href="/" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>← العودة للرئيسية</a>
      </div>
    </div>
  );
}
