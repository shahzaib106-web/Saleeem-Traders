"use client";

import Link from "next/link";
import { formatCurrency } from "@/lib/currency";
import { useCart } from "@/hooks/useCart";

export function CartSummary() {
  const cart = useCart();
  return (
    <div className="panel">
      <h3>Order summary</h3>
      <p className="muted">Subtotal: {formatCurrency(cart.subtotal)}</p>
      <Link className="button" href="/checkout">
        Checkout
      </Link>
    </div>
  );
}
