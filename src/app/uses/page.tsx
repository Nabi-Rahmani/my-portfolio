import Link from 'next/link';
import Footer from '@/components/Footer';
import { usesCategories } from '@/data/uses';

export default function Uses() {
  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <section className="px-6 md:px-12 pt-28 md:pt-36 pb-12 md:pb-16" aria-label="Uses introduction">
        <div className="max-w-[900px] mx-auto">
          <p
            className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)] mb-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            [ Uses ]
          </p>
          <h1
            className="leading-tight tracking-tight text-[var(--ink)] mb-4"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            }}
          >
            What I build with
          </h1>
          <p className="text-[1rem] text-[var(--ink-soft)] leading-relaxed max-w-[520px]">
            Hardware, tools, and services behind the apps and this site. See also{' '}
            <Link
              href="/now"
              className="text-[var(--atelier-accent)] underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
            >
              what I&apos;m doing now
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-20 md:pb-28" aria-label="Tools and stack">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {usesCategories.map((category) => (
            <div
              key={category.label}
              className="rounded-2xl border border-[var(--line)] bg-[var(--cream-2)]/40 p-6 transition-colors duration-300 motion-reduce:transition-none hover:border-[var(--atelier-accent)]/30"
            >
              <h2 className="text-[0.9375rem] font-semibold text-[var(--ink)] mb-4">
                {category.label}
              </h2>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--cream)] text-[var(--ink-soft)] text-[0.8125rem] font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
