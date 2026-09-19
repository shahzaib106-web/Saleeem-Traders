import type { Metadata } from "next";
import Link from "next/link";
import { brandMap, categories, products } from "@/data/catalog";
import { ProductGrid } from "@/components/products/ProductGrid";

export const metadata: Metadata = { title: "Search" };

function searchProducts(query: string) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  return products
    .map((p) => {
      const haystack = [p.name, p.description, p.category, brandMap[p.brand]?.name ?? p.brand, ...(p.tags ?? []), ...Object.values(p.specifications)]
        .join(" ")
        .toLowerCase();
      const hits = terms.filter((t) => haystack.includes(t)).length;
      const nameHit = terms.some((t) => p.name.toLowerCase().includes(t)) ? 1 : 0;
      return { p, score: hits === terms.length ? hits + nameHit : 0 };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = searchProducts(query);

  return (
    <section className="section search-page">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link> / Search
        </div>
        <h1>{query ? `Results for “${query}”` : "Search our range"}</h1>

        {/* Plain GET form: works before hydration and with JavaScript disabled. */}
        <form className="search-form" action="/search" method="get" role="search">
          <label className="sr-only" htmlFor="search-q">
            Search products
          </label>
          <input id="search-q" className="input" type="search" name="q" defaultValue={query} placeholder="Search tiles, basins, taps…" autoFocus={!query} />
          <button className="btn btn--navy" type="submit">
            Search
          </button>
        </form>

        <div className="chips search-suggestions" aria-label="Popular searches">
          {["marble", "matt", "grohe", "outdoor", "chrome", "basin"].map((term) => (
            <Link key={term} className="chip chip--link" href={`/search?q=${term}`}>
              {term}
            </Link>
          ))}
        </div>

        {query ? (
          results.length > 0 ? (
            <>
              <p className="muted listing-count">
                {results.length} product{results.length === 1 ? "" : "s"} found
              </p>
              <ProductGrid products={results} />
            </>
          ) : (
            <div className="empty-state">
              <h3>No products found for “{query}”</h3>
              <p className="muted">Check the spelling, try a broader term, or browse by category below.</p>
              <div className="empty-state__actions">
                <Link className="button" href="/products">
                  Browse all products
                </Link>
                <Link className="button secondary" href="/quote">
                  Ask us to source it
                </Link>
              </div>
            </div>
          )
        ) : (
          <div className="cat-grid search-categories">
            {categories.map((c) => (
              <Link className="cat-card" key={c.slug} href={`/category/${c.slug}`}>
                <img src={c.heroImage} alt={c.name} loading="lazy" />
                <span className="cat-card__label">{c.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
