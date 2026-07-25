'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState, type MouseEvent } from 'react';

import { primaryNav, scrollToHash, type NavItem } from '@/config/navigation';
import { hasSubscribe, siteConfig } from '@/config/site';
import { atelierEase, selectTransition } from '@/lib/animations';
import { cn } from '@/lib/utils';

function ExternalMark() {
  return <span aria-hidden>↗</span>;
}

export default function Navigation() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [isDark, setIsDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onHome = pathname === '/';

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
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
    if (item.id === 'projects') return pathname.startsWith('/projects');
    if (item.id === 'articles') return pathname.startsWith('/blog');
    if (item.id === 'about') return pathname.startsWith('/about');
    if (item.id === 'courses') return pathname.startsWith('/courses');
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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line-16)] bg-[var(--page-bg)]">
        <nav className="grid grid-cols-[1fr_auto_1fr] items-center px-5 py-[13px] min-[760px]:px-10" aria-label="Primary">
          <Link href="/" className="flex items-center justify-self-start gap-[9px] rounded-sm no-underline">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--accent)]">
              codewithnabi
            </span>
          </Link>

          <div className="hidden items-center gap-6 min-[760px]:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleClick(item)}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                aria-current={isActive(item) ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-1 text-[13px] font-medium no-underline transition-colors duration-[120ms] ease-out',
                  isActive(item) ? 'text-[#F5EFE3] dark:text-[#F5EFE3] text-[var(--text-strong)]' : 'text-[#A99B85] hover:text-[var(--text-strong)]',
                )}
              >
                {item.label}
                {item.external && <ExternalMark />}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-self-end gap-[10px]">
            {hasSubscribe() && (
              <a
                href={siteConfig.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-pill border border-[var(--line-24)] px-[13px] py-[5px] text-[12px] font-medium text-[var(--accent)] no-underline transition-colors duration-[120ms] ease-out hover:border-[var(--line-30)]"
              >
                Subscribe
              </a>
            )}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[var(--line-24)] bg-transparent font-mono text-[12px] text-[var(--text-strong)] transition-colors duration-[120ms] ease-out hover:border-[var(--line-30)]"
            >
              ☾
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[var(--line-24)] bg-transparent text-[var(--text-strong)] transition-colors duration-[120ms] ease-out hover:border-[var(--line-30)] min-[760px]:hidden"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
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
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(86vw,360px)] flex-col border-l border-[var(--line-16)] bg-[var(--page-bg)] px-5 py-[13px]"
              initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={selectTransition(reduceMotion, { duration: 0.35, ease: atelierEase })}
            >
              <div className="flex items-center justify-between border-b border-[var(--line-16)] pb-[13px]">
                <span className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-[var(--accent)]">Menu</span>
                <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close menu" className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line-24)] bg-transparent text-[var(--text-strong)] transition-colors duration-[120ms] ease-out hover:border-[var(--line-30)]">
                  <span aria-hidden>×</span>
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
                      aria-current={isActive(item) ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between border-b border-[var(--line-16)] py-4 text-[17px] font-medium no-underline',
                        isActive(item) ? 'text-[var(--text-strong)]' : 'text-[var(--text-body)]',
                      )}
                    >
                      {item.label}
                      {item.external && <ExternalMark />}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <button type="button" onClick={toggleTheme} className="flex items-center gap-3 border-t border-[var(--line-16)] bg-transparent pt-[13px] text-left font-mono text-[11.5px] text-[var(--text-muted)] transition-colors duration-[120ms] ease-out hover:text-[var(--text-strong)]">
                <span aria-hidden>☾</span>
                {isDark ? 'Use light canvas' : 'Use dark canvas'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
