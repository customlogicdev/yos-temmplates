"use client";

import { forwardRef, useEffect, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { Icon } from "./icons";

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "dark" | "outline" | "ghost" | "danger" | "soft";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", loading, icon, className, children, disabled, ...rest },
  ref
) {
  const variants = {
    primary: "bg-brand text-white hover:bg-brand-deep shadow-sm",
    dark: "bg-ink text-white hover:bg-night-soft shadow-sm",
    outline: "border border-line bg-surface text-ink hover:border-ink/30 hover:bg-paper",
    ghost: "text-ink-soft hover:bg-ink/5 hover:text-ink",
    danger: "bg-danger text-white hover:bg-[#a83a30]",
    soft: "bg-brand-soft text-brand-deep hover:bg-[#d6e8df]",
  }[variant];
  const sizes = {
    sm: "h-8 px-3 text-[13px] gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-12 px-6 text-[15px] gap-2",
  }[size];
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        variants,
        sizes,
        className
      )}
      {...rest}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : icon ? (
        <Icon name={icon} className="h-4 w-4" />
      ) : null}
      {children}
    </button>
  );
});

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-xl border border-line bg-surface shadow-card", className)}>
      {children}
    </div>
  );
}

export function Badge({ tone = "neutral", children, className }: { tone?: "neutral" | "success" | "warning" | "danger" | "brand" | "info"; children: ReactNode; className?: string }) {
  const tones = {
    neutral: "bg-ink/6 text-ink-soft",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    danger: "bg-danger/10 text-danger",
    brand: "bg-brand-soft text-brand-deep",
    info: "bg-[#E8EEF7] text-[#33567F]",
  }[tone];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold", tones, className)}>
      {children}
    </span>
  );
}

export function StatusDot({ status }: { status: string }) {
  const map: Record<string, string> = {
    delivered: "bg-success",
    active: "bg-success",
    paid: "bg-success",
    connected: "bg-success",
    sent: "bg-success",
    published: "bg-success",
    shipped: "bg-[#33567F]",
    processing: "bg-warning",
    scheduled: "bg-warning",
    pending: "bg-warning",
    cancelled: "bg-danger",
    expired: "bg-danger",
    refunded: "bg-danger",
    draft: "bg-muted",
    hidden: "bg-muted",
  };
  return <span className={cn("inline-block h-2 w-2 rounded-full", map[status.toLowerCase()] ?? "bg-muted")} />;
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string }>(
  function Input({ label, hint, className, id, ...rest }, ref) {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-[13px] font-semibold text-ink-soft">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "h-10 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15",
            className
          )}
          {...rest}
        />
        {hint && <p className="text-xs text-muted">{hint}</p>}
      </div>
    );
  }
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }>(
  function Textarea({ label, className, id, ...rest }, ref) {
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-[13px] font-semibold text-ink-soft">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15",
            className
          )}
          {...rest}
        />
      </div>
    );
  }
);

export function Select({ label, className, children, id, ...rest }: SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-[13px] font-semibold text-ink-soft">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          "h-10 w-full appearance-none rounded-lg border border-line bg-surface px-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15",
          className
        )}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-2"
      aria-pressed={checked}
    >
      <span className={cn("relative h-5.5 w-10 rounded-full transition-colors", checked ? "bg-brand" : "bg-ink/15")} style={{ height: 22 }}>
        <span
          className="absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow transition-all"
          style={{ left: checked ? 20 : 2 }}
        />
      </span>
      {label && <span className="text-sm font-medium text-ink-soft">{label}</span>}
    </button>
  );
}

export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-night/50 p-4 backdrop-blur-[2px] animate-fade-in" onClick={onClose}>
      <div
        className={cn("mt-10 w-full rounded-2xl border border-line bg-surface shadow-pop animate-scale-in", wide ? "max-w-3xl" : "max-w-lg")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h3 className="font-display text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-muted hover:bg-ink/5 hover:text-ink">
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, description, action }: { icon: string; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="grid-dots flex flex-col items-center justify-center rounded-xl border border-dashed border-line px-6 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ink/5 text-muted">
        <Icon name={icon} className="h-6 w-6" />
      </div>
      <h3 className="font-display text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Tabs({ tabs, active, onChange }: { tabs: { id: string; label: string; count?: number }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-line bg-paper p-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-semibold transition",
            active === t.id ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink"
          )}
        >
          {t.label}
          {t.count != null && (
            <span className={cn("rounded-full px-1.5 text-[11px]", active === t.id ? "bg-brand-soft text-brand-deep" : "bg-ink/6 text-muted")}>
              {t.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export function Th({ children, className }: { children?: ReactNode; className?: string }) {
  return <th className={cn("px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-muted", className)}>{children}</th>;
}

export function Td({ children, className }: { children?: ReactNode; className?: string }) {
  return <td className={cn("px-4 py-3 text-sm", className)}>{children}</td>;
}

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  const hue = (name.charCodeAt(0) * 37 + (name.charCodeAt(1) || 0) * 11) % 360;
  return (
    <span
      className={cn("inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white", className)}
      style={{ background: `hsl(${hue} 32% 42%)` }}
    >
      {initials}
    </span>
  );
}
