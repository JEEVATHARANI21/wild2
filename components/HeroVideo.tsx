"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowRight, ChevronDown, Volume2, VolumeX, MousePointer, RotateCcw } from "lucide-react";

interface HeroVideoProps {
  src?: string;
  poster?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryCtaClick?: () => void;
}

export default function HeroVideo({
  src = "/videos/home-hero.mp4",
  poster = "/images/home-hero-poster.jpg",
  title = "Bespoke Photographic\nExpeditions",
  eyebrow = "THE PINNACLE OF WILDLIFE PHOTOGRAPHY",
  description = "Masterclass field tracking, intimate vehicular limits (max 4 per Gypsy), and deep animal behavior anticipation with expedition mentors across India & Africa’s wildest national parks.",
  primaryCtaText = "TALK TO EXPERT",
  secondaryCtaText = "EXPLORE TOURS",
  onPrimaryCtaClick,
}: HeroVideoProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const hasStartedRef = useRef(false);
  const isPlayingRef = useRef(false);
  const isLockedRef = useRef(false);
  const isCompletedRef = useRef(false);
  const hasCompletedOnceRef = useRef(false);

  hasStartedRef.current = hasStarted;
  isPlayingRef.current = isPlaying;
  isLockedRef.current = isLocked;
  isCompletedRef.current = isCompleted;

  // Split title lines
  const titleLines = title.split("\n");
  const line1 = titleLines[0] || title;
  const line2 = titleLines[1] || "";

  // Helper: Lock / Unlock page scrolling
  const setScrollLock = useCallback((locked: boolean) => {
    setIsLocked(locked);
    isLockedRef.current = locked;

    if (typeof window !== "undefined") {
      if (locked) {
        (window as any).__lenis?.stop();
      } else {
        (window as any).__lenis?.start();
      }
    }
  }, []);

  // Helper: Smooth transition to the 2nd section (#founders)
  const scrollToFounders = useCallback(() => {
    setScrollLock(false);
    setIsCompleted(true);
    isCompletedRef.current = true;
    hasCompletedOnceRef.current = true;

    const foundersEl = document.getElementById("founders");
    if (foundersEl) {
      foundersEl.scrollIntoView({ behavior: "smooth" });
    }
  }, [setScrollLock]);

  // Helper: Complete the video and unlock the page
  const handleVideoCompletion = useCallback(() => {
    if (isCompletedRef.current) return;

    setIsCompleted(true);
    isCompletedRef.current = true;
    hasCompletedOnceRef.current = true;
    setIsPlaying(false);
    isPlayingRef.current = false;
    setProgress(1);

    // 6. Unlock scrolling after completion
    setScrollLock(false);

    // Smoothly scroll down to the second section (#founders)
    setTimeout(() => {
      scrollToFounders();
    }, 400);
  }, [setScrollLock, scrollToFounders]);

  // Helper: Begin playing the video on scroll
  const startVideoPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!hasStartedRef.current) {
      setHasStarted(true);
      hasStartedRef.current = true;
    }

    // 3 & 5. Keep sticky & prevent scrolling to next section while video plays
    if (!isCompletedRef.current) {
      setScrollLock(true);
    }

    video.muted = isMuted;
    video
      .play()
      .then(() => {
        setIsPlaying(true);
        isPlayingRef.current = true;
      })
      .catch(() => {
        video.muted = true;
        video
          .play()
          .then(() => {
            setIsPlaying(true);
            isPlayingRef.current = true;
          })
          .catch(() => {});
      });
  }, [isMuted, setScrollLock]);

  // 1. Initial State: Disable autoplay on page load.
  // Video remains paused at frame 0 until the user starts scrolling.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.pause();

    const primeFrame = () => {
      if (video.readyState >= 2 && video.currentTime === 0) {
        video.currentTime = 0.01;
      }
    };

    video.addEventListener("loadedmetadata", primeFrame);
    video.addEventListener("loadeddata", primeFrame);
    if (video.readyState >= 2) primeFrame();

    // 4. Play video until completion without interruption
    const onTimeUpdate = () => {
      if (!video || !video.duration || isNaN(video.duration)) return;
      const cur = Math.min(video.currentTime / video.duration, 1);
      setProgress(cur);

      if (cur >= 0.97 && !isCompletedRef.current) {
        handleVideoCompletion();
      }
    };

    const onEnded = () => {
      handleVideoCompletion();
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("loadedmetadata", primeFrame);
      video.removeEventListener("loadeddata", primeFrame);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [handleVideoCompletion]);

  // 2, 3, 5, 7. Scroll Detection & Viewport Lock Engine:
  // - On initial scroll, triggers video playback and locks sticky section in view.
  // - While video is playing, prevents next section from appearing.
  // - After completion or on reverse scrolling, handles state smoothly.
  useEffect(() => {
    // Wheel event handler
    const onWheel = (e: WheelEvent) => {
      // If user has already navigated down the page, allow normal scrolling
      if (window.scrollY > 25) return;

      // 7. Handle reverse scrolling: If already completed once, allow free scrolling
      if (hasCompletedOnceRef.current) return;

      // 2. When user starts scrolling, begin playing video automatically
      if (!hasStartedRef.current && !isCompletedRef.current) {
        e.preventDefault();
        e.stopPropagation();
        startVideoPlayback();
        return;
      }

      // 5. Prevent scrolling to next section while video is playing
      if (isLockedRef.current || (isPlayingRef.current && !isCompletedRef.current)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Mobile touch handler
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (window.scrollY > 25) return;
      if (hasCompletedOnceRef.current) return;

      if (!hasStartedRef.current && !isCompletedRef.current) {
        const deltaY = touchStartY - e.touches[0].clientY;
        if (Math.abs(deltaY) > 5) {
          e.preventDefault();
          e.stopPropagation();
          startVideoPlayback();
          return;
        }
      }

      if (isLockedRef.current || (isPlayingRef.current && !isCompletedRef.current)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Keyboard handler (ArrowDown, PageDown, Space)
    const onKeyDown = (e: KeyboardEvent) => {
      if (window.scrollY > 25) return;
      if (hasCompletedOnceRef.current) return;

      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        if (!hasStartedRef.current && !isCompletedRef.current) {
          e.preventDefault();
          startVideoPlayback();
          return;
        }

        if (isLockedRef.current || (isPlayingRef.current && !isCompletedRef.current)) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    window.addEventListener("keydown", onKeyDown, { capture: true });

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
      window.removeEventListener("keydown", onKeyDown, { capture: true });
    };
  }, [startVideoPlayback]);

  // Sound toggle
  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  // Replay Video from start
  const replayVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    window.scrollTo({ top: 0, behavior: "smooth" });
    video.currentTime = 0;
    setProgress(0);
    setIsCompleted(false);
    isCompletedRef.current = false;
    hasCompletedOnceRef.current = false;

    setScrollLock(true);
    video
      .play()
      .then(() => {
        setIsPlaying(true);
        isPlayingRef.current = true;
        setHasStarted(true);
        hasStartedRef.current = true;
      })
      .catch(() => {});
  }, [setScrollLock]);

  const progressPercent = Math.round(progress * 100);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[620px] overflow-hidden select-none bg-[#060806] flex items-center"
    >
      {/* FULLSCREEN ROYAL BENGAL TIGER VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          muted={isMuted}
          playsInline
          preload="auto"
          poster={poster}
          className="w-full h-full object-cover object-[center_35%] md:object-[62%_35%] brightness-[0.96] contrast-[1.04]"
        >
          <source src="/videos/home-hero.mp4" type="video/mp4" />
          <source src="/videos/IMG_8206.MOV" type="video/quicktime" />
          <img
            src={poster}
            alt="Wild Bengal Tiger — VM Wild Expeditions"
            className="w-full h-full object-cover object-[center_35%] md:object-[62%_35%]"
          />
        </video>

        {/* CINEMATIC CONTRAST GRADIENTS: Left vignette ensures crisp text legibility while keeping the tiger completely bright */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060806]/90 via-[#060806]/55 via-35% md:via-[#060806]/40 to-transparent pointer-events-none" />

        {/* Top & Bottom blends for seamless navbar and section integration */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#060806]/85 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#060806] to-transparent pointer-events-none" />
      </div>

      {/* TOP-RIGHT CONTROLS: Scroll Status Guidance & Sound Toggle */}
      <div className="absolute top-20 sm:top-24 right-5 sm:right-10 md:right-14 z-20 flex items-center gap-2.5 pointer-events-auto">
        {/* Scroll to Play Guidance Badge */}
        {!hasStarted && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#D6A85C]/40 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] text-[#D6A85C] shadow-lg animate-pulse">
            <MousePointer className="w-3 h-3 text-[#D6A85C]" />
            <span>SCROLL TO PLAY VIDEO</span>
          </div>
        )}

        {/* Sound Toggle */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
          className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#D6A85C] border border-white/20 hover:border-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {/* Replay Button (Available after video has played) */}
        {hasStarted && (
          <button
            type="button"
            onClick={replayVideo}
            aria-label="Replay Video from Start"
            className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#D6A85C] border border-white/20 hover:border-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg"
            title="Replay Video from Start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* HERO CONTENT: Left-Aligned Column That Doesn't Obscure the Tiger */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-24 pb-14 flex flex-col justify-center pointer-events-none">
        <div className="max-w-xl text-left pointer-events-auto">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.24em] text-[#D6A85C] font-semibold py-1.5 px-3.5 rounded-full border border-[#D6A85C]/40 bg-[#080a08]/85 backdrop-blur-md shadow-md mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85C]" />
            <span>{eyebrow}</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-light leading-[1.06] tracking-tight text-[#F2F0E8] drop-shadow-2xl mb-3 sm:mb-5">
            <span className="block">{line1}</span>
            {line2 && (
              <span className="block text-[#D6A85C] font-normal italic mt-1">
                {line2}
              </span>
            )}
          </h1>

          {/* Supporting Description */}
          <p className="text-xs sm:text-sm md:text-base text-[#F2F0E8]/90 font-light leading-relaxed max-w-lg font-sans drop-shadow-md mb-6 sm:mb-8">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setScrollLock(false);
                setIsCompleted(true);
                isCompletedRef.current = true;
                hasCompletedOnceRef.current = true;
                onPrimaryCtaClick && onPrimaryCtaClick();
              }}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] text-xs uppercase tracking-[0.18em] font-bold hover:brightness-110 hover:shadow-[0_6px_25px_rgba(214,168,92,0.4)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg whitespace-nowrap"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#destinations"
              onClick={() => {
                setScrollLock(false);
                setIsCompleted(true);
                isCompletedRef.current = true;
                hasCompletedOnceRef.current = true;
              }}
              className="px-7 py-3.5 rounded-full border border-white/25 hover:border-[#D6A85C] bg-black/40 hover:bg-[#D6A85C]/15 backdrop-blur-md text-[#F2F0E8] hover:text-[#D6A85C] text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 text-center cursor-pointer whitespace-nowrap"
            >
              {secondaryCtaText}
            </a>
          </div>

          {/* Core Trust Pillars */}
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 text-[10px] sm:text-xs font-sans tracking-[0.14em] uppercase text-[#F2F0E8]/80 font-medium pt-3.5 border-t border-white/10 max-w-lg">
            <div className="flex items-center gap-1.5">
              <span className="text-[#D6A85C]">📍</span>
              <span>India's Premier Wilds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#D6A85C]">📷</span>
              <span>Field Masterclasses</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#D6A85C]">👥</span>
              <span>Max 4 / Gypsy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#D6A85C]">🌿</span>
              <span>Ethical Tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM STATUS BAR: Live Playback Progress & Scroll Indicator */}
      <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10 md:left-16 md:right-16 z-20 flex items-center justify-between text-xs uppercase tracking-[0.2em] pointer-events-auto">
        {/* Live Playback Status Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-md">
          <span
            className={`w-2 h-2 rounded-full ${
              isCompleted ? "bg-emerald-400" : isPlaying ? "bg-[#D6A85C] animate-pulse" : "bg-white/40"
            }`}
          />
          <span className="text-[10px] text-[#D6A85C] font-semibold tracking-[0.2em]">
            {isCompleted
              ? "VIDEO 100% COMPLETE • UNLOCKED FOR 2ND SECTION"
              : isPlaying
              ? `PLAYING TO COMPLETION • ${progressPercent}%`
              : "SCROLL TO PLAY VIDEO"}
          </span>
        </div>

        {/* Scroll Prompt to 2nd Section (#founders) */}
        <button
          type="button"
          onClick={scrollToFounders}
          className={`inline-flex items-center gap-2 text-[10.5px] sm:text-xs transition-all ml-auto group/scroll backdrop-blur-md px-4 py-2 rounded-full shadow-lg cursor-pointer ${
            isCompleted
              ? "bg-[#D6A85C] text-[#080908] font-bold border border-[#D6A85C] hover:bg-[#B87333]"
              : "bg-black/60 text-[#D6A85C] border border-white/15 hover:border-[#D6A85C]"
          }`}
        >
          <span className="tracking-[0.18em]">
            {isCompleted
              ? "CONTINUE TO 2ND SECTION (FOUNDERS) ↓"
              : isPlaying
              ? `PLAYING VIDEO (${progressPercent}%) ↓`
              : "SCROLL TO PLAY VIDEO ↓"}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 ${isCompleted ? "text-[#080908]" : "text-[#D6A85C] animate-bounce"}`}
          />
        </button>
      </div>

      {/* THIN GOLD PROGRESS TIMELINE AT VERY BOTTOM */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-20">
        <div
          className="h-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] transition-all duration-150"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </section>
  );
}
