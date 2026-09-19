import Link from "next/link";
export function Button({ href, children, variant = "primary" }: { href?: string; children: React.ReactNode; variant?: "primary" | "secondary" | "dark" }) { const className = `button ${variant === "primary" ? "" : variant}`; return href ? <Link className={className} href={href}>{children}</Link> : <button className={className}>{children}</button>; }
