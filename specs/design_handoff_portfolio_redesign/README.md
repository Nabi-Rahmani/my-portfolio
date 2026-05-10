# Handoff: codewithnabi.dev — Portfolio Redesign

## Overview
A redesign of [codewithnabi.dev](https://www.codewithnabi.dev) — Muhammad Nabi Rahmani's personal portfolio (Flutter developer, based in Ankara, Turkey). Three soft-modern directions explored in HTML so the developer (you, in Claude Code) can pick one and implement it in the real codebase (Next.js + Tailwind, based on the live site's tech).

The redesign covers the **home page only** for now: hero · projects · about · contact. Blog index, individual blog posts, project detail pages, and the About page are out of scope — keep the existing routes working, only the home page changes.

## About the Design Files
The HTML files in `designs/` are **design references**, not production code to copy directly. They use vanilla HTML/CSS/JS to demonstrate intended look, motion, and interactions.

Your task is to **recreate the chosen direction in the existing Next.js codebase**, using its established patterns:
- Next.js App Router pages/components
- Tailwind CSS for styling (translate the CSS variables to Tailwind config / CSS custom properties on `:root`)
- `next/font` for Google fonts (don't use `<link>` tags)
- `next/image` for the eventual real screenshots
- `framer-motion` (or your preferred motion lib) for the animations

If you don't already have one, please pick **A · Atelier** as the default — it's the most timeless and lowest-risk to implement well.

## Fidelity
**High-fidelity.** Colors, type scale, spacing, and motion are intended as final. Recreate pixel-close, then adapt to the codebase's component conventions.

---

## The Three Directions

The user is choosing between these. Implement whichever they pick.

### A · Atelier — Editorial soft modern
- **File:** `designs/atelier.html`
- **Vibe:** Magazine-like, generous whitespace, oversized italic serif accents.
- **Fonts:** `Instrument Serif` (display + italic emphasis) · `Geist` (body) · `JetBrains Mono` (labels)
- **Signature moves:** Italic accent words in the hero name (`Rahmani.` italicised in accent color); reveal-on-scroll fade-up; alternating left/right phone mockups; pill CTA with gap-grow on hover; pulsing brand dot in nav; rotating dark-mode toggle.

### B · Studio — Bold motion + easter eggs
- **File:** `designs/studio.html`
- **Vibe:** Confident, playful, opinionated. The "showy" option.
- **Fonts:** `Geist` (heavy display + body) · `JetBrains Mono` (labels)
- **Signature moves:** Custom cursor with `mix-blend-mode: difference` + radial spotlight following mouse; phone mockups in 3-stack with idle float animation and parallax on scroll; morphing blob brand mark; hover glitch on hero name; tag-filter that dims non-matching project cards; auto-scrolling stack ticker; Konami code easter egg (↑↑↓↓←→←→BA) hue-rotates the page.

### C · Quiet — Mono, listy, type-led
- **File:** `designs/quiet.html`
- **Vibe:** Indie hacker / engineering notebook. Almost no chrome.
- **Fonts:** `JetBrains Mono` (everything except large display) · `Geist` (display only)
- **Signature moves:** Project list as expandable rows (click to open detail); ambient cursor glow; bracketed section labels (`[ 01 / WORK ]`); index of writing as plain rows; large mailto link as the contact CTA.

---

## Screens / Views

All three variants render the same logical sections in the same order. Components below describe the **shared structure** with per-variant deltas called out.

### 1. Nav (sticky)
- **Position:** Fixed top, full-width.
- **Atelier:** Flat backdrop-blur bar; left = pulsing dot + `codewithnabi`; right = links + circle theme toggle. Border appears under nav once scrolled > 24px.
- **Studio:** Floating pill (`top: 16px`, rounded 999px, 1px line border). Morphing blob mark on left.
- **Quiet:** Flat full-width with bottom border on scroll. Brand mark = small accent square.
- **Links:** Projects · About · Contact · theme toggle. All variants smooth-scroll via `<a href="#…">`.

### 2. Hero
- **Layout:** Full-viewport. Big name, short tagline, secondary row with stats + CTA.
- **Atelier:**
  - Eyebrow: mono caps "Flutter Developer · Ankara, Turkey" with hairline.
  - Name: `Nabi` / `Rahmani.` (clamp 72–220px, italic accent on Rahmani).
  - Tagline: italic serif, max 560px.
  - Bottom row: 3 stats (`3+ years`, `2 apps`, `∞ çay`) + dark pill CTA "View selected work →".
- **Studio:**
  - Status chip: cream pill with green pulsing blip "Available for work · May 2026".
  - Name: heavy display 80–280px, with red-shifted glitch on hover, rotating ✺ between lines.
  - Tagline: with yellow highlighter accent on `actually-finished`.
  - CTA: dark pill with circular ink-fill on hover.
  - Tech ticker: auto-scrolling list of stack items below hero.
- **Quiet:**
  - Meta dl block (NAME / ROLE / BASED / SINCE / STATUS) above the name.
  - Name: `Nabi` (regular) + `Rahmani` (light, muted) + accent dot. Single line, smaller (clamp 64–156px).
  - Lede: 15px paragraph with accent emphasis on `quietly opinionated`.
  - Two flat outline buttons: "View work →" and the email address.

### 3. Projects (3 items)
**Project content (identical across variants):**

| # | Title | Description | Tags | Links |
|---|-------|-------------|------|-------|
| 001 | **Focus Flow** | A calm, guided focus timer for deep work. Sessions, soundscapes, breathing exercises, and analytics that don't shame you. | Focus timer · Session modes · 95+ sounds · Analytics · Breathwork · Pro tier | [Play Store](https://play.google.com/store/apps/details?id=com.nabirahmani.focus_flow) · iOS coming soon |
| 002 | **Dev Discipline** | Build better habits, stay consistent, become unstoppable. A 60-day system for engineers who want to actually finish things. | 60-Day plans · Daily tasks · Streak tracking · Progress insights · Journaling · Gamification | [Play Store](https://play.google.com/store/apps/details?id=com.nabirahmani.dev_discipline) · iOS coming soon |
| 003 | **Mihrab by Raha** | A peaceful Islamic companion for daily worship. Prayer times, Quran reader, and a Hijri calendar — designed to feel like quiet. | Prayer times · Quran reader · Hijri calendar · Daily dhikr · Library · Themes | iOS coming soon · Android coming soon |

- **Atelier / Studio:** Big phone mockup per project, alternating left/right; tags as outlined pills (Atelier) or filled cream chips (Studio). Hover lifts and rotates phone subtly.
- **Studio:** Phone shown as a 3-stack (main + 2 ghost phones at -12°/+12°) with idle float; project tag filter pills above (`All` · `Productivity` · `Habits` · `Lifestyle`) dim non-matching cards.
- **Quiet:** Project list = 4-column row (`#`, title, description, year). Click any row to expand inline showing tags, links, and a tiny mini phone preview. First row is open by default.

**Phone mockup placeholder pattern:** A 9:19.5 rounded rect with a notch and a striped accent fill, with a centered monospace label like `PRODUCT SHOT` and a caption like `focus_flow / timer.dart\nsession_view → 25:00`. **Replace these with real Play Store screenshots when integrating.**

### 4. About
- **Bio copy (canonical, polished version):**
  > I'm Nabi, a Flutter developer originally from Mazar-i-Sharif, Afghanistan, now living and working in Ankara, Turkey. I specialize in shipping mobile apps quickly without making the kind of mess that haunts you in two months — clean architecture, offline-first reliability, and a healthy distrust of feature creep. If you're hiring for craft over speed (or, ideally, both), I'd love to talk.
- **Meta block:**
  - Based: Ankara, Turkey · GMT+3
  - Stack: Flutter · Dart · Firebase · Riverpod
  - Status: **Open to collaborations** (in accent color)
  - Speaks: English · Persian (Dari) · Turkish

### 5. Contact
- **Email:** `codewithnabi@gmail.com` (rendered huge — clamp 48–140px in Atelier; pill button in Studio; underlined sans link in Quiet).
- **Socials:** GitHub (`Nabi-Rahmani`) · LinkedIn (`muhammad-nabi-rahmani-8945b21ba`) · X/Twitter (`@nabirahmani_dev`) · Blog (`codewithnabi.dev/blog`).

### 6. Footer
- `© 2026 Muhammad Nabi Rahmani · Crafted in Ankara` left, version tag right (`v.atelier · 03`, `v.studio · try the konami code ↗`, `v.quiet — built in Ankara`).

---

## Design Tokens

### Atelier
```
--cream:       #f4ecdd     (light bg)
--cream-2:     #ebe1cd     (raised surface)
--ink:         #1b1814     (foreground)
--ink-soft:    #2a2620
--muted:       #7a6f5e
--line:        #cbbfa6     (hairline borders)
--accent:      oklch(0.58 0.12 40)   (warm terracotta)
--accent-soft: oklch(0.92 0.04 70)

dark mode:
--cream:       #14110d
--ink:         #f1e7d3
--accent:      oklch(0.78 0.12 60)
```

### Studio
```
--cream:    #f1e9d8
--ink:      #161310
--accent:   oklch(0.66 0.18 45)   (saturated terracotta)
--accent-2: oklch(0.78 0.15 90)   (yellow highlighter)
--line:     #d4c8ad
```

### Quiet
```
--cream:    #f3ecde
--ink:      #181612
--accent:   oklch(0.56 0.13 35)
--line:     #cdc1a8
```

### Type scale (shared)
- Display (hero name): `clamp(64px, 11–16vw, 156–280px)`, line-height 0.86–0.96
- H2 (section): `clamp(36–56px, 5–8vw, 56–120px)`
- Body: 15–17px, line-height 1.5–1.65
- Mono labels: 11–13px, letter-spacing 0.04–0.18em, often UPPERCASE

### Spacing
- Section vertical padding: `100–140px` desktop, `60–80px` mobile
- Horizontal padding: `32–48px` desktop, `24px` mobile
- Project block gap: 60–100px

### Radii
- Pills: `999px`
- Phone bezel: `36–38px` outer, `30px` inner screen
- Cards / buttons: `12–24px`

---

## Interactions & Behavior

### Shared
- **Smooth scroll:** `html { scroll-behavior: smooth }` for in-page anchors.
- **Theme toggle:** Toggles `data-theme="light|dark"` on `<body>`. Persist to `localStorage` in production.
- **Reveal on scroll:** `IntersectionObserver` with `threshold: 0.1`, adds `.in` class to fade up + translate.
- **Nav scroll state:** Adds bottom border / shadow once `scrollY > 12–24`.

### Atelier-specific
- Hover on project card: phone translateY(-8px) + rotate(±1.5deg), 600ms cubic-bezier(.2,.8,.2,1).
- Nav link underline grows from 0 to 100% width on hover (300ms).
- Theme toggle rotates 20° on hover.

### Studio-specific
- **Custom cursor:** Two layered fixed elements — outer ring + inner dot. Use `mix-blend-mode: difference`. Outer lerps to mouse with 0.18 factor; inner snaps. Outer grows + fills with accent on hover over interactive elements.
- **Spotlight:** `radial-gradient(400px 400px at var(--mx) var(--my), accent 18%, transparent 70%)` on a fixed full-viewport element, `pointer-events: none`.
- **Phone parallax:** On scroll, each `.project__visual` is translated by `(viewport-center-distance) * -0.04`.
- **Tag filter:** Buttons toggle `.dimmed` on non-matching `<article>`s; dimmed = opacity 0.25 + grayscale(0.7).
- **Konami code:** Listen for `↑↑↓↓←→←→ b a`; on match, body gets `filter: hue-rotate(40deg)` for 4s and a toast slides in from bottom.

### Quiet-specific
- **Expandable rows:** Click any `.idx__row` to set `.open`; max-height transitions 0 → 600px over 500ms. Only one open at a time.
- **Cursor glow:** 280px radial gradient lerping to mouse position with 0.08 factor.
- **Row hover:** padding-left animates 0 → 12px; an `→` glyph fades in at the left edge.

---

## State Management

Most of this is presentational. For Next.js, you'll need:

- `theme: 'light' | 'dark'` — Context provider, hydrate from `localStorage` and `prefers-color-scheme`.
- `activeFilter: 'all' | 'productivity' | 'habits' | 'lifestyle'` — local state in Projects component (Studio variant only).
- `openProject: string | null` — local state in ProjectIndex (Quiet variant only).
- No data fetching — content is static. Define projects + posts as a typed array in `lib/content.ts` or MDX.

---

## Assets

- **None bundled.** All visual assets in the prototypes are CSS placeholders.
- **You will need to source or commission:**
  - Profile photo (currently exists at `/assets/branding/profile.jpg` on the live site)
  - 3 project screenshots — one per app, 9:19.5 aspect, ideally a real screen captured from the running app
  - Optional: app icons for each project (Focus Flow, Dev Discipline, Mihrab)
  - Favicon + OG image (already exists at `/assets/branding/og-image.jpg`)

Until those exist, ship the monospace placeholder pattern (`PRODUCT SHOT — focus_flow / timer.dart`) — it looks intentional rather than missing.

---

## Implementation Notes for Claude Code

1. **Start with Atelier** unless the user picked otherwise — it's the lowest-risk default and translates cleanly to a Tailwind theme.
2. **Tailwind config:** Add `cream`, `ink`, `accent` color tokens, `serif: Instrument Serif`, `sans: Geist`, `mono: JetBrains Mono`. Set up dark mode via `class` strategy.
3. **Component breakdown:**
   - `<SiteNav />` — sticky, uses scroll listener for `.scrolled` state
   - `<Hero />` — variant-specific
   - `<Projects />` — takes a `projects` array prop; per-variant card component
   - `<About />` — static; pull bio from MDX if you want to make it editable
   - `<Contact />` — static
   - `<ThemeToggle />` — uses `next-themes`
   - `<ScrollReveal>{children}</ScrollReveal>` — wraps in framer-motion `whileInView` instead of hand-rolled IO
4. **Phone mockup component:** Build a reusable `<PhonePlaceholder label caption />` and a `<PhoneScreenshot src alt />`. Same outer bezel, different inner content.
5. **Motion library:** Use `framer-motion` for scroll reveal and the Studio cursor / parallax. Keep `prefers-reduced-motion` as a kill switch.
6. **Don't lose:**
   - Dark mode (it works in all three variants — port it)
   - The pulsing "open to work" status indicator
   - Mono-labeled placeholder pattern (until real screenshots exist)
7. **Accessibility:**
   - Keep the cursor as a visual layer only — never replace the native pointer for keyboard users (the CSS `cursor: none` is already gated to `(hover: hover)` via `@media (hover: none)`).
   - Color contrast: cream/ink hits AA at body sizes; large display copy is fine. Verify accent on cream — Atelier's accent passes AA at 18px+.
   - Add focus-visible rings on every link/button (the prototypes don't yet).

---

## Files

```
designs/
├── atelier.html      # Direction A — editorial serif
├── studio.html       # Direction B — bold motion + easter eggs
└── quiet.html        # Direction C — mono, type-led
```

Open any of them in a browser to see the live, scrollable design — they're fully self-contained (Google Fonts CDN is the only external dep).

---

## Live site reference
Original site (the thing being replaced): https://www.codewithnabi.dev
