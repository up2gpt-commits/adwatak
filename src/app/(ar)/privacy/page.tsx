export const metadata = {
  title: "سياسة الخصوصية — أدواتك",
  description: "سياسة الخصوصية لمنصة أدواتك — كيف نتعامل مع بياناتك، ما المعلومات التي نجمعها، وحقوقك كمستخدم.",
  alternates: {
    canonical: "https://adwatak.cloud/privacy",
  },
};
export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <div style={{ background: "white", borderRadius: "16px", padding: "40px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>سياسة الخصوصية</h1>
        <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "24px" }}>آخر تحديث: مايو 2026</p>
        <div style={{ fontSize: "0.95rem", color: "#4b5563", lineHeight: 2 }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", margin: "24px 0 12px" }}>التزامنا بالخصوصية</h2>
          <p style={{ marginBottom: "16px" }}>
            في <strong>أدواتك</strong>، خصوصيتك أولوية. جميع الأدوات تعمل محلياً في متصفحك — بياناتك لا تُرسل لأي خادم.
            لا نجمع معلومات شخصية عند استخدام الأدوات.
          </p>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", margin: "24px 0 12px" }}>المعلومات التي نجمعها</h2>
          <p style={{ marginBottom: "16px" }}>
            عند زيارة الموقع، قد نجمع معلومات تقنية محدودة مثل: نوع المتصفح، نظام التشغيل، وعنوان IP.
            تُستخدم هذه المعلومات لتحسين أداء الموقع وتحليل الاستخدام عبر خدمات مثل Google Analytics.
          </p>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", margin: "24px 0 12px" }}>ملفات تعريف الارتباط (Cookies)</h2>
          <p style={{ marginBottom: "16px" }}>
            نستخدم ملفات تعريف الارتباط لتحسين تجربتك. قد نستخدم أيضاً خدمات طرف ثالث مثل Google AdSense
            التي تستخدم ملفات تعريف ارتباط خاصة بها لعرض إعلانات مخصصة.
          </p>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", margin: "24px 0 12px" }}>خدمات الطرف الثالث</h2>
          <p style={{ marginBottom: "16px" }}>
            قد نستخدم خدمات مثل Google Analytics وGoogle AdSense. هذه الخدمات لها سياسات خصوصية مستقلة.
            نوصي بمراجعة سياسات الخصوصية الخاصة بها.
          </p>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", margin: "24px 0 12px" }}>حماية البيانات</h2>
          <p style={{ marginBottom: "16px" }}>
            بما أن جميع الأدوات تعمل في المتصفح، فإن بياناتك المالية والشخصية لا تُحفظ على أي خادم.
            لا نبيع أو نشارك معلوماتك الشخصية مع أطراف ثالثة.
          </p>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", margin: "24px 0 12px" }}>التواصل</h2>
          <p>
            لأي استفسارات حول سياسة الخصوصية، تواصل معنا عبر:
            <a href="mailto:contact@adwatak.cloud" style={{ color: "#2563eb", textDecoration: "none" }}> contact@adwatak.cloud</a>
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "32px" }}>
        <a href="/" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>← العودة للرئيسية</a>
      </div>
    </div>
  );
}
