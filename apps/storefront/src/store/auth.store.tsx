"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Customer } from "@/types/customer";
import { readStorage, writeStorage } from "@/lib/utils";

/**
 * Demo authentication. Sessions are kept in localStorage so the account area,
 * checkout prefill and order history work end-to-end without a backend.
 * Swap the sign-in / sign-up bodies for real API calls when the API is ready.
 */

const SESSION_KEY = "st_session_v1";
const ACCOUNTS_KEY = "st_accounts_v1";

type StoredAccount = Customer & { password: string };

type AuthContextValue = {
  user: Customer | null;
  hydrated: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => { ok: boolean; message: string };
  signUp: (input: { name: string; email: string; phone?: string; password: string }) => { ok: boolean; message: string };
  updateProfile: (patch: Partial<Pick<Customer, "name" | "email" | "phone">>) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Customer | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(readStorage<Customer | null>(SESSION_KEY, null));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(SESSION_KEY, user);
  }, [user, hydrated]);

  const signUp = useCallback<AuthContextValue["signUp"]>(({ name, email, phone, password }) => {
    const accounts = readStorage<StoredAccount[]>(ACCOUNTS_KEY, []);
    const normalised = email.trim().toLowerCase();
    if (accounts.some((a) => a.email === normalised)) {
      return { ok: false, message: "An account with this email already exists. Please sign in." };
    }
    const account: StoredAccount = { id: `c_${Date.now()}`, name: name.trim(), email: normalised, phone: phone?.trim() || undefined, password };
    writeStorage(ACCOUNTS_KEY, [...accounts, account]);
    const { password: _pw, ...customer } = account;
    void _pw;
    setUser(customer);
    return { ok: true, message: "Account created." };
  }, []);

  const signIn = useCallback<AuthContextValue["signIn"]>((email, password) => {
    const accounts = readStorage<StoredAccount[]>(ACCOUNTS_KEY, []);
    const normalised = email.trim().toLowerCase();
    const account = accounts.find((a) => a.email === normalised);
    if (!account) return { ok: false, message: "We couldn't find an account with that email. Create one below." };
    if (account.password !== password) return { ok: false, message: "Incorrect password. Please try again." };
    const { password: _pw, ...customer } = account;
    void _pw;
    setUser(customer);
    return { ok: true, message: "Signed in." };
  }, []);

  const updateProfile = useCallback<AuthContextValue["updateProfile"]>((patch) => {
    setUser((current) => {
      if (!current) return current;
      const next = { ...current, ...patch };
      const accounts = readStorage<StoredAccount[]>(ACCOUNTS_KEY, []);
      writeStorage(
        ACCOUNTS_KEY,
        accounts.map((a) => (a.id === current.id ? { ...a, ...patch } : a))
      );
      return next;
    });
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, hydrated, isAuthenticated: !!user, signIn, signUp, updateProfile, signOut }),
    [user, hydrated, signIn, signUp, updateProfile, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
