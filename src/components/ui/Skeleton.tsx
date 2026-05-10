function Skeleton({ className = '' }: { className?: string }) {
    return (
        <div
            className={`animate-pulse bg-[var(--bg-secondary)] rounded-xl ${className}`}
        />
    );
}

export function SkeletonText({ lines = 2, className = '' }: { lines?: number; className?: string }) {
    return (
        <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
                />
            ))}
        </div>
    );
}

export function SkeletonBlogCard() {
    return (
        <div className="rounded-3xl overflow-hidden border border-[var(--border-color)]">
            <Skeleton className="aspect-[16/9] w-full rounded-none" />
            <div className="p-7 space-y-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-8 w-3/4" />
                <SkeletonText lines={3} />
                <div className="flex items-center gap-2 pt-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
        </div>
    );
}

export function SkeletonProjectCard() {
    return (
        <div className="rounded-3xl overflow-hidden border border-[var(--border-color)]">
            <Skeleton className="aspect-[16/9] w-full rounded-none" />
            <div className="p-7 md:p-10 space-y-4">
                <Skeleton className="h-9 w-2/3" />
                <SkeletonText lines={2} />
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-8 w-20 rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Skeleton;
