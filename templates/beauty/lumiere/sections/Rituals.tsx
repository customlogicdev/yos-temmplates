// src/templates/beauty/lumiere/sections/Rituals.tsx

"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const RITUALS = [
  {
    id: "morning-glow",
    name: "Morning Glow",
    desc: "5-step routine for luminous skin",
    time: "5 min",
    steps: 5,
    image: "https://images.pexels.com/photos/3735622/pexels-photo-3735622.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "#FFE5A3",
  },
  {
    id: "evening-repair",
    name: "Evening Repair",
    desc: "Deep overnight recovery",
    time: "8 min",
    steps: 4,
    image: "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "#C9B6E4",
  },
  {
    id: "weekend-luxe",
    name: "Weekend Luxe",
    desc: "Indulgent spa-at-home",
    time: "20 min",
    steps: 6,
    image: "https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=800",
    color: "#A8E6CF",
  },
];

export function LumiereRituals({ props }: { props: any }) {
  const slug = props?.slug || props?.data?.slug || "";
  const base = `/store/${slug}`;

  return (
    <section className="border-t border-[#E8DDD5]/60 bg-[#FAF7F5] py-20 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        {/* Header */}
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B76E79]">
            Curated Routines
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.5rem)] font-normal italic leading-tight tracking-tight text-[#1F1B24]">
            Your beauty <span className="text-[#B76E79]">rituals</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {RITUALS.map((ritual, i) => (
            <Link
              key={ritual.id}
              href={`${base}?page=products&ritual=${ritual.id}`}
              className="group relative flex flex-col items-center"
            >
              {/* Colored glow */}
              <div
                className="absolute -inset-2 rounded-[2.5rem] opacity-0 blur-xl transition group-hover:opacity-50"
                style={{ background: ritual.color }}
              />

              {/* Card with colored frame */}
              <div className="relative w-full overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-md transition duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                {/* Image — smaller */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={ritual.image}
                    alt={ritual.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* Colored top-left dot */}
                  <div
                    className="absolute left-4 top-4 h-3 w-3 rounded-full border-2 border-white shadow-lg"
                    style={{ background: ritual.color }}
                  />

                  {/* Time badge */}
                  <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 backdrop-blur-sm">
                    <span className="text-[10px] font-bold text-[#1F1B24]">
                      {ritual.time}
                    </span>
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl italic text-[#1F1B24] transition group-hover:text-[#B76E79]">
                    {ritual.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#1F1B24]/60">
                    {ritual.desc}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#E8DDD5] pt-4">
                    <div className="flex items-center gap-2">
                      <Sparkles
                        className="h-3.5 w-3.5"
                        style={{ color: ritual.color }}
                        strokeWidth={2}
                      />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#1F1B24]/50">
                        {ritual.steps} steps
                      </span>
                    </div>
                    <ArrowRight
                      className="h-4 w-4 text-[#B76E79] transition-transform group-hover:translate-x-1"
                      strokeWidth={2.4}
                    />
                  </div>
                </div>
              </div>

              {/* Colored ritual number badge */}
              <div
                className="absolute -bottom-2 -left-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white font-serif text-sm italic text-[#1F1B24] shadow-md"
                style={{ background: ritual.color }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}