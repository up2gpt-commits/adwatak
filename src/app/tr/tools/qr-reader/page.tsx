import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("qr-reader", "tr")!;

export default function Page() {
  return <Client />;
}
