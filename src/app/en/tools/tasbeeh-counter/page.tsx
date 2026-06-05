import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("tasbeeh-counter", "en")!;

export default function Page() {
  return <Client />;
}
