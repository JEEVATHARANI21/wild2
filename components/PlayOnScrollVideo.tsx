"use client";

import { useRef, useEffect } from "react";

interface PlayOnScrollVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function PlayOnScrollVideo({
  src,
  poster,
  className = "w-full h-full object-cover",
}: PlayOnScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: [0.5],
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="metadata"
      className={className}
    />
  );
}
