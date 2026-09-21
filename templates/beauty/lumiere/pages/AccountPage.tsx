// src/templates/beauty/lumiere/pages/AccountPage.tsx

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
  Sparkles,
} from "lucide-react";

export function LumiereAccountPage({
  slug,
  customer,
  page,
  sub,
  tab,
  store,
}: any) {
  const base = `/store/${slug}`;
  const router = useRouter();

  const mode =
    page === "account-login" || sub === "login"
      ? "login"
      : page === "account-register" || sub === "register"
      ? "register"
      : sub || "dashboard";

  // NOT LOGGED IN
  if (!customer) {
    if (mode === "login" || mode === "register") {
      return (
        <LumiereAuthForm
          mode={mode}
          slug={slug}
          store={store}
          base={base}
          router={router}
        />
      );
    }

    return (
      <section className="min-h-screen bg-[#FAF7F5]">
        <div className="mx-auto max-w-2xl px-5 py-32 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#B76E79] to-[#D4A5A5]">
            <User className="h-10 w-10 text-white" strokeWidth={1.8} />
          </div>
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
            Your beauty account
          </p>
          <h1 className="mt-4 font-serif text-3xl font-normal italic tracking-tight text-[#1F1B24]">
            Sign in to <span className="text-[#B76E79]">glow</span>
          </h1>
          <p className="mt-3 text-sm text-[#1F1B24]/60">
            Access orders, wishlist, and personalized rituals.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href={`${base}?page=account-login`}
              className="inline-flex items-center gap-2 rounded-full bg-[#1F1B24] px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-zinc-900/20 transition hover:scale-105 hover:bg-[#B76E79]"
            >
              Sign in
              <ChevronRight className="h-4 w-4" strokeWidth={2.4} />
            </Link>
            <Link
              href={`${base}?page=account-register`}
              className="inline-flex items-center gap-2 rounded-full border border-[#E8DDD5] bg-white px-8 py-4 text-sm font-semibold text-[#1F1B24] transition hover:border-[#B76E79]"
            >
              Create account
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // LOGGED IN
  const menu = [
    {
      Icon: Package,
      label: "My Orders",
      desc: "Track and manage",
      href: `${base}?page=orders`,
      color: "text-[#B76E79]",
      bg: "bg-rose-50",
    },
    {
      Icon: Heart,
      label: "Wishlist",
      desc: "Your saved items",
      href: `${base}?page=wishlist`,
      color: "text-pink-500",
      bg: "bg-pink-50",
    },
    {
      Icon: MapPin,
      label: "Addresses",
      desc: "Delivery preferences",
      href: `${base}?page=addresses`,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      Icon: CreditCard,
      label: "Payments",
      desc: "Cards and UPI",
      href: `${base}?page=payments`,
      color: "text-violet-500",
      bg: "bg-violet-50",
    },
    {
      Icon: Settings,
      label: "Settings",
      desc: "Profile and prefs",
      href: `${base}?page=settings`,
      color: "text-zinc-500",
      bg: "bg-zinc-100",
    },
  ];

  return (
    <section className="min-h-screen bg-[#FAF7F5]">
      <div className="mx-auto max-w-[900px] px-5 py-16">
        {/* Profile header */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#B76E79] via-[#D4A5A5] to-[#B76E79] p-8 text-white shadow-2xl shadow-rose-200/50">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 font-serif text-2xl italic backdrop-blur">
              {customer.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
                Welcome back
              </p>
              <h1 className="mt-1 font-serif text-2xl font-normal italic">
                {customer.name}
              </h1>
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
                <p className="font-serif text-2xl font-bold">{stat.value}</p>
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
              className="group flex items-center gap-4 rounded-3xl border border-[#E8DDD5] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#B76E79]/40 hover:shadow-lg"
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${bg}`}
              >
                <Icon className={`h-5 w-5 ${color}`} strokeWidth={2.2} />
              </span>
              <div className="flex-1">
                <p className="font-serif text-base italic text-[#1F1B24] group-hover:text-[#B76E79]">
                  {label}
                </p>
                <p className="mt-0.5 text-xs text-[#1F1B24]/50">{desc}</p>
              </div>
              <ChevronRight
                className="h-4 w-4 text-[#1F1B24]/40 transition-transform group-hover:translate-x-1 group-hover:text-[#B76E79]"
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
          Sign out
        </button>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════
// AUTH FORM
// ═══════════════════════════════════════════════════════
function LumiereAuthForm({ mode, slug, store, base, router }: any) {
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
    <section className="min-h-screen bg-[#FAF7F5]">
      <div className="mx-auto max-w-md px-5 py-20 lg:py-28">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
            {isLogin ? "Welcome back" : "Join Lumière"}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-normal italic tracking-tight text-[#1F1B24]">
            {isLogin ? (
              <>
                Sign{" "}
                <span className="text-[#B76E79]">in</span>
              </>
            ) : (
              <>
                Sign <span className="text-[#B76E79]">up</span>
              </>
            )}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-4 rounded-3xl border border-[#E8DDD5] bg-white p-8 shadow-lg shadow-rose-100/40"
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
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#1F1B24] py-4 text-sm font-semibold text-white shadow-xl shadow-zinc-900/20 transition hover:scale-[1.02] hover:bg-[#B76E79] disabled:opacity-50"
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
            className="w-full text-center text-sm font-medium text-[#B76E79] hover:text-[#1F1B24]"
          >
            {isLogin
              ? "New here? Create an account"
              : "Already have an account? Sign in"}
          </button>
        </form>

        <p className="mt-6 flex items-center justify-center gap-2 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1F1B24]/40">
          <Sparkles className="h-3 w-3" strokeWidth={2} />
          Cruelty-free · Vegan · Glow
        </p>
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
      <label className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1F1B24]/60">
        {icon && <span className="text-[#B76E79]">{icon}</span>}
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-2 w-full rounded-2xl border border-[#E8DDD5] bg-[#FAF7F5] px-5 py-3.5 text-sm text-[#1F1B24] outline-none transition focus:border-[#B76E79] focus:bg-white focus:ring-4 focus:ring-[#B76E79]/10"
      />
    </div>
  );
}