import { getBlogPostCount } from '@/data/blog';

/** A verified app-store figure. Omit a field until its source has supplied it. */
export interface AppProof {
  installs?: number;
  rating?: number;
  ratingCount?: number;
}

const appProofSlugs = [
  'focus-flow',
  'dev-discipline',
  'mihrab-by-raha',
] as const;

export type AppProofSlug = (typeof appProofSlugs)[number];

interface ProofConfig {
  apps: Record<AppProofSlug, AppProof>;
  /** First calendar year of verified shipped Flutter work. */
  shippingSince?: number;
}

/**
 * Owner-supplied shipping proof.
 *
 * A future build-time Play Console fetch may populate the optional app fields here.
 * Consumers must use the helpers below rather than reading this record directly.
 */
const proofConfig: ProofConfig = {
  apps: {
    'focus-flow': {},
    'dev-discipline': {},
    'mihrab-by-raha': {},
  },
  // Add a verified year once confirmed by the owner; do not infer it from a design.
  shippingSince: undefined,
};

/**
 * Rendering contract: omit a stat cell when its helper returns `undefined`.
 * Never render `—`, `0`, `N/A`, or a placeholder figure in its place.
 */

/** Returns proof for a listed app, or `undefined` when the slug is not an app. */
export function getAppProof(slug: string): Readonly<AppProof> | undefined {
  if (!appProofSlugs.includes(slug as AppProofSlug)) return undefined;

  return proofConfig.apps[slug as AppProofSlug];
}

function getCompleteAppMetric(metric: keyof AppProof): number[] | undefined {
  const values: number[] = [];

  for (const slug of appProofSlugs) {
    const value = proofConfig.apps[slug][metric];
    if (value === undefined || !Number.isFinite(value)) return undefined;
    values.push(value);
  }

  return values;
}

/** Total installs only when every listed app has a verified install count. */
export function getTotalInstalls(): number | undefined {
  const installs = getCompleteAppMetric('installs');
  return installs?.reduce((total, value) => total + value, 0);
}

/** Average Play rating only when every listed app has a verified rating. */
export function getAverageRating(): number | undefined {
  const ratings = getCompleteAppMetric('rating');
  if (!ratings) return undefined;

  return ratings.reduce((total, value) => total + value, 0) / ratings.length;
}

/** Total rating count only when every listed app has a verified rating count. */
export function getTotalRatings(): number | undefined {
  const ratings = getCompleteAppMetric('ratingCount');
  return ratings?.reduce((total, value) => total + value, 0);
}

/** Current article count, derived from the static blog data source. */
export function getArticleCount(): number {
  return getBlogPostCount();
}

/** Years since the owner-confirmed first shipping year. */
export function getYearsShipping(): number | undefined {
  if (proofConfig.shippingSince === undefined) return undefined;

  return new Date().getFullYear() - proofConfig.shippingSince;
}

/** Number of apps represented by this proof seam. */
export function getAppCount(): number {
  return appProofSlugs.length;
}
