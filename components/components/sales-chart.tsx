"use client";

import { useState } from "react";
import { LineChart, type Point } from "./charts";
import { compact } from "@/lib/format";
import { cn } from "./ui";

const RANGES = [
  { id: "7d", label: "7 Days" },
  { id: "30d", label: "30 Days" },
  { id: "3m", label: "3 Months" },
  { id: "1y", label: "1 Year" },
];

export function SalesChart({ series }: { series: Record<string, Point[]> }) {
  const format = compact;
  const [range, setRange] = useState("30d");
  const data = series[range] ?? [];
  const total = data.reduce((s, p) => s + p.value, 0);
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-bold">Sales overview</h3>
          <p className="text-sm text-muted">{format(total)} gross revenue in this period</p>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-line bg-paper p-1">
          {RANGES.map((r) => (
            <button
              key={r.id}
              onClick={() => setRange(r.id)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-semibold transition",
                range === r.id ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <LineChart data={data} format={format} />
    </div>
  );
}
