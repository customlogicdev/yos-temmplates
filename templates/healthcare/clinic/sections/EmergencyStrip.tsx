// src/templates/healthcare/clinic/sections/EmergencyStrip.tsx

"use client";

import Link from "next/link";
import { Phone, Siren, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export function EmergencyStrip({ props }: { props: any }) {
  const basePath = props?.basePath || "";
  const phone = props?.data?.clinic?.emergencyPhone || "+91 98765 43210";

  return (
    <section className="border-b border-red-500/20 bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-5 py-3 sm:flex-row">
        {/* Left — Emergency */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-red-500/15">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/30" />
            <Siren className="relative h-4 w-4 text-red-500" strokeWidth={2.4} />
          </span>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold uppercase tracking-[0.18em] text-red-500">
              24/7 Emergency
            </span>
            <span className="hidden text-[var(--store-muted)] sm:inline">
              · Ambulance within 10 min
            </span>
          </div>
        </div>

        {/* Middle — Trust badges */}
        <div className="hidden items-center gap-5 text-[11px] text-[var(--store-muted)] md:flex">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-green-500" strokeWidth={2} />
            NABH Accredited
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-blue-500" strokeWidth={2} />
            15 min avg. wait
          </span>
        </div>

        {/* Right — Call CTA */}
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className="group inline-flex items-center gap-2 rounded-full bg-red-500 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-red-600"
        >
          <Phone className="h-3.5 w-3.5" strokeWidth={2.4} />
          Call Emergency
          <ArrowRight
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2.4}
          />
        </a>
      </div>
    </section>
  );
}