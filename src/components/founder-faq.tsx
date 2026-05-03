"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Are you selling solar hardware?",
    answer: "No. InaRelay is purely a software and workflow layer. We provide the operational infrastructure to help you manage customer exceptions, but we do not sell panels, batteries, or act as an installer."
  },
  {
    question: "Why use WhatsApp as the main channel?",
    answer: "Because it's where your customers already are. PwC's 2024 MSME survey found that 88% of MSMEs in Nigeria use smartphones, and 23% already use WhatsApp Business. It's the most practical communication rail for resolving exceptions quickly."
  },
  {
    question: "Is WhatsApp the whole product?",
    answer: "No, WhatsApp is only the customer-facing delivery rail. The actual InaRelay product is the backend workflow engine: a unified API, an exception-resolution dashboard, and the logic that links payments to support tickets."
  },
  {
    question: "What does a pilot look like?",
    answer: "We keep it low-risk. A typical 30-day pilot focuses on just one exception queue (e.g., delayed payment confirmations) for a single team or region. The goal is to prove a measurable reduction in manual exception handling before expanding."
  }
];

export function FounderFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 lg:py-24 border-t border-slate-100">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Common questions
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Straight answers about how InaRelay works with your existing operations.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`rounded-2xl border transition-colors ${openIndex === i ? 'border-teal-200 bg-teal-50/30' : 'border-slate-200 bg-white hover:border-slate-300'}`}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-base font-bold text-slate-900">{faq.question}</span>
                <span className="ml-4 shrink-0 text-slate-400">
                  {openIndex === i ? <Minus className="h-5 w-5 text-teal-600" /> : <Plus className="h-5 w-5" />}
                </span>
              </button>
              
              {openIndex === i && (
                <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed motion-reveal">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
