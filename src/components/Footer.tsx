import Link from 'next/link';

import { footerNav, socialLinks } from '@/config/navigation';
import { contactMailto, siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface FooterProps {
  showSocials?: boolean;
  links?: { label: string; href: string }[];
  className?: string;
}

export default function Footer({
  showSocials = true,
  links,
  className,
}: FooterProps) {
  const navigation = links ?? footerNav;

  return (
    <footer
      className={cn(
        'border-t border-[var(--line-16)] bg-[var(--footer-bg)]',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div>
            <p className="text-[1.08rem] font-semibold tracking-[-0.055em] text-[var(--text-strong)]">
              codewith<span className="font-extrabold">nabi</span>
            </p>
            <p className="mt-2 max-w-[38ch] text-sm leading-6 text-[var(--text-muted)]">
              {siteConfig.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-1 lg:justify-end">
            {navigation.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="inline-flex min-h-11 items-center text-sm text-[var(--text-muted)] no-underline transition-colors hover:text-[var(--text-strong)] sm:min-h-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-[var(--line-16)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a
              href={contactMailto({ subject: 'Flutter role inquiry' })}
              aria-label={`Email ${siteConfig.name} at ${siteConfig.contactEmail}`}
              className="inline-flex min-h-11 items-center text-xs text-[var(--text-muted)] no-underline transition-colors hover:text-[var(--text-strong)] sm:min-h-0"
            >
              Email
            </a>
            {showSocials &&
              socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-xs text-[var(--text-muted)] no-underline transition-colors hover:text-[var(--text-strong)] sm:min-h-0"
                >
                  {item.label} ↗
                </a>
              ))}
            <Link
              href="/feed.xml"
              className="inline-flex min-h-11 items-center text-xs text-[var(--text-muted)] no-underline transition-colors hover:text-[var(--text-strong)] sm:min-h-0"
            >
              RSS ↗
            </Link>
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-faint)]">
            © {new Date().getFullYear()} {siteConfig.shortName} · {siteConfig.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
