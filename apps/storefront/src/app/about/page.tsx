import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { IconDocument, IconTruck, IconUsers } from "@/components/ui/icons";

export const metadata: Metadata = { title: "About us", description: "Tiles, sanitaryware and kitchen fittings, brought together in one place." };

const VALUES = [
  { Icon: IconUsers, title: "Thoughtful product selection", text: "A curated range for different styles and budgets." },
  { Icon: IconDocument, title: "Clear product guidance", text: "Simple, honest advice on finishes and suitability." },
  { Icon: IconTruck, title: "Project quotations", text: "Tailored quotes for home and commercial projects." }
];

const PROCESS = [
  ["Explore the range", "Browse online or in our showroom."],
  ["Compare your options", "Look at finishes, sizes and price points."],
  ["Request your quotation", "Share your requirements and get a tailored quote."]
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Saleem Traders"
        title="Helping you choose well."
        text="Tiles, sanitaryware and kitchen fittings, brought together in one place."
        image="/images/demo/showroom.jpg"
        imageAlt="The Saleem Traders showroom floor"
        crumbs={[{ label: "About" }]}
        primary={{ label: "Visit our showroom", href: "/contact" }}
        secondary={{ label: "Browse products", href: "/products" }}
      />
      <section className="container section about">
        <h2 className="center">A practical partner for your project</h2>
        <div className="split">
          <p>Choosing the right tiles, sanitaryware, kitchen fittings and accessories is easier when you can see, compare and get straightforward advice.</p>
          <p>At Saleem Traders, we bring a wide range of trusted brands together, so you can compare finishes, dimensions and budgets in one place.</p>
        </div>

        <div className="about-values">
          {VALUES.map(({ Icon, title, text }) => (
            <div key={title}>
              <div className="icon">
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <div className="showcase-row">
          <img src="/images/demo/tiles.jpg" alt="Tile display" loading="lazy" />
          <img src="/images/demo/tap.jpg" alt="Kitchen mixer tap" loading="lazy" />
          <img src="/images/demo/showroom.jpg" alt="Showroom interior" loading="lazy" />
        </div>

        <h2 className="center" style={{ marginTop: 48 }}>
          From first ideas to finishing touches
        </h2>
        <div className="process">
          {PROCESS.map(([title, text], i) => (
            <div key={title}>
              <span className="step-no">{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <div className="panel cta-panel">
          <div>
            <h2>Find the right fit for your space</h2>
            <p className="muted">Talk to our team and get a quotation.</p>
          </div>
          <Link className="button" href="/quote">
            Request a quote →
          </Link>
        </div>
      </section>
    </>
  );
}
