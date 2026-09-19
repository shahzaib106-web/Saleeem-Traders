"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow, IconBag, IconClose, IconMenu, IconSearch, LogoMark } from "@/components/ui/icons";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

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
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { count, hydrated } = useCart();
  const { isAuthenticated } = useAuth();

  // Close overlays whenever the route changes.
  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!open && !searchOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, searchOpen]);

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
    setSearchOpen(false);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

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
            <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="icon-btn"
            aria-label={searchOpen ? "Close search" : "Search products"}
            aria-expanded={searchOpen}
            aria-controls="site-search"
            onClick={() => {
              setSearchOpen((v) => !v);
              setOpen(false);
            }}
          >
            {searchOpen ? <IconClose /> : <IconSearch />}
          </button>
          <Link className="icon-btn" href="/cart" aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}>
            <IconBag />
            {hydrated && count > 0 && <span className="icon-btn__count">{count > 99 ? "99+" : count}</span>}
          </Link>
          <Link className="btn btn--navy site-header__cta" href="/quote">
            Request a quote <Arrow />
          </Link>
          <button
            type="button"
            className="icon-btn site-header__menu"
            aria-expanded={open}
            aria-controls="site-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => {
              setOpen((v) => !v);
              setSearchOpen(false);
            }}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div id="site-search" className={`site-search${searchOpen ? " open" : ""}`} hidden={!searchOpen}>
        <form className="container site-search__form" role="search" onSubmit={submitSearch}>
          <label className="sr-only" htmlFor="site-search-input">
            Search products
          </label>
          <input
            id="site-search-input"
            ref={inputRef}
            className="input"
            type="search"
            placeholder="Search tiles, basins, taps…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
          <button className="btn btn--navy" type="submit">
            Search
          </button>
        </form>
      </div>

      <div id="site-mobile-menu" className={`container site-header__mobile${open ? " open" : ""}`}>
        {mobileLinks.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link href={isAuthenticated ? "/account" : "/login"} onClick={() => setOpen(false)}>
          {isAuthenticated ? "My account" : "Sign in"}
        </Link>
        <Link className="btn btn--navy" href="/quote" onClick={() => setOpen(false)}>
          Request a quote <Arrow />
        </Link>
      </div>
    </header>
  );
}
