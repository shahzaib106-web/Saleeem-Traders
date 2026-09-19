"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/product";
import type { Category } from "@/types/category";
import { brandMap, categories } from "@/data/catalog";
import { PAGE_SIZE } from "@/lib/constants";
import { formatCurrency } from "@/lib/currency";
import { IconClose, IconFilter } from "@/components/ui/icons";
import { ProductGrid } from "./ProductGrid";

type SortKey = "recommended" | "price-asc" | "price-desc" | "rating" | "name";

const SORTS: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "name", label: "Name A – Z" }
];

type Props = {
  /** Products in scope for this listing (already narrowed to a category when applicable). */
  products: Product[];
  /** When provided, sub-category tabs are shown and the category facet is hidden. */
  category?: Category;
  /** Heading shown above the grid on the shop page, e.g. "All products". */
  title?: string;
};

type Filters = {
  tab: string;
  cats: string[];
  sizes: string[];
  finishes: string[];
  brands: string[];
  stock: "" | "in" | "order";
  min: string;
  max: string;
  sort: SortKey;
  page: number;
};

const list = (value: string | null) => (value ? value.split(",").filter(Boolean) : []);
const sizeOf = (p: Product) => (p.sizes?.length ? p.sizes : p.specifications.Size ? [p.specifications.Size] : []);
const finishOf = (p: Product) => (p.finishes?.length ? p.finishes : p.specifications.Finish ? [p.specifications.Finish] : []);
const intersects = (a: string[], b: string[]) => a.some((x) => b.includes(x));

function readFilters(params: URLSearchParams): Filters {
  const sort = params.get("sort") as SortKey | null;
  const stock = params.get("stock");
  return {
    tab: params.get("tab") ?? "",
    cats: list(params.get("cat")),
    sizes: list(params.get("size")),
    finishes: list(params.get("finish")),
    brands: list(params.get("brand")),
    stock: stock === "in" || stock === "order" ? stock : "",
    min: params.get("min") ?? "",
    max: params.get("max") ?? "",
    sort: sort && SORTS.some((s) => s.value === sort) ? sort : "recommended",
    page: Math.max(1, Number(params.get("page")) || 1)
  };
}

function writeFilters(f: Filters) {
  const params = new URLSearchParams();
  if (f.tab) params.set("tab", f.tab);
  if (f.cats.length) params.set("cat", f.cats.join(","));
  if (f.sizes.length) params.set("size", f.sizes.join(","));
  if (f.finishes.length) params.set("finish", f.finishes.join(","));
  if (f.brands.length) params.set("brand", f.brands.join(","));
  if (f.stock) params.set("stock", f.stock);
  if (f.min) params.set("min", f.min);
  if (f.max) params.set("max", f.max);
  if (f.sort !== "recommended") params.set("sort", f.sort);
  if (f.page > 1) params.set("page", String(f.page));
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function ProductListing({ products, category, title }: Props) {
  const searchParams = useSearchParams();
  const filters = useMemo(() => readFilters(new URLSearchParams(searchParams.toString())), [searchParams]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceDraft, setPriceDraft] = useState({ min: filters.min, max: filters.max });

  useEffect(() => setPriceDraft({ min: filters.min, max: filters.max }), [filters.min, filters.max]);

  // Lock body scroll while the mobile filter drawer is open.
  useEffect(() => {
    if (!filtersOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [filtersOpen]);

  /**
   * Updates the URL without a server round-trip. Next.js patches the History API,
   * so `useSearchParams` re-renders with the new values (and back/forward works).
   */
  const update = useCallback(
    (patch: Partial<Filters>, mode: "replace" | "push" = "replace") => {
      const next: Filters = { ...filters, ...patch };
      if (!("page" in patch)) next.page = 1;
      const url = `${window.location.pathname}${writeFilters(next)}`;
      if (mode === "push") window.history.pushState(null, "", url);
      else window.history.replaceState(null, "", url);
    },
    [filters]
  );

  const toggleIn = (key: "cats" | "sizes" | "finishes" | "brands", value: string) => {
    const current = filters[key];
    update({ [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value] } as Partial<Filters>);
  };

  const clearAll = () => update({ cats: [], sizes: [], finishes: [], brands: [], stock: "", min: "", max: "" });

  /* ---------------------------------------------------------------- */
  /* Derived data                                                      */
  /* ---------------------------------------------------------------- */

  const tabbed = useMemo(
    () => (filters.tab ? products.filter((p) => p.tags?.includes(filters.tab)) : products),
    [products, filters.tab]
  );

  const facets = useMemo(() => {
    const count = (getter: (p: Product) => string[]) => {
      const map = new Map<string, number>();
      tabbed.forEach((p) => getter(p).forEach((v) => map.set(v, (map.get(v) ?? 0) + 1)));
      return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true }));
    };
    return {
      cats: category ? [] : count((p) => [p.category]),
      sizes: count(sizeOf),
      finishes: count(finishOf),
      brands: count((p) => [p.brand]),
      inStock: tabbed.filter((p) => p.inStock !== false).length,
      onOrder: tabbed.filter((p) => p.inStock === false).length
    };
  }, [tabbed, category]);

  const filtered = useMemo(() => {
    const min = Number(filters.min) || 0;
    const max = Number(filters.max) || Infinity;
    const result = tabbed.filter((p) => {
      if (filters.cats.length && !filters.cats.includes(p.category)) return false;
      if (filters.sizes.length && !intersects(filters.sizes, sizeOf(p))) return false;
      if (filters.finishes.length && !intersects(filters.finishes, finishOf(p))) return false;
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (filters.stock === "in" && p.inStock === false) return false;
      if (filters.stock === "order" && p.inStock !== false) return false;
      if (p.price < min || p.price > max) return false;
      return true;
    });
    const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
      recommended: (a, b) => b.rating - a.rating || a.name.localeCompare(b.name),
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      name: (a, b) => a.name.localeCompare(b.name)
    };
    return [...result].sort(sorters[filters.sort]);
  }, [tabbed, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(filters.page, totalPages);
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const from = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, filtered.length);

  const goToPage = (n: number) => {
    update({ page: n }, "push");
    document.getElementById("listing-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* Active filter chips */
  const chips: { label: string; onRemove: () => void }[] = [
    ...filters.cats.map((c) => ({ label: categories.find((x) => x.slug === c)?.name ?? c, onRemove: () => toggleIn("cats", c) })),
    ...filters.sizes.map((s) => ({ label: s, onRemove: () => toggleIn("sizes", s) })),
    ...filters.finishes.map((f) => ({ label: f, onRemove: () => toggleIn("finishes", f) })),
    ...filters.brands.map((b) => ({ label: brandMap[b]?.name ?? b, onRemove: () => toggleIn("brands", b) })),
    ...(filters.stock ? [{ label: filters.stock === "in" ? "In stock" : "Made to order", onRemove: () => update({ stock: "" }) }] : []),
    ...(filters.min || filters.max
      ? [
          {
            label: `PKR ${filters.min || "0"} – ${filters.max || "any"}`,
            onRemove: () => update({ min: "", max: "" })
          }
        ]
      : [])
  ];

  const applyPrice = (event: React.FormEvent) => {
    event.preventDefault();
    update({ min: priceDraft.min.replace(/[^\d]/g, ""), max: priceDraft.max.replace(/[^\d]/g, "") });
  };

  const panelId = "listing-filters";

  /* ---------------------------------------------------------------- */
  /* Render                                                             */
  /* ---------------------------------------------------------------- */

  const Facet = ({
    heading,
    options,
    selected,
    onToggle,
    render = (v: string) => v
  }: {
    heading: string;
    options: [string, number][];
    selected: string[];
    onToggle: (value: string) => void;
    render?: (value: string) => string;
  }) =>
    options.length === 0 ? null : (
      <fieldset className="filter-group">
        <legend>
          <strong>{heading}</strong>
        </legend>
        {options.map(([value, n]) => (
          <label className="filter-option" key={value}>
            <input type="checkbox" checked={selected.includes(value)} onChange={() => onToggle(value)} />
            <span>{render(value)}</span>
            <span className="count">{n}</span>
          </label>
        ))}
      </fieldset>
    );

  return (
    <>
      {category && (
        <div className="container">
          <div className="tabs" role="tablist" aria-label={`${category.name} types`}>
            <button
              type="button"
              role="tab"
              className={`tab${!filters.tab ? " active" : ""}`}
              aria-selected={!filters.tab}
              onClick={() => update({ tab: "" })}
            >
              All {category.name.toLowerCase()}
            </button>
            {category.subcategories.map((sub) => (
              <button
                type="button"
                role="tab"
                key={sub.tag}
                className={`tab${filters.tab === sub.tag ? " active" : ""}`}
                aria-selected={filters.tab === sub.tag}
                onClick={() => update({ tab: sub.tag })}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <section className="container shop-layout" id="listing-top">
        <div className={`filter-backdrop${filtersOpen ? " open" : ""}`} onClick={() => setFiltersOpen(false)} aria-hidden="true" />
        <aside className={`filter-panel${filtersOpen ? " open" : ""}`} id={panelId} aria-label="Filters">
          <div className="filter-panel__head">
            <h2>Filters</h2>
            <div className="filter-panel__head-actions">
              {chips.length > 0 && (
                <button type="button" className="filter-clear" onClick={clearAll}>
                  Clear all
                </button>
              )}
              <button type="button" className="icon-btn filter-panel__close" aria-label="Close filters" onClick={() => setFiltersOpen(false)}>
                <IconClose />
              </button>
            </div>
          </div>

          <Facet
            heading="Category"
            options={facets.cats}
            selected={filters.cats}
            onToggle={(v) => toggleIn("cats", v)}
            render={(v) => categories.find((c) => c.slug === v)?.name ?? v}
          />
          <Facet heading="Size" options={facets.sizes} selected={filters.sizes} onToggle={(v) => toggleIn("sizes", v)} />
          <Facet heading="Finish" options={facets.finishes} selected={filters.finishes} onToggle={(v) => toggleIn("finishes", v)} />
          <Facet
            heading="Brand"
            options={facets.brands}
            selected={filters.brands}
            onToggle={(v) => toggleIn("brands", v)}
            render={(v) => brandMap[v]?.name ?? v}
          />

          <fieldset className="filter-group">
            <legend>
              <strong>Availability</strong>
            </legend>
            <label className="filter-option">
              <input type="radio" name="stock" checked={filters.stock === ""} onChange={() => update({ stock: "" })} />
              <span>All</span>
              <span className="count">{tabbed.length}</span>
            </label>
            <label className="filter-option">
              <input type="radio" name="stock" checked={filters.stock === "in"} onChange={() => update({ stock: "in" })} />
              <span>In stock</span>
              <span className="count">{facets.inStock}</span>
            </label>
            <label className="filter-option">
              <input type="radio" name="stock" checked={filters.stock === "order"} onChange={() => update({ stock: "order" })} />
              <span>Made to order</span>
              <span className="count">{facets.onOrder}</span>
            </label>
          </fieldset>

          <form className="filter-group" onSubmit={applyPrice}>
            <strong>Price (PKR)</strong>
            <div className="price-range">
              <label className="sr-only" htmlFor="price-min">
                Minimum price
              </label>
              <input
                id="price-min"
                className="input"
                inputMode="numeric"
                placeholder="Min"
                value={priceDraft.min}
                onChange={(e) => setPriceDraft((d) => ({ ...d, min: e.target.value }))}
              />
              <span aria-hidden="true">–</span>
              <label className="sr-only" htmlFor="price-max">
                Maximum price
              </label>
              <input
                id="price-max"
                className="input"
                inputMode="numeric"
                placeholder="Max"
                value={priceDraft.max}
                onChange={(e) => setPriceDraft((d) => ({ ...d, max: e.target.value }))}
              />
            </div>
            <button type="submit" className="button light filter-apply">
              Apply price
            </button>
          </form>

          <div className="filter-panel__foot">
            <button type="button" className="button" onClick={() => setFiltersOpen(false)}>
              Show {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </button>
          </div>
        </aside>

        <div className="listing">
          <div className="listing-toolbar">
            <div className="listing-toolbar__left">
              <button
                type="button"
                className="button light filters-toggle"
                aria-expanded={filtersOpen}
                aria-controls={panelId}
                onClick={() => setFiltersOpen(true)}
              >
                <IconFilter /> Filters{chips.length > 0 ? ` (${chips.length})` : ""}
              </button>
              {title && <h2 className="listing-title">{title}</h2>}
              <p className="listing-count" aria-live="polite">
                {filtered.length === 0 ? "No products match" : `Showing ${from}–${to} of ${filtered.length} product${filtered.length === 1 ? "" : "s"}`}
              </p>
            </div>
            <label className="sort-control">
              <span>Sort:</span>
              <select className="select" value={filters.sort} onChange={(e) => update({ sort: e.target.value as SortKey })}>
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {chips.length > 0 && (
            <div className="chips" aria-label="Active filters">
              {chips.map((chip) => (
                <span className="chip" key={chip.label}>
                  {chip.label}
                  <button type="button" aria-label={`Remove filter ${chip.label}`} onClick={chip.onRemove}>
                    ×
                  </button>
                </span>
              ))}
              <button type="button" className="filter-clear" onClick={clearAll}>
                Clear all
              </button>
            </div>
          )}

          {pageItems.length > 0 ? (
            <ProductGrid products={pageItems} />
          ) : (
            <div className="empty-state">
              <h3>No products match these filters</h3>
              <p className="muted">Try removing a filter, or tell us what you need and we&apos;ll source it.</p>
              <div className="empty-state__actions">
                <button type="button" className="button" onClick={clearAll}>
                  Clear filters
                </button>
                <Link className="button secondary" href="/quote">
                  Request a quote
                </Link>
              </div>
            </div>
          )}

          {totalPages > 1 && (
            <nav className="pagination" aria-label="Pagination">
              <button type="button" onClick={() => goToPage(page - 1)} disabled={page === 1} aria-label="Previous page">
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button type="button" key={n} onClick={() => goToPage(n)} aria-current={n === page ? "page" : undefined} aria-label={`Page ${n}`}>
                  {n}
                </button>
              ))}
              <button type="button" onClick={() => goToPage(page + 1)} disabled={page === totalPages} aria-label="Next page">
                ›
              </button>
            </nav>
          )}

          <p className="listing-foot muted">
            Prices shown {category?.slug === "tiles" ? "per sq ft; tiles are sold by the box." : "per unit."} Delivery calculated at checkout.{" "}
            {filtered.length > 0 && <>Lowest price in view: {formatCurrency(Math.min(...filtered.map((p) => p.price)))}.</>}
          </p>
        </div>
      </section>
    </>
  );
}
