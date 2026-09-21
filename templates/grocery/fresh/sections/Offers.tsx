// src/templates/grocery/fresh/sections/Offers.tsx

"use client";

export function DailyOffers({ props }: { props: any }) {
  const offers = [
    { icon: "🛒", title: "20% off on Groceries", desc: "Use code GROCERY20" },
    { icon: "🍎", title: "Buy 1 Get 1 Free", desc: "On selected fruits" },
    { icon: "🥛", title: "Free Delivery", desc: "On orders above ₹999" },
    { icon: "🎁", title: "Combo Offers", desc: "Save up to 30% on combos" },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((offer) => (
          <div key={offer.title} className="rounded-[var(--store-radius)] border border-[var(--store-border)] bg-[var(--store-surface)] p-6 text-center">
            <span className="text-4xl">{offer.icon}</span>
            <h3 className="mt-3 font-semibold">{offer.title}</h3>
            <p className="text-sm text-[var(--store-muted)]">{offer.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}