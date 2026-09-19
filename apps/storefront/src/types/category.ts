export type Subcategory = { label: string; tag: string };

export type Category = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  /** Small uppercase line above the hero headline. */
  eyebrow: string;
  /** Headline used in the full-bleed category hero. */
  heroTitle: string;
  /** Full-bleed hero background image. */
  heroImage: string;
  heroAlt: string;
  /** Tabs shown under the hero. "All" is added automatically. */
  subcategories: Subcategory[];
};
