"use client";

import { problemStats } from "@/lib/demo-data";

const pains = [
  {
    icon: "💸",
    title: "Payment proof chaos",
    before: "Customer says they paid. Your team checks WhatsApp, bank portal, and a spreadsheet. Two days later — still unresolved.",
    after: "InaRelay matches payment proof to the account, flags the mismatch, and assigns it to Finance with a deadline.",
    stat: "40%",
    statDetail: "of PAYGo customers struggle to repay as time on book increases",
    source: "GOGLA, 2025",
  },
  {
    icon: "🔧",
    title: "Support faults killing repayment",
    before: "Customer stops paying after a relay trip. Support, collections, and field all touched the account. Nobody owns the next action.",
    after: "InaRelay links the fault to the arrears, logs the repair evidence, and pauses billing until restoration is confirmed.",
    stat: "43%",
    statDetail: "of at-risk value involves a service fault affecting willingness to pay",
    source: "InaRelay operator research",
  },
  {
    icon: "📋",
    title: "Evidence gaps blocking grants and lenders",
    before: "Grant disbursement deadline is next week. Meter activity, field photos, and phone verification notes are in three different places.",
    after: "InaRelay assembles connection evidence, meter exports, and verification records into one audit-ready pack.",
    stat: "NGN 1.8m",
    statDetail: "average grant claim blocked by missing connection or meter evidence",
    source: "InaRelay demo data",
  },
];

export function ProblemSection() {
  return (
    <section className="bg-slate-900 py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-teal-400">
            The operating problem
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Three pains destroying your collection rate
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            Nigerian distributed-energy operators lose revenue every day to workflows that fall between teams, tools, and WhatsApp threads. InaRelay joins them.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pains.map((pain) => (
            <div key={pain.title} className="motion-rise rounded-2xl border border-white/8 bg-white/5 p-6">
              <div className="text-3xl">{pain.icon}</div>
              <h3 className="mt-4 text-lg font-semibold text-white">{pain.title}</h3>

              <div className="mt-5 space-y-3">
                <div className="rounded-lg bg-rose-950/60 p-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-rose-400">Before InaRelay</p>
                  <p className="mt-1.5 text-sm leading-6 text-slate-300">{pain.before}</p>
                </div>
                <div className="rounded-lg bg-teal-950/60 p-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-teal-400">After InaRelay</p>
                  <p className="mt-1.5 text-sm leading-6 text-slate-300">{pain.after}</p>
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-2xl font-bold text-amber-400">{pain.stat}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{pain.statDetail}</p>
                <p className="mt-1 text-[11px] font-semibold text-slate-500">Source: {pain.source}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problemStats.map((item) => (
            <div key={item.stat} className="rounded-xl border border-white/8 bg-white/5 p-4 text-center">
              <p className="text-3xl font-extrabold text-amber-400">{item.stat}</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">{item.detail}</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600">{item.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
