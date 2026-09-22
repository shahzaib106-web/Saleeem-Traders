import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { IconChat, IconPhone, IconPin } from "@/components/ui/icons";
import { reveal } from "@/lib/motion";
import { STORE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Visit the Saleem Traders showroom in Lahore, call our team or send an enquiry."
};

const FAQ = [
  {
    q: "Can I see product samples?",
    a: "Yes. Tile samples and most fittings are on display in our showroom, and we can lend tile samples for a few days so you can see them in your own light."
  },
  {
    q: "Do you offer delivery?",
    a: `We deliver across Lahore (PKR 1,500 per order, 2–4 working days) and quote deliveries to other cities before dispatch. Showroom pickup is free.`
  },
  {
    q: "Can I request a project quote?",
    a: "Absolutely. Use the Request a quote form with your plans or product list and we'll send an itemised quotation, usually within one working day."
  },
  {
    q: "What are your showroom hours?",
    a: `${STORE.hours}. We're closed on Sundays and public holidays.`
  }
];

export default function ContactPage() {
  const cards = [
    { Icon: IconPin, title: "Visit our showroom", text: STORE.address, cta: "Get directions", href: STORE.mapsUrl, external: true },
    { Icon: IconPhone, title: "Speak to our team", text: `${STORE.phone} · ${STORE.hours}`, cta: "Call showroom", href: `tel:+${STORE.phoneDigits}`, external: false },
    { Icon: IconChat, title: "Prefer a message?", text: "Get quick answers on WhatsApp.", cta: "Chat on WhatsApp", href: `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent("Hello Saleem Traders, I have a question about ")}`, external: true }
  ];

  return (
    <section className="container section">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / Contact
      </nav>
      <div className="contact-layout">
        <div {...reveal(0, "up")}>
          <h1>Let&apos;s talk about your space.</h1>
          <p className="muted lead">Whether you&apos;re planning a new space, need product advice or a custom quote — our team is here to help.</p>
          <div className="panel">
            <h2>Send us an enquiry</h2>
            <ContactForm />
          </div>
        </div>
        <div>
          <img className="contact-photo" src="/images/demo/showroom.jpg" alt="Inside the Saleem Traders showroom" loading="lazy" {...reveal(0, "scale")} />
          {cards.map(({ Icon, title, text, cta, href, external }, index) => (
            <div className="info-card" key={title} {...reveal(index + 1, "up", 90)}>
              <div className="step-no" aria-hidden="true">
                <Icon />
              </div>
              <div>
                <h3>{title}</h3>
                <p className="muted small">{text}</p>
              </div>
              <a className="button" href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
                {cta}
              </a>
            </div>
          ))}
        </div>
      </div>

      <h2 className="faq-heading" {...reveal(0, "fade")}>Frequently asked questions</h2>
      <div className="faq">
        {FAQ.map(({ q, a }, index) => (
          <details key={q} {...reveal(index, "up", 60)}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
