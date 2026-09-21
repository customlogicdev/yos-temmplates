// src/templates/electronics/tech-luxe/sections/Features.tsx

"use client";

export function TechFeatures() {
  const features = [
    { icon: "🚀", title: "Fast Delivery", desc: "Same-day dispatch on all orders" },
    { icon: "🛡️", title: "1 Year Warranty", desc: "Free replacement on manufacturing defects" },
    { icon: "💳", title: "Secure Payment", desc: "128-bit encrypted transactions" },
    { icon: "📦", title: "Free Returns", desc: "30-day no questions asked return policy" },
  ];

  return (
    <section className="border-y border-[var(--theme-border)] bg-[var(--theme-surface)] py-12">
      <div className="mx-auto max-w-[var(--theme-max-width)] px-5">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-4">
              <span className="text-3xl">{feature.icon}</span>
              <div>
                <h4 className="font-semibold">{feature.title}</h4>
                <p className="text-sm text-[var(--theme-muted)]">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}