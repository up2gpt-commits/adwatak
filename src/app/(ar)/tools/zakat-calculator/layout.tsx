import type { Metadata } from "next";
export const metadata: Metadata = { title: "حاسبة الزكاة | أدواتك", description: "احسب زكاة المال والذهب والأسهم والمحاصيل بسهولة" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
