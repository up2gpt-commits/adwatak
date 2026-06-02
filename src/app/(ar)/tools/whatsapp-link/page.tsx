import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("whatsapp-link", "ar")!;

export default function Page() {
  return <Client />;
}
