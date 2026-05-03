"use client";

import { whatsappThread } from "@/lib/demo-data";

export function WhatsAppSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-700">
              WhatsApp-native operations
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Your customers are already on WhatsApp. InaRelay meets them there.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              When a customer sends a payment complaint, InaRelay's AI parsing layer reads the message, matches the payment reference, checks for linked service faults, and auto-creates a structured ticket — without your support team having to chase context.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: "🧠", label: "AI ticket parsing", detail: "Informal messages become structured case records automatically" },
                { icon: "🔗", label: "Payment + fault linking", detail: "Payment disputes are cross-referenced with open service tickets" },
                { icon: "📲", label: "Operator messaging rail", detail: "Send billing updates, repair confirmations, and balance alerts via WhatsApp" },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-900">{item.label}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-3xl border-4 border-slate-900 bg-[#ece5dd] shadow-2xl">
              {/* Phone header */}
              <div className="flex items-center gap-3 bg-teal-700 px-4 py-3 text-white">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-sm font-bold">A</div>
                <div>
                  <p className="text-sm font-semibold">Adebisi Stores</p>
                  <p className="text-[11px] text-teal-200">InaRelay — online</p>
                </div>
              </div>
              {/* Chat bubbles */}
              <div className="space-y-3 p-4">
                {whatsappThread.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.from === "customer" ? "justify-start" : msg.from === "system" ? "justify-center" : "justify-end"}`}
                  >
                    {msg.from === "system" ? (
                      <div className="wa-bubble-system max-w-[85%] px-3 py-2">
                        <p className="text-[11px] font-semibold text-emerald-700">{msg.text}</p>
                      </div>
                    ) : (
                      <div className={`max-w-[80%] px-3 py-2 ${msg.from === "customer" ? "wa-bubble-in" : "wa-bubble-out"}`}>
                        <p className="text-[13px] leading-5 text-slate-900">{msg.text}</p>
                        <p className="mt-1 text-right text-[10px] text-slate-500">{msg.time}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-slate-500">Simulated exchange — not a live account</p>
          </div>
        </div>
      </div>
    </section>
  );
}
