/**
 * Owner-supplied conversion / contact configuration.
 * CTA surfaces read from this seam — never invent metrics or dead primary links.
 */
export const siteConfig = {
  siteUrl: 'https://codewithnabi.dev',
  brandName: 'codewithnabi',
  name: 'Muhammad Nabi Rahmani',
  shortName: 'Nabi Rahmani',
  role: 'Flutter product engineer',
  tagline: 'Dependable Flutter products and practical notes from shipping them.',
  learningEnabled: false,
  experienceLabel: '3+ years',
  location: 'Ankara, Turkey',
  timezone: 'GMT+3',
  availability: 'Available for remote Flutter roles',
  contactEmail: 'codewithnabi@gmail.com',
  portraitPath: '/assets/branding/nabi-night.jpg',
} as const;

export function absoluteUrl(path = '/'): string {
  return new URL(path, siteConfig.siteUrl).toString();
}

/** mailto: href for direct email; optional subject/body for fallbacks. */
export function contactMailto(options?: {
  subject?: string;
  body?: string;
}): string {
  const params = new URLSearchParams();
  if (options?.subject) params.set('subject', options.subject);
  if (options?.body) params.set('body', options.body);
  const query = params.toString();
  return query
    ? `mailto:${siteConfig.contactEmail}?${query}`
    : `mailto:${siteConfig.contactEmail}`;
}
