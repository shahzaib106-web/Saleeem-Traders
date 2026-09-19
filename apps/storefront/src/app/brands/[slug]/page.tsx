import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, products } from "@/data/catalog";
import { ProductGrid } from "@/components/products/ProductGrid";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  return brand ? { title: brand.name, description: `${brand.name} — ${brand.description}` } : {};
}

export default async function BrandPage({ params }: { params: Params }) {
  const { slug } = await params;
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) notFound();
  const list = products.filter((p) => p.brand === slug);

  return (
    <section className="section">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link> / <Link href="/brands">Brands</Link> / <span aria-current="page">{brand.name}</span>
        </nav>
        <div className="section-head">
          <div>
            <p className="eyebrow">{brand.description}</p>
            <h1>{brand.name}</h1>
            <p className="muted">
              {list.length} product{list.length === 1 ? "" : "s"} available
            </p>
          </div>
          <Link className="button secondary" href={`/quote`}>
            Ask about {brand.name}
          </Link>
        </div>
        {list.length > 0 ? (
          <ProductGrid products={list} />
        ) : (
          <div className="empty-state">
            <h3>No {brand.name} products listed online yet</h3>
            <p className="muted">We stock more than we show here — send us a quote request and we&apos;ll price it for you.</p>
            <div className="empty-state__actions">
              <Link className="button" href="/quote">
                Request a quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}
