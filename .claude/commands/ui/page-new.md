---
description: Create a new Next.js page following the project's server/client split pattern
model: claude-sonnet-4-5
---

Create a new page: $ARGUMENTS

## Page Templates

### Static Page (no dynamic route)
```tsx
// src/app/section/page.tsx
'use client';

import { motion } from 'framer-motion';
import { getAllItems } from '@/data/items';

const items = getAllItems();

export default function SectionPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-16 md:pb-0">
      <main className="pt-24 px-6 pb-16">
        <div className="max-w-[800px] mx-auto">
          {/* Content */}
        </div>
      </main>
    </div>
  );
}
```

### Dynamic Page (server/client split)

**Server page:**
```tsx
// src/app/section/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { items, getItemBySlug } from '@/data/items';
import SectionClient from './SectionClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) return { title: 'Not Found' };
  return {
    title: `${item.title} - Muhammad Nabi Rahmani`,
    description: item.description,
    openGraph: { title: item.title, description: item.description, url: `https://codewithnabi.dev/section/${slug}` },
  };
}

export async function generateStaticParams() {
  return items.map((item) => ({ slug: item.slug }));
}

export default async function SectionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) notFound();
  return <SectionClient item={item} />;
}
```

**Client companion:**
```tsx
// src/app/section/[slug]/SectionClient.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Item } from '@/types/item';

export default function SectionClient({ item }: { item: Item }) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-16 md:pb-0">
      {/* Animated content */}
    </div>
  );
}
```

## Checklist
- [ ] Server component handles metadata + static params
- [ ] Client component handles rendering + animations
- [ ] `notFound()` for missing data
- [ ] SEO metadata with OpenGraph
- [ ] Responsive layout (mobile-first, `md:` desktop)
- [ ] Framer Motion spring animations
- [ ] `npm run build` passes
