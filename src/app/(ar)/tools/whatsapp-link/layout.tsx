import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "رابط واتساب مباشر | أدواتك",
  description: "أنشئ رابط يفتح محادثة واتساب مباشرة مع رقم محدد ورسالة مخصصة",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
