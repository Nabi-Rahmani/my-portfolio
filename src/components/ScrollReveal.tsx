'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { atelierEaseSoft, selectTransition } from '@/lib/animations';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={selectTransition(shouldReduceMotion, {
        duration: 0.7,
        ease: atelierEaseSoft,
        delay,
      })}
      className={className}
    >
      {children}
    </motion.div>
  );
}
