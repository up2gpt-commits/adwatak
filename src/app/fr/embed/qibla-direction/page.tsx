import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Direction Qibla — Intégrer",
  robots: "noindex, nofollow",
};

export default function Page() {
  return <Client />;
}
