import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("encryption-tool", "en")!;

export default function Page() {
  return <Client />;
}
