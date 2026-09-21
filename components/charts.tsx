"use client";

import { useMemo, useState } from "react";
import { compact } from "@/lib/format";

export interface Point {
  label: string;
  value: number;
}

export function LineChart({ data, height = 260, color = "#0E6B54", format = compact }: { data: Point[]; height?: number; color?: string; format?: (n: number) => string }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 800;
  const H = height;
  const PAD = { top: 20, right: 16, bottom: 28, left: 48 };

  const { path, area, points, max } = useMemo(() => {
    const vals = data.map((d) => d.value);
    const max = Math.max(...vals, 1);
    const iw = W - PAD.left - PAD.right;
    const ih = H - PAD.top - PAD.bottom;
    const pts = data.map((d, i) => {
      const x = PAD.left + (data.length === 1 ? iw / 2 : (i / (data.length - 1)) * iw);
      const y = PAD.top + ih - (d.value / max) * ih;
      return { x, y };
    });
    const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    const area = `${path} L${pts[pts.length - 1]?.x ?? 0},${H - PAD.bottom} L${pts[0]?.x ?? 0},${H - PAD.bottom} Z`;
    return { path, area, points: pts, max };
  }, [data, H]);

  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * W;
          let best = 0;
          let bestDist = Infinity;
          points.forEach((p, i) => {
            const d = Math.abs(p.x - x);
            if (d < bestDist) { bestDist = d; best = i; }
          });
          setHover(best);
        }}
      >
        <defs>
          <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {gridLines.map((g) => {
          const y = PAD.top + (H - PAD.top - PAD.bottom) * g;
          return (
            <g key={g}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke="#E6E4DC" strokeDasharray={g === 1 ? "" : "3 4"} />
              <text x={PAD.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#9a9d94">
                {format(Math.round(max * (1 - g)))}
              </text>
            </g>
          );
        })}
        <path d={area} fill={`url(#grad-${color.replace("#", "")})`} />
        <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) =>
          i % Math.ceil(data.length / 8) === 0 || i === data.length - 1 ? (
            <text key={i} x={points[i]!.x} y={H - 8} textAnchor="middle" fontSize="10" fill="#9a9d94">
              {d.label}
            </text>
          ) : null
        )}
        {hover != null && points[hover] && (
          <g>
            <line x1={points[hover]!.x} x2={points[hover]!.x} y1={PAD.top} y2={H - PAD.bottom} stroke={color} strokeOpacity="0.3" />
            <circle cx={points[hover]!.x} cy={points[hover]!.y} r="5" fill={color} stroke="#fff" strokeWidth="2.5" />
          </g>
        )}
      </svg>
      {hover != null && data[hover] && points[hover] && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 rounded-lg border border-line bg-night px-3 py-1.5 text-xs text-white shadow-pop"
          style={{ left: `${(points[hover]!.x / W) * 100}%`, top: `${(points[hover]!.y / H) * 100 - 14}%` }}
        >
          <div className="font-bold">{format(data[hover]!.value)}</div>
          <div className="text-white/60">{data[hover]!.label}</div>
        </div>
      )}
    </div>
  );
}

export function BarChart({ data, height = 220, color = "#0E6B54", format = compact }: { data: Point[]; height?: number; color?: string; format?: (n: number) => string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex w-full items-end gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
          <div className="relative flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-md transition-all duration-300 group-hover:opacity-80"
              style={{ height: `${Math.max((d.value / max) * 100, 2)}%`, background: color }}
            />
            <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-night px-2 py-0.5 text-[11px] font-semibold text-white opacity-0 shadow-pop transition group-hover:opacity-100">
              {format(d.value)}
            </div>
          </div>
          <span className="text-[10px] font-medium text-muted">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Donut({ segments, size = 150 }: { segments: { label: string; value: number; color: string }[]; size?: number }) {
  const total = Math.max(segments.reduce((s, x) => s + x.value, 0), 1);
  const R = 42;
  const C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }} className="-rotate-90">
      <circle cx="50" cy="50" r={R} fill="none" stroke="#EFEEE8" strokeWidth="12" />
      {segments.map((s, i) => {
        const frac = s.value / total;
        const el = (
          <circle
            key={i}
            cx="50" cy="50" r={R} fill="none"
            stroke={s.color} strokeWidth="12"
            strokeDasharray={`${frac * C} ${C}`}
            strokeDashoffset={-acc * C}
            strokeLinecap="butt"
          />
        );
        acc += frac;
        return el;
      })}
    </svg>
  );
}

export function Sparkline({ data, color = "#0E6B54", width = 96, height = 32 }: { data: number[]; color?: string; width?: number; height?: number }) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - 3 - ((v - min) / (max - min || 1)) * (height - 6);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
