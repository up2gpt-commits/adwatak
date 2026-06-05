import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("percentage-calculator", "id")!;

export default function Page() {
  return <Client />;
}
