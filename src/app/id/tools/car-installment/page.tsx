import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("car-installment", "id")!;

export default function Page() {
  return <Client />;
}
