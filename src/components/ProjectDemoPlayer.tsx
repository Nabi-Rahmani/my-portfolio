'use client';

import { useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { ProjectVideoMedia } from '@/types/project';

type NetworkConnection = {
  saveData?: boolean;
};

function readSaveDataPreference(): boolean {
  if (typeof navigator === 'undefined') return false;
  const connection = (
    navigator as Navigator & {
      connection?: NetworkConnection;
      mozConnection?: NetworkConnection;
      webkitConnection?: NetworkConnection;
    }
  ).connection ??
    (navigator as Navigator & { mozConnection?: NetworkConnection }).mozConnection ??
    (navigator as Navigator & { webkitConnection?: NetworkConnection }).webkitConnection;
  return Boolean(connection?.saveData);
}

/**
 * Accessible project demo: muted/inline MP4 with explicit play/pause,
 * in-view autoplay when preferences allow, reduced-motion and data-saver
 * poster-first behavior, and a graceful failure fallback.
 */
export default function ProjectDemoPlayer({
  demo,
}: {
  demo: ProjectVideoMedia;
}) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [saveData, setSaveData] = useState(false);
  /** Once the visitor pauses, do not auto-resume on scroll. */
  const [userPaused, setUserPaused] = useState(false);
  /** Visitor explicitly started playback (overrides reduced-motion / data-saver hold). */
  const [userStarted, setUserStarted] = useState(false);

  const prefersManualOnly = Boolean(reduceMotion) || saveData;
  const allowAutoplay = !prefersManualOnly && !userPaused && !hasFailed;
  const allowLoop = !reduceMotion;

  useEffect(() => {
    setSaveData(readSaveDataPreference());
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.35);
      },
      { threshold: [0, 0.35, 0.6, 1] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const syncPlayingState = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setIsPlaying(!video.paused && !video.ended);
  }, []);

  const pauseOwnedPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setIsPlaying(false);
  }, []);

  // Pause when leaving the viewport; autoplay when entering if allowed.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasFailed) return;

    if (!isInView) {
      pauseOwnedPlayback();
      return;
    }

    if (allowAutoplay) {
      video.loop = allowLoop;
      const playAttempt = video.play();
      if (playAttempt !== undefined) {
        playAttempt.catch(() => {
          // Browser blocked autoplay — leave poster/manual control available.
          setIsPlaying(false);
        });
      }
    }
  }, [allowAutoplay, allowLoop, hasFailed, isInView, pauseOwnedPlayback]);

  // Keep loop attribute in sync when reduced-motion changes mid-session.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.loop = allowLoop;
  }, [allowLoop]);

  // Always stop owned playback on unmount (no setState after teardown).
  useEffect(() => {
    const video = videoRef.current;
    return () => {
      video?.pause();
    };
  }, []);

  const handleToggle = useCallback(async () => {
    const video = videoRef.current;
    if (!video || hasFailed) return;

    if (!video.paused && !video.ended) {
      video.pause();
      setUserPaused(true);
      setIsPlaying(false);
      return;
    }

    setUserPaused(false);
    setUserStarted(true);
    video.loop = allowLoop;
    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      setHasFailed(true);
      setIsPlaying(false);
    }
  }, [allowLoop, hasFailed]);

  const handleError = useCallback(() => {
    setHasFailed(true);
    setIsPlaying(false);
    pauseOwnedPlayback();
  }, [pauseOwnedPlayback]);

  const showPosterOverlay =
    hasFailed || (!isPlaying && (prefersManualOnly ? !userStarted : true));

  return (
    <div
      ref={containerRef}
      className="relative aspect-video overflow-hidden rounded-[18px] border border-[var(--line-16)] bg-[var(--surface-bg)] sm:rounded-[22px]"
    >
      {!hasFailed && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={demo.src}
          poster={demo.poster}
          muted
          playsInline
          preload="metadata"
          loop={allowLoop}
          aria-label={demo.label}
          onPlay={syncPlayingState}
          onPause={syncPlayingState}
          onEnded={() => setIsPlaying(false)}
          onError={handleError}
        />
      )}

      {/* Poster remains available when video fails or is held for preferences. */}
      {(hasFailed || showPosterOverlay) && (
        <Image
          src={demo.poster}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px"
          aria-hidden
        />
      )}

      {hasFailed ? (
        <div
          className="absolute inset-x-0 bottom-0 bg-black/70 px-4 py-3"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-medium text-white">Demo unavailable</p>
          <p className="mt-0.5 text-xs text-white/75">
            Product stills below still show the current experience.
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleToggle}
          aria-label={isPlaying ? `Pause ${demo.label}` : `Play ${demo.label}`}
          aria-pressed={isPlaying}
          className="absolute bottom-3 left-3 z-10 flex h-11 items-center gap-2 rounded-full border border-white/35 bg-black/75 px-4 text-sm font-semibold text-white transition-colors hover:bg-black/90 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] motion-reduce:transition-none"
        >
          <span aria-hidden className="inline-flex h-4 w-4 items-center justify-center">
            {isPlaying ? (
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden>
                <rect x="3" y="2" width="3.5" height="12" rx="0.5" />
                <rect x="9.5" y="2" width="3.5" height="12" rx="0.5" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden>
                <path d="M4 2.5v11l9-5.5-9-5.5z" />
              </svg>
            )}
          </span>
          {isPlaying ? 'Pause' : 'Play demo'}
        </button>
      )}
    </div>
  );
}
