"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow, IconBag, IconClose, IconMenu, IconSearch, LogoMark } from "@/components/ui/icons";

const primaryLinks = [
  { label: "Tiles", href: "/category/tiles" },
  { label: "Sanitaryware", href: "/category/sanitaryware" },
  { label: "Kitchen", href: "/category/kitchen" },
  { label: "Accessories", href: "/category/accessories" }
];

const mobileLinks = [
  ...primaryLinks,
  { label: "All products", href: "/products" },
  { label: "Brands", href: "/brands" },
  { label: "Inspiration", href: "/projects" },
  { label: "Contact", href: "/contact" }
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="brand-logo" href="/" aria-label="Saleem Traders — home">
          <LogoMark />
          <span className="brand-logo__text">
            SALEEM
            <br />
            TRADERS
          </span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link className="icon-btn" href="/search" aria-label="Search products">
            <IconSearch />
          </Link>
          <Link className="icon-btn" href="/cart" aria-label="Cart">
            <IconBag />
            <span className="icon-btn__count">3</span>
          </Link>
          <Link className="btn btn--navy site-header__cta" href="/quote">
            Request a quote <Arrow />
          </Link>
          <button
            type="button"
            className="icon-btn site-header__menu"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div className={`container site-header__mobile${open ? " open" : ""}`}>
        {mobileLinks.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link className="btn btn--navy" href="/quote" onClick={() => setOpen(false)}>
          Request a quote <Arrow />
        </Link>
      </div>
    </header>
  );
}
