import type { Metadata } from "next";
export const metadata: Metadata = { title: "حاسبة العمر | أدواتك", description: "احسب عمرك بالهجري والميلادي والسنين والأشهر والأيام" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
