import { getAppCount, getArticleCount } from '@/core/config/proof';
import { siteConfig } from '@/core/config/site';

const proofItems = [
  { value: String(getAppCount()), label: 'Apps shipped' },
  { value: String(getArticleCount()), label: 'Articles written' },
  { value: siteConfig.experienceLabel, label: 'With Flutter' },
];

/**
 * PRESENTATION — home proof stats.
 * Job: render owner-supplied counts from the proof/config seam.
 */
export default function ProofStrip({ className = '' }: { className?: string }) {
  return (
    <dl
      className={['grid max-w-[540px] grid-cols-3 gap-3', className].filter(Boolean).join(' ')}
      aria-label="Quick facts"
    >
      {proofItems.map((item) => (
        <div
          key={item.label}
          className="editorial-card flex flex-col-reverse justify-end px-3 py-4 sm:px-5"
        >
          <dt className="mt-1 text-[0.8125rem] leading-5 text-[var(--text-muted)]">{item.label}</dt>
          <dd className="text-[1.375rem] font-semibold tracking-[-0.03em] sm:text-[1.6rem]">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
