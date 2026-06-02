import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("base64-encoder", "tr")!;

export default function Page() {
  return <Client />;
}
