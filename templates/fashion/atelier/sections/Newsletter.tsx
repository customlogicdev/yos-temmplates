// src/templates/fashion/atelier/sections/Newsletter.tsx

"use client";

import { useState } from "react";
import { Sparkles, Check } from "lucide-react";

export function AtelierNewsletter({ props }: { props: any }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="border-t border-zinc-200/60 bg-[#FAFAF9] py-20">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-600 p-8 shadow-2xl shadow-indigo-500/20 lg:p-16">
          {/* Decorative */}
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-pink-300/40 blur-3xl" />
          </div>

          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-white" strokeWidth={2.4} />
                <span className="text-xs font-semibold uppercase tracking-wider text-white">
                  Early Access
                </span>
              </div>

              <h2 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-bold leading-tight tracking-tight text-white">
                Drop first.{" "}
                <span className="text-white/70 italic">Read later.</span>
              </h2>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-indigo-50">
                Get 24-hour early access to every drop, exclusive archive
                releases, and members-only pricing.
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
                <div className="flex gap-2 rounded-full border-2 border-white/30 bg-white/10 p-1.5 backdrop-blur-sm focus-within:border-white/60">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent px-5 py-3 text-sm text-white outline-none placeholder:text-white/50"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-indigo-600 shadow-lg transition hover:bg-zinc-100"
                  >
                    {submitted ? (
                      <>
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        Joined
                      </>
                    ) : (
                      "Join"
                    )}
                  </button>
                </div>

                <p className="text-[10px] uppercase tracking-wider text-white/60">
                  No spam · Unsubscribe anytime
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}