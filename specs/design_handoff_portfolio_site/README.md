# Handoff: codewithnabi.dev home page redesign — 3 directions

## Overview

The existing personal site (codewithnabi.dev) reads as a template: very low information
density, oversized serif headlines on every section, generic 3-card grids, and no hard
proof. The owner's stated #1 goal is **building an audience through writing**, so the
redesign makes articles the primary content of the home page, compresses vertical space
heavily, and puts real numbers (installs, ratings, years) above the fold.

This bundle contains **three complete alternative home pages**. Exactly one should be
chosen and built; the other two are there for comparison and for cherry-picking parts.

| id | Name | One-line idea |
|----|------|---------------|
| `1a` | **The Index** | Light, zero decoration, everything is a list. Reads like documentation. |
| `1b` | **The Terminal** | Keeps the existing dark-brown identity but compressed; serif used exactly once. |
| `1c` | **The Journal** | Positions the site as a publication: masthead, lead essay, newsletter block. |

**Recommendation:** `1b`. It retains the brand the owner already has (dark brown / cream /
accent) while fixing every stated complaint, and its data-row treatment of the apps section
scales to more apps without redesign.

## About the Design Files

`Portfolio Directions.dc.html` (plus its runtime `support.js`) is a **design reference
created in HTML** — a prototype that shows intended look, spacing, type and copy. It is
**not production code to copy directly.** The file is a single-page canvas that renders all
three directions side by side at a fixed 1280px design width; it is not a real site, has no
routing, and is not responsive.

The task is to **recreate the chosen direction in the target codebase's own environment**
(Next.js / Astro / SvelteKit / whatever the site is built on today) using that project's
established conventions — its component structure, styling approach, font loading, MDX or
CMS pipeline for articles, and image handling. If no codebase exists yet, pick the most
appropriate framework for a content-led personal site (a static-site generator with MDX is
the natural fit) and implement there.

Open the file in a browser to inspect it. Every value below can also be read off the file
directly, since all styling is inline.

## Fidelity

**High-fidelity.** Colors, type sizes, weights, letter-spacing, borders and spacing are
final and should be matched closely. Two deliberate exceptions:

1. **All numbers are placeholders.** Installs (23,600 / 12,400 / 8,100 / 3,100), ratings
   (4.7 / 4.8 / 4.6 / 410 ratings), years (6), article counts (14), subscriber count
   (1,412) and read counts (4,200) are invented for layout purposes. Replace with real
   figures — ideally pulled from the Play Store Developer API and the newsletter provider
   rather than hard-coded.
2. **App screenshots are intentionally absent.** The current site's cropped marketing
   mockups were called out as looking fake. The designs use initials/letterform tiles and
   colored rules as stand-ins. Real device screenshots will be supplied and framed later —
   leave a slot, don't reinstate the old mockups.

Copy is written to be shipped as-is (tone: plain and specific, engineer-to-engineer), but
the owner should review it.

---

## Design Tokens

### Dark palette (used by `1b`, and by `1c`'s newsletter block)

| Token | Value | Use |
|-------|-------|-----|
| `dark.bg` | `#17120C` | page background |
| `dark.bgDeep` | `#120E09` | footer bar |
| `dark.panel` | `#1E1710` | sidebar / secondary panel |
| `dark.tile` | `#2A2118` | app icon tiles |
| `dark.bgInk` | `#14110C` | `1c` newsletter block background |
| `dark.text` | `#F5EFE3` | primary text (cream) |
| `dark.textMuted` | `#A99B85` | body copy, labels |
| `dark.textFaint` | `#94886F` | mono metadata (dates, read times, footer) |
| `dark.accent` | `#F2EDE3` **(default)** | accent text, CTA fill, hairlines |

`dark.accent` is a tweakable value. Default is **pearl white `#F2EDE3`** — the original gold
`#E5C88A` is still available as an option, along with sage `#C9D6D0` and clay `#D9C4B0`.
Implement it as one CSS custom property, e.g. `--accent`, because it drives four things:

- accent text (labels, stat figures, "All 14 posts →")
- the filled CTA background (`Write an email ↗`), with `#17120C` text on top
- every hairline rule, as `rgba(accent, α)`
- the small status/subscribe pill borders

**Hairline opacities** are derived from a single `ruleStrength` value, default `0.16`:

| Derived | Multiplier | Default value | Use |
|---------|-----------|---------------|-----|
| `line16` | ×1.00 | `rgba(242,237,227,0.16)` | major section dividers, header/footer borders |
| `line13` | ×0.82 | `rgba(242,237,227,0.131)` | list row separators |
| `line18` | ×1.13 | `rgba(242,237,227,0.181)` | app icon tile borders |
| `line24` | ×1.50 | `rgba(242,237,227,0.24)` | toolbox chip borders |
| `line30` | ×1.90 | `rgba(242,237,227,0.304)` | subscribe pill border, theme toggle |

Also used in dark: `rgba(245,239,227,.25)` for outline-button borders, `#7BC47F` for the
"available" status dot.

### Light palette (used by `1a`, `1c`)

| Token | Value | Use |
|-------|-------|-----|
| `light.paper` | `#FBF8F1` (`1a`) / `#FDFBF6` (`1c`) | page background — tweakable |
| `light.paperAlt` | `#F3EEE2` (`1a`) / `#F6F1E5` (`1c`) | banded sections, footer |
| `light.ink` | `#191510` (`1a`) / `#14110C` (`1c`) | primary text |
| `light.body` | `#5E5548` / `#4E4638` | body copy |
| `light.muted` | `#6E6455` / `#7A7062` | secondary metadata |
| `light.faint` | `#857A66` | row indices, read times |
| `light.line` | `#E4DDCD` / `#DED6C4` | hairlines |
| `light.lineSoft` | `#EDE6D6` | in-card dividers |
| `light.border` | `#D8D0BE` / `#C4B99F` | outline buttons, underlines |
| `light.accent` | `#8A6212` | accent labels and links |
| `light.ok` | `#3D8A46` | availability dot |

`1c` app card top rules: `#2D5FA8` (Focus Flow), `#5B4A86` (Raha), `#A8672D` (Dev Discipline).

### Typography

Three families, loaded from Google Fonts:

- **Instrument Sans** — 400, 500, 600, 700. UI and body. *Not* Inter/Poppins; the geometric
  grotesque on the current site is replaced by this.
- **JetBrains Mono** — 400, 500, 700. All metadata, eyebrow labels, dates, counts.
- **Playfair Display** — 700, 900, 700 italic. Display serif. Used heavily in `1c`, and
  **exactly once** in `1b` (the closing line, italic 700). Absent from `1a`.

Scale as used:

| Role | Spec |
|------|------|
| Hero H1 (`1a`) | Instrument Sans 600 / 40px / 1.15 / `-0.022em` / max 20ch |
| Hero H1 (`1b`) | Instrument Sans 600 / 42px / 1.12 / `-0.025em` / max 19ch |
| Hero H1 (`1c`) | Playfair Display 700 / 46px / 1.05 / `-0.02em` / max 16ch |
| Masthead (`1c`) | Playfair Display 900 / 27px / `-0.015em` |
| Hero lede | Instrument Sans 400 / 16–16.5px / 1.6–1.65 / max 52–58ch, `text-wrap: pretty` |
| Section eyebrow | JetBrains Mono 500 / 11–12px / `letter-spacing: 0.14em` / uppercase |
| Article title (list) | Instrument Sans 600 / 16.5–17px / 1.3 / `-0.012em` |
| Article title (`1c` secondary) | Playfair Display 700 / 20px / 1.2 / `-0.01em` |
| Article dek | Instrument Sans 400 / 13.5px / 1.55 |
| Stat figure | Instrument Sans 600 / 24px (`1a`) or 30px (`1b`) / `-0.02…-0.03em` |
| Metadata | JetBrains Mono 400 / 11.5–12px |
| Button label | Instrument Sans 500–600 / 12.5–14px |
| App name | Instrument Sans 600 / 16–17px, or Playfair 700 / 21px in `1c` |

Minimum text size anywhere is **11px** (mono labels only). Contrast was audited: all small
mono metadata meets ≥4.5:1 against its background.

### Geometry

- **Radii:** `999px` for all pills/buttons; `10px` outer card; `9px` app icon tile; `8px`
  `1c` app cards; `5px` toolbox chips; `6px` accent top-rule on `1c` cards.
- **Borders:** always exactly `1px`, except `1c`'s masthead bottom rule which is `2px solid #14110C`.
- **Shadows:** none inside the designs. Cards sit on hairlines, not elevation.
- **Horizontal page padding:** 40px. Inner panel padding 20–36px.
- **Section rhythm:** every major section is separated by a full-bleed 1px rule, not by
  whitespace. Vertical section padding is 30–46px, never more — this is the main lever that
  fixes the "too much empty vertical space" complaint.
- **Design width:** 1280px. Not yet specified below `1280px` — see Responsive below.

---

## Screens / Views

There is one screen per direction: the **home page**. Sections are listed top to bottom.

### `1a` — The Index

Background `#FBF8F1`, text `#191510`. No serif, no cards, no images. Every group is a rule-separated list.

1. **Header** — 14px/40px padding, bottom `1px solid #E4DDCD`, three-part flex
   (`space-between`).
   - Left: 7px accent dot `#8A6212` + `nabi.dev` in JetBrains Mono 500 12.5px, `0.06em`.
   - Center: nav — Writing / Apps / About / GitHub, Instrument Sans 500 13px `#5E5548`,
     26px gap. Active item is `#191510` with a `1px solid #191510` bottom border, 2px below.
   - Right: `↑ 1.4k readers/mo` (mono 12px `#6E6455`) + `Subscribe` pill
     (`1px solid #191510`, 6px/14px, 12.5px).
2. **Hero** — CSS grid `1fr 300px`, right column separated by `1px solid #E4DDCD`.
   - Left (44px/40px/38px padding): eyebrow `MUHAMMAD NABI RAHMANI · ANKARA`; H1
     "I write about the parts of Flutter that only show up in production."; lede; two
     buttons — filled `#191510`/`#FBF8F1` "Read the latest →" and outlined
     `1px solid #D8D0BE` "Hire me for Flutter work". 10px gap.
   - Right: four stacked stat cells, each 18px/24px with a bottom hairline —
     SHIPPED **23,600** "installs across 3 apps" · RATED **4.7 ★** "avg. Play Store, 410
     ratings" · EXPERIENCE **6 yrs** "Flutter since 1.12" · STATUS (background `#F3EEE2`,
     `flex:1`) green dot + "Open to freelance".
3. **Writing** — header row `WRITING — 14 POSTS` + "All posts" (12.5px, `1px solid #C9BFA9`
   underline). Then four rows, each a grid `52px 1fr 150px 60px`, 15px vertical padding,
   `border-top: 1px solid #E4DDCD` (last row also has a bottom border): zero-padded index
   (mono 12px `#857A66`), title + dek, date (mono 12px `#6E6455`), read time
   (mono 12px `#857A66`, right-aligned). **Row hover:** background `#F3EEE2`.
4. **Apps** — eyebrow `APPS — SOLO-BUILT, ON THE PLAY STORE`, then a 3-column grid built as
   `gap: 1px` over a `#E4DDCD` background with a `1px` outer border, so the gaps *are* the
   rules. Each cell 20px padding: name + rating on one baseline row, description, then a
   14px-above row of mono 11.5px metadata — installs in `#8A6212`, stack in `#857A66`.
5. **Footer** — 20px/40px, `#F3EEE2`, top hairline. Left: `© 2026 · Flutter engineer, Ankara`.
   Right: GitHub / LinkedIn / email, 20px gap.

### `1b` — The Terminal *(recommended)*

Background `#17120C`, text `#F5EFE3`. All rules are `rgba(accent, α)`.

1. **Header** — 13px/40px, bottom `line16`. Left: 6px accent dot + `CODEWITHNABI` (mono 500
   12px, `0.12em`, accent). Center nav `#A99B85` with active `#F5EFE3`, 24px gap. Right:
   `Subscribe` pill (`1px solid line30`, accent text) + a 28px circular theme toggle
   (`1px solid line30`, `☾` glyph).
2. **Hero** — grid `1.35fr 1fr`, bottom `line16`.
   - Left, 46px/40px/40px: green dot + `AVAILABLE — FREELANCE & FULL-TIME REMOTE`;
     H1 "Flutter apps that hold up after the launch week."; lede (max 52ch); filled
     `#F5EFE3`/`#17120C` "Read the writing →" and outlined
     `1px solid rgba(245,239,227,.25)` email button.
   - Right, `border-left: 1px solid line16`, a 2×2 grid of stat cells with internal
     hairlines. Figures Instrument Sans 600 30px `-0.03em` in accent; labels mono 11.5px
     `#A99B85`, 5px below. **23.6k** TOTAL INSTALLS · **4.7★** 410 RATINGS · **6** YEARS
     SHIPPING · **14** ARTICLES.
3. **Writing + Now** — grid `1fr 380px`, bottom `line16`.
   - Left (32px/40px/34px, `border-right: line16`): `LATEST WRITING` + `All 14 posts →`
     (accent). Four rows, each `display:flex; gap:20px; padding:16px 0; border-top: line13`
     (last also bottom): fixed 70px mono date column `#94886F`, title + dek, read time
     pushed right with `margin-left:auto`.
   - Right (`#1E1710`, 32px/30px/34px): `NOW` + a 14px/1.6 paragraph `#CBBFA9`; a `line16`
     divider; `TOOLBOX` + six chips (`1px solid line24`, radius 5px, 5px/10px, mono 11.5px
     `#CBBFA9`, 7px gap, wrapping).
4. **Apps** — eyebrow `APPS I BUILT AND MAINTAIN ALONE`, then three data rows, grid
   `44px 190px 1fr 130px 100px 90px`, 16px gap, 16px vertical padding, `border-top: line13`.
   Columns: 36px rounded-9px tile (`#2A2118`, `1px solid line18`, accent initials 600 13px)
   · name 600 17px · description 13.5px `#A99B85` · installs mono 500 13px accent · rating
   mono 13px `#A99B85` · `Open ↗` right-aligned.
5. **Contact** — 44px/40px, flex `align-items:flex-end; space-between`, 40px gap. Left: the
   **only serif in this direction** — Playfair Display italic 700 38px/1.1, `-0.01em`, max
   16ch: "Got something worth building properly?" plus a 14px `#A99B85` line
   "Ankara, Turkey · works remote · replies within a day". Right: accent-filled
   "Write an email ↗" (`#17120C` text) + outlined "GitHub".
6. **Footer** — 18px/40px, `#120E09`, top `line16`, two mono 11.5px `#94886F` lines.

### `1c` — The Journal

Background `#FDFBF6`, text `#14110C`.

1. **Masthead** — 16px/40px/14px, `border-bottom: 2px solid #14110C`. Left: `ISSUE 14` /
   `ANKARA` (mono 500 12px, `0.05em`, `#5E5548`, 22px gap). Center: `Code With Nabi`
   (Playfair 900 27px). Right: Archive / Apps / About / **Subscribe** (600 `#14110C`).
2. **Standfirst bar** — 8px/40px, `#F6F1E5`, bottom `1px solid #DED6C4`. Left: the
   publication's one-line promise. Right: `1,412 SUBSCRIBERS · 23.6K INSTALLS · 4.7★ AVG`
   in accent `#8A6212`.
3. **Lead + secondary stack** — grid `1.5fr 1fr`, bottom hairline.
   - Left (38px/36px/36px, `border-right`): eyebrow `THIS WEEK · STATE MANAGEMENT`; H1
     Playfair 700 46px; 16.5px/1.6 standfirst (max 56ch); then a row with a filled
     `#14110C` pill "Read · 12 min", `SEP 10, 2025`, and `4,200 reads` in accent.
   - Right: three article cells, 20px/26px, hairline-separated — category eyebrow (mono
     10.5px `0.13em` accent), Playfair 700 20px/1.2 title, mono 12px date + read time. Then
     a `#F6F1E5` `flex:1` cell: "Ten more in the archive" / "Browse →".
4. **Field notes (apps)** — banded `#F6F1E5`, 30px/40px/34px. Header row `FIELD NOTES — WHAT
   I SHIP THE IDEAS ON` + `All three apps →`. Three cards in a 3-col grid, 20px gap:
   background `#FDFBF6`, `1px solid #DED6C4`, radius 8px, `overflow:hidden`, a 6px colored
   top rule, then 18px/20px/20px content — Playfair 700 21px name + mono rating on one
   baseline, 13.5px/1.55 description, and a footer row above a `1px solid #EDE6D6` divider
   with installs (accent mono) and "Case study →".
5. **Author + newsletter** — grid `1fr 1fr`, hairline between.
   - Left (32px/36px): `THE AUTHOR` + a 15px/1.7 bio; three underlined links (GitHub,
     LinkedIn, Full CV), 18px gap.
   - Right (`#14110C`, `#FDFBF6` text): `GET IT IN YOUR INBOX` in accent; Playfair 700
     26px/1.15 "One deep Flutter note, every other Tuesday."; an email field (flex 1,
     `1px solid rgba(253,251,246,.25)`, radius 999px, 11px/18px, placeholder
     `rgba(253,251,246,.45)`) + accent-filled Subscribe button, 8px gap; then
     `NO SPAM · UNSUBSCRIBE ANY TIME` in mono 11.5px `rgba(253,251,246,.4)`.
6. **Footer** — 18px/40px, two mono 11.5px `#7A7062` lines.

---

## Interactions & Behavior

The prototype is static; these are the intended behaviors to implement.

- **Article rows** — entire row is one link to the post. Hover: background tint
  (`#F3EEE2` light / `rgba(accent,0.04)` dark), the title moves to full accent-free primary
  color, and the read-time column can shift 2px right. 120ms `ease-out`.
- **App rows / cards** — whole row links to the project case-study page; the `Open ↗` /
  `Case study →` affordance underlines on hover.
- **Buttons** — filled buttons darken/lighten ~6% on hover; outline buttons raise their
  border to the next opacity step. 120ms.
- **Theme toggle** (`1b` header) — switches dark/light. This must be **consistent
  site-wide**: the current site is dark on home and light on project pages, which was
  called out as a bug, not a feature. Persist the choice in `localStorage`, respect
  `prefers-color-scheme` on first visit, and set the class before first paint to avoid a
  flash.
- **Subscribe** — email field with inline validation (required, valid email shape),
  optimistic "Thanks — check your inbox" replacing the form in place; error state shows a
  single line under the field, no modal.
- **Motion** — the owner did not choose a motion level, so keep it minimal: a one-time
  8px/opacity fade-up per section on first scroll into view (`IntersectionObserver`,
  180ms, `cubic-bezier(.2,.6,.2,1)`, 40ms stagger between rows), respecting
  `prefers-reduced-motion: reduce`. No parallax, no scroll-jacking.
- **Focus states** — every interactive element needs a visible ring; use a 2px offset
  outline in the accent color. The prototype does not show these.

## State Management

Minimal — this is a content site.

- `theme: 'dark' | 'light'` — persisted, initialised from `localStorage` then
  `prefers-color-scheme`.
- `subscribeStatus: 'idle' | 'submitting' | 'success' | 'error'` — local to the form.
- Article and app lists should come from content files (MDX front-matter) or a CMS, not be
  hard-coded as they are in the prototype.
- Install counts and ratings should be fetched/cached at build time from a real source, with
  a hard-coded fallback so a failed fetch never renders an empty stat cell.

## Responsive Behavior

Not designed yet — the prototype is fixed at 1280px. Intended behavior when implementing:

- **≥1120px** — as designed, content max-width 1280px, centered.
- **760–1119px** — hero and Writing/Now grids collapse to single column (stat grids stay
  2×2); app data rows drop the description column and stack name + metrics.
- **<760px** — everything single column; header nav becomes a compact row or sheet; article
  rows keep the date but move it above the title; padding drops 40px → 20px.
- Confirm the mobile layouts before building them; don't infer them from the desktop file.

## Assets

- **Fonts:** Instrument Sans, JetBrains Mono, Playfair Display — Google Fonts. Self-host and
  subset in production; preload the two used above the fold.
- **Icons:** none. The only glyphs are text characters (`→ ↗ ★ ☾ ©`) and CSS dots. Do not
  introduce an icon library.
- **App icons:** placeholder initial tiles (`FF`, `R`, `DD`). Replace with the real app
  icons the owner already has.
- **App screenshots:** **missing on purpose.** Clean device screenshots will be supplied;
  do not reuse the current site's cropped store mockups.
- **Author photo:** not used in any direction. If added later it belongs in `1c`'s author
  block only.

## Files

- `Portfolio Directions.dc.html` — all three directions, side by side, 1280px each. Open
  directly in a browser. All styling is inline, so any value in this README can be verified
  by reading the markup. Options are anchored: `#1a`, `#1b`, `#1c`.
- `support.js` — the prototype runtime only. **Not part of the deliverable**; do not port it.

Three values in the prototype are wired as tweakable controls (`darkAccent`,
`darkRuleStrength`, `lightPaper`). In production these become CSS custom properties; only
`darkAccent` is likely worth exposing long-term.
