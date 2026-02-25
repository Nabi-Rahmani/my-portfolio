---
description: Analyze task complexity and create Next.js implementation plan
model: claude-sonnet-4-5
---

Analyze the following task and create a structured implementation plan for this Next.js 15 / React 19 / TypeScript project.

## Task: $ARGUMENTS

## Analysis Steps

### 1. Task Classification
- **Type**: Feature / Bug Fix / Refactor / Content / Performance / SEO
- **Complexity**: Simple (1-2 files) / Medium (3-5 files) / Complex (6+ files)
- **Affected areas**: app/ | components/ | data/ | types/ | hooks/ | globals.css

### 2. Architecture Impact
Identify which parts of the project are affected:
- [ ] Types (`src/types/`) — new or modified interfaces
- [ ] Data (`src/data/`) — new content arrays or helper functions
- [ ] Pages (`src/app/`) — new routes or modified pages
- [ ] Components (`src/components/`) — new or modified shared components
- [ ] Hooks (`src/hooks/`) — new or modified custom hooks
- [ ] Styles (`globals.css`) — new CSS custom properties or global styles
- [ ] Config — `next.config.ts`, `tailwind.config.ts`, `sitemap.ts`, `robots.ts`

### 3. Server vs Client Decision
For each new file, determine:
- Server Component (default) — metadata, data fetching, static rendering
- Client Component (`'use client'`) — state, effects, events, Framer Motion, browser APIs

### 4. Implementation Plan

Output a phased plan:

**Phase 1: Types & Data**
- New interfaces in `src/types/`
- New data arrays and helpers in `src/data/`

**Phase 2: Components**
- New shared components in `src/components/`
- Server/client split decisions

**Phase 3: Pages & Routes**
- New pages in `src/app/`
- `generateMetadata()` and `generateStaticParams()` for dynamic routes
- Client companion components (`*Client.tsx`)

**Phase 4: Styling & Polish**
- Tailwind classes using CSS custom properties
- Framer Motion animations (spring transitions, whileInView)
- Responsive design (mobile-first, `md:` breakpoints)

**Phase 5: Validation**
- `npm run build` — type-check and build
- `npm run lint` — ESLint check
- Manual browser check (desktop + mobile, dark + light theme)
- SEO: metadata, sitemap entry, structured data

### 5. Risk Assessment
- Breaking changes to existing pages?
- New dependencies needed?
- Mobile layout considerations?
- SEO impact?

### 6. Files to Create/Modify
List every file with its purpose and whether it's new or modified.
