'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';

import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import {
  contactMailto,
  hasCalendly,
  hasCv,
  hasWeb3FormsKey,
  siteConfig,
} from '@/config/site';
import { socialLinks } from '@/config/navigation';
import { atelierEase, selectTransition } from '@/lib/animations';

const ContactForm = dynamic(() => import('@/components/ContactForm'));

const values = [
  {
    title: 'Ship, then refine',
    description:
      'I would rather put a reliable app in real hands than polish a prototype forever. Launch teaches what design reviews cannot.',
  },
  {
    title: 'Offline is a feature',
    description:
      'Mobile users lose signal. I build offline-first so the product still feels solid when the network does not.',
  },
  {
    title: 'Architecture that ages',
    description:
      'Clean boundaries, testable layers, and boring state management. Future-me (and your next hire) should not hate the codebase.',
  },
];

const shipped = [
  {
    name: 'Focus Flow',
    role: 'Flutter · Google Play',
    story:
      'A calm focus timer for deep work — sessions, soundscapes, and analytics that stay out of the way. Offline-first with Drift and RevenueCat subscriptions.',
    href: '/projects/focus-flow',
  },
  {
    name: 'Dev Discipline',
    role: 'Flutter · Google Play',
    story:
      'A 60-day discipline system for engineers who want habits that stick — streaks, journaling, and gamified progress without empty streak counters.',
    href: '/projects/dev-discipline',
  },
  {
    name: 'Raha',
    role: 'Flutter · Google Play',
    story:
      'A quiet Islamic companion for daily worship — prayer times, Quran reader, Hijri calendar, and dhikr in one calm offline-first app.',
    href: '/projects/mihrab-by-raha',
  },
];

const skillGroups = [
  {
    label: 'Mobile',
    skills: ['Flutter', 'Dart', 'Riverpod', 'Drift', 'Hive', 'Firebase'],
  },
  {
    label: 'Backend & data',
    skills: ['Supabase', 'PostgreSQL', 'Edge Functions', 'REST APIs'],
  },
  {
    label: 'Web',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    label: 'Craft',
    skills: ['Clean Architecture', 'Offline-First', 'CI/CD', 'Widget Tests'],
  },
];

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]';

export default function About() {
  const reduceMotion = useReducedMotion();

  const heroEnter = (delay: number) =>
    selectTransition(reduceMotion, {
      duration: 0.6,
      delay,
      ease: atelierEase,
    });

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      {/* ── Hero — identity, availability, story hook ───────────────── */}
      <section className="px-6 md:px-12 pt-28 md:pt-36 pb-16 md:pb-24" aria-label="About introduction">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={heroEnter(0.05)}
              className="shrink-0"
            >
              <div className="relative w-[132px] h-[132px] md:w-[160px] md:h-[160px]">
                <div className="absolute -inset-1 rounded-2xl bg-[var(--atelier-accent)]/15 blur-md" aria-hidden />
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--cream-2)]">
                  <Image
                    src="/assets/branding/profile.jpg"
                    alt="Nabi Rahmani — Flutter developer"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    priority
                    quality={85}
                  />
                </div>
                <span
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-[3px] border-[var(--cream)]"
                  title="Available"
                  aria-hidden
                />
              </div>
            </motion.div>

            <div className="text-center md:text-left flex-1 min-w-0">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={heroEnter(0.08)}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-5 justify-center md:justify-start"
              >
                <span
                  className="inline-flex items-center gap-2 self-center md:self-start rounded-[999px] border border-[var(--atelier-accent)]/40 bg-[var(--atelier-accent)]/10 px-3 py-1 text-[12px] font-medium text-[var(--atelier-accent)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--atelier-accent)] motion-safe:animate-pulse"
                    aria-hidden
                  />
                  {siteConfig.availability}
                </span>
                <span
                  className="text-[13px] tracking-[0.12em] uppercase text-[var(--ink-soft)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Flutter · Mobile engineer · Ankara
                </span>
              </motion.div>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={heroEnter(0.12)}
                className="text-[11px] tracking-[0.22em] uppercase text-[var(--muted)] mb-3"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                [ About ]
              </motion.p>

              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={heroEnter(0.16)}
                className="text-[var(--ink)] leading-[1.1] tracking-tight mb-5"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                }}
              >
                I finish apps —{' '}
                <span className="text-[var(--atelier-accent)] italic">not just prototypes.</span>
              </motion.h1>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={heroEnter(0.22)}
                className="text-[16px] md:text-[17px] text-[var(--ink-soft)] leading-relaxed max-w-[36rem] mx-auto md:mx-0 mb-8"
              >
                I&apos;m Nabi — a Flutter developer from Mazar-i-Sharif, Afghanistan, now based in
                Ankara. I care about clean architecture, offline-first reliability, and products
                people actually open on a Tuesday morning.
              </motion.p>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={heroEnter(0.28)}
                className="flex flex-wrap gap-3 justify-center md:justify-start"
              >
                <a
                  href="#contact"
                  className={`atelier-cta inline-flex items-center gap-1.5 rounded-[999px] bg-[var(--ink)] text-[var(--cream)] text-[15px] font-medium no-underline px-6 py-3 ${focusRing}`}
                >
                  Get in touch
                  <span aria-hidden>→</span>
                </a>
                <Link
                  href="/projects"
                  className={`inline-flex items-center gap-1.5 rounded-[999px] border border-[var(--line)] text-[var(--ink)] text-[15px] font-medium no-underline px-6 py-3 hover:border-[var(--ink-soft)] hover:bg-[var(--cream-2)] transition-colors motion-reduce:transition-none ${focusRing}`}
                >
                  View projects
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Story ───────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-24 border-t border-[var(--line)]" aria-label="My story">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] gap-10 md:gap-16 items-start">
              <div>
                <span
                  className="block text-[11px] tracking-[0.22em] uppercase text-[var(--muted)] mb-4"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  [ Story ]
                </span>
                <p
                  className="text-[var(--atelier-accent)] leading-tight m-0"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  }}
                >
                  From Mazar-i-Sharif to shipping for the world.
                </p>
              </div>

              <div className="space-y-5 text-[15px] md:text-[16px] text-[var(--ink-soft)] leading-[1.75]">
                <p className="m-0">
                  I grew up in Mazar-i-Sharif and now work from Ankara. That path shaped how I
                  build: practical, resourceful, and focused on what actually ships. I chose
                  Flutter because it lets me move fast without treating quality as optional.
                </p>
                <p className="m-0">
                  Most of my energy goes into mobile products that stay maintainable after launch —
                  Riverpod for state, Drift for local data, Supabase or Firebase when the backend
                  needs to grow. I would rather ship a smaller surface that works offline than a
                  flashy demo that dies on a flaky network.
                </p>
                <p className="m-0">
                  Outside the IDE: long walks, strong çay, and writing about Flutter production
                  when something useful sticks. If you&apos;re hiring for someone who finishes
                  apps — not just prototypes — I&apos;d like to talk.
                </p>
                <blockquote className="m-0 border-l-[3px] border-[var(--atelier-accent)] pl-5 py-1">
                  <p
                    className="m-0 text-[var(--ink)] leading-snug"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(1.125rem, 2vw, 1.35rem)',
                    }}
                  >
                    Craft over speed. Ideally both.
                  </p>
                </blockquote>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick facts — scannable for hiring managers */}
          <ScrollReveal className="mt-14 md:mt-16">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 rounded-2xl border border-[var(--line)] bg-[var(--cream-2)]/50 px-6 py-6 md:px-8 md:py-7">
              {[
                { label: 'Based', value: 'Ankara, Turkey · GMT+3' },
                { label: 'Focus', value: 'Flutter · Mobile · Offline-first' },
                { label: 'Status', value: siteConfig.availability, accent: true },
                { label: 'Speaks', value: 'English · Persian (Dari) · Turkish' },
                { label: 'Shipped', value: '3 apps on Google Play' },
                { label: 'Experience', value: '3+ years building mobile products' },
              ].map(({ label, value, accent }) => (
                <div key={label} className="flex gap-4 sm:gap-6">
                  <dt
                    className="text-[11px] tracking-[0.1em] uppercase text-[var(--muted)] w-20 shrink-0 pt-0.5"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {label}
                  </dt>
                  <dd
                    className={`text-[15px] m-0 ${
                      accent ? 'text-[var(--atelier-accent)] font-medium' : 'text-[var(--ink)]'
                    }`}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </section>

      {/* ── How I work ──────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-24 border-t border-[var(--line)]" aria-label="How I work">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <span
              className="block text-[11px] tracking-[0.22em] uppercase text-[var(--muted)] mb-3"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              [ How I work ]
            </span>
            <h2
              className="text-[var(--ink)] leading-tight mb-10 md:mb-12 max-w-lg"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
              }}
            >
              Principles I bring to a team
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={reduceMotion ? 0 : i * 0.06}>
                <article className="h-full rounded-2xl border border-[var(--line)] bg-[var(--cream)] p-6 md:p-7">
                  <h3
                    className="text-[var(--ink)] mb-3 leading-snug"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                    }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-[14px] text-[var(--ink-soft)] leading-relaxed m-0">
                    {value.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── What I've shipped (story, not pure resume) ─────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-24 border-t border-[var(--line)]" aria-label="What I've shipped">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-12">
              <div>
                <span
                  className="block text-[11px] tracking-[0.22em] uppercase text-[var(--muted)] mb-3"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  [ Shipped ]
                </span>
                <h2
                  className="text-[var(--ink)] leading-tight m-0"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  }}
                >
                  Real apps on real devices
                </h2>
              </div>
              <Link
                href="/projects"
                className={`text-[13px] font-medium text-[var(--ink)] hover:text-[var(--atelier-accent)] transition-colors no-underline shrink-0 ${focusRing}`}
              >
                All projects →
              </Link>
            </div>
          </ScrollReveal>

          <div className="flex flex-col divide-y divide-[var(--line)] border-t border-b border-[var(--line)]">
            {shipped.map((item, i) => (
              <ScrollReveal key={item.name} delay={reduceMotion ? 0 : i * 0.05}>
                <Link
                  href={item.href}
                  className={`group flex flex-col md:flex-row md:items-baseline gap-3 md:gap-10 py-8 no-underline ${focusRing}`}
                >
                  <div className="md:w-44 shrink-0">
                    <p
                      className="text-[var(--ink)] group-hover:text-[var(--atelier-accent)] transition-colors m-0 leading-snug"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1.125rem, 2vw, 1.35rem)',
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="text-[11px] tracking-[0.08em] uppercase text-[var(--muted)] mt-1 m-0"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {item.role}
                    </p>
                  </div>
                  <p className="flex-1 text-[15px] text-[var(--ink-soft)] leading-relaxed m-0">
                    {item.story}
                  </p>
                  <span
                    className="shrink-0 text-[var(--muted)] group-hover:text-[var(--atelier-accent)] motion-safe:group-hover:translate-x-1 transition-all duration-200 hidden md:block"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Toolkit ─────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-16 md:py-24 border-t border-[var(--line)]" aria-label="Toolkit">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <span
                  className="block text-[11px] tracking-[0.22em] uppercase text-[var(--muted)] mb-3"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  [ Toolkit ]
                </span>
                <h2
                  className="text-[var(--ink)] leading-tight m-0"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  }}
                >
                  What I reach for
                </h2>
              </div>
              <Link
                href="/uses"
                className={`text-[13px] font-medium text-[var(--ink)] hover:text-[var(--atelier-accent)] transition-colors no-underline ${focusRing}`}
              >
                Full setup on /uses →
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {skillGroups.map((group, i) => (
              <ScrollReveal key={group.label} delay={reduceMotion ? 0 : i * 0.04}>
                <div className="rounded-2xl border border-[var(--line)] p-5 md:p-6">
                  <h3
                    className="text-[11px] tracking-[0.12em] uppercase text-[var(--muted)] mb-3 m-0"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {group.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg bg-[var(--accent-soft)] text-[var(--ink-soft)] text-[13px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact — honest conversion path ────────────────────────── */}
      <section
        id="contact"
        className="px-6 md:px-12 py-16 md:py-28 border-t border-[var(--line)]"
        aria-label="Contact"
      >
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <span
              className="block text-[11px] tracking-[0.22em] uppercase text-[var(--muted)] mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              [ Get in touch ]
            </span>
            <h2
              className="mb-4 text-[var(--ink)] leading-tight"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              }}
            >
              Have a role or project in mind?
            </h2>
            <p
              className="mb-3 text-[15px] font-medium text-[var(--atelier-accent)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {siteConfig.availability}
            </p>
            <p className="mb-10 md:mb-12 max-w-[36rem] text-[15px] text-[var(--ink-soft)] leading-relaxed">
              Freelance, full-time remote, or a collaboration — tell me what you&apos;re building.
              I reply personally.
            </p>
          </ScrollReveal>

          {hasWeb3FormsKey() ? (
            <ScrollReveal>
              <div className="mb-12 max-w-[560px]">
                <ContactForm />
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <p className="mb-8 max-w-[560px] text-[15px] text-[var(--ink-soft)] leading-relaxed">
                Prefer email? Reach me directly — I read every message.
              </p>
            </ScrollReveal>
          )}

          <ScrollReveal>
            <div className="mb-10">
              <a
                href={contactMailto({
                  subject: 'Hello from codewithnabi.dev',
                })}
                className={`block no-underline group ${focusRing}`}
              >
                <span
                  className="block text-[var(--ink)] group-hover:text-[var(--atelier-accent)] transition-colors duration-300 leading-none break-words"
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
                  }}
                >
                  {siteConfig.contactEmail}
                  <span
                    className="inline-block motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1 transition-transform duration-300"
                    style={{ fontSize: '0.45em', verticalAlign: 'super', marginLeft: '6px' }}
                    aria-hidden
                  >
                    ↗
                  </span>
                </span>
              </a>
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              {hasCalendly() && (
                <a
                  href={siteConfig.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center rounded-[999px] bg-[var(--ink)] text-[var(--cream)] text-[15px] font-medium no-underline px-6 py-3 ${focusRing}`}
                >
                  Book a 15-min call
                  <span aria-hidden className="ml-1">
                    ↗
                  </span>
                </a>
              )}
              {hasCv() && (
                <a
                  href={siteConfig.cvPath}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center rounded-[999px] border border-[var(--line)] text-[var(--ink)] text-[15px] font-medium no-underline px-6 py-3 hover:border-[var(--ink-soft)] hover:bg-[var(--cream-2)] transition-colors motion-reduce:transition-none ${focusRing}`}
                >
                  Download CV
                </a>
              )}
              <Link
                href="/projects"
                className={`inline-flex items-center rounded-[999px] border border-[var(--line)] text-[var(--ink)] text-[15px] font-medium no-underline px-6 py-3 hover:border-[var(--ink-soft)] hover:bg-[var(--cream-2)] transition-colors motion-reduce:transition-none ${focusRing}`}
              >
                Browse projects
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`border border-[var(--line)] rounded-[999px] px-4 py-1.5 text-[13px] text-[var(--muted)] no-underline hover:bg-[var(--ink)] hover:text-[var(--cream)] hover:border-[var(--ink)] transition-colors duration-200 motion-reduce:transition-none ${focusRing}`}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
