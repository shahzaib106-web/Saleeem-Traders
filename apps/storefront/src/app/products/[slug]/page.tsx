import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brandMap, categoryMap, products } from "@/data/catalog";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductPurchase } from "@/components/products/ProductPurchase";
import { ProductTabs } from "@/components/products/ProductTabs";
import { RelatedProducts } from "@/components/products/RelatedProducts";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  const category = categoryMap[product.category];
  const brand = brandMap[product.brand];

  return (
    <>
      <section className="container product-page">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link> / <Link href={`/category/${product.category}`}>{category?.name ?? product.category}</Link> /{" "}
          <span aria-current="page">{product.name}</span>
        </nav>
        <div className="product-detail">
          <ProductGallery product={product} />
          <div>
            {brand && (
              <p className="eyebrow">
                <Link href={`/brands/${brand.slug}`}>{brand.name}</Link>
              </p>
            )}
            <ProductPurchase product={product} />
          </div>
        </div>
        <ProductTabs product={product} />
      </section>
      <RelatedProducts category={product.category} current={product.slug} />
    </>
  );
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
