"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Order } from "@/types/order";
import { formatCurrency } from "@/lib/currency";
import { getOrder } from "@/lib/orders";
import { formatDate, qtyLabel } from "@/lib/utils";
import { STORE } from "@/lib/constants";

/** Confirmation panel shown on /checkout/success. Reads the saved order by id. */
export function OrderSummary({ orderId }: { orderId?: string }) {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    setOrder(orderId ? (getOrder(orderId) ?? null) : null);
  }, [orderId]);

  if (order === undefined) return null;

  return (
    <div className="panel success-panel">
      <span className="step-no success-panel__icon" aria-hidden="true">
        ✓
      </span>
      <h1>Order received</h1>
      {order ? (
        <>
          <p className="muted">
            Thank you, {order.customer.name.split(" ")[0]}. Your order <strong>{order.id}</strong> was placed on {formatDate(order.date)}. Our team will call{" "}
            <strong>{order.customer.phone}</strong> to confirm stock and {order.delivery.method === "pickup" ? "pickup" : "delivery"} timing.
          </p>
          <div className="success-panel__items">
            {order.items.map((item) => (
              <div className="order-item" key={`${item.productId}-${item.variant ?? ""}`}>
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
            ))}
          </div>
          <div className="success-panel__totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatCurrency(order.subtotal)}</strong>
            </div>
            {order.discount > 0 && (
              <div className="summary-row">
                <span>Discount</span>
                <strong>− {formatCurrency(order.discount)}</strong>
              </div>
            )}
            <div className="summary-row">
              <span>{order.delivery.method === "pickup" ? "Showroom pickup" : "Delivery"}</span>
              <strong>{order.deliveryFee === 0 ? "Free" : formatCurrency(order.deliveryFee)}</strong>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <strong>{formatCurrency(order.total)}</strong>
            </div>
            <p className="muted small">
              Payment: {order.payment === "cod" ? "Cash on delivery" : "Bank transfer (details sent by email)"}
              {order.delivery.method === "standard" && order.delivery.address && (
                <>
                  {" "}
                  · Deliver to {order.delivery.address}, {order.delivery.city}
                </>
              )}
              {order.delivery.method === "pickup" && <> · Collect from {STORE.address}</>}
            </p>
          </div>
        </>
      ) : (
        <p className="muted">Our team will call to confirm stock and delivery details. A copy of your order has been emailed to you.</p>
      )}
      <div className="empty-state__actions">
        <Link className="button" href="/products">
          Continue shopping
        </Link>
        <Link className="button secondary" href="/account/orders">
          View my orders
        </Link>
      </div>
    </div>
  );
}
