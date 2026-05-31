import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "حاسبة القرض العقاري | أدواتك",
  description: "احسب القسط الشهري للقرض العقاري — إجمالي الفائدة وجدول الاستفلال بالكامل",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
