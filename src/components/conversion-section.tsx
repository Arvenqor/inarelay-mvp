"use client";

import { FormEvent, useState } from "react";
import { validationQuestions, segmentFastTrackQuestions } from "@/lib/demo-data";
import { OperatorCase } from "@/lib/demo-data";

// Pilot tiers — signal pricing only (specific naira amounts are unvalidated at MVP stage)
const pilotTiers = [
  {
    name: "Discovery Pilot",
    duration: "30 days",
    scope: "Up to 200 accounts",
    price: "Free",
    priceNote: "No commitment required",
    includes: ["Exception desk setup", "Sample case seeding from your data", "2 validation review calls"],
    ideal: "Operators wanting to test fit before committing",
    cta: "Apply for a discovery pilot",
  },
  {
    name: "Operations Pilot",
    duration: "60 days",
    scope: "Up to 1,000 accounts",
    price: "Scoped to operator",
    priceNote: "Quoted after a 30-min scoping call",
    includes: ["Full exception ops + portfolio view", "Collections + support workflow", "Weekly review call", "Management report export"],
    ideal: "Operators ready to move cases off spreadsheets",
    cta: "Book a scoping call",
  },
  {
    name: "Enterprise Pilot",
    duration: "90 days",
    scope: "Unlimited accounts",
    price: "Custom",
    priceNote: "Tailored to operator scale and integration needs",
    includes: ["All features", "Verification pack builder", "Lender / grant reporting exports", "Dedicated pilot support"],
    ideal: "Mini-grid and grant-backed operators with reporting obligations",
    cta: "Book a scoping call",
  },
];

// ─── Segment Fast-Track (Layer 2) ─────────────────────────────────────────────

export function SegmentFastTrack() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  async function submit() {
    setSubmitted(true);
    try {
      await fetch("/api/validation-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptLocation: "segment_fasttrack", answers, submittedAt: new Date().toISOString() }),
      });
    } catch { /* silent */ }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-5 text-center">
        <p className="font-semibold text-teal-800">Context captured — thank you.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">2 quick context questions</p>
      <div className="mt-4 space-y-5">
        {segmentFastTrackQuestions.map((q) => (
          <div key={q.id}>
            <p className="text-sm font-semibold text-slate-800">{q.label}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setAnswers((p) => ({ ...p, [q.id]: opt }))}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    answers[q.id] === opt
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-teal-400"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {Object.keys(answers).length === segmentFastTrackQuestions.length && (
        <button
          type="button"
          onClick={submit}
          className="mt-4 w-full rounded-lg bg-teal-600 py-2.5 text-sm font-bold text-white transition hover:bg-teal-500"
        >
          Save context
        </button>
      )}
    </div>
  );
}

// ─── Full Validation Panel (Layer 3) ─────────────────────────────────────────

type LeadDetails = { operatorName: string; workEmail: string; teamRole: string; pilotReadiness: string };
const pilotReadinessOptions = ["Exploring", "Need internal review", "Ready for pilot call"];

function ValidationPanel({ selectedCase, activeView }: { selectedCase: OperatorCase; activeView: string }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [lead, setLead] = useState<LeadDetails>({ operatorName: "", workEmail: "", teamRole: "", pilotReadiness: pilotReadinessOptions[0] });
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/validation-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseId: selectedCase.id, activeView, lead, answers, note, promptLocation: "full_form", submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
    } catch {
      setError("Could not save. Please try again before closing.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center">
        <p className="text-4xl">✅</p>
        <h3 className="mt-4 text-xl font-bold text-slate-900">Validation signal captured</h3>
        <p className="mt-2 text-sm text-slate-600">
          We'll review your response and reach out at <strong>{lead.workEmail || "your email"}</strong> if you opted in for a pilot call.
        </p>
        <a
          href={`mailto:adelekedare2012@gmail.com?subject=InaRelay pilot enquiry from ${lead.operatorName || "operator"}`}
          className="mt-5 inline-block rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Book a pilot call directly →
        </a>
      </div>
    );
  }

  return (
    <form id="pilot-signal" onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Pilot signal — full form</p>
        <h3 className="mt-2 text-xl font-bold text-slate-900">Tell us where this fits in your operation.</h3>
        <p className="mt-1 text-sm text-slate-600">We use this to improve InaRelay and may contact you about a pilot if you opt in.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { key: "operatorName", label: "Company or operator", placeholder: "e.g. Prado Power" },
          { key: "workEmail", label: "Work email", placeholder: "name@company.com", type: "email" },
          { key: "teamRole", label: "Your role", placeholder: "Ops, finance, support..." },
        ].map((f) => (
          <label key={f.key} className="block">
            <span className="text-xs font-bold uppercase text-slate-500">{f.label}</span>
            <input
              type={f.type ?? "text"}
              value={(lead as Record<string, string>)[f.key]}
              onChange={(e) => setLead((p) => ({ ...p, [f.key]: e.target.value }))}
              placeholder={f.placeholder}
              className="mt-1.5 min-h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white"
            />
          </label>
        ))}
        <label className="block">
          <span className="text-xs font-bold uppercase text-slate-500">Pilot readiness</span>
          <select
            value={lead.pilotReadiness}
            onChange={(e) => setLead((p) => ({ ...p, pilotReadiness: e.target.value }))}
            className="mt-1.5 min-h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white"
          >
            {pilotReadinessOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </label>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {validationQuestions.map((q) => (
          <fieldset key={q.id}>
            <legend className="text-sm font-semibold text-slate-800">{q.label}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {q.options.map((opt) => {
                const sel = answers[q.id] === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setAnswers((p) => ({ ...p, [q.id]: opt }))}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${sel ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-400"}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-slate-800">What is this MVP still missing for your operation?</span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. bank reconciliation proof, technician ownership, DARES evidence export, agent cohort view, weekly lender report..."
          className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:bg-white"
        />
      </label>

      {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">{error}</p>}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 rounded-xl bg-amber-400 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-300 disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Save validation signal"}
        </button>
        <a
          href={`mailto:adelekedare2012@gmail.com?subject=InaRelay pilot enquiry`}
          className="flex-1 rounded-xl border border-slate-900 bg-white py-3 text-center text-sm font-bold text-slate-900 transition hover:bg-slate-50"
        >
          Book a pilot call directly →
        </a>
      </div>
    </form>
  );
}

// ─── Conversion Section ───────────────────────────────────────────────────────

export function ConversionSection({
  selectedCase,
  activeView,
}: {
  selectedCase: OperatorCase;
  activeView: string;
}) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Pilot tiers */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-700">
            Start a pilot
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Three ways to get started
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Every pilot starts with a 30-min scoping call. No contract until you see value.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pilotTiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-2xl border p-6 ${i === 1 ? "border-teal-400 bg-white shadow-lg shadow-teal-100" : "border-slate-200 bg-white"}`}
            >
              {i === 1 && (
                <span className="mb-3 self-start rounded-full bg-teal-600 px-3 py-1 text-[11px] font-bold text-white">Most popular</span>
              )}
              <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
              <p className="mt-1 text-xs text-slate-500">{tier.scope} · {tier.duration}</p>
              <div className="my-5 border-t border-slate-100 pt-5">
                <p className="text-3xl font-extrabold text-slate-900">{tier.price}</p>
                <p className="text-xs text-slate-500">{tier.priceNote}</p>
              </div>
              <ul className="flex-1 space-y-2">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-0.5 text-teal-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500 italic">{tier.ideal}</p>
              <a
                href={`mailto:adelekedare2012@gmail.com?subject=${encodeURIComponent(tier.cta + " — InaRelay")}`}
                className={`mt-6 block rounded-xl py-3 text-center text-sm font-bold transition ${
                  i === 1
                    ? "bg-teal-600 text-white hover:bg-teal-500"
                    : "border border-slate-200 bg-slate-50 text-slate-800 hover:border-teal-400 hover:bg-teal-50"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Validation form */}
        <div className="mt-16">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900">Or send a validation signal first</h2>
            <p className="mt-2 text-sm text-slate-600">
              Tell us your operation type and pain — no commitment required.
            </p>
          </div>
          <ValidationPanel selectedCase={selectedCase} activeView={activeView} />
        </div>
      </div>
    </section>
  );
}
