---
type: Work Item
title: Atelier design-system foundation
parent: ../spec.md
---

## What to build

Unify the portfolio under a single **Atelier** design foundation: CSS custom properties (including dark mode), shared motion primitives that respect `prefers-reduced-motion`, and alignment of existing `src/components/ui/*` plus `src/lib/animations.ts` / `src/lib/utils.ts` so later pages do not invent a third palette or parallel utility layer.

## Required context

- Spec: `ai_specs/0001-portfolio-quality-pass/spec.md` (Design system requirements 6–7; maintainability 30; quality floors 34–35; TD 1–2)
- Glossary: `GLOSSARY.md` — **Atelier**, **Portfolio Quality Pass**
- Key files: `src/app/globals.css`, `src/app/layout.tsx`, `src/lib/animations.ts`, `src/lib/utils.ts`, `src/components/ui/*`
- Today home uses Atelier tokens (`--cream`, `--ink`, `--atelier-accent`, …); other routes use a separate themable set (`--bg-primary`, `--accent`, …). Migrate toward one system rather than forever dual-branding.
- Do not redesign individual page layouts here beyond what token/component alignment requires.

## Acceptance criteria

- [x] Site-wide design tokens are grounded in Atelier (light + dark); permanent dual-brand palette is no longer the intended end state
- [x] Shared animation utilities support reduced-motion (no heavy motion when `prefers-reduced-motion: reduce`)
- [x] Existing shared UI (`Button`, `Badge`, `CardImage`, `Skeleton`, `SocialIcon` as present) uses Atelier-compatible tokens/classes
- [x] `src/lib/animations.ts` and `src/lib/utils.ts` are the preferred shared helpers (no new parallel util dump folders)
- [x] `npm run lint` and `npm run build` pass

## Covers

- User Stories: 10
- Requirements: 1, 6-7, 14, 30, 34-35
- Technical Decisions: 1-2
- Testing Strategy: 1-2
- Interview Ledger: L1, L2

## Blocked by

None - ready to start
