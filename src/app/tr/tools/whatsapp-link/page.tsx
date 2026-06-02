import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("whatsapp-link", "tr")!;

export default function Page() {
  return <Client />;
}
