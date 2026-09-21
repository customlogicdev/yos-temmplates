// src/templates/fashion/luxe/sections/AtelierSection.tsx

"use client";

import { useEffect, useState, useRef } from "react";
import { Scissors, Sparkles, Package, Heart } from "lucide-react";

interface AtelierSectionProps {
  props: any;
}

const FEATURES = [
  {
    Icon: Scissors,
    title: "Hand-Finished",
    desc: "Each piece is tailored by master craftsmen in our Mumbai atelier.",
    code: "Craft",
  },
  {
    Icon: Sparkles,
    title: "Limited Runs",
    desc: "Never mass-produced. Small batches, thoughtfully made.",
    code: "Scarcity",
  },
  {
    Icon: Package,
    title: "Insured Delivery",
    desc: "Every order ships fully insured across India.",
    code: "Trust",
  },
  {
    Icon: Heart,
    title: "Lifetime Care",
    desc: "Complimentary alterations and repairs, forever.",
    code: "Service",
  },
];

export function AtelierSection({ props }: AtelierSectionProps) {
  const heading = props?.data?.store?.atelierTitle || "Crafted to be kept";
  const eyebrow = props?.data?.store?.atelierEyebrow || "The Atelier Promise";

  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-[#E5DDD0] bg-[#F1EBE0] py-24"
    >
      {/* Ambient texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(184,147,90,0.15) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#8F6E3D]">
              {eyebrow}
            </p>
            <h2 className="mt-5 font-[family-name:var(--store-display)] text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.02] tracking-[-0.03em] text-[#1A1815]">
              {heading.includes("kept") ? (
                <>
                  Crafted to be{" "}
                  <span className="relative italic">
                    <span className="relative z-10">kept</span>
                    <span
                      aria-hidden
                      className="absolute bottom-1 left-0 h-2 w-full bg-[#D4AF7A]/50"
                    />
                  </span>
                </>
              ) : (
                heading
              )}
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#6A6156]">
              Our atelier operates on a simple belief — that true luxury is
              measured in decades, not seasons.
            </p>

            <div className="mt-10 hidden h-px w-full bg-[#B8935A]/30 lg:block" />
            <p className="mt-6 hidden text-[10px] uppercase tracking-[0.32em] text-[#8A7F72] lg:block">
              — Est. 1985, Mumbai
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-px overflow-hidden border border-[#E5DDD0] bg-[#E5DDD0] sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map(({ Icon, title, desc, code }, i) => (
                <div
                  key={title}
                  className="group relative bg-[#FAF7F2] p-7 transition duration-500 hover:bg-white"
                  style={{
                    animation: mounted
                      ? `tileIn 0.8s ease-out ${i * 120}ms both`
                      : "none",
                  }}
                >
                  <span className="absolute right-5 top-5 font-[family-name:var(--store-display)] text-[10px] tracking-[0.24em] text-[#8A7F72]/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#E5DDD0] transition duration-500 group-hover:border-[#B8935A] group-hover:bg-[#1A1815]">
                    <Icon
                      className="h-5 w-5 text-[#1A1815] transition duration-500 group-hover:text-[#D4AF7A]"
                      strokeWidth={1.6}
                    />
                  </div>

                  <p className="mt-6 text-[9px] uppercase tracking-[0.32em] text-[#8F6E3D]">
                    {code}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--store-display)] text-lg tracking-[-0.015em] text-[#1A1815]">
                    {title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-[#6A6156]">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes tileIn {
          from {
            opacity: 0;
            transform: translateY(20px);
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