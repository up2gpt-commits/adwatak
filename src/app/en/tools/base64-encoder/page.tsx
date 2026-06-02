import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("base64-encoder", "en")!;

export default function Page() {
  return <Client />;
}
