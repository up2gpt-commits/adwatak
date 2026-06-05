import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("umrah-calculator", "tr")!;

export default function Page() {
  return <Client />;
}
