import { generateToolMetadata } from "@/app/lib/tool-metadata";
import Client from "./Client";

export const metadata = generateToolMetadata("plagiarism-checker", "id")!;

export default function Page() {
  return <Client />;
}
