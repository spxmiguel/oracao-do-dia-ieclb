import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-morning-text text-white night:bg-night-accent hover:opacity-90",
  secondary: "bg-white/70 text-morning-text ring-1 ring-black/5 night:bg-white/10 night:text-night-text night:ring-white/10",
  ghost: "text-morning-text hover:bg-black/5 night:text-night-text night:hover:bg-white/10",
  danger: "bg-red-500/10 text-red-700 ring-1 ring-red-500/20 night:text-red-200"
};

export function Button({ children, className = "", variant = "primary", icon, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
