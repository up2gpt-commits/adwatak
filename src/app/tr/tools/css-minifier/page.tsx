import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("css-minifier", "tr")!;

export default function Page() {
  return <Client />;
}
