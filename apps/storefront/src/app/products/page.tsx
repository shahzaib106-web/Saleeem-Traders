import type { Metadata } from "next";
import Link from "next/link";
import { categories, products } from "@/data/catalog";
import { PageHero } from "@/components/layout/PageHero";
import { ProductListing } from "@/components/products/ProductListing";

export const metadata: Metadata = {
  title: "Shop all products",
  description: "Explore tiles, sanitaryware, kitchen fittings and accessories from trusted brands."
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await searchParams; // request-time rendering so filters in the URL are applied during SSR

  return (
    <>
      <PageHero
        eyebrow="The full range"
        title="Find the right finish."
        text="Explore tiles, sanitaryware, kitchen fittings and accessories."
        image="/images/demo/showroom.jpg"
        imageAlt="Saleem Traders showroom with tile and sanitaryware displays"
        crumbs={[{ label: "Shop" }]}
        primary={{ label: "Request a quote", href: "/quote" }}
        secondary={{ label: "Visit our showroom", href: "/contact" }}
      />
      <div className="container">
        <nav className="tabs" aria-label="Browse by category">
          <span className="tab active" aria-current="page">
            All products
          </span>
          {categories.map((c) => (
            <Link key={c.slug} className="tab" href={`/category/${c.slug}`}>
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
      <ProductListing products={products} />
    </>
  );
}
