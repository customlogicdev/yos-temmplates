// src/templates/beauty/glow/sections/Newsletter.tsx

"use client";

import { useState } from "react";
import { Mail, Check, Sparkles } from "lucide-react";

export function BeautyNewsletter({ props }: { props: any }) {
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
    <section className="mx-auto max-w-[1400px] px-6 py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#2A2438] px-8 py-16 text-center">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-pink-300" strokeWidth={2} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-pink-200">
              Join the glow list
            </span>
          </div>

          <h2 className="mt-6 font-serif text-[clamp(2rem,4.5vw,3.2rem)] font-normal leading-tight tracking-tight text-white">
            Get <span className="italic text-pink-300">10% off</span>
            <br />
            your first order
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60">
            Beauty tips, exclusive drops, and early access — straight to your
            inbox. No spam, just glow.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md gap-2"
          >
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-full bg-white/10 py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/40 outline-none backdrop-blur-sm transition focus:bg-white/15"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-pink-400"
            >
              {submitted ? (
                <>
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Joined
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>

          <p className="mt-4 text-[10px] uppercase tracking-wider text-white/40">
            By subscribing you agree to our privacy policy
          </p>
        </div>
      </div>
    </section>
  );
}