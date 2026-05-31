import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "حاسبة التقسيط | أدواتك",
  description: "احسب قيمة القسط الشهري لأي عملية تقسيط بسهولة",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
