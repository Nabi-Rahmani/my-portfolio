'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center px-6">
            <div className="text-center max-w-[480px]">
                <span className="text-[4rem] md:text-[5rem] font-bold text-[var(--accent)] leading-none block mb-4">
                    Oops
                </span>

                <h1 className="text-[1.5rem] md:text-[2rem] font-bold tracking-tight mb-3">
                    Something went wrong
                </h1>

                <p className="text-[0.9375rem] md:text-[1rem] text-[var(--text-secondary)] leading-relaxed mb-8">
                    An unexpected error occurred. Please try again.
                </p>

                <button
                    onClick={() => reset()}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-full text-[0.9375rem] font-semibold cursor-pointer border-none"
                >
                    Try again
                </button>
            </div>
        </main>
    );
}
