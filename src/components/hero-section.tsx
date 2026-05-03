"use client";

import { segmentHeroData, portfolioSignals, OperatorSegmentId } from "@/lib/demo-data";

import Image from "next/image";

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
          <div className="motion-reveal relative overflow-hidden rounded-2xl border border-slate-900/12 shadow-2xl bg-[#0f172a]">
            <Image
              src="/assets/inarelay-evidence-flow.png"
              alt="InaRelay Evidence Flow"
              width={800}
              height={450}
              className="w-full h-auto object-cover"
              priority
            />
            <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-teal-500/20 px-2.5 py-1 text-[11px] font-bold text-teal-400 backdrop-blur-sm">
              <span className="pulse-dot" />
              Live evidence merge
            </div>
          </div>
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
