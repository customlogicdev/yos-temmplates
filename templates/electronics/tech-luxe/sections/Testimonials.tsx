// src/templates/electronics/tech-luxe/sections/Testimonials.tsx

"use client";

export function TechTestimonials({ props }: { props: any }) {
  const testimonials = props.storefront?.testimonials || [
    { id: "t1", author: "Riya S.", content: "Absolutely love this product! Best purchase I've made this year.", rating: 5 },
    { id: "t2", author: "Priya M.", content: "The quality is exceptional. Will definitely buy again.", rating: 4 },
    { id: "t3", author: "Ananya K.", content: "Fast delivery and great customer support. Highly recommend!", rating: 5 },
  ];

  return (
    <section className="mx-auto max-w-[var(--theme-max-width)] px-5 py-16">
      <div className="text-center">
        <h2 className="font-[family-name:var(--theme-display)] text-3xl font-bold">
          What Our Customers Say
        </h2>
        <p className="mt-2 text-[var(--theme-muted)]">
          Real reviews from real customers
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t: any) => (
          <div
            key={t.id}
            className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6"
          >
            <div className="flex text-[var(--theme-primary)]">
              {"★".repeat(Math.round(t.rating || 5))}
              {"☆".repeat(5 - Math.round(t.rating || 5))}
            </div>
            <p className="mt-3 text-sm leading-relaxed">"{t.content}"</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[var(--theme-primary)]/10 flex items-center justify-center font-bold">
                {t.author.charAt(0)}
              </div>
              <div>
                <div className="font-semibold">{t.author}</div>
                <div className="text-xs text-[var(--theme-muted)]">Verified Buyer</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}