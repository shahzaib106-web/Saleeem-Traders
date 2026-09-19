"use client";

import { AuthProvider } from "@/store/auth.store";
import { CartProvider } from "@/store/cart.store";
import { ToastProvider, WishlistProvider } from "@/store/ui.store";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>{children}</CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
