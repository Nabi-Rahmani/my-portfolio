'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { RefObject } from 'react';

import { IconClose } from '@/core/presentation/layout/NavIcons';
import { ThemeToggle } from '@/core/presentation/layout/ThemeToggle';
import { primaryNav, type NavItem } from '@/core/config/navigation';
import { contactMailto } from '@/core/config/site';
import { revealEase, selectTransition } from '@/core/lib/animations';

interface MobileNavDrawerProps {
  isDark: boolean;
  reduceMotion: boolean | null;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  drawerRef: RefObject<HTMLDivElement | null>;
  isActive: (item: NavItem) => boolean;
  onClose: () => void;
  onToggleTheme: () => void;
}

/**
 * PRESENTATION — mobile site menu.
 * Job: drawer chrome, primary links, contact, and theme row.
 */
export function MobileNavDrawer({
  isDark,
  reduceMotion,
  closeButtonRef,
  drawerRef,
  isActive,
  onClose,
  onToggleTheme,
}: MobileNavDrawerProps) {
  return (
    <>
      <motion.button
        type="button"
        aria-label="Close menu"
        className="fixed inset-0 z-[60] cursor-default border-0 bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={selectTransition(reduceMotion, { duration: 0.2 })}
        onClick={onClose}
      />
      <motion.div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="fixed inset-y-0 right-0 z-[70] flex w-[min(92vw,390px)] flex-col overflow-y-auto overscroll-contain border-l border-[var(--line-16)] bg-[var(--page-bg)] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:p-6"
        initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
        animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
        transition={selectTransition(reduceMotion, {
          duration: 0.32,
          ease: revealEase,
        })}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[var(--text-strong)]">Menu</span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line-24)] bg-transparent text-[var(--text-strong)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] motion-reduce:transition-none"
          >
            <IconClose />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-1">
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
                onClick={onClose}
                aria-current={isActive(item) ? 'page' : undefined}
                className={
                  isActive(item)
                    ? 'flex min-h-14 items-center justify-between rounded-2xl bg-[var(--accent-soft)] px-4 text-[1.25rem] font-semibold tracking-[-0.02em] text-[var(--accent)] no-underline'
                    : 'flex min-h-14 items-center justify-between rounded-2xl px-4 text-[1.25rem] font-semibold tracking-[-0.02em] text-[var(--text-strong)] no-underline transition-colors hover:bg-[var(--panel-bg)]'
                }
              >
                {item.label}
                <span className="text-[var(--text-faint)]" aria-hidden>
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 space-y-3 sm:mt-10">
          <a
            href={contactMailto({ subject: 'Flutter role inquiry' })}
            className="flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--on-accent)] no-underline transition-colors hover:bg-[var(--accent-button-hover)] motion-reduce:transition-none"
          >
            Contact me
          </a>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} variant="row" />
        </div>
      </motion.div>
    </>
  );
}
