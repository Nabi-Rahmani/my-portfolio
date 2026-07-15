import type { Transition, Variants } from 'framer-motion';

/** Shared easing used by Atelier motion language */
export const atelierEase = [0.25, 0.4, 0.25, 1] as const;
export const atelierEaseSoft = [0.2, 0.8, 0.2, 1] as const;

/** Instant / near-instant transition when motion should be reduced */
export const reducedTransition: Transition = { duration: 0.01 };

/**
 * Pick full vs reduced Framer Motion variants.
 * Pass `useReducedMotion()` (boolean | null) as the first argument.
 */
export function selectVariants(
  reduceMotion: boolean | null | undefined,
  full: Variants,
  reduced: Variants = fadeIn,
): Variants {
  return reduceMotion ? reduced : full;
}

/**
 * Pick full vs reduced transition config.
 */
export function selectTransition(
  reduceMotion: boolean | null | undefined,
  full: Transition,
  reduced: Transition = reducedTransition,
): Transition {
  return reduceMotion ? reduced : full;
}

/** Opacity-only enter — safe default when prefers-reduced-motion is set */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.15 },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: atelierEase },
  }),
};

/** Reduced-motion counterpart to fadeUp (no translate) */
export const fadeUpReduced: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.15, delay: Math.min(i * 0.02, 0.08) },
  }),
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const staggerContainerReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: 0 },
  },
};

export const springCard: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 18, delay: i * 0.1 },
  }),
};

export const springCardReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.15 },
  },
};

/**
 * Convenience: fadeUp that already accounts for reduced motion.
 * Prefer this over raw `fadeUp` at call sites that have `useReducedMotion()`.
 */
export function fadeUpMotion(reduceMotion: boolean | null | undefined): Variants {
  return selectVariants(reduceMotion, fadeUp, fadeUpReduced);
}

export function staggerMotion(reduceMotion: boolean | null | undefined): Variants {
  return selectVariants(reduceMotion, staggerContainer, staggerContainerReduced);
}

export function springCardMotion(reduceMotion: boolean | null | undefined): Variants {
  return selectVariants(reduceMotion, springCard, springCardReduced);
}
