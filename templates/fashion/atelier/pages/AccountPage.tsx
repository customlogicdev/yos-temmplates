// src/templates/fashion/atelier/pages/AccountPage.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  CreditCard,
  Mail,
  Phone,
} from "lucide-react";

export function AtelierAccountPage({
  slug,
  customer,
  page,        // 👈 NEW: accept `page`
  sub,
  tab,
  store,
}: any) {
  const base = `/store/${slug}`;
  const router = useRouter();

  // 🎯 Derive mode from `page` OR `sub`
  const mode =
    page === "account-login" || sub === "login"
      ? "login"
      : page === "account-register" || sub === "register"
      ? "register"
      : sub || "dashboard";

  // ═══════════════════════════════════════════════════════
  // NOT LOGGED IN
  // ═══════════════════════════════════════════════════════
  if (!customer) {
    // 🔐 LOGIN / REGISTER FORM
    if (mode === "login" || mode === "register") {
      return (
        <AuthForm
          mode={mode}
          slug={slug}
          store={store}
          base={base}
          router={router}
        />
      );
    }

    // 👋 WELCOME SCREEN
    return (
      <section className="min-h-screen bg-[#FAFAF9]">
        <div className="mx-auto max-w-2xl px-5 py-32 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-pink-100">
            <User className="h-10 w-10 text-indigo-600" strokeWidth={1.8} />
          </div>
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-zinc-900">
            Welcome back
          </h1>
          <p className="mt-3 text-sm text-zinc-600">
            Sign in to access your account, orders, and wishlist.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href={`${base}?page=account-login`}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-zinc-900/20 transition hover:scale-105"
            >
              Sign in
              <ChevronRight className="h-4 w-4" strokeWidth={2.4} />
            </Link>
            <Link
              href={`${base}?page=account-register`}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-8 py-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-900"
            >
              Create account
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ═══════════════════════════════════════════════════════
  // LOGGED IN — DASHBOARD
  // ═══════════════════════════════════════════════════════
  const menu = [
    {
      Icon: Package,
      label: "My Orders",
      desc: "Track and manage orders",
      href: `${base}?page=orders`,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      Icon: Heart,
      label: "Wishlist",
      desc: "Your favorite pieces",
      href: `${base}?page=wishlist`,
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
    {
      Icon: MapPin,
      label: "Addresses",
      desc: "Saved delivery addresses",
      href: `${base}?page=addresses`,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      Icon: CreditCard,
      label: "Payment Methods",
      desc: "Cards and UPI",
      href: `${base}?page=payments`,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      Icon: Settings,
      label: "Settings",
      desc: "Profile preferences",
      href: `${base}?page=settings`,
      color: "text-zinc-600",
      bg: "bg-zinc-100",
    },
  ];

  return (
    <section className="min-h-screen bg-[#FAFAF9]">
      <div className="mx-auto max-w-[900px] px-5 py-16">
        {/* Profile Header */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-600 p-8 text-white shadow-2xl shadow-indigo-500/20">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold backdrop-blur">
              {customer.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-white/70">
                Welcome back
              </p>
              <h1 className="mt-1 text-2xl font-bold">{customer.name}</h1>
              <p className="mt-0.5 text-sm text-white/80">{customer.email}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: "Orders", value: customer.ordersCount || 0 },
              { label: "Wishlist", value: 0 },
              { label: "Points", value: 250 },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/10 p-4 text-center backdrop-blur"
              >
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-white/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="mt-8 space-y-3">
          {menu.map(({ Icon, label, desc, href, color, bg }) => (
            <Link
              key={label}
              href={href}
              className="group flex items-center gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${bg}`}
              >
                <Icon className={`h-5 w-5 ${color}`} strokeWidth={2.2} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-zinc-900 group-hover:text-indigo-600">
                  {label}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">{desc}</p>
              </div>
              <ChevronRight
                className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-1"
                strokeWidth={2.4}
              />
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={async () => {
            await fetch(`/api/customer/logout?slug=${slug}`, {
              method: "POST",
            });
            window.location.href = `${base}?page=account`;
          }}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full border-2 border-dashed border-red-200 bg-red-50 py-4 text-xs font-bold uppercase tracking-wider text-red-600 transition hover:bg-red-100"
        >
          <LogOut className="h-4 w-4" strokeWidth={2.4} />
          Logout
        </button>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// AUTH FORM (login / register)
// ═══════════════════════════════════════════════════════
function AuthForm({ mode, slug, store, base, router }: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const isLogin = mode === "login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin
        ? "/api/customer/login"
        : "/api/customer/register";

      const res = await fetch(`${endpoint}?slug=${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      router.push(`${base}?page=account`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#FAFAF9]">
      <div className="mx-auto max-w-md px-5 py-20 lg:py-28">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            {isLogin ? "Welcome back" : "Join us"}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
            {isLogin ? (
              <>
                Sign{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent italic">
                  in
                </span>
              </>
            ) : (
              <>
                Sign{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent italic">
                  up
                </span>
              </>
            )}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-4 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
        >
          {!isLogin && (
            <Field
              label="Full Name"
              icon={<User className="h-4 w-4" />}
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              required
            />
          )}
          <Field
            label="Email"
            type="email"
            icon={<Mail className="h-4 w-4" />}
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            required
          />
          {!isLogin && (
            <Field
              label="Phone"
              icon={<Phone className="h-4 w-4" />}
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
            />
          )}
          <Field
            label="Password"
            type="password"
            value={form.password}
            onChange={(v) => setForm({ ...form, password: v })}
            required
          />

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-zinc-900 py-4 text-sm font-semibold text-white shadow-xl shadow-zinc-900/20 transition hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
          </button>

          <button
            type="button"
            onClick={() =>
              router.push(
                isLogin
                  ? `${base}?page=account-register`
                  : `${base}?page=account-login`
              )
            }
            className="w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            {isLogin
              ? "New here? Create an account"
              : "Already have an account? Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// INPUT FIELD
// ═══════════════════════════════════════════════════════
function Field({
  label,
  value,
  onChange,
  type = "text",
  icon,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  icon?: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-600">
        {icon && <span className="text-indigo-500">{icon}</span>}
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-3.5 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
      />
    </div>
  );
}