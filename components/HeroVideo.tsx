"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowRight, ChevronDown, Volume2, VolumeX, Play, Pause, RotateCcw } from "lucide-react";

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const isCompletedRef = useRef(false);
  isCompletedRef.current = isCompleted;

  const hasCompletedOnceRef = useRef(false);
  const isTransitioningRef = useRef(false);

  // Split title lines
  const titleLines = title.split("\n");
  const line1 = titleLines[0] || title;
  const line2 = titleLines[1] || "";

  // Helper: Smoothly scroll down into 2nd section (#founders)
  const scrollToFounders = useCallback(() => {
    isTransitioningRef.current = true;
    setIsCompleted(true);
    hasCompletedOnceRef.current = true;

    const foundersEl = document.getElementById("founders");
    if (foundersEl) {
      foundersEl.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 1200);
  }, []);

  // 1. Autoplay video smoothly at 1x natural speed on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.playbackRate = 1.0;

    const tryPlay = () => {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Fallback for strict browser autoplay policies
          video.muted = true;
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("canplay", tryPlay, { once: true });
    }

    const onTimeUpdate = () => {
      if (!video || !video.duration || isNaN(video.duration)) return;
      const current = Math.min(video.currentTime / video.duration, 1);
      setProgress(current);

      if (current >= 0.96 && !isCompletedRef.current) {
        setIsCompleted(true);
        hasCompletedOnceRef.current = true;
      }
    };

    const onEnded = () => {
      setIsCompleted(true);
      hasCompletedOnceRef.current = true;
      // Loop seamlessly so background stays dynamic while user reads
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [src]);

  // 2. Intelligent Scroll-Lock until Video Completion:
  // - If user scrolls while video is playing: Hero stays 100% sticky on screen (NEVER cuts off).
  // - Downward scroll drives the video forward until 100% complete.
  // - ONLY AFTER video completes does scrolling seamlessly move to the 2nd page (#founders).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let wheelDebounce: NodeJS.Timeout | null = null;
    let touchStartY = 0;

    // Mouse wheel handler
    const handleWheel = (e: WheelEvent) => {
      // If user has already scrolled past hero, let normal scrolling happen
      if (window.scrollY > 40) return;
      // If video has completed at least once, allow normal scrolling
      if (hasCompletedOnceRef.current) return;

      if (!isCompletedRef.current) {
        // Prevent page from scrolling away before video finishes!
        e.preventDefault();

        if (e.deltaY > 0) {
          // User scrolling down: advance the video
          if (video.paused) {
            video.play().catch(() => {});
            setIsPlaying(true);
          }

          const maxDur = video.duration && !isNaN(video.duration) ? video.duration : 6.77;
          const step = Math.max(0.4, Math.min((Math.abs(e.deltaY) / 100) * 0.7, 1.2));
          const nextTime = Math.min(video.currentTime + step, maxDur);
          video.currentTime = nextTime;

          const p = Math.min(nextTime / maxDur, 1);
          setProgress(p);

          // Once video completes: unlock and smoothly scroll to 2nd section
          if (p >= 0.96) {
            setIsCompleted(true);
            hasCompletedOnceRef.current = true;

            if (wheelDebounce) clearTimeout(wheelDebounce);
            wheelDebounce = setTimeout(() => {
              scrollToFounders();
            }, 300);
          }
        }
      }
    };

    // Mobile touch swipe handler
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY > 40) return;
      if (hasCompletedOnceRef.current) return;

      if (!isCompletedRef.current && e.touches && e.touches[0]) {
        const deltaY = touchStartY - e.touches[0].clientY;
        if (deltaY > 8) {
          // User swiping up (scrolling down)
          e.preventDefault();
          touchStartY = e.touches[0].clientY;

          if (video.paused) {
            video.play().catch(() => {});
            setIsPlaying(true);
          }

          const maxDur = video.duration && !isNaN(video.duration) ? video.duration : 6.77;
          const nextTime = Math.min(video.currentTime + 0.6, maxDur);
          video.currentTime = nextTime;

          const p = Math.min(nextTime / maxDur, 1);
          setProgress(p);

          if (p >= 0.96) {
            setIsCompleted(true);
            hasCompletedOnceRef.current = true;

            if (wheelDebounce) clearTimeout(wheelDebounce);
            wheelDebounce = setTimeout(() => {
              scrollToFounders();
            }, 300);
          }
        }
      }
    };

    // Keyboard navigation (ArrowDown, PageDown, Space)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.scrollY > 40) return;
      if (hasCompletedOnceRef.current) return;

      if (!isCompletedRef.current) {
        if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
          e.preventDefault();
          const maxDur = video.duration && !isNaN(video.duration) ? video.duration : 6.77;
          const nextTime = Math.min(video.currentTime + 1.0, maxDur);
          video.currentTime = nextTime;

          const p = Math.min(nextTime / maxDur, 1);
          setProgress(p);

          if (p >= 0.96) {
            setIsCompleted(true);
            hasCompletedOnceRef.current = true;
            setTimeout(() => {
              scrollToFounders();
            }, 300);
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      if (wheelDebounce) clearTimeout(wheelDebounce);
    };
  }, [scrollToFounders]);

  // Controls
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const replayVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    window.scrollTo({ top: 0, behavior: "smooth" });
    video.currentTime = 0;
    video
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsCompleted(false);
        hasCompletedOnceRef.current = false;
        setProgress(0);
      })
      .catch(() => {});
  }, []);

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
          autoPlay
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

      {/* TOP-RIGHT CONTROLS: Play/Pause, Sound Toggle & Video Replay */}
      <div className="absolute top-20 sm:top-24 right-5 sm:right-10 md:right-14 z-20 flex items-center gap-2 pointer-events-auto">
        {/* Play / Pause Toggle */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
          className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#D6A85C] border border-white/20 hover:border-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg"
          title={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>

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

        {/* Replay Button */}
        <button
          type="button"
          onClick={replayVideo}
          aria-label="Replay Video"
          className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#D6A85C] border border-white/20 hover:border-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg"
          title="Replay Video from Start"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* HERO CONTENT: Left-Aligned Column That Doesn't Obscure the Tiger */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-24 pb-14 flex flex-col justify-center pointer-events-none">
        <div className="max-w-xl text-left pointer-events-auto">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.24em] text-[#D6A85C] font-semibold py-1.5 px-3.5 rounded-full border border-[#D6A85C]/40 bg-[#080a08]/85 backdrop-blur-md shadow-md mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85C] animate-pulse" />
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
                setIsCompleted(true);
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
                setIsCompleted(true);
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

      {/* BOTTOM STATUS BAR: Live Progress + Scroll to 2nd Section (#founders) */}
      <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10 md:left-16 md:right-16 z-20 flex items-center justify-between text-xs uppercase tracking-[0.2em] pointer-events-auto">
        {/* Live Video Habitat Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#D6A85C] animate-pulse" />
          <span className="text-[10px] text-[#D6A85C] font-semibold tracking-[0.2em]">
            {isCompleted ? "HABITAT REVEALED • 100% COMPLETE" : `ROYAL BENGAL TIGER • ${progressPercent}%`}
          </span>
        </div>

        {/* Scroll Prompt to 2nd Section (#founders) */}
        <button
          type="button"
          onClick={scrollToFounders}
          className="inline-flex items-center gap-2 text-[10.5px] sm:text-xs text-[#D6A85C] hover:text-[#F2F0E8] transition-colors ml-auto group/scroll bg-black/60 border border-white/15 hover:border-[#D6A85C] backdrop-blur-md px-4 py-2 rounded-full shadow-lg cursor-pointer"
        >
          <span className="tracking-[0.18em]">
            {isCompleted ? "SCROLL FOR 2ND SECTION (FOUNDERS) ↓" : "SCROLL TO PLAY VIDEO ↓"}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#D6A85C] animate-bounce" />
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
