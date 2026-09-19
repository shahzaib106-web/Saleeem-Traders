import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div><div className="brand">SALEEM TRADERS</div><p>Tiles, sanitaryware, kitchen and bathroom accessories for better spaces.</p></div>
        <div><h3>Shop</h3><Link href="/category/tiles">Tiles</Link><Link href="/category/sanitaryware">Sanitaryware</Link><Link href="/category/kitchen">Kitchen</Link><Link href="/category/accessories">Accessories</Link><Link href="/brands">Brands</Link><Link href="/projects">Projects</Link></div>
        <div><h3>Help</h3><Link href="/account/orders">Track your order</Link><Link href="/contact">Returns & exchanges</Link><Link href="/contact">FAQs</Link><Link href="/quote">Request a quote</Link><Link href="/contact">Contact us</Link></div>
        <div><h3>Visit our showroom</h3><p>📍 Main University Road,<br />Gulshan-e-Iqbal, Karachi, Pakistan</p><p>Mon – Sat: 10:00 AM – 8:00 PM<br />Sun: 11:00 AM – 6:00 PM</p><Link className="button secondary" href="/contact">Get directions →</Link></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Saleem Traders. All rights reserved.</span><span>Privacy Policy &nbsp; | &nbsp; Terms & Conditions &nbsp; | &nbsp; Contact Us</span></div>
    </footer>
  );
}