## Overview

Implement the **Atelier** design direction (A) for the home page — editorial soft-modern redesign with Instrument Serif display, warm cream palette, and reveal-on-scroll animations.

**Spec**: `specs/design_handoff_portfolio_redesign/README.md` (read alongside `designs/atelier.html` for pixel-close fidelity)

## Context

- **Structure**: Next.js 15 App Router; home page = `src/app/page.tsx`; shared components in `src/components/`
- **State management**: React `useState` + `useEffect` only; theme via `.dark` on `<html>`, persisted in `localStorage`
- **Styling**: Tailwind CSS v4 + CSS custom properties in `src/app/globals.css`; dark mode via `.dark` class
- **Fonts**: Currently uses `next/font` — must keep that pattern (no CDN `<link>` tags)
- **Motion**: `framer-motion` already present; `LenisScroll` for smooth scroll already wired
- **Reference implementations**: `src/app/page.tsx` (existing home), `src/components/Navigation.tsx` (existing nav), `src/lib/animations.ts` (fadeUp, staggerContainer)
- **Scope**: Home page only. `/blog`, `/projects`, `/about`, `/courses` routes — do not touch.
- **Assets**: Real screenshots don't exist yet → ship CSS phone placeholder (looks intentional)

## Plan

### Phase 1: Atelier Design Tokens + Fonts

- **Goal**: Establish token layer and fonts so all subsequent components can reference them
- [x] `src/app/globals.css` — added Atelier tokens (`--cream`, `--cream-2`, `--ink`, `--ink-soft`, `--muted`, `--line`, `--atelier-accent` (not `--accent` to avoid conflict), `--accent-soft`); added `.dark` overrides; added `@keyframes pulse-dot`; added `.nav-link` underline-grow and `.atelier-cta` gap-animate CSS rules
- [x] `src/app/layout.tsx` — added `Instrument_Serif` (400 normal+italic) and `JetBrains_Mono` (400) via `next/font/google`; exposed as `--font-serif` and `--font-mono`; Geist already present as `--font-geist-sans`
- [x] Verify: `npm run build && npm run lint` pass; no font CDN `<link>` tags

### Phase 2: Shared Components

- **Goal**: `PhonePlaceholder`, `ScrollReveal`, and updated `AtelierNav` — reusable building blocks for Phase 3-4
- [x] `src/components/PhonePlaceholder.tsx` — created; 280px wide, 9/19.5 aspect, 36px bezel, striped gradient inner screen, notch, mono label+caption, `role="img"` + `aria-label`
- [x] `src/components/ScrollReveal.tsx` — created; `motion.div` whileInView, `useReducedMotion()` kill switch, delay prop
- [x] `src/components/AtelierNav.tsx` — created; fixed top, backdrop-blur, pulsing dot with `pulse-dot` animation, `.nav-link` underline-grow links, scroll-state border, circle theme toggle with localStorage sync; `mounted` flag prevents SSR icon mismatch
- [x] `src/components/Navigation.tsx` — added early return `if (pathname === '/') return null` after all hooks; global nav hidden on home, shown on all other routes
- [x] Verify: `npm run build && npm run lint` pass

### Phase 3: Hero + Nav Integration

- **Goal**: Rewrite home page Hero section and wire `AtelierNav`; establish full-viewport layout
- [x] `src/app/page.tsx` — complete rewrite; `<AtelierNav />` at top; no global `<Navigation />` (hidden via pathname check); page wrapper `bg-[var(--cream)] text-[var(--ink)]`
- [x] `src/app/page.tsx` Hero — full-viewport `min-h-screen flex flex-col justify-between`; eyebrow with `<hr>` hairlines; `clamp(72px,13vw,220px)` Instrument Serif name with italic `<em>Rahmani.</em>` in `var(--atelier-accent)`; italic serif tagline; stats row with dividers; `.atelier-cta` pill with gap animation; Lenis smooth-scroll
- [x] Verify: `npm run build && npm run lint` pass

### Phase 4: Projects + About Sections

- **Goal**: Alternating phone mockup project cards and 2-col about section
- [x] `src/app/page.tsx` Projects — alternating `md:flex-row` / `md:flex-row-reverse`; `<PhonePlaceholder>` per project with per-project captions; `motion.div whileHover` lift+rotate; outlined pill tags; Play Store / iOS coming soon links; `<ScrollReveal>` per project
- [x] `src/app/page.tsx` About — 2-col `md:grid-cols-2`; italic serif pull-quote in `var(--atelier-accent)`; canonical bio + `<dl>` meta (Based/Stack/Status/Speaks); Status styled in accent
- [x] Verify: `npm run build && npm run lint` pass

### Phase 5: Contact + Footer + Polish

- **Goal**: Large serif email CTA, social pills, footer, accessibility pass, dark mode verify
- [x] `src/app/page.tsx` Contact — `clamp(28px,7vw,120px)` italic serif email link; group-hover color + `↗` nudge; GitHub · LinkedIn · X · Twitter · Blog social pills with `hover:bg-[var(--ink)] hover:text-[var(--cream)]`; all external links have `rel="noopener noreferrer" target="_blank"`
- [x] `src/app/page.tsx` Footer — `border-t border-[var(--line)] py-6`; left copyright; right `v.atelier · 03`; both mono 11px `var(--muted)`
- [x] `src/app/globals.css` — `@keyframes pulse-dot`, `.nav-link` underline-grow, `.atelier-cta` gap animation added; Lenis handles smooth scroll globally
- [x] Accessibility — `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]` on all interactive elements; `aria-hidden` on decorative arrows; `role="img"` + `aria-label` on phone mockup
- [x] Old home page completely replaced — no leftover initials avatar, old hero, blog section, old contact, or old Footer component
- [x] `npm run build && npm run lint` — pass clean (pre-existing warnings only)
- [ ] Manual check: scroll reveal fires on each section; hero CTA scrolls to projects; nav underlines animate; pill CTA gap expands on hover; phone hover animates

## Risks / Out of scope

- **Risks**:
  - `AtelierNav` replaces existing `<Navigation />` on home page only — ensure other routes (`/blog`, `/projects`, `/about`) still import and render their own `<Navigation />` untouched
  - `oklch()` color values: supported in modern browsers but may warn in Tailwind v4 JIT scan; define in CSS custom properties only (not Tailwind config) to avoid
  - Instrument Serif italic subset must be explicitly requested in `next/font` or italic `<em>` will fall back to browser faux-italic
- **Out of scope**: Studio / Quiet variants; blog post pages; project detail pages; about page; courses; real app screenshots (ship placeholder); contact form backend; CV PDF; mobile app icon assets
