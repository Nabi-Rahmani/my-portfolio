'use client';

import { useEffect, useState } from 'react';

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]';

/**
 * PRESENTATION — in-article section nav.
 * Job: list markdown headings and highlight the visible one.
 */
export function TableOfContents({
  content,
  reduceMotion,
}: {
  content: string;
  reduceMotion: boolean | null;
}) {
  const [activeId, setActiveId] = useState<string>('');
  const headings = content.match(/^(#{2,3})\s+(.+)$/gm) || [];

  const tocItems = headings.map((heading, index) => {
    const level = heading.match(/^#+/)?.[0].length || 2;
    const text = heading.replace(/^#+\s+/, '');
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return { level, text, id, index };
  });

  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 },
    );

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  if (tocItems.length === 0) return null;

  return (
    <div className="sticky top-28 rounded-2xl border border-[var(--line)] bg-[var(--cream-2)] p-6">
      <h3 className="mb-4 flex items-center gap-2 font-mono text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink)]">
        <svg
          className="h-4 w-4 text-[var(--atelier-accent)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
          />
        </svg>
        On this page
      </h3>
      <nav className="space-y-1" aria-label="Table of contents">
        {tocItems.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.index}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (!el) return;
                const top = el.getBoundingClientRect().top + window.scrollY - 96;
                window.scrollTo({
                  top,
                  behavior: reduceMotion ? 'auto' : 'smooth',
                });
                history.pushState(null, '', `#${item.id}`);
              }}
              className={`block border-l-2 py-1.5 text-[0.8125rem] transition-colors duration-200 ${focusRing} ${
                item.level === 2 ? 'pl-3' : 'pl-6'
              } ${
                isActive
                  ? 'border-[var(--atelier-accent)] font-medium text-[var(--atelier-accent)]'
                  : 'border-transparent text-[var(--muted)] hover:border-[var(--line)] hover:text-[var(--ink)]'
              }`}
            >
              {item.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
