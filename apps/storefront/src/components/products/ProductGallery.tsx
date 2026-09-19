import Image from "next/image";
import type { Product } from "@/types/product";
export function ProductGallery({ product }: { product: Product }) { return <div className="panel"><Image src={product.image} alt={product.name} width={900} height={700} style={{borderRadius: 24}} /></div>; }
