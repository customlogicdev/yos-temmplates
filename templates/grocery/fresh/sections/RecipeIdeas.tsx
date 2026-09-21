// src/templates/grocery/fresh/sections/RecipeIdeas.tsx

"use client";

import Link from "next/link";
import { ChefHat, Clock, ArrowRight, Salad, UtensilsCrossed, IceCream } from "lucide-react";

const RECIPES = [
  { title: "Fresh Garden Salad", time: "15 min", Icon: Salad, color: "#10b981", items: 8 },
  { title: "Creamy Mushroom Pasta", time: "25 min", Icon: UtensilsCrossed, color: "#f59e0b", items: 10 },
  { title: "Berry Smoothie Bowl", time: "10 min", Icon: IceCream, color: "#ec4899", items: 6 },
];

export function RecipeIdeas({ props }: { props: any }) {
  const slug = props?.slug || props?.data?.slug || "";

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-12">
      <div className="rounded-[2rem] bg-gradient-to-br from-green-100 to-emerald-100 p-8 lg:p-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 shadow-sm">
            <ChefHat className="h-3.5 w-3.5 text-green-600" strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-700">
              Recipe Ideas
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-green-900 lg:text-4xl">
            Cook something fresh
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-green-800/70">
            Get ingredients delivered in one click for these popular recipes
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {RECIPES.map(({ title, time, Icon, color, items }) => (
            <Link
              key={title}
              href={`/store/${slug}?page=products`}
              className="group overflow-hidden rounded-3xl bg-white p-6 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              <div
                className="flex h-24 w-24 items-center justify-center rounded-3xl transition-transform duration-500 group-hover:scale-110"
                style={{ background: `${color}15` }}
              >
                <Icon className="h-12 w-12" style={{ color }} strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 text-lg font-black text-slate-900">{title}</h3>
              <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" strokeWidth={2.5} />
                  {time}
                </span>
                <span>·</span>
                <span>{items} items</span>
              </div>
              <div
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all group-hover:gap-3"
                style={{ color }}
              >
                Shop Ingredients
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}