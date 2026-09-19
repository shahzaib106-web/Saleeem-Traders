import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
};

export function Button({ href, children, variant = "primary", className, type = "button", disabled, onClick, ...rest }: ButtonProps) {
  const classes = cn("button", variant !== "primary" && variant, className);
  if (href) {
    return (
      <Link className={classes} href={href} aria-label={rest["aria-label"]}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} type={type} disabled={disabled} onClick={onClick} aria-label={rest["aria-label"]}>
      {children}
    </button>
  );
}
