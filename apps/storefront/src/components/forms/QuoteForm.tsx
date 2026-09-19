"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { categories, getProduct } from "@/data/catalog";
import { isEmail, isPhone } from "@/lib/validators";
import { shortId } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { IconUpload } from "@/components/ui/icons";

const PROJECT_TYPES = ["Home renovation", "New build", "Commercial project", "Single room"];
const CONTACT_PREFS = ["WhatsApp", "Phone call", "Email"];
const MAX_FILE_MB = 10;

type Props = {
  /** Product slug passed from a product page ("Request a project quote"). */
  productSlug?: string;
  /** Category slug passed from a category hero. */
  categorySlug?: string;
};

export function QuoteForm({ productSlug, categorySlug }: Props) {
  const { user } = useAuth();
  const product = productSlug ? getProduct(productSlug) : undefined;
  const fileInput = useRef<HTMLInputElement>(null);

  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [city, setCity] = useState("");
  const [selected, setSelected] = useState<string[]>(() => {
    const initial = new Set<string>();
    if (product) initial.add(product.category);
    if (categorySlug && categories.some((c) => c.slug === categorySlug)) initial.add(categorySlug);
    return [...initial];
  });
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [pref, setPref] = useState(CONTACT_PREFS[0]);
  const [details, setDetails] = useState(product ? `Quoting for: ${product.name}\n` : "");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [touched, setTouched] = useState(false);
  const [reference, setReference] = useState("");

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (selected.length === 0) e.selected = "Choose at least one product category.";
    if (name.trim().length < 2) e.name = "Please enter your full name.";
    if (!isPhone(phone)) e.phone = "Enter a valid phone number.";
    if (email.trim() && !isEmail(email)) e.email = "Enter a valid email address.";
    if (pref === "Email" && !email.trim()) e.email = "Add an email address so we can reply by email.";
    return e;
  }, [selected, name, phone, email, pref]);

  const toggle = (slug: string) => setSelected((list) => (list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug]));

  const onFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const tooBig = incoming.find((f) => f.size > MAX_FILE_MB * 1024 * 1024);
    if (tooBig) {
      setFileError(`${tooBig.name} is larger than ${MAX_FILE_MB} MB.`);
      return;
    }
    setFileError("");
    setFiles((current) => [...current, ...incoming].slice(0, 5));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (Object.keys(errors).length > 0) {
      document.querySelector<HTMLElement>(".field--error input, .field--error select, .field--error .choice input")?.focus();
      return;
    }
    // The API isn't wired yet — issue a reference so the customer has something to quote back to us.
    setReference(shortId("QT"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (reference) {
    return (
      <div className="panel success-panel">
        <span className="step-no success-panel__icon" aria-hidden="true">
          ✓
        </span>
        <h2>Request received</h2>
        <p className="muted">
          Thanks {name.split(" ")[0]} — your reference is <strong>{reference}</strong>. We&apos;ll be in touch by {pref.toLowerCase()} on{" "}
          <strong>{pref === "Email" ? email : phone}</strong> within one working day with an itemised quotation.
        </p>
        <div className="empty-state__actions">
          <Link className="button" href="/products">
            Keep browsing
          </Link>
          <button type="button" className="button secondary" onClick={() => setReference("")}>
            Send another request
          </button>
        </div>
      </div>
    );
  }

  const err = (key: string) => (touched && errors[key] ? errors[key] : "");

  return (
    <form className="panel form quote-form" onSubmit={submit} noValidate>
      <div className="step-title">
        <span className="step-no">1</span>
        <h3>Project details</h3>
      </div>
      <div className="split">
        <div className="field">
          <label htmlFor="q-type">Project type</label>
          <select id="q-type" value={projectType} onChange={(e) => setProjectType(e.target.value)}>
            {PROJECT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="q-city">City</label>
          <input id="q-city" className="input" placeholder="e.g. Lahore" value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" />
        </div>
      </div>

      <hr />
      <div className="step-title">
        <span className="step-no">2</span>
        <h3>Products required</h3>
      </div>
      <div className={`field${err("selected") ? " field--error" : ""}`}>
        <div className="product-choice-grid" role="group" aria-label="Product categories">
          {categories.map((c) => (
            <label className={`choice${selected.includes(c.slug) ? " choice--on" : ""}`} key={c.slug}>
              <input type="checkbox" checked={selected.includes(c.slug)} onChange={() => toggle(c.slug)} />
              <img src={c.heroImage} alt="" />
              <strong>{c.name}</strong>
            </label>
          ))}
        </div>
        {err("selected") && <p className="field-error">{errors.selected}</p>}
      </div>
      {product && (
        <p className="form-note form-note--ok">
          Quoting for <strong>{product.name}</strong> — add sizes, quantities or other items below.
        </p>
      )}

      <hr />
      <div className="step-title">
        <span className="step-no">3</span>
        <h3>Your details</h3>
      </div>
      <div className="split">
        <div className={`field${err("name") ? " field--error" : ""}`}>
          <label htmlFor="q-name">Full name</label>
          <input id="q-name" className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
          {err("name") && <p className="field-error">{errors.name}</p>}
        </div>
        <div className={`field${err("phone") ? " field--error" : ""}`}>
          <label htmlFor="q-phone">Phone number</label>
          <input id="q-phone" className="input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0300 1234567" autoComplete="tel" required />
          {err("phone") && <p className="field-error">{errors.phone}</p>}
        </div>
        <div className={`field${err("email") ? " field--error" : ""}`}>
          <label htmlFor="q-email">Email (optional)</label>
          <input id="q-email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          {err("email") && <p className="field-error">{errors.email}</p>}
        </div>
        <div className="field">
          <label htmlFor="q-pref">Preferred contact</label>
          <select id="q-pref" value={pref} onChange={(e) => setPref(e.target.value)}>
            {CONTACT_PREFS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <hr />
      <div className="step-title">
        <span className="step-no">4</span>
        <h3>Additional details</h3>
      </div>
      <div className="field">
        <label htmlFor="q-details">Requirements</label>
        <textarea id="q-details" rows={5} value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Preferred brands, colour scheme, quantities, timeline, or any other details…" />
      </div>

      <input ref={fileInput} type="file" accept=".pdf,.jpg,.jpeg,.png" multiple hidden onChange={(e) => onFiles(e.target.files)} />
      <button
        type="button"
        className="dropzone"
        onClick={() => fileInput.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onFiles(e.dataTransfer.files);
        }}
      >
        <IconUpload />
        <span>
          <strong>Add plans, photos or a product list</strong>
          <span className="muted small">PDF, JPG or PNG · up to {MAX_FILE_MB} MB · max 5 files</span>
        </span>
      </button>
      {fileError && <p className="field-error">{fileError}</p>}
      {files.length > 0 && (
        <ul className="file-list">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`}>
              <span>
                {f.name} <span className="muted small">({Math.max(1, Math.round(f.size / 1024))} KB)</span>
              </span>
              <button type="button" className="link-btn" onClick={() => setFiles((list) => list.filter((_, idx) => idx !== i))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {touched && Object.keys(errors).length > 0 && (
        <p className="form-note form-note--error" role="alert">
          Please complete the highlighted fields.
        </p>
      )}
      <button type="submit" className="button quote-form__submit">
        Request quotation
      </button>
    </form>
  );
}
