"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/Skeleton";

const NAV = [
  { href: "/account", label: "Overview" },
  { href: "/account/orders", label: "Orders" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/profile", label: "Profile" }
];

/** Gate + sidebar for everything under /account. */
export function AccountShell({ children }: { children: React.ReactNode }) {
  const { user, hydrated, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  if (!hydrated) {
    return (
      <section className="container section">
        <Skeleton height={260} />
      </section>
    );
  }

  if (!user) {
    return (
      <section className="container section">
        <div className="empty-state empty-state--page">
          <h1>Sign in to your account</h1>
          <p className="muted">View your orders, saved addresses and profile details.</p>
          <div className="empty-state__actions">
            <Link className="button" href={`/login?next=${encodeURIComponent(pathname)}`}>
              Sign in
            </Link>
            <Link className="button secondary" href="/register">
              Create an account
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container account-layout">
        <aside className="panel account-nav">
          <p className="eyebrow">Signed in as</p>
          <strong className="account-nav__name">{user.name}</strong>
          <p className="muted small">{user.email}</p>
          <nav aria-label="Account">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="button light w-full"
            onClick={() => {
              signOut();
              router.push("/");
            }}
          >
            Sign out
          </button>
        </aside>
        <div>{children}</div>
      </div>
    </section>
  );
}
