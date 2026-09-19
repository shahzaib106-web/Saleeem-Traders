import Link from "next/link";
import { IconFacebook, IconInstagram, IconYoutube, LogoMark } from "@/components/ui/icons";

const social = [
  { label: "Saleem Traders on Facebook", href: "https://facebook.com", Icon: IconFacebook },
  { label: "Saleem Traders on Instagram", href: "https://instagram.com", Icon: IconInstagram },
  { label: "Saleem Traders on YouTube", href: "https://youtube.com", Icon: IconYoutube }
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link className="brand-logo" href="/" aria-label="Saleem Traders — home">
              <LogoMark />
              <span className="brand-logo__text">
                SALEEM
                <br />
                TRADERS
              </span>
            </Link>
            <p>Tiles, fittings &amp; finishes for every space.</p>
          </div>

          <nav className="site-footer__col" aria-label="Categories">
            <Link href="/category/tiles">Tiles</Link>
            <Link href="/category/sanitaryware">Sanitaryware</Link>
            <Link href="/category/kitchen">Kitchen</Link>
            <Link href="/category/accessories">Accessories</Link>
            <Link href="/brands">Brands</Link>
          </nav>

          <nav className="site-footer__col" aria-label="Store">
            <Link href="/products">Shop</Link>
            <Link href="/projects">Inspiration</Link>
            <Link href="/quote">Request a quote</Link>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/account">My account</Link>
          </nav>

          <div className="site-footer__social">
            {social.map(({ label, href, Icon }) => (
              <a key={href} href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Saleem Traders. All rights reserved.</span>
          <span>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
