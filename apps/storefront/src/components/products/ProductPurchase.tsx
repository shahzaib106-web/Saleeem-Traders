"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/currency";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/store/ui.store";
import { IconBag, IconTruck } from "@/components/ui/icons";

const WASTAGE = 0.1;

export function ProductPurchase({ product }: { product: Product }) {
  const cart = useCart();
  const { notify } = useToast();
  const perBox = typeof product.packPrice === "number" && typeof product.coverage === "number";
  const inStock = product.inStock !== false;

  const [size, setSize] = useState(product.sizes?.[0]);
  const [finish, setFinish] = useState(product.finishes?.[0]);
  const [area, setArea] = useState("120");
  const [wastage, setWastage] = useState(true);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const calc = useMemo(() => {
    if (!perBox) return null;
    const sqft = Math.max(0, Number(area) || 0);
    const needed = sqft * (wastage ? 1 + WASTAGE : 1);
    const boxes = sqft > 0 ? Math.max(1, Math.ceil(needed / (product.coverage as number))) : 0;
    return {
      sqft,
      boxes,
      covered: +(boxes * (product.coverage as number)).toFixed(1),
      total: boxes * (product.packPrice as number)
    };
  }, [perBox, area, wastage, product.coverage, product.packPrice]);

  const units = perBox ? (calc?.boxes ?? 0) : qty;
  const total = perBox ? (calc?.total ?? 0) : qty * product.price;
  const variant = [size, finish].filter(Boolean).join(" · ") || undefined;
  const disabled = units < 1;

  const addToCart = () => {
    if (disabled) return;
    cart.addProduct(product, { qty: units, variant });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
    notify(`${units} ${perBox ? (units === 1 ? "box" : "boxes") : units === 1 ? product.unit : `× ${product.name}`} added to your cart.`, {
      actionLabel: "View cart",
      actionHref: "/cart",
      tone: "success"
    });
  };

  return (
    <div className="product-buy">
      <h1>{product.name}</h1>
      <p className="muted product-buy__desc">{product.description}</p>
      <div className="big-price">
        {formatCurrency(product.price)}
        <span className="muted"> / {product.unit}</span>
      </div>
      <p className={`stock ${inStock ? "stock--in" : "stock--order"}`}>
        <span aria-hidden="true">●</span> {inStock ? "In stock" : "Made to order · 2–3 weeks"}
      </p>

      {product.sizes && product.sizes.length > 0 && (
        <div className="option-row" role="group" aria-label="Size">
          <strong>Size</strong>
          {product.sizes.map((s) => (
            <button type="button" key={s} className={`option${size === s ? " active" : ""}`} aria-pressed={size === s} onClick={() => setSize(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {product.finishes && product.finishes.length > 0 && (
        <div className="option-row" role="group" aria-label="Finish">
          <strong>Finish</strong>
          {product.finishes.map((f) => (
            <button type="button" key={f} className={`option${finish === f ? " active" : ""}`} aria-pressed={finish === f} onClick={() => setFinish(f)}>
              {f}
            </button>
          ))}
        </div>
      )}

      {perBox && calc ? (
        <div className="calc">
          <h3>How much do you need?</h3>
          <label className="field">
            <span>Area to cover (sq ft)</span>
            <input className="input" inputMode="decimal" value={area} onChange={(e) => setArea(e.target.value)} aria-describedby="calc-help" />
          </label>
          <label className="filter-option">
            <input type="checkbox" checked={wastage} onChange={(e) => setWastage(e.target.checked)} />
            <span>Add 10% for cuts and wastage</span>
          </label>
          <div className="calc-grid" id="calc-help">
            <div className="summary-row">
              <span>Coverage per box</span>
              <strong>{product.coverage} sq ft</strong>
            </div>
            <div className="summary-row">
              <span>Boxes required</span>
              <strong>{calc.boxes}</strong>
            </div>
            <div className="summary-row">
              <span>Coverage ordered</span>
              <strong>{calc.covered} sq ft</strong>
            </div>
            <div className="summary-row">
              <span>Price per box</span>
              <strong>{formatCurrency(product.packPrice as number)}</strong>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <strong>{formatCurrency(calc.total)}</strong>
            </div>
          </div>
        </div>
      ) : (
        <div className="option-row" role="group" aria-label="Quantity">
          <strong>Quantity</strong>
          <span className="qty">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" disabled={qty <= 1}>
              −
            </button>
            <span aria-live="polite">{qty}</span>
            <button type="button" onClick={() => setQty((q) => Math.min(999, q + 1))} aria-label="Increase quantity">
              +
            </button>
          </span>
          <span className="muted">Total {formatCurrency(total)}</span>
        </div>
      )}

      <div className="buy-actions">
        <button type="button" className="button" onClick={addToCart} disabled={disabled} aria-disabled={disabled}>
          <IconBag /> {justAdded ? "Added ✓" : perBox ? `Add ${units} ${units === 1 ? "box" : "boxes"} to cart` : "Add to cart"}
        </button>
        <Link className="button secondary" href={`/quote?product=${product.slug}`}>
          Request a project quote
        </Link>
      </div>
      <p className="muted small delivery-note">
        <IconTruck /> Delivery calculated at checkout · Showroom pickup available
      </p>
    </div>
  );
}
