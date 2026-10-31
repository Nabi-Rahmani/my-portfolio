'use client';

import { AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';

import { MobileNavDrawer } from '@/core/presentation/layout/MobileNavDrawer';
import { IconMenu } from '@/core/presentation/layout/NavIcons';
import { ThemeToggle } from '@/core/presentation/layout/ThemeToggle';
import { primaryNav, type NavItem } from '@/core/config/navigation';
import { siteConfig } from '@/core/config/site';
import { cn } from '@/core/lib/utils';

function scrollDocumentTop(behavior: ScrollBehavior) {
  window.scrollTo({ top: 0, left: 0, behavior });
  // iOS Safari can keep the previous page's offset on soft navigations.
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/**
 * PRESENTATION CONTROLLER — site chrome.
 * Job: brand/home scroll, theme persistence, desktop links, mobile drawer trigger.
 */
export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const pendingHomeScroll = useRef(false);
  const [isDark, setIsDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/' || !pendingHomeScroll.current) return;
    pendingHomeScroll.current = false;
    scrollDocumentTop('auto');
    const id = window.requestAnimationFrame(() => scrollDocumentTop('auto'));
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleDrawerKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDrawerOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleDrawerKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleDrawerKeyDown);
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

  const handleBrandClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setDrawerOpen(false);
      document.body.style.overflow = '';

      const behavior: ScrollBehavior = reduceMotion ? 'auto' : 'smooth';

      if (pathname === '/') {
        if (window.location.hash) {
          window.history.replaceState(null, '', '/');
        }
        scrollDocumentTop(behavior);
        return;
      }

      pendingHomeScroll.current = true;
      router.push('/');
    },
    [pathname, reduceMotion, router],
  );

  const isActive = (item: NavItem) => {
    if (item.id === 'projects') return pathname.startsWith('/projects');
    if (item.id === 'articles') return pathname.startsWith('/blog');
    if (item.id === 'learn') return pathname.startsWith('/courses');
    return pathname.startsWith('/about');
  };

  const navLinkClass = (item: NavItem) =>
    cn(
      'inline-flex min-h-10 items-center px-3 font-mono text-xs uppercase tracking-widest no-underline transition-colors duration-150',
      isActive(item)
        ? 'text-[var(--accent)]'
        : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]',
    );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line-16)] bg-[var(--header-bg)]">
        <nav
          className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-4 sm:px-6"
          aria-label="Primary"
        >
          <Link
            href="/"
            scroll
            onClick={handleBrandClick}
            aria-label={`${siteConfig.name} home`}
            className="inline-flex min-h-11 items-center gap-3 no-underline"
          >
            <Image
              src={siteConfig.avatarPath}
              alt=""
              width={32}
              height={32}
              priority
              className="size-8 border border-[var(--line-16)] object-cover"
            />
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-strong)]">
              {siteConfig.shortName}
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden items-center md:flex">
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

            <Link
              href="/#contact"
              className="hidden items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent)] no-underline sm:inline-flex"
            >
              <span className="size-1.5 bg-[var(--accent)]" aria-hidden />
              Open to work
            </Link>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              className="flex h-11 w-11 cursor-pointer items-center justify-center border border-[var(--line-16)] bg-[var(--page-bg)] text-[var(--text-strong)] transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] motion-reduce:transition-none md:hidden"
            >
              <IconMenu />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {drawerOpen && (
          <MobileNavDrawer
            isDark={isDark}
            reduceMotion={reduceMotion}
            closeButtonRef={closeButtonRef}
            drawerRef={drawerRef}
            isActive={isActive}
            onClose={() => setDrawerOpen(false)}
            onToggleTheme={toggleTheme}
          />
        )}
      </AnimatePresence>
    </>
  );
}
