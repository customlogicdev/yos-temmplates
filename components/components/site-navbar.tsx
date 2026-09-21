// src/components/site-navbar.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/icons";
import { getSessionUser, getStoreForUser } from "@/lib/auth";

export async function SiteNavbar() {
  const user = await getSessionUser();
  const store = user ? await getStoreForUser(user.id) : null;
  const cta = user ? (store ? "/admin" : "/setup-store") : "/register";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-emerald-600 to-teal-500 p-[1.5px] shadow-md shadow-indigo-500/15 group-hover:scale-105 transition shrink-0">
            <div className="h-full w-full bg-white rounded-[9px] flex items-center justify-center text-slate-950">
              <Icon name="logo" className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </div>
          </div>
          <div>
            <div className="font-display text-sm sm:text-base font-bold tracking-tight text-slate-950 flex items-center gap-1.5 sm:gap-2">
              <span>Your Own Store</span>
              <span className="rounded-full bg-indigo-50 border border-indigo-200/80 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold text-indigo-700">
                by CLI
              </span>
            </div>
          </div>
        </Link>

        {/* Clean Navigation Links */}
        <nav className="hidden items-center gap-6 lg:gap-8 text-xs font-semibold text-slate-600 md:flex">
          <a href="/#how-it-works" className="hover:text-indigo-600 transition">
            How It Works
          </a>
          <a href="/#features" className="hover:text-indigo-600 transition">
            Features
          </a>
          <a href="/#developers" className="hover:text-indigo-600 transition">
            Headless API
          </a>
          <Link href="/pricing" className="hover:text-indigo-600 transition">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-indigo-600 transition">
            About & Contact
          </Link>
        </nav>

        {/* Auth / Dashboard */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {user ? (
            <Link
              href="/admin"
              className="rounded-xl px-2.5 sm:px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-xl px-2.5 sm:px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition"
            >
              Sign In
            </Link>
          )}

          <Link
            href={cta}
            className="inline-flex h-9 items-center gap-1.5 sm:gap-2 rounded-xl bg-slate-950 hover:bg-indigo-950 px-3.5 sm:px-4 text-xs font-bold text-white transition-all shadow-md shadow-slate-950/15 active:scale-98"
          >
            <span className="hidden xs:inline sm:inline">
              {user ? (store ? "Go to Store" : "Create Store") : "Get Started"}
            </span>
            <span className="xs:hidden sm:hidden">Start</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}