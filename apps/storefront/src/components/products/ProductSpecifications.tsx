import type { Product } from "@/types/product";

export function ProductSpecifications({ product }: { product: Product }) {
  return (
    <table className="specs">
      <caption className="sr-only">{product.name} specifications</caption>
      <tbody>
        {Object.entries(product.specifications).map(([key, value]) => (
          <tr key={key}>
            <th scope="row">{key}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
