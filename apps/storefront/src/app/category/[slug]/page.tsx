import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, products } from "@/data/catalog";
import { PageHero } from "@/components/layout/PageHero";
import { ProductListing } from "@/components/products/ProductListing";

type Params = Promise<{ slug: string }>;
type Search = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({ params, searchParams }: { params: Params; searchParams: Search }) {
  const { slug } = await params;
  // Reading searchParams opts this route into request-time rendering so the
  // client listing receives the URL filters during SSR (no blank grid on load).
  await searchParams;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();
  const list = products.filter((p) => p.category === slug);

  return (
    <>
      <PageHero
        eyebrow={category.eyebrow}
        title={category.heroTitle}
        text={category.description}
        image={category.heroImage}
        imageAlt={category.heroAlt}
        crumbs={[{ label: category.name }]}
        primary={{ label: "Request a quote", href: `/quote?category=${category.slug}` }}
        secondary={{ label: "Browse all products", href: "/products" }}
      />
      <ProductListing products={list} category={category} />
    </>
  );
}
