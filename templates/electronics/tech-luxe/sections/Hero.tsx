// src/templates/electronics/tech-luxe/sections/Hero.tsx

"use client";

import { formatMoney } from "@/lib/format";

export function TechHero({ props }: { props: any }) {
  const products = props.data?.products || [];
  const featured = products[0] || null;
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[var(--theme-secondary)] to-[var(--theme-bg)] py-16 md:py-24">
      <div className="mx-auto max-w-[var(--theme-max-width)] px-5">
        <div className="grid gap-12 items-center lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="inline-block rounded-full bg-[var(--theme-primary)]/10 px-4 py-1.5 text-xs font-semibold text-[var(--theme-primary)]">
              New Drop 2026
            </span>
            <h1 className="mt-4 font-[family-name:var(--theme-display)] text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Premium <br />
              <span className="text-[var(--theme-primary)]">Technology</span>
            </h1>
            <p className="mt-4 text-lg text-[var(--theme-muted)]">
              Explore the latest in gadgets, wearables, and smart technology.
              Curated for the modern lifestyle.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-lg bg-[var(--theme-primary)] px-8 py-3.5 font-semibold text-white hover:opacity-90 transition">
                Shop Now
              </button>
              <button className="rounded-lg border border-[var(--theme-border)] px-8 py-3.5 font-semibold hover:bg-[var(--theme-surface)] transition">
                Compare Specs
              </button>
            </div>
            {featured && (
              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="font-bold">4.8</span>
                  <span className="text-[var(--theme-muted)]">(1,234 reviews)</span>
                </div>
                <div className="h-6 w-px bg-[var(--theme-border)]"></div>
                <div>
                  <span className="font-bold">From</span>
                  <span className="ml-2 font-bold text-[var(--theme-primary)]">
                    {formatMoney(Math.min(...products.map((p: any) => p.price || 0)))}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Content - Product Showcase */}
          <div className="relative">
            <div className="aspect-square w-full overflow-hidden rounded-[var(--theme-radius)] bg-[var(--theme-surface)]">
              <img 
                src={featured?.image || "https://images.pexels.com/photos/2659939/pexels-photo-2659939.jpeg?auto=compress&cs=tinysrgb&w=600"} 
                alt="Featured Product" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 rounded-lg bg-white p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛡️</span>
                <div>
                  <div className="font-bold">1 Year Warranty</div>
                  <div className="text-sm text-[var(--theme-muted)]">Free replacement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}