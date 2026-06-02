import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("prayer-times", "tr")!;

export default function Page() {
  return <Client />;
}
