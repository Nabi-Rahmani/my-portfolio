'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const current = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Skip on touch-only devices
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (shouldReduceMotion) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      const LERP = 0.08;
      current.current.x += (mouse.current.x - current.current.x) * LERP;
      current.current.y += (mouse.current.y - current.current.y) * LERP;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '-200px',
          left: '-200px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, oklch(0.58 0.12 40 / 0.12) 0%, transparent 70%)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
