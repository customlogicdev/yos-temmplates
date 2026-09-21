// src/templates/beauty/lumiere/sections/Newsletter.tsx

"use client";

import { useState } from "react";
import { Mail, Check, Sparkles, Flower2 } from "lucide-react";

export function LumiereNewsletter({ props }: { props: any }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="border-t border-[#E8DDD5]/60 bg-[#FAF7F5] py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#B76E79] via-[#FFB6A3] to-[#C9B6E4] p-8 shadow-2xl shadow-[#B76E79]/30 lg:p-16">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#FFE5A3]/40 blur-3xl" />
            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-[#A8E6CF]/40 blur-3xl" />
          </div>

          {/* Floating flower icon */}
          <Flower2 className="pointer-events-none absolute right-10 top-10 h-16 w-16 animate-pulse text-white/20" />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-white" strokeWidth={2.4} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white">
                  Join the glow list
                </span>
              </div>

              <h2 className="mt-6 font-serif text-[clamp(2rem,4vw,3.5rem)] font-normal italic leading-[1.02] tracking-tight text-white">
                Get <span className="text-[#FFE5A3]">10% off</span>
                <br />
                your first ritual.
              </h2>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90">
                Beauty tips, exclusive drops, and early access — straight to
                your inbox. No spam, just glow.
              </p>
            </div>

            {/* Right — Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex gap-2 rounded-full border-2 border-white/40 bg-white/10 p-1.5 backdrop-blur-sm focus-within:border-white/70">
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-full bg-transparent py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/60"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#B76E79] shadow-lg transition hover:scale-105 hover:bg-[#FFE5A3]"
                  >
                    {submitted ? (
                      <>
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        Joined
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">
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