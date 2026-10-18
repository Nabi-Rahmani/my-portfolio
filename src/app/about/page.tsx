import Image from 'next/image';
import Link from 'next/link';

import Footer from '@/core/presentation/layout/Footer';
import TestBuildsSection from '@/features/test-builds/presentation';
import { socialLinks } from '@/core/config/navigation';
import { contactMailto, siteConfig } from '@/core/config/site';
import { testBuildApps } from '@/features/test-builds/data/test-builds';
import { assertValidTestBuilds } from '@/features/test-builds/application/validate-test-builds';

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
  // Fails `npm run build` and the dev render when an entry is invalid or
  // still points at a local-only file (server-only validator, never ships
  // to the client bundle).
  assertValidTestBuilds(testBuildApps);

  const githubUrl =
    socialLinks.find((link) => link.label === 'GitHub')?.href ??
    'https://github.com/Nabi-Rahmani';
  const linkedInUrl =
    socialLinks.find((link) => link.label === 'LinkedIn')?.href ?? '#';

  return (
    <div className="min-h-screen bg-[var(--page-bg)] pt-[72px] text-[var(--text-strong)]">
      <main>
        <section className="border-b border-[var(--line-16)]">
          <div className="site-container grid gap-9 py-12 sm:gap-12 sm:py-16 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16 lg:py-20">
            <div className="relative aspect-[4/5] max-w-[390px] overflow-hidden rounded-[28px] border border-[var(--line-18)] bg-[var(--surface-bg)] shadow-[var(--card-shadow-hover)]">
              <Image
                src={siteConfig.portraitPath}
                alt="Nabi Rahmani, Flutter product engineer"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 80vw, 390px"
                priority
              />
              <div className="absolute inset-x-3 bottom-3 flex min-h-11 items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-white backdrop-blur-md sm:inset-x-4 sm:bottom-4 sm:py-2.5">
                <span className="h-2 w-2 rounded-full bg-[#4ade80]" aria-hidden />
                <span className="text-sm font-medium">
                  <span className="sm:hidden">Available for remote roles</span>
                  <span className="hidden sm:inline">{siteConfig.availability}</span>
                </span>
              </div>
            </div>

            <div className="lg:pb-2">
              <p className="eyebrow">About me</p>
              <h1 className="display-page mt-3 max-w-[16ch]">
                Hi, I&apos;m Nabi. I build apps that keep working after launch.
              </h1>
              <p className="mt-5 max-w-[640px] text-base leading-7 text-[var(--text-muted)] sm:text-[1.075rem] sm:leading-8">
                I&apos;m a Flutter product engineer from Mazar-i-Sharif, now based in Ankara.
                For {siteConfig.experienceLabel}, I&apos;ve focused on mobile products that
                stay dependable after launch: clean state, local data, store delivery, and
                maintenance that respects the next version.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={contactMailto({ subject: 'Flutter role inquiry' })}
                  className="button-primary w-full sm:w-auto"
                >
                  Contact me
                </a>
                <Link href="/projects" className="button-secondary w-full sm:w-auto">
                  See my projects
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
                <dt className="meta-label">{fact.label}</dt>
                <dd className="mt-1 text-[0.9375rem] font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="site-container grid gap-6 py-14 sm:gap-10 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:py-24">
          <div>
            <p className="eyebrow">My story</p>
            <h2 className="display-section mt-2 max-w-[14ch]">Practical work, built for real life.</h2>
          </div>
          <div className="max-w-[68ch] space-y-5 text-[1.0625rem] leading-8 text-[var(--text-muted)]">
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
          <div className="site-container py-14 sm:py-20 lg:py-24">
            <p className="eyebrow">How I work</p>
            <h2 className="display-section mt-2">Three simple rules I follow</h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {principles.map((principle, index) => (
                <li key={principle.title} className="editorial-card p-6">
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent)]"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-[1.125rem] font-semibold tracking-[-0.015em]">{principle.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-7 text-[var(--text-muted)]">
                    {principle.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="site-container py-14 sm:py-20 lg:py-24">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="eyebrow">Skills</p>
              <h2 className="display-section mt-2 max-w-[14ch]">Tools I use every day</h2>
            </div>
            <div className="border-t border-[var(--line-16)]">
              {capabilities.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-3 border-b border-[var(--line-16)] py-6 sm:grid-cols-[170px_1fr] sm:gap-6"
                >
                  <h3 className="text-[0.9375rem] font-semibold">{group.label}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="chip border border-[var(--line-16)] bg-[var(--surface-bg)] px-3 py-1.5 text-[0.8125rem]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TestBuildsSection />

        <section className="border-t border-[var(--line-16)] bg-[var(--accent-soft)]">
          <div className="site-container grid gap-8 py-14 sm:gap-10 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow">Let&apos;s talk</p>
              <h2 className="display-section mt-2 max-w-[22ch]">
                I&apos;m open to remote Flutter roles and thoughtful product teams.
              </h2>
              <p className="mt-4 max-w-[58ch] text-[1rem] leading-7 text-[var(--text-muted)]">
                Share the role, product, or problem you&apos;re hiring for. I usually reply
                within one working day.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col">
              <a
                href={contactMailto({ subject: 'Flutter role inquiry' })}
                className="button-primary w-full sm:w-auto"
              >
                {siteConfig.contactEmail}
              </a>
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary w-full sm:w-auto"
              >
                LinkedIn <span aria-hidden>↗</span>
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 w-full items-center justify-center text-center text-[0.9375rem] font-semibold text-[var(--accent)] no-underline sm:w-auto"
              >
                GitHub <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
