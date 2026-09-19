/**
 * Cart persistence currently lives in the browser (see store/cart.store.tsx).
 * This service is the seam for syncing the cart with the API once it is available.
 */
export const cartService = {
  list: async () => [] as never[]
};
