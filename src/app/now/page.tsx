import Link from 'next/link';
import Footer from '@/components/Footer';
import { nowData } from '@/data/now';

export default function Now() {
  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <section className="px-6 md:px-12 pt-28 md:pt-36 pb-12 md:pb-16" aria-label="Now introduction">
        <div className="max-w-[720px] mx-auto">
          <p
            className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)] mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            [ Now ]
          </p>
          <h1
            className="leading-tight tracking-tight text-[var(--ink)] mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            }}
          >
            What I&apos;m up to
          </h1>
          <p
            className="text-[13px] text-[var(--atelier-accent)] font-medium mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Last updated: {nowData.lastUpdated}
          </p>
          <p className="text-[1rem] text-[var(--ink-soft)] leading-relaxed max-w-[520px]">
            A snapshot of what I&apos;m focused on right now. See also{' '}
            <Link
              href="/uses"
              className="text-[var(--atelier-accent)] underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
            >
              what I use
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-20 md:pb-28" aria-label="Current focus">
        <div className="max-w-[720px] mx-auto flex flex-col gap-5">
          {nowData.sections.map((section) => (
            <div
              key={section.label}
              className="rounded-2xl border border-[var(--line)] bg-[var(--cream-2)]/40 p-6 md:p-7"
            >
              <h2
                className="text-[0.8125rem] font-medium tracking-[0.08em] uppercase text-[var(--atelier-accent)] mb-4"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {section.label}
              </h2>
              <ul className="flex flex-col gap-3 list-none p-0 m-0">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="text-[0.9375rem] text-[var(--ink-soft)] leading-relaxed pl-4 border-l-2 border-[var(--line)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
