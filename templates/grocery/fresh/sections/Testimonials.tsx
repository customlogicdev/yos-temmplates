// src/templates/grocery/fresh/sections/Testimonials.tsx

"use client";

import { Star, MapPin, Quote } from "lucide-react";

const REVIEWS = [
  { name: "Priya Sharma", city: "Mumbai", text: "Absolutely love the freshness! Vegetables are always crisp and clean. Delivery is super fast.", rating: 5 },
  { name: "Rahul Verma", city: "Delhi", text: "Best prices I've found for weekly groceries. The app makes reordering so easy.", rating: 5 },
  { name: "Anjali Nair", city: "Kochi", text: "Their fresh dairy products are unbeatable. My kids love the milk quality.", rating: 5 },
];

export function GroceryTestimonials({ props }: { props: any }) {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16">
      <div className="text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-600">
          Happy Customers
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-green-900 lg:text-4xl">
          50,000+ families trust us
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {REVIEWS.map((review) => (
          <div
            key={review.name}
            className="group relative overflow-hidden rounded-3xl border border-green-100 bg-white p-6 transition-all hover:-translate-y-2 hover:shadow-xl"
          >
            <Quote className="absolute right-4 top-4 h-8 w-8 text-green-100" strokeWidth={1.5} />
            <div className="flex items-center gap-1 text-orange-500">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4" fill="currentColor" />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">
              "{review.text}"
            </p>
            <div className="mt-5 flex items-center gap-3 border-t border-green-100 pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                {review.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{review.name}</p>
                <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-slate-500">
                  <MapPin className="h-3 w-3" strokeWidth={2} />
                  {review.city}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}