'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { primaryNav, type NavItem } from '@/config/navigation';
import { contactMailto, siteConfig } from '@/config/site';
import { revealEase, selectTransition } from '@/lib/animations';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isDark, setIsDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => setDrawerOpen(false), [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
      previouslyFocused?.focus();
    };
  }, [drawerOpen]);

  const toggleTheme = useCallback(() => {
    const nextDark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', nextDark);
    setIsDark(nextDark);

    try {
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    } catch {
      // Theme persistence is optional in restricted browsing modes.
    }
  }, []);

  const isActive = (item: NavItem) => {
    if (item.id === 'projects') return pathname.startsWith('/projects');
    if (item.id === 'articles') return pathname.startsWith('/blog');
    return pathname.startsWith('/about');
  };

  const navLinkClass = (item: NavItem) =>
    cn(
      'relative py-2 text-[0.82rem] font-medium no-underline transition-colors duration-150',
      isActive(item)
        ? 'text-[var(--text-strong)] after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-[var(--accent)]'
        : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]',
    );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line-16)] bg-[var(--header-bg)] backdrop-blur-xl">
        <nav
          className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-10"
          aria-label="Primary"
        >
          <Link href="/" className="group flex items-center gap-3 no-underline">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--text-strong)] font-mono text-[0.72rem] font-semibold tracking-[-0.03em] text-[var(--page-bg)] transition-transform duration-200 group-hover:scale-[1.04]"
              aria-hidden
            >
              NR
            </span>
            <span className="flex flex-col">
              <span className="text-[0.85rem] font-semibold tracking-[-0.01em] text-[var(--text-strong)]">
                {siteConfig.shortName}
              </span>
              <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.11em] text-[var(--text-faint)] sm:block">
                {siteConfig.role}
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                aria-current={isActive(item) ? 'page' : undefined}
                className={navLinkClass(item)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={contactMailto({ subject: 'Flutter role inquiry' })}
              className="hidden rounded-full bg-[var(--text-strong)] px-4 py-2 text-[0.78rem] font-semibold text-[var(--page-bg)] no-underline transition-transform duration-150 hover:-translate-y-0.5 sm:inline-flex"
            >
              Email me
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--line-24)] bg-[var(--surface-bg)] font-mono text-[0.68rem] font-medium text-[var(--text-strong)] transition-colors duration-150 hover:border-[var(--accent)]"
            >
              {isDark ? 'L' : 'D'}
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              className="flex h-9 w-9 cursor-pointer flex-col items-center justify-center gap-1 rounded-full border border-[var(--line-24)] bg-[var(--surface-bg)] md:hidden"
            >
              <span className="h-px w-3.5 bg-[var(--text-strong)]" aria-hidden />
              <span className="h-px w-3.5 bg-[var(--text-strong)]" aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[60] cursor-default border-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={selectTransition(reduceMotion, { duration: 0.2 })}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(90vw,390px)] flex-col border-l border-[var(--line-16)] bg-[var(--page-bg)] p-6"
              initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={selectTransition(reduceMotion, {
                duration: 0.32,
                ease: revealEase,
              })}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                  Navigation
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line-24)] bg-transparent text-xl text-[var(--text-strong)]"
                >
                  <span aria-hidden>×</span>
                </button>
              </div>

              <div className="mt-16 flex flex-col">
                {primaryNav.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={selectTransition(reduceMotion, {
                      delay: index * 0.04,
                      duration: 0.25,
                    })}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      aria-current={isActive(item) ? 'page' : undefined}
                      className="flex items-center justify-between border-b border-[var(--line-16)] py-5 text-[1.7rem] font-semibold tracking-[-0.04em] text-[var(--text-strong)] no-underline"
                    >
                      {item.label}
                      <span className="font-mono text-[0.75rem] text-[var(--text-faint)]">
                        0{index + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto space-y-4">
                <a
                  href={contactMailto({ subject: 'Flutter role inquiry' })}
                  className="flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3.5 text-[0.86rem] font-semibold text-white no-underline"
                >
                  Start a conversation
                </a>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="w-full bg-transparent text-center font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--text-muted)]"
                >
                  {isDark ? 'Use light canvas' : 'Use dark canvas'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
