// src/templates/beauty/lumiere/sections/EditorialStory.tsx

"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Heart } from "lucide-react";

export function LumiereEditorialStory({ props }: { props: any }) {
  const slug = props?.slug || props?.data?.slug || "";
  const base = `/store/${slug}`;
  const store = props?.data?.store || {};

  return (
    <section className="relative overflow-hidden border-t border-[#E8DDD5]/60 bg-gradient-to-br from-[#FFE5E9]/40 via-[#FAF7F5] to-[#C9B6E4]/20 py-20 lg:py-28">
      {/* Decorative */}
      <div className="pointer-events-none absolute -left-32 bottom-20 h-96 w-96 rounded-full bg-[#A8E6CF]/20 blur-3xl" />

      <div className="relative mx-auto max-w-[1600px] px-5 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          {/* LEFT — Image collage (smaller images) */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-md">
              {/* Main framed image */}
              <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-white bg-white shadow-2xl shadow-[#B76E79]/20">
                <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
                  <img
                    src="https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Brand story"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Small floating image — top right */}
              <div className="absolute -right-6 -top-6 hidden h-32 w-24 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl shadow-[#FFB6A3]/30 lg:block">
                <img
                  src="https://images.pexels.com/photos/3735622/pexels-photo-3735622.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Small floating image — bottom left */}
              <div className="absolute -bottom-6 -left-6 hidden h-28 w-24 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl shadow-[#C9B6E4]/30 lg:block">
                <img
                  src="https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Colored stat badge — top left */}
              <div className="absolute -left-8 top-8 hidden rounded-3xl bg-[#A8E6CF] p-5 shadow-xl lg:block">
                <p className="font-serif text-3xl font-bold italic text-[#1F1B24]">
                  50K+
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-[#1F1B24]/60">
                  Glowing
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Story */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#B76E79]/30 bg-white/70 px-4 py-2 backdrop-blur-sm">
              <Heart className="h-3.5 w-3.5 text-[#B76E79]" strokeWidth={2.4} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
                Our Philosophy
              </span>
            </div>

            <h2 className="mt-6 font-serif text-[clamp(2.5rem,5vw,4rem)] font-normal italic leading-[1.02] tracking-tight text-[#1F1B24]">
              Beauty that's{" "}
              <span className="bg-gradient-to-r from-[#B76E79] to-[#FFB6A3] bg-clip-text text-transparent">
                conscious,
              </span>
              <br />
              crafted for you.
            </h2>

            <p className="mt-8 text-base leading-relaxed text-[#1F1B24]/60">
              {store.about ||
                "Born from a simple belief — beauty should be clean, conscious, and crafted with care."}
            </p>

            <p className="mt-4 text-base leading-relaxed text-[#1F1B24]/60">
              From sourcing to packaging, we obsess over every detail.
            </p>

            {/* Colored stat pills */}
            <div className="mt-10 flex flex-wrap gap-3 border-t border-[#E8DDD5] pt-8">
              {[
                { value: "100%", label: "Vegan", color: "#A8E6CF" },
                { value: "0", label: "Cruelty", color: "#FFB6A3" },
                { value: "4.9★", label: "Reviews", color: "#C9B6E4" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-2xl border border-[#E8DDD5] bg-white/80 px-4 py-3 backdrop-blur-sm"
                >
                  <span
                    className="flex h-2.5 w-2.5 rounded-full"
                    style={{ background: stat.color }}
                  />
                  <div>
                    <p className="font-serif text-lg font-bold italic text-[#1F1B24]">
                      {stat.value}
                    </p>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[#1F1B24]/50">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={`${base}?page=about`}
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#1F1B24] px-8 py-4 text-sm font-semibold text-white shadow-2xl shadow-[#B76E79]/30 transition hover:scale-105"
            >
              Read our story
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={2.4}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}