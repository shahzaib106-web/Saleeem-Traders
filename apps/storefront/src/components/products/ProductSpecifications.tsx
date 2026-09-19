import type { Product } from "@/types/product";
export function ProductSpecifications({ product }: { product: Product }) { return <table className="specs"><tbody>{Object.entries(product.specifications).map(([key, value]) => <tr key={key}><td>{key}</td><td>{value}</td></tr>)}</tbody></table>; }
