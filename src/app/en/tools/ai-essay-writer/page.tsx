import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("ai-essay-writer", "en")!;

export default function Page() {
  return <Client />;
}
