import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, projects } from "@/data/catalog";
import { ProductGrid } from "@/components/products/ProductGrid";
import { reveal } from "@/lib/motion";

type Params = Promise<{ slug: string }>;

const relatedCategory: Record<string, string> = { Bathrooms: "sanitaryware", Kitchens: "kitchen", "Living spaces": "tiles", Outdoor: "tiles" };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.desc } : {};
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const others = projects.filter((x) => x.slug !== slug && x.type === p.type).slice(0, 2);
  const shop = products.filter((x) => x.category === relatedCategory[p.type]).slice(0, 3);

  return (
    <section className="container section">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/projects">Inspiration</Link> / <span aria-current="page">{p.title}</span>
      </nav>
      <div className="page-hero with-image">
        <div {...reveal(0, "up")}>
          <span className="badge">{p.type}</span>
          <h1>{p.title}</h1>
          <p className="muted lead">{p.desc}</p>
          <div className="hero-actions">
            <Link className="button" href={`/quote?category=${relatedCategory[p.type]}`}>
              Request this look →
            </Link>
            <Link className="button secondary" href={`/category/${relatedCategory[p.type]}`}>
              Shop the products
            </Link>
          </div>
        </div>
        <img src={p.image} alt={p.title} {...reveal(1, "scale", 120)} />
      </div>

      {shop.length > 0 && (
        <div className="section" style={{ paddingBottom: 0 }}>
          <div className="section-head">
            <h2>Get the look</h2>
            <Link className="link-u" href={`/category/${relatedCategory[p.type]}`}>
              View all
            </Link>
          </div>
          <ProductGrid products={shop} />
        </div>
      )}

      {others.length > 0 && (
        <div className="section" style={{ paddingBottom: 0 }}>
          <h2>More {p.type.toLowerCase()}</h2>
          <div className="masonry">
            {others.map((o, index) => (
              <Link key={o.slug} href={`/projects/${o.slug}`} className="project-card" {...reveal(index, "scale", 80)}>
                <img src={o.image} alt={o.title} loading="lazy" />
                <h3>
                  {o.title}
                  <br />
                  <small>Explore the look →</small>
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
