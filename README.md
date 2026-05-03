# InaRelay MVP

High-fidelity operator-facing validation tool for the `InaRelay` exception-operations wedge. This MVP is designed to secure pilot commitments from distributed-energy operators (PAYGo, Mini-grid, C&I, and Installers) by demonstrating a structured, evidence-based approach to account resolution.

## Key Features

- **Segment-Specific Positioning**: Tailored messaging and stats for diverse operator segments.
- **Portfolio Visibility**: Real-time queue for unresolved revenue-risk accounts.
- **Evidence-Linked Timelines**: Integration of payment, support, and field data into a single case view.
- **Multi-Layer Validation**: Integrated pulse surveys and pilot-intent capture.
- **Founder FAQ**: Direct answers to common operator objections regarding risk and integration.

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

## Deployment

Deploy from Vercel by importing the GitHub repository as a Next.js project.

- Node.js version: `24.x`
- Framework Preset: Next.js

### Environment Variables

| Variable | Description |
|----------|-------------|
| `VALIDATION_WEBHOOK_URL` | Endpoint to forward validation submissions (e.g., Slack, Zapier, n8n) |
| `VALIDATION_WEBHOOK_SECRET` | Secret sent as `x-inarelay-secret` header for verification |
| `NEXT_PUBLIC_APP_ENV` | Set to `production` for production builds |

## Validation Storage

The `/api/validation-response` route accepts submissions and forwards them to the configured webhook. This enables rapid iteration on validation signals without requiring a dedicated database in the early pilot phase. For long-term persistence, this route is designed to be easily swapped with a Postgres-backed service (Supabase/Neon).

## Scope Guardrail

This repository is dedicated to the MVP validation loop. Core backend infrastructure, migrations, and production security architecture are maintained in the primary `InaRelay/inarelay` repository.
