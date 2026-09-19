"use client";

import Link from "next/link";
import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="newsletter" aria-label="Newsletter">
      <div className="container newsletter__inner">
        <div className="newsletter__copy">
          <p className="eyebrow">The Saleem edit</p>
          <h2>
            Fresh inspiration.
            <br />
            Straight to your inbox.
          </h2>
          <p>Discover new arrivals, design ideas and selected offers.</p>
        </div>
        <div>
          {done ? (
            <p className="newsletter__ok" role="status">
              Thank you — you are on the list. Watch your inbox for fresh inspiration.
            </p>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (email.trim()) setDone(true);
              }}
            >
              <label htmlFor="newsletter-email">Email address</label>
              <div className="newsletter__row">
                <input
                  id="newsletter-email"
                  className="input"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button className="btn btn--navy" type="submit">
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
