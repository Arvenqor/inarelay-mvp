export type CaseStatus = "open" | "awaiting_internal" | "resolved";
export type CasePriority = "urgent" | "high" | "medium";
export type ExceptionType = "payment" | "support" | "field" | "verification" | "onboarding";
export type EvidenceStatus = "verified" | "pending" | "missing";
export type OperatorSegmentId = "paygo" | "minigrid" | "ci" | "installer";

export type OperatorCase = {
  id: string;
  customerName: string;
  site: string;
  segment: string;
  wedge: ExceptionType;
  owner: string;
  priority: CasePriority;
  status: CaseStatus;
  amountAtRisk: string;
  age: string;
  daysAtRisk: number;
  recoverySignal: string;
  proofCompleteness: number;
  managementQuestion: string;
  rootCause: string;
  nextAction: string;
  due: string;
  channels: string[];
  evidenceChecklist: Array<{
    label: string;
    status: EvidenceStatus;
    owner: string;
    detail: string;
  }>;
  timeline: Array<{
    time: string;
    label: string;
    detail: string;
    source: string;
    tone: "payment" | "support" | "field" | "message" | "decision" | "verification" | "onboarding";
  }>;
};

// ─── Operator cases (unchanged) ─────────────────────────────────────────────

export const operatorCases: OperatorCase[] = [
  {
    id: "case-1042",
    customerName: "Adebisi Stores",
    site: "Mile 12 Market Cluster",
    segment: "MSME prepaid solar",
    wedge: "payment",
    owner: "Collections + Support",
    priority: "urgent",
    status: "open",
    amountAtRisk: "NGN 184,000",
    age: "6 days",
    daysAtRisk: 6,
    recoverySignal: "Payment proof exists, but service trust is unresolved",
    proofCompleteness: 64,
    managementQuestion: "Should collections hold restriction until repair proof lands?",
    rootCause: "Payment claim delayed while service fault is unresolved",
    nextAction: "Confirm bank evidence, hold restriction, assign field repair proof",
    due: "Today, 3:00 PM",
    channels: ["WhatsApp", "Bank transfer", "Field visit"],
    evidenceChecklist: [
      { label: "Customer payment proof", status: "verified", owner: "Support", detail: "Transfer screenshot received in WhatsApp and linked to the account." },
      { label: "Bank settlement match", status: "pending", owner: "Finance", detail: "Narration does not match expected customer reference." },
      { label: "Fault impact", status: "verified", owner: "Support", detail: "Intermittent relay trips recorded before the payment dispute." },
      { label: "Repair completion proof", status: "missing", owner: "Field Operations", detail: "Technician visit is logged, but no photo or customer confirmation exists." },
    ],
    timeline: [
      { time: "Apr 22, 09:18", label: "Customer says payment was made", detail: "Customer shared transfer screenshot, but finance has no matching settlement record.", source: "WhatsApp inbound", tone: "message" },
      { time: "Apr 22, 10:44", label: "Account flagged for arrears", detail: "Collections queue marked the account for follow-up after four unpaid service days.", source: "Portfolio aging", tone: "payment" },
      { time: "Apr 23, 15:10", label: "Service issue linked", detail: "Customer reported intermittent relay trips and requested billing pause until repair.", source: "Support ticket", tone: "support" },
      { time: "Apr 24, 13:35", label: "Field visit incomplete", detail: "Technician visited but did not upload repair proof or customer confirmation.", source: "Field note", tone: "field" },
      { time: "Now", label: "Recommended next action", detail: "Resolve payment evidence first, then require field repair proof before collections action.", source: "InaRelay workflow", tone: "decision" },
    ],
  },
  {
    id: "case-0977",
    customerName: "Hopewell Pharmacy",
    site: "Lekki Phase 1",
    segment: "Commercial solar lease",
    wedge: "payment",
    owner: "Finance",
    priority: "high",
    status: "awaiting_internal",
    amountAtRisk: "NGN 92,500",
    age: "3 days",
    daysAtRisk: 3,
    recoverySignal: "Likely recoverable after reference match",
    proofCompleteness: 72,
    managementQuestion: "How many lease accounts are aging because payment references do not reconcile?",
    rootCause: "Payment reference mismatch across bank portal and customer account",
    nextAction: "Finance to reconcile transfer narration and update account ledger",
    due: "Tomorrow, 11:00 AM",
    channels: ["Bank portal", "Spreadsheet", "WhatsApp"],
    evidenceChecklist: [
      { label: "Expected invoice reference", status: "verified", owner: "Finance", detail: "Invoice and expected account reference are linked." },
      { label: "Bank export row", status: "pending", owner: "Finance", detail: "Bank portal export is needed before credit can be applied." },
      { label: "Customer acknowledgement", status: "verified", owner: "Support", detail: "Customer shared the transfer time and sender account name." },
      { label: "Ledger correction note", status: "missing", owner: "Finance Lead", detail: "No internal note yet explaining the correction decision." },
    ],
    timeline: [
      { time: "Apr 23, 08:21", label: "Overdue balance detected", detail: "Portfolio report shows lease account aging beyond grace window.", source: "Receivables view", tone: "payment" },
      { time: "Apr 23, 09:40", label: "Customer shared proof", detail: "Transfer narration does not match expected customer account reference.", source: "WhatsApp inbound", tone: "message" },
      { time: "Apr 24, 16:12", label: "Internal review requested", detail: "Finance lead asked for bank export before applying credit.", source: "Operator note", tone: "decision" },
    ],
  },
  {
    id: "case-0831",
    customerName: "Northline Cold Room",
    site: "Kano Cold Storage Hub",
    segment: "Productive-use energy",
    wedge: "support",
    owner: "Field Operations",
    priority: "medium",
    status: "open",
    amountAtRisk: "NGN 310,000",
    age: "11 days",
    daysAtRisk: 11,
    recoverySignal: "Repayment depends on verified restoration and stock-loss trust",
    proofCompleteness: 51,
    managementQuestion: "Are repeat outages turning productive-use customers into arrears?",
    rootCause: "Repeat outage affecting willingness to pay and reported load use",
    nextAction: "Confirm repair, ask customer to confirm restoration, then reset recovery plan",
    due: "Apr 27, 12:00 PM",
    channels: ["Support", "Field visit", "Portfolio review"],
    evidenceChecklist: [
      { label: "Usage drop signal", status: "verified", owner: "Operations", detail: "Operator import shows daytime load dropped after the reported fault." },
      { label: "Customer loss note", status: "pending", owner: "Support", detail: "Customer says cold-room downtime caused stock loss." },
      { label: "Technician repair proof", status: "pending", owner: "Field Operations", detail: "Technician marked repaired, but supporting proof is thin." },
      { label: "Restoration confirmation", status: "missing", owner: "Customer Success", detail: "No customer confirmation after the field visit." },
    ],
    timeline: [
      { time: "Apr 15, 12:00", label: "Usage dropped sharply", detail: "Daytime productive-use load fell after reported inverter fault.", source: "Operator import", tone: "field" },
      { time: "Apr 16, 17:45", label: "Customer stopped payment", detail: "Customer says cold room downtime caused stock loss and rejected next invoice.", source: "Support note", tone: "support" },
      { time: "Apr 25, 10:05", label: "Resolution needs confirmation", detail: "Technician marked repaired, but customer has not confirmed service restoration.", source: "InaRelay workflow", tone: "decision" },
    ],
  },
  {
    id: "case-0714",
    customerName: "Ire Market Mini-Grid",
    site: "Oyo Rural Trading Cluster",
    segment: "Mini-grid verification",
    wedge: "verification",
    owner: "Program Reporting",
    priority: "high",
    status: "awaiting_internal",
    amountAtRisk: "NGN 1.8m grant claim",
    age: "9 days",
    daysAtRisk: 9,
    recoverySignal: "Claim is blocked by missing connection and consumption evidence",
    proofCompleteness: 58,
    managementQuestion: "Can we submit this site for verification without another field scramble?",
    rootCause: "Connection evidence is split across meter export, field photos, and phone verification notes",
    nextAction: "Attach meter activity export, reconcile customer list, then prepare IVA evidence pack",
    due: "Apr 30, 4:00 PM",
    channels: ["Meter export", "Field photos", "Program portal"],
    evidenceChecklist: [
      { label: "Connection list", status: "verified", owner: "Program Reporting", detail: "Target connections are uploaded from the site onboarding sheet." },
      { label: "Meter activity export", status: "pending", owner: "Meter Operations", detail: "Consumption above 0 kWh must be attached for claimed connections." },
      { label: "Phone verification notes", status: "missing", owner: "Customer Success", detail: "No call outcome record yet for customers selected for verification." },
      { label: "Field photo packet", status: "pending", owner: "Field Operations", detail: "Photos exist, but they are not mapped to customer IDs." },
    ],
    timeline: [
      { time: "Apr 18, 14:20", label: "Claim draft started", detail: "Program team grouped 76 connections for a milestone review.", source: "Program tracker", tone: "verification" },
      { time: "Apr 20, 09:05", label: "Meter evidence incomplete", detail: "Export only covers 48 of 76 claimed connections with recent activity.", source: "Meter import", tone: "field" },
      { time: "Apr 23, 16:30", label: "Phone verification gap", detail: "Support team could not show call outcomes for sampled customers.", source: "Verification review", tone: "message" },
      { time: "Now", label: "Recommended next action", detail: "Build an evidence pack before submitting the grant claim for IVA review.", source: "InaRelay workflow", tone: "decision" },
    ],
  },
  {
    id: "case-0622",
    customerName: "Agent cohort 24-B",
    site: "South West EasyBuy route",
    segment: "PAYGo onboarding quality",
    wedge: "onboarding",
    owner: "Sales Ops + Customer Care",
    priority: "medium",
    status: "open",
    amountAtRisk: "NGN 740,000 cohort PAR",
    age: "34 days",
    daysAtRisk: 34,
    recoverySignal: "Early-life repayment drift is concentrated under two agents",
    proofCompleteness: 46,
    managementQuestion: "Which agents are creating customers who do not understand the contract?",
    rootCause: "New customers missed early touchpoints and show poor contract-term understanding",
    nextAction: "Run onboarding check, tag vulnerable accounts, coach agents by cohort outcome",
    due: "May 2, 10:00 AM",
    channels: ["Agent route", "Call center", "Repayment cohort"],
    evidenceChecklist: [
      { label: "Agent attribution", status: "verified", owner: "Sales Ops", detail: "Accounts are mapped to the selling agent and route." },
      { label: "Contract understanding check", status: "missing", owner: "Customer Care", detail: "No evidence that customers understand remaining balance or payment duration." },
      { label: "Early touchpoint outcome", status: "pending", owner: "Call Center", detail: "Only 38 percent of accounts have a completed first-month call outcome." },
      { label: "Agent coaching record", status: "missing", owner: "Sales Manager", detail: "No follow-up action is tied to the low-quality cohort." },
    ],
    timeline: [
      { time: "Mar 26, 11:00", label: "Cohort activated", detail: "New PAYGo customers were onboarded through three field agents.", source: "Sales import", tone: "onboarding" },
      { time: "Apr 12, 08:40", label: "Payment drift detected", detail: "Several accounts paid for less than half of expected service days.", source: "Repayment cohort", tone: "payment" },
      { time: "Apr 19, 15:25", label: "Touchpoint coverage weak", detail: "Call center completed fewer early-life checks than the portfolio policy requires.", source: "Call outcomes", tone: "support" },
      { time: "Now", label: "Recommended next action", detail: "Prioritize education calls, then tie agent coaching to cohort repayment quality.", source: "InaRelay workflow", tone: "decision" },
    ],
  },
];

// ─── Portfolio signals ────────────────────────────────────────────────────────

export const portfolioSignals = [
  { label: "Revenue or claim value at risk", value: "NGN 3.12m", detail: "Across payment disputes, support-linked arrears, and one grant claim blocker" },
  { label: "Evidence gaps blocking decisions", value: "11", detail: "Missing bank matches, repair proof, call outcomes, and verification artifacts" },
  { label: "Support-linked repayment risk", value: "43%", detail: "Share of sample value where a fault or service issue affects willingness to pay" },
  { label: "Cases with clear next owner", value: "5 / 5", detail: "Every unresolved case has a named team and due time" },
];

// ─── Root cause summary ───────────────────────────────────────────────────────

export const rootCauseSummary = [
  { type: "payment", label: "Payment confirmation", count: 2, value: "NGN 276.5k", trend: "Daily operator pain", detail: "Proof exists, but finance cannot safely credit the account yet." },
  { type: "support", label: "Support-linked arrears", count: 1, value: "NGN 310k", trend: "Trust risk", detail: "Service faults are changing the repayment conversation." },
  { type: "verification", label: "Verification evidence", count: 1, value: "NGN 1.8m", trend: "Program risk", detail: "Grant claim depends on connection, meter, phone, and field proof." },
  { type: "onboarding", label: "Onboarding quality", count: 1, value: "NGN 740k", trend: "Cohort risk", detail: "Bad early-life follow-up is turning into portfolio quality decay." },
] satisfies Array<{ type: ExceptionType; label: string; count: number; value: string; trend: string; detail: string }>;

// ─── Reporting packs ──────────────────────────────────────────────────────────

export const reportingPacks = [
  { id: "weekly-ops", label: "Weekly operator review", audience: "COO / Head of Ops", cadence: "Every Monday", metrics: ["At-risk value by root cause", "Cases past SLA", "Recovery outcomes", "Owner backlog"], missingEvidence: "Needs outcome notes on 3 cases before export" },
  { id: "finance", label: "Finance recovery pack", audience: "Finance / Lender update", cadence: "Monthly", metrics: ["Receivables aging", "Recovered value", "Payment disputes", "Restructured accounts"], missingEvidence: "Needs bank export attachment for reference mismatch accounts" },
  { id: "verification", label: "Verification evidence pack", audience: "Program / Grant review", cadence: "Per claim", metrics: ["Connection list", "Meter activity", "Phone verification", "Field evidence"], missingEvidence: "Needs mapped field photos and phone call outcomes" },
];

// ─── Operator segments ────────────────────────────────────────────────────────

export const operatorSegments = [
  {
    id: "paygo-shs",
    shortName: "PAYGo Solar",
    name: "PAYGo solar home operators",
    painHeadline: "Collections pressure is daily. Evidence is scattered. Recovery is guesswork.",
    examples: ["Sun King Nigeria", "Lumos Nigeria", "Izili / Baobab+"],
    acutePain: "Repayment drift, payment code confusion, agent quality decay, support-linked arrears, and early-life onboarding gaps all hit the same portfolio. Most teams are chasing evidence across WhatsApp, spreadsheets, and bank portals — with no single place to see what is actually happening on an account.",
    proof: "InaRelay joins payment proof, support faults, agent history, and repayment cohort data into one account view. Your collections team acts on facts, not guesses — and every decision is logged for management, finance, and lender reporting.",
    mvpFeatures: ["Payment exception desk", "Onboarding quality checks", "Agent cohort attribution", "Support-linked billing pause"],
  },
  {
    id: "productive-use",
    shortName: "Financed Appliances",
    name: "Financed appliance and productive-use providers",
    painHeadline: "Repayment depends on uptime. Broken equipment equals broken cash flow.",
    examples: ["Koolboks", "Cold-chain providers", "MSME energy operators"],
    acutePain: "When a cold room or productive-use appliance goes down, customers stop paying. Collections cannot be treated as a pure reminder problem. Your team needs to see asset support history, fault timeline, and payment status on the same account — before deciding the next action.",
    proof: "InaRelay links equipment fault events to payment status, logs repair proof, and records customer confirmation. Recovery actions are based on the full picture — not just an overdue balance.",
    mvpFeatures: ["Service-to-payment timeline", "Repair proof logging", "Customer confirmation workflow", "Recovery plan tracking"],
  },
  {
    id: "mini-grid",
    shortName: "Mini-Grid",
    name: "Mini-grid developers",
    painHeadline: "Grant claims get blocked by evidence your team cannot quickly assemble.",
    examples: ["Prado Power", "Nayo Tropical Technology", "Husk Power Systems"],
    acutePain: "DARES, NEP, and grant programs require connection lists, meter activity, phone verification, field photos, and milestone evidence — often due at the same time. Most mini-grid teams scramble to assemble this across exports, WhatsApp groups, and call center spreadsheets, every single claim cycle.",
    proof: "InaRelay builds an audit-ready evidence pack for each grant milestone — connection status, meter activity, phone call outcomes, and field evidence mapped to customer IDs. One pack, ready before the deadline, instead of a last-minute scramble.",
    mvpFeatures: ["Verification pack builder", "Site exception queue", "Meter evidence status", "DARES / program reporting"],
  },
  {
    id: "ci",
    shortName: "C&I Energy",
    name: "C&I and energy-as-a-service providers",
    painHeadline: "Receivables aging is eroding your contract margins silently.",
    examples: ["Daystar Power", "Rensource Energy", "Arnergy"],
    acutePain: "Long-term service contracts need clean account health, SLA evidence, receivables visibility, and management reporting. Fragmented support and billing workflows create delays between when something goes wrong and when finance knows about it.",
    proof: "InaRelay shows contract account health — payment status, support events, SLA exposure, and owner — so management reporting takes minutes, not days. Every account has a named owner and a next action.",
    mvpFeatures: ["Receivables aging view", "SLA evidence trail", "Contract account health", "Management report export"],
  },
  {
    id: "installers",
    shortName: "Installers",
    name: "Solar installers and after-sales teams",
    painHeadline: "Technician notes do not close payment disputes or protect warranties.",
    examples: ["JRB Solar", "Regional EPC teams", "After-sales maintenance operators"],
    acutePain: "Most installation teams have no structured follow-up after a job is done. Warranty disputes arise when there is no evidence of what the technician did, whether the customer confirmed restoration, or what the support history looks like.",
    proof: "InaRelay logs repair visits, captures photo proof, confirms restoration with the customer, and links every field event to the account timeline — automatically. Every warranty claim or dispute has a paper trail.",
    mvpFeatures: ["After-sales case desk", "Technician proof logging", "Warranty evidence trail", "Customer confirmation"],
  },
];


// ─── Resolution outcomes ──────────────────────────────────────────────────────

export const resolutionOutcomes = [
  "Bank evidence matched",
  "Billing pause approved",
  "Repair proof requested",
  "Customer confirmation needed",
  "Recovery plan reset",
  "Verification pack prepared",
];

// ─── Validation questions (Layer 3 — full form, 11 questions) ─────────────────

export const validationQuestions = [
  { id: "operator-type", label: "Which operator profile is closest to you?", options: ["PAYGo solar", "Mini-grid developer", "Financed appliance", "C&I energy service", "Installer / after-sales", "Investor / program partner"] },
  { id: "team-role", label: "Which team would own this workflow?", options: ["Operations", "Collections", "Support", "Field", "Finance", "Management"] },
  { id: "workflow-match", label: "Which workflow is closest to your current pain?", options: ["Payment exception", "Support-linked arrears", "Portfolio reporting", "Verification evidence", "Not sure yet"] },
  { id: "frequency", label: "How often does this happen in your operation?", options: ["Daily", "Weekly", "Monthly", "Rarely"] },
  { id: "current-tool", label: "Where is this handled today?", options: ["WhatsApp", "Spreadsheet", "Bank portal", "CRM/ticketing", "Internal app"] },
  { id: "current-owner", label: "Where does ownership usually break?", options: ["Finance", "Support", "Field team", "Agent manager", "Management review", "No clear owner"] },
  { id: "pilot-proof", label: "What would make this worth piloting?", options: ["Faster resolution", "Better recovery visibility", "Cleaner management reporting", "Less support back-and-forth", "Audit-ready evidence"] },
  { id: "pilot-blocker", label: "What would block an internal pilot?", options: ["Data access", "Integration effort", "Team adoption", "Security review", "Unclear ROI", "Budget timing"] },
  // ── 3 new research-backed questions ──
  { id: "grant-program", label: "Are any of your sites in a DARES, NEP, or other grant / RBF program?", options: ["Yes, actively", "No, but planning to apply", "No"] },
  { id: "cost-of-delay", label: "What does it cost when an exception sits unresolved for 30 days?", options: ["Under NGN 50k", "NGN 50k – 200k", "Over NGN 200k", "Hard to estimate"] },
  { id: "pilot-intent", label: "Would you share 10–20 real accounts for a 30-day pilot?", options: ["Yes, let's talk", "Need internal approval first", "After I see more", "Not right now"] },
];

// ─── Layer 1: Inline pulse (3 behavioral questions shown after the demo) ──────

export const inlinePulseQuestions = [
  { id: "recognition", label: "Does this account look like something your team handled in the last 30 days?", options: ["Yes, exactly this", "Something similar", "Not really", "Different operator type"] },
  { id: "highest-value", label: "Which part would reduce the most back-and-forth in your operation?", options: ["Payment proof matching", "Field repair evidence", "Portfolio visibility", "Evidence for management or lenders"] },
  { id: "today-tool", label: "Where does your team handle this type of case today?", options: ["WhatsApp threads", "Spreadsheet + email", "Nothing consistent", "Internal app or CRM"] },
];

// ─── Layer 2: Segment fast-track (2 contextual questions at Operator Fit) ─────

export const segmentFastTrackQuestions = [
  { id: "monthly-volume", label: "How many exception cases like these does your team handle per month?", options: ["Fewer than 20", "20 – 100", "100 – 500", "More than 500"] },
  { id: "reporting-obligation", label: "Do you prepare receivables or evidence reports for lenders, donors, or grant programs?", options: ["Yes, regularly", "Sometimes", "Not yet, but we should", "No"] },
];

// ─── Segment hero data (for the segment switcher on the hero) ─────────────────

export const segmentHeroData: Record<OperatorSegmentId, {
  headline: string;
  subtext: string;
  stat: string;
  statSource: string;
  pains: string[];
  ctaLabel: string;
}> = {
  paygo: {
    headline: "Your collections team cannot see why accounts are drifting. InaRelay can.",
    subtext: "Join payment proof, support faults, agent history, and repayment cohort data in one account view — so your team acts on facts, not guesses.",
    stat: "40% of PAYGo customers struggle to repay as time on book increases",
    statSource: "GOGLA Keeping the Lights On, 2025",
    pains: ["Payment code confusion", "Agent quality drift", "Support-linked arrears"],
    ctaLabel: "See how PAYGo operators resolve payment drift",
  },
  minigrid: {
    headline: "DARES evidence should not live in your WhatsApp group.",
    subtext: "Build connection evidence packs, meter activity exports, and phone verification records in one place — audit-ready before your next disbursement deadline.",
    stat: "Mini-grid developers face 3–5 separate evidence requests per grant milestone",
    statSource: "REA / DARES mini-grid verification process",
    pains: ["Verification scrambles", "Meter evidence gaps", "Grant claim delays"],
    ctaLabel: "See how mini-grid developers build audit-ready packs",
  },
  ci: {
    headline: "Receivables aging is eroding your contract margins.",
    subtext: "See every contract account's payment status, support events, SLA exposure, and owner — so management reporting takes minutes, not days.",
    stat: "Fragmented support-billing workflows cause average 8-day exception resolution delays",
    statSource: "InaRelay operator research, 2026",
    pains: ["SLA evidence gaps", "Receivables visibility", "Management reporting lag"],
    ctaLabel: "See how C&I operators clean up contract account health",
  },
  installer: {
    headline: "Technician notes do not close payment disputes.",
    subtext: "Log repair visits, collect photo proof, confirm restoration with customers, and link every field event to the account timeline — automatically.",
    stat: "60% of installers have no structured post-installation follow-up workflow",
    statSource: "GOGLA Consumer Protection Code research, 2025",
    pains: ["Warranty dispute risk", "Repair proof gaps", "Customer communication breakdown"],
    ctaLabel: "See how installation teams protect revenue with evidence",
  },
};

// ─── Research-backed problem stats ────────────────────────────────────────────

export const problemStats = [
  { stat: "40%", detail: "of PAYGo customers struggle to repay as time on book grows", source: "GOGLA, 2025" },
  { stat: "2 in 5", detail: "operators do not verify customer understanding of key contract terms", source: "GOGLA Consumer Protection" },
  { stat: "NGN 1.8m", detail: "average grant claim blocked by missing connection or meter evidence", source: "InaRelay demo data" },
  { stat: "43%", detail: "of at-risk value involves an unresolved service fault affecting repayment", source: "InaRelay research" },
];

// ─── WhatsApp mock thread ─────────────────────────────────────────────────────

export const whatsappThread = [
  { from: "customer" as const, text: "Please my payment I sent yesterday abi my light no dey come on again", time: "09:14" },
  { from: "operator" as const, text: "We got your message. Checking your account now — give us 5 minutes.", time: "09:16" },
  { from: "system" as const, text: "InaRelay: Payment reference matched. Relay trip fault detected on same account. Support ticket auto-created and linked.", time: "09:16" },
  { from: "operator" as const, text: "Your payment of NGN 8,500 is confirmed and applied. We also noticed a relay trip — our field team will call you today to confirm the fix.", time: "09:18" },
  { from: "customer" as const, text: "Aahhh okay thank you! My light don come on now 🙏", time: "09:32" },
];

// ─── Pilot tiers ──────────────────────────────────────────────────────────────

export const pilotTiers = [
  {
    name: "Discovery Pilot",
    duration: "30 days",
    scope: "Up to 200 accounts",
    price: "Free",
    priceNote: "No commitment",
    includes: ["Exception desk setup", "Sample case seeding from your data", "2 validation review calls"],
    ideal: "Operators wanting to test fit before committing",
    cta: "Apply for a discovery pilot",
  },
  {
    name: "Operations Pilot",
    duration: "60 days",
    scope: "Up to 1,000 accounts",
    price: "NGN 250k / mo",
    priceNote: "Waived if pilot fails to show value",
    includes: ["Full exception ops + portfolio view", "Collections + support workflow", "Weekly review call", "Management report export"],
    ideal: "Operators ready to move cases off spreadsheets",
    cta: "Start an operations pilot",
  },
  {
    name: "Enterprise Pilot",
    duration: "90 days",
    scope: "Unlimited accounts",
    price: "Custom",
    priceNote: "Tailored to operator scale",
    includes: ["All features", "Verification pack builder", "Lender / grant reporting exports", "Dedicated pilot support"],
    ideal: "Mini-grid and grant-backed operators with reporting obligations",
    cta: "Book a scoping call",
  },
];

// ─── Ageing buckets (for receivables SVG bar chart) ───────────────────────────

export const ageingBuckets = [
  { label: "0–7 days", value: 840, pct: 27, color: "#f59e0b" },
  { label: "8–14 days", value: 620, pct: 20, color: "#f97316" },
  { label: "15–30 days", value: 980, pct: 31, color: "#ef4444" },
  { label: "31–60 days", value: 460, pct: 15, color: "#b91c1c" },
  { label: "60+ days", value: 220, pct: 7, color: "#7f1d1d" },
];
