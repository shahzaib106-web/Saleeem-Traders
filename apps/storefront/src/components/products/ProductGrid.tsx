import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid products">
      {products.map((product, index) => (
        // The index drives the staggered scroll-reveal; ProductCard applies it to
        // its own <article> so the grid keeps flex-stretching cards to equal height.
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
