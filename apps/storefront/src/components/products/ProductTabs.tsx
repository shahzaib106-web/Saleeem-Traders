"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { ProductSpecifications } from "./ProductSpecifications";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "specs", label: "Specifications" },
  { id: "delivery", label: "Delivery & returns" }
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<TabId>("overview");

  return (
    <div className="spec-tabs">
      <div className="tabs" role="tablist" aria-label="Product information">
        {TABS.map((tab) => (
          <button
            type="button"
            role="tab"
            key={tab.id}
            id={`tab-${tab.id}`}
            className={`tab${active === tab.id ? " active" : ""}`}
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" hidden={active !== "overview"}>
        <div className="split">
          <div>
            <h3>{product.name}</h3>
            <p>
              {product.description} Its natural tones and subtle detailing bring timeless character to everyday spaces, while durable materials ensure
              long-lasting performance.
            </p>
            <ul className="bullets">
              {Object.entries(product.specifications)
                .slice(0, 4)
                .map(([k, v]) => (
                  <li key={k}>
                    <strong>{k}:</strong> {v}
                  </li>
                ))}
            </ul>
          </div>
          <div className="spec-table-wrap">
            <ProductSpecifications product={product} />
          </div>
        </div>
      </div>

      <div role="tabpanel" id="panel-specs" aria-labelledby="tab-specs" hidden={active !== "specs"}>
        <div className="spec-table-wrap">
          <ProductSpecifications product={product} />
        </div>
      </div>

      <div role="tabpanel" id="panel-delivery" aria-labelledby="tab-delivery" hidden={active !== "delivery"}>
        <div className="split">
          <div>
            <h3>Delivery</h3>
            <p>
              Standard delivery within Lahore is PKR 1,500 per order and is usually completed within 2–4 working days. Deliveries to other cities are
              quoted before dispatch. You can also collect free of charge from our showroom.
            </p>
          </div>
          <div>
            <h3>Returns</h3>
            <p>
              Unopened boxes and unused fittings can be returned within 7 days of delivery. Cut tiles, installed items and made-to-order products cannot
              be returned. Please inspect your order on arrival and report any damage within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
