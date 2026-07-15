---
type: Work Item
title: Writing P1 polish
parent: ../spec.md
---

## What to build

Strong polish for Writing (`/blog` list + post) under the unified Atelier shell. Keep existing reading aids (progress bar, TOC, filters/search as present) usable and consistent. No CMS.

## Required context

- Spec requirement 28; User Story 7
- Files: `src/app/blog/*`, `src/components/BlogLayoutClient.tsx`, `src/components/BlogPostClient.tsx`, `src/components/ArticleContent.tsx`, `src/data/blog.ts`
- Visitor-facing name is **Writing**; route remains `/blog`
- P1 depth: not a full content rewrite of all posts unless required for shell/readability

## Acceptance criteria

- [x] Blog list and post pages match Atelier shell (tokens, type, chrome via WI 1–2)
- [x] Reading aids remain usable (progress/TOC/filter behavior as applicable)
- [x] No CMS or content-platform work introduced
- [x] Labels/nav consistency with **Writing** where user-facing
- [x] `npm run lint` and `npm run build` pass

## Covers

- User Stories: 7
- Requirements: 28
- Testing Strategy: 1-2, 3 (Writing list + one post)
- Interview Ledger: L5, L6

## Blocked by

1 - `01-atelier-design-system-foundation.md`  
2 - `02-unified-site-shell.md`
