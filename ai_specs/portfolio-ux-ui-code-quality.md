<goal>
Polish and modernize Nabi Rahmani's Next.js portfolio across all major sections — Home, Blog, Projects, and About — so the site feels more human, personal, and modern while maintaining the warm cream/gold brand identity. Simultaneously refactor the codebase to eliminate duplication through a shared UI component library, centralized animation constants, and common utilities.

Who benefits: The portfolio owner (cleaner, faster-to-maintain codebase) and visitors (better perceived performance via skeletons, more engaging reading experience, and consistent visual quality across all pages).
</goal>

<background>
Tech stack: Next.js 15 App Router, React 19, TypeScript (strict), Tailwind CSS v4, Framer Motion, Lenis smooth scroll.

Design tokens live in CSS custom properties in `@src/app/globals.css`:
- `--bg-primary`, `--bg-secondary`, `--text-primary`, `--text-secondary`
- `--accent` (#c48a3f light / #daa04e dark), `--accent-muted`, `--accent-hover`
- `--border-color`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`
- Dark mode via `.dark` class on `<html>`, preference in localStorage

Key files to examine before implementing each phase:
- `@src/app/page.tsx` — Home (hero, projects, blog, about, contact sections)
- `@src/app/about/page.tsx` — About page
- `@src/app/projects/page.tsx` — Projects gallery
- `@src/app/projects/[slug]/page.tsx` — Project detail
- `@src/app/blog/page.tsx` — Blog listing
- `@src/app/blog/[slug]/page.tsx` — Blog post route
- `@src/components/BlogPostClient.tsx` — Blog post reader (reading bar, TOC)
- `@src/components/BlogLayoutClient.tsx` — Blog filter/search state
- `@src/components/Navigation.tsx` — Top/bottom nav
- `@src/components/Footer.tsx` — Footer
- `@src/app/globals.css` — All design tokens and article prose styles

Path alias: `@/*` → `./src/*`

No test framework is configured — validation is manual and visual.
</background>

<user_flows>
Primary flows affected by this work:

**Visitor browsing (home → project → back)**
1. Visitor lands on home page, sees hero instantly (no layout shift)
2. Scrolls to projects section — cards animate in, each feels premium
3. Clicks a project card → project detail page loads
4. Returns via browser back or nav

**Visitor reading a blog post**
1. Visitor clicks a blog card
2. Post page loads — reading progress bar appears immediately
3. TOC tracks scroll position as reader progresses
4. Finishes article, sees related posts

**Visitor filtering blog**
1. Visitor is on /blog page
2. Types in search box — debounced 300ms before results update
3. Clicks a category filter — skeleton placeholders appear during re-render
4. Results appear with smooth transition

**Visitor landing on About page**
1. Visitor clicks About in nav
2. Page feels warm, personal, story-first (not resume-like)
3. Skills and experience sections are scannable and well-structured

Error flows:
- Image load failure: Next.js Image handles fallback; ensure `alt` text is always descriptive
- Skeleton → content: never flash empty state after content has loaded (use `useState` properly)
</user_flows>

<requirements>
**Phase 1 — Code Quality Foundation**

1. Create `src/lib/animations.ts` exporting shared Framer Motion variants:
   - `fadeUp` (currently duplicated in page.tsx, about/page.tsx, blog/page.tsx, others)
   - `staggerContainer` for parent wrappers
   - `springCard` for card entrance
   - Remove all local `fadeUp` definitions and import from this file

2. Create `src/lib/utils.ts` with shared utilities:
   - `formatDate(date: string): string` — currently defined in both BlogLayoutClient and BlogPostClient
   - `cn(...classes: string[]): string` — classname merging helper (use `clsx` or inline implementation)
   - Remove all local duplicate definitions

3. Create `src/components/ui/` shared component library:
   - `Button.tsx` — variants: `primary` (filled dark), `secondary` (outlined), `ghost` (text only), `disabled` state; accepts `href` for anchor rendering or renders `<button>` when no href
   - `Badge.tsx` — small label pill; variants: `accent` (muted accent bg), `neutral` (bg-secondary)
   - `SocialIcon.tsx` — renders a single social icon SVG by name (github, linkedin, twitter); eliminates the duplicated SVG path strings across page.tsx, Footer, about/page.tsx
   - `CardImage.tsx` — standard cover image wrapper with gradient overlay and hover-scale, used by project cards and blog cards (aspect ratio via prop)

4. Replace all `<span>` "Coming Soon" store buttons with `<button disabled>` using proper disabled styling; update aria-label to "iOS coming soon" / "Android coming soon"

5. Audit and remove the commented-out Courses nav link in `Navigation.tsx` — either restore it fully or delete the dead code

**Phase 2 — Home / Hero Polish**

6. Hero section: Make it feel more human and personal
   - Replace the bare name heading with a two-line greeting pattern: a smaller warm preheading ("Hey, I'm") followed by the name in large bold type
   - Subtitle copy should be warmer and more story-driven (not just a job description line)
   - Add a subtle animated avatar or initials mark above the greeting
   - Retain the single CTA button and social icons row

7. Home Projects section: Add a horizontal scrollable layout option on mobile (instead of stacked vertical) — same cards, just swipeable on small screens; desktop keeps full-width stacked

8. Home Blog section: The 1-big + 2-grid pattern is good — refine card typography hierarchy (tighten excerpt line-clamp, make author row slimmer); use the shared `CardImage` and `Badge` components

9. Home About snippet: Expand from one paragraph to a brief 2-3 sentence personal story + one highlight list (e.g., key traits or values) before the "Learn more" link — make it feel human, not a bio blurb

10. Home Contact section: Replace raw email link with two-option CTA row — email button + a secondary "View CV" or "LinkedIn" button side-by-side

**Phase 3 — Blog UX + Loading Skeletons**

11. Blog listing page (`/blog`): Add debounce (300ms) to the search input in `BlogLayoutClient.tsx` — use `useRef` + `setTimeout`/`clearTimeout` pattern (no external library)

12. Create `src/components/ui/Skeleton.tsx` — base skeleton component with shimmer animation:
    ```
    bg-[var(--bg-secondary)] animate-pulse rounded-xl
    ```
    Export named variants: `SkeletonCard`, `SkeletonText`, `SkeletonBlogCard`, `SkeletonProjectCard`

13. Replace the `<Suspense fallback="Loading...">` in blog page with a `SkeletonBlogCard` grid that matches the real card layout (shimmer placeholders for image, title, excerpt, tags)

14. Blog post reading experience (`BlogPostClient.tsx`):
    - TOC: highlight the active section with accent color + add a subtle left border indicator
    - Reading progress bar: ensure it starts at 0 and reaches 100% correctly; keep it the accent color
    - Add estimated read time prominently in the post header (already in data, needs better visual placement)

15. Blog post article content (`ArticleContent.tsx`): Add a `<blockquote>` visual style that is more prominent — left accent border + italic text + slightly larger font

**Phase 4 — Projects Refinement**

16. Projects gallery (`/projects`): Add a minimal filter bar above the project list — filter by platform (iOS, Android, Cross-platform) using the existing project data's `platforms` field (or add it to the data type if missing); use `Badge` component for filter chips

17. Project detail page (`/projects/[slug]`): Review the screenshots section layout — if screenshots exist, render them in a horizontal scroll gallery with momentum on mobile (not a grid that breaks at small sizes)

18. Project cards (both home and /projects): Add a platform badge (e.g., "Flutter · iOS · Android") as a small row beneath the title using the `Badge` component

**Phase 5 — About Page Modernization**

19. About page hero: Lead with a first-person story paragraph (2-4 sentences, warm tone, personal anecdotes or motivation) before the values/skills sections; avoid resume-speak

20. About skills section: Group skills visually with small icons or emoji prefixes if appropriate; ensure the section heading is "What I work with" or similar (more human than "Skills")

21. About experience timeline: Each entry should have a brief 1-2 sentence context sentence ("what I built / what I learned"), not just company + dates; review existing data in about/page.tsx and enrich if data is too sparse

22. About page CTA: Add a clear call-to-action at the bottom of the about page — "Let's build something together" with the email link and/or a "Download CV" button (link to a /cv PDF if it exists, otherwise placeholder with TODO comment)

**Error Handling**

23. All `Image` components must have descriptive `alt` text (audit all pages) — replace generic alt="" or alt="cover" with meaningful descriptions

24. All external links must have `rel="noopener noreferrer"` and `target="_blank"` — audit all `<a>` tags
</requirements>

<boundaries>
Edge cases:
- `platforms` field: If it doesn't exist on the Project type, add it as optional `platforms?: string[]` in `src/types/project.ts` and populate it for existing projects in `src/data/projects.ts`
- Skeleton flash: If data loads synchronously (static array), no skeleton needed — only show skeletons for the filtered/searched state where React re-renders happen
- `SocialIcon` component: Only implement the three social icons currently used (GitHub, LinkedIn, Twitter/X); do not generalize further
- Disabled "coming soon" buttons: Do not add any click handler; must be truly inert (`disabled` attribute + `aria-disabled="true"`)
- Courses nav link: Only two valid states — visible and working, or fully removed. No commented-out code.

Limits:
- Do not add external npm packages unless explicitly mentioned; use Tailwind + Framer Motion already installed
- Do not change the CSS custom property names or the theme token structure in globals.css
- Do not change routing structure — no new pages
- Keep all content (text, images, data) as-is — only change presentation and code structure
</boundaries>

<implementation>
**New files to create:**
- `src/lib/animations.ts` — shared Framer Motion variants
- `src/lib/utils.ts` — formatDate, cn utility
- `src/components/ui/Button.tsx`
- `src/components/ui/Badge.tsx`
- `src/components/ui/SocialIcon.tsx`
- `src/components/ui/CardImage.tsx`
- `src/components/ui/Skeleton.tsx` (with SkeletonCard, SkeletonText, SkeletonBlogCard, SkeletonProjectCard named exports)

**Files to modify:**
- `src/app/page.tsx` — hero redesign, import shared components, expand about snippet, two-button contact
- `src/app/about/page.tsx` — story-first hero, humanize skills heading, enrich timeline, bottom CTA
- `src/app/projects/page.tsx` — platform filter bar, use shared Badge/CardImage
- `src/app/projects/[slug]/page.tsx` — horizontal scroll screenshots gallery
- `src/app/blog/page.tsx` — Suspense fallback → skeleton grid
- `src/components/BlogLayoutClient.tsx` — debounce search input, import shared components
- `src/components/BlogPostClient.tsx` — TOC active style, reading progress bar fix, read time in header
- `src/components/ArticleContent.tsx` — blockquote styling
- `src/components/Navigation.tsx` — remove dead Courses link
- `src/types/project.ts` — add optional `platforms?: string[]`
- `src/data/projects.ts` — populate platforms for each project

**Patterns to use:**
- All animations: import from `src/lib/animations.ts`, never define locally
- All buttons: use `Button` component; no raw `<a>` or `<button>` with repeated className patterns
- All badges/tags: use `Badge` component
- Social icons: use `SocialIcon` component
- Card images: use `CardImage` component

**Avoid:**
- Do not add `react-query`, `swr`, or any data-fetching library — data is static
- Do not add `clsx` or `tailwind-merge` as npm packages — implement a simple `cn` helper inline if needed
- Do not use CSS-in-JS or styled-components
- Do not add new pages or routes
</implementation>

<validation>
Verify each phase before moving to the next:

**Phase 1 — Foundation:**
- [ ] `grep -r "const fadeUp" src/` returns zero results (all removed from page files)
- [ ] `grep -r "formatDate" src/` finds it only in `src/lib/utils.ts`
- [ ] All SVG icon paths for GitHub/LinkedIn/Twitter appear only in `SocialIcon.tsx`
- [ ] `<span>` "Coming Soon" buttons replaced — inspect DOM shows `<button disabled>`

**Phase 2 — Home:**
- [ ] Hero shows warm two-line greeting on all screen sizes
- [ ] Mobile projects section is horizontally scrollable (swipe test)
- [ ] About snippet shows 2-3 sentences + highlight list
- [ ] Contact section shows two-button row (email + secondary)

**Phase 3 — Blog:**
- [ ] Type in search box rapidly — network tab shows no excessive re-renders within 300ms debounce window
- [ ] Refresh /blog — skeleton cards appear briefly before content
- [ ] Blog post TOC highlights active section as user scrolls
- [ ] Reading progress bar reaches 100% at end of article

**Phase 4 — Projects:**
- [ ] Platform filter bar on /projects works — clicking iOS shows only iOS projects (or all if no filter)
- [ ] Project screenshots on detail page are horizontally scrollable on mobile
- [ ] Platform badges appear on all project cards

**Phase 5 — About:**
- [ ] About page opens with a story paragraph (first-person, no resume-speak)
- [ ] Skills section heading is human-sounding ("What I work with" or similar)
- [ ] Experience entries each have a 1-2 sentence context sentence
- [ ] Bottom CTA is present with email link

**Cross-cutting:**
- [ ] Run `npm run build` — zero TypeScript errors
- [ ] Run `npm run lint` — zero lint errors
- [ ] Light/dark theme toggle still works on all modified pages
- [ ] All external `<a>` tags have `rel="noopener noreferrer"` and `target="_blank"`
- [ ] All `<Image>` components have meaningful `alt` text
</validation>

<done_when>
1. `npm run build` completes with zero errors
2. `npm run lint` passes with zero errors
3. All shared components exist in `src/components/ui/` and are used throughout
4. Zero local `fadeUp` or `formatDate` definitions outside of `src/lib/`
5. Hero section uses the two-line warm greeting pattern
6. Blog search input is debounced; blog listing uses skeleton placeholders
7. About page opens with a first-person story paragraph
8. Projects list has a platform filter; project detail has a horizontal screenshot gallery
9. All "Coming Soon" buttons use proper `<button disabled>` semantics
10. No commented-out code remains in Navigation.tsx
</done_when>

<stages>
Phase 1 — Foundation (do first, everything else depends on it):
  Create src/lib/animations.ts, src/lib/utils.ts, and all src/components/ui/* files.
  Remove all duplicate local definitions from page files.
  Verify: zero grep hits for local fadeUp/formatDate; build passes.

Phase 2 — Home Polish:
  Redesign hero, expand about snippet, update contact section, mobile-swipe projects.
  Verify: visual review on mobile + desktop; build passes.

Phase 3 — Blog UX + Skeletons:
  Add debounce, replace Suspense fallback, improve TOC + reading progress.
  Verify: debounce works; skeleton visible; TOC tracks scroll.

Phase 4 — Projects:
  Add platforms field to type + data, platform filter bar, horizontal screenshot gallery.
  Verify: filter works; mobile screenshot scroll works.

Phase 5 — About:
  Story intro, human skills heading, enriched timeline entries, bottom CTA.
  Verify: visual review; no resume-speak in first paragraph.
</stages>
