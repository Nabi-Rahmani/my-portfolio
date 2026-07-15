---
type: Work Item
title: Secondary routes P2 consistency
parent: ../spec.md
---

## What to build

Consistency pass only for Courses (list/lesson), `/now`, and `/uses`: match Atelier shell tokens/nav/footer/chrome and fix broken or weak UI. Do **not** rebuild course pedagogy, progress architecture, or learning platform features.

## Required context

- Spec requirement 29; L5 depth map P2
- Files: `src/app/courses/**`, `src/components/courses/**`, `src/app/now/**`, `src/app/uses/**`, related data hooks
- Courses stay reachable from main nav (WI 2) but are not the hero hiring narrative

## Acceptance criteria

- [x] Courses list and lesson pages load with shell consistency (no broken chrome)
- [x] `/now` and `/uses` match Atelier tokens/shell quality of the rest of the site
- [x] No course platform rebuild (progress storage model unchanged unless required for a pure UI break fix)
- [x] No invented content for these routes beyond minor UI copy consistency
- [x] `npm run lint` and `npm run build` pass

## Covers

- User Stories: 5 (secondary surfaces)
- Requirements: 29
- Testing Strategy: 1-2, 3 (courses/now/uses load)
- Interview Ledger: L5

## Blocked by

1 - `01-atelier-design-system-foundation.md`  
2 - `02-unified-site-shell.md`
