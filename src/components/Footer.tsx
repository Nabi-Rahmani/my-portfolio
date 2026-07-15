'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

import { footerNav, socialLinks } from '@/config/navigation';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface FooterProps {
  /** When true (default), show GitHub / LinkedIn / X. */
  showSocials?: boolean;
  /** Override default footer destinations (e.g. project legal links). */
  links?: { label: string; href: string }[];
  className?: string;
}

export default function Footer({ showSocials = true, links, className }: FooterProps) {
  const year = new Date().getFullYear();
  const footerLinks = links ?? footerNav;
  const reduceMotion = useReducedMotion();

  const scrollToTop = () => {
    const lenis = window.__lenis;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, { immediate: !!reduceMotion });
    } else {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <footer className={cn('relative', className)}>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--atelier-accent)] to-transparent opacity-60" />

      <div className="bg-[var(--cream-2)] px-6 py-8">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-6 flex flex-col items-center gap-6">
            {showSocials && (
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'rounded-full border border-[var(--line)] bg-[var(--cream)] p-2.5 text-[var(--muted)]',
                      'transition-all duration-300 motion-reduce:transition-none',
                      'hover:border-[var(--atelier-accent)] hover:text-[var(--atelier-accent)]',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]',
                    )}
                    aria-label={social.label}
                    whileHover={reduceMotion ? undefined : { scale: 1.1 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                  >
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-4 text-center">
              <span className="text-[0.875rem] text-[var(--muted)]">
                Flutter developer · Ankara, Turkey
              </span>
              <span className="hidden text-[var(--muted)] opacity-40 sm:inline">·</span>
              {footerLinks.map((link) => (
                <Link
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  className="text-[0.8125rem] text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--atelier-accent)] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {siteConfig.cvAvailable && (
              <a
                href={siteConfig.cvPath}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[var(--muted)] no-underline transition-colors hover:text-[var(--ink)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Download CV
              </a>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-[var(--line)] pt-4">
            <span className="text-[0.8125rem] font-medium text-[var(--muted)]">
              &copy; {year} Muhammad Nabi Rahmani
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className={cn(
                'group flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--cream)] px-3 py-1.5 text-[0.75rem] text-[var(--muted)]',
                'transition-all duration-200 motion-reduce:transition-none',
                'hover:border-[var(--atelier-accent)] hover:text-[var(--atelier-accent)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]',
              )}
              aria-label="Back to top"
            >
              <span>Top</span>
              <svg
                width="12"
                height="12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-translate-y-0.5"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
