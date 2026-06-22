import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "اتجاه القبلة — تضمين",
  robots: "noindex, nofollow",
};

export default function Page() {
  return <Client />;
}
