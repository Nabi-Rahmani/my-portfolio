import { getAppCount, getArticleCount } from '@/core/config/proof';
import { siteConfig } from '@/core/config/site';

const proofItems = [
  { value: String(getAppCount()), label: 'Shipped products' },
  { value: String(getArticleCount()), label: 'Technical articles' },
  { value: siteConfig.experienceLabel, label: 'Flutter experience' },
];

/**
 * PRESENTATION — home proof stats.
 * Job: render owner-supplied counts from the proof/config seam.
 */
export default function ProofStrip({ className = '' }: { className?: string }) {
  return (
    <div
      className={['grid grid-cols-3', className].filter(Boolean).join(' ')}
      aria-label="Professional proof"
    >
      {proofItems.map((item, index) => (
        <div
          key={item.label}
          className={[
            'border-r border-[var(--line-16)] px-2 py-4 text-center sm:px-6 sm:py-6',
            index === 0 ? 'pl-0' : '',
            index === proofItems.length - 1 ? 'border-r-0 pr-0' : '',
          ].join(' ')}
        >
          <p className="text-[1.25rem] font-semibold tracking-[-0.04em] sm:text-[1.45rem]">
            {item.value}
          </p>
          <p className="mt-1 text-[0.7rem] leading-4 text-[var(--text-muted)] sm:text-sm sm:leading-5">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
