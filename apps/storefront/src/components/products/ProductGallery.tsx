"use client";

import { useState } from "react";
import type { Product } from "@/types/product";

export function ProductGallery({ product }: { product: Product }) {
  const images = Array.from(new Set([product.image, ...(product.gallery ?? [])]));
  const [active, setActive] = useState(0);
  const current = images[Math.min(active, images.length - 1)];

  return (
    <div className="gallery">
      <div className="gallery-main">
        <img src={current} alt={`${product.name} — image ${active + 1} of ${images.length}`} />
      </div>
      {images.length > 1 && (
        <div className="thumbs" role="tablist" aria-label="Product images">
          {images.map((src, index) => (
            <button
              type="button"
              role="tab"
              key={src}
              className={`thumb${index === active ? " active" : ""}`}
              aria-selected={index === active}
              aria-label={`Show image ${index + 1}`}
              onClick={() => setActive(index)}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
