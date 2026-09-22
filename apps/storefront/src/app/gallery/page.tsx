import type { Metadata } from "next";
import Link from "next/link";
import { gallery } from "@/data/catalog";
import { reveal } from "@/lib/motion";

export const metadata: Metadata = { title: "Gallery", description: "Showroom displays and project inspiration." };

export default function GalleryPage() {
  return (
    <section className="section">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link> / Gallery
        </nav>
        <div className="section-head">
          <div>
            <h1>Gallery</h1>
            <p className="muted">Showroom displays and project inspiration.</p>
          </div>
          <Link className="button secondary" href="/contact">
            Plan a visit
          </Link>
        </div>
        <div className="masonry">
          {gallery.map((item, index) => (
            <figure className="project-card" key={item.title} {...reveal(index, "scale", 70)}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <h3>{item.title}</h3>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
