import type { Metadata } from "next";
export const metadata: Metadata = { title: "مولد أسماء | أدواتك", description: "أنشئ أسماء عشوائية عربية وإنجليزية" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
