"use client";

import { useMemo, useState } from "react";
import { isEmail, isPhone } from "@/lib/validators";
import { shortId } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const SUBJECTS = ["Product enquiry", "Project quote", "Order status", "Showroom visit", "Something else"];

export function ContactForm() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const [reference, setReference] = useState("");

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Please enter your full name.";
    if (!isEmail(email)) e.email = "Enter a valid email address.";
    if (phone.trim() && !isPhone(phone)) e.phone = "Enter a valid phone number.";
    if (message.trim().length < 10) e.message = "Tell us a little more (at least 10 characters).";
    return e;
  }, [name, email, phone, message]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (Object.keys(errors).length > 0) {
      document.querySelector<HTMLElement>(".field--error input, .field--error textarea")?.focus();
      return;
    }
    setReference(shortId("EQ"));
  };

  if (reference) {
    return (
      <div className="success-panel" role="status">
        <span className="step-no success-panel__icon" aria-hidden="true">
          ✓
        </span>
        <h3>Thanks, {name.split(" ")[0]} — we&apos;ve got your enquiry.</h3>
        <p className="muted">
          Reference <strong>{reference}</strong>. We reply to <strong>{email}</strong> within one working day.
        </p>
        <button
          type="button"
          className="button secondary"
          onClick={() => {
            setReference("");
            setMessage("");
            setTouched(false);
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  const err = (key: string) => (touched && errors[key] ? errors[key] : "");

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className={`field${err("name") ? " field--error" : ""}`}>
        <label htmlFor="c-name">Full name *</label>
        <input id="c-name" className="input" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
        {err("name") && <p className="field-error">{errors.name}</p>}
      </div>
      <div className={`field${err("email") ? " field--error" : ""}`}>
        <label htmlFor="c-email">Email address *</label>
        <input id="c-email" className="input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
        {err("email") && <p className="field-error">{errors.email}</p>}
      </div>
      <div className={`field${err("phone") ? " field--error" : ""}`}>
        <label htmlFor="c-phone">Phone number (optional)</label>
        <input id="c-phone" className="input" type="tel" placeholder="0300 1234567" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
        {err("phone") && <p className="field-error">{errors.phone}</p>}
      </div>
      <div className="field">
        <label htmlFor="c-subject">Subject *</label>
        <select id="c-subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className={`field${err("message") ? " field--error" : ""}`}>
        <label htmlFor="c-message">Message *</label>
        <textarea id="c-message" rows={6} placeholder="Tell us about your requirements…" value={message} onChange={(e) => setMessage(e.target.value)} required />
        {err("message") && <p className="field-error">{errors.message}</p>}
      </div>
      {touched && Object.keys(errors).length > 0 && (
        <p className="form-note form-note--error" role="alert">
          Please complete the highlighted fields.
        </p>
      )}
      <button type="submit" className="button">
        Send enquiry →
      </button>
      <p className="muted small">We&apos;ll only use your details to respond to your enquiry.</p>
    </form>
  );
}
