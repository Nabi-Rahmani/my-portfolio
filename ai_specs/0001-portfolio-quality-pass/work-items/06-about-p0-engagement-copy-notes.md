# About P0 — Owner copy approval notes

Per Spec [L5] / User Story 9: agent drafted warmer hiring-manager-facing copy for `/about`. **Please approve, tweak, or reject** before treating wording as final.

## Hero

| Element | Draft (live on `/about`) | Notes |
|--------|---------------------------|--------|
| Availability pill | From `siteConfig.availability` | Config seam — change in `src/config/site.ts` |
| Role line | `Flutter · Mobile engineer · Ankara` | Matches home hero |
| H1 | `I finish apps — not just prototypes.` | Story-first; second clause italic accent |
| Lead | Afghanistan → Ankara; clean architecture; offline-first; “products people actually open on a Tuesday morning” | Personal, scannable |
| Primary CTA | `Get in touch` → `#contact` | On-page contact path |
| Secondary CTA | `View projects` → `/projects` | Proof path |

## Story

| Element | Draft |
|--------|--------|
| Pull | `From Mazar-i-Sharif to shipping for the world.` |
| Body | Practical path, Flutter choice, Riverpod/Drift/Supabase, smaller offline-first surface over flaky demos, çay + writing |
| Quote | `Craft over speed. Ideally both.` (aligned with home About preview) |

## Quick facts

| Label | Draft value |
|-------|-------------|
| Based | Ankara, Turkey · GMT+3 |
| Focus | Flutter · Mobile · Offline-first |
| Status | `siteConfig.availability` |
| Speaks | English · Persian (Dari) · Turkish |
| Shipped | 3 apps on Google Play |
| Experience | 3+ years building mobile products |

## How I work

| Title | Draft description |
|-------|-------------------|
| Ship, then refine | Launch teaches what design reviews cannot |
| Offline is a feature | Product stays solid when the network does not |
| Architecture that ages | Clean boundaries; future-me should not hate the codebase |

## Shipped (story blurbs)

Aligned with home project value lines (Focus Flow, Dev Discipline, Raha) + short stack notes. Links to project detail routes.

## Contact

| Element | Draft |
|--------|--------|
| Heading | `Have a role or project in mind?` |
| Availability | `siteConfig.availability` (mono, accent) |
| Support | Freelance / full-time remote / collaboration — reply personally |
| Form | `ContactForm` when Web3Forms key present |
| No key | `Prefer email? Reach me directly — I read every message.` |
| Mailto subject | `Hello from codewithnabi.dev` |
| Gated | Calendly + CV only when `siteConfig` allows |

## How to request changes

Reply with preferred strings (or “approve as-is”). Implementation lives mainly in `src/app/about/page.tsx` and `siteConfig.availability`.
