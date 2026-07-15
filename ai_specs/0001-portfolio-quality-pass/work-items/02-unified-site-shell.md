---
type: Work Item
title: Unified site shell (nav, footer, theme)
parent: ../spec.md
---

## What to build

Deliver one **Atelier** shell chrome for the whole public site: navigation IA, footer link parity, and light/dark theme persistence. End permanently divergent `AtelierNav` vs `Navigation` brand chrome; home may keep hash smooth-scroll when sections exist, while off-home uses real routes.

## Required context

- Spec requirements 7–11; TD 6; User Stories 5–6
- Files: `src/components/AtelierNav.tsx`, `src/components/Navigation.tsx`, `src/components/Footer.tsx`, `src/app/layout.tsx`, home `src/app/page.tsx` sections/ids
- Nav destinations (visitor-facing):
  - Projects → `/projects` (home may use `#projects`)
  - Writing → `/blog` (home may use `#blog`); label is **Writing**, not dual Blog/Writing
  - About → `/about` (home may use `#about`)
  - Contact → site-wide contact path (home `#contact` when present)
  - Courses remains in main nav without dominating hiring narrative
- Theme: `localStorage` key `'theme'`; minimize wrong-theme flash

## Acceptance criteria

- [x] One coherent shell language on home and inner routes (tokens, type, density, chrome)
- [x] Nav labels/routes match Spec IA; UI says **Writing** for `/blog`
- [x] Courses appears in main nav; Projects/About/Contact remain primary hiring path
- [x] On home, section targets smooth-scroll when sections exist; off-home links resolve to real routes
- [x] Footer shares the same primary destinations + socials without orphan/contradictory links
- [x] Light/dark toggle works site-wide; preference persists via `'theme'`
- [x] Heavy motion respects `prefers-reduced-motion`
- [x] `npm run lint` and `npm run build` pass

## Covers

- User Stories: 5-6
- Requirements: 7-11
- Technical Decisions: 6
- Testing Strategy: 1-2, 3 (theme + nav portions of walkthrough)
- Interview Ledger: L2, L6

## Blocked by

1 - `01-atelier-design-system-foundation.md`
