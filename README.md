# ATW — Public API Server

A small backend project for **Arquitectura para tecnologias de la web**. The server fetches and normalizes useful information from five public APIs without implementing the presentation layer yet.

## First milestone

- Current time for El Salvador
- Exchange rates with USD as the base currency
- Current weather for San Salvador
- Public egress IP of the running server
- Upcoming public holidays in El Salvador

The combined endpoint tolerates partial upstream failure so one unavailable provider does not erase the other successful results.

## Stack

- Node.js 22+
- TypeScript
- Express
- Native `fetch`

## Repository structure

```text
ATW/
├── docs/
│   ├── api-catalog.md
│   ├── architecture.md
│   └── learning-log.md
├── src/
│   ├── config/
│   ├── lib/
│   ├── routes/
│   ├── services/
│   ├── app.ts
│   └── server.ts
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
```

## Run locally

```bash
cp .env.example .env
npm install
npm run dev
```

Then open or query:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/v1/overview
```

Individual provider routes:

```bash
curl http://localhost:3000/api/v1/time
curl http://localhost:3000/api/v1/currency
curl http://localhost:3000/api/v1/weather
curl http://localhost:3000/api/v1/network
curl http://localhost:3000/api/v1/holidays
```

## Why the overview endpoint is important

The five requests run concurrently. Each is wrapped independently and returns either:

```json
{
  "status": "ok",
  "durationMs": 124,
  "data": {}
}
```

or:

```json
{
  "status": "error",
  "durationMs": 5002,
  "error": "The operation was aborted due to timeout"
}
```

This makes latency and partial failure visible before adding any user interface.

See `docs/architecture.md` and `docs/api-catalog.md` before changing the structure.
