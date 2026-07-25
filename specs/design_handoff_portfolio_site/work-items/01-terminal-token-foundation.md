---
type: Work Item
title: Terminal token and type foundation
parent: ../README.md
---

## What to build

Replace the Atelier token layer with the `1b` Terminal design system so every route inherits the new palette, type and geometry before any layout is rebuilt.

**Palette.** Define the Terminal dark palette as the primary token set in `src/app/globals.css`: `#17120C` page background, `#120E09` footer bar, `#1E1710` panel, `#2A2118` tile, `#F5EFE3` text, `#A99B85` muted, `#94886F` faint. `1b` specifies dark only, so the light theme uses the `1a` light values: `#FBF8F1` paper, `#F3EEE2` banded, `#191510` ink, `#5E5548` body, `#6E6455` muted, `#857A66` faint, `#E4DDCD` line, `#EDE6D6` lineSoft, `#D8D0BE` border, `#8A6212` accent, `#3D8A46` ok.

**One accent property.** `--accent` defaults to pearl white `#F2EDE3` and must drive all four of its jobs: accent text, the filled CTA background (with `#17120C` text on top), every hairline as `rgba(accent, α)`, and the status/subscribe pill borders. Gold `#E5C88A`, sage `#C9D6D0` and clay `#D9C4B0` stay available as commented alternatives.

**Derived hairlines.** One `--rule-strength: 0.16` produces the five rule tokens by multiplier — `--line-16` ×1.00 (section dividers, header/footer borders), `--line-13` ×0.82 (list row separators), `--line-18` ×1.13 (app tile borders), `--line-24` ×1.50 (toolbox chips), `--line-30` ×1.90 (subscribe pill, theme toggle). Also define `rgba(245,239,227,.25)` for outline-button borders and `#7BC47F` for the availability dot.

**Fonts.** Swap the stack in `src/app/layout.tsx` using `next/font/google` — the project loads fonts this way and must not gain CDN `<link>` tags. Instrument Sans 400/500/600/700 becomes the UI and body face; JetBrains Mono gains 500 and 700 alongside its existing 400; Playfair Display 700/900/italic 700 replaces Instrument Serif on `--font-serif`. Remove the `geist` imports and the `GeistSans.className` on `<body>`.

**Type scale.** Encode the handoff's scale as reusable utilities: hero H1 600/42px/1.12/`-0.025em`; eyebrow mono 500/11–12px/`0.14em`/uppercase; article title 600/16.5–17px/1.3/`-0.012em`; dek 400/13.5px/1.55; stat figure 600/30px/`-0.03em`; metadata mono 400/11.5–12px; button label 500–600/12.5–14px. Nothing renders below 11px.

**Geometry and motion.** Radii 999px pills, 10px outer card, 9px app tile, 5px toolbox chip. Borders always exactly 1px. No shadows — cards sit on hairlines. Motion primitives `--dur-hover: 120ms` ease-out and `--dur-reveal: 180ms` `cubic-bezier(.2,.6,.2,1)`. `:focus-visible` becomes a 2px accent outline at 2px offset.

**Inheritance without a repo-wide edit.** Keep the legacy Atelier variable names (`--cream`, `--cream-2`, `--ink`, `--ink-soft`, `--muted`, `--line`, `--atelier-accent`, `--accent-ink`, `--accent-soft`, and the `--bg-primary`/`--text-primary`/`--border-color` family) defined as aliases pointing at Terminal tokens. `/projects`, `/blog`, `/about`, `/courses`, `/now` and `/uses` then render in the new palette and type with no per-file changes. Set `--shadow-sm`/`--shadow-md`/`--shadow-lg` to `none` for the same reason, so existing `shadow-[var(--shadow-sm)]` call sites become no-ops instead of needing edits.

**Cleanup.** Delete `.organic-blob`, `.editorial-dots`, `.editorial-lines` and `@keyframes float-softly` from `globals.css`, and remove the decorative divs that use them in `src/app/page.tsx` and `src/app/projects/[slug]/ProjectDetailClient.tsx`. Delete `src/components/MouseGlow.tsx` — it is not mounted anywhere.

## Required context

- The project runs Tailwind CSS v4 CSS-first: `globals.css` opens with `@import "tailwindcss"` and `@custom-variant dark (&:is(.dark *))`. Treat `tailwind.config.ts` as largely vestigial and verify whether its `theme.extend` still applies before relying on it.
- `.article-content` (used by every blog post) and `.editorial-display` (used in `page.tsx`, both `projects` files and `Footer.tsx`) both read `var(--font-serif)`. Remapping that variable to Playfair Display is the intended inheritance path — confirm neither falls back to an undefined variable.
- Dark mode is a `.dark` class on `<html>` with a pre-paint script in `layout.tsx`. This Work Item does not change the toggle logic; Work Item `02-site-shell-header-footer-theme.md` does.
- `src/app/page.tsx` is rebuilt in `04-home-page-terminal-1b.md`. Remove only the decoration usages here, not the page structure.

## Acceptance criteria

- [x] `globals.css` defines the Terminal dark palette and the `1a` light palette, a single `--accent` defaulting to `#F2EDE3`, and `--line-13/16/18/24/30` all derived from one `--rule-strength: 0.16`
- [x] Changing `--accent` alone re-tints accent text, the filled CTA background, every hairline and the pill borders — no hard-coded copies of the accent value remain
- [x] Legacy Atelier variable names alias to Terminal tokens, and `/projects`, `/blog`, `/about`, `/courses`, `/now`, `/uses` render in the new palette and fonts with no per-file edits
- [x] `layout.tsx` loads Instrument Sans (400/500/600/700), JetBrains Mono (400/500/700) and Playfair Display (700/900/italic 700) through `next/font/google`; no Geist, no Instrument Serif, no font CDN `<link>`
- [x] `--font-serif` resolves to Playfair Display and `.article-content` plus `.editorial-display` still render with a real font, not a fallback
- [x] `:focus-visible` renders a 2px accent outline at 2px offset
- [x] `grep` for `organic-blob`, `editorial-dots`, `editorial-lines`, `float-softly` and `MouseGlow` returns no hits in `src/`
- [x] `npm run lint` and `npm run build` pass

## Covers

- Design Tokens: Dark palette, Light palette, Typography, Geometry
- Interactions & Behavior: Motion primitives, Focus states
- Assets: Fonts
- Spec 0001 Interview Ledger: L2 (one coherent system, not a home-only skin)

## Blocked by

None - ready to start
