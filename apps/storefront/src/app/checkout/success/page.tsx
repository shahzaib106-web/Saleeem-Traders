import type { Metadata } from "next";
import { OrderSummary } from "@/components/checkout/OrderSummary";

export const metadata: Metadata = { title: "Order received" };

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;
  return (
    <section className="container section">
      <OrderSummary orderId={order} />
    </section>
  );
}
