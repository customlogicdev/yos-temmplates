// src/templates/healthcare/clinic/sections/HealthPackages.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Package,
  Check,
  ArrowRight,
  Shield,
  Sparkles,
  Heart,
} from "lucide-react";
import { formatMoney } from "@/lib/format";

export function HealthPackages({ props }: { props: any }) {
  const basePath = props?.basePath || "";

  const packages = [
    {
      id: "basic",
      name: "Basic Health Check",
      price: 1499,
      original: 2200,
      Icon: Shield,
      color: "#10B981",
      bg: "rgba(16,185,129,0.10)",
      popular: false,
      tests: ["CBC", "Blood Sugar", "Lipid Profile", "Urine Test"],
      duration: "60 min",
    },
    {
      id: "advanced",
      name: "Advanced Full Body",
      price: 3499,
      original: 5500,
      Icon: Sparkles,
      color: "#8B5CF6",
      bg: "rgba(139,92,246,0.10)",
      popular: true,
      tests: [
        "All Basic tests",
        "Liver Function",
        "Kidney Function",
        "Thyroid Profile",
        "Vitamin D & B12",
        "ECG",
      ],
      duration: "2 hrs",
    },
    {
      id: "cardiac",
      name: "Cardiac Care Package",
      price: 4999,
      original: 7500,
      Icon: Heart,
      color: "#EF4444",
      bg: "rgba(239,68,68,0.10)",
      popular: false,
      tests: [
        "ECG + Echo",
        "Lipid Profile",
        "TMT",
        "Cardiologist Consult",
      ],
      duration: "3 hrs",
    },
  ];

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--store-accent)]/10 px-3 py-1">
          <Package
            className="h-3.5 w-3.5 text-[var(--store-accent)]"
            strokeWidth={2.2}
          />
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--store-accent)]">
            Health Packages
          </p>
        </div>
        <h2 className="mt-4 font-[family-name:var(--store-display)] text-[clamp(1.9rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.02em]">
          Preventive Care, Simplified
        </h2>
        <p className="mt-3 text-sm text-[var(--store-muted)]">
          Comprehensive health checkups with transparent pricing. Book
          instantly, no hidden charges.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {packages.map((pkg) => {
          const { Icon } = pkg;
          const isHovered = hoveredId === pkg.id;
          const savings = pkg.original - pkg.price;

          return (
            <div
              key={pkg.id}
              onMouseEnter={() => setHoveredId(pkg.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative flex flex-col overflow-hidden rounded-[var(--store-radius)] border bg-[var(--store-surface)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.25)] ${
                pkg.popular
                  ? "border-[var(--store-accent)]/40"
                  : "border-[var(--store-border)]"
              }`}
              style={
                {
                  ["--pkg-color" as any]: pkg.color,
                  ["--pkg-bg" as any]: pkg.bg,
                } as React.CSSProperties
              }
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-[var(--store-accent)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--store-accent-fg)]">
                  <Sparkles className="h-2.5 w-2.5" strokeWidth={2.5} />
                  Most Popular
                </div>
              )}

              {/* Top color accent */}
              <span
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: pkg.color }}
              />

              {/* Ambient glow */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: pkg.bg }}
              />

              <div className="relative flex flex-1 flex-col p-7">
                {/* Icon + Name */}
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ background: pkg.bg }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: pkg.color }}
                      strokeWidth={2}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold leading-tight">{pkg.name}</h3>
                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-[var(--store-muted)]">
                      {pkg.duration} · {pkg.tests.length} tests
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-6 flex items-end gap-2">
                  <span className="font-[family-name:var(--store-display)] text-3xl font-bold tabular-nums">
                    {formatMoney(pkg.price)}
                  </span>
                  <span className="pb-1 text-sm text-[var(--store-muted)] line-through tabular-nums">
                    {formatMoney(pkg.original)}
                  </span>
                </div>

                {/* Savings */}
                <div
                  className="mt-2 inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
                  style={{ background: pkg.bg, color: pkg.color }}
                >
                  Save {formatMoney(savings)}
                </div>

                {/* Tests list */}
                <ul className="mt-6 space-y-2.5">
                  {pkg.tests.map((test) => (
                    <li
                      key={test}
                      className="flex items-start gap-2 text-xs text-[var(--store-muted)]"
                    >
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0"
                        style={{ color: pkg.color }}
                        strokeWidth={2.8}
                      />
                      <span>{test}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto pt-7">
                  <Link
                    href={`${basePath}/packages/${pkg.id}`}
                    className="group/btn flex w-full items-center justify-center gap-2 rounded-full py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300"
                    style={{
                      background: isHovered ? pkg.color : "var(--store-accent)",
                    }}
                  >
                    Book Package
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1"
                      strokeWidth={2.4}
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}