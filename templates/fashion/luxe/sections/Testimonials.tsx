// src/templates/fashion/luxe/sections/Testimonials.tsx

"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import type { TemplateRenderProps } from "@/lib/types";

interface TestimonialsProps {
  props: TemplateRenderProps;
}

const DEFAULT_REVIEWS = [
  {
    name: "Ananya S.",
    city: "Mumbai",
    text: "The tailoring is impeccable. Every piece feels like it was made for me.",
    rating: 5,
  },
  {
    name: "Priya M.",
    city: "Delhi",
    text: "Timeless designs that I'll wear for decades. Worth every rupee.",
    rating: 5,
  },
  {
    name: "Riya K.",
    city: "Bengaluru",
    text: "From packaging to fit — the attention to detail is unmatched.",
    rating: 5,
  },
];

export function FashionTestimonials({ props }: TestimonialsProps) {
  const store: any = props?.data?.store || {};
  const reviews =
    (store.testimonials as typeof DEFAULT_REVIEWS) || DEFAULT_REVIEWS;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative mx-auto max-w-[1600px] px-5 py-24 lg:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#8F6E3D]">
          Client Words
        </p>
        <h2 className="mt-5 font-[family-name:var(--store-display)] text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] tracking-[-0.03em] text-[#1A1815]">
          Loved by{" "}
          <span className="relative italic">
            <span className="relative z-10">thousands</span>
            <span
              aria-hidden
              className="absolute bottom-1 left-0 h-2 w-full bg-[#D4AF7A]/40"
            />
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#6A6156]">
          Real words from real clients — because the truest test of craft is
          how it lives in the world.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {reviews.map((review, i) => (
          <div
            key={review.name}
            className="group relative flex flex-col justify-between overflow-hidden border border-[#E5DDD0] bg-white p-8 transition duration-500 hover:-translate-y-2 hover:border-[#B8935A] hover:shadow-[0_30px_80px_-30px_rgba(184,147,90,0.3)]"
            style={{
              animation: mounted
                ? `fadeUp 0.8s ease-out ${i * 140}ms both`
                : "none",
            }}
          >
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#D4AF7A]/10 transition-transform duration-700 group-hover:scale-150"
            />

            <Quote
              className="absolute right-4 top-4 h-14 w-14 text-[#F1EBE0] transition duration-500 group-hover:text-[#D4AF7A]/40"
              strokeWidth={1}
            />

            <div className="relative">
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-3.5 w-3.5 fill-[#B8935A] text-[#B8935A]"
                  />
                ))}
              </div>

              <p className="mt-7 font-[family-name:var(--store-display)] text-[17px] leading-relaxed tracking-[-0.005em] text-[#1A1815]">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>

            <div className="relative mt-8 border-t border-[#E5DDD0] pt-5">
              <p className="font-[family-name:var(--store-display)] text-sm font-medium text-[#1A1815]">
                {review.name}
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.24em] text-[#8A7F72]">
                {review.city} · Verified Client
              </p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}