import Image from 'next/image';

import { cn } from '@/lib/utils';

type IconSize = 'sm' | 'lg';

interface ProjectAppIconProps {
  title: string;
  iconLight?: string;
  iconDark?: string;
  /** sm = legal headers (~48px); lg = project hero (~80–96px) */
  size?: IconSize;
  className?: string;
  priority?: boolean;
}

/**
 * App-store style plate for adaptive-icon *foreground* assets.
 * Those PNGs are mostly transparent padding (~15% glyph fill), so raw
 * Image tags look tiny and can fail color-contrast on cream/ink surfaces.
 */
const sizeConfig: Record<
  IconSize,
  { box: string; rounded: string; px: number }
> = {
  sm: { box: 'h-12 w-12', rounded: 'rounded-xl', px: 48 },
  lg: { box: 'h-20 w-20 md:h-24 md:w-24', rounded: 'rounded-2xl', px: 96 },
};

export default function ProjectAppIcon({
  title,
  iconLight,
  iconDark,
  size = 'lg',
  className,
  priority = false,
}: ProjectAppIconProps) {
  const lightSrc = iconLight ?? iconDark;
  const darkSrc = iconDark ?? iconLight;
  if (!lightSrc && !darkSrc) return null;

  const { box, rounded, px } = sizeConfig[size];
  const sameAsset = lightSrc === darkSrc;

  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden border border-[var(--line)] shadow-md',
        // Solid plates so dark/light glyphs always clear WCAG contrast
        // Light: white plate + dark glyph; Dark: deep plate + light/gold glyph
        'bg-white dark:bg-[var(--cream-2)]',
        box,
        rounded,
        className,
      )}
    >
      {lightSrc && (
        <Image
          src={lightSrc}
          alt={`${title} app icon`}
          width={px}
          height={px}
          priority={priority}
          className={cn(
            'absolute inset-0 h-full w-full object-contain',
            // Zoom adaptive-icon safe-zone padding so the mark fills the plate
            'scale-[2.05]',
            sameAsset ? undefined : 'dark:hidden',
          )}
        />
      )}
      {!sameAsset && darkSrc && (
        <Image
          src={darkSrc}
          alt={`${title} app icon`}
          width={px}
          height={px}
          priority={priority}
          className="absolute inset-0 hidden h-full w-full scale-[2.05] object-contain dark:block"
        />
      )}
    </div>
  );
}
