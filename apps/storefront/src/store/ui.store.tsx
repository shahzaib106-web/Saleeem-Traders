"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { readStorage, writeStorage } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Toasts                                                              */
/* ------------------------------------------------------------------ */

export type Toast = { id: number; message: string; actionLabel?: string; actionHref?: string; tone?: "default" | "success" | "error" };

type ToastContextValue = {
  toasts: Toast[];
  notify: (message: string, opts?: Omit<Toast, "id" | "message">) => void;
  dismiss: (id: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
  }, []);

  const notify = useCallback<ToastContextValue["notify"]>(
    (message, opts) => {
      const id = ++counter.current;
      setToasts((list) => [...list.slice(-2), { id, message, ...opts }]);
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), 3800)
      );
    },
    [dismiss]
  );

  useEffect(() => {
    const map = timers.current;
    return () => map.forEach((t) => clearTimeout(t));
  }, []);

  const value = useMemo(() => ({ toasts, notify, dismiss }), [toasts, notify, dismiss]);
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Wishlist                                                            */
/* ------------------------------------------------------------------ */

type WishlistContextValue = {
  ids: string[];
  hydrated: boolean;
  has: (productId: string) => boolean;
  toggle: (productId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const WISHLIST_KEY = "st_wishlist_v1";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIds(readStorage<string[]>(WISHLIST_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(WISHLIST_KEY, ids);
  }, [ids, hydrated]);

  const has = useCallback((id: string) => ids.includes(id), [ids]);
  const toggle = useCallback(
    (id: string) => {
      const next = !ids.includes(id);
      setIds((list) => (next ? [...list, id] : list.filter((x) => x !== id)));
      return next;
    },
    [ids]
  );

  const value = useMemo(() => ({ ids, hydrated, has, toggle }), [ids, hydrated, has, toggle]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
