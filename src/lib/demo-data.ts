export type CaseStatus = "open" | "awaiting_internal" | "resolved";

export type CasePriority = "urgent" | "high" | "medium";

export type OperatorCase = {
  id: string;
  customerName: string;
  site: string;
  segment: string;
  owner: string;
  priority: CasePriority;
  status: CaseStatus;
  amountAtRisk: string;
  age: string;
  rootCause: string;
  nextAction: string;
  due: string;
  channels: string[];
  timeline: Array<{
    time: string;
    label: string;
    detail: string;
    source: string;
    tone: "payment" | "support" | "field" | "message" | "decision";
  }>;
};

export const operatorCases: OperatorCase[] = [
  {
    id: "case-1042",
    customerName: "Adebisi Stores",
    site: "Mile 12 Market Cluster",
    segment: "MSME prepaid solar",
    owner: "Collections + Support",
    priority: "urgent",
    status: "open",
    amountAtRisk: "NGN 184,000",
    age: "6 days",
    rootCause: "Payment claim delayed while service fault is unresolved",
    nextAction: "Confirm bank evidence, hold restriction, assign field repair proof",
    due: "Today, 3:00 PM",
    channels: ["WhatsApp", "Bank transfer", "Field visit"],
    timeline: [
      {
        time: "Apr 22, 09:18",
        label: "Customer says payment was made",
        detail: "Customer shared transfer screenshot, but finance has no matching settlement record.",
        source: "WhatsApp inbound",
        tone: "message",
      },
      {
        time: "Apr 22, 10:44",
        label: "Account flagged for arrears",
        detail: "Collections queue marked the account for follow-up after four unpaid service days.",
        source: "Portfolio aging",
        tone: "payment",
      },
      {
        time: "Apr 23, 15:10",
        label: "Service issue linked",
        detail: "Customer reported intermittent relay trips and requested billing pause until repair.",
        source: "Support ticket",
        tone: "support",
      },
      {
        time: "Apr 24, 13:35",
        label: "Field visit incomplete",
        detail: "Technician visited but did not upload repair proof or customer confirmation.",
        source: "Field note",
        tone: "field",
      },
      {
        time: "Now",
        label: "Recommended next action",
        detail: "Resolve payment evidence first, then require field repair proof before collections action.",
        source: "InaRelay workflow",
        tone: "decision",
      },
    ],
  },
  {
    id: "case-0977",
    customerName: "Hopewell Pharmacy",
    site: "Lekki Phase 1",
    segment: "Commercial solar lease",
    owner: "Finance",
    priority: "high",
    status: "awaiting_internal",
    amountAtRisk: "NGN 92,500",
    age: "3 days",
    rootCause: "Payment reference mismatch across bank portal and customer account",
    nextAction: "Finance to reconcile transfer narration and update account ledger",
    due: "Tomorrow, 11:00 AM",
    channels: ["Bank portal", "Spreadsheet", "WhatsApp"],
    timeline: [
      {
        time: "Apr 23, 08:21",
        label: "Overdue balance detected",
        detail: "Portfolio report shows lease account aging beyond grace window.",
        source: "Receivables view",
        tone: "payment",
      },
      {
        time: "Apr 23, 09:40",
        label: "Customer shared proof",
        detail: "Transfer narration does not match expected customer account reference.",
        source: "WhatsApp inbound",
        tone: "message",
      },
      {
        time: "Apr 24, 16:12",
        label: "Internal review requested",
        detail: "Finance lead asked for bank export before applying credit.",
        source: "Operator note",
        tone: "decision",
      },
    ],
  },
  {
    id: "case-0831",
    customerName: "Northline Cold Room",
    site: "Kano Cold Storage Hub",
    segment: "Productive-use energy",
    owner: "Field Operations",
    priority: "medium",
    status: "open",
    amountAtRisk: "NGN 310,000",
    age: "11 days",
    rootCause: "Repeat outage affecting willingness to pay and reported load use",
    nextAction: "Confirm repair, ask customer to confirm restoration, then reset recovery plan",
    due: "Apr 27, 12:00 PM",
    channels: ["Support", "Field visit", "Portfolio review"],
    timeline: [
      {
        time: "Apr 15, 12:00",
        label: "Usage dropped sharply",
        detail: "Daytime productive-use load fell after reported inverter fault.",
        source: "Operator import",
        tone: "field",
      },
      {
        time: "Apr 16, 17:45",
        label: "Customer stopped payment",
        detail: "Customer says cold room downtime caused stock loss and rejected next invoice.",
        source: "Support note",
        tone: "support",
      },
      {
        time: "Apr 25, 10:05",
        label: "Resolution needs confirmation",
        detail: "Technician marked repaired, but customer has not confirmed service restoration.",
        source: "InaRelay workflow",
        tone: "decision",
      },
    ],
  },
];

export const validationQuestions = [
  {
    id: "workflow-match",
    label: "Which workflow is closest to your current pain?",
    options: [
      "Payment exception",
      "Support-linked arrears",
      "Portfolio reporting",
      "Verification evidence",
      "Not sure yet",
    ],
  },
  {
    id: "frequency",
    label: "How often does this happen in your operation?",
    options: ["Daily", "Weekly", "Monthly", "Rarely"],
  },
  {
    id: "current-tool",
    label: "Where is this handled today?",
    options: ["WhatsApp", "Spreadsheet", "Bank portal", "CRM/ticketing", "Internal app"],
  },
  {
    id: "pilot-proof",
    label: "What would make this worth piloting?",
    options: [
      "Faster resolution",
      "Better recovery visibility",
      "Cleaner management reporting",
      "Less support back-and-forth",
      "Audit-ready evidence",
    ],
  },
];
