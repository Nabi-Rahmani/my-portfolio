'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import type { RefObject } from 'react';

import type { ProjectImageMedia } from '@/features/projects/domain/project';

interface ProjectLightboxProps {
  title: string;
  images: ProjectImageMedia[];
  index: number | null;
  reduceMotion: boolean | null;
  lightboxRef: RefObject<HTMLDivElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

/**
 * PRESENTATION — still-image viewer.
 * Job: keyboard-accessible lightbox over project stills.
 */
export function ProjectLightbox({
  title,
  images,
  index,
  reduceMotion,
  lightboxRef,
  closeButtonRef,
  onClose,
  onPrevious,
  onNext,
}: ProjectLightboxProps) {
  const current = index !== null ? images[index] : undefined;

  return (
    <AnimatePresence>
      {current && index !== null && (
        <motion.div
          ref={lightboxRef}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/92 p-5"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} media viewer`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.18 }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close media viewer"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black text-xl text-white"
          >
            ×
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={onPrevious}
                aria-label="Previous image"
                className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black text-white md:left-7"
              >
                ←
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next image"
                className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black text-white md:right-7"
              >
                →
              </button>
            </>
          )}
          <div className="relative aspect-video w-[min(92vw,1100px)] max-h-[85vh]">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="rounded-[1rem] object-contain sm:rounded-[1.5rem]"
              sizes="(max-width: 768px) 92vw, 1100px"
              priority
            />
          </div>
          <span className="absolute bottom-5 font-mono text-xs text-white/70">
            {index + 1} / {images.length}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
