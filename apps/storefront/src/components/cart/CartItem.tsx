"use client";

import type { CartItem as CartLine } from "@/hooks/useCart";
import { formatCurrency } from "@/lib/currency";
import { qtyLabel } from "@/lib/utils";

/** Compact read-only line used in order summaries. */
export function CartItem({ item }: { item: CartLine }) {
  return (
    <div className="order-item">
      <img src={item.image} alt="" />
      <div>
        <strong>{item.name}</strong>
        <p className="muted small">
          {qtyLabel(item.qty, item.unitLabel)}
          {item.variant ? ` · ${item.variant}` : ""}
        </p>
      </div>
      <strong>{formatCurrency(item.unitPrice * item.qty)}</strong>
    </div>
  );
}
