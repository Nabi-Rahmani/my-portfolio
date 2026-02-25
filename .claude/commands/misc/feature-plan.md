---
description: Plan a new feature for the Next.js portfolio site
model: claude-sonnet-4-5
---

Plan the implementation of this feature: $ARGUMENTS

## Planning Template

### 1. User Stories
- As a visitor, I want to...
- As the site owner, I want to...

### 2. Data Model
Define new interfaces in `src/types/`:
```tsx
export interface NewType {
  id: string;
  slug: string;
  // ...
}
```

### 3. Data Layer
Create `src/data/newtype.ts`:
- Static array of content
- Helper functions: `getBySlug()`, `getAll()`, etc.

### 4. Routing
New pages in `src/app/`:
| Route | File | Server/Client | Purpose |
|-------|------|--------------|---------|
| `/section` | `page.tsx` | Client | Listing page |
| `/section/[slug]` | `page.tsx` + `*Client.tsx` | Server + Client | Detail page |

### 5. Components
| Component | Location | Type | Purpose |
|-----------|----------|------|---------|
| `SectionClient.tsx` | `src/app/section/[slug]/` | Client | Detail rendering |

### 6. Server Component Tasks
- `generateMetadata()` for SEO
- `generateStaticParams()` for static generation
- `notFound()` for missing content

### 7. Styling Plan
- Tailwind with CSS custom properties
- Responsive: mobile-first, `md:` for desktop
- Framer Motion: spring animations, `whileInView`, staggered badges

### 8. SEO
- [ ] Page metadata (title, description, openGraph, twitter)
- [ ] `sitemap.ts` updated
- [ ] Structured data component if needed

### 9. Navigation
- [ ] Add to Navigation component if needed
- [ ] Breadcrumbs on detail page

### 10. Validation
- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] Desktop + mobile layouts verified
- [ ] Dark + light themes verified
- [ ] All links work

### 11. Edge Cases
- Empty state (no items)
- Missing slug (404)
- Mobile layout
- Very long content
