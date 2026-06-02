import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("text-compare", "tr")!;

export default function Page() {
  return <Client />;
}
