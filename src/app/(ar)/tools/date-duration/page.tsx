import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("date-duration", "ar")!;

export default function Page() {
  return <Client />;
}
