import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "VAT Calculator — Embed",
  robots: "noindex, nofollow",
};

export default function Page() {
  return <Client />;
}
