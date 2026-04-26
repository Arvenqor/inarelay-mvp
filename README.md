# InaRelay MVP

Private Vercel MVP for validating the `InaRelay` exception-operations wedge with distributed-energy operators.

The first surface is intentionally narrow:

- portfolio queue for unresolved revenue-risk accounts
- account case timeline joining payment, support, field, and message evidence
- next-action and resolution workflow
- lightweight validation form
- server-side API boundary for future Supabase/Neon persistence

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

No production database credentials are required yet. The validation endpoint is intentionally stubbed until Supabase or Neon persistence is connected.

## Validation Storage

The current `/api/validation-response` route accepts MVP validation submissions and returns a success response. The next step is to connect it to Postgres tables:

- `mvp_demo_sessions`
- `mvp_validation_responses`
- `mvp_validation_events`

Use `.env.example` as the starting point for local environment variables. Do not expose database service-role credentials to client components.

## Scope Guardrail

This repo should stay focused on the MVP demo and validation loop. The main backend, integrations, workers, migrations, and production security architecture remain in `InaRelay/inarelay`.
