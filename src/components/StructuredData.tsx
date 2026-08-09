import { socialLinks } from '@/config/navigation';
import { absoluteUrl, siteConfig } from '@/config/site';

export default function StructuredData() {
  const personData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    alternateName: 'codewithnabi',
    url: siteConfig.siteUrl,
    image: absoluteUrl(siteConfig.portraitPath),
    jobTitle: siteConfig.role,
    description: siteConfig.tagline,
    email: siteConfig.contactEmail,
    sameAs: socialLinks.map((link) => link.href),
    knowsAbout: [
      'Flutter',
      'Dart',
      'Riverpod',
      'Offline-first mobile applications',
      'Mobile application delivery',
    ],
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'codewithnabi',
    url: siteConfig.siteUrl,
    description: siteConfig.tagline,
    author: { '@type': 'Person', name: siteConfig.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }} />
    </>
  );
}
