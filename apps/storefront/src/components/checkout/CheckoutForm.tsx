"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { DeliveryMethod, Order, PaymentMethod } from "@/types/order";
import { DELIVERY, STORE } from "@/lib/constants";
import { formatCurrency } from "@/lib/currency";
import { saveOrder } from "@/lib/orders";
import { shortId } from "@/lib/utils";
import { isEmail, isPhone } from "@/lib/validators";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { CartItem } from "@/components/cart/CartItem";
import { Skeleton } from "@/components/ui/Skeleton";

const CITIES = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Other"];
const PROVINCES = ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Islamabad Capital Territory", "Gilgit-Baltistan", "Azad Kashmir"];

type Fields = {
  name: string;
  phone: string;
  email: string;
  address: string;
  apartment: string;
  city: string;
  province: string;
  postalCode: string;
  notes: string;
};

const empty: Fields = { name: "", phone: "", email: "", address: "", apartment: "", city: "Lahore", province: "Punjab", postalCode: "", notes: "" };

export function CheckoutForm() {
  const router = useRouter();
  const cart = useCart();
  const { user } = useAuth();
  const [fields, setFields] = useState<Fields>(empty);
  const [delivery, setDelivery] = useState<DeliveryMethod>("standard");
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Prefill from the signed-in customer.
  useEffect(() => {
    if (user) setFields((f) => ({ ...f, name: f.name || user.name, email: f.email || user.email, phone: f.phone || user.phone || "" }));
  }, [user]);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof Fields, string>> = {};
    if (fields.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!isPhone(fields.phone)) e.phone = "Enter a valid phone number (at least 10 digits).";
    if (!isEmail(fields.email)) e.email = "Enter a valid email address.";
    if (delivery === "standard") {
      if (fields.address.trim().length < 5) e.address = "Enter your street address.";
      if (!fields.city) e.city = "Select a city.";
      if (!fields.province) e.province = "Select a province.";
    }
    return e;
  }, [fields, delivery]);

  // Clear the summary alert as soon as the form becomes valid again.
  useEffect(() => {
    if (Object.keys(errors).length === 0) setSubmitError("");
  }, [errors]);

  const deliveryFee = delivery === "standard" ? DELIVERY.standardFee : DELIVERY.pickupFee;
  const total = cart.subtotal - cart.discount + deliveryFee;
  const set = (key: keyof Fields) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [key]: event.target.value }));
  const blur = (key: keyof Fields) => () => setTouched((t) => ({ ...t, [key]: true }));
  const show = (key: keyof Fields) => touched[key] && errors[key];

  const step = errors.name || errors.phone || errors.email ? 1 : errors.address || errors.city || errors.province ? 2 : 3;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setTouched({ name: true, phone: true, email: true, address: true, city: true, province: true });
    if (Object.keys(errors).length > 0) {
      setSubmitError("Please fix the highlighted fields before continuing.");
      document.querySelector<HTMLElement>(".field--error input, .field--error select")?.focus();
      return;
    }
    setSubmitError("");
    setSubmitting(true);
    const order: Order = {
      id: shortId("ST"),
      date: new Date().toISOString(),
      status: "received",
      items: cart.items.map(({ productId, slug, name, image, variant, unitPrice, unitLabel, qty }) => ({ productId, slug, name, image, variant, unitPrice, unitLabel, qty })),
      subtotal: cart.subtotal,
      discount: cart.discount,
      deliveryFee,
      total,
      promoCode: cart.promoCode,
      customer: { name: fields.name.trim(), phone: fields.phone.trim(), email: fields.email.trim() },
      delivery:
        delivery === "standard"
          ? { method: "standard", address: fields.address.trim(), apartment: fields.apartment.trim() || undefined, city: fields.city, province: fields.province, postalCode: fields.postalCode.trim() || undefined }
          : { method: "pickup" },
      payment
    };
    saveOrder(order);
    cart.clear();
    router.push(`/checkout/success?order=${order.id}`);
  };

  if (!cart.hydrated) {
    return (
      <section className="container section">
        <Skeleton height={40} />
        <div style={{ height: 16 }} />
        <Skeleton height={420} />
      </section>
    );
  }

  if (cart.items.length === 0 && !submitting) {
    return (
      <section className="container section">
        <div className="empty-state empty-state--page">
          <h1>Nothing to check out yet</h1>
          <p className="muted">Your cart is empty. Add a few products and come back.</p>
          <div className="empty-state__actions">
            <Link className="button" href="/products">
              Browse products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container section">
      <Link className="link-u" href="/cart">
        ← Back to cart
      </Link>
      <h1>Checkout</h1>

      <ol className="checkout-steps" aria-label="Checkout progress">
        <li className={step > 1 ? "done" : "current"}>
          <span className="step-no navy">{step > 1 ? "✓" : "1"}</span>Contact
          <hr />
        </li>
        <li className={step > 2 ? "done" : step === 2 ? "current" : ""}>
          <span className={`step-no${step >= 2 ? " navy" : ""}`}>{step > 2 ? "✓" : "2"}</span>Delivery
          <hr />
        </li>
        <li className={step === 3 ? "current" : ""}>
          <span className={`step-no${step === 3 ? " navy" : ""}`}>3</span>Payment
        </li>
      </ol>

      <form className="checkout-layout" onSubmit={submit} noValidate>
        <div className="checkout-main">
          <div className="step-title">
            <span className="step-no navy">1</span>
            <h3>Contact details</h3>
          </div>
          <div className="form">
            <div className={`field${show("name") ? " field--error" : ""}`}>
              <label htmlFor="co-name">Full name</label>
              <input id="co-name" className="input" value={fields.name} onChange={set("name")} onBlur={blur("name")} autoComplete="name" required />
              {show("name") && <p className="field-error">{errors.name}</p>}
            </div>
            <div className="split">
              <div className={`field${show("phone") ? " field--error" : ""}`}>
                <label htmlFor="co-phone">Phone number</label>
                <input id="co-phone" className="input" type="tel" value={fields.phone} onChange={set("phone")} onBlur={blur("phone")} placeholder="0300 1234567" autoComplete="tel" required />
                {show("phone") && <p className="field-error">{errors.phone}</p>}
              </div>
              <div className={`field${show("email") ? " field--error" : ""}`}>
                <label htmlFor="co-email">Email address</label>
                <input id="co-email" className="input" type="email" value={fields.email} onChange={set("email")} onBlur={blur("email")} placeholder="you@example.com" autoComplete="email" required />
                {show("email") && <p className="field-error">{errors.email}</p>}
              </div>
            </div>
          </div>

          <hr />
          <div className="step-title">
            <span className="step-no navy">2</span>
            <h3>Delivery</h3>
          </div>
          <div className="form">
            <div className="radio-grid">
              <label className="radio-card">
                <input type="radio" name="delivery" checked={delivery === "standard"} onChange={() => setDelivery("standard")} />
                <span>
                  <strong>Standard delivery</strong>
                  <span className="muted small">2–4 working days in Lahore · timing confirmed before dispatch</span>
                </span>
                <strong>{formatCurrency(DELIVERY.standardFee)}</strong>
              </label>
              <label className="radio-card">
                <input type="radio" name="delivery" checked={delivery === "pickup"} onChange={() => setDelivery("pickup")} />
                <span>
                  <strong>Showroom pickup</strong>
                  <span className="muted small">{STORE.address}</span>
                </span>
                <strong>Free</strong>
              </label>
            </div>

            {delivery === "standard" && (
              <>
                <div className={`field${show("address") ? " field--error" : ""}`}>
                  <label htmlFor="co-address">Street address</label>
                  <input id="co-address" className="input" value={fields.address} onChange={set("address")} onBlur={blur("address")} placeholder="House / plot, street, area" autoComplete="street-address" />
                  {show("address") && <p className="field-error">{errors.address}</p>}
                </div>
                <div className="field">
                  <label htmlFor="co-apt">Apartment or floor (optional)</label>
                  <input id="co-apt" className="input" value={fields.apartment} onChange={set("apartment")} placeholder="e.g. Floor 2" />
                </div>
                <div className="split">
                  <div className={`field${show("city") ? " field--error" : ""}`}>
                    <label htmlFor="co-city">City</label>
                    <select id="co-city" value={fields.city} onChange={set("city")} onBlur={blur("city")}>
                      {CITIES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className={`field${show("province") ? " field--error" : ""}`}>
                    <label htmlFor="co-province">Province</label>
                    <select id="co-province" value={fields.province} onChange={set("province")} onBlur={blur("province")}>
                      {PROVINCES.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="field" style={{ maxWidth: 240 }}>
                  <label htmlFor="co-postal">Postal code (optional)</label>
                  <input id="co-postal" className="input" inputMode="numeric" value={fields.postalCode} onChange={set("postalCode")} autoComplete="postal-code" />
                </div>
              </>
            )}
            <div className="field">
              <label htmlFor="co-notes">Delivery notes (optional)</label>
              <textarea id="co-notes" rows={3} value={fields.notes} onChange={set("notes")} placeholder="Gate code, preferred time, lift access…" />
            </div>
          </div>

          <hr />
          <div className="step-title">
            <span className="step-no navy">3</span>
            <h3>Payment</h3>
          </div>
          <div className="radio-grid">
            <label className="radio-card">
              <input type="radio" name="payment" checked={payment === "cod"} onChange={() => setPayment("cod")} />
              <span>
                <strong>Cash on delivery</strong>
                <span className="muted small">Pay our driver when your order arrives</span>
              </span>
            </label>
            <label className="radio-card">
              <input type="radio" name="payment" checked={payment === "bank"} onChange={() => setPayment("bank")} />
              <span>
                <strong>Bank transfer</strong>
                <span className="muted small">Account details are sent with your order confirmation</span>
              </span>
            </label>
          </div>

          {submitError && (
            <p className="form-note form-note--error" role="alert">
              {submitError}
            </p>
          )}
          <button type="submit" className="button w-full checkout-submit" disabled={submitting}>
            {submitting ? "Placing order…" : `Place order · ${formatCurrency(total)}`}
          </button>
          <p className="muted small">By placing an order you agree to our <Link href="/terms">Terms &amp; Conditions</Link>.</p>
        </div>

        <aside className="summary">
          <div className="summary__head">
            <h2>Your order</h2>
            <Link className="link-u" href="/cart">
              Edit cart
            </Link>
          </div>
          {cart.items.map((item) => (
            <CartItem key={item.key} item={item} />
          ))}
          <hr />
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatCurrency(cart.subtotal)}</strong>
          </div>
          {cart.discount > 0 && (
            <div className="summary-row summary-row--discount">
              <span>Discount ({cart.promoCode})</span>
              <strong>− {formatCurrency(cart.discount)}</strong>
            </div>
          )}
          <div className="summary-row">
            <span>Delivery</span>
            <strong>{deliveryFee === 0 ? "Free" : formatCurrency(deliveryFee)}</strong>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
          <p className="muted small">Our team calls to confirm stock and delivery timing before dispatch.</p>
        </aside>
      </form>
    </section>
  );
}
