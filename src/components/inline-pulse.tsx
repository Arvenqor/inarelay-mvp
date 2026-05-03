"use client";

import { useState, FormEvent } from "react";
import { inlinePulseQuestions } from "@/lib/demo-data";

type PulseAnswers = Record<string, string>;

export function InlinePulse() {
  const [answers, setAnswers] = useState<PulseAnswers>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (Object.keys(answers).length < inlinePulseQuestions.length) return;
    setSubmitting(true);
    try {
      await fetch("/api/validation-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promptLocation: "inline_pulse",
          answers,
          submittedAt: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  const allAnswered = Object.keys(answers).length === inlinePulseQuestions.length;

  return (
    <section className="border-y border-slate-200 bg-gradient-to-br from-teal-50 to-slate-50 py-14">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-700">
              Quick check — 30 seconds
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
              Help us understand your operation
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              3 questions based on what you just saw. Answers guide how we build InaRelay.
            </p>
          </div>
          {submitted && (
            <span className="shrink-0 rounded-full bg-teal-100 px-3 py-1.5 text-xs font-bold text-teal-800">
              ✓ Captured — thank you
            </span>
          )}
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-teal-200 bg-white p-6 text-center">
            <p className="text-4xl">🙏</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">That helps a lot.</p>
            <p className="mt-2 text-sm text-slate-600">
              Scroll down to see pilot options or send the full validation signal below.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {inlinePulseQuestions.map((q, i) => (
              <div key={q.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-800">
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                  {q.label}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {q.options.map((opt) => {
                    const selected = answers[q.id] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                        className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                          selected
                            ? "border-teal-600 bg-teal-600 text-white"
                            : "border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-400 hover:bg-teal-50"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={!allAnswered || submitting}
              className="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Saving..." : "Submit answers"}
            </button>
            <p className="text-center text-xs text-slate-500">
              No login required. We use responses to improve InaRelay and may follow up if you opt in below.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
