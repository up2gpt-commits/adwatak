import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "حاسبة الضريبة المضافة — تضمين",
  robots: "noindex, nofollow",
};

export default function Page() {
  return <Client />;
}
