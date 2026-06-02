import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("paraphrasing-tool", "tr")!;

export default function Page() {
  return <Client />;
}
