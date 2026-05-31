"use client";
import FAQSection from "../../../components/FAQSection";
import StructuredData, { toolSchema, faqSchema, breadcrumbSchema } from "../../../components/StructuredData";
import RelatedTools from "../../../components/RelatedTools";
import SEOContent from "../../../components/SEOContent";
import Breadcrumb from "../../../components/Breadcrumb";
import ShareButtons from "../../../components/ShareButtons";

const faqs = [
  { question: "ما هي القبلة؟", answer: "القبلة هي اتجاه الكعبة المشرفة في مكة المكرمة (21.4225° شمالاً، 39.8262° شرقاً). يتوجه إليها المسلمون في صلاتهم من أي مكان في العالم. أول قبلة للمسلمين كانت المسجد الأقصى ثم حُولت للكعبة في السنة الثانية للهجرة." },
  { question: "هل القبلة هي اتجاه مكة دائماً؟", answer: "نعم تقريباً. لكن الاتجاه الدقيق يختلف حسب موقعك الجغرافي على الكرة الأرضية. في السعودية: القبلة جنوب غرب. في مصر: شرق. في أمريكا: شمال شرق. في أوروبا: جنوب شرق." },
  { question: "كيف أحدد القبلة بدون تطبيق؟", answer: "الشمس والقمر: القبلة تقريباً تجاه الشمس ظهراً بتوقيت مكة 12:18. النجوم: النجم القطبي (في الشمال) — القبلة عكس اتجاهه. الظلال: ظل العصا عند زوال الشمس (قبل الظهر بدقائق) — اتجاه الظل عكس القبلة." },
  { question: "هل يلزم التوجه بالدقة المتناهية للقبلة؟", answer: "المطلب الشرعي هو الجهة وليس الدرجة الدقيقة. اتجاهاً عاماً نحو مكة يكفي. قال ﷺ: 'ما بين المشرق والمغرب قبلة'. يعني لأهل المدينة (وما حولها) الجهة العامة." },
  { question: "ما هي معادلة حساب اتجاه القبلة؟", answer: "تستخدم معادلة هافرسين (Haversine) لحساب الزاوية بين موقعك والكعبة. تحتاج: خط الطول والعرض لموقعك، وخط الطول والعرض للكعبة (21.4225° N, 39.8262° E). الحاسبة تقوم بالباقي." },
  { question: "هل القبلة واحدة في كل مكان؟", answer: "نفس الكعبة يقصدها الجميع. لكن الاتجاه يختلف: في مكة نفسها: تتجه نحو الكعبة مباشرة. في المدينة: جنوب. في الرياض: غرب. في القاهرة: شرق. في لندن: جنوب شرق. في نيويورك: شمال شرق." },
  { question: "ماذا لو كنت في الفضاء؟", answer: "تتجه نحو الكعبة بقدر الإمكان. رائد الفضاء يقرر القبلة حسب ما يستطيع — الجهة العامة تكفي. الأولوية للصلاة في وقتها." },
  { question: "هل تغير اتجاه القبلة عبر التاريخ؟", answer: "لم يتغير. الكعبة ثابتة في مكانها منذ بنائها. الخرائط الحديثة أكدت دقة المساجد القديمة في التوجه للقبلة — بفضل النجوم والظلال." },
  { question: "كيف أعرف اتجاه القبلة في فندق أو مكان جديد؟", answer: "استخدم تطبيق اتجاه القبلة في جوالك — معظم الهواتف الحديثة (iPhone/Android) لها بوصلة مدمجة. أو ابحث عن ملصق القبلة (الموجود غالباً في غرف الفنادق العربية)." },
  { question: "هل البوصلة دقيقة للقبلة؟", answer: "نعم، لكن احذر من التداخل المغناطيسي (الأجهزة الكهربائية، المعادن). ابتعد عن الأجهزة واستخدم تطبيق البوصلة في مكان مفتوح. الفرق الطفيف (2-3 درجات) لا يضر." },
];

const relatedTools = [
  { title: "مواقيت الصلاة", icon: "🕐", href: "/tools/prayer-times" },
  { title: "تحويل هجري ميلادي", icon: "📅", href: "/tools/hijri-converter" },
  { title: "حاسبة الزكاة", icon: "🕌", href: "/tools/zakat-calculator" },
  { title: "حاسبة الميراث", icon: "📜", href: "/tools/inheritance-calculator" },
  { title: "حاسبة العمر", icon: "🎂", href: "/tools/age-calculator" },
  { title: "ساعة إيقاف", icon: "⏱️", href: "/tools/stopwatch" },
];

const seoContent = [
  "أداة تحديد اتجاه القبلة (الكعبة المشرفة في مكة المكرمة) من أي مكان في العالم. تعتمد على حسابات هندسية دقيقة (معادلة هافرسين) لحساب الاتجاه الجغرافي من موقعك إلى الكعبة.",
  "اتجاه القبلة يختلف حسب موقعك: في السعودية القبلة جنوب غرب (الرياض/جدة)، في مصر شرق، في المغرب شرق شمالي، في أمريكا شمال شرق. الحاسبة تحسب الاتجاه الدقيق.",
  "من الأدلة الشرعية: قال الله تعالى 'فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ' (البقرة: 144). وقال ﷺ 'إذا أمرتكم بأمر فأتوا منه ما استطعتم' — التوجه للقبلة بقدر الاستطاعة يكفي.",
  "السماح بالوصول للموقع الجغرافي يعطيك اتجاه القبلة الدقيق مباشرة. بدون إذن الموقع، يمكنك اختيار مدينتك يدوياً. الأداة مجانية بالكامل وتعمل في المتصفح.",
  "الأداة تساعدك على تحديد القبلة في أي مكان: في البيت، الفندق، العمل، السفر، أو حتى في الأماكن المفتوحة. لا تعتمد على البوصلة المغناطيسية فقط — استخدم تطبيقنا للحصول على اتجاهات دقيقة."
];

export default function QiblaDirection() {
  const schemaName = "اتجاه القبلة";
const schemaDesc = `Online اتجاه القبلة - free tool`;
const schemaCategory = "Utility";
const schemaUrl = "https://adwatak.cloud/tools/qibla-direction";
const breadcrumbItems = [
  { name: "الرئيسية", url: "https://adwatak.cloud" },
  { name: "Utility", url: "https://adwatak.cloud/tools/utility" },
  { name: "اتجاه القبلة", url: "https://adwatak.cloud/tools/qibla-direction" },
];
return (
    <div className="max-w-[760px] mx-auto">
        <StructuredData data={toolSchema(schemaName, schemaDesc, schemaUrl, 'ar', schemaCategory)} />
        <StructuredData data={faqSchema(faqs)} />
        <StructuredData data={breadcrumbSchema(breadcrumbItems)} />
      <Breadcrumb lang="ar" category="أدوات إسلامية" categorySlug="islamic" toolName="اتجاه القبلة" />
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <h1 className="text-2xl font-extrabold mb-1">🧭 اتجاه القبلة</h1>
        <p className="text-sm text-gray-500 mb-6">اعرف اتجاه القبلة من موقعك</p>
        <div className="text-center py-10">
          <div className="w-[120px] h-[120px] bg-yellow-50 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-yellow-300">
            <span className="text-5xl">🧭</span>
          </div>
          <p className="text-gray-500 mb-4">السماح بالوصول لموقعك لتحديد القبلة</p>
          <button className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl border-none cursor-pointer font-inherit">
            تحديد موقعي
          </button>
        </div>
      </div>
      <SEOContent content={seoContent} lang="ar" />
      <FAQSection faqs={faqs} lang="ar" />
      <RelatedTools tools={relatedTools} lang="ar" />
    <ShareButtons lang="ar" />
    </div>
  );
}
