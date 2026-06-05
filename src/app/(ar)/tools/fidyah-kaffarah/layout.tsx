import type { Metadata } from "next";
export const metadata: Metadata = { title: "حاسبة الفدية والكفارة | أدواتك", description: "احسب الفدية والكفارة — كفارة اليمين، كفارة الجماع في رمضان، كفارة الظهار، فدية الصيام مع الشرح الشرعي" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
