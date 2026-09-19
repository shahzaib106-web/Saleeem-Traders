import Link from "next/link";
import { IconFacebook, IconInstagram, IconYoutube, LogoMark } from "@/components/ui/icons";

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
          </nav>

          <nav className="site-footer__col" aria-label="Store">
            <Link href="/products">Shop</Link>
            <Link href="/projects">Inspiration</Link>
            <Link href="/quote">Request a quote</Link>
          </nav>

          <div className="site-footer__social">
            <Link href="https://facebook.com" aria-label="Saleem Traders on Facebook">
              <IconFacebook />
            </Link>
            <Link href="https://instagram.com" aria-label="Saleem Traders on Instagram">
              <IconInstagram />
            </Link>
            <Link href="https://youtube.com" aria-label="Saleem Traders on YouTube">
              <IconYoutube />
            </Link>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© 2026 Saleem Traders. All rights reserved.</span>
          <span>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
