"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Order } from "@/types/order";
import { listOrders } from "@/lib/orders";
import { formatCurrency } from "@/lib/currency";
import { formatDate, qtyLabel } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/store/ui.store";
import { products } from "@/data/catalog";

export function OrdersList() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const cart = useCart();
  const { notify } = useToast();

  useEffect(() => setOrders(listOrders()), []);

  const reorder = (order: Order) => {
    let added = 0;
    order.items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        cart.addProduct(product, { qty: item.qty, variant: item.variant });
        added++;
      }
    });
    notify(added > 0 ? `${added} item${added === 1 ? "" : "s"} added to your cart.` : "Those products are no longer available.", {
      actionLabel: added > 0 ? "View cart" : undefined,
      actionHref: added > 0 ? "/cart" : undefined,
      tone: added > 0 ? "success" : "error"
    });
  };

  if (orders === null) return null;

  return (
    <div className="panel">
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <div className="empty-state">
          <p className="muted">No orders yet.</p>
          <div className="empty-state__actions">
            <Link className="button" href="/products">
              Browse products
            </Link>
          </div>
        </div>
      ) : (
        <div className="account-stack">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-card__head">
                <div>
                  <strong>{order.id}</strong>
                  <p className="muted small">{formatDate(order.date)}</p>
                </div>
                <span className="status-pill">{order.status}</span>
                <strong>{formatCurrency(order.total)}</strong>
              </div>
              {order.items.map((item) => (
                <div className="order-item" key={`${item.productId}-${item.variant ?? ""}`}>
                  <img src={item.image} alt="" />
                  <div>
                    <Link href={`/products/${item.slug}`}>
                      <strong>{item.name}</strong>
                    </Link>
                    <p className="muted small">
                      {qtyLabel(item.qty, item.unitLabel)}
                      {item.variant ? ` · ${item.variant}` : ""}
                    </p>
                  </div>
                  <span>{formatCurrency(item.unitPrice * item.qty)}</span>
                </div>
              ))}
              <div className="order-card__foot">
                <span className="muted small">
                  {order.payment === "cod" ? "Cash on delivery" : "Bank transfer"} · {order.delivery.method === "pickup" ? "Showroom pickup" : `Delivery to ${order.delivery.city}`}
                </span>
                <button type="button" className="button light" onClick={() => reorder(order)}>
                  Buy again
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
