"use client";

import { useState } from "react";
import { OperatorSegmentId } from "@/lib/demo-data";
import { NavBar } from "@/components/nav-bar";
import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { DemoWorkspace } from "@/components/demo-workspace";
import { InlinePulse } from "@/components/inline-pulse";
import { WhatsAppSection } from "@/components/whatsapp-section";
import { ConversionSection } from "@/components/conversion-section";
import { FounderFAQ } from "@/components/founder-faq";
import { Footer } from "@/components/footer";
import { operatorCases } from "@/lib/demo-data";

export function InaRelayMvp() {
  const [activeSegment, setActiveSegment] = useState<OperatorSegmentId>("minigrid");
  const [activeView, setActiveView] = useState<string>("case");
  const [selectedCaseId] = useState(operatorCases[0].id);

  const selectedCase = operatorCases.find((c) => c.id === selectedCaseId) ?? operatorCases[0];

  function scrollToDemo() {
    document.getElementById("demo-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scrollToPortfolio() {
    setActiveView("portfolio");
    document.getElementById("demo-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scrollToPilot() {
    document.getElementById("pilot-signal")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <NavBar
        activeSegment={activeSegment}
        onSegmentChange={setActiveSegment}
        onPilotClick={scrollToPilot}
      />
      <HeroSection
        activeSegment={activeSegment}
        onDemoClick={scrollToDemo}
        onPortfolioClick={scrollToPortfolio}
      />
      <ProblemSection />
      <DemoWorkspace />
      <InlinePulse />
      <WhatsAppSection />
      <FounderFAQ />
      <ConversionSection selectedCase={selectedCase} activeView={activeView} />
      <Footer />
    </main>
  );
}
