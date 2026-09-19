import Link from "next/link";

function LogoMark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M7 30 32 8l25 22v5L32 15 7 35z" fill="#ad8029" />
      <path d="M14 32h13v22H14zM37 32h13v22H37zM29 32h6v22h-6z" fill="#0b3042" />
      <path d="M17 36h7v7h-7zM40 36h7v7h-7z" fill="#f3efe8" />
      <path d="M17 45h7v7h-7zM40 45h7v7h-7z" fill="#f3efe8" />
    </svg>
  );
}

export function Header() {
  return (
    <>
      <div className="topbar"><div className="container topbar__inner"><span>Tiles, fittings & finishes for every space</span><span>Karachi&nbsp;&nbsp; | &nbsp;&nbsp;Lahore&nbsp;&nbsp; | &nbsp;&nbsp;Islamabad</span></div></div>
      <header className="header">
        <div className="container header__inner">
          <Link className="logo" href="/"><span className="logo-mark"><LogoMark /></span><span className="logo-text">SALEEM<br />TRADERS</span></Link>
          <form className="search" action="/search"><input name="q" placeholder="Search for tiles, sanitaryware, kitchen products..." /><button type="submit">Search</button></form>
          <div className="header-actions"><Link className="icon-link" href="/account"><span className="icon">♡</span> Wishlist</Link><Link className="icon-link" href="/cart"><span className="icon">🛒</span><span className="bubble">3</span> Cart</Link></div>
        </div>
        <nav className="nav"><div className="container nav__inner"><Link href="/category/tiles">Tiles</Link><Link href="/category/sanitaryware">Sanitaryware</Link><Link href="/category/kitchen">Kitchen</Link><Link href="/category/accessories">Accessories</Link><Link href="/brands">Brands</Link><Link href="/projects">Projects</Link><Link className="quote-link" href="/quote">Request a quote</Link></div></nav>
      </header>
    </>
  );
}