---
description: Generate TSDoc documentation for TypeScript/React code
model: claude-sonnet-4-5
---

Generate documentation for the following code: $ARGUMENTS

## Documentation Rules

### What to Document

| Target | Priority | Format |
|--------|----------|--------|
| Exported interfaces in `src/types/` | Required | TSDoc on interface + each property |
| Helper functions in `src/data/` | Required | TSDoc with `@param`, `@returns` |
| Complex components | Required | TSDoc on component function |
| Custom hooks in `src/hooks/` | Required | TSDoc with usage example |
| Simple presentational components | Optional | Brief one-liner |
| Internal/private functions | Optional | Only if non-obvious |

### TSDoc Format

```tsx
/**
 * Brief description of what this does.
 * @param paramName - Description of parameter.
 * @returns Description of return value.
 * @example
 * ```tsx
 * const post = getPostBySlug('my-post');
 * ```
 */
```

### Interface Documentation

```tsx
/** Represents a portfolio project with store links and metadata. */
export interface Project {
  /** Unique identifier. */
  id: string;
  /** URL-friendly slug for routing (`/projects/[slug]`). */
  slug: string;
  /** Target platform for the project. */
  platform: 'ios' | 'android' | 'both';
}
```

### Component Documentation

```tsx
/**
 * Client-side project detail page with Framer Motion animations.
 * Used as the rendering companion for the server page component.
 *
 * @see src/app/projects/[slug]/page.tsx - Server component that provides data
 */
export default function ProjectDetailClient({ project }: { project: Project }) {
```

### JSX Section Comments
Use `{/* Comment */}` to label animated sections:
```tsx
{/* Screenshot Gallery — horizontal scroll with staggered pop-in */}
```
