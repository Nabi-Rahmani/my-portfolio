import Link from 'next/link';

import Footer from '@/components/Footer';
import { nowData } from '@/data/now';

export default function Now() {
  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        <header className="border-b border-[var(--line-16)]">
          <div className="site-container grid gap-7 py-14 sm:py-22 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:py-26">
            <div>
              <p className="eyebrow">Now</p>
              <h1 className="display-page mt-6 max-w-[10ch]">What I&apos;m focused on right now.</h1>
            </div>
            <div>
              <p className="max-w-[58ch] text-[1rem] leading-8 text-[var(--text-muted)]">
                A small, honest snapshot of the products, skills, and ideas getting my attention this season.
              </p>
              <p className="mt-5 font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent)]">Updated · {nowData.lastUpdated}</p>
            </div>
          </div>
        </header>

        <section className="site-container py-14 sm:py-22 lg:py-28" aria-label="Current focus">
          <div className="border-t border-[var(--line-16)]">
            {nowData.sections.map((section, index) => (
              <section key={section.label} className="grid gap-5 border-b border-[var(--line-16)] py-8 sm:grid-cols-[64px_180px_1fr] sm:gap-8">
                <span className="font-mono text-xs text-[var(--accent)]">0{index + 1}</span>
                <h2 className="text-[1.2rem] font-semibold tracking-[-0.03em]">{section.label}</h2>
                <ul className="space-y-3 text-[0.95rem] leading-7 text-[var(--text-muted)]">
                  {section.items.map((item) => <li key={item} className="border-l-2 border-[var(--line-24)] pl-4">{item}</li>)}
                </ul>
              </section>
            ))}
          </div>
          <p className="mt-8 text-sm text-[var(--text-muted)]">
            Curious about the tools behind the work? <Link href="/uses" className="font-semibold text-[var(--accent)]">Browse my setup →</Link>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
