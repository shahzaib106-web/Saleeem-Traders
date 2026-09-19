"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/data/catalog";
import { formatCurrency } from "@/lib/currency";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/store/ui.store";
import { ProductGrid } from "@/components/products/ProductGrid";
import { IconTrash } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/Skeleton";

export function CartView() {
  const cart = useCart();
  const { notify } = useToast();
  const [promo, setPromo] = useState("");
  const [promoMessage, setPromoMessage] = useState<{ ok: boolean; text: string } | null>(null);

  if (!cart.hydrated) {
    return (
      <section className="container section">
        <Skeleton height={40} />
        <div style={{ height: 16 }} />
        <Skeleton height={320} />
      </section>
    );
  }

  const inCart = new Set(cart.items.map((i) => i.productId));
  const suggestions = products.filter((p) => !inCart.has(p.id) && p.inStock !== false).slice(0, 3);
  const count = cart.count;

  const applyPromo = (event: React.FormEvent) => {
    event.preventDefault();
    const result = cart.applyPromo(promo);
    setPromoMessage({ ok: result.ok, text: result.message });
    if (result.ok) setPromo("");
  };

  if (cart.items.length === 0) {
    return (
      <section className="container section">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link> / Cart
        </nav>
        <div className="empty-state empty-state--page">
          <h1>Your cart is empty</h1>
          <p className="muted">Browse the range and add tiles, sanitaryware or fittings to get started.</p>
          <div className="empty-state__actions">
            <Link className="button" href="/products">
              Browse products
            </Link>
            <Link className="button secondary" href="/quote">
              Request a project quote
            </Link>
          </div>
        </div>
        {suggestions.length > 0 && (
          <div className="section" style={{ paddingBottom: 0 }}>
            <h2>Popular right now</h2>
            <ProductGrid products={suggestions} />
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="container section">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / Cart
      </nav>
      <h1>Your cart</h1>
      <p className="muted lead">
        {count} item{count === 1 ? "" : "s"} · {cart.items.length} line{cart.items.length === 1 ? "" : "s"}
      </p>

      <div className="cart-layout">
        <div className="cart-list">
          {cart.items.map((item) => (
            <div className="cart-item" key={item.key}>
              <Link href={`/products/${item.slug}`} aria-label={item.name}>
                <img src={item.image} alt="" />
              </Link>
              <div className="cart-item__info">
                <h3>
                  <Link href={`/products/${item.slug}`}>{item.name}</Link>
                </h3>
                {item.variant && <p className="muted">{item.variant}</p>}
                <p className="muted small">
                  {formatCurrency(item.unitPrice)} / {item.unitLabel}
                </p>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => {
                    cart.remove(item.key);
                    notify(`${item.name} removed from your cart.`);
                  }}
                >
                  <IconTrash /> Remove
                </button>
              </div>
              <div className="cart-item__qty">
                <span className="qty">
                  <button type="button" aria-label={`Decrease quantity of ${item.name}`} onClick={() => cart.setQty(item.key, item.qty - 1)}>
                    −
                  </button>
                  <input
                    aria-label={`Quantity of ${item.name}`}
                    inputMode="numeric"
                    value={item.qty}
                    onChange={(e) => {
                      const n = Number(e.target.value.replace(/[^\d]/g, ""));
                      if (n > 0) cart.setQty(item.key, Math.min(999, n));
                    }}
                  />
                  <button type="button" aria-label={`Increase quantity of ${item.name}`} onClick={() => cart.setQty(item.key, Math.min(999, item.qty + 1))}>
                    +
                  </button>
                </span>
                <span className="muted small">{item.unitLabel === "box" ? "boxes" : item.unitLabel}</span>
              </div>
              <strong className="cart-item__total">{formatCurrency(item.unitPrice * item.qty)}</strong>
            </div>
          ))}
        </div>

        <aside className="summary">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatCurrency(cart.subtotal)}</strong>
          </div>
          {cart.discount > 0 && (
            <div className="summary-row summary-row--discount">
              <span>
                Discount ({cart.promoCode}){" "}
                <button type="button" className="link-btn" onClick={cart.clearPromo}>
                  remove
                </button>
              </span>
              <strong>− {formatCurrency(cart.discount)}</strong>
            </div>
          )}
          <div className="summary-row">
            <span>Delivery</span>
            <span className="muted">Calculated at checkout</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <strong>{formatCurrency(cart.subtotal - cart.discount)}</strong>
          </div>

          {!cart.promoCode && (
            <form className="promo" onSubmit={applyPromo}>
              <label className="sr-only" htmlFor="promo">
                Promo code
              </label>
              <input id="promo" className="input" placeholder="Promo code" value={promo} onChange={(e) => setPromo(e.target.value)} autoComplete="off" />
              <button type="submit" className="button light">
                Apply
              </button>
            </form>
          )}
          {promoMessage && (
            <p className={`form-note ${promoMessage.ok ? "form-note--ok" : "form-note--error"}`} role="status">
              {promoMessage.text}
            </p>
          )}

          <Link className="button w-full" href="/checkout">
            Proceed to checkout
          </Link>
          <Link className="button secondary w-full" href="/products">
            Continue shopping
          </Link>
          <p className="center small">
            <Link className="link-u" href="/quote">
              Need a project quotation?
            </Link>
          </p>
          <hr />
          <p className="muted small">Delivery availability and charges depend on your location.</p>
        </aside>
      </div>

      {suggestions.length > 0 && (
        <div className="section" style={{ paddingBottom: 0 }}>
          <h2>You may also like</h2>
          <p className="muted">Complete your space with these picks.</p>
          <ProductGrid products={suggestions} />
        </div>
      )}
    </section>
  );
}
