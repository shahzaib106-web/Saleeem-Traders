"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { projectTypes, projects } from "@/data/catalog";
import { reveal } from "@/lib/motion";

export function ProjectsGallery() {
  const [type, setType] = useState<string>("");
  const visible = useMemo(() => (type ? projects.filter((p) => p.type === type) : projects), [type]);
  const [feature, ...rest] = visible;

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Filter by space">
        <button type="button" role="tab" className={`tab${!type ? " active" : ""}`} aria-selected={!type} onClick={() => setType("")}>
          All spaces
        </button>
        {projectTypes.map((t) => (
          <button type="button" role="tab" key={t} className={`tab${type === t ? " active" : ""}`} aria-selected={type === t} onClick={() => setType(t)}>
            {t}
          </button>
        ))}
      </div>

      <h2>Design inspiration</h2>
      <p className="muted listing-count" aria-live="polite">
        {visible.length} look{visible.length === 1 ? "" : "s"}
        {type ? ` in ${type.toLowerCase()}` : ""}
      </p>

      {feature && (
        <div className="project-grid">
          <Link href={`/projects/${feature.slug}`} className="project-card big" {...reveal(0, "scale")}>
            <img src={feature.image} alt={feature.title} />
            <h3>
              {feature.title}
              <br />
              <small>Explore the look →</small>
            </h3>
          </Link>
          <div className="stack">
            {rest.slice(0, 2).map((p, index) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="project-card small" {...reveal(index + 1, "up", 90)}>
                <img src={p.image} alt={p.title} loading="lazy" />
                <h3>
                  {p.title}
                  <br />
                  <small>Explore the look →</small>
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      {rest.length > 2 && (
        <div className="masonry">
          {rest.slice(2).map((p, index) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="project-card" {...reveal(index, "up", 70)}>
              <img src={p.image} alt={p.title} loading="lazy" />
              <h3>
                {p.title}
                <br />
                <small>Explore the look →</small>
              </h3>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
