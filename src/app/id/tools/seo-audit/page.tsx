import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("seo-audit", "id")!;

export default function Page() {
  return <Client />;
}
