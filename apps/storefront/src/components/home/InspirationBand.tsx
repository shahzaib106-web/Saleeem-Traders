import Link from "next/link";
import { Arrow } from "@/components/ui/icons";

export function InspirationBand() {
  return (
    <section className="inspire" aria-label="Space inspiration">
      <div className="inspire__media">
        <img src="/images/demo/living-warm.jpg" alt="Warm living room with linen sofa, oak slat wall and porcelain floor" loading="lazy" />
      </div>
      <div className="inspire__body">
        <div className="inspire__copy">
          <p className="eyebrow">Space inspiration</p>
          <h2>
            A considered home.
            <br />
            Down to the details.
          </h2>
          <p>Discover finishes that bring your rooms together.</p>
          <Link className="btn btn--navy" href="/projects">
            Explore inspiration <Arrow />
          </Link>
        </div>
        <figure className="inspire__swatch">
          <img src="/images/demo/swatches.jpg" alt="Porcelain tile swatches in white marble, beige marble and greige stone" loading="lazy" />
          <figcaption>Material harmony for a more livable home.</figcaption>
        </figure>
      </div>
    </section>
  );
}
