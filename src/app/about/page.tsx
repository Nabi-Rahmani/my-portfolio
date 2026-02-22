'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function About() {
    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-16 md:pb-0">
            <main className="pt-24 px-6 pb-16">
                <div className="max-w-[800px] mx-auto">
                    {/* Photo */}
                    <div className="flex justify-center mb-10">
                        <div className="relative w-[160px] h-[160px] rounded-2xl overflow-hidden border border-[var(--border-color)]">
                            <Image
                                src="/assets/images/myimage.JPG"
                                alt="Nabi Rahmani - Flutter Developer"
                                fill
                                className="object-cover"
                                sizes="160px"
                                priority
                            />
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-[2rem] md:text-[2.5rem] font-bold text-[var(--text-primary)] mb-2 tracking-tight">
                            About Me
                        </h1>
                        <p className="text-[1rem] text-[var(--text-secondary)]">
                            Flutter Developer &amp; Mobile App Enthusiast
                        </p>
                    </div>

                    {/* Bio */}
                    <div className="mb-12 text-[1rem] text-[var(--text-secondary)] leading-relaxed space-y-4">
                        <p>
                            I&apos;m Nabi Rahmani, a Flutter developer from Mazar-i-Sharif, Afghanistan, now based in
                            Ankara, Turkey. I specialize in building and shipping mobile apps fast — from idea to
                            the App Store and Google Play — with Flutter and Dart.
                        </p>
                        <p>
                            I focus on clean architecture, offline-first reliability, and polished UI.
                            I build with Riverpod, Drift, and Supabase to create apps that work seamlessly
                            online or off, with maintainable codebases that scale.
                        </p>
                    </div>

                    {/* Skills */}
                    <div className="mb-12">
                        <h2 className="text-[1.25rem] font-semibold text-[var(--text-primary)] mb-6">
                            Skills &amp; Technologies
                        </h2>
                        <div className="space-y-5">
                            {[
                                { label: 'Mobile', skills: ['Flutter', 'Dart', 'Riverpod', 'Drift', 'Hive', 'Firebase'] },
                                { label: 'Backend', skills: ['Supabase', 'PostgreSQL', 'Edge Functions', 'REST APIs'] },
                                { label: 'Web', skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
                                { label: 'Architecture', skills: ['Clean Architecture', 'Offline-First', 'State Management'] },
                                { label: 'DevOps & Tools', skills: ['Git', 'GitHub Actions', 'CI/CD', 'Figma', 'VS Code'] },
                                { label: 'Quality', skills: ['Unit Testing', 'Widget Testing', 'Golden Tests', 'Performance Profiling'] },
                            ].map(group => (
                                <div key={group.label}>
                                    <p className="text-[0.8125rem] font-medium text-[var(--text-secondary)] mb-2">
                                        {group.label}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {group.skills.map(skill => (
                                            <span key={skill} className="px-3 py-1.5 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-full text-[0.8125rem] border border-[var(--border-color)]">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="mb-12">
                        <h2 className="text-[1.25rem] font-semibold text-[var(--text-primary)] mb-4">
                            Experience
                        </h2>
                        <div className="space-y-4">
                            <div className="p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
                                <h3 className="text-[1.0625rem] font-semibold text-[var(--text-primary)] mb-1">
                                    Flutter Developer
                                </h3>
                                <p className="text-[0.8125rem] text-[var(--accent)] font-medium mb-3">
                                    Freelance &amp; Published Apps
                                </p>
                                <p className="text-[0.875rem] text-[var(--text-secondary)] leading-relaxed">
                                    Built and published Focus Flow (iOS) and Dev Discipline (Android).
                                    Clean Architecture with Riverpod state management, offline-first data sync
                                    via Drift and Supabase, and RevenueCat monetization integration.
                                </p>
                            </div>
                            <div className="p-6 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
                                <h3 className="text-[1.0625rem] font-semibold text-[var(--text-primary)] mb-1">
                                    Full-Stack Web Developer
                                </h3>
                                <p className="text-[0.8125rem] text-[var(--accent)] font-medium mb-3">
                                    Portfolio &amp; Course Platform
                                </p>
                                <p className="text-[0.875rem] text-[var(--text-secondary)] leading-relaxed">
                                    Built this portfolio site with Next.js 15, React 19, TypeScript, and Tailwind CSS.
                                    Includes a blog, course platform with video lessons, and project showcases.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Back link */}
                    <div className="text-center">
                        <Link
                            href="/"
                            className="text-[0.875rem] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors no-underline inline-flex items-center gap-1"
                        >
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 12H5m7 7l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            Back to home
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="px-6 py-8 border-t border-[var(--border-color)]">
                <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-[0.8125rem] text-[var(--text-secondary)]">
                        &copy; 2025 Mohammad Nabi Rahmani
                    </span>
                    <span className="text-[0.8125rem] text-[var(--text-secondary)]">
                        Built with Next.js &amp; Tailwind
                    </span>
                </div>
            </footer>
        </div>
    );
}
