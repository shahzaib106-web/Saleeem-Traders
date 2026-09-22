"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { brands, products } from "@/data/catalog";
import { IconSearch } from "@/components/ui/icons";
import { reveal } from "@/lib/motion";

const RANGES = [
  { label: "All", test: () => true },
  { label: "A – F", test: (c: string) => c >= "A" && c <= "F" },
  { label: "G – L", test: (c: string) => c >= "G" && c <= "L" },
  { label: "M – R", test: (c: string) => c >= "M" && c <= "R" },
  { label: "S – Z", test: (c: string) => c >= "S" && c <= "Z" }
];

export function BrandDirectory() {
  const [query, setQuery] = useState("");
  const [range, setRange] = useState(0);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return brands.filter((b) => RANGES[range].test(b.name[0].toUpperCase()) && (!q || `${b.name} ${b.description}`.toLowerCase().includes(q)));
  }, [query, range]);

  const countFor = (slug: string) => products.filter((p) => p.brand === slug).length;

  return (
    <>
      <div className="brand-toolbar">
        <label className="search brand-search">
          <IconSearch />
          <span className="sr-only">Search brands</span>
          <input type="search" placeholder="Search brands…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <div className="tabs" role="tablist" aria-label="Filter brands by letter">
          {RANGES.map((r, i) => (
            <button type="button" role="tab" key={r.label} className={`tab${range === i ? " active" : ""}`} aria-selected={range === i} onClick={() => setRange(i)}>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="grid brand-grid">
          {visible.map((b, index) => (
            <Link className="brand-card" href={`/brands/${b.slug}`} key={b.slug} {...reveal(index, "up", 70)}>
              <img src={b.image} alt={b.name} loading="lazy" />
              <div>
                <h3>{b.name}</h3>
                <p className="muted">
                  {b.description} · {countFor(b.slug)} product{countFor(b.slug) === 1 ? "" : "s"}
                </p>
                <strong>Explore products →</strong>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No brands match “{query}”</h3>
          <p className="muted">Try another spelling, or ask us — we source from many more manufacturers than are listed here.</p>
          <div className="empty-state__actions">
            <button
              type="button"
              className="button"
              onClick={() => {
                setQuery("");
                setRange(0);
              }}
            >
              Show all brands
            </button>
            <Link className="button secondary" href="/quote">
              Ask about a brand
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
