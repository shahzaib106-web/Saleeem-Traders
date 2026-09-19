import Link from "next/link";
import { Arrow } from "@/components/ui/icons";

export function HeroSection() {
  return (
    <section className="home-hero">
      <div className="home-hero__media">
        <img src="/images/demo/hero-bath.jpg" alt="Sunlit bathroom with a freestanding tub, stone tiles and bronze fittings" />
      </div>
      <div className="home-hero__shade" aria-hidden="true" />
      <div className="container home-hero__inner">
        <p className="eyebrow">Premium surfaces for modern living</p>
        <h1>
          Better spaces
          <br />
          start here.
        </h1>
        <p>Tiles, sanitaryware and fittings, thoughtfully selected for your home.</p>
        <div className="home-hero__actions">
          <Link className="btn btn--cream" href="/products">
            Explore collections <Arrow />
          </Link>
          <Link className="hero-link" href="/contact">
            Visit our showroom <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
