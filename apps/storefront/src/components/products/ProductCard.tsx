"use client";

import Link from "next/link";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/currency";
import { categoryMap } from "@/data/catalog";
import { useWishlist, useToast } from "@/store/ui.store";
import { useCart } from "@/hooks/useCart";
import { IconHeart } from "@/components/ui/icons";

export function ProductCard({ product }: { product: Product }) {
  const wishlist = useWishlist();
  const cart = useCart();
  const { notify } = useToast();
  const saved = wishlist.hydrated && wishlist.has(product.id);
  const href = `/products/${product.slug}`;
  const perBox = typeof product.packPrice === "number";
  const inStock = product.inStock !== false;

  const toggleWishlist = () => {
    const added = wishlist.toggle(product.id);
    notify(added ? `${product.name} saved to your wishlist.` : `${product.name} removed from your wishlist.`, {
      actionLabel: added ? "View saved" : undefined,
      actionHref: added ? "/account" : undefined
    });
  };

  const quickAdd = () => {
    const variant = [product.sizes?.[0], product.finishes?.[0]].filter(Boolean).join(" · ") || undefined;
    cart.addProduct(product, { qty: 1, variant });
    notify(`${product.name} added to your cart.`, { actionLabel: "View cart", actionHref: "/cart", tone: "success" });
  };

  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link href={href} aria-label={product.name} className="product-card__link">
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        {product.badge && <span className="product-card__badge">{product.badge}</span>}
        <button
          type="button"
          className={`wish${saved ? " wish--on" : ""}`}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          onClick={toggleWishlist}
        >
          <IconHeart filled={saved} />
        </button>
      </div>
      <div className="product-card__body">
        <h3>
          <Link href={href}>{product.name}</Link>
        </h3>
        <div className="muted product-card__meta">
          {categoryMap[product.category]?.name ?? product.category}
          {!inStock && <span className="stock-pill">Made to order</span>}
        </div>
        <div className="price">
          {formatCurrency(product.price)}{" "}
          <span className="muted" style={{ fontSize: 14, fontWeight: 600 }}>
            per {product.unit}
          </span>
        </div>
        <div className="product-card__actions">
          <Link className="button" href={href}>
            View product
          </Link>
          <button type="button" className="button light" onClick={quickAdd} aria-label={`Add ${product.name} to cart`}>
            {perBox ? "Add a box" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
