"use client";

import Link from "next/link";
import { useState } from "react";
import { reveal } from "@/lib/motion";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="newsletter" aria-label="Newsletter">
      <div className="container newsletter__inner">
        <div className="newsletter__copy" {...reveal(0, "up")}>
          <p className="eyebrow">The Saleem edit</p>
          <h2>
            Fresh inspiration.
            <br />
            Straight to your inbox.
          </h2>
          <p>Discover new arrivals, design ideas and selected offers.</p>
        </div>
        <div {...reveal(1, "up", 140)}>
          {done ? (
            <p className="newsletter__ok" role="status">
              Thank you — you are on the list. Watch your inbox for fresh inspiration.
            </p>
          ) : (
            <form
              className="newsletter__form"
              suppressHydrationWarning
              onSubmit={(event) => {
                event.preventDefault();
                if (email.trim()) setDone(true);
              }}
            >
              <label htmlFor="newsletter-email" className="newsletter__label">
                Email address
              </label>
              <div className="newsletter__row">
                <div className="newsletter__input-wrap">
                  <svg
                    className="newsletter__icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input
                    id="newsletter-email"
                    className="input newsletter__input"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    suppressHydrationWarning
                  />
                </div>
                <button className="btn btn--navy newsletter__btn" type="submit" suppressHydrationWarning>
                  Subscribe
                </button>
              </div>
              <p className="newsletter__fine">
                Unsubscribe at any time. View our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
