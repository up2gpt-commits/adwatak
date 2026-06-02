import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("seo-audit", "en")!;

export default function Page() {
  return <Client />;
}
