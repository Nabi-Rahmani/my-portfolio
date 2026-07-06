import Link from 'next/link';
import Footer from '@/components/Footer';
import { usesCategories } from '@/data/uses';

export default function Uses() {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            {/* Hero Section */}
            <section className="hero-grid">
                <div className="relative z-10 pt-28 md:pt-36 pb-16 md:pb-20 px-6">
                    <div className="max-w-[900px] mx-auto text-center">
                        <p className="text-[0.8125rem] font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
                            Uses
                        </p>
                        <h1 className="text-[2.25rem] md:text-[3rem] font-bold tracking-tight leading-[1.1] text-[var(--text-primary)] mb-4">
                            What I build with
                        </h1>
                        <p className="text-[1.0625rem] md:text-[1.125rem] text-[var(--text-primary)] opacity-[0.75] leading-relaxed max-w-[520px] mx-auto">
                            Hardware, tools, and services behind the apps and this site. See also{' '}
                            <Link href="/now" className="text-[var(--accent)] hover:underline">
                                what I&apos;m doing now
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 md:py-20 px-6">
                <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
                    {usesCategories.map((category) => (
                        <div
                            key={category.label}
                            className="rounded-2xl border border-[var(--border-color)] p-6 transition-all duration-300 hover:border-[var(--accent)]/20"
                        >
                            <h2 className="text-[0.9375rem] font-semibold text-[var(--text-primary)] mb-4">
                                {category.label}
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {category.items.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1.5 bg-[var(--accent-muted)] text-[var(--text-secondary)] rounded-lg text-[0.8125rem] font-medium"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
