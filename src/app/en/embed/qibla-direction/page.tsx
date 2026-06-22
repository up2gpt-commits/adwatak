import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Qibla Direction — Embed",
  robots: "noindex, nofollow",
};

export default function Page() {
  return <Client />;
}
