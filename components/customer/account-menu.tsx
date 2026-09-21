// components/customer/account-menu.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LogOut, Package, Heart, Settings } from "lucide-react";

type AccountMenuProps = {
  /** Optional: logged-in user (showcase ke liye null rakho) */
  user?: { name?: string; email?: string } | null;
  /** Optional: login page ka URL */
  loginHref?: string;
  /** Optional: custom className */
  className?: string;
  /** Optional: text color inherit karo (dark/light header ke liye) */
  variant?: "light" | "dark";
};

export function AccountMenu({
  user = null,
  loginHref = "/login",
  className = "",
  variant = "light",
}: AccountMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Outside click pe close
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const iconColor =
    variant === "dark" ? "text-white/90 hover:text-white" : "text-zinc-700 hover:text-zinc-900";

  // Logged out — simple link to login
  if (!user) {
    return (
      <Link
        href={loginHref}
        aria-label="Account"
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition ${iconColor} ${className}`}
      >
        <User className="h-5 w-5" strokeWidth={1.8} />
      </Link>
    );
  }

  // Logged in — dropdown
  const initial = (user.name || user.email || "U").charAt(0).toUpperCase();

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition ${iconColor}`}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-pink-600 text-xs font-semibold text-white">
          {initial}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
          <div className="border-b border-zinc-100 px-4 py-3">
            <p className="truncate text-sm font-semibold text-zinc-900">
              {user.name || "Account"}
            </p>
            {user.email && (
              <p className="truncate text-xs text-zinc-500">{user.email}</p>
            )}
          </div>

          <nav className="p-2">
            <Link
              href="/account/orders"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              <Package className="h-4 w-4" strokeWidth={1.8} />
              Orders
            </Link>
            <Link
              href="/account/wishlist"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              <Heart className="h-4 w-4" strokeWidth={1.8} />
              Wishlist
            </Link>
            <Link
              href="/account/settings"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              <Settings className="h-4 w-4" strokeWidth={1.8} />
              Settings
            </Link>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                // TODO: real logout
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.8} />
              Logout
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default AccountMenu;