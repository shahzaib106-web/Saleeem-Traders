import type { Metadata } from "next";
import { RegisterForm } from "@/components/forms/RegisterForm";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <section className="section">
      <div className="container auth-container">
        <div className="panel">
          <h1>Create account</h1>
          <p className="muted">Save your details for faster quotes and checkout.</p>
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
