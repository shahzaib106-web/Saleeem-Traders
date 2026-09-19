import { notFound } from "next/navigation";
import { brands, products } from "@/data/catalog";
import { ProductGrid } from "@/components/products/ProductGrid";
export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const brand = brands.find(b => b.slug === slug); if (!brand) notFound(); return <section className="section"><div className="container"><div className="section-head"><div><h1>{brand.name}</h1><p>{brand.description}</p></div></div><ProductGrid products={products.filter(p => p.brand === slug)} /></div></section>; }
export function generateStaticParams() { return brands.map(b => ({ slug: b.slug })); }
