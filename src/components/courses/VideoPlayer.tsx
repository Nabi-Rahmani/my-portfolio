'use client';

import { useState } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  provider?: 'youtube' | 'vimeo';
  title?: string;
}

export function VideoPlayer({ videoUrl, provider = 'youtube', title }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);

  const getEmbedUrl = () => {
    if (provider === 'youtube') {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = videoUrl.match(regExp);
      const videoId = match && match[2].length === 11 ? match[2] : null;

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
      }
      if (videoUrl.includes('youtube.com/embed/')) {
        return videoUrl;
      }
    } else if (provider === 'vimeo') {
      const regExp = /vimeo\.com\/(?:.*#|.*\/videos\/)?([0-9]+)/;
      const match = videoUrl.match(regExp);
      const videoId = match ? match[1] : null;

      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }
    return videoUrl;
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-[var(--line)] bg-black pt-[56.25%]">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--cream-2)]">
          <div
            className="h-10 w-10 animate-spin rounded-full border-[3px] border-[var(--line)] border-t-[var(--atelier-accent)] motion-reduce:animate-none"
            aria-hidden
          />
          <span className="sr-only">Loading video</span>
        </div>
      )}
      <iframe
        src={getEmbedUrl()}
        title={title || 'Video lesson'}
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
