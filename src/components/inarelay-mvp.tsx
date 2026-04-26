"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { operatorCases, validationQuestions, type OperatorCase } from "@/lib/demo-data";

const statusLabels = {
  open: "Open",
  awaiting_internal: "Awaiting internal check",
  resolved: "Resolved",
};

const priorityLabels = {
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
};

const toneClass = {
  payment: "border-amber-300 bg-amber-50 text-amber-900",
  support: "border-rose-200 bg-rose-50 text-rose-900",
  field: "border-teal-200 bg-teal-50 text-teal-900",
  message: "border-sky-200 bg-sky-50 text-sky-900",
  decision: "border-stone-300 bg-stone-100 text-stone-950",
};

type Answers = Record<string, string>;

function formatEventName(name: string) {
  return name.replaceAll("_", " ");
}

function CaseList({
  cases,
  selectedCase,
  onSelect,
}: {
  cases: OperatorCase[];
  selectedCase: OperatorCase;
  onSelect: (item: OperatorCase) => void;
}) {
  return (
    <div className="space-y-3">
      {cases.map((item) => {
        const isActive = item.id === selectedCase.id;

        return (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`w-full rounded-lg border p-4 text-left transition duration-300 hover:-translate-y-0.5 ${
              isActive
                ? "border-stone-950 bg-stone-950 text-white shadow-lg shadow-stone-950/10"
                : "border-stone-200 bg-white text-stone-950 hover:border-amber-300 hover:shadow-md hover:shadow-amber-900/5"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{item.customerName}</p>
                <p className={`mt-1 text-xs ${isActive ? "text-stone-300" : "text-stone-500"}`}>
                  {item.site}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  item.priority === "urgent"
                    ? "bg-amber-300 text-stone-950"
                    : isActive
                      ? "bg-white/15 text-white"
                      : "bg-stone-100 text-stone-700"
                }`}
              >
                {priorityLabels[item.priority]}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className={isActive ? "text-stone-300" : "text-stone-500"}>At risk</span>
                <p className="mt-1 font-semibold">{item.amountAtRisk}</p>
              </div>
              <div>
                <span className={isActive ? "text-stone-300" : "text-stone-500"}>Age</span>
                <p className="mt-1 font-semibold">{item.age}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function MetricStrip() {
  const metrics = [
    ["Open exception value", "NGN 586.5k"],
    ["Cases needing owner", "7"],
    ["Avg resolution age", "4.8 days"],
    ["Pilot signal", "Support-linked arrears"],
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(([label, value], index) => (
        <div
          key={label}
          className="motion-rise rounded-lg border border-stone-200 bg-white p-4"
          style={{ animationDelay: `${index * 90}ms` }}
        >
          <p className="text-xs font-medium uppercase text-stone-500">{label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">{value}</p>
        </div>
      ))}
    </div>
  );
}

function Timeline({ item }: { item: OperatorCase }) {
  return (
    <div className="space-y-3">
      {item.timeline.map((step) => (
        <div
          key={`${item.id}-${step.time}-${step.label}`}
          className="motion-rise grid gap-3 rounded-lg border border-stone-200 bg-white p-4 sm:grid-cols-[120px_1fr]"
        >
          <div className="text-xs font-medium text-stone-500">{step.time}</div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-stone-950">{step.label}</p>
              <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${toneClass[step.tone]}`}>
                {step.source}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-stone-600">{step.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function EvidenceFlowVisual() {
  return (
    <div className="motion-reveal relative overflow-hidden rounded-lg border border-stone-900/10 bg-stone-950 p-2 shadow-2xl shadow-stone-950/15">
      <div className="absolute left-5 top-5 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-stone-900 shadow-sm">
        Evidence flow
      </div>
      <div className="absolute bottom-5 right-5 z-10 rounded-full bg-amber-300 px-3 py-1 text-xs font-bold text-stone-950 shadow-sm">
        Decision ready
      </div>
      <Image
        src="/assets/inarelay-evidence-flow.png"
        alt="Visual showing fragmented payment, support, field, and message evidence converging into one account decision"
        width={1680}
        height={945}
        priority
        className="aspect-[16/9] rounded-md object-cover"
      />
      <div className="flow-sheen absolute inset-2 rounded-md" />
    </div>
  );
}

function ValidationPanel({ selectedCase }: { selectedCase: OperatorCase }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitValidation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const payload = {
      caseId: selectedCase.id,
      answers,
      note,
      submittedAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/validation-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={submitValidation} className="rounded-lg border border-stone-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase text-amber-700">Validation</p>
          <h2 className="mt-1 text-lg font-semibold text-stone-950">What should we learn from this preview?</h2>
        </div>
        {submitted ? (
          <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">
            Captured for review
          </span>
        ) : null}
      </div>

      <div className="mt-5 space-y-5">
        {validationQuestions.map((question) => (
          <fieldset key={question.id}>
            <legend className="text-sm font-semibold text-stone-800">{question.label}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {question.options.map((option) => {
                const isSelected = answers[question.id] === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setAnswers((current) => ({
                        ...current,
                        [question.id]: option,
                      }))
                    }
                    className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                      isSelected
                        ? "border-stone-950 bg-stone-950 text-white"
                        : "border-stone-200 bg-stone-50 text-stone-700 hover:border-amber-300"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}

        <label className="block">
          <span className="text-sm font-semibold text-stone-800">What is this preview still missing?</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Example: we need bank reconciliation proof, field technician ownership, or weekly reporting exports."
            className="mt-2 min-h-28 w-full rounded-lg border border-stone-200 bg-stone-50 p-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:bg-white"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 w-full rounded-lg bg-amber-400 px-4 py-3 text-sm font-bold text-stone-950 transition hover:bg-amber-300"
      >
        {isSubmitting ? "Saving..." : "Save validation signal"}
      </button>
    </form>
  );
}

export function InaRelayMvp() {
  const [selectedId, setSelectedId] = useState(operatorCases[0].id);
  const [resolved, setResolved] = useState<Record<string, boolean>>({});

  const selectedCase = useMemo(
    () => operatorCases.find((item) => item.id === selectedId) ?? operatorCases[0],
    [selectedId],
  );

  const selectedStatus = resolved[selectedCase.id] ? "resolved" : selectedCase.status;

  const trackedEvents = [
    "portfolio_view_opened",
    "account_case_opened",
    "timeline_step_viewed",
    "next_action_panel_opened",
    resolved[selectedCase.id] ? "resolution_outcome_submitted" : "validation_form_started",
  ];

  return (
    <main className="min-h-screen bg-[#f6f3ec] text-stone-950">
      <section className="relative overflow-hidden border-b border-stone-200 bg-[#fffaf0]">
        <div className="grid-glow absolute inset-0 opacity-70" />
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 lg:px-8">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-stone-950 font-bold text-amber-300">
                IR
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-stone-500">InaRelay</p>
                <h1 className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">
                  Exception operations for distributed-energy accounts
                </h1>
              </div>
            </div>
            <div className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700">
              Private operator preview
            </div>
          </header>

          <div className="relative grid items-center gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="motion-rise space-y-5">
              <div className="inline-flex rounded-full border border-amber-300/70 bg-amber-100 px-3 py-1 text-xs font-bold text-amber-950">
                Evidence-led workflow
              </div>
              <div className="max-w-2xl">
                <h2 className="text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
                  Turn scattered payment, support, and field evidence into one clear account decision.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-stone-600">
                  This preview tests whether operators can resolve the hard account cases their current tools leave split across WhatsApp, bank portals, support notes, and spreadsheets.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Payment exceptions", "Support-linked arrears", "Field follow-up", "Portfolio proof"].map((item) => (
                  <span key={item} className="rounded-full border border-stone-200 bg-white/80 px-3 py-2 text-xs font-bold text-stone-700 shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <EvidenceFlowVisual />
          </div>

          <MetricStrip />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-6 lg:grid-cols-[340px_1fr] lg:px-8">
        <aside className="space-y-4">
          <div className="rounded-lg border border-stone-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase text-stone-500">Portfolio queue</p>
            <h2 className="mt-1 text-xl font-semibold text-stone-950">Accounts needing a decision</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Seeded cases model the validation problem: payment, support, and field context scattered across teams.
            </p>
          </div>
          <CaseList cases={operatorCases} selectedCase={selectedCase} onSelect={(item) => setSelectedId(item.id)} />
        </aside>

        <div className="space-y-5">
          <section className="rounded-lg border border-stone-200 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase text-amber-700">{selectedCase.segment}</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-stone-950">
                  {selectedCase.customerName}
                </h2>
                <p className="mt-2 text-sm text-stone-600">{selectedCase.rootCause}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">
                  {statusLabels[selectedStatus]}
                </span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                  {selectedCase.amountAtRisk} at risk
                </span>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg bg-stone-50 p-4">
                <p className="text-xs font-semibold uppercase text-stone-500">Owner</p>
                <p className="mt-2 font-semibold text-stone-950">{selectedCase.owner}</p>
              </div>
              <div className="rounded-lg bg-stone-50 p-4">
                <p className="text-xs font-semibold uppercase text-stone-500">Next action</p>
                <p className="mt-2 font-semibold text-stone-950">{selectedCase.nextAction}</p>
              </div>
              <div className="rounded-lg bg-stone-50 p-4">
                <p className="text-xs font-semibold uppercase text-stone-500">Due</p>
                <p className="mt-2 font-semibold text-stone-950">{selectedCase.due}</p>
              </div>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-stone-950">Account evidence timeline</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.channels.map((channel) => (
                    <span
                      key={channel}
                      className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-semibold text-stone-600"
                    >
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
              <Timeline item={selectedCase} />
            </div>

            <div className="space-y-5">
              <div className="rounded-lg border border-stone-200 bg-stone-950 p-5 text-white">
                <p className="text-xs font-semibold uppercase text-amber-300">Resolution action</p>
                <h2 className="mt-2 text-xl font-semibold">Record the operator decision</h2>
                <p className="mt-3 text-sm leading-6 text-stone-300">
                  This preview should prove whether the flow clarifies ownership and reduces manual back-and-forth.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setResolved((current) => ({
                      ...current,
                      [selectedCase.id]: true,
                    }))
                  }
                  className="mt-5 w-full rounded-lg bg-amber-400 px-4 py-3 text-sm font-bold text-stone-950 transition hover:bg-amber-300"
                >
                  Mark outcome captured
                </button>
              </div>

              <div className="rounded-lg border border-stone-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase text-stone-500">Tracked preview events</p>
                <div className="mt-3 space-y-2">
                  {trackedEvents.map((event) => (
                    <div key={event} className="flex items-center justify-between rounded-md bg-stone-50 px-3 py-2 text-xs">
                      <span className="font-medium text-stone-700">{formatEventName(event)}</span>
                      <span className="font-semibold text-teal-700">ready</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <ValidationPanel selectedCase={selectedCase} />
        </div>
      </section>
    </main>
  );
}
