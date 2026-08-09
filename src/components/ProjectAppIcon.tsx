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
  const src = iconLight ?? iconDark;
  if (!src) return null;

  const { box, rounded, px } = sizeConfig[size];

  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden',
        box,
        rounded,
        className,
      )}
    >
      <Image
        src={src}
        alt={`${title} app icon`}
        width={px}
        height={px}
        priority={priority}
        className="absolute inset-0 h-full w-full object-contain"
      />
    </div>
  );
}
