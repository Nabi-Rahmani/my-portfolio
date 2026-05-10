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
- [ ] `src/lib/animations.ts` — export `fadeUp`, `staggerContainer`, `springCard` variants
- [ ] `src/lib/utils.ts` — export `formatDate(date: string): string` and `cn(...classes: string[]): string` (inline implementation, no clsx package)
- [ ] `src/components/ui/Button.tsx` — variants: `primary`, `secondary`, `ghost`; renders `<a>` when `href` passed, `<button>` otherwise; `disabled` prop supported
- [ ] `src/components/ui/Badge.tsx` — variants: `accent` (accent-muted bg), `neutral` (bg-secondary); used for tags/categories
- [ ] `src/components/ui/SocialIcon.tsx` — accepts `name: 'github' | 'linkedin' | 'twitter'`; contains all three SVG paths; renders accessible `<a>` wrapper
- [ ] `src/components/ui/CardImage.tsx` — Next.js `<Image>` with fill + gradient overlay + hover-scale; `aspectRatio` prop (`'16/9' | '16/10'`)
- [ ] `src/components/ui/Skeleton.tsx` — base `<div className="animate-pulse bg-[var(--bg-secondary)] rounded-xl" />`; export `SkeletonBlogCard`, `SkeletonProjectCard` composites matching real card layouts
- [ ] `src/app/page.tsx` — remove local `fadeUp`, `socials` array; import from `src/lib/animations` + `SocialIcon`
- [ ] `src/app/blog/page.tsx` — remove local `formatDate`; import from `src/lib/utils`
- [ ] `src/components/BlogPostClient.tsx` — remove local `formatDate`; import from `src/lib/utils`
- [ ] `src/components/Navigation.tsx` — delete commented-out Courses block (lines 41-47 incl. `TODO` comment); remove `'courses'` from `NavSection` type if unused
- [ ] `src/app/page.tsx` — replace `<span>` "Coming Soon" store buttons with `<button disabled aria-disabled="true">` + disabled cursor styling
- [ ] Verify: `grep -r "const fadeUp" src/` → 0 results; `grep -r "formatDate" src/` → only `src/lib/utils.ts`; `npm run build && npm run lint` pass

### Phase 2: Home / Hero Polish

- **Goal**: Warmer hero, expanded about snippet, two-button contact, mobile-swipeable projects
- [ ] `src/app/page.tsx` — Hero: add initials avatar mark (styled `<div>` with accent bg + `NR` text); replace `<h1>Nabi Rahmani</h1>` with two-line pattern (`<p>Hey, I'm</p><h1>Nabi Rahmani</h1>`); update subtitle copy to be warmer/story-driven
- [ ] `src/app/page.tsx` — Projects section: wrap cards in `<div className="flex flex-col md:flex-col gap-14 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none flex-row md:flex-col">` for mobile horizontal scroll; each card gets `snap-start shrink-0 w-[85vw] md:w-auto`
- [ ] `src/app/page.tsx` — Blog section: replace inline badge spans with `<Badge variant="accent">`; replace inline card image divs with `<CardImage>`
- [ ] `src/app/page.tsx` — About snippet: expand to 2-3 sentences + small `<ul>` of 3 personal traits/values before the "Learn more" link
- [ ] `src/app/page.tsx` — Contact section: add second button (LinkedIn link) beside email CTA using `<Button variant="secondary">`
- [ ] Audit all `<a>` tags in `src/app/page.tsx` — ensure `rel="noopener noreferrer"` + `target="_blank"` on all external links
- [ ] Verify: visual review on mobile + desktop; `npm run build && npm run lint` pass

### Phase 3: Blog UX + Loading Skeletons

- **Goal**: Debounced search, skeleton placeholders, polished TOC + reading bar, blockquote styling
- [ ] `src/app/blog/page.tsx` — add debounce: replace direct `setSearch(value)` with `useRef<ReturnType<typeof setTimeout>>()` pattern; clear on each keystroke, fire after 300ms
- [ ] `src/app/blog/page.tsx` — replace `<Suspense fallback="Loading...">` (if present) with `<SkeletonBlogCard />` grid (3 items); OR wrap the filtered content section in a local `isFiltering` state that shows skeletons for 1 frame during filter transitions
- [ ] `src/components/BlogPostClient.tsx` — TOC active item: change active link to `text-[var(--accent)] border-l-2 border-[var(--accent)] pl-2` styling
- [ ] `src/components/BlogPostClient.tsx` — Post header: move `{post.readingTime} min read` to be visually prominent (larger, near the title) if it's currently buried in metadata row
- [ ] `src/app/globals.css` — blockquote: add `.article-content blockquote` rule — `border-left: 3px solid var(--accent); padding-left: 1.25rem; font-style: italic; font-size: 1.125rem; color: var(--text-secondary); margin: 1.5rem 0;`
- [ ] Verify: type rapidly in search → results don't update until 300ms after last keystroke; TOC active item shows gold accent; blockquote renders with left border; `npm run build && npm run lint` pass

### Phase 4: Projects Refinement

- **Goal**: Platform filter bar, horizontal screenshot gallery on mobile, platform badges on cards
- [ ] `src/app/projects/page.tsx` — read file first; add `platform` filter state; render filter chips row (`All | iOS | Android | Both`) using `<Badge>` as clickable buttons; filter `allProjects` by `project.platform`
- [ ] `src/app/projects/page.tsx` — add platform badge row under each project title using `<Badge variant="neutral">` showing `platform === 'both' ? 'iOS · Android' : platform === 'ios' ? 'iOS' : 'Android'`
- [ ] `src/app/page.tsx` — add same platform badge to home page project cards
- [ ] `src/app/projects/[slug]/page.tsx` — read file first; find screenshots section; wrap in `<div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3">` with each screenshot as `<div className="snap-start shrink-0 w-[80vw] md:w-[360px]">`
- [ ] Audit all `<Image>` components across `src/app/projects/` — ensure descriptive `alt` text
- [ ] Verify: filter chips work; screenshots swipe on mobile; platform badges visible; `npm run build && npm run lint` pass

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
