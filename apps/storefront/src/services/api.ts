const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";
export async function api<T>(path: string, init?: RequestInit): Promise<T> { const res = await fetch(`${API_URL}${path}`, init); if (!res.ok) throw new Error("API request failed"); return res.json() as Promise<T>; }
