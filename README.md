# InaRelay MVP

Private Vercel MVP for validating the `InaRelay` exception-operations wedge with distributed-energy operators.

The first surface is intentionally narrow:

- portfolio queue for unresolved revenue-risk accounts
- account case timeline joining payment, support, field, and message evidence
- next-action and resolution workflow
- decision evidence checklist for verified, pending, and missing proof
- portfolio proof view for operations, finance, and verification reporting
- operator-fit view for PAYGo, mini-grid, appliance-finance, C&I, and after-sales prospects
- guided sample workflow for first-time visitors
- lightweight pilot-signal form with operator context
- server-side validation endpoint with optional webhook forwarding

Research and feature rationale live in:

- `docs/operator-research-and-mvp-features.md`

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

GitHub source:

```text
https://github.com/InaRelay/inarelay-mvp
```

Deploy from Vercel by importing the GitHub repository as a Next.js project. Use the default Vercel build settings:

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: Vercel default
- Node.js version: `24.x`

No production database credentials are required yet. The validation endpoint can forward pilot-signal submissions to a simple webhook while Supabase or Neon persistence is still pending.

Optional Vercel environment variables:

```text
VALIDATION_WEBHOOK_URL=https://your-webhook-endpoint.example
VALIDATION_WEBHOOK_SECRET=shared-secret-sent-as-x-inarelay-secret
NEXT_PUBLIC_APP_ENV=production
```

If `VALIDATION_WEBHOOK_URL` is unset, submissions are accepted and logged by the API route, but they are not durable. For a first deploy, a webhook from Google Apps Script, Make, Zapier, n8n, Slack workflow, or a small internal endpoint is enough to avoid losing validation signals.

## Validation Storage

The current `/api/validation-response` route accepts MVP validation submissions and can forward them to `VALIDATION_WEBHOOK_URL`. The next durable step is to connect the same route to Postgres tables:

- `mvp_demo_sessions`
- `mvp_validation_responses`
- `mvp_validation_events`

Use `.env.example` as the starting point for local environment variables. Do not expose database service-role credentials to client components.

## Scope Guardrail

This repo should stay focused on the MVP demo and validation loop. The main backend, integrations, workers, migrations, and production security architecture remain in `InaRelay/inarelay`.
