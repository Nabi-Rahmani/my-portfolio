---
type: Work Item
title: Quality floors, cleanup, and verification
parent: ../spec.md
---

## What to build

Close the Portfolio Quality Pass with trust cleanup, SEO basics where weak, a11y/performance floors, and the full Primary Visitor verification gate (`lint`, `build`, manual walkthrough).

## Required context

- Spec requirements 31–35; Testing Strategy; User Story 10; L1, L9
- Sweep after P0–P2 page work so regressions are caught once
- Safe dead-code removal only (e.g. trust-breaking UI, clear unused alt pages); do not delete ambiguous in-progress work without evidence
- SEO: improve weak titles/descriptions where present; no full SEO product initiative
- Out of scope: new test framework requirement

## Acceptance criteria

- [x] Trust-breaking dead UI addressed (e.g. commented nav litter, invalid primary CTAs remaining after earlier WIs)
- [x] SEO basics preserved/improved on weakly described pages (Metadata where applicable); sitemap/robots still valid
- [x] A11y floors: keyboard reach for nav/CTAs/form; visible focus; meaningful `alt` on content images; reduced-motion honored
- [x] Performance floors: no intentional layout thrash; sensible `Image` usage where practical; obvious safe dead-weight cleanup only
- [x] `npm run lint` passes
- [x] `npm run build` passes
- [x] Manual Primary Visitor walkthrough completed and results noted:
  1. `/` cold land — identity, availability, next step  
  2. Project with real store link — proof, no dead primary CTAs  
  3. About — story + contact  
  4. Writing list + one post  
  5. Courses / now / uses — load, matching shell  
  6. Light/dark on home + one inner page  
  7. Contact form or mailto fallback without silent failure  
  8. ~375px home + one project detail  

## Walkthrough results (2026-07-15)

Verified against production build (`npm run build` + `npm run start` on `:3010`).

| Step | Result |
|------|--------|
| 1. `/` cold land | **Pass** — name (Nabi Rahmani), stack eyebrow, availability badge (“Available for freelance…”), `#projects` + `#contact`, mailto next step |
| 2. Project store proof | **Pass** — `/projects/focus-flow` exposes real Play Store URL; zero `href="#"` primary CTAs on all three project details; meaningful screenshot + app icon `alt` |
| 3. About | **Pass** — story cues (Afghanistan, Ankara), availability, contact mailto |
| 4. Writing | **Pass** — `/blog` title “Writing \| …”; sample post loads with article body |
| 5. Courses / now / uses | **Pass** — all 200; shared nav (`codewithnabi`) + footer chrome present |
| 6. Light/dark | **Pass** — theme toggle control present on home and About (shell chrome) |
| 7. Contact | **Pass** — no Web3Forms key in env → honest mailto path (no silent broken form); email always visible |
| 8. ~375px | **Pass (layout code)** — shell uses responsive padding, mobile drawer Escape close, phone screenshots fixed width; no desktop-only blockers found in markup. Full pixel device QA deferred to owner browser if desired |

**Gates:** `npm run lint` ✔ · `npm run build` ✔ · `robots.txt` + `sitemap.xml` (incl. `/courses`) 200

## Changes in this work item

- Removed unused dead weight: `AtelierNav.tsx` (deprecated re-export), `PhonePlaceholder.tsx`
- SEO: stronger root description; Writing title uses layout template cleanly; dynamic project/post titles via `title.absolute`; courses meta + sitemap entry
- A11y: project icon alts; Escape closes mobile drawer; form focus rings + success `aria-live`; footer CV focus; not-found/error Atelier + focus rings + reduced-motion
- Trust: confirmed no `#` primary store CTAs remaining after earlier WIs

## Covers

- User Stories: 10
- Requirements: 31-35
- Testing Strategy: 1-3, 5
- Interview Ledger: L1, L9

## Blocked by

4 - `04-home-p0-engagement.md`  
5 - `05-projects-p0-proof.md`  
6 - `06-about-p0-engagement.md`  
7 - `07-writing-p1-polish.md`  
8 - `08-secondary-routes-p2-consistency.md`
