// src/templates/beauty/glow/sections/ConcernGrid.tsx

"use client";

import Link from "next/link";
import { Droplet, Sun, Leaf, Heart, Sparkles, Wind } from "lucide-react";

const CONCERNS = [
  {
    Icon: Droplet,
    title: "Hydration",
    desc: "Quench dry, thirsty skin",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.10)",
    tag: "hydration",
  },
  {
    Icon: Sun,
    title: "Brightening",
    desc: "Even tone & glow",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.10)",
    tag: "brightening",
  },
  {
    Icon: Leaf,
    title: "Acne Care",
    desc: "Clear, calm breakouts",
    color: "#10B981",
    bg: "rgba(16,185,129,0.10)",
    tag: "acne",
  },
  {
    Icon: Heart,
    title: "Anti-Aging",
    desc: "Firm, youthful skin",
    color: "#EC4899",
    bg: "rgba(236,72,153,0.10)",
    tag: "anti-aging",
  },
  {
    Icon: Sparkles,
    title: "Glow",
    desc: "Radiance & luminosity",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.10)",
    tag: "glow",
  },
  {
    Icon: Wind,
    title: "Sensitivity",
    desc: "Soothing, gentle care",
    color: "#14B8A6",
    bg: "rgba(20,184,166,0.10)",
    tag: "sensitive",
  },
];

export function ConcernGrid({ props }: { props: any }) {
  const basePath = props?.basePath || "";

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16">
      {/* Header */}
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-pink-500">
          Find your routine
        </p>
        <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-[#2A2438]">
          Shop by <span className="italic text-pink-500">concern</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#2A2438]/60">
          Every skin is different. Find the ritual that's made for yours.
        </p>
      </div>

      {/* Grid */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONCERNS.map(({ Icon, title, desc, color, bg, tag }) => (
          <Link
            key={tag}
            href={`${basePath}?page=search&q=${tag}`}
            className="group relative overflow-hidden rounded-2xl border border-pink-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl hover:shadow-pink-100"
          >
            {/* Top accent */}
            <span
              className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              style={{ background: color }}
            />

            <div className="flex items-start gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                style={{ background: bg }}
              >
                <Icon className="h-5 w-5" style={{ color }} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-medium text-[#2A2438] transition-colors group-hover:text-pink-500">
                  {title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#2A2438]/60">
                  {desc}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end text-[10px] uppercase tracking-[0.15em] text-[#2A2438]/40 transition-colors group-hover:text-pink-500">
              Explore →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}