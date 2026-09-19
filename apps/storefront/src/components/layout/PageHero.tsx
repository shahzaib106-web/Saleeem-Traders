import Link from "next/link";
import { Arrow } from "@/components/ui/icons";

export type Crumb = { label: string; href?: string };

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  image: string;
  imageAlt: string;
  crumbs?: Crumb[];
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Slightly shorter than the homepage hero. Default: true. */
  compact?: boolean;
};

/**
 * Full-bleed hero shared by category, shop and other landing pages.
 * Reuses the homepage `.home-hero` styles so both heroes look identical.
 */
export function PageHero({ eyebrow, title, text, image, imageAlt, crumbs, primary, secondary, compact = true }: PageHeroProps) {
  return (
    <section className={`home-hero${compact ? " home-hero--page" : ""}`}>
      <div className="home-hero__media">
        <img src={image} alt={imageAlt} fetchPriority="high" />
      </div>
      <div className="home-hero__shade" aria-hidden="true" />
      <div className="container home-hero__inner">
        {crumbs && crumbs.length > 0 && (
          <nav className="home-hero__crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            {crumbs.map((crumb) => (
              <span key={crumb.label}>
                <span aria-hidden="true"> / </span>
                {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        {(primary || secondary) && (
          <div className="home-hero__actions">
            {primary && (
              <Link className="btn btn--cream" href={primary.href}>
                {primary.label} <Arrow />
              </Link>
            )}
            {secondary && (
              <Link className="hero-link" href={secondary.href}>
                {secondary.label} <Arrow />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
