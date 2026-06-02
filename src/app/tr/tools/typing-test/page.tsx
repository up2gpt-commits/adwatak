import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("typing-test", "tr")!;

export default function Page() {
  return <Client />;
}
