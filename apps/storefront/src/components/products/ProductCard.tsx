import Link from "next/link";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/currency";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`}>
        <div className="product-card__media"><img src={product.image} alt={product.name} /><span className="wish">♡</span></div>
        <div className="product-card__body"><h3>{product.name}</h3><div className="muted">{product.category}</div><div className="price">{formatCurrency(product.price)} <span className="muted" style={{fontSize:14,fontWeight:600}}>per {product.unit}</span></div><span className="button">View product</span></div>
      </Link>
    </article>
  );
}