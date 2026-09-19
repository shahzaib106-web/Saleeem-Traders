import Link from "next/link";
const links = [["Products", "/products"], ["Brands", "/brands"], ["Projects", "/projects"], ["Gallery", "/gallery"], ["About", "/about"], ["Contact", "/contact"], ["Get Quote", "/quote"]];
export function Navigation() { return <nav className="nav"><div className="container nav__inner">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div></nav>; }
