import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { STORE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Request a quote",
  description: "Share your project requirements and receive an itemised quotation from Saleem Traders."
};

const STEPS = [
  ["We review your requirements", "A product specialist reads through your project details and attachments."],
  ["We clarify products and quantities", "We call or message to confirm sizes, finishes and coverage."],
  ["You receive an itemised quotation", "A clear PDF quote with delivery options, usually within one working day."]
];

export default async function QuotePage({ searchParams }: { searchParams: Promise<{ product?: string; category?: string }> }) {
  const { product, category } = await searchParams;

  return (
    <section className="container section">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / Request a quote
      </nav>
      <h1>Tell us what you&apos;re planning.</h1>
      <p className="muted lead">Share your requirements so our team can prepare a quotation.</p>

      <div className="quote-form-grid">
        <QuoteForm productSlug={product} categorySlug={category} />

        <aside className="panel quote-aside">
          <h2>What happens next</h2>
          {STEPS.map(([title, text], i) => (
            <div className="step-title step-title--stack" key={title}>
              <span className="step-no">{i + 1}</span>
              <div>
                <strong>{title}</strong>
                <p className="muted small">{text}</p>
              </div>
            </div>
          ))}
          <hr />
          <p className="muted small">
            Need help right away? Call <a href={`tel:+${STORE.phoneDigits}`}>{STORE.phone}</a> or{" "}
            <a href={`https://wa.me/${STORE.whatsapp}`} target="_blank" rel="noopener noreferrer">
              message us on WhatsApp
            </a>
            .
          </p>
          <img src="/images/demo/tiles.jpg" alt="Tile samples in the Saleem Traders showroom" style={{ borderRadius: 5 }} loading="lazy" />
          <p className="muted small">Quality materials for modern living.</p>
        </aside>
      </div>
    </section>
  );
}
