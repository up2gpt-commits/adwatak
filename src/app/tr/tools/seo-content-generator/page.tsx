import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("seo-content-generator", "tr")!;

export default function Page() {
  return <Client />;
}
