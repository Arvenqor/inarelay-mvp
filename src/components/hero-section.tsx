"use client";

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  MessageSquare,
  ShieldCheck,
  UserRound,
  Wrench,
} from "lucide-react";
import {
  segmentHeroData,
  portfolioSignals,
  operatorCases,
  OperatorCase,
  OperatorSegmentId,
} from "@/lib/demo-data";

const caseBySegment: Record<OperatorSegmentId, string> = {
  paygo: "case-0622",
  minigrid: "case-0714",
  ci: "case-0831",
  installer: "case-1042",
};

const toneStyles = {
  payment: {
    icon: AlertTriangle,
    label: "Payment",
    className: "bg-rose-50 text-rose-700 ring-rose-100",
  },
  support: {
    icon: Wrench,
    label: "Support",
    className: "bg-amber-50 text-amber-700 ring-amber-100",
  },
  field: {
    icon: UserRound,
    label: "Field",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  },
  message: {
    icon: MessageSquare,
    label: "Message",
    className: "bg-sky-50 text-sky-700 ring-sky-100",
  },
  decision: {
    icon: ClipboardCheck,
    label: "Decision",
    className: "bg-teal-50 text-teal-700 ring-teal-100",
  },
  verification: {
    icon: ShieldCheck,
    label: "Evidence",
    className: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  },
  onboarding: {
    icon: CheckCircle2,
    label: "Onboarding",
    className: "bg-violet-50 text-violet-700 ring-violet-100",
  },
} satisfies Record<OperatorCase["timeline"][number]["tone"], { icon: typeof AlertTriangle; label: string; className: string }>;

function priorityLabel(priority: OperatorCase["priority"]) {
  return priority === "urgent" ? "Urgent" : priority === "high" ? "High" : "Medium";
}

function HeroCaseMockup({ activeSegment }: { activeSegment: OperatorSegmentId }) {
  const selectedCase =
    operatorCases.find((item) => item.id === caseBySegment[activeSegment]) ?? operatorCases[0];
  const queue = [
    selectedCase,
    ...operatorCases.filter((item) => item.id !== selectedCase.id),
  ].slice(0, 3);
  const evidenceReady = selectedCase.evidenceChecklist.filter((item) => item.status === "verified").length;

  return (
    <div className="motion-reveal relative overflow-hidden rounded-2xl border border-slate-900/10 bg-white shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(13,148,136,0.14),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(245,158,11,0.12),transparent_24%)]" />
      <div className="relative border-b border-slate-200 bg-white/90 px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700">Operator workspace</p>
            <p className="mt-1 text-sm font-extrabold text-slate-950">Exception evidence desk</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-[11px] font-bold text-teal-700">
            <span className="pulse-dot" />
            Evidence pack {selectedCase.proofCompleteness}%
          </div>
        </div>
      </div>

      <div className="relative grid gap-3 p-3 sm:grid-cols-[0.88fr_1.12fr] lg:p-4">
        <div className="space-y-3">
          <section className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-extrabold text-slate-900">At-risk queue</p>
              <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">
                {operatorCases.length} open
              </span>
            </div>
            <div className="space-y-2">
              {queue.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-lg border bg-white p-2.5 ${
                    item.id === selectedCase.id ? "border-teal-200 shadow-sm" : "border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-extrabold text-slate-900">{item.customerName}</p>
                      <p className="mt-1 truncate text-[11px] text-slate-500">{item.site}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                        item.priority === "urgent"
                          ? "bg-rose-100 text-rose-700"
                          : item.priority === "high"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {priorityLabel(item.priority)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-700">{item.amountAtRisk}</span>
                    <span className="text-slate-500">{item.age}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-xs font-extrabold text-slate-900">Next owner</p>
            <div className="mt-3 rounded-lg bg-slate-50 p-3">
              <p className="text-[11px] font-bold uppercase text-slate-500">Owner</p>
              <p className="mt-1 text-sm font-extrabold text-slate-950">{selectedCase.owner}</p>
            </div>
            <div className="mt-2 rounded-lg bg-teal-50 p-3">
              <p className="text-[11px] font-bold uppercase text-teal-700">Recommended action</p>
              <p className="mt-1 text-sm font-bold leading-5 text-slate-900">{selectedCase.nextAction}</p>
            </div>
            <p className="mt-3 text-[11px] font-semibold text-slate-500">Due: {selectedCase.due}</p>
          </section>
        </div>

        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">{selectedCase.id}</p>
                <h2 className="mt-1 truncate text-xl font-extrabold text-slate-950">{selectedCase.customerName}</h2>
                <p className="mt-1 text-xs text-slate-500">{selectedCase.segment}</p>
              </div>
              <div className="rounded-lg bg-slate-950 px-3 py-2 text-right text-white">
                <p className="text-[10px] font-bold uppercase text-slate-300">Proof</p>
                <p className="text-lg font-extrabold">{selectedCase.proofCompleteness}%</p>
              </div>
            </div>

            <div className="mt-3 h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-teal-500"
                style={{ width: `${selectedCase.proofCompleteness}%` }}
              />
            </div>
          </div>

          <div className="grid gap-3 p-3">
            <div className="space-y-2">
              {selectedCase.timeline.slice(0, 4).map((item) => {
                const tone = toneStyles[item.tone];
                const Icon = tone.icon;

                return (
                  <div key={item.label} className="grid grid-cols-[34px_1fr_auto] items-start gap-2">
                    <span className={`grid h-8 w-8 place-items-center rounded-full ring-1 ${tone.className}`}>
                      <Icon size={15} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold text-slate-900">{item.label}</p>
                      <p className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-slate-500">{item.detail}</p>
                    </div>
                    <span className="rounded-full bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">
                      {tone.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-extrabold text-slate-900">Evidence checklist</p>
                <span className="text-[11px] font-bold text-teal-700">{evidenceReady}/{selectedCase.evidenceChecklist.length} verified</span>
              </div>
              <div className="grid gap-1.5">
                {selectedCase.evidenceChecklist.slice(0, 3).map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-2 rounded-md bg-white px-2.5 py-2">
                    <span className="truncate text-[11px] font-semibold text-slate-700">{item.label}</span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                        item.status === "verified"
                          ? "bg-emerald-100 text-emerald-700"
                          : item.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-teal-200 bg-teal-50 px-3 py-2">
              <span className="text-xs font-extrabold text-teal-800">Decision-ready workflow</span>
              <ArrowRight size={16} className="text-teal-700" aria-hidden="true" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export function HeroSection({
  activeSegment,
  onDemoClick,
  onPortfolioClick,
}: {
  activeSegment: OperatorSegmentId;
  onDemoClick: () => void;
  onPortfolioClick: () => void;
}) {
  const data = segmentHeroData[activeSegment];

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[#eef8f6]">
      <div className="grid-glow absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          {/* Left */}
          <div className="motion-rise space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
              <span className="pulse-dot" />
              Operator preview — {activeSegment === "paygo" ? "PAYGo Solar" : activeSegment === "minigrid" ? "Mini-Grid" : activeSegment === "ci" ? "C&I" : "Installer"}
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              {data.headline}
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-600">{data.subtext}</p>

            <div className="flex flex-wrap gap-2">
              {data.pains.map((p) => (
                <span key={p} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
                  {p}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onDemoClick}
                className="min-h-12 rounded-xl bg-slate-900 px-6 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                {data.ctaLabel} →
              </button>
              <button
                type="button"
                onClick={onPortfolioClick}
                className="min-h-12 rounded-xl border border-slate-300 bg-white/80 px-6 text-sm font-bold text-slate-800 transition hover:border-teal-400 hover:bg-white"
              >
                See portfolio proof
              </button>
            </div>

            <div className="rounded-xl border border-teal-200/60 bg-white/80 p-3">
              <p className="text-2xl font-extrabold text-teal-600">{data.stat}</p>
              <p className="mt-1 text-xs text-slate-600">
                {data.statSource}
              </p>
            </div>
          </div>

          {/* Right */}
          <HeroCaseMockup activeSegment={activeSegment} />
        </div>

        {/* Stats strip */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {portfolioSignals.map((signal, i) => (
            <div
              key={signal.label}
              className="motion-rise rounded-xl border border-white/80 bg-white p-4 shadow-sm"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{signal.label}</p>
              <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">{signal.value}</p>
              <p className="mt-1.5 text-xs leading-5 text-slate-500">{signal.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
