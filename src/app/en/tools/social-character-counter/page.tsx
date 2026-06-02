import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("social-character-counter", "en")!;

export default function Page() {
  return <Client />;
}
