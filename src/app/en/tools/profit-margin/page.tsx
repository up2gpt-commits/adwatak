import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("profit-margin", "en")!;

export default function Page() {
  return <Client />;
}
