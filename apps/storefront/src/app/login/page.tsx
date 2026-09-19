import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <section className="section">
      <div className="container auth-container">
        <div className="panel">
          <h1>Sign in</h1>
          <p className="muted">Track orders, save addresses and check out faster.</p>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
