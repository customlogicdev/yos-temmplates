// src/templates/healthcare/clinic/sections/QuickActions.tsx

"use client";

import Link from "next/link";
import {
  CalendarClock,
  FileText,
  Pill,
  Video,
  ArrowRight,
} from "lucide-react";

export function QuickActions({ props }: { props: any }) {
  const basePath = props?.basePath || "";

  const actions = [
    {
      Icon: CalendarClock,
      title: "Same-day Slots",
      desc: "Consults booked before 4 PM",
      color: "#10B981",
      bg: "rgba(16,185,129,0.10)",
      href: `${basePath}/appointment`,
    },
    {
      Icon: Video,
      title: "Video Consult",
      desc: "Talk to a doctor in 15 min",
      color: "#3B82F6",
      bg: "rgba(59,130,246,0.10)",
      href: `${basePath}/video-consult`,
    },
    {
      Icon: FileText,
      title: "Reports in 12 hrs",
      desc: "Fast diagnostic results",
      color: "#8B5CF6",
      bg: "rgba(139,92,246,0.10)",
      href: `${basePath}/reports`,
    },
    {
      Icon: Pill,
      title: "Pharmacy at Home",
      desc: "Free delivery on ₹499+",
      color: "#F59E0B",
      bg: "rgba(245,158,11,0.10)",
      href: `${basePath}/products`,
    },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map(({ Icon, title, desc, color, bg, href }) => (
          <Link
            key={title}
            href={href}
            className="group relative overflow-hidden rounded-[var(--store-radius)] border border-[var(--store-border)] bg-[var(--store-surface)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.2)]"
            style={
              {
                ["--qa-color" as any]: color,
                ["--qa-bg" as any]: bg,
              } as React.CSSProperties
            }
          >
            {/* Top accent */}
            <span
              className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              style={{ background: color }}
            />

            <div
              className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{ background: bg }}
            >
              <Icon className="h-5 w-5" style={{ color }} strokeWidth={2} />
            </div>

            <h3 className="text-sm font-semibold transition-colors group-hover:text-[var(--qa-color)]">
              {title}
            </h3>
            <p className="mt-1 text-xs text-[var(--store-muted)]">{desc}</p>

            <div className="mt-4 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--store-muted)] transition-colors group-hover:text-[var(--qa-color)]">
              Explore
              <ArrowRight
                className="h-3 w-3 transition-transform group-hover:translate-x-1"
                strokeWidth={2.4}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}