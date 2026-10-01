'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * PRESENTATION — article reading bar.
 * Job: map scroll progress to a top accent bar.
 */
export function ReadingProgress({ reduceMotion }: { reduceMotion: boolean | null }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 400 : 100,
    damping: reduceMotion ? 50 : 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--atelier-accent)] origin-left z-[100]"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
