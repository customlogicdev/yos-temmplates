// src/templates/grocery/fresh/sections/DailyOffers.tsx

"use client";

import { ShoppingCart, Apple, Truck, Gift } from "lucide-react";

export function DailyOffers({ props }: { props: any }) {
  const offers = [
    { Icon: ShoppingCart, title: "20% Off Groceries", desc: "Use code GROCERY20", color: "#10b981", code: "GROCERY20" },
    { Icon: Apple, title: "Buy 1 Get 1 Free", desc: "On selected fruits", color: "#f59e0b", code: "BOGO" },
    { Icon: Truck, title: "Free Delivery", desc: "On orders above ₹999", color: "#3b82f6", code: "FREESHIP" },
    { Icon: Gift, title: "Combo Offers", desc: "Save up to 30% on combos", color: "#ec4899", code: "COMBO30" },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-12">
      <div className="mb-8 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-600">
          Today's Savings
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-green-900 lg:text-4xl">
          Offers you can't miss
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map(({ Icon, title, desc, color, code }) => (
          <div
            key={title}
            className="group relative overflow-hidden rounded-3xl border border-green-100 bg-white p-6 transition-all hover:-translate-y-2 hover:shadow-xl"
          >
            <div
              className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              style={{ background: color }}
            />
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              style={{ background: `${color}15` }}
            >
              <Icon className="h-6 w-6" style={{ color }} strokeWidth={2.2} />
            </div>
            <h3 className="mt-4 text-lg font-black text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-600">{desc}</p>
            <div className="mt-4">
              <span
                className="rounded-lg border-2 border-dashed px-3 py-1 text-[10px] font-black uppercase tracking-wider"
                style={{ borderColor: color, color }}
              >
                {code}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}