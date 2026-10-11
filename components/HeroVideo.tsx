"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Lock, Unlock, Play, Pause } from "lucide-react";

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
  const trackRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Split title lines
  const titleLines = title.split("\n");
  const line1 = titleLines[0] || title;
  const line2 = titleLines[1] || "";

  // 1. Prime video on mount so first frame is decoded & ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const primeVideo = () => {
      if (video.readyState >= 2 && video.currentTime === 0) {
        video.currentTime = 0.01;
      }
    };

    video.addEventListener("loadedmetadata", primeVideo);
    video.addEventListener("loadeddata", primeVideo);
    video.load();
    if (video.readyState >= 2) primeVideo();

    return () => {
      video.removeEventListener("loadedmetadata", primeVideo);
      video.removeEventListener("loadeddata", primeVideo);
    };
  }, [src]);

  // 2. Master Sticky Scroll-Scrub Engine:
  // Hero stays sticky on screen, playing the video until 100% complete,
  // then seamlessly allows normal scrolling into the 2nd section (Founders).
  useEffect(() => {
    const video = videoRef.current;
    const track = trackRef.current;
    if (!video || !track) return;

    let rafId: number | null = null;
    let targetProgress = 0;
    let currentProgress = 0;
    let isTicking = false;

    const handleScroll = () => {
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const maxScrollDistance = rect.height - window.innerHeight;
      if (maxScrollDistance <= 0) return;

      const scrolled = -rect.top;
      targetProgress = Math.min(Math.max(scrolled / maxScrollDistance, 0), 1);

      if (!isTicking) {
        isTicking = true;
        rafId = requestAnimationFrame(updateTimeline);
      }
    };

    const updateTimeline = () => {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) < 0.0005) {
        currentProgress = targetProgress;
      } else {
        currentProgress += diff * 0.24; // Ultra smooth lerp damping
      }

      // Scrub video time in direct sync with scroll progress
      if (!isAutoPlaying && video.duration && !isNaN(video.duration) && video.duration > 0) {
        const targetTime = Math.min(
          Math.max(currentProgress * video.duration, 0.01),
          video.duration - 0.02
        );
        if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.025) {
          video.currentTime = targetTime;
        }
      }

      setScrollProgress(currentProgress);
      setIsCompleted(currentProgress >= 0.94);

      if (Math.abs(targetProgress - currentProgress) > 0.0005) {
        rafId = requestAnimationFrame(updateTimeline);
      } else {
        isTicking = false;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isAutoPlaying]);

  // Toggle optional continuous auto-play
  const toggleAutoPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isAutoPlaying) {
      video.pause();
      setIsAutoPlaying(false);
    } else {
      video
        .play()
        .then(() => setIsAutoPlaying(true))
        .catch(() => {});
    }
  };

  const progressPercent = Math.round(scrollProgress * 100);

  return (
    <section
      ref={trackRef}
      className="hero-scroll-track relative w-full bg-[#080909]"
      style={{ height: "260vh" }}
    >
      {/* 
        STICKY INNER CONTAINER: 
        Pins the hero card to the viewport top while the user scrolls through the 260vh track.
        Once the video completes (end of track), scrolling naturally continues into the 2nd section (#founders).
      */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center p-3 pt-20 sm:p-5 sm:pt-24 md:p-8 md:pt-24 lg:p-10 lg:pt-24 z-10 select-none">
        {/* HERO CARD CONTAINER */}
        <div className="relative w-full max-w-[1520px] h-[82vh] md:h-[86vh] rounded-2xl md:rounded-[32px] overflow-hidden border border-white/15 bg-[#0b0e0b] shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between group">
          {/* Background Full HD Royal Bengal Tiger Video */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              poster={poster}
              className="w-full h-full object-cover object-[center_35%] brightness-[0.88] contrast-[1.05]"
            >
              <source src="/videos/home-hero.mp4" type="video/mp4" />
              <source src="/videos/IMG_8206.MOV" type="video/quicktime" />
              <img
                src={poster}
                alt="Wild Bengal Tiger — VM Wild Expeditions"
                className="w-full h-full object-cover object-[center_35%]"
              />
            </video>

            {/* CINEMATIC CONTRAST GRADIENTS */}
            {/* Mobile dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-[#080909]/80 to-[#080909]/50 sm:hidden pointer-events-none" />

            {/* Desktop negative space contrast */}
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#080909]/95 via-[#080909]/75 md:via-[#080909]/50 to-transparent pointer-events-none" />

            {/* Top & Bottom blends */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#080909]/90 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#080909] to-transparent pointer-events-none" />
          </div>

          {/* TOP BAR: Eyebrow + Live Scrub Progress Indicator + AutoPlay Button */}
          <div className="relative z-10 p-5 sm:p-8 md:p-10 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
            {/* Eyebrow Badge */}
            <span className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#D6A85C] font-semibold py-1.5 px-3.5 sm:px-4 rounded-full border border-[#D6A85C]/35 bg-black/60 backdrop-blur-md shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85C]" />
              <span>{eyebrow}</span>
            </span>

            {/* Live Sticky Scroll Status + AutoPlay Option */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Optional AutoPlay Button */}
              <button
                type="button"
                onClick={toggleAutoPlay}
                aria-label={isAutoPlaying ? "Pause Video Autoplay" : "Enable Video Autoplay"}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 border border-white/20 hover:border-[#D6A85C] text-[10px] md:text-xs font-sans tracking-[0.16em] uppercase text-[#F2F0E8] hover:text-[#D6A85C] backdrop-blur-md transition-all cursor-pointer shadow-md"
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-3 h-3 text-[#D6A85C]" />
                    <span className="font-semibold">PAUSE</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-[#D6A85C]" />
                    <span className="font-semibold">AUTO PLAY</span>
                  </>
                )}
              </button>

              {/* Sticky Scroll Progress Lock Indicator */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 border border-white/20 backdrop-blur-md text-[10px] md:text-xs uppercase tracking-[0.18em] shadow-md">
                {isCompleted ? (
                  <>
                    <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-bold text-emerald-400">
                      VIDEO COMPLETE • SCROLL FOR 2ND PAGE ↓
                    </span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-[#D6A85C]" />
                    <span className="font-semibold text-[#F2F0E8]">
                      SCROLL TO PLAY ({progressPercent}%)
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* MAIN CONTENT: Headline, Description & CTAs */}
          <div className="relative z-10 p-5 sm:p-8 md:p-10 max-w-3xl space-y-4 md:space-y-6 pointer-events-auto my-auto">
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.06] tracking-tight text-[#F2F0E8] drop-shadow-2xl">
              <span className="block">{line1}</span>
              {line2 && (
                <span className="block text-[#D6A85C] font-normal italic mt-1">
                  {line2}
                </span>
              )}
            </h1>

            <p className="text-xs sm:text-base md:text-lg text-[#F2F0E8]/90 font-light max-w-xl leading-relaxed font-sans drop-shadow-md">
              {description}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
              <button
                type="button"
                onClick={onPrimaryCtaClick}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 hover:shadow-[0_6px_30px_rgba(214,168,92,0.45)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-xl whitespace-nowrap"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#destinations"
                className="px-8 py-4 rounded-full border border-white/30 hover:border-[#D6A85C] bg-black/50 hover:bg-[#D6A85C]/15 backdrop-blur-md text-[#F2F0E8] hover:text-[#D6A85C] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 text-center cursor-pointer whitespace-nowrap"
              >
                {secondaryCtaText}
              </a>
            </div>

            {/* Core Trust Pillars */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 pt-3 text-[10px] sm:text-xs font-sans tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#F2F0E8]/80 font-medium border-t border-[#242923]/80">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-sm">📍</span>
                <span>India's Premier Wilds</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-sm">📷</span>
                <span>Field Masterclasses</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-sm">👥</span>
                <span>Max 4 / Gypsy</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-sm">🌿</span>
                <span>Ethical Tracking</span>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR: Tiger Habitat Status & Link into 2nd Section (#founders) */}
          <div className="relative z-10 p-4 sm:p-6 md:p-8 flex items-center justify-between text-xs tracking-[0.25em] text-[#F2F0E8]/75 uppercase pointer-events-auto border-t border-white/10 bg-black/30 backdrop-blur-sm">
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D6A85C] animate-pulse" />
              <span className="font-semibold text-[10.5px] text-[#D6A85C]">
                {isCompleted ? "HABITAT REVEALED • 100% COMPLETE" : "ROYAL BENGAL TIGER • LIVE HABITAT"}
              </span>
            </div>

            <a
              href="#founders"
              className="inline-flex items-center gap-2 text-[10.5px] sm:text-xs text-[#D6A85C] hover:text-[#F2F0E8] transition-colors ml-auto group/scroll"
            >
              <span className="tracking-[0.2em]">
                {isCompleted ? "SCROLL FOR 2ND SECTION (FOUNDERS) ↓" : "SCROLLING PLAYS VIDEO ↓"}
              </span>
              <div className="w-6 h-6 rounded-full border border-[#D6A85C]/40 flex items-center justify-center group-hover/scroll:border-[#D6A85C]">
                <ChevronDown className="w-3.5 h-3.5 text-[#D6A85C] animate-bounce" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
