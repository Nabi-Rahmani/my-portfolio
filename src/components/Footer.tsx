'use client';

import Link from 'next/link';

import { footerNav, socialLinks } from '@/config/navigation';
import { contactMailto, hasCv, siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface FooterProps {
  showSocials?: boolean;
  links?: { label: string; href: string }[];
  className?: string;
}

export default function Footer({ showSocials = true, links, className }: FooterProps) {
  const footerLinks = links ?? footerNav;

  return (
    <footer className={cn('border-t border-[var(--line)] bg-[var(--cream)] px-6 py-14 md:px-12 md:py-20', className)}>
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="editorial-kicker mb-5">Code with Nabi</p>
            <p className="editorial-display max-w-[760px] text-[clamp(2.25rem,5vw,4.75rem)] leading-[0.98] text-[var(--ink)]">
              Building thoughtful mobile experiences with Flutter.
            </p>
          </div>

          <div className="lg:justify-self-end">
            {showSocials && (
              <div className="mb-8 flex flex-wrap gap-x-6 gap-y-3">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-[0.9rem] font-medium text-[var(--ink)] underline decoration-[var(--atelier-accent)] decoration-2 underline-offset-4">
                    {social.label}
                  </a>
                ))}
                <a href={contactMailto()} className="text-[0.9rem] font-medium text-[var(--ink)] underline decoration-[var(--atelier-accent)] decoration-2 underline-offset-4">
                  Email
                </a>
                {hasCv() && (
                  <a href={siteConfig.cvPath} download target="_blank" rel="noopener noreferrer" className="text-[0.9rem] font-medium text-[var(--ink)] underline decoration-[var(--atelier-accent)] decoration-2 underline-offset-4">
                    Resume
                  </a>
                )}
              </div>
            )}

            <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Footer">
              {footerLinks.map((link) => (
                <Link key={`${link.label}-${link.href}`} href={link.href} className="text-[0.75rem] text-[var(--muted)] no-underline transition-colors hover:text-[var(--ink)]">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-[var(--line)] pt-5 text-[0.72rem] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Muhammad Nabi Rahmani</span>
          <span>Flutter engineer · Ankara, Turkey</span>
        </div>
      </div>
    </footer>
  );
}
