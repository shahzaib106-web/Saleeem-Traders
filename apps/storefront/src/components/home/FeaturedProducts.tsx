import Link from "next/link";
import { products } from "@/data/catalog";
import { Arrow } from "@/components/ui/icons";
import { reveal } from "@/lib/motion";

const picks = [
  { slug: "carrara-white-tile", meta: "Porcelain • Marble effect", image: "/images/demo/product-carrara.jpg" },
  { slug: "wall-hung-commode", meta: "Ceramic • White", image: "/images/demo/product-commode.jpg" },
  { slug: "kitchen-mixer-tap", meta: "Brushed finish", image: "/images/demo/product-tap.jpg" },
  { slug: "rain-shower-set", meta: "Wall mounted", image: "/images/demo/product-shower.jpg" }
];

export function FeaturedProducts() {
  return (
    <section className="home-section" style={{ paddingTop: 8 }}>
      <div className="container">
        <div className="home-head home-head--row" {...reveal(0, "fade")}>
          <h2>Made for everyday living.</h2>
          <Link className="link-u" href="/products">
            Explore products <Arrow />
          </Link>
        </div>
        <div className="pcard-grid">
          {picks.map((pick, index) => {
            const product = products.find((p) => p.slug === pick.slug);
            if (!product) return null;
            return (
              <Link className="pcard" key={product.slug} href={`/products/${product.slug}`} {...reveal(index, "up", 80)}>
                <div className="pcard__media">
                  <img src={pick.image} alt={product.name} loading="lazy" />
                </div>
                <h3>{product.name}</h3>
                <p>{pick.meta}</p>
                <span className="link-u">
                  Request price <Arrow />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
