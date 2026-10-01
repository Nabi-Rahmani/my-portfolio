import type { Transition, Variants } from 'framer-motion';

/** Shared easing for the Terminal motion language. */
export const revealEase = [0.2, 0.6, 0.2, 1] as const;

/** @deprecated Use `revealEase` for new motion. Kept for legacy route imports. */
export const atelierEase = revealEase;
/** @deprecated Use `revealEase` for new motion. Kept for legacy route imports. */
export const atelierEaseSoft = revealEase;

export const revealDistance = 8;
export const revealDuration = 0.18;
export const revealStagger = 0.04;

/** Instant / near-instant transition when motion should be reduced */
export const reducedTransition: Transition = { duration: 0 };

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
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: revealDistance },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: revealDuration, delay: i * revealStagger, ease: revealEase },
  }),
};

/** Reduced-motion counterpart to fadeUp (no translate) */
export const fadeUpReduced: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: revealStagger },
  },
};

export const staggerContainerReduced: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0, delayChildren: 0 },
  },
};

export const springCard: Variants = {
  hidden: { opacity: 0, y: revealDistance },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 18, delay: i * revealStagger },
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
