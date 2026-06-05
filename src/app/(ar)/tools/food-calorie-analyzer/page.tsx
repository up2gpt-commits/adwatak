import { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "محلل السعرات بالصور — تعرف على سعرات أي طعام بالتصوير",
  description:
    "أداة مجانية لتحليل السعرات الحرارية من خلال صورة الطعام. صور أي وجبة واحصل على تفاصيل دقيقة عن السعرات والبروتين والكربوهيدرات والدهون.",
  alternates: {
    canonical: "https://adwatak.cloud/tools/food-calorie-analyzer",
  },
  openGraph: {
    title: "محلل السعرات بالصور — أدواتك",
    description:
      "صور طعامك واحصل على تحليل كامل للسعرات الحرارية والمغذيات مجاناً.",
  },
};

export default function Page() {
  return <Client />;
}
