'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: {
      scrollTo: (target: HTMLElement | string, options?: { offset?: number; immediate?: boolean }) => void;
    };
  }
}

export default function LenisScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1.2,
    });

    window.__lenis = lenis;

    let frameId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    const handleInitialHash = () => {
      const hash = window.location.hash;
      if (!hash || !hash.startsWith('#')) return;
      const target = document.querySelector(hash) as HTMLElement | null;
      if (!target) return;
      lenis.scrollTo(target, { immediate: true, offset: -80 });
    };

    handleInitialHash();

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      if (window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, []);

  return null;
}

