## Overview

Polish + modernize all portfolio sections (Home, Blog, Projects, About); extract shared UI lib, animation constants, and utilities to eliminate duplication.

**Spec**: `ai_specs/portfolio-ux-ui-code-quality.md`

## Context

- **Structure**: Next.js 15 App Router, feature-based pages in `src/app/`, shared components in `src/components/`
- **State management**: React `useState`/`useMemo`/`useCallback` only — no external state lib
- **Key finding**: `Project.platform` already exists as `'ios' | 'android' | 'both'` union — use it for filtering; do not add `platforms` array
- **Key finding**: `BlogLayoutClient` is a thin wrapper only; search/filter/`formatDate` live in `src/app/blog/page.tsx` (client component)
- **Key finding**: `BlogPostClient` TOC + reading progress bar are already wired; need visual polish only (active item accent + border)
- **Reference implementations**: `src/app/blog/page.tsx` (search/filter pattern), `src/components/BlogPostClient.tsx` (TOC IntersectionObserver), `src/app/page.tsx` (fadeUp, social icons, card layout)
- **Assumptions**: No test framework — validation is manual + `npm run build` + `npm run lint`

## Plan

### Phase 1: Foundation — Shared Lib + UI Components

- **Goal**: Create shared animations, utils, and UI components; remove all local duplicates
- [x] `src/lib/animations.ts` — export `fadeUp`, `staggerContainer`, `springCard` variants
- [x] `src/lib/utils.ts` — export `formatDate(date: string): string` and `cn(...classes: string[]): string` (inline implementation, no clsx package)
- [x] `src/components/ui/Button.tsx` — variants: `primary`, `secondary`, `ghost`; renders `<a>` when `href` passed, `<button>` otherwise; `disabled` prop supported
- [x] `src/components/ui/Badge.tsx` — variants: `accent` (accent-muted bg), `neutral` (bg-secondary); used for tags/categories
- [x] `src/components/ui/SocialIcon.tsx` — accepts `name: 'github' | 'linkedin' | 'twitter'`; contains all three SVG paths; renders accessible `<a>` wrapper
- [x] `src/components/ui/CardImage.tsx` — Next.js `<Image>` with fill + gradient overlay + hover-scale; `aspectRatio` prop (`'16/9' | '16/10'`)
- [x] `src/components/ui/Skeleton.tsx` — base `<div className="animate-pulse bg-[var(--bg-secondary)] rounded-xl" />`; export `SkeletonBlogCard`, `SkeletonProjectCard` composites matching real card layouts
- [x] `src/app/page.tsx` — remove local `fadeUp`, `socials` array; import from `src/lib/animations` + `SocialIcon`
- [x] `src/app/blog/page.tsx` — remove local `formatDate`; import from `src/lib/utils`
- [x] `src/components/BlogPostClient.tsx` — remove local `formatDate`; import from `src/lib/utils`
- [x] `src/components/Navigation.tsx` — delete commented-out Courses block (lines 41-47 incl. `TODO` comment); remove `'courses'` from `NavSection` type if unused
- [x] `src/app/page.tsx` — replace `<span>` "Coming Soon" store buttons with `<button disabled aria-disabled="true">` + disabled cursor styling
- [x] Verify: `grep -r "const fadeUp" src/` → 0 results; `grep -r "formatDate" src/` → only `src/lib/utils.ts`; `npm run build && npm run lint` pass

### Phase 2: Home / Hero Polish

- **Goal**: Warmer hero, expanded about snippet, two-button contact, mobile-swipeable projects
- [x] `src/app/page.tsx` — Hero: add initials avatar mark (styled `<div>` with accent bg + `NR` text); replace `<h1>Nabi Rahmani</h1>` with two-line pattern (`<p>Hey, I'm</p><h1>Nabi Rahmani</h1>`); update subtitle copy to be warmer/story-driven
- [x] `src/app/page.tsx` — Projects section: wrap cards in horizontal scroll container for mobile (`flex-row overflow-x-auto snap-x`), stacked on desktop; each card gets `snap-start shrink-0 w-[85vw] md:w-auto`; added platform badge using `<Badge variant="neutral">`
- [x] `src/app/page.tsx` — Blog section: replace inline badge spans with `<Badge variant="accent">`; replace inline card image divs with `<CardImage>`
- [x] `src/app/page.tsx` — About snippet: expand to 2-3 sentences + small `<ul>` of 3 personal traits/values before the "Learn more" link
- [x] `src/app/page.tsx` — Contact section: add second button (LinkedIn link) beside email CTA
- [x] Audit all `<a>` tags in `src/app/page.tsx` — ensure `rel="noopener noreferrer"` + `target="_blank"` on all external links
- [x] Verify: `npm run build && npm run lint` pass

### Phase 3: Blog UX + Loading Skeletons

- **Goal**: Debounced search, skeleton placeholders, polished TOC + reading bar, blockquote styling
- [x] `src/app/blog/page.tsx` — add debounce: `useRef<ReturnType<typeof setTimeout>>()` pattern, 300ms delay; also removed unused `useState`/`useEffect` imports
- [x] `src/app/blog/page.tsx` — replace simple `Loading...` Suspense fallback with `<SkeletonBlogCard />` grid (1 big + 2-column)
- [x] `src/components/BlogPostClient.tsx` — TOC active item already styled with accent border + text (pre-existing from Phase 1)
- [x] `src/components/BlogPostClient.tsx` — `readingTime` already prominent via `<ReadTimeVisual>` component near metadata (pre-existing)
- [x] `src/app/globals.css` — `.article-content blockquote` already implemented with `border-left: 4px solid var(--accent)` + accent-muted bg (pre-existing)
- [x] Verify: `npm run build && npm run lint` pass

### Phase 4: Projects Refinement

- **Goal**: Platform filter bar, horizontal screenshot gallery on mobile, platform badges on cards
- [x] `src/app/projects/page.tsx` — added `platform` filter state + filter chips row (`All | iOS | Android | iOS·Android`); filters `allProjects` by `project.platform`; also replaced inline Image with `<CardImage>`
- [x] `src/app/projects/page.tsx` — added `<Badge variant="neutral">` platform badge under each project title
- [x] `src/app/page.tsx` — platform badge already added in Phase 2
- [x] `src/app/projects/[slug]/ProjectDetailClient.tsx` — screenshot gallery already uses `overflow-x-auto snap-x snap-mandatory` with fixed-width cards (pre-existing, well implemented)
- [x] Audit `<Image>` alt text — all descriptive: `${project.title} screenshot ${i+1}`, `${project.title} icon`, etc.
- [x] Verify: `npm run build && npm run lint` pass

### Phase 5: About Page Modernization

- **Goal**: Story-first hero, human skill heading, enriched timeline, bottom CTA
- [ ] `src/app/about/page.tsx` — read full file first; add opening story paragraph (first-person, 2-4 sentences, warm tone) before existing values/skills sections
- [ ] `src/app/about/page.tsx` — rename skills section heading to "What I work with" (or equivalent human phrasing)
- [ ] `src/app/about/page.tsx` — for each experience entry, add a 1-2 sentence context sentence ("what I built / what I learned") if the data has only company + dates; enrich inline in the component
- [ ] `src/app/about/page.tsx` — add bottom CTA section: `<h2>Let's build something together</h2>` + email `<Button variant="primary">` + LinkedIn `<Button variant="secondary">`; add `{/* TODO: link to /cv PDF when available */}` placeholder
- [ ] Verify: about page opens with first-person story; skills heading is human; timeline has context sentences; bottom CTA visible; `npm run build && npm run lint` pass

## Risks / Out of scope

- **Risks**:
  - Mobile horizontal scroll on project cards may conflict with page scroll on some iOS browsers — test touch behavior; fall back to stacked layout if janky
  - Skeleton flash: blog data loads synchronously from a static array, so `Suspense` may resolve immediately; confirm actual flash is visible before over-engineering
  - `cn` utility: if only used for simple string joins, a trivial implementation suffices; do not add `clsx` package
- **Out of scope**: New pages/routes, CMS integration, contact form backend, test framework setup, Courses feature, CV PDF generation
