import Link from "next/link";

const links = [
  ["Products", "/products"],
  ["Brands", "/brands"],
  ["Inspiration", "/projects"],
  ["Gallery", "/gallery"],
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Get Quote", "/quote"]
];

/** Secondary navigation strip (not mounted in the current header design). */
export function Navigation() {
  return (
    <nav className="nav" aria-label="Secondary">
      <div className="container nav__inner">
        {links.map(([label, href]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
