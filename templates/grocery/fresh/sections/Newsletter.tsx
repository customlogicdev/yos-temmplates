// src/templates/grocery/fresh/sections/Newsletter.tsx

"use client";

import { useState } from "react";
import { Mail, Check, Sparkles, Gift } from "lucide-react";

export function GroceryNewsletter({ props }: { props: any }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 p-8 lg:p-16">
        {/* Decorative */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-orange-400/20 blur-3xl" />
        </div>

        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-sm">
              <Gift className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">
                Get ₹100 Off
              </span>
            </div>

            <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-black leading-tight tracking-tight text-white">
              Fresh deals,{" "}
              <span className="text-orange-300">weekly.</span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-green-50">
              Subscribe for weekly fresh deals, seasonal produce alerts, and
              recipe ideas. Get ₹100 off your first order.
            </p>
          </div>

          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email) return;
                setSubmitted(true);
                setTimeout(() => {
                  setEmail("");
                  setSubmitted(false);
                }, 3000);
              }}
              className="space-y-3"
            >
              <div className="relative">
                <Mail className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-green-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-2xl bg-white py-4 pl-14 pr-4 text-sm font-medium outline-none transition focus:ring-4 focus:ring-orange-300/50"
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white transition hover:scale-[1.02] hover:bg-orange-600"
              >
                {submitted ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" strokeWidth={2.5} />
                    Get My ₹100 Off
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-green-100">
              <span>✓ No spam</span>
              <span>✓ Weekly deals</span>
              <span>✓ Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}