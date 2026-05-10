import Image from 'next/image';

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
        <div className={`relative ${aspectClasses[aspectRatio]} overflow-hidden`}>
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                sizes={sizes}
                priority={priority}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
    );
}
