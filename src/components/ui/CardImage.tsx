import Image from 'next/image';

import { cn } from '@/lib/utils';

interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: '16/9' | '16/10';
  sizes?: string;
  priority?: boolean;
}

const aspectClasses: Record<string, string> = {
  '16/9': 'aspect-[16/9]',
  '16/10': 'aspect-[16/10]',
};

export default function CardImage({
  src,
  alt,
  aspectRatio = '16/9',
  sizes = '(max-width: 768px) 100vw, 1000px',
  priority = false,
}: CardImageProps) {
  return (
    <div className={cn('relative overflow-hidden', aspectClasses[aspectRatio])}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover motion-safe:group-hover:scale-[1.04] motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out"
        sizes={sizes}
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/30 via-transparent to-transparent" />
    </div>
  );
}
