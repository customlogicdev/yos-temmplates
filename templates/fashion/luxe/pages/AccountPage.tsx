"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Phone, MapPin, ArrowRight, LogOut } from "lucide-react";
import { TemplateFrame } from "@/templates/frame";
import { FashionLuxeShell } from "../layout/FashionLuxeShell";

interface FashionAccountPageProps {
  slug: string;
  store: any;
  customer: any | null;
  redirectTo?: string;
  reason?: string;
}

export function FashionAccountPage({
  slug,
  store,
  customer,
  redirectTo,
  reason,
}: FashionAccountPageProps) {
  const router = useRouter();
  const props: any = {
    slug,
    basePath: `/store/${slug}`,
    data: { products: [], store },
    storefront: store,
  };

  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint =
        mode === "login"
          ? "/api/customer/login"
          : "/api/customer/register";

      const res = await fetch(`${endpoint}?slug=${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      // ✅ Login/register success → redirectTo pe bhejo
      const target = redirectTo || `/store/${slug}/fashion/account`;
      router.push(target);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  // ═══════════════════════════════════════════════════════════
  // LOGGED IN VIEW
  // ═══════════════════════════════════════════════════════════
  if (customer) {
    return (
      <TemplateFrame props={props}>
        <FashionLuxeShell props={props} slug={slug}>
          <section className="mx-auto max-w-2xl px-5 py-20">
            <div className="mb-10 text-center">
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#8F6E3D]">
                My Account
              </p>
              <h1 className="mt-3 font-[family-name:var(--store-display)] text-[clamp(2rem,4.5vw,3rem)] leading-[1] tracking-[-0.03em] text-[#1A1815]">
                Welcome, <span className="italic">{customer.name?.split(" ")[0] || "there"}</span>
              </h1>
            </div>

            <div className="border border-[#E5DED2] bg-white px-6 py-6">
              <div className="space-y-4">
                <Row icon={<User className="h-4 w-4" />} label="Name" value={customer.name} />
                <Row icon={<Mail className="h-4 w-4" />} label="Email" value={customer.email} />
                <Row icon={<Phone className="h-4 w-4" />} label="Phone" value={customer.phone || "—"} />
                <Row icon={<MapPin className="h-4 w-4" />} label="City" value={customer.city || "—"} />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/store/${slug}/fashion/account/orders`}
                  className="inline-flex items-center gap-2 bg-[#1A1815] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#B8935A]"
                >
                  My Orders
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <button
                  onClick={async () => {
                    await fetch(`/api/customer/logout?slug=${slug}`, {
                      method: "POST",
                    });
                    router.push(`/store/${slug}/fashion/account`);
                    router.refresh();
                  }}
                  className="inline-flex items-center gap-2 border border-[#1A1815] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1A1815] transition hover:bg-[#1A1815] hover:text-white"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logout
                </button>
              </div>
            </div>
          </section>
        </FashionLuxeShell>
      </TemplateFrame>
    );
  }

  // ═══════════════════════════════════════════════════════════
  // LOGIN / REGISTER VIEW
  // ═══════════════════════════════════════════════════════════
  return (
    <TemplateFrame props={props}>
      <FashionLuxeShell props={props} slug={slug}>
        <section className="mx-auto max-w-md px-5 py-20">
          <div className="mb-8 text-center">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#8F6E3D]">
              {mode === "login" ? "Welcome back" : "Create account"}
            </p>
            <h1 className="mt-3 font-[family-name:var(--store-display)] text-[clamp(1.75rem,4vw,2.5rem)] leading-[1] tracking-[-0.03em] text-[#1A1815]">
              {mode === "login" ? (
                <>Sign <span className="italic">in</span></>
              ) : (
                <>Sign <span className="italic">up</span></>
              )}
            </h1>
            {reason === "checkout" && (
              <p className="mt-3 text-xs text-[#8F6E3D]">
                Please login to continue with checkout.
              </p>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border border-[#E5DED2] bg-white px-6 py-6 space-y-4"
          >
            {mode === "register" && (
              <Field
                label="Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                required
              />
            )}
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              required
            />
            <Field
              label="Phone"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
            />
            <Field
              label="Password"
              type="password"
              value={form.password}
              onChange={(v) => setForm({ ...form, password: v })}
              required
            />

            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A1815] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-white transition hover:bg-[#B8935A] disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Sign In"
                : "Create Account"}
            </button>

            <button
              type="button"
              onClick={() =>
                setMode(mode === "login" ? "register" : "login")
              }
              className="w-full text-center text-xs text-[#8F6E3D] hover:underline"
            >
              {mode === "login"
                ? "New here? Create an account"
                : "Already have an account? Sign in"}
            </button>
          </form>
        </section>
      </FashionLuxeShell>
    </TemplateFrame>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: any;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-[#F0EAE0] pb-3 last:border-b-0">
      <span className="text-[#8F6E3D]">{icon}</span>
      <span className="text-xs uppercase tracking-[0.18em] text-[#8F6E3D] w-20">
        {label}
      </span>
      <span className="text-sm text-[#1A1815]">{value || "—"}</span>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.22em] text-[#8F6E3D]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-2 w-full border border-[#E5DED2] bg-white px-3 py-2.5 text-sm text-[#1A1815] outline-none focus:border-[#B8935A]"
      />
    </div>
  );
}