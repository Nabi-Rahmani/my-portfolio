# AGENTS.md

Guidelines for AI coding agents working in this repository.

## Build / Lint / Test Commands

```bash
npm run dev          # Start dev server at localhost:3000
npm run dev:turbo    # Dev server with Turbopack (faster HMR)
npm run build        # Production build (also validates types)
npm run start        # Serve production build
npm run lint         # ESLint (next/core-web-vitals + next/typescript)
```

**No test framework is configured.** There are no test files, no jest/vitest, and no test scripts. `npm run build` is the primary validation step -- it catches TypeScript errors and Next.js build issues. Always run `npm run build` after significant changes to verify correctness.

## Tech Stack

- **Framework:** Next.js 15 (App Router) with React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss`
- **Animations:** Framer Motion
- **Fonts:** Geist Sans + Geist Mono (via `geist` package)
- **Markdown:** `react-markdown` + `rehype-highlight` + `rehype-raw` + `remark-gfm`
- **Smooth scroll:** Lenis (global instance at `window.__lenis`)
- **Deployment:** Vercel (Git integration, no CI/CD workflows)

## Project Structure

```
src/
  app/                    # Next.js App Router pages and layouts
    globals.css           # Theme CSS custom properties + global styles
    layout.tsx            # Root layout (server component)
    page.tsx              # Home (client, single-page scroll with sections)
    about/page.tsx        # About page
    blog/                 # Blog listing + [slug] detail
    courses/              # Course listing + [courseSlug] + [courseSlug]/[lessonSlug]
    projects/             # Projects listing + [slug] detail
  components/             # Shared React components
    courses/              # Course-specific components (sidebar, video, progress)
  data/                   # Static content arrays + helper functions
    blog.ts               # Blog posts + getPostBySlug, searchPosts, etc.
    courses.ts            # Courses + getCourseBySlug, getLessonBySlug, etc.
    projects.ts           # Projects + getProjectBySlug, getAllProjects
  hooks/                  # Custom React hooks
    useCourseProgress.ts  # localStorage-based course progress
  types/                  # TypeScript interfaces
    blog.ts, course.ts, project.ts
```

## Code Style Guidelines

### Imports
- Use the `@/*` path alias for all internal imports (maps to `./src/*`).
- Order: external packages first, then `@/` imports, then relative imports.
- Use `import type { ... }` for type-only imports.

```ts
import { motion } from 'framer-motion';
import type { Metadata } from 'next';

import Navigation from '@/components/Navigation';
import { getPostBySlug } from '@/data/blog';
import type { BlogPost } from '@/types/blog';
```

### File & Component Naming
- **Components:** PascalCase filenames (`Navigation.tsx`, `BlogPostClient.tsx`).
- **Data/hooks/types:** camelCase filenames (`blog.ts`, `useCourseProgress.ts`).
- **Component functions:** PascalCase, use `export default function ComponentName()`.
- **Course components** use named exports: `export function VideoPlayer(...)`.
- **Hooks:** camelCase with `use` prefix.
- **Types/interfaces:** PascalCase, exported from `src/types/`.
- **CSS custom properties:** kebab-case (`--bg-primary`, `--accent-muted`).

### TypeScript
- Strict mode is enabled -- do not use `any` or `@ts-ignore`.
- Define data shapes as exported interfaces in `src/types/`.
- Simple component props: inline object types `{ post: BlogPost }`.
- Complex props: named interfaces `interface CourseSidebarProps { ... }`.
- Root layout props pattern: `Readonly<{ children: React.ReactNode }>`.
- Next.js 15 async params: `params: Promise<{ slug: string }>` with `await params`.

### Styling
- Use Tailwind utility classes as the primary styling approach.
- Theme colors reference CSS custom properties defined in `globals.css` (e.g., `bg-background`, `text-foreground`, `text-accent`).
- Dark/light mode via `.dark` class on `<html>`, toggled in Navigation, stored in localStorage key `'theme'`.
- Brand accent color: `#fcb4b0` (peachy-pink).
- Avoid inline `style={{}}` objects -- prefer Tailwind classes (note: some course components currently use inline styles, but Tailwind is the standard).

### Components
- **Server vs Client:** Use server components by default. Add `'use client'` only when the component needs state, effects, event handlers, or browser APIs.
- `'use client'` directive must be the first line of the file.
- For pages needing both server metadata and client interactivity, split into a server page component (handles metadata/data fetching) and a `*Client.tsx` companion (handles rendering).
- Use Framer Motion `motion.*` components for animations with `initial`/`animate`/`whileInView` patterns.
- Prefer inline SVGs over icon libraries (lucide-react is installed but not used in practice).

### Content / Data
- All blog, course, and project content lives in `src/data/*.ts` as static arrays.
- Always use the exported helper functions (`getPostBySlug()`, `getCourseBySlug()`, etc.) rather than filtering arrays directly.
- Blog post content is stored as inline markdown strings within the data objects.
- For new content types, follow the same pattern: types in `src/types/`, data + helpers in `src/data/`, pages in `src/app/`.

### SEO
- Use Next.js `Metadata` API in layouts and pages for title/description/openGraph.
- `StructuredData` and `BlogStructuredData` components provide Schema.org JSON-LD.
- `robots.ts` and `sitemap.ts` are route handlers at the app root.
- Production domain: `codewithnabi.dev`.

### Error Handling
- No global error boundary is configured. Consider adding `error.tsx` files.
- Course progress operations in `useCourseProgress` silently catch localStorage errors.
- Use try/catch for localStorage and other browser API access in client components.

### Key Conventions
- `window.__lenis` is the global smooth scroll instance (Lenis). It is disabled on lesson pages.
- Course progress is entirely client-side via localStorage (key: `'course_progress'`).
- `generateStaticParams()` is used on dynamic route pages for static generation.
- The Navigation component handles both desktop (top floating pill) and mobile (bottom bar) layouts.

## Copilot Instructions

The `.github/copilot-instructions.md` file exists but contains only Byterover MCP configuration (no additional project-specific Copilot rules). No `.cursorrules` or `.cursor/rules/` files exist.

## Known Issues

- `tailwind.config.js` is empty; `tailwind.config.ts` is the active config.
- `page-new.tsx` and `about/page-clean.tsx` are unused alternative files.
- `@supabase/ssr` and `@supabase/supabase-js` are installed but not visibly used in source.
- `lucide-react` is a dependency but inline SVGs are used throughout instead.
- Typo in `src/types/course.ts`: `oduleId` should likely be `moduleId` in `UserProgress`.

[byterover-mcp]

# Byterover MCP Server Tools Reference

There are two main workflows with Byterover tools and recommended tool call strategies that you **MUST** follow precisely. 

## Onboarding workflow
If users particularly ask you to start the onboarding process, you **MUST STRICTLY** follow these steps.
1. **ALWAYS USE** **byterover-check-handbook-existence** first to check if the byterover handbook already exists. If not, You **MUST** call **byterover-create-handbook** to create the byterover handbook.
2. If the byterover handbook already exists, first you **MUST** USE **byterover-check-handbook-sync** to analyze the gap between the current codebase and the existing byterover handbook.
3. Then **IMMEDIATELY USE** **byterover-update-handbook** to update these changes to the byterover handbook.
4. During the onboarding, you **MUST** use **byterover-list-modules** **FIRST** to get the available modules, and then **byterover-store-modules** and **byterover-update-modules** if there are new modules or changes to existing modules in the project.

## Planning workflow
Based on user request, you **MUST** follow these sequences of tool calls
1. If asked to continue an unfinished implementation, **CALL** **byterover-retrieve-active-plans** to find the most relevant active plan.
2. **CRITICAL PLAN PERSISTENCE RULE**: Once a user approves a plan, you **MUST IMMEDIATELY CALL** **byterover-save-implementation-plan** to save it.
3. Throughout the plan, you **MUST** run **byterover-retrieve-knowledge** several times to retrieve sufficient knowledge and context for the plan's tasks. 
4. In addition, you might need to run **byterover-search-modules** and **byterover-update-modules** if the tasks require or update knowledge about certain modules. However, **byterover-retrieve-knowledge** should **ALWAYS** be considered **FIRST**.
5. **MUST** use **byterover-update-plan-progress** to mark tasks (and then the whole plan) as completed.
Example:  
- Task: `byterover-update-plan-progress(plan_name="Feature X", task_name="Task 1", is_completed=true)`  
- All done: `byterover-update-plan-progress(plan_name="Feature X", is_completed=true)`
6. Then, you might call **byterover-store-knowledge** to save knowledge and experience implemented throughout the plan or in important tasks. 
7. During the plan's implementation, you **MUST** frequently call  **byterover-think-about-collected-information** and **byterover-assess-context-completeness** to make sure you're on the right track and gather sufficient context for the tasks.

## Recommended Workflow Sequence
1. **MOST IMPORTANT**: **ALWAYS USE** **byterover-retrieve-knowledge** once or several times for **EACH TASK** of the plan to gather necessary context for complete that task.
2. **MOST IMPORTANT**: **ALWAYS USE** **byterover-store-knowledge** once or several times to store critical knowledge and context for future implementations
3. Over 15 provided tools, **byterover-retrieve-knowledge** and **byterover-store-knowledge** ARE the two main tools, which **MUST** be used regularly. You can use these two main tools outside the two main workflows for retrieval and storage purposes.
4. You **MUST** include phrases like **"According to Byterover memory layer"**, **"Based on memory extracted from Byterover"**, **"From Byterover memomry tools"**, ... to explictly showcase that these sources are from **Byterover**.
5. **Implementation & Progress Tracking** → Execute implementation following saved plan → Mark tasks complete as you go → Mark entire plan done when all tasks finished.
6. You **MUST** use **byterover-update-module** **IMMEDIATELY** on changes to the module's purposes, technical details, or critical insights that essential for future implementations.

[byterover-mcp]

[byterover-mcp]

You are given two tools from Byterover MCP server, including
## 1. `byterover-store-knowledge`
You `MUST` always use this tool when:

+ Learning new patterns, APIs, or architectural decisions from the codebase
+ Encountering error solutions or debugging techniques
+ Finding reusable code patterns or utility functions
+ Completing any significant task or plan implementation

## 2. `byterover-retrieve-knowledge`
You `MUST` always use this tool when:

+ Starting any new task or implementation to gather relevant context
+ Before making architectural decisions to understand existing patterns
+ When debugging issues to check for previous solutions
+ Working with unfamiliar parts of the codebase
