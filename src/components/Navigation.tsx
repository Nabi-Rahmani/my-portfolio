'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState, type MouseEvent } from 'react';

import { primaryNav, scrollToHash, type NavItem } from '@/config/navigation';
import { atelierEase, selectTransition } from '@/lib/animations';
import { cn } from '@/lib/utils';

function SunIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.4 15.4A8.5 8.5 0 018.6 3.6a8.5 8.5 0 1011.8 11.8z" />
    </svg>
  );
}

function ExternalMark() {
  return (
    <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 12 12" aria-hidden>
      <path d="M4 2h6v6M10 2L2 10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onHome = pathname === '/';

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setDrawerOpen(false), [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (!onHome || !window.location.hash) return;
    const frame = window.requestAnimationFrame(() => scrollToHash(window.location.hash, reduceMotion));
    return () => window.cancelAnimationFrame(frame);
  }, [onHome, reduceMotion]);

  const toggleTheme = useCallback(() => {
    const nextDark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', nextDark);
    setIsDark(nextDark);
    try {
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    } catch {
      // Theme persistence is an enhancement; private browsing may reject it.
    }
  }, []);

  const isActive = (item: NavItem) => {
    if (item.id === 'home') return pathname === '/';
    if (item.id === 'projects') return pathname.startsWith('/projects');
    if (item.id === 'articles') return pathname.startsWith('/blog');
    if (item.id === 'about') return pathname.startsWith('/about');
    return false;
  };

  const handleClick = (item: NavItem) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (onHome && item.hash && document.querySelector(item.hash)) {
      event.preventDefault();
      scrollToHash(item.hash, reduceMotion);
    }
    setDrawerOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none',
          scrolled
            ? 'border-[var(--line)] bg-[var(--cream)] shadow-[var(--shadow-sm)]'
            : 'border-transparent bg-transparent',
        )}
      >
        <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-14" aria-label="Primary">
          <Link href="/" className="flex items-center gap-2.5 rounded-sm no-underline">
            <span className="h-2 w-2 rounded-full bg-[var(--atelier-accent)] motion-safe:animate-[pulse-dot_2.4s_ease-in-out_infinite]" aria-hidden />
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--ink)]" style={{ fontFamily: 'var(--font-mono)' }}>
              codewithnabi
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-6 lg:flex">
              {primaryNav.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={handleClick(item)}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  aria-current={isActive(item) ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-1 text-[12px] no-underline transition-colors duration-200',
                    isActive(item) ? 'text-[var(--accent-ink)]' : 'text-[var(--ink-soft)] hover:text-[var(--ink)]',
                  )}
                >
                  {item.label}
                  {item.external && <ExternalMark />}
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--line)] bg-[var(--cream)] text-[var(--muted)] transition-colors hover:border-[var(--atelier-accent)] hover:text-[var(--ink)]"
            >
              {mounted && (isDark ? <SunIcon /> : <MoonIcon />)}
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[var(--line)] bg-[var(--cream)] text-[var(--ink)] lg:hidden"
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
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
              className="fixed inset-0 z-[60] cursor-default border-0 bg-black/45"
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
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(86vw,360px)] flex-col border-l border-[var(--line)] bg-[var(--cream)] px-7 py-6"
              initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={selectTransition(reduceMotion, { duration: 0.35, ease: atelierEase })}
            >
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-5">
                <span className="editorial-kicker">Menu</span>
                <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close menu" className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-transparent text-[var(--ink)]">
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-1">
                {primaryNav.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={selectTransition(reduceMotion, { delay: index * 0.04, duration: 0.3 })}
                  >
                    <Link
                      href={item.href}
                      onClick={handleClick(item)}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className={cn(
                        'flex items-center justify-between border-b border-[var(--line)] py-4 text-[1.65rem] no-underline',
                        isActive(item) ? 'text-[var(--accent-ink)]' : 'text-[var(--ink)]',
                      )}
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {item.label}
                      {item.external && <ExternalMark />}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <button type="button" onClick={toggleTheme} className="flex items-center gap-3 border-t border-[var(--line)] bg-transparent pt-5 text-left text-[12px] text-[var(--muted)]">
                {mounted && (isDark ? <SunIcon /> : <MoonIcon />)}
                {isDark ? 'Use light canvas' : 'Use dark canvas'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
