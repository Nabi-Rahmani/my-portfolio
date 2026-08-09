'use client';

import type { ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { revealDistance, revealDuration, revealEase } from '@/lib/animations';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Progressive-enhancement scroll settle.
 *
 * Never paints `opacity: 0` into SSR HTML. The live homepage previously shipped
 * with Framer `initial="hidden"` styles, so first open looked blank until JS
 * hydrated — while client navigations to About/Work (no ScrollReveal) looked fine.
 *
 * Opacity is always 1. After hydration, below-fold blocks may ease up slightly
 * when they enter the viewport; content remains readable even if JS is slow.
 */
export default function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR + first paint + reduced motion: plain visible DOM (no Framer styles).
  if (!mounted || shouldReduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      // initial={false} + opacity always 1 → no invisible first paint after mount
      initial={false}
      animate={{
        opacity: 1,
        y: isInView ? 0 : revealDistance,
      }}
      transition={{
        duration: revealDuration,
        delay: delay / 1000,
        ease: revealEase,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
