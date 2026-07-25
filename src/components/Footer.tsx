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
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr] lg:px-10 lg:py-16">
        <div>
          <p className="text-[1.15rem] font-semibold tracking-[-0.025em] text-[var(--text-strong)]">
            {siteConfig.name}
          </p>
          <p className="mt-2 max-w-[34ch] text-sm leading-6 text-[var(--text-muted)]">
            {siteConfig.role} building dependable, offline-first mobile products from
            architecture to release.
          </p>
          <div className="mt-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.11em] text-[var(--text-faint)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-ok)]" aria-hidden />
            {siteConfig.availability}
          </div>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
            {navigation.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="text-sm text-[var(--text-muted)] no-underline transition-colors hover:text-[var(--text-strong)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">Connect</p>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href={contactMailto({ subject: 'Flutter role inquiry' })}
              className="text-sm text-[var(--text-muted)] no-underline transition-colors hover:text-[var(--text-strong)]"
            >
              {siteConfig.contactEmail}
            </a>
            {showSocials &&
              socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-muted)] no-underline transition-colors hover:text-[var(--text-strong)]"
                >
                  {item.label} ↗
                </a>
              ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--line-16)]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-2 px-5 py-5 font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-faint)] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <span>© {new Date().getFullYear()} {siteConfig.shortName}</span>
          <span>{siteConfig.location} · {siteConfig.timezone}</span>
        </div>
      </div>
    </footer>
  );
}
