'use client';

import { useState } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  provider?: 'youtube' | 'vimeo';
  title?: string;
}

export function VideoPlayer({ videoUrl, provider = 'youtube', title }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Extract video ID and create embed URL
  const getEmbedUrl = () => {
    if (provider === 'youtube') {
      // Handle different YouTube URL formats
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = videoUrl.match(regExp);
      const videoId = match && match[2].length === 11 ? match[2] : null;

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
      }
      // If already an embed URL, use it directly
      if (videoUrl.includes('youtube.com/embed/')) {
        return videoUrl;
      }
    } else if (provider === 'vimeo') {
      // Handle Vimeo URLs
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
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%', // 16:9 aspect ratio
        backgroundColor: '#000',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid var(--border-color)',
              borderTopColor: 'var(--accent)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
      )}
      <iframe
        src={getEmbedUrl()}
        title={title || 'Video lesson'}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
      />
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
