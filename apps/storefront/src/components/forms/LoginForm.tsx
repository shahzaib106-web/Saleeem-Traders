"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { isEmail } from "@/lib/validators";
import { useAuth } from "@/hooks/useAuth";

export function LoginForm() {
  const { signIn } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/account";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isEmail(email)) return setError("Enter a valid email address.");
    if (password.length < 6) return setError("Your password is at least 6 characters.");
    setBusy(true);
    const result = signIn(email, password);
    if (!result.ok) {
      setBusy(false);
      return setError(result.message);
    }
    router.push(next);
  };

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="l-email">Email</label>
        <input id="l-email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="l-pass">Password</label>
        <input id="l-pass" className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
      </div>
      {error && (
        <p className="form-note form-note--error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="button" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
      <p className="muted small">
        New here? <Link className="link-u" href="/register">Create an account</Link>
      </p>
    </form>
  );
}
