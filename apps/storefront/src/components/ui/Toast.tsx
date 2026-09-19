"use client";

import Link from "next/link";
import { useToast } from "@/store/ui.store";
import { IconClose } from "@/components/ui/icons";

/** Fixed viewport rendered once in the root layout. */
export function ToastViewport() {
  const { toasts, dismiss } = useToast();
  if (toasts.length === 0) return null;
  return (
    <div className="toast-viewport" role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.tone ?? "default"}`} role="status">
          <span>{toast.message}</span>
          {toast.actionHref && toast.actionLabel && (
            <Link href={toast.actionHref} onClick={() => dismiss(toast.id)}>
              {toast.actionLabel}
            </Link>
          )}
          <button type="button" className="toast__close" aria-label="Dismiss" onClick={() => dismiss(toast.id)}>
            <IconClose />
          </button>
        </div>
      ))}
    </div>
  );
}

/** Inline badge kept for backwards compatibility with older call sites. */
export function Toast({ message }: { message: string }) {
  return <div className="badge">{message}</div>;
}
