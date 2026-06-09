export const metadata = {
  title: "شروط الخدمة — أدواتك",
  description:
    "شروط استخدام منصة أدواتك — يرجى قراءة هذه الشروط قبل استخدام الموقع.",
  alternates: {
    canonical: "https://adwatak.cloud/terms",
  },
};
export default function TermsPage() {
  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <div style={{ background: "white", borderRadius: "16px", padding: "40px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>شروط الخدمة</h1>
        <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "24px" }}>آخر تحديث: يونيو 2026</p>
        <div style={{ fontSize: "0.95rem", color: "#4b5563", lineHeight: 2 }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", margin: "24px 0 12px" }}>القبول بالشروط</h2>
          <p style={{ marginBottom: "16px" }}>
            باستخدامك لمنصة <strong>أدواتك</strong> (adwatak.cloud)، فإنك توافق على هذه الشروط.
            إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام الموقع.
          </p>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", margin: "24px 0 12px" }}>استخدام الأدوات</h2>
          <p style={{ marginBottom: "16px" }}>
            جميع الأدوات المتاحة على المنصة مجانية وتعمل بالكامل في متصفح المستخدم.
            نحن لا نتحمل مسؤولية دقة النتائج التي تقدمها الأدوات — يُنصح بالتحقق من النتائج المهمة عبر مصادر مستقلة.
          </p>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", margin: "24px 0 12px" }}>الملكية الفكرية</h2>
          <p style={{ marginBottom: "16px" }}>
            جميع حقوق الملكية الفكرية للمنصة ومحتواها محفوظة لأدواتك. لا يُسمح بنسخ أو إعادة توزيع المحتوى دون إذن كتابي.
          </p>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", margin: "24px 0 12px" }}>إخلاء المسؤولية</h2>
          <p style={{ marginBottom: "16px" }}>
            الأدوات المالية والإسلامية تقدم لأغراض إرشادية فقط. لا تشكل النتائج استشارة مالية أو شرعية.
            يُرجى استشارة متخصصين مؤهلين للقرارات المهمة.
          </p>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", margin: "24px 0 12px" }}>روابط الطرف الثالث</h2>
          <p style={{ marginBottom: "16px" }}>
            قد يحتوي الموقع على روابط لمواقع خارجية. نحن غير مسؤولين عن محتوى أو سياسات هذه المواقع.
          </p>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", margin: "24px 0 12px" }}>تعديل الشروط</h2>
          <p style={{ marginBottom: "16px" }}>
            نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعار المستخدمين عبر تحديث تاريخ "آخر تحديث".
          </p>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", margin: "24px 0 12px" }}>التواصل</h2>
          <p>
            للاستفسارات حول شروط الخدمة، تواصل معنا عبر:
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
