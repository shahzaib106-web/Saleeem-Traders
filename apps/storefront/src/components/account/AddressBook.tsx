"use client";

import { useEffect, useMemo, useState } from "react";
import { listAddresses, listOrders, saveAddresses, type SavedAddress } from "@/lib/orders";
import { isPhone } from "@/lib/validators";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/store/ui.store";

const empty = { label: "Home", name: "", phone: "", address: "", apartment: "", city: "Lahore", province: "Punjab", postalCode: "" };

export function AddressBook() {
  const { user } = useAuth();
  const { notify } = useToast();
  const [addresses, setAddresses] = useState<SavedAddress[] | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ ...empty });
  const [error, setError] = useState("");

  useEffect(() => {
    // Seed the book with any delivery addresses used at checkout.
    const saved = listAddresses();
    if (saved.length === 0) {
      const fromOrders = listOrders()
        .filter((o) => o.delivery.method === "standard" && o.delivery.address)
        .map<SavedAddress>((o) => ({
          id: `addr_${o.id}`,
          label: "Delivery address",
          name: o.customer.name,
          phone: o.customer.phone,
          address: o.delivery.address ?? "",
          apartment: o.delivery.apartment,
          city: o.delivery.city ?? "",
          province: o.delivery.province ?? "",
          postalCode: o.delivery.postalCode
        }));
      const unique = fromOrders.filter((a, i, arr) => arr.findIndex((b) => b.address === a.address && b.city === a.city) === i);
      setAddresses(unique);
      if (unique.length) saveAddresses(unique);
    } else {
      setAddresses(saved);
    }
  }, []);

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, name: f.name || user.name, phone: f.phone || user.phone || "" }));
  }, [user]);

  const valid = useMemo(() => form.name.trim().length > 1 && isPhone(form.phone) && form.address.trim().length > 4 && form.city && form.province, [form]);

  const persist = (list: SavedAddress[]) => {
    setAddresses(list);
    saveAddresses(list);
  };

  const add = (event: React.FormEvent) => {
    event.preventDefault();
    if (!valid) return setError("Please complete name, phone, street address, city and province.");
    setError("");
    persist([...(addresses ?? []), { id: `addr_${Date.now()}`, ...form, apartment: form.apartment || undefined, postalCode: form.postalCode || undefined }]);
    setForm({ ...empty, name: user?.name ?? "", phone: user?.phone ?? "" });
    setAdding(false);
    notify("Address saved.", { tone: "success" });
  };

  if (addresses === null) return null;
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="panel">
      <div className="section-head">
        <h1>Addresses</h1>
        {!adding && (
          <button type="button" className="button" onClick={() => setAdding(true)}>
            Add address
          </button>
        )}
      </div>
      <p className="muted">Add delivery addresses for faster checkout.</p>

      {addresses.length === 0 && !adding && <p className="muted">No saved addresses yet.</p>}

      <div className="address-grid">
        {addresses.map((a) => (
          <div className="address-card" key={a.id}>
            <strong>{a.label}</strong>
            <p>
              {a.name}
              <br />
              {a.address}
              {a.apartment ? `, ${a.apartment}` : ""}
              <br />
              {a.city}, {a.province}
              {a.postalCode ? ` ${a.postalCode}` : ""}
              <br />
              <span className="muted small">{a.phone}</span>
            </p>
            <button type="button" className="link-btn" onClick={() => persist(addresses.filter((x) => x.id !== a.id))}>
              Remove
            </button>
          </div>
        ))}
      </div>

      {adding && (
        <form className="form address-form" onSubmit={add} noValidate>
          <h3>New address</h3>
          <div className="split">
            <div className="field">
              <label htmlFor="a-label">Label</label>
              <input id="a-label" className="input" value={form.label} onChange={set("label")} placeholder="Home, Site office…" />
            </div>
            <div className="field">
              <label htmlFor="a-name">Recipient name</label>
              <input id="a-name" className="input" value={form.name} onChange={set("name")} />
            </div>
            <div className="field">
              <label htmlFor="a-phone">Phone</label>
              <input id="a-phone" className="input" type="tel" value={form.phone} onChange={set("phone")} />
            </div>
            <div className="field">
              <label htmlFor="a-postal">Postal code (optional)</label>
              <input id="a-postal" className="input" value={form.postalCode} onChange={set("postalCode")} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="a-address">Street address</label>
            <input id="a-address" className="input" value={form.address} onChange={set("address")} />
          </div>
          <div className="field">
            <label htmlFor="a-apt">Apartment or floor (optional)</label>
            <input id="a-apt" className="input" value={form.apartment} onChange={set("apartment")} />
          </div>
          <div className="split">
            <div className="field">
              <label htmlFor="a-city">City</label>
              <input id="a-city" className="input" value={form.city} onChange={set("city")} />
            </div>
            <div className="field">
              <label htmlFor="a-province">Province</label>
              <input id="a-province" className="input" value={form.province} onChange={set("province")} />
            </div>
          </div>
          {error && (
            <p className="form-note form-note--error" role="alert">
              {error}
            </p>
          )}
          <div className="empty-state__actions">
            <button type="submit" className="button">
              Save address
            </button>
            <button type="button" className="button secondary" onClick={() => setAdding(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
