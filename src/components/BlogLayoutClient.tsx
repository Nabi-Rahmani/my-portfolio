'use client';

import { useState, useEffect } from 'react';
import Navigation from "@/components/Navigation";

export default function BlogLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkScreenSize = () => {
                setIsMobile(window.innerWidth <= 768);
            };

            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);

            return () => window.removeEventListener('resize', checkScreenSize);
        }
    }, []);

    return (
        <div style={{
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            minHeight: '100vh',
            transition: 'all 0.3s ease',
            paddingBottom: isMobile ? '50px' : '0'
        }}>
            <Navigation />
            {children}
        </div>
    );
}