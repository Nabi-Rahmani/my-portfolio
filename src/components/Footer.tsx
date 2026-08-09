import Link from 'next/link';

import { footerNav, socialLinks } from '@/config/navigation';
import { contactMailto, siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface FooterProps {
  showSocials?: boolean;
  links?: { label: string; href: string }[];
  className?: string;
}

/** Compact monochrome marks — fill, 24×24 viewBox. */
const ICONS = {
  mail: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  rss: 'M5 3a1 1 0 0 0 0 2c7.18 0 13 5.82 13 13a1 1 0 1 0 2 0C20 9.716 13.284 3 5 3ZM5 8a1 1 0 0 0 0 2 8 8 0 0 1 8 8 1 1 0 1 0 2 0A10 10 0 0 0 5 8Zm1 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z',
} as const;

function SocialIconButton({
  label,
  href,
  path,
  internal = false,
}: {
  label: string;
  href: string;
  path: string;
  /** Site-relative path (e.g. /feed.xml) — uses Next Link. */
  internal?: boolean;
}) {
  const className = cn(
    'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
    'border border-[var(--line-24)] bg-[var(--surface-bg)] text-[var(--text-strong)]',
    'transition-[border-color,background-color,color] duration-150',
    'hover:border-[var(--text-strong)] hover:bg-[var(--text-strong)] hover:text-[var(--page-bg)]',
    'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
    'motion-reduce:transition-none',
  );

  const icon = (
    <svg
      viewBox="0 0 24 24"
      className="h-[17px] w-[17px]"
      fill="currentColor"
      aria-hidden
    >
      <path d={path} />
    </svg>
  );

  if (internal) {
    return (
      <Link href={href} aria-label={label} title={label} className={className}>
        {icon}
      </Link>
    );
  }

  const isMailto = href.startsWith('mailto:');

  return (
    <a
      href={href}
      {...(!isMailto
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      aria-label={label}
      title={label}
      className={className}
    >
      {icon}
    </a>
  );
}

export default function Footer({
  showSocials = true,
  links,
  className,
}: FooterProps) {
  const navigation = links ?? footerNav;
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'border-t border-[var(--line-16)] bg-[var(--footer-bg)]',
        className,
      )}
    >
      <div className="site-container py-10 sm:py-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-16">
          <div>
            <p className="text-[1.1rem] font-semibold tracking-[-0.055em] text-[var(--text-strong)]">
              codewith<span className="font-extrabold">nabi</span>
            </p>
            <p className="mt-3 max-w-[42ch] text-sm leading-6 text-[var(--text-muted)]">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--text-faint)]">
              {siteConfig.role}
              <span className="mx-2 text-[var(--line-30)]" aria-hidden>
                ·
              </span>
              {siteConfig.location}
            </p>
          </div>

          <nav aria-label="Footer" className="lg:justify-self-end">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--text-faint)]">
              Navigate
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-0.5 sm:grid-cols-3 sm:gap-x-10 lg:min-w-[280px] lg:grid-cols-2 xl:grid-cols-3">
              {navigation.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--text-muted)] no-underline transition-colors hover:text-[var(--text-strong)] sm:min-h-10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-7 border-t border-[var(--line-16)] pt-8 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          {showSocials ? (
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                Connect
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <SocialIconButton
                  label={`Email ${siteConfig.name}`}
                  href={contactMailto({ subject: 'Flutter role inquiry' })}
                  path={ICONS.mail}
                />
                {socialLinks.map((item) => (
                  <SocialIconButton
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    path={item.icon}
                  />
                ))}
                <SocialIconButton
                  label="RSS feed"
                  href="/feed.xml"
                  path={ICONS.rss}
                  internal
                />
              </div>
            </div>
          ) : (
            <div />
          )}

          <div className="flex flex-col gap-1 sm:items-end sm:text-right">
            <p className="text-sm text-[var(--text-muted)]">
              © {year} {siteConfig.shortName}
            </p>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-[var(--text-faint)]">
              Flutter products · shipped with care
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
