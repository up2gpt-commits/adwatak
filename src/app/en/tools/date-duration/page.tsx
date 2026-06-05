import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("date-duration", "en")!;

export default function Page() {
  return <Client />;
}
