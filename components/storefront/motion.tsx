"use client";

import type { ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}

export function Ticker({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`overflow-hidden border-y border-[var(--store-border)] py-3 ${className}`}>
      <div className="flex gap-8 whitespace-nowrap">
        {items.map((item, index) => (
          <span key={index} className="text-sm">{item}<span className="ml-8 opacity-30">•</span></span>
        ))}
      </div>
    </div>
  );
}

export function StatStrip({ stats, className = "" }: { stats: { label: string; value: string }[]; className?: string }) {
  return (
    <div className={`grid gap-4 sm:grid-cols-3 ${className}`}>
      {stats.map((stat, index) => (
        <div key={index} className="rounded-lg border border-[var(--store-border)] bg-[var(--store-surface)] p-4 text-center">
          <div className="text-2xl font-bold">{stat.value}</div>
          <div className="mt-1 text-xs uppercase opacity-60">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}