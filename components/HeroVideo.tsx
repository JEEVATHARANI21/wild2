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
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const scrollPauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartYRef = useRef<number>(0);

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
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(foundersEl, { duration: 1.1 });
      } else {
        foundersEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [setScrollLock]);

  // Helper: Safely trigger video.play() handling promise & autoplay policies
  const safePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.muted = isMuted;
      const promise = video.play();
      if (promise !== undefined) {
        playPromiseRef.current = promise;
        promise
          .then(() => {
            playPromiseRef.current = null;
            setIsPlaying(true);
            isPlayingRef.current = true;
          })
          .catch((err: any) => {
            playPromiseRef.current = null;
            if (err?.name !== "AbortError") {
              // If browser blocked unmuted playback, fallback to muted
              video.muted = true;
              setIsMuted(true);
              video
                .play()
                .then(() => {
                  setIsPlaying(true);
                  isPlayingRef.current = true;
                })
                .catch(() => {});
            }
          });
      }
    }
  }, [isMuted]);

  // Helper: Safely trigger video.pause() without race condition conflicts with pending play promises
  const safePause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const pauseNow = () => {
      if (!video.paused) {
        video.pause();
      }
      setIsPlaying(false);
      isPlayingRef.current = false;
    };

    if (playPromiseRef.current) {
      playPromiseRef.current
        .then(() => {
          pauseNow();
        })
        .catch(() => {
          pauseNow();
        });
    } else {
      pauseNow();
    }
  }, []);

  // Helper: Complete the video and unlock the page for natural scrolling
  const handleVideoCompletion = useCallback(() => {
    if (isCompletedRef.current) return;

    if (scrollPauseTimerRef.current) {
      clearTimeout(scrollPauseTimerRef.current);
      scrollPauseTimerRef.current = null;
    }

    const video = videoRef.current;
    if (video && !video.paused) {
      video.pause();
    }

    setIsCompleted(true);
    isCompletedRef.current = true;
    hasCompletedOnceRef.current = true;
    setIsPlaying(false);
    isPlayingRef.current = false;
    setProgress(1);

    // 3. Unlock scrolling after video completion
    setScrollLock(false);

    // Move smoothly to the next page (Founders section)
    setTimeout(() => {
      scrollToFounders();
    }, 350);
  }, [setScrollLock, scrollToFounders]);

  // Helper: Scroll activity detection — play on scroll, pause when scrolling stops
  const handleScrollActivity = useCallback(() => {
    if (isCompletedRef.current) return;

    if (!hasStartedRef.current) {
      setHasStarted(true);
      hasStartedRef.current = true;
    }

    // Keep sticky & locked while video is playing
    setScrollLock(true);

    // Resume or start playing from current timestamp
    safePlay();

    // Reset inactivity timer (~200ms threshold to prevent flickering during normal scroll gestures)
    if (scrollPauseTimerRef.current) {
      clearTimeout(scrollPauseTimerRef.current);
    }

    scrollPauseTimerRef.current = setTimeout(() => {
      if (!isCompletedRef.current) {
        safePause();
      }
    }, 200);
  }, [safePlay, safePause, setScrollLock]);

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

    // Track playback progress & trigger completion when finished
    const onTimeUpdate = () => {
      if (!video || !video.duration || isNaN(video.duration)) return;
      const cur = Math.min(video.currentTime / video.duration, 1);
      setProgress(cur);

      if (cur >= 0.985 && !isCompletedRef.current) {
        handleVideoCompletion();
      }
    };

    const onEnded = () => {
      handleVideoCompletion();
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    if (!isCompletedRef.current) {
      setScrollLock(true);
    }

    return () => {
      video.removeEventListener("loadedmetadata", primeFrame);
      video.removeEventListener("loadeddata", primeFrame);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      if (scrollPauseTimerRef.current) {
        clearTimeout(scrollPauseTimerRef.current);
      }
      setScrollLock(false);
    };
  }, [handleVideoCompletion, setScrollLock]);

  // 2 & 4. Scroll Detection & Viewport Sticky Engine (Desktop, Mobile, Trackpads, Keyboards):
  // - Plays video when user is scrolling
  // - Pauses immediately when user stops scrolling
  // - Resumes from current playback position when user scrolls again
  // - Keeps hero sticky and next section hidden until video reaches end
  useEffect(() => {
    // Wheel event handler (mouse wheel & trackpad)
    const onWheel = (e: WheelEvent) => {
      // If completed and user has scrolled down into subsequent sections, allow normal scrolling
      if (isCompletedRef.current && window.scrollY > 20) return;

      // 7. Handle reverse scrolling: If already completed once, allow free scrolling
      if (hasCompletedOnceRef.current) return;

      // While video is incomplete:
      if (!isCompletedRef.current) {
        e.preventDefault();
        e.stopPropagation();

        if (e.deltaY > 0) {
          // Scrolling down: play video
          handleScrollActivity();
        } else if (e.deltaY < -15) {
          // Scrolling up: pause video
          safePause();
        }
      }
    };

    // Mobile touch handlers
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isCompletedRef.current && window.scrollY > 20) return;
      if (hasCompletedOnceRef.current) return;

      if (!isCompletedRef.current) {
        e.preventDefault();
        e.stopPropagation();

        if (e.touches && e.touches[0]) {
          const deltaY = touchStartYRef.current - e.touches[0].clientY;
          if (deltaY > 4) {
            handleScrollActivity();
          } else if (deltaY < -15) {
            safePause();
          }
        }
      }
    };

    const onTouchEnd = () => {
      if (!isCompletedRef.current) {
        safePause();
      }
    };

    // Keyboard handlers (ArrowDown, PageDown, Space)
    const onKeyDown = (e: KeyboardEvent) => {
      if (isCompletedRef.current) return;
      if (hasCompletedOnceRef.current) return;

      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        handleScrollActivity();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        safePause();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (isCompletedRef.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        safePause();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown, { capture: true });
    window.addEventListener("keyup", onKeyUp, { capture: true });

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown, { capture: true });
      window.removeEventListener("keyup", onKeyUp, { capture: true });
    };
  }, [handleScrollActivity, safePause]);

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
    setHasStarted(false);
    hasStartedRef.current = false;

    setScrollLock(true);
    safePause();
  }, [setScrollLock, safePause]);

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

        {/* Top & Bottom blends for seamless navbar and section integration */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#060806]/85 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#060806] to-transparent pointer-events-none" />
      </div>

      {/* TOP-RIGHT CONTROLS: Scroll Status Guidance & Sound Toggle */}
      <div className="absolute top-20 sm:top-24 right-5 sm:right-10 md:right-14 z-20 flex items-center gap-2.5 pointer-events-auto">
        {/* Scroll Status Guidance Badge */}
        {!isCompleted && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#D6A85C]/40 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] text-[#D6A85C] shadow-lg">
            <MousePointer className={`w-3 h-3 text-[#D6A85C] ${isPlaying ? "animate-pulse" : ""}`} />
            <span>
              {isPlaying
                ? `PLAYING ON SCROLL • ${progressPercent}%`
                : hasStarted
                ? `PAUSED • SCROLL TO RESUME (${progressPercent}%)`
                : "SCROLL TO PLAY VIDEO"}
            </span>
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

      {/* MINIMAL LEFT-SIDE HERO CONTENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center pointer-events-none">
        <div className="max-w-xs sm:max-w-sm text-left pointer-events-auto bg-black/40 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/10 shadow-2xl">
          {/* Subtle Eyebrow */}
          <div className="inline-flex items-center gap-2 text-[9.5px] sm:text-[10px] uppercase tracking-[0.24em] text-[#D6A85C] font-semibold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85C]" />
            <span>THE PINNACLE OF WILDLIFE</span>
          </div>

          {/* Minimal Headline */}
          <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#F2F0E8] leading-tight mb-2 drop-shadow-md">
            <span>Bespoke Photographic</span>{" "}
            <span className="text-[#D6A85C] italic font-normal">Expeditions</span>
          </h1>

          {/* 1-Line Minimal Essence */}
          <p className="text-xs sm:text-[13px] text-[#F2F0E8]/85 font-light leading-relaxed mb-4">
            Masterclass field tracking & intimate safaris across India's premier tiger reserves.
          </p>

          {/* Minimal Actions */}
          <div className="flex items-center gap-3">
            <a
              href="#tours"
              onClick={() => {
                setScrollLock(false);
                setIsCompleted(true);
                isCompletedRef.current = true;
                hasCompletedOnceRef.current = true;
                const el = document.getElementById("tours") || document.getElementById("packages") || document.getElementById("founders");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] text-[10.5px] sm:text-xs uppercase tracking-[0.16em] font-bold hover:brightness-110 shadow-md transition-all inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>{secondaryCtaText || "EXPLORE TOURS"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => {
                setScrollLock(false);
                setIsCompleted(true);
                isCompletedRef.current = true;
                hasCompletedOnceRef.current = true;
                onPrimaryCtaClick && onPrimaryCtaClick();
              }}
              className="text-[10.5px] sm:text-xs uppercase tracking-[0.16em] text-[#F2F0E8]/80 hover:text-[#D6A85C] transition-colors font-medium px-2 py-1 cursor-pointer whitespace-nowrap"
            >
              {primaryCtaText || "ENQUIRE"}
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM STATUS BAR: Live Playback Progress & Scroll Indicator */}
      <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10 md:left-16 md:right-16 z-20 flex items-center justify-between text-xs uppercase tracking-[0.2em] pointer-events-auto">
        {/* Live Playback Status Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-md">
          <span
            className={`w-2 h-2 rounded-full ${
              isCompleted
                ? "bg-emerald-400"
                : isPlaying
                ? "bg-[#D6A85C] animate-pulse"
                : hasStarted
                ? "bg-amber-400/80"
                : "bg-white/40"
            }`}
          />
          <span className="text-[10px] text-[#D6A85C] font-semibold tracking-[0.2em]">
            {isCompleted
              ? "VIDEO 100% COMPLETE • UNLOCKED FOR 2ND SECTION"
              : isPlaying
              ? `PLAYING ON SCROLL • ${progressPercent}%`
              : hasStarted
              ? `PAUSED • SCROLL TO RESUME (${progressPercent}%)`
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
              ? `SCROLLING TO PLAY (${progressPercent}%) ↓`
              : hasStarted
              ? `RESUME ON SCROLL (${progressPercent}%) ↓`
              : "SCROLL TO PLAY VIDEO ↓"}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 ${
              isCompleted
                ? "text-[#080908]"
                : isPlaying
                ? "text-[#D6A85C] animate-bounce"
                : "text-[#D6A85C]"
            }`}
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
