'use client';

export default function BlogLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
            {children}
        </div>
    );
}
