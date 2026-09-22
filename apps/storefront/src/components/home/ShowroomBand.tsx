import Link from "next/link";
import { Arrow } from "@/components/ui/icons";
import { reveal } from "@/lib/motion";

export function ShowroomBand() {
  return (
    <section className="showroom-band">
      <div className="container showroom-band__inner">
        <h2 {...reveal(0, "fade")}>See the details in person.</h2>
        <div className="showroom-band__divider" aria-hidden="true" {...reveal(1, "fade", 90)} />
        <p {...reveal(2, "fade", 90)}>Explore our wide range of tiles, sanitaryware and fittings at our showroom.</p>
        <Link className="btn btn--white" href="/contact" {...reveal(3, "fade", 90)}>
          Plan a showroom visit <Arrow />
        </Link>
      </div>
    </section>
  );
}
