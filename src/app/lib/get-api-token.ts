import { headers } from "next/headers";
import { mintToken } from "./api-token";

/**
 * Server Component helper: get a fresh API token for the current request.
 * Use in any Server Component (page.tsx or layout.tsx) and pass to Client.
 *
 * Example:
 *   const token = await getApiToken('/api/ai-essay-writer');
 *   return <ClientEn apiToken={token} />;
 */
export async function getApiToken(route: string): Promise<string> {
  const h = await headers();
  const fakeReq = {
    headers: new Headers({
      "x-forwarded-for": h.get("x-forwarded-for") || "",
      "x-real-ip": h.get("x-real-ip") || "",
      "cf-connecting-ip": h.get("cf-connecting-ip") || "",
    }),
  };
  return mintToken(route, fakeReq).token;
}
