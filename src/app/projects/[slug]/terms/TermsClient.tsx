'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from '@/types/project';

const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function TermsClient({ project }: { project: Project }) {
    const content = project.termsContent;

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <main className="pt-24 px-6 pb-16">
                <div className="max-w-[720px] mx-auto">
                    {/* Header */}
                    <motion.nav
                        className="flex items-center gap-2 text-[0.8125rem] text-[var(--text-secondary)] mb-10"
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    >
                        <Link href={`/projects/${project.slug}`} className="hover:text-[var(--text-primary)] transition-colors no-underline">
                            {project.title}
                        </Link>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span className="text-[var(--text-primary)]">Terms of Use</span>
                    </motion.nav>

                    {/* App icon + title */}
                    <motion.div
                        className="flex items-center gap-4 mb-8"
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.1 }}
                    >
                        {project.iconLight && (
                            <Image
                                src={project.iconLight}
                                alt={`${project.title} icon`}
                                width={48}
                                height={48}
                                className="rounded-xl dark:hidden"
                            />
                        )}
                        {project.iconDark && (
                            <Image
                                src={project.iconDark}
                                alt={`${project.title} icon`}
                                width={48}
                                height={48}
                                className="rounded-xl hidden dark:block"
                            />
                        )}
                        <div>
                            <h1 className="text-[2rem] md:text-[2.5rem] font-bold tracking-tight">Terms of Use</h1>
                            <p className="text-[var(--text-secondary)] text-[0.875rem]">Last updated: {content?.lastUpdated ?? 'N/A'}</p>
                        </div>
                    </motion.div>

                    <motion.p
                        className="text-[0.9375rem] text-[var(--text-secondary)] leading-relaxed mb-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {content?.intro}
                    </motion.p>

                    {/* Sections */}
                    <div className="space-y-10">
                        {content?.sections.map((section) => (
                            <motion.section key={section.title} variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ type: 'spring', stiffness: 120, damping: 16 }}>
                                <h2 className="text-[1.25rem] font-semibold mb-3">{section.title}</h2>
                                <p className="text-[0.9375rem] text-[var(--text-secondary)] leading-relaxed">{section.content}</p>
                                {section.list && section.list.length > 0 && (
                                    <ul className="list-disc pl-6 text-[0.9375rem] text-[var(--text-secondary)] space-y-1 mt-3">
                                        {section.list.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                            </motion.section>
                        ))}
                    </div>

                    {/* Link to privacy policy */}
                    {project.links.privacy && (
                        <motion.div
                            className="mt-10 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)]"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-[0.9375rem] text-[var(--text-secondary)]">
                                Please also review our{' '}
                                <Link href={project.links.privacy} className="text-[var(--accent)] hover:underline">Privacy Policy</Link>
                                {' '}to understand how we handle your data.
                            </p>
                        </motion.div>
                    )}

                    <p className="text-[0.8125rem] text-[var(--text-secondary)] mt-12 pt-8 border-t border-[var(--border-color)]">
                        &copy; {new Date().getFullYear()} Mohammad Nabi Rahmani. All rights reserved.
                    </p>
                </div>
            </main>
        </div>
    );
}
