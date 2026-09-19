"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import type { Product } from "@/types/product";
import { PROMO_CODES } from "@/lib/constants";
import { readStorage, writeStorage } from "@/lib/utils";

export type CartItem = {
  /** productId + variant — one line per distinct variant. */
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  unitPrice: number;
  /** "box", "piece", "set" … */
  unitLabel: string;
  qty: number;
  variant?: string;
};

export type CartState = { items: CartItem[]; promoCode?: string };

type Action =
  | { type: "hydrate"; state: CartState }
  | { type: "add"; item: CartItem }
  | { type: "setQty"; key: string; qty: number }
  | { type: "remove"; key: string }
  | { type: "promo"; code?: string }
  | { type: "clear" };

const STORAGE_KEY = "st_cart_v1";

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "add": {
      const existing = state.items.find((i) => i.key === action.item.key);
      const items = existing
        ? state.items.map((i) => (i.key === action.item.key ? { ...i, qty: i.qty + action.item.qty } : i))
        : [...state.items, action.item];
      return { ...state, items };
    }
    case "setQty": {
      if (action.qty <= 0) return { ...state, items: state.items.filter((i) => i.key !== action.key) };
      return { ...state, items: state.items.map((i) => (i.key === action.key ? { ...i, qty: action.qty } : i)) };
    }
    case "remove":
      return { ...state, items: state.items.filter((i) => i.key !== action.key) };
    case "promo":
      return { ...state, promoCode: action.code };
    case "clear":
      return { items: [] };
    default:
      return state;
  }
}

export type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  discount: number;
  promoCode?: string;
  promoLabel?: string;
  /** False until localStorage has been read on the client. */
  hydrated: boolean;
  addProduct: (product: Product, opts?: { qty?: number; variant?: string }) => CartItem;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  applyPromo: (code: string) => { ok: boolean; message: string };
  clearPromo: () => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/** Builds a cart line from a product. Tiles are sold per box; everything else per unit. */
export function lineFromProduct(product: Product, opts?: { qty?: number; variant?: string }): CartItem {
  const perBox = typeof product.packPrice === "number";
  const variant = opts?.variant?.trim() || undefined;
  return {
    key: variant ? `${product.id}::${variant}` : product.id,
    productId: product.id,
    slug: product.slug,
    name: product.name,
    image: product.image,
    unitPrice: perBox ? (product.packPrice as number) : product.price,
    unitLabel: perBox ? "box" : product.unit,
    qty: Math.max(1, opts?.qty ?? 1),
    variant
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    dispatch({ type: "hydrate", state: readStorage<CartState>(STORAGE_KEY, { items: [] }) });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(STORAGE_KEY, state);
  }, [state, hydrated]);

  const addProduct = useCallback<CartContextValue["addProduct"]>((product, opts) => {
    const item = lineFromProduct(product, opts);
    dispatch({ type: "add", item });
    return item;
  }, []);

  const setQty = useCallback((key: string, qty: number) => dispatch({ type: "setQty", key, qty }), []);
  const remove = useCallback((key: string) => dispatch({ type: "remove", key }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);
  const clearPromo = useCallback(() => dispatch({ type: "promo", code: undefined }), []);

  const applyPromo = useCallback((raw: string) => {
    const code = raw.trim().toUpperCase();
    if (!code) return { ok: false, message: "Enter a promo code first." };
    const promo = PROMO_CODES[code];
    if (!promo) return { ok: false, message: `“${code}” is not a valid code.` };
    dispatch({ type: "promo", code });
    return { ok: true, message: `${promo.label} applied.` };
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = state.items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
    const promo = state.promoCode ? PROMO_CODES[state.promoCode] : undefined;
    const discount = promo ? Math.round((subtotal * promo.value) / 100) : 0;
    return {
      items: state.items,
      count: state.items.reduce((sum, i) => sum + i.qty, 0),
      subtotal,
      discount,
      promoCode: promo ? state.promoCode : undefined,
      promoLabel: promo?.label,
      hydrated,
      addProduct,
      setQty,
      remove,
      applyPromo,
      clearPromo,
      clear
    };
  }, [state, hydrated, addProduct, setQty, remove, applyPromo, clearPromo, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
