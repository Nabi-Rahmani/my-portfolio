'use client';

import type { ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

import { fadeUpMotion, revealStagger } from '@/lib/animations';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Fade-up on enter. Uses `useInView` + `animate` (not only `whileInView`) so
 * soft client navigations (e.g. brand link → home) still reveal content that
 * mounts already in the viewport.
 */
export default function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const reveal = fadeUpMotion(shouldReduceMotion);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={reveal}
      custom={delay / revealStagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}
