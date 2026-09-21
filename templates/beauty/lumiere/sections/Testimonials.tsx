// src/templates/beauty/lumiere/sections/Testimonials.tsx

"use client";

import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: "r1",
    name: "Ananya S.",
    handle: "@ananya.glow",
    text: "The hydration serum is a game-changer. My skin has never felt this plump!",
    rating: 5,
    color: "#FFB6A3",
  },
  {
    id: "r2",
    name: "Priya M.",
    handle: "@priya.beauty",
    text: "Finally a brand that understands sensitive skin. No irritation, just glow.",
    rating: 5,
    color: "#A8E6CF",
  },
  {
    id: "r3",
    name: "Riya K.",
    handle: "@riyaskin",
    text: "The clean ingredients list won me over, but the results made me stay.",
    rating: 5,
    color: "#C9B6E4",
  },
];

export function LumiereTestimonials({ props }: { props: any }) {
  const testimonials =
    props?.data?.testimonials?.length > 0 ? props.data.testimonials : REVIEWS;

  return (
    <section className="border-t border-[#E8DDD5]/60 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        {/* Header */}
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
            Real love
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.5rem)] font-normal italic leading-tight tracking-tight text-[#1F1B24]">
            Glowing <span className="text-[#B76E79]">reviews</span>
          </h2>
        </div>

        {/* Reviews */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t: any, i: number) => {
            const colors = ["#FFB6A3", "#A8E6CF", "#C9B6E4"];
            const cardColor = t.color || colors[i % colors.length];

            return (
              <div key={t.id} className="group relative">
                {/* Colored glow */}
                <div
                  className="absolute -inset-2 rounded-[2.5rem] opacity-0 blur-xl transition group-hover:opacity-40"
                  style={{ background: cardColor }}
                />

                <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-[#FAF7F5] p-7 shadow-md transition duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                  {/* Colored quote mark */}
                  <div
                    className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: `${cardColor}40` }}
                  >
                    <Quote
                      className="h-6 w-6 text-[#1F1B24]/60"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-3.5 w-3.5"
                        fill={idx < (t.rating || 5) ? "#B76E79" : "transparent"}
                        stroke="#B76E79"
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="mt-6 font-serif text-base italic leading-relaxed text-[#1F1B24]/80">
                    &ldquo;{t.text || t.quote || t.content}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="mt-8 flex items-center gap-3 border-t border-[#E8DDD5] pt-5">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full font-serif text-sm italic text-[#1F1B24] shadow-md"
                      style={{ background: cardColor }}
                    >
                      {(t.name || t.author || "A").charAt(0)}
                    </div>
                    <div>
                      <p className="font-serif text-sm italic text-[#1F1B24]">
                        {t.name || t.author}
                      </p>
                      <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#1F1B24]/50">
                        {t.handle || t.role || "Verified Buyer"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom stats */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 border-t border-[#E8DDD5] pt-10">
          {[
            { value: "4.9", label: "Average rating", color: "#FFB6A3" },
            { value: "12K+", label: "Verified reviews", color: "#A8E6CF" },
            { value: "98%", label: "Would recommend", color: "#C9B6E4" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: stat.color }}
              />
              <div className="text-center">
                <p className="font-serif text-3xl font-bold italic text-[#B76E79]">
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1F1B24]/50">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}