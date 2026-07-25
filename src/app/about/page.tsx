import Image from 'next/image';
import Link from 'next/link';

import Footer from '@/components/Footer';
import { socialLinks } from '@/config/navigation';
import { contactMailto, siteConfig } from '@/config/site';

const principles = [
  {
    title: 'Ship, then refine',
    description:
      'A reliable product in real hands teaches more than a prototype polished in isolation.',
  },
  {
    title: 'Offline is a feature',
    description:
      'Mobile users lose signal. Core workflows should remain useful and understandable anyway.',
  },
  {
    title: 'Architecture should age well',
    description:
      'Clear boundaries and predictable state let the next release remain safer than the last.',
  },
];

const capabilities = [
  {
    label: 'Mobile',
    items: ['Flutter', 'Dart', 'Riverpod', 'Drift', 'SQLite', 'Firebase'],
  },
  {
    label: 'Product systems',
    items: ['Offline-first', 'Subscriptions', 'Store delivery', 'Analytics', 'Crash reporting'],
  },
  {
    label: 'Backend and delivery',
    items: ['Supabase', 'PostgreSQL', 'REST APIs', 'CI/CD', 'Play Console'],
  },
];

export default function About() {
  const githubUrl =
    socialLinks.find((link) => link.label === 'GitHub')?.href ??
    'https://github.com/Nabi-Rahmani';
  const linkedInUrl =
    socialLinks.find((link) => link.label === 'LinkedIn')?.href ?? '#';

  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        <section className="border-b border-[var(--line-16)]">
          <div className="site-container grid gap-9 py-14 sm:gap-12 sm:py-22 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-18 lg:py-26">
            <div className="relative aspect-[4/5] max-w-[390px] overflow-hidden rounded-[28px] border border-[var(--line-18)] bg-[var(--surface-bg)]">
              <Image
                src={siteConfig.portraitPath}
                alt="Nabi Rahmani, Flutter product engineer"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 80vw, 390px"
                priority
              />
              <div className="absolute inset-x-3 bottom-3 flex min-h-11 items-center gap-2 rounded-full bg-black/75 px-4 py-2 text-white backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:py-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#67C58A]" aria-hidden />
                <span className="font-mono text-xs uppercase tracking-[0.1em]">
                  <span className="sm:hidden">Available for remote roles</span>
                  <span className="hidden sm:inline">{siteConfig.availability}</span>
                </span>
              </div>
            </div>

            <div className="lg:pb-2">
              <p className="eyebrow">About Nabi</p>
              <h1 className="display-page mt-6 max-w-[11ch]">
                Product judgment with engineering follow-through.
              </h1>
              <p className="mt-6 max-w-[640px] text-base leading-7 text-[var(--text-muted)] sm:mt-7 sm:text-[1.05rem] sm:leading-8">
                I&apos;m a Flutter product engineer from Mazar-i-Sharif, now based in Ankara.
                For {siteConfig.experienceLabel}, I&apos;ve focused on mobile products that
                stay dependable after launch: clean state, local data, store delivery, and
                maintenance that respects the next version.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
                <a
                  href={contactMailto({ subject: 'Flutter role inquiry' })}
                  className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-[var(--on-accent)] no-underline transition-colors hover:bg-[var(--accent-button-hover)] motion-reduce:transition-none sm:w-auto"
                >
                  Start a conversation
                </a>
                <Link
                  href="/projects"
                  className="flex h-12 w-full items-center justify-center rounded-full border border-[var(--line-24)] px-6 text-sm font-semibold text-[var(--text-strong)] no-underline transition-colors hover:border-[var(--accent)] motion-reduce:transition-none sm:w-auto"
                >
                  View my work
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line-16)] bg-[var(--surface-bg)]">
          <dl className="site-container grid grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Based', value: `${siteConfig.location} · ${siteConfig.timezone}` },
              { label: 'Experience', value: `${siteConfig.experienceLabel} with Flutter` },
              { label: 'Shipped', value: '3 live Play Store products' },
              { label: 'Languages', value: 'English · Persian · Turkish' },
            ].map((fact, index) => (
              <div
                key={fact.label}
                className={[
                  'border-b border-[var(--line-16)] px-3 py-5 lg:border-b-0 lg:border-r lg:px-6 lg:py-8',
                  index % 2 === 0 ? 'border-r border-[var(--line-16)] pl-0' : '',
                  index === 1 ? 'pr-0 lg:pr-6' : '',
                  index >= 2 ? 'border-b-0' : '',
                  index === 3 ? 'border-r-0 pr-0 lg:pr-0' : '',
                ].join(' ')}
              >
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="mt-2 text-[0.82rem] font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="site-container grid gap-8 py-14 sm:gap-12 sm:py-22 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:py-28">
          <div>
            <p className="eyebrow">The path here</p>
            <h2 className="display-section mt-5 max-w-[10ch]">Practical work, built for real conditions.</h2>
          </div>
          <div className="space-y-6 text-[0.98rem] leading-8 text-[var(--text-muted)]">
            <p>
              Growing up in Mazar-i-Sharif and building from Ankara shaped how I approach
              software: be resourceful, make the important path reliable, and avoid complexity
              that does not serve the person using the product.
            </p>
            <p>
              Flutter became the right tool because it lets me own the complete mobile
              experience without treating architecture or platform delivery as somebody
              else&apos;s problem. My projects cover state, persistence, subscriptions,
              observability, and the release process around the interface.
            </p>
            <p>
              I work best with teams that care about the product after the first launch—where
              quality means maintainable decisions, clear communication, and a willingness to
              finish the unglamorous parts.
            </p>
          </div>
        </section>

        <section className="border-y border-[var(--line-16)] bg-[var(--panel-bg)]">
          <div className="site-container grid gap-8 py-14 sm:gap-12 sm:py-22 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:py-28">
            <div>
              <p className="eyebrow">Working principles</p>
              <h2 className="display-section mt-5 max-w-[9ch]">How I make decisions.</h2>
            </div>
            <div className="border-t border-[var(--line-16)]">
              {principles.map((principle, index) => (
                <div
                  key={principle.title}
                  className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-3 gap-y-2 border-b border-[var(--line-16)] py-6 sm:grid-cols-[48px_190px_1fr] sm:gap-6 sm:py-7"
                >
                  <span className="font-mono text-xs text-[var(--accent)]">
                    0{index + 1}
                  </span>
                  <h3 className="text-[0.92rem] font-semibold">{principle.title}</h3>
                  <p className="col-start-2 text-sm leading-6 text-[var(--text-muted)] sm:col-start-auto">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="site-container py-14 sm:py-22 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="eyebrow">Capabilities</p>
              <h2 className="display-section mt-5 max-w-[8ch]">Tools in service of the product.</h2>
            </div>
            <div className="border-t border-[var(--line-16)]">
              {capabilities.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-4 border-b border-[var(--line-16)] py-7 sm:grid-cols-[170px_1fr] sm:gap-6"
                >
                  <h3 className="text-[0.9rem] font-semibold">{group.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--line-16)] bg-[var(--surface-bg)] px-3 py-2 font-mono text-xs text-[var(--text-muted)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--line-16)] bg-[var(--accent-soft)]">
          <div className="site-container grid gap-8 py-14 sm:gap-10 sm:py-22 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-[var(--accent)]">Let&apos;s talk</p>
              <h2 className="display-section mt-5 max-w-[14ch]">
                I&apos;m open to remote Flutter roles and thoughtful product teams.
              </h2>
              <p className="mt-6 max-w-[58ch] text-[0.9rem] leading-7 text-[var(--text-muted)]">
                Share the role, product, or problem you&apos;re hiring for. I usually reply
                within one working day.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
              <a
                href={contactMailto({ subject: 'Flutter role inquiry' })}
                className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 text-center text-sm font-semibold text-[var(--on-accent)] no-underline transition-colors hover:bg-[var(--accent-button-hover)] motion-reduce:transition-none sm:w-auto"
              >
                {siteConfig.contactEmail}
              </a>
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center rounded-full border border-[var(--line-24)] bg-[var(--surface-bg)] px-6 text-center text-sm font-semibold text-[var(--text-strong)] no-underline transition-colors hover:border-[var(--accent)] motion-reduce:transition-none sm:w-auto"
              >
                LinkedIn ↗
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 w-full items-center justify-center text-center font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-muted)] no-underline sm:w-auto"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
