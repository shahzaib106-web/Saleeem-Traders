import type { Metadata } from "next";
export function pageMetadata(title: string, description: string): Metadata {
  return { title: `${title} | Saleeem Traders`, description };
}
