"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Order } from "@/types/order";
import { products } from "@/data/catalog";
import { listOrders } from "@/lib/orders";
import { formatCurrency } from "@/lib/currency";
import { formatDate } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/store/ui.store";
import { ProductGrid } from "@/components/products/ProductGrid";

export function AccountOverview() {
  const { user } = useAuth();
  const wishlist = useWishlist();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => setOrders(listOrders()), []);

  const saved = products.filter((p) => wishlist.ids.includes(p.id));
  const latest = orders[0];

  return (
    <div className="account-stack">
      <div className="panel">
        <h1>Hello, {user?.name.split(" ")[0]}</h1>
        <p className="muted">Manage orders, addresses and profile information.</p>
        <div className="stat-grid">
          <Link className="stat" href="/account/orders">
            <strong>{orders.length}</strong>
            <span>Order{orders.length === 1 ? "" : "s"}</span>
          </Link>
          <Link className="stat" href="#saved">
            <strong>{saved.length}</strong>
            <span>Saved item{saved.length === 1 ? "" : "s"}</span>
          </Link>
          <Link className="stat" href="/quote">
            <strong>+</strong>
            <span>New quote</span>
          </Link>
        </div>
      </div>

      <div className="panel">
        <div className="section-head">
          <h2>Latest order</h2>
          {orders.length > 0 && (
            <Link className="link-u" href="/account/orders">
              View all
            </Link>
          )}
        </div>
        {latest ? (
          <div className="order-card">
            <div className="order-card__head">
              <div>
                <strong>{latest.id}</strong>
                <p className="muted small">{formatDate(latest.date)}</p>
              </div>
              <span className="status-pill">{latest.status}</span>
              <strong>{formatCurrency(latest.total)}</strong>
            </div>
            <p className="muted small">
              {latest.items.length} line{latest.items.length === 1 ? "" : "s"} · {latest.delivery.method === "pickup" ? "Showroom pickup" : `Delivery to ${latest.delivery.city}`}
            </p>
          </div>
        ) : (
          <div className="empty-state">
            <p className="muted">You haven&apos;t placed an order yet.</p>
            <div className="empty-state__actions">
              <Link className="button" href="/products">
                Start shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="panel" id="saved">
        <h2>Saved items</h2>
        {saved.length > 0 ? (
          <ProductGrid products={saved} />
        ) : (
          <p className="muted">Tap the heart on any product to save it here.</p>
        )}
      </div>
    </div>
  );
}
