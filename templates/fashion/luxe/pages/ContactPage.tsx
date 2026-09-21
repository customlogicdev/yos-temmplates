// src/templates/fashion/luxe/pages/ContactPage.tsx

"use client";

import { useState } from "react";
import { TemplateFrame } from "@/templates/frame";
import { FashionLuxeShell } from "../layout/FashionLuxeShell";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

export function FashionContactPage({
  slug,
  store,
}: {
  slug: string;
  store: any;
}) {
  const [submitted, setSubmitted] = useState(false);

  const props: any = {
    slug,
    basePath: `/store/${slug}`,
    data: { products: [], store },
    storefront: store,
  };

  return (
    <TemplateFrame props={props}>
      <FashionLuxeShell props={props} slug={slug}>
        <section className="mx-auto max-w-[1600px] px-5 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#8F6E3D]">
                Atelier Enquiries
              </p>
              <h1 className="mt-5 font-[family-name:var(--store-display)] text-[clamp(2.5rem,5vw,4rem)] leading-[0.98] tracking-[-0.03em] text-[#1A1815]">
                Let's <span className="italic">talk</span>
              </h1>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-[#6A6156]">
                Have a question about sizing, tailoring, or a bespoke order?
                Our client care team responds within 24 hours.
              </p>

              <div className="mt-10 space-y-5 text-sm text-[#6A6156]">
                {store?.address && (
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#8F6E3D]"
                      strokeWidth={1.8}
                    />
                    <span>{store.address}</span>
                  </div>
                )}
                {store?.phone && (
                  <div className="flex items-center gap-3">
                    <Phone
                      className="h-4 w-4 text-[#8F6E3D]"
                      strokeWidth={1.8}
                    />
                    <a
                      href={`tel:${store.phone}`}
                      className="transition hover:text-[#1A1815]"
                    >
                      {store.phone}
                    </a>
                  </div>
                )}
                {store?.email && (
                  <div className="flex items-center gap-3">
                    <Mail
                      className="h-4 w-4 text-[#8F6E3D]"
                      strokeWidth={1.8}
                    />
                    <a
                      href={`mailto:${store.email}`}
                      className="transition hover:text-[#1A1815]"
                    >
                      {store.email}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                  setTimeout(() => setSubmitted(false), 4000);
                }}
                className="space-y-6 border border-[#E5DDD0] bg-white p-8 lg:p-10"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.28em] text-[#8A7F72]">
                      Your name
                    </label>
                    <input
                      type="text"
                      required
                      className="mt-2 w-full border-b border-[#E5DDD0] bg-transparent py-3 text-sm outline-none transition focus:border-[#1A1815]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.28em] text-[#8A7F72]">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="mt-2 w-full border-b border-[#E5DDD0] bg-transparent py-3 text-sm outline-none transition focus:border-[#1A1815]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.28em] text-[#8A7F72]">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="mt-2 w-full border-b border-[#E5DDD0] bg-transparent py-3 text-sm outline-none transition focus:border-[#1A1815]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.28em] text-[#8A7F72]">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    className="mt-2 w-full resize-none border-b border-[#E5DDD0] bg-transparent py-3 text-sm outline-none transition focus:border-[#1A1815]"
                  />
                </div>

                <button
                  type="submit"
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden bg-[#1A1815] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-white transition"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-[#B8935A] transition-transform duration-500 group-hover:translate-x-0"
                  />
                  <span className="relative z-10">
                    {submitted ? "Message sent" : "Send enquiry"}
                  </span>
                  <ArrowRight
                    className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    strokeWidth={2.4}
                  />
                </button>
              </form>
            </div>
          </div>
        </section>
      </FashionLuxeShell>
    </TemplateFrame>
  );
}