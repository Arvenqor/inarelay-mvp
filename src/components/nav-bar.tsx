"use client";

import Image from "next/image";
import { OperatorSegmentId } from "@/lib/demo-data";

const segments: Array<{ id: OperatorSegmentId; label: string }> = [
  { id: "paygo", label: "PAYGo Solar" },
  { id: "minigrid", label: "Mini-Grid" },
  { id: "ci", label: "C&I" },
  { id: "installer", label: "Installer" },
];

function InaRelayLogo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/assets/inarelay-logo.png"
        alt="InaRelay logo"
        width={120}
        height={40}
        className="h-9 w-auto"
        priority
      />
    </div>
  );
}

export function NavBar({
  activeSegment,
  onSegmentChange,
  onPilotClick,
}: {
  activeSegment: OperatorSegmentId;
  onSegmentChange: (id: OperatorSegmentId) => void;
  onPilotClick: () => void;
}) {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <InaRelayLogo />

        <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1 sm:flex">
          {segments.map((seg) => (
            <button
              key={seg.id}
              type="button"
              onClick={() => onSegmentChange(seg.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                activeSegment === seg.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-white hover:text-slate-900"
              }`}
            >
              {seg.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onPilotClick}
          className="min-h-9 rounded-lg bg-teal-600 px-4 text-sm font-semibold text-white transition hover:bg-teal-500"
        >
          Book a pilot call
        </button>
      </div>
    </nav>
  );
}
