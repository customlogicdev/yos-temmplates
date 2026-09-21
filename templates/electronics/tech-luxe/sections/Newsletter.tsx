// src/templates/electronics/tech-luxe/sections/Newsletter.tsx

"use client";

export function TechNewsletter() {
  return (
    <section className="bg-[var(--theme-accent)] py-16 text-white">
      <div className="mx-auto max-w-[var(--theme-max-width)] px-5 text-center">
        <h2 className="font-[family-name:var(--theme-display)] text-3xl font-bold">
          Stay Updated
        </h2>
        <p className="mt-2 text-white/70">
          Subscribe to get the latest tech news and exclusive offers
        </p>
        <div className="mx-auto mt-6 flex max-w-md gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-lg bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-white"
          />
          <button className="rounded-lg bg-[var(--theme-primary)] px-6 py-3 font-semibold text-white hover:opacity-90">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}