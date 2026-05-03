"use client";

import { useMemo, useState } from "react";
import {
  operatorCases, operatorSegments, portfolioSignals, reportingPacks,
  resolutionOutcomes, rootCauseSummary, ageingBuckets,
  type EvidenceStatus, type ExceptionType, type OperatorCase,
} from "@/lib/demo-data";
import { SegmentFastTrack } from "@/components/conversion-section";

type ViewMode = "case" | "portfolio" | "fit";
type CaseFilter = "all" | ExceptionType;

const statusLabels = { open: "Open", awaiting_internal: "Awaiting internal check", resolved: "Resolved" };
const priorityLabels = { urgent: "Urgent", high: "High", medium: "Medium" };
const wedgeLabels: Record<ExceptionType, string> = { payment: "Payment", support: "Support", field: "Field", verification: "Verification", onboarding: "Onboarding" };

const toneClass = {
  payment: "border-amber-300 bg-amber-50 text-amber-900",
  support: "border-rose-200 bg-rose-50 text-rose-900",
  field: "border-teal-200 bg-teal-50 text-teal-900",
  message: "border-sky-200 bg-sky-50 text-sky-900",
  decision: "border-slate-300 bg-slate-100 text-slate-900",
  verification: "border-indigo-200 bg-indigo-50 text-indigo-900",
  onboarding: "border-lime-200 bg-lime-50 text-lime-900",
};

const proofStatusClass: Record<EvidenceStatus, string> = {
  verified: "bg-teal-50 text-teal-800 ring-teal-200",
  pending: "bg-amber-50 text-amber-900 ring-amber-200",
  missing: "bg-rose-50 text-rose-800 ring-rose-200",
};

// ─── Ageing Bar Chart (pure SVG) ────────────────────────────────────────────

function AgeingChart() {
  const maxVal = Math.max(...ageingBuckets.map((b) => b.value));
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">Receivables aging (NGN 000s)</p>
      <div className="space-y-2">
        {ageingBuckets.map((b, i) => (
          <div key={b.label} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-right text-[11px] font-semibold text-slate-500">{b.label}</span>
            <div className="h-6 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className="bar-animated h-full rounded-full"
                style={{ width: `${(b.value / maxVal) * 100}%`, backgroundColor: b.color, animationDelay: `${i * 120}ms` }}
              />
            </div>
            <span className="w-14 text-[11px] font-bold text-slate-700">₦{b.value}k</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CaseList ────────────────────────────────────────────────────────────────

function CaseList({ cases, selectedCase, onSelect }: { cases: OperatorCase[]; selectedCase: OperatorCase; onSelect: (c: OperatorCase) => void }) {
  return (
    <div className="space-y-2">
      {cases.map((item) => {
        const active = item.id === selectedCase.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`w-full rounded-xl border p-4 text-left transition hover:-translate-y-0.5 ${active ? "border-slate-900 bg-slate-900 text-white shadow-lg" : "border-slate-200 bg-white text-slate-900 hover:border-teal-300 hover:shadow-md"}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold">{item.customerName}</p>
                <p className={`mt-0.5 text-xs ${active ? "text-slate-400" : "text-slate-500"}`}>{item.site}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${item.priority === "urgent" ? "bg-amber-400 text-slate-900" : active ? "bg-white/15 text-white" : "bg-slate-100 text-slate-700"}`}>
                {priorityLabels[item.priority]}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className={active ? "text-slate-400" : "text-slate-500"}>At risk</span>
                <p className="mt-0.5 font-semibold">{item.amountAtRisk}</p>
              </div>
              <div>
                <span className={active ? "text-slate-400" : "text-slate-500"}>Evidence</span>
                <p className="mt-0.5 font-semibold">{item.proofCompleteness}% ready</p>
              </div>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-200/50">
              <div className="h-full rounded-full bg-teal-400" style={{ width: `${item.proofCompleteness}%` }} />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${active ? "border-white/20 bg-white/10 text-white" : toneClass[item.wedge]}`}>
                {wedgeLabels[item.wedge]}
              </span>
              <span className={`text-[11px] ${active ? "text-slate-400" : "text-slate-500"}`}>{item.age}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Timeline ────────────────────────────────────────────────────────────────

function Timeline({ item }: { item: OperatorCase }) {
  return (
    <div className="space-y-3">
      {item.timeline.map((step) => (
        <div key={`${item.id}-${step.time}`} className="motion-rise grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[110px_1fr]">
          <div className="text-xs font-semibold text-slate-500">{step.time}</div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-slate-900">{step.label}</p>
              <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${toneClass[step.tone]}`}>{step.source}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{step.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Evidence Checklist ──────────────────────────────────────────────────────

function EvidenceChecklist({ item }: { item: OperatorCase }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Decision evidence</p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">{item.proofCompleteness}% proof ready</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{item.evidenceChecklist.length} checks</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-teal-500 transition-all" style={{ width: `${item.proofCompleteness}%` }} />
      </div>
      <div className="mt-4 space-y-3">
        {item.evidenceChecklist.map((proof) => (
          <div key={proof.label} className="rounded-lg bg-slate-50 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-slate-900">{proof.label}</p>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${proofStatusClass[proof.status]}`}>
                {proof.status.charAt(0).toUpperCase() + proof.status.slice(1)}
              </span>
            </div>
            <p className="mt-1.5 text-xs leading-5 text-slate-600">{proof.detail}</p>
            <p className="mt-1.5 text-[11px] font-bold uppercase text-slate-400">Owner: {proof.owner}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Case Desk ───────────────────────────────────────────────────────────────

function CaseDesk({ selectedCase, resolved, selectedOutcome, onSelectOutcome, onResolve }: {
  selectedCase: OperatorCase;
  resolved: boolean;
  selectedOutcome?: string;
  onSelectOutcome: (o: string) => void;
  onResolve: () => void;
}) {
  const status = resolved ? "resolved" : selectedCase.status;
  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-teal-700">{selectedCase.segment}</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{selectedCase.customerName}</h2>
            <p className="mt-1.5 text-sm text-slate-600">{selectedCase.rootCause}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{statusLabels[status]}</span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">{selectedCase.amountAtRisk} at risk</span>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            { label: "Owner", value: selectedCase.owner },
            { label: "Next action", value: selectedCase.nextAction },
            { label: "Due", value: selectedCase.due },
          ].map((f) => (
            <div key={f.label} className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase text-slate-500">{f.label}</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{f.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-slate-900">Account evidence timeline</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCase.channels.map((ch) => (
                <span key={ch} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">{ch}</span>
              ))}
            </div>
          </div>
          <Timeline item={selectedCase} />
        </div>

        <div className="space-y-5">
          <EvidenceChecklist item={selectedCase} />
          <div className="rounded-xl border border-slate-200 bg-slate-900 p-5 text-white">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Resolution action</p>
            <h3 className="mt-2 text-lg font-bold">Record the operator decision</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{selectedCase.managementQuestion}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {resolutionOutcomes.map((outcome) => (
                <button
                  key={outcome}
                  type="button"
                  onClick={() => onSelectOutcome(outcome)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${selectedOutcome === outcome ? "border-amber-400 bg-amber-400 text-slate-900" : "border-white/15 bg-white/5 text-slate-300 hover:border-amber-400"}`}
                >
                  {outcome}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onResolve}
              className="mt-5 w-full rounded-xl bg-amber-400 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-300"
            >
              {resolved ? "✓ Outcome captured" : "Mark outcome captured"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Portfolio Proof ─────────────────────────────────────────────────────────

function PortfolioProof() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-4">
        {rootCauseSummary.map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-2">
              <span className={`rounded-full border px-2 py-0.5 text-[11px] font-bold ${toneClass[item.type]}`}>{item.label}</span>
              <span className="text-xs font-semibold text-slate-500">{item.count} cases</span>
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">{item.value}</p>
            <p className="mt-0.5 text-[11px] font-bold uppercase text-slate-500">{item.trend}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <AgeingChart />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">Management review</p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">Why accounts are behind</h3>
            </div>
            <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-800">Export ready after evidence fixes</span>
          </div>
          <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-[1.2fr_0.7fr_0.9fr_1.1fr] bg-slate-100 px-4 py-3 text-xs font-bold uppercase text-slate-500">
                <span>Root cause</span><span>Value</span><span>Signal</span><span>Decision path</span>
              </div>
              {rootCauseSummary.map((item) => (
                <div key={item.label} className="grid grid-cols-[1.2fr_0.7fr_0.9fr_1.1fr] gap-3 border-t border-slate-200 px-4 py-4 text-sm">
                  <span className="font-semibold text-slate-900">{item.label}</span>
                  <span className="text-slate-700">{item.value}</span>
                  <span className="text-slate-600">{item.trend}</span>
                  <span className="text-slate-600">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {reportingPacks.map((pack) => (
            <div key={pack.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase text-amber-700">{pack.audience}</p>
              <h4 className="mt-1 font-bold text-slate-900">{pack.label}</h4>
              <p className="text-xs text-slate-500">{pack.cadence}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {pack.metrics.map((m) => <span key={m} className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700">{m}</span>)}
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-600">{pack.missingEvidence}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Operator Fit ────────────────────────────────────────────────────────────

function OperatorFit() {
  const [selectedId, setSelectedId] = useState("mini-grid");
  const [showFastTrack, setShowFastTrack] = useState(false);

  const seg = operatorSegments.find((s) => s.id === selectedId) ?? operatorSegments[0];

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-[200px_1fr]">
        {/* Sidebar selector */}
        <div className="space-y-1.5">
          <p className="px-2 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            Your operator type
          </p>
          {operatorSegments.map((s) => {
            const active = s.id === selectedId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => { setSelectedId(s.id); setShowFastTrack(false); }}
                className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  active
                    ? "border-teal-600 bg-teal-600 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50"
                }`}
              >
                {s.shortName}
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="motion-fade rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
                InaRelay for {seg.shortName}
              </p>
              <h3 className="mt-2 text-xl font-bold leading-tight text-slate-900">
                {seg.painHeadline}
              </h3>
            </div>
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-600">{seg.acutePain}</p>

          <div className="mt-5 rounded-xl border border-teal-100 bg-teal-50 p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
              How InaRelay helps
            </p>
            <p className="mt-2 text-sm leading-6 text-teal-900">{seg.proof}</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {seg.mvpFeatures.map((f) => (
              <span
                key={f}
                className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-bold text-white"
              >
                {f}
              </span>
            ))}
          </div>

          <div className="mt-5 border-t border-slate-100 pt-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Operators in this category
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {seg.examples.map((e) => (
                <span
                  key={e}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            {!showFastTrack ? (
              <button
                type="button"
                onClick={() => setShowFastTrack(true)}
                className="rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-amber-300"
              >
                This describes my operation →
              </button>
            ) : (
              <div className="motion-rise rounded-xl border border-amber-200 bg-amber-50 p-5">
                <p className="mb-4 text-sm font-semibold text-amber-900">
                  Great — tell us a bit more so we can tailor the pilot conversation.
                </p>
                <SegmentFastTrack />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── View Tabs ───────────────────────────────────────────────────────────────

function ViewTabs({ active, onChange }: { active: ViewMode; onChange: (m: ViewMode) => void }) {
  const tabs: Array<{ id: ViewMode; label: string }> = [
    { id: "case", label: "Case desk" },
    { id: "portfolio", label: "Portfolio proof" },
    { id: "fit", label: "Operator fit" },
  ];
  return (
    <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={`min-h-10 rounded-lg px-4 text-sm font-bold transition ${active === t.id ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ─── Case Filter Bar ─────────────────────────────────────────────────────────

function CaseFilterBar({ active, onChange }: { active: CaseFilter; onChange: (f: CaseFilter) => void }) {
  const filters: Array<{ id: CaseFilter; label: string }> = [
    { id: "all", label: "All" }, { id: "payment", label: "Payment" }, { id: "support", label: "Support" },
    { id: "verification", label: "Verification" }, { id: "onboarding", label: "Onboarding" },
  ];
  return (
    <div className="flex flex-wrap gap-1.5">
      {filters.map((f) => (
        <button
          key={f.id}
          type="button"
          onClick={() => onChange(f.id)}
          className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${active === f.id ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-teal-400"}`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

// ─── Step Guide ──────────────────────────────────────────────────────────────

function StepGuide({ activeView }: { activeView: ViewMode }) {
  const steps = [
    { id: "case", label: "Open a case", detail: "See why money is stuck" },
    { id: "portfolio", label: "Review portfolio", detail: "See recovery across all accounts" },
    { id: "fit", label: "Check fit", detail: "Confirm this matches your operation" },
  ];
  const current = steps.findIndex((s) => s.id === activeView);
  return (
    <div className="flex items-center gap-2 overflow-x-auto rounded-xl border border-slate-200 bg-white px-5 py-3">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center gap-2">
          <div className={`flex shrink-0 items-center gap-2 ${i <= current ? "text-slate-900" : "text-slate-400"}`}>
            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold ${i < current ? "bg-teal-600 text-white" : i === current ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-500"}`}>
              {i < current ? "✓" : i + 1}
            </span>
            <div className="hidden sm:block">
              <p className="text-[13px] font-semibold">{step.label}</p>
              <p className="text-[11px] text-slate-500">{step.detail}</p>
            </div>
          </div>
          {i < steps.length - 1 && <div className="mx-2 h-px w-8 shrink-0 bg-slate-200" />}
        </div>
      ))}
    </div>
  );
}

// ─── Demo Workspace (main export) ────────────────────────────────────────────

export function DemoWorkspace() {
  const [selectedId, setSelectedId] = useState(operatorCases[0].id);
  const [resolved, setResolved] = useState<Record<string, boolean>>({});
  const [outcomes, setOutcomes] = useState<Record<string, string>>({});
  const [activeView, setActiveView] = useState<ViewMode>("case");
  const [caseFilter, setCaseFilter] = useState<CaseFilter>("all");

  const filteredCases = useMemo(
    () => (caseFilter === "all" ? operatorCases : operatorCases.filter((c) => c.wedge === caseFilter)),
    [caseFilter],
  );

  const selectedCase = useMemo(
    () => operatorCases.find((c) => c.id === selectedId) ?? operatorCases[0],
    [selectedId],
  );

  return (
    <section id="demo-workspace" className="scroll-mt-16 bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section header */}
        <div className="mb-6">
          <span className="inline-block rounded-full bg-slate-900 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-400">
            Live demo workspace
          </span>
          <h2 className="mt-3 text-2xl font-bold text-slate-900">
            Walk through a real operating exception
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Seeded cases mirror PAYGo, mini-grid, appliance finance, C&amp;I, and after-sales workflows.
          </p>
        </div>

        <StepGuide activeView={activeView} />

        <div className="mt-5 grid gap-5 lg:grid-cols-[320px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase text-slate-500">Portfolio queue</p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">Accounts needing a decision</h3>
            </div>
            <CaseFilterBar active={caseFilter} onChange={setCaseFilter} />
            <CaseList
              cases={filteredCases}
              selectedCase={selectedCase}
              onSelect={(c) => { setSelectedId(c.id); setActiveView("case"); }}
            />
          </aside>

          {/* Main */}
          <div className="space-y-4">
            <ViewTabs active={activeView} onChange={setActiveView} />
            {activeView === "case" && (
              <CaseDesk
                selectedCase={selectedCase}
                resolved={!!resolved[selectedCase.id]}
                selectedOutcome={outcomes[selectedCase.id]}
                onSelectOutcome={(o) => setOutcomes((p) => ({ ...p, [selectedCase.id]: o }))}
                onResolve={() => setResolved((p) => ({ ...p, [selectedCase.id]: true }))}
              />
            )}
            {activeView === "portfolio" && <PortfolioProof />}
            {activeView === "fit" && <OperatorFit />}
          </div>
        </div>
      </div>
    </section>
  );
}
