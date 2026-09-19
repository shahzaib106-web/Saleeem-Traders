export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function titleCase(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

/** Safe JSON read from localStorage (SSR-safe: returns fallback on the server). */
export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode / quota) — state stays in memory */
  }
}

export function shortId(prefix = "ST") {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}-${out}`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" });
}

const PLURALS: Record<string, string> = { box: "boxes", piece: "pieces", set: "sets", "sq ft": "sq ft", pair: "pairs" };

/** "1 box", "16 boxes", "3 sq ft" */
export function qtyLabel(qty: number, unit: string) {
  const plural = PLURALS[unit] ?? (unit.endsWith("s") ? unit : `${unit}s`);
  return `${qty} ${qty === 1 ? unit : plural}`;
}
