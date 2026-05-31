import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مولد كلمات السر | أدواتك",
  description: "أنشئ كلمات سر قوية وآمنة بطول وخصائص مخصصة مجاناً",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
