// src/templates/healthcare/clinic/sections/Appointment.tsx

"use client";

import Link from "next/link";

export function AppointmentBanner({ props }: { props: any }) {
  const basePath = props.basePath || "";

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-16">
      {/* Main Banner Card */}
      <div className="relative overflow-hidden rounded-[var(--store-radius)] bg-gradient-to-br from-[var(--store-accent)] via-[var(--store-accent)] to-[var(--store-accent)]/90 p-10 text-[var(--store-accent-fg)] shadow-2xl">
        
        {/* Decorative Background Elements */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          {/* Medical Cross Pattern */}
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          
          {/* Pulse Line SVG */}
          <svg
            className="absolute bottom-0 left-0 h-24 w-full text-white/20"
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0,50 L200,50 L220,20 L240,80 L260,50 L400,50 L420,30 L440,70 L460,50 L700,50 L720,10 L740,90 L760,50 L1200,50"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Floating Medical Icons */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="absolute right-12 top-8 animate-pulse text-4xl opacity-20">
            🩺
          </div>
          <div className="absolute right-32 bottom-12 animate-pulse text-3xl opacity-15 delay-300">
            💊
          </div>
          <div className="absolute left-1/3 top-6 animate-pulse text-2xl opacity-10 delay-700">
            ❤️
          </div>
        </div>

        <div className="relative grid gap-10 md:grid-cols-2 items-center">
          {/* Left Content */}
          <div className="space-y-4">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em]">
                Available Today
              </p>
            </div>

            {/* Heading with Icon */}
            <div className="flex items-start gap-3">
              <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-70">
                  Book Now
                </p>
                <h2 className="font-[family-name:var(--store-display)] text-3xl font-bold leading-tight md:text-4xl">
                  Same-day appointments available
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="max-w-md text-sm opacity-85 leading-relaxed">
              Book a consultation with our expert doctors today. Get personalized
              care from board-certified specialists — walk-ins welcome.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-5 pt-2 text-[11px] opacity-80">
              <div className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Board Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Insurance Accepted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right - CTA Buttons */}
          <div className="flex flex-col items-stretch gap-4 md:items-end">
            {/* Primary CTA */}
            <Link
              href={`${basePath}/appointment`}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--store-accent-fg)] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--store-accent)] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:rotate-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Book Appointment
            </Link>

            {/* Secondary CTA */}
            <Link
              href={`${basePath}/contact`}
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-[var(--store-accent-fg)]/40 bg-white/5 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm transition-all duration-300 hover:border-[var(--store-accent-fg)]/70 hover:bg-white/10"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Contact Us
            </Link>

            {/* Phone Quick Action */}
            <a
              href="tel:+1234567890"
              className="mt-2 inline-flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] opacity-70 transition-opacity hover:opacity-100"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
              </span>
              Emergency: (123) 456-7890
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
