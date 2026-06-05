import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("date-duration", "id")!;

export default function Page() {
  return <Client />;
}
