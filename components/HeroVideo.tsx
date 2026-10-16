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
  const trackRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Split title lines
  const titleLines = title.split("\n");
  const line1 = titleLines[0] || title;
  const line2 = titleLines[1] || "";

  // 1. Prime video on mount: DO NOT AUTOPLAY.
  // Video stays paused at frame 0 until the user scrolls the page.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.pause();

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

  // 2. Master Sticky Scroll Engine (Pure Scroll-Driven Playback):
  // - Outer track has height: 220vh.
  // - Inner container has position: sticky; top: 0; height: 100vh.
  // - Video ONLY plays when the user scrolls the page. If the user stops scrolling, the video stops!
  // - Hero stays 100% sticky on the screen until the video has played completely to 100%.
  // - ONLY AFTER the video finishes playing to 100% (at the end of the 220vh track),
  //   continuing to scroll naturally transitions into the 2nd page (#founders).
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
      const maxScroll = rect.height - window.innerHeight;
      if (maxScroll <= 0) return;

      const scrolled = -rect.top;
      // 0 to 1 as the user scrolls through the 220vh track
      targetProgress = Math.min(Math.max(scrolled / maxScroll, 0), 1);

      if (!isTicking) {
        isTicking = true;
        rafId = requestAnimationFrame(updateTimeline);
      }
    };

    const updateTimeline = () => {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) < 0.0008) {
        currentProgress = targetProgress;
      } else {
        currentProgress += diff * 0.45; // Snappy, direct tracking with zero sluggish lag
      }

      const dur = video.duration && !isNaN(video.duration) && video.duration > 0 ? video.duration : 6.77;
      const targetTime = Math.min(Math.max(currentProgress * dur, 0.01), dur - 0.02);

      // Scrub video to exact target time in direct sync with scroll
      if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.03) {
        video.currentTime = targetTime;
      }

      setProgress(currentProgress);
      setIsCompleted(currentProgress >= 0.96);

      if (Math.abs(targetProgress - currentProgress) > 0.0008) {
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
  }, []);

  // Sound toggle
  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  // Reset to beginning
  const resetToStart = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const progressPercent = Math.round(progress * 100);

  return (
    <section
      ref={trackRef}
      className="hero-scroll-track relative w-full bg-[#060806]"
      style={{ height: "220vh" }}
    >
      {/* 
        STICKY HERO VIEWPORT:
        Pins the hero video at the top of the screen while user scrolls through the 220vh track.
        - If user does not scroll, the video DOES NOT play.
        - As user scrolls, the video plays until 100% complete.
        - Once video finishes playing to 100% (end of track), scrolling naturally continues into the 2nd page (#founders).
      */}
      <div className="sticky top-0 w-full h-screen overflow-hidden select-none bg-[#060806] flex items-center">
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

        {/* TOP-RIGHT CONTROLS: Scroll Guidance & Sound Toggle */}
        <div className="absolute top-20 sm:top-24 right-5 sm:right-10 md:right-14 z-20 flex items-center gap-2.5 pointer-events-auto">
          {/* Scroll to Play Guidance Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] text-[#D6A85C] shadow-lg">
            <MousePointer className="w-3 h-3 text-[#D6A85C] animate-pulse" />
            <span>SCROLL TO PLAY VIDEO</span>
          </div>

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

          {/* Reset to Top Button */}
          {progressPercent > 5 && (
            <button
              type="button"
              onClick={resetToStart}
              aria-label="Scroll Back to Beginning"
              className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#D6A85C] border border-white/20 hover:border-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg"
              title="Return to Video Start"
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
                onClick={onPrimaryCtaClick}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] text-xs uppercase tracking-[0.18em] font-bold hover:brightness-110 hover:shadow-[0_6px_25px_rgba(214,168,92,0.4)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg whitespace-nowrap"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#destinations"
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
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-md">
            <span className={`w-2 h-2 rounded-full ${isCompleted ? "bg-emerald-400" : "bg-[#D6A85C] animate-pulse"}`} />
            <span className="text-[10px] text-[#D6A85C] font-semibold tracking-[0.2em]">
              {isCompleted ? "ROYAL BENGAL TIGER • 100% COMPLETE" : `SCROLL TO PLAY VIDEO • ${progressPercent}%`}
            </span>
          </div>

          {/* Scroll Prompt to 2nd Section (#founders) */}
          <a
            href="#founders"
            className="inline-flex items-center gap-2 text-[10.5px] sm:text-xs text-[#D6A85C] hover:text-[#F2F0E8] transition-colors ml-auto group/scroll bg-black/60 border border-white/15 hover:border-[#D6A85C] backdrop-blur-md px-4 py-2 rounded-full shadow-lg"
          >
            <span className="tracking-[0.18em]">
              {isCompleted ? "CONTINUE TO 2ND SECTION (FOUNDERS) ↓" : "SCROLL TO PLAY VIDEO ↓"}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#D6A85C] animate-bounce" />
          </a>
        </div>

        {/* THIN GOLD PROGRESS TIMELINE AT VERY BOTTOM */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-20">
          <div
            className="h-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] transition-all duration-75"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </section>
  );
}
