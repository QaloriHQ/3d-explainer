# First-task scope and integration contracts

Implemented: Next.js App Router, Tailwind, typed versioned JSON, Zustand actions, block append/drop/select/remove, parameter inspector, deterministic Remotion + R3F preview, placeholder assembly, upload size preflight, Codespaces configuration.

No hosted services have been provisioned. Preview is local and unauthenticated; do not expose proprietary assets through this scaffold.

## Timeline semantics

60 fps, 1280×720, ten seconds. Actions append to a component track. Same-kind overlaps are rejected. Each action transitions from the preceding same-kind target and holds its final state. Removing a block leaves its time slot empty. Duration changes do not ripple later actions; collisions are rejected. Targets are degrees, highlight intensity 0–1, and exploded distance 0–2 scene units. Scene composition consumes JSON only, never Zustand, so future Lambda renders receive identical props. Frame-derived springs replace wall-clock React Spring/GSAP tweens for reproducibility.

## Next stages

1. Supabase Auth and relational tenants, memberships, projects, render_jobs. Server resolves membership from authenticated identity; tenant IDs in JSON are never authorization. RLS on every exposed table. Private global-assets bucket: authenticated read only; administrators populate. Private tenant-uploads bucket: tenant UUID as first path segment, membership-based read/write policies; immutable render output paths. Signed URLs issued only after authorization.
2. Validate file bytes and GLB headers, bound decompressed geometry/texture budgets, verify Draco or Meshopt compression. A .gltf may reference external buffers/textures; require a validated packaged ingestion workflow before accepting it. Extension and size preflight do not prove compression. Enforce the same limit on server and storage.
3. Add spatial anchor templates using world transforms and the active Three camera projection, with behind-camera and viewport clipping. Static captions in this scaffold are not spatial anchors.
4. Register the shared composition in a Remotion render bundle. Authenticated export endpoint validates JSON, rechecks all asset access, creates a render job and starts @remotion/lambda rendering. Return HTTP 202 + job ID immediately; do not await the whole render in Vercel.
5. Completion worker verifies webhook signature, handles retries idempotently, streams the AWS output to tenant-uploads using server credentials, records success only after upload, then emits a frontend status update. Credentials never enter timeline props. Error, progress, expiry and quota states must be explicit.
6. LMS delivery runs as a retryable server task, using tenant-owned credentials, HTTPS destination allowlists and private-network SSRF protection.

Before connecting infrastructure, choose the dedicated GitHub repository, Vercel team/project, Supabase project and AWS account/region. Do not reuse the workforce production database implicitly. Review Remotion commercial licensing before commercial rollout.
