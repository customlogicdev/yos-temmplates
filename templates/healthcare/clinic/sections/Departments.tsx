// src/templates/healthcare/clinic/sections/Departments.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { formatMoney } from "@/lib/format";
import {
  Heart,
  Brain,
  Bone,
  Baby,
  Sparkles,
  Smile,
  Eye,
  Flower2,
  Stethoscope,
  Activity,
  Syringe,
  Pill,
  Hospital,
  ShieldCheck,
  Clock,
  CreditCard,
  Star,
  ArrowRight,
  ArrowUpRight,
  Award,
  Users,
  LucideIcon,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// 🎨 Department icon + color map (auto-detected by name)
// ─────────────────────────────────────────────────────────────
type DeptStyle = {
  Icon: LucideIcon;
  color: string;
  bg: string;
  desc: string;
};

const DEPARTMENT_STYLES: Record<string, DeptStyle> = {
  cardiology: {
    Icon: Heart,
    color: "#EF4444",
    bg: "rgba(239,68,68,0.10)",
    desc: "Heart & vascular care",
  },
  neurology: {
    Icon: Brain,
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.10)",
    desc: "Brain & nervous system",
  },
  orthopedics: {
    Icon: Bone,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.10)",
    desc: "Bones, joints & muscles",
  },
  pediatrics: {
    Icon: Baby,
    color: "#EC4899",
    bg: "rgba(236,72,153,0.10)",
    desc: "Child healthcare",
  },
  dermatology: {
    Icon: Sparkles,
    color: "#14B8A6",
    bg: "rgba(20,184,166,0.10)",
    desc: "Skin, hair & nails",
  },
  dentistry: {
    Icon: Smile,
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.10)",
    desc: "Dental & oral care",
  },
  ophthalmology: {
    Icon: Eye,
    color: "#06B6D4",
    bg: "rgba(6,182,212,0.10)",
    desc: "Eye & vision care",
  },
  gynecology: {
    Icon: Flower2,
    color: "#F472B6",
    bg: "rgba(244,114,182,0.10)",
    desc: "Women's health",
  },
  general: {
    Icon: Stethoscope,
    color: "#10B981",
    bg: "rgba(16,185,129,0.10)",
    desc: "General medicine",
  },
  diagnostics: {
    Icon: Activity,
    color: "#0EA5E9",
    bg: "rgba(14,165,233,0.10)",
    desc: "Lab & imaging tests",
  },
  vaccination: {
    Icon: Syringe,
    color: "#84CC16",
    bg: "rgba(132,204,22,0.10)",
    desc: "Immunization & vaccines",
  },
  pharmacy: {
    Icon: Pill,
    color: "#F97316",
    bg: "rgba(249,115,22,0.10)",
    desc: "Medicines & prescriptions",
  },
};

// 🔍 Smart matcher — finds the best style for any department name
function getDeptStyle(name: string): DeptStyle {
  const key = (name || "").toLowerCase().replace(/[^a-z]/g, "");
  for (const k of Object.keys(DEPARTMENT_STYLES)) {
    if (key.includes(k)) return DEPARTMENT_STYLES[k];
  }
  return {
    Icon: Hospital,
    color: "var(--store-accent)",
    bg: "var(--store-accent)",
    desc: "Specialized care",
  };
}

// ─────────────────────────────────────────────────────────────
// 🏥 Main Component
// ─────────────────────────────────────────────────────────────
export function DepartmentGrid({ props }: { props: any }) {
  const departments = props.data?.categories || [];
  const products = props.data?.products || [];
  const basePath = props.basePath || "";
  const [activeId, setActiveId] = useState<string | null>(null);

  const visible = departments.slice(0, 6);

  return (
    <section className="relative mx-auto max-w-[1400px] px-5 py-16">
      {/* 🌫️ Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[var(--store-accent)]/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[var(--store-accent)]/5 blur-3xl" />
      </div>

      {/* ── Header ── */}
      <div className="relative flex flex-col gap-4 border-b border-[var(--store-border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--store-accent)]/10 px-3 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--store-accent)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--store-accent)]" />
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--store-accent)]">
              Our Departments
            </p>
          </div>

          <h2 className="mt-3 font-[family-name:var(--store-display)] text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em]">
            Care, priced upfront
          </h2>
          <p className="mt-2 max-w-lg text-sm text-[var(--store-muted)]">
            Transparent pricing. Expert specialists. Book instantly.
          </p>
        </div>

        <Link
          href={`${basePath}/services`}
          className="group inline-flex items-center gap-2 self-start rounded-full border border-[var(--store-border)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition hover:border-[var(--store-accent)] hover:text-[var(--store-accent)] sm:self-auto"
        >
          All Services
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* ── Grid ── */}
      <div className="relative mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((department: any) => {
          const items = products.filter(
            (p: any) => p.categoryId === department.id
          );
          const from = items.length
            ? Math.min(...items.map((item: any) => item.price))
            : 0;
          const style = getDeptStyle(department.name);
          const { Icon } = style;
          const isActive = activeId === department.id;

          return (
            <Link
              key={department.id}
              href={`${basePath}/collection/${department.slug}`}
              onMouseEnter={() => setActiveId(department.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(department.id)}
              onBlur={() => setActiveId(null)}
              className="group relative overflow-hidden rounded-[var(--store-radius)] border border-[var(--store-border)] bg-[var(--store-surface)] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)]"
              style={
                {
                  ["--dept-color" as any]: style.color,
                  ["--dept-bg" as any]: style.bg,
                } as React.CSSProperties
              }
            >
              {/* Top color accent bar */}
              <span
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: style.color }}
              />

              {/* Ambient glow on hover */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: style.bg }}
              />

              <div className="relative flex items-start gap-4">
                {/* Icon Tile */}
                <div
                  className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: style.bg }}
                >
                  <Icon
                    className="h-7 w-7 transition-colors duration-300"
                    style={{ color: style.color }}
                    strokeWidth={1.8}
                  />

                  {/* Ping ring on hover */}
                  <span
                    className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:animate-ping group-hover:opacity-60"
                    style={{ background: style.bg }}
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="truncate font-semibold text-[15px] leading-tight transition-colors group-hover:text-[var(--dept-color)]">
                      {department.name}
                    </h3>

                    {/* Arrow indicator (appears on hover) */}
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 -translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                      style={{ color: style.color }}
                      strokeWidth={2.4}
                    />
                  </div>

                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-[var(--store-muted)]">
                    {style.desc}
                  </p>

                  <div className="my-3 h-px w-full bg-[var(--store-border)]" />

                  {/* Meta row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold tabular-nums"
                        style={{ background: style.bg, color: style.color }}
                      >
                        {items.length}
                      </span>
                      <span className="text-[11px] text-[var(--store-muted)]">
                        {items.length === 1 ? "service" : "services"}
                      </span>
                    </div>

                    {items.length > 0 && (
                      <div className="text-right">
                        <p className="text-[9px] uppercase tracking-[0.14em] text-[var(--store-muted)]">
                          From
                        </p>
                        <p
                          className="text-sm font-bold tabular-nums"
                          style={{ color: style.color }}
                        >
                          {formatMoney(from)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom CTA hint */}
              <div className="relative mt-4 flex items-center justify-between border-t border-dashed border-[var(--store-border)] pt-3">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--store-muted)] transition-colors group-hover:text-[var(--dept-color)]">
                  {isActive ? "Viewing" : "Explore"}
                </span>
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-1"
                  style={{ background: style.bg, color: style.color }}
                >
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Trust strip ── */}
      <div className="relative mt-10 grid grid-cols-2 gap-4 rounded-[var(--store-radius)] border border-[var(--store-border)] bg-[var(--store-surface)] p-5 sm:grid-cols-4">
        {[
          { Icon: Award, label: "Certified", value: "50+ Experts" },
          { Icon: Clock, label: "Response", value: "< 2 min" },
          { Icon: CreditCard, label: "Insurance", value: "Accepted" },
          { Icon: Star, label: "Rating", value: "4.9 / 5" },
        ].map(({ Icon, label, value }, i) => (
          <div key={i} className="group flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--store-accent)]/10 text-[var(--store-accent)] transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-4 w-4" strokeWidth={2} />
            </span>
            <div>
              <p className="text-[9px] uppercase tracking-[0.16em] text-[var(--store-muted)]">
                {label}
              </p>
              <p className="text-xs font-semibold tabular-nums">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


