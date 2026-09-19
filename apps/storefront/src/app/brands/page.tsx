import type { Metadata } from "next";
import Link from "next/link";
import { BrandDirectory } from "@/components/brands/BrandDirectory";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = { title: "Brands", description: "Find tiles, sanitaryware and fittings by manufacturer." };

export default function BrandsPage() {
  return (
    <>
      <PageHero
        eyebrow="Trusted manufacturers"
        title="Explore our brands."
        text="Find tiles and fittings by manufacturer."
        image="/images/demo/showroom.jpg"
        imageAlt="Brand displays inside the Saleem Traders showroom"
        crumbs={[{ label: "Brands" }]}
        primary={{ label: "Shop all products", href: "/products" }}
      />
      <section className="section">
        <div className="container">
          <BrandDirectory />
        </div>
      </section>
      <section className="cta-strip">
        <div className="container cta-panel">
          <div>
            <h2>Need help comparing options?</h2>
            <p className="muted">Our team can help you choose the right products for your space and budget.</p>
          </div>
          <Link className="button" href="/quote">
            Request a quote
          </Link>
        </div>
      </section>
    </>
  );
}
