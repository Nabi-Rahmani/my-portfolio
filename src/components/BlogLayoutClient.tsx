'use client';

export default function BlogLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[var(--cream)] text-[var(--ink)] min-h-screen">
      {children}
    </div>
  );
}
