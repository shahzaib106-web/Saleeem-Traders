export const STORE = {
  name: "Saleem Traders",
  phone: "+92 300 1234567",
  /** Digits only, international format — used for tel: and wa.me links. */
  phoneDigits: "923001234567",
  whatsapp: "923001234567",
  email: "sales@saleemtraders.com",
  address: "Main Market, Gulberg, Lahore, Pakistan",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Main+Market+Gulberg+Lahore",
  hours: "Mon – Sat, 10:00 am – 8:00 pm",
  currency: "PKR"
};

export const DELIVERY = {
  standardFee: 1500,
  pickupFee: 0
};

/** Demo promo codes. Replace with API validation when the backend is wired. */
export const PROMO_CODES: Record<string, { type: "percent"; value: number; label: string }> = {
  WELCOME10: { type: "percent", value: 10, label: "10% off your first order" }
};

export const PAGE_SIZE = 9;
