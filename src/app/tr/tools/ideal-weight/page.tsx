import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("ideal-weight", "tr")!;

export default function Page() {
  return <Client />;
}
