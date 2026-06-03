import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("stopwatch", "id")!;

export default function Page() {
  return <Client />;
}
