import Link from "next/link";
import { Arrow } from "@/components/ui/icons";

export function ShowroomBand() {
  return (
    <section className="showroom-band">
      <div className="container showroom-band__inner">
        <h2>See the details in person.</h2>
        <div className="showroom-band__divider" aria-hidden="true" />
        <p>Explore our wide range of tiles, sanitaryware and fittings at our showroom.</p>
        <Link className="btn btn--white" href="/contact">
          Plan a showroom visit <Arrow />
        </Link>
      </div>
    </section>
  );
}
