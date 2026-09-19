"use client";

import { useEffect, useState } from "react";
import { isEmail, isPhone } from "@/lib/validators";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/store/ui.store";

export function ProfileForm() {
  const { user, updateProfile } = useAuth();
  const { notify } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone ?? "");
    }
  }, [user]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name.trim().length < 2) return setError("Please enter your full name.");
    if (!isEmail(email)) return setError("Enter a valid email address.");
    if (phone.trim() && !isPhone(phone)) return setError("Enter a valid phone number.");
    setError("");
    updateProfile({ name: name.trim(), email: email.trim().toLowerCase(), phone: phone.trim() || undefined });
    notify("Profile updated.", { tone: "success" });
  };

  return (
    <div className="panel">
      <h1>Profile</h1>
      <p className="muted">Update your customer details.</p>
      <form className="form" onSubmit={submit} noValidate style={{ maxWidth: 520 }}>
        <div className="field">
          <label htmlFor="p-name">Full name</label>
          <input id="p-name" className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="p-email">Email</label>
          <input id="p-email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="p-phone">Phone</label>
          <input id="p-phone" className="input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
        </div>
        {error && (
          <p className="form-note form-note--error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="button">
          Save changes
        </button>
      </form>
    </div>
  );
}
