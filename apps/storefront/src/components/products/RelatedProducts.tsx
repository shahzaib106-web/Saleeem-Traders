import Link from "next/link";
import { categoryMap, products } from "@/data/catalog";
import { Arrow } from "@/components/ui/icons";
import { ProductGrid } from "./ProductGrid";

export function RelatedProducts({ category, current }: { category: string; current: string }) {
  const sameCategory = products.filter((p) => p.category === category && p.slug !== current);
  const fallback = products.filter((p) => p.category !== category);
  const related = [...sameCategory, ...fallback].slice(0, 3);
  const name = categoryMap[category]?.name ?? category;

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Related products</h2>
          <Link className="link-u" href={`/category/${category}`}>
            View all {name.toLowerCase()} <Arrow />
          </Link>
        </div>
        <ProductGrid products={related} />
      </div>
    </section>
  );
}
