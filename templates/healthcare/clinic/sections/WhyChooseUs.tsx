// src/templates/healthcare/clinic/sections/WhyChooseUs.tsx

"use client";

import {
  Award,
  Users,
  Clock,
  ShieldCheck,
  HeartPulse,
  Microscope,
} from "lucide-react";

export function WhyChooseUs({ props }: { props: any }) {
  const stats = [
    { Icon: Users, value: "50+", label: "Expert Doctors", color: "#3B82F6" },
    { Icon: Award, value: "25+", label: "Years of Care", color: "#8B5CF6" },
    { Icon: HeartPulse, value: "1M+", label: "Happy Patients", color: "#EF4444" },
    { Icon: Microscope, value: "200+", label: "Diagnostic Tests", color: "#10B981" },
  ];

  const features = [
    {
      Icon: ShieldCheck,
      title: "NABH Accredited",
      desc: "Highest quality & safety standards in healthcare.",
    },
    {
      Icon: Clock,
      title: "15-min Avg. Wait",
      desc: "On-time appointments, no long queues.",
    },
    {
      Icon: Users,
      title: "Family-Friendly",
      desc: "Care for every age — from newborns to seniors.",
    },
  ];

  return (
    <section className="relative mx-auto max-w-[1400px] px-5 py-16">
      <div className="relative overflow-hidden rounded-[var(--store-radius)] border border-[var(--store-border)] bg-[var(--store-surface)]">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[var(--store-accent)]/5 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-[var(--store-accent)]/5 blur-3xl" />
        </div>

        <div className="relative grid gap-10 p-8 md:grid-cols-2 md:p-12">
          {/* Left — Heading + Features */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--store-accent)]/10 px-3 py-1">
              <ShieldCheck
                className="h-3.5 w-3.5 text-[var(--store-accent)]"
                strokeWidth={2.2}
              />
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--store-accent)]">
                Why Choose Us
              </p>
            </div>

            <h2 className="mt-4 font-[family-name:var(--store-display)] text-[clamp(1.9rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.02em]">
              Trusted care, backed by numbers
            </h2>
            <p className="mt-3 text-sm text-[var(--store-muted)]">
              For over two decades, we've been the first choice for families
              who value quality, transparency, and compassion.
            </p>

            <div className="mt-8 space-y-4">
              {features.map(({ Icon, title, desc }) => (
                <div key={title} className="group flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--store-accent)]/10 text-[var(--store-accent)] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{title}</h3>
                    <p className="mt-0.5 text-xs text-[var(--store-muted)]">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Stats Grid */}
          <div className="grid grid-cols-2 gap-4 self-center">
            {stats.map(({ Icon, value, label, color }) => (
              <div
                key={label}
                className="group relative overflow-hidden rounded-[var(--store-radius)] border border-[var(--store-border)] bg-[var(--store-bg)] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: color }}
                />
                <div
                  className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${color}1A`, color }}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <p className="font-[family-name:var(--store-display)] text-3xl font-bold tabular-nums">
                  {value}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[var(--store-muted)]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}