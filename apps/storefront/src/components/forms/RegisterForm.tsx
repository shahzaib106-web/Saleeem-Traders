"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isEmail, isPhone } from "@/lib/validators";
import { useAuth } from "@/hooks/useAuth";

export function RegisterForm() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name.trim().length < 2) return setError("Please enter your full name.");
    if (!isEmail(email)) return setError("Enter a valid email address.");
    if (phone.trim() && !isPhone(phone)) return setError("Enter a valid phone number.");
    if (password.length < 6) return setError("Choose a password of at least 6 characters.");
    setBusy(true);
    const result = signUp({ name, email, phone, password });
    if (!result.ok) {
      setBusy(false);
      return setError(result.message);
    }
    router.push("/account");
  };

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="r-name">Full name</label>
        <input id="r-name" className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="r-email">Email</label>
        <input id="r-email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="r-phone">Phone (optional)</label>
        <input id="r-phone" className="input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
      </div>
      <div className="field">
        <label htmlFor="r-pass">Password</label>
        <input id="r-pass" className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required minLength={6} />
      </div>
      {error && (
        <p className="form-note form-note--error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="button" disabled={busy}>
        {busy ? "Creating account…" : "Create account"}
      </button>
      <p className="muted small">
        Already have an account? <Link className="link-u" href="/login">Sign in</Link>
      </p>
    </form>
  );
}
