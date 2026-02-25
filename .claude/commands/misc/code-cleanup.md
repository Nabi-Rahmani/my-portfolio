---
description: Refactor and clean up TypeScript/React code following project best practices
model: claude-sonnet-4-5
---

Analyze and clean up the following code or file: $ARGUMENTS

## Cleanup Checklist

### TypeScript
- [ ] No `any` types — use proper interfaces from `src/types/`
- [ ] No `@ts-ignore` or `@ts-expect-error`
- [ ] Type-only imports use `import type { ... }`
- [ ] Interfaces defined in `src/types/`, not inline in components
- [ ] Consistent use of `@/*` path alias for internal imports

### Imports
- [ ] Order: external packages → `@/` imports → relative imports
- [ ] Remove unused imports
- [ ] Use `import type` for type-only imports

### Components
- [ ] Server component by default; `'use client'` only when needed
- [ ] `'use client'` is the first line (before imports)
- [ ] Props typed correctly (inline for simple, named interface for complex)
- [ ] `Readonly<{ children: React.ReactNode }>` for layout props
- [ ] Next.js 15 params: `params: Promise<{ slug: string }>` with `await`

### Styling
- [ ] Tailwind classes instead of inline `style={{}}`
- [ ] CSS custom properties via `var(--*)` for theme colors
- [ ] No hardcoded color values — use theme tokens
- [ ] Responsive: mobile-first with `md:` breakpoints

### Data Access
- [ ] Use helper functions (`getPostBySlug()`, etc.) not direct array filtering
- [ ] Data accessed in server components, passed as props to client components

### Framer Motion
- [ ] `viewport={{ once: true }}` on `whileInView` animations
- [ ] Spring transitions (not duration-based ease)
- [ ] Animate `transform`/`opacity` only (not width/height/top/left)

### General
- [ ] No dead code or commented-out blocks
- [ ] No console.log statements (except error logging)
- [ ] External links have `rel="noopener noreferrer"` with `target="_blank"`
- [ ] Images use `next/image` with `alt`, `sizes`, and dimensions

## After Cleanup
1. Run `npm run build` to verify no type errors
2. Run `npm run lint` to check style
3. Verify in browser that nothing is broken
