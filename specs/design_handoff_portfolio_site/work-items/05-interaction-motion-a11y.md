---
type: Work Item
title: Interaction, motion and accessibility pass
parent: ../README.md
---

## What to build

The prototype is static. This Work Item implements the behaviour the handoff specifies, consistently across the shell and the home page.

**Article rows.** The entire row is one link to the post. On hover: a background tint — `rgba(accent, 0.04)` in dark, `#F3EEE2` in light — the title moves to full primary colour, and the read-time column shifts 2px right. 120ms `ease-out`.

**App rows.** The whole row links to the project page; the `Open ↗` affordance underlines on hover.

**Buttons.** Filled buttons darken or lighten roughly 6% on hover; outline buttons raise their border to the next opacity step (for example `line30` upward). 120ms.

**Section reveal.** A one-time 8px translate plus opacity fade-up per section on first scroll into view: 180ms, `cubic-bezier(.2,.6,.2,1)`, 40ms stagger between rows, and it must not re-animate on scroll back. Retune the existing `src/components/ScrollReveal.tsx` and the variants in `src/lib/animations.ts` rather than adding a raw `IntersectionObserver` — Framer Motion's `whileInView` with `viewport={{ once: true }}` already gives exactly these semantics, and the project already depends on it. The current Atelier values (20px translate, 500ms, `atelierEase`, 100ms stagger) are replaced by the handoff's. No parallax, no scroll-jacking.

**Reduced motion.** Honour `prefers-reduced-motion: reduce` through the existing `useReducedMotion()` and `fadeUpMotion()` / `selectVariants()` helpers — content appears immediately with no translate.

**Focus states.** The prototype does not show these and they are required. Audit every interactive element for the 2px accent ring at 2px offset defined in Work Item 01: header links, subscribe pill, theme toggle, mobile drawer controls, article rows, app rows, both hero buttons, both contact buttons, footer links.

## Required context

- `src/lib/animations.ts` already exposes the reduced-motion-aware pattern (`fadeUpMotion`, `staggerMotion`, `selectTransition`). Change the values there so every call site inherits the new motion language instead of adding a parallel system.
- `globals.css` carries a global `@media (prefers-reduced-motion: reduce)` block that clamps animation and transition durations. Verify it does not fight Framer Motion's inline transitions and produce a half-applied reveal.
- Lenis smooth scrolling is mounted globally via `LenisScroll.tsx` with the instance on `window.__lenis`. Confirm the reveal triggers correctly under Lenis-driven scrolling and that hash navigation from the header still lands on the right section.
- Whole-row links need real link semantics — the row must be reachable and activatable by keyboard, not a `div` with an `onClick`.

## Acceptance criteria

- [x] Article and app rows tint on hover at 120ms ease-out with the 2px read-time shift, and the entire row is one link that Enter activates from the keyboard
- [x] Filled and outline buttons have visibly distinct hover states at 120ms, with outline borders stepping up one opacity level
- [x] Each section fades up 8px once on first scroll into view at 180ms `cubic-bezier(.2,.6,.2,1)` with 40ms row stagger, and does not re-animate when scrolled back into view
- [x] With `prefers-reduced-motion: reduce` set, no translate animation runs and all content is visible immediately
- [x] Tabbing through the home page reaches every interactive element in visual order, each showing a 2px accent ring at 2px offset
- [x] `src/lib/animations.ts` carries the handoff's values (8px, 180ms, 40ms stagger) and the 20px / 500ms / 100ms Atelier values are gone
- [x] Header hash links still scroll to their sections under Lenis without fighting the reveal
- [x] `npm run lint` and `npm run build` pass

## Covers

- Interactions & Behavior: Article rows, App rows / cards, Buttons, Motion, Focus states
- Spec 0001 Interview Ledger: L9 (accessibility floors, reduced motion, lint and build gate)

## Blocked by

- `02-site-shell-header-footer-theme.md`
- `04-home-page-terminal-1b.md`
