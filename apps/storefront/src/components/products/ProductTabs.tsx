import type { Product } from "@/types/product";
import { ProductSpecifications } from "./ProductSpecifications";
export function ProductTabs({ product }: { product: Product }) { return <section className="section"><div className="container"><div className="section-head"><div><h2>Specifications</h2><p>Everything your procurement team needs before ordering.</p></div></div><ProductSpecifications product={product} /></div></section>; }
