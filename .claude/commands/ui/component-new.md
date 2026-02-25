---
description: Create a new React component following project conventions
model: claude-sonnet-4-5
---

Create a new component: $ARGUMENTS

## Component Template

### Server Component (default)
```tsx
import type { SomeType } from '@/types/sometype';

export default function ComponentName({ data }: { data: SomeType }) {
  return (
    <section className="...">
      {/* Content */}
    </section>
  );
}
```

### Client Component (when state/effects/events needed)
```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { SomeType } from '@/types/sometype';

export default function ComponentName({ data }: { data: SomeType }) {
  const [active, setActive] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 16 }}
    >
      {/* Content */}
    </motion.section>
  );
}
```

## Rules

1. **File location**: `src/components/ComponentName.tsx` (PascalCase)
2. **Server by default**: Only add `'use client'` if needed
3. **Import order**: externals → `@/` imports → relative → `import type`
4. **Styling**: Tailwind + CSS custom properties, no inline `style={{}}`
5. **Props**: Inline type for simple, named interface for complex
6. **Images**: `next/image` with `alt`, `sizes`, dimensions
7. **Icons**: Inline SVG, not lucide-react
8. **Animations**: Framer Motion with spring transitions
9. **External links**: `target="_blank" rel="noopener noreferrer"`
10. **Verify**: `npm run build` must pass after creation
