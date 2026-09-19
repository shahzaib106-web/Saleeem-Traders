import { products } from "@/data/catalog";
import { ProductGrid } from "./ProductGrid";
export function RelatedProducts({ category, current }: { category: string; current: string }) { const related = products.filter(p => p.category === category && p.slug !== current).concat(products.filter(p => p.slug !== current)).slice(0, 3); return <section className="section"><div className="container"><div className="section-head"><h2>Related products</h2></div><ProductGrid products={related} /></div></section>; }
