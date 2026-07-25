---
type: Work Item
title: Home page — build direction 1b The Terminal
parent: ../README.md
---

## What to build

A complete rebuild of `src/app/page.tsx` as direction `1b`, all six sections. Fidelity is high: colours, type sizes, weights, letter-spacing, borders and spacing in the handoff are final and should be matched closely.

**Scaffold.** Content max-width 1280px, centred. 40px horizontal page padding. Every major section separated by a full-bleed 1px `line16` rule rather than whitespace. Vertical section padding stays between 30px and 46px and never exceeds it — this is the main lever that fixes the "too much empty vertical space" complaint, so it is a hard constraint, not a suggestion.

**§2 Hero.** Grid `1.35fr 1fr` with a `line16` bottom rule.
- Left, 46px/40px/40px: a `#7BC47F` dot plus `AVAILABLE — FREELANCE & FULL-TIME REMOTE` as a mono eyebrow; H1 in Instrument Sans 600 / 42px / 1.12 / `-0.025em`, capped around 19ch — "Flutter apps that hold up after the launch week."; a lede capped at 52ch with `text-wrap: pretty`; then a filled `#F5EFE3` / `#17120C` "Read the writing →" to `/blog` and an outlined `1px solid rgba(245,239,227,.25)` email button to `contactMailto()`.
- Right, `border-left: 1px solid var(--line-16)`: a 2×2 stat grid with internal hairlines. Figures Instrument Sans 600 / 30px / `-0.03em` in accent; labels mono 11.5px `#A99B85`, 5px below. Cells are TOTAL INSTALLS, RATINGS, YEARS SHIPPING and ARTICLES, each read from `src/config/proof.ts` and **omitted entirely when its value is undefined**.

**§3 Writing + Now.** Grid `1fr 380px` with a `line16` bottom rule.
- Left, 32px/40px/34px with `border-right: 1px solid var(--line-16)`: a `LATEST WRITING` eyebrow and an `All N posts →` link in accent to `/blog`, where N is derived from `getArticleCount()`. Then four rows, each `display:flex; gap:20px; padding:16px 0; border-top: 1px solid var(--line-13)` with a bottom rule on the last: a fixed 70px mono date column in `#94886F`, the title in Instrument Sans 600 / 16.5–17px / 1.3 / `-0.012em` with a 13.5px / 1.55 dek beneath, and the read time pushed right with `margin-left:auto`. Source the four from `getFeaturedPosts()` — five posts are flagged featured today.
- Right, `#1E1710` panel, 32px/30px/34px: a `NOW` eyebrow above a 14px / 1.6 paragraph in `#CBBFA9` derived from `src/data/now.ts`; a `line16` divider; a `TOOLBOX` eyebrow above six chips (`1px solid var(--line-24)`, radius 5px, 5px/10px padding, mono 11.5px `#CBBFA9`, 7px gap, wrapping) sourced from the `Flutter / Dart` category in `src/data/uses.ts`. Neither block is hard-coded in the page.

**§4 Apps.** An `APPS I BUILT AND MAINTAIN ALONE` eyebrow, then three data rows on a `44px 190px 1fr 130px 100px 90px` grid with 16px gap, 16px vertical padding and `border-top: 1px solid var(--line-13)`.
- Column 1: a 36px tile, radius 9px, `#2A2118`, `1px solid var(--line-18)`, holding the **real app icon**. `project.iconLight` and `project.iconDark` already point at files under `public/assets/projects/`, so the initials placeholders from the design are replaced immediately.
- Then the name in 600/17px, the description in 13.5px `#A99B85` (use `project.subtitle`), installs in mono 500/13px accent, rating in mono 13px `#A99B85`, and a right-aligned `Open ↗`.
- The whole row links to `/projects/[slug]`. Installs and rating cells omit when the proof value is undefined.
- Leave a documented slot for the clean device screenshots the owner will supply. Do not reinstate the cropped `coverImage` marketing mockups — those are exactly what was called out as looking fake.

**§5 Contact.** 44px/40px padding, flex with `align-items: flex-end; justify-content: space-between` and 40px gap.
- Left: the **only serif in this entire direction** — Playfair Display italic 700 / 38px / 1.1 / `-0.01em`, capped at 16ch: "Got something worth building properly?" — plus a 14px `#A99B85` line, "Ankara, Turkey · works remote · replies within a day".
- Right: an accent-filled "Write an email ↗" with `#17120C` text pointing at `contactMailto()`, and an outlined "GitHub".

**Removals.** The Atelier hero, the `principles` array, the three-card project grid, the `CardImage` blog cards, and the `ContactForm` dynamic import block all go.

## Required context

- **The home page loses its inline contact form.** `1b` §5 is a mailto CTA, but spec 0001 [L7] specifies a full form contract when a Web3Forms key is configured. `ContactForm.tsx` stays in the repo untouched and available for another surface; putting a form back on home is a follow-up decision for the owner, not something to silently restore here.
- Copy in the handoff is written to ship as-is, but spec 0001 [L5] requires owner approval of visitor-facing wording. Treat the hero, contact and eyebrow strings as drafts pending sign-off.
- `getFeaturedPosts()` and `getFeaturedProjects()` in `src/data/` are the required read path per `CLAUDE.md` — do not filter the arrays directly.
- Article and app lists come from `src/data/*`, which satisfies the handoff's "not hard-coded in the page" requirement. Spec 0001 Technical Decision 5 keeps static TypeScript data modules and rules out a CMS, so no MDX migration happens here.
- The page is currently a `'use client'` component using Framer Motion. Reveal behaviour is retuned in `05-interaction-motion-a11y.md`; build the structure first and keep the existing reveal wiring functional in the meantime.
- Section anchors (`#projects`, `#about`, `#contact`) feed `scrollToHash` from the header. Keep anchors that the nav still targets.

## Acceptance criteria

- [x] `src/app/page.tsx` renders the six `1b` sections in order, separated by full-bleed 1px `line16` rules, with no section exceeding 46px vertical padding
- [x] Hero matches `1b` §2: `1.35fr 1fr` grid, availability dot and mono eyebrow, 42px `-0.025em` H1 at roughly 19ch, 52ch lede, filled plus outlined CTA pair
- [x] The stat grid is 2×2 with internal hairlines, every figure traces to `src/config/proof.ts`, and cells with undefined values are omitted rather than rendered empty or invented
- [x] The writing block renders four rows from `getFeaturedPosts()` with a fixed 70px mono date column, `line13` separators and read time pushed right; the "All N posts →" count is derived, not typed
- [x] The Now panel renders on `#1E1710` from `src/data/now.ts`, and Toolbox chips come from `src/data/uses.ts` — neither is hard-coded in the page
- [x] App rows use the six-column grid with real icons from `project.iconLight` / `iconDark`, the whole row links to `/projects/[slug]`, and no `coverImage` marketing mockup appears anywhere on the page
- [x] Exactly one serif element exists on the page — the Playfair italic contact line; grepping `page.tsx` for the serif font variable returns a single use
- [x] No Atelier remnants: no `principles` array, no decorative blob/dots/lines, no three-card project grid, no `editorial-display` clamp headings
- [x] `npm run lint` and `npm run build` pass

## Covers

- Screens / Views: `1b` §2 Hero, §3 Writing + Now, §4 Apps, §5 Contact
- Design Tokens: Geometry (section rhythm, page padding, radii)
- Fidelity: exception 2 (app screenshots intentionally absent; leave a slot)
- Assets: App icons (replace initials with the real icons the owner already has)
- State Management: article and app lists come from content data, not the page

## Blocked by

- `01-terminal-token-foundation.md`
- `03-proof-data-seam.md`
