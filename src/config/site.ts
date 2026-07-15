/**
 * Owner-supplied conversion / contact configuration.
 * CTA surfaces read from this seam — never invent metrics or dead primary links.
 */
export const siteConfig = {
  availability: 'Available for freelance & full-time remote',
  contactEmail: 'codewithnabi@gmail.com',
  cvPath: '/Nabi-Rahmani-Flutter-Developer-CV.pdf', // file placed in /public
  cvAvailable: false, // flip to true once the PDF is added
  calendlyUrl: '', // e.g. 'https://cal.com/nabirahmani/15min'; empty hides the CTA
  web3formsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '',
} as const;

/** True when a Web3Forms access key is configured (form may render). */
export function hasWeb3FormsKey(): boolean {
  return siteConfig.web3formsAccessKey.trim().length > 0;
}

/** True when a booking URL is configured. */
export function hasCalendly(): boolean {
  return siteConfig.calendlyUrl.trim().length > 0;
}

/** True when the CV download CTA may render (file intended to exist). */
export function hasCv(): boolean {
  // Read via boolean cast so flipping cvAvailable remains type-safe under `as const`.
  return Boolean(siteConfig.cvAvailable);
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
