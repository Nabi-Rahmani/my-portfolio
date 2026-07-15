---
type: Work Item
title: Home P0 engagement
parent: ../spec.md
---

## What to build

Deep engagement pass on `/` for the **Primary Visitor** cold-land path: clear identity (who / Flutter-mobile engineer), availability, curated project proof, and an obvious next step to contact. Draft warmer copy for owner approval; keep motion calm and accessible.

## Required context

- Spec requirements 2–5, 12, 14, 18; User Stories 1, 9
- File: `src/app/page.tsx` (and home-only components it uses)
- Depends on shell (WI 2) and honest CTAs (WI 3) so home CTAs and nav match the rest of the site
- Home shows curated project subset; full list remains `/projects`
- Do not invent metrics; use only real store links after WI 3 rules
- Owner approves final hero/availability/CTA wording before treating copy as final

## Acceptance criteria

- [x] Cold land on `/` communicates name/role/stack and availability within a short scan
- [x] Curated projects appear with credible visuals and honest links
- [x] Clear path to contact (form and/or mailto/booking/CV per config)
- [x] Motion supports hierarchy without jank; reduced-motion respected
- [x] Draft copy prepared; owner-facing notes for approval where wording changed
- [x] Matches Atelier shell from WI 1–2
- [x] `npm run lint` and `npm run build` pass

## Implementation notes

- Main surface: `src/app/page.tsx` (+ `PhoneScreenshot` priority prop)
- Owner copy approval table: `04-home-p0-engagement-copy-notes.md`


## Covers

- User Stories: 1, 9
- Requirements: 2-5, 12, 14, 18
- Testing Strategy: 1-2, 3 (home + mobile home)
- Interview Ledger: L3, L5

## Blocked by

1 - `01-atelier-design-system-foundation.md`  
2 - `02-unified-site-shell.md`  
3 - `03-honest-conversion-contact-store-links.md`
