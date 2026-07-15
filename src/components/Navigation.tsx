'use client';

import type { MouseEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { primaryNav, scrollToHash, type NavId } from '@/config/navigation';
import { selectTransition } from '@/lib/animations';
import { cn } from '@/lib/utils';

function SunIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  );
}

function MoonIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  );
}

/**
 * Site-wide Atelier shell chrome: brand bar, IA, theme toggle, mobile drawer.
 * Home: smooth-scroll to sections when present. Off-home: real routes.
 */
export default function Navigation() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('#home');

  const onHome = pathname === '/' || pathname === '';

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));

    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash || '#home');
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  // After navigating to /#section from another page, scroll once the section exists
  useEffect(() => {
    if (!onHome) return;
    const hash = window.location.hash;
    if (!hash || hash === '#home') return;
    // Defer so layout paints section targets
    const id = window.requestAnimationFrame(() => {
      scrollToHash(hash, reduceMotion);
    });
    return () => window.cancelAnimationFrame(id);
  }, [onHome, reduceMotion]);

  const toggleTheme = useCallback(() => {
    const nextDark = !document.documentElement.classList.contains('dark');
    setIsDark(nextDark);
    document.documentElement.classList.toggle('dark', nextDark);
    try {
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    } catch {
      /* ignore quota / private mode */
    }
  }, []);

  const isActive = useCallback(
    (id: NavId | 'home') => {
      if (id === 'home') {
        return onHome && (activeHash === '#home' || activeHash === '');
      }
      if (onHome) {
        const item = primaryNav.find((n) => n.id === id);
        if (item?.hash) return activeHash === item.hash;
        return false;
      }
      if (id === 'projects') return pathname.startsWith('/projects');
      if (id === 'writing') return pathname.startsWith('/blog');
      if (id === 'about') return pathname.startsWith('/about');
      if (id === 'courses') return pathname.startsWith('/courses');
      if (id === 'contact') return false;
      return false;
    },
    [pathname, activeHash, onHome],
  );

  const handleNavClick =
    (item: (typeof primaryNav)[number] | { id: 'home'; href: string; hash: string }) =>
    (event: MouseEvent<HTMLAnchorElement>) => {
      const hash = 'hash' in item ? item.hash : undefined;

      if (onHome && hash) {
        const exists = typeof document !== 'undefined' && !!document.querySelector(hash);
        if (exists) {
          event.preventDefault();
          scrollToHash(hash, reduceMotion);
          setActiveHash(hash);
          setDrawerOpen(false);
          return;
        }
      }

      setDrawerOpen(false);
    };

  const drawerTransition = selectTransition(
    reduceMotion,
    { type: 'spring', stiffness: 350, damping: 35 },
    { duration: 0.15 },
  );
  const backdropTransition = selectTransition(reduceMotion, { duration: 0.25 }, { duration: 0.1 });

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 backdrop-blur-md',
          'border-b transition-[border-color] duration-300 motion-reduce:transition-none',
          scrolled ? 'border-[var(--line)]' : 'border-transparent',
        )}
        style={{
          backgroundColor: 'color-mix(in srgb, var(--cream) 88%, transparent)',
        }}
      >
        <nav
          className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 md:px-12"
          aria-label="Primary"
        >
          <Link
            href="/#home"
            onClick={handleNavClick({ id: 'home', href: '/#home', hash: '#home' })}
            className="flex items-center gap-2.5 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
          >
            <span
              className="block h-2 w-2 shrink-0 rounded-full bg-[var(--atelier-accent)] motion-safe:animate-[pulse-dot_2s_ease-in-out_infinite]"
              aria-hidden
            />
            <span
              className="text-[12px] uppercase tracking-[0.04em] text-[var(--ink)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              codewithnabi
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-7 md:flex">
              {primaryNav.map((item) => {
                const active = isActive(item.id);
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={handleNavClick(item)}
                    className={cn(
                      'nav-link text-[13px] no-underline transition-colors duration-200 motion-reduce:transition-none',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]',
                      active ? 'text-[var(--ink)]' : 'text-[var(--ink-soft)] hover:text-[var(--ink)]',
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={cn(
                'flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--line)] bg-transparent text-[var(--muted)]',
                'motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:rotate-[20deg]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]',
              )}
            >
              {mounted && (isDark ? <SunIcon size={14} /> : <MoonIcon size={14} />)}
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              className={cn(
                'flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--line)] bg-transparent text-[var(--muted)] md:hidden',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]',
              )}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={backdropTransition}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
              aria-hidden
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={drawerTransition}
              className="fixed top-0 right-0 bottom-0 z-[70] flex w-[280px] flex-col border-l border-[var(--line)] bg-[var(--cream)] md:hidden"
            >
              <div className="flex items-center justify-between border-b border-[var(--line)] px-6 pb-4 pt-5">
                <span
                  className="text-[12px] uppercase tracking-[0.04em] text-[var(--ink)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--line)] bg-transparent text-[var(--muted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-3">
                {primaryNav.map((item, i) => {
                  const active = isActive(item.id);
                  return (
                    <motion.div
                      key={item.id}
                      initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={
                        reduceMotion
                          ? { duration: 0.01 }
                          : { delay: i * 0.05, duration: 0.3 }
                      }
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavClick(item)}
                        className={cn(
                          'block px-6 py-3.5 text-[20px] no-underline',
                          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]',
                          active ? 'text-[var(--atelier-accent)]' : 'text-[var(--ink)]',
                        )}
                        style={{ fontFamily: 'var(--font-serif)' }}
                        aria-current={active ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="border-t border-[var(--line)] px-6 py-4">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex w-full cursor-pointer items-center gap-3 border-none bg-transparent py-2 text-[12px] uppercase tracking-[0.04em] text-[var(--ink-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {mounted && (isDark ? <SunIcon size={16} /> : <MoonIcon size={16} />)}
                  <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
