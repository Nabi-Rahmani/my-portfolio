---
type: Work Item
title: Projects P0 proof (list + detail)
parent: ../spec.md
---

## What to build

Raise project list and detail to hiring-manager proof quality: credible cards, valid store/GitHub affordances only, and a scannable detail structure (hero, proof strip, screenshots, what was built, stack, optional owner metrics, legal when present).

## Required context

- Spec requirements 15–19; User Story 2; L8
- Files: `src/app/projects/page.tsx`, `src/app/projects/[slug]/*`, `src/data/projects.ts`, `src/types/project.ts`, phone/screenshot components
- Prefer shipping proof over empty marketing prose
- Metrics only if owner-supplied (optional fields; omit when unknown)
- Placeholders only when intentional and not broken images

## Acceptance criteria

- [x] Cards show title, short value line, real visual (or intentional placeholder), platform/tech cues without clutter
- [x] Live-store UI only for valid URLs; no primary `#`/dead store CTAs
- [x] Detail page follows skim structure: hero → proof strip → screenshots → features → stack → optional real metrics → legal when present
- [x] Screenshot gallery has no empty/broken primary images
- [x] Home curated subset still valid; `/projects` lists full set
- [x] Matches Atelier shell
- [x] `npm run lint` and `npm run build` pass

## Implementation notes

- List: `src/app/projects/page.tsx` — Atelier cards, tech chips, honest store CTAs
- Detail: `src/app/projects/[slug]/ProjectDetailClient.tsx` — skim order per Spec req 17
- Types: optional `metrics` on `Project` (render only when owner-supplied)
- Helpers: `getValidProjectGithubUrl`, `getProjectScreenshots`, `getFeaturedProjects`
- No metrics invented; profile-only GitHub URLs are not shown as project proof

## Covers

- User Stories: 2
- Requirements: 15-19
- Testing Strategy: 1-2, 3 (project with real store link + mobile detail)
- Interview Ledger: L8

## Blocked by

1 - `01-atelier-design-system-foundation.md`  
2 - `02-unified-site-shell.md`  
3 - `03-honest-conversion-contact-store-links.md`
