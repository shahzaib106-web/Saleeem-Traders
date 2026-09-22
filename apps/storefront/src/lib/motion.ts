import type { CSSProperties } from "react";

export type RevealVariant = "up" | "fade" | "left" | "right" | "scale";

export type RevealProps = {
  "data-reveal": RevealVariant;
  style: CSSProperties;
};

/** Longest stagger we allow, so big grids never finish animating late. */
const MAX_DELAY_MS = 480;

/**
 * Props for the scroll-reveal system driven by `<MotionProvider />`.
 *
 * Spread onto any element to have it fade/rise into place the first time it
 * enters the viewport:
 *
 * ```tsx
 * <article className="product-card" {...reveal(index)}>…</article>
 * ```
 *
 * Safe in Server Components (no hooks). The delay is a CSS custom property,
 * so the stagger costs nothing at runtime.
 */
export function reveal(index = 0, variant: RevealVariant = "up", step = 70): RevealProps {
  return {
    "data-reveal": variant,
    style: { "--reveal-delay": `${Math.min(Math.max(index, 0) * step, MAX_DELAY_MS)}ms` } as CSSProperties
  };
}
