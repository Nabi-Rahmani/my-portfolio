# Home P0 — Owner copy approval notes

Per Spec [L5] / User Story 9: agent drafted warmer hiring-manager-facing copy. **Please approve, tweak, or reject** before treating wording as final.

## Hero

| Element | Draft (live on `/`) | Notes |
|--------|---------------------|--------|
| Availability pill | From `siteConfig.availability` (`Available for freelance & full-time remote`) | Config seam — change in `src/config/site.ts` |
| Role line | `Flutter · Mobile engineer · Ankara` | Replaces earlier “Flutter Developer · Ankara, Turkey” |
| Tagline | `I build Flutter apps that feel inevitable — offline-first, cleanly architected, and actually shipped to real users.` | Warmer + explicit “real users” |
| Sub-line | `Hiring for a Flutter / mobile engineer? Here is selected work, then a straight path to reach me.` | Primary-visitor framing |
| Primary CTA | `View selected work` | Unchanged intent |
| Secondary CTA | `Get in touch` | **New** — cold-land contact path |
| Chips | `3+ years shipping` · `3 apps on Play` · `∞ çay` | Honest identity, not fake download metrics |

## Selected work

| Element | Draft |
|--------|--------|
| Section lead | `Real apps on Google Play — not concept decks.` |
| Focus Flow | `A calm focus timer for deep work — sessions, soundscapes, and analytics that stay out of the way.` |
| Dev Discipline | `A 60-day discipline system for engineers who want habits that stick — not another empty streak counter.` |
| Raha | `A quiet Islamic companion for daily worship — prayer times, Quran, and Hijri calendar in one calm app.` |

## About preview

| Element | Draft |
|--------|--------|
| Pull quote | `Craft over speed. Ideally both.` (unchanged) |
| Bio | Emphasizes Afghanistan → Ankara, clean architecture, offline-first, “finishes apps — not just prototypes” |
| CTA | `Let's talk →` → `#contact` |

## Contact

| Element | Draft |
|--------|--------|
| Heading | `Have a role or project in mind?` |
| Support | `Freelance, full-time remote, or a collaboration — tell me what you're building. I reply personally.` |
| Fallback (no form key) | `Prefer email? Reach me directly — I read every message.` |

## How to request changes

Reply with preferred strings (or “approve as-is”). Implementation lives mainly in `src/app/page.tsx` and `siteConfig.availability`.
