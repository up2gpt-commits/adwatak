import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("text-compare", "en")!;

export default function Page() {
  return <Client />;
}
