import Link from "next/link";
import { products } from "@/data/catalog";
import { ProductGrid } from "@/components/products/ProductGrid";
export function FeaturedProducts() { return <section className="section"><div className="container"><div className="section-head"><div><h2>Featured products</h2><p>Popular picks for quality-conscious homeowners, architects and contractors.</p></div><Link className="button secondary" href="/products">View catalog</Link></div><ProductGrid products={products.slice(0, 6)} /></div></section>; }
