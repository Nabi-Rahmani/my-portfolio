---
type: Work Item
title: Responsive implementation across three breakpoints
parent: ../README.md
---

## What to build

The prototype is fixed at 1280px and the handoff states responsive behaviour was never designed. What follows is the handoff's own stated intent, which needs owner sign-off before implementation — see Blocking decisions.

**≥1120px.** As designed. Content max-width 1280px, centred.

**760–1119px.** The hero grid and the Writing/Now grid collapse to a single column. The stat grid stays 2×2. App data rows drop the description column and stack the name above the metrics.

**<760px.** Everything single column. The header nav becomes a compact row or a sheet — reuse the existing mobile drawer from `Navigation.tsx` rather than building a second pattern. Article rows keep the date but move it above the title. Horizontal padding drops from 40px to 20px.

Verify at 375px, 768px, 1024px, 1280px and 1440px. The 11px minimum text size holds at every breakpoint — mono metadata must not shrink below it to make a row fit.

## Required context

- The handoff is explicit: "Confirm the mobile layouts before building them; don't infer them from the desktop file." The three behaviours above are its stated intent, not a verified design.
- The mobile drawer in `Navigation.tsx` already handles Escape-to-close, body scroll lock and staggered link entry. Restyling happened in Work Item 02; this Work Item decides when it takes over from the inline nav.
- Spec 0001 testing strategy includes a manual walkthrough at roughly 375px for home plus one project detail — inner routes inherit tokens from Work Item 01 but keep their existing layouts, so check that they did not regress at narrow widths.
- Contrast was audited in the handoff at desktop sizes: all small mono metadata meets 4.5:1 against its background. Re-check any colour that changes at a breakpoint.

## Acceptance criteria

- [x] At ≥1120px the layout matches the 1280px design with content centred
- [x] At 760–1119px the hero and Writing/Now sections are single column, the stat grid is still 2×2, and app rows show name plus metrics without the description column
- [x] At <760px every section is single column, article dates sit above their titles, and horizontal padding is 20px
- [x] The header is usable at 375px with no overflow, and no page-level horizontal scroll exists at any tested width
- [x] No text renders below 11px at any breakpoint
- [x] `/projects`, `/blog` and `/about` still render without layout breakage at 375px after the token change
- [x] `npm run lint` and `npm run build` pass

## Covers

- Responsive Behavior: all three breakpoint bands
- Typography: 11px minimum text size
- Spec 0001 Testing Strategy: manual walkthrough at mobile width

## Blocked by

- `02-site-shell-header-footer-theme.md`
- `04-home-page-terminal-1b.md`

## Blocking decisions

- Owner sign-off on the three breakpoint behaviours. The handoff requires confirmation before mobile is built rather than inferred from the desktop file. Approving the behaviours above as written is a valid resolution — they are the handoff's own intent — but the decision is the owner's to make before this Work Item starts.
