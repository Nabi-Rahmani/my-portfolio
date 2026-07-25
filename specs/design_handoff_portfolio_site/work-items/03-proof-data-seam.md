---
type: Work Item
title: Proof data seam for installs, ratings and derived counts
parent: ../README.md
---

## What to build

A single owner-supplied seam that feeds every number in the designs, with an honesty rule baked in so a missing figure is never faked.

Every stat in the handoff is a placeholder — 23,600 installs, 4.7★, 410 ratings, 6 years, 14 articles, 1,412 subscribers, 4,200 reads. Spec 0001 forbids inventing metrics, and `src/types/project.ts` already carries that rule in its comments (`metrics?` renders only when owner-supplied; no project sets it today). So the hero stat band and app rows read from a seam that can honestly return "unknown".

**`src/config/proof.ts`**, sitting alongside `siteConfig` as the second owner-supplied configuration surface:

- A record keyed by project slug — `focus-flow`, `dev-discipline`, `mihrab-by-raha` — where `installs`, `rating` and `ratingCount` are each **optional**. Optional is the point: unknown means omitted, not zero and not a guess.
- `shippingSince` (year) for the years-shipping figure.
- Helper functions as the only read path, matching the `src/data/*` convention that `CLAUDE.md` requires: `getAppProof(slug)`, `getTotalInstalls()`, `getAverageRating()`, `getTotalRatings()`, `getArticleCount()`, `getYearsShipping()`, `getAppCount()`.
- `getArticleCount()` derives from `blogPosts` in `src/data/blog.ts` — 19 posts today, so the "All 14 posts →" copy in the design becomes a derived number, not a typed one.
- `getTotalInstalls()` returns `undefined` unless **every** listed app has a real `installs` value. A partial sum silently understates the total, which is its own kind of invented number.
- Document the rendering contract in the module: consumers omit a cell whose value is `undefined`. Never render `—`, `0`, `N/A` or a placeholder figure.

Types go in `src/types/proof.ts` or inline in the config module, whichever matches how `siteConfig` is typed.

## Required context

- The real figures must come from the owner reading Play Console. Until they land, `installs`, `rating` and `ratingCount` stay `undefined` and the affected stat cells simply do not render — the 2×2 grid degrades to the cells it can prove.
- Keep the module source-agnostic so owner-supplied proof can be updated without consumers changing.
- `siteConfig` in `src/config/site.ts` is the established pattern for owner-supplied configuration with `has*()` predicates — mirror its shape and comment style.
- Blog posts live as a static array in `src/data/blog.ts` with helper functions; import the helper rather than the array where one exists.

## Acceptance criteria

- [x] `src/config/proof.ts` exposes per-app `installs`, `rating` and `ratingCount` as optional owner-supplied values with no invented defaults
- [x] `getArticleCount()` derives from `src/data/blog.ts` and returns 19 against current data
- [x] `getTotalInstalls()` returns `undefined` unless all three apps have a real `installs` value
- [x] Helper functions are the only read path — no consumer indexes the raw record directly
- [x] The module documents the omit-when-undefined contract so implementers of the hero and app rows cannot miss it
- [x] `npm run lint` and `npm run build` pass

## Covers

- Fidelity: exception 1 (all numbers are placeholders; replace with real figures)
- State Management: install counts and ratings from a real source with a hard-coded fallback so a failed fetch never renders an empty stat cell
- Spec 0001 Interview Ledger: L4 (never invent metrics; render only what is real)

## Blocked by

None - ready to start

## Blocking decisions

- The baseline figures themselves. Installs, rating and rating count per app must be read off Play Console and supplied by the owner. Until then this Work Item ships the seam with those fields undefined, and the dependent stat cells render nothing rather than a placeholder.
