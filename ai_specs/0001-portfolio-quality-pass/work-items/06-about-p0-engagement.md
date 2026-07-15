---
type: Work Item
title: About P0 engagement
parent: ../spec.md
---

## What to build

Story-first **About** polish for Primary Visitors: personal, scannable narrative (not resume-only), clear availability, and contact path using honest CTAs. Draft copy for owner approval; match Atelier shell.

## Required context

- Spec requirement 13; User Stories 3, 9
- File: `src/app/about/page.tsx` (and related layout/metadata)
- Reuse `siteConfig` conversion rules from WI 3
- Owner approves final about/CTA wording where changed

## Acceptance criteria

- [x] About reads story-first and scannable; not a cold resume dump only
- [x] Availability visible; contact path present (form/mailto/booking/CV per config)
- [x] Visual system matches Atelier shell (nav/footer/theme)
- [x] Draft copy prepared for owner approval where wording changed
- [x] Keyboard/focus and reduced-motion floors not regressed on interactive elements introduced
- [x] `npm run lint` and `npm run build` pass

## Covers

- User Stories: 3, 9
- Requirements: 13
- Testing Strategy: 1-2, 3 (About)
- Interview Ledger: L3, L5

## Blocked by

1 - `01-atelier-design-system-foundation.md`  
2 - `02-unified-site-shell.md`  
3 - `03-honest-conversion-contact-store-links.md`
