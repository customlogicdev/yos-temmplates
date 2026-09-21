// src/templates/beauty/glow/pages/RitualPage.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { BeautyShell } from "../layout/Shell";
import { ProductCard } from "@/components/storefront/product";
import { Sparkles, ArrowRight, RotateCcw, Check } from "lucide-react";

const QUESTIONS = [
  {
    id: "skinType",
    question: "What's your skin type?",
    subtitle: "This helps us match formulas that work for you",
    options: [
      { value: "oily", label: "Oily", emoji: "💧" },
      { value: "dry", label: "Dry", emoji: "🌵" },
      { value: "combination", label: "Combination", emoji: "⚖️" },
      { value: "normal", label: "Normal", emoji: "✨" },
      { value: "sensitive", label: "Sensitive", emoji: "🌸" },
    ],
  },
  {
    id: "concern",
    question: "What's your main concern?",
    subtitle: "Pick the one that matters most to you",
    options: [
      { value: "hydration", label: "Hydration", emoji: "💧" },
      { value: "brightening", label: "Brightening", emoji: "✨" },
      { value: "acne", label: "Acne Care", emoji: "🌿" },
      { value: "anti-aging", label: "Anti-Aging", emoji: "⏳" },
      { value: "glow", label: "Glow", emoji: "🌟" },
    ],
  },
  {
    id: "routine",
    question: "How much time can you spare?",
    subtitle: "We'll adjust the number of steps",
    options: [
      { value: "2min", label: "2 minutes", emoji: "⚡" },
      { value: "5min", label: "5 minutes", emoji: "🕐" },
      { value: "10min", label: "10 minutes", emoji: "🧘" },
    ],
  },
];

export function BeautyRitualPage({ slug, store, products }: any) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setTimeout(() => setStep(step + 1), 250);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  const isComplete = step === QUESTIONS.length;

  // Recommendations logic
  const recommended = products
    .filter((p: any) => {
      let score = 0;
      if (answers.concern && p.tags.includes(answers.concern)) score += 2;
      if (answers.skinType && p.tags.includes(answers.skinType)) score += 1;
      return score > 0;
    })
    .slice(0, 6);

  const fallback = products.slice(0, 6);
  const finalProducts = recommended.length > 0 ? recommended : fallback;

  const maxSteps =
    answers.routine === "2min" ? 3 : answers.routine === "10min" ? 6 : 4;

  return (
    <BeautyShell
      props={{ data: { store }, basePath: `/store/${slug}` }}
      slug={slug}
    >
      <div className="mx-auto max-w-[1100px] px-6 py-20">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-pink-500" strokeWidth={2.5} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-pink-600">
              Routine Finder
            </span>
          </div>
          <h1 className="mt-6 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-[#2A2438]">
            Find your <span className="italic text-pink-500">ritual</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm text-[#2A2438]/60">
            Answer 3 quick questions — we'll curate the perfect routine for you.
          </p>
        </div>

        {/* Progress */}
        {!isComplete && (
          <div className="mt-12">
            <div className="flex items-center justify-center gap-2">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-16 rounded-full transition-all duration-500 ${
                    i < step
                      ? "bg-pink-500"
                      : i === step
                      ? "bg-pink-400"
                      : "bg-pink-100"
                  }`}
                />
              ))}
            </div>

            {/* Question */}
            {step < QUESTIONS.length && (
              <div className="mt-12 text-center">
                <p className="text-[10px] uppercase tracking-[0.25em] text-pink-500">
                  Question {step + 1} of {QUESTIONS.length}
                </p>
                <h2 className="mt-4 font-serif text-2xl leading-tight tracking-tight text-[#2A2438] lg:text-3xl">
                  {QUESTIONS[step].question}
                </h2>
                <p className="mt-2 text-sm text-[#2A2438]/50">
                  {QUESTIONS[step].subtitle}
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  {QUESTIONS[step].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(QUESTIONS[step].id, option.value)}
                      className={`group flex min-w-[140px] items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm transition-all ${
                        answers[QUESTIONS[step].id] === option.value
                          ? "border-pink-500 bg-pink-50 text-pink-600"
                          : "border-pink-200 bg-white text-[#2A2438] hover:border-pink-500 hover:bg-pink-50"
                      }`}
                    >
                      <span className="text-lg">{option.emoji}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>

                {/* Previous button */}
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="mt-8 text-xs uppercase tracking-[0.15em] text-[#2A2438]/50 hover:text-pink-500"
                  >
                    ← Previous
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {isComplete && (
          <div className="mt-12">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2">
                <Check className="h-4 w-4 text-green-600" strokeWidth={2.5} />
                <span className="text-xs font-semibold uppercase tracking-wider text-green-700">
                  Perfect match found
                </span>
              </div>
              <h2 className="mt-6 font-serif text-2xl leading-tight text-[#2A2438] lg:text-3xl">
                Your perfect <span className="italic text-pink-500">ritual</span>
              </h2>
              <p className="mt-3 text-sm text-[#2A2438]/60">
                Based on your answers, we recommend these {finalProducts.length} products
                {answers.routine === "2min" ? " for a 2-minute routine" : ""}
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {finalProducts.map((p: any) => (
                <ProductCard key={p.id} product={p} basePath={`/store/${slug}`} />
              ))}
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <Link
                href={`/store/${slug}/beauty/shop`}
                className="inline-flex items-center gap-2 rounded-full bg-[#2A2438] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-pink-500"
              >
                Shop Full Collection
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </Link>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-pink-500 transition hover:bg-pink-50"
              >
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.5} />
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </BeautyShell>
  );
}