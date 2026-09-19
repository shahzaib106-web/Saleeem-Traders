export type OrderItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  variant?: string;
  unitPrice: number;
  unitLabel: string;
  qty: number;
};

export type DeliveryMethod = "standard" | "pickup";
export type PaymentMethod = "cod" | "bank";

export type Order = {
  id: string;
  date: string;
  status: "received" | "confirmed" | "dispatched" | "delivered";
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  promoCode?: string;
  customer: { name: string; phone: string; email: string };
  delivery: {
    method: DeliveryMethod;
    address?: string;
    apartment?: string;
    city?: string;
    province?: string;
    postalCode?: string;
  };
  payment: PaymentMethod;
};
