// src/templates/beauty/glow/sections/Testimonials.tsx

"use client";

import { Star } from "lucide-react";

const REVIEWS = [
  {
    id: "r1",
    author: "Ananya S.",
    role: "Verified Buyer",
    quote:
      "My skin has never felt this good. The hydration serum is a game-changer — I've repurchased three times already!",
    rating: 5,
  },
  {
    id: "r2",
    author: "Priya M.",
    role: "Verified Buyer",
    quote:
      "Finally a brand that understands sensitive skin. No irritation, just glow. The packaging is beautiful too.",
    rating: 5,
  },
  {
    id: "r3",
    author: "Riya K.",
    role: "Verified Buyer",
    quote:
      "The clean ingredients list won me over, but the results made me stay. My dark spots have faded noticeably.",
    rating: 5,
  },
];

export function BeautyTestimonials({ props }: { props: any }) {
  const testimonials =
    props?.data?.testimonials?.length > 0 ? props.data.testimonials : REVIEWS;

  return (
    <section className="bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 py-20">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-pink-500">
            Real love, real reviews
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-[#2A2438]">
            Glowing <span className="italic text-pink-500">reviews</span>
          </h2>
        </div>

        {/* Reviews */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t: any) => (
            <div
              key={t.id}
              className="rounded-2xl border border-pink-100 bg-white/80 p-6 backdrop-blur-sm"
            >
              {/* Stars */}
              <div className="flex gap-0.5 text-pink-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4"
                    fill={i < (t.rating || 5) ? "currentColor" : "none"}
                    strokeWidth={1.5}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="mt-4 font-serif text-[15px] leading-relaxed text-[#2A2438]/80">
                "{t.quote || t.content}"
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 border-t border-pink-100 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 font-serif text-sm text-pink-600">
                  {(t.author || "A").charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2A2438]">
                    {t.author}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-[#2A2438]/50">
                    {t.role || "Verified Buyer"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}