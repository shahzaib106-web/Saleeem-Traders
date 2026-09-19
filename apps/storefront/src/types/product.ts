export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  /** Unit the `price` is quoted per, e.g. "sq ft", "piece", "set". */
  unit: string;
  /** Price per box for products sold in packs (tiles). */
  packPrice?: number;
  oldPrice?: number;
  rating: number;
  badge?: string;
  image: string;
  /** Additional gallery images shown on the product page. */
  gallery?: string[];
  description: string;
  specifications: Record<string, string>;
  /** Sub-category tags used by the category page tabs, e.g. ["floor", "wall"]. */
  tags?: string[];
  /** Selectable size variants. */
  sizes?: string[];
  /** Selectable finish variants. */
  finishes?: string[];
  /** Coverage per box in sq ft (tiles only) — drives the quantity calculator. */
  coverage?: number;
  /** Defaults to true when omitted. */
  inStock?: boolean;
};
