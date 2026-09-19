import type { Metadata } from "next";
import { STORE } from "@/lib/constants";

export function pageMetadata(title: string, description: string): Metadata {
  return { title: `${title} | ${STORE.name}`, description };
}
