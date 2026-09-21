// src/templates/healthcare/clinic/sections/Doctors.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Star,
  BriefcaseMedical,
  Calendar,
  Clock,
  Stethoscope,
  Heart,
  Brain,
  Baby,
  Award,
  CheckCircle2,
  ArrowRight,
  UserRound,
  GraduationCap,
  Users,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// 🎨 Specialty → icon + color map (auto-detected)
// ─────────────────────────────────────────────────────────────
type SpecialtyStyle = {
  Icon: LucideIcon;
  color: string;
  bg: string;
};

const SPECIALTY_STYLES: Record<string, SpecialtyStyle> = {
  cardiologist:  { Icon: Heart,           color: "#EF4444", bg: "rgba(239,68,68,0.12)"  },
  neurologist:   { Icon: Brain,           color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
  pediatrician:  { Icon: Baby,            color: "#EC4899", bg: "rgba(236,72,153,0.12)" },
  dermatologist: { Icon: UserRound,       color: "#14B8A6", bg: "rgba(20,184,166,0.12)" },
  dentist:       { Icon: Stethoscope,     color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
  orthopedist:   { Icon: BriefcaseMedical,color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  physician:     { Icon: Stethoscope,     color: "#10B981", bg: "rgba(16,185,129,0.12)" },
};

function getSpecialtyStyle(name: string): SpecialtyStyle {
  const key = (name || "").toLowerCase().replace(/[^a-z]/g, "");
  for (const k of Object.keys(SPECIALTY_STYLES)) {
    if (key.includes(k)) return SPECIALTY_STYLES[k];
  }
  return {
    Icon: Stethoscope,
    color: "var(--store-accent)",
    bg: "var(--store-accent)",
  };
}

// ─────────────────────────────────────────────────────────────
// 🏥 Main Component
// ─────────────────────────────────────────────────────────────
export function DoctorProfiles({ props }: { props: any }) {
  const basePath = props?.basePath || "";

  const doctors = props?.data?.doctors?.length
    ? props.data.doctors
    : [
        {
          id: "d1",
          name: "Dr. Ananya Sharma",
          specialty: "Cardiologist",
          image:
            "https://images.pexels.com/photos/4266934/pexels-photo-4266934.jpeg?auto=compress&cs=tinysrgb&w=400",
          experience: "12 years",
          rating: 4.9,
          patients: "2.4k+",
          education: "MD, DM (Cardiology)",
          available: true,
        },
        {
          id: "d2",
          name: "Dr. Rajesh Kumar",
          specialty: "Neurologist",
          image:
            "https://images.pexels.com/photos/4266942/pexels-photo-4266942.jpeg?auto=compress&cs=tinysrgb&w=400",
          experience: "15 years",
          rating: 4.8,
          patients: "3.1k+",
          education: "MD, DM (Neurology)",
          available: true,
        },
        {
          id: "d3",
          name: "Dr. Priya Menon",
          specialty: "Pediatrician",
          image:
            "https://images.pexels.com/photos/4266935/pexels-photo-4266935.jpeg?auto=compress&cs=tinysrgb&w=400",
          experience: "8 years",
          rating: 5.0,
          patients: "1.8k+",
          education: "MD (Pediatrics)",
          available: false,
        },
      ];

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative mx-auto max-w-[1400px] px-5 py-16">
      {/* 🌫️ Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-[var(--store-accent)]/5 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-80 w-80 rounded-full bg-[var(--store-accent)]/5 blur-3xl" />
      </div>

      <div className="relative rounded-[var(--store-radius)] bg-[var(--store-surface)] p-8 md:p-12">
        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--store-accent)]/10 px-3 py-1">
            <ShieldCheck
              className="h-3.5 w-3.5 text-[var(--store-accent)]"
              strokeWidth={2.2}
            />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--store-accent)]">
              Our Experts
            </p>
          </div>

          <h2 className="mt-4 font-[family-name:var(--store-display)] text-[clamp(1.9rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.02em]">
            Meet Our Doctors
          </h2>
          <p className="mt-3 text-sm text-[var(--store-muted)]">
            Board-certified specialists dedicated to your health — with
            transparent availability and pricing.
          </p>
        </div>

        {/* ── Doctor Cards ── */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor: any) => {
            const style = getSpecialtyStyle(doctor.specialty);
            const { Icon } = style;
            const isHovered = hoveredId === doctor.id;

            return (
              <div
                key={doctor.id}
                onMouseEnter={() => setHoveredId(doctor.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative overflow-hidden rounded-[var(--store-radius)] border border-[var(--store-border)] bg-[var(--store-bg)] transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.3)]"
                style={
                  {
                    ["--doc-color" as any]: style.color,
                    ["--doc-bg" as any]: style.bg,
                  } as React.CSSProperties
                }
              >
                {/* Colored top accent */}
                <span
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: style.color }}
                />

                {/* Ambient glow */}
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: style.bg }}
                />

                {/* ── Image + Status ── */}
                <div className="relative px-6 pt-8">
                  <div className="relative mx-auto h-28 w-28">
                    {/* Animated ring */}
                    <span
                      className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:animate-ping group-hover:opacity-30"
                      style={{ background: style.bg }}
                    />
                    <div
                      className="relative h-full w-full overflow-hidden rounded-full border-4 transition-all duration-500"
                      style={{ borderColor: style.color }}
                    >
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Availability dot */}
                    <span
                      className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[var(--store-bg)]"
                      style={{
                        background: doctor.available ? "#10B981" : "#9CA3AF",
                      }}
                      title={
                        doctor.available ? "Available today" : "On leave"
                      }
                    >
                      <span
                        className={`h-2 w-2 rounded-full bg-white ${
                          doctor.available ? "animate-pulse" : ""
                        }`}
                      />
                    </span>
                  </div>

                  {/* Specialty badge */}
                  <div className="mt-4 flex justify-center">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
                      style={{ background: style.bg, color: style.color }}
                    >
                      <Icon className="h-3 w-3" strokeWidth={2.4} />
                      {doctor.specialty}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="mt-3 text-center text-lg font-semibold leading-tight">
                    {doctor.name}
                  </h3>

                  {/* Education */}
                  {doctor.education && (
                    <p className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-[var(--store-muted)]">
                      <GraduationCap className="h-3 w-3" strokeWidth={2} />
                      {doctor.education}
                    </p>
                  )}

                  {/* Rating */}
                  <div className="mt-3 flex items-center justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5"
                        strokeWidth={1.5}
                        fill={
                          i < Math.round(doctor.rating || 5)
                            ? style.color
                            : "transparent"
                        }
                        style={{
                          color:
                            i < Math.round(doctor.rating || 5)
                              ? style.color
                              : "var(--store-border)",
                        }}
                      />
                    ))}
                    <span className="ml-1 text-[11px] font-semibold tabular-nums">
                      {doctor.rating ?? "4.9"}
                    </span>
                  </div>
                </div>

                {/* ── Stats Row ── */}
                <div className="relative mx-6 mt-5 grid grid-cols-3 divide-x divide-[var(--store-border)] rounded-xl border border-[var(--store-border)] bg-[var(--store-surface)] py-3">
                  <div className="flex flex-col items-center px-2">
                    <Award
                      className="h-3.5 w-3.5 text-[var(--store-muted)]"
                      strokeWidth={2}
                    />
                    <p className="mt-1 text-[11px] font-semibold tabular-nums">
                      {doctor.experience}
                    </p>
                    <p className="text-[8px] uppercase tracking-[0.14em] text-[var(--store-muted)]">
                      Exp.
                    </p>
                  </div>
                  <div className="flex flex-col items-center px-2">
                    <Users
                      className="h-3.5 w-3.5 text-[var(--store-muted)]"
                      strokeWidth={2}
                    />
                    <p className="mt-1 text-[11px] font-semibold tabular-nums">
                      {doctor.patients ?? "1k+"}
                    </p>
                    <p className="text-[8px] uppercase tracking-[0.14em] text-[var(--store-muted)]">
                      Patients
                    </p>
                  </div>
                  <div className="flex flex-col items-center px-2">
                    <CheckCircle2
                      className="h-3.5 w-3.5"
                      strokeWidth={2}
                      style={{
                        color: doctor.available ? "#10B981" : "#9CA3AF",
                      }}
                    />
                    <p className="mt-1 text-[11px] font-semibold">
                      {doctor.available ? "Today" : "Away"}
                    </p>
                    <p className="text-[8px] uppercase tracking-[0.14em] text-[var(--store-muted)]">
                      Status
                    </p>
                  </div>
                </div>

                {/* ── CTA ── */}
                <div className="relative p-6 pt-4">
                  <Link
                    href={`${basePath}/appointment?doctor=${doctor.id}`}
                    className="group/btn flex w-full items-center justify-center gap-2 rounded-full py-3 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300"
                    style={{
                      background: isHovered ? style.color : "var(--store-accent)",
                      color: "var(--store-accent-fg)",
                    }}
                  >
                    <Calendar className="h-3.5 w-3.5" strokeWidth={2.4} />
                    Book Appointment
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1"
                      strokeWidth={2.4}
                    />
                  </Link>

                  {/* Quick info row */}
                  <div className="mt-3 flex items-center justify-between text-[10px] text-[var(--store-muted)]">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" strokeWidth={2} />
                      Avg. 15 min wait
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2
                        className="h-3 w-3 text-green-500"
                        strokeWidth={2}
                      />
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="relative mt-12 flex flex-col items-center justify-between gap-4 rounded-[var(--store-radius)] border border-dashed border-[var(--store-border)] p-6 sm:flex-row">
          <div>
            <p className="font-semibold">Looking for a different specialist?</p>
            <p className="text-sm text-[var(--store-muted)]">
              Browse all 50+ doctors across 12 departments.
            </p>
          </div>
          <Link
            href={`${basePath}/doctors`}
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--store-border)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition hover:border-[var(--store-accent)] hover:text-[var(--store-accent)]"
          >
            View All Doctors
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
              strokeWidth={2.4}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

// // src/templates/healthcare/clinic/sections/Doctors.tsx

// "use client";

// export function DoctorProfiles({ props }: { props: any }) {
//   const doctors = [
//     { id: "d1", name: "Dr. Ananya Sharma", specialty: "Cardiologist", image: "https://images.pexels.com/photos/4266934/pexels-photo-4266934.jpeg?auto=compress&cs=tinysrgb&w=200", experience: "12 years" },
//     { id: "d2", name: "Dr. Rajesh Kumar", specialty: "Neurologist", image: "https://images.pexels.com/photos/4266942/pexels-photo-4266942.jpeg?auto=compress&cs=tinysrgb&w=200", experience: "15 years" },
//     { id: "d3", name: "Dr. Priya Menon", specialty: "Pediatrician", image: "https://images.pexels.com/photos/4266935/pexels-photo-4266935.jpeg?auto=compress&cs=tinysrgb&w=200", experience: "8 years" },
//   ];

//   return (
//     <section className="mx-auto max-w-[1400px] px-5 py-12 bg-[var(--store-surface)] rounded-[var(--store-radius)]">
//       <div className="text-center">
//         <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--store-accent)]">Our Experts</p>
//         <h2 className="mt-3 font-[family-name:var(--store-display)] text-3xl font-bold">
//           Meet Our Doctors
//         </h2>
//         <p className="mt-2 text-[var(--store-muted)]">Experienced professionals dedicated to your health</p>
//       </div>

//       <div className="mt-8 grid gap-6 md:grid-cols-3">
//         {doctors.map((doctor) => (
//           <div key={doctor.id} className="rounded-[var(--store-radius)] border border-[var(--store-border)] bg-[var(--store-bg)] p-6 text-center transition hover:shadow-lg">
//             <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-[var(--store-accent)]">
//               <img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover" />
//             </div>
//             <h3 className="mt-4 font-semibold">{doctor.name}</h3>
//             <p className="text-sm text-[var(--store-accent)]">{doctor.specialty}</p>
//             <p className="mt-1 text-sm text-[var(--store-muted)]">{doctor.experience} experience</p>
//             <button className="mt-4 rounded-full bg-[var(--store-accent)] px-6 py-2 text-xs font-semibold text-[var(--store-accent-fg)] hover:opacity-90">
//               Book Appointment
//             </button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
// // // src/templates/healthcare/clinic/sections/Doctors.tsx

// // "use client";

// // import Link from "next/link";

// // export function DoctorProfiles({ props }: { props: any }) {
// //   const doctors = [
// //     { id: "d1", name: "Dr. Ananya Sharma", specialty: "Cardiologist", image: "https://images.pexels.com/photos/4266934/pexels-photo-4266934.jpeg?auto=compress&cs=tinysrgb&w=200", experience: "12 years" },
// //     { id: "d2", name: "Dr. Rajesh Kumar", specialty: "Neurologist", image: "https://images.pexels.com/photos/4266942/pexels-photo-4266942.jpeg?auto=compress&cs=tinysrgb&w=200", experience: "15 years" },
// //     { id: "d3", name: "Dr. Priya Menon", specialty: "Pediatrician", image: "https://images.pexels.com/photos/4266935/pexels-photo-4266935.jpeg?auto=compress&cs=tinysrgb&w=200", experience: "8 years" },
// //   ];

// //   return (
// //     <section className="mx-auto max-w-[1400px] px-5 py-12 bg-[var(--store-surface)] rounded-[var(--store-radius)]">
// //       <div className="text-center">
// //         <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--store-accent)]">Our Experts</p>
// //         <h2 className="mt-3 font-[family-name:var(--store-display)] text-3xl font-bold">
// //           Meet Our Doctors
// //         </h2>
// //         <p className="mt-2 text-[var(--store-muted)]">Experienced professionals dedicated to your health</p>
// //       </div>

// //       <div className="mt-8 grid gap-6 md:grid-cols-3">
// //         {doctors.map((doctor) => (
// //           <div key={doctor.id} className="rounded-[var(--store-radius)] border border-[var(--store-border)] bg-[var(--store-bg)] p-6 text-center transition hover:shadow-lg">
// //             <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-[var(--store-accent)]">
// //               <img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover" />
// //             </div>
// //             <h3 className="mt-4 font-semibold">{doctor.name}</h3>
// //             <p className="text-sm text-[var(--store-accent)]">{doctor.specialty}</p>
// //             <p className="mt-1 text-sm text-[var(--store-muted)]">{doctor.experience} experience</p>
// //             <button className="mt-4 rounded-full bg-[var(--store-accent)] px-6 py-2 text-xs font-semibold text-[var(--store-accent-fg)] hover:opacity-90">
// //               Book Appointment
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }