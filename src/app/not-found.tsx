'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

export default function NotFound() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-[var(--cream)] text-[var(--ink)] flex items-center justify-center px-6">
      <div className="text-center max-w-[480px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            reduceMotion
              ? { duration: 0.01 }
              : { type: 'spring', stiffness: 200, damping: 16 }
          }
        >
          <span className="text-[6rem] md:text-[8rem] font-bold text-[var(--atelier-accent)] leading-none block">
            404
          </span>
        </motion.div>

        <motion.h1
          className="text-[1.5rem] md:text-[2rem] font-bold tracking-tight mt-4 mb-3"
          style={{ fontFamily: 'var(--font-serif)' }}
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0.01 }
              : { type: 'spring', stiffness: 120, damping: 16, delay: 0.1 }
          }
        >
          Page not found
        </motion.h1>

        <motion.p
          className="text-[0.9375rem] md:text-[1rem] text-[var(--muted)] leading-relaxed mb-8"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0.01 }
              : { type: 'spring', stiffness: 120, damping: 16, delay: 0.2 }
          }
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        <motion.div
          className="flex gap-3 justify-center flex-wrap"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0.01 }
              : { type: 'spring', stiffness: 120, damping: 16, delay: 0.3 }
          }
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ink)] text-[var(--cream)] rounded-full text-[0.9375rem] font-semibold no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
          >
            Go home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--line)] text-[var(--ink)] rounded-full text-[0.9375rem] font-medium no-underline hover:bg-[var(--cream-2)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atelier-accent)]"
          >
            Browse Writing
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
