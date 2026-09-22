import Link from "next/link";
import { Arrow } from "@/components/ui/icons";
import { reveal } from "@/lib/motion";

const cards = [
  { label: "Tiles", href: "/category/tiles", image: "/images/demo/tiles.jpg" },
  { label: "Sanitaryware", href: "/category/sanitaryware", image: "/images/demo/commode.jpg" },
  { label: "Kitchen", href: "/category/kitchen", image: "/images/demo/kitchen.jpg" },
  { label: "Accessories", href: "/category/accessories", image: "/images/demo/accessories-towels.jpg" }
];

export function CategoryGrid() {
  return (
    <section className="home-section">
      <div className="container">
        <div className="home-head" {...reveal(0, "fade")}>
          <p className="eyebrow">Shop by category</p>
          <h2>Find your finishing touch.</h2>
        </div>
        <div className="cat-grid">
          {cards.map((card, index) => (
            <Link className="cat-card" key={card.href} href={card.href} {...reveal(index, "up", 90)}>
              <img src={card.image} alt={card.label} loading="lazy" />
              <span className="cat-card__label">
                {card.label} <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
