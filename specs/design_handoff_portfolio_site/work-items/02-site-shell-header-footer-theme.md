---
type: Work Item
title: Site shell — Terminal header, footer bar, theme correctness
parent: ../README.md
---

## What to build

Rebuild the shared chrome so every route wears the `1b` shell, and make the theme behave the way the handoff requires.

**Header** (`src/components/Navigation.tsx`, `1b` §1). 13px vertical / 40px horizontal padding, `border-bottom: 1px solid var(--line-16)`. Left: a 6px accent dot plus `CODEWITHNABI` in JetBrains Mono 500, 12px, `0.12em`, accent colour. Centre: nav links in `#A99B85` with the active item in `#F5EFE3`, 24px gap. Right: a `Subscribe` pill (`1px solid var(--line-30)`, accent text, 999px radius) followed by a 28px circular theme toggle (`1px solid var(--line-30)`, `☾` glyph).

**Nav destinations.** The handoff's nav drops Courses; spec 0001 requirement 8 keeps it in main nav. Reconciled set: `Writing` → `/blog`, `Apps` → `/projects`, `About` → `/about`, `Courses` → `/courses`, `GitHub` external. Update the labels in `src/config/navigation.ts` (`articles` → "Writing", `projects` → "Apps") and keep `isActive` mapping ids to route prefixes.

**Subscribe pill gating.** Add `subscribeUrl: ''` to `siteConfig` and a `hasSubscribe()` predicate following the existing `hasCalendly()` pattern. The pill renders only when the URL is non-empty and is absent otherwise — never a `#` link. The subscriber count from the designs is not rendered; there is no real source for it.

**Theme toggle.** Use the `☾` text character, not an SVG or an icon library — the handoff specifies no icons beyond text glyphs. Replace the existing inline `SunIcon`/`MoonIcon` in this component.

**Theme correctness.** The pre-paint script in `src/app/layout.tsx` currently only reads `localStorage.theme`, so a first-time visitor never gets their system preference. Extend it to fall back to `window.matchMedia('(prefers-color-scheme: dark)')` when no stored value exists. Keep the `'theme'` key, keep the class set before first paint, keep `suppressHydrationWarning`.

**Footer** (`src/components/Footer.tsx`, `1b` §6). Replace the large editorial block with the Terminal bar: 18px/40px padding, `#120E09` background, `border-top: 1px solid var(--line-16)`, two lines of JetBrains Mono 11.5px in `#94886F`. Keep the component's existing props (`showSocials`, `links`, `className`) so the routes that already import it keep compiling.

**Mobile drawer.** Keep the existing drawer mechanics — Escape to close, body scroll lock, staggered links — and restyle to Terminal tokens. The breakpoint behaviour itself is specified in `06-responsive-implementation.md`.

## Required context

- `Navigation.tsx` is mounted once in `src/app/layout.tsx` and renders on every route including `/`. There is no separate home-page nav component to reconcile.
- `scrollToHash` in `src/config/navigation.ts` drives Lenis-based hash scrolling on the home page. Preserve it — the rebuilt home page still uses section anchors.
- `lucide-react` is a project dependency. Do not add new icon imports here, and do not remove the package; other routes may use it.
- `Footer.tsx` is imported by `src/app/page.tsx` and potentially other routes — check call sites before changing its signature.

## Acceptance criteria

- [x] Header matches `1b` §1: 13px/40px padding, `line16` bottom rule, 6px accent dot with `CODEWITHNABI` in mono 500 12px `0.12em`, nav at 24px gap with `#A99B85` / `#F5EFE3` inactive-active colours
- [x] Nav destinations are Writing → `/blog`, Apps → `/projects`, About → `/about`, Courses → `/courses`, GitHub external, and the active item reflects the current route on each
- [x] The Subscribe pill renders only when `siteConfig.subscribeUrl` is non-empty and is absent otherwise; no `#` or dead primary link ships
- [x] The theme toggle is a 28px circle with a `☾` text glyph and a `line30` border, with no icon-library import added to the component
- [x] A first visit with no stored preference follows `prefers-color-scheme`; a stored `'theme'` value overrides it; a hard reload of `/` and of `/blog` shows no wrong-theme flash
- [x] Footer renders as the 18px/40px `#120E09` bar with a `line16` top rule and two mono 11.5px `#94886F` lines, and every route that imports it still builds
- [x] `npm run lint` and `npm run build` pass

## Covers

- Screens / Views: `1b` §1 Header, `1b` §6 Footer
- Interactions & Behavior: Theme toggle (site-wide consistency, `localStorage`, `prefers-color-scheme`, no flash)
- State Management: `theme: 'dark' | 'light'`
- Spec 0001 Interview Ledger: L6 (unified shell, Writing label, Courses in main nav)

## Blocked by

- `01-terminal-token-foundation.md`
