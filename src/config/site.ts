export const siteConfig = {
  availability: 'Available for freelance & full-time remote',
  cvPath: '/Nabi-Rahmani-Flutter-Developer-CV.pdf', // file placed in /public
  cvAvailable: false, // flip to true once the PDF is added
  calendlyUrl: '', // e.g. 'https://cal.com/nabirahmani/15min'; empty hides the CTA
  web3formsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '',
} as const;
