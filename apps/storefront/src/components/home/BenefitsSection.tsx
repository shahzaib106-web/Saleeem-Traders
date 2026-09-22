import { IconDocument, IconTruck, IconUsers } from "@/components/ui/icons";
import { reveal } from "@/lib/motion";

const items = [
  { Icon: IconUsers, title: "Expert product guidance", sub: "Support for your selection" },
  { Icon: IconDocument, title: "Project quotations", sub: "Tailored solutions for your project" },
  { Icon: IconTruck, title: "Delivery support", sub: "Flexible and reliable across Pakistan" }
];

export function BenefitsSection() {
  return (
    <section className="trust-bar" aria-label="Why shop with Saleem Traders">
      <div className="container trust-bar__grid">
        {items.map(({ Icon, title, sub }, index) => (
          <div className="trust-item" key={title} {...reveal(index, "fade", 90)}>
            <Icon />
            <div>
              <strong>{title}</strong>
              <span>{sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
