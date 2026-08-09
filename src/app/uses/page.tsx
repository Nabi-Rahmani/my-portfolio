import Link from 'next/link';

import Footer from '@/components/Footer';
import { usesCategories } from '@/data/uses';

export default function Uses() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        <header className="border-b border-[var(--line-16)]">
          <div className="site-container grid gap-7 py-14 sm:py-22 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:py-26">
            <div>
              <p className="eyebrow">Uses</p>
              <h1 className="display-page mt-6 max-w-[10ch]">The tools behind the products.</h1>
            </div>
            <p className="max-w-[58ch] text-[1rem] leading-8 text-[var(--text-muted)]">
              Hardware, software, packages, and services I rely on to design, build, observe,
              and ship production Flutter apps.
            </p>
          </div>
        </header>

        <section className="site-container py-14 sm:py-22 lg:py-28" aria-label="Tools and stack">
          <div className="border-t border-[var(--line-16)]">
            {usesCategories.map((category, index) => (
              <section key={category.label} className="grid gap-5 border-b border-[var(--line-16)] py-8 sm:grid-cols-[64px_220px_1fr] sm:gap-8">
                <span className="font-mono text-xs text-[var(--accent)]">0{index + 1}</span>
                <h2 className="text-[1.1rem] font-semibold tracking-[-0.03em]">{category.label}</h2>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span key={item} className="rounded-full border border-[var(--line-16)] bg-[var(--surface-bg)] px-3.5 py-2 text-sm text-[var(--text-muted)]">{item}</span>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <p className="mt-8 text-sm text-[var(--text-muted)]">
            See how these tools are being used <Link href="/now" className="font-semibold text-[var(--accent)]">right now →</Link>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
