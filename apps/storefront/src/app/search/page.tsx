import { products } from "@/data/catalog";
import { ProductGrid } from "@/components/products/ProductGrid";
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) { const { q = "" } = await searchParams; const results = products.filter(p => `${p.name} ${p.description}`.toLowerCase().includes(q.toLowerCase())); return <section className="section"><div className="container"><div className="section-head"><h1>Search results for “{q}”</h1></div><ProductGrid products={q ? results : products} /></div></section>; }
