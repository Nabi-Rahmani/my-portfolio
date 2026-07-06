import Link from 'next/link';
import Footer from '@/components/Footer';
import { nowData } from '@/data/now';

export default function Now() {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            {/* Hero Section */}
            <section className="hero-grid">
                <div className="relative z-10 pt-28 md:pt-36 pb-16 md:pb-20 px-6">
                    <div className="max-w-[900px] mx-auto text-center">
                        <p className="text-[0.8125rem] font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
                            Now
                        </p>
                        <h1 className="text-[2.25rem] md:text-[3rem] font-bold tracking-tight leading-[1.1] text-[var(--text-primary)] mb-4">
                            What I&apos;m up to
                        </h1>
                        <p className="text-[0.9375rem] text-[var(--accent)] font-medium mb-2">
                            Last updated: {nowData.lastUpdated}
                        </p>
                        <p className="text-[1.0625rem] text-[var(--text-primary)] opacity-[0.75] leading-relaxed max-w-[520px] mx-auto">
                            A snapshot of what I&apos;m focused on right now. See also{' '}
                            <Link href="/uses" className="text-[var(--accent)] hover:underline">
                                what I use
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </section>

            {/* Sections */}
            <section className="py-16 md:py-20 px-6">
                <div className="max-w-[720px] mx-auto flex flex-col gap-8">
                    {nowData.sections.map((section) => (
                        <div
                            key={section.label}
                            className="rounded-2xl border border-[var(--border-color)] p-7"
                        >
                            <h2 className="text-[1.0625rem] font-semibold text-[var(--accent)] mb-4">
                                {section.label}
                            </h2>
                            <ul className="flex flex-col gap-3">
                                {section.items.map((item) => (
                                    <li
                                        key={item}
                                        className="text-[0.9375rem] text-[var(--text-primary)] opacity-[0.8] leading-relaxed"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
