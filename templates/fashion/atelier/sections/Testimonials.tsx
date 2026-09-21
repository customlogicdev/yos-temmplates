// src/templates/fashion/atelier/sections/Testimonials.tsx

"use client";

import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Arjun K.",
    handle: "@arjun.k",
    text: "Quality is on another level. The heavyweight tee is now my daily.",
    rating: 5,
  },
  {
    name: "Riya M.",
    handle: "@riya.styles",
    text: "Finally a brand that gets streetwear. The archive drop was 🔥",
    rating: 5,
  },
  {
    name: "Kabir S.",
    handle: "@kabir.singh",
    text: "Shipping was fast, packaging was clean. Already ordered round 2.",
    rating: 5,
  },
];

export function AtelierTestimonials({ props }: { props: any }) {
  return (
    <section className="border-t border-zinc-200/60 bg-white py-20">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            The Streets Are Talking
          </p>
          <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight text-zinc-900">
            Loved by{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent italic">
              thousands
            </span>
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10"
            >
              <Quote
                className="absolute right-4 top-4 h-12 w-12 text-indigo-100"
                strokeWidth={1.5}
              />

              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="mt-6 text-base leading-relaxed text-zinc-700">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="mt-8 flex items-center gap-3 border-t border-zinc-100 pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20">
                  <span className="text-sm font-bold">{review.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {review.name}
                  </p>
                  <p className="text-xs text-zinc-500">{review.handle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}