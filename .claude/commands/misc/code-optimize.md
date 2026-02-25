---
description: Optimize Next.js/React code for performance, bundle size, and Core Web Vitals
model: claude-sonnet-4-5
---

Analyze and optimize the following code or file: $ARGUMENTS

## Optimization Areas

### Server vs Client Components
- [ ] Can any `'use client'` components be converted to server components?
- [ ] Can data fetching be moved to a server component parent?
- [ ] Can the client component be split to keep the `'use client'` surface small?

### Bundle Size
- [ ] Lazy-load heavy components with `next/dynamic`
- [ ] Only import what's needed from Framer Motion
- [ ] Check for unnecessary dependencies

### Image Optimization
- [ ] All images use `next/image` (not raw `<img>`)
- [ ] `sizes` prop set correctly for responsive images
- [ ] `priority` on above-the-fold images
- [ ] `fill` or explicit dimensions to prevent CLS

### React Re-renders
- [ ] Avoid object/array creation in JSX props
- [ ] Extract stable references to constants outside component
- [ ] `React.memo()` only where profiling shows benefit
- [ ] `useMemo`/`useCallback` only for measured problems

### Animation Performance
- [ ] Animate `transform` and `opacity` only (GPU-composited)
- [ ] Avoid animating `width`, `height`, `top`, `left`
- [ ] `viewport={{ once: true }}` on scroll animations
- [ ] Stagger delays are reasonable (not too many simultaneous animations)

### Font & CSS
- [ ] Fonts via `next/font` (self-hosted, no external CDN)
- [ ] No unused Tailwind arbitrary values that could be simplified
- [ ] CSS custom properties used consistently

### Static Generation
- [ ] `generateStaticParams()` used for all dynamic routes
- [ ] Static data doesn't trigger dynamic rendering

## After Optimization
1. `npm run build` — check "First Load JS" per route
2. Compare bundle sizes before/after
3. Lighthouse audit on production build
