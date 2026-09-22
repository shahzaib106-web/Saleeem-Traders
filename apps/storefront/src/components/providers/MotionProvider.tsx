"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const REVEAL_SELECTOR = "[data-reveal]";
const REVEALED_CLASS = "is-revealed";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Drives the motion layer (see `styles/motion.css`). Renders nothing.
 *
 * Responsibilities:
 * 1. add `html.js-motion` so reveal targets may be hidden — the class is only
 *    ever added from JS, so with scripting disabled nothing is hidden;
 * 2. reveal `data-reveal` elements as they scroll into view, re-scanning on
 *    navigation and whenever the DOM grows (client-side filtering, pagination);
 * 3. replay a soft fade on `<main>` when the route changes.
 *
 * `prefers-reduced-motion: reduce` short-circuits all of it: every target is
 * revealed immediately and no observers stay attached.
 */
export function MotionProvider() {
  const pathname = usePathname();

  // Fallback for the pre-paint inline script in app/layout.tsx (e.g. if a CSP
  // blocks it): idempotent, so normally a no-op.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-motion");
    return () => root.classList.remove("js-motion");
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY);

    const revealAll = () => {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((node) => node.classList.add(REVEALED_CLASS));
    };

    if (reduced.matches || typeof IntersectionObserver === "undefined") {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add(REVEALED_CLASS);
          observer.unobserve(entry.target);
        }
      },
      // Low threshold + inset bottom edge: tall sections still trigger early.
      { threshold: 0.02, rootMargin: "0px 0px -6% 0px" }
    );

    const scan = () => {
      document.querySelectorAll(`${REVEAL_SELECTOR}:not(.${REVEALED_CLASS})`).forEach((node) => observer.observe(node));
    };

    // Client-side filtering and pagination add nodes after mount; batch the
    // rescan to one pass per frame. Class changes are not observed (childList
    // only), so revealing an element never retriggers the observer.
    let frame = 0;
    const scheduleScan = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        scan();
      });
    };

    scan();
    const mutations = new MutationObserver(scheduleScan);
    mutations.observe(document.body, { childList: true, subtree: true });

    const onPreferenceChange = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      revealAll();
      observer.disconnect();
      mutations.disconnect();
    };
    reduced.addEventListener("change", onPreferenceChange);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      mutations.disconnect();
      reduced.removeEventListener("change", onPreferenceChange);
    };
  }, [pathname]);

  // Soft fade on client-side navigation only. Skipped on the first render: the
  // server HTML is already painted, so fading it in would flash.
  const firstRoute = useRef(true);
  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    const main = document.querySelector("main");
    if (!main) return;
    main.classList.remove("route-in");
    void main.offsetWidth; // reflow, so the animation restarts on every navigation
    main.classList.add("route-in");
  }, [pathname]);

  return null;
}
