---
type: Work Item
title: Honest conversion, contact, and store links
parent: ../spec.md
---

## What to build

Enforce honest conversion and contact behavior: `siteConfig`-gated CTAs (availability, CV, Calendly, Web3Forms), contact form happy/error/fallback contract, and no primary store/CTA links that go to `#` or other dead targets. Never invent metrics.

## Required context

- Spec requirements 16, 20–27, 33; TD 3–4; User Stories 4, 8
- Files: `src/config/site.ts`, `src/components/ContactForm.tsx`, project data `src/data/projects.ts`, any store link rendering on home/projects/detail
- Contact when key present: name, email, project type, optional budget, message ≥10 chars; states idle → submitting → success | error
- No key: no broken form; mailto (+ real secondary CTAs only)
- Failure: keep typed input, retry, “email me directly” mailto; never silent fail or fake success for real users
- Honeypot may still success-trap bots

## Acceptance criteria

- [x] CV button only when `cvAvailable` is true (no live 404 CTA)
- [x] Calendly/booking only when URL non-empty
- [x] Contact form only when Web3Forms key configured; otherwise mailto (or equivalent real) fallback
- [x] Form validation/errors preserve user-typed message; submitting shows disabled/progress feedback
- [x] Success replaces form without auto double-send loop
- [x] API/network errors show retry + direct email path
- [x] Availability line visible near contact
- [x] No primary store button navigates to `#` or known-dead URL (hide or non-primary “not released”)
- [x] No invented metrics or social proof numbers
- [x] `npm run lint` and `npm run build` pass

## Covers

- User Stories: 4, 8
- Requirements: 16, 20-27, 33
- Technical Decisions: 3-4
- Testing Strategy: 1-2, 3 (contact path), 4 (siteConfig + project link seams)
- Interview Ledger: L4, L7

## Blocked by

1 - `01-atelier-design-system-foundation.md`
