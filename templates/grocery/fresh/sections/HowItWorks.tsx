// src/templates/grocery/fresh/sections/HowItWorks.tsx

"use client";

import { ShoppingCart, Package, Truck, Home } from "lucide-react";

const STEPS = [
  { Icon: ShoppingCart, title: "Add to Cart", desc: "Browse and pick fresh items", color: "#10b981" },
  { Icon: Package, title: "We Pack", desc: "Handpicked within 2 hours", color: "#f59e0b" },
  { Icon: Truck, title: "On the Way", desc: "12-hour delivery promise", color: "#3b82f6" },
  { Icon: Home, title: "At Your Door", desc: "Fresh, or money back", color: "#ec4899" },
];

export function HowItWorks({ props }: { props: any }) {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16">
      <div className="text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-600">
          How It Works
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-green-900">
          From farm to your kitchen
        </h2>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ Icon, title, desc, color }, i) => (
          <div key={title} className="relative text-center">
            {i < STEPS.length - 1 && (
              <div className="absolute left-[60%] top-10 hidden h-0.5 w-[80%] border-t-2 border-dashed border-green-200 lg:block" />
            )}
            <div
              className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl shadow-lg"
              style={{ background: color }}
            >
              <Icon className="h-9 w-9 text-white" strokeWidth={2.2} />
              <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-black text-green-900 shadow-md">
                {i + 1}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-600">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}