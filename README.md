# TXKPRO 3D Explainer Engine

First-task scaffold: no-code action timeline and deterministic 3D video preview.

## Run

Node 22 LTS (or compatible Node 24), npm. In Codespaces, reopen in the included devcontainer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000 in a WebGL-capable browser. No credentials required. Drag or click an action, select it, adjust parameters, then scrub the Player. New blocks append; colliding durations are rejected. Preview state lasts for the current page session only.

```sh
npm run typecheck
npm test
npm run build
```

See docs/architecture.md for implemented scope, timeline semantics, and Supabase/Lambda/LMS integration contracts. Cloud rendering, real model ingestion, auth, spatial labels, database persistence and LMS delivery are not implemented in this first task. Final export must use Remotion Lambda; no browser recording APIs are included.

Vercel: import the chosen GitHub repository as a Next.js project after repository selection. There are no required environment variables for this preview. Do not point this scaffold at production workforce resources without explicit project selection.
