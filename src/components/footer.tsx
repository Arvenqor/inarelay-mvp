"use client";

export function Footer() {
  const processSteps = [
    { n: "01", label: "Apply", detail: "Send a pilot signal or email us directly." },
    { n: "02", label: "Scoping call", detail: "30-min call to map your operation to InaRelay workflows." },
    { n: "03", label: "30-day pilot", detail: "Live accounts, real resolution, measurable outcomes." },
    { n: "04", label: "Review", detail: "We show you what changed. You decide if it's worth scaling." },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-white">
      {/* Process strip */}
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500">How a pilot works</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.n} className="text-center">
              <span className="text-4xl font-extrabold text-teal-600 opacity-60">{step.n}</span>
              <h4 className="mt-2 text-base font-bold">{step.label}</h4>
              <p className="mt-1.5 text-sm text-slate-400">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 px-5 py-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#0d9488" />
              <circle cx="8" cy="16" r="3" fill="white" />
              <circle cx="24" cy="16" r="3" fill="white" />
              <path d="M11 16 Q16 8 21 16" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M11 16 Q16 24 21 16" stroke="#f59e0b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <circle cx="16" cy="16" r="2.5" fill="#f59e0b" />
            </svg>
            <span className="font-bold">InaRelay</span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <a href="mailto:adelekedare2012@gmail.com" className="transition hover:text-white">pilots@inarelay.com</a>
            <span>Lagos, Nigeria</span>
          </div>
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} InaRelay. Proprietary — all rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
