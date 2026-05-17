'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import type { MouseEvent } from 'react';

declare global {
  interface Window {
    __lenis?: {
      scrollTo: (target: HTMLElement | string, options?: { offset?: number; immediate?: boolean }) => void;
    };
  }
}

const NAV_ITEMS = [
  { label: 'Projects', hash: '#projects' },
  { label: 'Writing', hash: '#blog' },
  { label: 'About', hash: '#about' },
  { label: 'Contact', hash: '#contact' },
];

export default function AtelierNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));

    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  }, [isDark]);

  const handleSmoothScroll = (hash: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(hash) as HTMLElement | null;
    const lenis = window.__lenis;
    if (target && lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(target, { offset: -80 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash);
    }
    setDrawerOpen(false);
  };

  const sunIcon = (size: number) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  );

  const moonIcon = (size: number) => (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  );

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: 'color-mix(in srgb, var(--cream) 88%, transparent)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
          transition: 'border-color 300ms ease',
        }}
      >
        <nav
          className="px-5 md:px-12"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '56px',
            maxWidth: '1440px',
            margin: '0 auto',
          }}
        >
          {/* Left: pulsing dot + brand */}
          <Link
            href="/#home"
            onClick={handleSmoothScroll('#home')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--atelier-accent)',
                animation: 'pulse-dot 2s ease-in-out infinite',
                display: 'block',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
              }}
            >
              codewithnabi
            </span>
          </Link>

          {/* Right: nav links (desktop) + theme toggle + hamburger (mobile) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="hidden md:flex items-center" style={{ gap: '28px' }}>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.hash}
                  href={item.hash}
                  onClick={handleSmoothScroll(item.hash)}
                  className="nav-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                  style={{
                    fontSize: '13px',
                    color: 'var(--ink-soft)',
                    textDecoration: 'none',
                    transition: 'color 200ms ease',
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--muted)',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'transform 300ms ease',
                flexShrink: 0,
              }}
              className="hover:rotate-[20deg] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
            >
              {mounted && (isDark ? sunIcon(14) : moonIcon(14))}
            </button>

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              className="flex md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid var(--line)',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--muted)',
                background: 'transparent',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 z-[70] md:hidden flex flex-col"
              style={{
                width: '280px',
                background: 'var(--cream)',
                borderLeft: '1px solid var(--line)',
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between"
                style={{
                  padding: '20px 24px 16px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'var(--ink)',
                  }}
                >
                  Menu
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid var(--line)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--muted)',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                  className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer nav links */}
              <div style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.hash}
                    href={item.hash}
                    onClick={handleSmoothScroll(item.hash)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    style={{
                      display: 'block',
                      padding: '14px 24px',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '20px',
                      color: 'var(--ink)',
                      textDecoration: 'none',
                    }}
                    className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              {/* Drawer footer: theme toggle */}
              <div style={{ padding: '16px 24px', borderTop: '1px solid var(--line)' }}>
                <button
                  onClick={toggleTheme}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '8px 0',
                    color: 'var(--ink-soft)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                  className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
                >
                  {mounted && (isDark ? sunIcon(16) : moonIcon(16))}
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
