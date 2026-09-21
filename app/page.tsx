// app/page.tsx

import Link from "next/link";

const TEMPLATES = [
  {
    id: "beauty.lumiere",
    name: "Lumière",
    category: "Beauty",
    description: "Glamorous beauty template with modern light UI",
    color: "#B76E79",
  },
  {
    id: "beauty.glow",
    name: "Glow",
    category: "Beauty",
    description: "Soft, feminine beauty template",
    color: "#EC4899",
  },
  {
    id: "fashion.atelier",
    name: "Atelier",
    category: "Fashion",
    description: "Modern fashion template with interactive light UI",
    color: "#6366F1",
  },
  {
    id: "fresh-market",
    name: "Fresh Market",
    category: "Grocery",
    description: "Fresh grocery store template",
    color: "#16A34A",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7F5]">
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600">
            Templates Showcase
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.5rem,6vw,5rem)] italic leading-[0.95] tracking-tight text-zinc-900">
            All <span className="text-indigo-600">Templates</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-zinc-600">
            {TEMPLATES.length} templates · live demos with sample data
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {TEMPLATES.map((t) => (
            <Link
              key={t.id}
              href={`/${t.id}`}
              className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div
                className="relative aspect-[4/3]"
                style={{
                  background: `linear-gradient(135deg, ${t.color}20, ${t.color}60)`,
                }}
              >
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-900">
                  {t.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-2xl italic text-zinc-900 group-hover:text-indigo-600">
                  {t.name}
                </h3>
                <p className="mt-2 text-sm text-zinc-600">{t.description}</p>
                <div className="mt-5 border-t border-zinc-100 pt-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    Preview →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}