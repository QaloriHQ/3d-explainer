# TXKPRO 3D Explainer Engine — product roadmap

Tracking issue: [#1](https://github.com/QaloriHQ/3d-explainer/issues/1)

## Baseline and objective

The scaffold is running in Codespaces (user confirmed). It includes Next.js/Tailwind, versioned JSON/Zustand, Remotion Player with placeholder R3F assembly, three action types, basic inspector and client upload preflight. Type checks, four tests and Turbopack build passed during the module fix. This is baseline evidence, not full MVP completion.

The MVP enables an authorized tenant user to select a validated mechanical model, build instruction with Action Blocks and anchored templates, save/recover work, render a reproducible 60 fps MP4 through Remotion Lambda, privately store/download it and deliver it to the first approved LMS.

No manual keyframing, browser recording, mesh editing or material generation. Roadmap creation does not provision paid services or authorize production changes. Dates and estimates remain unset until ownership, assets, first LMS and pilot capacity are confirmed.

## Implementation backlog

P0 = foundation/security/release-critical. P1 = required supporting MVP work, which can block P0. P2 = post-MVP discovery. Dependency links are issue checklists, not native GitHub dependency relationships or Project fields.

| Issue | Phase | Priority | Implementation | Depends on |
| --- | --- | --- | --- | --- |
| [F01 / #2](https://github.com/QaloriHQ/3d-explainer/issues/2) | Foundation | P0 | Record product contracts and environment ownership | — |
| [F02 / #3](https://github.com/QaloriHQ/3d-explainer/issues/3) | Foundation | P0 | Add CI and reproducible Codespaces verification | #2 |
| [S01 / #4](https://github.com/QaloriHQ/3d-explainer/issues/4) | Tenant and assets | P0 | Implement tenant schema, migrations and RLS isolation | #2, #3 |
| [S02 / #5](https://github.com/QaloriHQ/3d-explainer/issues/5) | Tenant and assets | P0 | Implement email OTP authentication and tenant access | #4 |
| [S03 / #6](https://github.com/QaloriHQ/3d-explainer/issues/6) | Tenant and assets | P0 | Configure private asset buckets and authorized storage access | #4, #5 |
| [S04 / #7](https://github.com/QaloriHQ/3d-explainer/issues/7) | Tenant and assets | P0 | Build server-side GLB and glTF validation pipeline | #6 |
| [S05 / #8](https://github.com/QaloriHQ/3d-explainer/issues/8) | Tenant and assets | P1 | Create curated global library and tenant upload gallery | #7 |
| [E01 / #9](https://github.com/QaloriHQ/3d-explainer/issues/9) | Editor | P0 | Version timeline schema and deterministic action contracts | #2, #3 |
| [E02 / #10](https://github.com/QaloriHQ/3d-explainer/issues/10) | Editor | P0 | Implement project dashboard, save and autosave recovery | #5, #9 |
| [E03 / #11](https://github.com/QaloriHQ/3d-explainer/issues/11) | Editor | P0 | Load validated GLB assemblies with stable component tracks | #8, #9 |
| [E04 / #12](https://github.com/QaloriHQ/3d-explainer/issues/12) | Editor | P0 | Build Action Block timeline operations and accessible controls | #9, #11 |
| [E05 / #13](https://github.com/QaloriHQ/3d-explainer/issues/13) | Editor | P0 | Complete Rotate, Highlight and Exploded View inspectors | #12 |
| [E06 / #14](https://github.com/QaloriHQ/3d-explainer/issues/14) | Editor | P1 | Add guarded camera presets and navigation blocks | #13 |
| [E07 / #15](https://github.com/QaloriHQ/3d-explainer/issues/15) | Editor | P0 | Implement anchored Warning, Callout and Equation templates | #11, #14 |
| [E08 / #16](https://github.com/QaloriHQ/3d-explainer/issues/16) | Editor | P1 | Add reusable instructional scene templates | #10, #13, #15 |
| [R01 / #17](https://github.com/QaloriHQ/3d-explainer/issues/17) | Cloud rendering | P0 | Provision isolated Remotion Lambda rendering infrastructure | #2, #3 |
| [R02 / #18](https://github.com/QaloriHQ/3d-explainer/issues/18) | Cloud rendering | P0 | Register shared composition and immutable render snapshots | #9, #11, #15, #17 |
| [R03 / #19](https://github.com/QaloriHQ/3d-explainer/issues/19) | Cloud rendering | P0 | Implement authenticated asynchronous export orchestration | #5, #10, #18 |
| [R04 / #20](https://github.com/QaloriHQ/3d-explainer/issues/20) | Cloud rendering | P0 | Implement verified completion and Supabase MP4 handoff | #19, #6 |
| [R05 / #21](https://github.com/QaloriHQ/3d-explainer/issues/21) | Cloud rendering | P1 | Build render queue, progress and secure download UI | #20 |
| [Q01 / #22](https://github.com/QaloriHQ/3d-explainer/issues/22) | Release quality | P0 | Validate performance, accessibility and preview/render parity | #16, #21 |
| [L01 / #23](https://github.com/QaloriHQ/3d-explainer/issues/23) | LMS and pilot | P1 | Define LMS destination contract and secure connection settings | #2, #5 |
| [L02 / #24](https://github.com/QaloriHQ/3d-explainer/issues/24) | LMS and pilot | P1 | Implement retryable LMS video and metadata delivery | #23, #20 |
| [O01 / #25](https://github.com/QaloriHQ/3d-explainer/issues/25) | LMS and pilot | P0 | Add operational monitoring, quotas and data lifecycle controls | #20, #24 |
| [U01 / #26](https://github.com/QaloriHQ/3d-explainer/issues/26) | LMS and pilot | P0 | Run tenant security review and pilot acceptance | #22, #25 |
| [D01 / #27](https://github.com/QaloriHQ/3d-explainer/issues/27) | LMS and pilot | P0 | Prepare Vercel staging and controlled production release | #26 |
| [N01 / #28](https://github.com/QaloriHQ/3d-explainer/issues/28) | Post-MVP | P2 | Discovery: narration, captions and audio synchronization | #26 |
| [N02 / #29](https://github.com/QaloriHQ/3d-explainer/issues/29) | Post-MVP | P2 | Discovery: SCORM/xAPI packaging and richer LMS adapters | #24, #26 |
| [N03 / #30](https://github.com/QaloriHQ/3d-explainer/issues/30) | Post-MVP | P2 | Discovery: collaboration, enterprise controls and commercial packaging | #26 |

## Release gates

1. Foundation: F01 + F02. Approved contracts/environment ownership and reproducible Codespaces/dev/build/CI evidence.
2. Tenant and asset safety: S01–S05. Two-tenant isolation, private storage, safe compressed-model ingestion and licensed library.
3. Authoring alpha: E01–E08. Save/recovery, real models, accessible Action Blocks, deterministic camera/labels and reusable examples.
4. Cloud video beta: R01–R05. Immutable render snapshots, least-privilege Lambda, idempotent jobs, verified callbacks and playable private MP4.
5. Pilot readiness: Q01, L01, L02, O01, U01. Performance/security/UAT and actual LMS sandbox delivery; no unresolved critical/high isolation defects.
6. MVP release: D01. Approved commit/migrations, staging verification, rollback/support ownership and explicit production authorization.

Start F01 (#2), then F02 (#3). S01 (#4), E01 (#9) and R01 (#17) become candidates after the foundation gate. Independent tracks may advance when their dependencies are complete. Start one implementation issue at a time by default.

## Definition of ready and done

Ready: outcome understood, dependencies verified, product contracts and resource ownership recorded, fixtures/access available and no blocking implementation decision. Split large issues into linked children before coding while preserving the parent acceptance gate.

Done: reviewed linked PR and exact commit, appropriate tests/evidence, docs updated, tenant security checked and staging behavior verified for service changes. Closure means delivered acceptance criteria. Production promotion requires explicit authorization.

## GitHub Projects setup — pending

The connected GitHub tools do not expose Projects creation/update operations. Issues and roadmap exist; a native Project board has not been created or populated.

Create a user-level QaloriHQ Project named **TXKPRO 3D Explainer Engine** and link this repository. In Add items, search `repo:QaloriHQ/3d-explainer is:issue` and bulk add the roadmap and implementation issues. Populate phase/priority using the backlog table. These proposed fields have not been written to a Project.

| Field | Type | Values / rule |
| --- | --- | --- |
| Status | Single select | Backlog, Ready, In progress, In review, Blocked, Done |
| Phase | Single select | Foundation, Tenant and assets, Editor, Cloud rendering, Release quality, LMS and pilot, Post-MVP |
| Priority | Single select | P0, P1, P2 |
| Iteration | Iteration | Two-week planning cadence, dates set after scoping |
| Estimate | Number | Set after implementation review; not a delivery promise |
| Release | Single select | Foundation, Authoring alpha, Cloud video beta, MVP, Later |

Views: Execution board grouped by Status; Roadmap grouped by Phase; Current iteration filtered by Iteration; Security and release gates filtered to P0; Later filtered to Post-MVP. F01 starts Ready; dependent issues start Blocked. Keep the roadmap index in Backlog rather than treating it as coding work.

Suggested board automation: auto-add new repository issues; closed → Done; reopened → Backlog. Review dependency readiness manually. Closing an upstream issue does not prove downstream acceptance criteria are ready.

## Decisions to settle in F01

- Dedicated Supabase, Vercel and AWS accounts/projects/regions and environment ownership.
- Owner/editor/viewer permissions, controlled tenant bootstrap/invites and retention.
- Output resolution/codec, project duration, render concurrency/spend caps and model complexity budgets.
- First LMS API, sandbox, authentication and delivery contract.
- Licensed seed assets, component/pivot/anchor conventions and compression workflow.
- Pilot users, browser/device matrix and measurable performance/quality goals.

Narration/TTS, SCORM/xAPI packages, enterprise SSO, collaboration and billing remain discovery rather than implied MVP commitments.
