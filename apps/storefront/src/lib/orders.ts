import type { Order } from "@/types/order";
import { readStorage, writeStorage } from "@/lib/utils";

const ORDERS_KEY = "st_orders_v1";

export function listOrders(): Order[] {
  return readStorage<Order[]>(ORDERS_KEY, []);
}

export function getOrder(id: string): Order | undefined {
  return listOrders().find((o) => o.id === id);
}

export function saveOrder(order: Order) {
  writeStorage(ORDERS_KEY, [order, ...listOrders()]);
}

export type SavedAddress = {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  province: string;
  postalCode?: string;
};

const ADDRESSES_KEY = "st_addresses_v1";

export function listAddresses(): SavedAddress[] {
  return readStorage<SavedAddress[]>(ADDRESSES_KEY, []);
}

export function saveAddresses(list: SavedAddress[]) {
  writeStorage(ADDRESSES_KEY, list);
}
