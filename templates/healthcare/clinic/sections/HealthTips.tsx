// src/templates/healthcare/clinic/sections/HealthTips.tsx

"use client";

import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  Clock,
  Apple,
  Dumbbell,
  Moon,
} from "lucide-react";

export function HealthTips({ props }: { props: any }) {
  const basePath = props?.basePath || "";

  const tips = [
    {
      Icon: Apple,
      category: "Nutrition",
      title: "5 Foods That Boost Heart Health",
      excerpt:
        "Simple dietary swaps that can lower your cholesterol and improve heart function.",
      readTime: "5 min read",
      color: "#10B981",
    },
    {
      Icon: Dumbbell,
      category: "Fitness",
      title: "Daily 20-Minute Workout for Busy People",
      excerpt:
        "No gym required — these simple exercises fit into any schedule.",
      readTime: "4 min read",
      color: "#F59E0B",
    },
    {
      Icon: Moon,
      category: "Wellness",
      title: "The Science of Better Sleep",
      excerpt:
        "How 7-8 hours of quality sleep transforms your immunity and mood.",
      readTime: "6 min read",
      color: "#8B5CF6",
    },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4 border-b border-[var(--store-border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--store-accent)]/10 px-3 py-1">
            <BookOpen
              className="h-3.5 w-3.5 text-[var(--store-accent)]"
              strokeWidth={2.2}
            />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--store-accent)]">
              Health Tips
            </p>
          </div>
          <h2 className="mt-3 font-[family-name:var(--store-display)] text-[clamp(1.8rem,3.5vw,2.5rem)] leading-[1.05] tracking-[-0.02em]">
            Read. Learn. Live Better.
          </h2>
        </div>

        <Link
          href={`${basePath}/blog`}
          className="group inline-flex items-center gap-2 self-start rounded-full border border-[var(--store-border)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition hover:border-[var(--store-accent)] hover:text-[var(--store-accent)] sm:self-auto"
        >
          All Articles
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
            strokeWidth={2.4}
          />
        </Link>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {tips.map(({ Icon, category, title, excerpt, readTime, color }) => (
          <Link
            key={title}
            href={`${basePath}/blog`}
            className="group relative overflow-hidden rounded-[var(--store-radius)] border border-[var(--store-border)] bg-[var(--store-surface)] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)]"
          >
            {/* Top accent */}
            <span
              className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              style={{ background: color }}
            />

            {/* Icon + Category */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                style={{ background: `${color}1A` }}
              >
                <Icon className="h-5 w-5" style={{ color }} strokeWidth={2} />
              </div>
              <span
                className="text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{ color }}
              >
                {category}
              </span>
            </div>

            {/* Title + Excerpt */}
            <h3 className="mt-4 font-semibold leading-snug transition-colors group-hover:text-[var(--store-accent)]">
              {title}
            </h3>
            <p className="mt-2 text-sm text-[var(--store-muted)] line-clamp-2">
              {excerpt}
            </p>

            {/* Footer */}
            <div className="mt-5 flex items-center justify-between border-t border-dashed border-[var(--store-border)] pt-4">
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-[var(--store-muted)]">
                <Clock className="h-3 w-3" strokeWidth={2} />
                {readTime}
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--store-accent)]/10 text-[var(--store-accent)] transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}