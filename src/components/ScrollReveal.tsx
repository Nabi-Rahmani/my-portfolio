'use client';

import type { ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { fadeUpMotion, revealStagger } from '@/lib/animations';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Subtle enter animation that must never leave large invisible layout holes.
 * Soft client navigations (brand → home) and mobile scroll can miss IO ticks,
 * so we force-visible quickly and expand the intersection root downward.
 */
export default function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const reveal = fadeUpMotion(shouldReduceMotion);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.01,
    // Reveal before the block is fully on screen so mobile scroll doesn't show empty gaps.
    margin: '0px 0px 35% 0px',
  });
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    // Failsafe: never stay opacity-0 after a soft navigation / IO race.
    const timer = window.setTimeout(() => setForceVisible(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const show = isInView || forceVisible;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={show ? 'visible' : 'hidden'}
      variants={reveal}
      custom={delay / revealStagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}
